import React, { createContext, useEffect, useContext } from "react";
import { TomeContext, createRow } from "./TomeContext";
import { MetricsContext } from "./MetricsContext";
import { TILES } from "../tiles/TileConstants";
import { uniqueId } from "lodash";

export const ClipboardContext = createContext();

export const ClipboardProvider = ({ children }) => {
	const {
		tomeData,
		currentPage,
		saveState,
		deleteTile, // used for cut operations
		updateImageTileWithImage,
		selectedTile,
		tileHoveringId,
		getTileForId,
		getNewImageTile,
		selectTile,
		appendNewTile,
	} = useContext(TomeContext);
	const {
		scrollTileIntoView,
		getRowForPointerY,
		getTileForCurrentPointerPosition,
		getRowAndSideForCurrentPointerPosition,
		pointerInWindow,
		getRowAndSideForXY,
	} = useContext(MetricsContext);

	const cutTile = tile => {
		const tileString = JSON.stringify(tile);
		navigator.clipboard.writeText(tileString).then(
			function () {
				/*
				const row = tomeData.rows.filter(r => {
					return r.id === tile.rowId;
				})[0];
				copiedTileRowHeight.current = tile.height6 ? null : row.height;
				playTileCutSound();
				if (showContextMenu) {
					setShowContextMenu(false);
				}
				*/
				deleteTile(tile);
			},
			function () {
				/* clipboard write failed */
			}
		);
	};


	const copyTile = tile => {
		//clipboardTile = JSON.parse(JSON.stringify(tile));
		const tileString = JSON.stringify(tile);
		navigator.clipboard.writeText(tileString).then(
			function () {
				/*
				const row = tomeData.rows.filter(r => {
					return r.id === tile.rowId;
				})[0];
				copiedTileRowHeight.current = row.height;
				console.log("copied")
				playTileCopySound();
				if (showContextMenu) {
					setShowContextMenu(false);
				}
				*/
			},
			function () {
				/* clipboard write failed */
			}
		);
	};

	const pasteTile = tile => {
		const newTile = appendNewTile(tile.type);
		newTile.params = {...tile.params}
		saveState();
		if (newTile) {
			//
			//if (showContextMenu) setShowContextMenu(false);
		}
		return newTile;
	};

	const replaceTileWithClipboardTile = (deletedTile, clipboardTile) => {
		//saveStateToUndo();

		/*
			if (copiedTile.current.id === t.id) {
				return pasteClipboardAfterTile(t);
			}
		*/

		const index = tomeData.tiles.indexOf(deletedTile);
		tomeData.tiles.splice(index, 1);

		clipboardTile.id = "tile_" + Math.random();
		clipboardTile.order = deletedTile.order;
		clipboardTile.width = deletedTile.width;
		clipboardTile.rowId = deletedTile.rowId;
		clipboardTile.pageId = deletedTile.pageId;

		// if target row is too small for new tile
		const row = tomeData.rows.filter(r => {
			return r.id === deletedTile.rowId;
		})[0];
		if (row.height < clipboardTile.height6 && deletedTile.width === 6) {
			row.height = clipboardTile.height6;
		}
		if (row.height > clipboardTile.height12 && deletedTile.width === 12) {
			row.height = clipboardTile.height12;
		}

		/*
		if (row.height < copiedTileRowHeight.current) {
			row.height = copiedTileRowHeight.current;
		}
		*/

		// Add the tile to the tome data
		tomeData.tiles.push(clipboardTile);
		// Add the new tile id to tomeData
		//tomeData.newTileID = tile.id;

		// update selection
		selectTile(clipboardTile);

		// update the data!
		saveState();

		//if (showContextMenu) setShowContextMenu(false);

		return clipboardTile;
	};

	

	const pasteFromClipboardToNearestPosition = (clipboardTile, info) => {
		console.log("pasteFromClipboardToNearestPosition", info);
		let newTile = false;
		if (info.row) {
			newTile = pasteClipboardTileToRow(clipboardTile, info.row, info.direction);
		} else if (info.rowGapIndex !== 0) {
			newTile = pasteClipboardTileToRowGapIndex(clipboardTile, info.rowGapIndex);
		} else {
			newTile = pasteClipboardTileToPage(clipboardTile, info.direction);
		}
		/*
		if (newTile) {
			
		}
		if (showContextMenu) setShowContextMenu(false);
		*/
		return newTile;
	};



	const pasteClipboardTileToPage = (clipboardTile, direction) => {
		console.log("pasteClipboardTileToPage", clipboardTile, direction);
		//saveStateToUndo();

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let newRowOrder = 1;
		if (direction === "bottom") {
			newRowOrder = rows[rows.length - 1].order + 1;
		}
		let newRowHeight = 6;
		//if (copiedTileRowHeight.current) newRowHeight = copiedTileRowHeight.current;
		if (clipboardTile.height12) newRowHeight = clipboardTile.height12;
		const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);

		// Create new tile
		const newTile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: newRow.id,
			order: 1,
			width: 12,
			type: clipboardTile.type,
			isNull: !clipboardTile.params,
			params: clipboardTile.params,
			height6: clipboardTile.height6,
			height12: clipboardTile.height12,
		};

		// update other rows' orders
		rows.forEach((rO, j) => {
			const order = j + 1;
			rO.order = order;
			if (rO.order >= newRow.order) {
				rO.order = order + 1;
			}
		});

		// Add new row to tome data
		tomeData.rows.push(newRow);
		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		// console.log(tomeData)
		saveState();

		return newTile;
	};



	const pasteClipboardTileToRowGapIndex = (clipboardTile, gapIndex) => {
		console.log("pasteClipboardToRowGapIndex", gapIndex);
		//saveStateToUndo();

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let newRowOrder = gapIndex + 1;
		let newRowHeight = 6;
		//if (copiedTileRowHeight.current) newRowHeight = copiedTileRowHeight.current;
		if (clipboardTile.height12) newRowHeight = clipboardTile.height12;
		const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);

		// Create new tile
		const newTile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: newRow.id,
			order: 1,
			width: 12,
			type: clipboardTile.type,
			isNull: !clipboardTile.params,
			params: clipboardTile.params,
			height6: clipboardTile.height6,
			height12: clipboardTile.height12,
		};

		// update other rows' orders
		rows.forEach((rO, j) => {
			const order = j + 1;
			rO.order = order;
			if (rO.order >= newRow.order) {
				rO.order = order + 1;
			}
		});

		// Add new row to tome data
		tomeData.rows.push(newRow);
		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		// console.log(tomeData)
		saveState();

		return newTile;
	};

	

	const pasteClipboardTileToRow = (clipboardTile, row, direction) => {
		console.log("pasteClipboardTileToRow", clipboardTile, row, direction);
		saveState();

		let newTileOrder = 1;
		let newTileWidth = 6;

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));

		let tilesInRow = tomeData.tiles.filter(t => {
			return t.rowId === row.id;
		});
		tilesInRow.sort((a, b) => (a.order > b.order ? 1 : -1));

		let stayingTile = tilesInRow[0];

		// Single-tile row, add pasted tile to this row
		if (tilesInRow.length === 1) {
			stayingTile.width = 6;
			if (direction === "left") {
				stayingTile.order = 2;
			}
			if (direction === "right") {
				stayingTile.order = 1;
				newTileOrder = 2;
			}
		}
		if (tilesInRow.length === 2) {
			let movingTile = tilesInRow[1];
			let newRowOrder = row.order + 1;
			stayingTile.order = 2;
			if (direction === "right") {
				newTileOrder = 2;
				stayingTile.order = 1;
			}
			let newRowHeight = row.height;
			if (movingTile.height12) newRowHeight = movingTile.height12;
			const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
			// update other rows' orders
			rows.forEach((rO, j) => {
				const order = j + 1;
				rO.order = order;
				if (rO.order >= newRow.order) {
					rO.order = order + 1;
				}
			});
			movingTile.rowId = newRow.id;
			movingTile.order = 1;
			movingTile.width = 12;
			// Add new row to tome data
			tomeData.rows.push(newRow);
		}

		// Update exisiting row height
		if (clipboardTile.height6 > row.height) row.height = clipboardTile.height6;
		if (stayingTile.height6 > row.height) row.height = stayingTile.height6;
		//if (copiedTileRowHeight.current > row.height) row.height = copiedTileRowHeight.current;

		// Create new tile
		const newTile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: row.id,
			order: newTileOrder,
			width: newTileWidth,
			type: clipboardTile.type,
			isNull: !clipboardTile.params,
			params: clipboardTile.params,
			height6: clipboardTile.height6,
			height12: clipboardTile.height12,
		};

		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		saveState();

		return newTile;
	};

	const addImageTileFromClipboard = () => {
		const tileType = TILES.IMAGE.name;
		/*
		// Save state before any changes
		// Add to new row at bottom of current page
		const row = addRowToPage(currentPage);
		const newTileOrder = 1;
		const newTileWidth = 12;
		
		const newTile = {
			id: uniqueId("tile"),
			pageId: currentPage.id,
			rowId: row.id,
			order: newTileOrder,
			width: newTileWidth,
			type: tileType,
			params: {
				image: "",
			},
		};
		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;
		*/

		/*
		const newTile = addTileToRow(tileType);
		if (newTile) {
			
			if (showContextMenu) setShowContextMenu(false);
		}
		*/
		//return newTile;
	};


	useEffect(() => {
		const onPaste = pasteEvent => {
			console.log("system paste event!");

			// Get only the first item for now
			const pasteItem = pasteEvent.clipboardData.items[0];
			if (pasteItem === undefined || pasteItem.type === undefined) {
				console.log("pasteItem empty");
				return false;
			}
			console.log(pasteItem);


			// Is it an image?
			if (pasteItem.type.indexOf("image") === 0) {
				console.log(pasteItem);
				const blob = pasteItem.getAsFile();
				const reader = new FileReader();

				let newTile = false;
				if (pointerInWindow.get()) {
					// Hovering over a null tile that matches the clipboard's tile type?
					if (tileHoveringId.get()) {
						const hoveredTile = getTileForId(tileHoveringId.get());
						if (hoveredTile && hoveredTile.isNull && TILES.IMAGE.name === hoveredTile.type) {
							newTile = hoveredTile;
						}
					}
					// Is the selected tile null
					if (selectedTile && selectedTile.isNull && TILES.IMAGE.name === selectedTile.type) {
						newTile = selectedTile;
					}
					if (!newTile) {
						const info = getRowAndSideForXY();
						const clipboardTile = getNewImageTile();
						newTile = pasteFromClipboardToNearestPosition(clipboardTile, info);
					}
				} else {
					// mouse isn't in the window,
					// append new tile to the page
					newTile = addImageTileFromClipboard();
				}
				if (newTile) scrollTileIntoView(newTile);
				reader.onload = function (event) {
					const image = event.target.result;
					updateImageTileWithImage(newTile, image);
				};
				reader.readAsDataURL(blob);
			}

			// Is it text?
			if (pasteItem.type.indexOf("text") === 0) {
				//console.log(pasteItem, pointerInWindow.get());
				pasteItem.getAsString(s => {
					// Generate tile data from clipboard data
					const tileFromClipboard = JSON.parse(s);
					if (tileFromClipboard) {
						let newTile = false;						
						if (pointerInWindow.get()) {
							/*
							// Hovering over a null tile that matches the clipboard's tile type?
							if (tileHoveringId.get()) {
								const hoveredTile = getTileForId(tileHoveringId.get());
								if (hoveredTile && hoveredTile.isNull && tileFromClipboard.type === hoveredTile.type) {
									replaceTileWithClipboardTile(hoveredTile, tileFromClipboard);
									return false;
								}
							}
							// Is the selected tile null
							if (selectedTile && selectedTile.isNull && tileFromClipboard.type === selectedTile.type) {
								replaceTileWithClipboardTile(selectedTile, tileFromClipboard);
								return false;
							}
							const info = getRowAndSideForXY();
							newTile = pasteFromClipboardToNearestPosition(tileFromClipboard, info);
							*/
							newTile = pasteTile(tileFromClipboard);
						} else {
							// mouse isn't in the window,
							// append new tile to the page
							newTile = pasteTile(tileFromClipboard);
						}

						if (newTile) scrollTileIntoView(newTile);
					}


				});
			}

			
		};

		const onCopy = pasteEvent => {
			console.log("system copy event!");
			if (selectedTile) {
				copyTile(selectedTile);
			}
		};
		const onCut = pasteEvent => {
			console.log("system cut event!");
			if (selectedTile) {
				cutTile(selectedTile);
			}
		};

		//document.addEventListener("paste", onPaste);
		//document.addEventListener("copy", onCopy);
		//document.addEventListener("cut", onCut);
		
		return () => {
			//document.removeEventListener("paste", onPaste);
			//document.removeEventListener("copy", onCopy);
			//document.removeEventListener("cut", onCut);
		};

	});

	return (
		<ClipboardContext.Provider
			value={{
				
			}}
		>
			{children}
		</ClipboardContext.Provider>
	);
};

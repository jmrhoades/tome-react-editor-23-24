import React from "react";
import { uniqueId } from "lodash";

import { ResetStyles } from "../ds/styles/Reset";
import { containerSize, contentAlign, contentDistribute } from "./TileData";
import { createNewPageData } from "./layouts/addPageTemplates";

export const ContentDirection = {
	vertical: "vertical",
	horizontal: "horizontal",
};

export const TomeContext = React.createContext();
export const TomeProvider = ({ tome, children }) => {
	const [tomeData, setTomeData] = React.useState(tome);
	const undoStack = React.useRef([]);
	const clipboard = React.useRef([]);

	const saveState = () => {
		setTomeData({ ...tomeData });
		console.log("Save state / re-render", tomeData);
	};

	const addToEditStack = () => {
		undoStack.current.push(JSON.stringify(tomeData));
	};

	const undo = () => {
		if (undoStack.current.length > 0) {
			const state = undoStack.current.pop();
			const data = JSON.parse(state);
			setTomeData({ ...data });
		}
	};

	const undoEmpty = () => {
		return undoStack.current.length === 0 ? true : false;
	};

	const clipboardEmpty = () => {
		return clipboard.current.length === 0 ? true : false;
	};

	const addToClipboard = tile => {
		// create new tile object
		const newTile = JSON.parse(JSON.stringify(tile));
		// give it a new id
		newTileIds(newTile);
		// add to clipbpoard
		clipboard.current.push(JSON.stringify(newTile));
	};

	const clearClipboard = () => {
		clipboard.current = [];
	};

	const cutTile = tile => {
		addToClipboard(tile);
		deleteTile(tile);
	};

	const copyTile = tile => {
		addToClipboard(tile);
	};

	const pasteAfterTile = tile => {
		//console.log("pasteAfterTile", tile.id)
		addToEditStack();
		const parent = findTileById(tile.parentId);
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(t => {
			t.selected = false;
		});
		if (parent && parent.tiles) {
			clipboard.current.forEach((t, i) => {
				const data = JSON.parse(t);
				newTileIds(data);
				data.selected = i === clipboard.current.length - 1;
				parent.tiles.splice(parent.tiles.indexOf(tile) + 1, 0, data);
			});
		}
		saveState();
	};

	const pasteIntoTile = tile => {
		console.log("pasteIntoTile", tile.id);
		addToEditStack();
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(t => {
			t.selected = false;
		});
		clipboard.current.forEach((t, i) => {
			const data = JSON.parse(t);
			newTileIds(data);
			data.selected = i === clipboard.current.length - 1;
			tile.tiles.splice(tile.tiles.length, 0, data);
		});

		saveState();
	};

	const setPageTheme = (page, theme) => {
		addToEditStack();
		page.theme = theme;
		saveState();
	};

	const setTileAspectRatio = (tile, o) => {
		tile.layout.aspectRatio.value = o.value;
		tile.layout.aspectRatio.label = o.label;
		tile.layout.contentSize.height = tile.layout.contentSize.width * (1 / tile.layout.aspectRatio.value);
		saveState();
	};

	const setTileAspectRatioLock = (tile, o) => {
		addToEditStack();
		console.log("setTileAspectRatioLock", o);
		tile.layout.aspectRatioLock = o;
		saveState();
	};

	const setTileAspectRatioScale = (tile, o) => {
		addToEditStack();
		console.log("setTileAspectRatioScale", o);
		tile.layout.aspectRatioScale = o;
		saveState();
	};

	const setTileLayoutScaleContent = (tile, o) => {
		addToEditStack();
		console.log("setTileScaleContent", o);
		tile.layout.scaleContent = o;
		saveState();
	};

	const setTileContentScale = (tile, o) => {
		addToEditStack();
		console.log("setTileContentScale", o);
		tile.layout.contentScale = o;
		saveState();
	};

	const setTileMargin = (tile, axis, v) => {
		tile.layout.margin[axis] = v;
		saveState();
	};

	const setTilePadding = (tile, v) => {
		addToEditStack();

		if (v && v !== "" && parseInt(v)) {
			tile.layout.padding.x = parseInt(v);
			tile.layout.padding.y = parseInt(v);
		} else {
			tile.layout.padding.x = 0;
			tile.layout.padding.y = 0;
		}

		saveState();
	};

	const setTilePaddingX = (tile, v) => {
		//addToEditStack();

		if (v && v !== "" && parseInt(v)) {
			tile.layout.padding.left = parseInt(v);
			tile.layout.padding.right = parseInt(v);
			console.log(v);
		} else {
			tile.layout.padding.left = 0;
			tile.layout.padding.right = 0;
		}
		saveState();
	};

	const setTilePaddingY = (tile, v) => {
		//addToEditStack();
		if (v && v !== "" && parseInt(v)) {
			tile.layout.padding.top = parseInt(v);
			tile.layout.padding.bottom = parseInt(v);
		} else {
			tile.layout.padding.top = 0;
			tile.layout.padding.bottom = 0;
		}
		saveState();
	};

	const setTileCentering = (tile, v) => {
		tile.layout.centered = v;
		saveState();
	};

	const setTileGap = (tile, v) => {
		if (v && v !== "" && parseInt(v)) {
			tile.layout.gap = v;
		} else {
			tile.layout.gap = 0;
		}
		saveState();
	};

	const setTileBorderRadius = (tile, v) => {
		if (v && v !== "" && parseInt(v)) {
			tile.layout.borderRadius = v;
		} else {
			tile.layout.borderRadius = 0;
		}
		saveState();
	};

	const setTileBackgroundColor = (tile, v) => {
		tile.theme.tokens["backgroundColor"] = v;
		saveState();
	};

	const setTileScrolling = (tile, v) => {
		tile.layout.scrolling = v;
		saveState();
	};

	const setTileFontSize = (tile, v) => {
		tile.theme.tokens["--font-size"] = v + "px";
		saveState();
	};

	const setTileMinSize = (tile, v) => {
		tile.layout.minSize = v;
		saveState();
	};

	const setTileAutoZoom = (tile, v) => {
		addToEditStack();
		tile.layout.autoZoom = v;
		saveState();
	};

	/*
	const setImageWidth = (tile, v) => {
		addToEditStack();
		tile.layout.contentSize.width = v;
		tile.layout.contentSize.height = v * (1 / tile.layout.aspectRatio.value);
		saveState();
	};

	const setImageHeight = (tile, v) => {
		addToEditStack();
		tile.layout.contentSize.height = v;
		tile.layout.contentSize.width = v * tile.layout.aspectRatio.value;
		saveState();
	};
	*/

	const setPagePadding = (tile, v) => {
		addToEditStack();
		tile.layout.padding.x = v;
		tile.layout.padding.y = v;
		saveState();
	};

	const setTileWidthType = (tile, v) => {
		addToEditStack();
		tile.layout.width.type = v;
		/*
		if (w === "fixed") {
			const el = document.getElementById(tile.id);
			const rect = el.getBoundingClientRect();
			w = rect.width + "px";
		}
		*/
		saveState();
	};

	const setTileHeightType = (tile, v) => {
		addToEditStack();
		tile.layout.height.type = v;
		/*
		if (w === "fixed") {
			const el = document.getElementById(tile.id);
			const rect = el.getBoundingClientRect();
			w = rect.width + "px";
		}
		*/
		saveState();
	};

	const setTileWidthValue = (tile, v) => {
		addToEditStack();

		if (v && v !== "" && parseInt(v)) {
			tile.layout.width.type = containerSize.CUSTOM;
			tile.layout.width.value = v;
		} else {
			tile.layout.width.type = containerSize.FILL;
			tile.layout.width.value = 0;
		}
		saveState();
	};

	const setTileHeightValue = (tile, v) => {
		addToEditStack();

		if (v && v !== "" && parseInt(v)) {
			tile.layout.height.type = containerSize.CUSTOM;
			tile.layout.height.value = v;
		} else {
			tile.layout.height.type = containerSize.FILL;
			tile.layout.height.value = 0;
		}
		saveState();
	};

	const setTileLayoutType = (tile, v) => {
		addToEditStack();
		tile.layout.type = v;
		saveState();
	};

	const setContentAlignX = (tile, v) => {
		addToEditStack();
		tile.layout.alignX = v;
		saveState();
	};

	const setContentAlignY = (tile, v) => {
		addToEditStack();
		tile.layout.alignY = v;
		saveState();
	};


	const setMediaContentSize = (tile, v) => {
		addToEditStack();
		tile.content.size = v;
		saveState();
	};

	

	const setContentAlignment = (tile, v) => {
		addToEditStack();
		if (v === "start-start") {
			tile.layout.alignX = contentAlign.START;
			tile.layout.alignY = contentAlign.START;
		}
		if (v === "center-start") {
			tile.layout.alignX = contentAlign.CENTER;
			tile.layout.alignY = contentAlign.START;
		}
		if (v === "end-start") {
			tile.layout.alignX = contentAlign.END;
			tile.layout.alignY = contentAlign.START;
		}

		if (v === "start-center") {
			tile.layout.alignX = contentAlign.START;
			tile.layout.alignY = contentAlign.CENTER;
		}
		if (v === "center-center") {
			tile.layout.alignX = contentAlign.CENTER;
			tile.layout.alignY = contentAlign.CENTER;
		}
		if (v === "end-center") {
			tile.layout.alignX = contentAlign.END;
			tile.layout.alignY = contentAlign.CENTER;
		}

		if (v === "start-end") {
			tile.layout.alignX = contentAlign.START;
			tile.layout.alignY = contentAlign.END;
		}
		if (v === "center-end") {
			tile.layout.alignX = contentAlign.CENTER;
			tile.layout.alignY = contentAlign.END;
		}
		if (v === "end-end") {
			tile.layout.alignX = contentAlign.END;
			tile.layout.alignY = contentAlign.END;
		}
		saveState();
	};

	const setContentDistribute = (tile, v) => {
		addToEditStack();
		if (v === contentDistribute.NONE) {
			tile.layout.distribute = contentDistribute.NONE;
		}
		if (v === contentDistribute.SPACE_BETWEEN) {
			tile.layout.distribute = contentDistribute.SPACE_BETWEEN;
		}
		saveState();
	};

	const setContentWrap = (tile, v) => {
		addToEditStack();
		tile.layout.wrap = v;
		saveState();
	};

	const setContentDirection = (tile, v) => {
		addToEditStack();
		tile.layout.direction = v;
		saveState();
	};

	const setContainerBackgroundType = (tile, v) => {
		addToEditStack();
		tile.background.type = v;
		saveState();
	};

	const deleteEmptyContainers = tile => {
		if (tile.tiles.length === 0 && tile.type === "FLEX") {
			// Remove the FLEX container if it will have no children (empty group) after the tile delete
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent && parent.tiles) {
					parent.tiles.splice(parent.tiles.indexOf(tile), 1);
				}
				// console.log("deleteEmptyContainers:", tile.tiles.length, tile.type, tile.parentId, parent.tiles);
			}
		}
	};

	const deleteTile = tile => {
		console.log("deleteTile:", tile);

		if (tile.parentId) {
			const parent = findTileById(tile.parentId);
			if (parent && parent.tiles) {
				parent.tiles.splice(parent.tiles.indexOf(tile), 1);
				deleteEmptyContainers(parent);
			}
		}

		// state is saved from delete selection code
	};

	const duplicateTile = tile => {
		const rootContainer = getCurrentPage().tiles[0];
		if (rootContainer.id === tile.id) {
			console.error("Can't duplicate root tile");
			return false;
		}
		// find parent
		const parent = findTileById(tile.parentId);
		// create new tile object
		const newTile = JSON.parse(JSON.stringify(tile));
		// give it a new id
		newTileIds(newTile);
		// add to new tile parent tile
		parent.tiles.splice(parent.tiles.indexOf(tile) + 1, 0, newTile);
		// deselect old tile
		tile.selected = false;

		return tile;
	};

	const newTileIds = newTile => {
		// give it a new id
		newTile.id = uniqueId("tile_duplicated_");
		// create new ids for all child tiles
		if (newTile.tiles && newTile.tiles.length > 0) {
			const reIdTiles = (ts, pId) => {
				ts.forEach(t => {
					t.parentId = pId;
					t.id = uniqueId("tile_duplicated_");
					if (t.tiles && t.tiles.length > 0) {
						reIdTiles(t.tiles, t.id);
					}
				});
			};
			reIdTiles(newTile.tiles, newTile.id);
		}
	};

	const findTilesByKeyValue = (key, value) => {
		let tiles = [];
		const findTiles = (root, key, value) => {
			//console.log(root.id);
			root.tiles.forEach(t => {
				//console.log(t.id);
				if (t[key] === value) {
					//console.log("match");
					tiles.push(t);
					//return t;
				}
				if (t.tiles && t.tiles.length > 0) {
					findTiles(t, key, value);
				}
			});
		};
		findTiles(getCurrentPage(), key, value);
		//console.log("findTilesByKeyValue", tiles.length);
		return tiles;
	};

	const findTileById = id => {
		return findTilesByKeyValue("id", id)[0];
	};

	const getTiles = () => {
		const tiles = [];
		const addTilesToArray = (list, array) => {
			list.forEach(o => {
				array.push(o);
				if (o.tiles && o.tiles.length > 0) {
					addTilesToArray(o.tiles, array);
				}
			});
		};
		addTilesToArray(getCurrentPage().tiles, tiles);
		return tiles;
	};

	const getCurrentPage = () => {
		let selectedPage = tomeData.tiles[0];
		tomeData.tiles.forEach(tile => {
			if (tile.selected) selectedPage = tile;
		});
		return selectedPage;
	};

	const setCurrentPage = page => {
		// deselect any tiles
		tomeData.tiles.forEach(tile => {
			tile.selected = undefined;
		});
		page.selected = true;
		saveState();
	};

	const incrementPage = increment => {
		const currentIndex = tomeData.tiles.indexOf(getCurrentPage());
		const nextIndex = currentIndex + increment;
		if (increment > 0 && nextIndex > tomeData.tiles.length - 1) {
			setCurrentPage(tomeData.tiles[0]);
		} else if (increment < 0 && nextIndex < 0) {
			setCurrentPage(tomeData.tiles[tomeData.tiles.length - 1]);
		} else {
			setCurrentPage(tomeData.tiles[nextIndex]);
		}
	};

	const getTileParentDirection = tile => {
		if (tile.parentId) {
			const parent = findTileById(tile.parentId);
			if (parent && parent.layout && parent.layout.direction) {
				return parent.layout.direction;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	};

	const findTileAncestorBackgroundColor = tile => {
		let backgroundColor = undefined;

		const findParent = tile => {
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					backgroundColor = parent.theme.tokens["backgroundColor"];
					if (backgroundColor === undefined) findParent(parent);
				}
			}
		};
		findParent(tile);

		return backgroundColor;
	};

	const findTileDepth = tile => {
		let depth = 0;

		const findParent = tile => {
			if (tile && tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					depth++;
					findParent(parent);
				}
			}
		};

		findParent(tile);
		return depth;
	};

	const isIdDescendantOfId = (id, tileId) => {
		let isDescendant = false;
		const findDescendant = parentId => {
			const tile = findTileById(parentId);
			if (tile.tiles) {
				tile.tiles.forEach(t => {
					if (t.id === id) {
						isDescendant = true;
					} else {
						if (t.tiles) {
							findDescendant(t.id);
						}
					}
				});
			}
		};
		findDescendant(tileId);

		return isDescendant;
	};

	const addPage = pageId => {
		console.log("addPage", pageId);
		const currentPage = getCurrentPage();
		const page = createNewPageData(pageId, currentPage);
		page.parentId = tomeData.id;
		tomeData.tiles.splice(tomeData.tiles.indexOf(currentPage) + 1, 0, page);
		setCurrentPage(page);

		// Select root's first tile
		page.tiles[0].tiles[0].selected = true;
		saveState();
	};

	const setPageBackgroundVisibility = value => {
		console.log("setPageBackgroundVisibility", value);
		tomeData.editor.background = value;
		saveState();
	};

	return (
		<TomeContext.Provider
			value={{
				tomeData,
				saveState,
				undo,
				addToEditStack,
				undoEmpty,

				findTileById,
				findTilesByKeyValue,
				getTiles,
				getTileParentDirection,
				findTileAncestorBackgroundColor,
				findTileDepth,
				isIdDescendantOfId,

				getCurrentPage,
				setCurrentPage,
				incrementPage,

				deleteTile,
				duplicateTile,

				clipboardEmpty,
				clearClipboard,
				cutTile,
				copyTile,
				pasteAfterTile,
				pasteIntoTile,

				deleteEmptyContainers,

				setPageBackgroundVisibility,

				setPageTheme,

				setTileAspectRatio,
				setTileAspectRatioLock,
				setTileAspectRatioScale,
				setTileMargin,
				setTileCentering,
				setTileGap,
				setTileBorderRadius,
				setTileBackgroundColor,
				setTileScrolling,
				setTileFontSize,
				setTileMinSize,
				setTileAutoZoom,
				setTileContentScale,

				setTileWidthType,
				setTileWidthValue,
				setTileHeightType,
				setTileHeightValue,

				setTilePadding,
				setTilePaddingX,
				setTilePaddingY,
				setPagePadding,

				setContentAlignment,
				setContentAlignX,
				setContentAlignY,
				setContentDistribute,
				setContentDirection,
				setContentWrap,

				setContainerBackgroundType,

				setTileLayoutType,
				setTileLayoutScaleContent,

				setMediaContentSize,

				addPage,
			}}
		>
			<ResetStyles />
			{children}
		</TomeContext.Provider>
	);
};

export const RGBToHex = rgb => {
	// Choose correct separator
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	// Turn "rgb(r,g,b)" into [r,g,b]
	rgb = rgb.substr(4).split(")")[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length === 1) r = "0" + r;
	if (g.length === 1) g = "0" + g;
	if (b.length === 1) b = "0" + b;

	return "#" + r + g + b;
};

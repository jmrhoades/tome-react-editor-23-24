import React from "react";
import { useMotionValue } from "framer-motion";

import { TomeContext } from "./TomeContext";
import { MetricsContext, metricConstants } from "./MetricsContext";
import { createTileData, createFrameData } from "./TomeData";

export const LayoutContext = React.createContext();
export const LayoutProvider = ({ children }) => {
	const { tomeData, currentPage, saveState, selectTile, selectedTile } = React.useContext(TomeContext);
	const { metrics, scrollTileIntoView, getPageFrameRect } = React.useContext(MetricsContext);

	const xUnitsMax = metricConstants.cRowCount;
	const yUnitsMax = metricConstants.cColumnCount;

	const CLICK_ADD_MAX_TILES_PER_FRAME = 4;
	const CLICK_ADD_MIN_PAGE_FRAME_HEIGHT = 3;

	/*
	APPEND A NEW FRAME TO THE END OF PAGE
	*/

	const appendNewFrameToPage = () => {
		// Find all page-level frames that belong to this page
		const frames = tomeData.frames.filter(f => f.pageId === currentPage.id);

		// Sort by order
		frames.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Pick the last one
		const lastFrame = frames[frames.length - 1];

		const frame = createFrameData();
		frame.pageId = currentPage.id;
		frame.order = lastFrame.order + 1;

		tomeData.frames.push(frame);

		return frame;
	};

	/*
	INSERT TILE ORDER IN FRAME
	*/

	const insertTileOrderInFrameId = (frameId, insertOrder) => {
		// Find all tiles within the frame
		const tiles = tomeData.tiles.filter(t => t.frameId === frameId);

		// Sort tiles by order
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Update and orders that are equal or greater than insertOrder
		tiles.forEach((t, i) => {
			if (t.order >= insertOrder) t.order += 1;
		});
	};

	/*
	FIND NEXT ORDER NUMBER IN FRAME
	*/

	const findNextTileOrderInFrame = frame => {
		// Find all tiles within the frame
		const tiles = tomeData.tiles.filter(t => t.frameId === frame.id);
		// Set default order
		let nextOrder = 1;
		// Check if there's any tiles in the frame
		if (tiles.length > 0) {
			// Sort tiles by order
			tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

			// Pick the last one
			const tile = tiles[tiles.length - 1];

			// Return the order + 1
			nextOrder = tile.order + 1;
			console.log("findNextOrderInFrame: ", "nextOrder", nextOrder);
		}

		return nextOrder;
	};

	/*
	FIND AVAILABLE PAGE-LEVEL FRAME OR MAKE ONE
	*/

	const findFirstAvailablePageFrame = () => {
		// Find all page-level frames that belong to this page
		const frames = tomeData.frames.filter(f => f.pageId === currentPage.id);

		// Sort by order
		frames.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Pick the last one
		let frame = frames[frames.length - 1];

		// Choose the selected tile frame
		if (selectedTile) {
			frame = tomeData.frames.find(f => f.id === selectedTile.frameId);
		}

		// Find all tiles within the frame
		const tiles = tomeData.tiles.filter(t => t.frameId === frame.id);

		// Count tiles
		const count = tiles.length;

		// Check if there's room in the frame
		if (count >= CLICK_ADD_MAX_TILES_PER_FRAME) {
			// Create a new frame
			frame = appendNewFrameToPage();
			// Distribute frames in page
			distributeFramesInPage();
		}

		//console.log("findFirstAvailablePageFrame", "frame id:", frame.id, "frame order:", frame.order);
		// Return frame data
		return frame;
	};

	/*
	DISTRIBUTE PAGE FRAMES INSIDE OF PAGE
	- Adjust size and positions of all page frames to fill page
	*/

	const distributeFramesInPage = () => {
		// Find all page-level frames that belong to this page
		const frames = tomeData.frames.filter(f => f.pageId === currentPage.id);

		// Sort by order
		frames.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Number of tiles in frame
		const count = frames.length;

		// Keep track of new X, based on order
		let newY = 0;

		let newHeight = yUnitsMax / count;
		if (newHeight < CLICK_ADD_MIN_PAGE_FRAME_HEIGHT) {
			newHeight = CLICK_ADD_MIN_PAGE_FRAME_HEIGHT;
		}

		// Loop through each tile in frame
		frames.forEach(frame => {
			console.log(newY);

			// Find y of current frame
			frame.y = frame.order > 1 ? newY : 0;

			// Find new height of current frame
			frame.height = newHeight;

			// Find next y position
			newY = frame.y + frame.height;

			// Find all tiles that belong to this frame
			const tiles = tomeData.tiles.filter(o => o.frameId === frame.id);

			// Loop through each tile in frame
			tiles.forEach(tile => {
				if (frame.contentDirection === "row") {
					// Always set height to frame height when "row"
					tile.height = frame.height;
				}
			});
		});
	};

	/*
	DISTRIBUTE TILES INSIDE OF FRAME
	- Adjust size and positions of tiles to fill frame
	- Assumes tiles are in content order
	*/

	const distributeTilesInFrame = frame => {
		// Find all tiles that belong to this frame
		const tiles = tomeData.tiles.filter(o => o.frameId === frame.id);

		// Sort by order
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Number of tiles in frame
		const count = tiles.length;

		// Keep track of new X, based on order
		let newX = 0;

		// Loop through each tile in frame
		tiles.forEach(tile => {
			// Layout side-to-side, horizontally distributed
			if (frame.contentDirection === "row") {
				// Always set y to 0 when "row"
				tile.y = 0;

				// Always set height to frame height when "row"
				tile.height = frame.height;

				// Find x of current tile
				tile.x = tile.order > 1 ? newX : 0;

				// Find width of current tile
				tile.width = xUnitsMax / count;

				// Find next x position
				newX = tile.x + tile.width;
			}
		});
	};

	/*
	CLICK-ADD TILES
	*/

	const clickAddTile = tileType => {
		const frame = findFirstAvailablePageFrame();

		// Make tile data
		const tile = createTileData(tileType);

		// Add a special animation flag
		tile.showClickCreateAnimation = true;

		// Set tile's page id
		tile.pageId = currentPage.id;

		// Set tile's frame id
		tile.frameId = frame.id;

		// Find tile's order within the frame
		if (selectedTile) {
			tile.order = selectedTile.order + 1;
			insertTileOrderInFrameId(selectedTile.frameId, tile.order);
		} else {
			tile.order = findNextTileOrderInFrame(frame);
		}

		// Add new tile to tome data
		tomeData.tiles.push(tile);

		// Assume page-level frame for now
		distributeTilesInFrame(frame);

		// Save state
		saveState();

		// Select the new tile
		selectTile(tile);

		// Scroll tile into view if need be
		// setTimeout(()=>scrollTileIntoView(tile), 100);

		return tile;
	};

	/*
	DUPLICATE TILE
	*/
	const duplicateTile = tile => {
		clickAddTile(tile.type);

		// Save state
		//saveState();
	};

	/*
	DELETE FRAME
	*/
	const deleteFrame = frame => {
		const deletedOrder = frame.order;

		// Remove the frame if there's no tiles in it
		tomeData.frames.splice(tomeData.frames.indexOf(frame), 1);

		// Find remaining frames
		const frames = tomeData.frames.filter(f => f.pageId === currentPage.id);

		// Sort frames by order
		frames.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Update orders that are equal or greater than deletedOrder
		frames.forEach((t, i) => {
			if (t.order >= deletedOrder) t.order -= 1;
		});

		// Redistribute the remaining frames
		distributeFramesInPage();
	};

	/*
	DELETE TILE
	*/
	const deleteTile = tile => {
		// Don't delete the last tile on the page
		const pageTiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id;
		});
		if (pageTiles.length === 1) return false;

		// Find the frame the tile is in
		const frame = tomeData.frames.find(f => f.id === tile.frameId);

		// Find the tile's index
		const index = tomeData.tiles.indexOf(tile);

		console.log("deleteTile", frame, index);

		// Remove the tile from the tome data
		tomeData.tiles.splice(index, 1);

		// Find other tiles that belong to the same frame
		const otherTiles = tomeData.tiles.filter(o => o.frameId === frame.id);

		// If the frame is now empty, delete it
		if (otherTiles.length === 0) {
			deleteFrame(frame);
		} else {
			// Redistribute the remaining tiles
			distributeTilesInFrame(frame);
		}

		// Save state
		saveState();
	};

	const moveTileToFrame = tile => {
		// Find the frame the tile is in
		const oldFrame = tomeData.frames.find(f => f.id === tile.frameId);
		// Find other tiles that belong to the same frame
		const tilesInOldFrame = tomeData.tiles.filter(o => o.frameId === tile.frameId).length;

		const newFrame = tomeData.frames[0];
		const order = 1;

		insertTileOrderInFrameId(newFrame.id, order);

		tile.order = order;
		tile.frameId = tomeData.frames[0].id;

		distributeTilesInFrame(newFrame);

		if (tilesInOldFrame === 1) {
			deleteFrame(oldFrame);
		}

		// Save state
		saveState();
	};

	const cacheDropRects = () => {
		// FIRST-LEVEL
		// Page-level frames

		// Find all root-level frames
		const pageFrames = tomeData.frames.filter(o => o.pageId === currentPage.id);

		//
		pageFrames.forEach((o, i) => {
			// Outide the frame drop zones

			console.log(o, getPageFrameRect(o));
		});
	};

	return (
		<LayoutContext.Provider
			value={{
				//resizeTile,
				clickAddTile,
				duplicateTile,
				deleteTile,
				moveTileToFrame,
				cacheDropRects,
			}}
		>
			{children}
		</LayoutContext.Provider>
	);
};

/*
	const setTileHeight = (tile, height) => {
		const row = getTileRow(tile);
		const tiles = getTilesInRow(tile);
		let save = false;
		if (height < 1) height = 1;

		// old tile height
		if (tile.height !== height) {
			console.log("setTileHeight: ", tile.height, height);
			tile.height = height;
			save = true;
		}

		// Find tallest tile
		const tallestHeight = tiles.sort((a, b) => (a.height < b.height ? 1 : -1))[0].height;

		// Row must be height of tallest tile
		row.height = tallestHeight;

		//if (row.height < tallestHeight) {
		//row.height = tallestHeight;
		//save = true;
		//}

		if (save) saveState();
	};


	const setTileWidth = (tile, width) => {
		const row = getTileRow(tile);
		const tiles = getTilesInRow(tile);
		let save = false;
		if (width < 1) width = 1;
		if (width > 12) width = 12;

		// update width
		if (tile.width && tile.width !== width) {
			tile.width = width;
			save = true;
		}

		if (save) saveState();
	};

	const setTileX = (tile, x) => {
		const row = getTileRow(tile);
		const tiles = getTilesInRow(tile);
		let save = false;
		if (x < 1) x = 1;
		if (x > 12) x = 12;
		if (tile.x !== x) {
			tile.x = x;
			save = true;
		}

		if (save) saveState();
	};

	const adjustTileSizes = tile => {
		let save = false;
		const row = getTileRow(tile);
		const tiles = getTilesInRow(tile);
        if (tiles.length === 1) return;
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
        const index = tiles.indexOf(tile);

        // Check adjecnt tile
        const rightTile = tiles[index + 1];
        if (rightTile && tile.x + tile.width > rightTile.x) {
            rightTile.width -= tile.x + tile.width - rightTile.x;
            rightTile.x = tile.x + tile.width;
            save = true;
        }
        const leftTile = tiles[index - 1];
        if (leftTile && tile.x < leftTile.x + leftTile.width) {
            leftTile.width -= leftTile.x + leftTile.width - tile.x;
            save = true;
        }

		if (save) saveState();
	};

	const resizeTile = (tile, side, dx, dy, cachedTileHeight, cachedTileWidth, cachedTileX) => {
		console.log("LayoutProvider resizeTile: ", side, cachedTileHeight);

		let thresholdY = rowHeight + rowMargin;
		let unitsYChanged = Math.round(dy / thresholdY);

		let thresholdX = columnWidth + columnGutter;
		let unitsXChanged = Math.round(dx / thresholdX);

		if (side === "bottom" || side === "se") {
			const newHeight = cachedTileHeight + unitsYChanged;
			setTileHeight(tile, newHeight);
		}

		if (side === "right" || side === "se") {
			const newWidth = cachedTileWidth + unitsXChanged;
			setTileWidth(tile, newWidth);
		}

		if (side === "left") {
			const newX = cachedTileX + unitsXChanged;
			setTileX(tile, newX);

			const newWidth = cachedTileWidth - unitsXChanged;
			setTileWidth(tile, newWidth);
		}

		adjustTileSizes(tile);

		// console.log("resizeTile: ", side, newHeight, unitsYChanged, unitsXChanged);
	};
	*/

const tome = {
	content: [
		{
			type: "page",
			order: 1,
			contentDirection: "row",
			content: [
				{
					type: "group",
					contentDirection: "column",
					order: 1,
					size: 1,
					content: [
						{
							type: "group",
							contentDirection: "row",
							order: 1,
							size: 0.5,
							content: [
								{
									type: "tile",
									order: 1,
									size: 0.5,
								},
								{
									type: "tile",
									order: 2,
									size: 0.5,
								},
							],
						},
						{
							type: "tile",
							order: 2,
							size: 0.5,
						},
					],
				},
			],
		},
	],
};

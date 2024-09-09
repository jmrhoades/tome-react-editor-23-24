import { uniqueId, random } from "lodash";
import { motionValue } from "framer-motion";

import { Themes } from "../themes/Themes";
import { layoutDefaults, layout } from "../layout/LayoutDefaults";

export const makeRandomTomeData = () => {
	let tome = null;
	let page = null;
	let tile = null;
	let root = null;
	let parent = null;

	tome = createTomeData("untitledTome", "Untitled tome");

	page = createPageData();
	page.theme = Themes[0];
	tome.pages.push(page);

	root = createTileData(page);
	root.layout = layout.ROW;
	page.root = root;
	parent = root;

	const count1 = random(1, 3);
	const count2 = random(1, 4);
	const count3 = random(1, 4);
	const count4 = random(1, 4);
	const layouts = [layout.COLUMN, layout.ROW];
	for (let a = 0; a < count1; a++) {
		const tileA = createTileData();
		tileA.parent = parent;
		parent.tiles.push(tileA);
		tileA.layout = layouts[random(0, 1)];
		for (let b = 0; b < count2; b++) {
			const tileB = createTileData();
			tileB.parent = tileA;
			tileA.tiles.push(tileB);
			tileB.layout = layouts[random(0, 1)];
			for (let c = 0; c < count3; c++) {
				const tileC = createTileData();
				tileC.parent = tileB;
				tileB.tiles.push(tileC);
				tileC.layout = layouts[random(0, 1)];
				for (let d = 0; d < count4; d++) {
					const tileD = createTileData();
					tileD.parent = tileC;
					tileC.tiles.push(tileD);
					tileD.layout = layouts[random(0, 1)];
				}
			}
		}
	}

	tile = createTileData();
	tile.parent = root;
	root.tiles.push(tile);

	return tome;
};

export const makeTestTome = () => {
	let tome = null;
	let page = null;
	let tile = null;
	let root = null;
	let parent = null;

	tome = createTomeData("untitledTome", "Untitled tome");

	page = createPageData();
	page.theme = Themes[0];
	tome.pages.push(page);

	root = createTileData(page);
	root.layout = layout.ROW;
	page.root = root;

	tile = createTileData();
	tile.parent = root;
	root.tiles.push(tile);

	tile = createTileData();
	tile.parent = root;
	root.tiles.push(tile);

	tile = createTileData();
	tile.parent = root;
	root.tiles.push(tile);
	tile.layout = layout.COLUMN;
	parent = tile;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);
	tile.layout = layout.ROW;
	parent = tile;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);
	parent = tile;
	tile.layout = layout.COLUMN;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);
	tile.layout = layout.ROW;
	parent = tile;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);
	tile.layout = layout.COLUMN;
	parent = tile;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);
	parent = tile;
	tile.layout = layout.ROW;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);
	parent = tile;
	tile.layout = layout.COLUMN;

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	tile = createTileData();
	tile.parent = parent;
	parent.tiles.push(tile);

	return tome;
};

export const createTomeData = (id, title) => {
	const tome = {
		id: id,
		title: title,
		pages: [],
	};
	return tome;
};

export const createPageData = () => {
	const page = {
		id: uniqueId("page_"),
		order: 1,
		root: null,
		tiles: [],
		layout: {
			marginX: motionValue(layoutDefaults.pageMarginX),
			marginY: motionValue(layoutDefaults.pageMarginY),
			gap: motionValue(layoutDefaults.gap),
			cornerRadius: motionValue(layoutDefaults.tileCornerRadius),
		},
	};
	return page;
};

export const createTileData = () => {
	const tile = {
		id: uniqueId("tile_"),
		order: 1,
		parent: null,
		tiles: [],
		layout: layout.ROW,
		startRect: {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		},
	};
	return tile;
};

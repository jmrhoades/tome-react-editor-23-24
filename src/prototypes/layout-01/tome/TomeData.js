import { uniqueId } from "lodash";
import { motionValue } from "framer-motion";

import { TILES, alignmentX, alignmentY, textStyles, tableTileType, panelNames } from "../tiles/TileConstants";
import { GRID_SIZE } from "../tiles/drawing/constants";
import { metricConstants } from "./MetricsContext";

export const createTomeData = (id, title) => {
	// Set up
	const tome = {
		id: id,
		title: title,
		pages: [],
		frames: [],
		tiles: [],
        dropRects: [],
		motion: {
			pageScale: motionValue(1),
		},
	};
	return tome;
};

export const createPageData = (tomes, id, title) => {
	const page = {
		id: uniqueId("page_"),
		order: 1,
		layout: {
			margins: true,
			marginValue: metricConstants.cPageMarginX,
			gaps: true,
			gapValue: metricConstants.cColumnGutter,
			corners: true,
			cornerValue: metricConstants.cTileCornerRadius,
		},
	};
	return page;
};

export const createFrameData = () => {
	const frame = {
		id: uniqueId("frame_"),

		pageId: null,
		frameId: null,

		order: 1,
		contentDirection: "row",

        x: 0,
        y: 0,
		width: 12,
		height: 12,
	};

	return frame;
};

export const createTileData = (tileType, theme) => {
	const tile = {
		id: uniqueId("tile_"),
		type: tileType,

		pageId: null,
		frameId: null,

		order: 0,

        x: 0,
        y: 0,
        width: 0,
		height: 0,

		params: {},
	};

	// Text tile specific
	if (tileType === TILES.TEXT.name) {
		tile.isNull = true;
		tile.params = {
			alignmentX: alignmentX.LEFT,
			alignmentY: alignmentY.TOP,
			blocks: [
				{
					id: uniqueId("block_h_"),
					type: textStyles.H2,
					content: "",
				},
			],
		};
	}

	// Drawing tile specific
	if (tileType === TILES.DRAWING.name) {
		tile.params = {
			layers: [],
			snap: false,
			showGrid: true,
			gridSize: GRID_SIZE,
			autozoom: true,
			zoom: 1,
		};
		tile.motion = {};
		tile.motion.zoom = motionValue(1);
	}

	return tile;
};

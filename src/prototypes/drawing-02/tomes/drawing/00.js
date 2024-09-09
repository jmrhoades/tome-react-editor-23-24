import { uniqueId } from "lodash";
import { TILES } from "../../tiles/TileConstants";
import { textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);
	
	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 12;

	/*
	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome,
		6
	);
	const shapeProgressRing = createShapeData(LayerMap.PROGRESS_RING.type, page.theme);
	tile.params.layers = [shapeProgressRing];
	*/

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome,
		12
	);
	const shapePictogram = createShapeData(LayerMap.PROGRESS_RING.type, page.theme);

	tile.params.layers = [shapePictogram];
	
	/*
	shapePictogram.params.meta.itemName = "Star";
	shapePictogram.motion.meta.itemName.set("Star");
	shapePictogram.params.meta.itemTotal = 1;
	shapePictogram.motion.meta.itemTotal.set(1);
	shapePictogram.params.meta.itemFill = 1;
	shapePictogram.motion.meta.itemFill.set(1);
	*/

	return page;
};

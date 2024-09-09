import { uniqueId } from "lodash";
import { TILES, textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 12;

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome,
		12
	);

	const shape5 = createShapeData(LayerMap.TEXT.type, page.theme);
	shape5.params.x = -194;
	shape5.params.y = 0;
	shape5.params.text.size = 92.22;
	shape5.params.text.content = "All hands";
	shape5.params.text.color = "#fdb71c";

	const shape6 = createShapeData(LayerMap.IMAGE.type, page.theme);
	shape6.params.x = 400;
	shape6.params.y = -240;
	shape6.params.width = 128;
	shape6.params.height = 24;
	shape6.params.media.src = "/logos/rippling-combo-mark-horizontal-dark-mode.svg";

	tile.params.layers = [shape5, shape6];

	return page;
};

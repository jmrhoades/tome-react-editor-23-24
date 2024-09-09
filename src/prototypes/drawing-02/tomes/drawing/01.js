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

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome,
		12
	);

	const shape1 = createShapeData(LayerMap.ELLIPSE.type, page.theme);
	shape1.params.x = -320;
	shape1.params.y = 70;
	shape1.params.width = 70;
	shape1.params.height = 70;
	shape1.params.fill.color = "transparent";
	shape1.params.line.color = "#339DFF";
	shape1.params.line.size = 2;
	shape1.params.text.content = "A+";
	shape1.params.text.size = 28;
	shape1.params.text.color = "#339DFF";

	const shape2 = createShapeData(LayerMap.ROUNDED_RECT.type, page.theme);
	shape2.params.x = 210;
	shape2.params.y = -120;
	shape2.params.width = 60;
	shape2.params.height = 60;
	shape2.params.fill.color = "transparent";
	shape2.params.line.color = "#FDDA4D";
	shape2.params.line.size = 2;
	//shape2.params.line.radius = 0;
	shape2.params.text.content = "👍";
	shape2.params.text.size = 24;
	shape2.params.text.color = "#FDDA4D";

	const shape3 = createShapeData(LayerMap.DIAMOND.type, page.theme);
	shape3.params.x = -200;
	shape3.params.y = -200;
	shape3.params.width = 100;
	shape3.params.height = 100;
	shape3.params.fill.color = "transparent";
	shape3.params.line.color = "#A77EFF";
	shape3.params.line.size = 2;

	const shape4 = createShapeData(LayerMap.TRIANGLE.type, page.theme);
	shape4.params.x = 180;
	shape4.params.y = 60;
	shape4.params.width = 100;
	shape4.params.height = shape4.params.width*.8;
	shape4.params.fill.color = "#A77EFF";
	
	const shape5 = createShapeData(LayerMap.TEXT.type, page.theme);
	shape5.params.x = -194;
	shape5.params.y = 0;
	shape5.params.text.size = 56;
	shape5.params.text.content = "Text layers";

	const shape6 = createShapeData(LayerMap.TEXT.type, page.theme);
	shape6.params.x = -40;
	shape6.params.y = -120;
	shape6.params.text.content = "Lines";
	shape6.params.text.size = 13;
	shape6.params.text.color = "#FFFFFF";
	
	const shape7 = createShapeData(LayerMap.LINE.type, page.theme);
	shape7.params.x = -20;
	shape7.params.y = -100;
	shape7.params.line.x2 = 100;
	shape7.params.line.y2 = 100;
	shape7.params.line.color = "#FFFFFF";
	//shape7.params.line.size = 1;

	const shape8 = createShapeData(LayerMap.TEXT.type, page.theme);
	shape8.params.x = -510;
	shape8.params.y = -200;
	shape8.params.text.content = "Shapes";
	shape8.params.text.size = 300;
	//shape8.params.text.color = "#171717";
	shape8.params.text.color = "hsla(0, 0%, 100%, 0.12)";

	const shape9 = createShapeData(LayerMap.TEXT.type, page.theme);
	shape9.params.x = 10;
	shape9.params.y = 60;
	shape9.params.text.content = "Resize me";
	shape9.params.text.size = 13;
	shape9.params.text.color = "#FDDA4D";

	tile.params.layers = [shape8, shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape9];

	return page;
};

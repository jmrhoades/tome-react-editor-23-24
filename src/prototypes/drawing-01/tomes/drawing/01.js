import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { drawingShapes } from "../../tiles/drawing/_constants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";

import { metricConstants } from "../../tome/MetricsContext";
//import { createTheme } from "../../tome/Themes";
import { Themes } from "../../tome/Themes";

import { createShapeData } from "../../tiles/drawing/_utilities";

// canonical width and height
const cW = metricConstants.cPageWidth;
const cH = metricConstants.cPageHeight;

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H1,
						content: "Canvas v1",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H3,
						content: "Cropping model",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Canvas origin is the center of the tile",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Content scales with the page width",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Content never changes size without explicit user action",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "To preserve tile dragging, edit mode requires a 2nd click or object selection",
							},
						],
					},
				],
			},
		},
		row,
		tome,
		5
	);

	const shape1 = createShapeData(drawingShapes.ELLIPSE.type);
	const shape2 = createShapeData(drawingShapes.ELLIPSE.type);

	//shape1.params.x = cW/2 - 100;
	//shape1.params.y = cH/2 - 100;

	shape1.params.width = 550;
	shape1.params.height = 550;
	shape1.params.fill.color = "#FFBA05"; //"#E99EC7";
	shape2.params.fill.color = "#000000"; //"#E99EC7";
	shape2.params.width = 400;
	shape2.params.height = 400;
	

	appendTileToRowInTome(
		{
			type: tileNames.DRAWING.name,
			params: {
				blocks: [shape1, shape2],
			},
		},
		row,
		tome,
		7
	);

	return page;
};

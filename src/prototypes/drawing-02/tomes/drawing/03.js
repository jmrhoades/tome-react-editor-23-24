import { uniqueId } from "lodash";
import { TILES, textStyles, alignmentX, alignmentY, tableTileType } from "../../tiles/TileConstants";
import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";

import { metricConstants } from "../../tome/MetricsContext";
//import { createTheme } from "../../tome/Themes";
import { Themes } from "../../tome/Themes";

import { syncLayerValues } from "../../tiles/drawing/utilities";

const TH = tableTileType.TH;
const TD = tableTileType.TD;

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
	row.height = 4;

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H2,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textStyles.SPAN,
								content: "SQUARE",
							},
							{
								id: uniqueId("block_ln"),
								type: textStyles.LINEBREAK,
							},
							{
								id: uniqueId("block_span"),
								type: textStyles.SPAN,
								content: "CIRCLE",
							},
							{
								id: uniqueId("block_ln"),
								type: textStyles.LINEBREAK,
							},
							{
								id: uniqueId("block_span"),
								type: textStyles.SPAN,
								content: "TRIANGLE",
							},
						],
					},
				],
			},
		},
		row,
		tome,
		8
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H2,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textStyles.SPAN,
								content: "BRUNO MUNARI",
								color: "#999",
							},
						],
					},
				],
			},
		},
		row,
		tome,
		4
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 9;

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome
	);

	const square2 = createShapeData(LayerMap.ROUNDED_RECT.type, page.theme);
	square2.params.width = tile.params.gridSize * 12;
	square2.params.height = tile.params.gridSize * 12;
	square2.params.x = -tile.params.gridSize * 29;
	square2.params.y = -square2.params.height / 2;
	square2.params.fill.color = "#FFBA05"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008, "transparent"
	//square2.params.line.color = "#FFBA05"; //"hsla(0, 0%, 100%, 0.75)", "#F839F6";
	//square2.params.line.weight = 3;
	//square2.params.text.content = "Square";
	//square2.params.text.color = "#000";
	syncLayerValues(square2);

	// const arrow1 = createShapeData(LayerMap.ARROW_RIGHT.type, tile.motion.zoom, tome.motion.pageScale);
	// arrow1.params.x = -210;
	// arrow1.params.fill.color = "#545454";
	// syncLayerValues(arrow1);

	const circle2 = createShapeData(LayerMap.ELLIPSE.type, page.theme);
	circle2.params.width = tile.params.gridSize * 13;
	circle2.params.height = tile.params.gridSize * 13;
	circle2.params.x = -circle2.params.width / 2;
	circle2.params.y = -circle2.params.height / 2;
	circle2.params.fill.color = "#FFBA05"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008
	//circle2.params.line.color = "#FFBA05"; //"hsla(0, 0%, 100%, 0.75)", "#339DFF";
	//circle2.params.line.weight = 3;
	//circle2.params.text.content = "Circle";
	//circle2.params.text.color = "#FFBA05";
	syncLayerValues(circle2);

	// const arrow2 = createShapeData(LayerMap.ARROW_RIGHT.type, tile.motion.zoom, tome.motion.pageScale);
	// arrow2.params.x = 160;
	// arrow2.params.fill.color = "#545454";
	// syncLayerValues(arrow2);

	const triangle2 = createShapeData(LayerMap.TRIANGLE.type, page.theme);
	triangle2.params.width = tile.params.gridSize * 14;
	triangle2.params.height = tile.params.gridSize * 12;
	triangle2.params.x = 250;
	triangle2.params.y = -triangle2.params.height / 2;
	triangle2.params.fill.color = "#FFBA05"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008
	//triangle2.params.line.color = "#FFBA05"; //"hsla(0, 0%, 100%, 0.75)";
	//triangle2.params.line.weight = 3;
	//triangle2.params.text.content = "Triangle";
	//triangle2.params.text.color = "#FFBA05";
	syncLayerValues(triangle2);

	tile.params.layers = [square2, circle2, triangle2];

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 6;

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				height12: 4,
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textStyles.CAPTION,
						content:
							"The square is as high and as wide as a man with arms outstretched. In the oldest writings and in the rock inscriptions of early man, it signifies the idea of enclosure, of home, of settlement. Enigmatic in its simplicity, in the monotonous repetition of four equal sides and four equal angles, it creates a series of interesting figures: a whole group of harmonic rectangles.",
					},
				],
			},
		},
		row,
		tome,
		12 / 3
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				height12: 4,
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textStyles.CAPTION,
						content:
							"While the square is closely linked to man and his constructions, to architecture, harmonious structures, writing, and so on, the circle is related to the divine: a simple circle has since ancient times represented eternity, since it has no beginning and no end. An ancient text says that God is a circle whose centre is everywhere but whose circumference is nowhere.",
					},
				],
			},
		},
		row,
		tome,
		12 / 3
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				height12: 4,
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textStyles.CAPTION,
						content:
							"The equilateral triangle is one of the three basic forms, along with the circle and square. It is the most stable form with its fixed structure of three equal sides and three equal angles. A full pattern of equilalteral triangles touching on a surface creates a structured field in which endless other combinatorial forms may be constructed. A tetrahedral structure gives overall formal balance. ",
					},
				],
			},
		},
		row,
		tome,
		12 / 3
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 5;

	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/bruno-munari/01.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		12 / 4
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/bruno-munari/03.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		12 / 4
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/bruno-munari/02a.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		12 / 4
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/bruno-munari/05.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		12 / 4
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 8;
	tile = appendTileToRowInTome(
		{
			type: TILES.TABLE.name,
			params: {
				title: "Shapes",
				height12: 8,

				rows: [
					[
						{ type: TH, content: "Square" },
						{ type: TH, content: "Circle" },
						{ type: TH, content: "Triangle" },
					],
					[
						{ type: TD, content: "Max Huber" },
						{ type: TD, content: "Pathocircle" },
						{ type: TD, content: "Alvar Aalto" },
					],
					[
						{ type: TD, content: "Kasimir Malevic" },
						{ type: TD, content: "Sphere" },
						{ type: TD, content: "Statue of Apollo of Tenea" },
					],
					[
						{ type: TD, content: "Ninth order" },
						{ type: TD, content: "Corona" },
						{ type: TD, content: "Banana" },
					],
					[
						{ type: TD, content: "Purse" },
						{ type: TD, content: "Same area" },
						{ type: TD, content: "Borromini" },
					],
					[
						{ type: TD, content: "Window" },
						{ type: TD, content: "Talisman" },
						{ type: TD, content: "Cucumber" },
					],
				],
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 9;

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome
	);

	const square = createShapeData(LayerMap.ROUNDED_RECT.type, page.theme);
	square.params.width = tile.params.gridSize * 12;
	square.params.height = tile.params.gridSize * 12;
	square.params.x = -450;
	square.params.y = -square.params.height / 2;
	square.params.fill.color = "transparent"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008
	square.params.line.color = "#545454"; //"hsla(0, 0%, 100%, 0.75)";
	square.params.line.size = 12;
	syncLayerValues(square);

	const circle = createShapeData(LayerMap.ELLIPSE.type, page.theme);
	circle.params.width = tile.params.gridSize * 13;
	circle.params.height = tile.params.gridSize * 13;
	circle.params.x = -circle.params.width / 2;
	circle.params.y = -circle.params.height / 2;
	circle.params.fill.color = "transparent"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008
	circle.params.line.color = "#545454"; 
	circle.params.line.size = 12;
	syncLayerValues(circle);

	const triangle = createShapeData(LayerMap.TRIANGLE.type, page.theme);
	triangle.params.width = tile.params.gridSize * 14;
	triangle.params.height = tile.params.gridSize * 12;
	triangle.params.x = 250;
	triangle.params.y = -triangle.params.height / 2;
	triangle.params.fill.color = "transparent"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008
	triangle.params.line.color = "#545454"; 
	triangle.params.line.size = 12;
	syncLayerValues(triangle);

	tile.params.layers = [square, circle, triangle];
	return page;
};

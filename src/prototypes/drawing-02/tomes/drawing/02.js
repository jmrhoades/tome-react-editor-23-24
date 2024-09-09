import { uniqueId } from "lodash";
import { TILES, textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";
import { syncLayerValues } from "../../tiles/drawing/utilities";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H2,
						content: "Three views of LLMs",
					},
				],
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 10;

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome
	);
	const size = tile.params.gridSize * 15;
	const margin = tile.params.gridSize * 9;

	const circ1 = createShapeData(LayerMap.ELLIPSE.type, page.theme);
	const circ2 = createShapeData(LayerMap.ELLIPSE.type, page.theme);
	const circ3 = createShapeData(LayerMap.ELLIPSE.type, page.theme);
	const arrow1 = createShapeData(LayerMap.LINE.type, page.theme);
	const arrow2 = createShapeData(LayerMap.LINE.type, page.theme);

	circ1.params.width = size;
	circ1.params.height = size;
	circ1.params.x = -size / 2 - size - margin;
	circ1.params.y = -size / 2;
	circ1.params.text.content = "This is a second wave of machine learning";
	circ1.params.text.color = "#fff";
	//circ1.params.fill.color = "transparent"; //"hsla(0, 0%, 100%, 0.75)";
	//circ1.params.line.color = "#545454"; //"hsla(0, 0%, 100%, 0.75)";
	//circ1.params.line.weight = 10;
	syncLayerValues(circ1);

	circ2.params.width = size;
	circ2.params.height = size;
	circ2.params.x = -size / 2;
	circ2.params.y = -size / 2;
	circ2.params.text.content = "This changes how we create software";
	circ2.params.text.color = "#fff";
	syncLayerValues(circ2);

	circ3.params.width = size;
	circ3.params.height = size;
	circ3.params.x = size / 2 + margin;
	circ3.params.y = -size / 2;
	circ3.params.text.content = "This takes us to AGI (minority view)";
	circ3.params.text.color = "#fff";
	circ3.params.fill.color = "#EB0008"; // #A3CEB2, #E99EC7"; #FFBA05, #EB0008
	syncLayerValues(circ3);

	arrow1.params.x = tile.params.gridSize * 9;
	arrow1.params.line.x2 = tile.params.gridSize * 6;
	syncLayerValues(arrow1);
	arrow2.params.x = tile.params.gridSize * -15;
	arrow2.params.line.x2 = tile.params.gridSize * 6;
	syncLayerValues(arrow2);

	tile.params.layers = [circ1, circ2, circ3, arrow1, arrow2];

	

	return page;
};

import { uniqueId } from "lodash";
import { TILES } from "../../tiles/TileConstants";
import { textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";
import { syncLayerValues } from "../../tiles/drawing/utilities";

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
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H2,
						content: "Market Analysis",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "Before launching a new product, it is essential to conduct a thorough market analysis to identify the target audience, competition, and potential demand for the product. Our market analysis includes an in-depth study of the industry trends, market size, growth rate, and consumer behavior.",
					},
				],
			},
		},
		row,
		tome,
		6
	);

    tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/proposal/photo-1526628953301-3e589a6a8b74.jpeg",
				imageSize: "cover",
			},
		},
		row,
		tome,
		6
	);

	return page;
};

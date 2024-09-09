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
						type: textStyles.H1,
						content: "New Product Proposal",
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
				image: "/proposal/184167ef-f4f2-4abb-af9d-a5dfd6508285.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		6
	);

	return page;
};

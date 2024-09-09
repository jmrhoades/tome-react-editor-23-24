import { uniqueId } from "lodash";
import { TILES, textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
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
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H0,
						content: "All hands",
                        color: "#fdb71c",
					},
				],
			},
		},
		row,
		tome,
        6,
        1
	);

	
    tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,

			params: {
				image: "/logos/rippling-combo-mark-horizontal-dark-mode.svg",
				imageSize: "contain",
                maxWidth: 128,
			},
		},
		row,
		tome,
        6,
        7
	);

	return page;
};

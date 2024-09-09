import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
//import { createTheme } from "../../tome/Themes";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[9]);

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H0,
						content: "Type scale",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.DEFAULT,
						content: "June ’23 update",
						color: "#fff",
					},
				],
			},
		},
		row,
		tome
	);

	
	return page;
};

import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
//import { createTheme } from "../../tome/Themes";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);
	//row.height = 4;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.ULTRA,
						content: "75%",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.DEFAULT,
						content: "of Americans say they would use reusable bags if stores gave them a discount",
					},
				],
			},
		},
		row,
		tome,
	);

	// appendTileToRowInTome(
	// 	{
	// 		type: tileNames.TEXT.name,
	// 		params: {
	// 			alignmentX: alignmentX.LEFT,
	// 			alignmentY: alignmentY.TOP,
	// 			blocks: [
	// 				{
	// 					id: uniqueId("block_"),
	// 					type: textBlockType.ULTRA,
	// 					content: "Ultra",
	// 				},
	// 				{
	// 					id: uniqueId("block_"),
	// 					type: textBlockType.DEFAULT,
	// 					content: "Default",
	// 				},
	// 			],
	// 		},
	// 	},
	// 	row,
	// 	tome
	// );

	return page;
};

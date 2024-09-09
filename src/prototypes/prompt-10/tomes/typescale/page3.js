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

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "The Rise of Tote Bags",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.DEFAULT,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "In 2018, 38.68% of respondents aged 18 to 29 years stated that they used reusable grocery bags made from cloth or other materials",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Americans use over 100 billion plastic bags each year, and if 25% of families used 10 fewer bags per month, we would save 2.5 billion bags per year",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "57% of grocery shoppers who choose reusable bags keep them in the car, and 30% keep them in the kitchen",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);

	return page;
};

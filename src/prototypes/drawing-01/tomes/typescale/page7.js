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
						content: "Crops that depend on honey bees",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.DEFAULT,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Almonds",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Apples",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Blueberries",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Cherries",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Watermelons",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);

	appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/unsplash/hiveboxx-65icrs88YYs-unsplash.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	return page;
};

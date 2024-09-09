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
						content: "Introduction",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "Building the tallest skyscraper is a monumental feat of engineering and architecture. It requires a combination of design, advanced techniques, and careful planning to ensure that the building is both safe and functional."
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "In this presentation, we will explore the various challenges of building the tallest skyscraper and discuss how architects, engineers, and builders work together to overcome them."
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
				image: "/images/9d7d3e9a-1ff5-4028-81cc-b9569b1e5823.png",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	return page;
};

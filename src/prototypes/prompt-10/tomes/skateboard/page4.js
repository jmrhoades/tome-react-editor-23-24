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
	page = appendPageToTome(tome, Themes[1]);

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
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Introduction",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Corporate travelers are often on the go and need to book and manage their stay with convenience and efficiency. With this in mind, our company is proposing a new business vertical targeted towards high-income corporate travelers that allows them to book and manage their stay from a mobile app. This new platform will provide travelers with an easy to use mobile interface that provides convenience and added value to their travel experience.",
					},
				],
			},
		},
		row,
		tome,
		5
	);

	appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/texture-04.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/texture-03.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	

	


	return page;
};

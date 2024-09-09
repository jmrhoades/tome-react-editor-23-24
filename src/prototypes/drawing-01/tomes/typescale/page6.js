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
						content: "Create Your Custom Tote Bag in 5 Easy Steps",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.DEFAULT,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Select Material: choose a durable fabric such as canvas or cotton",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Design Your Artwork: create or select graphics, images, or text",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Transfer Design: use iron-on transfers, screen printing, or embroidery",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Assemble Bag: sew or purchase a pre-made bag, and assemble the pieces",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Add Finishing Touches: embellish with buttons, ribbons, or patches",
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

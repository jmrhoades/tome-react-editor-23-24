import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	let row = null;
	let tile = null;

	

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Prevent Extinction",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.DEFAULT,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Plant native wildflowers in community plots",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Avoid the use of insecticides on your lawn",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Buy local honey and other bee products",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);

	return tome;
};

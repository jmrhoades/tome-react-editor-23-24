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
						content: "Provide a Habitat ",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.DEFAULT,
						content: "Leave a water source and some bare ground \n\n",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Avoid Insecticides",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.DEFAULT,
						content: "Reduce pesticide input on your lawn \n\n",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Support Local ",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.DEFAULT,
						content: "Buy local honey and other bee products",
					},
				],
			},
		},
		row,
		tome
	);

	


	return tome;
};

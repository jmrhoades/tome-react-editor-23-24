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
						type: textBlockType.H1,
						content: "Ecosystem Collapse",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H1,
						content: "Food Scarcity",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H1,
						content: "Economic Fallout",
					},
				],
			},
		},
		row,
		tome
	);

	


	return tome;
};



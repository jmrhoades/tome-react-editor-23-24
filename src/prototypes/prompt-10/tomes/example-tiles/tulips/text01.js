import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	
	let row = null;
	let tile = null;

	// Row 1
	row = appendRowToPageInTome(page, tome);
	row.flexHeight = false;

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				height12: 4,
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H0,
						content: "80%",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "of Dutch Golden Age still-life paintings depicted flowers as the primary subject.",
					},
				],
			},
		},
		row,
		tome
	);

	
	

	return tome;
};

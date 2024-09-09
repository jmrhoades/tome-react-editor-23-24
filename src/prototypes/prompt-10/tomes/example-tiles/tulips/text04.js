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
				height12: 5,
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content:
							"17th century painters, like Rachel Ruysch, Jan Brueghel, and Maria van Oosterwijck, excelled in creating floral motifs.",
					},
				],
			},
		},
		row,
		tome
	);

	return tome;
};

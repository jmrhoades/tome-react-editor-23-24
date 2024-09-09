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
						type: textBlockType.H3,
						content: "Symbolism of Floral Motifs",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Floral motifs were highly popular and significant in the art and design of the 17th century. They were often used to convey various symbolic meanings and messages. Here are some common symbolic interpretations of floral motifs during that period.",
					},
				],
			},
		},
		row,
		tome
	);

	
	

	return tome;
};

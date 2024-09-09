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
						type: textBlockType.DEFAULT,
						content:
							"During the 17th century, floral motifs were highly popular in art and design across various mediums, including painting, textiles, ceramics, and furniture. The period is often referred to as the “Golden Age” of floral art due to the flourishing of intricate and decorative floral designs. These motifs were influenced by the wider Baroque style, characterized by its opulence, dynamism, and attention to detail.",
					},
					
				],
			},
		},
		row,
		tome
	);

	return tome;
};

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
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H2,
						content: "Honey Bee Extinction",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "Bees are crucial for agricultural productivity and food security. Approximately 75% of the world's major food crops rely to some extent on pollination, and bees are among the most effective pollinators.",
					},
				],
			},
		},
		row,
		tome
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/6ade88ce-e8f9-4195-85ac-08bfb5c05cbb.png",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	
	

	return tome;
};

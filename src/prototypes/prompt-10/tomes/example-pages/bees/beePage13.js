import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	
	let row = null;
	let tile = null;

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 6;
	
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H2,
						content: "Economic & Ecological Impact of Bee Extinction",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "The extinction of bees would have a severe economic impact due to the loss of pollination services they provide, with an estimated global value of $235 to $577 billion annually. Ecologically, bee extinction would disrupt ecosystems by impeding the pollination of diverse plant species, affecting biodiversity and threatening the survival of other wildlife dependent on these plants for food and habitat.",
					},


				],
			},
		},
		row,
		tome
	);


	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 6;
	row.flexHeight = false;
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/bees7.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/bees8.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	

	return tome;
};

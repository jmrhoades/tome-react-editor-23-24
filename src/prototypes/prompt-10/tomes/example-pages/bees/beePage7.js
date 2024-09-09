import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	
	let row = null;
	let tile = null;

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 8;
	
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
						content: "Honey Bee Extinction",
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "In recent years, there has been a significant decline in bee populations worldwide, with factors like habitat loss, pesticide use, and climate change contributing to this decline. Bees are crucial for agricultural productivity and food security. About 75% of the world's major food crops rely to some extent on pollination. Bees and other pollinators have significant economic impact, providing services valued in billions of dollars globally. ",
					},
				],
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 5;
	row.flexHeight = false;
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/e9f7559d-cddb-4aae-b905-5f554090ae8b.jpg",
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
				image: "/page-gen-examples/2c08ccdb-5d4d-4e21-b6fc-7a5deda5186a.jpg",
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
				image: "/page-gen-examples/374f7bdf-2b39-43b7-8d6f-b38a17f7ad22.jpg",
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
				image: "/page-gen-examples/14966019-2e93-42c0-81d0-6fbdcf0fd363.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	
	
	

	return tome;
};

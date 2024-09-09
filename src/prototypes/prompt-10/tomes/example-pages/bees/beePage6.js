import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	
	let row = null;
	let tile = null;

	// Row 1
	row = appendRowToPageInTome(page, tome);
	row.height = 6;
	row.flexHeight = false;
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/bees3.jpg",
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
				image: "/page-gen-examples/bees2.jpg",
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
				image: "/page-gen-examples/bees6.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	// Row 2
	row = appendRowToPageInTome(page, tome);
	row.height = 6;
	row.flexHeight = false;
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/bees4.jpg",
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
				image: "/page-gen-examples/bees1.jpg",
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
				image: "/page-gen-examples/bees5.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	
	

	return tome;
};

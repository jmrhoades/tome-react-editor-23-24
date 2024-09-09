import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	
	let row = null;
	let tile = null;

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 3;
	
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Beekeeping",
					},
				],
			},
		},
		row,
		tome
	);


	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 9;
	row.flexHeight = false;
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/534a3305-ae66-4023-bed6-afb12206f86c.jpg",
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
				image: "/page-gen-examples/b9a99aa9-b9e4-4ee8-8dbb-dff7d5e50c5b.jpg",
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
				image: "/page-gen-examples/e4fbddbb-8b36-44eb-80ca-e9a8bebc6f1c.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	return tome;
};

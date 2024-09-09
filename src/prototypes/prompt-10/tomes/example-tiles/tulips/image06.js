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
			type: tileNames.IMAGE.name,
			params: {
				height12: 8,
				image: "/tile-gen-examples/image-06.jpg",
				imageSize: "contain",
			},
		},
		row,
		tome
	);

	return tome;
};

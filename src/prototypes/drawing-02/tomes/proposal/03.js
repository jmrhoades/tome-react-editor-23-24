import { uniqueId } from "lodash";
import { TILES } from "../../tiles/TileConstants";
import { textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";
import { syncLayerValues } from "../../tiles/drawing/utilities";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);


	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H2,
						content: "Target Audience",
					},
				],
			},
		},
		row,
		tome,
		4
	);


	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 6;

	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/proposal/photo-1523240795612-9a054b0db644.jpeg",
				imageSize: "cover",
			},
		},
		row,
		tome,
		4
	);
	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/proposal/photo-1609220136736-443140cffec6.jpeg",
				imageSize: "cover",
			},
		},
		row,
		tome,
		4
	);
	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/proposal/photo-1628746402562-b319f7cb1675.jpeg",
				imageSize: "cover",
			},
		},
		row,
		tome,
		4
	);


	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 4;

	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H3,
						content: "Young Professionals",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "Our product is designed for young professionals who are looking for an easy and convenient way to stay healthy and active despite their busy schedules.",
					},
				],
			},
		},
		row,
		tome,
		4
	);
	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H3,
						content: "Active Families",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "Our product is also ideal for active families who enjoy spending time outdoors and want to encourage their children to stay active and healthy.",
					},
				],
			},
		},
		row,
		tome,
		4
	);
	tile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textStyles.H3,
						content: "Adventure Seekers",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "Our product is perfect for adventure seekers who love to explore new places and try new activities, whether it's hiking in the mountains or surfing at the beach.",
					},
				],
			},
		},
		row,
		tome,
		4
	);

   

	return page;
};

import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
//import { createTheme } from "../../tome/Themes";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 4;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "8.76em",
					},
				],
			},
		},
		row,
		tome,
		2,
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.ULTRA,
						content: "Display 1",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 3;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "4.624em",
					},
				],
			},
		},
		row,
		tome,
		2,
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H0,
						content: "Display 2",
					},
				],
			},
		},
		row,
		tome,
		10
	);


	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "2.776em",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H1,
						content: "Title",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "1.666em",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Heading 1",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "1em",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H3,
						content: "Heading 2",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "1.46em",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.DEFAULT,
						content: "Body 1",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "1em",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Body 2",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 2;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "0.685em",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.CAPTION,
						content: "Caption",
					},
				],
			},
		},
		row,
		tome,
		10
	);

	

	// appendTileToRowInTome(
	// 	{
	// 		type: tileNames.TEXT.name,
	// 		params: {
	// 			alignmentX: alignmentX.LEFT,
	// 			alignmentY: alignmentY.TOP,
	// 			blocks: [
	// 				{
	// 					id: uniqueId("block_"),
	// 					type: textBlockType.ULTRA,
	// 					content: "Ultra",
	// 				},
	// 				{
	// 					id: uniqueId("block_"),
	// 					type: textBlockType.DEFAULT,
	// 					content: "Default",
	// 				},
	// 			],
	// 		},
	// 	},
	// 	row,
	// 	tome
	// );

	return page;
};

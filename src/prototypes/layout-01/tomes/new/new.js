import { uniqueId } from "lodash";
import { TILES, textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";
import { createTileData, createFrameData, createPageData } from "../../tome/TomeData";

export const makePage = tome => {
	let page = null;
	let frame = null;
	let row = null;
	let tile = null;

	// Page
	//page = appendPageToTome(tome, Themes[0]);
	page = createPageData();
	page.order = tome.pages.length + 1;
	page.theme = Themes[0];
	tome.pages.push(page);

	// Row
	//row = appendRowToPageInTome(page, tome);
	//row.height = 12;

	frame = createFrameData();
	frame.pageId = page.id;
	frame.order = 1;
	frame.x = 0;
	frame.y = 0;
	frame.width = 12;
	frame.height = 12;
	tome.frames.push(frame);


	tile = createTileData(TILES.TEXT.name);
	tile.pageId = page.id;
	tile.frameId = frame.id;
	tile.order = 1;
	tile.x = 0;
	tile.y = 0;
	tile.width = 12;
	tile.height = 12;
	tome.tiles.push(tile);



	// tile = appendTileToRowInTome(
	// 	{
	// 		type: TILES.TEXT.name,
	// 		params: {
	// 			alignmentX: alignmentX.LEFT,
	// 			alignmentY: alignmentY.TOP,
	// 			blocks: [
	// 				{
	// 					id: uniqueId("block_caption_"),
	// 					type: textStyles.CAPTION,
	// 					content: "Layout changes",
	// 				},
	// 				{
	// 					id: uniqueId("block_ol_"),
	// 					type: textStyles.OL,
	// 					blockStyle: textStyles.H2,
	// 					blocks: [
	// 						{
	// 							id: uniqueId("inline_li_"),
	// 							type: textStyles.LI,
	// 							content: "Rows can have empty space",
	// 						},
	// 						{
	// 							id: uniqueId("inline_li_"),
	// 							type: textStyles.LI,
	// 							content: "Tiles can be directly resized",
	// 						},
	// 						{
	// 							id: uniqueId("inline_li_"),
	// 							type: textStyles.LI,
	// 							content: "Image content is treated more like a drawing layer",
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	},
	// 	row,
	// 	tome
	// );
	

	return page;
};

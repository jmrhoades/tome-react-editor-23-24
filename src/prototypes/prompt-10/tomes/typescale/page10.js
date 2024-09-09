import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
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
	row.height = 6;
	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Our time is finite",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "It’s critical we make the most of every moment and are discerning with our time. There’s a closing window for us to establish ourselves and endure."
					},
				],
			},
		},
		row,
		tome
	);

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Do the simple thing first",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "There’s an advantage to learning from an early prototype and approaching the rest of the problem with more information, having learned from it."
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
	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Nothing has to be the way it is ",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "This spans from the way we solve problems to how we decide which problems to solve."
					},
				],
			},
		},
		row,
		tome
	);

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Don’t ask for permission",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content: "We need to move too quickly to wait on approval. If you see a problem at Tome, solve it, and correct forward."
					},
				],
			},
		},
		row,
		tome
	);
	
	return page;
};

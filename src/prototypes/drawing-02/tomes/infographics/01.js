import { uniqueId } from "lodash";
import { TILES } from "../../tiles/TileConstants";
import { textStyles, alignmentX, alignmentY } from "../../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

import { LayerMap, createShapeData } from "../../tiles/drawing/LayerData";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 3;

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
						content: "Drawing tile",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.DEFAULT,
						content: "M10: Infographics",
					},
				],
			},
		},
		row,
		tome,
		12
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 10;

	tile = appendTileToRowInTome(
		{
			type: TILES.DRAWING.name,
		},
		row,
		tome,
		12
	);
	const shapeProgressRing = createShapeData(LayerMap.PROGRESS_RING.type, page.theme);
	shapeProgressRing.params.x = -350;
	const shapePictogram = createShapeData(LayerMap.PICTOGRAM.type, page.theme);
	shapePictogram.params.x = 80;
	shapePictogram.params.meta.itemName = "Star";
	shapePictogram.motion.meta.itemName.set("Star");
	tile.params.layers = [shapeProgressRing, shapePictogram];

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 5;

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
						content: "User problem",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content:
							"Despite wanting to use them, many people lack the confidence, skill or time to create infographics from scratch. Additionally, manually-created infographics are usually a pain to edit or repurpose.",
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
						content: "Product strategy",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content:
							"Creating data-backed, context-aware infographics through generative commands expands Tome’s range of expression. This increase in capability will lead to increased use and retention.",
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
						content: "GPT-friendly",
					},

					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content:
							"Infographics with simple interfaces will provide a constrained parameter space for our AI to work with. Minimal settings also makes it easy for users to edit the infographics post-generation.",
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
	row.height = 5;

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
						content: "Selection",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content:
							"Choose 2 infographics that would be useful to founders and marketers. They should also be general enough to be content candidates for a subset of autotome and page gen prompts.",
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
						content: "Approach",
					},

					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content:
							"Use the drawing tile and its shape components as a base for drawing, moving, sizing and customizing. Provide some means of direct manipulation over 1 or more of the infographic’s parameters.",
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

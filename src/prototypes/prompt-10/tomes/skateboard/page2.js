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
	row.height = 7;

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "From Ground to Sky:",
							},
							{
								id: uniqueId("block_ln"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "The Future of Transportation is Here",
							},
						],
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

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Built for scale",
					},
				],
			},
		},
		row,
		tome,
		5
	);

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"The default tool among startups now also powers a wide range of large established companies, including Vercel, Cash App, and Retool. To support product teams from early stage to global stage, we've been working being built for scale.",
					},
				],
			},
		},
		row,
		tome,
		7
	);

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/texture-01.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/texture-02.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);


	return page;
};

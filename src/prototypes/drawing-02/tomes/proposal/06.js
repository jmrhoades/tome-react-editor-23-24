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
	row.height = 14;

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
						content: "Marketing Plan",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "Our marketing plan will focus on reaching our target audience through a combination of digital and traditional marketing channels.",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.H3,
						content: "Digital Marketing",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "We will leverage social media platforms such as Instagram, Facebook, and Twitter to reach our target audience. We will create engaging content that highlights the unique features and benefits of our product. We will also use targeted advertising to reach potential customers who have shown interest in similar products.",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.H3,
						content: "Traditional Marketing",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "We will also use traditional marketing channels such as print ads, radio spots, and billboards to reach a wider audience. We will focus on high-traffic areas where our target audience is likely to be present.",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.H3,
						content: "Influencer Marketing",
					},
					{
						id: uniqueId("block_"),
						type: textStyles.P,
						content: "We will partner with influencers in our target audience to promote our product. We will identify influencers who have a strong following in our target demographic and work with them to create sponsored content that highlights our product.",
					},
				],
			},
		},
		row,
		tome,
		6
	);

	tile = appendTileToRowInTome(
		{
			type: TILES.IMAGE.name,
			params: {
				image: "/proposal/c474f564-6cec-441f-bb3e-21e4e2f69c39.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		6
	);
	
	return page;
};

import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY, tableTileType } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

const TH = tableTileType.TH;
const TD = tableTileType.TD;

export const content = (tome, page) => {
	let row = null;
	let tile = null;

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 16;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TABLE.name,
			params: {
				rows: [
					[
						{ type: TH, content: "Causes of Bee Extinction" },
						{ type: TH, content: "Impact of Bee Extinction" },
						{ type: TH, content: "Solutions to Prevent Bee Extinction" },
					],
					[
						{ type: TD, content: "Pesticide Use" },
						{ type: TD, content: "Decline in Pollination" },
						{ type: TD, content: "Reduce or eliminate pesticide use" },
					],
					[
						{ type: TD, content: "Loss of Habitat" },
						{ type: TD, content: "Decreased Food Production" },
						{ type: TD, content: "Preserve and create bee-friendly habitats" },
					],
					[
						{ type: TD, content: "Climate Change" },
						{ type: TD, content: "Disruption of Ecosystems" },
						{ type: TD, content: "Mitigate climate change through reducing greenhouse gas emissions" },
					],
					[
						{ type: TD, content: "Disease and Parasites" },
						{ type: TD, content: "Weakened Bee Colonies" },
						{ type: TD, content: "Develop and implement bee health management strategies" },
					],
					[
						{ type: TD, content: "Lack of Genetic Diversity" },
						{ type: TD, content: "Increased Vulnerability to Stress" },
						{ type: TD, content: "Promote genetic diversity in bee populations" },
					],
					[
						{ type: TD, content: "Agricultural Practices" },
						{ type: TD, content: "Loss of Wildflowers and Nectar Sources" },
						{ type: TD, content: "Implement sustainable agricultural practices" },
					],
					[
						{ type: TD, content: "Beekeeping Practices" },
						{ type: TD, content: "Negative Impact on Bee Health" },
						{ type: TD, content: "Promote responsible and sustainable beekeeping" },
					],
					[
						{ type: TD, content: "Lack of Public Awareness" },
						{ type: TD, content: "Limited Conservation Efforts" },
						{ type: TD, content: "Educate the public about the importance of bees and their conservation" },
					],
					[
						{ type: TD, content: "Invasive Species" },
						{ type: TD, content: "Competition for Resources" },
						{ type: TD, content: "Implement measures to control invasive species" },
					],
					[
						{ type: TD, content: "Pollution" },
						{ type: TD, content: "Negative Effects on Bee Health" },
						{ type: TD, content: "Reduce pollution and maintain clean environments" },
					],
				],
			},
		},
		row,
		tome
	);

	return tome;
};

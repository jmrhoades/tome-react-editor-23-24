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
				title: "Horticultural Discoveries and Global Trade Influence on Floral Motifs in 17th-Century Painting",
				height12: 9,
				columns: [40, 60],
				rows: [
					[
						{ type: TH, content: "Horticultural Discoveries" },
						{ type: TH, content: "Impact on Floral Motifs in Art" },
						
					],
					[
						{ type: TD, content: "Tulipomania" },
						{ type: TD, content: "The frenzy over tulips in the Netherlands led to the popularization of tulip motifs in still life paintings, reflecting the cultural significance of the flower." },
						
					],
					[
						{ type: TD, content: "New World Floral Exchange" },
						{ type: TD, content: "Exploration and trade with the Americas introduced new flower species to Europe, expanding the variety of floral motifs used in paintings."},
						
					],
					[
						{ type: TD, content: "The Age of Exploration" },
						{ type: TD, content: "Exploration of new territories brought exotic flowers to Europe, inspiring artists to depict these rare and unique botanicals in their works." },
						
					],
					[
						{ type: TD, content: "Influence of Botanical Illustrations" },
						{ type: TD, content: "The development of botanical illustrations and herbals in the 17th century encouraged artists to study and accurately depict flowers in their paintings."},
						
					],
					
				],
			},
		},
		row,
		tome
	);

	return tome;
};

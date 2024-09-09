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
				title: "Most Expensive 17th Century Floral Artwork",
				height12: 9,
				
				rows: [
					[
						{ type: TH, content: "Artwork" },
						{ type: TH, content: "Artist" },
						{ type: TH, content: "Price" },
					],
					[
						{ type: TD, content: "Still Life with Flowers in a Glass Vase" },
						{ type: TD, content: "Jan van Huysum" },
						{ type: TD, content: "$6.7 million, 2018" },
					],
					[
						{ type: TD, content: "Still Life with Flowers in a Glass Vase" },
						{ type: TD, content: "Rachel Ruysch" },
						{ type: TD, content: "$5.2 million, 2006" },
					],
					[
						{ type: TD, content: "Flowers in a Terracotta Vase" },
						{ type: TD, content: "Ambrosius Bosschaert the Elder" },
						{ type: TD, content: "$2.2 million, 2006" },
					],
					[
						{ type: TD, content: "Still Life with Flowers and Fruit" },
						{ type: TD, content: "Abraham Mignon" },
						{ type: TD, content: "$3.6 million, 2016" },
					],
					[
						{ type: TD, content: "Still Life of Flowers in a Glass Vase" },
						{ type: TD, content: "Jan Davidsz de Heem" },
						{ type: TD, content: "$1.7 million, 2006" },
					],
				],
			},
		},
		row,
		tome
	);

	return tome;
};

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
	tile = appendTileToRowInTome(
		{
			type: tileNames.TABLE.name,
			params: {
				title: "Popular Floral Motifs in 17th Century Art",
				height12: 11,
				
				rows: [
					[
						{ type: TH, content: "Floral Motif" },
						{ type: TH, content: "Description" },
						{ type: TH, content: "Examples in Art" },
					],
					[
						{ type: TD, content: "Tulipomania" },
						{ type: TD, content: "The obsession with tulips in the Netherlands during the Dutch Golden Age" },
						{ type: TD, content: "“Still Life with Flowers” by Ambrosius Bosschaert the Elder" },
					],
					[
						{ type: TD, content: "Fleur-de-lis" },
						{ type: TD, content: "A stylized lily or iris flower often used as a symbol of royalty and French monarchy." },
						{ type: TD, content: "Ornamental motifs in the Palace of Versailles" },
					],
					[
						{ type: TD, content: "Baroque Bouquets" },
						{ type: TD, content: "Elaborate and luxurious floral arrangements with a mix of various flowers and foliage." },
						{ type: TD, content: "“Flower Still Life” by Rachel Ruysch" },
					],
					[
						{ type: TD, content: "Marigolds" },
						{ type: TD, content: "Symbolic of the sun, used in religious art and representing wealth and prosperity." },
						{ type: TD, content: "“Altar of the Kings” by Juan Sánchez Cotán" },
					],
					[
						{ type: TD, content: "Cornflowers" },
						{ type: TD, content: "Also known as bachelor's buttons, representing love, celibacy, and single blessedness." },
						{ type: TD, content: "“Flowers in a Vase” by Ambrosius Bosschaert the Younger" },
					],
				],
			},
		},
		row,
		tome
	);

	return tome;
};

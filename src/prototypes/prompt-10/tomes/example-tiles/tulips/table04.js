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
				title: "Symbolic Meanings of Floral Motifs in 17th-Century Painting",
				height12: 7,
				columns: [25, 75],
				rows: [
					[
						{ type: TH, content: "Tulip" },
						{ type: TH, content: "Symbolic Meaning" },
					],
					[
						{ type: TD, content: "Rose" },
						{ type: TD, content: "Love, prosperity, and beauty. The Dutch Tulipomania in the 17th century contributed to its popularity." },
					
					],
					[
						{ type: TD, content: "Lily" },
						{ type: TD, content: "Purity, virtue, and innocence. Often associated with the Virgin Mary and other saints." },
					
					],
					[
						{ type: TD, content: "Sunflower" },
						{ type: TD, content: "Adoration, loyalty, and longevity. Its resemblance to the sun linked it to solar symbolism." },
						
					],
					[
						{ type: TD, content: "Carnation" },
						{ type: TD, content: "Fascination, admiration, and distinction. Used in portraits to convey special regard for the sitter." },
					
					],
				],
			},
		},
		row,
		tome
	);

	return tome;
};

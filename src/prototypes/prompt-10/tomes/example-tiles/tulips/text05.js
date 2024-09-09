import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	let row = null;
	let tile = null;

	// Row 1
	row = appendRowToPageInTome(page, tome);
	row.flexHeight = false;

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				height12: 6,
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H2,
						content: "Tulipomania",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Tulipomania, also known as the Tulip Mania or Tulip Craze, refers to a period in the 17th century, specifically in the Netherlands, when tulip bulbs became a speculative commodity. It is considered one of the first recorded speculative bubbles in economic history.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"During the Dutch Golden Age, tulips were introduced to the Netherlands and gained significant popularity. Their unique and vibrant colors, as well as their exotic origins, made them highly desirable among the Dutch elite. As demand for tulips increased, so did their prices, leading to a speculative frenzy.",
					},
				],
			},
		},
		row,
		tome
	);

	return tome;
};

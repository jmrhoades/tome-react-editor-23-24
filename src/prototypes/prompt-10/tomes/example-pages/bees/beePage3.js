import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	let row = null;
	let tile = null;

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 5;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H2,
						content: "Importance of Bees",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.DEFAULT,
						content:
							"Bees are critical pollinators, and their extinction would lead to a decline in the production of food crops, ultimately leading to worldwide famine.",
					},
				],
			},
		},
		row,
		tome,
		8
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/page-gen-examples/23ea3254-0583-4aa4-97fe-93eacc88781e.png",
				imageSize: "cover",
			},
		},
		row,
		tome,
		4
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 7;

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Promoting Biodiversity",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees pollinate 70 of the around 100 crop species that feed 90% of the world. Honey bees are responsible for $30 billion a year in crops. They benefit flowering plants by helping the plants reproduce, via pollination. Without bees, pollination and reproduction would be practically impossible for some plant species.Most crops grown for their fruits, nuts, seeds, fiber, and hay require pollination by insects, and pollinating insects also play a critical role in maintaining natural plant communities and ensuring production of seeds in most flowering plants. Bees have a mutualistic symbiotic relationship with flowers and other plants, meaning that both the plant and bee benefit from their interaction: the bees pollinate the plants, spreading the pollen from flower to flower, therefore helping the plants reproduce; in exchange, the bees also eat the pollen, which is a critical component of their diets.",
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

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Impact",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"The extinction of honeybees will cause an economic crisis with the decline of produce such as fruits and vegetables. If bees were to go extinct, several plants and crops would begin to die out too, leading to a decline in food production. The work that bees do for US farmers is worth about $15 billion a year, so without them, the cost of produce would skyrocket. Beekeepers that nurse the bees will go out of business. Farmers will lose their crops because the fruits and vegetables need the pollen.",
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

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Solutions",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.OL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Ban Dangerous Pesticides",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Protect Wild Habitat.",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Create citizen science programs",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Take Up Beekeeping",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Go Organic",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);

	return tome;
};

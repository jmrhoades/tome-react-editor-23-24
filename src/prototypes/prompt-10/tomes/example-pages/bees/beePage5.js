import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../../page/TileConstants";
import { appendRowToPageInTome, appendTileToRowInTome } from "../../../tome/TomeContext";

export const content = (tome, page) => {
	let row = null;
	let tile = null;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Extinction of Bees",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.CAPTION,
						content: "Causes, Implications, and Solutions",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 4;

	// Row
	row = appendRowToPageInTome(page, tome);
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
						content: "Causes of Bee Extinction",
					},
				],
			},
		},
		row,
		tome
	);
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
						content: "Habitat Loss",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees are losing their natural habitats due to deforestation, industrial agriculture, and urban development. These activities destroy the nests and natural food resources (nectar and pollen from wildflowers) of bees.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Climate Change",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees are highly sensitive to changes in temperature and weather patterns, which can disrupt their feeding and breeding cycles.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Pesticides",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Certain pesticides, especially neonicotinoids, have been linked to high bee mortality rates. These chemicals can impair bees' memory and navigation capabilities, thus reducing their ability to find food and reproduce.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 10;

	// Row
	row = appendRowToPageInTome(page, tome);
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
						content: "Consequences of Bee Extinction",
					},
				],
			},
		},
		row,
		tome
	);
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
						content: "Impact on Food Security",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees are essential pollinators for many crops. Their extinction could lead to decreased crop yields, impacting global food security.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Economic Consequences",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"A decline in pollination can affect the agricultural sector's output, leading to economic loss.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Biodiversity Loss ",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees contribute to biodiversity by aiding in the reproduction of wild plants. Their extinction could disrupt ecosystems and lead to a domino effect, causing the extinction of other species.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 9;

	// Row
	row = appendRowToPageInTome(page, tome);
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
						content: "Potential Solutions and Mitigation Strategies",
					},
				],
			},
		},
		row,
		tome
	);
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
						content: "Reducing Pesticide Use",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Switching to organic farming methods and reducing reliance on harmful pesticides can significantly help bee populations.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Promoting Biodiversity",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Planting diverse flowers, particularly native species, can provide bees with the necessary resources for survival.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Policy Measures",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Legislation and regulations restricting the use of harmful pesticides and promoting environmentally friendly farming practices can significantly impact.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 8;

	// Row
	row = appendRowToPageInTome(page, tome);
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
						content: "Conclusion",
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"The extinction of bees is a pressing concern that affects us all. Without their pollination services, the balance of our ecosystems and food production could be seriously jeopardized. It's crucial that we tackle this problem on multiple fronts, from local gardeners planting diverse, bee-friendly plants, to policymakers enacting strong regulations against harmful agricultural practices. As we become more aware of our interdependence with nature, it is clear that protecting bees is not only an act of environmental stewardship but a matter of global food security and economic stability.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 7;

	return tome;
};

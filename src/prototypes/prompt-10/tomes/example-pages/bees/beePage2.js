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
						content: "Bee Extinction",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees are critical pollinators, and their extinction would lead to a decline in the production of food crops, ultimately leading to worldwide famine. Hunger and poverty would be widespread, and the cost of food would rise as agricultural ingredients grow scarce, leading to malnutrition and starvation. Bees are responsible for pollinating 70 of the around 100 crop species that feed 90% of the world, and honey bees are responsible for $30 billion a year in crops.",
					},
				],
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	row.height = 10;

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
						content: "Reasons",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Bees are at risk of extinction largely due to human activities, such as large-scale changes in land use, industrialized agricultural practices, and habitat loss. Many factors contribute to the decline of native bee populations, but one of the most prevalent issues is habitat loss. Climate change, toxic pesticides, and disease are also contributing factors to bee decline. Many factors contribute to the decline of native bee populations, but one of the most prevalent issues is habitat loss. This includes suburban development, monoculture farming industries, and road construction fragmenting available land. Bees are also at risk from certain blood-sucking parasites that only reproduce in bee colonies, such as the crab-like varroa mite that feasts on their blood. ",
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
						content: "Solutions",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Ban Dangerous Pesticides. Ban the seven most dangerous pesticides to protect pollinator health by preserving wild habitat. A European Food Safety Authority (EFSA) scientific report determined that three widely used pesticides — nicotine-based clothianidin, imidacloprid, and thiametoxam — pose “high acute risks” for bees. Protect Wild Habitat. Protect already-existing bee habitat, expanding habitat by planting pollinator-friendly plants in our own gardens. Citizen science programs, such as the Bumble Bee Watch, can help document how native bee communities change through time in pollinator habitats. Take Up Beekeeping. The most proactive solution to save bees is to take up beekeeping. If you have adequate space and interest, you should become a beekeeper.",
					},
				],
			},
		},
		row,
		tome
	);

	return tome;
};

import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import {
	makePageData,
	makeFlexData,
	makeFlexRootData,
	makeTextData,
	makeImageData,
	makeIconData,
	contentDirection,
	containerSize,
	contentDistribute,
	backgrounds,
} from "../TileData";

export const makePage = tome => {
	let page = null;
	let flexRoot = null;
	let container = null;
	let card = null;
	let row = null;
	let col = null;
	let flex = null;
	let text = null;
	let img = null;

	// Ramp Sales - context stats
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexRootData(page);

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.CUSTOM;
	row.layout.height.value = 140;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text =
		"Financial leaders are walking the tightrope between short-term budget cuts and long-term efficiency";
	text.content.lineHeight = 1.3;
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 450;

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.gap = 24;

	// Card
	card = makeFlexData(row);
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.padding.left = 24;
	card.layout.padding.right = 24;
	card.layout.padding.top = 24;
	card.layout.padding.bottom = 24;
	card.layout.borderRadius = 8;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#FFFFFF";

	flex = makeFlexData(card);
	flex.layout.width.type = containerSize.HUG;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.padding.left = 9;
	flex.layout.padding.right = 9;
	flex.layout.padding.top = 4;
	flex.layout.padding.bottom = 4;
	flex.layout.borderRadius = 8;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "rgba(231,242,86,1.0)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Finance health";
	text.content.color = "var(--heading-color)";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height.type = containerSize.CUSTOM;
	text.layout.height.value = 160;
	text.content.lineHeight = 1.3;
	text.content.text =
		"78% of CFOs are looking at cutting costs to help to improve cash flow and manage financial health.";

	img = makeImageData(card);
	img.content.src = "/images/2e9d03b7-ddc0-4f82-984c-41278708f4c9.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 153 / 47;
	img.layout.width.value = 74;
	img.layout.height.value = 23;

	// Card
	card = makeFlexData(row);
	card.layout.padding.left = 24;
	card.layout.padding.right = 24;
	card.layout.padding.top = 24;
	card.layout.padding.bottom = 24;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.borderRadius = 8;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#FFFFFF";

	flex = makeFlexData(card);
	flex.layout.width.type = containerSize.HUG;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.padding.left = 9;
	flex.layout.padding.right = 9;
	flex.layout.padding.top = 4;
	flex.layout.padding.bottom = 4;
	flex.layout.borderRadius = 8;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "rgba(231,242,86,1.0)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Operational efficiency";
	text.content.color = "var(--heading-color)";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height.type = containerSize.CUSTOM;
	text.layout.height.value = 160;
	text.content.lineHeight = 1.3;
	text.content.text =
		"88% of finance leaders currently feel the challenge of not having the automation tools they need to automate repetitive tasks like expense and invoicing.";

	img = makeImageData(card);
	img.content.src = "/images/51208c8e-98e2-44fb-9fe7-54dd9eacae55.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 900 / 500;
	img.layout.width.value  = 41;
	img.layout.height.value  = 23;

	return page;
};

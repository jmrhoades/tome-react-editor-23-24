import { Themes } from "../../ds/Themes";
import { TextStyles } from "../../tiles/Text";
import { makePageData, makeFlexData, makeTextData, makeImageData, makeIconData } from "../TileData";

export const makePage = tome => {
	let page = null;
	let flexRoot = null;
	let container = null;
	let card = null;
	let row = null;
	let col = null;
	let flex = null;
	let item = null;
	let text = null;
	let img = null;
	let icon = null;
	let imgWidth = 90;

	// Ramp Sales - context stats
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "vertical";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.height = "140px";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text =
		"Financial leaders are walking the tightrope between short-term budget cuts and long-term efficiency";
	text.layout.width = "450px";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "24px";

	// Card
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 24;
	card.layout.padding.y = 24;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(card);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Finance health";
	text.content.color = "var(--heading-color)";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height = "160px";
	text.content.text =
		"78% of CFOs are looking at cutting costs to help to improve cash flow and manage financial health.";

	img = makeImageData(card);
	img.content.src = "/images/2e9d03b7-ddc0-4f82-984c-41278708f4c9.png";
	img.layout.aspectRatio = 153 / 47;
	img.layout.height = 23;

	// Card
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 24;
	card.layout.padding.y = 24;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(card);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Operational efficiency";
	text.content.color = "var(--heading-color)";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height = "160px";
	text.content.text =
		"88% of finance leaders currently feel the challenge of not having the automation tools they need to automate repetitive tasks like expense and invoicing.";

	img = makeImageData(card);
	img.content.src = "/images/51208c8e-98e2-44fb-9fe7-54dd9eacae55.png";
	img.layout.aspectRatio = 900 / 500;
	img.layout.height = 23;

	return page;
};

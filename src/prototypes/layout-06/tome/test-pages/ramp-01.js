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

	// Ramp Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 72;
	flexRoot.layout.gap = 24;

	// Card
	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.width = 360;
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.borderRadius = 8;
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	

	container = makeFlexData(card);
	container.layout.direction = "vertical";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = 56;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Control spend, automate payments, and close the books faster for greater financial health on the ultimate platform.";

	flex = makeFlexData(card);
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.layout.borderRadius = 8;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Free";
	text.content.color = "var(--heading-color)";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.borderRadius = 8;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";

	container = makeFlexData(card);
	container.layout.direction = "vertical";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.gap = 6;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = 56;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.layout.borderRadius = 8;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	
	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Plus";
	text.content.color = "var(--heading-color)";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Powerful spend controls, advanced automation, and deeper integrations to help you scale globally and manage your finance operations from end to end.";

	flex = makeFlexData(card);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = 96;

	item = makeFlexData(flex);
	item.layout.direction = "vertical";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;
	item.layout.gap = 2;
	item.layout.height = "hug";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$15 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed monthly";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	item = makeFlexData(flex);
	item.layout.direction = "vertical";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;
	item.layout.gap = 2;
	item.layout.height = "hug";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$12 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed annually";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.layout.borderRadius = 8;
	card.theme.tokens["backgroundColor"] = "var(--z0)";

	container = makeFlexData(card);
	container.layout.direction = "vertical";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = 56;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.layout.borderRadius = 8;
	flex.theme.tokens["backgroundColor"] = "rgba(244, 243, 239, 1.0)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Enterprise";
	text.content.color = "var(--heading-color)";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"All the security, compliance, and flexibility global enterprises need to automate deployment at scale.";

	flex = makeFlexData(card);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = 96;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Custom pricing";

	return page;
};

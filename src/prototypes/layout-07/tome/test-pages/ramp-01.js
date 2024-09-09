import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import {
	makePageData,
	makeFlexRootData,
	makeFlexData,
	makeTextData,
	makeImageData,
	makeIconData,
	contentDirection,
	contentAlign,
	contentDistribute,
	containerSize,
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
	let item = null;
	let text = null;
	let img = null;
	let icon = null;
	let imgWidth = 90;

	// Ramp Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.HORIZONTAL;
	flexRoot.layout.padding.top = 72;
	flexRoot.layout.padding.bottom = 72;
	flexRoot.layout.gap = 24;

	// Card
	card = makeFlexData(flexRoot);
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	//card.layout.width.type = containerSize.CUSTOM;
	//card.layout.width.value = 360;
	card.layout.padding.left = 20;
	card.layout.padding.right = 20;
	card.layout.padding.top = 20;
	card.layout.padding.bottom = 20;
	card.layout.borderRadius = 8;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#FFF";

	container = makeFlexData(card);
	container.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.gap = 4;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 56;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Control spend, automate payments, and close the books faster for greater financial health on the ultimate platform.";

	flex = makeFlexData(card);
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
	text.content.text = "Free";
	text.content.color = "var(--heading-color)";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.padding.left = 20;
	card.layout.padding.right = 20;
	card.layout.padding.top = 20;
	card.layout.padding.bottom = 20;
	card.layout.borderRadius = 8;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#FFF";

	container = makeFlexData(card);
	container.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.gap = 6;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 56;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
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
	text.content.text = "Plus";
	text.content.color = "var(--heading-color)";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Powerful spend controls, advanced automation, and deeper integrations to help you scale globally and manage your finance operations from end to end.";

	flex = makeFlexData(card);
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 96;

	item = makeFlexData(flex);
	item.layout.gap = 2;
	item.layout.height.type = containerSize.HUG;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$15 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed monthly";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	item = makeFlexData(flex);
	item.layout.gap = 2;
	item.layout.height.type = containerSize.HUG;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$12 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed annually";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.padding.left = 20;
	card.layout.padding.right = 20;
	card.layout.padding.top = 20;
	card.layout.padding.bottom = 20;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.borderRadius = 8;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#FFF";

	container = makeFlexData(card);
	container.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.gap = 4;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 56;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.width.type = containerSize.HUG;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.padding.left = 9;
	flex.layout.padding.right = 9;
	flex.layout.padding.top = 4;
	flex.layout.padding.bottom = 4;
	flex.layout.borderRadius = 8;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "rgba(244, 243, 239, 1.0)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Enterprise";
	text.content.color = "var(--heading-color)";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"All the security, compliance, and flexibility global enterprises need to automate deployment at scale.";

	flex = makeFlexData(card);
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 96;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Custom pricing";

	return page;
};

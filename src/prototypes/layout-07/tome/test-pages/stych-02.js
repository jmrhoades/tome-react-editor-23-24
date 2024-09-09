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
	contentAlign,
	containerSize,
	backgrounds,
	contentSize,
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

	page = makePageData(tome);
	page.theme = Themes.StychD;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.HORIZONTAL;

	container = makeFlexData(flexRoot);
	container.layout.padding.left = 20;
	container.layout.padding.right = 20;
	container.layout.padding.top = 20;
	container.layout.padding.bottom = 20;
	container.layout.gap = 40;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.fontSize = 36;
	text.content.text = "Built for best-in-class reliability and uptime";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Authentication is core infrastructure for your business, so reliability and uptime are critically important for your business.";
	////text.layout.width.type = containerSize.HUG;
	////text.layout.height.type = containerSize.HUG;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"At Stytch, we’ve invested in our platform’s infrastructure to ensure that we can always support your business and your customers.";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	container = makeFlexData(flexRoot);
	container.layout.alignY = contentAlign.CENTER;
	container.layout.padding.left = 60;
	container.layout.padding.right = 60;
	container.layout.padding.top = 40;
	container.layout.padding.bottom = 40;
	container.layout.gap = 32;
	container.layout.borderRadius = 6;
	container.background.type = backgrounds.COLOR;
	container.background.value = Themes.StychA.tokens["--page-color"];
	container.theme = Themes.StychA;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.alignY = contentAlign.CENTER;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/6840aafc-75b1-44da-836a-54517176cd77.png";
	img.content.size = contentSize.FIT;
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 50;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cloud-native architecture";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.alignY = contentAlign.CENTER;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/acf6e010-49fd-4c79-a5e0-b5dabbd9dab7.png";
	img.content.size = contentSize.FIT;
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 50;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "99.999% uptime SLA";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.alignY = contentAlign.CENTER;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/40e02744-0eea-4348-8de2-cc583b325a29.png";
	img.content.size = contentSize.FIT;
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 50;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Fully-redundant infrastructure";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.alignY = contentAlign.CENTER;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/727b680b-a9ce-42ef-b2ef-d7dd2f3164bd.png";
	img.content.size = contentSize.FIT;
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 50;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Low latency (<30 ms on average)";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	flex = makeFlexData(container);
	flex.layout.direction = contentDirection.HORIZONTAL;
	flex.layout.height.type = containerSize.HUG;
	flex.layout.alignY = contentAlign.CENTER;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/651d4ca2-98a8-4e3f-a802-47b5b21c965e.png";
	img.content.size = contentSize.FIT;
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 50;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Transparent status page & public post-mortems";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	return page;
};

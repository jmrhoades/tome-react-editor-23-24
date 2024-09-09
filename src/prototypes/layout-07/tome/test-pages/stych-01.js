import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import { makePageData, makeFlexData, makeFlexRootData, makeTextData, makeImageData, makeIconData, containerSize } from "../TileData";

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

	// Stych page 1
	page = makePageData(tome);
	page.theme = Themes.StychB;

	flexRoot = makeFlexRootData(page);
	
	

	flex = makeFlexData(flexRoot);
	//flex.layout.height = containerSize.HUG;
	flex.layout.padding.left = 16;
	flex.layout.padding.right = 16;
	flex.layout.padding.top = 12;
	flex.layout.padding.bottom = 12;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Why Stytch vs. building in-house";

	// 3-col container
	const threeColContainer = makeFlexData(flexRoot);
	threeColContainer.layout.direction = "horizontal";
	//threeColContainer.layout.justifyContent = "start";
	threeColContainer.layout.gap = 16;

	// Col 1
	const col1 = makeFlexData(threeColContainer);
	col1.layout.alignContent = "start";
	col1.layout.gap = 24;
	col1.layout.padding.left = 16;
	col1.layout.padding.right = 16;
	col1.layout.padding.top = 12;
	col1.layout.padding.bottom = 12;

	img = makeImageData(col1);
	img.content.src = "/images/aad866bd-edda-46b6-a9d8-206d2da27f12.png";
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = imgWidth;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = imgWidth;

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Time to market";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "In-house: Engineering projects consistently overrun timeline and budget";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: Integrate passwordless in less than a week";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	// Col 2
	const col2 = makeFlexData(threeColContainer);
	col2.layout.alignContent = "start";
	col2.layout.gap = 24;
	col2.layout.padding.left = 16;
	col2.layout.padding.right = 16;
	col2.layout.padding.top = 12;
	col2.layout.padding.bottom = 12;

	img = makeImageData(col2);
	img.content.src = "/images/e91fb104-60b7-4eba-bc0c-0db87417e1a7.png";
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = imgWidth;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = imgWidth;

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Conversion expertise";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"In-house: Build flows you believe will maximize conversion, but these have high switching costs ";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: A/B test flexible authentication options to meet users where they are";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	// Col 3
	const col3 = makeFlexData(threeColContainer);
	col3.layout.alignContent = "start";
	col3.layout.gap = 24;
	col3.layout.padding.left = 16;
	col3.layout.padding.right = 16;
	col3.layout.padding.top = 12;
	col3.layout.padding.bottom = 12;

	img = makeImageData(col3);
	img.content.src = "/images/4c5c9c69-b9f1-4423-b212-cfa36deced09.png";
	img.layout.aspectRatio = 1;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = imgWidth;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = imgWidth;

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Engineering debt";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"In-house: Need to dedicate lead engineers to authentication rather than Tome’s core value proposition";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: Monitor & manage changes in authentication and prevent surprising breaking changes";
	text.layout.width.type = containerSize.FILL;
	text.layout.height.type = containerSize.HUG;

	return page;
};

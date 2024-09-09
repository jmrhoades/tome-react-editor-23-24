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


    // Stych page 1
	page = makePageData(tome);
	page.theme = Themes.StychB;

	flexRoot = makeFlexData(page);

	flex = makeFlexData(flexRoot);
	flex.layout.height = "hug";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Why Stytch vs. building in-house";

	// 3-col container
	const threeColContainer = makeFlexData(flexRoot);
	threeColContainer.layout.direction = "horizontal";
	threeColContainer.layout.justifyContent = "start";

	// Col 1
	const col1 = makeFlexData(threeColContainer);

	img = makeImageData(col1);
	img.content.src = "/images/aad866bd-edda-46b6-a9d8-206d2da27f12.png";
	img.layout.width = imgWidth;

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Time to market";

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "In-house: Engineering projects consistently overrun timeline and budget";

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: Integrate passwordless in less than a week";

	// Col 2
	const col2 = makeFlexData(threeColContainer);

	img = makeImageData(col2);
	img.content.src = "/images/e91fb104-60b7-4eba-bc0c-0db87417e1a7.png";
	img.layout.width = imgWidth;

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Conversion expertise";

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"In-house: Build flows you believe will maximize conversion, but these have high switching costs ";

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: A/B test flexible authentication options to meet users where they are";

	// Col 3
	const col3 = makeFlexData(threeColContainer);

	img = makeImageData(col3);
	img.content.src = "/images/4c5c9c69-b9f1-4423-b212-cfa36deced09.png";
	img.layout.width = imgWidth;

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Engineering debt";

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"In-house: Need to dedicate lead engineers to authentication rather than Tome’s core value proposition";

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: Monitor & manage changes in authentication and prevent surprising breaking changes";

	


	return page;
};

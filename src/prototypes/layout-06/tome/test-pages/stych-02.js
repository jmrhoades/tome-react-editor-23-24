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

	page = makePageData(tome);
	page.theme = Themes.StychD;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	container = makeFlexData(flexRoot);
	container.layout.direction = "vertical";
	container.layout.alignContent = "start";
	container.layout.padding.x = 20;
	container.layout.padding.y = 20;
	container.layout.gap = 40;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.fontSize = 36;
	text.content.text = "Built for best-in-class reliability and uptime";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Authentication is core infrastructure for your business, so reliability and uptime are critically important for your business.";
	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"At Stytch, we’ve invested in our platform’s infrastructure to ensure that we can always support your business and your customers.";

	container = makeFlexData(flexRoot);
	container.layout.direction = "vertical";
	container.layout.alignContent = "center";
	container.layout.padding.x = 40;
	container.layout.padding.y = 40;
	container.layout.gap = 40;
	container.layout.borderRadius = 12;
	container.theme = Themes.StychA;

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.height = "hug";
	flex.layout.alignItems = "center";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/6840aafc-75b1-44da-836a-54517176cd77.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cloud-native architecture";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.height = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "start";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/acf6e010-49fd-4c79-a5e0-b5dabbd9dab7.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "99.999% uptime SLA";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.height = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "start";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/40e02744-0eea-4348-8de2-cc583b325a29.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Fully-redundant infrastructure";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.height = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "start";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/727b680b-a9ce-42ef-b2ef-d7dd2f3164bd.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Low latency (<30 ms on average)";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.height = "hug";
	flex.layout.alignItems = "center";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/651d4ca2-98a8-4e3f-a802-47b5b21c965e.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Transparent status page & public post-mortems";


	return page;
};

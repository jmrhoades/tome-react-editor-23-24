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

	// PAGE 1 -----------------
	page = makePageData(tome);
	page.theme = Themes.TomeDark;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	container = makeFlexData(flexRoot);
	container.layout.direction = "vertical";
	container.layout.alignContent = "start";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Title";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body1;
	text.content.text = "Paragraph";

	container = makeFlexData(flexRoot);
	container.layout.direction = "vertical";
    container.layout.alignContent = "start";

    item = makeFlexData(container);
	item.layout.direction = "horizontal";
    item.layout.justifyContent = "start";
    item.layout.alignItems = "center";
	item.layout.height = "hug";
    item.theme.tokens["backgroundColor"] = "var(--t2)";
	item.layout.borderRadius = 8;

	img = makeImageData(item);
	img.content.src = "/icons/HeartEmpty.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 1";

    item = makeFlexData(container);
	item.layout.direction = "horizontal";
    item.layout.justifyContent = "start";
    item.layout.alignItems = "center";
	item.layout.height = "hug";
    item.theme.tokens["backgroundColor"] = "var(--t2)";
	item.layout.borderRadius = 8;

	img = makeImageData(item);
	img.content.src = "/icons/ChartColumn.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 2";

    item = makeFlexData(container);
	item.layout.direction = "horizontal";
    item.layout.justifyContent = "start";
    item.layout.alignItems = "center";
	item.layout.height = "hug";
    item.theme.tokens["backgroundColor"] = "var(--t2)";
	item.layout.borderRadius = 8;

	img = makeImageData(item);
	img.content.src = "/icons/Clock.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 3";

    item = makeFlexData(container);
	item.layout.direction = "horizontal";
    item.layout.justifyContent = "start";
    item.layout.alignItems = "center";
	item.layout.height = "hug";
    item.theme.tokens["backgroundColor"] = "var(--t2)";
	item.layout.borderRadius = 8;

	img = makeImageData(item);
	img.content.src = "/icons/CommentAlt.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 4";

    item = makeFlexData(container);
	item.layout.direction = "horizontal";
    item.layout.justifyContent = "start";
    item.layout.alignItems = "center";
	item.layout.height = "hug";
    item.theme.tokens["backgroundColor"] = "var(--t2)";
	item.layout.borderRadius = 8;

	img = makeImageData(item);
	img.content.src = "/icons/Mail.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 5";


	return page;
};

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
	page.layout.scrolling = false;
	page.layout.scaleContent = false;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	//flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.gap = 0;
	card.layout.borderRadius = 8;
	card.layout.width = "hug";
	//card.layout.width = 360;
	card.layout.alignContent = "space-between";
	//card.layout.alignContent = "start";
	//card.theme.tokens["backgroundColor"] = "rgba(255, 86, 0, 1.0)";
	card.theme.tokens["backgroundColor"] = "#C6864B";

	//card.theme.tokens["--heading-font"] = "ABCDiatypeRoundedMonoVariable";
	//card.theme.tokens["--heading-weight"] = 200;
	card.theme.tokens["--heading-font"] = "Forevs";
	card.theme.tokens["--heading-weight"] = 400;
	
	card.theme.tokens["--heading-color"] = "rgba(255, 255, 255, 1.0)";
	card.theme.tokens["--body-color"] = "rgba(255, 255, 255, 1.0)";
	
	//card.theme.tokens["--body-font"] = "ABCDiatypeRoundedMonoVariable";
	card.theme.tokens["--body-font"] = "Forevs";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Display1;
	text.content.text = "v3";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Resize, rearrange & page lock interactions";
	text.layout.width = 160;

	row = makeFlexData(flexRoot);
	row.layout.direction = "vertical";
	row.layout.alignContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	// Card - Columns
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.width = "fill";
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/icons/Templates.svg";
	img.layout.aspectRatio = 1;
	img.layout.height = 48;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Columns";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Vertical grouping, mobile translation";

	row = makeFlexData(row);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	// Card - Columns
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.borderRadius = 8;
	card.theme.tokens["backgroundColor"] = "var(--t3)";

	img = makeImageData(card);
	img.content.src = "/icons/PagePortrait.svg";
	img.layout.aspectRatio = 1;
	img.layout.height = 48;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Containers";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cards, icon lists, components…";

	// Card - Columns
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.borderRadius = 8;
	card.theme.tokens["backgroundColor"] = "var(--t4)";

	img = makeImageData(card);
	img.content.src = "/icons/ArrowLeftRightOut.svg";
	img.layout.aspectRatio = 1;
	img.layout.height = 48;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Resizing";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Fit, fill, custom";

	return page;
};

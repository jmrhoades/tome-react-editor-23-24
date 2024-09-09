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
	page.layout.scrolling = true;
	page.layout.scaleContent = false;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "vertical";
	//flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	//flexRoot.layout.gap = 0;
	//flexRoot.theme.tokens["backgroundColor"] = "var(--t2)";

	card = makeFlexData(flexRoot);
	card.layout.direction = "horizontal";
	card.layout.justifyContent = "space-between";
	card.layout.alignItems = "center";
	card.layout.height = 220; //"hug";
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.layout.borderRadius = 8;
	//card.theme.tokens["backgroundColor"] = "rgba(255, 86, 0, 1.0)";
	//card.theme.tokens["backgroundColor"] = "#C6864B";
	//card.theme.tokens["--heading-font"] = "ABCDiatypeRoundedMonoVariable";
	//card.theme.tokens["--heading-weight"] = 200;
	//card.theme.tokens["--heading-color"] = "rgba(255, 255, 255, 1.0)";
	card.theme.tokens["--heading-font"] = "Forevs-Thin";
	

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Display1;
	text.content.text = "Layout v3";
	text.content.fontSize = 120;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Resize, rearrange & page lock interactions";
	text.layout.width = 140;


	


	//row = makeFlexData(flexRoot);
	//row.layout.direction = "horizontal";
	//row.layout.alignContent = "start";
	//row.layout.height = "fill";


	container = makeFlexData(flexRoot);
	container.layout.direction = "horizontal";
	//container.layout.alignContent = "start";

	// Card - Columns
	card = makeFlexData(container);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/kanban-view.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Columns";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Vertical grouping";

	// Card - Columns
	card = makeFlexData(container);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/brush.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Backgrounds";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Color, gradient, image";



	//container = makeFlexData(row);
	//container.layout.direction = "vertical";
	//container.layout.alignContent = "start";

	// Card - Containers
	card = makeFlexData(container);
	card.layout.direction = "vertical";
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.alignContent = "space-between";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/layers-two.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Containers";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cards, components";

	// Card - Resizing
	card = makeFlexData(container);
	card.layout.direction = "vertical";
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.alignContent = "space-between";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/arrow-expand-hor.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

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
	text.content.text = "Fill, hug, custom";

	container = makeFlexData(flexRoot);
	container.layout.direction = "horizontal";
	//container.layout.alignContent = "start";

	// Card - Rearrange
	card = makeFlexData(container);
	card.layout.direction = "vertical";
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.alignContent = "space-between";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/cursor-2.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Drag and drop";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Rearrange and reparent";

	// Card - Alignment
	card = makeFlexData(container);
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/focus-zoom-out.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Alignment";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Horizontal and vertical";

	//container = makeFlexData(row);
	//container.layout.direction = "vertical";
	//container.layout.alignContent = "start";

	// Card - Rearrange
	card = makeFlexData(container);
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/page-lock.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Page lock";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Constrain to 16x9";

	// Card - Alignment
	card = makeFlexData(container);
	card.layout.width = "fill";
	card.layout.height = "fill";
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/minimize-45.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Density";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Auto-scale content to fit";
	return page;
};

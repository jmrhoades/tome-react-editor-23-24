import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import {
	makePageData,
	makeFlexData,
	makeTextData,
	makeImageData,
	makeIconData,
	contentDirection,
	contentDistribute,
	contentAlign,
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

	// PAGE 1 -----------------
	page = makePageData(tome);
	
	page.layout.scrolling = true;
	page.layout.scaleContent = false;

	flexRoot = makeFlexData(page);

	card = makeFlexData(flexRoot);
	card.layout.direction = contentDirection.HORIZONTAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.alignY = contentAlign.CENTER;

	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 220; //"hug";

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

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL_WRAP;

	// Card - Columns
	card = makeFlexData(container);
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/kanban-view.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
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
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/brush.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Backgrounds";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Color, gradient, image";

	//container = makeFlexData(row);
	//container.layout.direction = contentDirection.VERTICAL;
	//container.layout.alignContent = "start";

	// Card - Containers
	card = makeFlexData(container);
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	// card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/layers-two.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
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
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/arrow-expand-hor.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
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

	// Card - Rearrange
	card = makeFlexData(container);
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/cursor-2.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
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
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/focus-zoom-out.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
	item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Alignment";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Horizontal and vertical";

	// Card - Rearrange
	card = makeFlexData(container);
	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/page-lock.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
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

	card.layout.direction = contentDirection.VERTICAL;
	card.layout.distribute = contentDistribute.SPACE_BETWEEN;
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 231;
	card.layout.height.type = containerSize.CUSTOM;
	card.layout.height.value = 172;
	card.layout.gap = 24;
	card.layout.borderRadius = 8;
	card.layout.padding.x = 12;
	card.layout.padding.y = 12;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#232323";
	//card.theme.tokens["border"] = "1px solid var(--t4)";

	img = makeImageData(card);
	img.content.src = "/central-icon-system/minimize-45.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	item = makeFlexData(card);
	item.layout.direction = contentDirection.VERTICAL;
	item.layout.height.type = containerSize.HUG;
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

import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import {
	makePageData,
	makeFlexData,
	makeTextData,
	makeImageData,
	makeIconData,
	contentDirection,
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

	page = makePageData(tome);

	page.layout.scrolling = true;
	page.layout.scaleContent = false;
	page.theme.tokens["backgroundColor"] = "#101012";

	flexRoot = makeFlexData(page);

	// Title container
	container = makeFlexData(flexRoot);
	container.layout.height.type = containerSize.HUG;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Alignment";

	// Columns container

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL;

	// Vertical direction container test

	item = makeFlexData(container);
	item.layout.borderRadius = 6;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#FEFC96";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 72;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 176;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 128;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	// Horizontal direction container test

	item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL;
	item.layout.borderRadius = 8;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#DCC3B8";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 72;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 176;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 128;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	// Horizontal wrapping direction container test

	item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL_WRAP;
	item.layout.borderRadius = 8;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#BCC6C2";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	flex = makeFlexData(item);
	flex.layout.borderRadius = 6;
	flex.layout.width.type = containerSize.CUSTOM;
	flex.layout.width.value = 24;
	flex.layout.height.type = containerSize.CUSTOM;
	flex.layout.height.value = 24;
	flex.background.type = backgrounds.COLOR;
	flex.background.value = "#1F1E22";

	return page;
};

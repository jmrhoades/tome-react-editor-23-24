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
	contentDistribute,
} from "../TileData";

export const makePage = tome => {
	let page = null;
	let flexRoot = null;
	let container = null;
	let header = null;
	let body = null;
	let tags = null;
	let tag = null;
	let card = null;
	let row = null;
	let col = null;
	let flex = null;
	let item = null;
	let text = null;
	let img = null;
	let icon = null;

	const iconSize = 24;

	// PAGE 1 -----------------
	page = makePageData(tome);
	page.theme = Themes.Dark;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.HORIZONTAL;
	flexRoot.layout.gap = 32;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.VERTICAL;
	container.layout.width.type = containerSize.CUSTOM;
	container.layout.width.value = 220;
	container.layout.gap = 48;

	header = makeFlexData(container);
	header.layout.direction = contentDirection.VERTICAL;
	header.layout.height.type = containerSize.HUG;
	header.layout.gap = 0;

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Heading1;
	text.content.color = "rgba(255,255,255,0.5)";
	text.content.text = "Subtitle";

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Title";

	body = makeFlexData(container);
	body.layout.direction = contentDirection.VERTICAL;
	body.layout.height.type = containerSize.HUG;

	text = makeTextData(body);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "rgba(255,255,255,1.0)";
	text.content.fontSize = 12;
	text.content.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `;

	text = makeTextData(body);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "rgba(255,255,255,1.0)";
	text.content.fontSize = 12;
	text.content.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `;

	tags = makeFlexData(container);
	tags.layout.direction = contentDirection.HORIZONTAL;
	tags.layout.height.type = containerSize.HUG;
	tags.layout.gap = 8;

	tag = makeFlexData(tags);
	tag.layout.direction = contentDirection.HORIZONTAL;
	tag.layout.width.type = containerSize.HUG;
	tag.layout.height.type = containerSize.HUG;
	tag.layout.padding.left = 8;
	tag.layout.padding.right = 8;
	tag.layout.padding.top = 4;
	tag.layout.padding.bottom = 4;
	tag.background.type = backgrounds.COLOR;
	tag.background.value = "#62656A";
	tag.layout.borderRadius = "10";

	text = makeTextData(tag);
	text.layout.width.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Caption;
	text.content.color = "rgba(255,255,255,1.0)";
	text.content.fontSize = 10;
	text.content.text = `Category`;

	tag = makeFlexData(tags);
	tag.layout.direction = contentDirection.HORIZONTAL;
	tag.layout.width.type = containerSize.HUG;
	tag.layout.height.type = containerSize.HUG;
	tag.layout.padding.left = 8;
	tag.layout.padding.right = 8;
	tag.layout.padding.top = 4;
	tag.layout.padding.bottom = 4;
	tag.background.type = backgrounds.COLOR;
	tag.background.value = "#91969C";
	tag.layout.borderRadius = "10";

	text = makeTextData(tag);
	text.layout.width.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Caption;
	text.content.color = "rgba(255,255,255,1.0)";
	text.content.fontSize = 10;
	text.content.text = `Category`;

	col = makeFlexData(flexRoot);
	col.layout.direction = contentDirection.HORIZONTAL;
	col.layout.gap = 12;

	container = makeFlexData(col);
	container.layout.direction = contentDirection.VERTICAL;
	container.layout.gap = 24;

	img = makeImageData(container);
	//img.content.src = "/daversa/stockx_shoe_01.png";
	//img.layout.width.type = containerSize.FILL;
	//img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 8;
	img.background.type = backgrounds.COLOR;
	img.background.value = "rgba(255,255,255,0.2)";

	text = makeTextData(container);
	text.layout.width.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Heading2;
	text.content.color = "rgba(255,255,255,1.0)";
	text.content.fontSize = 12;
	text.content.text = `Title`;

	text = makeTextData(container);
	text.layout.width.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "rgba(255,255,255,0.5)";
	text.content.fontSize = 12;
	text.content.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

	container = makeFlexData(col);
	container.layout.direction = contentDirection.VERTICAL;
	container.layout.gap = 24;

	img = makeImageData(container);
	//img.content.src = "/daversa/stockx_shoe_01.png";
	//img.layout.width.type = containerSize.FILL;
	//img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 8;
	img.background.type = backgrounds.COLOR;
	img.background.value = "rgba(255,255,255,0.2)";

	text = makeTextData(container);
	text.layout.width.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Heading2;
	text.content.color = "rgba(255,255,255,1.0)";
	text.content.fontSize = 12;
	text.content.text = `Title`;

	text = makeTextData(container);
	text.layout.width.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "rgba(255,255,255,0.5)";
	text.content.fontSize = 12;
	text.content.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

	return page;
};

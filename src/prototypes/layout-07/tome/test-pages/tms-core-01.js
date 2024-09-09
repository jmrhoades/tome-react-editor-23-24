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
	page.theme = Themes.Light;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.VERTICAL;
	flexRoot.layout.gap = 32;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL;
	container.layout.height.type = containerSize.HUG;
	container.layout.gap = 48;

	header = makeFlexData(container);
	header.layout.direction = contentDirection.VERTICAL;
	header.layout.width.type = containerSize.CUSTOM;
	header.layout.width.value = 220;
	header.layout.height.type = containerSize.HUG;
	header.layout.gap = 0;

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Caption;
	text.content.color = "rgba(0,0,0,0.5)";
	text.content.fontSize = 12;
	text.content.text = "Caption";
	text.layout.padding.bottom = 8;

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Title of Section";

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Heading1;
	text.content.color = "rgba(0,0,0,0.5)";
	text.content.text = "Subtitle";

	text = makeTextData(container);
    text.layout.height.type = containerSize.FILL;
	text.content.textStyle = TextStyles.Body2;
	
	text.content.text =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	col = makeFlexData(flexRoot);
	col.layout.direction = contentDirection.HORIZONTAL;

	container = makeFlexData(col);
	container.layout.direction = contentDirection.VERTICAL;

	row = makeFlexData(container);
	row.layout.direction = contentDirection.HORIZONTAL;

	img = makeImageData(row);
	img.content.src = "/images/placeholder01.jpg";
	img.layout.width.type = containerSize.FILL;
	img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 6;

	img = makeImageData(row);
	img.content.src = "/images/placeholder01.jpg";
	img.layout.width.type = containerSize.FILL;
	img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 6;

	row = makeFlexData(container);
	row.layout.direction = contentDirection.HORIZONTAL;

	img = makeImageData(row);
	img.content.src = "/images/placeholder01.jpg";
	img.layout.width.type = containerSize.FILL;
	img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 6;

	img = makeImageData(row);
	img.content.src = "/images/placeholder01.jpg";
	img.layout.width.type = containerSize.FILL;
	img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 6;

	container = makeFlexData(col);
	container.layout.direction = contentDirection.VERTICAL;

	img = makeImageData(container);
	img.content.src = "/images/placeholder01.jpg";
	img.layout.width.type = containerSize.FILL;
	img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 6;

	return page;
};

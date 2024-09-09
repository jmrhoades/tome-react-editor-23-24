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
	page.theme = Themes.Light;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.HORIZONTAL;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.VERTICAL;


	text = makeTextData(container);
	text.content.textStyle = TextStyles.Display2;
	text.content.text = "Our impact & consumer searches";
	text.content.fontSize = 50;
	text.content.fontWeight = 400;
	text.layout.height.type = containerSize.HUG;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"The catalytic talent we recruit continues to disrupt and transform the tech industry we serve. ";
	text.layout.height.type = containerSize.HUG;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL_WRAP;
	container.layout.alignX = contentAlign.CENTER;
	container.layout.alignY = contentAlign.CENTER;
	container.layout.gap = 0;
	container.layout.borderRadius = 16;
	container.background.type = backgrounds.COLOR;
	container.background.value = "#F4F4F4";
	
	let logoCardWidth = 205;
	let logoCardHeight = 132;

	item = makeFlexData(container);
	item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.width.type = containerSize.CUSTOM;
	item.layout.width.value = logoCardWidth;
	item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = logoCardHeight;

	img = makeImageData(item);
	img.content.src = "/logos/Instacart_idjaOCZQGt_3.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 34;
	img.layout.height.value = 42;
	img.layout.aspectRatio = img.layout.width.value / img.layout.height.value;

	item = makeFlexData(container);
	item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.width.type = containerSize.CUSTOM;
	item.layout.width.value = logoCardWidth;
	item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = logoCardHeight;

	img = makeImageData(item);
	img.content.src = "/logos/Spotify.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 123;
	img.layout.height.value = 37;
	img.layout.aspectRatio = img.layout.width.value / img.layout.height.value;

	item = makeFlexData(container);
	item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.width.type = containerSize.CUSTOM;
	item.layout.width.value = logoCardWidth;
	item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = logoCardHeight;

	img = makeImageData(item);
	img.content.src = "/logos/Peloton_Black.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 164;
	img.layout.height.value = 67;
	img.layout.aspectRatio = img.layout.width.value / img.layout.height.value;

	item = makeFlexData(container);
	item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.width.type = containerSize.CUSTOM;
	item.layout.width.value = logoCardWidth;
	item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = logoCardHeight;

	img = makeImageData(item);
	img.content.src = "/logos/Doordash.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 164;
	img.layout.height.value = 20;
	img.layout.aspectRatio = img.layout.width.value / img.layout.height.value;

	item = makeFlexData(container);
	item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.width.type = containerSize.CUSTOM;
	item.layout.width.value = logoCardWidth;
	item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = logoCardHeight;

	img = makeImageData(item);
	img.content.src = "/logos/Reddit.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 123;
	img.layout.height.value = 35;
	img.layout.aspectRatio = img.layout.width.value / img.layout.height.value;

	item = makeFlexData(container);
	item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.width.type = containerSize.CUSTOM;
	item.layout.width.value = logoCardWidth;
	item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = logoCardHeight;

	img = makeImageData(item);
	img.content.src = "/logos/Nextdoor.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 164;
	img.layout.height.value = 23;
	img.layout.aspectRatio = img.layout.width.value / img.layout.height.value;

	return page;
};

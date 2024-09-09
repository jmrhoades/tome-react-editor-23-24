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
	containerSize,
	contentDistribute,
	backgrounds,
	contentAlign,
} from "../TileData";

export const makePage = tome => {
	let page = null;
	let flexRoot = null;
	let container = null;
	let card = null;
	let item = null;
	let text = null;
	let img = null;
	let line = null;
	let icon = null;

	page = makePageData(tome);
	page.theme = Themes.StychC;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.alignX = contentAlign.CENTER;

	// Text container
	container = makeFlexData(flexRoot);
	container.layout.alignX = contentAlign.CENTER;
	container.layout.alignY = contentAlign.CENTER;

	// Text
	text = makeTextData(container);
	text.layout.alignX = contentAlign.CENTER;
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Join other leading teams that have switched to Stytch";
	text.content.fontSize = 34;
	text.content.fontWeight = 800;
	text.layout.height.type = containerSize.HUG;

	// Quote
	card = makeFlexData(flexRoot);
	card.layout.width.type = containerSize.CUSTOM;
	card.layout.width.value = 800;
	card.layout.height.type = containerSize.HUG;
	card.layout.padding.left = 48;
	card.layout.padding.right = 48;
	card.layout.padding.top = 32;
	card.layout.padding.bottom = 32;
	card.layout.borderRadius = 24;
	card.layout.gap = 32;
	card.theme = Themes.StychD;
	card.background.type = backgrounds.COLOR;
	card.background.value = "#1E2F3C";

	// Quote Text
	text = makeTextData(card);
	text.content.text = `“We migrated thousands of organizations and tens of millions of users from Auth0 to Stych in about a month. It was far and away the easiest migration I’ve ever worked on.”`;
	text.content.fontSize = 24;
	text.content.align = "center";

	item = makeFlexData(card);
	item.layout.direction = contentDirection.HORIZONTAL;

	item.layout.alignY = contentAlign.CENTER;
	item.layout.alignX = contentAlign.CENTER;
	item.layout.gap = 24;
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	// Logo
	img = makeImageData(item);
	img.content.src = "/logos/tome-lockup-210x68.svg";
	img.layout.aspectRatio = 210 / 68;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 64;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	// Author
	text = makeTextData(item);
	text.content.text = `<span style="font-weight:bold">Keith Peiris</span>, CEO, Tome`;
	text.content.fontSize = 13;
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 144;
	//text.layout.height.type = containerSize.HUG;

	// Logo container
	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL;
	container.layout.alignY = contentAlign.CENTER;
	container.layout.padding.left = 48;
	container.layout.padding.right = 48;
	container.layout.gap = 0;
	container.layout.distribute = contentDistribute.SPACE_BETWEEN;

	img = makeImageData(container);
	img.content.src = "/logos/cisco-900x472.png";
	img.layout.aspectRatio = 900 / 472;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	img = makeImageData(container);
	img.content.src = "/logos/groq-800x295.png";
	img.layout.aspectRatio = 800 / 295;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	img = makeImageData(container);
	img.content.src = "/logos/clearbit-600x176.png";
	img.layout.aspectRatio = 600 / 176;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	img = makeImageData(container);
	img.content.src = "/logos/zapier-2000x542.png";
	img.layout.aspectRatio = 2000 / 542;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	img = makeImageData(container);
	img.content.src = "/logos/replit-966x258.png";
	img.layout.aspectRatio = 966 / 258;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	img = makeImageData(container);
	img.content.src = "/logos/hex-2048x844.png";
	img.layout.aspectRatio = 2048 / 844;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	img = makeImageData(container);
	img.content.src = "/logos/orb-2048x838.png";
	img.layout.aspectRatio = 2048 / 834;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 80;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	return page;
};

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

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.VERTICAL;


	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL;
	container.layout.distribute = contentDistribute.SPACE_BETWEEN;
	container.layout.alignY = contentAlign.START;
	container.layout.height.type = containerSize.FILL;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Business review and intake";
	text.content.fontSize = 36;

	img = makeImageData(container);
	img.content.src = "/daversa/StockX_Gray_Digital_RGB.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 90;
	img.layout.height.value = 18;
	img.layout.aspectRatio = 360 / 72;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL;
	container.layout.distribute = contentDistribute.SPACE_BETWEEN;
	container.layout.height.type = containerSize.FILL;
	//container.layout.alignY = contentAlign.CENTER;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
    text.content.fontSize = 16;
    text.content.color = "rgba(255,255,255,0.5)";
	text.content.text = `
    <div style="font-size: 1.2em; margin-bottom: 0.5em; color: #fff; ">StockX</div>
    <ul>
    <li>Disruption of platform</li>
    <li>Interactive and competitive gaming is the new gaming paradigm</li>
    <li>To provide that opportunity on mobile devices puts you in the middle of this explosive ecosystem    </li>
    <li>A lot of companies get funding today, but it's a small group that has a founding team, story, vision, and revenue growth to back it all up</li>
    </ul>
    `;

	img = makeImageData(container);
	img.content.src = "/daversa/stockx_shoe_01.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 400;
	img.layout.height.value = 250;
	img.layout.aspectRatio = 1600 / 1000;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.HORIZONTAL;
	container.layout.height.type = containerSize.HUG;
	//container.layout.alignX = contentAlign.CENTER;
	//container.layout.alignY = contentAlign.CENTER;
	container.layout.gap = 40;
    container.layout.padding.left = 48;
	container.layout.padding.right = 48;
	container.layout.padding.top = 48;
	container.layout.padding.bottom = 48;
	container.layout.borderRadius = 16;
	container.background.type = backgrounds.COLOR;
	container.background.value = "#161616";

	item = makeFlexData(container);
	item.layout.width.type = containerSize.FILL;
	item.layout.height.type = containerSize.HUG;
    item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Title;
	text.content.text = `3x`;
	text.content.color = "#56A7C1";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
    text.content.fontSize = 16;
	text.content.text = `Stat of disruption`;
    text.content.color = "rgba(255,255,255,0.7)";

    item = makeFlexData(container);
	item.layout.width.type = containerSize.FILL;
	item.layout.height.type = containerSize.HUG;
    item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Title;
	text.content.text = `6%`;
	text.content.color = "#56A7C1";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
    text.content.fontSize = 16;
	text.content.text = `Growth last year`;
    text.content.color = "rgba(255,255,255,0.7)";

    item = makeFlexData(container);
	item.layout.width.type = containerSize.FILL;
	item.layout.height.type = containerSize.HUG;
    item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Title;
	text.content.text = `2M`;
	text.content.color = "#56A7C1";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
    text.content.fontSize = 16;
	text.content.text = `Stat for the industry`;
    text.content.color = "rgba(255,255,255,0.7)";

    item = makeFlexData(container);
	item.layout.width.type = containerSize.FILL;
	item.layout.height.type = containerSize.HUG;
    item.layout.gap = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Title;
	text.content.text = `8x`;
	text.content.color = "#56A7C1";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
    text.content.fontSize = 16;
	text.content.text = `Additional stats`;
    text.content.color = "rgba(255,255,255,0.7)";

	return page;
};

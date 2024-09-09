import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import { makePageData, makeFlexData, makeTextData, makeImageData, makeIconData, contentDirection, contentAlign, containerSize, backgrounds } from "../TileData";

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

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = contentDirection.HORIZONTAL;

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.VERTICAL;
	container.layout.padding.x = 16;
	container.layout.padding.y = 12;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Title";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body1;
	text.content.text = "Paragraph";

	container = makeFlexData(flexRoot);
	container.layout.direction = contentDirection.VERTICAL;

    item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.layout.borderRadius = 8;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#232323";

	img = makeImageData(item);
	img.content.src = "/icons/HeartEmpty.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 1";

    item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.layout.borderRadius = 8;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#232323";

	img = makeImageData(item);
	img.content.src = "/icons/ChartColumn.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 2";

    item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.layout.borderRadius = 8;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#232323";

	img = makeImageData(item);
	img.content.src = "/icons/Clock.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 3";

    item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.layout.borderRadius = 8;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#232323";

	img = makeImageData(item);
	img.content.src = "/icons/CommentAlt.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 4";

    item = makeFlexData(container);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
	item.layout.padding.x = 12;
	item.layout.padding.y = 12;
	item.layout.borderRadius = 8;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#232323";

	img = makeImageData(item);
	img.content.src = "/icons/Mail.svg";
	img.layout.aspectRatio = 1;
	img.layout.width = 40;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "List item 5";


	return page;
};

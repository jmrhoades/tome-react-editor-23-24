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
	contentSize,
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
	flexRoot.layout.direction = contentDirection.HORIZONTAL;
	
	col = makeFlexData(flexRoot);
	col.layout.direction = contentDirection.VERTICAL;
	col.layout.width.type = containerSize.FILL;
	//col.layout.width.type = containerSize.CUSTOM;
	//col.layout.width.value = 385;
	col.layout.height.type = containerSize.FILL;
	col.layout.distribute = contentDistribute.SPACE_BETWEEN;

	header = makeFlexData(col);
	header.layout.direction = contentDirection.VERTICAL;
	header.layout.height.type = containerSize.HUG;
	header.layout.gap = 0;

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Case study";

	text = makeTextData(header);
	text.content.textStyle = TextStyles.Title;
	text.content.color = "var(--body-color)";
	text.content.text = "Title here";

	tags = makeFlexData(col);
	tags.layout.direction = contentDirection.VERTICAL;
	tags.layout.height.type = containerSize.HUG;
	tags.layout.gap = 0;

	text = makeTextData(tags);
	text.content.textStyle = TextStyles.Caption;
	text.content.color = "var(--heading-color)";
	text.content.text = "Client";

	text = makeTextData(tags);
	text.content.textStyle = TextStyles.Caption;
	text.content.color = "var(--heading-color)";
	text.content.text = "Project";

	img = makeImageData(flexRoot);
	img.content.src = "/images/placeholder01.jpg";
	img.content.size = contentSize.FILL;
	img.layout.width.type = containerSize.FILL;
	img.layout.height.type = containerSize.FILL;
	img.layout.borderRadius = 6;

	return page;
};

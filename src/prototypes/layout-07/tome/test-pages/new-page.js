import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import { makePageData, makeFlexData, makeTextData, makeImageData, makeIconData, containerSize, contentDirection } from "../TileData";

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

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 12;
	flexRoot.layout.padding.y = 12;

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Untitled";
	//text.layout.width.type = containerSize.HUG;
	//text.layout.height.type = containerSize.HUG;

	return page;
};

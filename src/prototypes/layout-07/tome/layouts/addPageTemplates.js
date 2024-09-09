import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import { makePageData, makeFlexRootData, makeFlexData, makeTextData, makeImageData, makeIconData, containerSize, contentDirection } from "../TileData";


export const createNewPageData = (pageId, currentPage) => {
	const page = makeBlankPage(currentPage);
	return page;
};

const makeBlankPage = currentPage => {

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

	page = makePageData();
	page.theme = currentPage.theme;
	page.layout.scrolling = true;
	page.layout.scaleContent = false;

	flexRoot = makeFlexRootData(page);
	

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Untitled";
	text.layout.width.type = containerSize.FILL;
	//text.layout.height.type = containerSize.HUG;

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Untitled";
	text.layout.width.type = containerSize.FILL;
	//text.layout.height.type = containerSize.FILL;

	return page;
};
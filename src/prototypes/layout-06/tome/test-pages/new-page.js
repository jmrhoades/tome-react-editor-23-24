import { Themes } from "../../ds/Themes";
import { TextStyles } from "../../tiles/Text";
import { makePageData, makeFlexData, makeTextData, makeImageData, makeIconData } from "../TileData";

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
	page.theme = Themes.TomeDark;
	page.layout.scrolling = true;
	page.layout.scaleContent = false;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "vertical";
	flexRoot.layout.padding.x = 16;
	flexRoot.layout.padding.y = 12;

	

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Untitled";

	return page;
};

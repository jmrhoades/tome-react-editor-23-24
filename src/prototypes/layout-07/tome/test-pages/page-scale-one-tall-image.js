import { Themes } from "../Themes";
import { TextStyles } from "../../tiles/Text";
import {
	makePageData,
	makeFlexData,
	makeTextData,
	makeImageData,
	makeIconData,
	contentDirection,
	contentAlign,
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
	
	page.layout.scrolling = false;
	page.layout.scaleContent = false;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = contentDirection.VERTICAL;
	flexRoot.layout.alignX = contentAlign.CENTER;
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/unsplash/jeremy-bishop-8xznAGy4HcY-unsplash-2.webp";
	img.layout.aspectRatio = 1333 / 2000;
	img.layout.width = 800;
	img.layout.height = 1200;

	return page;
};

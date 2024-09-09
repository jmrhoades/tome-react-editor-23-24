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

	page = makePageData(tome);
	page.theme = Themes.TomeDark;
    //page.theme.tokens["backgroundColor"] = "#101010";

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "vertical";
    

	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	//row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

    //row.layout.width = "75%";
    //row.layout.gap = 0;

	card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-302t9q9AQ9w-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
	card.layout.width = "1fr";

	card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-wacxt0TK1DE-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

	card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-svarHFPAVy8-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

    card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-wtT9kc2HGBA-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

    card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-RKLdZHLVdcs-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	//row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
    //row.layout.gap = 0;

	card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-YCln1WGVyxE-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

	card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-LKf7LFxbdo8-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

	card = makeFlexData(row);
	card.theme.tokens["backgroundColor"] = "var(--t3)";
    card.theme.tokens["backgroundImage"] = 'url(/unsplash/philip-oroni-h_T0i4mgc6Q-unsplash.jpg)';
    card.theme.tokens["borderRadius"] = '6px';
    card.layout.width = "1fr";

	/*
	
    img = makeImageData(row);
    img.content.src = "/unsplash/philip-oroni-RKLdZHLVdcs-unsplash.jpg";
    img.content.size = "fill";
	img.layout.width = "fill";
	img.layout.height = "fill";
    
    img = makeImageData(row);
    img.content.src = "/unsplash/philip-oroni-wacxt0TK1DE-unsplash.jpg";
    img.content.size = "fill";
	img.layout.width = "fill";
	img.layout.height = "fill";

    img = makeImageData(row);
    img.content.src = "/unsplash/philip-oroni-svarHFPAVy8-unsplash.jpg";
    img.content.size = "fill";
	img.layout.width = "fill";
	img.layout.height = "fill";

    */

	return page;
};

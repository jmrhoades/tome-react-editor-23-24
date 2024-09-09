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

	const iconSize = 24;

	// PAGE 1 -----------------
	page = makePageData(tome);

	flexRoot = makeFlexRootData(page);
	
	
	

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "How We’re Different";

	img = makeImageData(flexRoot);
	img.content.src = "/daversa/StarEmpty.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = iconSize;
	img.layout.height.value = iconSize;
	img.layout.aspectRatio = 1;

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = 16;
	//text.content.color = "rgba(255,255,255,0.5)";
	text.content.text = `
    <div style="font-size: 1.1em; margin-bottom: 0.5em; color: #DF533C;">Boutique Firm</div>
    <p>
	We’re a specialist firm that has been ascending for 30 years with unprecedented reach and unmatched access.
    </p>
    `;

	img = makeImageData(flexRoot);
	img.content.src = "/daversa/ChartLine.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = iconSize;
	img.layout.height.value = iconSize;
	img.layout.aspectRatio = 1;

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = 16;
	//text.content.color = "rgba(255,255,255,0.5)";
	text.content.text = `
    <div style="font-size: 1.1em; margin-bottom: 0.5em; color: #DF533C;">High Performance Teams</div>
    <p>
	We have less than 15 tightly knit Partners who manage high performance teams...more like McKinsey. AND 8-10 specialists that deliver on global searches.
    </p>
    `;

	img = makeImageData(flexRoot);
	img.content.src = "/daversa/Globe.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = iconSize;
	img.layout.height.value = iconSize;
	img.layout.aspectRatio = 1;

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = 16;
	//text.content.color = "rgba(255,255,255,0.5)";
	text.content.text = `
    <div style="font-size: 1.1em; margin-bottom: 0.5em; color: #DF533C;">Global Talent Marketplace</div>
    <p>
	These high impact teams have collectively developed a global talent marketplace that I access for any project that I do.
    </p>
    `;

	img = makeImageData(flexRoot);
	img.content.src = "/daversa/PeopleAlt.svg";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = iconSize;
	img.layout.height.value = iconSize;
	img.layout.aspectRatio = 1;

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = 16;
	//text.content.color = "rgba(255,255,255,0.5)";
	text.content.text = `
    <div style="font-size: 1.1em; margin-bottom: 0.5em; color: #DF533C;">Daversa Partner Network</div>
    <p>
	When you hire me, you get the Daversa Partner network and scale which is the reason we've been able to build an incredible network in NA, LATAM, EUROPE, ASIA & AUSTRALIA.
    </p>
    `;

	return page;
};

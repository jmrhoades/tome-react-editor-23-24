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
	const fontSize = 14;

	// PAGE 1 -----------------
	page = makePageData(tome);

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.VERTICAL;
	flexRoot.layout.gap = 40;

	row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Heading2;
	text.content.fontSize = fontSize;
	text.content.text = "Feature";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading2;
	text.content.fontSize = fontSize;
	text.content.text = "Job";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading2;
	text.content.fontSize = fontSize;
	text.content.text = "Importance";

	row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Search";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "I want to quickly find collateral";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🔴 High</span>
    <p>Without filtering or favorites, this is by far the fastest way to find a specific opportunity</p>`;

	row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Salesforce intergration";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly find collateral
    <br />
    I want to know what collateral is most effective`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🔴 High</span>
    <p>Makes opportunities useful to many more enterprises</p>`;


    row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Favorite";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly find collateral to advance active work`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🟠  Medium</span>
    <p>With a list that's constantly updating, you can't build muscle memory about selecting the right one in the list (and the work you're doing might not live in Personal). Having to search for an opportunity every time you want to access it would be annoying.</p>`;


    row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Favorite";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly find collateral to advance active work`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🟠  Medium</span>
    <p>With a list that's constantly updating, you can't build muscle memory about selecting the right one in the list (and the work you're doing might not live in Personal). Having to search for an opportunity every time you want to access it would be annoying.</p>`;


    row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Filter, sort, & customize columns";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly find collateral to reference past work`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🟠  Medium</span>
    <p>Helps prevent the need to bounce between Tome and your CRM.</p>`;


    row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Write to CRM";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly create collateral`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🟠  Medium</span>
    <p>Could be annoying for some people/ orgs to have to switch tools in order to create a new opportunity. Could be helpful in the context of Tome being used for research (before any contact has been made with a prospect/ early on in opportunity lifecycle).</p>`;

    row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Interactive opportunity sidebar";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly find collateral to reference past work`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🟡 Low</span>
    <p>A form of filtering, but less powerful/ central than the one offered in the opportunities tab. Helps prevent the need to bounce between Tome and your CRM.</p>`;



    row = makeFlexData(flexRoot);
    row.layout.gap = 20;
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;

	text = makeTextData(row);
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 240;
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = "Account view";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `I want to quickly find collateral to reference past work`;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text = `<span style="color: #fff">🟡 Low</span>
    <p>Most companies in our ICP will have 1 opportunity per company, so there isn't much value in an aggregated view of all opportunities for a given company for them.</p>`;


	return page;
};

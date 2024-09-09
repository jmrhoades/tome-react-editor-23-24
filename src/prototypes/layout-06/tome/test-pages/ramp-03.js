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
	let imgWidth = 90;

	// Ramp Sales - customer testimonial
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.gap = 48;

	// Col 1
	col = makeFlexData(flexRoot);
	col.layout.direction = "vertical";
	col.layout.alignContent = "start";
	col.layout.gap = 24;

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Walther Farms closes their books 10x faster and is able to plan for the future";

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"All in one card and expense management platform eliminates the need for manual reconciliation each month";

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Automated receipt matching gets rid of duplicative transactions and time spent on chasing employees for expense reports";

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Reducing manual work and modernizing the finance stack allows leadership to optimize for higher level and more strategic employees";

	flex = makeFlexData(col);
	flex.layout.height = "hug";
	flex.layout.padding.y = 16;
	flex.layout.padding.x = 0;
	flex.layout.gap = 4;
	flex.theme.tokens["borderTop"] = "1px solid var(--t4)";
	flex.theme.tokens["borderBottom"] = "1px solid var(--t4)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Products used";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cards, Expense Management, Reimbursements";

	// Row
	row = makeFlexData(col);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "18 days";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Saved on month end close";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "$400k+";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Net gain from Ramp";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "10 hours";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Saved monthly with streamlined processes";

	// Col 2
	col = makeFlexData(flexRoot);
	col.layout.direction = "vertical";
	col.layout.alignContent = "start";
	col.layout.width = 400;
	

	img = makeImageData(col);
	img.content.src = "/images/ramp-customers-walther-farm.webp";
	img.layout.aspectRatio = 1536 / 1536;
	img.layout.size = "fill";
	img.layout.width = 400;
	img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(col);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.height = "hug";
	flex.layout.padding.y = 20;
	flex.layout.padding.x = 20;
	flex.layout.borderRadius = 8;
	flex.theme.tokens["backgroundColor"] = "var(--z0)";

	img = makeImageData(flex);
	img.content.src = "/images/ramp-customers-walther-farm-2.jpeg";
	img.layout.aspectRatio = 713 / 823;
	img.layout.width = 40;

	flex = makeFlexData(flex);
	flex.layout.direction = "vertical";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.layout.width = "hug";
	text.content.text =
		"“Ramp allowed me to build a team of highly skilled people who have better thought processes and who can tackle more strategic projects, rather than burning time on manual work.”";

	text = makeTextData(flex);
	text.layout.width = "hug";
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Josh Reeves, CFO, Walther Farms";
	text.content.fontWeight = 550;
	text.content.color = "var(--heading-color)";

	return page;
};

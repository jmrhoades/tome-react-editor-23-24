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
	containerSize,
	contentDistribute,
	backgrounds,
	contentAlign,
	contentSize,
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
	let imgWidth = 90;

	// Ramp Sales - icon list, photo + quote col
	page = makePageData(tome);
	page.theme = Themes.RampB;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.direction = contentDirection.HORIZONTAL;
	flexRoot.layout.gap = 48;

	// Col 1
	col = makeFlexData(flexRoot);
	col.layout.gap = 24;

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "A New Way Forward For Finance";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;
	row.layout.gap = 24;

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-computer.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 144 / 144;
	img.layout.width.value = 32;
	img.layout.height.value = 32;
	// img.layout.padding.x = 12;
	// img.layout.padding.y = 12;
	// img.theme.tokens["backgroundColor"] = "var(--t2)";
	// img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(row);
	flex.layout.height.type = containerSize.HUG;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Optimize your business spend";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"A modern corporate card combined with intuitive software to change the way you control business spend. Providing an easier way to submit expenses and pay bills in a single platform – giving time back to focus on top priorities. ";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;
	row.layout.gap = 24;

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-clock.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 144 / 144;
	img.layout.width.value = 32;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;
	
	flex = makeFlexData(row);
	flex.layout.height.type = containerSize.HUG;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Increase financial operations efficiency";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Scale the impact of your finance team by automating routine work. Stay compliant and eliminate manual tasks with proactive policy controls, configurable approval workflows, and AI-powered reconciliation.";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;
	row.layout.gap = 24;

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-target.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 144 / 144;
	img.layout.width.value = 32;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;


	flex = makeFlexData(row);
	flex.layout.height.type = containerSize.HUG;

	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Connect your processes and ERP";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Ramp securely integrates with your existing technology investments and reliably syncs with your ERP, enabling you to accelerate your monthly close whether you operate domestically or globally.";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = contentDirection.HORIZONTAL;
	row.layout.height.type = containerSize.HUG;
	row.layout.gap = 24;

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-line-chart.png";
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 144 / 144;
	img.layout.width.value = 32;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;


	flex = makeFlexData(row);
	flex.layout.height.type = containerSize.HUG;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Improve company financial health";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Let Ramp Intelligence give you full visibility over all business spend to make confident finance decisions. Optimize cash flow with access to AI-powered real-time reporting, savings insights from millions of transactions, and a finance copilot.";

	// Col 2
	col = makeFlexData(flexRoot);

	img = makeImageData(col);
	img.content.size = contentSize.FIT;
	img.content.src = "/images/ramp-3-images.png";
	//img.layout.width.type = containerSize.CUSTOM;
	//img.layout.height.type = containerSize.CUSTOM;
	img.layout.aspectRatio = 1354 / 1352;
	//img.layout.width.value = 400;
	//img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	flex = makeFlexData(col);
	flex.layout.height.type = containerSize.HUG;
	flex.layout.alignX = contentAlign.CENTER;
	flex.layout.gap = 8;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.align = "center";
	text.content.text =
		"“We don’t have to wait until the end of the month to course correct—the real time insights and visibility from Ramp help us know exactly how the business is performing at a glance.”";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Steve Padis, SVP Finance & Strategy";
	text.layout.width.type = containerSize.CUSTOM;
	text.layout.width.value = 224;

	img = makeImageData(flex);
	img.content.src = "/images/ramp-logo-barrys.png";
	img.layout.aspectRatio = 2048 / 418;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.width.value = 60;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;
	return page;
};

import { Themes } from "../ds/Themes";
import { TextStyles } from "../tiles/view/Text";
import { makeTomeData, makePageData, makeFlexData, makeTextData, makeImageData, makeIconData } from "./TileData";

export const makeTestTome = () => {
	let tome = null;
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
	let gap = 24;
	let imgWidth = 90;

	tome = makeTomeData("Layout v3 Demos");

// PAGE -----------------

	// Unsplash profile page 1
	page = makePageData(tome);
	page.theme = Themes.DARK;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "row";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	flex = makeFlexData(flexRoot);
	flex.layout.backgroundColor = "var(--t2)";
	//flex.layout.justifyContent = "space-between";
	flex.layout.width = 350;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Lombok, Indonesia";

	flex = makeFlexData(flex);
	flex.layout.direction = "row";
	flex.layout.justifyContent = "center";
	flex.layout.height = "hug";
	flex.layout.gap = 16;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 8;

	img = makeImageData(flex);
	img.content.src = "/images/profile-fb-1695017533-a5ddbb92a072.jpg.webp";
	img.layout.width = 52;
	img.layout.borderRadius = 52 / 2;

	flex = makeFlexData(flex);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.color = "var(--t9)";
	text.content.text = "Lena Kestler";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "I am traveling around the world creating photos wherever I am! Instagram: lenakestler";

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "column";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-B1KOv0toff0-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-f45xkanQ3jY-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-xA6LOnXXXkU-unsplash.jpg";

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "column";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-wJLQQvHKJaY-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-7AUtYtTtyLk-unsplash.jpg";

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "column";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-AX5gj_bND4Y-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-NS5a5tX4kl0-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-mA6jgR17cnQ-unsplash.jpg";

	// PAGE -----------------

	// Ramp Sales - context stats
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "column";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.height = "140px";
	//row.layout.gap = 24;

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text =
		"Financial leaders are walking the tightrope between short-term budget cuts and long- term efficiency";
	text.layout.width = "50%";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;

	// Card
	card = makeFlexData(row);
	card.layout.direction = "column";
	card.layout.backgroundColor = "var(--z0)";
	card.layout.padding.x = 24;
	card.layout.padding.y = 24;
	card.layout.justifyContent = "space-between";

	flex = makeFlexData(card);
	flex.layout.backgroundColor = "rgba(231,242,86,1.0)";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Finance health";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height = "160px";
	text.content.text =
		"78% of CFOs are looking at cutting costs to help to improve cash flow and manage financial health.";

	img = makeImageData(card);
	img.content.src = "/images/2e9d03b7-ddc0-4f82-984c-41278708f4c9.png";
	img.layout.aspectRatio = 153 / 47;
	img.layout.height = 23;
	img.layout.borderRadius = 0;

	// Card
	card = makeFlexData(row);
	card.layout.direction = "column";
	card.layout.backgroundColor = "var(--z0)";
	card.layout.padding.x = 24;
	card.layout.padding.y = 24;
	card.layout.justifyContent = "space-between";

	flex = makeFlexData(card);
	flex.layout.backgroundColor = "rgba(231,242,86,1.0)";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Operational efficiency";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height = "160px";
	text.content.text =
		"88% of finance leaders currently feel the challenge of not having the automation tools they need to automate repetitive tasks like expense and invoicing.";

	img = makeImageData(card);
	img.content.src = "/images/51208c8e-98e2-44fb-9fe7-54dd9eacae55.png";
	img.layout.aspectRatio = 900 / 500;
	img.layout.height = 23;
	img.layout.borderRadius = 0;

	// PAGE -----------------

	// Ramp Sales - customer testimonial
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "row";

	// Col 1
	col = makeFlexData(flexRoot);
	col.layout.direction = "column";
	col.layout.gap = 24;
	col.layout.width = "59%";

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
	flex.layout.padding.y = 16;
	flex.layout.padding.x = 0;
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.borderRadius = 0;
	flex.layout.borderTop = "1px solid var(--t4)";
	flex.layout.borderBottom = "1px solid var(--t4)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Products used";
	//text.content.color = "rgba(28,27,23,0.5)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cards, Expense Management, Reimbursements";

	// Row
	row = makeFlexData(col);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;
	//row.layout.height = "hug";

	flex = makeFlexData(row);
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
	col.layout.direction = "column";
	//col.layout.padding.y = 0;

	img = makeImageData(col);
	img.content.src = "/images/ramp-customers-walther-farm.webp";
	img.layout.aspectRatio = 1536 / 1536;
	img.layout.borderRadius = 8;
	img.layout.size = "fill";

	flex = makeFlexData(col);
	flex.layout.direction = "row";
	flex.layout.height = "hug";
	flex.layout.backgroundColor = "var(--z0)";
	flex.layout.padding.y = 20;
	flex.layout.padding.x = 20;

	img = makeImageData(flex);
	img.content.src = "/images/ramp-customers-walther-farm-2.jpeg";
	img.layout.aspectRatio = 713 / 823;
	img.layout.height = 40;
	//img.layout.borderRadius = 0;

	flex = makeFlexData(flex);
	col.layout.direction = "column";
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text =
		"“Ramp allowed me to build a team of highly skilled people who have better thought processes and who can tackle more strategic projects, rather than burning time on manual work.”";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Josh Reeves, CFO, Walther Farms";
	text.content.fontWeight = 550;
	text.content.color = "var(--heading-color)";

		// PAGE -----------------

	// Ramp Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "column";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 72;
	row.layout.gap = 24;

	// Card
	card = makeFlexData(row);
	card.layout.direction = "column";
	card.layout.backgroundColor = "var(--z0)";
	card.layout.width = "400px";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.justifyContent = "space-between";

	container = makeFlexData(card);
	container.layout.direction = "column";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "56px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Control spend, automate payments, and close the books faster for greater financial health on the ultimate platform.";

	flex = makeFlexData(card);
	flex.layout.height = "hug";
	flex.layout.backgroundColor = "rgba(231,242,86,1.0)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Free";

	// Card
	card = makeFlexData(row);
	card.layout.direction = "column";
	card.layout.backgroundColor = "var(--z0)";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.justifyContent = "space-between";

	container = makeFlexData(card);
	container.layout.direction = "column";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.gap = 6;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "56px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.backgroundColor = "rgba(231,242,86,1.0)";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Plus";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Powerful spend controls, advanced automation, and deeper integrations to help you scale globally and manage your finance operations from end to end.";

	flex = makeFlexData(card);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "96px";

	item = makeFlexData(flex);
	item.layout.direction = "column";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;
	item.layout.gap = 2;
	item.layout.height = "hug";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$15 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed monthly";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	item = makeFlexData(flex);
	item.layout.direction = "column";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;
	item.layout.gap = 2;
	item.layout.height = "hug";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$12 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed annually";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	// Card
	card = makeFlexData(row);
	card.layout.direction = "column";
	card.layout.backgroundColor = "var(--z0)";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.justifyContent = "space-between";

	container = makeFlexData(card);
	container.layout.direction = "column";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "56px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.backgroundColor = "rgba(244, 243, 239, 1.0)";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Enterprise";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"All the security, compliance, and flexibility global enterprises need to automate deployment at scale.";

	flex = makeFlexData(card);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "96px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Custom pricing";

	// PAGE -----------------

	// Ramp Sales - icon list, photo + quote col
	page = makePageData(tome);
	page.theme = Themes.RampB;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "row";

	// Col 1
	col = makeFlexData(flexRoot);
	col.layout.direction = "column";
	//col.layout.padding.x = 0;
	//col.layout.padding.y = 0;
	col.layout.gap = 24;

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "A New Way Forward For Finance";
	//text.layout.height = "48px";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-computer.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = "12px";
	img.layout.padding.y = "12px";
	img.layout.backgroundColor = "var(--t2)";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
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
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-clock.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = "12px";
	img.layout.padding.y = "12px";
	img.layout.backgroundColor = "var(--t2)";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
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
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-target.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = "12px";
	img.layout.padding.y = "12px";
	img.layout.backgroundColor = "var(--t2)";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
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
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = 24;
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-line-chart.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = "12px";
	img.layout.padding.y = "12px";
	img.layout.backgroundColor = "var(--t2)";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
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
	col.layout.direction = "column";

	col.layout.padding.y = 0;

	img = makeImageData(col);
	img.content.src = "/images/ramp-3-images.png";
	img.layout.aspectRatio = 1354 / 1352;
	img.layout.borderRadius = 0;

	flex = makeFlexData(col);
	flex.layout.height = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "center";
	flex.layout.padding.x = 24;
	flex.layout.gap = 8;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.align = "center";
	text.content.text =
		"“We don’t have to wait until the end of the month to course correct—the real time insights and visibility from Ramp help us know exactly how the business is performing at a glance.”";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Steve Padis, SVP Finance & Strategy";

	img = makeImageData(flex);
	img.content.src = "/images/ramp-logo-barrys.png";
	img.layout.aspectRatio = 2048 / 418;
	img.layout.height = 13;
	img.layout.borderRadius = 0;

	// PAGE -----------------

	// Simple TE EP-133 page
	page = makePageData(tome);
	page.theme = Themes.TE_EP_133;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "column";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.justifyContent = "center";
	flexRoot.layout.alignItems = "center";

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "EP–133 K.O.II";

	img = makeImageData(flexRoot);
	img.content.src = "/images/ep-133-trimmed.webp";
	img.layout.aspectRatio = 1949 / 2695;
	img.layout.height = 400;
	img.layout.borderRadius = 0;

	// PAGE -----------------

	// TE Products Page
	page = makePageData(tome);
	page.theme = Themes.TE_EP_133;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "column";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.gap = 24;

	// INTRO
	row = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.justifyContent = "center";
	row.layout.alignItems = "space-between";
	row.layout.height = "160px";

	flex = makeFlexData(row);
	flex.layout.gap = 2;
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "history of teenage engineering";
	text.content.color = "rgba(39, 39, 39, 1)";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "2011 - 2023";

	img = makeImageData(row);
	img.content.src = "/logos/te-logo-light-mode.svg";
	img.layout.aspectRatio = 50.53 / 23.92;
	img.layout.height = 60;
	img.layout.borderRadius = 0;

	// EP-133
	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.layout.backgroundColor = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/ep-133-trimmed.webp";
	img.layout.aspectRatio = 1949 / 2695;
	img.layout.height = 400;
	img.layout.borderRadius = 0;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "2023";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "EP–133 K.O.II";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"meet the evolution of the world's most sold sampler. based on the legendary PO-33 K.O!, the new EP–133 K.O.II adds more power, more sampling capabilities, a fully reworked sequencer and brand new punch-in 2.0™ effects. introducing a workflow that lets you go from idea to TRACK faster than ever.";

	// TP-7

	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.layout.backgroundColor = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/tp-7-trimmed.webp";
	img.layout.aspectRatio = 900 / 1425;
	img.layout.height = 400;
	img.layout.borderRadius = 0;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "2023";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "TP-7";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"the ultra-portable audio recorder. record and listen back using the internal mic and speaker, or use any number of the 3x two-way jacks for external mics, headsets or other signal sources. multiple connectivity options include usb-c, MFi and bluetooth. instant voice-to-text transcription available via the iOS app. included in the box: 6.35 mm jack adapter, textile usb-c cable, user guide and reusable plastic storage box.";

	// CM-15

	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.layout.backgroundColor = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/cm-15-trimmed.webp";
	img.layout.aspectRatio = 950 / 1299;
	img.layout.height = 300;
	img.layout.borderRadius = 0;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "2023";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "CM-15";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"the ultra-portable audio recorder. record and listen back using the internal mic and speaker, or use any number of the 3x two-way jacks for external mics, headsets or other signal sources. multiple connectivity options include usb-c, MFi and bluetooth. instant voice-to-text transcription available via the iOS app. included in the box: 6.35 mm jack adapter, textile usb-c cable, user guide and reusable plastic storage box.";

	// TX-6

	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.layout.backgroundColor = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/tx-6-trimmed.webp";
	img.layout.aspectRatio = 949 / 1478;
	img.layout.height = 300;
	img.layout.borderRadius = 0;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "2022";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "TX-6";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"TX–6 is our powerful 6 channel stereo mixer with built-in equalizer, filters, compressor, aux send, cue and digital effects. this ultra-portable mixer can also be used as a multi-channel usb-c audio interface. constructed in anodized aluminum with pu leather backing.";

	// OP-1 Field

	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "row";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.layout.backgroundColor = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/op-1-field-trimmed.webp";
	img.layout.aspectRatio = 1769 / 630;
	img.layout.width = 375;
	img.layout.borderRadius = 0;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = 4;
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "2022";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "OP-1 field";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"OP–1 field is our all-in-one battery-powered synthesizer, sampler and drum machine. OP–1 field is packed with features including: a built-in speaker, microphone, multiple effects, vocoder, fm radio, bluetooth midi, even a velocity sensitive keyboard. it's the most powerful portable synthesizer available.";

	

	// PAGE -----------------

	// Stych page 1
	page = makePageData(tome);
	page.theme = Themes.StychB;

	flexRoot = makeFlexData(page);

	flex = makeFlexData(flexRoot);

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Why Stytch vs. building in-house";

	// 3-col container
	const threeColContainer = makeFlexData(flexRoot);
	threeColContainer.layout.direction = "row";

	// Col 1
	const col1 = makeFlexData(threeColContainer);
	col1.layout.gap = gap;

	img = makeImageData(col1);
	img.content.src = "/images/aad866bd-edda-46b6-a9d8-206d2da27f12.png";
	img.layout.width = imgWidth;

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Time to market";

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "In-house: Engineering projects consistently overrun timeline and budget";

	text = makeTextData(col1);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: Integrate passwordless in less than a week";

	// Col 2
	const col2 = makeFlexData(threeColContainer);
	col2.layout.gap = gap;

	img = makeImageData(col2);
	img.content.src = "/images/e91fb104-60b7-4eba-bc0c-0db87417e1a7.png";
	img.layout.width = imgWidth;

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Conversion expertise";

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"In-house: Build flows you believe will maximize conversion, but these have high switching costs ";

	text = makeTextData(col2);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: A/B test flexible authentication options to meet users where they are";

	// Col 3
	const col3 = makeFlexData(threeColContainer);
	col3.layout.gap = gap;

	img = makeImageData(col3);
	img.content.src = "/images/4c5c9c69-b9f1-4423-b212-cfa36deced09.png";
	img.layout.width = imgWidth;

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Engineering debt";

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"In-house: Need to dedicate lead engineers to authentication rather than Tome’s core value proposition";

	text = makeTextData(col3);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Stytch: Monitor & manage changes in authentication and prevent surprising breaking changes";

	// PAGE -----------------

	// Stych page 2

	page = makePageData(tome);
	page.theme = Themes.StychD;

	let insetX = 20;
	let insetY = 20;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "row";

	container = makeFlexData(flexRoot);
	container.layout.padding.x = 40;
	container.layout.padding.y = 20;
	container.layout.gap = 40;

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Title;
	text.content.fontSize = 36;
	text.content.text = "Built for best-in-class reliability and uptime";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Authentication is core infrastructure for your business, so reliability and uptime are critically important for your business.";
	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"At Stytch, we’ve invested in our platform’s infrastructure to ensure that we can always support your business and your customers.";

	container = makeFlexData(flexRoot);
	container.layout.padding.x = 50;
	container.layout.padding.y = 50;
	container.theme = Themes.StychA;
	container.layout.gap = 20;

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/6840aafc-75b1-44da-836a-54517176cd77.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cloud-native architecture";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/acf6e010-49fd-4c79-a5e0-b5dabbd9dab7.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "99.999% uptime SLA";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/40e02744-0eea-4348-8de2-cc583b325a29.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Fully-redundant infrastructure";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/727b680b-a9ce-42ef-b2ef-d7dd2f3164bd.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	//text.content.color = "rgba(30, 47, 60, 1.0)";
	text.content.text = "Low latency (<30 ms on average)";
	//text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/651d4ca2-98a8-4e3f-a802-47b5b21c965e.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	//text.content.color = "rgba(30, 47, 60, 1.0)";
	text.content.text = "Transparent status page & public post-mortems";
	//text.content.align = "center";

	// PAGE -----------------

	// Stych page 3

	page = makePageData(tome);
	page.theme = Themes.StychC;

	insetX = 30;
	insetY = 20;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "row";

	flex = makeFlexData(flexRoot);
	flex.layout.justifyContent = "space-between";
	flex.layout.padding.x = insetX;
	flex.layout.padding.y = insetY;

	img = makeImageData(flex);
	img.content.src = "/images/0f9d2446-a1ee-4b6a-aaf7-5a28c6a9cc9e.png";
	img.layout.width = 120;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text =
		"“We experimented with several auth providers, but Stytch was the easiest to use by far. We also saw that Stytch had a number of handy features in the works, and we'd get access to a whole system of integrated, innovative products through one simple integration.”";

	flex = makeFlexData(flex);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.borderRadius = 0;
	flex.layout.gap = 6;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = 14;
	text.content.text = "Omar Torres";
	text.content.fontWeight = 700;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = 14;
	text.content.color = "rgba(96, 169, 163, 1)";
	text.content.text = "Co-Founder & Engineering Manager";
	text.content.fontWeight = 700;

	flex = makeFlexData(flexRoot);
	flex.layout.backgroundColor = "rgba(245, 252, 249, 1.0)";
	let fontSize = 14;
	flex.layout.padding.x = insetX;
	flex.layout.padding.y = insetY;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.fontSize = fontSize;
	text.content.fontWeight = 700;
	text.content.text = "Challenge";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text =
		"As a self-funded startup, Chessly relies on third-party services like Stripe to handle specialized functions like payment processing. That allows them to keep their team small, agile, and focused on their core product: chess. When it came to authentication, they needed an experienced partner they could count on to abstract away the heavy stakes and strains of cybersecurity.";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.fontSize = fontSize;
	text.content.fontWeight = 700;
	text.content.text = "Solution";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.fontSize = fontSize;
	text.content.text =
		"Chessly initially looked at four different auth providers, but they found Stytch’s documentation and integration process to be head and shoulders above the rest. Moreover, they liked that Stytch kept one eye on the future, adding new functionalities to their roadmap at every turn.";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.fontSize = fontSize;
	text.content.fontWeight = 700;
	text.content.text = "Products used";

	container = makeFlexData(flex);
	container.layout.direction = "row";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	flex = makeFlexData(container);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	//flex.layout.width = "hug";
	//flex.layout.height = "hug";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/cfe6e610-0b87-4130-be9c-8b3a01a85474.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Email Magic Links";
	text.content.fontSize = 15;
	text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	//flex.layout.width = "hug";
	//flex.layout.height = "hug";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/8ddafd37-11eb-4ec2-b5cb-0065a0832021.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Passwords";
	text.content.fontSize = 15;
	text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	//flex.layout.width = "hug";
	//flex.layout.height = "hug";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/f9b347b0-8c37-427e-b093-fcc452449031.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "OAuth logins";
	text.content.fontSize = 15;
	text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	//flex.layout.width = "hug";
	//flex.layout.height = "hug";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/c134ad82-c340-44b3-9802-0c96bd4278a7.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "One-Time Passcodes";
	text.content.fontSize = 15;
	text.content.align = "center";

	console.log("TEST TOME DATA: ", tome);
	return tome;
};

import { Themes } from "../ds/Themes";
import { TextStyles } from "../tiles/Text";
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
	let imgWidth = 90;

	tome = makeTomeData("Layout v3 Demos");

	// PAGE 1 -----------------

	page = makePageData(tome);
	page.theme = Themes.TomeDark;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";

	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.gap = "0";
	card.layout.width = "320px";
	//card.layout.alignContent = "space-between";
	card.layout.alignContent = "start";
	card.theme.tokens["backgroundColor"] = "var(--t2)";
	card.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Layout v3";
	text.content.color = "var(--yellow)";
	text.content.fontSize = 32;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.content.color = "rgba(149, 149, 149, 1)";
	text.content.text = "WIP interactions";

	text.content.fontSize = 32;

	row = makeFlexData(flexRoot);
	row.layout.direction = "vertical";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	// Card - Columns
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	//card.theme.tokens["--heading-color"] = "black";
	//card.theme.tokens["--body-color"] = "black";
	//card.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	card.theme.tokens["backgroundColor"] = "var(--t3)";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/icons/Templates.svg";
	img.layout.aspectRatio = 1;
	img.layout.height = 48;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = "0px";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Columns";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Vertical grouping, mobile translation";

	row = makeFlexData(row);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	// Card - Columns
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	//card.theme.tokens["--heading-color"] = "black";
	//card.theme.tokens["--body-color"] = "black";
	//card.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	card.theme.tokens["backgroundColor"] = "var(--t4)";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/icons/PagePortrait.svg";
	img.layout.aspectRatio = 1;
	img.layout.height = 48;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = "0px";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Containers";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cards, icon lists, components…";

	// Card - Columns
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	//card.theme.tokens["--heading-color"] = "black";
	//card.theme.tokens["--body-color"] = "black";
	//card.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	card.theme.tokens["backgroundColor"] = "var(--t5)";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/icons/ArrowLeftRightOut.svg";
	img.layout.aspectRatio = 1;
	img.layout.height = 48;

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = "0px";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.color = "var(--t9)";
	text.content.text = "Resizing";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Fit, fill, custom";

	// PAGE 2 -----------------

	// Tome Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.TomeDark;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";

	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.gap = "0";
	//card.layout.width = "320px";
	//card.layout.alignContent = "space-between";
	card.layout.alignContent = "start";
	//card.theme.tokens["backgroundColor"] = "var(--t4)";
	card.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Who is this for?";
	text.content.fontSize = 32;

	row = makeFlexData(flexRoot);
	row.layout.direction = "vertical";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	// Card - Stych
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "center";
	card.layout.justifyItems = "center";
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "#86CEDF";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/logos/stych-logo-black-109x21.svg";
	img.layout.aspectRatio = 109 / 21;
	img.layout.height = 32;

	// Card - Ramp
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "center";
	card.layout.justifyItems = "center";
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/logos/Ramp-Symbol-RGB-black-0125.svg";
	img.layout.aspectRatio = 154.58 / 133.74;
	img.layout.height = 56;


	// PAGE 2 -----------------
	page = makePageData(tome);
	page.theme = Themes.TomeDark;
	
	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyItems = "center";
	flexRoot.layout.alignContent = "center";
	flexRoot.theme.tokens["backgroundColor"] = "#86CEDF";
	flexRoot.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(flexRoot);
	img.content.src = "/logos/stych-logo-black-109x21.svg";
	img.layout.aspectRatio = 109 / 21;
	img.layout.height = 32;



	// PAGE 3 -----------------

	page = makePageData(tome);
	page.theme = Themes.StychD;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/stych-deck-01.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 4 -----------------

	page = makePageData(tome);
	page.theme = Themes.StychD;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/stych-deck-02.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 5 -----------------

	// Stych page 1
	page = makePageData(tome);
	page.theme = Themes.StychB;

	flexRoot = makeFlexData(page);

	flex = makeFlexData(flexRoot);
	flex.layout.height = "hug";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Why Stytch vs. building in-house";

	// 3-col container
	const threeColContainer = makeFlexData(flexRoot);
	threeColContainer.layout.direction = "horizontal";
	threeColContainer.layout.justifyContent = "start";

	// Col 1
	const col1 = makeFlexData(threeColContainer);

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

	// PAGE 6 -----------------

	page = makePageData(tome);
	page.theme = Themes.StychD;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/stych-deck-03.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 7 -----------------

	// Stych page 2

	page = makePageData(tome);
	page.theme = Themes.StychD;

	let insetX = 20;
	let insetY = 20;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";

	container = makeFlexData(flexRoot);
	container.layout.direction = "vertical";
	container.layout.alignContent = "start";
	container.layout.padding.x = 40;
	container.layout.padding.y = 20;
	container.layout.gap = "40px";

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
	container.layout.gap = "20px";
	container.theme = Themes.StychA;
	//container.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.width = "hug";
	flex.layout.alignItems = "center";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "24px";

	img = makeImageData(flex);
	img.content.src = "/images/6840aafc-75b1-44da-836a-54517176cd77.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Cloud-native architecture";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.width = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "start";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "24px";

	img = makeImageData(flex);
	img.content.src = "/images/acf6e010-49fd-4c79-a5e0-b5dabbd9dab7.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "99.999% uptime SLA";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.width = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "start";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "24px";

	img = makeImageData(flex);
	img.content.src = "/images/40e02744-0eea-4348-8de2-cc583b325a29.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Fully-redundant infrastructure";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.width = "hug";
	flex.layout.alignItems = "center";
	flex.layout.justifyContent = "start";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "24px";

	img = makeImageData(flex);
	img.content.src = "/images/727b680b-a9ce-42ef-b2ef-d7dd2f3164bd.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Low latency (<30 ms on average)";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.width = "hug";
	flex.layout.alignItems = "center";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "24px";

	img = makeImageData(flex);
	img.content.src = "/images/651d4ca2-98a8-4e3f-a802-47b5b21c965e.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Transparent status page & public post-mortems";

	// PAGE 8 -----------------

	page = makePageData(tome);
	page.theme = Themes.StychD;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/stych-deck-04.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 9 -----------------

	// Stych page 3

	page = makePageData(tome);
	page.theme = Themes.StychC;

	insetX = 30;
	insetY = 20;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "vertical";
	flex.layout.alignContent = "space-between";
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
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.gap = "6px";

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
	flex.theme.tokens["backgroundColor"] = "rgba(245, 252, 249, 1.0)";
	flex.theme.tokens["borderRadius"] = 8 + "px";
	flex.layout.padding.x = insetX;
	flex.layout.padding.y = insetY;

	let fontSize = 14;

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
	container.layout.direction = "horizontal";
	container.layout.justifyContent = "start";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	flex = makeFlexData(container);
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.alignContent = "start";
	flex.layout.justifyItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/cfe6e610-0b87-4130-be9c-8b3a01a85474.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Email Magic Links";
	text.content.fontSize = fontSize;
	text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.alignContent = "start";
	flex.layout.justifyItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/8ddafd37-11eb-4ec2-b5cb-0065a0832021.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Passwords";
	text.content.fontSize = fontSize;
	text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.alignContent = "start";
	flex.layout.justifyItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/f9b347b0-8c37-427e-b093-fcc452449031.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "OAuth logins";
	text.content.fontSize = fontSize;
	text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.alignContent = "start";
	flex.layout.justifyItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/c134ad82-c340-44b3-9802-0c96bd4278a7.png";
	img.layout.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "One-Time Passcodes";
	text.content.fontSize = fontSize;
	text.content.align = "center";

	// PAGE 2 -----------------
	page = makePageData(tome);
	page.theme = Themes.RampB;
	
	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyItems = "center";
	flexRoot.layout.alignContent = "center";
	//flexRoot.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	//flexRoot.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(flexRoot);
	img.content.src = "/logos/Ramp-Lockup-RGB-White.svg";
	img.layout.aspectRatio = 646.52 / 173.07;
	img.layout.height = 64;

	// PAGE 10 -----------------

	page = makePageData(tome);
	page.theme = Themes.RampB;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/ramp-deck-01.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 11 -----------------

	page = makePageData(tome);
	page.theme = Themes.RampB;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/ramp-deck-02.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 12 -----------------

	// Ramp Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 72;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.gap = "24px";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.width = "400px";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	container = makeFlexData(card);
	container.layout.direction = "vertical";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.gap = "4px";
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
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Free";
	text.content.color = "var(--heading-color)";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	container = makeFlexData(card);
	container.layout.direction = "vertical";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.gap = "6px";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "56px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Plus";
	text.content.color = "var(--heading-color)";

	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Powerful spend controls, advanced automation, and deeper integrations to help you scale globally and manage your finance operations from end to end.";

	flex = makeFlexData(card);
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "96px";

	item = makeFlexData(flex);
	item.layout.direction = "vertical";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;
	item.layout.gap = "2px";
	item.layout.height = "hug";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$15 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed monthly";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	item = makeFlexData(flex);
	item.layout.direction = "vertical";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;
	item.layout.gap = "2px";
	item.layout.height = "hug";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "$12 per user, per month";

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "When billed annually";
	text.content.color = "rgba(108, 108, 95, 1.0)";

	// Card
	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	container = makeFlexData(card);
	container.layout.direction = "vertical";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;
	container.layout.height = "hug";

	flex = makeFlexData(container);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.gap = "4px";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.height = "56px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Ramp";

	flex = makeFlexData(flex);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.theme.tokens["backgroundColor"] = "rgba(244, 243, 239, 1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Enterprise";
	text.content.color = "var(--heading-color)";

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

	// PAGE 13 -----------------

	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/ramp-deck-03.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 14 -----------------

	// Ramp Sales - context stats
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "vertical";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.height = "140px";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text =
		"Financial leaders are walking the tightrope between short-term budget cuts and long-term efficiency";
	text.layout.width = "450px";

	// Row
	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "24px";

	// Card
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 24;
	card.layout.padding.y = 24;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(card);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Finance health";
	text.content.color = "var(--heading-color)";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height = "160px";
	text.content.text =
		"78% of CFOs are looking at cutting costs to help to improve cash flow and manage financial health.";

	img = makeImageData(card);
	img.content.src = "/images/2e9d03b7-ddc0-4f82-984c-41278708f4c9.png";
	img.layout.aspectRatio = 153 / 47;
	img.layout.height = 23;

	// Card
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 24;
	card.layout.padding.y = 24;
	card.layout.alignContent = "space-between";
	card.theme.tokens["backgroundColor"] = "var(--z0)";
	card.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(card);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.padding.x = 9;
	flex.layout.padding.y = 4;
	flex.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	flex.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "Operational efficiency";
	text.content.color = "var(--heading-color)";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.layout.height = "160px";
	text.content.text =
		"88% of finance leaders currently feel the challenge of not having the automation tools they need to automate repetitive tasks like expense and invoicing.";

	img = makeImageData(card);
	img.content.src = "/images/51208c8e-98e2-44fb-9fe7-54dd9eacae55.png";
	img.layout.aspectRatio = 900 / 500;
	img.layout.height = 23;

	// PAGE 15 -----------------

	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/ramp-deck-04.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 16 -----------------

	// Ramp Sales - customer testimonial
	page = makePageData(tome);
	page.theme = Themes.RampA;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.gap = "48px";

	// Col 1
	col = makeFlexData(flexRoot);
	col.layout.direction = "vertical";
	col.layout.gap = "24px";
	//col.layout.width = "59%";

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
	flex.layout.gap = "4px";
	flex.theme.tokens["borderRadius"] = 0;
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
	row.layout.gap = "24px";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = "4px";

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
	flex.layout.gap = "4px";

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
	flex.layout.gap = "4px";

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

	img = makeImageData(col);
	img.content.src = "/images/ramp-customers-walther-farm.webp";
	img.layout.aspectRatio = 1536 / 1536;
	img.layout.size = "fill";
	img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(col);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "start";
	flex.layout.height = "hug";
	flex.layout.padding.y = 20;
	flex.layout.padding.x = 20;
	flex.theme.tokens["backgroundColor"] = "var(--z0)";
	flex.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(flex);
	img.content.src = "/images/ramp-customers-walther-farm-2.jpeg";
	img.layout.aspectRatio = 713 / 823;
	img.layout.height = 40;

	flex = makeFlexData(flex);
	col.layout.direction = "vertical";
	flex.layout.height = "hug";
	flex.layout.padding.y = 0;
	flex.layout.padding.x = 0;
	flex.layout.gap = "4px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text =
		"“Ramp allowed me to build a team of highly skilled people who have better thought processes and who can tackle more strategic projects, rather than burning time on manual work.”";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Josh Reeves, CFO, Walther Farms";
	text.content.fontWeight = 550;
	text.content.color = "var(--heading-color)";

	// PAGE 17 -----------------

	page = makePageData(tome);
	page.theme = Themes.RampB;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	img = makeImageData(flexRoot);
	img.content.src = "/images/ramp-deck-05.png";
	img.layout.width = "fit";
	img.layout.height = "fit";

	// PAGE 18 -----------------

	// Ramp Sales - icon list, photo + quote col
	page = makePageData(tome);
	page.theme = Themes.RampB;

	flexRoot = makeFlexData(page);
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.gap = "48px";

	// Col 1
	col = makeFlexData(flexRoot);
	col.layout.direction = "vertical";
	col.layout.alignContent = "start";
	//col.layout.width = "55%";
	col.layout.gap = "32px";

	text = makeTextData(col);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "A New Way Forward For Finance";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "24px";
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-computer.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = 12;
	img.layout.padding.y = 12;
	img.theme.tokens["backgroundColor"] = "var(--t2)";
	img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "4px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Optimize your business spend";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"A modern corporate card combined with intuitive software to change the way you control business spend. Providing an easier way to submit expenses and pay bills in a single platform – giving time back to focus on top priorities. ";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "24px";
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-clock.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = 12;
	img.layout.padding.y = 12;
	img.theme.tokens["backgroundColor"] = "var(--t2)";
	img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "4px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Increase financial operations efficiency";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Scale the impact of your finance team by automating routine work. Stay compliant and eliminate manual tasks with proactive policy controls, configurable approval workflows, and AI-powered reconciliation.";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "24px";
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-target.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = 12;
	img.layout.padding.y = 12;
	img.theme.tokens["backgroundColor"] = "var(--t2)";
	img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "4px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Connect your processes and ERP";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Ramp securely integrates with your existing technology investments and reliably syncs with your ERP, enabling you to accelerate your monthly close whether you operate domestically or globally.";

	// Icon list item row
	row = makeFlexData(col);
	row.layout.direction = "horizontal";
	row.layout.justifyContent = "start";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "24px";
	row.layout.height = "hug";

	img = makeImageData(row);
	img.content.src = "/images/ramp-icon-white-line-chart.png";
	img.layout.aspectRatio = 144 / 144;
	img.layout.width = 32;
	img.layout.padding.x = 12;
	img.layout.padding.y = 12;
	img.theme.tokens["backgroundColor"] = "var(--t2)";
	img.theme.tokens["borderRadius"] = "8px";

	flex = makeFlexData(row);
	flex.layout.height = "hug";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "4px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Heading2;
	text.content.text = "Improve company financial health";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"Let Ramp Intelligence give you full visibility over all business spend to make confident finance decisions. Optimize cash flow with access to AI-powered real-time reporting, savings insights from millions of transactions, and a finance copilot.";

	// Col 2
	col = makeFlexData(flexRoot);
	col.layout.direction = "vertical";
	col.layout.alignContent = "start";
	col.layout.padding.y = 0;

	img = makeImageData(col);
	img.content.src = "/images/ramp-3-images.png";
	img.layout.aspectRatio = 1354 / 1352;

	flex = makeFlexData(col);
	flex.layout.direction = "vertical";
	flex.layout.height = "hug";
	flex.layout.justifyItems = "center";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;
	flex.layout.gap = "8px";

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


	// PAGE 19 -----------------
	page = makePageData(tome);
	page.theme = Themes.TomeDark;
	
	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyItems = "center";
	flexRoot.layout.alignContent = "center";

	text = makeTextData(flexRoot);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Some other layouts";
	text.content.fontSize = 32;


	// PAGE -----------------

	// Tome Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.TomeDark;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";

	card = makeFlexData(flexRoot);
	card.layout.direction = "vertical";
	//card.layout.width = "45%";
	card.theme.tokens["backgroundColor"] = "var(--t3)";
	card.theme.tokens["borderRadius"] = "8px";

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Great companies are already having early success with Tome";
	text.content.fontSize = 32;

	row = makeFlexData(flexRoot);
	row.layout.direction = "vertical";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	// Card - Ramp
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "rgba(231,242,86,1.0)";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/logos/Ramp-Symbol-RGB-black-0125.svg";
	img.layout.aspectRatio = 154.58 / 133.74;
	img.layout.height = 48;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"“Since we started using Tome, our sales team is reporting a 23% percent increase in new customer acquistion. We’ll never go back to manual deck creation.”";

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = "0px";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Eric Glyman";
	text.content.fontWeight = 600;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Co-founder & CEO, Ramp";

	// Card - Notion
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.alignContent = "space-between";
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "#A77EFF";
	card.theme.tokens["borderRadius"] = "8px";

	img = makeImageData(card);
	img.content.src = "/logos/notion-logo.svg";
	img.layout.aspectRatio = 1 / 1;
	img.layout.height = 56;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"“Tome’s AI incorporates our tone of voice and business values with up-to-date metrics and relevant product images. This app saves our sales team so much time.”";

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.gap = "0px";
	item.layout.padding.x = 0;
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Ivan Zhao";
	text.content.fontWeight = 600;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "CEO of Notion";

	// PAGE -----------------

	// Tome Sales - plans intro page
	page = makePageData(tome);
	page.theme = Themes.TomeLight;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "vertical";

	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.height = "140px";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.alignContent = "center";
	row.layout.justifyItems = "center";

	text = makeTextData(row);
	text.content.textStyle = TextStyles.Heading1;
	text.content.text = "Great companies are already having early success with Tome";
	text.content.fontSize = 32;

	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	//row.layout.height = "70%";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.gap = "32px";

	// Card - Stych
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.theme = {};
	card.theme.tokens = {};
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "#86CEDF";
	card.theme.tokens["borderRadius"] = "8px";

	container = makeFlexData(card);
	container.layout.direction = "horizontal";
	container.layout.height = "96px";
	container.layout.alignContent = "center";
	container.layout.justifyItems = "center";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	img = makeImageData(container);
	img.content.src = "/logos/stych-logo-black-109x21.svg";
	img.layout.aspectRatio = 109 / 21;
	img.layout.height = 32;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"“Tome makes it possible for us to deliver persuasive, personalized pitches to every customer, helping us move deals along faster and close more of them.”";

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.padding.x = 0;
	item.layout.gap = "0px";
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Reed McGinley-Stempel";
	text.content.fontWeight = 600;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "CEO & Co-Founder, Stytch";

	// Card - Ramp
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.theme = {};
	card.theme.tokens = {};
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "#FCFDB2";
	card.theme.tokens["borderRadius"] = "8px";

	container = makeFlexData(card);
	container.layout.direction = "horizontal";
	container.layout.height = "96px";
	container.layout.alignContent = "center";
	container.layout.justifyItems = "center";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	img = makeImageData(container);
	img.content.src = "/logos/Ramp-Symbol-RGB-black-0125.svg";
	img.layout.aspectRatio = 154.58 / 133.74;
	img.layout.height = 56;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"“Since we started using Tome, our sales team is reporting a 23% percent increase in new customer acquistion. We will never go back to manual presentation creation.”";

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.padding.x = 0;
	item.layout.gap = "0px";
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Eric Glyman";
	text.content.fontWeight = 600;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Co-founder & CEO, Ramp";

	// Card - Notion
	card = makeFlexData(row);
	card.layout.direction = "vertical";
	card.layout.padding.x = 20;
	card.layout.padding.y = 20;
	card.layout.alignContent = "space-between";
	card.theme.tokens["--heading-color"] = "black";
	card.theme.tokens["--body-color"] = "black";
	card.theme.tokens["backgroundColor"] = "#D4C4F1";
	card.theme.tokens["borderRadius"] = "8px";

	container = makeFlexData(card);
	container.layout.direction = "horizontal";
	container.layout.height = "96px";
	container.layout.alignContent = "center";
	container.layout.justifyItems = "center";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	img = makeImageData(container);
	img.content.src = "/logos/notion-logo.svg";
	img.layout.aspectRatio = 1 / 1;
	img.layout.height = 72;

	text = makeTextData(card);
	text.content.textStyle = TextStyles.Body2;
	text.content.text =
		"“Tome’s AI incorporates our tone of voice and business values with up-to-date metrics and product images! This app saves our sales team so much time.”";

	item = makeFlexData(card);
	item.layout.direction = "vertical";
	item.layout.height = "hug";
	item.layout.padding.x = 0;
	item.layout.gap = "0px";
	item.layout.padding.y = 0;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "Ivan Zhao";
	text.content.fontWeight = 600;

	text = makeTextData(item);
	text.content.textStyle = TextStyles.Caption;
	text.content.text = "CEO of Notion";

	/*
	// PAGE -----------------

	// Simple TE EP-133 page
	page = makePageData(tome);
	page.theme = Themes.TE_EP_133;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "vertical";
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
	*/

	// PAGE -----------------

	// TE Products Page
	page = makePageData(tome);
	page.theme = Themes.TE_EP_133;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "vertical";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;
	flexRoot.layout.gap = "24px";

	// INTRO
	row = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;
	row.layout.justifyContent = "space-between";
	row.layout.alignContent = "center";
	row.layout.height = "160px";

	flex = makeFlexData(row);
	flex.layout.gap = "2px";
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
	img.layout.height = 44;

	// OP-1 Field

	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.theme.tokens["backgroundColor"] = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/op-1-field-trimmed.webp";
	img.layout.aspectRatio = 1769 / 630;
	img.layout.width = 375;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = "4px";
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

	// EP-133
	row = flex = makeFlexData(flexRoot);
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.theme.tokens["backgroundColor"] = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/ep-133-trimmed.webp";
	img.layout.aspectRatio = 1949 / 2695;
	img.layout.height = 400;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = "4px";
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
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.theme.tokens["backgroundColor"] = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/tp-7-trimmed.webp";
	img.layout.aspectRatio = 900 / 1425;
	img.layout.height = 400;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = "4px";
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
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.theme.tokens["backgroundColor"] = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/cm-15-trimmed.webp";
	img.layout.aspectRatio = 950 / 1299;
	img.layout.height = 300;

	container = makeFlexData(row);
	container.layout.justifyContent = "center";

	flex = makeFlexData(container);
	flex.layout.height = "hug";
	flex.layout.gap = "4px";
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
	row.layout.direction = "horizontal";
	row.layout.padding.x = 0;
	row.layout.padding.y = 0;

	flex = makeFlexData(row);
	flex.theme.tokens["backgroundColor"] = "rgba(244, 248, 249, 1.0)";
	flex.layout.padding.x = 64;
	flex.layout.padding.y = 64;
	flex.layout.justifyContent = "center";
	flex.layout.alignItems = "center";

	img = makeImageData(flex);
	img.content.src = "/images/tx-6-trimmed.webp";
	img.layout.aspectRatio = 949 / 1478;
	img.layout.height = 300;

	container = makeFlexData(row);
	container.layout.direction = "vertical";
	container.layout.alignContent = "start";

	flex = makeFlexData(container);
	flex.layout.direction = "vertical";
	flex.layout.height = "hug";
	flex.layout.gap = "4px";
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

	

	// PAGE -----------------

	// Unsplash profile page 1
	page = makePageData(tome);
	page.theme = Themes.TomeDark;

	flexRoot = makeFlexData(page);
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "vertical";
	flex.layout.alignContent = "space-between";
	flex.layout.width = "350px";
	flex.theme.tokens["backgroundColor"] = "var(--t2)";
	flex.theme.tokens["borderRadius"] = 8 + "px";

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Lombok, Indonesia";

	flex = makeFlexData(flex);
	flex.layout.direction = "horizontal";
	flex.layout.justifyContent = "center";
	flex.layout.height = "hug";
	flex.layout.gap = "16px";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 8;

	img = makeImageData(flex);
	img.content.src = "/images/profile-fb-1695017533-a5ddbb92a072.jpg.webp";
	img.layout.width = 52;
	img.theme.tokens["borderRadius"] = 52 / 2 + "px";

	flex = makeFlexData(flex);
	flex.layout.width = "hug";
	flex.layout.height = "hug";
	flex.layout.gap = "4px";
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
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-B1KOv0toff0-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-f45xkanQ3jY-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-xA6LOnXXXkU-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-wJLQQvHKJaY-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-7AUtYtTtyLk-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	flex = makeFlexData(flexRoot);
	flex.layout.direction = "vertical";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-AX5gj_bND4Y-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-NS5a5tX4kl0-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	img = makeImageData(flex);
	img.layout.width = "fill";
	img.layout.height = "fill";
	img.content.src = "/images/lena-kestler-mA6jgR17cnQ-unsplash.jpg";
	img.theme.tokens["borderRadius"] = 8 + "px";

	console.log("TEST TOME DATA: ", tome);
	return tome;
};

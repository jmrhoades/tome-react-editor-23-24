import { Themes } from "../ds/Themes";
import { TextStyles } from "../tiles/Text";
import { makeTomeData, makePageData, makeFlexData, makeTextData, makeImageData, makeIconData } from "./TileData";

export const makeTestTome = () => {
	let tome = null;
	let page = null;
	let flexRoot = null;
	let container = null;
	let flex = null;
	let text = null;
	let img = null;
	let icon = null;
	let gap = 24;
	let imgWidth = 90;

	tome = makeTomeData("Layout v3 Demos");

	// DS page 1
	page = makePageData(tome);
	page.theme = Themes.DARK;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "row";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

	flex = makeFlexData(flexRoot);
	flex.layout.backgroundColor = "var(--t2)";
	flex.layout.justifyContent = "space-between";
	flex.layout.width = "500px";

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
	img.content.width = 52;
	img.content.borderRadius = "50%";

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

	container = makeFlexData(flexRoot);
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	flex = makeFlexData(container);
	flex.layout.direction = "row";
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

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.padding.x = 0;
	flex.layout.padding.y = 0;

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-wJLQQvHKJaY-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler-7AUtYtTtyLk-unsplash.jpg";

	img = makeImageData(flex);
	img.layout.size = "fill";
	img.content.src = "/images/lena-kestler--5JREHr5J6I-unsplash.jpg";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
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

	// Stych page 1
	page = makePageData(tome);
	page.theme = Themes.StychB;

	flexRoot = makeFlexData(page);
	//flexRoot.layout.padding.x = 0;
	//flexRoot.layout.padding.y = 0;
	flexRoot.flexRoot = true;

	flex = makeFlexData(flexRoot);

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Why Stytch vs. building in-house";

	// 3-col container
	const threeColContainer = makeFlexData(flexRoot);
	threeColContainer.layout.direction = "row";
	//threeColContainer.layout.padding.x = 0;
	//threeColContainer.layout.padding.y = 0;

	// Col 1
	const col1 = makeFlexData(threeColContainer);
	col1.layout.gap = gap;

	img = makeImageData(col1);
	//img.content.src = "/images/smooth-plastic-abstract-yellow-ring.png";
	img.content.src = "/images/aad866bd-edda-46b6-a9d8-206d2da27f12.png";
	img.content.width = imgWidth;

	// icon = makeIconData(col1);
	// icon.content.name = "Clock";
	// icon.content.size = 80;
	// icon.content.color = "#6AE1C1";

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
	//img.content.src = "/images/abstract-green-rounded-arc-render.png";
	img.content.src = "/images/e91fb104-60b7-4eba-bc0c-0db87417e1a7.png";
	img.content.width = imgWidth;

	// icon = makeIconData(col2);
	// icon.content.name = "ChartColumn";
	// icon.content.size = 80;
	// icon.content.color = "#6AE1C1";

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
	//img.content.src = "/images/abstract-rounded-3d-render-of-thick-blue-spike-2.png";
	img.content.src = "/images/4c5c9c69-b9f1-4423-b212-cfa36deced09.png";
	img.content.width = imgWidth;

	// icon = makeIconData(col3);
	// icon.content.name = "Code";
	// icon.content.size = 80;
	// icon.content.color = "#6AE1C1";

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
	//container.layout.backgroundColor = "rgba(210, 253, 226)";
	container.layout.gap = 20;

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/6840aafc-75b1-44da-836a-54517176cd77.png";
	img.content.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	//text.content.color = "rgba(30, 47, 60, 1.0)";
	text.content.text = "Cloud-native architecture";
	//text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/acf6e010-49fd-4c79-a5e0-b5dabbd9dab7.png";
	img.content.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	//text.content.color = "rgba(30, 47, 60, 1.0)";
	text.content.text = "99.999% uptime SLA";
	//text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/40e02744-0eea-4348-8de2-cc583b325a29.png";
	img.content.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	//text.content.color = "rgba(30, 47, 60, 1.0)";
	text.content.text = "Fully-redundant infrastructure";
	//text.content.align = "center";

	flex = makeFlexData(container);
	flex.layout.direction = "row";
	flex.layout.width = "hug";
	flex.layout.justifyContent = "center";
	flex.layout.gap = 24;

	img = makeImageData(flex);
	img.content.src = "/images/727b680b-a9ce-42ef-b2ef-d7dd2f3164bd.png";
	img.content.width = 50;

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
	img.content.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	//text.content.color = "rgba(30, 47, 60, 1.0)";
	text.content.text = "Transparent status page & public post-mortems";
	//text.content.align = "center";

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
	img.content.width = 120;

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
	img.content.width = 50;

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
	img.content.width = 50;

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
	img.content.width = 50;

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
	img.content.width = 50;

	text = makeTextData(flex);
	text.content.textStyle = TextStyles.Body2;
	text.content.text = "One-Time Passcodes";
	text.content.fontSize = 15;
	text.content.align = "center";

	console.log("TEST TOME DATA: ", tome);
	return tome;
};

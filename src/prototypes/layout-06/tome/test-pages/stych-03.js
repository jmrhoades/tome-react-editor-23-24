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
	let fontSize = 14;

	page = makePageData(tome);
	page.theme = Themes.StychC;

	let insetX = 30;
	let insetY = 20;

	flexRoot = makeFlexData(page);
	flexRoot.flexRoot = true;
	flexRoot.layout.direction = "horizontal";
	flexRoot.layout.justifyContent = "start";
	flexRoot.layout.padding.x = 0;
	flexRoot.layout.padding.y = 0;

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
	flex.layout.padding.x = insetX;
	flex.layout.padding.y = insetY;
	flex.layout.borderRadius = 8;
	flex.theme.tokens["backgroundColor"] = "rgba(245, 252, 249, 1.0)";

	

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
	container.layout.height = "hug";
	container.layout.direction = "horizontal";
	container.layout.justifyContent = "start";
	container.layout.padding.x = 0;
	container.layout.padding.y = 0;

	flex = makeFlexData(container);
	flex.layout.direction = "vertical";
	flex.layout.height = "hug";
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
	flex.layout.height = "hug";
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
	flex.layout.height = "hug";
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
	flex.layout.height = "hug";
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


	return page;
};

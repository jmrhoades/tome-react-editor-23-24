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
	let items = null;
	let col = null;
	let item = null;
	let text = null;
	let img = null;
	let line = null;
	let icon = null;

	page = makePageData(tome);
	page.theme = Themes.StychB;

	flexRoot = makeFlexRootData(page);
	flexRoot.layout.alignX = contentAlign.CENTER;

	// Text container
	container = makeFlexData(flexRoot);
	//container.layout.height.type = containerSize.HUG;
	container.layout.alignX = contentAlign.CENTER;
	container.layout.alignY = contentAlign.CENTER;

	// Text
	text = makeTextData(container);
	text.layout.height.type = containerSize.HUG;
	text.content.textStyle = TextStyles.Title;
	text.content.text = "Stytch delivers comprehensive infrastructure and features for authentication & authorization";
	text.content.fontSize = 34;
	text.content.fontWeight = 600;
	text.content.lineHeight = "1.3";
	//text.content.align = "center";
	text.layout.alignX = contentAlign.CENTER;

	// Items container
	items = makeFlexData(flexRoot);
	items.layout.direction = contentDirection.HORIZONTAL;
	items.layout.gap = 12;
	items.layout.height.type = containerSize.HUG;

	// Items column
	col = makeFlexData(items);
	col.layout.direction = contentDirection.VERTICAL;
    col.layout.height.type = containerSize.HUG;
	col.layout.gap = 12;
    
	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 80;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#6AE2C2";

	// Item icon
	img = makeImageData(item);
	img.content.size = contentSize.FIT;
	img.content.src = "/images/stych-icon-lock-1.png";
	img.layout.aspectRatio = 656 / 656;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 64;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = 64;

	// Item label
	text = makeTextData(item);
	text.layout.height.type = containerSize.HUG;
	text.content.text = `Primary Authentication`;
    text.content.lineHeight = 1;
	text.content.fontWeight = 600;
    text.content.fontSize = 18;
    text.content.color = "#19303d";

	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
	item.layout.alignX = contentAlign.CENTER;
    item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `SSO, Email Magic Links, Passwords, OAuth`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    // Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `Organization-level auth settings`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    // Items column
	col = makeFlexData(items);
	col.layout.direction = contentDirection.VERTICAL;
    col.layout.height.type = containerSize.HUG;
	col.layout.gap = 12;
	col.layout.padding.x = 0;
    col.layout.padding.y = 0;
    
	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 80;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#6AE2C2";

	// Item icon
	img = makeImageData(item);
	img.content.src = "/images/stych-icon-lock-1.png";
	img.layout.aspectRatio = 656 / 656;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 64;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value * img.layout.aspectRatio;

	// Item label
	text = makeTextData(item);
	text.layout.height.type = containerSize.HUG;
	text.content.text = `Secondary Authentication`;
    text.content.lineHeight = 1;
	text.content.fontWeight = 600;
    text.content.fontSize = 18;
    text.content.color = "#19303d";
	
	
	

	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `SMS OTP, TOTP`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";
    

    // Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `Organization-level auth settings`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    // Items column
	col = makeFlexData(items);
	col.layout.direction = contentDirection.VERTICAL;
    col.layout.height.type = containerSize.HUG;
	col.layout.gap = 12;
	col.layout.padding.x = 0;
    col.layout.padding.y = 0;
    
	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 80;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#6AE2C2";

	// Item icon
	img = makeImageData(item);
	img.content.src = "/images/stych-icon-person-1.png";
	img.layout.aspectRatio = 656 / 656;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 64;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	// Item label
	text = makeTextData(item);
	text.layout.height.type = containerSize.HUG;
	text.content.text = `User Provisioning`;
    text.content.lineHeight = 1;
	text.content.fontWeight = 600;
    text.content.fontSize = 18;
    text.content.color = "#19303d";

	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `SCIM`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    // Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `Organization-level auth settings`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

     // Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `JIT provisioning`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    // Items column
	col = makeFlexData(items);
	col.layout.direction = contentDirection.VERTICAL;
    col.layout.height.type = containerSize.HUG;
	col.layout.gap = 12;
	col.layout.padding.x = 0;
    col.layout.padding.y = 0;
    
	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 80;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#6AE2C2";

	// Item icon
	img = makeImageData(item);
	img.content.src = "/images/stych-icon-settings-1.png";
	img.layout.aspectRatio = 656 / 656;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = 64;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = img.layout.width.value / img.layout.aspectRatio;

	// Item label
	text = makeTextData(item);
	text.content.text = `Authorization`;
	text.layout.height.type = containerSize.HUG;
    text.content.lineHeight = 1;
	text.content.fontWeight = 600;
    text.content.fontSize = 18;
    text.content.color = "#19303d";

	// Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `RBAC`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    // Item
	item = makeFlexData(col);
	item.layout.direction = contentDirection.HORIZONTAL;
    item.layout.alignX = contentAlign.CENTER;
	item.layout.alignY = contentAlign.CENTER;
	item.layout.height.type = containerSize.HUG;
    item.layout.padding.left = 12;
	item.layout.padding.right = 12;
    item.layout.padding.top = 12;
	item.layout.padding.bottom = 12;
    item.layout.height.type = containerSize.CUSTOM;
	item.layout.height.value = 72;
	item.layout.borderRadius = 3;
	item.background.type = backgrounds.COLOR;
	item.background.value = "#D2FDE2";

	// Item label
	text = makeTextData(item);
    text.layout.width.type = containerSize.FILL;
	text.content.text = `Role assignment via SCIM / SSO / domain`;
	text.layout.alignX = contentAlign.CENTER;
	text.layout.alignY = contentAlign.CENTER;
	text.content.align = "center";

    

	return page;
};

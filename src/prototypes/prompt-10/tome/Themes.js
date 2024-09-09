import { colors } from "../ds/Colors";

export const createTheme = config => {
	// Light or dark?
	const isLight = config && config.mode && config.mode === "light";

	// Create theme config
	const theme = {};
	theme.mode = config.mode;

	/*
    COLORS
    */
	theme.colors = {};
	const opaque = isLight ? colors.light.opaque : colors.dark.opaque;
	const transparent = isLight ? colors.light.transparent : colors.dark.transparent;
	const shadows = isLight ? colors.light.shadows : colors.dark.shadows;

	// Opaque colors
	theme.colors.z0 = opaque.z0;
	theme.colors.z1 = opaque.z1;
	theme.colors.z2 = opaque.z2;
	theme.colors.z3 = opaque.z3;
	theme.colors.z4 = opaque.z4;
	theme.colors.z5 = opaque.z5;
	theme.colors.z6 = opaque.z6;

	// Transparent colors
	theme.colors.t0 = transparent.t0;
	theme.colors.t1 = transparent.t1;
	theme.colors.t15 = transparent.t15;
	theme.colors.t2 = transparent.t2;
	theme.colors.t3 = transparent.t3;
	theme.colors.t4 = transparent.t4;
	theme.colors.t5 = transparent.t5;
	theme.colors.t6 = transparent.t6;
	theme.colors.t7 = transparent.t7;
	theme.colors.t75 = transparent.t75;
	theme.colors.t8 = transparent.t8;
	theme.colors.t9 = transparent.t9;

	// Shadows
	theme.shadows = {};
	theme.shadows.small = shadows.small;
	theme.shadows.medium = shadows.medium;
	theme.shadows.large = shadows.large;
	theme.shadows.panel = isLight
		? "0px 0px 0px 1px rgba(0,0,0,0.04), 0px 4px 12px rgba(0,0,0,0.04)"
		: "0px 0px 0px 1px hsla(0, 0%, 12%, 1.0), 0px 6px 16px hsla(0, 0%, 0%, 0.25)";
	theme.shadows.sliderHandle = isLight ? "rgb(0, 0, 0, 0.04) 0px 2px 8px" : "rgb(0, 0, 0, 0.25) 0px 4px 12px";
	
	theme.shadows.bar = isLight
		? "0px 0px 0px 1px rgba(0,0,0,0.04), 0px 4px 12px rgba(0,0,0,0.02)"
		: "0px 0px 0px 1px hsla(0, 0%, 12%, 1.0), 0px 4px 12px hsla(0, 0%, 0%, 0.16), 0px 6px 16px hsla(0, 0%, 0%, 0.12)";

	theme.shadows.menu = isLight
		? "0px 4px 12px rgba(0,0,0,0.02), 0px 0px 0px 1px rgba(0,0,0,0.04) inset"
		: "0px 2px 6px hsla(0, 0%, 0%, 0.12), 0px 4px 12px hsla(0, 0%, 0%, 0.12), 0px 6px 16px hsla(0, 0%, 0%, 0.12), 0px 0px 0px 1px hsla(0, 0%, 100%, 0.04) inset";

	// Accent color
	theme.colors.accent = colors.accent;
	theme.colors.uiAccent = colors.accent;

	// Warning color
	theme.colors.warning = isLight ? colors.light.warning : colors.dark.warning;
	theme.colors.delete = colors.core.red;
	theme.colors.generated = "#21B12F";

	// Backgrounds
	theme.colors.backgrounds = {};
	theme.colors.backgrounds.canvas = isLight ? theme.colors.z0 : theme.colors.z0;
	theme.colors.backgrounds.page = isLight ? theme.colors.z0 : theme.colors.z0;
	theme.colors.backgrounds.layoutPage = isLight ? theme.colors.z0 : theme.colors.z0;
	theme.colors.backgrounds.newPage = isLight ? theme.colors.t2 : theme.colors.t2;
	theme.colors.backgrounds.tile = {};
	theme.colors.backgrounds.tile.null = isLight ? theme.colors.t1 : theme.colors.t2;
	theme.colors.backgrounds.tile.hover = isLight ? theme.colors.t1 : theme.colors.t2;
	theme.colors.backgrounds.tile.default = isLight ? theme.colors.z0 : theme.colors.z0;
	theme.colors.backgrounds.tile.dragging = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.tile.twitter = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.tile.code = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.panel = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.menu = isLight ? theme.colors.z0 : theme.colors.z2;
	theme.colors.backgrounds.tooltip = isLight ? "hsla(0, 0%, 30%, 1.0)" : theme.colors.z4;
	theme.colors.backgrounds.generatingScrim = isLight ? "hsla(0, 0%, 0%, 0.08)" : "hsla(0, 0%, 0%, 0.2)";

	theme.colors.layoutOutline = isLight ? theme.colors.t3 : theme.colors.t2;
	theme.colors.layoutOutlineHover = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.shadows.layoutOutline = isLight ? "0px 1px 8px hsla(0, 0%, 0%, 0.06)" : "0px 1px 8px hsla(0, 0%, 0%, 0.25)";

	// Shine / Shimmer Effect
	theme.colors.shine = {};
	theme.colors.shine.base = isLight ? theme.colors.t6 : theme.colors.t6;
	theme.colors.shine.highlight = isLight ? theme.colors.t4 : theme.colors.t7;

	// Controls
	theme.colors.controls = {};
	theme.colors.controls.icon = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.colors.controls.iconHover = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.controls.selected = isLight ? theme.colors.z0 : theme.colors.t4;
	theme.colors.controls.border = isLight ? theme.colors.t1 : theme.colors.t0;
	theme.colors.controls.canvasMaterial = isLight ? "hsla(0, 0%, 100%, 0.0)" : "hsla(0, 0%, 0%, 0.0)";
	theme.colors.controls.label = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.controls.labelHover = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.controls.labelActive = isLight ? theme.colors.t9 : theme.colors.t9;
	theme.colors.controls.labelDisabled = isLight ? theme.colors.t4 : theme.colors.t4;
	theme.colors.controls.pageCount = isLight ? theme.colors.t7 : theme.colors.t6;
	theme.colors.backgrounds.generatingButton = isLight ? "hsla(0,0%,100%,0.64)" : "hsla(0,0%,16%,0.64)";

	// Controls - Fields
	theme.colors.controls.field = {};
	theme.colors.controls.field.background = isLight ? theme.colors.t2 : theme.colors.t1;
	theme.colors.controls.field.value = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.colors.controls.field.valueFocussed = isLight ? theme.colors.t9 : theme.colors.t9;
	theme.colors.controls.field.placeholder = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.colors.controls.field.hoverBorder = isLight ? theme.colors.t2 : theme.colors.t2;
	theme.colors.controls.field.focusBorder = isLight ? theme.colors.accent : theme.colors.accent;

	// Controls - Resize Handles
	theme.colors.controls.resize = {};
	theme.colors.controls.resize.handle = isLight ? theme.colors.t4 : theme.colors.t4;
	theme.colors.controls.resize.handleActive = isLight ? theme.colors.t6 : theme.colors.t6;
	//theme.colors.controls.resize.handleActive = isLight ? theme.colors.accent : theme.colors.accent;
	theme.colors.controls.resize.handleWarning = isLight ? colors.core.red : colors.core.red;
	theme.colors.controls.resize.indicatorBackground = isLight ? theme.colors.z0 : theme.colors.z4;
	theme.colors.controls.resize.indicatorForeground = isLight ? theme.colors.z6 : theme.colors.t9;
	theme.colors.controls.resize.indicatorWarning = isLight ? colors.core.red : colors.core.red;
	theme.colors.controls.resize.indicatorLarge = true;
	theme.colors.controls.resize.indicatorShow = isLight ? true : true;
	theme.colors.controls.resize.grid = theme.colors.accent;

	// Controls - Video
	theme.colors.controls.video = {};
	theme.colors.controls.video.background = "rgba(64, 64, 64, 0.6)";

	// Controls - Switch
	theme.colors.controls.switch = {};
	theme.colors.controls.switch.trackOff = isLight ? theme.colors.t2 : theme.colors.t2;
	theme.colors.controls.switch.trackOn = isLight ? theme.colors.accent : "rgba(75,29,75,1)";
	theme.colors.controls.switch.thumbOff = isLight ? theme.colors.z0 : theme.colors.t5;
	theme.colors.controls.switch.thumbOn = isLight ? theme.colors.z0 : theme.colors.accent;

	// Controls - Slider
	theme.colors.controls.slider = {};
	theme.colors.controls.slider.background = isLight ? theme.colors.t1 : theme.colors.t1;
	theme.colors.controls.slider.fill = isLight ? theme.colors.t2 : theme.colors.t3;
	theme.colors.controls.slider.handle = isLight ? theme.colors.z0 : "#777";
	theme.colors.controls.slider.handleBorder = isLight ? theme.colors.t2 : "transparent";
	//theme.colors.controls.slider.trackOff = isLight ? theme.colors.t2 : "rgba(0,0,0,0.33)"; //theme.colors.t1
	//theme.colors.controls.slider.fillOff = isLight ? theme.colors.t6 : theme.colors.t3; //theme.colors.t2;
	//theme.colors.controls.slider.fillOn = isLight ? theme.colors.t7 : theme.colors.t4; //theme.colors.t2;
	//theme.colors.controls.slider.handleOff = isLight ? theme.colors.z0 : "#777";
	//theme.colors.controls.slider.handleOn = isLight ? theme.colors.z4 : "#AAA";
	//theme.colors.controls.slider.handleHover = isLight ? theme.colors.t0 : theme.colors.t4;
	//theme.colors.controls.slider.focusBorder = isLight ? theme.colors.accent : theme.colors.accent;
	
	// Tooltip
	theme.colors.tooltip = {};
	theme.colors.tooltip.label = isLight ? "#FFF" : theme.colors.t9;
	theme.colors.tooltip.background = isLight ?  "hsla(0, 0%, 30%, 1.0)" : theme.colors.z3;
	theme.colors.tooltip.shadow = isLight ? "0px 6px 16px hsla(0, 0%, 0%, 0.06)" : "0px 6px 16px hsla(0, 0%, 0%, 0.25)";

	// Menu
	theme.colors.menu = {};
	theme.colors.menu.background = isLight ? theme.colors.z0 : theme.colors.z3;
	theme.colors.menu.label = isLight ? theme.colors.t9 : theme.colors.t8;
	theme.colors.menu.icon = isLight ? theme.colors.t9 : theme.colors.t8;
	theme.colors.menu.labelHover = isLight ? "#FFF" : "#FFF";
	theme.colors.menu.iconHover = isLight ? "#FFF" : "#FFF";
	
	theme.colors.menu.backgroundHover = isLight ? colors.accent : colors.accent;

	// Panel
	theme.colors.panel = {};
	theme.colors.panel.tile = isLight ? theme.colors.t1 : theme.colors.t2;
	theme.colors.panel.icon = isLight ? theme.colors.t7 : theme.colors.t8;
	theme.colors.panel.label = isLight ? theme.colors.t7 : theme.colors.t8;

	// Text tile colors
	theme.colors.text = {};
	theme.colors.text.heading = isLight ? "hsla(0, 0%, 0%, 1)" : "hsla(0, 0%, 100%, 1)";
	
	theme.colors.text.body = isLight ? "#6F6F6F" : "#959595";

	theme.colors.text.mentionBackground = isLight ? theme.colors.z2 : theme.colors.z3;
	theme.colors.text.codeBackground = isLight ? theme.colors.z2 : theme.colors.z3;
	theme.colors.text.link = "rgba(208,208,208, 1)";
	theme.colors.text.caret = theme.colors.accent;
	theme.colors.text.selection = isLight ? colors.accent15 : colors.accent30;
	theme.colors.text.blockquotebar = isLight ? theme.colors.t3 : theme.colors.t3;

	// Table tile colors
	theme.colors.table = {};
	theme.colors.table.heading = isLight ? "hsla(0, 0%, 0%, 1)" : "hsla(0, 0%, 100%, 1)";
	theme.colors.table.body = isLight ? "hsla(0, 0%, 40%, 1)" : theme.colors.z6;
	//theme.colors.table.cell = isLight ? theme.colors.z1 : theme.colors.z1;
	theme.colors.table.cell = isLight ? theme.colors.t1 : theme.colors.t2;
	theme.colors.table.headerBg = isLight ? theme.colors.t2 : theme.colors.t4;
	

	// Image & Video tile colors
	theme.colors.media = {};
	theme.colors.media.caption = {};
	theme.colors.media.caption.light = {};
	theme.colors.media.caption.light.background = colors.dark.transparent.t8;
	theme.colors.media.caption.light.text = colors.light.opaque.z6;
	theme.colors.media.caption.dark = {};
	theme.colors.media.caption.dark.background = colors.light.transparent.t8;
	theme.colors.media.caption.dark.text = colors.dark.opaque.z6;

	// Prompt bar
	theme.colors.promptbar = {};
	theme.colors.promptbar.barBackground = isLight ? "hsla(0, 0%, 100%, 0.95)" : "hsla(0, 0%, 8%, 0.95)";
	theme.colors.promptbar.miniBackground = isLight ? "hsla(0, 0%, 100%, 0.8)" : "hsla(0, 0%, 15%, 0.8)";
	theme.colors.promptbar.miniBackgroundHover = isLight ? "hsla(0, 0%, 100%, 1.0)" : "hsla(0, 0%, 18%, 0.8)";
	theme.colors.promptbar.miniShadow = isLight
		? "0px 2px 6px 0px hsla(0, 0%, 0%, 0.06), 0px 0px 0px 1px hsla(0, 0%, 0%, 0.06)"
		: "0px 4px 8px 0px hsla(0, 0%, 0%, 0.20), 0px 0px 0px 1px hsla(0, 0%, 100%, 0.04) inset";
	theme.colors.promptbar.barShadow = isLight
	? "0px 4px 12px rgba(0,0,0,0.06), 0px 0px 0px 1px rgba(0,0,0,0.06)"
	: "0px 4px 12px hsla(0, 0%, 0%, 0.16), 0px 6px 16px hsla(0, 0%, 0%, 0.12), 0px 0px 0px 1px hsla(0, 0%, 100%, .04) inset";
	theme.colors.promptbar.miniBar = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.colors.promptbar.divider = isLight ? theme.colors.t1 : theme.colors.t2;
	theme.colors.promptbar.textfield = isLight ? theme.colors.t9 : theme.colors.t9;
	theme.colors.promptbar.placeholder = isLight ? theme.colors.t6 : theme.colors.t6;
	theme.colors.promptbar.shineBase = isLight ? theme.colors.t6 : theme.colors.t6;
	theme.colors.promptbar.shineHighlight = isLight ? theme.colors.t4 : theme.colors.t7;
	theme.colors.promptbar.scrollbarThumbBackground = isLight ? theme.colors.z3 : theme.colors.z5;
	theme.colors.promptbar.scrollbarTrackBackground = isLight ? theme.colors.t0 : theme.colors.t0;
	theme.colors.promptbar.scrollbarTrackBorder = isLight ? theme.colors.z1 : theme.colors.z2;
	theme.colors.promptbar.buttonBackground = isLight ? theme.colors.t2 : theme.colors.t2;
	theme.colors.promptbar.buttonBackgroundHover = isLight ? theme.colors.t2 : theme.colors.t2;
	theme.colors.promptbar.buttonLabel = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.colors.promptbar.buttonLabelHover = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.promptbar.buttonLabelActive = isLight ? theme.colors.t9 : theme.colors.t9;
	theme.colors.promptbar.buttonIcon = isLight ? theme.colors.t7 : theme.colors.t7;
	theme.colors.promptbar.buttonIconHover = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.promptbar.buttonIconActive = isLight ? theme.colors.t9 : theme.colors.t9;
	theme.colors.promptbar.itemHighlight = isLight ? theme.colors.t2 : theme.colors.t2;
	theme.colors.promptbar.itemLabel = isLight ? theme.colors.t75 : theme.colors.t7;
	theme.colors.promptbar.itemLabelHover = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.promptbar.itemLabelAppended = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.promptbar.itemIcon = isLight ? theme.colors.t75 : theme.colors.t7;
	theme.colors.promptbar.itemIconHover = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.promptbar.itemAccessoryIcon = isLight ? theme.colors.t75 : theme.colors.t7;
	theme.colors.promptbar.itemAccessoryLabel = isLight ? theme.colors.t75 : theme.colors.t7;

	// Outline editor
	theme.colors.outline = {};
	theme.colors.outline.scrim = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.outline.item = {};

	theme.colors.outline.item.border = {};
	theme.colors.outline.item.background = {};
	theme.colors.outline.item.field = {};

	theme.colors.outline.item.border.color = isLight ? theme.colors.t0 : theme.colors.t0;
	theme.colors.outline.item.border.focus = isLight ? theme.colors.t0 : theme.colors.t0;
	theme.colors.outline.item.background.color = isLight ? theme.colors.z1 : theme.colors.z2;
	theme.colors.outline.item.background.focus = isLight ? theme.colors.z1 : theme.colors.z2;
	theme.colors.outline.item.background.drag = isLight ? theme.colors.z0 : theme.colors.z3;
	theme.colors.outline.item.field.color = isLight ? theme.colors.t8 : theme.colors.t8;
	theme.colors.outline.item.field.focus = isLight ? theme.colors.t9 : theme.colors.t9;

	/*
	SPECIAL THEMES
	*/
	if (config && config.theme && config.theme === "dune") {
		theme.colors.accent = "#FFDCC3";
		theme.colors.backgrounds.canvas = "#ab5e27";
		theme.colors.backgrounds.page = "#ab5e27";
		theme.colors.text.heading = "#FFDCC3";
		theme.colors.text.body = "#F8C29D";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(255, 220, 195, 0.3)";
		theme.colors.controls.resize.handle = "rgba(255, 220, 195, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(171, 94, 39, 0.5)";
		theme.colors.backgrounds.tile.dragging = "#ab5e27";
	}
	if (config && config.theme && config.theme === "creme") {
		theme.colors.accent = "rgba(72, 66, 64, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(239, 235, 229, 1.0)";
		theme.colors.backgrounds.page = "rgba(239, 235, 229, 1.0)";
		theme.colors.text.heading = "rgba(72, 66, 64, 1.0)";
		theme.colors.text.body = "rgba(119, 113, 100, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(72, 66, 64, 0.3)";
		theme.colors.controls.resize.handle = "rgba(72, 66, 64, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(239, 235, 229, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(239, 235, 229, 0.5)";
	}

	if (config && config.theme && config.theme === "neon") {
		theme.colors.accent = "rgba(67, 23, 250, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(240, 242, 255, 1.0)";
		theme.colors.backgrounds.page = "rgba(240, 242, 255, 1.0)";
		theme.colors.text.heading = "rgba(67, 23, 250, 1.0)";
		theme.colors.text.body = "rgba(108, 130, 186, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(67, 23, 250, 0.3)";
		theme.colors.controls.resize.handle = "rgba(67, 23, 250, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(240, 242, 255, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(240, 242, 255, 0.5)";
	}

	if (config && config.theme && config.theme === "night") {
		theme.colors.accent = "rgba(126, 89, 255, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(24, 24, 26, 1.0)";
		theme.colors.backgrounds.page = "rgba(24, 24, 26, 1.0)";
		theme.colors.text.heading = "rgba(126, 89, 255, 1.0)";
		theme.colors.text.body = "rgba(154, 154, 154, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(126, 89, 255, 0.3)";
		theme.colors.controls.resize.handle = "rgba(126, 89, 255, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(24, 24, 26, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(24, 24, 26, 0.5)";
	}

	if (config && config.theme && config.theme === "moss") {
		theme.colors.accent = "rgba(217, 233, 183, 1.0)";
		
		theme.colors.backgrounds.canvas = "rgba(7, 49, 29, 1.0)";
		theme.colors.backgrounds.page = "rgba(7, 49, 29, 1.0)";
		theme.colors.controls.canvasMaterial = "rgba(7, 49, 29, 0.5)";
		//theme.colors.promptbar.miniBackground = "hsla(151, 75%, 15%, 0.8)";
		theme.colors.text.heading = "rgba(217, 233, 183, 1.0)";
		theme.colors.text.body = "rgba(141, 153, 132, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(217, 233, 183, 0.3)";
		theme.colors.controls.resize.handle = "rgba(217, 233, 183, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		
		theme.colors.backgrounds.tile.dragging = "rgba(7, 49, 29, 0.5)";
	}

	if (config && config.theme && config.theme === "canary") {
		theme.colors.accent = "rgba(53, 53, 47, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(255, 251, 129, 1.0)";
		theme.colors.backgrounds.page = "rgba(255, 251, 129, 1.0)";
		theme.colors.text.heading = "rgba(53, 53, 47, 1.0)";
		theme.colors.text.body = "rgba(131, 131, 98, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(53, 53, 47, 0.3)";
		theme.colors.controls.resize.handle = "rgba(53, 53, 47, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(7, 49, 29, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(7, 49, 29, 0.5)";
	}

	if (config && config.theme && config.theme === "ocean") {
		theme.colors.accent = "rgba(255, 215, 158, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(70, 67, 231, 1.0)";
		theme.colors.backgrounds.page = "rgba(70, 67, 231, 1.0)";
		theme.colors.text.heading = "rgba(255, 215, 158, 1.0)";
		theme.colors.text.body = "rgba(191, 232, 255, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(255, 215, 158, 0.3)";
		theme.colors.controls.resize.handle = "rgba(255, 215, 158, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(7, 49, 29, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(7, 49, 29, 0.5)";
	}

	if (config && config.theme && config.theme === "neptune") {
		theme.colors.accent = "rgba(55, 181, 247, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(21, 21, 21, 1.0)";
		theme.colors.backgrounds.page = "rgba(21, 21, 21, 1.0)";
		theme.colors.text.heading = "rgba(55, 181, 247, 1.0)";
		theme.colors.text.body = "rgba(191, 232, 255, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(55, 181, 247, 0.3)";
		theme.colors.controls.resize.handle = "rgba(55, 181, 247, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(21, 21, 21, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(21, 21, 21, 0.5)";
	}

	if (config && config.theme && config.theme === "musou") {
		theme.colors.accent = "rgba(255, 255, 255, 0.6)";
		theme.colors.backgrounds.canvas = "rgba(0, 0, 0, 1.0)";
		theme.colors.backgrounds.page = "rgba(0, 0, 0, 1.0)";
		theme.colors.text.heading = "rgba(66, 66, 66, 1.0)";
		theme.colors.text.body = "rgba(93, 93, 93, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(255, 255, 255, 0.3)";
		theme.colors.controls.resize.handle = "rgba(255, 255, 255, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(0, 0, 0, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(0, 0, 0, 0.5)";
	}

	if (config && config.theme && config.theme === "fadedGreen") {
		theme.colors.accent = "rgba(63, 68, 19, 1.0)";
		theme.colors.backgrounds.canvas = "rgba(183, 183, 168, 1.0)";
		theme.colors.backgrounds.page = "rgba(183, 183, 168, 1.0)";
		theme.colors.text.heading = "rgba(63, 68, 19, 1.0)";
		theme.colors.text.body = "rgba(99, 102, 77, 1.0)";
		theme.colors.text.caret = theme.colors.accent;
		theme.colors.text.selection = "rgba(63, 68, 19, 0.3)";
		theme.colors.controls.resize.handle = "rgba(63, 68, 19, 0.3)";
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.canvasMaterial = "rgba(183, 183, 168, 0.5)";
		theme.colors.backgrounds.tile.dragging = "rgba(183, 183, 168, 0.5)";
	}

	/*
    TYPOGRAPHY
    */
	theme.typography = {};
	theme.typography.fontFamily = "ABCDiatypeVariable";
	theme.typography.fontFamilyMono = "ABCDiatypeMonoVariable";
	theme.typography.baseSize = 20;
	theme.typography.scale = 1.46;
	theme.typography.baseWeight = 400;
	theme.typography.mediumWeight = 450;
	theme.typography.boldWeight = 500;

	theme.typography.fontColor = {};
	theme.typography.fontColor.ULTRA = theme.colors.text.heading;
	theme.typography.fontColor.H0 = theme.colors.text.heading;
	theme.typography.fontColor.H1 = theme.colors.text.heading;
	theme.typography.fontColor.H2 = theme.colors.text.heading;
	theme.typography.fontColor.H3 = theme.colors.text.heading;
	theme.typography.fontColor.H4 = theme.colors.text.heading;
	theme.typography.fontColor.DEFAULT = theme.colors.text.body;
	theme.typography.fontColor.P = theme.colors.text.body;
	theme.typography.fontColor.TD = theme.colors.text.body;
	theme.typography.fontColor.CAPTION = theme.colors.text.body;
	theme.typography.fontColor.LINK = "inherit";
	theme.typography.fontColor.PLACEHOLDER = isLight ? theme.colors.t7 : "rgba(255,255,255,0.35)";

	theme.typography.fontSize = {};
	updateThemeBaseFontSize(theme, theme.typography.baseSize);

	//const bS = theme.typography.baseSize;
	//const s = theme.typography.scale;
	//theme.typography.fontSize.H0 = bS * s * s * s * s;
	//theme.typography.fontSize.H1 = bS * s * s * s;
	//theme.typography.fontSize.H2 = bS * s * s;
	//theme.typography.fontSize.H3 = bS * s;
	//theme.typography.fontSize.H4 = bS;
	//theme.typography.fontSize.P = bS;
	//theme.typography.fontSize.CAPTION = (bS * 1) / s;
	//theme.typography.fontSize.CAPTION = 14;

	theme.typography.fontWeight = {};
	theme.typography.fontWeight.ULTRA = theme.typography.boldWeight;
	theme.typography.fontWeight.H0 = theme.typography.boldWeight;
	theme.typography.fontWeight.H1 = theme.typography.boldWeight;
	theme.typography.fontWeight.H2 = theme.typography.boldWeight;
	theme.typography.fontWeight.H3 = theme.typography.boldWeight;
	theme.typography.fontWeight.H4 = theme.typography.boldWeight;
	theme.typography.fontWeight.DEFAULT = theme.typography.baseWeight;
	theme.typography.fontWeight.P = theme.typography.baseWeight;
	theme.typography.fontWeight.TD = theme.typography.baseWeight;
	theme.typography.fontWeight.CAPTION = theme.typography.baseWeight;
	theme.typography.fontWeight.BOLD = theme.typography.boldWeight;
	theme.typography.fontWeight.BOLD_ITALIC = theme.typography.boldWeight;
	theme.typography.fontWeight.BOLD_ITALIC_UNDERLINED = theme.typography.boldWeight;

	theme.typography.lineHeight = {};
	theme.typography.lineHeight.ULTRA = "105%";
	theme.typography.lineHeight.H0 = "105%";
	theme.typography.lineHeight.H1 = "105%";
	theme.typography.lineHeight.H2 = "110%";
	theme.typography.lineHeight.H3 = "120%";
	theme.typography.lineHeight.H4 = "120%";
	theme.typography.lineHeight.DEFAULT = "1.4";
	theme.typography.lineHeight.P = "1.5";
	theme.typography.lineHeight.TD = "1.4";
	theme.typography.lineHeight.CAPTION = "1.4";

	theme.typography.letterSpacing = {};
	theme.typography.letterSpacing.ULTRA = "-0.01em";
	theme.typography.letterSpacing.H0 = "-0.01em";
	theme.typography.letterSpacing.H1 = "-0.01em";
	theme.typography.letterSpacing.H2 = "-0.01em";
	theme.typography.letterSpacing.H3 = "0";
	theme.typography.letterSpacing.H4 = "0";
	theme.typography.letterSpacing.DEFAULT = "0";
	theme.typography.letterSpacing.P = "0";
	theme.typography.letterSpacing.TD = "0";
	theme.typography.letterSpacing.CAPTION = "0";

	theme.typography.marginBottom = {};
	// theme.typography.marginBottom.ULTRA = "2em";
	// theme.typography.marginBottom.H0 = "1em";
	// theme.typography.marginBottom.H1 = "1em";
	// theme.typography.marginBottom.H2 = "1.5em";
	// theme.typography.marginBottom.H3 = "1em";
	// theme.typography.marginBottom.H4 = "1em";
	// theme.typography.marginBottom.DEFAULT = "1em";
	// theme.typography.marginBottom.P = "0.75em";
	// theme.typography.marginBottom.CAPTION = "0.75em";

	theme.typography.marginBottom.ULTRA = 32;
	theme.typography.marginBottom.H0 = 16;
	theme.typography.marginBottom.H1 = 16;
	
	theme.typography.marginBottom.H2 = 16;
	theme.typography.marginBottom.DEFAULT = 16;

	theme.typography.marginBottom.H3 = 12;
	theme.typography.marginBottom.P = 12;
	theme.typography.marginBottom.H4 = 12;
	
	theme.typography.marginBottom.CAPTION = 12;
	return theme;
};

export const updateThemeBaseFontSize = (theme, bS) => {
	const s = theme.typography.scale;
	// theme.typography.fontSize.ULTRA = bS * s * s * s * s * s;
	// theme.typography.fontSize.H0 = bS * s * s * s;
	// theme.typography.fontSize.H1 = bS * s * s;
	// theme.typography.fontSize.H2 = bS * s;
	// theme.typography.fontSize.DEFAULT = bS * s;
	// theme.typography.fontSize.H3 = bS;
	// theme.typography.fontSize.H4 = bS;
	// theme.typography.fontSize.P = bS;
	// theme.typography.fontSize.CAPTION = bS / s;

	theme.typography.fontSize.ULTRA = bS * 8.76; // Display 1
	theme.typography.fontSize.H0 = bS * 4.624; // Display 2
	theme.typography.fontSize.H1 = bS * 2.776; // Title 1
	theme.typography.fontSize.H2 = bS * 1.666; // Title 2
	theme.typography.fontSize.DEFAULT = bS * 1.46; // Body 1
	theme.typography.fontSize.H3 = bS  // Subhead
	theme.typography.fontSize.H4 = bS; // Subhead ??
	theme.typography.fontSize.P = bS; // Body 2
	theme.typography.fontSize.TD = bS * .85; // Body 2
	//theme.typography.fontSize.CAPTION = bS / s;
	theme.typography.fontSize.CAPTION = 16;
};

export const Themes = [
	{
		name: "Dark",
		id: "theme-dark",
		mode: "dark",
		previewOutlineDark: colors.dark.transparent.t4,
		...createTheme({ mode: "dark", theme: "dark" }),
	},

	{
		name: "Light",
		id: "theme-light",
		mode: "light",
		previewOutlineLight: colors.light.transparent.t2,
		...createTheme({ mode: "light", theme: "light" }),
	},

	{
		name: "Creme",
		id: "theme-creme",
		mode: "light",
		...createTheme({ mode: "light", theme: "creme" }),
	},

	{
		name: "Neon",
		id: "theme-neon",
		mode: "light",
		...createTheme({ mode: "light", theme: "neon" }),
	},

	{
		name: "Moss",
		id: "theme-moss",
		mode: "light",
		...createTheme({ mode: "dark", theme: "moss" }),
	},

	{
		name: "Ocean",
		id: "theme-ocean",
		mode: "dark",
		...createTheme({ mode: "dark", theme: "ocean" }),
	},

	{
		name: "Dune",
		id: "theme-dune",
		mode: "dark",
		...createTheme({ mode: "dark", theme: "dune" }),
	},

	{
		name: "Canary",
		id: "theme-canary",
		mode: "light",
		...createTheme({ mode: "light", theme: "canary" }),
	},

	{
		name: "Neptune",
		id: "theme-neptune",
		mode: "dark",
		previewOutlineDark: colors.dark.transparent.t4,
		...createTheme({ mode: "dark", theme: "neptune" }),
	},

	{
		name: "Musou",
		id: "theme-musou",
		mode: "dark",
		previewOutlineDark: colors.dark.transparent.t4,
		...createTheme({ mode: "dark", theme: "musou" }),
	},

	{
		name: "Night",
		id: "theme-night",
		mode: "dark",
		previewOutlineDark: colors.dark.transparent.t4,
		...createTheme({ mode: "dark", theme: "night" }),
	},

	{
		name: "Turtle",
		id: "theme-faded-green",
		mode: "light",
		...createTheme({ mode: "light", theme: "fadedGreen" }),
	},
];

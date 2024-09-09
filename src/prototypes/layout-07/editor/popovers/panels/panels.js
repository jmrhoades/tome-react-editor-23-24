import { Anchor } from "../PopoverContext";

import { Properties } from "./Properties";

import { AddText } from "./AddText";
import { AddMedia } from "./AddMedia";
import { AddIcon } from "./AddIcon";
import { AddPage } from "./AddPage";
import { SetTheme } from "./SetTheme";
import { PageSettings } from "./PageSettings";

import { Background } from "./Background";
import { Color } from "./Color";

const defaultWidth = 160;

export const Panels = {
	ADD_PAGE: {
		id: "add_page",
		type: "add_page",
		title: "Choose layout",
		titleBig: true,
		higherZ: true,
		draggable: false,
		instruction: "",
		icon: "Plus",
		content: AddPage,
		anchor: Anchor["bottom-end"],
		offset: 8,
		width: 276,
	},

	PROPERTIES: {
		id: "selection_properties",
		type: "selection_properties",
		title: "Properties",
		draggable: true,
		instruction: "",
		icon: "Preferences",
		content: Properties,
		anchor: Anchor.toolbar,
		offset: 8,
		width: 228,
	},

	BACKGROUND: {
		id: "background_settings",
		type: "background_settings",
		title: "Background",
		instruction: "",
		draggable: true,
		icon: "CircleOutline",
		content: Background,
		anchor: Anchor.toolbar, //Anchor["bottom"],
		offset: 8,
		width: defaultWidth,
	},

	COLOR: {
		id: "color",
		type: "color",
		title: "Color",
		instruction: "",
		draggable: true,
		icon: "CircleOutline",
		content: Color,
		anchor: Anchor.toolbar, //Anchor["bottom"],
		offset: 8,
		width: 180,
	},

	THEME: {
		id: "theme",
		type: "theme",
		title: "Set theme",
		instruction: "",
		draggable: true,
		icon: "ColorPalette",
		content: SetTheme,
		anchor: Anchor.toolbar,
		offset: 12,
		tooltip: "Set theme",
		width: 240,
	},

	ADD_TEXT: {
		id: "add_text",
		type: "add_text",
		title: "Add text",
		instruction: "Click or drag to add",
		content: AddText,
		icon: "Text",
		draggable: true,
		anchor: Anchor.toolbar,
		offset: 12,
		width: 160,
		tooltip: "Add text",
	},

	ADD_MEDIA: {
		id: "add_media",
		type: "add_media",
		title: "Add media",
		instruction: "Click or drag to add",
		icon: "Photo",
		content: AddMedia,
		draggable: true,
		anchor: Anchor.toolbar,
		offset: 12,
		width: 160,
		tooltip: "Add media",
	},

	ADD_SHAPE: {
		id: "add_shape",
		type: "add_shape",
		title: "Add shape",
		instruction: "Click or drag to add",
		icon: "Shapes",
		draggable: true,
		anchor: Anchor.left,
		offset: 12,
		width: 160,
		tooltip: "Add drawing",
	},

	ADD_TABLE: {
		id: "add_table",
		type: "add_table",
		title: "Add table",
		instruction: "Click or drag to add",
		icon: "Table",
		anchor: Anchor.left,
		offset: 12,
		draggable: true,
		width: defaultWidth,
		tooltip: "Add table",
	},

	ADD_CHART: {
		id: "add_chart",
		type: "add_chart",
		title: "Add chart",
		instruction: "Click or drag to add",
		icon: "ChartLine",
		anchor: Anchor.left,
		offset: 12,
		draggable: true,
		width: defaultWidth,
		tooltip: "Add chart",
	},

	ADD_EMBED: {
		id: "add_embed",
		type: "add_embed",
		title: "Add embed",
		instruction: "Click or drag to add",
		icon: "GridOutline",
		draggable: true,
		anchor: Anchor.left,
		offset: 12,
		width: defaultWidth,
		tooltip: "More tiles",
	},

	ADD_ICON: {
		id: "add_icon",
		type: "add_icon",
		title: "Add icon",
		instruction: "Click or drag to add",
		icon: "GrinningOutline",
		draggable: true,
		anchor: Anchor.toolbar,
		content: AddIcon,
		offset: 12,
		width: 160,
	},

	PAGE_SETTINGS: {
		id: "page_settings",
		type: "page_settings",
		title: "Page settings",
		instruction: "",
		draggable: true,
		icon: "Preferences",
		content: PageSettings,
		anchor: Anchor.toolbar,
		offset: 12,
		width: defaultWidth,
	},

};

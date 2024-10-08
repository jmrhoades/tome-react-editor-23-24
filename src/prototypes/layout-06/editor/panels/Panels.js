
import { Anchor } from "../EditorContext";
import { FlexSettings } from "./FlexSettings";
import { PageSettings } from "./PageSettings";
import { AddText } from "./AddText";
import { AddMedia } from "./AddMedia";
import { AddIcon } from "./AddIcon";
import { SetTheme } from "./SetTheme";

export const Panels = {
	PAGE_SETTINGS: {
		id: "page_settings",
		type: "page_settings",
		title: "Page settings",
		instruction: "",
		icon: "Preferences",
		content: PageSettings,
		anchor: Anchor.toolbar,
		offset: 12,
		//width: 256,
	},
	THEME: {
		id: "theme",
		type: "theme",
		title: "Set theme",
		instruction: "",
		icon: "ColorPalette",
		content: SetTheme,
		anchor: Anchor.toolbar,
		offset: 12,
	},
	ADD_TEXT: {
		id: "add_text",
		type: "add_text",
		title: "Add text",
		instruction: "Click or drag to add",
		content: AddText,
		icon: "Text",
		anchor: Anchor.toolbar,
		offset: 12,
		width: 160,
	},
	ADD_MEDIA: {
		id: "add_media",
		type: "add_media",
		title: "Add media",
		instruction: "Click or drag to add",
		icon: "Photo",
		content: AddMedia,
		anchor: Anchor.toolbar,
		offset: 12,
		width: 192,
	},
	ADD_SHAPE: {
		id: "add_shape",
		type: "add_shape",
		title: "Add shape",
		instruction: "Click or drag to add",
		icon: "Shapes",
		anchor: Anchor.left,
		offset: 12,
	},
	ADD_TABLE: {
		id: "add_table",
		type: "add_table",
		title: "Add table",
		instruction: "Click or drag to add",
		icon: "Table",
		anchor: Anchor.left,
		offset: 12,
	},
	ADD_CHART: {
		id: "add_chart",
		type: "add_chart",
		title: "Add chart",
		instruction: "Click or drag to add",
		icon: "ChartLine",
		anchor: Anchor.left,
		offset: 12,
	},
	ADD_EMBED: {
		id: "add_embed",
		type: "add_embed",
		title: "Add embed",
		instruction: "Click or drag to add",
		icon: "GridOutline",
		anchor: Anchor.left,
		offset: 12,
	},
	ADD_ICON: {
		id: "add_icon",
		type: "add_icon",
		title: "Add icon",
		instruction: "Click or drag to add",
		icon: "GrinningOutline",
		anchor: Anchor.toolbar,
		content: AddIcon,
		offset: 12,
		width: 160,
	},
	FLEX_SETTINGS: {
		id: "flex_settings",
		type: "flex_settings",
		title: "Group settings",
		instruction: "",
		icon: "Preferences",
		content: FlexSettings,
		anchor: Anchor["bottom-start"],
		offset: 10,
	},
};

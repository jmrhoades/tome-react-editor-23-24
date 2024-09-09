import { PANELS } from "../panel/PanelConstants";


export const TILES = {

	DRAWING: {
		name: "Drawing",
		icon: "Shapes",
		defaultHeight: 8,
		addPanelId: PANELS.ADD_SHAPE.id,
		settingsPanelId: PANELS.CANVAS_SETTINGS.id,
		settingsButtonTooltip: "Edit canvas options",
	},

	TEXT: { 
		name: "Text",
		icon: "Text",
		defaultHeight: 6,
		addPanelId: PANELS.ADD_TEXT.id,
		settingsPanelId: PANELS.TEXT_SETTINGS.id,
		settingsButtonTooltip: "Edit text options",
	 },

	IMAGE: { 
		name: "Image", 
		icon: "Image", 
		defaultHeight: 10, 
		addPanelId: PANELS.ADD_IMAGE.id,
		settingsPanelId: PANELS.IMAGE_SETTINGS.id,
		settingsButtonTooltip: "Edit image options",
		minHeight: 2,
	},

	VIDEO: { name: "Video", icon: "Video", defaultHeight: 10 },

	TABLE: { name: "Table", icon: "Table", defaultHeight: 6 },

	CHART: { name: "Chart", icon: "LineChart", defaultHeight: 8 },

	CODE: { name: "Code", icon: "Code", defaultHeight: 6 },

	WEB: { name: "Web", icon: "Web", defaultHeight: 8 },

	TWITTER: { name: "Twitter", icon: "Twitter", defaultHeight: 8 },

	GIPHY: { name: "Giphy", icon: "Giphy", defaultHeight: 8 },

	AIRTABLE: { name: "Airtable", icon: "Airtable", defaultHeight: 8 },

	FIGMA: { name: "Figma", icon: "Figma", defaultHeight: 8 },

	DALLE: { name: "Dalle", icon: "Dalle", defaultHeight: 8 },

	FRAMER: { name: "Framer", icon: "Framer", defaultHeight: 8 },

	MIRO: { name: "Miro", icon: "Miro", defaultHeight: 8 },

	LOOKER: { name: "Looker", icon: "Looker", defaultHeight: 8 },

	COLOR: { name: "Color", icon: "PaintBucket", defaultHeight: 8 },

	BACKGROUND: { name: "Background", icon: "Background", defaultHeight: 8 },
};

export const alignmentX = {
	LEFT: "LEFT",
	RIGHT: "RIGHT",
	CENTER: "CENTER",
};

export const alignmentY = {
	TOP: "TOP",
	BOTTOM: "BOTTOM",
	MIDDLE: "MIDDLE",
	DISTRIBUTE: "DISTRIBUTE",
};

export const textStyles = {
	ULTRA: "ULTRA",
	H0: "H0", // Display 2
	H1: "H1", // Display 1
	H2: "H2", // Title 1
	H3: "H3", // Title 2
	DEFAULT: "DEFAULT", // Body 1
	P: "P", // Body 2
	H4: "H4", // Subhead
	CAPTION: "CAPTION", // Caption
	UL: "UL",
	OL: "OL",
	LI: "LI",
	BOLD: "BOLD",
	MENTION: "MENTION",
	SPAN: "SPAN",
	LINEBREAK: "LINEBREAK",
	ITALIC: "ITALIC",
	BOLD_ITALIC: "BOLD_ITALIC",
	UNDERLINED: "UNDERLINED",
	BOLD_ITALIC_UNDERLINED: "BOLD_ITALIC_UNDERLINED",
	STRIKETHROUGH: "STRIKETHROUGH",
	LINK: "LINK",
	CODE: "CODE",
	BLOCKQUOTE: "BLOCKQUOTE",
	PRE: "PRE",
};

export const textStyleNames = {
	H0: "Display", // Display 2
	H1: "Title", // Display 1
	H2: "Heading", // Title 1
	//H3: "Title 2", // Title 2
	//DEFAULT: "Body 1", // Body 1
	P: "Body", // Body 2
	H4: "Subhead", // Subhead (same size as small body)
	CAPTION: "Caption", // Caption
};

export const textStylesList = [
	{
		id: "H0",
		name: "Display",
		labelStyle: {},
	},
	
];

export const lineLength = {
	S: "40ch",
	M: "60ch",
	L: "100ch",
};

export const tableTileType = {
	TH: "TH",
	TD: "TD",
};

export const panelNames = {
	...TILES,
	ADD_PAGE: { name: "Choose Layout", icon: "Add" },
	ADD_TILE: { name: "Add Tile", icon: "Add" },
	ANNOTATIONS: { name: "Annotations", icon: "Annotation" },
	RECORD: { name: "Record", icon: "Record" },
	THEME: { name: "Theme", icon: "Theme" },
	PAGE: { name: "Page", icon: "Preferences" },
};

import { Themes, NO_THEME } from "./Themes";
import { TextStyles } from "../tiles/Text";
import { uniqueId } from "lodash";

export const tileTypes = {
	TOME: "TOME",
	PAGE: "PAGE",
	FLEX: "FLEX",
	TEXT: "TEXT",
	IMAGE: "IMAGE",
};

export const containerSize = {
	FILL: "fill",
	HUG: "hug",
	CUSTOM: "custom",
};

export const contentSize = {
	FILL: "fill",
	FIT: "fit",
	CUSTOM: "custom",
};

export const mediaContentSizeOptions = [
	{
		id: "fit",
		label: "Fit",
		value: "fit",
	},
	{
		id: "fill",
		label: "Fill",
		value: "fill",
	},
	{
		id: "custom",
		label: "Custom",
		value: "custom",
	},
];

export const containerWidthOptions = [
	{
		id: "fill",
		label: "Fill",
		value: "fill",
		icon: "ArrowLeftRightOut",
	},
	{
		id: "hug",
		label: "Fit",
		value: "hug",
		icon: "ChevronLeftRightIn",
	},
	{
		id: "custom",
		label: "Fixed",
		value: "custom",
		icon: "FixedWidth",
	},
];

export const containerHeightOptions = [
	{
		id: "fill",
		label: "Fill",
		value: "fill",
		icon: "ArrowUpDown",
	},
	{
		id: "hug",
		label: "hug",
		value: "hug",
		icon: "ChevronUpDownIn",
	},
	{
		id: "custom",
		label: "Fixed",
		value: "custom",
		icon: "FixedHeight",
	},
];

export const contentLayout = {
	AUTO: "auto", // flexbox, row or column
	STACKED: "stacked", // grid instead of z-index stacking
	ABSOLUTE: "absolute", // top,left positioning
};

export const contentDirection = {
	VERTICAL: "vertical",
	HORIZONTAL: "horizontal",
	HORIZONTAL_WRAP: "horizontal-wrap",
};

export const contentDirectionOptions = [
	{
		id: "vertical",
		label: "Vertical",
		value: "vertical",
		icon: "ArrowDown",
	},
	{
		id: "horizontal",
		label: "Horizontal",
		value: "horizontal",
		icon: "ArrowRight",
	},
	{
		id: "horizontal-wrap",
		label: "Wrap",
		value: "horizontal-wrap",
		icon: "Return",
	},
];

export const contentDistribute = {
	NONE: "none",
	SPACE_BETWEEN: "space-between",
	SPACE_AROUND: "space-around",
	SPACE_EVENLY: "space-evenly",
};

export const contentAlign = {
	START: "start",
	CENTER: "center",
	END: "end",
};

export const contentAlignXOptions = [
	{
		id: "start",
		label: "Start",
		value: "start",
		icon: "AlignXStart",
	},
	{
		id: "center",
		label: "Center",
		value: "center",
		icon: "AlignXCenter",
	},
	{
		id: "end",
		label: "End",
		value: "end",
		icon: "AlignXEnd",
	},
];

export const contentAlignYOptions = [
	{
		id: "top",
		label: "Top",
		value: "start",
		icon: "AlignYStart",
	},
	{
		id: "middle",
		label: "Middle",
		value: "center",
		icon: "AlignYCenter",
	},
	{
		id: "bottom",
		label: "Bottom",
		value: "end",
		icon: "AlignYEnd",
	},
];

export const backgrounds = {
	NONE: "none",
	COLOR: "color",
	GRADIENT: "gradient",
	IMAGE: "image",
	SHADER: "shader",
};

export const backgroundOptions = [
	{
		id: "none",
		label: "None",
		value: "none",
		icon: "",
	},
	{
		id: "color",
		label: "Color",
		value: "color",
		icon: "",
	},
];

export const contentPaddingPresets = [
	{
		id: "padding-small",
		label: "Small",
		value: "6",
		sizeLabel: "S",
	},
	{
		id: "padding-medium",
		label: "Medium",
		value: "12",
		sizeLabel: "M",
	},
	{
		id: "padding-large",
		label: "Large",
		value: "24",
		sizeLabel: "L",
	},
];

export const contentGapsPresets = [
	{
		id: "gap-small",
		label: "Small",
		value: "6",
		sizeLabel: "S",
	},
	{
		id: "gap-medium",
		label: "Medium",
		value: "12",
		sizeLabel: "M",
	},
	{
		id: "gap-large",
		label: "Large",
		value: "24",
		sizeLabel: "L",
	},
];

export const contentBorderRadiusPresets = [
	{
		id: "border-radius-small",
		label: "Small",
		value: "6",
		sizeLabel: "S",
	},
	{
		id: "border-radius-medium",
		label: "Medium",
		value: "12",
		sizeLabel: "M",
	},
	{
		id: "border-radius-large",
		label: "Large",
		value: "24",
		sizeLabel: "L",
	},
];

export const pageBackground = {
	OFF: "off",
	EDITOR: "editor",
	EDITOR_AND_PRESENT: "editor_and_present",
};

export const pageBackgroundOptions = [
	{
		id: "off",
		label: "Off",
		value: pageBackground.OFF,
		icon: "",
	},
	{
		id: "editor",
		label: "Editor",
		value: pageBackground.EDITOR,
		icon: "",
	},
	{
		id: "editor_and_present",
		label: "Editor and Present mode",
		value: pageBackground.EDITOR_AND_PRESENT,
		icon: "",
	},
];

export const makeTomeData = title => {
	const data = {
		type: tileTypes.TOME,
		id: uniqueId("tome_tile_"),
		title: title,
		editor: {
			isMobileView: false,
			isPlayMode: false,
			isFullscreen: false,
			showPropertyPanel: false,
			showColorPanel: false,
			debug: {},
			background: pageBackground.EDITOR,
		},
		tiles: [],
	};
	return data;
};

export const makePageData = parent => {
	const data = {
		type: tileTypes.PAGE,
		id: uniqueId("page_tile_"),
		tiles: [],
		parentId: parent ? parent.id : null,
		layout: {
			aspectRatio: {
				label: "16:9",
				value: 16 / 9,
			},

			contentSize: {
				width: 960,
				height: 540,
			},

			mobileSize: {
				width: 393,
				height: 852,
			},

			margin: {
				x: 128,
				y: 96,
			},

			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},

			scrolling: true,
			centered: true,
			autoZoom: true,
			scaleContent: false,
			contentScale: 1,
			borderRadius: 10,
		},
		background: {
			type: backgrounds.NONE,
			value: "#FFFFFF",
			opacity: 1,
		},
		theme: Themes.Dark,
	};
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeFlexData = parent => {
	const data = {
		type: tileTypes.FLEX,
		id: uniqueId("flex_tile_"),
		parentId: parent ? parent.id : null,
		tiles: [],
		layout: {
			type: contentLayout.AUTO, // "auto", "overlay", "canvas"
			direction: contentDirection.VERTICAL, // "vertical", "horizontal"
			distribute: contentDistribute.NONE,
			alignX: contentAlign.START,
			alignY: contentAlign.START,
			width: {
				type: containerSize.FILL, // "fill", "hug", "px"
				value: 0,
			},
			height: {
				type: containerSize.FILL, // "fill", "hug", "px"
				value: 0,
			},
			gap: 12,
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
			borderRadius: 0,
		},
		background: {
			type: backgrounds.NONE,
			value: "#FFFFFF",
			opacity: 1,
		},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeFlexRootData = parent => {
	const flexRoot = makeFlexData(parent);
	flexRoot.layout.padding.top = 12;
	flexRoot.layout.padding.bottom = 12;
	flexRoot.layout.padding.left = 12;
	flexRoot.layout.padding.right = 12;
	flexRoot.layout.borderRadius = 0;
	return flexRoot;
};

export const makeTextData = parent => {
	const data = {
		type: tileTypes.TEXT,
		id: uniqueId("text_tile_"),
		parentId: parent ? parent.id : null,
		content: {
			text: "Untitled",
			textStyle: TextStyles.Body2,
			fontWeight: undefined,
		},
		layout: {
			type: contentLayout.AUTO, // "auto", "overlay", "canvas"
			direction: contentDirection.VERTICAL, // "vertical", "horizontal"
			distribute: contentDistribute.NONE,
			alignX: contentAlign.START,
			alignY: contentAlign.START,
			width: {
				type: containerSize.FILL, // "fill", "hug", "px"
				value: 0,
			},
			height: {
				type: containerSize.HUG, // "fill", "hug", "px"
				value: 0,
			},
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
		},
		background: {
			type: backgrounds.NONE,
			value: "#FFFFFF",
			opacity: 1,
		},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeImageData = parent => {
	const data = {
		type: tileTypes.IMAGE,
		id: uniqueId("image_tile_"),
		parentId: parent ? parent.id : null,
		content: {
			src: undefined,
			size: contentSize.FILL, // "fit", "fill", "custom",
		},
		layout: {
			type: contentLayout.AUTO, // "auto", "overlay", "canvas"
			width: {
				type: containerSize.FILL, // "fill", "hug", "px"
				value: 0,
			},
			height: {
				type: containerSize.FILL, // "fill", "hug", "px"
				value: 0,
			},
			aspectRatio: undefined,
			constrainProportions: false,
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
			borderRadius: 0,
		},
		background: {
			type: backgrounds.NONE,
			value: "#FFFFFF",
			opacity: 1,
		},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

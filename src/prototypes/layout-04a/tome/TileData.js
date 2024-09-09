import { Themes, NO_THEME } from "../ds/Themes";
import { TextStyles } from "../tiles/Text";
import { uniqueId } from "lodash";

export const makeTomeData = title => {
	const data = {
		type: "TOME",
		id: uniqueId("tome_tile_"),
		title: title,
		editor: {
			isMobileView: false,
			debug: {
				showTileBackgrounds: false,
				showTileHover: true,
				showReorderDropZones: false,
			},
		},
		tiles: [],
	};
	return data;
};

export const makePageData = parent => {
	const data = {
		type: "PAGE",
		id: uniqueId("page_tile_"),
		tiles: [],
		parentId: parent.id,
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
				y: 78,
			},
			padding: {
				x: 0,
				y: 0,
			},
			centered: true,
			autoZoom: true,
			scrolling: true,
			minSize: true,
			aspectRatioLock: false,
			aspectRatioScale: false,
		},
		theme: Themes.TomeDark,
	};
	if (parent && parent.tiles.length === 1) parent.root = data;
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeFlexData = parent => {
	const data = {
		type: "FLEX",
		id: uniqueId("flex_tile_"),
		parentId: parent ? parent.id : null,
		tiles: [],
		layout: {
			type: "auto", // "auto", "overlay", "canvas"
			direction: "vertical", // "vertical", "horizontal"
			// justifyContent: undefined, // "start", "center", "end", "space-between", "space-evenly"
			// alignItems: undefined, // "start", "center", "end"
			width: "fill", // "fill", "hug", "%"
			height: "fill", // "fill", "hug", "%"
			gap: "12px",
			padding: {
				x: 12,
				y: 12,
			},
		},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeTextData = parent => {
	const data = {
		type: "TEXT",
		id: uniqueId("text_tile_"),
		parentId: parent.id,
		content: {
			text: "Combinatorial explosion",
			textStyle: TextStyles.Body2,
			fontWeight: undefined,
		},
		layout: {
			width: "hug",
			height: "hug",
		},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeImageData = parent => {
	const data = {
		type: "IMAGE",
		id: uniqueId("image_tile_"),
		parentId: parent.id,
		content: {
			src: "/images/mac-wallpaper-pro-black.jpg",
			size: undefined, // "fit", "fill", "custom",
		},
		layout: {
			width: undefined, // "fill",
			height: undefined, // "fill",
			aspectRatio: undefined,
			padding: {
				x: undefined,
				y: undefined,
			},
		},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

export const makeIconData = parent => {
	const data = {
		type: "ICON",
		id: uniqueId("icon_tile_"),
		parentId: parent.id,
		content: {
			name: "GrinningOutline",
			size: 64,
			color: "var(--t9)",
		},
		layout: {},
		theme: NO_THEME(),
	};
	if (parent) parent.tiles.push(data);
	return data;
};

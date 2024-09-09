import { uniqueId } from "lodash";
import { motionValue } from "framer-motion";

import { GRID_SIZE, PLACEHOLDER_STRING, linecapEnd, linecapStart } from "./constants";

import { textStyles } from "../TileConstants";
import { capOptions, lineSizes, alignX, alignY } from "./constants";

export const createShapeData = (layerType, theme) => {
	const info = LayerMap[layerType];

	let textStyle = info.layerType === "TEXT" ? textStyles.H2 : textStyles.P;
	let fillColor = theme.drawing.shape.fill.color;
	let lineColor = theme.drawing.shape.line.color;
	let lineSize = theme.drawing.shape.line.size;
	let lineRadius = theme.drawing.shape.line.radius;
	let textColor = theme.drawing.shape.text.color;
	let textSize = theme.typography.fontSize[textStyle];
	let textWeight = theme.typography.fontWeight[textStyle];

	if (layerType === "LINE") {
		lineColor = theme.drawing.line.color;
		lineSize = theme.drawing.line.size;
	}

	if (layerType === "TEXT") {
		textColor = theme.drawing.text.color;
	}

	if (layerType === "PROGRESS_RING") {
		lineColor = theme.drawing.line.color;
		lineSize = info.line.size;
		textSize = info.text.size;
		textWeight = info.text.weight;
	}

	if (layerType === "PICTOGRAM") {
		fillColor = theme.colors.t9;
	}

	const layer = {
		id: uniqueId("layer"),
		layerType: info.layerType,
		type: info.type,
		params: {
			x: -info.width / 2,
			y: -info.height / 2,
			width: info.width,
			height: info.height,
			rotation: 0,
			fill: {
				color: fillColor,
			},
			line: {
				color: lineColor,
				size: lineSize,
				radius: lineRadius,
				x1: info.line.x1,
				y1: info.line.y1,
				x2: info.line.x2,
				y2: info.line.y2,
				capStart: info.line.capStart,
				capEnd: info.line.capEnd,
				progress: info.line.progress,
			},
			text: {
				width: "auto",
				content: info.text.content,
				color: textColor,
				size: textSize,
				weight: textWeight,
				alignment: {
					x: info.text.alignment.x,
					y: info.text.alignment.y,
				},
				showPlaceholder: info.text.showPlaceholder,
				opacity: info.text.opacity,
			},
			margins: {
				x: {
					min: info.margins.x.min,
					max: info.margins.x.max,
				},
				y: {
					min: info.margins.y.min,
					max: info.margins.y.max,
				},
			},
			meta: {
				itemSize: info.meta.itemSize,
				itemName: info.meta.itemName,
				itemTotal: info.meta.itemTotal,
				itemFill: info.meta.itemFill,
				itemSpacing: info.meta.itemSpacing,
			},
			media: {
				src: "",
				aspectRatio: 0,
				mediaWidth: 0,
				mediaHeight: 0,
			}
		},
	};
	layer.motion = {
		x: motionValue(layer.params.x),
		y: motionValue(layer.params.y),
		w: motionValue(layer.params.width),
		h: motionValue(layer.params.height),
		r: motionValue(layer.params.rotation),
		fill: {
			color: motionValue(layer.params.fill.color),
		},
		line: {
			color: motionValue(layer.params.line.color),
			size: motionValue(layer.params.line.size),
			radius: motionValue(layer.params.line.radius),
			x1: motionValue(layer.params.line.x1),
			y1: motionValue(layer.params.line.y1),
			x2: motionValue(layer.params.line.x2),
			y2: motionValue(layer.params.line.y2),
			capStart: motionValue(layer.params.line.capStart),
			capEnd: motionValue(layer.params.line.capEnd),
			progress: motionValue(layer.params.line.progress),
		},
		text: {
			width: motionValue(layer.params.text.width),
			content: motionValue(layer.params.text.content),
			color: motionValue(layer.params.text.color),
			size: motionValue(layer.params.text.size),
			weight: motionValue(layer.params.text.weight),
			alignment: {
				x: motionValue(layer.params.text.alignment.x),
				y: motionValue(layer.params.text.alignment.y),
			},
			showPlaceholder: motionValue(layer.params.text.showPlaceholder),
			opacity: motionValue(layer.params.text.opacity),
		},
		margins: {
			x: {
				min: motionValue(layer.params.margins.x.min),
				max: motionValue(layer.params.margins.x.max),
			},
			y: {
				min: motionValue(layer.params.margins.y.min),
				max: motionValue(layer.params.margins.y.max),
			},
		},
		meta: {
			itemSize: motionValue(layer.params.meta.itemSize),
			itemName: motionValue(layer.params.meta.itemName),
			itemTotal: motionValue(layer.params.meta.itemTotal),
			itemFill: motionValue(layer.params.meta.itemFill),
			itemSpacing: motionValue(layer.params.meta.itemSpacing),
		},
	};

	return layer;
};

const defaults = {
	width: 8 * GRID_SIZE,
	height: 8 * GRID_SIZE,
	rotation: 0,
	fill: {
		color: "transparent",
	},
	line: {
		color: "#545454",
		size: 0,
		radius: 4,
		x1: 0,
		y1: 0,
		x2: 8 * GRID_SIZE,
		y2: 0,
		capStart: linecapStart[2].id, // round
		capEnd: linecapEnd[1].id, // round
		progress: 0,
	},
	text: {
		content: "",
		color: "#ffffff",
		size: 20,
		weight: 400,
		alignment: {
			x: alignX[1].id,
			y: alignY[1].id,
		},
		showPlaceholder: 1,
		opacity: 1,
	},
	margins: {
		x: {
			min: "16%",
			max: 40,
		},
		y: {
			min: 0,
			max: 0,
		},
	},
	meta: {
		itemSize: 72,
		itemName: "PersonMasculine",
		itemTotal: 4,
		itemFill: 3,
		itemSpacing: 8,
	},
	icon: {
		width: 48,
		height: 48,
		borderRadius: 4,
		xOffset: 0,
		yOffset: 0,
		text: PLACEHOLDER_STRING,
	},
};

export const TEXT = {
	layerType: "TEXT",
	type: "TEXT",
	name: "Text",
	width: 62,
	height: 39,
	rotation: 0,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		autoWidth: true,
		content: "",
		color: defaults.text.color,
		size: 32,
		weight: 400,
		alignment: {
			x: alignX[0].id,
			y: alignY[0].id,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: defaults.icon.width,
		height: defaults.icon.height,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
		fontSize: 21,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const IMAGE = {
	layerType: "IMAGE",
	type: "IMAGE",
	name: "Image",
	width: 9 * GRID_SIZE,
	height: 4 * GRID_SIZE,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: defaults.icon.width,
		height: defaults.icon.height,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const LINE = {
	layerType: "LINE",
	type: "LINE",
	name: "Line",
	width: defaults.width,
	height: 0,
	rotation: 0,
	line: {
		color: "#545454",
		size: 2,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: defaults.width,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		style: defaults.text.style,
		size: defaults.text.size,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 40,
		height: defaults.icon.height,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
	},
	meta: defaults.meta,
};

export const ARROW_LINE = {
	layerType: "LINE",
	type: "ARROW_LINE",
	name: "Arrow Line",
	width: defaults.width,
	height: 0,
	rotation: 0,
	line: {
		color: "#545454",
		size: 2,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: defaults.width,
		y2: 0,
		capStart: linecapStart[2].id, // round
		capEnd: linecapEnd[3].id, // arrow
		progress: defaults.line.progress,
	},
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		style: defaults.text.style,
		size: defaults.text.size,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 40,
		height: defaults.icon.height,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
		capStart: linecapStart[2].id, // round
		capEnd: linecapEnd[3].id, // arrow
	},
	meta: defaults.meta,
};

export const RECTANGLE = {
	layerType: "SHAPE",
	type: "RECTANGLE",
	name: "Rectangle",
	width: defaults.width,
	height: defaults.height,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 47,
		height: 47,
		borderRadius: 0,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const ELLIPSE = {
	layerType: "SHAPE",
	type: "ELLIPSE",
	name: "Ellipse",
	width: defaults.width,
	height: defaults.height,
	fill: {
		color: defaults.fill.color,
	},

	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 46,
		height: 46,
		borderRadius: 0,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const ROUNDED_RECT = {
	layerType: "SHAPE",
	type: "ROUNDED_RECT",
	name: "Rounded Rectangle",
	width: defaults.width,
	height: defaults.height,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 42,
		height: 42,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const DIAMOND = {
	layerType: "SHAPE",
	type: "DIAMOND",
	name: "Diamond",
	width: 9.5 * GRID_SIZE,
	height: 9.5 * GRID_SIZE,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 54,
		height: 54,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const TRIANGLE = {
	layerType: "SHAPE",
	type: "TRIANGLE",
	name: "Triangle",
	width: 10 * GRID_SIZE,
	height: 8 * GRID_SIZE,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: alignY[2].id,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: "16%",
			max: 10,
		},
	},
	icon: {
		width: 58,
		height: 58 * (8 / 10),
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: -1,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const PENTAGON = {
	layerType: "SHAPE",
	type: "PENTAGON",
	name: "PENTAGON",
	width: 8 * GRID_SIZE,
	height: 8 * GRID_SIZE,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 54,
		height: 54,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const HEXAGON = {
	layerType: "SHAPE",
	type: "HEXAGON",
	name: "Hexagon",
	width: 8 * GRID_SIZE,
	height: 8 * GRID_SIZE,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: 50,
		height: 50,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: defaults.meta,
};

export const PROGRESS_RING = {
	layerType: "PROGRESS_RING",
	type: "PROGRESS_RING",
	name: "Progress Ring",
	width: 16 * GRID_SIZE,
	height: 16 * GRID_SIZE,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: 60,
		weight: 400,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: defaults.icon.width,
		height: defaults.icon.height,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: 8,
		radius: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: 0.75,
	},
	meta: defaults.meta,
};

export const PICTOGRAM = {
	layerType: "PICTOGRAM",
	type: "PICTOGRAM",
	name: "Pictogram",
	width: 392,
	height: 68,
	fill: {
		color: defaults.fill.color,
	},
	text: {
		content: defaults.text.content,
		color: defaults.text.color,
		size: defaults.text.size,
		weight: defaults.text.weight,
		alignment: {
			x: defaults.text.alignment.x,
			y: defaults.text.alignment.y,
		},
		showPlaceholder: defaults.text.showPlaceholder,
		opacity: 1,
	},
	margins: {
		x: {
			min: defaults.margins.x.min,
			max: defaults.margins.x.max,
		},
		y: {
			min: defaults.margins.y.min,
			max: defaults.margins.y.max,
		},
	},
	icon: {
		width: defaults.icon.width,
		height: defaults.icon.height,
		borderRadius: defaults.icon.borderRadius,
		xOffset: defaults.icon.xOffset,
		yOffset: defaults.icon.yOffset,
	},
	line: {
		color: defaults.line.color,
		size: defaults.line.size,
		radius: defaults.line.radius,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		capStart: defaults.line.capStart,
		capEnd: defaults.line.capEnd,
		progress: defaults.line.progress,
	},
	meta: {
		itemSize: 72,
		itemName: "Star",
		itemTotal: 5,
		itemFill: 3,
		itemSpacing: 8,
	},
};

export const LayerMap = {
	TEXT: TEXT,
	IMAGE: IMAGE,
	LINE: LINE,
	ARROW_LINE: ARROW_LINE,
	ELLIPSE: ELLIPSE,
	RECTANGLE: RECTANGLE,
	ROUNDED_RECT: ROUNDED_RECT,
	TRIANGLE: TRIANGLE,
	DIAMOND: DIAMOND,
	PENTAGON: PENTAGON,
	HEXAGON: HEXAGON,
	PROGRESS_RING: PROGRESS_RING,
	PICTOGRAM: PICTOGRAM,
};

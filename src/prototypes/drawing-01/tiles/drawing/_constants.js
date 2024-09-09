import { colorType } from "../../panel/controls/Color";

export const BlockType = {
	ELLIPSE: "ELLIPSE",
	RECTANGLE: "RECTANGLE",
	TEXT: "TEXT",
	LINE: "LINE",

	//POLYGON: "POLYGON",
	//IMAGE: "IMAGE",
};

export const drawingShapes = {
	ELLIPSE: {
		type: "ELLIPSE",
		name: "Ellipse",
		icon: "Ellipse",
		iconSize: 52,
		canvasWidth: 128,
		canvasHeight: 128,
		buttonHeight: 64,
	},
	RECTANGLE: {
		type: "RECTANGLE",
		name: "Rectangle",
		icon: "Rectangle",
		iconSize: 48,
		canvasWidth: 112,
		canvasHeight: 112,
		buttonHeight: 64,
	},
	TEXT: {
		type: "TEXT",
		name: "Text",
		icon: "Text",
		iconSize: 56,
		canvasWidth: 96,
		canvasHeight: 96,
		buttonHeight: 52,
	},
	LINE: {
		type: "LINE",
		name: "Line",
		icon: "Line",
		iconSize: 56,
		canvasWidth: 96,
		canvasHeight: 96,
		buttonHeight: 52,
	},
};


export const fillColors = [
	// {
	// 	label: "White",
	// 	hex: "#FFFFFF",
	// 	type: colorType.FILL,
	// },

	{
		label: "Gray",
		hex: "#545454",
		type: colorType.FILL,
	},
	{
		label: "Black",
		hex: "#1F1F1F",
		type: colorType.FILL,
	},


	{
		label: "",
		hex: "#F839F6",
		type: colorType.FILL,
	},
	{
		label: "",
		hex: "#A77EFF",
		type: colorType.FILL,
	},
	{
		label: "",
		hex: "#339DFF",
		type: colorType.FILL,
	},
	{
		label: "",
		hex: "#A3CEB2",
		type: colorType.FILL,
	},
	{
		label: "",
		hex: "#FFBA05",
		type: colorType.FILL,
	},

	



	{
		label: "",
		hex: "#FFFFFF",
		type: colorType.PICKER,
	},
	{
		label: "",
		hex: "transparent",
		type: colorType.CLEAR,
	},
];


/*
export const fillColors = [
	{
		label: "White",
		hex: "#FFFFFF",
		type: colorType.FILL,
	},
	{
		label: "Gray",
		hex: "#545454",
		type: colorType.FILL,
	},
	{
		label: "Black",
		hex: "#000000",
		type: colorType.FILL,
	},

	{
		label: "Red",
		hex: "#E35C5C",
		type: colorType.FILL,
	},
	{
		label: "Mint",
		hex: "#27AE60",
		type: colorType.FILL,
	},
	{
		label: "Blue",
		hex: "#2D9CDB",
		type: colorType.FILL,
	},
	{
		label: "Yellow",
		hex: "#E6C640",
		type: colorType.FILL,
	},
	{
		label: "Custom",
		hex: "#FFFFFF",
		type: colorType.PICKER,
	},
	{
		label: "Clear",
		hex: "transparent",
		type: colorType.CLEAR,
	},
];
*/

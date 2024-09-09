import { colorType } from "../../panel/controls/Color";

export const GRID_SIZE = 16;
export const ZOOM_RANGES = { min: 0.25, max: 4 };
export const DRAG_SCALE_AMOUNT = 0.025;
export const TEXT_ID = "_editable_textfield";
export const PLACEHOLDER_STRING = "Text";

export const lineSizes = [
	{
		id: "HAIRLINE",
		label: "Hairline",
		size: 1,
		icon: "LineSizeHairline",
	},
	{
		id: "THIN",
		label: "Thin",
		size: 2,
		icon: "LineSizeThin",
	},
	{
		id: "THICK",
		label: "Thick",
		size: 8,
		icon: "LineSizeThick",
	},
];

export const progressRingSizes = [
	{
		id: "HAIRLINE",
		label: "Hairline",
		size: 4,
		icon: "LineSizeHairline",
	},
	{
		id: "THIN",
		label: "Thin",
		size: 8,
		icon: "LineSizeThin",
	},
	{
		id: "THICK",
		label: "Thick",
		size: 16,
		icon: "LineSizeThick",
	},
];

export const progressRingLinecaps = [
	{
		id: "ROUND_START",
		label: "Round",
		icon: "LineCapStartRound",
	},
	{
		id: "FLAT_START",
		label: "Flat",
		icon: "LineCapStartFlat",
	},
];

export const linecapStart = [
	{
		id: "ARROW_START",
		label: "Arrow",
		icon: "LineCapStartArrow",
	},
	{
		id: "CIRCLE_START",
		label: "Dot",
		icon: "LineCapStartCircle",
	},
	{
		id: "ROUND_START",
		label: "Round",
		icon: "LineCapStartRound",
	},
	{
		id: "FLAT_START",
		label: "Flat",
		icon: "LineCapStartFlat",
	},
];

export const linecapEnd = [
	{
		id: "FLAT_END",
		label: "Flat",
		icon: "LineCapEndFlat",
	},
	{
		id: "ROUND_END",
		label: "Round",
		icon: "LineCapEndRound",
	},
	{
		id: "CIRCLE_END",
		label: "Dot",
		icon: "LineCapEndCircle",
	},
	{
		id: "ARROW_END",
		label: "Arrow",
		icon: "LineCapEndArrow",
	},
];

export const alignX = [
	{
		id: "left",
		label: "Left",
		icon: "AlignLeft",
	},
	{
		id: "center",
		label: "Center",
		icon: "AlignCenter",
	},
	{
		id: "right",
		label: "Right",
		icon: "AlignRight",
	},
];

export const alignY = [
	{
		id: "flex-start",
		label: "Top",
		icon: "AlignTop",
	},
	{
		id: "center",
		label: "Middle",
		icon: "AlignMiddle",
	},
	{
		id: "flex-end",
		label: "Bottom",
		icon: "AlignBottom",
	},
];

export const Red = {
	label: "Red",
	hex: "#F44737",
	type: colorType.FILL,
};
export const Yellow = {
	label: "Yellow",
	hex: "#FDDA4D",
	type: colorType.FILL,
};
export const Mint = {
	label: "Mint",
	hex: "#A3CEB2",
	type: colorType.FILL,
};
export const Blue = {
	label: "Blue",
	hex: "#339DFF",
	type: colorType.FILL,
};
export const Purple = {
	label: "Purple",
	hex: "#A77EFF",
	type: colorType.FILL,
};
export const Sand = {
	label: "Sand",
	hex: "#C6864B",
	type: colorType.FILL,
};
export const White = {
	label: "White",
	hex: "#FFFFFF",
	type: colorType.FILL,
};
export const Black = {
	label: "Black",
	hex: "#000000",
	type: colorType.FILL,
};
export const Contrast1 = {
	label: "Contrast",
	hex: "#FFFFFF",
	type: colorType.CONTRAST1,
};
export const ChooseColor = {
	label: "Choose…",
	hex: "",
	type: colorType.PICKER,
};
export const RemoveColor = {
	label: "Reset color",
	hex: "reset",
	type: colorType.REMOVE,
};
export const Transparent = {
	label: "Transparent",
	hex: "transparent",
	type: colorType.TRANSPARENT,
};

export const shapeFillColors = [Red, Yellow, Mint, Blue, Purple, Sand, White, Black, ChooseColor, RemoveColor];
export const shapeLineColors = [Red, Yellow, Mint, Blue, Purple, Sand, White, Black, ChooseColor, RemoveColor];
export const lineColors = [Red, Yellow, Mint, Blue, Purple, Sand, White, Black, ChooseColor];
export const textColors = [Red, Yellow, Mint, Blue, Purple, Sand, White, Black, ChooseColor];

export const cursors = {
	nwRotate: `url("data:image/svg+xml,%3Csvg height='32' width='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow' y='-40%25' x='-40%25' width='180px' height='180px' color-interpolation-filters='sRGB'%3E%3CfeDropShadow dx='0' dy='0' stdDeviation='1.2' flood-opacity='.3'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' filter='url(%23shadow)'%3E%3Cpath d='M22.4789 9.45728L25.9935 12.9942L22.4789 16.5283V14.1032C18.126 14.1502 14.6071 17.6737 14.5675 22.0283H17.05L13.513 25.543L9.97889 22.0283H12.5674C12.6071 16.5691 17.0214 12.1503 22.4789 12.1031L22.4789 9.45728Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M21.4789 7.03223L27.4035 12.9945L21.4789 18.9521V15.1868C18.4798 15.6549 16.1113 18.0273 15.649 21.0284H19.475L13.5128 26.953L7.55519 21.0284H11.6189C12.1243 15.8155 16.2679 11.6677 21.4789 11.1559L21.4789 7.03223ZM22.4789 12.1031C17.0214 12.1503 12.6071 16.5691 12.5674 22.0284H9.97889L13.513 25.543L17.05 22.0284H14.5675C14.5705 21.6896 14.5947 21.3558 14.6386 21.0284C15.1157 17.4741 17.9266 14.6592 21.4789 14.1761C21.8063 14.1316 22.1401 14.1069 22.4789 14.1032V16.5284L25.9935 12.9942L22.4789 9.45729L22.4789 12.1031Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 16 16, default`,

	neRotate: `url("data:image/svg+xml,%3Csvg height='32' width='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow' y='-40%25' x='-40%25' width='180px' height='180px' color-interpolation-filters='sRGB'%3E%3CfeDropShadow dx='0' dy='0' stdDeviation='1.2' flood-opacity='.3'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' filter='url(%23shadow)'%3E%3Cpath d='M23.4595 20.9599L19.9225 24.4745L16.3884 20.9599H18.8135C18.7665 16.607 15.243 13.0881 10.8884 13.0485V15.531L7.37374 11.994L10.8884 8.45992V11.0484C16.3476 11.0881 20.7664 15.5024 20.8136 20.9599H23.4595Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M25.8845 19.9599L19.9222 25.8845L13.9646 19.9599H17.7299C17.2618 16.9608 14.8894 14.5923 11.8883 14.13V17.956L5.96375 11.9938L11.8883 6.03622V10.0999C17.1012 10.6053 21.249 14.7489 21.7608 19.9599H25.8845ZM20.8136 20.9599C20.7664 15.5024 16.3476 11.0881 10.8884 11.0484V8.45992L7.37374 11.994L10.8884 15.531V13.0485C11.2272 13.0515 11.5609 13.0757 11.8883 13.1196C15.4426 13.5967 18.2575 16.4076 18.7406 19.9599C18.7851 20.2873 18.8098 20.6211 18.8135 20.9599H16.3884L19.9225 24.4745L23.4595 20.9599H20.8136Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 16 16, default`,

	swRotate: `url("data:image/svg+xml,%3Csvg height='32' width='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow' y='-40%25' x='-40%25' width='180px' height='180px' color-interpolation-filters='sRGB'%3E%3CfeDropShadow dx='0' dy='0' stdDeviation='1.2' flood-opacity='.3'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' filter='url(%23shadow)'%3E%3Cpath d='M8.3888 10.9608L11.9257 7.44622L15.4598 10.9608H13.0347C13.0817 15.3137 16.6052 18.8326 20.9598 18.8722V16.3897L24.4745 19.9267L20.9598 23.4608V20.8723C15.5006 20.8326 11.0818 16.4183 11.0346 10.9608H8.3888Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.96375 11.9608L11.926 6.03622L17.8836 11.9608H14.1183C14.5864 14.9599 16.9588 17.3284 19.9599 17.7907V13.9647L25.8845 19.9269L19.9599 25.8845V21.8208C14.747 21.3154 10.5992 17.1718 10.0874 11.9608H5.96375ZM11.0346 10.9608C11.0818 16.4183 15.5006 20.8326 20.9598 20.8723V23.4608L24.4745 19.9267L20.9598 16.3897V18.8722C20.621 18.8692 20.2873 18.845 19.9599 18.8011C16.4056 18.324 13.5907 15.5131 13.1076 11.9608C13.0631 11.6334 13.0384 11.2996 13.0347 10.9608H15.4598L11.9257 7.44622L8.3888 10.9608H11.0346Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 16 16, default`,

	seRotate: `url("data:image/svg+xml,%3Csvg height='32' width='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow' y='-40%25' x='-40%25' width='180px' height='180px' color-interpolation-filters='sRGB'%3E%3CfeDropShadow dx='0' dy='0' stdDeviation='1.2' flood-opacity='.3'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' filter='url(%23shadow)'%3E%3Cpath d='M10.9246 23.4957L7.41 19.9588L10.9246 16.4247V18.8498C15.2775 18.8028 18.7964 15.2793 18.836 10.9247H16.3535L19.8905 7.41L23.4246 10.9247H20.8361C20.7964 16.3839 16.3821 20.8027 10.9246 20.8499V23.4957Z' fill='black'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.9246 25.9208L6 19.9585L11.9246 14.0009V17.7662C14.9237 17.2981 17.2922 14.9257 17.7545 11.9246H13.9285L19.8907 6L25.8483 11.9246H21.7846C21.2792 17.1375 17.1356 21.2853 11.9246 21.7971V25.9208ZM10.9246 20.8499C16.3821 20.8027 20.7964 16.3839 20.8361 10.9247H23.4246L19.8905 7.41L16.3535 10.9247H18.836C18.833 11.2635 18.8088 11.5972 18.7649 11.9246C18.2878 15.4789 15.4769 18.2938 11.9246 18.7769C11.5972 18.8214 11.2634 18.8461 10.9246 18.8498V16.4247L7.41 19.9588L10.9246 23.4957V20.8499Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 16 16, default`,
};

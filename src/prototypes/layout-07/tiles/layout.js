import {
	contentDirection,
	contentLayout,
	contentDistribute,
	contentAlign,
	containerSize,
	tileTypes,
} from "../tome/TileData";

const minSize = 24;

export const getLayoutCSS = ({ tile, parent }) => {
	let minWidth = "min-content";
	let width = "unset";
	let maxWidth = "unset";

	let minHeight = "min-content";
	let height = "unset";
	let maxHeight = "unset";

	let display = "unset";

	let flexDirection = "unset";
	let flexGrow = 1;
	let flexShrink = 1;

	let flexBasis = "unset";
	let flexWrap = "unset";
	let alignSelf = "unset";

	let justifyContent = "unset";
	let alignItems = "unset";
	let alignContent = "unset";

	let textAlign = "unset";

	//let indexOf = parent.tiles.indexOf(tile);

	if (tile.layout.type === contentLayout.AUTO) {
		// Use flexbox for "auto" layout
		display = "flex";

		// Set content direction
		if (
			tile.layout.direction === contentDirection.HORIZONTAL ||
			tile.layout.direction === contentDirection.HORIZONTAL_WRAP
		)
			flexDirection = "row";

		if (tile.layout.direction === contentDirection.VERTICAL) flexDirection = "column";

		// Set content wrapping
		if (tile.layout.direction === contentDirection.HORIZONTAL_WRAP) flexWrap = "wrap";

		// Set content alignment: x & y mapped to main & cross for each content direction
		if (
			tile.layout.direction === contentDirection.HORIZONTAL ||
			tile.layout.direction === contentDirection.HORIZONTAL_WRAP
		) {
			// Main axis
			if (tile.layout.alignX === contentAlign.START) justifyContent = "start";
			if (tile.layout.alignX === contentAlign.CENTER) justifyContent = "center";
			if (tile.layout.alignX === contentAlign.END) justifyContent = "end";
			// Cross axis
			if (tile.layout.alignY === contentAlign.START) alignItems = "start";
			if (tile.layout.alignY === contentAlign.CENTER) alignItems = "center";
			if (tile.layout.alignY === contentAlign.END) alignItems = "end";

			if (tile.layout.direction === contentDirection.HORIZONTAL_WRAP) {
				if (tile.layout.alignY === contentAlign.START) alignContent = "start";
				if (tile.layout.alignY === contentAlign.CENTER) alignContent = "center";
				if (tile.layout.alignY === contentAlign.END) alignContent = "end";
			}
		}
		if (tile.layout.direction === contentDirection.VERTICAL) {
			// Main axis
			if (tile.layout.alignY === contentAlign.START) justifyContent = "start";
			if (tile.layout.alignY === contentAlign.CENTER) justifyContent = "center";
			if (tile.layout.alignY === contentAlign.END) justifyContent = "end";
			// Cross axis
			if (tile.layout.alignX === contentAlign.START) alignItems = "start";
			if (tile.layout.alignX === contentAlign.CENTER) alignItems = "center";
			if (tile.layout.alignX === contentAlign.END) alignItems = "end";
		}

		// Override any content alignment setting with the distribute setting
		if (tile.layout.distribute === contentDistribute.SPACE_BETWEEN) {
			justifyContent = "space-between";
		}
		if (tile.layout.distribute === contentDistribute.SPACE_AROUND) {
			justifyContent = "space-around";
		}
		if (tile.layout.distribute === contentDistribute.SPACE_EVENLY) {
			justifyContent = "space-evenly";
		}

		/*
        Set container width & height
        */

		// Fill is the default behavior for width & height
		//flexBasis = "100%";
		flexBasis = 0;
		alignSelf = "stretch";

		if (parent && parent.tiles && parent.tiles.length > 1) {
			flexBasis = `calc(${100 / parent.tiles.length + "%"} - ${parent.layout.gap}px)`;
		}

		// Hug depends on the parent container's content direction
		if (tile.layout.width.type === containerSize.HUG) {
			if (
				parent.layout.direction === contentDirection.HORIZONTAL ||
				parent.layout.direction === contentDirection.HORIZONTAL_WRAP
			) {
				flexBasis = 0;
				flexGrow = 0;
				//width = "min-content";
				width = "auto";
			}
			if (parent.layout.direction === contentDirection.VERTICAL) {
				alignSelf = undefined;
				//width = "min-content";
				width = "auto";
			}

			if (tile.type === tileTypes.IMAGE) {
				minWidth = minSize + "px";
			}
		}
		if (tile.layout.height.type === containerSize.HUG) {
			if (
				parent.layout.direction === contentDirection.HORIZONTAL ||
				parent.layout.direction === contentDirection.HORIZONTAL_WRAP
			) {
				alignSelf = undefined;
				height = "min-content";
			}
			if (parent.layout.direction === contentDirection.VERTICAL) {
				flexBasis = "min-content";
				height = "min-content";
				flexGrow = 0;
			}
			if (tile.type === tileTypes.IMAGE) {
				minHeight = minSize + "px";
			}
		}
	}

	if (tile.layout.width.type === containerSize.CUSTOM) {
		//	width = tile.layout.width.value + "px";
		width = `calc(calc(${tile.layout.width.value}px * var(--content-scale)) * var(--page-scale))`;
		maxWidth = width;
		if (
			parent.layout.direction === contentDirection.HORIZONTAL ||
			parent.layout.direction === contentDirection.HORIZONTAL_WRAP
		) {
			flexBasis = width;
			flexGrow = 0;
		}
		if (parent.layout.direction === contentDirection.VERTICAL) {
			alignSelf = undefined;
		}
	}

	if (tile.layout.height.type === containerSize.CUSTOM) {
		//height = tile.layout.height.value + "px";
		height = `calc(calc(${tile.layout.height.value}px * var(--content-scale)) * var(--page-scale))`;
		maxHeight = height;
		if (parent.layout.direction === contentDirection.VERTICAL) {
			flexBasis = height;
			flexGrow = 0;
		}
		if (
			parent.layout.direction === contentDirection.HORIZONTAL ||
			parent.layout.direction === contentDirection.HORIZONTAL_WRAP
		) {
			alignSelf = undefined;
		}
	}

	if (tile.type === tileTypes.TEXT) {
		if (tile.layout.alignX === contentAlign.START) textAlign = "start";
		if (tile.layout.alignX === contentAlign.CENTER) textAlign = "center";
		if (tile.layout.alignX === contentAlign.END) textAlign = "end";

		//minWidth = "min-content";
		//minHeight = "min-content";
	}

	return {
		// layout model
		display: display,
		flexDirection: flexDirection,
		flexWrap: flexWrap,

		// size
		flexGrow: flexGrow,
		flexShrink: flexShrink,
		flexBasis: flexBasis,

		minWidth: minWidth,
		width: width,
		maxWidth: `calc(calc(${960}px * var(--content-scale)) * var(--page-scale))`,

		minHeight: minHeight,
		height: height,
		//maxHeight: maxHeight,

		// content alignment
		justifyContent: justifyContent, // main axis alignment
		alignItems: alignItems, // cross axis alignment
		alignContent: alignContent, // wrapping items

		// self alignment
		alignSelf: alignSelf,

		// text aligment
		textAlign: textAlign,
	};
};

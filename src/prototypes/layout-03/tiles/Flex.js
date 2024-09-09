import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { EditorContext } from "../editor/EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

export const Flex = ({ children, tile }) => {
	const { getTileParentDirection, findTileDepth } = React.useContext(TomeContext);
	const { dragXScaled, dragYScaled, isTileDraggable, isMobileView } = React.useContext(EditorContext);
	const draggable = isTileDraggable(tile);

	const isMobile = isMobileView();

	const depth = findTileDepth(tile);

	let parentDirection = getTileParentDirection(tile);
	if (isMobile && depth < 2) parentDirection = "column";

	// Fill the parent container by default
	let flexBasis = "100%";
	let alignSelf = "stretch";

	let width = undefined;
	let height = undefined;

	if (parentDirection === "row") {
		if (tile.layout.width !== "fill" && tile.layout.width !== "hug") {
			flexBasis = tile.layout.width;
		}

		if (tile.layout.height !== "fill" && tile.layout.height !== "hug") {
			alignSelf = undefined;
			height = tile.layout.height;
		}
	}

	if (parentDirection === "column") {
		if (tile.layout.width !== "fill" && tile.layout.width !== "hug") {
			alignSelf = undefined;
			width = tile.layout.width;
		}
		if (tile.layout.height !== "fill" && tile.layout.height !== "hug") {
			flexBasis = tile.layout.height;
		}
	}

	if (tile.layout.width === "hug") {
		if (parentDirection === "row") {
			flexBasis = "auto";
		}
		if (parentDirection === "column") {
			alignSelf = undefined;
		}
	}
	if (tile.layout.height === "hug") {
		if (parentDirection === "row") {
			alignSelf = undefined;
		}
		if (parentDirection === "column") {
			flexBasis = "auto";
		}
	}

	return (
		<FlexBox
			id={tile.id}
			className="flex-container"
			layout
			layoutId={tile.id}
			transition={transitions.layoutTransition}
			// ref={ref}
			style={{
				x: draggable ? dragXScaled : 0,
				y: draggable ? dragYScaled : 0,
				z: draggable ? 200 : 1,
				
				

				

				"--padding-x": tile.layout.padding.x + "px",
				"--padding-y": tile.layout.padding.y + "px",

				"--gap": tile.layout.gap ? tile.layout.gap + "px" : "inherit",
				"--border-radius": tile.layout.borderRadius ? tile.layout.borderRadius + "px" : "inherit",

				//"--layout-direction": tile.layout.direction,

				//position: draggable ? "relative" : undefined,
				//isolation:  draggable ? "isolate" : undefined,
				//zIndex:  draggable ? 9999 : undefined,

				display: "flex",

				// Container size
				flexBasis: flexBasis,
				flexShrink: 1,
				alignSelf: alignSelf,

				// Content positioning
				flexDirection: isMobile && depth < 2 ? "column" : tile.layout.direction,
				justifyContent: tile.layout.direction === "column" ? tile.layout.justifyContent : tile.layout.alignItems,
				alignItems: tile.layout.direction === "column" ? tile.layout.alignItems : tile.layout.justifyContent,

				//width: tile.layout.width === "fill" || tile.layout.width === "hug" ? undefined : tile.layout.width,
				//height: tile.layout.height === "fill" || tile.layout.height === "hug" ? undefined : tile.layout.height,
				width: width,
				height: height,

				backgroundColor: tile.layout.backgroundColor
					? tile.layout.backgroundColor
					: tile.theme
					? tile.theme.tokens["--page-background-color"]
					: undefined,

				"--page-background-color": tile.theme ? tile.theme.tokens["--page-background-color"] : undefined,
				"--heading-color": tile.theme ? tile.theme.tokens["--heading-color"] : undefined,
				"--body-color": tile.theme ? tile.theme.tokens["--body-color"] : undefined,

				"--accent-color": tile.theme ? tile.theme.tokens["--accent-color"] : undefined,
				"--accent-color-40": tile.theme ? tile.theme.tokens["--accent-color-40"] : undefined,
				"--accent-color-10": tile.theme ? tile.theme.tokens["--accent-color-10"] : undefined,

				"--heading-font": tile.theme ? tile.theme.tokens["--heading-font"] : undefined,
				"--heading-weight": tile.theme ? tile.theme.tokens["--heading-weight"] : undefined,

				"--body-font": tile.theme ? tile.theme.tokens["--body-font"] : undefined,
				"--body-weight": tile.theme ? tile.theme.tokens["--body-weight"] : undefined,

				// flexBasis: tile.layout.sizing === "fill" ? "100%" : "content",
				// flexGrow: tile.layout.sizing === "fill" ? 1 : 0,

				//display: "grid",
				//gridAutoFlow: tile.layout.direction,
				//gridAutoRows: tile.layout.direction === "row" ? tile.layout.sizing === "fill" ? "1fr" : "auto" : undefined,
				//gridAutoColumns: tile.layout.direction === "column" ? tile.layout.sizing === "fill" ? "1fr" : "auto" : undefined,
				//placeItems: `${tile.layout.justifyContent} ${tile.layout.alignItems}`,

				//placeSelf: `${tile.layout.justifySelf} ${tile.layout.alignSelf}`,

				//justifyContent: tile.layout.justifyContent,

				// alignItems: tile.layout.sizing === "fill" ? "stretch" : "start",

				// alignItems: "start", /* make it hug */
				// flexGrow: 1, /* make it fill cross axis */

				/*
				"--layout-align-content": tile.layout.direction === "row" ? tile.layout.alignContent : "unset",
				"--layout-align-items": tile.layout.direction === "row" ? "unset" : tile.layout.alignContent,
				"--layout-justify-content": tile.layout.direction === "row" ? "unset" : tile.layout.justifyContent,
				"--layout-justify-items": tile.layout.direction === "row" ? tile.layout.justifyContent : "unset",
				*/

				/*
				alignContent: tile.layout.direction === "row" ? tile.layout.alignContent : undefined,
				alignItems: tile.layout.direction === "row" ? undefined : tile.layout.alignContent,
				
				justifyItems: tile.layout.direction === "row" ? tile.layout.justifyContent : undefined,
				*/

				//"--layout-auto-rows": tile.layout.direction === "row" ? "1fr" : undefined,
				//"--layout-auto-columns": tile.layout.direction === "column" ? "1fr" : undefined,
			}}
		>
			{/* <HoverSelection tile={tile} selected={selected} dragging={dragging} x={x} y={y}/> */}
			{/* <HoverSelection tile={tile} selected={selected} /> */}
			{children}
		</FlexBox>
	);
};

const FlexBox = styled(motion.section)`
	//display: grid;
	//grid-auto-flow: var(--layout-direction);

	/* align-content: var(--layout-align-content);
	align-items: var(--layout-align-items);
	justify-content: var(--layout-justify-content);
	justify-items: var(--layout-justify-items);
	 */

	//grid-auto-rows: var(--layout-auto-rows);
	//grid-auto-columns: var(--layout-auto-columns);

	position: relative;

	/* min-height: 0; */

	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	gap: var(--gap);
	padding: var(--padding-y) var(--padding-x);
	border-radius: var(--border-radius);

	transform-style: preserve-3d;

	/* Equal-width/heights, may need to move the padding inside */
	/* & > .flex-container {
		flex-basis: 100%;
	} */

	//transform: translateX(var(--tile-x)) translateY(var(--tile-y)) scale(var(--tile-scale));

	/* padding: var(--gap); */

	/* flex-basis: 100%; */

	/* display: grid; */
	/* grid-auto-flow: row; */
	/* grid-auto-rows: auto; */

	/* & h5 + p {
		margin-top: calc(var(--gap) * -1);
	} */
`;

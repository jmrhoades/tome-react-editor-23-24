import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { EditorContext } from "../../editor/EditorContext";
import { TomeContext } from "../../tome/TomeContext";
import { createPortal } from "react-dom";

export const Flex = ({ children, tile }) => {
	const { getTileParentDirection, findTileDepth } = React.useContext(TomeContext);
	const { isMobileView } = React.useContext(EditorContext);

	const ref = React.useRef();

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
			width = tile.layout.width;
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
			height = tile.layout.height;
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
			ref={ref}
			style={{
				"--padding-x": tile.layout.padding.x + "px",
				"--padding-y": tile.layout.padding.y + "px",

				"--gap": tile.layout.gap ? tile.layout.gap + "px" : "inherit",
				//"--border-radius": tile.layout.borderRadius ? tile.layout.borderRadius + "px" : "inherit",
				"--border-radius": tile.layout.borderRadius + "px",

				display: "flex",

				// Container size
				flexBasis: flexBasis,
				flexShrink: 1,
				alignSelf: alignSelf,

				// Content positioning
				flexDirection: isMobile && depth < 2 ? "column" : tile.layout.direction,
				justifyContent: tile.layout.direction === "column" ? tile.layout.justifyContent : tile.layout.alignItems,
				alignItems: tile.layout.direction === "column" ? tile.layout.alignItems : tile.layout.justifyContent,

				width: width,
				minWidth: width,
				maxWidth: width,

				height: height,
				minHeight: height,

				backgroundColor: tile.layout.backgroundColor
					? tile.layout.backgroundColor
					: tile.theme
					? tile.theme.tokens["--page-background-color"]
					: undefined,

				borderTop: tile.layout.borderTop,
				borderBottom: tile.layout.borderBottom,
				borderLeft: tile.layout.borderLeft,
				borderRight: tile.layout.borderRight,

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
			}}
		>
			{children}
		</FlexBox>
	);
};

const FlexBox = styled(motion.section)`
	position: relative;

	gap: var(--gap);
	padding: var(--padding-y) var(--padding-x);
	border-radius: var(--border-radius);
`;

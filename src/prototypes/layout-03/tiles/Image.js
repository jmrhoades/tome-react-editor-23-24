import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { EditorContext } from "../editor/EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

export const Image = ({ children, tile }) => {
	const { getTileParentDirection } = React.useContext(TomeContext);
	const { dragXScaled, dragYScaled, isTileDraggable, isMobileView } = React.useContext(EditorContext);

	const isMobile = isMobileView();

	const draggable = isTileDraggable(tile);

	// Fill the parent container by default
	//const parentDirection = isMobile ? "column" : getTileParentDirection(tile);
	const parentDirection = getTileParentDirection(tile);


	let flexBasis = undefined;
	let alignSelf = undefined;
	if (tile.layout.size === "fill") {
		if (parentDirection === "row") {
			flexBasis = "100%";
		}
		if (parentDirection === "column") {
			alignSelf = "stretch";
		}
	}

	return (
		<ImageBox
			id={tile.id}
			layout
			layoutId={tile.id}
			transition={transitions.layoutTransition}
			style={{
				x: draggable ? dragXScaled : 0,
				y: draggable ? dragYScaled : 0,
				z: draggable ? 200 : 1,
				
				// position: draggable ? "relative" : undefined,
				//isolation:  draggable ? "isolate" : undefined,
				// zIndex:  draggable ? 9999 : undefined,
				
				flexBasis: flexBasis,
				alignSelf: alignSelf,
				height: tile.layout.size === "fill" ? "100%" : undefined,
				"--border-radius": tile.content.borderRadius,
			}}
		>
			<Img
				src={tile.content.src}
				alt=""
				style={{
					maxWidth: tile.content.width ? tile.content.width + "px" : "100%",
					maxHeight: "100%",
					position: tile.layout.size === "fill" && !isMobile ? "absolute" : undefined,
					height: tile.layout.size === "fill" && !isMobile ? "100%" : undefined,
					width: tile.layout.size === "fill" && !isMobile ? "100%" : undefined,
					objectFit: tile.layout.size === "fill" ? "cover" : undefined,
				}}
			/>
		</ImageBox>
	);
};

const ImageBox = styled(motion.div)`
	position: relative;
	border-radius: var(--border-radius);
`;

const Img = styled.img`
	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;
	border-radius: var(--border-radius);
`;

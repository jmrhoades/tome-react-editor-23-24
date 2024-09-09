import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { EditorContext } from "../../editor/EditorContext";
import { TomeContext } from "../../tome/TomeContext";

export const Image = ({ children, tile }) => {
	const { getTileParentDirection } = React.useContext(TomeContext);
	const { isMobileView } = React.useContext(EditorContext);

	const wrapStyles = {
		flexBasis: undefined,
		alignSelf: undefined,

		width: undefined,
		minWidth: undefined,
		maxWidth: undefined,

		height: undefined,
		minHeight: undefined,
		maxHeight: undefined,
	};

	const imgStyles = {
		position: undefined,
		height: undefined,
		width: undefined,
		objectFit: undefined,
	};

	const isMobile = isMobileView();

	const parentDirection = getTileParentDirection(tile);

	let fillContainer = tile.layout.size === "fill" || tile.layout.size === "fit";
	if (tile.layout.width || tile.layout.height) fillContainer = false;

	if (fillContainer) {
		wrapStyles.height = "100%";
		if (parentDirection === "row") {
			wrapStyles.flexBasis = "100%";
		}
		if (parentDirection === "column") {
			wrapStyles.alignSelf = "stretch";
		}
		// fill container by having no block height or width
		imgStyles.position = "absolute";
		imgStyles.width = "100%";
		imgStyles.height = "100%";
		imgStyles.objectFit = tile.layout.size === "fit" ? "contain" : "cover";
	}

	if (tile.layout.width) {
		wrapStyles.minWidth = tile.layout.width;
		wrapStyles.maxWidth = tile.layout.width;
		if (parentDirection === "row") {
			wrapStyles.flexBasis = tile.layout.width;
		}
	}

	if (tile.layout.height && tile.layout.aspectRatio) {
		wrapStyles.minHeight = tile.layout.height;
		wrapStyles.maxHeight = tile.layout.height;
		if (parentDirection === "column") {
			wrapStyles.flexBasis = tile.layout.height;
		}
		imgStyles.maxWidth = "unset";
		imgStyles.width = (tile.layout.height * tile.layout.aspectRatio) + "px";
		imgStyles.height = tile.layout.height + "px";
		
	}

	return (
		<ImageBox
			id={tile.id}
			style={{
				...wrapStyles,
				//aspectRatio: aspectRatio,
				"--border-radius": tile.layout.borderRadius ? tile.layout.borderRadius + "px": "none",

				backgroundColor: tile.layout.backgroundColor,
				paddingTop: tile.layout.padding.y,
				paddingBottom: tile.layout.padding.y,
				paddingLeft: tile.layout.padding.x,
				paddingRight: tile.layout.padding.x,
				boxSizing: "content-box",
				overflow: "clip",
			}}
		>
			<Img
				id={tile.id + "_img"}
				src={tile.content.src}
				alt=""
				style={{
					...imgStyles,
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
	border-radius: var(--border-radius);
`;

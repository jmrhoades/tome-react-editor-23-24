import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	& iframe {
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
`;

export const TileFigma = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap
			style={{
				// backgroundColor: colors.nullTileBackgrounds.figma,
				// backgroundColor: props.theme ? props.theme.colors.backgrounds.tile.null : "transparent",
			}}
		>
			{!props.src && (
				<NullMediaTile
					rowHeight={props.rowHeight}
					tileWidth={props.tileWidth}
					scale={scale}
					iconName={"Figma"}
					isEmbed={true}
					inputPlaceholder={"Paste Figma link..."}
					theme={props.theme}
				/>
			)}
			{props.src && (
				<iframe
					style={{
						pointerEvents: props.isSelected ? "auto" : "none",
					}}
					title="figma embed"
					width="100%"
					height="100%"
					src={props.src}
				></iframe>
			)}
		</Wrap>
	);
};

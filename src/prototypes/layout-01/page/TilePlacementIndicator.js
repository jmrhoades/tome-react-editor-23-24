import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

const PlacementIndicator = styled(motion.div)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
`;

// const Material = styled(motion.div)`
// 	position: absolute;
// 	left: 50%;
// 	top: 50%;
// `;

export const TilePlacementIndicator = props => {
	const { getTileRect, metrics } = useContext(MetricsContext);
	const { tileCornerRadius, tileBorderSize } = metrics;
	const { tomeData, showTileDropTarget, dropIndicatorInfo } = useContext(TomeContext);

	return (
		<PlacementIndicator
			transition={{
				type: "tween",
				duration: 0.2,
			}}
			initial={{
				opacity: 0,
			}}
			//animate={indicatorAnimation}
			style={{
				// boxShadow: `0 0 0 ${tileBorderSize}px ${props.theme.colors.z2}`,
				// backgroundColor: tileDropInfo.type === "add" ? colors.addTile : colors.accent,
				backgroundColor: props.theme.colors.accent,
				borderRadius: 2,
				x: dropIndicatorInfo.x,
				y: dropIndicatorInfo.y,
				width: dropIndicatorInfo.width,
				height: dropIndicatorInfo.height,
				opacity: dropIndicatorInfo.opacity,
			}}
		></PlacementIndicator>
	);
};


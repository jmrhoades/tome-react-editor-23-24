import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { transitions } from "../../ds/Transitions";

//import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { metricConstants } from "../../tome/MetricsContext";
import { BlockType as DiagramBlockType } from "./_constants";
import { Shape } from "./ShapeSVG";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	pointer-events: none;
`;

const Grid = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

export const DotGrid = props => {
	const dotColor = props.theme.colors.t5;
	const dotR = 1.25 * props.scale;
	const spacing = 32 * props.scale;

	let backgroundColor = "rgba(255,255,255,0.02)";
	if (props.theme.mode === "light") {
		backgroundColor = "rgba(0,0,0,0.02)";
	}

	return (
		<Wrap
			style={{
				opacity: props.dotGridOpacity,
				//backgroundColor: backgroundColor,
			}}
		>
			<svg width="100%" height="100%">
				<defs>
					<pattern id="canvas-dots" x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
						<circle fill={dotColor} cx={spacing / 2} cy={spacing / 2} r={dotR} />
					</pattern>
				</defs>

				<rect x="0" y="0" width="100%" height="100%" fill="url(#canvas-dots)" />
			</svg>
		</Wrap>
	);
};

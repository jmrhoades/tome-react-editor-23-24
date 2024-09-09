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
	pointer-events: none;
`;

;const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;


export const GhostBlock = props => {
	//const { scale } = useContext(MetricsContext).metrics; // Causes rerender when window resizes

	const block = props.block;
	const { width: w, height: h } = block.params;

	return (
		<Wrap
			id={block.id}
			style={{
				x: props.block.params.bX,
				y: props.block.params.bY,
				width: props.block.params.bW,
				height: props.block.params.bH,
			}}
		>
			<SVG
				viewBox={`0 0 ${w} ${h}`}
				style={{
					width: props.block.params.bW,
					height: props.block.params.bH,
					fill: props.block.params.fC,
					x: "-50%",
					y: "-50%",
				}}
			>
				<Shape type={props.block.type} params={props.block.params} />
			</SVG>
		</Wrap>
	);
};

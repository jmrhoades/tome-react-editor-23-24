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

export const Block = props => {
	//const { scale } = useContext(MetricsContext).metrics; // Causes rerender when window resizes

	const block = props.block;
	const scale = props.pageScale;
	const { x, y, width: w, height: h, fill } = block.params;

	const bX = useMotionValue(x * scale);
	const bY = useMotionValue(y * scale);
	const bW = useMotionValue(w * scale);
	const bH = useMotionValue(h * scale);
	const fC = useMotionValue(fill.color);

	// Update motion values if scale changes
	React.useEffect(() => {
		/*
		bX.set(x * scale);
		bY.set(y * scale);
		bW.set(w * scale);
		bH.set(h * scale);
		*/

		animate(bX, x * scale, transitions.layoutTransition)
		animate(bY, y * scale, transitions.layoutTransition)
		animate(bW, w * scale, transitions.layoutTransition)
		animate(bH, h * scale, transitions.layoutTransition)

	}, [scale]);

	// Add these motion values back to the data object
	// so that the frame object can update them
	block.params.bX = bX;
	block.params.bY = bY;
	block.params.bW = bW;
	block.params.bH = bH;
	block.params.fC = fC;

	return (
		<Wrap
			id={block.id}
			style={{
				x: bX, 
				y: bY,
			}}
		>
			<SVG
				viewBox={`0 0 ${w} ${h}`}
				style={{
					width: bW,
					height: bH,
					fill: fC,
					x: "-50%",
					y: "-50%",
				}}
				initial={{ scale: block.new ? 1.1 : 1}}
				animate={{ scale: 1 }}
				id={block.id + "_shape"}
			>
				<Shape type={props.block.type} params={props.block.params} />
			</SVG>
		</Wrap>
	);
};

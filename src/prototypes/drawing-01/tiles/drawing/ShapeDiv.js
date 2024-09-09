import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";



import { BlockType as DiagramBlockType } from "./_constants";

const Shape = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
    width: 100%;
	height: 100%;
`;

export const ShapeDiv = props => {
	const { width: w, height: h } = props.params;

    let clipPath = "";
    const ELLIPSE = props.type === DiagramBlockType.ELLIPSE;
	const RECTANGLE = props.type === DiagramBlockType.RECTANGLE;

	if (ELLIPSE) {
		clipPath = `ellipse(closest-side closest-side at 50% 50%)`;
	}

	if (RECTANGLE) {
		clipPath = `unset`;
	}

	
	return (
		<Shape
			style={{
				clipPath: clipPath,
				...props.style
			}}
			
		/>
	);
};

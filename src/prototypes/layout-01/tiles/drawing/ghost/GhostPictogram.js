import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionTemplate } from "framer-motion";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
`;

export const GhostPictogram = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r } = props.scaledValues;

	return (
		<Wrap
			id={"ghost" + layer.id}
			style={{
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
			}}
			onPointerDown={props.onPointerDown}
		>
			
		</Wrap>
	);
};

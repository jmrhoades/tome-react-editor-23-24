import React from "react";
import styled from "styled-components";
import { motion, useMotionTemplate } from "framer-motion";
import { ShapePath } from "../layers/ShapePath";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;

	display: flex;
	justify-content: center;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
`;

const Text = styled(motion.div)`
	position: relative;
	user-select: none;
	overflow-wrap: break-word;
`;

export const GhostShapeLayer = props => {
	const layer = props.layer;
	const { fill, line, text, fontSize, margins, marginXMax, marginYMax } = layer.motion;
	const { bX, bY, bW, bH, r } = props.scaledValues;

	const fontSizePx = useMotionTemplate`${fontSize}px`;
	const marginX = useMotionTemplate`min(${margins.x.min}, ${marginXMax}px)`;
	const marginY = useMotionTemplate`min(${margins.y.min}, ${marginYMax}px)`;

	return (
		<Wrap
			id={"ghost" + layer.id}
			style={{
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
                alignItems: text.alignment.y,
			}}
		>
			<SVG
				style={{
					fill: fill.color,
					stroke: line.color,
					strokeWidth: line.size,
				}}
			>
				<ShapePath
					type={layer.type}
					w={bW}
					h={bH}
					borderRadius={line.radius}
					onPointerDown={props.onPointerDown}
				/>
			</SVG>
			<Text
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: fontSizePx,
					fontWeight: props.theme.typography.fontWeight[text.style],
					//lineHeight: props.theme.typography.lineHeight[text.style],
                    lineHeight: 1.2,
					//letterSpacing: props.theme.typography.letterSpacing[text.style],
					color: text.color,
					textAlign: props.layer.motion.text.alignment.x,
					marginLeft: marginX,
					marginRight: marginX,
					marginTop: marginY,
					marginBottom: marginY,
					minWidth: 12,
				}}
			>
				{text.content}
			</Text>
		</Wrap>
	);
};

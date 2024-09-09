import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionTemplate } from "framer-motion";

import { PLACEHOLDER_STRING } from "../constants";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
`;

const Text = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	overflow-wrap: break-word;
	user-select: none;
	pointer-events: none;
`;

const Placeholder = styled(Text)`
	position: absolute;
	top: 0;
	left: 0;
`;

export const GhostTextLayer = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r, fontSize } = props.scaledValues;
	const fontSizePx = useMotionTemplate`${fontSize}px`;
	const style = layer.params.text.style;

	// Margins around text box
	const yMargins = useTransform(() => 1 * props.zoom.get() * props.pageScale.get());
	const xMargins = useTransform(() => 1 * props.zoom.get() * props.pageScale.get());

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
			<Placeholder
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: fontSizePx,
					fontWeight: props.theme.typography.fontWeight[style],
					//letterSpacing: props.theme.typography.letterSpacing[style],
                    lineHeight: 1.2,
					color: props.theme.drawing.text.placeholder,
					textAlign: layer.motion.text.alignment.x,
					y: yMargins,
					x: xMargins,
					opacity: layer.motion.text.showPlaceholder,
				}}
			>
				<span>{PLACEHOLDER_STRING}</span>
			</Placeholder>
			<Text
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: fontSizePx,
					fontWeight: props.theme.typography.fontWeight[style],
					//letterSpacing: props.theme.typography.letterSpacing[style],
                    lineHeight: 1.2,
					color: layer.motion.text.color,
					textAlign: layer.motion.text.alignment.x,
					minWidth: 2,
					width: layer.motion.text.width,
					y: yMargins,
					x: xMargins,
				}}
			>
				{layer.motion.text.content}
			</Text>
		</Wrap>
	);
};

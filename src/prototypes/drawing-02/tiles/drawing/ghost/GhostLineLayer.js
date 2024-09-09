import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { getAngleInRadians, radiansToDegrees } from "../utilities";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
	pointer-events: none;
`;

export const GhostLineLayer = props => {
	const layer = props.layer;
	const { line } = layer.motion;
	const { bX, bY, bW, bH, r, borderSize, x1, y1, x2, y2 } = props.scaledValues;

	// scaled minimum hitarea used as stroke width
	const minHitArea = useTransform(() => 12 * props.zoom.get() * props.pageScale.get());

	// create path
	const d = useMotionTemplate`M${x1} ${y1}L${x2} ${y2}`;


    // angle and length of line
	const angleInRadians = useTransform(() => getAngleInRadians(x1.get(), x2.get(), y1.get(), y2.get()));
	const angleInDegrees = useTransform(() => radiansToDegrees(angleInRadians.get()));
	//const length = useTransform(() => Math.hypot(x2.get() - x1.get(), y2.get() - y1.get()));

	// Marker paths
	// Arrow end
	const arrowLength = useTransform(() => 9 * props.zoom.get() * props.pageScale.get());
	const arrowEndAngleA = useTransform(() => -135 + angleInDegrees.get());
	const arrowEndAngleB = useTransform(() => 135 + angleInDegrees.get());
	const arrowEndX1 = useTransform(
		() => Math.cos((arrowEndAngleA.get() * Math.PI) / 180) * arrowLength.get() + x2.get()
	);
	const arrowEndY1 = useTransform(
		() => Math.sin((arrowEndAngleA.get() * Math.PI) / 180) * arrowLength.get() + y2.get()
	);
	const arrowEndX2 = useTransform(
		() => Math.cos((arrowEndAngleB.get() * Math.PI) / 180) * arrowLength.get() + x2.get()
	);
	const arrowEndY2 = useTransform(
		() => Math.sin((arrowEndAngleB.get() * Math.PI) / 180) * arrowLength.get() + y2.get()
	);
	const arrowEndLine1 = useMotionTemplate`M${x2} ${y2}L${arrowEndX1} ${arrowEndY1}`;
	const arrowEndLine2 = useMotionTemplate`M${x2} ${y2}L${arrowEndX2} ${arrowEndY2}`;


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
		>
			<SVG
				style={{
					fill: "none",
					stroke: line.color,
					strokeWidth: borderSize,
					strokeLinecap: "round",
				}}
			>
				<motion.path d={d} id={layer.id + "_path"} />
				<motion.path d={arrowEndLine1} />
				<motion.path d={arrowEndLine2} />

				<motion.path
					d={d}
					style={{
						stroke: "transparent",
						strokeWidth: minHitArea,
						strokeLinecap: "round",
						pointerEvents: "auto",
					}}
					onPointerDown={props.onPointerDown}
				/>
			</SVG>
		</Wrap>
	);
};

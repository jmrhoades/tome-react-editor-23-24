import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionTemplate, useMotionValueEvent, useTransform } from "framer-motion";
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

export const LineLayer = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r, borderSize, x1, y1, x2, y2, line } = layer.motion;

	const [capStart, setCapStart] = React.useState(layer.params.line.capStart);
	const [capEnd, setCapEnd] = React.useState(layer.params.line.capEnd);

	const strokeLinecap = useMotionValue("round");
	const updateLinecaps = v => {
		if (v === "FLAT_START" || v === "FLAT_END") {
			strokeLinecap.set("round");
		} else {
			strokeLinecap.set("round");
		}
	};

	useMotionValueEvent(line.capEnd, "change", latest => {
		setCapEnd(latest);
		updateLinecaps(latest);
		if (latest === "FLAT_END") {
			if (line.capStart.get() === "ROUND_START") {
				layer.params.line.capStart = "FLAT_START";
				layer.motion.line.capStart.set("FLAT_START");
			}
		}
		if (latest === "ROUND_END") {
			if (line.capStart.get() === "FLAT_START") {
				layer.params.line.capStart = "ROUND_START";
				layer.motion.line.capStart.set("ROUND_START");
			}
		}
	});

	useMotionValueEvent(line.capStart, "change", latest => {
		setCapStart(latest);
		updateLinecaps(latest);
		if (latest === "FLAT_START") {
			if (line.capEnd.get() === "ROUND_END") {
				layer.params.line.capEnd = "FLAT_END";
				layer.motion.line.capEnd.set("FLAT_END");
			}
		}
		if (latest === "ROUND_START") {
			if (line.capEnd.get() === "FLAT_END") {
				layer.params.line.capEnd = "ROUND_END";
				layer.motion.line.capEnd.set("ROUND_END");
			}
		}
	});

	// scaled minimum hitarea used as stroke width
	const minHitArea = useTransform(() => 12 * props.zoom.get() * props.pageScale.get());

	// create path
	const d = useMotionTemplate`M${x1} ${y1}L${x2} ${y2}`;
	layer.d = d; // used by selection box

	// angle and length of line
	const angleInRadians = useTransform(() => getAngleInRadians(x1.get(), x2.get(), y1.get(), y2.get()));
	const angleInDegrees = useTransform(() => radiansToDegrees(angleInRadians.get()));
	//const length = useTransform(() => Math.hypot(x2.get() - x1.get(), y2.get() - y1.get()));

	// Marker paths
	const baseLength = useTransform(line.size, [1, 10], [10, 40], { clamp: false });
	const baseDot = useTransform(line.size, [1, 10], [4, 12], { clamp: false });
	const arrowLength = useTransform(() => baseLength.get() * props.zoom.get() * props.pageScale.get());
	const dotSize = useTransform(() => baseDot.get() * props.zoom.get() * props.pageScale.get());

	// Arrow end
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

	// Arrow start
	const arrowStartAngleA = useTransform(() => -45 + angleInDegrees.get());
	const arrowStartAngleB = useTransform(() => 45 + angleInDegrees.get());
	const arrowStartX1 = useTransform(
		() => Math.cos((arrowStartAngleA.get() * Math.PI) / 180) * arrowLength.get() + x1.get()
	);
	const arrowStartY1 = useTransform(
		() => Math.sin((arrowStartAngleA.get() * Math.PI) / 180) * arrowLength.get() + y1.get()
	);
	const arrowStartX2 = useTransform(
		() => Math.cos((arrowStartAngleB.get() * Math.PI) / 180) * arrowLength.get() + x1.get()
	);
	const arrowStartY2 = useTransform(
		() => Math.sin((arrowStartAngleB.get() * Math.PI) / 180) * arrowLength.get() + y1.get()
	);
	const arrowStartLine1 = useMotionTemplate`M${x1} ${y1}L${arrowStartX1} ${arrowStartY1}`;
	const arrowStartLine2 = useMotionTemplate`M${x1} ${y1}L${arrowStartX2} ${arrowStartY2}`;

	const pathRef = React.useRef();
	// Reset line points and bounding box after user manipulation
	const updateBox = () => {
		const path = pathRef.current; //document.getElementById(layer.id + "_path");
		if (!path) return false;

		const box = path.getBBox({ stroke: true });
		const scale = props.zoom.get() * props.pageScale.get();

		console.log(box);

		//return false;
		// Update tome data for subsequent renders
		layer.params.width = box.width / scale;
		layer.params.height = box.height / scale;
		layer.params.x += box.x / scale;
		layer.params.y += box.y / scale;
		layer.params.line.x1 -= box.x / scale;
		layer.params.line.y1 -= box.y / scale;
		layer.params.line.x2 -= box.x / scale;
		layer.params.line.y2 -= box.y / scale;

		
		// Flip points if they don't make sense anymore
		if (layer.params.line.x2 < layer.params.line.x1) {
			//console.log("FLIPPPPP", layer.params.line.capEnd, layer.params.line.capStart);
			const x = layer.params.line.x1;
			const y = layer.params.line.y1;
			layer.params.line.x1 = layer.params.line.x2;
			layer.params.line.y1 = layer.params.line.y2;
			layer.params.line.x2 = x;
			layer.params.line.y2 = y;
			// Gotta update the caps if you flip the points
			const cap = layer.params.line.capStart;
			layer.params.line.capStart = layer.params.line.capEnd;
			layer.params.line.capEnd = cap;
			line.capStart.set(layer.params.line.capStart.replace("END", "START"));
			line.capEnd.set(layer.params.line.capEnd.replace("START", "END"));
		}
		

		// // Sync points to new box
		line.x1.set(layer.params.line.x1);
		line.y1.set(layer.params.line.y1);
		line.x2.set(layer.params.line.x2);
		line.y2.set(layer.params.line.y2);

		// // Update box coordinates
		layer.motion.x.set(layer.params.x);
		layer.motion.y.set(layer.params.y);
		layer.motion.w.set(layer.params.width);
		layer.motion.h.set(layer.params.height);

		setTimeout(props.updateBounds, 1);
		//console.log("line layer: updateBox");
	};
	layer.updateBox = updateBox;

	// Calculate real bounding box when first mounted
	React.useEffect(updateBox, []);

	return (
		<Wrap
			id={layer.id}
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
					strokeLinecap: strokeLinecap,
				}}
			>
				<motion.path d={d} ref={pathRef} id={layer.id + "_path"} />

				{/* End-caps */}

				{capEnd === "ARROW_END" && (
					<g>
						<motion.path d={arrowEndLine1} />
						<motion.path d={arrowEndLine2} />
					</g>
				)}

				{capEnd === "CIRCLE_END" && (
					<motion.circle stroke={"none"} fill={line.color} r={dotSize} cx={x2} cy={y2} />
				)}

				{/* Start-caps */}

				{capStart === "ARROW_START" && (
					<g>
						<motion.path d={arrowStartLine1} />
						<motion.path d={arrowStartLine2} />
					</g>
				)}

				{capStart === "CIRCLE_START" && (
					<motion.circle stroke={"none"} fill={line.color} r={dotSize} cx={x1} cy={y1} />
				)}

				{/* Multi-select path */}
				{props.showSelection && (
					<motion.path
						d={d}
						style={{
							stroke: props.selectedStrokeColor,
							strokeWidth: 1,
							opacity: props.selectedOutlineOpacity,
						}}
					/>
				)}

				{/* Hit-test path */}
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

import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ShapePath } from "./ShapePath";
import { ShapeText } from "./ShapeText";
import { DRAG_SCALE_AMOUNT, TEXT_ID } from "../constants";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	display: flex;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
`;

const SelectedSVG = styled(SVG)``;

export const ShapeLayer = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r, fill, line, text, margins, borderSize, borderRadius, marginXMax, marginYMax } =
		layer.motion;

	return (
		<Wrap
			id={layer.id}
			style={{
				alignItems: text.alignment.y,
				//justifyContent: "start",
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
			}}
			//initial={{ scale: layer.new ? 1 + DRAG_SCALE_AMOUNT : 1 }}
			//animate={{ scale: 1 }}
		>
			<SVG
				id={layer.id + "_shape"}
				style={{
					fill: fill.color,
					stroke: line.color,
					strokeWidth: borderSize,
				}}
			>
				<ShapePath
					type={layer.type}
					w={bW}
					h={bH}
					borderRadius={borderRadius}
					onPointerDown={props.onPointerDown}
				/>
			</SVG>
			{props.showSelection && (
				<SelectedSVG
					style={{
						fill: "none",
						stroke: props.selectedStrokeColor,
						strokeWidth: 1,
						opacity: props.selectedOutlineOpacity,
					}}
				>
					<ShapePath type={layer.type} w={bW} h={bH} borderRadius={borderRadius} />
				</SelectedSVG>
			)}
			<ShapeText
				layer={layer}
				id={layer.id + TEXT_ID}
				theme={props.theme}
				color={text.color}
				//fontSize={fontSize}
				marginXMin={margins.x.min}
				marginXMax={marginXMax}
				marginYMin={margins.y.min}
				marginYMax={marginYMax}
				content={text.content}
				selection={props.selection}
				boundsOpacity={props.boundsOpacity}
				layerTextIsFocused={props.layerTextIsFocused}
				pageScale={props.pageScale}
			zoom={props.zoom}
			/>
		</Wrap>
	);
};

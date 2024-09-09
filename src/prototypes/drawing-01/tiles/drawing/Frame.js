import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { Shape } from "./ShapeSVG";

import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { BlockType as DiagramBlockType } from "./_constants";
import { ShapeDiv } from "./ShapeDiv";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const Hover = styled(Wrap)`
	width: 100%;
	height: 100%;
	transition: opacity 0.15s ease-out;
	/* transition-delay: 0.1s; */
`;

const HoverSVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
`;

const SelectedSVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
`;

const EventsSVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;


const Selection = styled(Wrap)`
	width: 100%;
	height: 100%;
`;

export const Frame = props => {
	const block = props.block;
	const { width: w, height: h } = block.params;
	const scale = props.pageScale;

	const selectionOpacity = useMotionValue(0);
	const hoverOpacity = useMotionValue(0);

	const isClick = useMotionValue(0);

	const hoverBorderWidth = 1;
	const hoverWidth = useMotionValue(w * scale + hoverBorderWidth * 2);
	const hoverHeight = useMotionValue(h * scale + hoverBorderWidth * 2);
	const hoverViewbox = useMotionValue(`0 0 ${hoverWidth.get()}  ${hoverHeight.get()}`);

	// Listen for selection changes
	useMotionValueEvent(props.selectedIds, "change", latest => {
		if (latest === props.block.id) {
			// Show selection
			selectionOpacity.set(1);
			// Hide hover on selection
			hoverOpacity.set(0);
		} else {
			selectionOpacity.set(0);
		}
	});
	

	return (
		<Wrap
			id={block.id + "_frame"}
			initial={{ scale: block.new ? 1.1 : 1}}
				animate={{ scale: 1 }}
			style={{
				x: props.block.params.bX,
				y: props.block.params.bY,
				width: props.block.params.bW,
				height: props.block.params.bH,
				left: -(w * scale) / 2,
				top: -(h * scale) / 2,
			}}
			onContextMenu={e => {
				e.preventDefault();
			}}
			onHoverStart={() => {
				if (props.selectedIds.get() !== props.block.id && !props.block.new) {
					hoverWidth.set(w * scale + hoverBorderWidth * 2);
					hoverHeight.set(h * scale + hoverBorderWidth * 2);
					hoverViewbox.set(`0 0 ${hoverWidth.get()}  ${hoverHeight.get()}`);
					hoverOpacity.set(1);
				}
			}}
			onHoverEnd={() => {
				hoverOpacity.set(0);
			}}
			onPointerDown={e => {
				props.selectedIds.set(props.block.id);
				isClick.set(1);
			}}
			drag
			dragMomentum={false}
			onDragStart={e => {
				selectionOpacity.set(0);
				//animate(selectionOpacity, 0, { duration: 0.2 })
				isClick.set(0);
				props.propertyId.set("");
			}}
			onDrag={(e, i) => {
				// Update shape position in tome data object
				block.params.x = props.block.params.bX.get() / scale;
				block.params.y = props.block.params.bY.get() / scale;
				// console.log(block.params.x);
			}}
			onDragEnd={e => {
				// Restore selection if selected
				if (props.selectedIds.get() === props.block.id) {
					selectionOpacity.set(1);
				}
			}}
			onPointerUp={e => {
				if (isClick.get(1)) {
					/* Always toggle properties on click */
					if (props.propertyId.get() === props.block.id) {
						props.propertyId.set("");
					} else {
						props.propertyId.set(props.block.id);
					}
				}
			}}
		>


			<Selection
				style={{
					opacity: selectionOpacity,
					//borderColor: props.theme.colors.accent,
					//boxShadow: `0 0 0 1px ${props.theme.colors.accent}`,
				}}
			>
				<SelectedSVG
				viewBox={hoverViewbox}
				style={{
					width: hoverWidth,
					height: hoverHeight,
					fill: "none",
					stroke: props.theme.colors.accent, //"white",
					strokeOpacity: 1,
					strokeWidth: hoverBorderWidth,
					x: -hoverBorderWidth / 2,
					y: -hoverBorderWidth / 2,
					
				}}
				
			>
				{block.type === DiagramBlockType.ELLIPSE && (
					<motion.ellipse
						cx={(w / 2) * scale + hoverBorderWidth / 2}
						cy={(h / 2) * scale + hoverBorderWidth / 2}
						rx={(w / 2) * scale + hoverBorderWidth / 2}
						ry={(h / 2) * scale + hoverBorderWidth / 2}
					/>
				)}
				{block.type === DiagramBlockType.RECTANGLE && (
					<motion.rect x={hoverBorderWidth / 2} y={hoverBorderWidth / 2} width={w * scale} height={h * scale} rx={0} />
				)}
				
			</SelectedSVG>

				<CornerControl
					style={{ top: 0, left: 0, x: "-50%", y: "-50%", cursor: "nwse-resize" }}
					theme={props.theme}
				/>
				<CornerControl
					style={{ top: 0, right: 0, x: "50%", y: "-50%", cursor: "nesw-resize" }}
					theme={props.theme}
				/>
				<CornerControl
					style={{ bottom: 0, right: 0, x: "50%", y: "50%", cursor: "nwse-resize" }}
					theme={props.theme}
				/>
				<CornerControl
					style={{ bottom: 0, left: 0, x: "-50%", y: "50%", cursor: "nesw-resize" }}
					theme={props.theme}
				/>
			</Selection>


			<HoverSVG
				viewBox={hoverViewbox}
				style={{
					width: hoverWidth,
					height: hoverHeight,
					fill: "none",
					stroke: props.theme.colors.accent, //"white",
					strokeOpacity: 1,
					strokeWidth: hoverBorderWidth,
					x: -hoverBorderWidth / 2,
					y: -hoverBorderWidth / 2,
					opacity: hoverOpacity,
				}}
				
			>
				{block.type === DiagramBlockType.ELLIPSE && (
					<motion.ellipse
						cx={(w / 2) * scale + hoverBorderWidth / 2}
						cy={(h / 2) * scale + hoverBorderWidth / 2}
						rx={(w / 2) * scale + hoverBorderWidth / 2}
						ry={(h / 2) * scale + hoverBorderWidth / 2}
					/>
				)}
				{block.type === DiagramBlockType.RECTANGLE && (
					<motion.rect x={hoverBorderWidth / 2} y={hoverBorderWidth / 2} width={w * scale} height={h * scale} rx={0} />
				)}
			</HoverSVG>

			{/* <EventsSVG
				viewBox={`0 0 ${w}  ${h}`}
				style={{
					width: w * scale,
					height: h * scale,
					fill: "red",
					opacity: 0.5,
				}}
			>
				<Shape type={block.type} params={block.params} id={block.id+"_events"} />

			
			</EventsSVG> */}



		</Wrap>
	);
};

const CornerControl = props => {
	const hitArea = 32;
	const size = 8;
	const stroke = 1;
	let outerColor = props.theme.colors.t9;
	const innerColor = props.theme.colors.accent;
	let shadow = `0 1px 4px 0 rgba(0,0,0,.12)`;
	if (props.theme.mode === "light") {
		outerColor = innerColor;
		shadow = `0 1px 4px 0 rgba(0,0,0,.12), 0 0 0 1px rgba(255,255,255,1)`;
	}

	return (
		<motion.div
			style={{
				position: "absolute",
				width: hitArea,
				height: hitArea,
				...props.style,
			}}
		>
			<motion.div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					x: "-50%",
					y: "-50%",
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor: outerColor,
					boxShadow: shadow,
				}}
			>
				<motion.div
					style={{
						position: "absolute",
						top: stroke,
						left: stroke,
						width: size - stroke * 2,
						height: size - stroke * 2,
						borderRadius: size / 2,
						backgroundColor: innerColor,
					}}
				/>
			</motion.div>
		</motion.div>
	);
};

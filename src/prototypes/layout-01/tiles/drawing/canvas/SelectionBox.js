import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import chroma from "chroma-js";

import { cursors } from "../constants";

const Box = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
	fill: none;
	pointer-events: none;
`;

const selectionStrokeSize = 1.25;
const handleHitArea = 16;
const handleRadius = 3;
const handleStrokeWidth = 1;

export const SelectionBox = props => {
	const bounds = props.bounds;

	const boxStrokeColor = useMotionValue(props.theme.colors.accent);
	const handleStrokeColor = useMotionValue("white");
	const handleFillColor = useMotionValue(props.theme.colors.accent);

	const pointerEvents = useMotionValue("none");
	const hitArea = 16;
	const hitAreaFill = "transparent";

	const rotateHitArea = 24;
	const rotateAreaFill = "transparent";

	const resizeHeightEvents = useMotionValue("auto");
	const [lineSelected, setLineSelected] = React.useState(false);
	const [progressRingSelected, setProgressRingSelected] = React.useState(false);
	const [pictogramSelected, setPictogramSelected] = React.useState(false);

	// Listen for selection changes
	useMotionValueEvent(props.selection, "change", latest => {
		setLineSelected(false);
		setProgressRingSelected(false);
		setPictogramSelected(false);
		if (latest === "") {
			pointerEvents.set("none");
			resizeHeightEvents.set("none");
		} else {
			pointerEvents.set("auto");
			resizeHeightEvents.set("auto");
			const ids = props.selection.get().split(",");
			if (ids.length === 1) {
				const layer = props.layers.find(({ id }) => id === ids[0]);
				if (layer) {
					if (layer.layerType === "TEXT") {
						resizeHeightEvents.set("none");
					} else if (layer.layerType === "PROGRESS_RING") {
						setProgressRingSelected(layer);
					} else if (layer.layerType === "PICTOGRAM") {
						setPictogramSelected(layer);
					} else if (layer.layerType === "LINE") {
						setLineSelected(layer);
					} else {
						resizeHeightEvents.set("auto");
					}
				}
			}
		}
	});

	// Update selection colors when text focus changes
	useMotionValueEvent(props.layerTextIsFocused, "change", latest => {
		if (latest === 1) {
			//console.log("FOCUSSED TEXT");
			const bgColor = props.theme.drawing.selection.focused;
			boxStrokeColor.set(bgColor);
			handleStrokeColor.set("transparent");
			handleFillColor.set("transparent");
		} else {
			//console.log("BLURRED TEXT");
			boxStrokeColor.set(props.theme.colors.accent);
			handleStrokeColor.set("white");
			handleFillColor.set(props.theme.colors.accent);
		}
	});

	return (
		<Box
			// initial={{ scale: layer.new ? 1.1 : 1 }}
			// animate={{ scale: 1 }}
			id="drawing_tile_selection_box"
			style={{
				x: bounds.x,
				y: bounds.y,
				width: bounds.width,
				height: bounds.height,
				opacity: bounds.opacity,
				rotate: bounds.rotate,
			}}
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			{lineSelected && (
				<>
					<Handle
						theme={props.theme}
						circular={true}
						stroke={handleStrokeColor}
						fill={handleFillColor}
						style={{
							top: lineSelected.motion.y1,
							left: lineSelected.motion.x1,
							x: "-50%",
							y: "-50%",
							cursor: "move",
							pointerEvents: pointerEvents,
						}}
						onPointerDown={e => {
							props.onMovePointPointerDown(e, "POINT_A");
						}}
						className={"POINT_A"}
					/>
					<Line d={lineSelected.d} stroke={boxStrokeColor} />
					<Handle
						theme={props.theme}
						circular={true}
						stroke={handleStrokeColor}
						fill={handleFillColor}
						style={{
							top: lineSelected.motion.y2,
							left: lineSelected.motion.x2,
							x: "-50%",
							y: "-50%",
							cursor: "move",
							pointerEvents: pointerEvents,
						}}
						onPointerDown={e => {
							props.onMovePointPointerDown(e, "POINT_B");
						}}
						className={"POINT_B"}
					/>
				</>
			)}

			{!lineSelected && (
				<>
					<SVG>
						<motion.rect
							width="100%"
							height="100%"
							rx={0}
							stroke={boxStrokeColor}
							strokeWidth={selectionStrokeSize}
							style={{ pointerEvents: "none" }}
						/>

						{/* Rotate nw */}
						{/* <motion.rect
					fill={rotateAreaFill}
					width={rotateHitArea}
					height={rotateHitArea}
					x={0}
					y={0}
					style={{ cursor: cursors.nwRotate, x: -rotateHitArea, y: -rotateHitArea, pointerEvents: pointerEvents }}
					onPointerDown={e => {
						props.onRotateHandlePointerDown(e, "nw", "nw-rotate");
					}}
				/> */}

						{/* Rotate ne */}
						{/* <motion.rect
					fill={rotateAreaFill}
					width={rotateHitArea}
					height={rotateHitArea}
					x={"100%"}
					y={0}
					style={{ cursor: cursors.neRotate, x: 0, y: -rotateHitArea, pointerEvents: pointerEvents }}
					onPointerDown={e => {
						props.onRotateHandlePointerDown(e, "ne", "ne-rotate");
					}}
				/> */}

						{/* Rotate se */}
						{/* <motion.rect
					fill={rotateAreaFill}
					width={rotateHitArea}
					height={rotateHitArea}
					x={"100%"}
					y={"100%"}
					style={{ cursor: cursors.seRotate, x: 0, y: 0, pointerEvents: pointerEvents }}
					onPointerDown={e => {
						props.onRotateHandlePointerDown(e, "se", "se-rotate");
					}}
				/> */}

						{/* Rotate sw */}
						{/* <motion.rect
					fill={rotateAreaFill}
					width={rotateHitArea}
					height={rotateHitArea}
					x={0}
					y={"100%"}
					style={{ cursor: cursors.swRotate, x: -rotateHitArea, y: 0, pointerEvents: pointerEvents }}
					onPointerDown={e => {
						props.onRotateHandlePointerDown(e, "sw", "sw-rotate");
					}}
				/> */}

						{/* Top resize */}
						<motion.rect
							fill={hitAreaFill}
							width="100%"
							height={hitArea}
							x={0}
							y={0}
							style={{ cursor: "ns-resize", y: -hitArea / 2, pointerEvents: resizeHeightEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "top", "ns-resize");
							}}
						/>

						{/* Bottom resize */}
						<motion.rect
							fill={hitAreaFill}
							width="100%"
							height={hitArea}
							x={0}
							y={"100%"}
							style={{ cursor: "ns-resize", y: -hitArea / 2, pointerEvents: resizeHeightEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "bottom", "ns-resize");
							}}
						/>

						{/* Right resize */}
						<motion.rect
							fill={hitAreaFill}
							width={hitArea}
							height="100%"
							x={"100%"}
							y={"0"}
							style={{ cursor: "ew-resize", x: -hitArea / 2, pointerEvents: pointerEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "right", "ew-resize");
							}}
						/>

						{/* Left resize */}
						<motion.rect
							fill={hitAreaFill}
							width={hitArea}
							height="100%"
							x={0}
							y={0}
							style={{ cursor: "ew-resize", x: -hitArea / 2, pointerEvents: pointerEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "left", "ew-resize");
							}}
						/>

						{/* Top left corner resize */}
						<motion.rect
							fill={hitAreaFill}
							width={hitArea}
							height={hitArea}
							x={0}
							y={0}
							style={{ cursor: "nwse-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "nw", "nwse-resize");
							}}
						/>

						{/* Top right corner resize */}
						<motion.rect
							fill={hitAreaFill}
							width={hitArea}
							height={hitArea}
							x={"100%"}
							y={0}
							style={{ cursor: "nesw-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "ne", "nesw-resize");
							}}
						/>

						{/* Bottom right corner resize */}
						<motion.rect
							fill={hitAreaFill}
							width={hitArea}
							height={hitArea}
							x={"100%"}
							y={"100%"}
							style={{ cursor: "nwse-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "se", "nwse-resize");
							}}
						/>

						{/* Bottom left corner resize */}
						<motion.rect
							fill={hitAreaFill}
							width={hitArea}
							height={hitArea}
							x={0}
							y={"100%"}
							style={{ cursor: "nesw-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
							onPointerDown={e => {
								props.onResizeHandlePointerDown(e, "sw", "nesw-resize");
							}}
						/>

						{/* {progressRingSelected && (
							<motion.rect
								fill={hitAreaFill}
								width={hitArea}
								height={hitArea}
								x={progressRingSelected.endX}
								y={progressRingSelected.endY}
								style={{
									cursor: "nesw-resize",
									x: -hitArea / 2,
									y: -hitArea / 2,
									pointerEvents: pointerEvents,
								}}
								onPointerDown={e => {}}
							/>
						)} */}
					</SVG>

					<Handle
						theme={props.theme}
						circular={true}
						stroke={handleStrokeColor}
						fill={handleFillColor}
						style={{
							top: 0,
							left: 0,
							x: "-50%",
							y: "-50%",
							opacity: props.bounds.handleOpacity,
						}}
					/>
					<Handle
						theme={props.theme}
						circular={true}
						stroke={handleStrokeColor}
						fill={handleFillColor}
						style={{
							top: 0,
							right: 0,
							x: "50%",
							y: "-50%",
							opacity: props.bounds.handleOpacity,
						}}
					/>
					<Handle
						theme={props.theme}
						circular={true}
						stroke={handleStrokeColor}
						fill={handleFillColor}
						style={{
							bottom: 0,
							right: 0,
							x: "50%",
							y: "50%",
							opacity: props.bounds.handleOpacity,
						}}
					/>
					<Handle
						theme={props.theme}
						circular={true}
						stroke={handleStrokeColor}
						fill={handleFillColor}
						style={{
							bottom: 0,
							left: 0,
							x: "-50%",
							y: "50%",
							opacity: props.bounds.handleOpacity,
						}}
					/>

					{progressRingSelected && (
						<ProgressHandle
							theme={props.theme}
							stroke={handleStrokeColor}
							fill={handleFillColor}
							size={progressRingSelected.motion.line.size}
							style={{
								top: progressRingSelected.endY,
								left: progressRingSelected.endX,
								x: "-50%",
								y: "-50%",
								opacity: props.bounds.handleOpacity,
								pointerEvents: "auto",
								cursor: "grab",
							}}
							onPointerDown={e => {
								progressRingSelected.setProgressHandleDragging(true);
								bounds.opacity.set(0);
							}}
						/>
					)}

					{pictogramSelected && (
						<AddButton
							theme={props.theme}
							stroke={handleStrokeColor}
							fill={handleFillColor}
							style={{
								top: "50%",
								right: 0,
								x: 28,
								y: "-50%",
								opacity: props.bounds.handleOpacity,
							}}
							onPointerDown={e => {
								//bounds.opacity.set(0);
							}}
						/>
					)}
				</>
			)}
		</Box>
	);
};

export const Handle = props => {
	let radius = handleRadius;
	let strokeWidth = handleStrokeWidth;
	let hitArea = handleHitArea;
	let squareSize = (handleRadius + handleStrokeWidth) * 2;

	const squareX = (hitArea - squareSize) / 2;
	const squareY = (hitArea - squareSize) / 2;

	const stroke = props.stroke;
	const fill = props.fill;

	const shadow = props.theme.drawing.selection.handle.shadow;
	const circular = props.circular;

	return (
		<motion.svg
			style={{
				display: "block",
				position: "absolute",
				overflow: "visible",
				width: hitArea,
				height: hitArea,
				...props.style,
			}}
			filter={shadow}
			onPointerDown={props.onPointerDown}
			className={props.className}
		>
			{/* white outline */}
			{circular && <motion.circle cx={hitArea / 2} cy={hitArea / 2} r={radius + strokeWidth} fill={stroke} />}
			{!circular && <motion.rect x={squareX} y={squareY} width={squareSize} height={squareSize} fill={stroke} />}

			{/* fill */}
			{circular && <motion.circle cx={hitArea / 2} cy={hitArea / 2} r={radius} fill={fill} />}

			{!circular && (
				<motion.rect
					x={squareX + strokeWidth}
					y={squareY + strokeWidth}
					width={squareSize - strokeWidth * 2}
					height={squareSize - strokeWidth * 2}
					fill={fill}
				/>
			)}
		</motion.svg>
	);
};

export const Line = props => {
	return (
		<motion.svg
			style={{
				display: "block",
				position: "absolute",
				overflow: "visible",
				pointerEvents: "none",
				fill: "none",
			}}
		>
			<motion.path
				d={props.d}
				style={{
					stroke: props.stroke,
					strokeWidth: 1,
				}}
			/>
		</motion.svg>
	);
};

export const ProgressHandle = ({
	theme,
	stroke,
	fill,
	strokeWidth = handleStrokeWidth,
	hitArea = handleHitArea,
	size = undefined,
	style = undefined,
	onPointerDown = undefined,
	shadow = theme.drawing.selection.handle.shadow,
}) => {
	//const minSize = 9;
	//const strokeRadius = useTransform(() => (size.get() < minSize ? minSize / 2 : size.get() / 2));
	//const fillRadius = useTransform(() => strokeRadius.get() - strokeWidth);
	const strokeRadius = 4;
	const fillRadius = 3;
	return (
		<motion.svg
			style={{
				display: "block",
				position: "absolute",
				overflow: "visible",
				width: hitArea,
				height: hitArea,
				...style,
			}}
			filter={shadow}
			onPointerDown={onPointerDown}
		>
			{/* stroke */}
			<motion.circle cx={hitArea / 2} cy={hitArea / 2} r={strokeRadius} fill={stroke} />
			{/* fill */}
			<motion.circle cx={hitArea / 2} cy={hitArea / 2} r={fillRadius} fill={fill} />
		</motion.svg>
	);
};

/*
export const AddButton = ({
	theme,
	stroke,
	fill,
	strokeWidth = handleStrokeWidth,
	hitArea = handleHitArea,
	size = undefined,
	style = undefined,
	onPointerDown = undefined,
	shadow = theme.drawing.selection.handle.shadow,
}) => {
	//const minSize = 9;
	//const strokeRadius = useTransform(() => (size.get() < minSize ? minSize / 2 : size.get() / 2));
	//const fillRadius = useTransform(() => strokeRadius.get() - strokeWidth);
	const strokeRadius = 6;
	const fillRadius = 7;
	const lineR = 3.5;
	return (
		<motion.svg
			style={{
				display: "block",
				position: "absolute",
				overflow: "visible",
				width: hitArea,
				height: hitArea,
				pointerEvents: "auto",
				cursor: "pointer",
				...style,
			}}
			filter={shadow}
			onPointerDown={onPointerDown}
		>
			<motion.circle cx={hitArea / 2} cy={hitArea / 2} r={strokeRadius} fill={stroke} />
			<motion.circle cx={hitArea / 2} cy={hitArea / 2} r={fillRadius} fill={fill} />
			<motion.path d={`M${hitArea/2} ${hitArea/2 - lineR}L${hitArea/2} ${hitArea/2 + lineR}`} stroke={theme.colors.t9} strokeLinecap={"round"} strokeWidth={1.5}/>
			<motion.path d={`M${hitArea/2- lineR} ${hitArea/2 }L${hitArea/2 + lineR} ${hitArea/2 }`} stroke={theme.colors.t9} strokeLinecap={"round"} strokeWidth={1.5}/>
		</motion.svg>
	);
};
*/

export const AddButton = ({
	theme,
	stroke,
	fill,
	strokeWidth = handleStrokeWidth,
	hitArea = handleHitArea,
	size = undefined,
	style = undefined,
	onPointerDown = undefined,
	shadow = theme.drawing.selection.handle.shadow,
}) => {
	//const minSize = 9;
	//const strokeRadius = useTransform(() => (size.get() < minSize ? minSize / 2 : size.get() / 2));
	//const fillRadius = useTransform(() => strokeRadius.get() - strokeWidth);
	const strokeRadius = 6;
	const fillRadius = 7;
	const lineR = 3.5;
	return (
		<motion.svg
			style={{
				display: "block",
				position: "absolute",
				overflow: "visible",
				width: hitArea,
				height: hitArea,
				pointerEvents: "auto",
				cursor: "e-resize",
				...style,
			}}
			filter={shadow}
			onPointerDown={onPointerDown}
		>
			<motion.rect
				x={0}
				y={0}
				width={4}
				height={20}
				rx={2}
				fill={fill}
				stroke={stroke}
				strokeWidth={0.75}
				strokeOpacity={1}
			/>
		</motion.svg>
	);
};

import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

import { containerSize } from "../../tome/TileData";
import { TomeContext } from "../../tome/TomeContext";
import { PopoverContext } from "../popovers/PopoverContext";
import { selectedZ } from "../EditorContext";
import { Panels } from "../popovers/panels/panels";

export const CornerHandle = props => {
	const { handleInnerColor, handleOuterColor, handleRadius, handleStrokeWidth } = props;

	const handleHitArea = 10;

	let radius = handleRadius;
	let strokeWidth = handleStrokeWidth;
	let hitArea = handleHitArea;

	return (
		<span
			style={{
				display: "block",
				position: "absolute",
				pointerEvents: "none",
				width: hitArea + "px",
				height: hitArea + "px",
				...props.style,
				transform: `translate3d(${props.style.x}, ${props.style.y}, ${selectedZ + 10}px)`,
			}}
		>
			<span
				style={{
					display: "block",
					position: "absolute",
					top: "50%",
					left: "50%",
					pointerEvents: "none",
					borderRadius: "100%",
					backgroundColor: handleOuterColor,
					width: radius * 2 + strokeWidth * 2 + "px",
					height: radius * 2 + strokeWidth * 2 + "px",
					transform: `translateX(-50%) translateY(-50%)`,
					boxShadow: `0 0 1px 0 rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 0, 0, 0.08)`,
				}}
			/>
			<span
				style={{
					display: "block",
					position: "absolute",
					top: "50%",
					left: "50%",
					pointerEvents: "none",
					borderRadius: "100%",
					backgroundColor: handleInnerColor,
					width: radius * 2 + "px",
					height: radius * 2 + "px",
					transform: `translateX(-50%) translateY(-50%)`,
				}}
			/>
		</span>

		// <svg
		// 	style={{
		// 		display: "block",
		// 		position: "absolute",
		// 		overflow: "visible",
		// 		pointerEvents: "none",
		// 		width: hitArea + "px",
		// 		height: hitArea + "px",
		// 		...props.style,
		// 		transform: `translate3d(${props.style.x}, ${props.style.y}, ${selectedZ}px)`,
		// 	}}
		// 	filter={shadow}
		// >
		// 	{/* white outline */}
		// 	{circular && (
		// 		<circle cx={hitArea / 2} cy={hitArea / 2} r={radius + strokeWidth} fill={handleOuterColor} />
		// 	)}
		// 	{!circular && (
		// 		<rect x={squareX} y={squareY} width={squareSize} height={squareSize} fill={handleOuterColor} />
		// 	)}

		// 	{/* fill */}
		// 	{circular && <circle cx={hitArea / 2} cy={hitArea / 2} r={radius} fill={handleInnerColor} />}

		// 	{!circular && (
		// 		<rect
		// 			x={squareX + strokeWidth}
		// 			y={squareY + strokeWidth}
		// 			width={squareSize - strokeWidth * 2}
		// 			height={squareSize - strokeWidth * 2}
		// 			fill={handleInnerColor}
		// 		/>
		// 	)}
		// </svg>
	);
};

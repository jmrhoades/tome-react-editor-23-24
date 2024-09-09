import { motion, useTransform } from "framer-motion";
import { selectedZ } from "../EditorContext";
import styled from "styled-components";

const { roundCorners } = require("svg-round-corners");

export const BorderSVG = ({
	borderStyle = "solid",
	borderColor = "var(--tome-brand-accent)",
	borderWidth = 2,
	borderPosition = "center",
	borderRadius = 3,
	opacity = 1,
	z = 0,
	width,
	height,
	translate = true,
	resizeHandle,
}) => {
	const handleWeight = 5;
	const handleGap = 4;
	const maxLength = 24;

	//let borderRadius = 3;

	const cornerSize = borderRadius * 3;
	const cornerGap = 4;
	const cornerHoverSize = 8;

	const cornerHoverHandleGap = 6;
	const cornerHoverWeight = 5;

	//let handleHeight = maxLength;
	//let handleWidth = maxLength;

	
	let handleHeight = height.get() / 2;
	if (handleHeight > maxLength) handleHeight = maxLength;

	let handleWidth = width.get() / 2;
	if (handleWidth > maxLength) handleWidth = maxLength;
	
	
	


	const topLeftCornerPath = roundCorners(`M${cornerSize} 0 h-${cornerSize} v${cornerSize}`, borderRadius).path;
	const topLeftCornerHoverPath = roundCorners(
		`M${cornerHoverSize} 0 h-${cornerHoverSize} v${cornerHoverSize}`,
		cornerHoverSize
	).path;

	const topRightCornerPath = roundCorners(`M0 0 h${cornerSize} v${cornerSize}`, borderRadius).path;
	const topRightCornerHoverPath = roundCorners(`M0 0 h${cornerHoverSize} v${cornerHoverSize}`, borderRadius).path;

	const bottomLeftCornerPath = roundCorners(
		`M${cornerSize} ${cornerSize} h-${cornerSize} v-${cornerSize}`,
		borderRadius
	).path;

	const bottomLeftCornerHoverPath = roundCorners(
		`M${cornerHoverSize} ${cornerHoverSize} h-${cornerHoverSize} v-${cornerHoverSize}`,
		borderRadius
	).path;

	const bottomRightCornerPath = roundCorners(`M${cornerSize} 0 v${cornerSize} h-${cornerSize}`, borderRadius).path;
	const bottomRightCornerHoverPath = roundCorners(
		`M${cornerHoverSize} 0 v${cornerHoverSize} h-${cornerHoverSize}`,
		borderRadius
	).path;

	// const handleHeight = useTransform(height, v => {
	// 	let l = v / 3;
	// 	if (l > 44) l = 44;
	// 	return l;
	// });

	// const lineHeight = useTransform(height, v => {
	// 	let l = v / 3;
	// 	if (l > 44) l = 44;

	// 	let h = v - l - (handleGap * 2) / 2;

	// 	h = v / 2;

	// 	return h;
	// });

	// console.log("RENDER", resizeHandle, height.get(), width.get(), handleWidth);

	return (
		<span
			style={{
				display: "block",
				position: "absolute",
				pointerEvents: "none",
				opacity: opacity,
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				transform: `translate3d(0px, 0px, ${selectedZ + z}px)`,
				color: borderColor,
			}}
		>
			{/*
			 
			 Corners 
			 
			 */}

			{resizeHandle !== "top-left" && (
				<SVG
					viewBox={`0 0 ${cornerSize} ${cornerSize}`}
					style={{
						top: 0,
						left: 0,
						width: cornerSize + "px",
						height: cornerSize + "px",
					}}
				>
					<path d={topLeftCornerPath} />
				</SVG>
			)}

			{resizeHandle === "top-left" && (
				<SVG
					viewBox={`0 0 ${cornerHoverSize} ${cornerHoverSize}`}
					style={{
						top: 0,
						left: 0,
						width: cornerHoverSize + "px",
						height: cornerHoverSize + "px",
						strokeWidth: cornerHoverWeight + "px",
					}}
				>
					<path d={topLeftCornerHoverPath} />
				</SVG>
			)}

			{resizeHandle !== "top-right" && (
				<SVG
					viewBox={`0 0 ${cornerSize} ${cornerSize}`}
					style={{
						top: 0,
						right: 0,
						width: cornerSize + "px",
						height: cornerSize + "px",
					}}
				>
					<path d={topRightCornerPath} />
				</SVG>
			)}

			{resizeHandle === "top-right" && (
				<SVG
					viewBox={`0 0 ${cornerHoverSize} ${cornerHoverSize}`}
					style={{
						top: 0,
						right: 0,
						width: cornerHoverSize + "px",
						height: cornerHoverSize + "px",
						strokeWidth: cornerHoverWeight + "px",
					}}
				>
					<path d={topRightCornerHoverPath} />
				</SVG>
			)}

			{resizeHandle !== "bottom-left" && (
				<SVG
					viewBox={`0 0 ${cornerSize} ${cornerSize}`}
					style={{
						bottom: 0,
						left: 0,
						width: cornerSize + "px",
						height: cornerSize + "px",
					}}
				>
					<path d={bottomLeftCornerPath} />
				</SVG>
			)}

			{resizeHandle === "bottom-left" && (
				<SVG
					viewBox={`0 0 ${cornerHoverSize} ${cornerHoverSize}`}
					style={{
						bottom: 0,
						left: 0,
						width: cornerHoverSize + "px",
						height: cornerHoverSize + "px",
						strokeWidth: cornerHoverWeight + "px",
					}}
				>
					<path d={bottomLeftCornerHoverPath} />
				</SVG>
			)}

			{resizeHandle !== "bottom-right" && (
				<SVG
					viewBox={`0 0 ${cornerSize} ${cornerSize}`}
					style={{
						bottom: 0,
						right: 0,
						width: cornerSize + "px",
						height: cornerSize + "px",
					}}
				>
					<path d={bottomRightCornerPath} />
				</SVG>
			)}

			{resizeHandle === "bottom-right" && (
				<SVG
					viewBox={`0 0 ${cornerHoverSize} ${cornerHoverSize}`}
					style={{
						bottom: 0,
						right: 0,
						width: cornerHoverSize + "px",
						height: cornerHoverSize + "px",
						strokeWidth: cornerHoverWeight + "px",
					}}
				>
					<path d={bottomRightCornerHoverPath} />
				</SVG>
			)}

			{/*
			 
			 Lines 
			 
			 */}

			{resizeHandle !== "top" && resizeHandle !== "top-left" && (
				<Line
					style={{
						top: -borderWidth / 2 + "px",
						left: cornerSize + "px",
						width:
							resizeHandle !== "top-right"
								? `calc(100% - ${cornerSize * 2}px)`
								: `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`,
						height: borderWidth + "px",
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "top-left" && (
				<Line
					style={{
						top: -borderWidth / 2 + "px",
						right: cornerSize + "px",
						width: `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`,
						height: borderWidth + "px",
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "top" && (
				<>
					<Line
						style={{
							top: -borderWidth / 2 + "px",
							left: cornerSize + "px",
							width: `calc(50% - ${cornerSize + handleWidth / 2 + handleGap}px)`,
							height: borderWidth + "px",
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							top: -borderWidth / 2 + "px",
							right: cornerSize + "px",
							width: `calc(50% - ${cornerSize + handleWidth / 2 + handleGap}px)`,
							height: borderWidth + "px",
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							top: -handleWeight / 2 + "px",
							left: "50%",
							transform: "translateX(-50%)",
							width: handleWidth + "px",
							height: handleWeight + "px",
							backgroundColor: borderColor,
						}}
					/>
				</>
			)}

			{resizeHandle !== "bottom" && resizeHandle !== "bottom-left" && (
				<Line
					style={{
						bottom: -borderWidth / 2 + "px",
						left: cornerSize + "px",
						width:
							resizeHandle !== "bottom-right"
								? `calc(100% - ${cornerSize * 2}px)`
								: `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`,
						height: borderWidth + "px",
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "bottom-left" && (
				<Line
					style={{
						bottom: -borderWidth / 2 + "px",
						right: cornerSize + "px",
						width: `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`,
						height: borderWidth + "px",
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "bottom" && (
				<>
					<Line
						style={{
							bottom: -borderWidth / 2 + "px",
							left: cornerSize + "px",
							width: `calc(50% - ${cornerSize + handleWidth / 2 + handleGap}px)`,
							height: borderWidth + "px",
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							bottom: -borderWidth / 2 + "px",
							right: cornerSize + "px",
							width: `calc(50% - ${cornerSize + handleWidth / 2 + handleGap}px)`,
							height: borderWidth + "px",
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							bottom: -handleWeight / 2 + "px",
							left: "50%",
							transform: "translateX(-50%)",
							width: handleWidth + "px",
							height: handleWeight + "px",
							backgroundColor: borderColor,
						}}
					/>
				</>
			)}

			{resizeHandle !== "left" && resizeHandle !== "top-left" && (
				<Line
					style={{
						top: cornerSize + "px",
						left: -borderWidth / 2 + "px",
						width: borderWidth + "px",
						height:
							resizeHandle === "bottom-left"
								? `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`
								: `calc(100% - ${cornerSize * 2}px)`,
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "top-left" && (
				<Line
					style={{
						bottom: cornerSize + "px",
						left: -borderWidth / 2 + "px",
						width: borderWidth + "px",
						height: `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`,
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "left" && (
				<>
					<Line
						style={{
							top: cornerSize + "px",
							left: -borderWidth / 2 + "px",
							width: borderWidth + "px",
							height: `calc(50% - ${cornerSize + handleHeight / 2 + handleGap}px)`,
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							bottom: cornerSize + "px",
							left: -borderWidth / 2 + "px",
							width: borderWidth + "px",
							height: `calc(50% - ${cornerSize + handleHeight / 2 + handleGap}px)`,
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							top: "50%",
							left: -handleWeight / 2 + "px",
							transform: "translateY(-50%)",
							width: handleWeight + "px",
							height: handleHeight + "px",
							backgroundColor: borderColor,
						}}
					/>
				</>
			)}

			{resizeHandle !== "right" && resizeHandle !== "top-right" && (
				<Line
					style={{
						top: cornerSize + "px",
						right: -borderWidth / 2 + "px",
						width: borderWidth + "px",
						height:
							resizeHandle === "bottom-right"
								? `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`
								: `calc(100% - ${cornerSize * 2}px)`,
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "top-right" && (
				<Line
					style={{
						bottom: cornerSize + "px",
						right: -borderWidth / 2 + "px",
						width: borderWidth + "px",
						height: `calc(100% - ${cornerHoverSize + cornerSize + cornerHoverHandleGap}px)`,
						backgroundColor: borderColor,
					}}
				/>
			)}

			{resizeHandle === "right" && (
				<>
					<Line
						style={{
							top: cornerSize + "px",
							right: -borderWidth / 2 + "px",
							width: borderWidth + "px",
							height: `calc(50% - ${cornerSize + handleHeight / 2 + handleGap}px)`,
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							bottom: cornerSize + "px",
							right: -borderWidth / 2 + "px",
							width: borderWidth + "px",
							height: `calc(50% - ${cornerSize + handleHeight / 2 + handleGap}px)`,
							backgroundColor: borderColor,
						}}
					/>

					<Line
						style={{
							top: "50%",
							right: -handleWeight / 2 + "px",
							transform: "translateY(-50%)",
							width: handleWeight + "px",
							height: handleHeight + "px",
							backgroundColor: borderColor,
						}}
					/>
				</>
			)}
		</span>
	);
};

const SVG = styled.svg`
	display: block;
	pointer-events: none;
	position: absolute;
	overflow: visible;
	fill: none;
	stroke: currentcolor;
	stroke-width: 2px;
	stroke-linecap: round;
`;

const Line = styled(motion.span)`
	display: block;
	pointer-events: none;
	position: absolute;
	overflow: visible;
	border-radius: 3px;
`;

const Corner = styled.span`
	display: block;
	pointer-events: none;
	position: absolute;
	overflow: visible;
`;

export const Border = ({
	borderStyle = "solid",
	borderColor = "var(--tome-brand-accent)",
	borderWidth = 2,
	borderPosition = "center",
	borderRadius = 3,
	opacity = 1,
	z = 0,
	translate = true,
}) => {
	// Center stroke
	let borderOffset =  -borderWidth / 2;

	// Outer stroke
	if (borderPosition === "outer") {
		borderOffset = 0;
	}

	// Inner stroke
	if (borderPosition === "inner") {
		borderOffset =  -borderWidth;
	}

	return (
		<span
			style={{
				display: "block",
				position: "absolute",
				pointerEvents: "none",
				opacity: opacity,

				top: 0,
				left: 0,
				width: "100%",
				height: "100%",

				outlineStyle: borderStyle,
				outlineWidth: borderWidth + "px",
				outlineColor: borderColor,
				outlineOffset: borderOffset + "px",

				borderRadius: borderRadius + "px",

				transform: `translate3d(0px, 0px, ${selectedZ + z}px)`,
			}}
		/>
	);
};

export const BorderOutsideHandle = ({
	borderStyle = "solid",
	borderColor = "var(--tome-brand-accent)",
	borderWidth = 2,
	borderPosition = "center",
	borderRadius = 3,
	opacity = 1,
	z = 0,
	width,
	height,
	translate = true,
	resizeHandle,
}) => {
	const handleWeight = 4;
	const handleGap = 3;
	const maxLength = 24;

	//let borderRadius = 3;

	const cornerRadius = borderRadius + handleGap;
	const cornerOffset = 6;

	//let handleHeight = height.get() / 3;
	//if (handleHeight > 44) handleHeight = maxLength;

	//let handleWidth = width.get() / 3;
	//if (handleWidth > 44) handleWidth = maxLength;

	//let cornerLength = handleHeight > handleWidth ? handleWidth / 2 : handleHeight / 2;
	//if (cornerLength < 12) cornerLength = 12;
	
	let cornerLength = 12;
	let handleWidth = maxLength;
	let handleHeight = maxLength;


	const topLeftCornerPath = roundCorners(`M${cornerLength} 0 h-${cornerLength} v${cornerLength}`, cornerRadius).path;

	const topRightCornerPath = roundCorners(`M0 0 h${cornerLength} v${cornerLength}`, cornerRadius).path;

	const bottomLeftCornerPath = roundCorners(
		`M${cornerLength} ${cornerLength} h-${cornerLength} v-${cornerLength}`,
		cornerRadius
	).path;

	const bottomRightCornerPath = roundCorners(
		`M${cornerLength} 0 v${cornerLength} h-${cornerLength}`,
		cornerRadius
	).path;

	return (
		<span
			style={{
				display: "block",
				position: "absolute",
				pointerEvents: "none",
				opacity: opacity,
				inset: 0,

				outlineStyle: borderStyle,
				outlineWidth: borderWidth + "px",
				outlineColor: borderColor,
				outlineOffset: -borderWidth / 2 + "px",

				borderRadius: borderRadius + "px",

				transform: `translate3d(0px, 0px, ${selectedZ + z}px)`,
			}}
		>
			{resizeHandle === "top" && (
				<>
					<Line
						style={{
							width: handleWidth + "px",
							height: handleWeight + "px",
							backgroundColor: borderColor,
							top: -borderWidth / 2 - handleWeight - handleGap + "px",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					/>
				</>
			)}

			{resizeHandle === "bottom" && (
				<>
					<Line
						style={{
							width: handleWidth + "px",
							height: handleWeight + "px",
							backgroundColor: borderColor,
							bottom: -borderWidth / 2 - handleWeight - handleGap + "px",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					/>
				</>
			)}

			{resizeHandle === "left" && (
				<>
					<Line
						style={{
							width: handleWeight + "px",
							height: handleHeight + "px",
							backgroundColor: borderColor,
							top: "50%",
							left: -borderWidth / 2 - handleWeight - handleGap + "px",
							transform: "translateY(-50%)",
						}}
					/>
				</>
			)}
			{resizeHandle === "right" && (
				<>
					<Line
						style={{
							width: handleWeight + "px",
							height: handleHeight + "px",
							backgroundColor: borderColor,
							top: "50%",
							right: -borderWidth / 2 - handleWeight - handleGap + "px",
							transform: "translateY(-50%)",
						}}
					/>
				</>
			)}

			{resizeHandle === "top-left" && (
				<SVG
					viewBox={`0 0 ${cornerLength} ${cornerLength}`}
					style={{
						top: 0,
						left: 0,
						transform: `translateX(-${cornerOffset}px) translateY(-${cornerOffset}px)`,
						width: cornerLength + "px",
						height: cornerLength + "px",
						strokeWidth: handleWeight + "px",
						stroke: borderColor,
					}}
				>
					<path d={topLeftCornerPath} />
				</SVG>
			)}

			{resizeHandle === "top-right" && (
				<SVG
					viewBox={`0 0 ${cornerLength} ${cornerLength}`}
					style={{
						top: 0,
						right: 0,
						transform: `translateX(${cornerOffset}px) translateY(-${cornerOffset}px)`,
						width: cornerLength + "px",
						height: cornerLength + "px",
						strokeWidth: handleWeight + "px",
						stroke: borderColor,
					}}
				>
					<path d={topRightCornerPath} />
				</SVG>
			)}

			{resizeHandle === "bottom-right" && (
				<SVG
					viewBox={`0 0 ${cornerLength} ${cornerLength}`}
					style={{
						bottom: 0,
						right: 0,
						transform: `translateX(${cornerOffset}px) translateY(${cornerOffset}px)`,
						width: cornerLength + "px",
						height: cornerLength + "px",
						strokeWidth: handleWeight + "px",
						stroke: borderColor,
					}}
				>
					<path d={bottomRightCornerPath} />
				</SVG>
			)}

			{resizeHandle === "bottom-left" && (
				<SVG
					viewBox={`0 0 ${cornerLength} ${cornerLength}`}
					style={{
						bottom: 0,
						left: 0,
						transform: `translateX(${-cornerOffset}px) translateY(${cornerOffset}px)`,
						width: cornerLength + "px",
						height: cornerLength + "px",
						strokeWidth: handleWeight + "px",
						stroke: borderColor,
					}}
				>
					<path d={bottomLeftCornerPath} />
				</SVG>
			)}

			{/* {resizeHandle === "top-left" && (
				<>
					<Corner
						style={{
							width: cornerLength + "px",
							height: cornerLength + "px",
							top: 0,
							left: 0,

							borderColor: borderColor,
							borderTopStyle: "solid",
							borderLeftStyle: "solid",
							borderTopWidth: handleWeight + "px",
							borderLeftWidth: handleWeight + "px",
							borderRadius: "7px",

							transform: "translateX(-50%) translateY(-50%)",
						}}
					/>
				</>
			)} */}
		</span>
	);
};

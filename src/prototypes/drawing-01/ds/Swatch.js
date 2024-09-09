import React from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import chroma from "chroma-js";
import { colorType } from "../panel/controls/Color";
import { gradient } from "../../../ds/GradientImage";
import { Icon } from "../../../ds/Icon";

export const FillColor = ({
	theme,
	width = 18,
	height = 18,
	borderRadius = "50%",
	//color = theme.colors.accent,
	motionColor,
	style = undefined,
}) => {
	const foreground = motionColor.get();
	const background = theme.colors.z3;
	//const contrast = chroma.contrast(foreground, background);
	let boxShadow = useMotionValue(`0 0 0 1px ${theme.colors.t3} inset`);

	const [transparent, setTransparent] = React.useState(foreground === "transparent");

	// Listen for color changes
	useMotionValueEvent(motionColor, "change", latest => {
		console.log(latest);
		setTransparent(latest === "transparent");

		if (latest === "#000000" || latest === "#1F1F1F") {
			boxShadow.set(`0 0 0 1px ${theme.colors.t3}`);
		} else {
			boxShadow.set(`0 0 0 1px ${theme.colors.t3} inset`);
		}
	
	});


	
	return (
		<>
			{!transparent && (
				<motion.div
					style={{
						position: "relative",
						width: width,
						height: height,
						borderRadius: borderRadius,
						backgroundColor: motionColor,
						boxShadow: boxShadow,
						...style,
					}}
				/>
			)}
			{transparent && (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle
						cx="7.5"
						cy="7.5"
						r="6.75"
						transform="matrix(-1 0 0 1 17.5 2.5)"
						stroke={theme.colors.t6}
						strokeWidth="1.5"
					/>
					<rect
						x="4.51996"
						y="5.58058"
						width="1.5"
						height="14"
						rx="0.75"
						transform="rotate(-45 4.51996 5.58058)"
						fill="#FF443B"
					/>
				</svg>
			)}
		</>
	);
};

export const ColorSwatch = ({
	theme,
	width = 18,
	height = 18,
	borderRadius = "50%",
	color = theme.colors.accent,
	style = undefined,
	type = colorType.FILL,
}) => {
	const foreground = color;
	const background = theme.colors.z3;

	//const contrast = chroma.contrast(foreground, background);

	let boxShadow = `0 0 0 1px ${theme.colors.t3} inset`;

	if (color === "#000000" || color === "#1F1F1F") {
		boxShadow = `0 0 0 1px ${theme.colors.t3}`;
	}

	return (
		<>
			{type === colorType.FILL && (
				<motion.div
					className="color"
					style={{
						position: "relative",
						width: width,
						height: height,
						borderRadius: borderRadius,
						backgroundColor: foreground,
						boxShadow: boxShadow,
						...style,
					}}
				/>
			)}

			{type === colorType.PICKER && (
				<motion.svg width={width} height={height} viewBox={`0 0 ${width} ${width}`} fill="none" initial={false}>
					<rect width={width} height={width} rx={width / 2} fill="url(#pattern0)" fillOpacity="0.9" />
					<defs>
						<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlinkHref="#image0_5_6217" transform="scale(0.00217391)" />
						</pattern>
						<image id="image0_5_6217" width="460" height="460" xlinkHref={gradient} />
					</defs>
				</motion.svg>
			)}

			{type === colorType.CLEAR && (
				<motion.div
					style={{
						width: width,
						height: height,
						x: -(24 - width) / 2,
						y: -(24 - width) / 2,
					}}
				>
					<Icon name="CircleRemove" size={24} opacity={1} color={theme.colors.t5} />
				</motion.div>
			)}
		</>
	);
};

export const Stroke = ({
	theme,
	width = 20,
	height = 20,
	borderRadius = "50%",
	color = theme.colors.accent,
	style = undefined,
}) => {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect
				x="15.3033"
				y="1.86827"
				width="4"
				height="19"
				rx="2"
				transform="rotate(45 15.3033 1.86827)"
				stroke={theme.colors.t6}
				strokeWidth="1.5"
			/>
			<rect
				x="4.51996"
				y="5.58058"
				width="1.5"
				height="14"
				rx="0.75"
				transform="rotate(-45 4.51996 5.58058)"
				fill="#FF443B"
			/>
		</svg>
	);
};

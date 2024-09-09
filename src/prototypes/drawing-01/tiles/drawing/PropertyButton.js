import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";

import { BlockType as DiagramBlockType } from "./_constants";
import { FillColor, Stroke, ColorSwatch } from "../../ds/Swatch";
import { Icon } from "../../../../ds/Icon";

export const PropertyButtonType = {
	FILL_COLOR: "fillColor",
	ICON: "icon",
	STROKE: "stroke",
	COLOR: "color",
};

export const PropertyButton = ({
	type = PropertyButtonType.ICON,
	theme,
	size = 26,
	width = size,
	height = size,
	borderRadius = 6,
	iconSize = 22,
	iconColor = theme.colors.t9,
	color = theme.colors.accent,
	style = undefined,
	motionColor = undefined,
	onTap = undefined,
	active = false,
	colorType,
}) => {
	//console.log("propertyButton", type);
	const hoverOpacity = useMotionValue(0);
	return (
		<motion.div
			style={{
				width: width,
				height: height,
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				cursor: "pointer",
			}}
			onHoverStart={e => {
				hoverOpacity.set(1);
			}}
			onHoverEnd={e => {
				hoverOpacity.set(0);
			}}
			onTap={onTap}
		>
			{!active && (
				<motion.div
					className="hoverBackground"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: size,
						height: size,
						x: "-50%",
						y: "-50%",
						borderRadius: borderRadius,
						backgroundColor: theme.colors.t2,
						opacity: active ? 1 : hoverOpacity,
						transition: "opacity 0.2s ease",
					}}
				/>
			)}

			{active && (
				<motion.div
					className="activeBackground"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: size,
						height: size,
						x: "-50%",
						y: "-50%",
						borderRadius: borderRadius,
						backgroundColor: theme.colors.t2,
					}}
				/>
			)}

			{type === PropertyButtonType.FILL_COLOR && <FillColor theme={theme} motionColor={motionColor} />}
			{type === PropertyButtonType.COLOR && <ColorSwatch theme={theme} color={color} type={colorType} />}
			{type === PropertyButtonType.STROKE && <Stroke theme={theme} />}
			{type === PropertyButtonType.ICON && <Icon name="Text" opacity={1} size={iconSize} color={iconColor} />}
		</motion.div>
	);
};

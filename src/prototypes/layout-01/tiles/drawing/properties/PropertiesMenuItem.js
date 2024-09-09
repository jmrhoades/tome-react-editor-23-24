import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../../../ds/Icon";
import { buttonLabelStyles } from "../../../ds/Buttons";

const Button = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2px 4px;
`;
const Leading = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Trailing = styled(motion.div)`
	position: relative;
`;

const Label = styled(motion.div)``;

const HoverBg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
`;

export const PropertiesMenuItem = ({
	theme,
	leadingIcon = undefined,
	label = "None",
	trailingIcon = "Checkmark",
	labelStyle = {},
	active = false,
	onTap,
}) => {
	const foregroundColor = theme.colors.t9;
	const hoverOpacity = useMotionValue(0);
	const activeOpacity = active ? 1 : 0;
	return (
		<Button
			style={{
				...buttonLabelStyles,
				position: "relative",
				display: "flex",
				alignItems: "center",
				gap: 8,
				pointerEvents: "auto",
				color: foregroundColor,
				paddingTop: 4,
				paddingBottom: 4,
				paddingLeft: 4,
				paddingRight: 4,
				cursor: active ? "default" : "pointer",
			}}
			onHoverStart={e => {
				hoverOpacity.set(1);
			}}
			onHoverEnd={e => {
				hoverOpacity.set(0);
			}}
			onTap={active ? undefined : onTap}
		>
			{!active && (
				<HoverBg
					style={{
						backgroundColor: theme.colors.t4,
						borderRadius: 4,
						opacity: hoverOpacity,
						transition: "opacity 0.2s ease",
					}}
				/>
			)}

			<Leading>
				{leadingIcon && <Icon name={leadingIcon} size={16} color={foregroundColor} />}
				<Label
					style={{
						...labelStyle,
					}}
				>
					{label}
				</Label>
			</Leading>

			<Trailing
				style={{
					opacity: activeOpacity,
					transition: "opacity 0.2s ease",
				}}
			>
				<Icon name={trailingIcon} size={16} color={foregroundColor} />
			</Trailing>
		</Button>
	);
};

export const Divider = ({ theme, vertical = false }) => {
	
	const color = theme.colors.t2;

	const styleHorizontal = {
		height: "1px",
		position: "absolute",
		top: "50%",
		left: "0px",
		right: "0px",
		transform: "translateY(-50%)",
		backgroundColor: color,
		//boxShadow: `0 0.5px 0 0 ${theme.colors.t3}`
	};

	const styleVertical = {
		width: "1px",
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%)",
		top: "4px",
		bottom: "4px",
		backgroundColor: color,
		//boxShadow: `0 0.5px 0 0 ${theme.colors.t3}`
	};

	const style = vertical ? styleVertical : styleHorizontal;
	const width = vertical ? "4px" : "100%";
	const height = vertical ? "20px" : "1px";

	return (
		<div
			style={{
				flexShrink: 0,
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: width,
				height: height,
			}}
		>
			<div
				style={{
					...style,
				}}
			></div>
		</div>
	);
};

export const Header = ({ theme, label }) => {
	return (
		<div
			style={{
				position: "relative",
				padding: "4px",
				alignSelf: "stretch",
				fontSize: "12px",
				fontWeight: 400,
				lineHeight: "16px",
				color: theme.colors.t7,
			}}
		>
			{label}
		</div>
	);
};

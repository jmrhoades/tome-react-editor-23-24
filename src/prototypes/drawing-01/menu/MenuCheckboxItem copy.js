import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { Icon } from "../../../ds/Icon";
import { Switch } from "../ds/Switch";

import { MetricsContext } from "../tome/MetricsContext";

const Item = styled(motion.div)`
	position: relative;

	display: grid;
	align-items: center;
	margin-bottom: 4px;
	:last-child {
		margin-bottom: 0;
	}
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
	/* -moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02"; */
`;

const HoverBg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const CheckboxContainer = styled(motion.div)`
	position: relative;
	width: 16px;
	height: 16px;
`;

const CheckboxBgOff = styled(HoverBg)``;
const CheckboxBgOn = styled(CheckboxBgOff)``;

export const MenuCheckboxItem = props => {
	const [isHovering, setIsHovering] = React.useState(false);

	let iconColor = props.theme.colors.menu.icon;
	let iconHoverColor = props.theme.colors.menu.iconHover;
	let labelColor = props.theme.colors.menu.label;
	let labelHoverColor = props.theme.colors.menu.labelHover;
	let checkmarkColor = "white";

	let backgroundHoverColor = props.theme.colors.t2;

	if (props.isOn) {
		iconColor = props.theme.colors.t9;
		labelColor = props.theme.colors.t9;
		if (props.disabled) {
			//iconColor = props.theme.colors.t5;
			//labelColor = props.theme.colors.t5;
			//checkmarkColor = props.theme.colors.t8;
		}
	}

	const padding = "6px 3px 6px 6px";
	const borderRadius = 6;
	let gridTemplateColumns = "28px 1fr 20px";

	return (
		<Item
			style={{
				width: "100%",
				gridTemplateColumns,
				padding,
				cursor: props.disabled ? "default" : "pointer",
			}}
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onTap={props.disabled ? null : props.onTap}
		>
			<HoverBg
				style={{
					borderRadius,
					background: backgroundHoverColor,
					opacity: isHovering && !props.disabled ? 1 : 0,
				}}
			/>

			<Icon
				name={props.icon}
				opacity={1}
				color={iconColor}
				size={20}
				transition={{
					duration: 0.2,
				}}
			/>

			<Label style={{ color: labelColor }}>{props.label}</Label>

			<CheckboxContainer>
				<CheckboxBgOff
					style={{
						borderRadius: 3,
						backgroundColor: props.theme.colors.t2,
						opacity: props.disabled ? 0 : 1,
					}}
				/>
				{props.isOn && (
					<CheckboxBgOn
						style={{
							borderRadius: 3,
							backgroundColor: props.theme.colors.accent,
							opacity: props.disabled ? 0 : 1,
						}}
					/>
				)}
				{props.isOn && (
					<motion.svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{ position: "relative", y: -7 }}
					>
						<path
							d="M4.25 8.25L7.25 10.75L12.25 4.75"
							stroke={checkmarkColor}
							stroke-width="1.75"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</motion.svg>
				)}
			</CheckboxContainer>
		</Item>
	);
};

const Separator = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SeparatorLine = styled(motion.div)`
	position: relative;
`;

export const MenuSeparator = props => {
	return (
		<Separator
			style={{
				height: 12,
				padding: "0",
				marginLeft: -6,
				marginRight: -6,
				...props.style,
			}}
		>
			<SeparatorLine
				style={{
					height: 1,
					width: "100%",
					backgroundColor: props.theme.colors.t2,
				}}
			/>
		</Separator>
	);
};

const Header = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 11px;
	line-height: 13px;
`;

export const MenuHeader = props => {
	return (
		<Header
			style={{
				padding: "5px 8px",
				color: props.theme.colors.t7,
			}}
		>
			{props.label}
		</Header>
	);
};

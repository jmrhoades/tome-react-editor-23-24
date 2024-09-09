import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { Icon } from "../../../ds/Icon";
import { Switch } from "../ds/Switch";



const Item = styled(motion.div)`
	position: relative;

	display: grid;
	align-items: center;
	:last-child {
		margin-bottom: 0;
	}
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
	position: relative;
	/* -moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02"; */
`;

const Bg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const ActiveBg = styled(Bg)``;

const CheckboxContainer = styled(motion.div)`
	position: relative;
	width: 20px;
	height: 20px;
`;

const CheckboxBgOff = styled(Bg)``;
const CheckboxBgOn = styled(CheckboxBgOff)``;

export const MenuCheckboxItem = props => {
	const [isHovering, setIsHovering] = React.useState(false);

	let labelColor = props.theme.colors.t7;
	let iconColor = props.theme.colors.t7;
	let backgroundColor = props.theme.colors.z3;
	let activeBackgroundColor = props.theme.colors.z5;

	if (props.isOn) {
		backgroundColor = props.theme.colors.z5;
		iconColor = props.theme.colors.t9;
		labelColor = props.theme.colors.t9;
	} else {
		if (isHovering) {
			//iconColor = props.theme.colors.t9;
			//labelColor = props.theme.colors.t9;
		}
	}

	const padding = "6px 6px";
	const borderRadius = 6;
	let gridTemplateColumns = "26px 1fr 20px";

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
			// whileTap={{
			// 	scale: props.disabled ? 1:  0.975
			// }}
			onTap={
				props.disabled
					? null
					: e => {
							setIsHovering(false);
							props.onTap();
					  }
			}
		>
			{/* <Bg
				style={{
					borderRadius,
					background: backgroundColor,
				}}
			/>

			<ActiveBg
				style={{
					borderRadius,
					background: activeBackgroundColor,
				}}
				initial={false}
				animate={{
					opacity: props.isOn ? 1 : 0
				}}
				transition={{
					duration: 0.1,
				}}
			/> */}

			{/* <HoverBg
				style={{
					borderRadius,
					background: backgroundHoverColor,
					opacity: isHovering && !props.disabled && !props.isOn ? 1 : 0,
				}}
			/> */}

			<Icon name={props.icon} opacity={1} color={iconColor} size={20} />

			<Label style={{ color: labelColor }}>{props.label}</Label>

			{/* <Switch isSmall={true} theme={props.theme} isOn={props.isOn} /> */}

			<CheckboxContainer
				style={{
					opacity: props.disabled ? 0.4 : 1,
				}}
			>
				

				{!props.isOn && (
					<svg width="20" height="20" viewBox="0 0 20 20"  style={{display: "block"}}>
						<path
							d="M3.125 5.625C3.125 4.24429 4.24429 3.125 5.625 3.125H14.375C15.7557 3.125 16.875 4.24429 16.875 5.625V14.375C16.875 15.7557 15.7557 16.875 14.375 16.875H5.625C4.24429 16.875 3.125 15.7557 3.125 14.375V5.625Z"
							fill="white"
							fillOpacity="0.08"
						/>
					</svg>
				)}

				{props.isOn && (
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}}>
						<rect x="5" y="5" width="10" height="10" fill="white" />
						<path
							fillrule="evenodd"
							cliprule="evenodd"
							d="M5.625 3.125C4.24429 3.125 3.125 4.24429 3.125 5.625V14.375C3.125 15.7557 4.24429 16.875 5.625 16.875H14.375C15.7557 16.875 16.875 15.7557 16.875 14.375V5.625C16.875 4.24429 15.7557 3.125 14.375 3.125H5.625ZM13.4883 6.67891C13.7692 6.87954 13.8342 7.26988 13.6336 7.55077L9.72733 13.0195C9.61441 13.1776 9.43438 13.2742 9.24021 13.2809C9.04603 13.2875 8.8598 13.2035 8.73629 13.0536L6.54879 10.3973C6.32936 10.1309 6.36748 9.73697 6.63393 9.51753C6.90038 9.2981 7.29427 9.33622 7.5137 9.60267L9.18351 11.6303L12.6164 6.82422C12.817 6.54333 13.2074 6.47828 13.4883 6.67891Z"
							fill="#ED00EB"
						/>
					</svg>
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

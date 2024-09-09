import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { Icon } from "../../../ds/Icon";
import { Switch } from "../ds/Switch";



const Item = styled(motion.div)`
	position: relative;
	/* cursor: pointer; */
	display: grid;
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	-moz-font-feature-settings: "ss02";
  	-webkit-font-feature-settings: "ss02";
  	font-feature-settings: "ss02";
`;

const Accessory = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
`;

const Hover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

export const MenuItem = props => {
	const [isHovering, setIsHovering] = React.useState(false);

	let iconColor = props.theme.colors.menu.icon;
	let iconHoverColor = props.theme.colors.menu.iconHover;
	let labelColor = props.theme.colors.menu.label;
	let labelHoverColor = props.theme.colors.menu.labelHover;
	let backgroundHoverColor = props.theme.colors.menu.backgroundHover;

	if (props.label === "Delete") {
		iconColor = props.theme.colors.delete;
		labelColor = props.theme.colors.delete;
		backgroundHoverColor = props.theme.colors.delete;
	}

	if (props.selected) {
		iconColor = props.theme.colors.t9;
		labelColor = props.theme.colors.t9;
	}

	const padding = "6px 8px";
	const borderRadius = 6;
	const hasAccessory = props.hasSwitch || props.hasCheckmark;
	let gridTemplateColumns = "1fr 16px";
	if (props.icon) gridTemplateColumns = "24px 1fr";
	if (props.icon && props.hasCheckmark) gridTemplateColumns = "24px 1fr 16px";
	if (props.icon && props.hasSwitch) gridTemplateColumns = "24px 1fr 48px";

	const getAccessory = (isHover = false) => {
		return (
			<Accessory>
				{props.hasSwitch && <Switch theme={props.theme} isOn={props.isOn} isSmall={true} />}
				{props.hasCheckmark && (
					<Icon name={"Checkmark"} opacity={1} color={isHover ? iconHoverColor : iconColor} size={16} />
				)}
			</Accessory>
		);
	};

	return (
		<Item
			style={{
				width: "100%",
				gridTemplateColumns,
				padding,
			}}
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onTap={props.onTap}
		>
			{props.icon && (
				<Icon
					name={props.icon}
					opacity={props.hasSwitch && !props.isOn ? 0.4 : 1}
					color={iconColor}
					size={20}
					transition={{
						duration: 0.2,
					}}
				/>
			)}

			<Label
				style={{ color: labelColor }}
				animate={{ opacity: props.hasSwitch && !props.isOn ? 0.4 : 1 }}
				transition={{
					duration: 0.2,
				}}
			>
				{props.label}
			</Label>

			{hasAccessory && getAccessory()}
			{!props.hasSwitch && (
				<Hover
					style={{
						display: "grid",
						gridTemplateColumns,
						padding,
						borderRadius,
						background: backgroundHoverColor,
						opacity: isHovering ? 1 : 0,
					}}
				>
					{props.icon && <Icon name={props.icon} opacity={1} color={iconHoverColor} size={16} />}
					<Label style={{ color: labelHoverColor }}>{props.label}</Label>
					{hasAccessory && getAccessory(true)}
				</Hover>
			)}
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
				marginLeft:-6,
				marginRight:-6,
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

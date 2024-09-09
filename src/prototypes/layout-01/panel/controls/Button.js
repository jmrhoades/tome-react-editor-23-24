import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import chroma from "chroma-js";

import { Icon } from "../../../../ds/Icon";

export const buttonType = {
	ICON: "icon",
	LABEL: "label",
	COLOR: "color",
};

const Wrap = styled(motion.div)`
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	height: 28px;
	background: ${props => props.theme_background};
	//flex-basis: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	width: 100%;
`;

const WrapColor = styled(Wrap)`
	justify-content: flex-start;
	/* align-items: flex-start; */
	gap: 8px;
`;

const Label = styled(motion.div)`
	line-height: 1;
	pointer-events: none;
	
	font-size: 13px;
	font-weight: 400;
	-moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02";
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: ${props => props.theme_color};
`;

const Color = styled(motion.div)`
	width: 15px;
	height: 15px;
	border-radius: 100%;
`;

const variants = {
	active: {
		scale: 1,
	},
	pressing: {
		scale: 0.98,
	},
	hovering: {
		scale: 1,
	},
};

export const Button = props => {
	return (
		<Wrap
			theme_background={props.theme.colors.t2}
			id={props.id}
			variants={variants}
			whileHover={"hovering"}
			whileTap={"pressing"}
			onTap={props.onTap}
			onMouseDown={e => {
				e.preventDefault();
				e.stopPropagation();
			}}
			style={{
				...props.style,
			}}
		>
			<SelectedBackground
				theme_color={props.theme.colors.t2}
				initial={{ opacity: 0 }}
				animate={{ opacity: props.active ? 1 : 0 }}
				whileHover={{ opacity: 1 }}
				transition={{
					type: "tween",
					duration: 0.2,
				}}
			/>

			{props.type === buttonType.ICON && (
				<Icon
					name={props.iconName}
					size={24}
					opacity={1}
					color={props.active ? props.theme.colors.t9 : props.theme.colors.t7}
					// animate={{ color: props.active ? props.theme.colors.t9 : props.theme.colors.t7 }}
					transition={{
						type: "tween",
						duration: props.active ? 0.4 : 0.2,
					}}
				/>
			)}

			{props.type === buttonType.LABEL && (
				<Label
					style={{
						...props.labelStyle,
						y: -0.5,
					}}
					animate={{ color: props.active ? props.theme.colors.t7 : props.theme.colors.t7 }}
					transition={{
						type: "tween",
						duration: props.active ? 0.4 : 0.2,
					}}
				>
					{props.label}
				</Label>
			)}
		</Wrap>
	);
};

export const ColorButton = props => {
	const colorLabel = chroma(props.color).hex("rgb").substring(1).toUpperCase();

	
	let boxShadow = `0 0 0 1px ${props.theme.colors.t3}`;
	if (props.color.toLowerCase() === "transparent") {
		boxShadow = `0 0 0 1px ${props.theme.colors.t3}`;
	}

	return (
		<WrapColor
			theme_background={props.theme.colors.t2}
			id={props.id}
			variants={variants}
			whileHover={"hovering"}
			whileTap={"pressing"}
			onTap={props.onTap}
			
			onMouseDown={e => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<SelectedBackground
				theme_color={props.theme.colors.t1}
				initial={{ opacity: 0 }}
				animate={{ opacity: props.active ? 1 : 0 }}
				whileHover={{ opacity: 1 }}
				transition={{
					type: "tween",
					duration: 0.2,
				}}
			/>

			<Color
				style={{
					backgroundColor: props.color,
					marginLeft: 8,
					boxShadow: boxShadow,
				}}
				transition={{
					type: "tween",
					duration: props.active ? 0.4 : 0.2,
				}}
			/>

			<Label
				style={{
					...props.labelStyle,
					y: -0.5,
					color: props.theme.colors.t7,
				}}
				//animate={{ color: props.active ? props.theme.colors.t9 : props.theme.colors.t6 }}
				transition={{
					type: "tween",
					duration: props.active ? 0.4 : 0.2,
				}}
				initial={false}
			>
				{colorLabel}
			</Label>
		</WrapColor>
	);
};

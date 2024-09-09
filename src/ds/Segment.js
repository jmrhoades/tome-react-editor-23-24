import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "./Icon";

/* 
Segment Variations
*/

const Wrap = styled(motion.div)`
	display: flex;
	border-radius: 8px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.08);
`;

const ButtonWrap = styled(motion.button)`
	display: block;
	position: relative;
	border: none;
	margin: 0;
	background: transparent;
	appearance: none;
	height: 28px;
	font-size: 12px;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	width: 50%;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	& svg {
		transform: translateX(-5px);
	}
`;

const Background = styled(motion.span)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.12);
`;

const Hover = styled(Background)`
	background: rgba(255, 255, 255, 0.08);
`;

const Label = styled(motion.span)`
	position: relative;
`;

export const Segment = ({ leftLabel, leftValue, leftIcon, rightLabel, rightValue, rightIcon, initialValue = "left", updateValue }) => {
	const v = initialValue === rightValue ? rightValue : leftValue;
	return (
		<Wrap>
			<Button
				key="left"
				id="left"
				selected={v === leftValue}
				onTap={updateValue}
				label={leftLabel}
				value={leftValue}
				accessory={leftIcon ? leftIcon : null}
			/>
			<Button
				key="right"
				id="right"
				selected={v === rightValue}
				onTap={updateValue}
				label={rightLabel}
				value={rightValue}
				accessory={rightIcon ? rightIcon : null}
			/>
		</Wrap>
	);
};

const Button = ({ label, id, value, onTap, selected, accessory }) => {
	const buttonVariants = {
		default: {
			opacity: 1,
		},
		hover: {
			opacity: 1,
		},
		active: {
			opacity: 1,
		},
		disabled: {
			opacity: 1,
		},
	};

	const hoverVariants = {
		default: {
			opacity: 0,
		},
		hover: {
			opacity: 1,
		},
		active: {
			opacity: 1,
		},
		disabled: {
			opacity: 0,
		},
	};

	return (
		<ButtonWrap
			whileTap="active"
			whileHover="hover"
			initial="default"
			variants={buttonVariants}
			onMouseUp={e => {
				onTap(value);
				e.stopPropagation();
			}}
		>
			<Background
				animate={{
					opacity: selected ? 1 : 0,
				}}
				transition={{ duration: 0.08 }}
			/>
			<Hover variants={hoverVariants} />
			{accessory && <Icon size={24} name={accessory} opacity={selected ? 1 : 0.4} />}
			<Label
				animate={{
					opacity: selected ? 1 : 0.4,
				}}
				transition={{ duration: 0.08 }}
			>
				{label}
			</Label>
		</ButtonWrap>
	);
};

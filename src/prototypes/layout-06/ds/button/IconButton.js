import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Button } from "../styled-components";
import { Icon } from "../Icon";

export const IconButton = props => {
	const {
		iconName = "Preferences",
		iconSize = 24,
		color = undefined,
		padding = undefined,
		onTap = undefined,
		active = undefined,
		href = undefined,
	} = props;
	return (
		<ButtonWrap
			as={href ? "a" : undefined}
			href={href}
			onPointerDownCapture={onTap}
			style={{
				"--background-color": active ? "var(--t3)" : "var(--t0)",
				"--background-color-hover": active ? "var(--t3)" : "var(--t3)",
				"--color": active ? "var(--t9)" : color,
				"--button-padding": padding,
			}}
		>
			<Icon name={iconName} size={iconSize} />
		</ButtonWrap>
	);
};

export const ButtonWrap = styled.button`
	display: inline-block;
	border-radius: var(--button-border-radius);
	padding: var(--button-padding);
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Button } from "../styled-components";
import { Icon } from "../Icon";

export const LabelButton = props => {
	
	const { onTap = undefined, active = false, children, large, style, badge } = props;

	let bgColor = "var(--t2)";
	let bgHoverColor = "var(--t3)";
	let fontSize = "13px";
	let color = "var(--t7)";
	let colorHover = "var(--t8)";

	if (active) {
		bgColor = "var(--t3)";
		color = "var(--t9)";
		colorHover = "var(--t9)";
	}

	if (large) {
		bgColor = "var(--t0)";
		bgHoverColor = "var(--t2)";
		fontSize = "15px";
	}

	if (badge) {
		

		if (active) {
			bgColor = "var(--badge-background-active-color)";
			bgHoverColor = "var(--badge-background-active-color)";
			color = "var(--badge-active-color)";
			colorHover = "var(--badge-active-color)";
		}

	}


	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--background-color": bgColor,
				"--background-color-hover": bgHoverColor,
				"--color": color,
				"--color-hover": colorHover,
				fontSize: fontSize,
				...style,
			}}
		>
			{children}
		</ButtonWrap>
	);
};

export const ButtonWrap = styled.button`
	padding: 6px 8px;
	border-radius: 6px;
	line-height: 16px;

	display: flex;
	align-items: center;
	gap: 4px;

	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);

	&:hover {
		color: var(--color-hover);
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

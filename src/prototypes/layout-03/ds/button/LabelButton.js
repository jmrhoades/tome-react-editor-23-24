import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Button } from "../styled-components";
import { Icon } from "../Icon";

export const LabelButton = props => {
	const { onTap = undefined, active = false, children, large } = props;
	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--background-color": active ? "var(--t3)" : large ? "var(--t0)" : "var(--t2)",
				"--background-color-hover": active ? "var(--t3)" : large ? "var(--t2)" : "var(--t3)",
				"--color": active ? "var(--t9)" : "var(--t7)",
				"--color-hover": active ? "var(--t9)" : "var(--t8)",
				fontSize: large ? "15px" : "13px",
				//lineHeight: isLarge ? "20px" : "16px",
			}}
		>
			{children}
		</ButtonWrap>
	);
};

export const ButtonWrap = styled.button`
	/* width: 100%; */
	padding: 6px 8px;
	border-radius: 6px;
	//font-size: 13px;
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

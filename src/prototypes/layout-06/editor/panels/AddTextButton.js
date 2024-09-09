import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const AddTextButton = props => {
	return <Wrap style={{ ...props.style }}>{props.children}</Wrap>;
};

const Wrap = styled(motion.div)`
	background-color: var(--z2);
	min-height: 68px;
	border-radius: 6px;
	padding: 12px;

	transition: all 0.2s ease;
	cursor: grab;
	&:hover {
		background-color: var(--z3);
		transform: scale(1.025);
	}
	&:active {
		cursor: grabbing;
	}
`;

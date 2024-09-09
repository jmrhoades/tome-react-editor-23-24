import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Grid = ({ children, tile }) => {
	return <GridBox id={tile.id}>{children}</GridBox>;
};

const GridBox = styled(motion.div)`
	position: relative;

	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	gap: var(--gap);
	padding: var(--padding-y) var(--padding-x);
	border-radius: var(--border-radius);
`;

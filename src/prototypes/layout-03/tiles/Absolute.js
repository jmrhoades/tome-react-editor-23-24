import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Absolute = ({ children, tile }) => {
	return <CanvasBox id={tile.id}>{children}</CanvasBox>;
};

const CanvasBox = styled(motion.div)`
	position: relative;

	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	gap: var(--gap);
	padding: var(--padding-y) var(--padding-x);
	border-radius: var(--border-radius);
`;
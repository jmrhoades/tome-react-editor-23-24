import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Absolute = ({ children, tile }) => {
	return <CanvasBox id={tile.id}>{children}</CanvasBox>;
};

const CanvasBox = styled(motion.div)`
	position: relative;

	gap: var(--gap);
	padding: var(--padding-y) var(--padding-x);
	border-radius: var(--border-radius);
`;

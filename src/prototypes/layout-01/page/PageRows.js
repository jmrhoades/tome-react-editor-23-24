import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { LayoutContext } from "../tome/LayoutContext";
import { TomeContext } from "../tome/TomeContext";

const Box = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
    border-style: solid;
    border-width: 2px;
    border-color: transparent;
	pointer-events: none;
	transition: opacity 0.2s ease-out;
`;


export const PageRows = props => {
	const { layoutTweaking } = React.useContext(TomeContext);
	const { getRowRect } = React.useContext(LayoutContext);
	
    const tile = props.tile;

	

	return (
        <>
		<Box
			style={{
				opacity: props.selected ? 1 : 0,
			}}
		>
		
		</Box>
        </>
	);
};

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Box = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

export const Frame = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

export const SVGFrame = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
	fill: none;
	pointer-events: none;
`;


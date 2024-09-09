import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Ellipse } from "../shapes/Ellipse";
import { Rect } from "../shapes/Rect";
import { RoundedRect } from "../shapes/RoundedRect";
import { Triangle } from "../shapes/Triangle";
import { Diamond } from "../shapes/Diamond";
import { ArrowRight } from "../shapes/ArrowRight";
import { Pentagon } from "../shapes/Pentagon";
import { Hexagon } from "../shapes/Hexagon";

export const MotionSVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
`;

export const ShapePathMap = {
	ELLIPSE: Ellipse,
	RECTANGLE: Rect,
	ROUNDED_RECT: RoundedRect,
	TRIANGLE: Triangle,
	DIAMOND: Diamond,
	ARROW_RIGHT: ArrowRight,
	PENTAGON: Pentagon,
	HEXAGON: Hexagon,
};

export const ShapePath = props => {
	const w = props.w;
	const h = props.h;
	const borderRadius = props.borderRadius;
	const Shape = ShapePathMap[props.type];
	const id = props.id ? props.id : null;
	return <Shape w={w} h={h} onPointerDown={props.onPointerDown} id={id} borderRadius={borderRadius} />;
};

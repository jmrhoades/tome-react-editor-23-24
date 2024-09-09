import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
const { roundCorners } = require('svg-round-corners');

export const Triangle = props => {
	const w = props.w;
	const h = props.h;
	const borderRadius = props.borderRadius;
	const id = props.id ? props.id : null;

	const x1 = useTransform(w, v => v / 2);
	const d = useMotionTemplate`M${x1} 0L${w} ${h}H0L${x1} 0Z`;
	const roundedPath = useTransform(d, v => roundCorners(v, borderRadius.get()).path);
	return (
		<motion.path
			d={roundedPath}
			id={id}
			onPointerDownCapture={props.onPointerDown}
			style={props.onPointerDown ? { pointerEvents: "auto" } : undefined}
		/>
	);
};

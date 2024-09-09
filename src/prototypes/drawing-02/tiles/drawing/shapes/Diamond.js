import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
const { roundCorners } = require("svg-round-corners");

export const Diamond = props => {
	const w = props.w;
	const h = props.h;
    const borderRadius = props.borderRadius;
	const id = props.id ? props.id : null;

	const x1 = 0;
	const y1 = useTransform(h, v => v * 0.5);

	const x2 = useTransform(w, v => v * 0.5);
	const y2 = 0;

	const x3 = useTransform(w, v => v * 1);
	const y3 = useTransform(h, v => v * 0.5);

	const x4 = useTransform(w, v => v * 0.5);
	const y4 = useTransform(h, v => v * 1);

	const d = useMotionTemplate`M0 ${y1}L${x2} 0L${x3} ${y3}L${x4} ${y4}Z`;
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

import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
const { roundCorners } = require("svg-round-corners");

export const Hexagon = props => {
	const w = props.w;
	const h = props.h;
	const borderRadius = props.borderRadius;
	const id = props.id ? props.id : null;

	const x1 = useTransform(w, v => v * 0.5);
	const y1 = useTransform(h, v => v * 0);

	const x2 = useTransform(w, v => v * 0.93);
	const y2 = useTransform(h, v => v * 0.25);

	const x3 = useTransform(w, v => v * 0.93);
	const y3 = useTransform(h, v => v * 0.75);

	const x4 = useTransform(w, v => v * 0.5);
	const y4 = useTransform(h, v => v * 1);

	const x5 = useTransform(w, v => v * 0.07);
	const y5 = useTransform(h, v => v * 0.75);

	const x6 = useTransform(w, v => v * 0.07);
	const y6 = useTransform(h, v => v * 0.25);

	const d = useMotionTemplate`M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}L${x4} ${y4}L${x5} ${y5}L${x6} ${y6}Z`;
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



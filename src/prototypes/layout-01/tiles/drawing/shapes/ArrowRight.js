import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";

export const ArrowRight = props => {
	const w = props.w;
	const h = props.h;
	const id = props.id ? props.id : null;

	const x1 = useTransform(w, v => v * 0.380223);
	const y1 = useTransform(h, v => v * 0.934541);
	const x2 = useTransform(w, v => v * 0.740947);
	const y2 = useTransform(h, v => v * 0.575209);
	const y3 = useTransform(h, v => v * 0.426184);
	const y4 = useTransform(h, v => v * 0.0654597);
	const x3 = useTransform(w, v => v * 0.564067);
	const x4 = useTransform(w, v => v * 1);
	const y5 = useTransform(h, v => v * 0.5);
	const d = useMotionTemplate`M${x1} ${y1}L${x2} ${y2}H0V${y3}H${x2}L${x1} ${y4}H${x3}L${x4} ${y5}L${x3} ${y1}H${x1}Z`;

	return (
		<motion.path
			d={d}
			id={id}
			onPointerDownCapture={props.onPointerDown}
			style={props.onPointerDown ? { pointerEvents: "auto" } : undefined}
		/>
	);
};

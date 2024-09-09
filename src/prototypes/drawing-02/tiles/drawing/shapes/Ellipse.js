import React from "react";
import { motion, useTransform } from "framer-motion";

export const Ellipse = props => {
	const w = props.w;
	const h = props.h;
	const id = props.id ? props.id : null;

	const cx = useTransform(w, v => v / 2);
	const cy = useTransform(h, v => v / 2);
	const rx = useTransform(w, v => v / 2);
	const ry = useTransform(h, v => v / 2);

	return (
		<motion.ellipse
			cx={cx}
			cy={cy}
			rx={rx}
			ry={ry}
			id={id}
			onPointerDownCapture={props.onPointerDown}
			style={props.onPointerDown ? { pointerEvents: "auto" } : undefined}
		/>
	);
};

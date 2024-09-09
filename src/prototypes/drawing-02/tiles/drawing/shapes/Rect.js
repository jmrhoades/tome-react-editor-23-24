import React from "react";
import { motion } from "framer-motion";

export const Rect = props => {
	const w = props.w;
	const h = props.h;
	const id = props.id ? props.id : null;
    
	return (
		<motion.rect
			x={0}
			y={0}
			width={w}
			height={h}
			rx={0}
			id={id}
			onPointerDownCapture={props.onPointerDown}
			style={props.onPointerDown ? { pointerEvents: "auto" } : undefined}
		/>
	);
};

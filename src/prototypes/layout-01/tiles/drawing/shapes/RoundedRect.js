import React from "react";
import { motion } from "framer-motion";

export const RoundedRect = props => {
	const w = props.w;
	const h = props.h;
	const borderRadius = props.borderRadius;
	const id = props.id ? props.id : null;
    
	return (
		<motion.rect
			x={0}
			y={0}
			width={w}
			height={h}
			rx={borderRadius}
			id={id}
			onPointerDownCapture={props.onPointerDown}
			style={props.onPointerDown ? { pointerEvents: "auto" } : undefined}
		/>
	);
};

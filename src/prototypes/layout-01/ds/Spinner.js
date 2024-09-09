import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
};

const makeArcPath = (x, y, radius, startAngle, endAngle) => {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
	return d;
};

export const Spinner = ({ size = 64, background = "gray", foreground = "magenta", strokeWidth = 3, layout=undefined, startAngle=0, endAngle = 270 }) => {
	const x = size / 2;
	const y = size / 2;
	const r = size / 2 - strokeWidth / 2;
	const arcPath = makeArcPath(x, y, r, startAngle, endAngle);
	return (
		// <AnimatePresence>
			<motion.svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				fill="none"
				// initial={{ opacity: 0 }}
				// animate={{ opacity: 1 }}
				// exit={{ opacity: 0 }}
				transition={{ ease: "easeOut", duration: 0.5 }}
				style={{width: size, height: size, margin: 0, display:"block"}}
				layout={layout}
			>
				<motion.circle cx={x} cy={y} r={r} strokeWidth={strokeWidth} stroke={background} />
				<motion.path
					d={arcPath}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					style={{
						originX: x + "px",
						originY: y + "px",
					}}
					animate={{
						rotate: 360,
						stroke: foreground,
					}}
					transition={{
						rotate: {
							ease: "linear",
							repeat: Infinity,
							duration: 3,
						},
					}}
				/>
			</motion.svg>
		// </AnimatePresence>
	);
};

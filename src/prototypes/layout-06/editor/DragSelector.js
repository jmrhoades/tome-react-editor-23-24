import React from "react";
import { motion, useTransform, AnimatePresence } from "framer-motion";

export const DragSelector = props => {
	const { dragSelection, currentPage } = props;
	const stroke = currentPage.theme.tokens["--accent-color"];
	const fill = currentPage.theme.tokens["--accent-color-10"];

	return (
		<AnimatePresence>
			{dragSelection && <DragRect key={dragSelection.id} dragRect={dragSelection} stroke={stroke} fill={fill} />}
		</AnimatePresence>
	);
};

const DragRect = props => {
	const { dragRect, stroke, fill } = props;
	const { width, height, x, y } = dragRect;
	const visibility = useTransform(() => (dragRect.width.get() === 0 ? "hidden" : "visible"));
	return (
		<motion.div
			id="dragRect"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",

				width: width,
				height: height,
				x: x,
				y: y,
				visibility: visibility,

				border: `1px solid ${stroke}`,
				backgroundColor: fill,
				borderRadius: 2,
			}}
			exit={{
				opacity: 0,
			}}
		/>
	);
};

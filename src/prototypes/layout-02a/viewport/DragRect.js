import React from "react";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { EventContext } from "../event/EventContext";

export const DragRect = props => {
	const { currentPage } = React.useContext(TomeContext);
	const { dragRect } = React.useContext(EventContext);
	
	return (
		<motion.div
			id="dragRect"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",

				width: dragRect.width,
				height: dragRect.height,
				x: dragRect.x,
				y: dragRect.y,
				opacity: dragRect.opacity,

				border: `1px solid ${currentPage.theme.dragSelect.border.color}`,
				backgroundColor: currentPage.theme.dragSelect.fill.color,
				borderRadius: 2,
				transition: "opacity 200ms ease-out",
			}}
		/>
	);
};

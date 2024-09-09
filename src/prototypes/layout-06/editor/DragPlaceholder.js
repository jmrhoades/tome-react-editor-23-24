import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { EditorContext, getBoundingBox } from "./EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";
import { Hud } from "../ds/hud/Hud";

export const DragPlaceholder = props => {
	const { pointerInfo, event, tileRects } = React.useContext(EditorContext);

	const [tileRect, setTileRect] = React.useState(false);
	const [borderRadius, setBorderRadius] = React.useState(0);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			const tile = pointerInfo.current.tile;
			const rect = tileRects.current.find(o => o.id === tile.id).rect;
			const style = getComputedStyle(document.getElementById(tile.id));
			setBorderRadius(style.borderRadius);
			setTileRect(rect);
		} else {
			setTileRect(false);
		}
	});

	return (
		<AnimatePresence>
			{tileRect && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					transition={{ duration: 0.2 }}
					style={{
						position: "absolute",
						top: tileRect.top,
						left: tileRect.left,
						width: tileRect.width,
						height: tileRect.height,
						
						borderRadius: borderRadius,
						borderWidth: 1,
						borderColor: "var(--t5)",
						borderStyle: "dashed",
					}}
				/>
			)}
		</AnimatePresence>
	);
};

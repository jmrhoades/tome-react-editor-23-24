import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { EditorContext, getBoundingBox } from "./EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";
import { Hud } from "../ds/hud/Hud";

export const SelectionHud = props => {
	const { selectedTiles, event, tomeData } = props;

	return (
		<>
			{selectedTiles.length > 0 && (
				<SelectionBounds
					key={selectedTiles[0].id}
					selectedTiles={selectedTiles}
					event={event}
					tomeData={tomeData}
				/>
			)}
		</>
	);
};

const SelectionBounds = props => {
	const { dragX, dragY } = React.useContext(EditorContext);
	const { selectedTiles, event, tomeData } = props;

	const [boundingBox, setBoundingBox] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

	const opacity = useMotionValue(1);
	const hudOpacity = useMotionValue(1);
	const placeholderOpacity = useMotionValue(0);
	const borderRadius = useMotionValue(0);
	const selectedColor = useMotionValue("");

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile || latest === Events.DraggingTileResize) {
			//animate(opacity, 0, transitions.fast);
			//animate(placeholderOpacity, 1, transitions.layoutTransition);
			animate(hudOpacity, 0, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			//animate(opacity, 1, transitions.layoutTransition);
			//animate(placeholderOpacity, 0, transitions.layoutTransition);
			animate(hudOpacity, 1, transitions.layoutTransition);
		}
		if (latest === Events.ClickedTile) {
			animate(hudOpacity, 1, transitions.fast);
		}
	});

	const updateRect = () => {
		let rects = [];
		selectedTiles.forEach(t => {
			const el = document.getElementById(t.id);
			const rect = el.getBoundingClientRect();
			rects.push(rect);
		});

		const rect = getBoundingBox(rects);
		setBoundingBox(rect);

		const style = getComputedStyle(document.getElementById(selectedTiles[0].id));
		const scale = style.getPropertyValue("--page-scale");
		borderRadius.set(parseInt(style.borderRadius) * scale);
		selectedColor.set(style.getPropertyValue("--accent-color"));
	};

	React.useEffect(updateRect, [tomeData, selectedTiles]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<>
			{/* <SVG>
				<motion.g
					style={{
						x: dragX,
						y: dragY,
						opacity: opacity,
					}}
				>
					<motion.rect
						x={boundingBox.x + window.scrollX}
						y={boundingBox.y + window.scrollY}
						width={boundingBox.width}
						height={boundingBox.height}
						rx={borderRadius}
						//style={{ stroke: "var(--accent)" }}
						//style={{ stroke: "var(--tome-brand-accent-40)" }}
						style={{ stroke: selectedColor }}
						strokeWidth={1.5}
					/>
				</motion.g>
			</SVG> */}
			<AnimatePresence>
				<motion.div
					style={{
						opacity: hudOpacity,
					}}
				>
					<Hud
						key={selectedTiles[0].id}
						tile={selectedTiles[0]}
						anchorRect={boundingBox}
						x={dragX}
						y={dragY}
						event={event}
					/>
				</motion.div>
			</AnimatePresence>
		</>
	);
};

const SVG = styled.svg`
	pointer-events: none;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
	fill: none;
	z-index: 100;
`;

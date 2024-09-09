import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { EditorContext, getBoundingBox } from "./EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";
import { Hud } from "../ds/hud/Hud";

export const TileDragPlaceholder = props => {
	const { selectedTiles, event, tomeData } = props;

	return (
		<>
			{selectedTiles.length > 0 && (
				<DragGhost key={selectedTiles[0].id} selectedTiles={selectedTiles} event={event} tomeData={tomeData} />
			)}
		</>
	);
};

const DragGhost = props => {
	const { selectedTiles, event, tomeData } = props;

	const [boundingBox, setBoundingBox] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
	const opacity = useMotionValue(0);
	const borderRadius = useMotionValue(0);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			animate(opacity, 1, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			animate(opacity, 0, transitions.layoutTransition);
		}
		if (latest === Events.ClickedTile) {
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
	};

	React.useEffect(updateRect, [tomeData, selectedTiles]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<SVG>
			<motion.rect
				x={boundingBox.x + window.scrollX}
				y={boundingBox.y + window.scrollY}
				width={boundingBox.width}
				height={boundingBox.height}
				rx={borderRadius}
				style={{ fill: "var(--t2)", opacity: opacity }}
			/>
		</SVG>
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
`;

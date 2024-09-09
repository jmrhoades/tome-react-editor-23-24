import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { EditorContext, getBoundingBox } from "./EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";

export const DraggingBackground = props => {
	const { selectedTiles, event, tomeData } = props;

	return (
		<>
			{selectedTiles.length > 0 && (
				<Background key={selectedTiles[0].id} selectedTiles={selectedTiles} event={event} tomeData={tomeData} />
			)}
		</>
	);
};

const Background = props => {
	const { dragX, dragY } = React.useContext(EditorContext);
	const { selectedTiles, event, tomeData } = props;

	const [boundingBox, setBoundingBox] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

	const opacity = useMotionValue(0);

	const borderRadius = useMotionValue(0);
	const selectedColor = useMotionValue("");

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
		selectedColor.set(style.getPropertyValue("--accent-color"));
	};

	React.useEffect(updateRect, [tomeData, selectedTiles]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<Bg
			style={{
				x: dragX,
				y: dragY,
				opacity: opacity,
				left: boundingBox.x + window.scrollX,
				top: boundingBox.y + window.scrollY,
				width: boundingBox.width,
				height: boundingBox.height,
				borderRadius: borderRadius,
				boxShadow: "var(--stroke-and-shadow)",
			}}
		>
			<Fill
				style={{
					backgroundColor: "var(--dragging-background-color)",
                    borderRadius: borderRadius,
                    //backgroundColor: "var(--page-background-color)",
                    //opacity: 0.75,
				}}
			/>
		</Bg>
	);
};

const Bg = styled(motion.div)`
	pointer-events: none;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
`;

const Fill = styled(motion.div)`
	pointer-events: none;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

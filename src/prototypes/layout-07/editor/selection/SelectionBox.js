import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate } from "framer-motion";

import { EditorContext, Events } from "../EditorContext";
import { transitions } from "../../ds/Transitions";
import { getBoundingBox } from "../logic/utilities";
import { Border } from "./Border";

export const SelectionBox = props => {
	const { selectedTiles, event, tomeData } = props;

	return (
		<>
			{selectedTiles.length > 1 && (
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
	const { selectionBoundsMotionValues } = React.useContext(EditorContext);
	const { selectedTiles, event, tomeData } = props;

	//const [boundingBox, setBoundingBox] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

	const opacity = useMotionValue(1);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile || latest === Events.DraggingTileResize) {
			animate(opacity, 0, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			animate(opacity, 1, transitions.layoutTransition);
		}
		if (latest === Events.ClickedTile) {
			animate(opacity, 1, transitions.fast);
		}
	});

	const updateRect = () => {
		const rects = [];
		selectedTiles.forEach(t => rects.push(t.layout.rect));
		const rect = getBoundingBox(rects);
		selectionBoundsMotionValues.x.set(rect.x);
		selectionBoundsMotionValues.y.set(rect.y);
		selectionBoundsMotionValues.width.set(rect.width);
		selectionBoundsMotionValues.height.set(rect.height);
		//setBoundingBox(rect);
	};

	React.useEffect(updateRect, [tomeData, selectedTiles]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<motion.div
			style={{
				position: "absolute",
				pointerEvents: "none",
				left: selectionBoundsMotionValues.x,
				top: selectionBoundsMotionValues.y,
				width: selectionBoundsMotionValues.width,
				height: selectionBoundsMotionValues.height,
				opacity: opacity,
			}}
		>
			<Border opacity={0.5} />
		</motion.div>
	);
};

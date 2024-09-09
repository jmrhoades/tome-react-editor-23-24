import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { EditorContext } from "../EditorContext";
import { Events } from "../EditorContext";
import { transitions } from "../../ds/Transitions";
import { Hud } from "../../ds/hud/Hud";
import { getBoundingBox } from "../logic/utilities";

export const SelectionHud = props => {
	const { textSelectedMotionValue, event } = React.useContext(EditorContext);
	const { selectedTiles, tomeData } = props;
	const hudOpacity = useMotionValue(1);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile || latest === Events.DraggingTileResize) {
			animate(hudOpacity, 0, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			animate(hudOpacity, 1, transitions.layoutTransition);
		}
		if (latest === Events.ClickedTile) {
			animate(hudOpacity, 1, transitions.fast);
		}
	});

	useMotionValueEvent(textSelectedMotionValue, "change", latest => {
		if (latest) {
			animate(hudOpacity, 0, transitions.fast);
		} else {
			animate(hudOpacity, 1, transitions.fast);
		}
	});

	let key = "";
	selectedTiles.forEach(t => (key += t.id));

	return (
		<>
			{selectedTiles.length > 0 && (
				<AnimatePresence>
					<motion.div
						style={{
							opacity: hudOpacity,
						}}
					>
						<Hud key={key} selectedTiles={selectedTiles} tomeData={tomeData} />
					</motion.div>
				</AnimatePresence>
			)}
		</>
	);
};

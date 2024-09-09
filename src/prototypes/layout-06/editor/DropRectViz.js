import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { DropAxis, DropOperation, EditorContext } from "./EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";

export const DropRectViz = props => {
	const { pointerInfo, event } = React.useContext(EditorContext);
	const [showZones, setShowZones] = React.useState(false);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingAddTile || latest === Events.DraggingTile) {
			setShowZones(true);
			console.log("DropRectViz -------", pointerInfo.current.dropTargets);
			console.log("DropRectViz -------", pointerInfo.current);
		}
		if (latest === Events.ReleasedAddTile || latest === Events.ReleasedTile) {
			setShowZones(false);
		}
	});

	return <>{showZones && <DropRects list={pointerInfo.current.dropTargets} />}</>;
};

const DropRects = props => {
	const { list } = props;
	return (
		<>
			{list.map(o => {
				let color = "var(--editor-debug-dropzone-color-add-to-container-cross)";

				if (o.operation === DropOperation.createContainer) {
					if (o.axis === DropAxis.main) {
						color = "var(--editor-debug-dropzone-color-create-container-main)";
					} else {
						color = "var(--editor-debug-dropzone-color-create-container-cross)";
					}
				}

				if (o.operation === DropOperation.addToContainer) {
					if (o.axis === DropAxis.main) {
						if (o.direction === "vertical") {
							color = "var(--editor-debug-dropzone-color-add-to-container-main-vertical)";
						}
						if (o.direction === "horizontal") {
							color = "var(--editor-debug-dropzone-color-add-to-container-main-horizontal)";
						}
					} else {
						color = "var(--editor-debug-dropzone-color-add-to-container-cross)";
					}
				}

				return (
					<motion.div
						key={o.id}
						style={{
							position: "absolute",
							top: o.dropRect.top + "px",
							left: o.dropRect.left + "px",
							width: o.dropRect.width + "px",
							height: o.dropRect.height + "px",
							backgroundColor: color,
							pointerEvents: "none",
						}}
					/>
				);
			})}
		</>
	);
};

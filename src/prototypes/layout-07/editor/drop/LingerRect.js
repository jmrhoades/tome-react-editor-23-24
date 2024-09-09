import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { DropAxis, DropOperation, EditorContext } from "../EditorContext";
import { Events } from "../EditorContext";
import { transitions } from "../../ds/Transitions";
import { contentDirection } from "../../tome/TileData";
import { TomeContext } from "../../tome/TomeContext";

export const LingerRectViz = props => {
	const { pointerInfo, lingeringOverTile } = React.useContext(EditorContext);
	const [showLingerZones, setShowLingerZones] = React.useState(false);

	useMotionValueEvent(lingeringOverTile, "change", latest => {
        console.log("lingeringOverTile -------", latest);

		if (latest) {
			setShowLingerZones(true);
			//console.log("DropRectViz -------", pointerInfo.current.dropTargets);
			
		} else {
			setShowLingerZones(false);
		}
	});

	return (
		<>
			{showLingerZones && pointerInfo.current && pointerInfo.current.lingerTargets && (
				<LingerRects list={pointerInfo.current.lingerTargets} />
			)}
		</>
	);
};

const LingerRects = props => {
	const { tomeData } = React.useContext(TomeContext);
	const { setDropStatus, cancelDropStatus, lingeringOverTile, pointerInfo } = React.useContext(EditorContext);

	const showNoOp = tomeData.editor.debug.showNoOpDropZones;
	const showMainAxis = tomeData.editor.debug.showMainAxisDropZones;
	const showCrossAxis = tomeData.editor.debug.showCrossAxisDropZones;

	const cancelTimerRef = React.useRef();

	const { list } = props;
	return (
		<>
			{list.map(o => {
				let color = "transparent";

				if (o.operation === DropOperation.cancelLinger) {
					color = "rgba(255,255,0,0.9)";
				}

				if (o.operation === DropOperation.createContainer) {
					if (o.order === 0) {
						//color = "var(--editor-debug-dropzone-color-create-container-main)";
						color = "rgba(0,255,255,0.25)";
					} else {
						color = "rgba(255,0,255,0.25)";
					}
				}

                color = "transparent";

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
							pointerEvents: "auto",
						}}
						onPointerEnter={e => {
							if (o.operation === DropOperation.cancelLinger) {

							} else {
								setDropStatus({
									id: o.id,
									droppableId: o.droppableId,
									draggableId: o.draggableId,
									lingerId: o.lingerId,
									operation: o.operation,
									direction: o.direction,
									axis: o.axis,
									order: o.order,
								});
                                lingeringOverTile.set(true);
							}
						}}
						onPointerLeave={e => {
							if (o.operation === DropOperation.cancelLinger) {
								console.log("cancel linger");
                                pointerInfo.current.lingerTargets = false;
                                lingeringOverTile.set(false);
                                cancelDropStatus();
							}

							//cancelTimerRef.current = setTimeout(() => {
							cancelDropStatus();
							//}, 500);
						}}
					/>
				);
			})}
		</>
	);
};

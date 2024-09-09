import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { DropAxis, DropOperation, EditorContext, LINGER_DURATION } from "../EditorContext";
import { Events } from "../EditorContext";
import { transitions } from "../../ds/Transitions";
import { contentDirection } from "../../tome/TileData";
import { TomeContext } from "../../tome/TomeContext";

export const DropRectViz = props => {
	const { pointerInfo, event } = React.useContext(EditorContext);
	const [showZones, setShowZones] = React.useState(false);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingAddTile || latest === Events.DraggingTile) {
			setShowZones(true);
			//console.log("DropRectViz -------", pointerInfo.current.dropTargets);
			//console.log("DropRectViz -------", pointerInfo.current);
		}
		if (latest === Events.ReleasedAddTile || latest === Events.ReleasedTile) {
			setShowZones(false);
		}
	});

	return (
		<>
			{showZones && pointerInfo.current && pointerInfo.current.dropTargets && (
				<DropRects list={pointerInfo.current.dropTargets} />
			)}
		</>
	);
};

const DropRects = props => {
	const { tomeData } = React.useContext(TomeContext);
	const { setDropStatus, cancelDropStatus, dropStatus, showLingerForNodeId, pointerHoverTimer } =
		React.useContext(EditorContext);

	const showNoOp = tomeData.editor.debug.showNoOpDropZones;
	const showMainAxis = tomeData.editor.debug.showMainAxisDropZones;
	const showCrossAxis = tomeData.editor.debug.showCrossAxisDropZones;

	const { list } = props;
	return (
		<>
			{list.map(o => {
				let color = "transparent";

				if (o.operation === DropOperation.rearrange) {
					// color = "rgba(255,255,0,0.25)";
				}

				if (o.operation === DropOperation.noOp) {
					color = showNoOp ? "rgba(255,0,0,0.5)" : "transparent";
				}

				if (o.operation === DropOperation.addToContainer) {
					color = "rgba(0,255,0,0.25)";

					if (o.order % 2 === 0) color = "rgba(0,255,255,0.5)";

					if (!showMainAxis) color = "transparent";

					if (o.axis === DropAxis.cross) {
						color = "rgba(255,0,255,0.5)";

						if (!showCrossAxis) color = "transparent";
					}
				}

				if (o.operation === DropOperation.createContainer) {
					if (o.axis === DropAxis.main) {
						color = "var(--editor-debug-dropzone-color-create-container-main)";
					} else {
						color = "var(--editor-debug-dropzone-color-create-container-cross)";
					}
				}

				return (
					<motion.div
						key={o.id}
						style={{
							position: "absolute",
							top: o.dropRect.top + window.scrollY + "px",
							left: o.dropRect.left + "px",
							width: o.dropRect.width + "px",
							height: o.dropRect.height + "px",
							backgroundColor: color,
							pointerEvents: "auto",
						}}
						onPointerMove={e => {
							clearTimeout(pointerHoverTimer.current);
							if (dropStatus.current.lingerId) {
								pointerHoverTimer.current = setTimeout(() => {
									console.log("START LINGER!!!");
									showLingerForNodeId(dropStatus.current.lingerId);
								}, LINGER_DURATION);
							}
						}}
						onPointerEnter={e => {
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
							//clearTimeout(cancelTimerRef.current);
						}}
						onPointerLeave={e => {
							clearTimeout(pointerHoverTimer.current);
							cancelDropStatus();
						}}
					/>
				);
			})}
		</>
	);
};

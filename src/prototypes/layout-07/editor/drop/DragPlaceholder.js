import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { DropOperation, EditorContext, getBoundingBox } from "../EditorContext";
import { Events } from "../EditorContext";
import { transitions } from "../../ds/Transitions";
import { Hud } from "../../ds/hud/Hud";
import { TomeContext } from "../../tome/TomeContext";

export const DragPlaceholder = props => {
	const { event, pointerInfo, tileMotionValues, dropStatus } = React.useContext(EditorContext);
	const [key, setKey] = React.useState("");

	/*
	useMotionValueEvent(event, "change", latest => {
		if (
			latest === Events.DraggingTile &&
			pointerInfo.current &&
			pointerInfo.current.selectedTiles &&
			pointerInfo.current.selectedTiles.length === 1
		) {
			setKey("placeholder-" + pointerInfo.current.tile.id);
		} else {
			setKey("");
		}
	});
	*/

	useMotionValueEvent(dropStatus.current.parentKey, "change", latest => {
		console.log(dropStatus.current.operation);

		if (dropStatus.current.operation === DropOperation.rearrange) {
			setKey("drag-placeholder-" + latest);
		} else {
			setKey("");
		}
	});

	return (
		<>
			{key !== "" && (
				<DragPlaceholderBlock key={key} tile={pointerInfo.current.tile} tileMotionValues={tileMotionValues} />
			)}
		</>
	);
};

export const DragPlaceholderBlock = props => {
	const { findTileAncestorBackgroundColor } = React.useContext(TomeContext);

	const tile = props.tile;
	const motionValues = props.tileMotionValues.current[tile.id];

	const [top, setTop] = React.useState(motionValues.top.get());
	const [left, setLeft] = React.useState(motionValues.left.get());

	useMotionValueEvent(motionValues.top, "change", latest => {
		setTop(motionValues.top.get());
	});

	useMotionValueEvent(motionValues.left, "change", latest => {
		setLeft(motionValues.left.get());
	});

	let draggingBgColor = tile.theme.tokens["backgroundColor"];

	if (draggingBgColor === undefined) draggingBgColor = findTileAncestorBackgroundColor(tile);
	if (draggingBgColor === undefined) {
		draggingBgColor = "var(--t1)";
	} else {
		draggingBgColor = "transparent";
	}

	return (
		<motion.div
			initial={false}
			// animate={{
			// 	opacity: 1,
			// 	top: top,
			// 	left: left,
			// }}
			// exit={{
			// 	opacity: 0,
			// }}
			transition={transitions.layoutTransition}
			style={{
				position: "absolute",
				pointerEvents: "none",
				width: motionValues.width,
				height: motionValues.height,

				borderRadius: `calc(calc(${tile.layout.borderRadius}px * var(--content-scale)) * var(--page-scale))`,

				//borderWidth: 1,
				//borderColor: "var(--t5)",
				//borderStyle: "dashed",

				backgroundColor: "var(--dragging-node-placeholder-background)",

				top: top,
				left: left,
			}}
		/>
	);
};

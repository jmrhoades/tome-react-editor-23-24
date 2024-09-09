import React from "react";
import { motion, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

import { DropLocation, EditorContext, DropOperation, DropAxis } from "./EditorContext";

export const DropIndicator = props => {
	const { dropStatus } = React.useContext(EditorContext);
	const [key, setKey] = React.useState(dropStatus.current.key.get());

	useMotionValueEvent(dropStatus.current.key, "change", latest => {
		setKey(latest);
	});

	// return <AnimatePresence>{key !== "" && <Indicator key={key} info={dropStatus.current} />}</AnimatePresence>;
	return <>{key !== "" && <Indicator key={key} info={dropStatus.current} />}</>;
};

const Indicator = props => {
	const { info } = props;
	const size = 3;

	let x = info.targetRect.x;
	let y = info.targetRect.y;

	let width = size;
	let height = info.targetRect.height;

	console.log(info.tileId, info.parentDirection, info.axis, info.position);

	let indicatorColor = `var(--accent)`;
	if (info.parentId) {
		const el = document.getElementById(info.tileId);
		const style = getComputedStyle(el);
		indicatorColor = style.getPropertyValue("--accent-color");
	}

	console.log(info.parentId)

	if (info.operation === DropOperation.createContainer) {
		const padding = 0;

		if (info.parentDirection === "column") {
			if (info.axis === "main") {
				width = size;
				height = info.targetRect.height - padding * 2;
				x = info.targetRect.x + padding;
				y = info.targetRect.y + padding;
				if (info.position === "end") {
					x = info.targetRect.x + info.targetRect.width - size - padding;
				}
			} else if (info.axis === "cross") {
				width = info.targetRect.width - padding * 2;
				height = size;
				x = info.targetRect.x + padding;
				y = info.targetRect.y + padding;
				if (info.position === "end") {
					x = info.targetRect.x;
					y = info.targetRect.y + info.targetRect.height - size - padding;
				}
			}
		}

		if (info.parentDirection === "row") {
			if (info.axis === "main") {
				width = info.targetRect.width - padding * 2;
				height = size;
				x = info.targetRect.x + padding;
				y = info.targetRect.y + padding;
				if (info.position === "end") {
					y = info.targetRect.y + info.targetRect.height - size - padding;
				}
			} else if (info.axis === "cross") {
				width = size;
				height = info.targetRect.height - padding * 2;
				x = info.targetRect.x + padding;
				y = info.targetRect.y + padding;
				if (info.position === "end") {
					x = info.targetRect.x + info.targetRect.width - size - padding;
				}
			}
		}
	}

	if (info.operation === DropOperation.addToContainer) {
		if (
			(info.axis === DropAxis.main && info.parentDirection === "column") ||
			(info.axis === DropAxis.cross && info.parentDirection === "row")
		) {
			width = info.indicatorRect.width;
			height = size;
			x = info.indicatorRect.x;
			y = info.indicatorRect.y + (info.indicatorRect.height - size) / 2;
		}

		if (
			(info.axis === DropAxis.main && info.parentDirection === "row") ||
			(info.axis === DropAxis.cross && info.parentDirection === "column")
		) {
			width = size;
			height = info.indicatorRect.height;
			y = info.indicatorRect.y;
			x = info.indicatorRect.x + (info.indicatorRect.width - size) / 2;
		}
	}

	return (
		<motion.div
			id="dropIndicator"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",

				width: width,
				height: height,
				x: x,
				y: y,

				backgroundColor: indicatorColor,
				borderRadius: 2,
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			// exit={{
			// 	opacity: 0,
			// }}
			transition={{
				duration: 0.1,
			}}
		/>
	);
};

import React from "react";
import styled from "styled-components";
import { motion, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

import {
	DropLocation,
	EditorContext,
	DropOperation,
	DropAxis,
	DropPosition,
	DropZoneDirections,
} from "./EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

export const DropIndicator = props => {
	const { dropStatus } = React.useContext(EditorContext);
	const [key, setKey] = React.useState(dropStatus.current.key.get());
	const [parentKey, setParentKey] = React.useState(dropStatus.current.parentKey.get());

	useMotionValueEvent(dropStatus.current.key, "change", latest => {
		setKey(latest);
	});

	useMotionValueEvent(dropStatus.current.parentKey, "change", latest => {
		setParentKey(latest);
	});

	// return <AnimatePresence>{key !== "" && <Indicator key={key} info={dropStatus.current} />}</AnimatePresence>;

	return (
		<AnimatePresence>
			{/* {parentKey !== "" && <ParentIndicator key={parentKey} parentKey={parentKey} info={dropStatus.current} />} */}

			{key !== "" && <Indicator key={key} info={dropStatus.current} />}
		</AnimatePresence>
	);
};

const Indicator = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { tileRefs, pageScale, contentScale } = React.useContext(EditorContext);

	const { info } = props;
	const { operation, axis, direction, order, draggableId, droppableId } = info;

	const droppable = findTileById(droppableId);
	if (!droppable) return <></>;
	const droppableEl = tileRefs.current[droppableId].current;
	const droppableRect = droppableEl.getBoundingClientRect();
	let paddingX = 0;
	let paddingY = 0;

	if (droppable.layout && droppable.layout.padding) {
		paddingX = droppable.layout.padding.x * pageScale.get() * contentScale.get();
		paddingY = droppable.layout.padding.y * pageScale.get() * contentScale.get();
	}

	if (paddingY === 0) paddingY = 8;
	if (paddingX === 0) paddingX = 8;

	const gap = droppable.layout.gap * pageScale.get() * contentScale.get();

	//console.log(droppableId, "->", draggableId);
	console.log(operation, axis, direction, order);
	//console.log(paddingX, paddingY, gap);

	const size = 3;
	let x = 0;
	let y = 0;
	let width = 0;
	let height = 0;
	let fillOpacity = 1;
	let fillColor = "var(--accent)";
	let borderColor = "transparent";
	let borderRadius = size + "px";
	let child = {};
	let childEl = {};
	let childRect = {};

	if (operation === DropOperation.addToContainer) {
		if (axis === DropAxis.main) {
			x = droppableRect.left;
			y = droppableRect.top;
			if (direction === "vertical") {
				x = droppableRect.left + paddingX;
				width = droppableRect.width - paddingX * 2;
				height = size;
				if (droppable.tiles.length > 0) {
					if (order === 0) {
						child = droppable.tiles[order];
						childEl = tileRefs.current[child.id].current;
						childRect = childEl.getBoundingClientRect();
						y = droppableRect.top + paddingY - size / 2;
					} else {
						child = droppable.tiles[order - 1];
						childEl = tileRefs.current[child.id].current;
						childRect = childEl.getBoundingClientRect();
						if (order === droppable.tiles.length) {
							y = droppableRect.top + droppableRect.height - paddingY - size / 2;
						} else {
							let bottom = childRect.top + childRect.height;
							let nextChild = droppable.tiles[order];
							let nextChildEl = tileRefs.current[nextChild.id].current;
							let nextChildRect = nextChildEl.getBoundingClientRect();
							y = bottom + (nextChildRect.top - bottom) / 2 - size / 2;
						}
					}
				} else {
				}
			}
			if (direction === "horizontal") {
				y = droppableRect.top + paddingY;
				width = size;
				height = droppableRect.height - paddingY * 2;
				if (droppable.tiles.length > 0) {
					if (order === 0) {
						child = droppable.tiles[order];
						childEl = tileRefs.current[child.id].current;
						childRect = childEl.getBoundingClientRect();
						x = droppableRect.left + paddingX - size / 2;
					} else {
						child = droppable.tiles[order - 1];
						childEl = tileRefs.current[child.id].current;
						childRect = childEl.getBoundingClientRect();
						if (order === droppable.tiles.length) {
							x = droppableRect.left + droppableRect.width - paddingX - size / 2;
						} else {
							let right = childRect.left + childRect.width;
							let nextChild = droppable.tiles[order];
							let nextChildEl = tileRefs.current[nextChild.id].current;
							let nextChildRect = nextChildEl.getBoundingClientRect();
							x = right + (nextChildRect.left - right) / 2 - size / 2;
						}
					}
				} else {
				}
			}
		}
		if (axis === DropAxis.cross) {
			if (direction === "vertical") {
				x = droppableRect.left + paddingX / 2 - size / 2;
				y = droppableRect.top + paddingY;
				width = size;
				height = droppableRect.height - paddingY * 2;
				if (order === 1) {
					x = droppableRect.left + droppableRect.width - paddingX / 2 - size / 2;
				}
			}
			if (direction === "horizontal") {
				x = droppableRect.left + paddingX;
				y = droppableRect.top + paddingY / 2 - size / 2;
				width = droppableRect.width - paddingX * 2;
				height = size;
				if (order === 1) {
					y = droppableRect.top + droppableRect.height - paddingY / 2 - size / 2;
				}
			}
		}
	}

	if (operation === DropOperation.createContainer) {
		const indicatorOffset = size * 1.5;
		if (direction === "horizontal") {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = size;
			height = droppableRect.height - indicatorOffset * 2;
			if (order === 1) x = droppableRect.left + droppableRect.width - indicatorOffset * 2;
		}
		if (direction === "vertical") {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = droppableRect.width - indicatorOffset * 2;
			height = size;
			if (order === 1) y = droppableRect.top + droppableRect.height - indicatorOffset * 2;
		}
	}

	if (operation === DropOperation.lingerCreate) {
		const indicatorOffset = 0;
		//fillColor = "transparent";
		fillColor = "var(--accent)";
		fillOpacity = 0.25;
		//borderColor = "var(--accent)";
		//borderRadius = 0;
		if (direction === "horizontal") {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = droppableRect.width / 2;
			height = droppableRect.height - indicatorOffset * 2;
			if (order === 1) x = droppableRect.left + droppableRect.width / 2;
		}
		if (direction === "vertical") {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = droppableRect.width - indicatorOffset * 2;
			height = droppableRect.height / 2;
			if (order === 1) y = droppableRect.top + droppableRect.height / 2;
		}
	}

	// console.log(x, y, width, height, fillColor);

	return (
		<motion.div
			id="dropIndicator"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",
				zIndex: 999999,

				width: width,
				height: height,
				x: x + window.scrollX,
				y: y + window.scrollY,

				backgroundColor: fillColor,
				borderStyle: "solid",
				borderWidth: "2px",
				borderColor: borderColor,
				borderRadius: borderRadius,
				opacity: fillOpacity,
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: fillOpacity }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		/>
	);
};

const ParentIndicator = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { tileRects, tileRefs, pageScale } = React.useContext(EditorContext);

	const { info } = props;
	const { operation, axis, direction, order, draggableId, droppableId } = info;

	const parent = findTileById(droppableId);
	if (!parent) return <></>;

	const parentEl = tileRefs.current[parent.id].current;
	const parentStyle = getComputedStyle(parentEl);
	const accentColor = parentStyle.getPropertyValue("--accent-color");
	const parentRect = parentEl.getBoundingClientRect();
	let x = parentRect.x;
	let y = parentRect.y;
	let width = parentRect.width;
	let height = parentRect.height;

	if (operation === DropOperation.createContainer) {
		const gap = 12;
		x -= gap;
		y -= gap;
		width = parentRect.width + gap * 2;
		height = parentRect.height + gap * 2;
		// rx = 8;
		// strokeColor = accentColor;
		// strokeWidth = 1.5;
		// initial = { opacity: 0 };
		// animate = { opacity: [0, 0, 1, 1, 0, 0, 1] };
		// transition = { duration: 0.3 };
	}

	const childRects = [];
	if (operation === DropOperation.addToContainer) {
		parent.tiles.forEach(t => {
			const tNode = findTileById(t.id);
			const tEl = tileRefs.current[t.id].current;
			const tRect = tEl.getBoundingClientRect();
			childRects.push({ id: t.id, rect: tRect, info: tNode });
		});
	}

	const parentRadius = 4;
	//const parentStrokeColor = "var(--t4)";
	let parentFillColor = "var(--t2)";
	let parentStrokeColor = "transparent";
	let parentStrokeSize = 2;

	if (operation === DropOperation.createContainer) {
		//parentFillColor = "transparent";
		//parentStrokeColor = "var(--t6)";
		//parentStrokeSize = 1;
	}

	const childRadius = parentRadius;
	const childFillColor = "transparent";
	const childStrokeColor = "transparent";
	const childStrokeSize = 2;

	return (
		<motion.div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",
				zIndex: 10,
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: width,
					height: height,
					x: x + window.scrollX,
					y: y + window.scrollY,
					border: `${parentStrokeSize}px solid ${parentStrokeColor}`,
					background: parentFillColor,
					borderRadius: parentRadius,
				}}
			>
				{/* <SVG>
					<motion.rect
						width={"100%"}
						height={"100%"}
						strokeWidth={1}
						strokeLinecap="square"
						strokeDasharray="1, 6"
						style={{
							stroke: accentColor,
							pointerEvents: "none",
							opacity: createContainerOpacity,
						}}
					/>
				</SVG> */}
			</motion.div>

			{childRects.map(r => (
				<motion.div
					key={r.id}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: r.rect.width,
						height: r.rect.height,
						x: r.rect.x + window.scrollX,
						y: r.rect.y + window.scrollY,
						border: `${childStrokeSize}px solid ${childStrokeColor}`,
						background: childFillColor,
						borderRadius: childRadius,
					}}
				/>
			))}
		</motion.div>
	);
};

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	overflow: visible;
	fill: none;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: auto;
`;

import React from "react";
import styled from "styled-components";
import { motion, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

import { DropLocation, EditorContext, DropOperation, DropAxis, DropPosition } from "./EditorContext";
import { TomeContext } from "../tome/TomeContext";

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
		<>
			{key !== "" && <Indicator key={key} info={dropStatus.current} />}
			{parentKey !== "" && <ParentIndicator parentKey={parentKey} info={dropStatus.current} />}
		</>
	);
};

const Indicator = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { tileRects, pageScale } = React.useContext(EditorContext);

	const { info } = props;
	const { operation, axis, position, parentId, tileId } = info;
	const size = 3;

	const parent = findTileById(parentId);
	const parentRect = tileRects.current.find(o => o.id === parent.id).rect;
	const direction = parent.layout.direction;

	const tile = findTileById(tileId);
	let tileIndex = null;
	if (parent.tiles) tileIndex = parent.tiles.indexOf(tile);

	const parentEl = document.getElementById(parentId);
	const parentStyle = getComputedStyle(parentEl);
	const indicatorColor = parentStyle.getPropertyValue("--accent-color");
	const parentOutlineColor = parentStyle.getPropertyValue("--accent-color-40");
	const parentBorderRadius = parentStyle.getPropertyValue("border-radius");

	let gap = 0;
	let paddingX = 0;
	let paddingY = 0;
	if (parent.layout) {
		if (parent.layout.gap) {
			gap = parseInt(parent.layout.gap) * pageScale.get();
		}
		if (parent.layout.padding) {
			paddingX = parent.layout.padding.x * pageScale.get();
			paddingY = parent.layout.padding.y * pageScale.get();
		}
	}

	paddingX = Math.max(8, paddingX);
	paddingY = Math.max(8, paddingY);

	//console.log(operation, axis, position, parentId, tileId);
	//console.log(parent, parentRect, direction);

	let x = 0;
	let y = 0;
	let width = 0;
	let height = 0;

	if (operation === DropOperation.addToContainer) {
		if (axis === DropAxis.main) {
			if (direction === "vertical") {
				if (position <= parent.tiles.length - 1) {
					const currentTileAtOrder = parent.tiles[position];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					y = currentTileRect.top - gap / 2 - size / 2;
					x = currentTileRect.x;
					width = currentTileRect.width;
					if (tile.parentId === parentId && position > tileIndex) {
						y = currentTileRect.bottom + gap / 2 - size / 2;
					}
				}
				if (position === parent.tiles.length) {
					const currentTileAtOrder = parent.tiles[parent.tiles.length - 1];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					y = currentTileRect.bottom + gap / 2 - size / 2;
					x = currentTileRect.x;
					width = currentTileRect.width;
				}
				height = size;
			}
			if (direction === "horizontal") {
				if (position <= parent.tiles.length - 1) {
					const currentTileAtOrder = parent.tiles[position];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					x = currentTileRect.x - gap / 2 - size / 2;
					if (x < parentRect.x) {
						x = currentTileRect.x + size * 2;
					}
					if (tile.parentId === parentId && position > tileIndex) {
						x = currentTileRect.right + gap / 2 - size / 2;
					}
					y = currentTileRect.y;
					height = currentTileRect.height;
					//if (position === 0 || position === DropPosition.start) x = currentTileRect.x + size;
				}
				if (position === parent.tiles.length) {
					const currentTileAtOrder = parent.tiles[parent.tiles.length - 1];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					x = currentTileRect.right + gap / 2 - size / 2;
					if (x > parentRect.x) {
						x = currentTileRect.x - size * 2;
					}
					y = currentTileRect.y;
					height = currentTileRect.height;
				}

				width = size;
			}
		}

		if (axis === DropAxis.cross) {
			if (direction === "horizontal") {
				if (position <= parent.tiles.length - 1) {
					const currentTileAtOrder = parent.tiles[position];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					y = currentTileRect.y + gap / 2 + size / 2;
				}
				if (position === parent.tiles.length) {
					const currentTileAtOrder = parent.tiles[parent.tiles.length - 1];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					y = currentTileRect.bottom - gap / 2 - size / 2;
				}

				x = parentRect.x + gap;
				width = parentRect.width - gap * 2;
				height = size;
			}
			if (direction === "vertical") {
				if (position <= parent.tiles.length - 1) {
					const currentTileAtOrder = parent.tiles[position];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					x = currentTileRect.x + gap / 2 + size / 2;
				}
				if (position === parent.tiles.length) {
					const currentTileAtOrder = parent.tiles[parent.tiles.length - 1];
					const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;
					x = currentTileRect.right - gap / 2 - size / 2;
				}

				y = parentRect.y + gap;
				width = size;
				height = parentRect.height - gap * 2;
			}
		}
	}

	if (operation === DropOperation.addToContainerWithDirection) {
		// Always on the cross axis
		// Assumes 1 child in the container
		const currentTileAtOrder = parent.tiles[0];
		const currentTileRect = tileRects.current.find(o => o.id === currentTileAtOrder.id).rect;

		if (direction === "horizontal") {
			if (position === DropPosition.start) {
				y = currentTileRect.y - gap / 2 - size / 2;
			}
			if (position === DropPosition.end) {
				y = currentTileRect.bottom + gap / 2 - size / 2;
			}

			x = currentTileRect.x;
			height = size;
			width = currentTileRect.width;
		}
		if (direction === "vertical") {
			if (position === DropPosition.start) {
				x = currentTileRect.x - gap / 2 - size / 2;
			}
			if (position === DropPosition.end) {
				x = currentTileRect.right + gap / 2 - size / 2;
			}

			y = currentTileRect.y;
			width = size;
			height = currentTileRect.height;
		}
	}

	if (operation === DropOperation.setParentDirection) {
		const siblingTile = parent.tiles[tileIndex === 0 ? 1 : 0];
		const siblingRect = tileRects.current.find(o => o.id === siblingTile.id).rect;
		// these are always cross
		if (direction === "vertical") {
			y = siblingRect.y;
			width = size;
			height = siblingRect.height;

			if (position === DropPosition.start) {
				x = siblingRect.x - gap / 2 - size / 2;
			}
			if (position === DropPosition.end) {
				x = siblingRect.right + gap / 2 - size / 2;
			}
		}
		if (direction === "horizontal") {
			x = siblingRect.x;
			width = siblingRect.width;
			height = size;

			if (position === DropPosition.start) {
				y = siblingRect.top - gap / 2 - size / 2;
				if (siblingRect.height === parentRect.height) {
					y = siblingRect.top + gap / 2 - size / 2;
				}
			}
			if (position === DropPosition.end) {
				y = siblingRect.bottom + gap / 2 - size / 2;
				if (siblingRect.height === parentRect.height) {
					y = siblingRect.bottom - gap / 2 - size / 2;
				}
			}
		}
	}

	if (operation === DropOperation.addToRoot) {
		if (direction === "horizontal") {
			if (axis === DropAxis.main) {
				x = parentRect.x - gap / 2 - size / 2;
				if (position !== 0) x = parentRect.right + gap / 2 - size / 2;
				y = parentRect.y;
				width = size;
				height = parentRect.height;
			}
			if (axis === DropAxis.cross) {
				y = parentRect.y - gap / 2 - size / 2;
				if (position !== 0) y = parentRect.bottom + gap / 2 - size / 2;
				x = parentRect.x;
				width = parentRect.width;
				height = size;
			}
		}

		if (direction === "vertical") {
			if (axis === DropAxis.main) {
				y = parentRect.y - gap / 2 - size / 2;
				if (position !== 0) y = parentRect.bottom + gap / 2 - size / 2;
				x = parentRect.x;
				width = parentRect.width;
				height = size;
			}
			if (axis === DropAxis.cross) {
				x = parentRect.x - gap / 2 - size / 2;
				if (position !== 0) x = parentRect.right + gap / 2 - size / 2;
				y = parentRect.y;
				width = size;
				height = parentRect.height;
			}
		}
	}

	if (operation === DropOperation.createContainer) {
		gap = 12;

		if (position === "top") {
			x = parentRect.x;
			y = parentRect.top - gap / 2 - size / 2;
			width = parentRect.width;
			height = size;
		}

		if (position === "bottom") {
			x = parentRect.x;
			y = parentRect.bottom + gap / 2 - size / 2;
			width = parentRect.width;
			height = size;
		}

		if (position === "left") {
			x = parentRect.left - gap / 2 - size / 2;
			y = parentRect.top;
			width = size;
			height = parentRect.height;
		}

		if (position === "right") {
			x = parentRect.right + gap / 2 - size / 2;
			y = parentRect.top;
			width = size;
			height = parentRect.height;
		}
	}

	console.log("-----", operation, axis, direction, position);
	console.log("-----", x, y, width, height, gap);

	return (
		<>
			{/* {operation !== DropOperation.createContainer && (
				<motion.div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						pointerEvents: "none",
						zIndex: 10,

						width: parentRect.width,
						height: parentRect.height,
						x: parentRect.x,
						y: parentRect.y,

						border: `1px solid ${parentOutlineColor}`,
						borderRadius: parentBorderRadius,
					}}
					//initial={{ opacity: 0 }}
					//animate={{ opacity: 1 }}
					// exit={{
					// 	opacity: 0,
					// }}
					transition={{
						duration: 0.1,
					}}
				/>
			)} */}

			<motion.div
				id="dropIndicator"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
					zIndex: 10,

					width: width,
					height: height,
					x: x + window.scrollX,
					y: y + window.scrollY,

					backgroundColor: indicatorColor,
					borderRadius: 2,
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				// exit={{
				// 	opacity: 0,
				// }}
				transition={{
					duration: 0.2,
				}}
			/>
		</>
	);
};

const ParentIndicator = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { tileRects, pageScale } = React.useContext(EditorContext);

	const { info } = props;
	const { operation, parentId } = info;

	const parent = findTileById(parentId);
	const parentRect = tileRects.current.find(o => o.id === parent.id).rect;

	const parentEl = document.getElementById(parentId);
	const parentStyle = getComputedStyle(parentEl);
	const accentColor = parentStyle.getPropertyValue("--accent-color");
	const accentColor40 = parentStyle.getPropertyValue("--accent-color-40");
	const parentBorderRadius = parentStyle.getPropertyValue("border-radius");

	let x = parentRect.x;
	let y = parentRect.y;
	let width = parentRect.width;
	let height = parentRect.height;
	let rx = parentBorderRadius;
	let strokeColor = accentColor40;
	let strokeWidth = 1.5;
	let initial = { scale: 1, opacity: 0 };
	let animate = { scale: 1, opacity: 1 };
	let transition = undefined;

	if (operation === DropOperation.createContainer) {
		const gap = 12;
		x -= gap;
		y -= gap;
		width = parentRect.width + gap * 2;
		height = parentRect.height + gap * 2;
		rx = 8;
		strokeColor = accentColor;
		strokeWidth = 1.5;
		initial = { opacity: 0 };
		animate = { opacity: [0, 0, 1, 1, 0, 0, 1] };
		transition = { duration: 0.3 };
	}

	console.log("-----", operation);

	return (
		<SVG>
			<motion.rect
				x={x + window.scrollX}
				y={y + window.scrollY}
				width={width}
				height={height}
				rx={rx}
				style={{ stroke: strokeColor }}
				strokeWidth={strokeWidth}
				initial={initial}
				animate={animate}
				transition={transition}
			/>
		</SVG>
	);
};

const SVG = styled.svg`
	pointer-events: none;
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	overflow: visible;
	fill: none;
	z-index: 10;
`;

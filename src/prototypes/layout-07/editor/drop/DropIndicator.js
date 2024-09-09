import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import { motion, useTransform, AnimatePresence, useMotionValueEvent, useMotionValue } from "framer-motion";

import {
	DropLocation,
	EditorContext,
	DropOperation,
	DropAxis,
	DropPosition,
	DropZoneDirections,
	selectedZ,
} from "../EditorContext";
import { TomeContext } from "../../tome/TomeContext";
import { transitions } from "../../ds/Transitions";
import { contentDirection } from "../../tome/TileData";
import { Icon } from "../../ds/Icon";

const borderWidth = 2;

export const DropIndicator = props => {
	const { getCurrentPage } = React.useContext(TomeContext);
	const { dropStatus } = React.useContext(EditorContext);
	const [key, setKey] = React.useState(dropStatus.current.key.get());
	const [parentKey, setParentKey] = React.useState(dropStatus.current.parentKey.get());

	

	useMotionValueEvent(dropStatus.current.key, "change", latest => {
		console.log(dropStatus.current.operation);
		setKey(latest);
	});

	useMotionValueEvent(dropStatus.current.parentKey, "change", latest => {
		
		setParentKey(latest);
	});

	return (
		<>
			{key !== "" && <Indicator key={key} info={dropStatus.current} />}
			{parentKey !== "" && <ParentIndicator key={parentKey} info={dropStatus.current} />}
		</>
	);
};

const Indicator = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { tileRefs, pageScale, contentScale, tileRects, lingeringOverTile } = React.useContext(EditorContext);

	const { info } = props;
	const { id, operation, axis, direction, order, droppableId, lingerId } = info;

	const droppable = findTileById(droppableId);

	/*
	const fillOpacity = useMotionValue(lingeringOverTile.get() ? 0 : 1);
	useMotionValueEvent(lingeringOverTile, "change", latest => {
		if (latest) {
			fillOpacity.set(0);
		} else {
			fillOpacity.set(1);
		}
	});
	*/

	if (!droppable) return <></>;

	const droppableRect = tileRects.current.find(o => o.id === droppableId).rect;

	let hoverBorderColor = document.body.style.backgroundColor;
	if (chroma(hoverBorderColor).luminance() > 0.5) {
		hoverBorderColor = chroma(hoverBorderColor).darken(0.25).hex();
	} else {
		hoverBorderColor = chroma(hoverBorderColor).brighten(0.75).hex();
	}

	let showLingerTarget = false;
	let lingerTargetRect = {};

	/*
	if (lingerId && lingerId !== droppableId) {
		showLingerTarget = true;
		lingerTargetRect = tileRects.current.find(o => o.id === lingerId).rect;
		// console.log("SHOW HOVER!!!!!!!!!!!!!", lingerTargetRect);
	}
	*/

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

	//console.log(paddingX, paddingY, gap);

	//console.log(id, operation, axis, direction, order);

	const size = 3;
	const offset = 6;
	let x = 0;
	let y = 0;
	let width = 0;
	let height = 0;

	let fillColor = "var(--accent)";
	let borderColor = "transparent";
	let borderRadius = size + "px";
	let child = {};
	let childRect = {};
	let xMin = 0;
	let xMax = 0;
	let yMin = 0;
	let yMax = 0;

	if (operation === DropOperation.addToContainer) {
		if (axis === DropAxis.main) {
			x = droppableRect.left;
			y = droppableRect.top;

			if (direction === contentDirection.VERTICAL) {
				x = droppableRect.left + offset;
				width = droppableRect.width - offset * 2;
				height = size;
				yMin = droppableRect.top + offset;
				yMax = droppableRect.top + droppableRect.height - size - offset;
				if (droppable.tiles.length > 0) {
					if (order === 0) {
						child = droppable.tiles[order];
						childRect = tileRects.current.find(o => o.id === child.id).rect;
						y = childRect.top - size - offset;
					} else {
						child = droppable.tiles[order - 1];
						childRect = tileRects.current.find(o => o.id === child.id).rect;
						if (order === droppable.tiles.length) {
							y = childRect.top + childRect.height + offset;
						} else {
							let bottom = childRect.top + childRect.height;
							let nextChild = droppable.tiles[order];
							let nextChildRect = tileRects.current.find(o => o.id === nextChild.id).rect;
							y = bottom + (nextChildRect.top - bottom) / 2 - size / 2;
						}
					}
					if (y < yMin) y = yMin;
					if (y > yMax) y = yMax;
				}
			}
			if (direction === contentDirection.HORIZONTAL) {
				y = droppableRect.top + offset;
				height = droppableRect.height - offset * 2;
				width = size;
				xMin = droppableRect.left + offset;
				xMax = droppableRect.left + droppableRect.width - size - offset;
				if (droppable.tiles && droppable.tiles.length > 0) {
					if (order === 0) {
						child = droppable.tiles[order];
						childRect = tileRects.current.find(o => o.id === child.id).rect;
						x = childRect.left - size - offset;
					} else {
						child = droppable.tiles[order - 1];
						childRect = tileRects.current.find(o => o.id === child.id).rect;
						if (order === droppable.tiles.length) {
							x = childRect.left + childRect.width + offset;
						} else {
							let right = childRect.left + childRect.width;
							let nextChild = droppable.tiles[order];
							let nextChildRect = tileRects.current.find(o => o.id === nextChild.id).rect;
							x = right + (nextChildRect.left - right) / 2 - size / 2;
						}
					}
					if (x < xMin) x = xMin;
					if (x > xMax) x = xMax;
				}
			}
		}

		if (axis === DropAxis.cross) {
			if (direction === contentDirection.VERTICAL) {
				x = droppableRect.left + offset;
				y = droppableRect.top + offset;
				width = size;
				height = droppableRect.height - offset * 2;
				if (order === 1) {
					x = droppableRect.left + droppableRect.width - size - offset;
				}
			}
			if (direction === contentDirection.HORIZONTAL) {
				x = droppableRect.left + offset;
				y = droppableRect.top + offset;
				width = droppableRect.width - offset * 2;
				height = size;
				if (order === 1) {
					y = droppableRect.top + droppableRect.height - size - offset;
				}
			}
		}
	}

	if (operation === DropOperation.createContainer) {
		console.log("DO ITTTTTTTT");
		const indicatorOffset = size * 1.5;
		if (direction === contentDirection.HORIZONTAL) {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = size;
			height = droppableRect.height - indicatorOffset * 2;
			if (order === 1) x = droppableRect.left + droppableRect.width - indicatorOffset * 2;
		}
		if (direction === contentDirection.VERTICAL) {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = droppableRect.width - indicatorOffset * 2;
			height = size;
			if (order === 1) y = droppableRect.top + droppableRect.height - indicatorOffset * 2;
		}
	}

	/*
	if (operation === DropOperation.lingerCreate) {
		const indicatorOffset = 0;
		//fillColor = "transparent";
		fillColor = "var(--accent)";
		//fillOpacity = 0.25;
		//borderColor = "var(--accent)";
		//borderRadius = 0;
		if (direction === contentDirection.HORIZONTAL) {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = droppableRect.width / 2;
			height = droppableRect.height - indicatorOffset * 2;
			if (order === 1) x = droppableRect.left + droppableRect.width / 2;
		}
		if (direction === contentDirection.VERTICAL) {
			x = droppableRect.left + indicatorOffset;
			y = droppableRect.top + indicatorOffset;
			width = droppableRect.width - indicatorOffset * 2;
			height = droppableRect.height / 2;
			if (order === 1) y = droppableRect.top + droppableRect.height / 2;
		}
	}
	*/

	if (operation === DropOperation.rearrange) {
		const strokeWdith = 2;

		// try placing the frame on the outside
		//x = droppableRect.left - strokeWdith;
		//y = droppableRect.top - strokeWdith;
		//width = droppableRect.width + strokeWdith * 2;
		//height = droppableRect.height + strokeWdith * 2;
		//borderColor = "var(--accent)";
		//fillColor = "transparent";
		//borderRadius = 0;
	}

	// console.log(x, y, width, height, fillColor);

	return (
		<>
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
					//opacity: fillOpacity,
				}}
				// initial={{ opacity: 0 }}
				// animate={{ opacity: 1 }}
				// exit={{ opacity: 0 }}
				// transition={{ duration: 0.2 }}
			/>

			{showLingerTarget && (
				<motion.div
					// initial={{
					// 	opacity: 0,
					// }}
					// animate={{
					// 	opacity: 1,
					// }}
					style={{
						position: "absolute",
						pointerEvents: "none",

						left: lingerTargetRect.left,
						top: lingerTargetRect.top,
						width: lingerTargetRect.width,
						height: lingerTargetRect.height,

						backgroundColor: "transparent",
						borderStyle: "solid",
						borderWidth: borderWidth,
						borderColor: hoverBorderColor,
						borderRadius: borderRadius,
					}}
				/>
			)}
		</>
	);
};

const ParentIndicator = props => {
	const { findTileAncestorBackgroundColor } = React.useContext(TomeContext);

	const { tileRects } = React.useContext(EditorContext);

	const { info } = props;
	const { operation, axis, direction, order, droppableId, draggableId, lingerId } = info;

	// Node bounds when rearranging / adding
	let rearrangeBorderColor = "transparent";
	const pageBackgroundColor = document.body.style.backgroundColor;
	if (chroma(pageBackgroundColor).luminance() > 0.5) {
		rearrangeBorderColor = chroma(pageBackgroundColor).darken(0.5).hex();
	} else {
		rearrangeBorderColor = chroma(pageBackgroundColor).brighten(0.75).hex();
	}

	let hoverBorderColor = document.body.style.backgroundColor;
	if (chroma(hoverBorderColor).luminance() > 0.5) {
		hoverBorderColor = chroma(hoverBorderColor).darken(0.5).hex();
	} else {
		hoverBorderColor = chroma(hoverBorderColor).brighten(0.75).hex();
	}

	const droppableRect = tileRects.current.find(o => o.id === droppableId).rect;

	let x = droppableRect.left - borderWidth;
	let y = droppableRect.top - borderWidth;
	let width = droppableRect.width + borderWidth * 2;
	let height = droppableRect.height + borderWidth * 2;
	let borderColor = "var(--accent)";
	let borderRadius = 3;

	let label = "";
	let labelForegroundColor = "white";
	let labelBackgroundColor = "";
	let labelIcon = undefined;
	let labelIconOrder = "trailing";

	let fillX = droppableRect.left - borderWidth;
	let fillY = droppableRect.top - borderWidth;
	let fillWidth = droppableRect.width + borderWidth * 2;
	let fillHeight = droppableRect.height + borderWidth * 2;
	let fillColor = "transparent";
	let fillOpacity = 0;

	if (operation === DropOperation.rearrange) {
		borderColor = rearrangeBorderColor;
		labelBackgroundColor = rearrangeBorderColor;
		// labelForegroundColor = "var(--t9)";

		if (direction === contentDirection.VERTICAL) {
			label = "Rearrange";
			labelIcon = "ArrowArrangeVertical";
			//labelIcon = "ArrowDown";
			labelIconOrder = "leading";
		}
		if (direction === contentDirection.HORIZONTAL) {
			label = "Rearrange";
			labelIcon = "ArrowArrangeHorizontal";
			//labelIcon = "ArrowRight";
			labelIconOrder = "leading";
		}
	}

	if (operation === DropOperation.addToContainer) {
		borderColor = rearrangeBorderColor;
		labelBackgroundColor = rearrangeBorderColor;

		if (axis === DropAxis.cross) {
			fillX = 0;
			fillY = 0;
			//fillColor = "var(--accent)";
			fillOpacity = 0;
			//labelBackgroundColor = fillColor;
			//borderColor = fillColor;

			if (direction === contentDirection.VERTICAL) {
				fillWidth = droppableRect.width / 2;
				fillHeight = droppableRect.height;
				label = "Create container";
				labelIcon = "ArrowLeft";
				labelIconOrder = "leading";
				if (order === 1) {
					fillX = droppableRect.width / 2;
					label = "Create container";
					labelIcon = "ArrowRight";
					labelIconOrder = "leading";
				}
			}
			if (direction === contentDirection.HORIZONTAL) {
				fillWidth = droppableRect.width;
				fillHeight = droppableRect.height / 2;
				label = "Create container";
				labelIcon = "ArrowUp";
				labelIconOrder = "leading";
				if (order === 1) {
					fillY = droppableRect.height / 2;
					label = "Create container";
					labelIcon = "ArrowDown";
					labelIconOrder = "leading";
				}
			}
		}

		/*
		if (axis === DropAxis.cross) {
			fillX = 0;
			fillY = 0;
			fillColor = "var(--accent)";
			fillOpacity = 0.2;
			labelBackgroundColor = fillColor;
			borderColor = fillColor;

			if (direction === contentDirection.VERTICAL) {

				fillWidth = droppableRect.width / 2;
				fillHeight = droppableRect.height;
				label = "Group and add";
				labelIcon = "ArrowLeft";
				labelIconOrder = "leading";
				if (order === 1) {
					fillX = droppableRect.width / 2;
					label = "Group and add";
					labelIcon = "ArrowRight";
					labelIconOrder = "leading";
				}
			}
			if (direction === contentDirection.HORIZONTAL) {
				fillWidth = droppableRect.width;
				fillHeight = droppableRect.height / 2;
				label = "Group and add";
				labelIcon = "ArrowUp";
				labelIconOrder = "leading";
				if (order === 1) {
					fillY = droppableRect.height / 2;
					label = "Group and add";
					labelIcon = "ArrowDown";
					labelIconOrder = "leading";
				}
			}
		}
		*/

		if (axis === DropAxis.main) {
			label = "Move";
			if (!draggableId) {
				label = "Add";
			}

			if (direction === contentDirection.VERTICAL) {
				//labelIcon = "Add";
				//labelIconOrder = "leading";
			}
			if (direction === contentDirection.HORIZONTAL) {
				//labelIcon = "Add";
				//labelIconOrder = "leading";
			}
		}
	}

	if (operation === DropOperation.createContainer) {
		label = "Create new container";
	}

	return (
		<motion.div
			style={{
				position: "absolute",
				pointerEvents: "none",
				top: 0,
				left: 0,
				width: width,
				height: height,
				x: x + window.scrollX,
				y: y + window.scrollY,
				zIndex: 10,
			}}
			//initial={{ opacity: 0 }}
			//animate={{ opacity: 1 }}
			//exit={{ opacity: 0 }}
			//transition={transitions.layoutTransition}
		>
			<motion.div
				style={{
					position: "absolute",
					pointerEvents: "none",

					top: 0,
					left: 0,
					width: width,
					height: height,

					backgroundColor: "transparent",
					borderStyle: "solid",
					borderWidth: borderWidth,
					borderColor: borderColor,
					borderRadius: borderRadius,
				}}
			/>
			<motion.div
				// initial={{
				// 	opacity: 0,
				// }}
				// animate={{
				// 	opacity: fillOpacity,
				// }}
				style={{
					position: "absolute",
					pointerEvents: "none",

					left: fillX,
					top: fillY,
					width: fillWidth,
					height: fillHeight,

					backgroundColor: fillColor,
				}}
			/>

			{/* <Label
				label={label}
				icon={labelIcon}
				iconOrder={labelIconOrder}
				foregroundColor={labelForegroundColor}
				backgroundColor={labelBackgroundColor}
			/> */}
		</motion.div>
	);
};

const Label = props => {
	return (
		<motion.span
			// initial={{
			// 	opacity: 0,
			// 	scale: 1.1,
			// }}
			// animate={{
			// 	opacity: 1,
			// 	scale: 1,
			// }}
			// exit={{
			// 	opacity: 0,
			// 	scale: 0.9,
			// }}
			// transition={transitions.layoutTransition}
			style={{
				display: "flex",
				gap: "4px",
				alignItems: "center",

				paddingLeft: props.labelIcon ? (props.iconOrder === "trailing" ? 8 : 6) : 8,
				paddingRight: props.labelIcon ? (props.iconOrder === "trailing" ? 6 : 8) : 8,
				paddingTop: 4,
				paddingBottom: 4,

				borderRadius: "4px",
				background: props.backgroundColor,

				color: props.foregroundColor,
				fontFamily: "var(--ui-family)",
				fontSize: "13px",
				lineHeight: "16px",
				whiteSpace: "nowrap",

				position: "absolute",
				overflow: "hidden",
				top: "100%",
				left: "50%",
				x: "-50%",
				y: "8px",
				z: selectedZ + 999,
			}}
		>
			{props.icon && props.iconOrder === "leading" && <Icon name={props.icon} size={16} />}
			{props.label}
			{props.icon && props.iconOrder === "trailing" && <Icon name={props.icon} size={16} />}
		</motion.span>
	);
};

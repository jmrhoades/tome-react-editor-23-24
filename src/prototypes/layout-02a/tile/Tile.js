import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { LayoutContext } from "../layout/LayoutContext";
import { EventContext } from "../event/EventContext";

import { transitions } from "../ds/Transitions";
import { Frame } from "../ds/Components";
import { SelectBox } from "./SelectBox";
import { SVGFrame } from "../ds/Components";

import { Text } from "../text/Text";
import { Hover } from "./Hover";

export const Tile = ({ tile }) => {
	const { tomeData, currentPage, selectionMotionValue, getSelectedTiles } = React.useContext(TomeContext);
	const { cornerRadius, pageScale } = React.useContext(LayoutContext);
	const { onTilePointerDown, onTileHoverStart, onTileHoverEnd } = React.useContext(EventContext);

	const x = useMotionValue(tile.startRect.x);
	const y = useMotionValue(tile.startRect.y);
	const width = useMotionValue(tile.startRect.width);
	const height = useMotionValue(tile.startRect.height);
	const zIndex = useMotionValue(0);
	tile.x = x;
	tile.y = y;
	tile.width = width;
	tile.height = height;
	tile.zIndex = zIndex;

	const paddingWidth = useMotionValue(0);
	const paddingHeight = useMotionValue(0);
	const hoverWidth = useMotionValue(0);
	const hoverHeight = useMotionValue(0);

	const parentHoverArea = useTransform(() => pageScale.get() * 12);
	const parentHoverX = useTransform(() => parentHoverArea.get() / 2);
	const parentHoverY = useTransform(() => parentHoverArea.get() / 2);

	// Selected state
	const isSelected = () => getSelectedTiles().find(t => t.id === tile.id);
	const [selected, setSelected] = React.useState(isSelected());
	useMotionValueEvent(selectionMotionValue, "change", latest => {
		setSelected(isSelected());
	});

	//const isParentSelected = val => {};
	//const [parentSelected, setParentSelected] = React.useState(isParentSelected(selection));
	//const [sibllingSelected, setSiblingSelected] = React.useState(isParentSelected(selection));

	// Editing or focused state
	const [editing, setEditing] = React.useState(false);

	const updateRect = () => {
		const el = document.getElementById("lv_" + tile.id);
		if (!el) return false;
		const rect = el.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return false;

		const newX = rect.x;
		const newY = rect.y;
		const newW = rect.width;
		const newH = rect.height;
		tile.cachedX = rect.x;
		tile.cachedY = rect.y;
		tile.cachedW = rect.width;
		tile.cachedH = rect.height;

		paddingWidth.set(newW - parentHoverArea.get());
		paddingHeight.set(newH - parentHoverArea.get());
		hoverWidth.set(newW - parentHoverArea.get() * 2);
		hoverHeight.set(newH - parentHoverArea.get() * 2);

		if (tile.animateLayout) {
			animate(x, newX, transitions.layoutTransition);
			animate(y, newY, transitions.layoutTransition);
			animate(width, newW, transitions.layoutTransition);
			animate(height, newH, transitions.layoutTransition);
		} else {
			x.set(newX);
			y.set(newY);
			width.set(newW);
			height.set(newH);
		}
		tile.animateLayout = false;
		//console.log("updateRect" rect.x, rect.width);
	};
	// Re-calculate layout when tomeData or pageScale changes
	React.useEffect(() => updateRect(), [tomeData]);
	useMotionValueEvent(pageScale, "change", latest => updateRect(false));

	//const pointerEvents = tile.parent === null || parentSelected ? "auto" : "none";
	const backgroundColor = tile.tiles.length !== 0 ? "transparent" : currentPage.theme.colors.t4;
	//const backgroundColor = currentPage.theme.colors.t2;
	console.log(tile.id, "render", tile.parent);

	return (
		<Frame
			id={tile.id}
			style={{
				x: x,
				y: y,
				width: width,
				height: height,
				borderRadius: cornerRadius,
				pointerEvents: "auto",
				backgroundColor: backgroundColor,
				zIndex: zIndex,
			}}
		>
			<SelectBox tile={tile} selected={selected} editing={editing} />
			<Hover tile={tile} />

			{/* HIT AREAS FOR TILE HOVER/SELECTION AND PARENT HOVER/SELECTION */}
			{tile.parent && (
				<SVGFrame>
					<motion.rect
						x={parentHoverX}
						y={parentHoverY}
						width={paddingWidth}
						height={paddingHeight}
						rx={cornerRadius}
						stroke={currentPage.theme.colors.accent}
						strokeWidth={parentHoverArea}
						strokeOpacity={0}
						style={{ pointerEvents: "auto" }}
						onPointerDownCapture={e => onTilePointerDown(e, tile.parent)}
						onHoverStart={e => onTileHoverStart(e, tile.parent)}
						onHoverEnd={e => onTileHoverEnd(e, tile.parent)}
					/>
					<motion.rect
						x={parentHoverArea}
						y={parentHoverArea}
						width={hoverWidth}
						height={hoverHeight}
						fill={currentPage.theme.colors.accent}
						fillOpacity={0}
						style={{ pointerEvents: "auto" }}
						onPointerDownCapture={e => onTilePointerDown(e, tile)}
						onHoverStart={e => onTileHoverStart(e, tile)}
						onHoverEnd={e => onTileHoverEnd(e, tile)}
					/>
				</SVGFrame>
			)}
			{!tile.parent && (
				<SVGFrame>
					<motion.rect
						x={0}
						y={0}
						width={width}
						height={height}
						fill={currentPage.theme.colors.accent}
						fillOpacity={0}
						style={{ pointerEvents: "auto" }}
						onPointerDownCapture={e => onTilePointerDown(e, tile)}
						onHoverStart={e => onTileHoverStart(e, tile)}
						onHoverEnd={e => onTileHoverEnd(e, tile)}
					/>
				</SVGFrame>
			)}
		</Frame>
	);
};

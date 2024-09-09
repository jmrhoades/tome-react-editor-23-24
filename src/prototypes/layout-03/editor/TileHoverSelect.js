import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { EditorContext } from "./EditorContext";

export const TileHoverSelect = props => {
	const { tiles, tomeData } = props;
	return (
		<div id="tile-events">
			{tiles.map(t => (
				<TileView key={t.id} tile={t} tomeData={tomeData} />
			))}
		</div>
	);
};

const TileView = props => {
	const { dragX, dragY, onTilePointerDown, isTileSelected, allowHover, isTileDraggable, pageScale } =
		React.useContext(EditorContext);
	const { tile, tomeData } = props;

	const draggable = isTileDraggable(tile);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);
	const borderRadius = useMotionValue(0);
	const hoverColor = useMotionValue("");
	const selected = isTileSelected(tile);

	const [hovering, setHovering] = React.useState(false);

	const updateRect = () => {
		const el = document.getElementById(tile.id);
		const rect = el.getBoundingClientRect();
		x.set(rect.x + window.scrollX);
		y.set(rect.y + window.scrollY);
		width.set(rect.width);
		height.set(rect.height);
		const style = getComputedStyle(el);
		borderRadius.set(parseInt(style.borderRadius) * pageScale.get());
		hoverColor.set(style.getPropertyValue("--accent-color-40"));
	};

	// If tile is deselected, set hover to false
	React.useEffect(() => {
		if (!selected) setHovering(false);
	}, [selected]);

	// Update metrics when data or state changes
	React.useEffect(updateRect, [tile, tomeData, hovering]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	// if dragging, if tile is a flex container,

	return (
		<SVG
			style={{
				x: draggable ? dragX : undefined,
				y: draggable ? dragY : undefined,
				left: x,
				top: y,
				width: width,
				height: height,
			}}
			onPointerDown={e => {
				onTilePointerDown(e, tile);
				e.stopPropagation();
			}}
			onPointerEnter={e => {
				if (allowHover.current === false) return;
				setHovering(true);
			}}
			onPointerLeave={e => {
				if (allowHover.current === false) return;
				setHovering(false);
			}}
		>
			{!selected && tomeData.editor.debug.showTileHover && (
				<motion.rect
					width={width}
					height={height}
					rx={borderRadius}
					strokeWidth={2}
					initial={false}
					animate={{
						opacity: hovering ? 1 : 0,
					}}
					transition={{
						duration: hovering ? 0 : 0.2,
					}}
					style={{
						//stroke: "var(--accent-color-40)",
						stroke: hoverColor,
					}}
				/>
			)}
		</SVG>
	);
};

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	overflow: visible;
	fill: none;
`;

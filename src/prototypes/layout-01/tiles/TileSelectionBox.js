import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { LayoutContext } from "../tome/LayoutContext";
import { TomeContext } from "../tome/TomeContext";

const Box = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	/* transition: opacity 0.2s ease-out; */
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
	fill: none;
	pointer-events: none;
`;

export const TileSelectionBox = props => {
	const { getTilesInRow, getTileRow, setLayoutTweaking } = React.useContext(TomeContext);
	const { resizeTile } = React.useContext(LayoutContext);
	const tile = props.tile;

	const hitArea = 16 * props.scale;
	const hitAreaFill = "transparent"; //"oklch(1 .2 0 / .25)";

	const colors = props.theme.colors;
	const strokeWidth = 1.5;
	const goGray = props.editing;

	//const pointerEvents = props.selected ? "auto" : "auto";

	const pointerEvents = useMotionValue("none");
	const resizeCursor = useMotionValue("default");
	const pointerInfo = React.useRef(null);
	const [active, setActive] = React.useState(false);

	const onResizeDown = (e, side, cursor = "ns-cursor") => {
		// console.log("Tile: onResizeDown", side);

		// the row the tile is in
		const row = getTileRow(tile);
		// All tiles in the same row & page
		const tiles = getTilesInRow(tile);

		// Set pointer info
		pointerInfo.current = {};
		pointerInfo.current.startX = e.clientX;
		pointerInfo.current.startY = e.clientY;
		pointerInfo.current.side = side;
		pointerInfo.current.row = row;
		pointerInfo.current.cachedTileHeight = tile.height;
		pointerInfo.current.cachedTileWidth = tile.width;
		pointerInfo.current.cachedTileX = tile.x;
		pointerInfo.current.tiles = tiles;

		// Add mouse listeners
		resizeCursor.set(cursor);
		setActive(true);
		setLayoutTweaking(true);

		// Update cursor
		//document.body.classList.add(cursor);

		// Stop pointer event propagation
		e.stopPropagation();
	};

	const onResizeMove = e => {
		// console.log("Tile: onResize Move", pointerInfo.current.side);

		if (e.touches && e.touches.length > 0) {
			e.preventDefault();
			e = e.changedTouches[0];
		}
		pointerInfo.current.x = e.clientX;
		pointerInfo.current.y = e.clientY;
		pointerInfo.current.dx = e.clientX - pointerInfo.current.startX;
		pointerInfo.current.dy = e.clientY - pointerInfo.current.startY;

		resizeTile(tile, pointerInfo.current.side, pointerInfo.current.dx, pointerInfo.current.dy, pointerInfo.current.cachedTileHeight, pointerInfo.current.cachedTileWidth, pointerInfo.current.cachedTileX);

		//e.preventDefault(); 
	};

	const onResizeUp = e => {
		//console.log("Tile: onResize Up", e);
		setLayoutTweaking(false);
		setActive(false);
	};

	React.useEffect(() => {
		if (props.selected) {
			pointerEvents.set("auto");
		} else {
			pointerEvents.set("none");
		}
	}, [props.selected, pointerEvents]);

	React.useEffect(() => {
		const setMouseMoveFromEvent = e => onResizeMove(e);
		const setMouseUpFromEvent = e => onResizeUp(e);
		if (active) {
			// Set cursor
			document.body.classList.add(resizeCursor.get());
			// Add mouse listeners
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			// Remove cursor
			document.body.classList.remove(resizeCursor.get());
			// Remove mouse listeners
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [active, resizeCursor]);

	return (
		<Box
			style={{
				opacity: props.selected ? 1 : 0,
			}}
		>
			<SVG>
				<rect
					width="100%"
					height="100%"
					rx={props.borderRadius}
					stroke={goGray ? colors.backgrounds.page : colors.accent}
					strokeWidth={strokeWidth}
				/>
				<rect
					width="100%"
					height="100%"
					rx={props.borderRadius}
					stroke={goGray ? colors.t4 : "transparent"}
					strokeWidth={strokeWidth}
				/>

				{/* Top resize */}
				<motion.rect
					fill={hitAreaFill}
					width="100%"
					height={hitArea}
					x={0}
					y={0}
					style={{ cursor: "ns-resize", y: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "top", "ns-resize");
					}}
				/>

				{/* Bottom resize */}
				<motion.rect
					fill={hitAreaFill}
					width="100%"
					height={hitArea}
					x={0}
					y={"100%"}
					style={{ cursor: "ns-resize", y: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "bottom", "ns-resize");
					}}
				/>

				{/* Right resize */}
				<motion.rect
					fill={hitAreaFill}
					width={hitArea}
					height="100%"
					x={"100%"}
					y={"0"}
					style={{ cursor: "ew-resize", x: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "right", "ew-resize");
					}}
				/>

				{/* Left resize */}
				<motion.rect
					fill={hitAreaFill}
					width={hitArea}
					height="100%"
					x={0}
					y={0}
					style={{ cursor: "ew-resize", x: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "left", "ew-resize");
					}}
				/>

				{/* Top left corner resize */}
				<motion.rect
					fill={hitAreaFill}
					width={hitArea}
					height={hitArea}
					x={0}
					y={0}
					style={{ cursor: "nwse-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "nw", "nwse-resize");
					}}
				/>

				{/* Top right corner resize */}
				<motion.rect
					fill={hitAreaFill}
					width={hitArea}
					height={hitArea}
					x={"100%"}
					y={0}
					style={{ cursor: "nesw-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "ne", "nesw-resize");
					}}
				/>

				{/* Bottom right corner resize */}
				<motion.rect
					fill={hitAreaFill}
					width={hitArea}
					height={hitArea}
					x={"100%"}
					y={"100%"}
					style={{ cursor: "nwse-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "se", "nwse-resize");
					}}
				/>

				{/* Bottom left corner resize */}
				<motion.rect
					fill={hitAreaFill}
					width={hitArea}
					height={hitArea}
					x={0}
					y={"100%"}
					style={{ cursor: "nesw-resize", x: -hitArea / 2, y: -hitArea / 2, pointerEvents: pointerEvents }}
					onPointerDownCapture={e => {
						onResizeDown(e, "sw", "nesw-resize");
					}}
				/>
			</SVG>
		</Box>
	);
};

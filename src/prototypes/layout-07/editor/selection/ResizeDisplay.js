import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

import { containerSize } from "../../tome/TileData";
import { TomeContext } from "../../tome/TomeContext";
import { PopoverContext } from "../popovers/PopoverContext";
import { EditorContext, selectedZ } from "../EditorContext";
import { Panels } from "../popovers/panels/panels";

export const ResizeDisplay = props => {
	
	const { pointerInfo } = React.useContext(EditorContext);
	const { setTileWidthType, setTileHeightType } = React.useContext(TomeContext);
	const { togglePanel } = React.useContext(PopoverContext);
	const { tile, backgroundColor, foregroundColor } = props;

	const widthMotionVal = useMotionValue("");
	const heightMotionVal = useMotionValue("");
	const sep = "×";
	const offset = 12;

	let showInfo = "widthAndHeight";
	const handle = pointerInfo.current.resizeHandle;
	console.log(handle);

	if (handle === "left" || handle === "right") {
		showInfo = "width";
	}
	if (handle === "top" || handle === "bottom") {
		showInfo = "height";
	}

	// Bottom
	let displayTop = "unset";
	let displayBottom = -offset + "px";
	let displayLeft = "50%";
	let displayRight = "unset";
	let displayX = "-50%";
	let displayY = "100%";

	// Top
	if (handle === "top") {
		displayTop = "unset";
		displayBottom = "100%";
		displayY = -offset + "px";
	}

	// Right
	if (handle === "right") {
		displayTop = "50%";
		displayBottom = "unset";
		displayLeft = "100%";
		displayX = offset + "px";
		displayY = "-50%";
	}

	// Left
	if (handle === "left") {
		displayTop = "50%";
		displayY = "-50%";
		displayBottom = "unset";
		displayRight = "100%";
		displayX = -offset + "px";
		displayLeft = "unset";
	}

	// Bottom right
	if (handle === "bottom-right") {
		displayLeft = "100%";
		displayX = "-50%";
	}

	// Bottom left
	if (handle === "bottom-left") {
		displayLeft = "unset";
		displayRight = "100%";
		displayX = "50%";
	}

	// Top right
	if (handle === "top-right") {
		displayLeft = "100%";
		displayX = "-50%";

		displayTop = "unset";
		displayBottom = "100%";
		displayY = -offset + "px";
	}

	// Top left
	if (handle === "top-left") {
		displayLeft = "unset";
		displayRight = "100%";
		displayX = "50%";

		displayTop = "unset";
		displayBottom = "100%";
		displayY = -offset + "px";
	}

	useAnimationFrame((time, delta) => {
		let width = "";
		let height = "";

		if (tile.layout.width.type === containerSize.FILL) width = "Fill";
		if (tile.layout.height.type === containerSize.FILL) height = "Fill";

		if (tile.layout.width.type === containerSize.HUG) width = "Fit";
		if (tile.layout.width.type === containerSize.CUSTOM) width = parseInt(tile.layout.width.value);

		if (tile.layout.height.type === containerSize.HUG) height = "Fit";
		if (tile.layout.height.type === containerSize.CUSTOM) height = parseInt(tile.layout.height.value);

		widthMotionVal.set(width);
		heightMotionVal.set(height);
	});

	return (
		<motion.span
			style={{
				display: "block",
				position: "absolute",

				top: displayTop,
				bottom: displayBottom,
				left: displayLeft,
				right: displayRight,
				x: displayX,
				y: displayY,

				transformStyle: "preserve-3d",
				z: selectedZ + 10,

				//pointerEvents: "auto",
				//cursor: "pointer",
			}}
			onPointerDown={e => {
				togglePanel(Panels[tile.type], e, tile);
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<motion.span
				style={{
					display: "flex",
					gap: "6px",
					alignItems: "center",

					paddingLeft: 8,
					paddingRight: 8,
					paddingTop: 6,
					paddingBottom: 6,

					//borderRadius: "4px",
					//background: backgroundColor,
					//color: foregroundColor,
					color: "var(--t9)",

					borderRadius: "var(--hud-border-radius)",
					backgroundColor: "var(--hud-background-color)",
					boxShadow: "var(--stroke-and-shadow)",

					fontSize: "11px",
					fontFamily: "var(--ui-family)",
					fontWeight: 600,
					lineHeight: 1,
					fontVariantNumeric: "tabular-nums",
				}}
			>
				{(showInfo === "width" || showInfo === "widthAndHeight") && (
					<span
						// onPointerDown={e => {
						// 	togglePanel(null, e);
						// 	let newSize = containerSize.FILL;
						// 	if (tile.layout.width.type === containerSize.FILL) newSize = containerSize.HUG;
						// 	setTileWidthType(tile, newSize);

						// 	e.stopPropagation();
						// }}
						style={{
							display: "flex",
							gap: "3px",
							alignItems: "center",
							// pointerEvents: "auto",
							// cursor: "pointer",
						}}
					>
						<span style={{ opacity: 0.5 }}>W</span>
						<motion.span>{widthMotionVal}</motion.span>
					</span>
				)}

				{/* <motion.span style={{ y: -0.5 }}>{sep}</motion.span> */}

				{(showInfo === "height" || showInfo === "widthAndHeight") && (
					<span
						// onPointerDown={e => {
						// 	togglePanel(null, e);
						// 	let newSize = containerSize.FILL;
						// 	if (tile.layout.height.type === containerSize.FILL) newSize = containerSize.HUG;
						// 	setTileHeightType(tile, newSize);

						// 	e.stopPropagation();
						// }}
						style={{
							display: "flex",
							gap: "3px",
							alignItems: "center",
							// pointerEvents: "auto",
							// cursor: "pointer",
						}}
					>
						<span style={{ opacity: 0.5 }}>H</span>
						<motion.span>{heightMotionVal}</motion.span>
					</span>
				)}
			</motion.span>
		</motion.span>
	);
};

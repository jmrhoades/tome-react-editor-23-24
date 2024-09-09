import React, { useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { transitions } from "../../ds/Transitions";

import { DiagramProvider } from "./Context";
import { RangeSelection } from "./RangeSelection";
import { Block } from "./Block";
import { GhostBlock } from "./GhostBlock";
import { Frame } from "./Frame";
import { Properties } from "./Properties";
import { DotGrid } from "./DotGrid";
import { getBoundingBox, getBoundingBoxScaleA } from "./_utilities";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* overflow: hidden; */
`;

const GhostView = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const BlockView = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	pointer-events: none;
`;

const GhostRect = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

export const TileDrawing = props => {
	const { scale } = useContext(MetricsContext).metrics; // Causes rerender when window resizes

	const canvasId = props.tile.id + "_diagram";
	const data = props.tile.params.blocks;

	//console.log("Drawing - render", scale);

	React.useEffect(() => {
		console.log("Drawing - loaded");
	}, []);

	// Selection state
	const selectedIds = useMotionValue("");
	const propertyId = useMotionValue("");
	const canvasCursor = useMotionValue(props.isOnlyTile ? "default" : "grab");
	const editing = useMotionValue(false);
	const ghostCanvasOpacity = useMotionValue(0);
	const dotGridOpacity = useMotionValue(0);

	const selectionRect = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
		opacity: useMotionValue(0),
	};

	// Listen for selection changes
	useMotionValueEvent(selectedIds, "change", latest => {
		if (latest !== "") {
			props.tile.selectedIds = selectedIds.get();
			editing.set(true);
		} else {
			propertyId.set("");
			props.tile.selectedIds = null;
		}
	});

	// Listen for editing state changes
	useMotionValueEvent(editing, "change", latest => {
		if (latest) {
			//props.tileSelectedColor.set(props.theme.colors.z4);

			canvasCursor.set("crosshair");
			
			animate(dotGridOpacity, 1, { duration: 0.1 });
			animate(props.tileSelectedColor, props.theme.colors.accent35, { duration: 0.1 });
		} else {
			//props.tileSelectedColor.set(props.theme.colors.accent);

			canvasCursor.set(props.isOnlyTile ? "default" : "grab");
			selectedIds.set("");
			animate(dotGridOpacity, 0, { duration: 0.2 });
			animate(props.tileSelectedColor, props.theme.colors.accent, { duration: 0.2 });
		}
	});



	// Reset object selection when tile loses selection
	React.useEffect(() => {
		if (!props.isSelected) {
			selectedIds.set("");
			editing.set(false);
			ghostCanvasOpacity.set(0);
		} else {
			ghostCanvasOpacity.set(0.2);
		}
	}, [props.isSelected, props.layoutTweaking]);

	// Listen for newly added blocks
	React.useEffect(() => {
		if (data && data.length > 0) {
			const lastShapeAdded = data[data.length - 1];
			if (lastShapeAdded.new) {
				selectedIds.set(lastShapeAdded.id);
				propertyId.set(lastShapeAdded.id);
				lastShapeAdded.new = undefined;
			}
		}
	});

	// Listen for scroll events when tile is selected
	React.useEffect(() => {
		if (props.isSelected) {
			const handleScroll = event => {
				propertyId.set("");
			};
			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, [props.isSelected]);

	// Listen for keyboard events when tile is selected
	React.useEffect(() => {
		if (props.isSelected) {
			const handleKeyDown = e => {
				// console.log("Drawing tile, key down:", e);
				if (e.key === "Backspace") {
					const blockId = selectedIds.get();
					if (blockId !== "") {
						let indexOfBlock = -1;
						data.forEach((b, i) => {
							if (b.id === blockId) indexOfBlock = i;
						});
						if (indexOfBlock > -1) {
							// Delete the shape!
							data.splice(indexOfBlock, 1);
							selectedIds.set("");
							props.saveState();
							e.preventDefault();
							e.stopPropagation();
						}
					}
				}
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [props.isSelected]);

	// Scaling Try 1
	// Use tile width as a scale factor
	//const tileWidthScale = props.tile.width / 12;
	//const tileScale = scale * tileWidthScale;

	// Scaling Try 2
	// Find the bounding box of the content
	const scaledShapes = [];
	data.forEach(b => {
		scaledShapes.push({
			width: b.params.width * scale,
			height: b.params.height * scale,
			x: b.params.x * scale,
			y: b.params.y * scale,
			rotation: b.params.rotation,
		});
	});
	const boundingBox = getBoundingBox(scaledShapes);
	const boundingBoxScale = getBoundingBoxScaleA(boundingBox, props.tileWidth, props.tileHeight);
	//const tileScale = scale * boundingBoxScale;

	// Clip to tile
	const tileScale = scale;
	//console.log(boundingBoxScale, boundingBox.height, props.tileWidth, props.tileHeight );

	return (
		<DiagramProvider>
			<Wrap
				id={canvasId}
				onContextMenu={e => {
					e.preventDefault();
				}}
			>
				<GhostView>
					{/* <GhostRect
					className="selectionRect"
					style={{
						width: selectionRect.width,
						height: selectionRect.height,
						x: selectionRect.x,
						y: selectionRect.y,
						opacity: selectionRect.opacity,
						border: `1px solid rgba(237, 0, 235, 0.9)`,
						backgroundColor: `rgba(237, 0, 235, 0.1)`,
						borderRadius: 2,
					}}
				/> */}
					<motion.div
						className="ghostCanvas"
						style={{
							position: "absolute",
							opacity: ghostCanvasOpacity,
						}}
						animate={{
							x: props.tileWidth / 2,
							y: props.tileHeight / 2,
						}}
						transition={transitions.layoutTransition}
						initial={false}
					>
						{data &&
							data.map((b, i) => (
								<GhostBlock key={b.id} block={b} pageScale={tileScale} tileHeight={props.tileHeight} />
							))}
					</motion.div>
				</GhostView>

				<DotGrid scale={scale} dotGridOpacity={dotGridOpacity} theme={props.theme}/>

				{props.isSelected && (
					<RangeSelection
						canvasId={canvasId}
						selectedIds={selectedIds}
						canvasCursor={canvasCursor}
						editing={editing}
						selectionRect={selectionRect}
					/>
				)}

				<BlockView
					style={{
						borderRadius: props.borderRadius,
						//background: props.theme.colors.backgrounds.page,
					}}
				>
					<motion.div
						className="blockCanvas"
						style={{
							position: "absolute",
						}}
						animate={{
							x: props.tileWidth / 2,
							y: props.tileHeight / 2,
						}}
						transition={transitions.layoutTransition}
						initial={false}
					>
						{data &&
							data.map((b, i) => (
								<Block key={b.id} block={b} pageScale={tileScale} tileHeight={props.tileHeight} />
							))}
					</motion.div>
				</BlockView>

				<motion.div
					className="blockCanvas"
					style={{
						position: "absolute",
					}}
					animate={{
						x: props.tileWidth / 2,
						y: props.tileHeight / 2,
					}}
					transition={transitions.layoutTransition}
					initial={false}
				>
					{props.isSelected &&
						!props.layoutTweaking &&
						data &&
						data.map((b, i) => (
							<Frame
								key={b.id + "_frame"}
								block={b}
								canvasId={canvasId}
								pageScale={tileScale}
								selectedIds={selectedIds}
								propertyId={propertyId}
								theme={props.theme}
							/>
						))}
				</motion.div>

				{props.isSelected &&
					!props.layoutTweaking &&
					data &&
					data.length > 0 &&
					createPortal(
						<Properties data={data} canvasId={canvasId} propertyId={propertyId} theme={props.theme} />,
						document.body
					)}
			</Wrap>
		</DiagramProvider>
	);
};

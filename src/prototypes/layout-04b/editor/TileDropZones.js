import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useTransform, useMotionValueEvent, transform } from "framer-motion";

import { EditorContext, Events, DropOperation, DropAxis, DropPosition } from "./EditorContext";
import { TomeContext } from "../tome/TomeContext";

export const TileDropZones = props => {
	const { tiles, tomeData, event } = props;
	const { isTileRearrangeTarget } = React.useContext(EditorContext);

	const [dragging, setDragging] = React.useState(false);

	//const notSelectedTiles = tiles.filter(t => !t.selected);

	// filter out children of selected parents
	const validTiles = [];
	tiles.forEach(t => {
		if (isTileRearrangeTarget(t)) validTiles.push(t);
	});

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			setDragging(true);
		}
		if (latest === Events.ReleasedTile) {
			setDragging(false);
		}
	});

	return (
		<>
			{dragging && (
				<>
					{validTiles.map(t =>
						t.type === "FLEX" ? (
							<FlexDropZones key={t.id} tile={t} tomeData={tomeData} event={event} />
						) : (
							<ContentDropZones key={t.id} tile={t} tomeData={tomeData} event={event} />
						)
					)}
				</>
			)}
		</>
	);
};

const FlexDropZones = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { pageScale, cancelDropStatus, setDropStatus, pointerInfo } = React.useContext(EditorContext);

	const { tile, tomeData } = props;

	const reorderColor = tomeData.editor.debug.showReorderDropZones ? "var(--accent-40)" : "rgba(255, 255, 255, 0)";

	const [renders, setRenders] = React.useState(0);

	const direction = tile.layout.direction;
	const el = document.getElementById(tile.id);
	const rect = el ? el.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 };
	const borderRadius = tile.type === "FLEX" ? tile.layout.borderRadius * pageScale.get() : 0;
	const reorderHoverOpacity = useMotionValue(0);
	const createContainerOpacity = useMotionValue(0);
	const padding = 4;
	const gap = tile.layout.gap * pageScale.get();

	const style = el ? getComputedStyle(el) : null;
	const containerStrokeColor = style ? style.getPropertyValue("--accent-color-40") : "--accent-color-40";

	const parent = findTileById(tile.parentId);
	const parentDirection = parent.layout.direction;

	let innerMainAxisWidth = 0;
	let innerMainAxisHeight = 0;
	let innerMainAxisStartX = 0;
	let innerMainAxisStartY = 0;
	let innerMainAxisEndX = 0;
	let innerMainAxisEndY = 0;

	let innerCrossAxisWidth = 0;
	let innerCrossAxisHeight = 0;
	let innerCrossAxisStartX = 0;
	let innerCrossAxisStartY = 0;
	let innerCrossAxisEndX = 0;
	let innerCrossAxisEndY = 0;

	const minimumHitArea = 12 * pageScale.get();

	const parentOfDraggingTile = tile.id === pointerInfo.current.tileInfo.parentId;

	if (direction === "column" && tile.tiles && tile.tiles.length === 2 && parentOfDraggingTile) {
		// innerMainAxisWidth = minimumHitArea;
		// innerMainAxisHeight = rect.height;

		// innerMainAxisStartX = rect.x;
		// innerMainAxisStartY = rect.y;

		// innerMainAxisEndX = rect.x + rect.width - minimumHitArea;
		// innerMainAxisEndY = rect.y;

		innerCrossAxisWidth = minimumHitArea;
		innerCrossAxisHeight = rect.height;
		innerCrossAxisStartX = rect.x;
		innerCrossAxisStartY = rect.y;
		innerCrossAxisEndX = rect.x + rect.width - minimumHitArea;
		innerCrossAxisEndY = rect.y;
	}

	if (direction === "row" && tile.tiles && tile.tiles.length === 2 && parentOfDraggingTile) {
		// innerMainAxisWidth = rect.width;
		// innerMainAxisHeight = minimumHitArea;

		// innerMainAxisStartX = rect.x;
		// innerMainAxisStartY = rect.y;

		// innerMainAxisEndX = rect.x;
		// innerMainAxisEndY = rect.y + rect.height - minimumHitArea;

		innerCrossAxisWidth = rect.width;
		innerCrossAxisHeight = minimumHitArea;
		innerCrossAxisStartX = rect.x;
		innerCrossAxisStartY = rect.y;
		innerCrossAxisEndX = rect.x;
		innerCrossAxisEndY = rect.y + rect.height - minimumHitArea;
	}

	const updateRect = () => {
		setRenders(renders + 1);
	};

	// Update metrics when data or state changes
	React.useEffect(updateRect, [tile, tomeData]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	// HACK to get accurate metrics
	// Re-render the component on first load
	// By setting a bullshit state variable
	React.useEffect(() => {
		if (renders < 2) {
			setRenders(renders + 1);
		}
	}, [renders]);

	const dropZoneInfo = [];

	let paddingX = tile.layout.padding.x * pageScale.get();
	let paddingY = tile.layout.padding.y * pageScale.get();
	let startX = rect.x;
	let startY = rect.y;
	let x = startX;
	let y = startY;
	let width = 0;
	let height = 0;
	let prevChildRect = null;
	let isValidDropZone = true;

	tile.tiles.forEach((t, i) => {
		const childEl = document.getElementById(t.id);
		const childRect = childEl ? childEl.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 };
		const indicatorRect = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};
		if (direction === "column") {
			width = rect.width;

			indicatorRect.x = x + paddingX;
			indicatorRect.y = y;
			indicatorRect.width = width - paddingX * 2;

			if (i === 0) {
				height = childRect.y - rect.y + childRect.height / 2;
				indicatorRect.y = y;
				indicatorRect.height = childRect.y - rect.y;
			} else {
				y = prevChildRect.y + prevChildRect.height / 2;
				indicatorRect.y = prevChildRect.y + prevChildRect.height;
				indicatorRect.height = childRect.y - prevChildRect.y - prevChildRect.height;
				height = childRect.y + childRect.height / 2 - y;
			}
			const info = {
				x: x,
				y: y,
				width: width,
				height: height,
				order: i,
				indicatorRect: indicatorRect,
			};
			dropZoneInfo.push(info);
			prevChildRect = childRect;

			// And extra drop zone at the end to fill the container
			if (i === tile.tiles.length - 1) {
				y = prevChildRect.y + prevChildRect.height / 2;
				height = rect.y + rect.height - y;
				const indicatorRect = {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
				};
				indicatorRect.x = x + paddingX;
				indicatorRect.y = prevChildRect.y + prevChildRect.height;
				indicatorRect.width = width - paddingX * 2;
				indicatorRect.height = gap;
				const info = {
					x: x,
					y: y,
					width: width,
					height: height,
					order: i + 1,
					indicatorRect: indicatorRect,
				};
				dropZoneInfo.push(info);
			}
		}

		if (direction === "row") {
			height = rect.height;

			indicatorRect.x = x;
			indicatorRect.y = y + paddingY;
			indicatorRect.height = height - paddingY * 2;

			if (i === 0) {
				width = childRect.x - rect.x + childRect.width / 2;
				indicatorRect.x = x;
				indicatorRect.width = childRect.x - rect.x;
			} else {
				x = prevChildRect.x + prevChildRect.width / 2;
				indicatorRect.x = prevChildRect.x + prevChildRect.width;
				indicatorRect.width = childRect.x - prevChildRect.x - prevChildRect.width;
				width = childRect.x + childRect.width / 2 - x;
			}
			const info = {
				x: x,
				y: y,
				width: width,
				height: height,
				order: i,
				indicatorRect: indicatorRect,
			};
			dropZoneInfo.push(info);
			prevChildRect = childRect;

			// And extra drop zone at the end to fill the container
			if (i === tile.tiles.length - 1) {
				x = prevChildRect.x + prevChildRect.width / 2;
				width = rect.x + rect.width - x;
				const indicatorRect = {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
				};
				indicatorRect.y = y + paddingY;
				indicatorRect.x = prevChildRect.x + prevChildRect.width;
				indicatorRect.height = height - paddingY * 2;
				indicatorRect.width = gap;
				const info = {
					x: x,
					y: y,
					width: width,
					height: height,
					order: i + 1,
					indicatorRect: indicatorRect,
				};
				dropZoneInfo.push(info);
			}
		}
	});

	// console.log(dropZoneInfo);

	return (
		<motion.div
			style={{
				position: "absolute",
				pointerEvents: "none",
			}}
		>
			{/* Reorder drop zones */}

			{dropZoneInfo.map((info, i) => (
				<motion.div
					key={i}
					style={{
						position: "absolute",
						pointerEvents: "auto",
						backgroundColor:
							i % 2 === 0 ? "var(--tome-brand-accent-35-brightness)" : "var(--tome-brand-accent-20-brightness)",
						//border: `1px solid ${reorderBorderColor}`,
						opacity: tomeData.editor.debug.showReorderDropZones ? 0.5 : 0,
						x: info.x,
						y: info.y,
						width: info.width,
						height: info.height,
					}}
					onPointerEnter={e => {
						// is this a valid reorder destination?
						const draggingTile = findTileById(pointerInfo.current.tileInfo.id);
						const draggingTileParent = findTileById(draggingTile.parentId);
						const draggingTileIndex = draggingTileParent.tiles.indexOf(draggingTile);

						isValidDropZone = true;
						if (tile.id === draggingTile.parentId && (i === draggingTileIndex || i === draggingTileIndex + 1)) {
							console.log(tile.id, draggingTile.parentId, i, draggingTileIndex);
							isValidDropZone = false;
						}
						if (isValidDropZone) {
							// console.log("Reorder:", info.order);
							setDropStatus({
								operation: DropOperation.addToContainer,
								axis: DropAxis.main,
								position: info.order,
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
								indicatorRect: info.indicatorRect,
							});
							reorderHoverOpacity.set(1);
						}
					}}
					onPointerLeave={e => {
						reorderHoverOpacity.set(0);
						cancelDropStatus();
					}}
				>
					<DebugLabel>{info.order}</DebugLabel>
				</motion.div>
			))}

			{/* 
                Reorder and set direction drop zones 
                Only if 2 tiles though
            */}

			{/* 
			{tile.tiles && tile.tiles.length === 2 && parentOfDraggingTile && (
				<>
					<motion.div
						style={{
							position: "absolute",
							pointerEvents: "auto",
							backgroundColor: reorderColor,

							opacity: tomeData.editor.debug.showReorderDropZones ? 1 : 0,
							x: innerCrossAxisStartX,
							y: innerCrossAxisStartY,
							width: innerCrossAxisWidth,
							height: innerCrossAxisHeight,
						}}
						onPointerEnter={e => {
							// console.log("Reorder:", info.order);
							setDropStatus({
								operation: DropOperation.addToContainer,
								axis: DropAxis.cross,
								position: "start",
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
								indicatorRect: {
									x: innerCrossAxisStartX,
									y: innerCrossAxisStartY,
									width: innerCrossAxisWidth,
									height: innerCrossAxisHeight,
								},
							});
							reorderHoverOpacity.set(1);
						}}
						onPointerLeave={e => {
							reorderHoverOpacity.set(0);
							cancelDropStatus();
						}}
					>
						<DebugLabel>A</DebugLabel>
					</motion.div>

					<motion.div
						style={{
							position: "absolute",
							pointerEvents: "auto",
							backgroundColor: reorderColor,

							opacity: tomeData.editor.debug.showReorderDropZones ? 1 : 0,
							x: innerCrossAxisEndX,
							y: innerCrossAxisEndY,
							width: innerCrossAxisWidth,
							height: innerCrossAxisHeight,
						}}
						onPointerEnter={e => {
							setDropStatus({
								operation: DropOperation.addToContainer,
								axis: DropAxis.cross,
								position: "end",
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
								indicatorRect: {
									x: innerCrossAxisEndX,
									y: innerCrossAxisEndY,
									width: innerCrossAxisWidth,
									height: innerCrossAxisHeight,
								},
							});
							reorderHoverOpacity.set(1);
						}}
						onPointerLeave={e => {
							reorderHoverOpacity.set(0);
							cancelDropStatus();
						}}
					>
						<DebugLabel>B</DebugLabel>
					</motion.div>
				</>
			)}
			*/}

			{/* Create new container drop zones */}
			<motion.rect
				x={innerMainAxisStartX}
				y={innerMainAxisStartY}
				width={innerMainAxisWidth}
				height={innerMainAxisHeight}
				style={{
					fill: "var(--editor-debug-drop-zone-color-main-axis-start)",
				}}
				onPointerEnter={e => {
					console.log("Create group: main axis start");
					setDropStatus({
						operation: DropOperation.createContainer,
						axis: DropAxis.main,
						position: DropPosition.start,
						parentDirection: parentDirection,
						tileId: tile.id,
						targetRect: e.target.getBoundingClientRect(),
						parentRect: rect,
					});
					createContainerOpacity.set(1);
				}}
				onPointerLeave={e => {
					cancelDropStatus();
					createContainerOpacity.set(0);
				}}
			/>

			<motion.rect
				x={innerMainAxisEndX}
				y={innerMainAxisEndY}
				width={innerMainAxisWidth}
				height={innerMainAxisHeight}
				style={{
					fill: "var(--editor-debug-drop-zone-color-main-axis-end)",
				}}
				onPointerEnter={e => {
					console.log("Create group:  main axis end");
					setDropStatus({
						operation: DropOperation.createContainer,
						axis: DropAxis.main,
						position: DropPosition.end,
						parentDirection: parentDirection,
						tileId: tile.id,
						targetRect: e.target.getBoundingClientRect(),
						parentRect: rect,
					});
					createContainerOpacity.set(1);
				}}
				onPointerLeave={e => {
					cancelDropStatus();
					createContainerOpacity.set(0);
				}}
			/>

			<motion.rect
				x={innerCrossAxisStartX}
				y={innerCrossAxisStartY}
				width={innerCrossAxisWidth}
				height={innerCrossAxisHeight}
				style={{
					fill: "var(--editor-debug-drop-zone-color-cross-axis-start)",
				}}
				onPointerEnter={e => {
					console.log("Create group: cross axis start");
					setDropStatus({
						operation: DropOperation.createContainer,
						axis: DropAxis.cross,
						position: DropPosition.start,
						parentDirection: parentDirection,
						tileId: tile.id,
						targetRect: e.target.getBoundingClientRect(),
						parentRect: rect,
					});
					createContainerOpacity.set(1);
				}}
				onPointerLeave={e => {
					cancelDropStatus();
					createContainerOpacity.set(0);
				}}
			/>

			<motion.rect
				x={innerCrossAxisEndX}
				y={innerCrossAxisEndY}
				width={innerCrossAxisWidth}
				height={innerCrossAxisHeight}
				style={{
					fill: "var(--editor-debug-drop-zone-color-cross-axis-end)",
				}}
				onPointerEnter={e => {
					console.log("Create group: cross axis end");
					setDropStatus({
						operation: DropOperation.createContainer,
						axis: DropAxis.cross,
						position: DropPosition.end,
						parentDirection: parentDirection,
						tileId: tile.id,
						targetRect: e.target.getBoundingClientRect(),
						parentRect: rect,
					});
					createContainerOpacity.set(1);
				}}
				onPointerLeave={e => {
					cancelDropStatus();
					createContainerOpacity.set(0);
				}}
			/>

			<SVG
				style={{
					left: rect.x,
					top: rect.y,
					width: rect.width,
					height: rect.height,
				}}
			>
				{/* Reorder group background */}
				{/* <motion.rect
					width={rect.width}
					height={rect.height}
					rx={borderRadius}
					style={{
						pointerEvents: "none",
						fill: "var(--t2)",
						opacity: reorderHoverOpacity,
					}}
					strokeWidth={1}
				/> */}

				{/* Create new container background */}
				<motion.rect
					x={-padding}
					y={-padding}
					width={rect.width + padding * 2}
					height={rect.height + padding * 2}
					rx={borderRadius}
					style={{ pointerEvents: "none", stroke: containerStrokeColor, opacity: createContainerOpacity }}
					strokeWidth={1}
				/>
			</SVG>
		</motion.div>
	);
};

const ContentDropZones = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { pageScale, cancelDropStatus, setDropStatus } = React.useContext(EditorContext);
	const { tile, tomeData } = props;

	const parent = findTileById(tile.parentId);
	const direction = parent.layout.direction;

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);

	const innerMainAxisWidth = useMotionValue(0);
	const innerMainAxisHeight = useMotionValue(0);
	const innerMainAxisStartX = useMotionValue(0);
	const innerMainAxisStartY = useMotionValue(0);
	const innerMainAxisEndX = useMotionValue(0);
	const innerMainAxisEndY = useMotionValue(0);

	const innerCrossAxisWidth = useMotionValue(0);
	const innerCrossAxisHeight = useMotionValue(0);
	const innerCrossAxisStartX = useMotionValue(0);
	const innerCrossAxisStartY = useMotionValue(0);
	const innerCrossAxisEndX = useMotionValue(0);
	const innerCrossAxisEndY = useMotionValue(0);

	const showHitZoneDelay = 500;
	const timerRef = React.useRef();
	const timerX = useMotionValue(0);
	const timerY = useMotionValue(0);
	const timerWidth = useMotionValue(0);
	const timerHeight = useMotionValue(0);
	const [showHitArea, setShowHitArea] = React.useState(false);

	const padding = 4;
	const frameWidth = useTransform(() => width.get() + padding * 2);
	const framerHeight = useTransform(() => height.get() + padding * 2);

	const [renders, setRenders] = React.useState(0);

	const updateRect = () => {
		const el = document.getElementById(tile.id);
		const rect = el.getBoundingClientRect();

		//let minTargetSize = 0;
		//let targetAreaInsetY = 0;
		//let targetAreaInsetX = 0;

		let crossHitArea = 0;

		if (direction === "column") {
			crossHitArea = rect.height / 4;
			//minTargetSize = rect.height / 2;
		}

		if (direction === "row") {
			crossHitArea = rect.width / 4;
			//minTargetSize = rect.width / 2;
		}

		//let targetWidth = (rect.width * 2) / 3;
		//if (targetWidth < minTargetSize) targetWidth = minTargetSize;
		//let targetHeight = (rect.height * 2) / 3;
		//if (targetHeight < minTargetSize) targetHeight = minTargetSize;

		let targetWidth = rect.width * 0.6667;
		let targetHeight = rect.height * 0.6667;

		x.set(rect.x + window.scrollX);
		y.set(rect.y + window.scrollY);
		width.set(rect.width);
		height.set(rect.height);

		const hitAreaRect = {
			x: 0,
			y: 0,
			width: rect.width,
			height: rect.height,
		};

		const timerAreaRect = {
			x: (rect.width - targetWidth) / 2,
			y: (rect.height - targetHeight) / 2,
			width: targetWidth,
			height: targetHeight,
		};

		timerX.set(timerAreaRect.x);
		timerY.set(timerAreaRect.y);
		timerWidth.set(timerAreaRect.width);
		timerHeight.set(timerAreaRect.height);

		if (direction === "column") {
			innerMainAxisWidth.set(hitAreaRect.width / 2);
			innerMainAxisHeight.set(hitAreaRect.height);

			innerMainAxisStartX.set(hitAreaRect.x);
			innerMainAxisStartY.set(hitAreaRect.y);

			innerMainAxisEndX.set(hitAreaRect.x + hitAreaRect.width / 2);
			innerMainAxisEndY.set(hitAreaRect.y);

			innerCrossAxisWidth.set(hitAreaRect.width);
			innerCrossAxisHeight.set(crossHitArea);

			innerCrossAxisStartX.set(hitAreaRect.x);
			innerCrossAxisStartY.set(hitAreaRect.y);

			innerCrossAxisEndX.set(hitAreaRect.x);
			innerCrossAxisEndY.set(hitAreaRect.y + hitAreaRect.height - crossHitArea);
		}

		if (direction === "row") {
			innerMainAxisWidth.set(hitAreaRect.width);
			innerMainAxisHeight.set(hitAreaRect.height / 2);

			innerMainAxisStartX.set(hitAreaRect.x);
			innerMainAxisStartY.set(hitAreaRect.y);

			innerMainAxisEndX.set(hitAreaRect.x);
			innerMainAxisEndY.set(hitAreaRect.y + hitAreaRect.height / 2);

			innerCrossAxisWidth.set(crossHitArea);
			innerCrossAxisHeight.set(hitAreaRect.height);

			innerCrossAxisStartX.set(hitAreaRect.x);
			innerCrossAxisStartY.set(hitAreaRect.y);

			innerCrossAxisEndX.set(hitAreaRect.x + hitAreaRect.width - crossHitArea);
			innerCrossAxisEndY.set(hitAreaRect.y);
		}
	};

	// Update metrics when data or state changes
	React.useEffect(updateRect, [tile, tomeData]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	// HACK to get accurate metrics
	// Re-render the component on first load
	// By setting a bullshit state variable
	React.useEffect(() => {
		if (renders < 2) {
			setRenders(renders + 1);
		}
	}, [renders]);

	const el = document.getElementById(tile.id);
	const rect = el ? el.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 };
	const borderRadius = tile.type === "FLEX" ? tile.layout.borderRadius * pageScale.get() : 0;
	const createContainerOpacity = useMotionValue(0);

	const style = el ? getComputedStyle(el) : null;
	const containerStrokeColor = style ? style.getPropertyValue("--accent-color-40") : "--accent-color-40";

	return (
		<SVG
			style={{
				left: x,
				top: y,
				width: width,
				height: height,
			}}
		>
			{!showHitArea && (
				<motion.rect
					x={timerX}
					y={timerY}
					width={timerWidth}
					height={timerHeight}
					style={{ fill: "var(--editor-debug-drop-zone-color-main-axis-start)" }}
					onPointerEnter={e => {
						console.log("Start create container timer!");
						timerRef.current = setTimeout(() => setShowHitArea(true), showHitZoneDelay);
					}}
					onPointerLeave={e => {
						console.log("Cancel create container timer!");
						clearTimeout(timerRef.current);
					}}
				/>
			)}
			{showHitArea && (
				<>
					{/* Main axis start*/}
					<motion.rect
						x={innerMainAxisStartX}
						y={innerMainAxisStartY}
						width={innerMainAxisWidth}
						height={innerMainAxisHeight}
						style={{
							fill: "var(--editor-debug-drop-zone-color-main-axis-start)",
						}}
						onPointerEnter={e => {
							console.log("Create group: main axis start");
							setDropStatus({
								operation: DropOperation.createContainer,
								axis: DropAxis.main,
								position: DropPosition.start,
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
							});
							createContainerOpacity.set(1);
							clearTimeout(timerRef.current);
						}}
						onPointerLeave={e => {
							cancelDropStatus();
							createContainerOpacity.set(0);
							timerRef.current = setTimeout(() => setShowHitArea(false), showHitZoneDelay);
						}}
					/>

					<motion.rect
						x={innerMainAxisEndX}
						y={innerMainAxisEndY}
						width={innerMainAxisWidth}
						height={innerMainAxisHeight}
						style={{
							fill: "var(--editor-debug-drop-zone-color-main-axis-end)",
						}}
						onPointerEnter={e => {
							console.log("Create group:  main axis end");
							setDropStatus({
								operation: DropOperation.createContainer,
								axis: DropAxis.main,
								position: DropPosition.end,
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
							});
							createContainerOpacity.set(1);
							clearTimeout(timerRef.current);
						}}
						onPointerLeave={e => {
							cancelDropStatus();
							createContainerOpacity.set(0);
							timerRef.current = setTimeout(() => setShowHitArea(false), showHitZoneDelay);
						}}
					/>

					<motion.rect
						x={innerCrossAxisStartX}
						y={innerCrossAxisStartY}
						width={innerCrossAxisWidth}
						height={innerCrossAxisHeight}
						style={{
							fill: "var(--editor-debug-drop-zone-color-cross-axis-start)",
						}}
						onPointerEnter={e => {
							console.log("Create group: cross axis start");
							setDropStatus({
								operation: DropOperation.createContainer,
								axis: DropAxis.cross,
								position: DropPosition.start,
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
							});
							createContainerOpacity.set(1);
							clearTimeout(timerRef.current);
						}}
						onPointerLeave={e => {
							cancelDropStatus();
							createContainerOpacity.set(0);
							timerRef.current = setTimeout(() => setShowHitArea(false), showHitZoneDelay);
						}}
					/>

					<motion.rect
						x={innerCrossAxisEndX}
						y={innerCrossAxisEndY}
						width={innerCrossAxisWidth}
						height={innerCrossAxisHeight}
						style={{
							fill: "var(--editor-debug-drop-zone-color-cross-axis-end)",
						}}
						onPointerEnter={e => {
							console.log("Create group: cross axis end");
							setDropStatus({
								operation: DropOperation.createContainer,
								axis: DropAxis.cross,
								position: DropPosition.end,
								parentDirection: direction,
								tileId: tile.id,
								parentId: tile.parentId,
								targetRect: e.target.getBoundingClientRect(),
								parentRect: rect,
							});
							createContainerOpacity.set(1);
							clearTimeout(timerRef.current);
						}}
						onPointerLeave={e => {
							cancelDropStatus();
							createContainerOpacity.set(0);
							timerRef.current = setTimeout(() => setShowHitArea(false), showHitZoneDelay);
						}}
					/>

					<motion.rect
						x={-padding}
						y={-padding}
						width={frameWidth}
						height={framerHeight}
						rx={borderRadius}
						style={{ pointerEvents: "none", stroke: containerStrokeColor, opacity: createContainerOpacity }}
						strokeWidth={1}
					/>
				</>
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
const DebugLabel = styled(motion.div)`
	position: absolute;
	pointer-events: none;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 10px;
	font-family: monospace;
	color: var(--t9);
`;

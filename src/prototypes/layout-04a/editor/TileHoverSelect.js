import React from "react";
import styled from "styled-components";
import {
	motion,
	useMotionValue,
	useTransform,
	AnimatePresence,
	useMotionValueEvent,
	animate,
	useAnimationFrame,
} from "framer-motion";

import { EditorContext, Events, selectedZ } from "./EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { Hud } from "../ds/hud/Hud";
import { transitions } from "../ds/Transitions";
import { Icon } from "../ds/Icon";

export const TileHoverSelect = props => {
	const { getCurrentPage, findTileById, findTileAncestorBackgroundColor } = React.useContext(TomeContext);

	const {
		onTilePointerDown,
		onTileResizePointerDown,
		onTextResizePointerDown,

		isAnyTileSelected,
		isTileSelected,

		isParentSelected,
		isChildSelected,
		isSiblingSelected,

		allowHover,
		pageScale,
		event,
		pointerInfo,
	} = React.useContext(EditorContext);

	const { tile, draggable } = props;

	const dragBgOpacity = useMotionValue(0);
	const opacity = useMotionValue(1);

	const strokeWidthHover = useMotionValue(1);
	const strokeWidthHoverScaled = useTransform(() => strokeWidthHover.get() / pageScale.get());

	const strokeWidthSelected = useMotionValue(1);
	const strokeWidthSelectedScaled = useTransform(() => strokeWidthSelected.get() / pageScale.get());

	const resizeHandleSize = useMotionValue(4);
	//const resizeHandleLength = "clamp(12px, 50%, 72px)";
	const resizeHandleLength = useTransform(() => 12 / pageScale.get());
	const resizeHandleSizeScaled = useTransform(() => resizeHandleSize.get() / pageScale.get());
	const resizeHandleBorderRadiusScaled = useTransform(() => resizeHandleSizeScaled.get() / 2 + "px");

	const resizeHitArea = useMotionValue(16);
	const resizeHitAreaScaled = useTransform(() => resizeHitArea.get() * pageScale.get());
	const resizeHitAreaOffset = useTransform(() => resizeHitAreaScaled.get() * -0.5);

	const resizeHandleRightOpacity = useMotionValue(1);
	const resizeHandleLeftOpacity = useMotionValue(1);
	const resizeHandleTopOpacity = useMotionValue(1);
	const resizeHandleBottomOpacity = useMotionValue(1);

	//const resizeHitAreaBgColor = "transparent";
	let resizeHitAreaBgColor = "rgba(255,255,0, 0)";
	const handleColorBoxShadow = "0px 0px 0px 1px hsla(0,0%,0%,0.12), 0px 0px 4px 0px hsla(0,0%,0%,0.00)";
	const handleColor = "white";

	const selected = tile.selected;
	const aTileSelected = isAnyTileSelected();

	const parent = findTileById(tile.parentId);
	let tileIndex = 0;
	if (parent) {
		tileIndex = parent.tiles.indexOf(tile);
	}

	const parentSelected = isParentSelected(tile);
	const childSelected = isChildSelected(tile);
	const siblingSelected = isSiblingSelected(tile);

	const [hovering, setHovering] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);

	const [draggingResize, setDraggingResize] = React.useState(false);
	const [siblingsDraggingResize, setSiblingsDraggingResize] = React.useState(false);

	const [siblingDragging, setSiblingDragging] = React.useState(false);

	const rootContainerId = getCurrentPage().tiles[0].id;

	const isText = tile.type === "TEXT";

	//console.log("selected", selected);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			animate(opacity, 0, transitions.fast);
			if (draggable) {
				animate(dragBgOpacity, 1, transitions.fast);
				if (!dragging) setDragging(true);
			} else {
				setSiblingDragging(true);
			}
		}
		if (latest === Events.ReleasedTile) {
			animate(opacity, 1, transitions.layoutTransition);
			animate(dragBgOpacity, 0, transitions.layoutTransition);
			if (dragging) setDragging(false);
			if (draggingResize) setDraggingResize(false);
			if (siblingsDraggingResize) setSiblingsDraggingResize(false);
			if (siblingDragging) setSiblingDragging(false);

			resizeHandleRightOpacity.set(1);
			resizeHandleBottomOpacity.set(1);
			resizeHandleLeftOpacity.set(1);
			resizeHandleTopOpacity.set(1);
		}
		if (latest === Events.ClickedTile) {
		}
		if (latest === Events.DraggingTileResize) {
			console.log("DraggingTileResize");
			if (draggable) {
				if (!draggingResize) setDraggingResize(true);
				resizeHandleRightOpacity.set(0);
				resizeHandleBottomOpacity.set(0);
				resizeHandleLeftOpacity.set(0);
				resizeHandleTopOpacity.set(0);
			} else {
				if (pointerInfo.current.parent.id === tile.parentId) {
					setSiblingsDraggingResize(true);
				} else {
					setSiblingsDraggingResize(false);
				}
			}
		}
	});

	// If tile is deselected, set hover to false
	React.useEffect(() => {
		if (!selected) setHovering(false);
		if (dragging) setDragging(false);
		if (draggingResize) setDraggingResize(false);
		//resizeHandleRightOpacity.set(0);
		//resizeHandleLeftOpacity.set(0);
		//resizeHandleTopOpacity.set(0);
		//resizeHandleBottomOpacity.set(0);
	}, [selected]);

	let draggingBgColor = tile.theme.tokens["backgroundColor"];
	let borderRadius = tile.theme.tokens["borderRadius"];
	if (draggingBgColor === undefined) {
		//draggingBgColor = findTileAncestorBackgroundColor(tile);
		//draggingBgColor = "transparent";
	}

	draggingBgColor = "transparent";

	return (
		<>
			{/* <DragBg
				style={{
					opacity: dragBgOpacity,
					borderRadius: borderRadius,
					//backgroundColor: "var(--dragging-background-color)",
					backgroundColor: draggingBgColor,
					boxShadow: "var(--shadow-small)",
				}}
			/> */}

			<Div
				style={{
					pointerEvents: "auto",
				}}
				onPointerDown={e => {
					if (rootContainerId === tile.id) return false;
					onTilePointerDown(e, tile);
					e.stopPropagation();
				}}
				onPointerEnter={e => {
					if (rootContainerId === tile.id) return false;
					if (allowHover.current === false) return;
					setHovering(true);
				}}
				onPointerLeave={e => {
					if (rootContainerId === tile.id) return false;
					if (allowHover.current === false) return;
					setHovering(false);
				}}
			/>
			{/* {parentSelected && !hovering && (
					<ParentSelectedRect
						width={"100%"}
						height={"100%"}
						strokeWidth={strokeWidthSelectedScaled}
						strokeLinecap="round"
						strokeDasharray="1, 4"
						style={{
							stroke: "var(--accent-color)",
							z: selectedZ,
						}}
					/>
				)} */}

			{/* {siblingSelected && (
					<SiblingSelectedRect
						width={"100%"}
						height={"100%"}
						strokeWidth={strokeWidthSelectedScaled}
						strokeLinecap="round"
						strokeDasharray="1, 4"
						strokeOpacity={0.25}
						style={{
							stroke: "var(--accent-color)",
						}}
					/>
				)} */}

			<AnimatePresence>
				{childSelected && !siblingDragging && (
					<motion.span
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.1,
						}}
						style={{
							display: "block",
							position: "absolute",
							top: 0.5,
							left: 0.5,
							bottom: 0.5,
							right: 0.5,
							z: selectedZ,
							pointerEvents: "none",
						}}
					>
						<SVG
							style={{
								pointerEvents: "none",
							}}
						>
							<motion.rect
								width={"100%"}
								height={"100%"}
								strokeWidth={strokeWidthSelectedScaled}
								strokeLinecap="round"
								strokeDasharray="1, 5"
								//strokeOpacity={0.25}
								style={{
									stroke: "var(--accent-color)",
									pointerEvents: "none",
								}}
							/>
						</SVG>
					</motion.span>
				)}
			</AnimatePresence>

			{/* <AnimatePresence>
				{selected && !dragging && (
					<motion.div
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.1,
						}}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							//width: "calc(100% * var(--page-scale))",
							height: "calc(100% * var(--page-scale))",
							z: selectedZ,
							pointerEvents: "none",
							borderWidth: "1px",
							borderColor: "var(--accent-color)",
							borderStyle: "solid",
							scale: "var(--inverse-page-scale)",
							originX: 0,
							originY: 0,
						}}
					/>
				)}
			</AnimatePresence> */}

			<AnimatePresence>
				{selected && !dragging && (
					<motion.span
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.1,
						}}
						style={{
							display: "block",
							position: "absolute",
							top: 0.5,
							left: 0.5,
							bottom: 0.5,
							right: 0.5,
							z: selectedZ,
							pointerEvents: "none",
						}}
						// style={{
						// 	//borderWidth: strokeWidthSelectedScaled,
						// 	borderWidth: `calc(1px * var(--inverse-page-scale))`,
						// 	borderColor: "var(--accent-color)",
						// 	borderStyle: "solid",
						// 	z: selectedZ,
						// }}
					>
						<SVG
							style={{
								pointerEvents: "none",
							}}
						>
							<motion.rect
								width={"100%"}
								height={"100%"}
								strokeWidth={strokeWidthSelectedScaled}
								//strokeLinecap="round"
								//strokeDasharray="1, 5"
								//strokeOpacity={0.25}
								style={{
									stroke: "var(--accent-color)",
									pointerEvents: "none",
								}}
							/>
						</SVG>
					</motion.span>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{hovering && !selected && aTileSelected && (
					<HoveringDiv
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.1,
						}}
						style={{
							borderWidth: strokeWidthSelectedScaled,
							borderColor: "var(--accent-color)",
							borderStyle: "solid",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence>

			{selected && !dragging && !isText && (
				<>
					<ResizeHitArea
						style={{
							x: 0,
							y: resizeHitAreaOffset,
							z: selectedZ,
							width: "100%",
							height: resizeHitAreaScaled,
							backgroundColor: resizeHitAreaBgColor,
							cursor: "ns-resize",
						}}
						onPointerDown={e => {
							//console.log("Resize top pointer down");
							onTileResizePointerDown(e, tile, "top");
							e.stopPropagation();
						}}
					>
						<ResizeHandle
							style={{
								boxShadow: handleColorBoxShadow,
								backgroundColor: handleColor,
								height: resizeHandleSizeScaled,
								width: resizeHandleLength,
								borderRadius: resizeHandleBorderRadiusScaled,
								opacity: resizeHandleTopOpacity,
								y: 0.5,
							}}
						/>
					</ResizeHitArea>

					<ResizeHitArea
						style={{
							x: 0,
							y: resizeHitAreaOffset,
							z: selectedZ,
							top: "100%",
							width: "100%",
							height: resizeHitAreaScaled,
							backgroundColor: resizeHitAreaBgColor,
							cursor: "ns-resize",
						}}
						onPointerDown={e => {
							//console.log("Resize bottom pointer down");
							onTileResizePointerDown(e, tile, "bottom");
							e.stopPropagation();
						}}
					>
						<ResizeHandle
							style={{
								boxShadow: handleColorBoxShadow,
								backgroundColor: handleColor,
								height: resizeHandleSizeScaled,
								width: resizeHandleLength,
								borderRadius: resizeHandleBorderRadiusScaled,
								opacity: resizeHandleBottomOpacity,
								y: -0.5,
							}}
						/>
					</ResizeHitArea>

					{/* {tileIndex !== 0 && ( */}
					<ResizeHitArea
						style={{
							x: resizeHitAreaOffset,
							y: 0,
							z: selectedZ,
							width: resizeHitAreaScaled,
							height: "100%",
							backgroundColor: resizeHitAreaBgColor,
							cursor: "ew-resize",
						}}
						onPointerDown={e => {
							//console.log("Resize left pointer down");
							onTileResizePointerDown(e, tile, "left");
							e.stopPropagation();
						}}
					>
						<ResizeHandle
							style={{
								boxShadow: handleColorBoxShadow,
								backgroundColor: handleColor,
								width: resizeHandleSizeScaled,
								height: resizeHandleLength,
								borderRadius: resizeHandleBorderRadiusScaled,
								opacity: resizeHandleLeftOpacity,
								x: 0.5,
							}}
						/>
					</ResizeHitArea>
					{/* )} */}

					<ResizeHitArea
						style={{
							left: "100%",
							x: resizeHitAreaOffset,
							y: 0,
							z: selectedZ,
							width: resizeHitAreaScaled,
							height: "100%",
							backgroundColor: resizeHitAreaBgColor,
							cursor: "ew-resize",
						}}
						onPointerDown={e => {
							// console.log("Resize right pointer down");
							onTileResizePointerDown(e, tile, "right");
							e.stopPropagation();
						}}
					>
						<ResizeHandle
							style={{
								boxShadow: handleColorBoxShadow,
								backgroundColor: handleColor,
								width: resizeHandleSizeScaled,
								height: resizeHandleLength,
								borderRadius: resizeHandleBorderRadiusScaled,
								opacity: resizeHandleRightOpacity,
								x: -0.5,
							}}
						/>
					</ResizeHitArea>
				</>
			)}

			{selected && !dragging && isText && (
				<>
					<ResizeHitArea
						style={{
							left: "100%",
							x: resizeHitAreaOffset,
							y: 0,
							z: selectedZ,
							width: resizeHitAreaScaled,
							height: "100%",
							backgroundColor: resizeHitAreaBgColor,
							cursor: "ew-resize",
						}}
						onPointerDown={e => {
							// console.log("Resize right pointer down");
							onTextResizePointerDown(e, tile, "right");
							e.stopPropagation();
						}}
					>
						<ResizeHandle
							style={{
								boxShadow: handleColorBoxShadow,
								backgroundColor: handleColor,
								width: resizeHandleSizeScaled,
								height: resizeHandleLength,
								borderRadius: resizeHandleBorderRadiusScaled,
								opacity: resizeHandleRightOpacity,
								x: -0.5,
							}}
						/>
					</ResizeHitArea>
				</>
			)}

			<AnimatePresence>
				{draggingResize && <ResizeDisplay tile={tile} handle={pointerInfo.current.resizeHandle} />}
			</AnimatePresence>

			<AnimatePresence>
				{siblingsDraggingResize && <PassiveResizeDisplay tile={tile} handle={pointerInfo.current.resizeHandle} />}
			</AnimatePresence>
			<AnimatePresence>
				{siblingsDraggingResize && (
					<Div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						style={{
							borderWidth: strokeWidthSelectedScaled,
							borderColor: "var(--z4)",
							borderStyle: "solid",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

const Div = styled(motion.span)`
	display: block;
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
const DragBg = styled(Div)``;
const SelectedDiv = styled(Div)``;
const HoveringDiv = styled(Div)``;
const ChildSelectedDiv = styled(Div)``;

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

const HoveringRect = styled(motion.rect)``;
const SelectedRect = styled(motion.rect)``;
const ParentSelectedRect = styled(motion.rect)``;
const ChildSelectedRect = styled(motion.rect)``;
const SiblingSelectedRect = styled(motion.rect)``;

const InverseScale = styled(motion.span)`
	display: "block";
	position: absolute;
	top: 0;
	left: 0;
`;

const ResizeHitArea = styled(motion.span)`
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
`;

const ResizeHandle = styled(motion.span)`
	display: block;
	margin: auto;
	/* box-shadow: var(--stroke-and-shadow); */
	transition: opacity 0.2s ease-out;
`;

const ResizeDisplay = props => {
	const motionVal = useMotionValue("");

	const isWidth = props.handle === "right" || props.handle === "left";
	const isHeight = props.handle === "bottom" || props.handle === "top";

	let icon = "FixedWidth"; // Always fixed when manually resizing (?)
	if (isHeight) icon = "FixedHeight";

	useAnimationFrame((time, delta) => {
		let label = "Fill";
		const v = isWidth ? props.tile.layout.width : props.tile.layout.height;
		const u = v.substring(v.length - 2).toLowerCase();
		if (u === "px") {
			label = parseInt(v);
		}
		motionVal.set(label);
	});

	return (
		<motion.div
			style={{
				//padding: "5px",
				//paddingTop: "4px",
				//paddingBottom: "3px",

				position: "absolute",
				pointerEvents: "none",
				//transformStyle: "preserve-3d",
				z: selectedZ,

				// bottom: -6,
				// left: "50%",
				// x: "-50%",
				// y: "100%",

				top: "-6px",
				left: 0,
				//x: "-50%",
				y: "-100%",

				//top: 6,
				//left: 6,
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
			}}
		>
			<motion.div
				style={{
					display: "flex",
					gap: "4px",
					alignItems: "center",

					paddingLeft: 5,
					paddingRight: 7,
					paddingTop: 3,
					paddingBottom: 3,

					borderRadius: "4px",
					background: "var(--accent-color)",

					color: "white",
					fontSize: "12px",
					lineHeight: 1,

					scale: "var(--inverse-page-scale)",
					originX: 0,
					originY: 0,
				}}
			>
				<Icon name={icon} size={16} />
				<motion.span>{motionVal}</motion.span>
			</motion.div>
		</motion.div>
	);
};

const PassiveResizeDisplay = props => {
	const isWidth = props.handle === "right" || props.handle === "left";
	const isHeight = props.handle === "bottom" || props.handle === "top";

	let icon = "ArrowLeftRightOut";
	if (isHeight) icon = "ArrowUpDown";

	let label = "Fill";
	const v = isWidth ? props.tile.layout.width : props.tile.layout.height;
	const u = v.substring(v.length - 2).toLowerCase();
	if (u === "px") {
		icon = isWidth ? "FixedWidth" : "FixedHeight";
		label = parseInt(v);
	}

	return (
		<motion.div
			style={{
				//padding: "5px",
				//paddingTop: "4px",
				//paddingBottom: "3px",

				position: "absolute",
				pointerEvents: "none",
				transformStyle: "preserve-3d",
				z: selectedZ,

				// bottom: -6,
				// left: "50%",
				// x: "-50%",
				// y: "100%",

				top: "-5px",
				left: 0,
				//x: "-50%",
				y: "-100%",

				//top: 6,
				//left: 6,
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
			}}
		>
			<motion.div
				style={{
					display: "flex",
					gap: "4px",
					alignItems: "center",

					paddingLeft: 5,
					paddingRight: 7,
					paddingTop: 4,
					paddingBottom: 4,

					borderRadius: "4px",
					//backgroundColor: "var(--media-background-color)",
					// boxShadow: "var(--media-shadow)",
					//backdropFilter: "var(--media-backdrop-filter)",

					backgroundColor: "var(--hud-background-color)",
					boxShadow: "var(--stroke-and-shadow)",

					color: "var(--t8)", //"rgba(255,255,255,0.8)",
					fontSize: "12px",
					lineHeight: "1",

					scale: "var(--inverse-page-scale)",
					originX: 0,
					originY: 0,
				}}
			>
				<Icon name={icon} size={16} />
				{label}
			</motion.div>
		</motion.div>
	);
};

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

import { DropOperation, EditorContext, Events, selectedZ } from "./EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { Hud } from "../ds/hud/Hud";
import { transitions } from "../ds/Transitions";
import { Icon } from "../ds/Icon";
import { getDropLabel } from "./logic/layout";

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
		dropStatus,
		lingeringOverTile,
	} = React.useContext(EditorContext);

	const { tile, draggable } = props;

	const dragBgOpacity = useMotionValue(0);
	const opacity = useMotionValue(1);

	//const strokeWidthHover = useMotionValue(1);
	//const strokeWidthHoverScaled = useTransform(() => strokeWidthHover.get() / pageScale.get());

	//const strokeWidthSelected = useMotionValue(1);
	//const strokeWidthSelectedScaled = useTransform(() => strokeWidthSelected.get() / pageScale.get());
	//const strokeWidthSelectedScaled = useMotionValue(1);

	const selectedBorderWidth = `calc(calc(${1}px * var(--content-scale)) * var(--page-scale))`;

	//const resizeHandleLength = "clamp(12px, 50%, 72px)";
	//const resizeHandleLength = useTransform(() => 12 / pageScale.get());
	const resizeHandleLength = useMotionValue(28);
	const resizeHandleSizeScaled = useMotionValue(3);
	const resizeHandleBorderRadiusScaled = useTransform(() => resizeHandleSizeScaled.get() / 2 + "px");

	//const resizeHitArea = useMotionValue(16);
	const resizeHitAreaScaled = useMotionValue(16);
	const resizeHitAreaOffset = useTransform(() => resizeHitAreaScaled.get() * -0.5);

	const resizeHandleRightOpacity = useMotionValue(0);
	const resizeHandleLeftOpacity = useMotionValue(0);
	const resizeHandleTopOpacity = useMotionValue(0);
	const resizeHandleBottomOpacity = useMotionValue(0);

	//const resizeHitAreaBgColor = "transparent";
	let resizeHitAreaBgColor = "rgba(255,255,0, 0)";
	const handleColorBoxShadow = "0px 0px 0px 1px hsla(0,0%,0%,0.12), 0px 0px 4px 0px hsla(0,0%,0%,0.00)";
	const handleColor = "var(--accent-color)"; //"white";

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

			//resizeHandleRightOpacity.set(0);
			//resizeHandleBottomOpacity.set(0);
			//resizeHandleLeftOpacity.set(0);
			//resizeHandleTopOpacity.set(0);
		}
		if (latest === Events.DraggingAddTile) {
			//animate(dragBgOpacity, 1, transitions.layoutTransition);
		}
		if (latest === Events.ReleasedAddTile) {
			//animate(dragBgOpacity, 0, transitions.layoutTransition);
		}

		if (latest === Events.ClickedTile) {
		}

		if (latest === Events.DraggingTileResize) {
			console.log("DraggingTileResize");
			if (draggable) {
				if (!draggingResize) setDraggingResize(true);
				//resizeHandleRightOpacity.set(0);
				//resizeHandleBottomOpacity.set(0);
				//resizeHandleLeftOpacity.set(0);
				//resizeHandleTopOpacity.set(0);
			} else {
				if (pointerInfo.current.parent.id === tile.parentId) {
					setSiblingsDraggingResize(true);
				} else {
					setSiblingsDraggingResize(false);
				}
			}
		}
	});

	// const showContainerAnimation = React.useRef();
	// const showContainerOpacity = useMotionValue(0);
	// const showContainerBackgroundColor = useMotionValue("var(--t3)");
	// const showContainerBorderColor = useMotionValue("transparent");

	const [showParentIndicator, setShowParentIndicator] = React.useState(false);
	const [showCreateContainerIndicator, setShowCreateContainerIndicator] = React.useState(false);
	const [showLingerCreateContainer, setShowLingerCreateContainer] = React.useState(false);
	const [showLeafLinger, setShowLeafLinger] = React.useState(false);
	const [showFadingParentIndicator, setShowFadingParentIndicator] = React.useState(false);
	const createContainerLabel = useMotionValue("");

	useMotionValueEvent(dropStatus.current.parentKey, "change", latest => {
		const t = findTileById(latest);
		if (latest === tile.id) {
			if (dropStatus.current.operation === DropOperation.addToContainer) {
				setShowParentIndicator(true);
				setShowCreateContainerIndicator(false);
				setShowLeafLinger(false);
				//setShowFadingParentIndicator(false);
			}
			if (dropStatus.current.operation === DropOperation.createContainer) {
				setShowParentIndicator(true);
				setShowCreateContainerIndicator(true);
				setShowLingerCreateContainer(false);
				setShowLeafLinger(false);
				//setShowFadingParentIndicator(false);
			}
			if (dropStatus.current.operation === DropOperation.lingerCreate) {
				setShowParentIndicator(true);
				setShowLingerCreateContainer(true);
				setShowCreateContainerIndicator(false);
				setShowLeafLinger(false);
				//setShowFadingParentIndicator(false);
				createContainerLabel.set(
					getDropLabel({
						operation: dropStatus.current.operation,
						direction: dropStatus.current.direction,
						order: dropStatus.current.order,
					})
				);
			}
			if (dropStatus.current.operation === DropOperation.leafNodeLinger) {
				setShowParentIndicator(false);
				setShowCreateContainerIndicator(false);
				setShowLingerCreateContainer(false);
				//setShowFadingParentIndicator(false);
				setShowLeafLinger(true);
			}
		}
		else if (t && t.parentId === tile.id && dropStatus.current.operation === DropOperation.leafNodeLinger) {
			setShowParentIndicator(true);
		} else {
			setShowParentIndicator(false);
			setShowCreateContainerIndicator(false);
			setShowLingerCreateContainer(false);
			setShowLeafLinger(false);
			//setShowFadingParentIndicator(false);
		}
	});

	useMotionValueEvent(dropStatus.current.key, "change", latest => {
		if (dropStatus.current.parentKey === tile.id) {
			if (dropStatus.current.operation === DropOperation.addToContainer) {
				setShowCreateContainerIndicator(false);
			}
			if (dropStatus.current.operation === DropOperation.createContainer) {
				setShowCreateContainerIndicator(true);
				setShowLingerCreateContainer(false);
			}
			if (dropStatus.current.operation === DropOperation.lingerCreate) {
				setShowLingerCreateContainer(true);
				setShowCreateContainerIndicator(false);
				createContainerLabel.set(
					getDropLabel({
						operation: dropStatus.current.operation,
						direction: dropStatus.current.direction,
						order: dropStatus.current.order,
					})
				);
			}
		}
	});

	// useMotionValueEvent(lingeringOverTile, "change", latest => {
	// 	if (latest) {
	// 		//showContainerBackgroundColor.set("transparent");
	// 		//showContainerBorderColor.set("var(--accent-color)");
	// 		if (dropStatus.current.parentKey.get() === tile.id) setShowCreateContainerIndicator(true);
	// 	} else {
	// 		//showContainerBackgroundColor.set("var(--t3)");
	// 		//showContainerBorderColor.set("transparent");
	// 		setShowCreateContainerIndicator(false);
	// 	}
	// });

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

	let borderRadius = `calc(calc(${tile.layout.borderRadius}px * var(--content-scale)) * var(--page-scale))`;

	let draggingBgColor = tile.theme.tokens["backgroundColor"];
	if (draggingBgColor === undefined) draggingBgColor = findTileAncestorBackgroundColor(tile);
	if (draggingBgColor === undefined) {
		draggingBgColor = "var(--t2)";
	}

	return (
		<>
			{/* 
			---- POINTER EVENTS
			*/}
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
			{/* 
			---- SHOW BOUNDS WHEN REPARENTING TREATMENT
			*/}
			<Div
				style={{
					opacity: dragBgOpacity,
					backgroundColor: draggingBgColor,
					borderRadius: borderRadius,
				}}
			/>
			{/* 
			---- DRAGGING BACKGROUND TREATMENT
			*/}
			{tile.type === "FLEX" && (
				<DragBg
					style={{
						opacity: dragBgOpacity,
					}}
				>
					<Div
						style={{
							backgroundColor: draggingBgColor,
							borderRadius: borderRadius,
							//boxShadow: "var(--shadow-small)",
						}}
					/>
				</DragBg>
			)}
			{/* 
			---- TILE SELECTED, SHOW PARENT TREAMENT 
			*/}
			<AnimatePresence>
				{childSelected && !siblingDragging && (
					<Div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						style={{
							borderWidth: selectedBorderWidth,
							borderColor: "var(--accent-color)",
							borderStyle: "dashed",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence>
			{/* 
			---- TILE SELECTED TREAMENT 
			*/}
			<AnimatePresence>
				{selected && !dragging && (
					<Div
						//layoutId="tileSelect"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.1,
						}}
						style={{
							borderWidth: selectedBorderWidth,
							borderColor: "var(--accent-color)",
							borderStyle: "solid",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence>
			{/* 
			---- TILE HOVER TREAMENT 
			*/}
			<AnimatePresence>
				{hovering && !selected && aTileSelected && (
					<HoveringDiv
						//	layoutId="tileHover"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						style={{
							borderWidth: selectedBorderWidth,
							borderColor: "var(--accent-color)",
							borderStyle: "solid",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence>
			{/* 
			---- REARRANGE / REPARENT: ADD TO CONTAINER PARENT TREAMENT
			*/}
			<AnimatePresence>
				{showParentIndicator && !showLingerCreateContainer && (
					<Div
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						style={{
							borderWidth: selectedBorderWidth,
							borderColor: "var(--accent-color)",
							borderStyle: "dashed",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence>
			
			{/* 
			---- REARRANGE / REPARENT: CREATE CONTAINER FROM LINGER GESTURE
			*/}
			<AnimatePresence>
				{showParentIndicator && showLingerCreateContainer && (
					<>
						<Div
							initial={{
								scale: 1.075,
								opacity: 1,
							}}
							animate={{
								scale: 1,
								opacity: 1,
							}}
							exit={{
								scale: 0.95,
								opacity: 0,
							}}
							transition={{ duration: 0.2 }}
							style={{
								backgroundColor: "transparent",
								borderWidth: selectedBorderWidth,
								borderColor: "var(--accent-color)",
								borderStyle: "solid",
								z: selectedZ,
							}}
						/>
						<motion.span
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							transition={{ duration: 0.2 }}
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
								fontFamily: "var(--ui-family)",
								fontSize: "12px",
								lineHeight: "16px",
								whiteSpace: "nowrap",

								position: "absolute",
								overflow: "hidden",
								top: "100%",
								left: "50%",
								x: "-50%",
								y: "8px",
								z: 99999999,
								zIndex: 9999,
							}}
						>
							{createContainerLabel}
						</motion.span>
					</>
				)}
			</AnimatePresence>

			{/* 
			---- LEAF NODE HOVER TREAMENT
			*/}

			<AnimatePresence>
			{showLeafLinger && (
				<Div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
						transition: {duration: 2}
					}}
					exit={{
						opacity: 0,
						scale: 1.075,
						transition: {duration: 0.1}
					}}
					style={{
						backgroundColor: "transparent",
						borderWidth: selectedBorderWidth,
						borderColor: "var(--t7)",
						borderStyle: "solid",
						z: selectedZ,
					}}
				/>
			)}
			</AnimatePresence>

			 {/* <AnimatePresence> */}
				{/* {showFadingParentIndicator  && (
					<Div
						initial={{
							opacity: 1,
						}}
						animate={{
							opacity: 0,
						}}
						exit={{
							opacity: 0,
						}}
						transition={{ duration: 1 }}
						style={{
							backgroundColor: "transparent",
							borderWidth: selectedBorderWidth,
							borderColor: "var(--accent-color)",
							borderStyle: "dashed",
							z: selectedZ,
						}}
					/>
				)} */}
			{/* </AnimatePresence>  */}

			{/* 
			---- RESIZE DROPZONES & HANDLE TREAMENT 
			*/}
			{selected && !dragging && !isText && (
				<>
					<ResizeHitArea
						style={{
							x: 0,
							//y: resizeHitAreaOffset,
							z: selectedZ,
							top: "0%",
							left: "0%",
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
						onPointerOver={e => {
							resizeHandleTopOpacity.set(1);
						}}
						onPointerOut={e => {
							resizeHandleTopOpacity.set(0);
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
							//y: resizeHitAreaOffset,
							z: selectedZ,
							left: "0%",
							bottom: "0%",
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
						onPointerOver={e => {
							resizeHandleBottomOpacity.set(1);
						}}
						onPointerOut={e => {
							resizeHandleBottomOpacity.set(0);
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
								//y: -0.5,
							}}
						/>
					</ResizeHitArea>

					{/* {tileIndex !== 0 && ( */}
					<ResizeHitArea
						style={{
							//x: resizeHitAreaOffset,
							y: 0,
							z: selectedZ,
							top: "0%",
							left: "0%",
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
						onPointerOver={e => {
							resizeHandleLeftOpacity.set(1);
						}}
						onPointerOut={e => {
							resizeHandleLeftOpacity.set(0);
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
								//x: 0.5,
							}}
						/>
					</ResizeHitArea>
					{/* )} */}

					<ResizeHitArea
						style={{
							top: "0px",
							right: "0px",
							//x: resizeHitAreaOffset,
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
						onPointerOver={e => {
							resizeHandleRightOpacity.set(1);
						}}
						onPointerOut={e => {
							resizeHandleRightOpacity.set(0);
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
								//x: -0.5,
							}}
						/>
					</ResizeHitArea>
				</>
			)}
			{selected && !dragging && isText && (
				<>
					<ResizeHitArea
						style={{
							top: "0px",
							right: "0px",
							//x: resizeHitAreaOffset,
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
								//x: -0.5,
							}}
						/>
					</ResizeHitArea>
				</>
			)}
			<AnimatePresence>
				{draggingResize && <ResizeDisplay tile={tile} handle={pointerInfo.current.resizeHandle} />}
			</AnimatePresence>
			{/* <AnimatePresence>
				{siblingsDraggingResize && <PassiveResizeDisplay tile={tile} handle={pointerInfo.current.resizeHandle} />}
			</AnimatePresence> */}
			{/* <AnimatePresence>
				{siblingsDraggingResize && (
					<Div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						style={{
							borderWidth: selectedBorderWidth,
							borderColor: "var(--z4)",
							borderStyle: "solid",
							z: selectedZ,
						}}
					/>
				)}
			</AnimatePresence> */}
			{/* <Div
				style={{
					backgroundColor: showContainerBackgroundColor,
					borderWidth: selectedBorderWidth,
					borderColor: showContainerBorderColor,
					opacity: showContainerOpacity,
					borderStyle: "solid",
					borderRadius: borderRadius,
				}}
			/> */}
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

	//let v = isWidth ? props.tile.layout.width : props.tile.layout.height;

	useAnimationFrame((time, delta) => {
		let label = "Fill";
		const v = isWidth ? props.tile.layout.width : props.tile.layout.height;
		if (v === "fill") {
			label = "Fill";
		} else if (v === "hug") {
			label = "Hug";
			icon = isWidth ? "ChevronLeftRightIn" : "ChevronUpDownIn";
		} else {
			label = parseInt(v);
			icon = isWidth ? "FixedWidth" : "FixedHeight";
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

	let label = "Fill";
	let icon = "ArrowLeftRightOut";
	if (isHeight) icon = "ArrowUpDown";

	let v = isWidth ? props.tile.layout.width : props.tile.layout.height;
	if (v === "fill") {
		label = "Fill";
	} else if (v === "hug") {
		label = "Hug";
		icon = isWidth ? "ChevronLeftRightIn" : "ChevronUpDownIn";
	} else {
		label = parseInt(v);
		icon = isWidth ? "FixedWidth" : "FixedHeight";
	}

	//if (v === "hug") label = "Hug";

	//const u = v.substring(v.length - 2).toLowerCase();
	// if (u === "px") {
	// 	icon = isWidth ? "FixedWidth" : "FixedHeight";
	// 	label = parseInt(v);
	// }

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

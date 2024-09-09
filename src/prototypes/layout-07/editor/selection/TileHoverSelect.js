import React from "react";
import styled from "styled-components";
import {
	motion,
	useMotionValue,
	AnimatePresence,
	useMotionValueEvent,
	animate,
	useAnimationFrame,
} from "framer-motion";
import chroma from "chroma-js";

import { DropOperation, EditorContext, Events, LINGER_DURATION, selectedZ } from "../EditorContext";
import { TomeContext } from "../../tome/TomeContext";
import { transitions } from "../../ds/Transitions";
import { getDropLabel } from "../logic/layout";
import { backgrounds, containerSize, pageBackground, tileTypes } from "../../tome/TileData";
import { Icon } from "../../ds/Icon";
import { Anchor, PopoverContext } from "../popovers/PopoverContext";
import { Border, BorderOutsideHandle, BorderSVG } from "./Border";
import { Panels } from "../popovers/panels/panels";
import { menus } from "../popovers/menus/menus";
import { ResizeDisplay } from "./ResizeDisplay";
import { CornerHandle } from "./ResizeHandle";

export const TileHoverSelect = props => {
	const {
		getCurrentPage,
		findTileById,
		findTileAncestorBackgroundColor,
		tomeData,
		findTileDepth,
		findTilesByKeyValue,
		saveState,
	} = React.useContext(TomeContext);

	const {
		onTilePointerDown,
		onTilePointerUp,
		onTileResizePointerDown,

		isAnyTileSelected,
		isTileSelected,
		isMultiSelection,
		isAnyTileFocused,

		isParentSelected,
		isChildSelected,
		isSiblingSelected,
		isAncestorSelected,
		isDescendantSelected,

		allowHover,

		isPlayMode,

		pageScale,
		contentScale,

		event,
		pointerInfo,
		dropStatus,

		hoveringOverTile,

		tileMotionValues,

		keysPressedMotionValue,
		shiftKeyDown,
	} = React.useContext(EditorContext);

	const {
		toggleMenu,
		togglePanel,
		panel,
		showPanel,
		hidePanel,
		showMenu,
		colorPanel,
		showColorPanel,
		hideColorPanel,
	} = React.useContext(PopoverContext);

	const { tile, draggable } = props;

	//const areaBgOpacity = useMotionValue(0);

	const dragBgOpacity = useMotionValue(0);
	const opacity = useMotionValue(1);

	const bottomResizeOpacity = useMotionValue(0);
	const topResizeOpacity = useMotionValue(0);
	const leftResizeOpacity = useMotionValue(0);
	const rightResizeOpacity = useMotionValue(0);

	const selected = tile.selected;

	const multiSelection = isMultiSelection();
	const aTileSelected = isAnyTileSelected();
	const aTileFocused = isAnyTileFocused();
	const currentPage = getCurrentPage();
	const rootContainer = currentPage.tiles[0];
	const isRootContainer = tile.id === rootContainer.id;
	const parentSelected = isParentSelected(tile);
	const siblingSelected = isSiblingSelected(tile);
	const childSelected = isChildSelected(tile);
	const descendantSelected = isDescendantSelected(tile);

	const depth = findTileDepth(tile);
	const selectedTiles = findTilesByKeyValue("selected", true);
	const isGreaterDepth = depth < findTileDepth(selectedTiles[0]) && tile.type === tileTypes.FLEX;

	const [hovering, setHovering] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);

	const [draggingResize, setDraggingResize] = React.useState(false);
	const [siblingsDraggingResize, setSiblingsDraggingResize] = React.useState(false);
	const [parentDraggingResize, setParentDraggingResize] = React.useState(false);

	const [showBounds, setShowBounds] = React.useState(false);

	const [siblingDragging, setSiblingDragging] = React.useState(false);
	const [ancestorDragging, setAncestorDragging] = React.useState(false);

	const [resizeHandle, setResizeHandle] = React.useState("");
	const [resizeHovering, setResizeHovering] = React.useState("");

	// If tile is deselected, set hover to false
	React.useEffect(() => {
		if (!draggingResize) {
			setResizeHandle(resizeHovering);
		}
	}, [resizeHovering, draggingResize]);

	/*
	//console.log("handles", tomeData.editor.debug.resizeHandles);
	const [handles, setHandles] = React.useState(tomeData.editor.debug.resizeHandles);
	React.useEffect(() => {
		const v = tomeData.editor.debug.resizeHandles;
		setHandles(v);
	}, [tomeData, handles]);
	*/

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			animate(opacity, 0, transitions.fast);
			if (draggable) {
				animate(dragBgOpacity, 1, transitions.fast);
				if (!dragging) setDragging(true);
			} else {
				setSiblingDragging(true);
				setAncestorDragging(isAncestorSelected(tile));
				//animate(areaBgOpacity, 1, transitions.fast);
			}
			// animate(pageBgOpacity, 1, transitions.fast);
			// console.log(isAncestorSelected(tile))
			setShowBounds(true);
			setHovering(false);
		}

		if (latest === Events.ReleasedTile) {
			animate(opacity, 1, transitions.layoutTransition);
			animate(dragBgOpacity, 0, transitions.layoutTransition);
			//animate(areaBgOpacity, 0, transitions.layoutTransition);
			//animate(pageBgOpacity, 0, transitions.layoutTransition);
			if (dragging) setDragging(false);
			if (draggingResize) {
				setDraggingResize(false);
				if (resizeHovering === "") {
					setResizeHandle("");
				}
			}

			if (siblingsDraggingResize) setSiblingsDraggingResize(false);
			if (parentDraggingResize) setParentDraggingResize(false);
			if (siblingDragging) setSiblingDragging(false);
			if (showBounds) setShowBounds(false);
			if (ancestorDragging) setAncestorDragging(false);

			//resizeHandleRightOpacity.set(0);
			//resizeHandleBottomOpacity.set(0);
			//resizeHandleLeftOpacity.set(0);
			//resizeHandleTopOpacity.set(0);
		}
		if (latest === Events.DraggingAddTile) {
			//animate(dragBgOpacity, 1, transitions.layoutTransition);
			//animate(areaBgOpacity, 1, transitions.fast);
			//animate(pageBgOpacity, 1, transitions.fast);
			//setAncestorDragging(isAncestorSelected(tile));
			setShowBounds(true);
		}
		if (latest === Events.ReleasedAddTile) {
			animate(dragBgOpacity, 0, transitions.layoutTransition);
			//animate(areaBgOpacity, 0, transitions.layoutTransition);
			//animate(pageBgOpacity, 0, transitions.layoutTransition);
			if (showBounds) setShowBounds(false);
		}

		if (latest === Events.ClickedTile) {
		}

		if (latest === Events.DraggingTileResize) {
			// console.log("DraggingTileResize");
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
				if (pointerInfo.current.tile.id === tile.parentId) {
					setParentDraggingResize(true);
				} else {
					setParentDraggingResize(false);
				}
			}
		}
	});

	const [metaKeyDown, setMetaKeyDown] = React.useState(keysPressedMotionValue.get());
	useMotionValueEvent(keysPressedMotionValue, "change", latest => {
		if (latest === "Meta") {
			setMetaKeyDown(true);
		} else {
			setMetaKeyDown(false);
		}
	});

	const [isShiftKeyDown, setShiftKeyDown] = React.useState(shiftKeyDown.get());
	useMotionValueEvent(shiftKeyDown, "change", latest => {
		if (latest === "Shift") {
			setShiftKeyDown(true);
		} else {
			setShiftKeyDown(false);
		}
	});

	const [showHoveringIndicator, setShowHoveringIndicator] = React.useState(false);
	useMotionValueEvent(hoveringOverTile, "change", latest => {
		if (latest && latest === tile.id) {
			setShowHoveringIndicator(true);
		} else {
			setShowHoveringIndicator(false);
		}
	});

	let draggingBgColor = tile.theme.tokens["backgroundColor"];
	if (draggingBgColor === undefined) draggingBgColor = findTileAncestorBackgroundColor(tile);
	if (draggingBgColor === undefined) {
		draggingBgColor = "var(--t2)";
	}

	let primarySelectionColor = "var(--accent)";

	let secondarySelectionColor = currentPage.theme.tokens["--page-color"];

	if (chroma(secondarySelectionColor).luminance() > 0.5) {
		secondarySelectionColor = chroma(secondarySelectionColor).darken(0.5).hex();
	} else {
		secondarySelectionColor = chroma(secondarySelectionColor).brighten(0.75).hex();
	}

	let hoverBorderColor = secondarySelectionColor;

	if (chroma(hoverBorderColor).luminance() > 0.5) {
		hoverBorderColor = chroma(hoverBorderColor).darken(0.25).hex();
	} else {
		hoverBorderColor = chroma(hoverBorderColor).brighten(0.5).hex();
	}

	//hoverBorderColor = "var(--tome-brand-accent-50)";

	let draggingBackgroundColor = currentPage.theme.tokens["--page-color"];
	if (chroma(draggingBackgroundColor).luminance() > 0.5) {
		draggingBackgroundColor = chroma(draggingBackgroundColor).darken().hex();
	} else {
		draggingBackgroundColor = chroma(draggingBackgroundColor).brighten().hex();
	}

	let pageBorderColor = secondarySelectionColor;

	//draggingBgColor = "transparent";

	/*
	// Page border / background
	let pageBorderColor = document.body.style.backgroundColor;
	if (currentPage.theme.mode === "light") {
		pageBorderColor = chroma(pageBorderColor).darken().hex();
	} else {
		pageBorderColor = chroma(pageBorderColor).brighten().hex();
	}

	// Node bounds when rearranging / adding
	let boundsBorderColor = "var(--show-bounds-border-color)"; //"var(--tome-brand-accent)";
	boundsBorderColor = pageBorderColor;
	
	let boundsBgColor = tile.theme.tokens["backgroundColor"];
	if (boundsBgColor === undefined) {
		if (tile.background.type === backgrounds.COLOR) {
			boundsBgColor = tile.background.value;
		}
	}

	if (boundsBgColor === undefined) boundsBgColor = findTileAncestorBackgroundColor(tile);
	if (boundsBgColor) {
		if (chroma(boundsBgColor).luminance() > 0.5) {
			boundsBorderColor = chroma(boundsBgColor).darken().hex();
		} else {
			boundsBorderColor = chroma(boundsBgColor).brighten().hex();
		}
	}

	let hoverBorderColor = boundsBorderColor;
	if (chroma(hoverBorderColor).luminance() > 0.5) {
		hoverBorderColor = chroma(hoverBorderColor).darken().hex();
	} else {
		hoverBorderColor = chroma(hoverBorderColor).brighten().hex();
	}
	*/

	// Resize metrics
	let resizeHitArea = 10;
	let resizeHitAreaOver = 24;

	const resizeHitAreaTop = useMotionValue(resizeHitArea);
	const resizeHitAreaBottom = useMotionValue(resizeHitArea);
	const resizeHitAreaLeft = useMotionValue(resizeHitArea);
	const resizeHitAreaRight = useMotionValue(resizeHitArea);
	const resizeHitAreaTopRight = useMotionValue(resizeHitArea);
	const resizeHitAreaBottomRight = useMotionValue(resizeHitArea);
	const resizeHitAreaTopLeft = useMotionValue(resizeHitArea);
	const resizeHitAreaBottomLeft = useMotionValue(resizeHitArea);

	const resizeHitAreaDynamic = useMotionValue(10);

	const resizeHitAreaOffset = resizeHitArea / 2;
	const resizeHitAreaColorSide = tomeData.editor.debug.showResizeHitAreas
		? "var(--editor-debug-resize-hitarea-side)"
		: "transparent";
	const resizeHitAreaColorCorner = tomeData.editor.debug.showResizeHitAreas
		? "var(--editor-debug-resize-hitarea-corner)"
		: "transparent";

	const tileWidth = tileMotionValues.current[tile.id].width;
	const tileHeight = tileMotionValues.current[tile.id].height;

	if (selected) {
		if (tileHeight.get() < resizeHitArea * 3 || tileWidth.get() < resizeHitArea * 3) {
			resizeHitArea = 4;
		}
	}

	// Resize handles
	let handleRadius = 2.5;
	let handleStrokeWidth = 1.5;
	let handleOuterColor = "white";
	let handleInnerColor = "var(--tome-brand-accent)";

	if (currentPage.theme.mode === "dark") {
		handleOuterColor = "white";
		handleInnerColor = "var(--tome-brand-accent)";
	}

	// Infomation panels, tooltips
	let infoBackgroundColor = "var(--tome-brand-accent)"; //"var(--accent)";
	//infoBackgroundColor = "rgba(0, 0, 0, 0.9)";
	let infoForegroundColor = "white";

	// Show handles
	let handles = multiSelection || tile.focused ? false : true;
	handles = false;

	let pointerEvents = "auto";

	if (!parentSelected && !siblingSelected && !childSelected && !isGreaterDepth && !metaKeyDown) {
		pointerEvents = "none";

		if ((isRootContainer || tile.parentId === rootContainer.id) && !aTileSelected) {
			pointerEvents = "auto";
		}
	}

	// If tile is deselected, set hover to false
	React.useEffect(() => {
		if (!selected) {
			setHovering(false);
			setResizeHovering("");
		} else {
			setResizeHovering("");
		}
		if (dragging) setDragging(false);
		if (draggingResize) setDraggingResize(false);
		if (parentDraggingResize) setParentDraggingResize(false);
	}, [selected]);

	/*
	// If tile is deselected, set hover to false
	const [outlineColor, setOutlineColor] = React.useState("transparent");
	React.useEffect(() => {
		if (hovering && !isRootContainer && !selected && aTileSelected) {
			setOutlineColor(hoverBorderColor);
		} else {
			setOutlineColor("transparent");
		}
	}, [hovering, isRootContainer, selected, aTileSelected, hoverBorderColor]);
	*/

	//let borderRadius = `calc(calc(${tile.layout.borderRadius}px * var(--content-scale)) * var(--page-scale))`;
	const borderRadius =
		tile.layout.borderRadius && tile.layout.borderRadius > 0
			? tile.layout.borderRadius / (pageScale.get() * contentScale.get())
			: undefined;

	//console.log(tile.layout.borderRadius, pageScale.get(), contentScale.get(), borderRadius);

	const hoverInfoRect = React.useRef(null);

	const hideHandleTimer = React.useRef(null);
	const showHandleDuration = 50;
	const hideHandleDuration = 50;

	const onResizeEnter = (direction, area) => {
		clearTimeout(hideHandleTimer.current);
		hideHandleTimer.current = setTimeout(() => {
			setResizeHovering(direction);
			area.set(resizeHitAreaOver);
		}, showHandleDuration);
	};

	const onResizeLeave = area => {
		clearTimeout(hideHandleTimer.current);
		hideHandleTimer.current = setTimeout(() => {
			setResizeHovering("");
			area.set(resizeHitArea);
		}, hideHandleDuration);
	};

	const clickInfo = React.useRef({});

	return (
		<>
			{/* 
			---- POINTER EVENTS
			*/}
			<Div
				layout="position"
				transition={transitions.layoutTransition}
				style={{
					pointerEvents: pointerEvents,
				}}
				onPointerUp={e => {
					const dx = Math.abs(clickInfo.current.x - e.clientX);
					const dy = Math.abs(clickInfo.current.y - e.clientY);
					const threshold = 3;

					if (dx < threshold && dy < threshold) {
						// Select the tile on pointer up, aka click
						onTilePointerUp(e, tile);

						// is there a panel open? show this tile's property panel instead
						if (panel) {
							hidePanel();
							tomeData.editor.showPropertyPanel = true;
							saveState();
						}

						if (colorPanel) {
							hideColorPanel();

							/*
	if (tile.type === tileTypes.FLEX) {
		showColorPanel(Panels.BACKGROUND, document.getElementById("properties-hud"), Anchor.right);
	} else {
		hideColorPanel();
	}
	*/
						}
					}

					e.stopPropagation();
				}}
				onPointerDown={e => {
					// is there a menu open? close it
					toggleMenu(null, e);

					// Immediately select the tile
					onTilePointerDown(e, tile);

					clickInfo.current.x = e.clientX;
					clickInfo.current.y = e.clientY;

					e.stopPropagation();
				}}
				onPointerEnter={e => {
					//if (rootContainerId === tile.id) return false;

					if (allowHover.current === false) return;
					setHovering(true);

					// hoverInfoRect.current = e.target.getBoundingClientRect();
				}}
				onPointerLeave={e => {
					//if (rootContainerId === tile.id) return false;
					if (allowHover.current === false) return;
					setHovering(false);
				}}
				onContextMenu={e => {
					showMenu(menus.TILE_CONTEXT, e, tile);
					e.preventDefault();
					e.stopPropagation();
				}}
			/>

			<Div layout transition={transitions.layoutTransition}>
				{/* 
			---- SHOW ROOT CONTAINER WHEN A NODE IS SELECTED OR DRAGGING
			*/}

				{isRootContainer && aTileSelected && !showBounds && tomeData.editor.background === pageBackground.OFF && (
					<Border
						borderStyle={"solid"}
						borderColor={pageBorderColor}
						borderRadius={borderRadius}
						width={tileWidth}
						height={tileHeight}
					/>
				)}

				{/* 
			---- DRAGGING BACKGROUND TREATMENT
			*/}

				{/* <DragBg
				style={{
					opacity: dragBgOpacity,
				}}
			>
				<Div
					style={{
						backgroundColor: draggingBackgroundColor,
						borderRadius: borderRadius,
						boxShadow: "var(--shadow-small)",
					}}
				/>
			</DragBg> */}

				{/* 
			---- SHOW CONTAINER BOUNDS WHEN ADDING OR REARRANGING TREATMENT
			*/}

				{/* {!isRootContainer && showBounds && !ancestorDragging && !siblingSelected && (
				<Border borderStyle={"solid"} borderColor={secondarySelectionColor} />
			)} */}

				{/* 
			---- SHOW PARENT CONTAINER WHEN SELECTED TREATMENT 
			*/}

				{!isRootContainer &&
					childSelected &&
					!dragging &&
					!siblingDragging &&
					!hovering &&
					!multiSelection &&
					!aTileFocused && (
						<Border
							borderColor={secondarySelectionColor}
							width={tileWidth}
							height={tileHeight}
							//borderRadius={borderRadius}
						/>
					)}

				{/* 
				---- SHOW CHILDREN BOUNDS WHEN SELECTED TREATMENT 
				*/}

				{parentSelected && !parentDraggingResize && !dragging && !siblingDragging && !hovering && (
					<Border
						borderColor={secondarySelectionColor}
						width={tileWidth}
						height={tileHeight}
						//borderRadius={borderRadius}
					/>
				)}

				{/* 
				---- TILE SELECTED TREATMENT 
				*/}

				{selected && !dragging && !ancestorDragging && (
					<BorderSVG
						z={10}
						borderColor={tile.focused ? secondarySelectionColor : primarySelectionColor}
						width={tileWidth}
						height={tileHeight}
						resizeHandle={resizeHandle}
						draggingResize={draggingResize}
						//borderRadius={borderRadius}
					/>
				)}

				{/* 
				---- TILE HOVER TREATMENT 
				*/}

				{hovering && !isRootContainer && !selected && aTileSelected && (
					<Border
						borderColor={hoverBorderColor}
						z={9}
						width={tileWidth}
						height={tileHeight}
						//borderRadius={borderRadius}
					/>
				)}

				{/* 
				---- HOVERED OVER DURING TILE DRAG
				*/}

				{showHoveringIndicator && <Border borderRadius={borderRadius} width={tileWidth} height={tileHeight} />}

				{/* 
				---- RESIZE DROPZONES & HANDLE TREAMENT 
				*/}

				{selected && !dragging && !isRootContainer && !multiSelection && (
					<>
						{/* TOP */}
						<ResizeHitArea
							style={{
								x: 0,
								y: "-50%",
								z: selectedZ,
								top: 0,
								left: 0,
								width: "100%",
								height: resizeHitAreaTop,
								cursor: "ns-resize",
								backgroundColor: resizeHitAreaColorSide,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								//console.log("Resize top pointer down");
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "top", "ns-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("top", resizeHitAreaTop);
							}}
							onPointerLeave={e => {
								onResizeLeave(resizeHitAreaTop);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* BOTTOM */}
						<ResizeHitArea
							style={{
								x: 0,
								y: "50%",
								z: selectedZ,
								left: 0,
								bottom: 0,
								width: "100%",
								height: resizeHitAreaBottom,
								cursor: "ns-resize",
								backgroundColor: resizeHitAreaColorSide,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								//console.log("Resize bottom pointer down");
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "bottom", "ns-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("bottom", resizeHitAreaBottom);
							}}
							onPointerLeave={e => {
								onResizeLeave(resizeHitAreaBottom);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* LEFT */}
						<ResizeHitArea
							style={{
								x: "-50%",
								y: 0,
								z: selectedZ,
								top: 0,
								left: 0,
								width: resizeHitAreaLeft,
								height: "100%",
								cursor: "ew-resize",
								backgroundColor: resizeHitAreaColorSide,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								//console.log("Resize left pointer down");
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "left", "ew-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("left", resizeHitAreaLeft);
							}}
							onPointerLeave={e => {
								onResizeLeave(resizeHitAreaLeft);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* RIGHT */}
						<ResizeHitArea
							style={{
								x: "50%",
								y: 0,
								z: selectedZ,
								top: 0,
								right: 0,
								width: resizeHitAreaRight,
								height: "100%",
								cursor: "ew-resize",
								backgroundColor: resizeHitAreaColorSide,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								// console.log("Resize right pointer down");
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "right", "ew-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("right", resizeHitAreaRight);
							}}
							onPointerLeave={e => {
								onResizeLeave(resizeHitAreaRight);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* TOP LEFT */}
						<ResizeHitArea
							style={{
								x: "-50%",
								y: "-50%",
								z: selectedZ,
								left: 0,
								top: 0,
								width: resizeHitAreaTopLeft,
								height: resizeHitAreaTopLeft,
								cursor: "nwse-resize",
								backgroundColor: resizeHitAreaColorCorner,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "top-left", "nwse-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("top-left", resizeHitAreaTopLeft);
							}}
							onPointerLeave={e => {
								onResizeLeave(resizeHitAreaTopLeft);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* BOTTOM RIGHT */}
						<ResizeHitArea
							style={{
								x: "50%",
								y: "50%",
								z: selectedZ,
								bottom: 0,
								right: 0,
								width: resizeHitAreaBottomRight,
								height: resizeHitAreaBottomRight,
								cursor: "nwse-resize",
								backgroundColor: resizeHitAreaColorCorner,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "bottom-right", "nwse-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("bottom-right", resizeHitAreaBottomRight);
							}}
							onPointerLeave={e => {
								onResizeLeave(resizeHitAreaBottomRight);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* BOTTOM LEFT */}
						<ResizeHitArea
							style={{
								x: "-50%",
								y: "50%",
								z: selectedZ,
								bottom: 0,
								left: 0,
								width: resizeHitAreaBottomLeft,
								height: resizeHitAreaBottomLeft,
								cursor: "nesw-resize",
								backgroundColor: resizeHitAreaColorCorner,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "bottom-left", "nesw-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("bottom-left", resizeHitAreaBottomLeft);
							}}
							onPointerLeave={e => {
								//clearTimeout(hideHandleTimer.current);
								//hideHandleTimer.current = setTimeout(() => setResizeHovering(""), hideHandleDuration);
								setResizeHovering("");
								resizeHitAreaBottomLeft.set(resizeHitArea);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{/* TOP RIGHT */}
						<ResizeHitArea
							style={{
								x: "50%",
								y: "-50%",
								z: selectedZ,
								top: 0,
								right: 0,
								width: resizeHitAreaTopRight,
								height: resizeHitAreaTopRight,
								cursor: "nesw-resize",
								backgroundColor: resizeHitAreaColorCorner,
								pointerEvents: pointerEvents,
							}}
							onPointerDown={e => {
								// is there a menu or panel open? close it
								toggleMenu(null, e);
								togglePanel(null, e);
								onTileResizePointerDown(e, tile, "top-right", "nesw-resize");
								e.stopPropagation();
							}}
							onPointerEnter={e => {
								onResizeEnter("top-right", resizeHitAreaTopRight);
							}}
							onPointerLeave={e => {
								//clearTimeout(hideHandleTimer.current);
								//hideHandleTimer.current = setTimeout(() => setResizeHovering(""), hideHandleDuration);

								setResizeHovering("");
								resizeHitAreaTopRight.set(resizeHitArea);
							}}
							onContextMenu={e => {
								showMenu(menus.TILE_CONTEXT, e, tile);
								e.preventDefault();
								e.stopPropagation();
							}}
						/>

						{handles && (
							<>
								<CornerHandle
									handleInnerColor={handleInnerColor}
									handleOuterColor={handleOuterColor}
									handleRadius={handleRadius}
									handleStrokeWidth={handleStrokeWidth}
									style={{ top: 0, left: 0, x: "calc(-50% + 0px)", y: "calc(-50% + 0px)" }}
								/>
								<CornerHandle
									handleInnerColor={handleInnerColor}
									handleOuterColor={handleOuterColor}
									handleRadius={handleRadius}
									handleStrokeWidth={handleStrokeWidth}
									style={{ top: 0, right: 0, x: "calc(50% - 0px)", y: "calc(-50% + 0px)" }}
								/>
								<CornerHandle
									handleInnerColor={handleInnerColor}
									handleOuterColor={handleOuterColor}
									handleRadius={handleRadius}
									handleStrokeWidth={handleStrokeWidth}
									style={{ bottom: 0, right: 0, x: "calc(50% - 0px)", y: "calc(50% - 0px)" }}
								/>
								<CornerHandle
									handleInnerColor={handleInnerColor}
									handleOuterColor={handleOuterColor}
									handleRadius={handleRadius}
									handleStrokeWidth={handleStrokeWidth}
									style={{ bottom: 0, left: 0, x: "calc(-50% + 0px)", y: "calc(50% - 0px)" }}
								/>
							</>
						)}
					</>
				)}

				{selected && draggingResize && !dragging && !multiSelection && !isRootContainer && !tile.focused && (
					<ResizeDisplay tile={tile} backgroundColor={infoBackgroundColor} foregroundColor={infoForegroundColor} />
				)}
			</Div>
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
	transform-style: preserve-3d;
`;

const ResizeHitArea = styled(motion.span)`
	position: absolute;
	display: grid;
`;

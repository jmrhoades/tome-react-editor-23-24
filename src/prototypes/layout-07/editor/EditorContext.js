import React from "react";
import { uniqueId } from "lodash";
import { animate, useMotionValue, useTransform } from "framer-motion";
import chroma from "chroma-js";

import { closestCenter } from "@dnd-kit/core";
import { pointerLingering } from "./logic/algorithms";

import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";
import {
	containerSize,
	contentDirection,
	makeFlexData,
	makeTextData,
	pageBackground,
	tileTypes,
} from "../tome/TileData";
import { pointInRect } from "./logic/utilities";

import { TextStyles } from "../tiles/Text";
import {
	//findTileIntersection,
	getContentMainAxisDropRects,
	getContainerMainAxisDropRects,
	getRearrangeDropRects,
	getRootDropRects,
	getLingerDropRects,
	//getNoOpDropRects,
} from "./logic/drop-rects";
import { generateAutoTextColors, generateCanvasColor, isDarkUITheme } from "./logic/colors";

// import { Huds } from "./huds/Huds";

export const Events = {
	PressingTile: "pressingTile",
	DraggingTile: "draggingTile",
	ReleasedTile: "releasedTile",
	ClickedTile: "clickedTile",

	PressingTileResize: "pressingTileResize",
	DraggingTileResize: "draggingTileResize",

	PressingViewport: "pressingViewport",
	DraggingViewport: "draggingViewport",
	ReleasedViewport: "releasedViewport",
	ClickedViewport: "clickedViewport",

	DraggingAddTile: "draggingAddTile",
	ReleasedAddTile: "releasedAddTile",

	None: "none",
};

export const DropOperation = {
	addTile: "addTile",

	noOp: "noOp", // no-op zone

	rearrange: "rearrange", // fluid sibling rearrange

	addToContainer: "addToContainer", // add to existing container at order

	createContainer: "createContainer", // make new container from target, add to new container at order/direction

	cancelLinger: "cancelLinger",

	lingerCreate: "lingerCreate", // make new container from target, add to new container at order/direction

	leafNodeLinger: "leafNodeLinger",
	addToContainerWithDirection: "addToContainerWithDirection", // add to existing container at order AND change the content direction
	setParentDirection: "setParentDirection", // add to existing container at order AND change the content direction
	addToRoot: "addToRoot", // add to the root container, needs to reparent and change direction sometimes
};

export const DropAxis = {
	main: "main",
	cross: "cross",
};

export const DropPosition = {
	start: "start",
	end: "end",
};

export const DropZoneDirections = {
	above: "above",
	below: "below",
	left: "left",
	right: "right",
};

export const PointerDirection = {
	north: "north",
	south: "south",
	east: "east",
	west: "west",
};

export const clickThreshold = 3;
export const dragThreshold = 3;
export const dragZ = 100;
export const selectedZ = 1;
export const LINGER_DURATION = 750;

export const EditorContext = React.createContext();
export const EditorProvider = ({ children }) => {
	const {
		tomeData,
		saveState,
		deleteTile,
		findTilesByKeyValue,
		getTiles,
		findTileById,
		duplicateTile,
		undo,
		deleteEmptyContainers,
		addToEditStack,
		isIdDescendantOfId,
		findTileDepth,
		getCurrentPage,
		setCurrentPage,
		clearClipboard,
		cutTile,
		copyTile,
		pasteAfterTile,
		pasteIntoTile,
	} = React.useContext(TomeContext);

	const [pointerDown, setPointerDown] = React.useState(false);

	// Linger start timer
	const pointerHoverTimer = React.useRef(null);

	const [dragSelection, setDragSelection] = React.useState(null);

	// Don't allow hovers when dragging tiles
	const allowHover = React.useRef(true);

	// Keyboard shorcuts
	const keysPressed = React.useRef([]);
	const keysPressedMotionValue = useMotionValue("");
	const shiftKeyDown = useMotionValue("");
	const optionKeyDown = useMotionValue("");

	// Input focus mgmt
	const [inputFocused, setInputFocused] = React.useState(false);

	// Text selection state
	const textSelectedMotionValue = useMotionValue(false);
	const textSelectionRectMotionValues = React.useRef({
		x: useMotionValue(0),
		y: useMotionValue(0),
		width: useMotionValue(0),
		height: useMotionValue(0),
	});

	const pointerInfo = React.useRef({});

	const tileRefs = React.useRef({});
	const tileRects = React.useRef([]);
	const tileMotionValues = React.useRef({});

	// Page scale (set by Page component currently)
	const pageScale = useMotionValue(1);
	const contentScale = useMotionValue(1);

	// Drag motion values
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);
	const animateDragX = React.useRef();
	const animateDragY = React.useRef();
	const dragOffsetX = useMotionValue(0);
	const dragOffsetY = useMotionValue(0);

	const hoveringOverTile = useMotionValue(false);
	const lingeringTimerStarted = useMotionValue(false);

	const lingeringOverTile = useMotionValue(false);

	// Scaled drag motion values
	const dragXScaled = useTransform(() => dragX.get() / pageScale.get());
	const dragYScaled = useTransform(() => dragY.get() / pageScale.get());

	// Drag-select rectangle metrics
	const dragRect = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	// Selection bounds rectangle metrics
	const selectionBoundsMotionValues = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const event = useMotionValue("");

	const dropStatus = React.useRef({
		key: useMotionValue(""),
		parentKey: useMotionValue(""),
		operation: null,
		axis: "",
		direction: "",
		order: 0,
		draggableId: "",
		droppableId: "",
	});

	const pageOverflow = useMotionValue(false);

	const setDropStatus = info => {
		dropStatus.current.id = info.id;
		dropStatus.current.droppableId = info.droppableId;
		dropStatus.current.draggableId = info.draggableId;
		dropStatus.current.lingerId = info.lingerId;
		dropStatus.current.operation = info.operation;
		dropStatus.current.axis = info.axis;
		dropStatus.current.direction = info.direction;
		dropStatus.current.order = info.order;

		// Create a new key if necessary, triggers indicator re-draw
		const key = info.id + info.droppableId + info.operation + info.axis + info.direction + info.order;
		let parentKey = info.droppableId + info.axis;
		if (
			info.droppableId === getCurrentPage().tiles[0].id &&
			(tomeData.editor.background === pageBackground.EDITOR ||
				tomeData.editor.background === pageBackground.EDITOR_AND_PRESENT)
		)
			parentKey = "";

		//const key = info.id;
		if (dropStatus.current.key.get() !== key) {
			dropStatus.current.key.set(key);
		}
		if (dropStatus.current.parentKey.get() !== parentKey) {
			dropStatus.current.parentKey.set(parentKey);
		}
	};

	const cancelDropStatus = () => {
		console.log("cancelDropStatus");

		dropStatus.current.operation = null;
		dropStatus.current.direction = null;
		dropStatus.current.axis = null;
		dropStatus.current.order = null;
		dropStatus.current.draggableId = null;
		dropStatus.current.droppableId = null;
		dropStatus.current.lingerId = null;

		dropStatus.current.key.set("");
		dropStatus.current.parentKey.set("");

		//hoveringOverTile.set(false);
		lingeringOverTile.set(false);
		//lingeringTimerStarted.set(false);

		clearTimeout(pointerHoverTimer.current);
	};

	const initPointerInfo = e => {
		pointerInfo.current.startX = e.clientX;
		pointerInfo.current.startY = e.clientY;
		pointerInfo.current.x = e.clientX;
		pointerInfo.current.y = e.clientY;
		pointerInfo.current.dx = 0;
		pointerInfo.current.dy = 0;
		pointerInfo.current.tile = null;
		pointerInfo.current.scrollStartY = window.scrollY;
		pointerInfo.current.scrollDeltaY = 0;

		// Drag-select rectangle
		dragRect.width.set(0);
		dragRect.height.set(0);
		dragRect.x.set(0);
		dragRect.y.set(0);

		// Drag motion values used by anything dragging
		dragX.set(0);
		dragY.set(0);
	};

	const togglePlayMode = e => {
		const isPlayMode = !tomeData.editor.isPlayMode;
		tomeData.editor.isPlayMode = isPlayMode;
		saveState();
	};

	const toggleMobileView = e => {
		const isMobile = !tomeData.editor.isMobileView;
		tomeData.editor.isMobileView = isMobile;

		tomeData.tiles.forEach(tile => {
			tile.layout.autoZoom = !isMobile;
			tile.layout.contentSize.width = isMobile ? 393 : 960;
			tile.layout.contentSize.height = isMobile ? 852 : 540;
		});

		saveState();
	};

	const isPlayMode = () => {
		return tomeData.editor.isPlayMode;
	};

	const isMobileView = () => {
		return tomeData.editor.isMobileView;
	};

	const metaThemeColor = React.useRef(document.querySelector("meta[name=theme-color]"));

	const setPageBackgroundColor = () => {
		//let color = "transparent";

		const currentPage = getCurrentPage();
		let canvasColor = "transparent";

		if (
			(tomeData.editor.background === pageBackground.EDITOR && !isPlayMode()) ||
			tomeData.editor.background === pageBackground.EDITOR_AND_PRESENT
		) {
			// find the canvas color
			const pageColor = chroma(currentPage.theme.tokens["--page-color"]);

			canvasColor = generateCanvasColor(pageColor);

			/*
			const luminance = pageColor.luminance();
			const luminanceMin = 0.02;
			let canvasColor = "#fff";
			let pageShadow = "unset";
			// Change the value of the CSS variable
			if (luminance < luminanceMin) {
				canvasColor = pageColor.brighten(0.2).hex();
				//pageShadow = `0px 0px 1px 0px hsla(0, 0%, 100%, 0.12), 0px 0px 50px 0px hsla(0, 0%, 0%, 0.1)`;
			} else {
				canvasColor = pageColor.darken(0.2).hex();
				//pageShadow = `0px 0px 1px 0px hsla(0, 0%, 0%, 0.2), 0px 0px 40px 0px hsla(0, 0%, 0%, 0.01)`;
			}
			*/

			//console.log(luminance, canvasColor);
			document.body.style.setProperty("background-color", canvasColor);
			metaThemeColor.current.setAttribute("content", canvasColor);
			//document.documentElement.style.setProperty("--page-shadow", pageShadow);
		} else {
			document.body.style.setProperty("background-color", currentPage.theme.tokens["--page-color"]);
			metaThemeColor.current.setAttribute("content", currentPage.theme.tokens["--page-color"]);
			//document.documentElement.style.setProperty("--page-shadow", "unset");
		}

		// console.log(textColors)
		if (currentPage.theme.autoColor) {
			const textColors = generateAutoTextColors(currentPage.theme.tokens["--page-color"]);
			currentPage.theme.tokens["--heading-color"] = textColors.titleColor;
			currentPage.theme.tokens["--body-color"] = textColors.bodyColor;
			const ref = tileRefs.current[currentPage.id].current;
			ref.style.setProperty("--heading-color", textColors.titleColor);
			ref.style.setProperty("--body-color", textColors.bodyColor);
		}

		// UI mode checker
		const UIMode = isDarkUITheme(currentPage.theme.tokens["--page-color"]);
		if (currentPage.theme.mode !== UIMode) {
			currentPage.theme.mode = UIMode;
			saveState();
		}

		return {
			pageColor: currentPage.theme.tokens["--page-color"],
			canvasColor: canvasColor,
			headingColor: currentPage.theme.tokens["--heading-color"],
			bodyColor: currentPage.theme.tokens["--body-color"],
		};
	};

	const updateDelta = e => {
		const { startX, startY, scrollDeltaY } = pointerInfo.current;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY + scrollDeltaY;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
		pointerInfo.current.clientX = e.clientX;
		pointerInfo.current.clientY = e.clientY;
	};

	const updateScrollDelta = e => {
		const { tile, clientY, startY } = pointerInfo.current;
		const { y } = tileMotionValues.current[tile.id];
		const scrollDeltaY = window.scrollY - pointerInfo.current.scrollStartY;
		// Update value
		pointerInfo.current.scrollDeltaY = scrollDeltaY;
		// Move dragging object
		y.set(clientY - startY + scrollDeltaY);
	};

	const startWatchingMouseMovement = e => {
		pointerInfo.current.watchedX = e.clientX;
		pointerInfo.current.watchedY = e.clientY;
		//pointerMoveTimer.current = setInterval(watchPointerMovement, 16.667 * 10);
		pointerInfo.current.direction = "unknown";
	};

	const watchPointerMovement = e => {
		const { clientX, clientY, watchedX, watchedY } = pointerInfo.current;
		const difX = clientX - watchedX;
		const difY = clientY - watchedY;
		let direction = "";
		if (Math.abs(difX) > Math.abs(difY)) {
			direction = difX < 0 ? PointerDirection.west : PointerDirection.east;
			pointerInfo.current.direction = direction;
		}
		if (Math.abs(difY) > Math.abs(difX)) {
			direction = difY < 0 ? PointerDirection.north : PointerDirection.south;
			pointerInfo.current.direction = direction;
		}
		pointerInfo.current.watchedX = clientX;
		pointerInfo.current.watchedY = clientY;
		//console.log("watchPointerMovement", pointerInfo.current.direction);
	};

	const onViewportPointerDown = e => {
		//console.log("onViewportPointerDown");
		initPointerInfo(e);

		// Deselect all tiles
		deselectTiles();

		// Disable hovers
		allowHover.current = false;

		// Create the drag-rect info object
		const info = {
			id: uniqueId("rect_drag"),
			width: dragRect.width,
			height: dragRect.height,
			x: dragRect.x,
			y: dragRect.y,
		};

		// Listen for mouse events
		setPointerDown(true);

		// Create a new drag-rect component
		setDragSelection(info);

		// Cache the tile rects
		cacheTileRects();

		// Change event handling modes
		event.set(Events.PressingViewport);
	};

	const dragSelectTiles = e => {
		const { startX, startY, dx, dy } = pointerInfo.current;
		let x = startX;
		let y = startY;
		const w = Math.abs(dx);
		const h = Math.abs(dy);
		dragRect.width.set(w);
		dragRect.height.set(h);
		if (dx < 0) x = x - w;
		if (dy < 0) y = y - h;
		dragRect.x.set(x);
		dragRect.y.set(y);

		let save = false;
		const shift = keysPressed.current.includes("Shift");

		tileRects.current.forEach(info => {
			const tile = findTileById(info.id);
			const isLeaf = tile.tiles === undefined || tile.tiles.length === 0;
			if (
				x + w > info.rect.x &&
				x < info.rect.x + info.rect.width &&
				y + h > info.rect.y &&
				y < info.rect.y + info.rect.height &&
				tile.id !== getCurrentPage().tiles[0].id
			) {
				if (!tile.selected) {
					if (shift && !isLeaf) {
					} else {
						tile.selected = true;
						save = true;
					}
				}
			} else {
				if (tile.selected) {
					tile.selected = false;
					save = true;
				}
			}
		});

		if (save) saveState();
	};

	const cancelViewportDrag = e => {
		setDragSelection(null);
	};

	const onTilePointerDown = (e, tile) => {
		const root = getCurrentPage().tiles[0];
		const isRoot = tile.id === root.id;

		// Blur any focused tiles
		blurFocus();

		// Reset pointer info
		initPointerInfo(e);

		// Tile gets the drag events?
		let draggingTile = null;
		if (tile.selected) {
			draggingTile = tile;
		} else {
			const parent = findTileById(tile.parentId);
			if (parent && parent.selected) {
				draggingTile = parent;
			}
		}

		// Only init drag stuff if selected
		if (draggingTile && draggingTile.id !== root.id) {
			// Change event handling modes
			event.set(Events.PressingTile);

			// Cache the selected tiles
			const selectedTiles = findTilesByKeyValue("selected", true);
			pointerInfo.current.selectedTiles = selectedTiles;

			// Create a ref to the tile being clicked on
			pointerInfo.current.tile = draggingTile;

			// Do not allow dragging the root tile

			// Listen for mouse events
			setPointerDown(true);

			// Cache all visible tile rects
			cacheTileRects();

			// Create a ref to the tile's parent
			pointerInfo.current.parent = findTileById(draggingTile.parentId);

			// Create a ref to the tile's rect
			pointerInfo.current.tileRect = tileRects.current.find(o => o.id === draggingTile.id).rect;

			// Create a ref to the tile's parent's rect
			pointerInfo.current.parentRect = tileRects.current.find(o => o.id === draggingTile.parentId).rect;

			// Cache the draggable tiles, used for dragging x y
			pointerInfo.current.draggableTiles = [];
			pointerInfo.current.selectedTiles.forEach(t => {
				if (isTileDraggable(t)) {
					pointerInfo.current.draggableTiles.push(t);
				}
			});

			// Create the drop zones rects
			pointerInfo.current.dropTargets = [];

			getRootDropRects({
				root: getCurrentPage().tiles[0],
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
			});

			getContainerMainAxisDropRects({
				containers: getValidContainersForRearrange(pointerInfo.current.selectedTiles),
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
				findTileDepth,
			});

			getContentMainAxisDropRects({
				nodes: getValidLeafNodesForRearrange(pointerInfo.current.selectedTiles),
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
				findTileDepth,
				findTileById,
			});

			getRearrangeDropRects({
				container: pointerInfo.current.parent,
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
			});

			pointerInfo.current.hoverTargets = getHoverNodesForRearrange(pointerInfo.current.selectedTiles);

			//console.log("dropTargets -------------------------");
			//console.log(pointerInfo.current.dropTargets);

			// Disable hovers
			allowHover.current = false;

			// Observe mouse movement
			startWatchingMouseMovement(e);
		}
	};

	const onTilePointerUp = (e, tile) => {
		// Check status of SHIFT key
		const shift = keysPressed.current.includes("Shift");

		const root = getCurrentPage().tiles[0];
		const isRoot = tile.id === root.id;

		if (tile.selected) {
			if (shift) {
				// Deselect selected tile if clicked with SHIFT
				tile.selected = false;
				saveState();
			}
		} else {
			const dx = pointerInfo.current.startX - e.clientX;
			const dy = pointerInfo.current.startY - e.clientY;
			const click = Math.abs(dx) <= clickThreshold && Math.abs(dy) <= clickThreshold;
			if (click) {
				// Deselect other tiles if no SHIFT
				if (!shift) deselectTiles();

				// Deselect the root if shift-selecting another node
				if (shift) {
					root.selected = false;
				}

				// Do not allow shift-selecting the root tile
				if (isRoot && shift) {
				} else {
					selectTile(tile);
				}
			}
		}
	};

	const onTilePointerDownOLD = (e, tile) => {
		// Blur any focused tiles
		blurFocus();

		// Check status of SHIFT key
		const shift = keysPressed.current.includes("Shift");

		const root = getCurrentPage().tiles[0];
		const isRoot = tile.id === root.id;

		if (tile.selected) {
			if (shift) {
				// Deselect selected tile if clicked with SHIFT
				tile.selected = false;
				saveState();
			}
		} else {
			// Deselect other tiles if no SHIFT
			if (!shift) deselectTiles();

			// Deselect the root if shift-selecting another node
			if (shift) {
				root.selected = false;
			}

			// Do not allow shift-selecting the root tile
			if (isRoot && shift) {
			} else {
				// Select tile
				selectTile(tile);
			}
		}

		// Reset pointer info
		initPointerInfo(e);

		// Cache the selected tiles
		const selectedTiles = findTilesByKeyValue("selected", true);
		pointerInfo.current.selectedTiles = selectedTiles;

		// Use the first selected tile as the "clicked on" tile
		//const draggingTile = selectedTiles[0];
		const draggingTile = tile;

		// Create a ref to the tile being clicked on
		pointerInfo.current.tile = draggingTile;

		// Do not allow dragging the root tile
		if (!isRoot) {
			// Change event handling modes
			event.set(Events.PressingTile);

			// Listen for mouse events
			setPointerDown(true);

			// Cache all visible tile rects
			cacheTileRects();

			// Create a ref to the tile's parent
			pointerInfo.current.parent = findTileById(draggingTile.parentId);

			// Create a ref to the tile's rect
			pointerInfo.current.tileRect = tileRects.current.find(o => o.id === draggingTile.id).rect;

			// Create a ref to the tile's parent's rect
			pointerInfo.current.parentRect = tileRects.current.find(o => o.id === draggingTile.parentId).rect;

			// Cache the draggable tiles, used for dragging x y
			pointerInfo.current.draggableTiles = [];
			pointerInfo.current.selectedTiles.forEach(t => {
				if (isTileDraggable(t)) {
					pointerInfo.current.draggableTiles.push(t);
				}
			});

			// Create the drop zones rects
			pointerInfo.current.dropTargets = [];

			getRootDropRects({
				root: getCurrentPage().tiles[0],
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
			});

			getContainerMainAxisDropRects({
				containers: getValidContainersForRearrange(pointerInfo.current.selectedTiles),
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
				findTileDepth,
			});

			getContentMainAxisDropRects({
				nodes: getValidLeafNodesForRearrange(pointerInfo.current.selectedTiles),
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
				findTileDepth,
				findTileById,
			});

			getRearrangeDropRects({
				container: pointerInfo.current.parent,
				draggingTile: draggingTile,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
			});

			/*
			getContainerCrossAxisDropRects({
				containers: getValidContainersForRearrange(pointerInfo.current.selectedTiles),
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
				findTileDepth,
			});
			*/

			/*
			// Create the no-op rects for the dragging tiles
			getNoOpDropRects({
				selectedTiles: pointerInfo.current.selectedTiles,
				tileRefs: tileRefs,
				tileRects: tileRects,
				dropTargets: pointerInfo.current.dropTargets,
			});
			*/

			pointerInfo.current.hoverTargets = getHoverNodesForRearrange(pointerInfo.current.selectedTiles);

			// pointerInfo.current.lingerTargets = getLingerNodesForRearrange(pointerInfo.current.selectedTiles);

			//console.log("dropTargets -------------------------");
			//console.log(pointerInfo.current.dropTargets);

			// Disable hovers
			allowHover.current = false;

			// Observe mouse movement
			startWatchingMouseMovement(e);
		}

		e.stopPropagation();
	};

	const onTileResizePointerDown = (e, tile, handle, cursor) => {
		// Disable hovers
		allowHover.current = false;

		// Initialize temp info needed for resize interactions
		initPointerInfo(e);

		// Store tile
		pointerInfo.current.tile = tile;
		const el = tileRefs.current[tile.id].current;
		const rect = el.getBoundingClientRect();
		pointerInfo.current.tileEl = el;
		pointerInfo.current.tileRect = rect;
		pointerInfo.current.resizeCursor = cursor;

		// Store the handle
		pointerInfo.current.resizeHandle = handle;

		// Store tile's parent
		const parent = findTileById(tile.parentId);
		const parentEl = document.getElementById(parent.id);
		const parentRect = parentEl.getBoundingClientRect();
		const parentStyle = getComputedStyle(parentEl);
		pointerInfo.current.parent = parent;
		pointerInfo.current.parentEl = parentEl;
		pointerInfo.current.parentRect = parentRect;
		pointerInfo.current.parentStyle = parentStyle;

		// Listen for mouse events
		setPointerDown(true);

		// Change event handling modes & do the damn thing
		event.set(Events.PressingTileResize);

		// Sibling information
		pointerInfo.current.tilesBefore = [];
		pointerInfo.current.tilesAfter = [];
		pointerInfo.current.siblingTiles = [];

		const tileIndex = parent.tiles.indexOf(tile);
		pointerInfo.current.isFirstTile = tileIndex === 0;
		pointerInfo.current.isLastTile = tileIndex === parent.tiles.length - 1;

		//let flexFactors = 0;
		parent.tiles.forEach((t, i) => {
			//const w = parseFloat(t.layout.width);
			//t.layout.rect = tileRefs.current[t.id].current.getBoundingClientRect();
			//const tEl = tileRefs.current[t.id].current;
			//const style = getComputedStyle(tEl);
			//if (w > 0) {
			//flexFactors += w;
			//}

			if (t.id !== tile.id) {
				//const otherTileInfo = {
				//tile: t,
				//el: tEl,
				//rect: t.layout.rect,
				//};
				pointerInfo.current.siblingTiles.push(t.id);
			}

			/*
			if (i < tileIndex) {
				const leftTileInfo = {
					tile: t,
					el: tEl,
					rect: t.layout.rect,
					cachedWidth: tEl.clientWidth,
				};
				pointerInfo.current.tilesLeft.push(leftTileInfo);
			}
			if (i > tileIndex) {
				const rightTileInfo = {
					tile: t,
					el: tEl,
					rect: t.layout.rect,
					cachedWidth: tEl.clientWidth,
				};
				pointerInfo.current.tilesRight.push(rightTileInfo);
			}
			*/
		});

		/*
		pointerInfo.current.parentFlexFactors = flexFactors;
		const paddingX = parseFloat(parent.layout.padding.x) * pageScale.get();
		const gap = parseFloat(parent.layout.gap) * pageScale.get();
		const parentAvailableWidth = parentRect.width - paddingX * 2 - (gap * parent.tiles.length - 1);
		pointerInfo.current.parentAvailableWidth = parentAvailableWidth;
		pointerInfo.current.parent1Fr = parentAvailableWidth / flexFactors;
		pointerInfo.current.tileFr = parseFloat(tile.layout.width);
		console.log("FLEX FACTOR!!!! ", flexFactors, paddingX, gap, pointerInfo.current.parent1Fr, parentRect.width);
		*/

		e.stopPropagation();
	};

	const onAddTileDragStart = e => {
		// get valid rects
		// getDropZones({
		// 	root: getCurrentPage(),

		// })

		initPointerInfo(e);

		// Cache all visible tile rects
		cacheTileRects();

		// Compute the dragging rects
		// Cache drop rects
		pointerInfo.current.dropTargets = [];

		getContainerMainAxisDropRects({
			containers: getValidContainersForAddTile(),
			tileRects: tileRects,
			dropTargets: pointerInfo.current.dropTargets,
			findTileDepth,
		});

		/*
		getContainerCrossAxisDropRects({
			containers: getValidContainersForAddTile(),
			tileRects: tileRects,
			dropTargets: pointerInfo.current.dropTargets,
			findTileDepth,
		});
		*/

		getRootDropRects({
			root: getCurrentPage().tiles[0],
			tileRects: tileRects,
			dropTargets: pointerInfo.current.dropTargets,
		});

		// Set the editor event state
		event.set(Events.DraggingAddTile);
	};

	const cacheTileRects = () => {
		const rects = [];
		const tiles = getTiles();
		tiles.forEach(tile => {
			const el = document.getElementById(tile.id);
			const rect = el.getBoundingClientRect();
			rects.push({ id: tile.id, rect: rect });
			//console.log(rect);
		});
		tileRects.current = rects;
	};

	const getValidContainersForRearrange = selectedTiles => {
		const validContainers = [];
		//const allTiles = getTiles();
		//const filteredTiles = allTiles.filter(t => t.id !== rootContainer.id && t.type === tileTypes.FLEX);

		getTiles().forEach(t => {
			let isValid = true;

			if (t.type === tileTypes.FLEX) {
				// Ignore any dragging tiles
				if (selectedTiles.find(selectedTile => selectedTile.id === t.id)) {
					isValid = false;
				}

				selectedTiles.forEach(sT => {
					// Ignore parent of dragging tile, sibling rearrange for this
					if (t.id === sT.parentId) {
						isValid = false;
					}

					// Ignore descendants of dragging tile, cannot place a parent inside a child
					if (isIdDescendantOfId(t.id, sT.id)) {
						isValid = false;
					}
				});
			} else {
				isValid = false;
			}

			if (isValid) {
				validContainers.push(t);
			}
		});

		return validContainers;
	};

	const getValidLeafNodesForRearrange = selectedTiles => {
		const validNodes = [];
		//const allTiles = getTiles();
		//const filteredTiles = allTiles.filter(t => t.id !== rootContainer.id && t.type === tileTypes.FLEX);

		getTiles().forEach(t => {
			let isValid = true;

			if (t.type !== tileTypes.FLEX) {
				// Ignore any dragging tiles
				if (selectedTiles.find(selectedTile => selectedTile.id === t.id)) {
					isValid = false;
				}

				selectedTiles.forEach(sT => {
					// Ignore parent of dragging tile, sibling rearrange for this
					if (t.id === sT.parentId) {
						isValid = false;
					}

					// Ignore descendants of dragging tile, cannot place a parent inside a child
					if (isIdDescendantOfId(t.id, sT.id)) {
						isValid = false;
					}
				});
			} else {
				isValid = false;
			}

			if (isValid) {
				validNodes.push(t);
			}
		});

		return validNodes;
	};

	const getValidContainersForAddTile = () => {
		const validContainers = [];
		//const allTiles = getTiles();
		//const filteredTiles = allTiles.filter(t => t.id !== rootContainer.id && t.type === tileTypes.FLEX);

		getTiles().forEach(t => {
			let isValid = true;

			if (t.type === tileTypes.FLEX) {
			} else {
				isValid = false;
			}

			if (isValid) {
				validContainers.push(t);
			}
		});

		return validContainers;
	};

	const getLingerNodes = () => {
		//const lingerNodes = [];
		const lingerNodes = getTiles().filter(t => t.type !== tileTypes.FLEX);
		return lingerNodes;
	};

	const getLingerNodesForRearrange = selectedTiles => {
		//const lingerNodes = [];
		const lingerNodes = getTiles().filter(t => t.type !== tileTypes.FLEX);

		const validNodes = [];
		//const allTiles = getTiles();
		//const filteredTiles = allTiles.filter(t => t.id !== rootContainer.id && t.type === tileTypes.FLEX);

		lingerNodes.forEach(t => {
			let isValid = true;

			// Ignore any dragging tiles
			if (selectedTiles.find(selectedTile => selectedTile.id === t.id)) {
				isValid = false;
			}

			// Ignore descendants of dragging tile, cannot place a parent inside a child
			selectedTiles.forEach(sT => {
				if (isIdDescendantOfId(t.id, sT.id)) {
					isValid = false;
				}
			});

			if (isValid) {
				validNodes.push(t);
			}
		});

		return validNodes;
	};

	const getHoverNodes = () => {
		//const lingerNodes = [];
		const hoverNodes = getTiles().filter(t => t.type === tileTypes.FLEX);
		return hoverNodes;
	};

	const getHoverNodesForRearrange = selectedTiles => {
		//const lingerNodes = [];
		const hoverNodes = getTiles().filter(t => t.type === tileTypes.FLEX);

		const validNodes = [];
		//const allTiles = getTiles();
		//const filteredTiles = allTiles.filter(t => t.id !== rootContainer.id && t.type === tileTypes.FLEX);

		hoverNodes.forEach(t => {
			let isValid = true;

			// Ignore any dragging tiles
			if (selectedTiles.find(selectedTile => selectedTile.id === t.id)) {
				isValid = false;
			}

			// Ignore descendants of dragging tile, cannot place a parent inside a child
			selectedTiles.forEach(sT => {
				if (isIdDescendantOfId(t.id, sT.id)) {
					isValid = false;
				}
			});

			if (isValid) {
				validNodes.push(t);
			}
		});

		return validNodes;
	};

	const onLayoutMeasure = (tile, e, ref) => {
		//console.log("onLayoutMeasure", tile.id, e.x.max - e.x.min, e.y.max - e.y.min);
		//console.log(e);

		// if (ref && ref.current) {
		// 	//console.log(ref.current.scrollHeight, ref.current.clientHeight);
		// 	if (ref.current.scrollHeight > ref.current.clientHeight) {
		// 		console.log("VERTICAL  OVERFLOW!!!!!!!!!!!!");
		// 		//tile.layout.height = "hug";
		// 	}
		// }

		const motionValues = tileMotionValues.current[tile.id];

		// Something that's being dragged is going to move position due to layout changes
		if (
			event.get() === Events.DraggingTile &&
			pointerInfo.current &&
			pointerInfo.current.tile &&
			pointerInfo.current.tile.id === tile.id
		) {
			// console.log("Dragging tile updated layout!!!!!!");
			// tile.pauseLayoutAnimations

			// old vs new position
			const tileRect = tileRects.current.find(o => o.id === tile.id).rect;
			const diffX = tileRect.left - e.x.min;
			const diffY = tileRect.top - e.y.min;
			const { x, y } = tileMotionValues.current[tile.id];

			// update x
			dragOffsetX.set(diffX);
			x.set(pointerInfo.current.dx + diffX);

			// update y
			dragOffsetY.set(diffY);
			y.set(pointerInfo.current.dy + diffY);
		}

		motionValues.top.set(e.y.min);
		motionValues.left.set(e.x.min);
		motionValues.width.set(e.x.max - e.x.min);
		motionValues.height.set(e.y.max - e.y.min);

		tile.layout.rect = {
			x: e.x.min,
			y: e.y.min,
			width: e.x.max - e.x.min,
			height: e.y.max - e.y.min,
			top: e.y.min,
			bottom: e.y.max,
			left: e.x.min,
			right: e.x.max,
		};
	};

	const animateDraggableTilesToOrigins = () => {
		const { draggableTiles } = pointerInfo.current;

		if (animateDragX.current) {
			animateDragX.current.stop();
			animateDragY.current.stop();
		}

		if (!draggableTiles) return false;

		draggableTiles.forEach(t => {
			const { x, y, z } = tileMotionValues.current[t.id];
			animate(x, 0, transitions.layoutTransition);
			animate(y, 0, transitions.layoutTransition);
			animate(z, 0, transitions.layoutTransition);
		});
	};

	const cancelTileDrag = e => {
		console.log("cancel drag");

		allowHover.current = false;
		animateDraggableTilesToOrigins();
		// Fake animation used as an oncomplete callback
		animate("#fff", "#000", {
			...transitions.layoutTransition.default,
			onComplete: () => {
				//tile.isAnimating = false;
				allowHover.current = true;
				event.set(Events.None);
				animateDragX.current = null;
				animateDragY.current = null;
			},
		});
	};

	const gotoPage = page => {
		deselectTiles();
		setCurrentPage(page);
	};

	const selectTile = (tile, x, y) => {
		tile.selected = true;
		saveState();
	};

	const blurFocus = () => {
		const tiles = findTilesByKeyValue("focused", true);
		tiles.forEach(tile => {
			tile.focused = false;
		});
		setInputFocused(false);
		window.getSelection().removeAllRanges();
		saveState();
	};

	const deselectTiles = () => {
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(tile => {
			tile.selected = false;
		});
		saveState();
	};

	const selectAll = () => {
		const tiles = getTiles();
		const rootContainer = getCurrentPage().tiles[0];
		tiles.forEach(tile => {
			if (rootContainer.id !== tile.id) {
				tile.selected = true;
			}
		});
		saveState();
	};

	const selectParent = () => {
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(tile => {
			tile.selected = false;
		});
		const tile = tiles[0];
		if (tile) {
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					parent.selected = true;
				}
			}
		}

		saveState();
	};

	const selectFirstChild = () => {
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(tile => {
			tile.selected = false;
		});
		const tile = tiles[0];
		if (tile) {
			if (tile.tiles && tile.tiles.length > 0) {
				const child = tile.tiles[0];
				child.selected = true;
			}
		}

		saveState();
	};

	const selectChildren = () => {
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(tile => {
			tile.selected = false;
		});
		const tile = tiles[0];
		if (tile) {
			if (tile.tiles && tile.tiles.length > 0) {
				tile.tiles.forEach(child => {
					child.selected = true;
				});
			}
		}

		saveState();
	};

	const isTileSelected = tile => {
		return tile.selected;
	};

	const isAnyTileSelected = () => {
		const tiles = findTilesByKeyValue("selected", true);
		return tiles.length > 0;
	};

	const isAnyTileFocused = () => {
		const tiles = findTilesByKeyValue("focused", true);
		return tiles.length > 0;
	};

	const isMultiSelection = () => {
		const tiles = findTilesByKeyValue("selected", true);
		return tiles.length > 1;
	};

	const pauseDraggingTileLayoutAnimation = node => {
		const pauseAnimation = tile => {
			tile.pauseLayoutAnimations = true;
			if (tile.tiles && tile.tiles.length > 0) {
				tile.tiles.forEach(t => {
					t.pauseLayoutAnimations = true;
					pauseAnimation(t);
				});
			}
		};
		pauseAnimation(node);
		// saveState();
	};

	const isAncestorSelected = tile => {
		let ancestorSelected = false;
		const findSelectedParent = tile => {
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					if (parent.selected) {
						ancestorSelected = true;
					} else {
						findSelectedParent(parent);
					}
				}
			}
		};
		findSelectedParent(tile);
		return ancestorSelected;
	};

	const isDescendantSelected = tile => {
		let descendantSelected = false;
		const findSelectedDescendant = tile => {
			if (tile.tiles && tile.tiles.length > 0) {
				tile.tiles.forEach(t => {
					if (t.selected) {
						descendantSelected = true;
					} else {
						findSelectedDescendant(t);
					}
				});
			}
		};
		findSelectedDescendant(tile);
		return descendantSelected;
	};

	const isParentSelected = tile => {
		const parent = findTileById(tile.parentId);
		if (parent) {
			return parent.selected;
		} else {
			return false;
		}
	};

	const isChildSelected = tile => {
		let childSelected = false;
		const rootContainer = getCurrentPage().tiles[0];
		if (rootContainer.id === tile.id) {
			//return false;
		}
		if (tile.tiles) {
			tile.tiles.forEach(t => {
				if (t.selected) childSelected = true;
			});
		}
		return childSelected;
	};

	const isSiblingSelected = tile => {
		let siblingSelected = false;
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(t => {
			if (t.parentId === tile.parentId) siblingSelected = true;
		});
		return siblingSelected;
	};

	const isTileDraggable = tile => {
		let draggable = tile.selected;

		const findSelectedParent = tile => {
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					if (parent.selected) {
						draggable = false;
					} else {
						findSelectedParent(parent);
					}
				}
			}
		};
		findSelectedParent(tile);

		return draggable;
	};

	const isTileDraggableRecursive = tile => {
		let draggable = tile.selected;
		const findSelectedParent = tile => {
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					if (parent.selected) {
						draggable = true;
					} else {
						findSelectedParent(parent);
					}
				}
			}
		};
		findSelectedParent(tile);
		return draggable;
	};

	const deleteSelection = () => {
		// console.log("deleteSelection");
		const tiles = findTilesByKeyValue("selected", true);
		addToEditStack();
		tiles.forEach(tile => deleteTile(tile));
		// is everything gone now?
		const rootContainer = getCurrentPage().tiles[0];
		if (rootContainer.tiles.length === 0) {
			const textTile = makeTextData(rootContainer);
			textTile.content.textStyle = TextStyles.Heading1;
		}
		saveState();
	};

	const duplicateSelection = () => {
		// console.log("duplicateSelection");
		const tiles = findTilesByKeyValue("selected", true);
		if (tiles.length > 0) {
			addToEditStack();
			tiles.forEach(tile => {
				duplicateTile(tile);
			});
			saveState();
		}
	};

	const undoEdit = () => {
		undo();
	};

	const cutSelection = () => {
		// console.log("cutSelection");
		clearClipboard();
		const tiles = findTilesByKeyValue("selected", true);
		if (tiles.length > 0) {
			addToEditStack();
			tiles.forEach(tile => {
				cutTile(tile);
			});
			saveState();
		}
	};

	const copySelection = () => {
		// console.log("copySelection");
		clearClipboard();
		const tiles = findTilesByKeyValue("selected", true);
		if (tiles.length > 0) {
			tiles.forEach(tile => {
				copyTile(tile);
			});
		}
	};

	const pasteAfterSelection = () => {
		// console.log("pasteIntoTile");
		const selectedTiles = findTilesByKeyValue("selected", true);
		if (selectedTiles.length > 0) {
			pasteAfterTile(selectedTiles[0]);
		} else {
			const rootContainer = getCurrentPage().tiles[0];
			pasteIntoTile(rootContainer);
		}
	};

	const moveItemInArrayFromIndexToIndex = (array, fromIndex, toIndex) => {
		if (fromIndex === toIndex) return array;

		const newArray = [...array];

		const target = newArray[fromIndex];
		const inc = toIndex < fromIndex ? -1 : 1;

		for (let i = fromIndex; i !== toIndex; i += inc) {
			newArray[i] = newArray[i + inc];
		}

		newArray[toIndex] = target;

		return newArray;
	};

	const moveSelectedTileIndex = i => {
		const tile = findTilesByKeyValue("selected", true)[0];
		const rootContainer = getCurrentPage().tiles[0];
		if (tile.id === rootContainer.id) {
			console.error("Can't move root container");
			return false;
		}

		addToEditStack();

		const parentTile = findTilesByKeyValue("id", tile.parentId)[0];
		const currentIndex = parentTile.tiles.indexOf(tile);
		if (currentIndex + i < 0 || currentIndex + i > parentTile.tiles.length - 1) return;
		parentTile.tiles = moveItemInArrayFromIndexToIndex(parentTile.tiles, currentIndex, currentIndex + i);

		saveState();
		return true;

		//console.log("moveSelectedTileIndex", currentIndex, i, tile, parentTile);
	};

	const ungroupSelection = () => {
		addToEditStack();

		const allSelected = findTilesByKeyValue("selected", true);

		// Gert rid of root and non flex container
		const rootContainer = getCurrentPage().tiles[0];
		const containers = allSelected.filter(t => t.id !== rootContainer.id && t.type === tileTypes.FLEX);
		containers.forEach(container => {
			// find parent and index of container
			const parent = findTileById(container.parentId);
			const index = parent.tiles.indexOf(container);
			// remove from current parent
			parent.tiles.splice(index, 1);
			// move each child into container's parent starting at container's index
			container.tiles.forEach((tile, i) => {
				// add to new container
				parent.tiles.splice(index + i, 0, tile);
				tile.parentId = parent.id;
			});
		});

		saveState();
	};

	const groupSelection = () => {
		const allSelected = findTilesByKeyValue("selected", true);

		// Do not group the root container if it is selected
		const rootContainer = getCurrentPage().tiles[0];
		const tiles = allSelected.filter(t => t.id !== rootContainer.id);

		if (tiles.length === 0) {
			console.error("Trying to group nothing");
			return false;
		}

		// Only try to group if selection is at least 2 items
		//if (tiles.length > 1) {
		addToEditStack();

		// console.log("groupSelection");
		// // de-select all the tiles
		// tiles.forEach(tile => {
		// 	tile.selected = false;
		// });

		const firstItem = tiles.splice(0, 1)[0];

		// Choose first selected item's parent as the new container destination
		const parent = findTileById(firstItem.parentId);
		const firstTileIndex = parent.tiles.indexOf(firstItem);

		// Create new container data
		const container = makeFlexData(null);
		//if (parent.layout.direction === contentDirection.VERTICAL) {
		container.layout.height.type = containerSize.HUG;
		//}
		if (
			parent.layout.direction === contentDirection.HORIZONTAL ||
			parent.layout.direction === contentDirection.HORIZONTAL_WRAP
		) {
			//container.layout.width.type = containerSize.HUG;
		}

		//container.layout.justifyContent = "center";
		container.parentId = parent.id;

		// swap container with hovered tile
		parent.tiles.splice(firstTileIndex, 1, container);

		// add first tile to new container
		container.tiles.push(firstItem);
		firstItem.parentId = container.id;

		// add remaining items
		// console.log(tiles);
		tiles.forEach(item => {
			// find parent and index of item
			const parent = findTileById(item.parentId);
			const index = parent.tiles.indexOf(item);
			// remove from current parent
			parent.tiles.splice(index, 1);

			// add to new container
			container.tiles.push(item);
			item.parentId = container.id;

			// remove empty containers (if needed)
			deleteEmptyContainers(parent);
		});

		// deselect any tiles
		const selectedTiles = findTilesByKeyValue("selected", true);
		selectedTiles.forEach(tile => {
			tile.selected = false;
		});
		// select the new group
		container.selected = true;

		saveState();
	};

	const onPointerMove = e => {
		updateDelta(e);
		const { dx, dy } = pointerInfo.current;
		const dragging = Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold;
		switch (event.get()) {
			case Events.PressingViewport:
				if (dragging) {
					event.set(Events.DraggingViewport);
					allowHover.current = false;
				}
				break;
			case Events.DraggingViewport:
				dragSelectTiles(e);
				break;
			case Events.PressingTile:
				if (dragging) {
					event.set(Events.DraggingTile);
					allowHover.current = false;
					document.body.classList.add("grabbing");
				}
				break;
			case Events.DraggingTile:
				onTileDrag(e);
				break;
			case Events.PressingTileResize:
				if (dragging) {
					addToEditStack();
					event.set(Events.DraggingTileResize);
					document.body.classList.add(pointerInfo.current.resizeCursor);
				}
				break;
			case Events.DraggingTileResize:
				onTileResize();
				break;

			// 	break;
			default:
		}
	};

	const onTileResize = () => {
		const { dx, dy, resizeHandle, tile, tileEl, tileRect, parent } = pointerInfo.current;
		const w = tileRect.width;
		const h = tileRect.height;
		let newWidth = false;
		let newHeight = false;

		if (resizeHandle.includes("right") || resizeHandle.includes("left")) {
			// Set container width to CUSTOM if it's not already
			if (tile.layout.width.type !== containerSize.CUSTOM) tile.layout.width.type = containerSize.CUSTOM;
		}

		if (resizeHandle.includes("top") || resizeHandle.includes("bottom")) {
			// Set container height to CUSTOM if it's not already
			if (tile.layout.height.type !== containerSize.CUSTOM) tile.layout.height.type = containerSize.CUSTOM;
		}

		if (tile.layout.constrainProportions) {
			if (resizeHandle === "right" || resizeHandle === "bottom-right") {
				newWidth = (w + dx) / (pageScale.get() * contentScale.get());
				newHeight = (newWidth * 1) / tile.layout.aspectRatio;
			}
			if (resizeHandle === "left" || resizeHandle === "top-left") {
				newWidth = (w - dx) / (pageScale.get() * contentScale.get());
				newHeight = (newWidth * 1) / tile.layout.aspectRatio;
			}
			if (resizeHandle === "top" || resizeHandle === "top-right") {
				newHeight = (h - dy) / (pageScale.get() * contentScale.get());
				newWidth = newHeight * tile.layout.aspectRatio;
			}
			if (resizeHandle === "bottom" || resizeHandle === "bottom-left") {
				newHeight = (h + dy) / (pageScale.get() * contentScale.get());
				newWidth = newHeight * tile.layout.aspectRatio;
			}
		} else {
			if (resizeHandle.includes("right") || resizeHandle.includes("left")) {
				if (resizeHandle.includes("left")) {
					// Update data (unscaled value)
					newWidth = (w - dx) / (pageScale.get() * contentScale.get());
				}
				if (resizeHandle.includes("right")) {
					// Update data (unscaled value)
					newWidth = (w + dx) / (pageScale.get() * contentScale.get());
				}
			}
			if (resizeHandle.includes("top") || resizeHandle.includes("bottom")) {
				if (resizeHandle.includes("top")) {
					// Update data (unscaled value)
					newHeight = (h - dy) / (pageScale.get() * contentScale.get());
				}
				if (resizeHandle.includes("bottom")) {
					// Update data (unscaled value)
					newHeight = (h + dy) / (pageScale.get() * contentScale.get());
				}
			}
		}

		if (newWidth) {
			// Set data
			if (newWidth < 12) newWidth = 12;
			tile.layout.width.value = newWidth;

			tileMotionValues.current[tile.id].width.set(newWidth * (pageScale.get() * contentScale.get()));

			// Use data value to set the display value
			const displayValue = `calc(calc(${tile.layout.width.value}px * var(--content-scale)) * var(--page-scale))`;

			// Render the change
			tileEl.style.width = displayValue;
			//tileEl.style.minWidth = "min-content";

			if (
				parent.layout.direction === contentDirection.HORIZONTAL ||
				parent.layout.direction === contentDirection.HORIZONTAL_WRAP
			) {
				tileEl.style.flexBasis = displayValue;
				tileEl.style.flexGrow = 0;
			}

			if (tile.type === tileTypes.IMAGE) {
				//const imgEl = document.getElementById(tile.id + "_img");
				//if (imgEl) imgEl.style.width = displayValue;
			}
		}

		if (newHeight) {
			// Set data
			if (newHeight < 12) newHeight = 12;
			tile.layout.height.value = newHeight;

			tileMotionValues.current[tile.id].height.set(newHeight * (pageScale.get() * contentScale.get()));

			// Use data value to set the display value
			const displayValue = `calc(calc(${tile.layout.height.value}px * var(--content-scale)) * var(--page-scale))`;

			// Render the change
			tileEl.style.height = displayValue;
			//tileEl.style.minHeight = "min-content";

			if (parent.layout.direction === contentDirection.VERTICAL) {
				tileEl.style.flexBasis = displayValue;
				tileEl.style.flexGrow = 0;
			}

			if (tile.type === tileTypes.IMAGE) {
				//const imgEl = document.getElementById(tile.id + "_img");
				//if (imgEl) imgEl.style.height = displayValue;
			}
		}
	};

	/*
	Within parent check:
	- Is either of the dragging tile's opposite edges more than 20%	over the parent's edge?
	*/

	const checkIfWithinParent = collisionRect => {
		const { tile } = pointerInfo.current;
		const parentRect = tileRects.current.find(o => o.id === tile.parentId).rect;
		let withinParent = true;
		const perH = collisionRect.height * 0.1;
		const perW = collisionRect.width * 0.1;
		if (collisionRect.x < parentRect.x - perW) withinParent = false;
		if (collisionRect.right > parentRect.x + parentRect.width + perW) withinParent = false;
		if (collisionRect.y < parentRect.y - perH) withinParent = false;
		if (collisionRect.bottom > parentRect.y + parentRect.height + perH) withinParent = false;
		//console.log("withinParent", withinParent, collisionRect.x, parentRect.x, perW);
		return withinParent;
	};

	const filterDropTargetsWithinParent = targets => {
		const { tile } = pointerInfo.current;
		return targets.filter(o => o.droppableId === tile.parentId || isIdDescendantOfId(o.droppableId, tile.parentId));
	};

	const rearrangeSiblings = () => {
		const { tile, parent } = pointerInfo.current;

		// look at tile's parent direction for sibling rearrange
		const direction = parent.layout.direction;

		const tileOrder = parent.tiles.indexOf(tile);

		const tileMidX = pointerInfo.current.clientX;
		const tileMidY = pointerInfo.current.clientY;

		let increment = false;
		let decrement = false;

		parent.tiles.forEach(t => {
			if (t.id !== tile.id) {
				const tRect = tileRects.current.find(o => o.id === t.id).rect;
				const tMidY = tRect.top + tRect.height / 2;
				const tMidX = tRect.left + tRect.width / 2;
				const tOrder = parent.tiles.indexOf(t);
				if (direction === contentDirection.VERTICAL) {
					if (tileOrder > tOrder && tileMidY < tMidY) {
						increment = t;
					}
					if (tileOrder < tOrder && tileMidY > tMidY) {
						decrement = t;
					}
				}
				if (direction === contentDirection.HORIZONTAL) {
					if (tileOrder > tOrder && tileMidX < tMidX) {
						increment = t;
					}

					if (tileOrder < tOrder && tileMidX > tMidX) {
						decrement = t;
					}
				}
			}
		});

		if (increment) {
			const t = increment;
			const tOrder = parent.tiles.indexOf(t);
			parent.tiles.splice(tOrder, 1);
			parent.tiles.splice(tOrder + 1, 0, t);
			saveState();
		}

		if (decrement) {
			const t = decrement;
			const tOrder = parent.tiles.indexOf(t);
			parent.tiles.splice(tileOrder, 1);
			parent.tiles.splice(tOrder + 1, 0, tile);
			saveState();
		}
	};

	const onTileDrag = e => {
		const { dx, dy, tile, tileRect, parent, parentRect, draggableTiles, lingerTargets, hoverTargets } =
			pointerInfo.current;

		if (!draggableTiles) return false;

		// find dx and dy for each selected tile
		// move each tile
		draggableTiles.forEach(t => {
			// Drag tile by setting x & y
			const { x, y, z } = tileMotionValues.current[t.id];
			x.set(dx + dragOffsetX.get());
			y.set(dy + dragOffsetY.get() + window.scrollY);
			// "Pop up" with transform-z so that it's visually on top of everything else
			z.set(dragZ);
		});

		const point = {
			x: e.clientX,
			y: e.clientY + window.scrollY,
		};

		// console.log(dropStatus.current.operation);

		// Clear the "linger" hover timer
		//clearTimeout(pointerHoverTimer.current);
		// Remove linger drop zones

		if (dropStatus.current.operation === DropOperation.rearrange) {
			rearrangeSiblings();
		}

		// pointerHoverTimer.current = setTimeout(() => {
		// 	if (dropStatus.current.lingerId) {
		// 		console.log("START LINGER!!!");
		// 		pointerInfo.current.lingerTargets = [];
		// 		dropStatus.current.lingerKey.set(dropStatus.current.lingerId)
		// 	}
		// }, LINGER_DURATION);

		/*
		const inParent = pointInRect(point.x, point.y, parentRect);

		if (inParent) {
			rearrangeSiblings();
		} else {
		}
		*/

		//console.log("inParent", inParent);

		/* 

		// Clear the "linger" hover timer
		clearTimeout(pointerHoverTimer.current);

		

		const hoverTile = findTileIntersection({ tiles: hoverTargets, tileRects: tileRects, point: point });
		if (hoverTile) {
			hoveringOverTile.set(hoverTile.id);
		} else {
			hoveringOverTile.set(false);
		}
		
		const overTile = findTileIntersection({ tiles: lingerTargets, tileRects: tileRects, point: point });
		console.log(overTile);

		if (overTile) {
			if (overTile.id !== lingeringOverTile.get()) {
				lingeringTimerStarted.set(overTile.id);
				clearTimeout(pointerHoverTimer.current);
				pointerHoverTimer.current = setTimeout(() => {
					// Trigger the linger state
					lingeringOverTile.set(overTile.id);

					console.log("LINGER!!!");
				}, LINGER_DURATION);
			}
		} else {
			lingeringTimerStarted.set(false);
			lingeringOverTile.set(false);
			clearTimeout(pointerHoverTimer.current);
		}


		*/

		/*		
		// Reset status on every pointer move
		cancelDropStatus();

		const collisionRect = {
			top: draggingRect.top + pointerInfo.current.dy,
			y: draggingRect.top + pointerInfo.current.dy,
			x: draggingRect.left + pointerInfo.current.dx,
			left: draggingRect.left + pointerInfo.current.dx,
			width: draggingRect.width,
			height: draggingRect.height,
			bottom: draggingRect.top + draggingRect.height + pointerInfo.current.dy,
			right: draggingRect.left + draggingRect.width + pointerInfo.current.dx,
			midX: draggingRect.left + pointerInfo.current.dx + draggingRect.width / 2,
			midY: draggingRect.top + pointerInfo.current.dy + draggingRect.height / 2,
		};

		const pointerCoordinates = {
			x: e.clientX,
			y: e.clientY + window.scrollY,
		};

		if (lingeringOverTile.get() && pointerInfo.current.lingeredRect) {
			//if (pointerLingering(pointerCoordinates, pointerInfo.current.lingeredRect)) {
			//if (rectLingering(collisionRect, pointerInfo.current.lingeredRect)) {

			// has pointer moved more than lingeredRect width or height?
			let lingerDX = Math.abs(e.clientX - pointerInfo.current.lingerStartX);
			let lingerDY = Math.abs(e.clientY - pointerInfo.current.lingerStartY);
			let withinToleranceX = pointerInfo.current.lingeredRect.width;
			let withinToleranceY = pointerInfo.current.lingeredRect.height;
			if (lingerDX < withinToleranceX && lingerDY < withinToleranceY) {
				//console.log("lingeringOverTile", pointerInfo.current.closestWithin);

				// Find closest create container drop zone
				const closestLingerRects = closestCenter({
					collisionRect: collisionRect,
					droppableRects: pointerInfo.current.lingerRectMap,
					droppableContainers: pointerInfo.current.lingerDropTargets,
					pointerCoordinates: pointerCoordinates,
				});
				if (closestLingerRects && closestLingerRects.length > 0) {
					let closest = closestLingerRects[0];
					setDropStatus({
						id: closest.data.droppableContainer.id,
						draggableId: closest.data.droppableContainer.draggableId,
						droppableId: closest.data.droppableContainer.droppableId,
						operation: closest.data.droppableContainer.operation,
						direction: closest.data.droppableContainer.direction,
						axis: closest.data.droppableContainer.axis,
						order: closest.data.droppableContainer.order,
					});
				}
			} else {
				lingeringOverTile.set(false);
				onTileDrag(e);
			}
		} else {
			// First check if out of page via pointer coordinates
			const outOfPage = checkIfOutOfPage(collisionRect);
			const withinParent = checkIfWithinParent(collisionRect);

			let targets = dropTargets;

			// Filter drop targets based on within parent or not
			// This prioritizes drop zones within the current parent
			if (withinParent) targets = filterDropTargetsWithinParent(targets);

			if (!outOfPage) {
				// Filter drop targets based on x & y
				// if moving in a positive x direction, only check rects that are to the right of the dragging rect
				//targets = filterDropTargetsWithPositionDelta(targets, collisionRect);
				//targets = filterDropTargetsByPointerDirection(targets, pointerCoordinates);

				// Find valid hit rects
				if (rectIdMap && targets) {
					//const closestRects = pointerWithin({
					//const closestRects = closestCorners({
					const closestRects = closestCenter({
						collisionRect: collisionRect,
						droppableRects: rectIdMap,
						droppableContainers: targets,
						pointerCoordinates: pointerCoordinates,
					});
					//console.log(closestRects);

					// Don't hit check unless you've moved 1/4 (max 64) of your size
					//const MIN_DIST_X = Math.min(draggingRect.width / 4, 64);
					//const MIN_DIST_Y = Math.min(draggingRect.height / 4, 64);
					//const distanceMovedCheck = Math.abs(dx) > MIN_DIST_X || Math.abs(dy) > MIN_DIST_Y;

					if (closestRects && closestRects.length > 0) {
						let closest = closestRects[0];
						setDropStatus({
							id: closest.data.droppableContainer.id,
							draggableId: closest.data.droppableContainer.draggableId,
							droppableId: closest.data.droppableContainer.droppableId,
							operation: closest.data.droppableContainer.operation,
							direction: closest.data.droppableContainer.direction,
							axis: closest.data.droppableContainer.axis,
							order: closest.data.droppableContainer.order,
						});

						// Don't trigger linger if you're already on a create-container drop zones
						if (closest.data.droppableContainer.operation !== DropOperation.lingerCreate) {
							// Start a new timer to open up the create drop zones
							// aka "Linger to create a container"
							pointerHoverTimer.current = setTimeout(() => {
								// Save the rect to see when to break out of linger mode
								const rect = pointerInfo.current.tileRectIdMap.get(closest.data.droppableContainer.droppableId);

								// Cache linger info
								pointerInfo.current.lingerRectMap = new Map();
								pointerInfo.current.lingerDropTargets = [];
								pointerInfo.current.lingeredRect = rect;
								pointerInfo.current.closestWithin = closest;
								pointerInfo.current.lingerStartX = e.clientX;
								pointerInfo.current.lingerStartY = e.clientY;

								// Create the linger drop zones
								getLingerHitRects({
									tile: findTileById(closest.data.droppableContainer.droppableId),
									tileRect: rect,
									rectIdMap: pointerInfo.current.lingerRectMap,
									dropTargets: pointerInfo.current.lingerDropTargets,
								});

								// Trigger the linger state
								lingeringOverTile.set(true);

								// Re-process the mouse event under the new linger state
								onTileDrag(e);
							}, LINGER_DURATION);
						}
					}
				}
			}
		}

		*/
	};

	const onAddTileDrag = (e, info) => {
		//updateDelta(e);

		const { lingerTargets } = pointerInfo.current;

		// Clear the "linger" hover timer
		clearTimeout(pointerHoverTimer.current);

		const point = {
			x: e.clientX,
			y: e.clientY + window.scrollY,
		};

		/*
		const overTile = findTileIntersection({ tiles: lingerTargets, tileRects: tileRects, point: point });

		if (overTile) {
			if (overTile.id !== lingeringOverTile.get()) {
				lingeringTimerStarted.set(overTile.id);
				clearTimeout(pointerHoverTimer.current);
				pointerHoverTimer.current = setTimeout(() => {
					// Trigger the linger state
					lingeringOverTile.set(overTile.id);

					console.log("LINGER!!!");
				}, LINGER_DURATION);
			}
		} else {
			lingeringTimerStarted.set(false);
			lingeringOverTile.set(false);
			clearTimeout(pointerHoverTimer.current);
		}
		*/
	};

	const onPointerUp = e => {
		// Enable hovers by default
		allowHover.current = true;
		document.body.classList = "";

		switch (event.get()) {
			case Events.PressingTile:
				pointerInfo.current.tile.clickX = e.clientX;
				pointerInfo.current.tile.clickY = e.clientY;
				event.set(Events.ClickedTile);
				saveState();
				break;
			case Events.DraggingTile:
				// Change event to released
				event.set(Events.ReleasedTile);

				// Reset dragging tile's position
				cancelTileDrag();

				// Execute callback if valid drop
				onTileDragEnd();

				break;
			case Events.PressingTileResize:
				// Change event to released
				event.set(Events.ReleasedTile);

				break;
			case Events.DraggingTileResize:
				// Clear the temp styles
				const { tile, tileEl } = pointerInfo.current;
				// tileEl.style.width = "unset";
				// tileEl.style.minWidth = "unset";
				// tileEl.style.height = "unset";
				// tileEl.style.minHeight = "unset";
				// tileEl.style.flexBasis = "unset";
				// tileEl.style.flexGrow = "unset";

				// save size changes to data object
				saveState();

				// change event to released
				event.set(Events.ReleasedTile);

				break;
			case Events.PressingViewport:
				event.set(Events.ClickedViewport);
				break;
			case Events.DraggingViewport:
				cancelViewportDrag();
				event.set(Events.ReleasedViewport);
				break;
			default:
		}

		// Clear the "linger" hover timer
		clearTimeout(pointerHoverTimer.current);
		lingeringOverTile.set(false);
		lingeringTimerStarted.set(false);

		// Stop observing mouse
		//clearTimeout(pointerMoveTimer.current);

		// Clear pointer info state
		pointerInfo.current = {};

		// Stop listening for mouse events
		setPointerDown(false);
	};

	const onTileDragEnd = () => {
		console.log("onTileDragEnd", dropStatus.current);

		const { tile, parent, rearrange } = pointerInfo.current;
		const { operation } = dropStatus.current;

		dragOffsetX.set(0);
		dragOffsetY.set(0);

		/*
		const tileOrder = parent.tiles.indexOf(tile);
		if (tileOrder !== rearrange.order) {
			console.log("commit the rearrange", tileOrder, rearrange.order);

			// remove tile from array
			const t = parent.tiles.splice(tileOrder, 1)[0];
			parent.tiles.splice(rearrange.order, 0, t);

			//tileMotionValues.current[tile.id].x.set(0);
			//tileMotionValues.current[tile.id].y.set(0);

			//tile.waitToOffset = true;

			rearrange.siblings.forEach(t => {
				const { x, y, z } = tileMotionValues.current[t.sibling.id];
				//x.set(0);
				//y.set(0);
				
				//animate(x, 0, transitions.layoutTransition);
				//animate(y, 0, transitions.layoutTransition);
				//animate(z, 0, transitions.layoutTransition);
			});

			parent.tiles.forEach(t => {
				//const { x, y, z } = tileMotionValues.current[t.id];
				//x.set(0);
				//y.set(0);
				//t.pauseLayoutAnimations = true;
			});

			// insert at new location

			
		}
		*/

		if (operation === DropOperation.createContainer || operation === DropOperation.lingerCreate) {
			createContainerFromDrop(tile);
		}

		if (operation === DropOperation.addToContainer) {
			addToContainer(tile);
		}

		// Clear drop status state
		cancelDropStatus();

		/*
		const tiles = findTilesByKeyValue("pauseLayoutAnimations", true);
		tiles.forEach(tile => {
			tile.pauseLayoutAnimations = false;
		});

		// commit change
		saveState();
		*/
	};

	const onAddTileDragEnd = (e, info) => {
		console.log("onAddTileDragEnd");

		const { operation } = dropStatus.current;

		let newTile = makeTextData(null);
		if (info.data) {
			newTile = info.data;
		}

		if (operation === DropOperation.createContainer) {
			createContainerFromDrop(newTile);
		}

		if (operation === DropOperation.addToContainer) {
			addToContainer(newTile);
		}

		// Clear drop status state
		cancelDropStatus();

		// Set the editor event state
		event.set(Events.ReleasedAddTile);

		// Select new tile

		// deselect any tiles
		const selectedTiles = findTilesByKeyValue("selected", true);
		selectedTiles.forEach(tile => {
			tile.selected = false;
		});

		// select the new tile
		newTile.selected = true;

		// commit the changes
		saveState();
	};

	const cancelDragOperation = e => {
		if (dropStatus.current && dropStatus.current.operation) {
			dropStatus.current.operation = DropOperation.noOp;
		}
		onPointerUp();
	};

	const onAddTileClick = (e, info) => {
		console.log("onAddTileClick");
		// make undo-able
		addToEditStack();

		let newTile = info.data;
		const root = getCurrentPage().tiles[0];

		// is there a selection? if so, pick the first one
		const selectedTiles = findTilesByKeyValue("selected", true);
		if (selectedTiles.length > 0) {
			const selectedTile = selectedTiles[0];
			if (selectedTile.type === tileTypes.FLEX) {
				// append to container if selected
				newTile.parentId = selectedTile.id;
				selectedTile.tiles.push(newTile);
			} else {
				// append after leaf node if selected
				const parent = findTileById(selectedTile.parentId);
				newTile.parentId = parent.id;
				parent.tiles.splice(parent.tiles.indexOf(selectedTile) + 1, 0, newTile);
			}
		} else {
			// append to root if nothing is selected
			newTile.parentId = root.id;
			root.tiles.push(newTile);
		}

		// deselect any tiles
		selectedTiles.forEach(tile => {
			tile.selected = false;
		});

		// select the new tile
		newTile.selected = true;

		// commit the changes
		saveState();
	};

	const showLingerForNodeId = id => {
		pointerInfo.current.lingerTargets = [];
		getLingerDropRects({
			id: id,
			draggingTile: pointerInfo.current.tile,
			tileRects: tileRects,
			lingerTargets: pointerInfo.current.lingerTargets,
			findTileById: findTileById,
		});
		lingeringOverTile.set(dropStatus.current.lingerId);
		//dropStatus.current.lingerKey.set(dropStatus.current.lingerId);
	};

	const createContainerFromDrop = draggable => {
		const { droppableId, direction, order } = dropStatus.current;
		console.log("createContainerFromDrop", droppableId, direction, order);

		// make undo-able
		addToEditStack();

		// Is the destination the root container?
		if (droppableId === getCurrentPage().tiles[0].id) {
		}

		const droppable = findTileById(droppableId);
		const droppableParent = findTileById(droppable.parentId);
		const droppableIndex = droppableParent.tiles.indexOf(droppable);

		// create new container data
		const container = makeFlexData(null);
		container.parentId = droppableParent.id;

		// hug content by default when making new groups?
		container.layout.width.type = containerSize.FILL;
		container.layout.height.type = containerSize.HUG;

		// swap container with droppable
		const tileA = droppableParent.tiles.splice(droppableIndex, 1, container)[0];

		// check if draggable has a parent (rearrange)
		if (draggable.parentId) {
			// remove draggable from parent
			const draggableParent = findTileById(draggable.parentId);
			if (draggableParent) {
				const draggableIndex = draggableParent.tiles.indexOf(draggable);
				draggableParent.tiles.splice(draggableIndex, 1);
				// Remove draggable's parent if it is empty after draggables been taken out
				deleteEmptyContainers(draggableParent);
			}
		}

		// set the new container's layout direction
		container.layout.direction = direction;

		// set the order of the tiles inside container based on order param
		tileA.parentId = container.id;
		draggable.parentId = container.id;
		container.tiles = order === 1 ? [tileA, draggable] : [draggable, tileA];

		// deselect any tiles
		const selectedTiles = findTilesByKeyValue("selected", true);
		selectedTiles.forEach(tile => {
			tile.selected = false;
		});

		// select the new container
		container.selected = true;

		// commit the changes
		saveState();
	};

	const addToContainer = draggable => {
		const { droppableId, axis, order } = dropStatus.current;

		const droppable = findTileById(droppableId);

		console.log("addToContainer", draggable, droppableId, axis, order);

		if (draggable.parentId === droppable.id && axis === DropAxis.main) {
			rearrangeContainer(draggable);
		} else {
			// Add to undo stack
			addToEditStack();

			const newIndex = order;

			if (draggable.parentId) {
				// Remove dragging tile from old parent
				const oldParent = findTileById(draggable.parentId);
				const currentIndex = oldParent.tiles.indexOf(draggable);
				oldParent.tiles.splice(currentIndex, 1);
				// Remove empty groups
				deleteEmptyContainers(oldParent);
			}

			if (axis === DropAxis.cross) {
				if ((draggable.parentId === droppable.id && droppable.tiles.length === 2) || droppable.tiles.length === 1) {
				} else {
					// Create a new container for the non-dragging tiles
					const container = makeFlexData(null);
					// Make sure that container has the same layout as root did
					container.layout = JSON.parse(JSON.stringify(droppable.layout));
					// Remove non-dragging tiles from root
					const tiles = droppable.tiles.splice(0, droppable.tiles.length);
					// Re-parent each of the removed tiles
					tiles.forEach(t => {
						t.parentId = container.id;
						container.tiles.push(t);
					});
					// Add the new container to the root container
					container.parentId = droppable.id;
					droppable.tiles = [container];
				}

				// Switch layout direction
				droppable.layout.direction =
					droppable.layout.direction === contentDirection.HORIZONTAL
						? contentDirection.VERTICAL
						: contentDirection.HORIZONTAL;
			}

			// Add to new parent and set order
			droppable.tiles.splice(newIndex, 0, draggable);
			draggable.parentId = droppable.id;

			saveState();
		}
	};

	const rearrangeContainer = draggable => {
		// console.log("rearrangeContainer", dropStatus.current);
		const { droppableId, order } = dropStatus.current;

		// Add to undo stack
		addToEditStack();
		const droppable = findTileById(droppableId);
		const oldIndex = droppable.tiles.indexOf(draggable);
		const newIndex = oldIndex <= order ? order - 1 : order;

		// Add to new parent and set order
		droppable.tiles.splice(oldIndex, 1);
		droppable.tiles.splice(newIndex, 0, draggable);

		saveState();
	};

	const setEditorDebugOption = (option, v) => {
		tomeData.editor.debug[option] = v;
		saveState();
	};

	const onScroll = e => {
		updateScrollDelta();
	};

	React.useEffect(() => {
		if (pointerDown) {
			document.addEventListener("mousemove", onPointerMove);
			document.addEventListener("touchmove", onPointerMove, { passive: false });
			document.addEventListener("mouseup", onPointerUp);
			document.addEventListener("touchend", onPointerUp);
			document.addEventListener("scroll", onScroll);
		}
		return () => {
			document.removeEventListener("mousemove", onPointerMove);
			document.removeEventListener("touchmove", onPointerMove, { passive: false });
			document.removeEventListener("mouseup", onPointerUp);
			document.removeEventListener("touchend", onPointerUp);
			document.removeEventListener("scroll", onScroll);
		};
	}, [pointerDown, tomeData]);

	return (
		<EditorContext.Provider
			value={{
				setEditorDebugOption,

				onViewportPointerDown,

				onTilePointerDown,
				onTilePointerUp,
				onTileResizePointerDown,

				onAddTileDragStart,
				onAddTileDrag,
				onAddTileDragEnd,
				onAddTileClick,

				pointerInfo,

				isTileSelected,
				isMultiSelection,
				isAnyTileSelected,
				isParentSelected,
				isChildSelected,
				isSiblingSelected,
				isAncestorSelected,
				isDescendantSelected,
				isAnyTileFocused,

				deselectTiles,
				selectParent,
				selectFirstChild,
				selectChildren,
				selectAll,

				deleteSelection,
				duplicateSelection,
				groupSelection,
				ungroupSelection,
				cutSelection,
				copySelection,
				pasteAfterSelection,

				undoEdit,

				event,

				moveSelectedTileIndex,

				dragSelection,
				keysPressed,
				keysPressedMotionValue,
				shiftKeyDown,
				optionKeyDown,

				dragX,
				dragY,

				hoveringOverTile,
				lingeringTimerStarted,

				showLingerForNodeId,
				lingeringOverTile,
				pointerHoverTimer,

				isTileDraggable,
				//isTileRearrangeTarget,
				isTileDraggableRecursive,

				dropStatus,
				setDropStatus,
				cancelDropStatus,

				allowHover,
				cancelDragOperation,

				pageScale,
				contentScale,
				dragXScaled,
				dragYScaled,

				togglePlayMode,
				isPlayMode,

				toggleMobileView,
				isMobileView,

				tileRefs,
				tileMotionValues,
				tileRects,

				onLayoutMeasure,

				pageOverflow,

				gotoPage,

				inputFocused,
				setInputFocused,
				blurFocus,

				textSelectedMotionValue,
				textSelectionRectMotionValues,

				selectionBoundsMotionValues,

				setPageBackgroundColor,
			}}
		>
			{children}
		</EditorContext.Provider>
	);
};

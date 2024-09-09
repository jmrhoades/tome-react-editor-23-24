import React from "react";
import { uniqueId } from "lodash";

import { closestCenter } from "@dnd-kit/core";

import { pointerLingering } from "./logic/algorithms";

import { TomeContext } from "../tome/TomeContext";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { transitions } from "../ds/Transitions";
import { makeFlexData, makeTextData } from "../tome/TileData";
import { pointInRect } from "./logic/utilities";
import { getHitRects, getRootCrossHitRects, getTileRects, getLingerHitRects, getNoOpRectForTile } from "./logic/layout";

// import { Huds } from "./huds/Huds";

export const Events = {
	PressingTile: "pressingTile",
	DraggingTile: "draggingTile",
	ReleasedTile: "releasedTile",
	ClickedTile: "clickedTile",

	PressingTileResize: "pressingTileResize",
	DraggingTileResize: "draggingTileResize",

	PressingTextResize: "pressingTextResize",
	DraggingTextResize: "draggingTextResize",

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
	createContainer: "createContainer", // make new container from target, add to new container at order/direction
	addToContainer: "addToContainer", // add to existing container at order
	lingerCreate: "lingerCreate", // make new container from target, add to new container at order/direction
	noOp: "noOp", // no-op zone
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

export const dragThreshold = 1;
export const dragZ = 100;
export const selectedZ = 9999;
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
	} = React.useContext(TomeContext);

	const [pointerDown, setPointerDown] = React.useState(false);
	const pointerMoveTimer = React.useRef(null);
	const pointerHoverTimer = React.useRef(null);

	const [panel, setPanel] = React.useState(null);
	const [menu, setMenu] = React.useState(null);

	const [dragSelection, setDragSelection] = React.useState(null);

	// Don't allow hovers when dragging tiles
	const allowHover = React.useRef(true);

	// Keyboard shorcuts
	const keysPressed = React.useRef([]);

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
		dropStatus.current.draggableId = info.draggableId;
		dropStatus.current.droppableId = info.droppableId;

		dropStatus.current.operation = info.operation;
		dropStatus.current.axis = info.axis;
		dropStatus.current.direction = info.direction;
		dropStatus.current.order = info.order;

		// Create a new key if necessary, triggers indicator re-draw
		const key = info.droppableId + info.operation + info.axis + info.direction + info.order;
		//const key = info.id;
		if (dropStatus.current.key.get() !== key) {
			dropStatus.current.key.set(key);
		}
		if (dropStatus.current.parentKey.get() !== info.droppableId) {
			dropStatus.current.parentKey.set(info.droppableId);
		}
	};

	const cancelDropStatus = () => {
		dropStatus.current.key.set("");
		dropStatus.current.parentKey.set("");
		dropStatus.current.operation = null;
		dropStatus.current.direction = null;
		dropStatus.current.axis = null;
		dropStatus.current.order = null;
		dropStatus.current.draggableId = null;
		dropStatus.current.droppableId = null;
	};

	const initPointerInfo = e => {
		pointerInfo.current.startX = e.clientX;
		pointerInfo.current.startY = e.clientY;
		pointerInfo.current.x = e.clientX;
		pointerInfo.current.y = e.clientY;
		pointerInfo.current.dx = 0;
		pointerInfo.current.dy = 0;
		pointerInfo.current.tile = null;
		pointerInfo.current.tileInfo = null;
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

	const isMobileView = () => {
		return tomeData.editor.isMobileView;
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
		pointerMoveTimer.current = setInterval(watchPointerMovement, 16.667 * 10);
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

		if (menu) {
			console.log("Document pointer down");
			if (pointInRect(e.clientX, e.clientY, menu.anchorEl.getBoundingClientRect())) return;
			const el = document.getElementById(menu.id);
			if (el) {
				const rect = el.getBoundingClientRect();
				const clickIn = pointInRect(e.clientX, e.clientY, rect);
				if (!clickIn) toggleMenu(null, e);
			}
		} else if (panel) {
			if (pointInRect(e.clientX, e.clientY, panel.anchorEl.getBoundingClientRect())) return;
			const el = document.getElementById(panel.id);
			console.log("onViewportPointerDown", el);
			if (el) {
				const rect = el.getBoundingClientRect();
				const clickIn = pointInRect(e.clientX, e.clientY, rect);
				if (!clickIn) togglePanel(null, e);
			}
		}

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
		// is there a menu or panel open? close it
		toggleMenu(null, e);
		togglePanel(null, e);

		// Check status of SHIFT key
		const shift = keysPressed.current.includes("Shift");

		if (tile.selected) {
			if (shift) {
				// Deselect selected tile if clicked with SHIFT
				tile.selected = false;
				saveState();
			}
		} else {
			// Deselect other tiles if no SHIFT
			if (!shift) deselectTiles();
			// Select tile
			selectTile(tile);
		}

		// Do not allow dragging the root tile
		const allowDrag = tile.id !== getCurrentPage().tiles[0].id;

		// Change event handling modes
		event.set(Events.PressingTile);

		// Listen for mouse events
		setPointerDown(true);

		if (allowDrag) {
			initPointerInfo(e);

			// Cache all visible tile rects
			cacheTileRects();

			pointerInfo.current.tile = tile;
			pointerInfo.current.tileInfo = {};
			pointerInfo.current.tileInfo.id = tile.id;
			pointerInfo.current.tileInfo.parentId = tile.parentId;

			// Cache drop rects
			pointerInfo.current.rectIdMap = new Map();
			pointerInfo.current.dropTargets = [];
			pointerInfo.current.draggingRect = tileRefs.current[tile.id].current.getBoundingClientRect();

			getHitRects({
				draggable: tile,
				tiles: getValidDroppablesForRearrange(tile),
				tileRefs: tileRefs,
				rectIdMap: pointerInfo.current.rectIdMap,
				dropTargets: pointerInfo.current.dropTargets,
				findTileById: findTileById,
				findTileDepth: findTileDepth,
			});

			getNoOpRectForTile({
				tile: tile,
				tileRefs: tileRefs,
				rectIdMap: pointerInfo.current.rectIdMap,
				dropTargets: pointerInfo.current.dropTargets,
			});

			pointerInfo.current.tileRectIdMap = new Map();
			pointerInfo.current.tileDropTargets = [];
			getTileRects({
				draggable: tile,
				tiles: getValidDroppablesForRearrange(tile),
				tileRefs: tileRefs,
				rectIdMap: pointerInfo.current.tileRectIdMap,
				dropTargets: pointerInfo.current.tileDropTargets,
				findTileById: findTileById,
				findTileDepth: findTileDepth,
			});

			// Disable hovers
			allowHover.current = false;

			// Observe mouse movement
			startWatchingMouseMovement(e);
		}

		e.stopPropagation();
	};

	const onTileResizePointerDown = (e, tile, handle) => {
		// is there a menu or panel open? close it
		toggleMenu(null, e);
		togglePanel(null, e);

		// Change event handling modes
		event.set(Events.PressingTileResize);

		// Listen for mouse events
		setPointerDown(true);

		initPointerInfo(e);

		// Store tile
		pointerInfo.current.tile = tile;
		const el = document.getElementById(tile.id);
		const rect = el.getBoundingClientRect();
		pointerInfo.current.tileEl = el;
		pointerInfo.current.tileRect = rect;

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

		// sum of flex factors
		pointerInfo.current.tilesLeft = [];
		pointerInfo.current.tilesRight = [];
		pointerInfo.current.otherTileFrs = [];
		const tileIndex = parent.tiles.indexOf(tile);
		pointerInfo.current.isFirstTile = tileIndex === 0;
		pointerInfo.current.isLastTile = tileIndex === parent.tiles.length - 1;

		let flexFactors = 0;
		parent.tiles.forEach((t, i) => {
			const w = parseFloat(t.layout.width);
			t.layout.rect = tileRefs.current[t.id].current.getBoundingClientRect();
			const tEl = tileRefs.current[t.id].current;
			const style = getComputedStyle(tEl);

			if (w > 0) {
				flexFactors += w;
			}
			if (t.id !== tile.id) {
				const otherTileInfo = {
					tile: t,
					tileFr: parseFloat(t.layout.width),
				};
				pointerInfo.current.otherTileFrs.push(otherTileInfo);
			}
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
		});

		pointerInfo.current.parentFlexFactors = flexFactors;

		const paddingX = parseFloat(parent.layout.padding.x) * pageScale.get();
		const gap = parseFloat(parent.layout.gap) * pageScale.get();
		const parentAvailableWidth = parentRect.width - paddingX * 2 - (gap * parent.tiles.length - 1);
		pointerInfo.current.parentAvailableWidth = parentAvailableWidth;
		pointerInfo.current.parent1Fr = parentAvailableWidth / flexFactors;
		pointerInfo.current.tileFr = parseFloat(tile.layout.width);
		console.log("FLEX FACTOR!!!! ", flexFactors, paddingX, gap, pointerInfo.current.parent1Fr, parentRect.width);

		// Disable hovers
		allowHover.current = false;

		e.stopPropagation();
	};

	const onTextResizePointerDown = (e, tile, handle) => {
		// is there a menu or panel open? close it
		toggleMenu(null, e);
		togglePanel(null, e);

		// Change event handling modes
		event.set(Events.PressingTextResize);

		// Listen for mouse events
		setPointerDown(true);

		initPointerInfo(e);

		// Store tile
		pointerInfo.current.tile = tile;
		const el = document.getElementById(tile.id);
		const rect = el.getBoundingClientRect();
		pointerInfo.current.tileEl = el;
		pointerInfo.current.tileRect = rect;

		// Store the handle
		pointerInfo.current.resizeHandle = handle;

		e.stopPropagation();
	};

	const onAddTileDragStart = (e, draggingRect) => {
		// get valid rects
		// getDropZones({
		// 	root: getCurrentPage(),

		// })

		initPointerInfo(e);

		// Cache all visible tile rects
		cacheTileRects();

		// Compute the dragging rects
		// Cache drop rects
		pointerInfo.current.rectIdMap = new Map();
		pointerInfo.current.dropTargets = [];
		pointerInfo.current.draggingRect = draggingRect;

		getHitRects({
			tiles: getTiles(),
			tileRefs: tileRefs,
			rectIdMap: pointerInfo.current.rectIdMap,
			dropTargets: pointerInfo.current.dropTargets,
			findTileById: findTileById,
			findTileDepth: findTileDepth,
		});

		/*
		getRootCrossHitRects({
			tile: getCurrentPage().tiles[0],
			tileRefs: tileRefs,
			rectIdMap: pointerInfo.current.rectIdMap,
			dropTargets: pointerInfo.current.dropTargets,
		});
		*/

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

			//rects.push({ id: tile.id, rect: tile.layout.rect });
		});
		tileRects.current = rects;
	};

	const cacheDraggingTileRect = () => {
		const tile = pointerInfo.current.tile;
		//const el = document.getElementById(tile.id);
		//const rect = el.getBoundingClientRect();
		//pointerInfo.current.cachedDraggingTileRect = rect;
		pointerInfo.current.cachedDraggingTileRect = tile.layout.rect;

		const parent = findTileById(tile.parentId);
		pointerInfo.current.draggingTileParent = parent;
		if (parent) {
			const parentEl = document.getElementById(tile.parentId);
			const parentRect = parentEl.getBoundingClientRect();
			pointerInfo.current.draggingTileParentRect = parentRect;
		}
	};

	const cacheDraggingTileSiblingRects = () => {
		const tile = pointerInfo.current.tile;
		const el = document.getElementById(tile.id);
		const rect = el.getBoundingClientRect();
		pointerInfo.current.draggingTileRect = rect;

		//pointerInfo.current.startX = rect.x;
		//pointerInfo.current.startY = rect.y;
		const parent = findTileById(tile.parentId);
		pointerInfo.current.draggingTileParent = parent;

		if (parent) {
			const parentDirection = parent.layout.direction;
			pointerInfo.current.draggingTileParentDirection = parentDirection;
			const tileIndex = parent.tiles.indexOf(tile);
			pointerInfo.current.draggingTileIndex = tileIndex;

			if (tileIndex > 0) {
				const prevTile = parent.tiles[tileIndex - 1];
				const prevEl = document.getElementById(prevTile.id);
				const prevRect = prevEl.getBoundingClientRect();
				pointerInfo.current.prevRect = prevRect;
				//console.log(tileIndex, parentDirection, prevSideRect);
			}
			if (tileIndex !== parent.tiles.length - 1) {
				const nextTile = parent.tiles[tileIndex + 1];
				const nextEl = document.getElementById(nextTile.id);
				const nextRect = nextEl.getBoundingClientRect();
				pointerInfo.current.nextRect = nextRect;
				//console.log(tileIndex, parentDirection, rightSideRect);
			}

			const grandparent = findTileById(parent.parentId);
			if (grandparent) {
				pointerInfo.current.draggingTileGrandparent = grandparent;
				const parentIndex = grandparent.tiles.indexOf(parent);
				pointerInfo.current.draggingTileParentIndex = parentIndex;
			}

			//console.log(rect, tileIndex, parentDirection);
			pointerInfo.current.stopDrag = false;
		}

		// Very import, used for hit testing, keep fresh
		cacheTileRects();
		cacheDraggingTileReparentRects();
	};

	const getValidDroppablesForRearrange = draggingTile => {
		const validTiles = [];

		getTiles().forEach(t => {
			let depth = 0;
			let childRects = undefined;
			let isValid = true;

			// Ignore dragging tile
			if (t.id === draggingTile.id) {
				isValid = false;
			}

			// Ignore descendants of dragging tile, cannot place a parent inside a child
			if (isIdDescendantOfId(t.id, draggingTile.id)) {
				isValid = false;
			}

			if (isValid) {
				validTiles.push(t);
			}
		});

		return validTiles;
	};

	const cacheDraggingTileReparentRects = () => {
		const validContainerRects = [];
		const tile = pointerInfo.current.tile;
		const parentTile = pointerInfo.current.draggingTileParent;
		const rootContainerId = getCurrentPage().tiles[0].id;
		pointerInfo.current.rootContainerId = rootContainerId;
		const grandparent = findTileById(parentTile.parentId);

		tileRects.current.forEach(({ id, rect }) => {
			// console.log(id, rect);
			// let isValid = false;
			let depth = 0;
			let childRects = undefined;
			let addRect = true;

			// Ignore root container — that will always be the biggest rect — unless parent is root
			if (rootContainerId === id) {
				addRect = false;
				if (parentTile.id === rootContainerId) {
					addRect = true;
				}
			}

			// Ignore grandparent — it will always be covering the dragging tile
			if (grandparent && grandparent.id === id) {
				addRect = false;
			}

			// Ignore dragging tile
			if (tile.id === id) {
				addRect = false;
			}

			// Ignore descendants of dragging tile, cannot place a parent inside a child
			if (isIdDescendantOfId(id, tile.id)) {
				addRect = false;
			}

			if (addRect) {
				const t = findTileById(id);

				// Only reparent top flex containers for now
				if (t.type === "FLEX") {
					depth = findTileDepth(t);
					childRects = [];
					t.tiles.forEach(child => {
						childRects.push(tileRects.current.find(o => o.id === child.id));
					});
					validContainerRects.push({
						id: id,
						depth: depth,
						rect: rect,
						direction: t.layout.direction,
						childRects: childRects,
					});
				}
			}
		});

		// Sort rects so the most-nested are at the beginning
		validContainerRects.sort((a, b) => {
			if (a.depth < b.depth) return 1;
			if (a.depth > b.depth) return -1;
			return 0;
		});

		//console.log("cacheDraggingTileReparentRects ---------");
		//console.log(validRects);
		pointerInfo.current.validContainerRects = validContainerRects;
	};

	const onLayoutMeasure = (tile, e, ref) => {
		//console.log("onLayoutMeasure", tile.id, e.x.max - e.x.min, e.y.max - e.y.min);
		//console.log(e);
		if (ref && ref.current) {
			//console.log(ref.current.scrollHeight, ref.current.clientHeight);
			if (ref.current.scrollHeight > ref.current.clientHeight) {
				console.log("VERTICAL  OVERFLOW!!!!!!!!!!!!");
				//tile.layout.height = "hug";
			}
		}

		tile.layout.rect = {
			x: e.x.min,
			y: e.y.min,
			width: e.x.max - e.x.min,
			height: e.y.max - e.y.min,
			top: e.y.min,
			bottom: e.y.max,
			left: e.x.min,
			righ: e.x.max,
		};

		//console.log(tile.layout.rect);
	};

	const cacheCreateContainerRects = () => {
		const validCreateContainerRects = [];
		const tileId = pointerInfo.current.tileInfo.id;
		tileRects.current.forEach(({ id, rect }) => {
			let addRect = true;

			// Ignore descendants of dragging tile, cannot place a parent inside a child
			if (isIdDescendantOfId(id, tileId)) {
				addRect = false;
			}

			let depth = 0;
			if (addRect) {
				const t = findTileById(id);
				if (t.type !== "FLEX" && t.type !== "PAGE" && id !== tileId) {
					// Only other leaf nodes
					depth = findTileDepth(t);
					validCreateContainerRects.push({
						id: id,
						depth: depth,
						rect: rect,
					});
				}
			}
		});

		// Sort rects so the most-nested are at the beginning
		validCreateContainerRects.sort((a, b) => {
			if (a.depth < b.depth) return 1;
			if (a.depth > b.depth) return -1;
			return 0;
		});

		console.log("cacheCreateContainerRects ---------");
		console.log(validCreateContainerRects);
		pointerInfo.current.validCreateContainerRects = validCreateContainerRects;
	};

	const animateTileToPosition = tileInfo => {
		if (animateDragX.current) {
			animateDragX.current.stop();
			animateDragY.current.stop();
		}
		const { x, y, z } = tileMotionValues.current[tileInfo.id];
		animate(x, 0, transitions.layoutTransition);
		animate(y, 0, transitions.layoutTransition);
		animate(z, 0, transitions.layoutTransition);
	};

	const cancelTileDrag = e => {
		console.log("cancel drag");
		const { tileInfo } = pointerInfo.current;
		allowHover.current = false;
		animateTileToPosition(tileInfo);
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

	const selectTile = (tile, x, y) => {
		tile.selected = true;
		saveState();
	};

	const deselectTiles = () => {
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(tile => {
			tile.selected = false;
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

	const isTileSelected = tile => {
		return tile.selected;
	};

	const isAnyTileSelected = () => {
		const tiles = findTilesByKeyValue("selected", true);
		return tiles.length > 0;
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
			return false;
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
		tiles.forEach(tile => {
			deleteTile(tile);
		});

		saveState();
	};

	const duplicateSelection = () => {
		// console.log("duplicateSelection");
		const tiles = findTilesByKeyValue("selected", true);
		if (tiles.length > 0) {
			tiles.forEach(tile => {
				duplicateTile(tile);
			});
			saveState();
		}
	};

	const undoEdit = () => {
		undo();
	};

	const togglePanel = (info, e, tile) => {
		console.log("togglePanel");

		if (!info || (panel && panel.type === info.type)) {
			hidePanel();
		} else {
			showPanel(info, e, tile);
		}
		// used to cancel parent drag in panel controls
		e.stopPropagation();
	};

	const showPanel = (info, e, tile) => {
		const panel = {
			id: uniqueId(info.id),
			type: info.type,
			title: info.title,
			instruction: info.instruction,
			content: info.content,
			anchorEl: e.target,
			anchor: info.anchor,
			offset: info.offset,
			tile: tile,
			width: info.width,
		};

		setPanel(panel);
	};

	const hidePanel = () => {
		setPanel(null);
		setMenu(null);
	};

	const toggleMenu = (info, e, tile) => {
		console.log("toggleMenu", info);
		if (!info || (menu && info && menu.type === info.type)) {
			hideMenu();
		} else {
			showMenu(info, e, tile);
		}
		// used to cancel parent drag in panel controls
		e.stopPropagation();
	};

	const showMenu = (info, e, tile) => {
		console.log("showMenu", info);
		const menu = {
			id: uniqueId(info.id),
			type: info.type,
			content: info.content,
			anchorEl: e.target,
			tile: tile,
		};
		setMenu(menu);
	};

	const hideMenu = () => {
		setMenu(null);
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
		if (parent.layout.direction === "vertical") {
			container.layout.height = "hug";
		}
		if (parent.layout.direction === "horizontal") {
			container.layout.width = "hug";
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

	const gridDefinitions = tile => {
		const depth = findTileDepth(tile);
		let parentDirection = undefined;
		if (tile.parentId) {
			const parent = findTileById(tile.parentId);
			if (parent) {
				parentDirection = parent.layout.direction;
			}
		}

		let direction = tile.layout.direction;
		if (isMobileView() && depth < 2) {
			direction = "vertical";
			console.log("change direction!!!!!");
		}

		let gridDefinition = "";
		// if (tile.tiles.length > 1) {
		tile.tiles.forEach(t => {
			//const widthUnit = isUnit(t.layout.width);
			//const heightUnit = isUnit(t.layout.height);

			if (direction === "horizontal") {
				if (t.layout.width === "fill") {
					gridDefinition += "minmax(auto, 1fr)";
				} else if (t.layout.width === "hug") {
					gridDefinition += "auto ";
				} else {
					const w = `calc(calc(${t.layout.width}px * var(--content-scale)) * var(--page-scale))`;
					gridDefinition += "minmax(min-content, " + w + ") ";
				}
			}

			if (direction === "vertical") {
				if (t.layout.height === "fill") {
					gridDefinition += "minmax(auto, 1fr)";
					// when to fill vertically? children of root only?
					// gridDefinition += "auto ";
				} else if (t.layout.height === "hug") {
					gridDefinition += "auto ";
				} else {
					const h = `calc(calc(${t.layout.height}px * var(--content-scale)) * var(--page-scale))`;
					gridDefinition += "minmax(min-content, " + h + ") ";
				}
			}
		});

		gridDefinition.trim();

		let gridTemplateRows = "initial";
		let gridTemplateColumns = "initial";

		if (direction === "vertical") {
			gridTemplateRows = gridDefinition;
		}

		if (direction === "horizontal") {
			gridTemplateColumns = gridDefinition;
		}

		//
		// Set container width & height
		//

		let width = "initial";
		let justifySelf = tile.layout.justifySelf;
		if (tile.layout.width === "hug") {
			// width = "fit-content";
			if (parentDirection === "vertical") {
				justifySelf = "start";
			}
		}

		// Allow for custom widths when parent is vertical
		const widthNum = parseFloat(tile.layout.width);
		if (parentDirection === "vertical" && widthNum > 0) {
			width = `calc(calc(${tile.layout.width}px * var(--content-scale))  * var(--page-scale))`;
		}

		let height = "initial";
		if (tile.layout.height === "hug") height = "min-content";
		//if(tile.layout.height === "hug") height = "fit-content";

		// Allow for custom height when parent is horizontal
		const heightNum = parseFloat(tile.layout.height);
		if (parentDirection === "horizontal" && heightNum > 0) {
			//height = tile.layout.height;
			height = `calc(calc(${tile.layout.height}px * var(--content-scale)) * var(--page-scale))`;
			//height = `max(min-content, ${tile.layout.height})`;
		}

		return {
			gridTemplateRows: gridTemplateRows,
			gridTemplateColumns: gridTemplateColumns,
			width: width,
			height: height,
			justifySelf: justifySelf,
		};
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
					cacheDraggingTileRect();
					cacheDraggingTileSiblingRects();
					cacheCreateContainerRects();
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
					allowHover.current = false;
					if (pointerInfo.current.resizeHandle === "right" || pointerInfo.current.resizeHandle === "left")
						document.body.classList.add("ew-resize");
					if (pointerInfo.current.resizeHandle === "top" || pointerInfo.current.resizeHandle === "bottom")
						document.body.classList.add("ns-resize");
				}
				break;
			case Events.DraggingTileResize:
				const tile = pointerInfo.current.tile;
				const tileRefEl = tileRefs.current[tile.id].current;
				const tileRect = pointerInfo.current.tileRect;
				const w = tileRect.width;
				const h = tileRect.height;
				const parent = pointerInfo.current.parent;
				const parentRefEl = tileRefs.current[parent.id].current;
				const parentRect = pointerInfo.current.parentRect;

				// 1fr = leftover space / sum of flex factors

				// const frDelta = dx / pageScale.get() / pointerInfo.current.parent1Fr;
				//tile.layout.width = pointerInfo.current.tileFr + frDelta + "fr";
				//pointerInfo.current.otherTileFrs.forEach(t => {
				//t.tile.layout.width = t.tileFr - frDelta + "fr";
				//});

				if (pointerInfo.current.resizeHandle === "right") {
					//if (!pointerInfo.current.isLastTile) {
					// Lock widths of tiles to the left of resizing tile
					pointerInfo.current.tilesLeft.forEach(t => {
						t.tile.layout.width = t.rect.width / (pageScale.get() * contentScale.get());
						//t.tile.layout.width = t.el.clientWidth;
						//t.tile.layout.width = tileRefs.current[t.tile.id].current.clientWidth + "px";
					});
					//}
					// Update tile layout data
					tile.layout.width = (w + dx) / (pageScale.get() * contentScale.get());
					// Update tile dom element width
					//tileRefEl.style.setProperty(`--width-${tile.id}`, tile.layout.width);
					tileRefEl.style.setProperty(
						`--width-${tile.id}`,
						`calc(calc(${tile.layout.width}px * var(--content-scale)) * var(--page-scale))`
					);
				}

				if (pointerInfo.current.resizeHandle === "left") {
					//if (!pointerInfo.current.isFirstTile) {
					// Lock widths of tiles to the right of resizing tile
					pointerInfo.current.tilesRight.forEach(t => {
						t.tile.layout.width = t.rect.width / (pageScale.get() * contentScale.get());
						//t.tile.layout.width = t.el.clientWidth;
						//t.tile.layout.width = tileRefs.current[t.tile.id].current.clientWidth + "px";
					});
					//}
					// Update tile layout data
					tile.layout.width = (w - dx) / (pageScale.get() * contentScale.get());
					// Update tile dom element width
					//tileRefEl.style.setProperty(`--width-${tile.id}`, tile.layout.width);
					tileRefEl.style.setProperty(
						`--width-${tile.id}`,
						`calc(calc(${tile.layout.width}px * var(--content-scale)) * var(--page-scale))`
					);
					//parent.layout.justifySelf = "end";
				}

				if (pointerInfo.current.resizeHandle === "bottom") {
					// Update tile layout data
					tile.layout.height = (h + dy) / (pageScale.get() * contentScale.get());
					// Update tile dom element width
					//tileRefEl.style.setProperty(`--height-${tile.id}`, tile.layout.height);
					tileRefEl.style.setProperty(
						`--height-${tile.id}`,
						`calc(calc(${tile.layout.height}px * var(--content-scale)) * var(--page-scale))`
					);
				}

				/*
				// Update widths of tiles to the right of resizing tile
				let rDx = dx / pointerInfo.current.tilesRight.length;
				pointerInfo.current.tilesRight.forEach(t => {
					t.tile.layout.width = (t.rect.width - rDx) / pageScale.get() + "px";
					tileRefs.current[t.tile.id].current.style.setProperty(`--width-${t.tile.id}`, t.tile.layout.width);
				});
				*/

				// Update parent layout
				const parentGrid = gridDefinitions(parent);
				parentRefEl.style.setProperty(`--grid-template-columns-${parent.id}`, parentGrid.gridTemplateColumns);
				parentRefEl.style.setProperty(`--grid-template-rows-${parent.id}`, parentGrid.gridTemplateRows);
				//parentRefEl.style.setProperty(`--justify-self-${tile.id}`, parentGrid.justifySelf);

				//console.log(tile.layout.width);
				break;
			case Events.PressingTextResize:
				if (dragging) {
					addToEditStack();
					event.set(Events.DraggingTextResize);
					allowHover.current = false;
					if (pointerInfo.current.resizeHandle === "right" || pointerInfo.current.resizeHandle === "left")
						document.body.classList.add("ew-resize");
					if (pointerInfo.current.resizeHandle === "top" || pointerInfo.current.resizeHandle === "bottom")
						document.body.classList.add("ns-resize");
				}
				break;

			case Events.DraggingTextResize:
				const text = pointerInfo.current.tile;
				const textRefEl = tileRefs.current[text.id].current;
				const textRect = pointerInfo.current.tileRect;
				const tw = textRect.width;
				if (pointerInfo.current.resizeHandle === "right") {
					// Update tile layout data
					text.layout.width = (tw + dx) / (pageScale.get() * contentScale.get());
					// Update tile dom element width
					//textRefEl.style.setProperty(`--width-${text.id}`, text.layout.width);
					textRefEl.style.setProperty(
						`--width-${text.id}`,
						`calc(calc(${text.layout.width}px * var(--content-scale)) * var(--page-scale))`
					);
				}

				break;
			default:
		}
	};

	/*
	Out of page check:
	- Is the mouse cursor 10pts from the window edge? Out of page
	- Is the dragging rectangle's opposite edge out of the page bounds?
	  (Is the right side x less than the left edge x of the page?)
	*/
	const checkIfOutOfPage = collisionRect => {
		const { clientX, clientY, tile } = pointerInfo.current;
		const rootContainer = getCurrentPage().tiles[0];
		const rootRect = tileRects.current.find(o => o.id === rootContainer.id).rect;

		const edgeThresholdX = 10;
		const edgeThresholdY = 10;

		const pointerOutTop = clientY < edgeThresholdY;
		const pointerOutBottom = clientY > window.innerHeight - edgeThresholdY;
		const pointerOutLeft = clientX < edgeThresholdX;
		const pointerOutRight = clientX > window.innerWidth - edgeThresholdX;
		const pointerOut = pointerOutTop || pointerOutBottom || pointerOutLeft || pointerOutRight;

		const rightEdgeOut = collisionRect.right > window.innerWidth + collisionRect.width / 4;
		const leftEdgeOut = collisionRect.left < -1 * (collisionRect.width / 4);
		const topEdgeOut = collisionRect.top < -1 * (collisionRect.height / 4);
		const bottomEdgeOut = collisionRect.bottom > window.innerHeight + collisionRect.height / 4;

		const draggingRectOut = rightEdgeOut || leftEdgeOut || topEdgeOut || bottomEdgeOut;
		//const draggingRectOut = false;
		const outOfPage = pointerOut || draggingRectOut;

		if (outOfPage) {
			let operation = DropOperation.addToContainer;
			let axis = DropAxis.main;
			let index = 0;

			if (rootContainer.layout.direction === "vertical") {
				if (pointerOutTop || topEdgeOut) index = 0;
				if (pointerOutBottom || bottomEdgeOut) index = rootContainer.tiles.length;
				if (pointerOutLeft || leftEdgeOut) {
					axis = DropAxis.cross;
					index = 0;
				}
				if (pointerOutRight || rightEdgeOut) {
					axis = DropAxis.cross;
					index = 1;
				}
			}

			if (rootContainer.layout.direction === "horizontal") {
				if (pointerOutTop || topEdgeOut) {
					axis = DropAxis.cross;
					index = 0;
				}
				if (pointerOutBottom || bottomEdgeOut) {
					axis = DropAxis.cross;
					index = 1;
				}
				if (pointerOutLeft || leftEdgeOut) index = 0;
				if (pointerOutRight || rightEdgeOut) index = rootContainer.tiles.length;
			}

			setDropStatus({
				id: rootContainer.id + "-drop-to-page-" + rootContainer.layout.direction + axis + index,
				draggableId: tile.id,
				droppableId: rootContainer.id,
				operation: operation,
				direction: rootContainer.layout.direction,
				axis: axis,
				order: index,
			});

			// console.log("out of page=------------", outOfPage, axis, index);
		}

		return outOfPage;
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

	const onTileDrag = e => {
		const { dx, dy, tile, rectIdMap, dropTargets, draggingRect } = pointerInfo.current;

		// Reset status on every pointer move
		cancelDropStatus();

		// Clear the "linger" hover timer
		clearTimeout(pointerHoverTimer.current);

		// Drag tile by setting x & y
		const { x, y, z } = tileMotionValues.current[tile.id];
		x.set(dx);
		y.set(dy);
		// "Pop up" with transform-z so that it's visually on top of everything else
		z.set(999);

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
					const MIN_DIST_X = Math.min(draggingRect.width / 4, 64);
					const MIN_DIST_Y = Math.min(draggingRect.height / 4, 64);
					const distanceMovedCheck = Math.abs(dx) > MIN_DIST_X || Math.abs(dy) > MIN_DIST_Y;

					if (closestRects && closestRects.length > 0 && distanceMovedCheck) {
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
	};

	const onAddTileDrag = (e, info) => {
		updateDelta(e);

		const { rectIdMap, dropTargets, draggingRect } = pointerInfo.current;

		if (rectIdMap && dropTargets && draggingRect) {
			const collisionRect = {
				top: draggingRect.top + pointerInfo.current.dy,
				left: draggingRect.left + pointerInfo.current.dx,
				width: draggingRect.width,
				height: draggingRect.height,
			};

			// const closestRects = closestCorners({
			// 	collisionRect: collisionRect,
			// 	droppableRects: rectIdMap,
			// 	droppableContainers: dropTargets,
			// });

			const closestRects = closestCenter({
				collisionRect: collisionRect,
				droppableRects: rectIdMap,
				droppableContainers: dropTargets,
			});

			if (closestRects && closestRects.length > 0) {
				let closest = closestRects[0];

				/*
				let closestArr = [closest];
				const rValue = Math.round(closest.data.value);
				//console.log(collisionRect, closestRects);

				// Sort closest results by tree-depth
				// Higher-depth gets priority
				closestRects.forEach(r => {
					//console.log(r.data);
					// Round each result to give higher depth containers a better chance
					r.data.roundedValue = Math.round(r.data.value);
					if (
						r.data.roundedValue === rValue &&
						closest.data.droppableContainer.id !== r.data.droppableContainer.id
					) {
						closestArr.push(r)
					}
				});
				closestArr.sort((a,b)=>b.data.droppableContainer.depth - a.data.droppableContainer.depth);
				closest = closestArr[0];

				const rect = rectIdMap.get(closest.id);
				const p1 = {
					x: collisionRect.left + collisionRect.width / 2,
					y: collisionRect.top + collisionRect.height / 2,
				};
				const p2 = {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2,
				};
				const angleDegree = angleDegNicer(p1, p2);
				const distance = distanceBetween(p1, p2);
				const dropZoneDirection = directionForDeg(angleDegree);
				*/

				//console.log(closest.data.droppableContainer);

				setDropStatus({
					id: closest.data.droppableContainer.id,
					draggableId: closest.data.droppableContainer.draggableId,

					droppableId: closest.data.droppableContainer.droppableId,
					operation: closest.data.droppableContainer.operation,
					direction: closest.data.droppableContainer.direction,
					axis: closest.data.droppableContainer.axis,
					order: closest.data.droppableContainer.order,
				});

				//console.log(closest, dropZoneDirection, angleDegree, distance);
			} else {
				console.log("Uh-oh, no closest rects for some reason");
			}
		}
	};

	const onPointerUp = e => {
		// Enable hovers by default
		allowHover.current = true;
		document.body.classList.remove("grabbing");
		document.body.classList.remove("ew-resize");
		document.body.classList.remove("ns-resize");

		switch (event.get()) {
			case Events.PressingTile:
				event.set(Events.ClickedTile);
				break;
			case Events.DraggingTile:
				// Execute callback if valid drop
				onTileDragEnd();
				// Reset dragging tile's position
				cancelTileDrag();

				// change event to released
				event.set(Events.ReleasedTile);
				break;
			case Events.PressingTileResize:
				// change event to released
				event.set(Events.ReleasedTile);
				break;
			case Events.DraggingTileResize:
				const tile = pointerInfo.current.tile;
				const parent = pointerInfo.current.parent;
				const pWidth = pointerInfo.current.parentRect.width;
				const numChildren = pointerInfo.current.parent.tiles.length;
				const tilePxWidth = parseFloat(tile.layout.width);
				const parentAvailableWidth = pointerInfo.current.parentAvailableWidth;

				// Restore widths after temporarily locking them
				// Doesn't work without reassign FRs, duh
				//pointerInfo.current.tilesLeft.forEach(t => {
				//t.tile.layout.width = t.cachedWidth;
				//});

				// // Reduce to fr
				// //const pR = tileRefs.current[parent.id].current.getBoundingClientRect();
				// //const gap = parseFloat(parent.layout.gap) * pageScale.get();
				// parent.tiles.forEach(t => {
				// 	const rect = tileRefs.current[t.id].current.getBoundingClientRect();
				// 	t.layout.width = rect.width + "fr";
				// });

				/*
				// Reduce to min = 1fr
				// find the narrowest tile
				// make that width = 1fr
				// adjust the other widths
				let frWidth = 999999999;
				parent.tiles.forEach(t => {
					const rect = tileRefs.current[t.id].current.getBoundingClientRect();
					t.layout.rect = rect; // cache rect for next loop
					if (rect.width < frWidth) {
						frWidth = rect.width;
					}
				});
				*/

				/*
				const rectWidth = tileRefs.current[parent.id].current.clientWidth;
				parent.tiles.forEach(t => {
					t.layout.width = (tileRefs.current[t.id].current.clientWidth / rectWidth) * pageScale.get() + "fr";
					// t.layout.width = t.layout.rect.width / frWidth + "fr";
				});
				*/

				/*
				// Reduce to fr to percent of parent, allows for space
				const pR = tileRefs.current[parent.id].current.getBoundingClientRect();
				const gap = parseFloat(parent.layout.gap) * pageScale.get();
				parent.tiles.forEach(t => {
					const rect = tileRefs.current[t.id].current.getBoundingClientRect();
					t.layout.width = rect.width / (pR.width - (gap*numChildren)) + "fr";
				});
				*/

				/*
				const ideal1FrinPx = parentAvailableWidth / numChildren;
				tile.layout.width =  (tilePxWidth / ideal1FrinPx)  + "fr";
				pointerInfo.current.otherTileFrs.forEach(t => {
					const tEl = document.getElementById(t.tile.id);
					if (tEl) {
						const tRect = tEl.getBoundingClientRect();
						t.tile.layout.width = (tRect.width / ideal1FrinPx) + "fr";
					}
				});
				*/

				/*
				// Reset temp px width to FRs
				const r = tilePxWidth / pWidth;
				// Find new FRs by comparing pixel width to parent width
				tile.layout.width = r * numChildren + "fr";
				pointerInfo.current.otherTileFrs.forEach(t => {
					const tEl = document.getElementById(t.tile.id);
					if (tEl) {
						const tRect = tEl.getBoundingClientRect();
						const widthRatio = tRect.width / pWidth;
						t.tile.layout.width = widthRatio * numChildren + "fr";
					}
				});
				*/

				/*
				// Reset temp px width to FRs
				tile.layout.width = "1fr";
				pointerInfo.current.otherTileFrs.forEach(t => {
					const tEl = document.getElementById(t.tile.id);
					if (tEl) {
						const tRect = tEl.getBoundingClientRect();
						const widthRatio = tRect.width / tilePxWidth;
						t.tile.layout.width = widthRatio + "fr";
					}
				});

				/*
				tile.layout.width = pointerInfo.current.tileFr + frDelta + "fr";
				pointerInfo.current.otherTileFrs.forEach(t => {
					t.tile.layout.width = t.tileFr - frDelta + "fr";
				});
				*/

				// change event to released
				saveState();
				event.set(Events.ReleasedTile);
				break;
			case Events.DraggingTextResize:
				// change event to released
				saveState();
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

		// Stop observing mouse
		clearTimeout(pointerMoveTimer.current);

		// Clear pointer info state
		pointerInfo.current = {};

		// Stop listening for mouse events
		setPointerDown(false);
	};

	const onTileDragEnd = () => {
		console.log("onTileDragEnd", dropStatus.current);

		const { tile } = pointerInfo.current;
		const { operation } = dropStatus.current;
		if (operation === DropOperation.createContainer || operation === DropOperation.lingerCreate) {
			createContainerFromDrop(tile);
		}
		if (operation === DropOperation.addToContainer) {
			addToContainer(tile);
		}

		// Clear drop status state
		cancelDropStatus();
	};

	const onAddTileDragEnd = (e, info) => {
		const { operation } = dropStatus.current;
		const newTile = makeTextData(null);

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
	};

	const cancelDragOperation = e => {
		if (dropStatus.current && dropStatus.current.operation) {
			dropStatus.current.operation = DropOperation.noOp;
		}
		onPointerUp();
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
		container.layout.width = "fill";
		container.layout.height = "hug";

		//if (direction === "vertical") {
		// container.layout.width = "fill";
		//}

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

		console.log("addToContainer", droppableId, axis, order);

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

				// Switch layout direction
				droppable.layout.direction = droppable.layout.direction === "horizontal" ? "vertical" : "horizontal";
			}

			// If old and new parents are the same and the axis is cross, change direction of parent
			//if (draggingTile.parentId === newParent.id && info.axis === DropAxis.cross) {
			//newParent.layout.direction = newParent.layout.direction === "horizontal" ? "vertical" : "horizontal";
			//}
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

		if (option === "showDropZones") {
			document.body.style.setProperty(
				"--editor-debug-dropzone-color-create-container-main",
				v ? "var(--core-yellow-50)" : "transparent"
			);
			document.body.style.setProperty(
				"--editor-debug-dropzone-color-create-container-cross",
				v ? "var(--core-yellow-50)" : "transparent"
			);
			document.body.style.setProperty(
				"--editor-debug-dropzone-color-add-to-container-main-vertical",
				v ? "var(--core-cyan-50)" : "transparent"
			);
			document.body.style.setProperty(
				"--editor-debug-dropzone-color-add-to-container-main-horizontal",
				v ? "var(--core-cyan-50)" : "transparent"
			);
			document.body.style.setProperty(
				"--editor-debug-dropzone-color-add-to-container-cross",
				v ? "var(--core-red)" : "transparent"
			);
		}

		/*
		if (option === "showAddToContainerDropZones") {
			document.body.style.setProperty(
				"--editor-debug-drop-zone-color-main-axis-start",
				v ? "var(--yellow-20)" : "rgba(255, 255, 255, 0)"
			);
			document.body.style.setProperty(
				"--editor-debug-drop-zone-color-main-axis-end",
				v ? "var(--yellow-25)" : "rgba(255, 255, 255, 0)"
			);
			document.body.style.setProperty(
				"--editor-debug-drop-zone-color-cross-axis-start",
				v ? "var(--cyan-20)" : "rgba(255, 255, 255, 0)"
			);
			document.body.style.setProperty(
				"--editor-debug-drop-zone-color-cross-axis-end",
				v ? "var(--cyan-20)" : "rgba(255, 255, 255, 0)"
			);
		}
		*/

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
				panel,
				togglePanel,

				menu,
				toggleMenu,

				setEditorDebugOption,

				onViewportPointerDown,
				onTilePointerDown,
				onTileResizePointerDown,
				onTextResizePointerDown,
				onAddTileDragStart,
				onAddTileDrag,
				onAddTileDragEnd,
				pointerInfo,

				deselectTiles,
				isTileSelected,
				isAnyTileSelected,
				isParentSelected,
				isChildSelected,
				isSiblingSelected,
				selectParent,
				selectFirstChild,

				deleteSelection,
				duplicateSelection,
				groupSelection,

				undoEdit,

				event,

				moveSelectedTileIndex,

				dragSelection,
				keysPressed,

				dragX,
				dragY,

				lingeringOverTile,
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

				toggleMobileView,
				isMobileView,

				tileRefs,
				tileMotionValues,
				tileRects,

				onLayoutMeasure,

				gridDefinitions,

				pageOverflow,
			}}
		>
			{children}
		</EditorContext.Provider>
	);
};

export const Anchor = {
	top: "top",
	"top-start": "top-start",
	"top-end": "top-end",
	right: "right",
	"right-start": "right-start",
	"right-end": "right-end",
	bottom: "bottom",
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	left: "left",
	"left-start": "left-start",
	"left-end": "left-end",
	toolbar: "toolbar",
};

export const positionMenu = (
	anchorRect,
	menuRect,
	options = { anchor: Anchor.bottom, offset: 6, viewportMargin: 10, matchWidth: true, relative: false }
) => {
	const offset = options.offset ? options.offset : 6;
	const viewportMargin = options.viewportMargin ? options.viewportMargin : 10;
	const anchor = options.anchor ? options.anchor : Anchor.bottom;

	// resize menu width if anchor is wider than menu content
	//let menuWidth = anchorRect.width > menuRect.width ? anchorRect.width : menuRect.width;
	let menuWidth = menuRect.width;
	let menuHeight = menuRect.height;

	let anchorXMid = anchorRect.x + anchorRect.width / 2;
	let anchorYMid = anchorRect.y + anchorRect.height / 2;

	// try to position middle-x
	let x = anchorXMid - menuWidth / 2;

	// try to position bottom-y
	let y = anchorRect.y + anchorRect.height + offset;

	if (anchor === Anchor.left) {
		x = anchorRect.x - offset - menuWidth;
		y = anchorYMid - menuHeight / 2;
	}

	if (anchor === Anchor.right) {
		x = anchorRect.x + anchorRect.width + offset;
		y = anchorYMid - menuHeight / 2;
	}

	if (anchor === Anchor["right-start"]) {
		x = anchorRect.x + anchorRect.width + offset;
		y = anchorRect.y;
	}

	if (anchor === Anchor.top) {
		x = anchorRect.x + anchorRect.width / 2 - menuWidth / 2;
		y = anchorRect.y - menuHeight - offset;
	}

	if (anchor === Anchor["top-start"]) {
		x = anchorRect.x;
		y = anchorRect.y - menuHeight - offset;
	}

	if (anchor === Anchor["bottom-start"]) {
		x = anchorRect.x - 4;
		y = anchorRect.y + anchorRect.height + offset;
	}

	if (options.relative) {
		if (anchor === Anchor["bottom"]) {
			x = (anchorRect.width - menuRect.width) / 2;
			y = anchorRect.height + offset;
		}
	}

	// Check if x will go off window edge
	if (x < 0) {
		x = viewportMargin;
	}
	if (x + menuWidth + viewportMargin > window.innerWidth) {
		x = window.innerWidth - viewportMargin - menuWidth;
	}

	// Check if y will go off window edge
	if (y < 0) {
		y = viewportMargin;
	}
	if (y + menuHeight + viewportMargin > window.innerHeight) {
		y = window.innerHeight - viewportMargin - menuHeight;
	}

	// panels have position fixed and don't need this
	if (!options.isPanel) {
		x += window.scrollX;
		y += window.scrollY;
	} else {
		x = window.innerWidth - menuRect.width - 64;
		y = (window.innerHeight - menuRect.height) / 2;
	}

	if (anchor === Anchor["toolbar"]) {
		x = window.innerWidth - menuRect.width - 64;
		y = window.innerHeight / 2 - menuRect.height / 2;
	}

	return {
		x: x,
		y: y,
		width: menuWidth,
		height: menuHeight,
	};
};

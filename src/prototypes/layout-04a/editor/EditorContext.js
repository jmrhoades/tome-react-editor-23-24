import React from "react";
import { initial, uniqueId } from "lodash";

import { TomeContext, gridDefinitions } from "../tome/TomeContext";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { transitions } from "../ds/Transitions";
import { makeFlexData } from "../tome/TileData";
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

	None: "none",
};

export const DropOperation = {
	createContainer: "createContainer", // make new container from target, add to new container at order/direction
	addToContainer: "addToContainer", // add to existing container at order
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

export const PointerDirection = {
	north: "north",
	south: "south",
	east: "east",
	west: "west",
};

export const dragThreshold = 1;
export const dragZ = 100;
export const selectedZ = 9999;

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

	// Drag motion values
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);
	const animateDragX = React.useRef();
	const animateDragY = React.useRef();

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
		position: "",
		parentId: "",
		tileId: "",
	});

	const pageOverflow = useMotionValue(false);

	const setDropStatus = info => {
		if (!pointerInfo.current.tileInfo) {
			// no grabbing tile info, abort
			return false;
		}
		dropStatus.current.tileId = info.tileId;
		dropStatus.current.operation = info.operation;
		dropStatus.current.axis = info.axis;
		dropStatus.current.parentId = info.parentId;
		dropStatus.current.position = info.position;
		const key = info.tileId + info.operation + info.axis + info.parentId + info.position;
		//const key = info.tileId + info.operation + info.axis + info.parentId;
		if (dropStatus.current.key.get() !== key) {
			// console.log("make a drop indicator ");
			dropStatus.current.key.set(key);
		}
		if (dropStatus.current.parentKey.get() !== info.parentId) {
			dropStatus.current.parentKey.set(info.parentId);
		}
	};

	const cancelDropStatus = () => {
		dropStatus.current.key.set("");
		dropStatus.current.parentKey.set("");
		dropStatus.current.operation = null;
		dropStatus.current.axis = null;
		dropStatus.current.position = null;
		dropStatus.current.tileId = null;
		dropStatus.current.parentId = null;
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
		const { startX, startY } = pointerInfo.current;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
		pointerInfo.current.clientX = e.clientX;
		pointerInfo.current.clientY = e.clientY;
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
				y < info.rect.y + info.rect.height
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

		const allowDrag = tile.id !== getCurrentPage().tiles[0].id;

		// Change event handling modes
		event.set(Events.PressingTile);

		// Listen for mouse events
		setPointerDown(true);

		if (allowDrag) {
			initPointerInfo(e);
			pointerInfo.current.tile = tile;
			pointerInfo.current.tileInfo = {};
			pointerInfo.current.tileInfo.id = tile.id;
			pointerInfo.current.tileInfo.parentId = tile.parentId;

			// Cache all visible tile rects
			cacheTileRects();

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
		//pointerInfo.current.callback = callback;
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
					cachedWidth: t.layout.width,
				};
				pointerInfo.current.tilesLeft.push(leftTileInfo);
			}
			if (i > tileIndex) {
				const rightTileInfo = {
					tile: t,
					el: tEl,
					rect: t.layout.rect,
					cachedWidth: t.layout.width,
					//style: style,
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

	const checkRearrange = () => {
		// Reset the drop status on every check
		cancelDropStatus();

		// Clear the spring-loaded hover timer
		clearTimeout(pointerHoverTimer.current);
		// Start a new timer spring-loaded hover timer
		pointerHoverTimer.current = setTimeout(makeCreateContainerDropZone, 1000);

		// Don't check if explicitly told not to in pointerInfo
		if (pointerInfo.current.stopDrag) return false;

		const { dx, dy, cachedDraggingTileRect } = pointerInfo.current;

		// Cache the size & position of the dragging rect for drop zone checking
		const draggingTop = cachedDraggingTileRect.y + dy;
		const draggingBottom = cachedDraggingTileRect.y + cachedDraggingTileRect.height + dy;
		const draggingLeft = cachedDraggingTileRect.x + dx;
		const draggingRight = cachedDraggingTileRect.x + cachedDraggingTileRect.width + dx;
		const draggingMidX = cachedDraggingTileRect.x + cachedDraggingTileRect.width / 2 + dx;
		const draggingMidY = cachedDraggingTileRect.y + cachedDraggingTileRect.height / 2 + dy;
		const draggingRect = {
			x: draggingLeft,
			y: draggingTop,
			width: cachedDraggingTileRect.width,
			height: cachedDraggingTileRect.height,
			draggingTop: draggingTop,
			draggingBottom: draggingBottom,
			draggingLeft: draggingLeft,
			draggingRight: draggingRight,
			draggingMidX: draggingMidX,
			draggingMidY: draggingMidY,
		};

		const outOfPage = checkIfOutOfPage(pointerInfo.current, draggingRect);
		if (!outOfPage) {
			const creatingContainer = checkCreateContainer();
			if (!creatingContainer) {
				checkReparent(pointerInfo.current, draggingRect);
			}
		}
	};

	const checkOverlap = (rectA, rectB) => {
		// rectA is the parent rect, rectB the dragging rect
		const xA1 = rectA.x;
		const xA2 = rectA.x + rectA.width;
		const yA1 = rectA.y;
		const yA2 = rectA.y + rectA.height;

		const xB1 = rectB.x;
		const xB2 = rectB.x + rectB.width;
		const yB1 = rectB.y;
		const yB2 = rectB.y + rectB.height;

		const areaOfIntersection =
			Math.max(0, Math.min(xA2, xB2) - Math.max(xA1, xB1)) * Math.max(0, Math.min(yA2, yB2) - Math.max(yA1, yB1));
		const aB = rectB.width * rectB.height;
		const ratio = areaOfIntersection / aB;
		//console.log("checkOverlap", ratio);
		return ratio;
	};

	const getAxisInfo = (info, draggingRect, parentRect, parentDirection) => {
		const { draggingMidY, draggingMidX } = draggingRect;
		const { direction } = info; // mouse direction

		const parentMidX = parentRect.left + parentRect.width / 2;
		const parentMidY = parentRect.top + parentRect.height / 2;
		const midX = draggingMidX - parentMidX;
		const midY = draggingMidY - parentMidY;

		let axis = DropAxis.main;
		let position = DropPosition.start;

		if (parentDirection === "vertical") {
			if (direction === PointerDirection.north || direction === PointerDirection.south) {
				axis = DropAxis.main;
			}
			let crossAxisThreshold = parentRect.width * 0.25;
			if (direction === PointerDirection.east || direction === PointerDirection.west) {
				if (Math.abs(midX) > crossAxisThreshold) {
					axis = DropAxis.cross;
					if (midX > 0) position = DropPosition.end;
				}
			}
		}

		if (parentDirection === "horizontal") {
			if (direction === PointerDirection.east || direction === PointerDirection.west) {
				axis = DropAxis.main;
			}
			let crossAxisThreshold = parentRect.height * 0.25;
			if (direction === PointerDirection.north || direction === PointerDirection.south) {
				if (Math.abs(midY) > crossAxisThreshold) {
					axis = DropAxis.cross;
					if (midY > 0) position = DropPosition.end;
				}
			}
		}

		return { axis: axis, position: position };
	};

	/*
	const sameParentReorder = (info, draggingRect) => {
		// Is dragging start edge less than previous sibling mid point? -> Reorder -1
		// Is dragging end edge more than next sibling mid point? -> Reorder +1

		const { draggingTileParent, draggingTileIndex, prevRect, nextRect, draggingTileParentDirection, tileInfo } = info;
		const { draggingTop, draggingBottom, draggingLeft, draggingRight } = draggingRect;

		//const rect = pointerInfo.current.draggingTileRect;
		const parentTile = draggingTileParent;
		const index = draggingTileIndex;

		let i = 0;

		const rectA = prevRect;
		const rectB = nextRect;

		if (draggingTileParentDirection === "horizontal") {
			if (rectA && index !== 0) {
				if (draggingLeft < rectA.x + rectA.width / 2) {
					// console.log("REORDER TO THE LEFT!!!!");
					i = -1;
				}
			}
			if (rectB && index !== parentTile.tiles.length - 1) {
				// if (x > rectB.x) { // left edge needs to cross right edge
				if (draggingRight > rectB.x + rectB.width / 2) {
					// console.log("REORDER TO THE RIGHT!!!!");
					i = 1;
				}
			}
		}

		if (draggingTileParentDirection === "vertical") {
			if (rectA && index !== 0) {
				if (draggingTop < rectA.y + rectA.height / 2) {
					// console.log("REORDER UP!!!!");
					i = -1;
				}
			}
			if (rectB && index !== parentTile.tiles.length - 1) {
				// if (x > rectB.x) { // left edge needs to cross right edge
				if (draggingBottom > rectB.y + rectB.height / 2) {
					// console.log("REORDER DOWN!!!!");
					i = 1;
				}
			}
		}

		if (i !== 0) {
			// Update indexes to new index
			const newIndex = index + i;

			setDropStatus({
				tileId: tileInfo.id,
				operation: DropOperation.addToContainer,
				axis: DropAxis.main,
				parentId: parentTile.id,
				position: newIndex,
			});
			
			console.log("sameParentReorder", index, newIndex);
			
			//pointerInfo.current.draggingTileIndex = newIndex;
			//parentTile.tiles = moveItemInArrayFromIndexToIndex(parentTile.tiles, index, newIndex);

			// Save order change / rerender
			//animateLayout();
			//saveState();

			// Prevent further drag checking until rerender is complete
			//pointerInfo.current.stopDrag = true;
			//setTimeout(cacheDraggingTileSiblingRects, 16);
			
		}
	};
	*/

	const getIndexForReparent = (childRects, direction, midX, midY) => {
		// which content side is the dragging tile mid point closest too?
		let distance = 99999999;
		let newIndex = false;
		childRects.forEach((childInfo, i) => {
			if (direction === "horizontal") {
				const dA = Math.abs(midX - childInfo.rect.left);
				const dB = Math.abs(midX - childInfo.rect.right);
				if (dA < distance) {
					distance = dA;
					newIndex = i;
				}
				if (dB < distance) {
					distance = dB;
					newIndex = i + 1;
				}
				//console.log(direction, midX, dA, dB);
			}
			if (direction === "vertical") {
				const dA = Math.abs(midY - childInfo.rect.top);
				const dB = Math.abs(midY - childInfo.rect.bottom);
				if (dA < distance) {
					distance = dA;
					newIndex = i;
				}
				if (dB < distance) {
					distance = dB;
					newIndex = i + 1;
				}
				//console.log(dA, dB);
			}
		});

		return newIndex;
	};

	const sameParentSetDirection = (info, midX, midY) => {
		const { tileInfo, draggingTileParent, draggingTileParentDirection, draggingTileParentRect } = info;
		let position = DropPosition.start;
		if (draggingTileParentDirection === "horizontal") {
			if (midY > draggingTileParentRect.y + draggingTileParentRect.height / 2) {
				position = DropPosition.end;
			}
		}
		if (draggingTileParentDirection === "vertical") {
			if (midX > draggingTileParentRect.x + draggingTileParentRect.width / 2) {
				position = DropPosition.end;
			}
		}
		setDropStatus({
			tileId: tileInfo.id,
			operation: DropOperation.setParentDirection,
			axis: DropAxis.cross,
			parentId: draggingTileParent.id,
			position: position,
		});
	};

	/*
	Out of page check:
	- Is the mouse cursor 10pts from the window edge? Out of page
	- Is the dragging rectangle opposite direction edge out of the page bounds?
	*/
	const checkIfOutOfPage = (info, draggingRect) => {
		const { clientX, clientY, tileInfo, direction } = info;
		const { draggingTop, draggingBottom, draggingLeft, draggingRight } = draggingRect;

		const rootContainer = getCurrentPage().tiles[0];
		const rootRect = tileRects.current.find(o => o.id === rootContainer.id).rect;
		let outOfPage = false;

		const edgeThresholdX = 10;
		const edgeThresholdY = 10;

		const pointerOutTop = clientY < edgeThresholdY;
		const pointerOutBottom = clientY > window.innerHeight - edgeThresholdY;
		const pointerOutLeft = clientX < edgeThresholdX;
		const pointerOutRight = clientX > window.innerWidth - edgeThresholdX;
		let pointerOut = pointerOutTop || pointerOutBottom || pointerOutLeft || pointerOutRight;

		const rightEdgeOut = draggingRight < rootRect.left;
		const leftEdgeOut = draggingLeft > rootRect.right;
		const topEdgeOut = draggingTop > rootRect.bottom;
		const bottomEdgeOut = draggingBottom < rootRect.top;
		let draggingRectOut = rightEdgeOut || leftEdgeOut || topEdgeOut || bottomEdgeOut;

		outOfPage = pointerOut || draggingRectOut;

		/*
		console.log(
			"pointerOutTop",
			pointerOutTop,
			"pointerOutBottom",
			pointerOutBottom,
			"pointerOutLeft",
			pointerOutLeft,
			"pointerOutRight",
			pointerOutRight
		);
		console.log(
			"rightEdgeOut",
			rightEdgeOut,
			"leftEdgeOut",
			leftEdgeOut,
			"topEdgeOut",
			topEdgeOut,
			"bottomEdgeOut",
			bottomEdgeOut
		);
		*/

		if (outOfPage) {
			let index = 0;
			let axis = DropAxis.main;
			let operation = DropOperation.addToRoot;
			if (pointerOutRight || pointerOutBottom || leftEdgeOut || topEdgeOut) index = 1;
			if (rootContainer.layout.direction === "horizontal") {
				if (pointerOutTop || pointerOutBottom || topEdgeOut || bottomEdgeOut) axis = DropAxis.cross;
			}
			if (rootContainer.layout.direction === "vertical") {
				if (pointerOutLeft || pointerOutRight || rightEdgeOut || leftEdgeOut) axis = DropAxis.cross;
			}
			setDropStatus({
				tileId: tileInfo.id,
				operation: operation,
				axis: axis,
				parentId: rootContainer.id,
				position: index,
			});
		}

		return outOfPage;
	};

	const checkMoveToGrandparent = (info, overInfo) => {
		const { tileInfo } = info;
		const { grandparent, parentIndex, position } = overInfo;
		let moveToGrandparent = false;
		if (grandparent) {
			setDropStatus({
				tileId: tileInfo.id,
				parentId: grandparent.id,
				operation: DropOperation.addToContainer,
				axis: DropAxis.main,
				position: position === DropPosition.start ? parentIndex : parentIndex + 1,
			});
			moveToGrandparent = true;
		}
		return moveToGrandparent;
	};

	const checkReparent = (info, draggingRect) => {
		const { dx, dy, cachedDraggingTileRect, validContainerRects, tileInfo, draggingTileParent, draggingTileIndex } =
			info;
		const midX = cachedDraggingTileRect.x + cachedDraggingTileRect.width / 2 + dx;
		const midY = cachedDraggingTileRect.y + cachedDraggingTileRect.height / 2 + dy;

		let newIndex = false;
		let overInfo = {};
		let moveToGrandparent = false;

		// which container is the dragging tile most over?
		let overlap = 0;
		let mostOverId = false;
		let mostOverRect = false;
		let mostOverDirection = false;
		let mostOverChildRects = false;

		validContainerRects.forEach(({ id, rect, childRects, direction }) => {
			const rOverlap = checkOverlap(rect, draggingRect);
			if (rOverlap > overlap) {
				overlap = rOverlap;
				mostOverId = id;
				mostOverDirection = direction;
				mostOverRect = rect;
				mostOverChildRects = childRects;
			}
		});

		if (mostOverId) {
			overInfo = getAxisInfo(info, draggingRect, mostOverRect, mostOverDirection);
			newIndex = getIndexForReparent(mostOverChildRects, mostOverDirection, midX, midY);
			//console.log(overInfo, mostOverId, info.draggingTileParent.id);
			if (overInfo.axis === DropAxis.main) {
				if (mostOverId === info.draggingTileParent.id) {
					//sameParentReorder(info, draggingRect);
					if (draggingTileIndex !== newIndex) {
						setDropStatus({
							tileId: tileInfo.id,
							operation: DropOperation.addToContainer,
							axis: DropAxis.main,
							parentId: mostOverId,
							position: newIndex,
						});
					}
				} else {
					setDropStatus({
						tileId: tileInfo.id,
						operation: DropOperation.addToContainer,
						axis: DropAxis.main,
						parentId: mostOverId,
						position: newIndex,
					});
				}
			}
			if (overInfo.axis === DropAxis.cross) {
				const parent = findTileById(mostOverId);

				if (parent.id === draggingTileParent.id && draggingTileParent.tiles.length === 2) {
					// console.log("dragging to same parent!");
					sameParentSetDirection(info, midX, midY);
				} else {
					if (parent.tiles.length === 1) {
						//newIndex = getPositionForCrossDirection(mostOverChildRects, mostOverDirection, midX, midY);
						console.log("dragging to a container with 1 child!", overInfo.position);
						setDropStatus({
							tileId: tileInfo.id,
							operation: DropOperation.addToContainerWithDirection,
							axis: DropAxis.cross,
							parentId: mostOverId,
							position: overInfo.position,
						});
					} else {
						const grandparent = findTileById(parent.parentId);
						if (grandparent) {
							const parentIndex = grandparent.tiles.indexOf(parent);
							overInfo.grandparent = grandparent;
							overInfo.parentIndex = parentIndex;
							moveToGrandparent = checkMoveToGrandparent(info, overInfo);
						} else {
							console.error("No grandparent");
						}
					}
				}
			}
		}
	};

	const checkCreateContainer = () => {
		const { validCreateContainerRects, dx, dy, cachedDraggingTileRect } = pointerInfo.current;
		const draggingRect = {
			x: cachedDraggingTileRect.x + dx,
			y: cachedDraggingTileRect.y + dy,
			width: cachedDraggingTileRect.width,
			height: cachedDraggingTileRect.height,
		};

		let creatingContainer = false;

		// which container is the dragging tile most over?
		let overlap = 0;
		let mostOverId = false;
		let mostOverRect = false;

		validCreateContainerRects.forEach(({ id, rect, depth }) => {
			const rOverlap = checkOverlap(rect, draggingRect);
			if (rOverlap > overlap) {
				overlap = rOverlap;
				mostOverId = id;
				mostOverRect = rect;
			}
		});

		if (mostOverId) {
			// Check if hovering over new parent from last hover
			if (
				mostOverId !== pointerInfo.current.hoveringId &&
				mostOverId !== pointerInfo.current.draggingTileParent.id
			) {
				console.log("New hover!", mostOverId);
				pointerInfo.current.hoveringId = mostOverId;
				pointerInfo.current.checkingCreateContainerDropZone = false;
			} else {
				if (pointerInfo.current.checkingCreateContainerDropZone) {
					creatingContainer = true;
					// What's the content direction of the current hover position?
					const dTop = Math.abs(pointerInfo.current.clientY - pointerInfo.current.hoveredTileRect.top);
					const dBottom = Math.abs(pointerInfo.current.clientY - pointerInfo.current.hoveredTileRect.bottom);
					const dLeft = Math.abs(pointerInfo.current.clientX - pointerInfo.current.hoveredTileRect.left);
					const dRight = Math.abs(pointerInfo.current.clientX - pointerInfo.current.hoveredTileRect.right);
					//console.log("dTop", dTop, "dBottom", dBottom, "dLeft", dLeft, "dRight", dRight);
					const values = [
						{ direction: "top", value: dTop },
						{ direction: "bottom", value: dBottom },
						{ direction: "left", value: dLeft },
						{ direction: "right", value: dRight },
					];
					const lowest = values.find(o => o.value === Math.min(dTop, dBottom, dLeft, dRight));
					setDropStatus({
						tileId: pointerInfo.current.tileInfo.id,
						operation: DropOperation.createContainer,
						axis: DropAxis.main,
						parentId: pointerInfo.current.hoveringId,
						position: lowest.direction,
					});
				}
			}
		} else {
			pointerInfo.current.hoveringId = undefined;
			pointerInfo.current.checkingCreateContainerDropZone = false;
		}

		return creatingContainer;
	};

	const makeCreateContainerDropZone = () => {
		console.log("makeCreateContainerDropZone!", pointerInfo.current.hoveringId);
		const hoveredTile = findTileById(pointerInfo.current.hoveringId);
		if (hoveredTile && pointerInfo.current.tileInfo) {
			pointerInfo.current.checkingCreateContainerDropZone = true;
			pointerInfo.current.hoveredTile = hoveredTile;
			pointerInfo.current.hoveredTileRect = tileRects.current.find(o => o.id === hoveredTile.id).rect;
			checkCreateContainer();
		}
	};

	const dragTiles = e => {
		const { dx, dy, tileInfo } = pointerInfo.current;
		moveTile(tileInfo, dx, dy);

		if (pointerInfo.current.checkingCreateContainerDropZone) {
			checkCreateContainer();
		} else {
			checkRearrange();
		}
	};

	const moveTile = (tileInfo, dx, dy) => {
		//tileInfo.x.set(dx);
		///tileInfo.y.set(dy);

		const tileRefEl = tileRefs.current[tileInfo.id].current;

		//tileRefEl.style.setProperty(`--x-${tileInfo.id}`, dx + "px");
		//tileRefEl.style.setProperty(`--y-${tileInfo.id}`, dy + "px");
		//tileRefEl.style.setProperty(`--z-${tileInfo.id}`, 999 + "px");

		// tileRefEl.style.setProperty(
		// 	"transform",
		// 	`translate3D(${dx / pageScale.get()}px, ${dy / pageScale.get()}px, 999px)`
		// );

		const { x, y, z } = tileMotionValues.current[tileInfo.id];
		x.set(dx);
		y.set(dy);
		z.set(999);

		//dragX.set(dx);
		//dragY.set(dy);
	};

	const animateTileToPosition = tileInfo => {
		if (animateDragX.current) {
			animateDragX.current.stop();
			animateDragY.current.stop();
		}
		const { x, y, z } = tileMotionValues.current[tileInfo.id];
		//animateDragY.current = animate(y, 0, transitions.layoutTransition);
		animate(x, 0, transitions.layoutTransition);
		animate(y, 0, transitions.layoutTransition);
		animate(z, 0, transitions.layoutTransition);

		/*
		animateDragY.current = animate(dragY, 0, {
			...transitions.layoutTransition.default,
			onUpdate: v => {
				//tileRefEl.style.setProperty("transform", `translate3D(${dragXScaled.get()}px,${dragYScaled.get()}px,20px)`);
			},
			onComplete: () => {},
		});
		*/

		//const tileRefEl = tileRefs.current[tileInfo.id].current;

		//animate(tileRefEl, { x: 0 }, transitions.layoutTransition);
	};

	const cancelTileDrag = e => {
		console.log("cancel drag");
		const { tileInfo } = pointerInfo.current;

		//tile.isAnimating = true;
		//draggingMotionValue.set("");
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

	const animateLayout = () => {
		getTiles().forEach(t => (t.animateLayout = true));
	};

	const deleteSelection = () => {
		// console.log("deleteSelection");
		const tiles = findTilesByKeyValue("selected", true);
		tiles.forEach(tile => {
			deleteTile(tile);
		});
		animateLayout();
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
		if (!info) {
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

	const setEditorDebugOption = (option, v) => {
		tomeData.editor.debug[option] = v;

		if (option === "showTileBackgrounds") {
			document.body.style.setProperty(
				"--editor-debug-background-color",
				v ? "var(--tome-brand-accent-10)" : "transparent"
			);
		}

		if (option === "showNewContainerDropZones") {
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

		saveState();
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

		animateLayout();
		saveState();
		return true;

		//console.log("moveSelectedTileIndex", currentIndex, i, tile, parentTile);
	};

	const isValidDrop = info => {
		//console.log(info);

		if (info.operation === DropOperation.addToContainer) {
			return addToContainer(info);
		}

		if (info.operation === DropOperation.addToContainerWithDirection) {
			return addToContainerWithDirection(info);
		}

		if (info.operation === DropOperation.addToRoot) {
			return addToRootAtOrderWithDirection(info);
		}

		if (info.operation === DropOperation.setParentDirection) {
			return setParentDirectionOnDrop(info);
		}

		if (info.operation === DropOperation.createContainer) {
			return createContainerAtOrderWithDirection(info);
		}

		return false;
	};

	const addToRootAtOrderWithDirection = info => {
		addToEditStack();
		console.log("addToRootAtOrderWithDirection", info);

		const draggingTile = findTileById(info.tileId);
		const draggingTileParent = findTileById(draggingTile.parentId);
		const draggingTileIndex = draggingTileParent.tiles.indexOf(draggingTile);

		const rootContainer = getCurrentPage().tiles[0];
		const newIndex = info.position;

		// Remove dragging tile from its parent
		const removedTile = draggingTileParent.tiles.splice(draggingTileIndex, 1)[0];
		removedTile.parentId = null;

		// Create a new container for the non-dragging tiles
		const container = makeFlexData(null);
		// Make sure that container has the same layout as root did
		container.layout = JSON.parse(JSON.stringify(rootContainer.layout));
		// Remove non-dragging tiles from root
		const tiles = rootContainer.tiles.splice(0, rootContainer.tiles.length);
		// Re-parent each of the removed tiles
		tiles.forEach(t => {
			t.parentId = container.id;
			container.tiles.push(t);
		});
		// Add the new container to the root container
		container.parentId = rootContainer.id;
		rootContainer.tiles = [container];

		// Switch the content direction if dropping on cross axis
		if (info.axis === DropAxis.cross) {
			rootContainer.layout.direction = rootContainer.layout.direction === "horizontal" ? "vertical" : "horizontal";
		}

		// Add dragging content to root
		rootContainer.tiles.splice(newIndex, 0, removedTile);
		removedTile.parentId = rootContainer.id;

		// Remove empty groups if there are any after removing the tile
		deleteEmptyContainers(draggingTileParent);

		animateLayout();
		saveState();
		return true;
	};

	const createContainerAtOrderWithDirection = info => {
		addToEditStack();
		console.log("createContainerAtOrderWithDirection", info);

		const hoveredTile = findTileById(info.parentId);
		const hoveredTileParent = findTileById(hoveredTile.parentId);
		const hoveredTileIndex = hoveredTileParent.tiles.indexOf(hoveredTile);

		// create new container data
		const container = makeFlexData(null);
		container.parentId = hoveredTileParent.id;

		// hug content by default when making new groups?
		container.layout.width = "hug";
		container.layout.height = "hug";

		// swap container with hovered tile
		const tileA = hoveredTileParent.tiles.splice(hoveredTileIndex, 1, container)[0];

		// add hovered tile to new container
		container.tiles.push(tileA);
		tileA.parentId = container.id;

		// remove dragging tile from parent
		const draggingTile = findTileById(pointerInfo.current.tileInfo.id);
		const draggingTileParent = findTileById(draggingTile.parentId);
		const draggingTileIndex = draggingTileParent.tiles.indexOf(draggingTile);
		const tileB = draggingTileParent.tiles.splice(draggingTileIndex, 1)[0];
		tileB.parentId = container.id;

		/*
		// remove hovered tile parent if the only child is also the new container
		if (hoveredTileParent.tiles.length === 1 && hoveredTileParent.tiles[0].id === container.id) {
			// find hovered tile parent-parent
			const hoveredTileParentParent = findTileById(hoveredTileParent.parentId);
			if (hoveredTileParentParent) {
				const hoveredTileParentIndex = hoveredTileParentParent.tiles.indexOf(hoveredTileParent);
				// Make sure that container has the same layout as previous parent did
				container.layout = JSON.parse(JSON.stringify(hoveredTileParent.layout));
				// swap container with hovered tile parent
				hoveredTileParentParent.tiles.splice(hoveredTileParentIndex, 1, container);
				container.parentId = hoveredTileParentParent.id;
				console.log("Removed container");
			}
		}
		*/

		if (info.position === "top") {
			container.layout.direction = "vertical";
			container.tiles = [tileB, tileA];
		}
		if (info.position === "bottom") {
			container.layout.direction = "vertical";
			container.tiles = [tileA, tileB];
		}
		if (info.position === "left") {
			container.layout.direction = "horizontal";
			container.tiles = [tileB, tileA];
		}
		if (info.position === "right") {
			container.layout.direction = "horizontal";
			container.tiles = [tileA, tileB];
		}

		// deselect any tiles
		const selectedTiles = findTilesByKeyValue("selected", true);
		selectedTiles.forEach(tile => {
			tile.selected = false;
		});

		// select the new group
		container.selected = true;

		// show hud
		setTimeout(() => event.set(Events.ClickedTile), 10);

		animateLayout();
		saveState();
		return true;
	};

	const addToContainer = info => {
		const newParent = findTileById(info.parentId);
		const draggingTile = findTileById(info.tileId);
		const oldParent = findTileById(draggingTile.parentId);
		const currentIndex = oldParent.tiles.indexOf(draggingTile);
		const newIndex = info.position;

		console.log("addToContainer", currentIndex, newIndex, info.tileId, info.parentId);

		// Add to undo stack
		addToEditStack();

		// If old and new parents are the same and the axis is cross, change direction of parent
		//if (draggingTile.parentId === newParent.id && info.axis === DropAxis.cross) {
		//newParent.layout.direction = newParent.layout.direction === "horizontal" ? "vertical" : "horizontal";
		//}

		// Remove dragging tile from old parent
		oldParent.tiles.splice(currentIndex, 1);

		// Add to new parent and set order
		newParent.tiles.splice(newIndex, 0, draggingTile);
		draggingTile.parentId = newParent.id;

		// Remove empty groups
		deleteEmptyContainers(oldParent);

		animateLayout();
		saveState();
		return true;
	};

	const addToContainerWithDirection = info => {
		const newParent = findTileById(info.parentId);
		const draggingTile = findTileById(info.tileId);
		const oldParent = findTileById(draggingTile.parentId);
		const currentIndex = oldParent.tiles.indexOf(draggingTile);
		const newIndex = info.position === DropPosition.start ? 0 : 1;
		console.log("addToContainerWithDirection", currentIndex, newIndex, info.tileId, info.parentId);

		// Add to undo stack
		addToEditStack();

		// Remove dragging tile from old parent
		oldParent.tiles.splice(currentIndex, 1);

		// Add to new parent and set order
		newParent.tiles.splice(newIndex, 0, draggingTile);
		draggingTile.parentId = newParent.id;

		// Update layout to the opposite content direction
		newParent.layout.direction = newParent.layout.direction === "horizontal" ? "vertical" : "horizontal";

		// Remove empty groups
		deleteEmptyContainers(oldParent);

		animateLayout();
		saveState();
		return true;
	};

	const setParentDirectionOnDrop = info => {
		const draggingTile = findTileById(info.tileId);
		const parent = findTileById(info.parentId);
		const draggingTileIndex = parent.tiles.indexOf(draggingTile);

		console.log("setParentDirectionOnDrop", info);

		// Add to undo stack
		addToEditStack();

		// Assumes parent has 2 children, find sibling by finding the other index
		const siblingTile = parent.tiles[draggingTileIndex === 0 ? 1 : 0];

		// Flip the content direction of the parent
		parent.layout.direction = parent.layout.direction === "vertical" ? "horizontal" : "vertical";

		// Set child order based on position
		if (info.position === DropPosition.start) {
			parent.tiles = [draggingTile, siblingTile];
		}
		if (info.position === DropPosition.end) {
			parent.tiles = [siblingTile, draggingTile];
		}

		animateLayout();
		saveState();
		return true;
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

		// create new container data
		const container = makeFlexData(null);
		//container.layout.direction = parent.layout.direction === "vertical" ? "horizontal" : "vertical";
		//container.layout.width = "hug";
		//container.layout.height = "hug";
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

		// show hud !!!!
		setTimeout(() => event.set(Events.ClickedTile), 100);

		animateLayout();
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
			const widthUnit = isUnit(t.layout.width);

			if (direction === "horizontal") {
				if (t.layout.width === "fill" || t.layout.width === "fit") {
					gridDefinition += "minmax(auto, 1fr)";
				} else if (t.layout.width === "hug") {
					gridDefinition += "auto ";
				} else {
					if (t.type === "FLEX") {
						if (widthUnit) {
							if (widthUnit === "px") {
								gridDefinition += "minmax(min-content, " + t.layout.width + ") ";
								//gridDefinition += "minmax(auto, " + t.layout.width + ") ";
							} else {
								//gridDefinition += t.layout.width + " ";
								gridDefinition += "minmax(min-content, " + t.layout.width + ") ";
							}
						} else {
							gridDefinition += "auto ";
						}
					} else {
						gridDefinition += "auto ";
					}
				}
			}

			if (direction === "vertical") {
				if (t.layout.height === "fill" || t.layout.height === "fit") {
					gridDefinition += "minmax(auto, 1fr)";
					//gridDefinition += "auto ";
				} else if (t.layout.height === "hug") {
					gridDefinition += "auto ";
				} else {
					if (t.type === "FLEX") {
						//gridDefinition += t.layout.height + " ";
						gridDefinition += "minmax(min-content, " + t.layout.height + ") ";
					} else {
						gridDefinition += "auto ";
					}
				}
			}
		});

		gridDefinition.trim();

		// } else {
		// 	if (direction === "horizontal") {
		// 		gridDefinition = "1fr";
		// 	}
		// 	if (direction === "vertical") {
		// 		gridDefinition = "auto";
		// 	}
		// }

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
		//if (tile.layout.width === "hug") width = "min-content";
		//if(tile.layout.width === "hug") width = "fit-content";

		if (tile.layout.width === "hug") {
			if (parentDirection === "vertical") {
				justifySelf = "start";
			}
		}

		// Allow for custom widths when parent is vertical
		const widthNum = parseFloat(tile.layout.width);
		if (parentDirection === "vertical" && widthNum > 0) {
			width = tile.layout.width;
		}

		let height = "initial";
		if (tile.layout.height === "hug") height = "min-content";
		//if(tile.layout.height === "hug") height = "fit-content";

		// Allow for custom height when parent is horizontal
		const heightNum = parseFloat(tile.layout.height);
		if (parentDirection === "horizontal" && heightNum > 0) {
			height = tile.layout.height;
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
				dragTiles(e);
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
						//t.tile.layout.width = t.rect.width + "px";
						t.tile.layout.width = t.el.clientWidth + "px";
						//t.tile.layout.width = tileRefs.current[t.tile.id].current.clientWidth + "px";
					});
					//}
					// Update tile layout data
					tile.layout.width = (w + dx) / pageScale.get() + "px";
					// Update tile dom element width
					tileRefEl.style.setProperty(`--width-${tile.id}`, tile.layout.width);
				}

				if (pointerInfo.current.resizeHandle === "left") {
					//if (!pointerInfo.current.isFirstTile) {
					// Lock widths of tiles to the right of resizing tile
					pointerInfo.current.tilesRight.forEach(t => {
						//t.tile.layout.width = t.rect.width + "px";
						t.tile.layout.width = t.el.clientWidth + "px";
						//t.tile.layout.width = tileRefs.current[t.tile.id].current.clientWidth + "px";
					});
					//}
					// Update tile layout data
					tile.layout.width = (w - dx) / pageScale.get() + "px";
					// Update tile dom element width
					tileRefEl.style.setProperty(`--width-${tile.id}`, tile.layout.width);

					//parent.layout.justifySelf = "end";
				}

				if (pointerInfo.current.resizeHandle === "bottom") {
					// Update tile layout data
					tile.layout.height = (h + dy) / pageScale.get() + "px";
					// Update tile dom element width
					tileRefEl.style.setProperty(`--height-${tile.id}`, tile.layout.height);
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
					text.layout.width = (tw + dx) / pageScale.get() + "px";
					// Update tile dom element width
					textRefEl.style.setProperty(`--width-${text.id}`, text.layout.width);
				}

				break;
			default:
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
				// change event to released
				event.set(Events.ReleasedTile);
				// check if valid drop
				if (isValidDrop(dropStatus.current)) {
					console.log("onPointerUp", "Events.DraggingTile", "valid DROP");
				}
				// Reset draggin tiles position
				cancelTileDrag();
				// Clear drop status state
				cancelDropStatus();
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

		// Clear pointer info state
		pointerInfo.current = {};

		// Stop listening for mouse events
		setPointerDown(false);

		// Stop observing mouse
		clearTimeout(pointerMoveTimer.current);
	};

	React.useEffect(() => {
		if (pointerDown) {
			document.addEventListener("mousemove", onPointerMove);
			document.addEventListener("touchmove", onPointerMove, { passive: false });
			document.addEventListener("mouseup", onPointerUp);
			document.addEventListener("touchend", onPointerUp);
		}
		return () => {
			document.removeEventListener("mousemove", onPointerMove);
			document.removeEventListener("touchmove", onPointerMove, { passive: false });
			document.removeEventListener("mouseup", onPointerUp);
			document.removeEventListener("touchend", onPointerUp);
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
				pointerInfo,

				deselectTiles,
				isTileSelected,
				isAnyTileSelected,
				isParentSelected,
				isChildSelected,
				isSiblingSelected,

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

				isTileDraggable,
				//isTileRearrangeTarget,
				isTileDraggableRecursive,

				dropStatus,
				setDropStatus,
				cancelDropStatus,

				allowHover,

				pageScale,
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
};

export const pointInRect = (x, y, rect) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
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
	let menuWidth = anchorRect.width > menuRect.width ? anchorRect.width : menuRect.width;
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
		x = anchorRect.x + (anchorRect.width - menuRect.width) / 2;
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

	return {
		x: x,
		y: y,
		width: menuWidth,
		height: menuHeight,
	};
};

export const getBoundingBox = rects => {
	let x1 = 9999999999;
	let y1 = 9999999999;
	let x2 = -999999999;
	let y2 = -999999999;
	rects.forEach(rect => {
		//console.log(rect);
		x1 = Math.min(x1, rect.x);
		y1 = Math.min(y1, rect.y);
		x2 = Math.max(x2, rect.x + rect.width);
		y2 = Math.max(y2, rect.y + rect.height);
		//console.log(rect, x1, y1, x2, y2);
	});
	return {
		x: x1,
		y: y1,
		width: x2 - x1,
		height: y2 - y1,
	};
};

export const isUnit = v => {
	let unit = false;
	if (typeof v === "string") {
		if (v.length > 2) {
			const u = v.substring(v.length - 2).toLowerCase();
			if (u === "fr") unit = u;
			if (u === "px") unit = u;
		}
	}
	return unit;
};

import React from "react";
import { uniqueId } from "lodash";

import { TomeContext } from "../tome/TomeContext";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { transitions } from "../ds/Transitions";
import { makeFlexData } from "../tome/TileData";
// import { Huds } from "./huds/Huds";

export const Events = {
	PressingTile: "pressingTile",
	DraggingTile: "draggingTile",
	ReleasedTile: "releasedTile",
	ClickedTile: "clickedTile",
	PressingViewport: "pressingViewport",
	DraggingViewport: "draggingViewport",
	ReleasedViewport: "releasedViewport",
	ClickedViewport: "clickedViewport",
	None: "none",
};

export const DropOperation = {
	createContainer: "createContainer", // make new container from target, add to new container at order/direction
	addToContainer: "addToContainer", // add to existing container at order
};

export const DropAxis = {
	main: "main",
	cross: "cross",
};

export const DropPosition = {
	start: "start",
	end: "end",
};

export const dragThreshold = 1;

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
		getCurrentPage,
	} = React.useContext(TomeContext);

	const [panel, setPanel] = React.useState(null);
	const [menu, setMenu] = React.useState(null);

	const [dragSelection, setDragSelection] = React.useState(null);

	// Don't allow hovers when dragging tiles
	const allowHover = React.useRef(true);

	// Keyboard shorcuts
	const keysPressed = React.useRef([]);

	const pointerInfo = React.useRef({});

	const tileRects = React.useRef([]);

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
		operation: null,
		axis: "",
		position: "",
		parentDirection: "",
		tileId: "",
		targetRect: null,
		parentRect: null,
		indicatorRect: null,
	});

	const setDropStatus = info => {
		if (!pointerInfo.current.tileInfo) {
			// no grabbing tile info, abort
			return false;
		}
		const key = info.tileId + info.type + info.operation + info.axis + info.position + info.parentDirection;
		dropStatus.current.key.set(key);
		dropStatus.current.operation = info.operation;
		dropStatus.current.axis = info.axis;
		dropStatus.current.position = info.position;
		dropStatus.current.parentDirection = info.parentDirection;
		dropStatus.current.tileId = info.tileId;
		dropStatus.current.parentId = info.parentId;
		dropStatus.current.targetRect = info.targetRect;
		dropStatus.current.parentRect = info.parentRect;
		dropStatus.current.indicatorRect = info.indicatorRect;
	};

	const cancelDropStatus = () => {
		dropStatus.current.key.set("");
		dropStatus.current.operation = null;
		dropStatus.current.axis = null;
		dropStatus.current.position = null;
		dropStatus.current.parentDirection = null;
		dropStatus.current.tileId = null;
		dropStatus.current.parentId = null;
		dropStatus.current.targetRect = null;
		dropStatus.current.parentRect = null;
		dropStatus.current.indicatorRect = null;
	};

	const initPointerInfo = e => {
		pointerInfo.current.startX = e.pageX;
		pointerInfo.current.startY = e.pageY;
		pointerInfo.current.x = e.pageX;
		pointerInfo.current.y = e.pageY;
		pointerInfo.current.dx = 0;
		pointerInfo.current.dy = 0;
		dragRect.width.set(0);
		dragRect.height.set(0);
		dragRect.x.set(0);
		dragRect.y.set(0);
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

		// Create a new drag-rect component
		setDragSelection(info);

		// Cache the tile rects
		cacheTileRects();

		// Change event handling modes
		event.set(Events.PressingViewport);
	};

	const cacheTileRects = () => {
		const rects = [];
		const tiles = getTiles();
		tiles.forEach(tile => {
			const el = document.getElementById(tile.id);
			const rect = el.getBoundingClientRect();
			rects.push({ id: tile.id, rect: rect });
		});
		tileRects.current = rects;
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
					tile.selected = undefined;
					save = true;
				}
			}
		});

		if (save) saveState();
	};

	const cancelViewportDrag = e => {
		setDragSelection(null);
	};

	const onTilePointerDown = (e, tile, x, y) => {
		// is there a menu or panel open? close it
		toggleMenu(null, e);
		togglePanel(null, e);

		initPointerInfo(e);
		pointerInfo.current.tileInfo = {};
		pointerInfo.current.tileInfo.id = tile.id;
		pointerInfo.current.tileInfo.parentId = tile.parentId;
		pointerInfo.current.tileInfo.x = x;
		pointerInfo.current.tileInfo.y = y;

		// Change event handling modes
		event.set(Events.PressingTile);

		// Disable hovers
		allowHover.current = false;

		// Check status of SHIFT key
		const shift = keysPressed.current.includes("Shift");

		if (tile.selected) {
			if (shift) {
				// Deselect selected tile if clicked with SHIFT
				tile.selected = undefined;
				saveState();
			}
		} else {
			// Deselect other tiles if no SHIFT
			if (!shift) deselectTiles();
			// Select tile
			selectTile(tile, x, y);
		}

		e.stopPropagation();
	};

	const dragTiles = e => {
		const { dx, dy, tileInfo } = pointerInfo.current;
		moveTile(tileInfo, dx, dy);
	};

	const moveTile = (tileInfo, dx, dy) => {
		//tileInfo.x.set(dx);
		///tileInfo.y.set(dy);
		dragX.set(dx);
		dragY.set(dy);
	};

	const animateTileToPosition = tileInfo => {
		if (animateDragX.current) {
			animateDragX.current.stop();
			animateDragY.current.stop();
		}

		animateDragX.current = animate(dragX, 0, transitions.layoutTransition);
		animateDragY.current = animate(dragY, 0, transitions.layoutTransition);
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
			tile.selected = undefined;
		});
		saveState();
	};

	const isTileSelected = tile => {
		return tile.selected;
	};

	const isTileDraggable = tile => {
		let draggable = tile.selected;
		const parent = findTileById(tile.parentId);
		if (parent) {
			if (parent.selected) {
				draggable = false;
			} else {
				const grandparent = findTileById(parent.parentId);
				if (grandparent) {
					if (grandparent.selected) {
						draggable = false;
					} else {
						const greatgrandparent = findTileById(grandparent.parentId);
						if (greatgrandparent) {
							if (greatgrandparent.selected) {
								draggable = false;
							} else {
								const greatgreatgrandparent = findTileById(greatgrandparent.parentId);
								if (greatgreatgrandparent) {
									if (greatgreatgrandparent.selected) {
										draggable = false;
									} else {
										//const greatgreatgreatgrandparent = findTileById(greatgrandparent.parentId);
									}
								}
							}
						}
					}
				}
			}
		}
		return draggable;
	};

	const isTileRearrangeTarget = tile => {
		let valid = !tile.selected;
		const parent = findTileById(tile.parentId);
		if (parent) {
			if (parent.selected) {
				valid = false;
			} else {
				const grandparent = findTileById(parent.parentId);
				if (grandparent) {
					if (grandparent.selected) {
						valid = false;
					} else {
						const greatgrandparent = findTileById(grandparent.parentId);
						if (greatgrandparent) {
							if (greatgrandparent.selected) {
								valid = false;
							} else {
								const greatgreatgrandparent = findTileById(greatgrandparent.parentId);
								if (greatgreatgrandparent) {
									if (greatgreatgrandparent.selected) {
										valid = false;
									} else {
										//const greatgreatgreatgrandparent = findTileById(greatgrandparent.parentId);
									}
								}
							}
						}
					}
				}
			}
		}
		return valid;
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

	/*
	const [popovers, setPopovers] = React.useState([]);
	const togglePopover = (info, e) => {
		if (!info || (popovers.length > 0 && popovers[0].type === info.type)) {
			hidePopover();
		} else {
			showPopover(info, e);
		}
		// used to cancel parent drag in panel controls
		e.stopPropagation();
	};
	const showPopover = (info, e) => {
		const popover = {
			id: uniqueId(info.id),
			type: info.type,
			title: info.title,
			instruction: info.instruction,
			content: info.content,
			anchorEl: e.target,
		};
		popovers.push(popover);
		setPopovers([...popovers]);
	};
	const hidePopover = () => {
		setPopovers([]);
	};
	*/

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
		};

		setPanel(panel);
	};

	const hidePanel = () => {
		setPanel(null);
		setMenu(null);
	};

	const toggleMenu = (info, e, tile) => {
		if (menu || !info) {
			hideMenu();
		} else {
			showMenu(info, e, tile);
		}
		// used to cancel parent drag in panel controls
		e.stopPropagation();
	};

	const showMenu = (info, e, tile) => {
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
		const parentTile = findTilesByKeyValue("id", tile.parentId)[0];
		const currentIndex = parentTile.tiles.indexOf(tile);
		if (currentIndex + i < 0 || currentIndex + i > parentTile.tiles.length - 1) return;
		parentTile.tiles = moveItemInArrayFromIndexToIndex(parentTile.tiles, currentIndex, currentIndex + i);
		saveState();
		console.log("moveSelectedTileIndex", currentIndex, i, tile, parentTile);
	};

	const isValidDrop = info => {
		//console.log(info);

		if (info.operation === DropOperation.addToContainer) {
			return onReorderDrop(info);
		}

		if (info.operation === DropOperation.createContainer) {
			return createContainerAtOrderWithDirection(info);
		}

		return false;
	};

	const createContainerAtOrderWithDirection = info => {
		addToEditStack();
		console.log("createContainerAtOrderWithDirection", info);

		const hoveredTile = findTileById(info.tileId);
		const hoveredTileParent = findTileById(hoveredTile.parentId);
		const hoveredTileIndex = hoveredTileParent.tiles.indexOf(hoveredTile);

		// create new container data
		const container = makeFlexData(null);
		container.parentId = hoveredTileParent.id;
		//container.layout.width = "hug";
		//container.layout.height = "hug";
		//container.layout.justifyContent = "center";

		// which content direction?
		if (info.axis === DropAxis.main) {
			container.layout.direction = hoveredTileParent.layout.direction === "column" ? "row" : "column";
		}
		if (info.axis === DropAxis.cross) {
			container.layout.direction = hoveredTileParent.layout.direction === "column" ? "column" : "row";
		}

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

		if (info.position === DropPosition.start) {
			container.tiles = [tileB, tileA];
		} else {
			container.tiles = [tileA, tileB];
		}

		// remove hovered tile parent if the only child is also the new container
		if (hoveredTileParent.tiles.length === 1 && hoveredTileParent.tiles[0].id === container.id) {
			// find hovered tile parent-parent
			const hoveredTileParentParent = findTileById(hoveredTileParent.parentId);
			if (hoveredTileParentParent) {
				const hoveredTileParentIndex = hoveredTileParentParent.tiles.indexOf(hoveredTileParent);
				// swap container with hovered tile parent
				hoveredTileParentParent.tiles.splice(hoveredTileParentIndex, 1, container);
				container.parentId = hoveredTileParentParent.id;
				console.log("Removed container");
			}
		}

		// deselect any tiles
		const selectedTiles = findTilesByKeyValue("selected", true);
		selectedTiles.forEach(tile => {
			tile.selected = undefined;
		});
		// select the new group
		container.selected = true;
		// show hud
		setTimeout(() => event.set(Events.ClickedTile), 10);

		saveState();
		return true;
	};

	const onReorderDrop = info => {
		const tile = findTileById(pointerInfo.current.tileInfo.id);
		const parentTile = findTileById(tile.parentId);
		const hoveredTile = findTileById(info.tileId);
		const currentIndex = parentTile.tiles.indexOf(tile);
		let newIndex = info.position;

		addToEditStack();

		if (parentTile.id !== hoveredTile.id) {
			// Drop target is a differnent parent, re-parent the dragging tile
			console.log("RE-PARENT");
			const tile = parentTile.tiles.splice(currentIndex, 1)[0];

			// Add to new parent
			hoveredTile.tiles.splice(newIndex, 0, tile);
			tile.parentId = hoveredTile.id;

			// Remove empty groups
			deleteEmptyContainers(parentTile);
		} else {
			// Reorder within the same parent
			// const newIndex = currentIndex > info.position ? info.position : info.position - 1;

			if (currentIndex < info.position) newIndex = info.position - 1;

			console.log("RE-ORDER", currentIndex, newIndex);

			if (info.axis === DropAxis.cross) {
				parentTile.layout.direction = parentTile.layout.direction === "column" ? "row" : "column";
			}

			if (info.axis === DropAxis.cross && info.position === DropPosition.start) {
				newIndex = 0;
			}

			if (info.axis === DropAxis.cross && info.position === DropPosition.end) {
				newIndex = parentTile.tiles.length - 1;
			}

			parentTile.tiles = moveItemInArrayFromIndexToIndex(parentTile.tiles, currentIndex, newIndex);
		}

		//console.log("onReorderDrop", currentIndex, info.position, tile, parentTile);
		saveState();
		return true;
	};

	const groupSelection = () => {
		const tiles = findTilesByKeyValue("selected", true);

		// Only try to group if selection is at least 2 items
		//if (tiles.length > 1) {
		addToEditStack();

		// console.log("groupSelection");
		// // de-select all the tiles
		// tiles.forEach(tile => {
		// 	tile.selected = undefined;
		// });

		const firstItem = tiles.splice(0, 1)[0];

		// Choose first selected item's parent as the new container destination
		const parent = findTileById(firstItem.parentId);
		const firstTileIndex = parent.tiles.indexOf(firstItem);

		// create new container data
		const container = makeFlexData(null);
		container.layout.direction = parent.layout.direction === "column" ? "row" : "column";
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
		console.log(tiles);
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
			tile.selected = undefined;
		});
		// select the new group
		container.selected = true;

		// show hud !!!!
		setTimeout(() => event.set(Events.ClickedTile), 100);

		saveState();
		//}
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
					//if(!pointerInfo.current.tile.clicked) return false;
					event.set(Events.DraggingTile);
					allowHover.current = false;
				}
				break;
			case Events.DraggingTile:
				//document.body.classList.add("grabbing");
				dragTiles(e);
				break;
			default:
		}
	};

	const onPointerUp = e => {
		// Enable hovers by default
		allowHover.current = true;

		switch (event.get()) {
			case Events.PressingTile:
				event.set(Events.ClickedTile);
				break;
			case Events.DraggingTile:
				//document.body.classList.remove("grabbing");
				// change event to released
				event.set(Events.ReleasedTile);

				// check if valid drop
				if (isValidDrop(dropStatus.current)) {
					dragX.set(0);
					dragY.set(0);
					console.log("onPointerUp", "Events.DraggingTile", "valid DROP");
				} else {
					cancelTileDrag();
				}

				// Clear drop status state
				cancelDropStatus();

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
	};

	React.useEffect(() => {
		document.addEventListener("mousemove", onPointerMove);
		document.addEventListener("touchmove", onPointerMove, { passive: false });
		document.addEventListener("mouseup", onPointerUp);
		document.addEventListener("touchend", onPointerUp);
		return () => {
			document.removeEventListener("mousemove", onPointerMove);
			document.removeEventListener("touchmove", onPointerMove, { passive: false });
			document.removeEventListener("mouseup", onPointerUp);
			document.removeEventListener("touchend", onPointerUp);
		};
	}, [tomeData]);

	return (
		<EditorContext.Provider
			value={{
				panel,
				togglePanel,

				menu,
				toggleMenu,

				//popovers,
				//togglePopover,

				setEditorDebugOption,

				onTilePointerDown,
				pointerInfo,

				deselectTiles,
				isTileSelected,

				deleteSelection,
				duplicateSelection,
				groupSelection,

				undoEdit,

				event,

				moveSelectedTileIndex,

				onViewportPointerDown,
				dragSelection,

				keysPressed,

				dragX,
				dragY,

				isTileDraggable,
				isTileRearrangeTarget,

				dropStatus,
				setDropStatus,
				cancelDropStatus,

				allowHover,

				pageScale,
				dragXScaled,
				dragYScaled,

				toggleMobileView,
				isMobileView,
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

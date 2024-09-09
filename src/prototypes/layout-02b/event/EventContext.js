import React from "react";
import { animate, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { Events, dragThreshold } from "./EventConstants";
import { transitions } from "../ds/Transitions";
import { getBoundingBox } from "../utils/utils";

export const EventContext = React.createContext();
export const EventProvider = ({ children }) => {
	const {
		selectTile,
		deselectTiles,
		deleteSelection,
		duplicateSelection,
		tomeData,
	} = React.useContext(TomeContext);

	const allowHover = useMotionValue(1);
	const hoverMotionValue = useMotionValue("");
	const draggingMotionValue = useMotionValue("");
	const pressingMotionValue = useMotionValue("");

	const pointerInfo = React.useRef({});
	const event = useMotionValue("");

	// Drag-select rectangle metrics
	const dragRect = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
		opacity: useMotionValue(0),
	};

	const animateTileToPosition = tile => {
		animate(tile.x, tile.cachedX, transitions.layoutTransition);
		animate(tile.y, tile.cachedY, transitions.layoutTransition);
		tile.tiles.forEach(t => animateTileToPosition(t));
	};

	const moveTile = (tile, dx, dy) => {
		tile.x.set(tile.cachedX + dx);
		tile.y.set(tile.cachedY + dy);
		tile.tiles.forEach(t => moveTile(t, dx, dy));
	};

	const dragTiles = e => {
		const { dx, dy, tile } = pointerInfo.current;
		moveTile(tile, dx, dy);
	};

	const dragSelectTiles = e => {
		const { startX, startY, dx, dy } = pointerInfo.current;
		const w = Math.abs(dx);
		const h = Math.abs(dy);
		dragRect.x.set(startX);
		dragRect.y.set(startY);
		dragRect.width.set(w);
		dragRect.height.set(h);
		dragRect.opacity.set(1);
		if (dx < 0) dragRect.x.set(startX - w);
		if (dy < 0) dragRect.y.set(startY - h);
	};

	const cancelTileDrag = e => {
		console.log("cancel drag");
		const { tile } = pointerInfo.current;

		//tile.isAnimating = true;
		draggingMotionValue.set("");
		allowHover.set(0);
		animateTileToPosition(tile);

		// Fake animation used as an oncomplete callback
		animate("#fff", "#000", {
			...transitions.layoutTransition.default,
			onComplete: () => {
				tile.isAnimating = false;
				allowHover.set(1);
			},
		});
	};

	/*
	const getBoundingBoxForSelection = sel => {
		const selectedBoxes = [];
		sel.forEach(tile => {
			selectedBoxes.push({
				x: tile.x.get(),
				y: tile.y.get(),
				width: tile.width.get(),
				height: tile.height.get(),
			});
		});
		return getBoundingBox(selectedBoxes);
	};
	*/

	const initPointerInfo = e => {
		pointerInfo.current.startX = e.pageX;
		pointerInfo.current.startY = e.pageY;
		pointerInfo.current.x = e.pageX;
		pointerInfo.current.y = e.pageY;
		pointerInfo.current.dx = 0;
		pointerInfo.current.dy = 0;
	};

	const findTileCenter = e => {
		// Find the distance from the mouse down location to the tile center
		const rect = e.target.getBoundingClientRect();
		const centerX = e.clientX - (rect.x + rect.width / 2);
		const centerY = e.clientY - (rect.y + rect.height / 2);
		pointerInfo.current.centerX = centerX;
		pointerInfo.current.centerY = centerY;
	};

	const cacheTileInfo = tile => {
		pointerInfo.current.tile = tile;
		// Cache the current tile position
		pointerInfo.current.tileX = tile.cachedX;
		pointerInfo.current.tileY = tile.cachedY;
	};

	const updateDelta = e => {
		const { startX, startY } = pointerInfo.current;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
	};

	const onViewportPointerDown = e => {
		console.log("onViewportPointerDown");

		initPointerInfo(e);

		// Change event handling modes
		event.set(Events.PressingViewport);

		// Deselect all tiles
		deselectTiles();

		// Disable hovers
		allowHover.set(0);

		e.stopPropagation();
	};

	const onTileHoverStart = (e, tile) => {
		console.log("onTileHoverStart", tile.id, allowHover.get());
		if (allowHover.get() === 0) return false;
		hoverMotionValue.set(tile.id);
	};

	const onTileHoverEnd = (e, tile) => {
		console.log("onTileHoverEnd", hoverMotionValue.get(), tile.id, allowHover.get());
		if (allowHover.get() === 0) return false;
		if (hoverMotionValue.get() === tile.id) hoverMotionValue.set("");
	};

	const onTilePointerDown = (e, tile) => {
		console.log("onTilePointerDown", tile);

		initPointerInfo(e);
		pointerInfo.current.tile = tile;
		findTileCenter(e);

		// Immediately select on mouse down
		selectTile(tile);

		// Change event handling modes
		event.set(Events.PressingTile);

		// Disable hovers
		allowHover.set(0);
		pressingMotionValue.set(tile.id);

		e.stopPropagation();
	};

	const onPointerMove = e => {
		updateDelta(e);
		const { dx, dy } = pointerInfo.current;
		const dragging = Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold;
		switch (event.get()) {
			case Events.PressingViewport:
				if (dragging) {
					event.set(Events.DraggingViewport);
					allowHover.set(0);
				}
				break;
			case Events.DraggingViewport:
				dragSelectTiles(e);
				break;
			case Events.PressingTile:
				if (dragging) {

					//if(!pointerInfo.current.tile.clicked) return false;

					event.set(Events.DraggingTile);
					allowHover.set(0);
					draggingMotionValue.set(pointerInfo.current.tile.id);
				}
				break;
			case Events.DraggingTile:
				document.body.classList.add("grabbing");
				dragTiles(e);
				break;
			default:
		}
	};

	const onPointerUp = e => {
		// Enable hovers by default
		allowHover.set(1);
		pressingMotionValue.set("");

		switch (event.get()) {
			case Events.PressingTile:
				//pointerInfo.current.tile.clicked = true;
				console.log("clicked")
				break;
			case Events.DraggingTile:
				document.body.classList.remove("grabbing");
				cancelTileDrag();
				break;
			case Events.PressingViewport:
				deselectTiles();
				break;
			case Events.DraggingViewport:
				dragRect.opacity.set(0);
				break;
			default:
		}

		event.set(Events.None);
		pointerInfo.current = {};
	};

	const onKeyDown = e => {
		console.log("Key down:", e.key);
		let stopPropagation = false;

		if (e.key === "Escape") {
			deselectTiles();
			stopPropagation = true;
		}

		if (e.key === "Backspace") {
			// Delete tile
			deleteSelection();
			allowHover.set(0);
			stopPropagation = true;
		}

		if (e.key === "d") {
			if (e.ctrlKey || e.metaKey) {
				// Duplicate tile
				duplicateSelection();
				stopPropagation = true;
			}
		}

		if (stopPropagation) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	React.useEffect(() => {
		document.addEventListener("mousemove", onPointerMove);
		document.addEventListener("touchmove", onPointerMove, { passive: false });
		document.addEventListener("mouseup", onPointerUp);
		document.addEventListener("touchend", onPointerUp);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousemove", onPointerMove);
			document.removeEventListener("touchmove", onPointerMove, { passive: false });
			document.removeEventListener("mouseup", onPointerUp);
			document.removeEventListener("touchend", onPointerUp);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [tomeData]);

	return (
		<EventContext.Provider
			value={{
				dragRect,

				hoverMotionValue,
				draggingMotionValue,
				pressingMotionValue,

				onTileHoverStart,
				onTileHoverEnd,
				onTilePointerDown,

				onViewportPointerDown,
				allowHover,
			}}
		>
			{children}
		</EventContext.Provider>
	);
};

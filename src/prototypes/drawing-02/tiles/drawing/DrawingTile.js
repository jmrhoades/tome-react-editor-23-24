import React, { useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate, AnimatePresence } from "framer-motion";

import { transitions } from "../../ds/Transitions";

/* View hierarchy/stacking order
- 01 Ghost layers
- 02 Canvas (clipped to tile bounds)
- 03 Layers (clipped to tile bounds)
- 04 Properties, menus
- 05 Selection box
*/

import { Canvas } from "./canvas/Canvas";
import { GhostLayer } from "./ghost/GhostLayer";
import { Layer } from "./layers/Layer";
import { SelectionBox } from "./canvas/SelectionBox";
import { Properties } from "./properties/Properties";
import { DrawingTileNull } from "./DrawingTileNull";

import { getBoundingBox, getBoundingBoxScale, focusLayerText, getAngleInRadians, radiansToDegrees } from "./utilities";
import { Guides } from "./canvas/Guides";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const GhostView = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.16;
	pointer-events: none;
`;

const LayerView = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const CenterOrigin = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

function nearestValue(n, v) {
	n = Math.trunc(n / v) * v;
	return n;
}

export const CanvasMode = {
	/**
	 * Default canvas mode
	 */
	None: "None",
	/**
	 * When pointer is pressed
	 */
	PressingCanvas: "PressingCanvas",
	PressingLayer: "PressingLayer",
	/**
	 * When drag-selecting
	 */
	Selecting: "Selecting",
	/**
	 * When  moving layers
	 */
	Translating: "Translating",
	/**
	 * When resizing layers
	 */
	Resizing: "Resizing",
	/**
	 * When rotating layers
	 */
	Rotating: "Rotating",
	/**
	 * When moving a point
	 */
	MovePoint: "MovePoint",
};

export const DrawingTile = props => {
	//
	// TODO
	// REDO THE CENTER ALIGNMENT CONCEPT BY ADDING A CAMERA OBJECT
	// CAMERA ALWAYS CENTERS ITSELF IN THE TILE aka "auto-pan"
	// DERP, YOU'RE GONNA NEED PANNING FOR MOBILE ANYWAYS
	//

	const pageScale = props.pageScale;
	const tileWidth = props.tileWidth;
	const tileHeight = props.tileHeight;
	const gridSize = props.tile.params.gridSize;

	const canvasId = props.tile.id + "_drawing";
	const layers = props.tile.params.layers;

	// Canvas modes
	// Try to keep this the only state change that causes a react rerender
	const [canvasMode, setCanvasMode] = React.useState(CanvasMode.None);

	// Selection state
	// Use a motion value to prevent react renders during multiselect operations
	const selection = useMotionValue("");
	const isSelected = id => {
		return selection
			.get()
			.split(",")
			.find(v => v === id);
	};

	// Properties state
	// Use a motion value to prevent react renders during property changes
	const property = useMotionValue("");
	const layerTextIsFocused = useMotionValue(0);

	// Pointer down position ref, used for finding drag delta
	// TODO RENAME: this has become more a general state canvas state variable
	const pointerDownPosition = React.useRef({});

	// Keyboard shorcuts
	const keysPressed = React.useRef([]);

	// Drag-select rectangle metrics, use motion values to prevent react rerenders when dragging
	const dragRect = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
		opacity: useMotionValue(0),
		cX: useMotionValue(0),
		cY: useMotionValue(0),
	};

	// Bounding box of selected layers
	const bounds = {
		x: useMotionValue(0),
		y: useMotionValue(0),
		width: useMotionValue(0),
		height: useMotionValue(0),
		rotate: useMotionValue(0),
		opacity: useMotionValue(0),
		handleOpacity: useMotionValue(1),
		cachedX: useMotionValue(0),
		cachedY: useMotionValue(0),
		cachedWidth: useMotionValue(0),
		cachedHeight: useMotionValue(0),
		cachedRotation: useMotionValue(0),
	};

	// Snap guides
	const guides = {
		x1: {
			opacity: useMotionValue(0),
			x: useMotionValue(0),
		},
		y1: {
			opacity: useMotionValue(0),
			y: useMotionValue(0),
		},
	};
	props.tile.guides = guides;

	// Listen for editing state changes
	React.useEffect(() => {
		if (!props.tileEditing) {
			deselectLayers();
		}
	}, [props.tileEditing]);

	// Reset object selection when tile loses selection
	React.useEffect(() => {
		if (!props.tileSelected) {
			props.setTileEditing(false);
		}
	}, [props.tileSelected]);

	// Listen for newly added layers
	React.useEffect(() => {
		if (layers && layers.length > 0) {
			const lastShapeAdded = layers[layers.length - 1];
			if (lastShapeAdded.new) {
				bounds.opacity.set(0);
				// Switch into editing mode if it's not already
				if (!props.tileEditing) props.setTileEditing(true);
				// Select new shape
				setTimeout(() => {
					console.log("LAST new shape is selected", lastShapeAdded.id);
					selection.set(lastShapeAdded.id);
					updateBounds();
					lastShapeAdded.new = undefined;
					setTimeout(() => {
						if (lastShapeAdded.layerType === "SHAPE") {
							//focusLayerText(lastShapeAdded, false);
						} else if (lastShapeAdded.layerType === "TEXT") {
							//lastShapeAdded.focusText();
						}
						setTimeout(() => {
							bounds.opacity.set(1);
							property.set(lastShapeAdded.id);
						}, 10);
					}, 10);
				}, 10);
			}
		}
	});

	// Listen for scroll and resize events when tile is selected
	// Dismiss the properties when the window scrolls or is resized
	React.useEffect(() => {
		if (props.tileSelected) {
			const handleScroll = event => {
				property.set("");
			};
			window.addEventListener("scroll", handleScroll);
			window.addEventListener("resize", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
				window.removeEventListener("resize", handleScroll);
			};
		}
	}, [props.tileSelected]);

	// Listen for keyboard events when tile is selected
	// Delete shape supported
	React.useEffect(() => {
		if (props.tileEditing) {
			const handleKeyDown = e => {
				console.log("Drawing tile, key down:", e);
				let doSomething = false;
				if (e.key === "Backspace") {
					doSomething = true;
					const layerIds = selection.get().split(",");
					for (const layerId of layerIds) {
						console.log("Drawing tile, key down:", layerId);
						let indexOfBlock = -1;
						layers.forEach((b, i) => {
							if (b.id === layerId) indexOfBlock = i;
						});
						if (indexOfBlock > -1) {
							// Delete the shape!
							layers.splice(indexOfBlock, 1);

							if (layers.length === 0 && props.tileEditing) {
								props.setTileEditing(false);
							}
						}
					}
					deselectLayers();
					props.saveState();
				}
				if (e.key === "Shift") {
					doSomething = true;
					keysPressed.current = ["shift"];
				}
				if (e.key === "Alt") {
					doSomething = true;
					//keysPressed.current.push(e.key);
				}
				if (e.key === "CapsLock") {
					doSomething = true;
					//keysPressed.current.push(e.key);
				}
				if (e.key === "Tab") {
					doSomething = true;
					//keysPressed.current.push(e.key);
				}
				if (e.key === "]") {
					reorderSelection("bringToFront");
					doSomething = true;
				}
				if (e.key === "[") {
					reorderSelection("sendToBack");
					doSomething = true;
				}
				if (e.key === "ArrowLeft") {
					doSomething = true;
				}
				if (e.key === "ArrowRight") {
					doSomething = true;
				}
				if (e.key === "ArrowUp") {
					doSomething = true;
				}
				if (e.key === "ArrowDown") {
					doSomething = true;
				}
				if (e.key === "Escape") {
					doSomething = true;
					if (selection.get() !== "") {
						deselectLayers();
					} else {
						if (props.tileEditing) {
							props.setTileEditing(false);
						}
					}
				}
				if (e.key === "a") {
					if (e.ctrlKey || e.metaKey) {
						// Select all layers
						selection.set("");
						layers.forEach(l => {
							if (selection.get() === "") {
								selection.set(l.id);
							} else {
								selection.set(selection.get() + "," + l.id);
							}
						});
						updateBounds();
						bounds.opacity.set(1);
						property.set(selection.get());
						doSomething = true;
					}
				}

				if (!doSomething && !e.ctrlKey && !e.metaKey) {
					// focus the layer text so that typing goes there
					const layerIds = selection.get().split(",");
					console.log(layerIds);
					if (layerIds.length === 1 && layerIds[0] !== "") {
						const layer = layers.find(({ id }) => id === layerIds[0]);
						if (e.key !== "Enter") {
							layer.params.text.content += e.key;
							layer.motion.text.content.set(layer.params.text.content);
						}
						if (layer.layerType === "SHAPE") {
							focusLayerText(layer, e);
						} else if (layer.layerType === "TEXT") {
							layer.focusAndAppend(e);
						}
						e.preventDefault();
						e.stopPropagation();
					}
				}
				if (doSomething) {
					e.preventDefault();
					e.stopPropagation();
				}
			};
			const handleKeyUp = e => {
				// console.log("Drawing tile, key up:", e);
				if (e.key === "Shift") {
					const index = keysPressed.current.indexOf("shift");
					if (index !== -1) keysPressed.current.splice(index);
					console.log(index, keysPressed.current);
				}
				e.preventDefault();
				e.stopPropagation();
			};
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("keyup", handleKeyUp);
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
				document.removeEventListener("keyup", handleKeyUp);
			};
		}
	}, [props.tileEditing, layers]);

	const reorderSelection = (direction = "bringToFront") => {
		const selectedLayers = [];
		let newOrder = layers;
		const ids = selection.get().split(",");
		console.log(ids, layers);
		ids.forEach(layerId => {
			const layer = layers.find(({ id }) => id === layerId);
			if (layer) {
				console.log(layer);
				selectedLayers.push(layers.splice(layers.indexOf(layer), 1)[0]);
			}
		});
		if (direction === "bringToFront") {
			console.log(selectedLayers);
			newOrder = [...layers, ...selectedLayers];
		}
		if (direction === "sendToBack") {
			console.log(selectedLayers);
			newOrder = [...selectedLayers, ...layers];
		}
		props.tile.params.layers = newOrder;
		props.saveState();
	};

	const resetDragRect = () => {
		dragRect.x.set(0);
		dragRect.y.set(0);
		dragRect.width.set(0);
		dragRect.height.set(0);
		dragRect.opacity.set(0);
	};

	const updateBounds = () => {
		const box = getBoundingBoxForSelection();
		pointerDownPosition.current.box = box;
		bounds.x.set(box.x);
		bounds.y.set(box.y);
		bounds.width.set(box.width);
		bounds.height.set(box.height);
		//console.log("updateBounds", box.height.get());
	};

	const getBoundingBoxForSelection = () => {
		const selectedBoxes = [];
		selection
			.get()
			.split(",")
			.forEach(layerId => {
				const layer = layers.find(({ id }) => id === layerId);
				if (layer) {
					let layerBox = {
						x: layer.motion.bX.get(),
						y: layer.motion.bY.get(),
						width: layer.motion.bW.get(),
						height: layer.motion.bH.get(),
						rotation: layer.motion.r.get(),
					};
					selectedBoxes.push(layerBox);
				}
			});
		return getBoundingBox(selectedBoxes);
	};

	const cacheSelectionBox = () => {
		bounds.cachedX.set(bounds.x.get());
		bounds.cachedY.set(bounds.y.get());
		bounds.cachedWidth.set(bounds.width.get());
		bounds.cachedHeight.set(bounds.height.get());
		bounds.cachedRotation.set(bounds.rotate.get());
		const selectionEl = document.getElementById("drawing_tile_selection_box");
		if (selectionEl) pointerDownPosition.current.selectRect = selectionEl.getBoundingClientRect();
	};

	const cacheSelectedLayers = () => {
		// Layers
		selection
			.get()
			.split(",")
			.forEach(layerId => {
				const layer = layers.find(({ id }) => id === layerId);
				if (layer) {
					layer.params.cachedX = layer.motion.bX.get();
					layer.params.cachedY = layer.motion.bY.get();
					layer.params.cachedWidth = layer.motion.bW.get();
					layer.params.cachedHeight = layer.motion.bH.get();
					layer.params.cachedRotation = layer.motion.r.get();
					layer.params.cachedTextSize = layer.motion.text.size.get();
					layer.params.cachedX1 = layer.motion.x1.get();
					layer.params.cachedY1 = layer.motion.y1.get();
					layer.params.cachedX2 = layer.motion.x2.get();
					layer.params.cachedY2 = layer.motion.y2.get();
				}
				if (layer.layerType === "PICTOGRAM") {
					layer.params.cachedItemSize = layer.motion.bItemSize.get();
					layer.params.cachedItemSpacing = layer.motion.bItemSpacing.get();

					// what is the current of items across?
					layer.params.cachedColumnCount = Math.round(
						layer.params.cachedWidth / (layer.motion.bItemSize.get() + layer.motion.bItemSpacing.get())
					);
				}
			});
	};

	const r2D = 180 / Math.PI;
	const rotateLayers = e => {
		const { x, y } = pointerDownPosition.current;

		const selectRect = pointerDownPosition.current.selectRect;
		const rectCenterX = selectRect.x + selectRect.width / 2;
		const rectCenterY = selectRect.y + selectRect.height / 2;

		const sx = x - rectCenterX;
		const sy = y - rectCenterY;
		const dx = e.pageX - rectCenterX;
		const dy = e.pageY - rectCenterY;

		const startDegree = r2D * Math.atan2(sy, sx);
		const currentDegree = r2D * Math.atan2(dy, dx);
		const rotate = currentDegree - startDegree;
		bounds.rotate.set(bounds.cachedRotation.get() + rotate);

		console.log("rotateLayers", rotate);
	};

	const resizeLayers = e => {
		// Temporarily hide the selection box handles when resizing
		bounds.handleOpacity.set(0);
		// Hide properties when moving
		property.set("");
		//
		const side = pointerDownPosition.current.side;
		const { x, y } = pointerDownPosition.current;
		const dx = e.pageX - x;
		const dy = e.pageY - y;
		const cW = bounds.cachedWidth.get();
		const cH = bounds.cachedHeight.get();
		const cX = bounds.cachedX.get();
		const cY = bounds.cachedY.get();

		//const useAspectRatio = keysPressed.current.includes("shift");
		const corner = side === "nw" || side === "ne" || side === "se" || side === "sw";
		let useAspectRatio = side === "nw" || side === "ne" || side === "se" || side === "sw";

		// Find new bounding box width and height
		let boxW = cW + dx;
		let boxH = cH + dy;
		const aspectRatioShort = cH / cW;
		const aspectRatioLong = cW / cH;
		if (useAspectRatio) boxH = boxW * aspectRatioShort;

		// What's the percent change in size relative to pointer down position?
		let pW = boxW / cW - 1;
		let pH = boxH / cH - 1;

		//console.log(pW);

		// Update layers
		selection
			.get()
			.split(",")
			.forEach(layerId => {
				const layer = layers.find(({ id }) => id === layerId);
				if (layer) {
					const oldX = layer.params.cachedX;
					const oldY = layer.params.cachedY;
					const oldWidth = layer.params.cachedWidth;
					const oldHeight = layer.params.cachedHeight;

					let newX = layer.params.cachedX;
					let newY = layer.params.cachedY;
					let newWidth = layer.params.cachedWidth;
					let newHeight = layer.params.cachedHeight;

					const relX = layer.params.cachedX - cX; // relative to box x
					const perX = relX / cW; // percent x of box width
					const relY = layer.params.cachedY - cY; // relative to box y
					const perY = relY / cH; // percent y of box height

					switch (side) {
						case "top":
							newY = cY + dy + (cH + dy * -1) * perY;
							newHeight = newHeight + newHeight * -pH;
							if (layer.layerType === "PROGRESS_RING") {
								boxW = boxH * aspectRatioLong;
								pW = boxW / cW - 1;
								newWidth = newWidth + newWidth * -pW;
								newX += (oldWidth - newWidth) / 2;
							}
							break;
						case "bottom":
							newY = newY + relY * pH;
							newHeight = newHeight + newHeight * pH;
							if (layer.layerType === "PROGRESS_RING") {
								boxW = boxH * aspectRatioLong;
								pW = boxW / cW - 1;
								newWidth = newWidth + newWidth * pW;
								newX += (oldWidth - newWidth) / 2;
							}
							break;
						case "right":
							newX = newX + relX * pW;
							newWidth = newWidth + newWidth * pW;
							if (layer.layerType === "PROGRESS_RING") {
								boxH = boxW * aspectRatioShort;
								pH = boxH / cH - 1;
								newHeight = newHeight + newHeight * pH;
								newY += (oldHeight - newHeight) / 2;
							}
							break;
						case "left":
							newX = cX + dx + (cW + dx * -1) * perX;
							newWidth = newWidth + newWidth * -pW;
							if (layer.layerType === "PROGRESS_RING") {
								boxH = boxW * aspectRatioShort;
								pH = boxH / cH - 1;
								newHeight = newHeight + newHeight * -pH;
								newY += (oldHeight - newHeight) / 2;
							}
							break;
						case "se":
							newWidth = newWidth + newWidth * pW;
							newHeight = newHeight + newHeight * pH;
							newX = newX + relX * pW;
							newY = newY + relY * pH;
							break;
						case "ne":
							newWidth = newWidth + newWidth * pW;
							if (useAspectRatio) {
								newHeight = newHeight + newHeight * pH;
								newX = oldX;
								newY = oldY - (newHeight - oldHeight);
							} else {
								newHeight = newHeight + newHeight * -pH;
								newX = newX + relX * pW;
								newY = cY + dy + (cH + dy * -1) * perY;
							}
							break;
						case "nw":
							newWidth = newWidth + newWidth * -pW;
							newHeight = newHeight + newHeight * -pH;
							if (useAspectRatio) {
								newX = oldX - (newWidth - oldWidth);
								newY = oldY - (newHeight - oldHeight);
							} else {
								newX = cX + dx + (cW + dx * -1) * perX;
								newY = cY + dy + (cH + dy * -1) * perY;
							}
							break;
						case "sw":
							if (useAspectRatio) {
								newWidth = newWidth + newWidth * -pW;
								newHeight = newHeight + newHeight * -pH;
								newX = oldX - (newWidth - oldWidth);
								newY = oldY;
							} else {
								newWidth = newWidth + newWidth * -pW;
								newHeight = newHeight + newHeight * pH;
								newX = cX + dx + (cW + dx * -1) * perX;
								newY = newY + relY * pH;
							}

							break;
						default:
					}

					// Handle negative sizes
					if (newWidth < 0) {
						newX += newWidth;
						newWidth = Math.abs(newWidth);
					}
					if (newHeight < 0) {
						newY += newHeight;
						newHeight = Math.abs(newHeight);
					}

					// Current scale
					const scale = zoom.get() * pageScale.get();
					newX = newX / scale;
					newY = newY / scale;
					newWidth = newWidth / scale;
					newHeight = newHeight / scale;

					if (layer.layerType === "TEXT") {
						// Update width
						layer.motion.w.set(newWidth);
						if (corner) {
							// find percent changed and apply to font-size
							const cornerPW = side === "sw" || side === "nw" ? -pW : pW;
							const newTexSize = layer.params.cachedTextSize + cornerPW * layer.params.cachedTextSize;
							layer.params.text.size = newTexSize;
							layer.motion.text.size.set(layer.params.text.size);
							// new width should be new text size + margins
							// measure and set
							if (side === "sw" || side === "nw") layer.motion.x.set(newX);
							if (side === "nw" || side === "ne") {
								layer.motion.x.set(newX);
								// Re-measure box height now that the font size has changed
								newY = oldY - (layer.motion.bH.get() - oldHeight);
								layer.motion.y.set(newY / scale);
							}
							layer.updateLayerSize();
						} else {
							if (side === "left") layer.motion.x.set(newX);
							// Set text div width from "auto" to constant
							layer.motion.text.width.set(newWidth);
							// Update text layer height	based on new width
							layer.updateHeight();
						}
					} else if (layer.layerType === "PROGRESS_RING") {
						// Update width
						layer.motion.w.set(newWidth);
						layer.motion.h.set(newHeight);

						// Update x & y
						layer.motion.x.set(newX);
						layer.motion.y.set(newY);

						// find percent changed and apply to font-size
						const cornerPW = side === "sw" || side === "nw" || side === "left" || side === "top" ? -pW : pW;
						const newTexSize = layer.params.cachedTextSize + cornerPW * layer.params.cachedTextSize;
						layer.params.text.size = newTexSize;
						layer.motion.text.size.set(layer.params.text.size);
					} else if (layer.layerType === "PICTOGRAM") {
						// Update width
						if (corner) {
							// what is the interval?
							console.log(layer.params.cachedColumnCount);

							const cornerPW = side === "sw" || side === "nw" ? -pW : pW;
							const newSize = layer.params.cachedItemSize + cornerPW * layer.params.cachedItemSize;
							const newSpacing = layer.params.cachedItemSpacing + cornerPW * layer.params.cachedItemSpacing;
							layer.params.meta.itemSpacing = newSpacing;
							layer.motion.meta.itemSpacing.set(layer.params.meta.itemSpacing);
							layer.params.meta.itemSize = newSize;
							layer.motion.meta.itemSize.set(layer.params.meta.itemSize);
							layer.updateSize();

							if (layer.motion.text.width.get() !== "auto") {
								newWidth =
									layer.params.cachedColumnCount * newSize + (layer.params.cachedColumnCount - 1) * newSpacing;
								layer.motion.w.set(newWidth);
								layer.motion.text.width.set(newWidth);
							}

							if (side === "sw" || side === "nw") layer.motion.x.set(newX);
							if (side === "nw" || side === "ne") {
								layer.motion.x.set(newX);
								newY = oldY - (layer.motion.bH.get() - oldHeight);
								layer.motion.y.set(newY / scale);
							}
						} else {
							//if (side === "left") layer.motion.x.set(newX);
							// Set text div width from "auto" to constant
							//layer.motion.text.width.set(newWidth);
							//layer.updateSize();

							//try snapping?
							const interval = Math.round(dx / layer.motion.bItemSize.get());
							const offset = interval * (layer.motion.bItemSize.get() + layer.motion.bItemSpacing.get());

							newWidth = Math.ceil(layer.params.cachedWidth + offset);
							layer.motion.text.width.set(newWidth);
							layer.motion.w.set(newWidth);
							layer.updateSize();

							console.log(interval, offset);
						}
					} else if (layer.layerType === "SHAPE" || layer.layerType === "IMAGE") {
						// Update width and height
						layer.motion.w.set(newWidth);
						layer.motion.h.set(newHeight);

						// Update x & y
						layer.motion.x.set(newX);
						layer.motion.y.set(newY);
					}
					// Update tome data
					layer.params.width = layer.motion.w.get();
					layer.params.height = layer.motion.h.get();
					layer.params.x = layer.motion.x.get();
					layer.params.y = layer.motion.y.get();
					//console.log(layer.params.x, layer.params.y, layer.params.width, layer.params.height);
				}
			});

		updateBounds();
	};

	const makeStraightHorizontal = (angle, threshold) => {
		console.log(angle, threshold);
		return (
			(angle <= threshold && angle >= -threshold) ||
			(angle >= -180 && angle <= -180 + threshold) ||
			(angle <= 180 && angle >= 180 - threshold)
		);
	};

	const makeStraightVertical = (angle, threshold) => {
		return (
			(angle >= -90 - threshold && angle <= -90 + threshold) || (angle >= 90 - threshold && angle <= 90 + threshold)
		);
	};

	const movePoint = e => {
		// TEMP HACK FOR CLICK-ADD PANEL BEHAVIOR
		props.tile.clickAddCount = 0;
		// Temporarily hide the selection box when moving
		bounds.opacity.set(0);
		// Hide properties when moving
		property.set("");
		// Find change in movement
		const { x, y } = pointerDownPosition.current;
		let dx = e.pageX - x;
		let dy = e.pageY - y;
		// Get vars
		const layer = pointerDownPosition.current.layer;
		const point = pointerDownPosition.current.point;
		const scale = zoom.get() * pageScale.get();
		const { x1, x2, y1, y2 } = layer.motion;
		const threshold = 3;
		// Detect modifier keys
		if (keysPressed.current[0] === "shift") {
			// which delta is bigger? only update that one
			if (Math.abs(dx) > Math.abs(dy)) {
				dy = 0;
			} else {
				dx = 0;
			}
		}
		if (point === "POINT_B") {
			let newX = layer.params.cachedX2 + dx;
			let newY = layer.params.cachedY2 + dy;
			const angle = getAngleInRadians(x1.get(), newX, y1.get(), newY);
			const angleInDegrees = radiansToDegrees(angle);
			// Snap to square angles
			if (makeStraightHorizontal(angleInDegrees, threshold)) newY = y1.get();
			if (makeStraightVertical(angleInDegrees, threshold)) newX = x1.get();
			// Grid snapping
			if (props.tile.params.snap) newX = nearestValue(newX, gridSize * zoom.get());
			if (props.tile.params.snap) newY = nearestValue(newY, gridSize * zoom.get());
			// Update point
			layer.motion.line.x2.set(newX / scale);
			layer.motion.line.y2.set(newY / scale);
			// Update tome data object
			layer.params.line.x2 = layer.motion.line.x2.get();
			layer.params.line.y2 = layer.motion.line.y2.get();
		}
		if (point === "POINT_A") {
			let newX = layer.params.cachedX1 + dx;
			let newY = layer.params.cachedY1 + dy;
			let angle = getAngleInRadians(newX, x2.get(), newY, y2.get());
			const angleInDegrees = radiansToDegrees(angle);
			// Snap to square angles
			if (makeStraightHorizontal(angleInDegrees, threshold)) newY = y2.get();
			if (makeStraightVertical(angleInDegrees, threshold)) newX = x2.get();
			// Grid snapping
			if (props.tile.params.snap) newX = nearestValue(newX, gridSize * zoom.get());
			if (props.tile.params.snap) newY = nearestValue(newY, gridSize * zoom.get());
			// Update point
			layer.motion.line.x1.set(newX / scale);
			layer.motion.line.y1.set(newY / scale);
			// Update tome data object
			layer.params.line.x1 = layer.motion.line.x1.get();
			layer.params.line.y1 = layer.motion.line.y1.get();
		}
		console.log("movePoint", dx, dy, layer.id, point);
	};

	const moveLayers = e => {
		// TEMP HACK FOR CLICK-ADD PANEL BEHAVIOR
		props.tile.clickAddCount = 0;
		// Temporarily hide the selection box when moving
		bounds.opacity.set(0);
		// Hide properties when moving
		property.set("");
		// Find change in movement
		const { x, y } = pointerDownPosition.current;
		let dx = e.pageX - x;
		let dy = e.pageY - y;
		// Current scale
		const scale = zoom.get() * pageScale.get();
		// Shift-move
		if (keysPressed.current[0] === "shift") {
			// which delta is bigger? only update that one
			if (Math.abs(dx) > Math.abs(dy)) {
				dy = 0;
			} else {
				dx = 0;
			}
		}
		let newBoxX = bounds.cachedX.get() + dx;
		let newBoxY = bounds.cachedY.get() + dy;

		// Grid snapping
		if (props.tile.params.snap) {
			newBoxX = nearestValue(newBoxX, gridSize * zoom.get());
			newBoxY = nearestValue(newBoxY, gridSize * zoom.get());
			dx = newBoxX - bounds.cachedX.get();
			dy = newBoxY - bounds.cachedY.get();
		}

		// Layout guide snapping
		guides.hide();
		const xSnap = guides.checkX(newBoxX);
		const ySnap = guides.checkY(newBoxY);
		if (xSnap !== false) dx = xSnap;
		if (ySnap !== false) dy = ySnap;

		// Update bounds position
		bounds.x.set(newBoxX);
		bounds.y.set(newBoxY);

		// Update layer positions
		selection
			.get()
			.split(",")
			.forEach(layerId => {
				const layer = layers.find(({ id }) => id === layerId);
				if (layer) {
					const newX = layer.params.cachedX + dx;
					const newY = layer.params.cachedY + dy;

					// Set unscaled motion values
					layer.motion.x.set(newX / scale);
					layer.motion.y.set(newY / scale);

					// Update tome data object
					layer.params.x = layer.motion.x.get();
					layer.params.y = layer.motion.y.get();
				}
			});
	};

	const selectLayers = e => {
		// Find selection rect
		const x = pointerDownPosition.current.tileRelativeX;
		const y = pointerDownPosition.current.tileRelativeY - window.scrollY;
		const dx = e.pageX - pointerDownPosition.current.x;
		const dy = e.pageY - pointerDownPosition.current.y;
		const w = Math.abs(dx);
		const h = Math.abs(dy);

		// Update onscreen rect
		dragRect.x.set(x);
		dragRect.y.set(y);
		dragRect.width.set(w);
		dragRect.height.set(h);
		dragRect.opacity.set(1);
		if (dx < 0) dragRect.x.set(x - w);
		if (dy < 0) dragRect.y.set(y - h);
		dragRect.cX.set(dragRect.x.get() - tileWidth / 2); // compensate for 0,0 tile-center alignment, todo: handle with "camera" object, duh
		dragRect.cY.set(dragRect.y.get() - tileHeight / 2); // compensate for 0,0 tile-center alignment, todo: handle with "camera" object, duh
		deselectLayers(); // clear out current selection before finding new selection
		
		for (const layer of layers) {
			const { bX, bY, bW, bH } = layer.motion;
			const x = bX.get();
			const y = bY.get();
			const width = bW.get();
			const height = bH.get();
			const rect = {
				x: dragRect.cX.get(),
				y: dragRect.cY.get(),
				width: dragRect.width.get(),
				height: dragRect.height.get(),
			};
			if (rect.x + rect.width > x && rect.x < x + width && rect.y + rect.height > y && rect.y < y + height) {
				if (selection.get() === "") {
					selection.set(layer.id);
				} else {
					selection.set(selection.get() + "," + layer.id);
				}
				updateBounds();
				//console.log("HIT!", layer.id, pointerDownPosition.current.box);
			}
		}
		if (selection.get() !== "") bounds.opacity.set(1);
	};

	const alignLayers = direction => {
		console.log("alignLayers", direction);
		const layerIds = selection.get().split(",");
		layerIds.forEach((id, i) => {
			const layer = layers.find(b => b.id === id);
			switch (direction) {
				case "left":
					//animate(layer.motion.bX, bounds.x.get());
					layer.motion.bX.set(bounds.x.get());
					// Update tome data object
					layer.params.x = layer.motion.bX.get() / (zoom.get() * pageScale.get());
					break;
				case "center":
					layer.motion.bX.set(bounds.x.get() + bounds.width.get() / 2 - layer.motion.bW.get() / 2);
					// Update tome data object
					layer.params.x = layer.motion.bX.get() / (zoom.get() * pageScale.get());
					break;
				case "right":
					layer.motion.bX.set(bounds.x.get() + bounds.width.get() - layer.motion.bW.get());
					// Update tome data object
					layer.params.x = layer.motion.bX.get() / (zoom.get() * pageScale.get());
					break;
				case "top":
					//animate(layer.motion.bX, bounds.x.get());
					layer.motion.bY.set(bounds.y.get());
					// Update tome data object
					layer.params.y = layer.motion.bY.get() / (zoom.get() * pageScale.get());
					break;
				case "middle":
					layer.motion.bY.set(bounds.y.get() + bounds.height.get() / 2 - layer.motion.bH.get() / 2);
					// Update tome data object
					layer.params.y = layer.motion.bY.get() / (zoom.get() * pageScale.get());
					break;
				case "bottom":
					layer.motion.bY.set(bounds.y.get() + bounds.height.get() - layer.motion.bH.get());
					// Update tome data object
					layer.params.y = layer.motion.bY.get() / (zoom.get() * pageScale.get());
					break;

				default:
					break;
			}
		});

		updateBounds();
	};

	const distributeLayers = direction => {
		//console.log("distributeLayers", direction);
		const layerIds = selection.get().split(",");
		const selectedLayers = [];
		layerIds.forEach((id, i) => {
			const layer = layers.find(b => b.id === id);
			selectedLayers.push(layer);
		});
		if (selectedLayers.length < 3) return false;
		switch (direction) {
			case "horizontal":
				selectedLayers.sort((a, b) => a.params.x - b.params.x);
				const x1 = selectedLayers[0].motion.bX.get() + selectedLayers[0].motion.bW.get() / 2;
				const x2 =
					selectedLayers[selectedLayers.length - 1].motion.bX.get() +
					selectedLayers[selectedLayers.length - 1].motion.bW.get() / 2;
				const xIncrement = (x2 - x1) / (selectedLayers.length - 1);
				for (let i = 1; i < selectedLayers.length; i++) {
					const startX = x1;
					if (i > 0 && i < selectedLayers.length - 1) {
						// update x
						const newX = startX + xIncrement * i;
						const l = selectedLayers[i];
						l.motion.bX.set(newX - l.motion.bW.get() / 2);
						l.params.x = l.motion.bX.get() / (zoom.get() * pageScale.get());
					}
				}
				break;
			case "vertical":
				selectedLayers.sort((a, b) => a.params.y - b.params.y);
				const y1 = selectedLayers[0].motion.bY.get() + selectedLayers[0].motion.bH.get() / 2;
				const y2 =
					selectedLayers[selectedLayers.length - 1].motion.bY.get() +
					selectedLayers[selectedLayers.length - 1].motion.bH.get() / 2;
				const yIncrement = (y2 - y1) / (selectedLayers.length - 1);
				for (let i = 1; i < selectedLayers.length; i++) {
					const startY = y1;
					if (i > 0 && i < selectedLayers.length - 1) {
						// update y
						const newY = startY + yIncrement * i;
						const l = selectedLayers[i];
						l.motion.bY.set(newY - l.motion.bH.get() / 2);
						l.params.y = l.motion.bY.get() / (zoom.get() * pageScale.get());
					}
				}
				break;
			default:
				break;
		}
	};

	const onCanvasPointerDown = e => {
		console.log("onCanvasPointerDown");

		const tileRect = e.target.getBoundingClientRect();
		const { x: offsetX, y: offsetY } = tileRect;
		pointerDownPosition.current.x = e.pageX;
		pointerDownPosition.current.y = e.pageY;
		pointerDownPosition.current.tileRelativeX = e.pageX - offsetX;
		pointerDownPosition.current.tileRelativeY = e.pageY - offsetY;
		resetDragRect();

		//if (!props.tileEditing) return false;

		// De-select layers if already editing and something's selected
		if (selection.get() !== "") {
			// Test if the pointer is down inside the selection box
			// Allow dragging the bounding box if it is
			let insideSelectionRect = false;
			const selectionEl = document.getElementById("drawing_tile_selection_box");
			if (selectionEl) {
				const selectionRect = selectionEl.getBoundingClientRect();
				console.log(selectionRect, e.pageX, e.pageY);
				if (
					e.pageX >= selectionRect.left &&
					e.pageX <= selectionRect.right &&
					e.pageY >= selectionRect.top &&
					e.pageY <= selectionRect.bottom
				) {
					insideSelectionRect = true;
				}
			}
			if (insideSelectionRect) {
				updateBounds();
				cacheSelectionBox();
				cacheSelectedLayers();
				pointerDownPosition.current.x = e.pageX;
				pointerDownPosition.current.y = e.pageY;
				pointerDownPosition.current.insideSelection = true;
			} else {
				deselectLayers();
				// Capture this so that we can do the right thing on pointer up:
				// either toggle the editing state or do nothing, see onCanvasClick
				pointerDownPosition.current.didDeselectLayers = true;
			}
		}
		// Update canvas state
		setCanvasMode(CanvasMode.PressingCanvas);
		// Stop pointer event propagation
		//e.preventDefault();
		//e.stopPropagation();
	};

	const onLayerPointerDown = (e, layerId) => {
		console.log("onLayerPointerDown", layerId, selection.get(), keysPressed.current);
		pointerDownPosition.current.x = e.pageX;
		pointerDownPosition.current.y = e.pageY;
		pointerDownPosition.current.layerId = layerId;
		pointerDownPosition.current.layer = layers.find(({ id }) => id === layerId);

		if (keysPressed.current.includes("shift") && selection.get() !== "" && selection.get().split(",").length !== 0) {
			if (!isSelected(layerId)) {
				// Add to current selection
				// console.log("Add to selection", layerId, selection.get() )
				selection.set(selection.get() + "," + layerId);
				property.set("");
			} else {
				// Remove from current selection
				// console.log("Deselect", layerId, selection.get() )
				const layerIds = selection.get().split(",");
				const index = layerIds.indexOf(layerId);
				layerIds.splice(index, 1);
				property.set("");
				selection.set(layerIds.toString());
			}
			// Show updated bounds
			bounds.opacity.set(1);
		} else {
			// Select the layer if it's not already selected
			if (!isSelected(layerId)) {
				//console.log("Single selection", layerId, selection.get() )
				// Always hide selection box on pointer down of unselected layers
				bounds.opacity.set(0);
				property.set("");
				selection.set(layerId);
			}
		}

		// Cache all the currently selected layers positions for translate operations
		updateBounds();
		cacheSelectionBox();
		cacheSelectedLayers();

		// Switch into editing mode if it's not already
		if (!props.tileEditing) props.setTileEditing(true);
		// Update canvas state
		setCanvasMode(CanvasMode.PressingLayer);
		// Stop pointer event propagation
		e.stopPropagation();
	};

	const onMovePointPointerDown = (e, point) => {
		console.log("onMovePointPointerDown", point);
		pointerDownPosition.current.x = e.pageX;
		pointerDownPosition.current.y = e.pageY;
		pointerDownPosition.current.point = point;
		pointerDownPosition.current.layer = layers.find(({ id }) => id === selection.get());

		cacheSelectionBox();
		cacheSelectedLayers();

		// Update canvas state
		setCanvasMode(CanvasMode.MovePoint);

		// Update cursor
		document.body.classList.add("move");

		// Stop pointer event propagation
		e.stopPropagation();
	};

	const onRotateHandlePointerDown = (e, corner, cursor = "ne-rotate") => {
		console.log("onRotateHandlePointerDown", corner);
		pointerDownPosition.current.x = e.pageX;
		pointerDownPosition.current.y = e.pageY;
		pointerDownPosition.current.corner = corner;
		cacheSelectionBox();
		cacheSelectedLayers();

		// Update canvas state
		setCanvasMode(CanvasMode.Rotating);

		// Update cursor
		document.body.classList.add(cursor);

		// Stop pointer event propagation
		e.stopPropagation();
	};

	const onResizeHandlePointerDown = (e, side, cursor = "ns-cursor") => {
		console.log("onResizeHandlePointerDown", side);
		pointerDownPosition.current.x = e.pageX;
		pointerDownPosition.current.y = e.pageY;
		pointerDownPosition.current.side = side;
		cacheSelectionBox();
		cacheSelectedLayers();

		// Update canvas state
		setCanvasMode(CanvasMode.Resizing);

		// Update cursor
		document.body.classList.add(cursor);

		// Stop pointer event propagation
		e.stopPropagation();
	};

	const onPointerMove = e => {
		//console.log("onPointerMove", canvasMode);
		props.userDragging.set(true);

		// Find delta between pointer down position and current pointer position
		// Do not switch state until dragging threshold has been met
		const { x, y } = pointerDownPosition.current;
		pointerDownPosition.current.lastX = e.pageX;
		pointerDownPosition.current.lastY = e.pageY;
		const dx = Math.abs(e.pageX - x);
		const dy = Math.abs(e.pageY - y);
		const threshold = 1;
		const dragging = dx > threshold || dy > threshold;
		switch (canvasMode) {
			case CanvasMode.PressingLayer:
				if (dragging) {
					setCanvasMode(CanvasMode.Translating);
					// Update cursor
					document.body.classList.add("default");
				}
				break;
			case CanvasMode.PressingCanvas:
				if (dragging && props.tileEditing) {
					if (pointerDownPosition.current.insideSelection) {
						setCanvasMode(CanvasMode.Translating);
					} else {
						setCanvasMode(CanvasMode.Selecting);
					}
				}
				if (dragging) pointerDownPosition.current.didMove = true;
				break;
			case CanvasMode.Translating:
				moveLayers(e);
				break;
			case CanvasMode.Selecting:
				selectLayers(e);
				break;
			case CanvasMode.Resizing:
				resizeLayers(e);
				break;
			case CanvasMode.Rotating:
				rotateLayers(e);
				break;
			case CanvasMode.MovePoint:
				movePoint(e);
				break;
			default:
		}

		//e.preventDefault();
		e.stopPropagation();
	};

	const onPointerUp = e => {
		console.log("onPointerUp", canvasMode);
		props.userDragging.set(false);
		switch (canvasMode) {
			case CanvasMode.PressingCanvas:
				onCanvasClick();
				break;
			case CanvasMode.PressingLayer:
				onLayerClick(e);
				break;
			case CanvasMode.Selecting:
				// Show properties after drag select
				property.set(selection.get());
				break;
			case CanvasMode.Translating:
				// Hide guides
				guides.hide();
				// Restore the selection box after moving
				setTimeout(()=>bounds.opacity.set(1), 10);
				// Show properties  after moving
				property.set(selection.get());
				break;
			case CanvasMode.MovePoint:
				// Update line box
				pointerDownPosition.current.layer.updateBox();
				updateBounds();
				// Restore the selection box after moving
				setTimeout(()=>bounds.opacity.set(1), 10);
				// Show properties  after moving
				property.set(selection.get());
				break;
			case CanvasMode.Resizing:
				// Restore the selection box after resizing
				bounds.handleOpacity.set(1);
				// Show properties after resizing
				property.set(selection.get());
				break;
			default:
		}
		// Update selection box bounds
		updateBounds();
		// Reset pointer state
		setCanvasMode(CanvasMode.None);
		pointerDownPosition.current.didDeselectLayers = false;
		pointerDownPosition.current.insideSelection = false;
		pointerDownPosition.current.didMove = false;
		// Reset cursor
		document.body.className = "";
	};

	const onCanvasClick = e => {
		if (pointerDownPosition.current.insideSelection) {
			deselectLayers();
		}
		if (
			!pointerDownPosition.current.didDeselectLayers &&
			!pointerDownPosition.current.insideSelection &&
			!pointerDownPosition.current.didMove
		) {
			// Toggle editing state if pointer down did not deselected layers
			props.setTileEditing(!props.tileEditing);
		}
	};

	const onLayerClick = e => {
		console.log("onLayerClick", canvasMode);

		// Toggle properties if layer is selected
		/*
		const layerId = pointerDownPosition.current.layerId;
		if (property.get() === layerId) {
			property.set("");
		} else {
			property.set(layerId);
		}
		*/

		// Always show properties of layer when clicked
		const layerId = pointerDownPosition.current.layerId;
		property.set(layerId);

		// Show selection box
		bounds.opacity.set(1);
	};

	React.useEffect(() => {
		if (canvasMode !== CanvasMode.None) {
			window.addEventListener("mousemove", onPointerMove);
			window.addEventListener("mouseup", onPointerUp);
		}
		return function cleanup() {
			window.removeEventListener("mousemove", onPointerMove);
			window.removeEventListener("mouseup", onPointerUp);
		};
	}, [canvasMode]);

	const deselectLayers = () => {
		//console.log("deselectLayers");
		selection.set("");
		property.set("");
		bounds.opacity.set(0);
	};

	const autoZoom = (maxZoom = null) => {
		// Center the bounding box of the unscaled, unzoomed content
		const shapes = [];
		layers.forEach(b => {
			shapes.push({
				width: b.params.width,
				height: b.params.height,
				x: b.params.x,
				y: b.params.y,
				rotation: b.params.rotation,
			});
		});
		let boundingBox = getBoundingBox(shapes);
		// Distance from center of tile 0,0
		const distX = boundingBox.x + boundingBox.width / 2;
		const distY = boundingBox.y + boundingBox.height / 2;
		layers.forEach((b, i) => {
			b.params.x -= distX;
			b.params.y -= distY;
			shapes[i].x = b.params.x;
			shapes[i].y = b.params.y;
			animate(b.motion.x, b.params.x, { duration: 0.2, ease: "easeOut" });
			animate(b.motion.y, b.params.y, { duration: 0.2, ease: "easeOut" });
		});
		// Update bounding box
		boundingBox = getBoundingBox(shapes);
		// Find the zoom level that will fit the content in the tile
		const boundingBoxScale = getBoundingBoxScale(boundingBox, props.tile.canonicalWidth, props.tile.canonicalHeight);

		//console.log("autozoom: ", boundingBoxScale);

		// Don't zoom if scale if bigger than max
		if (maxZoom && boundingBoxScale > maxZoom) return;

		// Animate the zoom
		setZoom(boundingBoxScale);

		// Update bounds if something's selected
		//updateBounds();
	};
	props.tile.autoZoom = autoZoom;

	// Zoooooooooom
	const zoom = useMotionValue(props.tile.params.zoom);
	props.tile.mZ = zoom;
	const setZoom = v => {
		props.tile.params.zoom = v;
		animate(zoom, v, { duration: 0.2, ease: "easeOut" });
	};
	props.tile.setZoom = setZoom;
	// redraw when zoom changes
	useMotionValueEvent(zoom, "change", latest => updateBounds());
	// Keep zoom motion value in sync w/ tile data
	React.useEffect(() => {
		zoom.set(props.tile.params.zoom);
	});

	// Trigger auto zoom if the tile changes size or if it's been pasted
	const cacheTileSize = React.useRef({ w: tileWidth, h: tileHeight });
	React.useEffect(() => {
		//console.log("AUTOZOOM");
		if (props.tile.params.autozoom) {
			if (cacheTileSize.current.w !== tileWidth || cacheTileSize.current.h !== tileHeight || props.tile.duplicate) {
				autoZoom(1); // max auto zoom of 1
				props.tile.duplicate = null;
			}
		}
		cacheTileSize.current.w = tileWidth;
		cacheTileSize.current.h = tileHeight;
	});

	console.log(pageScale.get(), zoom.get(), props.tileWidth, props.tileHeight);

	return (
		<Wrap id={canvasId}>
			{props.tileSelected && (
				<GhostView>
					<CenterOrigin
						className="centerTileOrigin"
						animate={{
							x: props.tileWidth / 2,
							y: props.tileHeight / 2,
						}}
						transition={transitions.layoutTransition}
						initial={false}
					>
						{layers &&
							layers.map((b, i) => (
								<GhostLayer
									key={b.id}
									layer={b}
									pageScale={pageScale}
									zoom={zoom}
									theme={props.theme}
									interactive={props.tileSelected}
									onPointerDown={
										props.tileSelected
											? e => {
													onLayerPointerDown(e, b.id);
											  }
											: undefined
									}
								/>
							))}
					</CenterOrigin>
				</GhostView>
			)}

			{props.tileSelected && (
				<Canvas
					theme={props.theme}
					borderRadius={props.borderRadius}
					pageScale={pageScale}
					zoom={zoom}
					tile={props.tile}
					tileWidth={tileWidth}
					tileHeight={tileHeight}
					dragRect={dragRect}
					onPointerDown={
						props.tileSelected
							? e => {
									onCanvasPointerDown(e);
							  }
							: undefined
					}
					editing={props.tileEditing}
					tileSelected={props.tileSelected}
					gridSize={props.tile.params.gridSize}
					canvasId={canvasId}
					selecting={canvasMode === CanvasMode.Selecting}
					layers={layers}
				/>
			)}

			<LayerView
				style={{
					borderRadius: props.borderRadius,
					overflow: "clip",
				}}
			>
				<CenterOrigin
					className="centerTileOrigin"
					animate={{
						x: tileWidth / 2,
						y: tileHeight / 2,
					}}
					transition={transitions.layoutTransition}
					initial={false}
				>
					{layers &&
						layers.map((b, i) => (
							<Layer
								key={b.id}
								theme={props.theme}
								layer={b}
								selection={selection}
								showSelection={canvasMode !== CanvasMode.Translating}
								boundsOpacity={bounds.opacity}
								pageScale={pageScale}
								zoom={zoom}
								layerTextIsFocused={layerTextIsFocused}
								updateBounds={updateBounds}
								interactive={props.tileSelected}
								isPlayMode={props.isPlayMode}
								onPointerDown={
									props.tileSelected
										? e => {
												onLayerPointerDown(e, b.id);
										  }
										: undefined
								}
							/>
						))}
					<Guides
						theme={props.theme}
						pageScale={pageScale}
						zoom={zoom}
						tileWidth={tileWidth}
						tileHeight={tileHeight}
						guides={guides}
						bounds={bounds}
					/>
				</CenterOrigin>
			</LayerView>

			{props.tileSelected && layers.length > 0 && (
				<CenterOrigin
					className="centerTileOrigin"
					animate={{
						x: tileWidth / 2,
						y: tileHeight / 2,
					}}
					transition={transitions.layoutTransition}
					initial={false}
				>
					<SelectionBox
						theme={props.theme}
						selection={selection}
						layers={layers}
						bounds={bounds}
						onRotateHandlePointerDown={onRotateHandlePointerDown}
						onResizeHandlePointerDown={onResizeHandlePointerDown}
						layerTextIsFocused={layerTextIsFocused}
						onMovePointPointerDown={onMovePointPointerDown}
					/>
					{props.formatBarContainerRef.current &&
						createPortal(
							<Properties
								theme={props.theme}
								property={property}
								selection={selection}
								layers={layers}
								bounds={bounds}
								updateBounds={updateBounds}
								scale={pageScale}
								alignLayers={alignLayers}
								distributeLayers={distributeLayers}
							/>,
							props.formatBarContainerRef.current
						)}
				</CenterOrigin>
			)}

			{layers.length === 0 && !props.tileSelected && (
				<DrawingTileNull
					theme={props.theme}
					borderRadius={props.borderRadius}
					onTap={props.onNullTileButtonTap}
					droppableBackgroundOpacity={props.droppableBackgroundOpacity}
					pageScale={pageScale}
					zoom={zoom}
					tile={props.tile}
					tileWidth={tileWidth}
					tileHeight={tileHeight}
				/>
			)}
		</Wrap>
	);
};

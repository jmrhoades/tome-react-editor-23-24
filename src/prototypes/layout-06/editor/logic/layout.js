import { DropAxis, DropOperation, DropPosition, DropZoneDirections } from "../EditorContext";

// The Gilbert-Johnson-Keerthi Distance Algorithm
// https://www.medien.ifi.lmu.de/lehre/ss10/ps/Ausarbeitung_Beispiel.pdf

// Minkowski Difference
// https://github.com/RayzRazko/gjk-js
// https://cse442-17f.github.io/Gilbert-Johnson-Keerthi-Distance-Algorithm/

// AABB VS SWEPT AABB
// collision-2d
// https://github.com/mreinstein/collision-2d

export const getActiveDropzone = ({ dropzones = null, draggingRect = null, algorithm = null }) => {
	return false;
};

// Angle in radians
export const angleRadians = (p1, p2) => {
	return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

// Angle in degrees
export const angleDeg = (p1, p2) => {
	return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
};

// Angle in degrees (nicer) 0 === north, 90 === east, etc
export const angleDegNicer = (p1, p2) => {
	let dy = p2.y - p1.y;
	let dx = p2.x - p1.x;
	let theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	theta -= 90; // dial rotation, 0 points north
	if (theta < 0) theta = 360 + theta; // range [0, 360)
	if (theta > 360) theta = 360 - theta; // range [0, 360)
	return theta;
};

export const directionForDeg = a => {
	let dir = "UNKNOWN";
	if ((a >= 315 && a <= 360) || (a >= 0 && a <= 45)) dir = DropZoneDirections.above;
	if (a >= 45 && a < 135) dir = DropZoneDirections.right;
	if (a >= 135 && a < 225) dir = DropZoneDirections.below;
	if (a >= 225 && a < 315) dir = DropZoneDirections.left;
	return dir;
};

export const distanceBetween = (p1, p2) => {
	const x = p2.y - p1.y;
	const y = p2.x - p1.x;
	return Math.sqrt(x * x + y * y);
};

export const getTileRects = ({ draggable, tiles, tileRefs, rectIdMap, dropTargets, findTileDepth }) => {
	tiles.forEach(tile => {
		const depth = findTileDepth(tile);
		const tileEl = tileRefs.current[tile.id].current;
		const tileRect = tileEl.getBoundingClientRect();
		const hitSize = 1;
		const depthOffset = 4;
		const crossOffsetAmount = 12 - depth * 2;

		rectIdMap.set(tile.id, tileRect);
		dropTargets.push({
			id: tile.id,
			depth: depth,
		});
	});
};

export const getHitRects = ({ draggable, tiles, tileRefs, rectIdMap, dropTargets, findTileDepth }) => {
	tiles.forEach(tile => {
		const depth = findTileDepth(tile);
		const tileEl = tileRefs.current[tile.id].current;
		const tileRect = tileEl.getBoundingClientRect();
		const hitSize = 1;
		const depthOffset = 4;
		const insetAmount = 6;
		const crossOffsetAmount = 12 - depth * 2;

		if (tile.type === "FLEX" && tile.tiles && tile.tiles.length > 0) {
			const direction = tile.layout.direction;

			let dropRect = {};

			// Set up the first drop zone, position 0
			if (direction === "horizontal") {
				dropRect = {
					top: tileRect.top,
					left: tileRect.left,
					width: hitSize,
					height: tileRect.height,
				};
				dropRect.left += depthOffset * depth;
			}
			if (direction === "vertical") {
				dropRect = {
					top: tileRect.top,
					left: tileRect.left,
					width: tileRect.width,
					height: hitSize,
					bottom: tileRect.top + tileRect.height,
					right: tileRect.left + hitSize,
				};
				dropRect.top += depthOffset * depth;
			}

			let addZone = true;
			if (draggable && draggable.parentId === tile.id) {
				const draggableIndex = tile.tiles.indexOf(draggable);
				if (draggableIndex === 0) addZone = false;
			}

			dropRect.right = dropRect.left + dropRect.width;
			dropRect.bottom = dropRect.top + dropRect.height;
			if (addZone) {
				const tId = tile.id + "-order-start";
				rectIdMap.set(tId, dropRect);
				dropTargets.push({
					id: tId,
					operation: DropOperation.addToContainer,
					draggableId: "AddTile",
					droppableId: tile.id,
					direction: direction,
					axis: DropAxis.main,
					order: 0,
					depth: depth,
					dropRect: dropRect,
				});
			}

			// Set up a drop zone after each child
			tile.tiles.forEach((t, i) => {
				const childEl = tileRefs.current[t.id].current;
				const childRect = childEl.getBoundingClientRect();
				let dropRect = {};

				if (direction === "horizontal") {
					dropRect = {
						top: tileRect.top,
						left: childRect.left + childRect.width - hitSize,
						width: hitSize,
						height: tileRect.height,
					};
					if (i === tile.tiles.length - 1) {
						// Take care to offset the drop edges when deeply nested
						//dropRect.left += depthOffset * depth;
						dropRect.left = tileRect.left + tileRect.width - dropRect.width;
					} else {
						// Place drop zones in between children not on the edges
						let nextChild = tile.tiles[i + 1];
						let nextChildEl = tileRefs.current[nextChild.id].current;
						let nextChildRect = nextChildEl.getBoundingClientRect();
						let r = childRect.left + childRect.width;
						let l = nextChildRect.left;
						let d = (l - r) / 2;
						dropRect.left = r + d;
					}
				}

				if (direction === "vertical") {
					dropRect = {
						top: childRect.top + childRect.height - hitSize,
						left: tileRect.left,
						width: tileRect.width,
						height: hitSize,
					};

					if (i === tile.tiles.length - 1) {
						dropRect.top = tileRect.top + tileRect.height - dropRect.height;
						dropRect.top -= depthOffset * depth;
					} else {
						// Place drop zones in between children not on the edges
						let nextChild = tile.tiles[i + 1];
						let nextChildEl = tileRefs.current[nextChild.id].current;
						let nextChildRect = nextChildEl.getBoundingClientRect();
						let r = childRect.top + childRect.height;
						let l = nextChildRect.top;
						let d = (l - r) / 2;
						dropRect.top = r + d;
					}
				}
				dropRect.right = dropRect.left + dropRect.width;
				dropRect.bottom = dropRect.top + dropRect.height;

				let addZone = true;
				if (draggable && draggable.parentId === tile.id) {
					const draggableIndex = tile.tiles.indexOf(draggable);
					if (draggableIndex === i) addZone = false;
					if (draggableIndex === tile.tiles.length - 1 && i === tile.tiles.length - 2) addZone = false;
					if (draggableIndex < tile.tiles.length - 1 && i === draggableIndex - 1) addZone = false;
				}

				if (addZone) {
					const tId = tile.id + "-order-" + (i + 1);
					rectIdMap.set(tId, dropRect);
					dropTargets.push({
						id: tId,
						operation: DropOperation.addToContainer,
						draggableId: "AddTile",
						droppableId: tile.id,
						direction: direction,
						axis: DropAxis.main,
						order: i + 1,
						depth: depth,
						dropRect: dropRect,
					});
				}
			});
		}

		// Create container hit zones for leaf nodes
		// Inset hit zones
		if ((tile.type !== "FLEX" && tile.type !== "PAGE") || tile.tiles.length === 0) {
			// getLingerHitRects({ tile, tileRect, rectIdMap, dropTargets, findTileById });
			// getCreateContainerHitRects({ tile, tileRect, rectIdMap, dropTargets, findTileById });
			// Create a single "linger" drop zone in leaf nodes

			let dropSize = 8;

			let dropRect = {
				top: tileRect.top + tileRect.height / 2 - dropSize / 2,
				left: tileRect.left + tileRect.width / 2 - dropSize / 2,
				width: dropSize,
				height: dropSize,
			};

			const tId = tile.id + "-leaf-node-linger";
			rectIdMap.set(tId, dropRect);
			dropTargets.push({
				id: tId,
				operation: DropOperation.leafNodeLinger,
				droppableId: tile.id,
				depth: depth,
				dropRect: dropRect,
			});
		}
	});
};

export const getLingerHitRects = ({ tile, tileRect, rectIdMap, dropTargets }) => {
	//const parent = findTileById(tile.parentId);
	//const parentDirection = parent.layout.direction;
	//console.log(parent, parentDirection);

	const crossInset = 12;
	const hitSize = 1;

	// Horizontal start
	const hSRect = {
		left: tileRect.left + crossInset,
		top: tileRect.top + crossInset,
		width: hitSize,
		height: tileRect.height - crossInset * 2,
	};
	hSRect.right = hSRect.left + hSRect.width;
	hSRect.bottom = hSRect.top + hSRect.height;

	const idHS = tile.id + "-create-container-horizontal-start";
	rectIdMap.set(idHS, hSRect);
	dropTargets.push({
		id: idHS,
		operation: DropOperation.lingerCreate,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "horizontal",
		axis: DropAxis.cross,
		order: 0,
		dropRect: hSRect,
	});

	// Horizontal end
	const hERect = {
		left: tileRect.left + tileRect.width - crossInset,
		top: tileRect.top + crossInset,
		width: hitSize,
		height: tileRect.height - crossInset * 2,
	};
	hERect.right = hERect.left + hERect.width;
	hERect.bottom = hERect.top + hERect.height;
	const idHE = tile.id + "-create-container-horizontal-end";
	rectIdMap.set(idHE, hERect);
	dropTargets.push({
		id: idHE,
		operation: DropOperation.lingerCreate,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "horizontal",
		axis: DropAxis.cross,
		order: 1,
		dropRect: hERect,
	});

	// Vertical start
	const vSRect = {
		left: tileRect.left + crossInset,
		top: tileRect.top + crossInset,
		width: tileRect.width - crossInset * 2,
		height: hitSize,
	};
	vSRect.right = vSRect.left + vSRect.width;
	vSRect.bottom = vSRect.top + vSRect.height;
	const idVS = tile.id + "-create-container-vertical-start";
	rectIdMap.set(idVS, vSRect);
	dropTargets.push({
		id: idVS,
		operation: DropOperation.lingerCreate,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "vertical",
		axis: DropAxis.cross,
		order: 0,
		dropRect: vSRect,
	});

	// Vertical end
	const vERect = {
		left: tileRect.left + crossInset,
		top: tileRect.top + tileRect.height - crossInset,
		width: tileRect.width - crossInset * 2,
		height: hitSize,
	};
	vERect.right = vERect.left + vERect.width;
	vERect.bottom = vERect.top + vERect.height;
	const idVE = tile.id + "-create-container-vertical-end";
	rectIdMap.set(idVE, vERect);
	dropTargets.push({
		id: idVE,
		operation: DropOperation.lingerCreate,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "vertical",
		axis: DropAxis.cross,
		order: 1,
		dropRect: vERect,
	});
};

export const getCreateContainerHitRects = ({ tile, tileRect, rectIdMap, dropTargets, findTileById }) => {
	const parent = findTileById(tile.parentId);
	const parentDirection = parent.layout.direction;

	console.log(parent, parentDirection);

	const crossInset = 12;
	const hitSize = 1;

	// Horizontal start
	const hSRect = {
		left: tileRect.left + crossInset,
		top: tileRect.top + crossInset,
		width: hitSize,
		height: tileRect.height - crossInset * 2,
	};
	hSRect.right = hSRect.left + hSRect.width;
	hSRect.bottom = hSRect.top + hSRect.height;

	const idHS = tile.id + "-create-container-horizontal-start";
	rectIdMap.set(idHS, hSRect);
	dropTargets.push({
		id: idHS,
		operation: DropOperation.createContainer,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "horizontal",
		axis: DropAxis.cross,
		order: 0,
		dropRect: hSRect,
	});

	// Horizontal end
	const hERect = {
		left: tileRect.left + tileRect.width - crossInset,
		top: tileRect.top + crossInset,
		width: hitSize,
		height: tileRect.height - crossInset * 2,
	};
	hERect.right = hERect.left + hERect.width;
	hERect.bottom = hERect.top + hERect.height;
	const idHE = tile.id + "-create-container-horizontal-end";
	rectIdMap.set(idHE, hERect);
	dropTargets.push({
		id: idHE,
		operation: DropOperation.createContainer,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "horizontal",
		axis: DropAxis.cross,
		order: 1,
		dropRect: hERect,
	});

	// Vertical start
	const vSRect = {
		left: tileRect.left + crossInset,
		top: tileRect.top + crossInset,
		width: tileRect.width - crossInset * 2,
		height: hitSize,
	};
	vSRect.right = vSRect.left + vSRect.width;
	vSRect.bottom = vSRect.top + vSRect.height;
	const idVS = tile.id + "-create-container-vertical-start";
	rectIdMap.set(idVS, vSRect);
	dropTargets.push({
		id: idVS,
		operation: DropOperation.createContainer,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "vertical",
		axis: DropAxis.cross,
		order: 0,
		dropRect: vSRect,
	});

	// Vertical end
	const vERect = {
		left: tileRect.left + crossInset,
		top: tileRect.top + tileRect.height - crossInset,
		width: tileRect.width - crossInset * 2,
		height: hitSize,
	};
	vERect.right = vERect.left + vERect.width;
	vERect.bottom = vERect.top + vERect.height;
	const idVE = tile.id + "-create-container-vertical-end";
	rectIdMap.set(idVE, vERect);
	dropTargets.push({
		id: idVE,
		operation: DropOperation.createContainer,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: "vertical",
		axis: DropAxis.cross,
		order: 1,
		dropRect: vERect,
	});
};

export const getRootCrossHitRects = ({ tile, tileRefs, rectIdMap, dropTargets }) => {
	/*
	/ Cross-axis drop zones for the root container:		
	*/
	const tileEl = tileRefs.current[tile.id].current;
	const tileRect = tileEl.getBoundingClientRect();
	const direction = tile.layout.direction;
	const crossOffsetAmount = 20;
	const hitSize = 2;

	let crossAxisStartRect = {};
	if (direction === "horizontal") {
		crossAxisStartRect.left = tileRect.left;
		crossAxisStartRect.top = tileRect.top - crossOffsetAmount;
		crossAxisStartRect.width = tileRect.width;
		crossAxisStartRect.height = hitSize;
	}
	if (direction === "vertical") {
		crossAxisStartRect.left = tileRect.left - crossOffsetAmount;
		crossAxisStartRect.width = hitSize;
		crossAxisStartRect.height = tileRect.height;
		crossAxisStartRect.top = tileRect.top;
	}

	const tId1 = tile.id + "-cross-start";
	rectIdMap.set(tId1, crossAxisStartRect);
	dropTargets.push({
		id: tId1,
		operation: DropOperation.addToContainer,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: direction,
		axis: DropAxis.cross,
		order: 0,
		dropRect: crossAxisStartRect,
	});

	let crossAxisEndRect = {};
	if (direction === "horizontal") {
		crossAxisEndRect.left = tileRect.left;
		crossAxisEndRect.top = tileRect.top + tileRect.height + crossOffsetAmount;
		crossAxisEndRect.width = tileRect.width;
		crossAxisEndRect.height = hitSize;
	}
	if (direction === "vertical") {
		crossAxisEndRect.left = tileRect.left + tileRect.width + crossOffsetAmount;
		crossAxisEndRect.width = hitSize;
		crossAxisEndRect.height = tileRect.height;
		crossAxisEndRect.top = tileRect.top;
	}

	const tId2 = tile.id + "-cross-end";
	rectIdMap.set(tId2, crossAxisEndRect);
	dropTargets.push({
		id: tId2,
		operation: DropOperation.addToContainer,
		draggableId: "AddTile",
		droppableId: tile.id,
		direction: direction,
		axis: DropAxis.cross,
		order: 1,
		dropRect: crossAxisEndRect,
	});
};

export const getNoOpRectForTile = ({ tile, tileRefs, rectIdMap, dropTargets }) => {
	const tileEl = tileRefs.current[tile.id].current;
	const tileRect = tileEl.getBoundingClientRect();
	let dropSize = 8;

	let dropRect = {
		top: tileRect.top + tileRect.height / 2 - dropSize / 2,
		left: tileRect.left + tileRect.width / 2 - dropSize / 2,
		width: dropSize,
		height: dropSize,
	};

	const tId = tile.id + "-no-op-zone";
	rectIdMap.set(tId, dropRect);
	dropTargets.push({
		id: tId,
		operation: DropOperation.noOp,
		droppableId: tile.id,
		dropRect: dropRect,
	});
};

export const getDropLabel = ({ operation, direction, order }) => {
	if (direction === "vertical" && order === 0) {
		return "Add above";
	}
	if (direction === "vertical" && order === 1) {
		return "Add below";
	}
	if (direction === "horizontal" && order === 0) {
		return "Add left";
	}
	if (direction === "horizontal" && order === 1) {
		return "Add right";
	}
};

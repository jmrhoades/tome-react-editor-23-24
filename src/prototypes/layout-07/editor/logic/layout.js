import { contentDirection } from "../../tome/TileData";
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
		direction: contentDirection.HORIZONTAL,
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
		direction: contentDirection.HORIZONTAL,
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
		direction: contentDirection.VERTICAL,
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
		direction: contentDirection.VERTICAL,
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
		direction: contentDirection.HORIZONTAL,
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
		direction: contentDirection.HORIZONTAL,
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
		direction: contentDirection.VERTICAL,
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
		direction: contentDirection.VERTICAL,
		axis: DropAxis.cross,
		order: 1,
		dropRect: vERect,
	});
};

export const getDropLabel = ({ operation, direction, order }) => {
	/*
	if (direction === contentDirection.VERTICAL && order === 0) {
		return "Add above";
	}
	if (direction === contentDirection.VERTICAL && order === 1) {
		return "Add below";
	}
	if (direction === contentDirection.HORIZONTAL && order === 0) {
		return "Add left";
	}
	if (direction === contentDirection.HORIZONTAL && order === 1) {
		return "Add right";
	}
	*/
	return "Create container";
};

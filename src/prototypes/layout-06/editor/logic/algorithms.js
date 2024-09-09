import { PointerDirection } from "../EditorContext";

/**
 * Check if a given point is contained within a bounding rectangle
 */
function isPointWithinRect(point, rect) {
	const { top, left, bottom, right } = rect;

	return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
}

/**
 * Returns the rectangles that the pointer is hovering over
 */
export const pointerWithin = ({ droppableContainers, droppableRects, pointerCoordinates }) => {
	if (!pointerCoordinates) {
		return [];
	}

	const collisions = [];

	for (const droppableContainer of droppableContainers) {
		const { id } = droppableContainer;
		const rect = droppableRects.get(id);

		if (rect && isPointWithinRect(pointerCoordinates, rect)) {
			/* There may be more than a single rectangle intersecting
			 * with the pointer coordinates. In order to sort the
			 * colliding rectangles, we measure the distance between
			 * the pointer and the corners of the intersecting rectangle
			 */
			const corners = cornersOfRectangle(rect);
			// console.log(corners);

			const distances = corners.reduce((accumulator, corner) => {
				return accumulator + distanceBetween(pointerCoordinates, corner);
			}, 0);
			const effectiveDistance = Number((distances / 4).toFixed(4));

			collisions.push({
				id,
				data: { droppableContainer, value: effectiveDistance },
			});
		}
	}

	return collisions.sort(sortCollisionsAsc);
};

/**
 * Returns the coordinates of the corners of a given rectangle:
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */
export function cornersOfRectangle({ left, top, height, width }) {
	return [
		{
			x: left,
			y: top,
		},
		{
			x: left + width,
			y: top,
		},
		{
			x: left,
			y: top + height,
		},
		{
			x: left + width,
			y: top + height,
		},
	];
}

/**
 * Sort collisions from smallest to greatest value
 */
export function sortCollisionsAsc({ data: { value: a } }, { data: { value: b } }) {
	return a - b;
}

/**
 * Returns the distance between two points
 */
export function distanceBetween(p1, p2) {
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

/**
 * Is the pointer (or dragging rect) still within the lingered (target) rect?
 */
export function pointerLingering(draggingRect, targetRect, slop = 32) {
	//console.log(draggingRect, targetRect);
	return (
		draggingRect.x >= targetRect.x - slop &&
		draggingRect.x <= targetRect.x + targetRect.width + slop &&
		draggingRect.y >= targetRect.y - slop &&
		draggingRect.y <= targetRect.y + targetRect.height + slop
	);
}

/**
 * Is the pointer (or dragging rect) still within the lingered (target) rect?
 */
export function rectLingering(draggingRect, targetRect, slop = 32) {
	//console.log(draggingRect, targetRect);
	return false
}



/**
 * Are the hit rects in the path of the moving rect?
 */
export const filterDropTargetsWithPositionDelta = (dx, dy, targets, collisionRect) => {
	return targets.filter(o => {
		const { dropRect } = o;
		const dropMidY = dropRect.top + dropRect.height / 2;
		const dropMidX = dropRect.left + dropRect.width / 2;
		const xPositive = dx >= 0;
		const yPositive = dy >= 0;
		let inThePath = false;
		if (xPositive && dropMidX > collisionRect.midX) inThePath = true;
		if (yPositive && dropMidY > collisionRect.midY) inThePath = true;
		if (!xPositive && dropMidX < collisionRect.midX) inThePath = true;
		if (!yPositive && dropMidY < collisionRect.midY) inThePath = true;
		return inThePath;
	});
};

/**
 * Are the hit rects in the direction the pointer is moving in?
 */
export const filterDropTargetsByPointerDirection = (pointerDirection, targets, pointerCoordinates) => {
	return targets.filter(o => {
		let inThePath = false;

		if (pointerDirection === PointerDirection.north) {
			console.log(o.dropRect);
			if (o.dropRect.top < pointerCoordinates.y) return true;
		}
		if (pointerDirection === PointerDirection.south) {
			if (o.dropRect.top > pointerCoordinates.y) return true;
		}
		if (pointerDirection === PointerDirection.west) {
			if (o.dropRect.left < pointerCoordinates.x) return true;
		}
		if (pointerDirection === PointerDirection.east) {
			if (o.dropRect.left > pointerCoordinates.x) return true;
		}

		return inThePath;
	});
};



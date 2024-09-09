import { contentDirection } from "../../tome/TileData";
import { DropAxis, DropOperation } from "../EditorContext";
import { isPointWithinRect } from "./algorithms";

export const findTileIntersection = ({ tiles, tileRects, point }) => {
	let intersection = false;
	if (tiles && tiles.length > 0) {
		tiles.forEach((t, i) => {
			const tileRect = tileRects.current.find(o => o.id === t.id).rect;
			const pointWithin = isPointWithinRect(point, tileRect);
			//console.log("findTileIntersection", pointWithin);
			if (pointWithin) intersection = t;
		});
	}
	return intersection;
};

export const getRearrangeDropRects = ({ container, draggingTile, tileRects, dropTargets }) => {
	const tId = container.id + "-sibling-rearrange";
	const dropRect = tileRects.current.find(o => o.id === container.id).rect;
	const direction = container.layout.direction;

	dropTargets.push({
		id: tId,
		operation: DropOperation.rearrange,
		droppableId: container.id,
		draggableId: draggingTile.id,
		dropRect: dropRect,
		direction: direction,
	});
};

export const getContainerMainAxisDropRects = ({ containers, draggingTile, tileRects, dropTargets, findTileDepth }) => {
	containers.forEach(container => {
		const containerRect = tileRects.current.find(o => o.id === container.id).rect;
		const direction = container.layout.direction;
		const depth = findTileDepth(container);
		const depthOffset = 0;
		const depthAmountY = depth * depthOffset;

		// Set up a drop zone after each child
		let dropRectStart = {};
		let dropRectEnd = {};
		let dropRect = {};
		let prevDropRect = {};
		container.tiles.forEach((t, i) => {
			const tileRect = tileRects.current.find(o => o.id === t.id).rect;

			// first child in container
			if (i === 0) {
				if (direction === contentDirection.VERTICAL) {
					dropRectStart = {
						top: containerRect.top + depthAmountY,
						left: containerRect.left,
						width: containerRect.width,
						height: tileRect.top - containerRect.top + tileRect.height / 2 - depthAmountY,
					};
				}
				if (direction === contentDirection.HORIZONTAL) {
					dropRectStart = {
						top: containerRect.top + depthAmountY,
						left: containerRect.left,
						width: tileRect.left - containerRect.left + tileRect.width / 2,
						height: containerRect.height - depthAmountY,
					};
				}

				const tId = container.id + "-order-first";
				dropTargets.push({
					id: tId,
					operation: DropOperation.addToContainer,
					droppableId: container.id,
					draggableId: draggingTile ? draggingTile.id : undefined,
					lingerId: container.id,
					direction: direction,
					axis: DropAxis.main,
					order: i,
					depth: depth,
					dropRect: dropRectStart,
				});
				prevDropRect = dropRectStart;
			}

			// middle children
			if (i > 0) {
				if (direction === contentDirection.VERTICAL) {
					dropRect = {
						top: prevDropRect.top + prevDropRect.height + depthAmountY,
						left: containerRect.left,
						width: containerRect.width,
						height: tileRect.top - (prevDropRect.top + prevDropRect.height) + tileRect.height / 2 - depthAmountY,
					};
				}
				if (direction === contentDirection.HORIZONTAL) {
					dropRect = {
						top: containerRect.top + depthAmountY,
						left: prevDropRect.left + prevDropRect.width,
						width: tileRect.left - (prevDropRect.left + prevDropRect.width) + tileRect.width / 2,
						height: containerRect.height - depthAmountY,
					};
				}
				const tId = container.id + "-order-" + (i + 1);
				dropTargets.push({
					id: tId,
					operation: DropOperation.addToContainer,
					droppableId: container.id,
					draggableId: draggingTile ? draggingTile.id : undefined,
					lingerId: container.id,
					direction: direction,
					axis: DropAxis.main,
					order: i,
					depth: depth,
					dropRect: dropRect,
				});

				console.log(dropRect);
				prevDropRect = dropRect;
			}

			// last child in container
			if (i === container.tiles.length - 1) {
				if (direction === contentDirection.VERTICAL) {
					dropRectEnd = {
						top: prevDropRect.top + prevDropRect.height + depthAmountY,
						left: containerRect.left,
						width: containerRect.width,
						height:
							containerRect.height - (prevDropRect.top + prevDropRect.height - containerRect.top) - depthAmountY,
					};
				}
				if (direction === contentDirection.HORIZONTAL) {
					dropRectEnd = {
						top: containerRect.top + depthAmountY,
						left: prevDropRect.left + prevDropRect.width,
						width: containerRect.width - (prevDropRect.left + prevDropRect.width - containerRect.left),
						height: containerRect.height - depthAmountY,
					};
				}
				const tId = container.id + "-order-last";
				dropTargets.push({
					id: tId,
					operation: DropOperation.addToContainer,
					droppableId: container.id,
					draggableId: draggingTile ? draggingTile.id : undefined,
					lingerId: container.id,
					direction: direction,
					axis: DropAxis.main,
					order: i + 1,
					depth: depth,
					dropRect: dropRectEnd,
				});
			}
		});
	});
};

export const getContainerCrossAxisDropRects = ({ containers, draggingTile, tileRects, dropTargets, findTileDepth }) => {
	containers.forEach(container => {
		const containerRect = tileRects.current.find(o => o.id === container.id).rect;
		const direction = container.layout.direction;
		const depth = findTileDepth(container);
		const depthOffset = 4;
		const depthAmountY = depth * depthOffset;
		const size = 24;

		// Set up a drop zone after each child
		let dropRectStart = {};
		let dropRectEnd = {};

		if (direction === contentDirection.VERTICAL) {
			dropRectStart = {
				top: containerRect.top + depthAmountY,
				left: containerRect.left,
				width: size,
				height: containerRect.height - depthAmountY,
			};
			const tIdStart = container.id + "-order-cross-first";
			dropTargets.push({
				id: tIdStart,
				operation: DropOperation.addToContainer,
				droppableId: container.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				direction: direction,
				axis: DropAxis.cross,
				order: 0,
				depth: depth,
				dropRect: dropRectStart,
			});
			dropRectEnd = {
				top: containerRect.top + depthAmountY,
				left: containerRect.left + containerRect.width - size,
				width: size,
				height: containerRect.height - depthAmountY,
			};
			const tIdEnd = container.id + "-order-cross-last";
			dropTargets.push({
				id: tIdEnd,
				operation: DropOperation.addToContainer,
				droppableId: container.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				direction: direction,
				axis: DropAxis.cross,
				order: 1,
				depth: depth,
				dropRect: dropRectEnd,
			});
		}
		if (direction === contentDirection.HORIZONTAL) {
			dropRectStart = {
				top: containerRect.top + depthAmountY,
				left: containerRect.left,
				width: containerRect.width,
				height: size,
			};
			const tIdStart = container.id + "-order-cross-first";
			dropTargets.push({
				id: tIdStart,
				operation: DropOperation.addToContainer,
				droppableId: container.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				direction: direction,
				axis: DropAxis.cross,
				order: 0,
				depth: depth,
				dropRect: dropRectStart,
			});
			dropRectEnd = {
				top: containerRect.top + containerRect.height - size - depthAmountY,
				left: containerRect.left,
				width: containerRect.width,
				height: size,
			};
			const tIdEnd = container.id + "-order-cross-last";
			dropTargets.push({
				id: tIdEnd,
				operation: DropOperation.addToContainer,
				droppableId: container.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				direction: direction,
				axis: DropAxis.cross,
				order: 1,
				depth: depth,
				dropRect: dropRectEnd,
			});
		}
	});
};

export const getContentMainAxisDropRects = ({ nodes, draggingTile, tileRects, dropTargets, findTileById }) => {
	nodes.forEach(node => {
		const nodeRect = tileRects.current.find(o => o.id === node.id).rect;
		const parent = findTileById(node.parentId);
		const direction = parent.layout.direction;
		const index = parent.tiles.indexOf(node);

		// Set up 2 drop zones per node, before and after
		let dropRectStart = {};
		let dropRectEnd = {};

		if (direction === contentDirection.VERTICAL) {
			dropRectStart = {
				top: nodeRect.top,
				left: nodeRect.left,
				width: nodeRect.width,
				height: nodeRect.height / 2,
			};
			const tIdStart = node.id + "-order-content-before";
			dropTargets.push({
				id: tIdStart,
				operation: DropOperation.addToContainer,
				droppableId: parent.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				lingerId: node.id,
				direction: direction,
				axis: DropAxis.main,
				order: index,
				dropRect: dropRectStart,
			});
			dropRectEnd = {
				top: nodeRect.top + nodeRect.height / 2,
				left: nodeRect.left,
				width: nodeRect.width,
				height: nodeRect.height / 2,
			};
			const tIdEnd = node.id + "-order-content-after";
			dropTargets.push({
				id: tIdEnd,
				operation: DropOperation.addToContainer,
				droppableId: parent.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				lingerId: node.id,
				direction: direction,
				axis: DropAxis.main,
				order: index + 1,
				dropRect: dropRectEnd,
			});
		}
		if (direction === contentDirection.HORIZONTAL) {
			dropRectStart = {
				top: nodeRect.top,
				left: nodeRect.left,
				width: nodeRect.width / 2,
				height: nodeRect.height,
			};
			const tIdStart = node.id + "-order-content-before";
			dropTargets.push({
				id: tIdStart,
				operation: DropOperation.addToContainer,
				droppableId: parent.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				lingerId: node.id,
				direction: direction,
				axis: DropAxis.main,
				order: index,
				dropRect: dropRectStart,
			});
			dropRectEnd = {
				top: nodeRect.top,
				left: nodeRect.left + nodeRect.width / 2,
				width: nodeRect.width / 2,
				height: nodeRect.height,
			};
			const tIdEnd = node.id + "-order-content-after";
			dropTargets.push({
				id: tIdEnd,
				operation: DropOperation.addToContainer,
				droppableId: parent.id,
				draggableId: draggingTile ? draggingTile.id : undefined,
				lingerId: node.id,
				direction: direction,
				axis: DropAxis.main,
				order: index + 1,
				dropRect: dropRectEnd,
			});
		}
	});
};

export const getRootDropRects = ({ root, draggingTile, tileRects, dropTargets }) => {
	const containerRect = tileRects.current.find(o => o.id === root.id).rect;
	const direction = root.layout.direction;

	/*
	/ Main-axis drop zones for the root container:		
	*/

	if (draggingTile && draggingTile.parentId !== root.id) {
		const mainAxisStartRect = {
			left: 0,
			top: 0,
		};

		if (direction === contentDirection.HORIZONTAL) {
			mainAxisStartRect.width = containerRect.left;
			mainAxisStartRect.height = window.innerHeight;
		}

		if (direction === contentDirection.VERTICAL) {
			mainAxisStartRect.width = window.innerWidth;
			mainAxisStartRect.height = containerRect.top;
		}

		const tIdM1 = root.id + "-root-main-start";
		dropTargets.push({
			id: tIdM1,
			operation: DropOperation.addToContainer,
			droppableId: root.id,
			draggableId: draggingTile ? draggingTile.id : undefined,
			direction: direction,
			axis: DropAxis.main,
			order: 0,
			dropRect: mainAxisStartRect,
		});

		const mainAxisEndRect = {};
		if (direction === contentDirection.HORIZONTAL) {
			mainAxisEndRect.top = 0;
			mainAxisEndRect.left = containerRect.left + containerRect.width;
			mainAxisEndRect.width = window.innerWidth - (containerRect.left + containerRect.width);
			mainAxisEndRect.height = window.innerHeight;
		}

		if (direction === contentDirection.VERTICAL) {
			mainAxisEndRect.left = 0;
			mainAxisEndRect.top = containerRect.top + containerRect.height;
			mainAxisEndRect.width = window.innerWidth;
			mainAxisEndRect.height = window.innerHeight - containerRect.top - containerRect.height;
		}

		const tIdM2 = root.id + "-root-main-end";
		dropTargets.push({
			id: tIdM2,
			operation: DropOperation.addToContainer,
			droppableId: root.id,
			draggableId: draggingTile ? draggingTile.id : undefined,
			direction: direction,
			axis: DropAxis.main,
			order: root.tiles.length,
			dropRect: mainAxisEndRect,
		});
	}

	/*
	/ Cross-axis drop zones for the root container:		
	*/

	const crossAxisStartRect = {
		left: 0,
		top: 0,
	};

	if (direction === contentDirection.HORIZONTAL) {
		crossAxisStartRect.width = window.innerWidth;
		crossAxisStartRect.height = containerRect.top;
	}

	if (direction === contentDirection.VERTICAL) {
		crossAxisStartRect.width = containerRect.left;
		crossAxisStartRect.height = window.innerHeight;
	}

	const tId1 = root.id + "-root-cross-start";
	dropTargets.push({
		id: tId1,
		operation: DropOperation.addToContainer,
		droppableId: root.id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		direction: direction,
		axis: DropAxis.cross,
		order: 0,
		dropRect: crossAxisStartRect,
	});

	const crossAxisEndRect = {};
	if (direction === contentDirection.HORIZONTAL) {
		crossAxisEndRect.left = 0;
		crossAxisEndRect.top = containerRect.top + containerRect.height;
		crossAxisEndRect.width = window.innerWidth;
		crossAxisEndRect.height = window.innerHeight - containerRect.top - containerRect.height;
	}

	if (direction === contentDirection.VERTICAL) {
		crossAxisEndRect.top = 0;
		crossAxisEndRect.left = containerRect.left + containerRect.width;
		crossAxisEndRect.width = window.innerWidth - (containerRect.left + containerRect.width);
		crossAxisEndRect.height = window.innerHeight;
	}

	const tId2 = root.id + "-root-cross-end";
	dropTargets.push({
		id: tId2,
		operation: DropOperation.addToContainer,
		droppableId: root.id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		direction: direction,
		axis: DropAxis.cross,
		order: 1,
		dropRect: crossAxisEndRect,
	});
};

export const getNoOpDropRects = ({ selectedTiles, tileRects, dropTargets }) => {
	// Set up a no-op drop zone for each selected item
	selectedTiles.forEach((tile, i) => {
		const tileRect = tileRects.current.find(o => o.id === tile.id).rect;

		let insetSize = 0;

		let dropRect = {
			top: tileRect.top + insetSize,
			left: tileRect.left + insetSize,
			width: tileRect.width - insetSize * 2,
			height: tileRect.height - insetSize * 2,
		};

		const tId = tile.id + "-no-op-zone";
		//rectIdMap.set(tId, dropRect);
		dropTargets.push({
			id: tId,
			operation: DropOperation.noOp,
			droppableId: tile.id,
			dropRect: dropRect,
		});

		console.log(dropRect);
	});
};

export const getLingerDropRects = ({ id, tileRects, draggingTile, lingerTargets, findTileById }) => {
	const rect = tileRects.current.find(o => o.id === id).rect;

	// Cancel linger rect
	// Vertical direction, start
	const slop = 4;
	const dropRectCancel = {
		top: rect.top - slop,
		left: rect.left - slop,
		width: rect.width + (slop*2),
		height: rect.height + (slop*2),
	};
	const tIdCancel = id + "-linger-cancel";
	lingerTargets.push({
		id: tIdCancel,
		operation: DropOperation.cancelLinger,
		droppableId: id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		dropRect: dropRectCancel,
	});



	// Vertical direction, start
	const dropRectVerticalStart = {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height / 2,
	};
	const tIdVerticalStart = id + "-linger-vertical-start";
	lingerTargets.push({
		id: tIdVerticalStart,
		operation: DropOperation.createContainer,
		droppableId: id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		direction: contentDirection.VERTICAL,
		axis: DropAxis.main,
		order: 0,
		dropRect: dropRectVerticalStart,
	});

	// Vertical direction, end
	const dropRectVerticalEnd = {
		top: rect.top + rect.height / 2,
		left: rect.left,
		width: rect.width,
		height: rect.height / 2,
	};
	const tIdVerticalEnd = id + "-linger-vertical-end";
	lingerTargets.push({
		id: tIdVerticalEnd,
		operation: DropOperation.createContainer,
		droppableId: id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		direction: contentDirection.VERTICAL,
		axis: DropAxis.main,
		order: 1,
		dropRect: dropRectVerticalEnd,
	});

	// Horizontal direction, start
	const dropRectHorizontalStart = {
		top: rect.top,
		left: rect.left,
		width: rect.width / 4,
		height: rect.height,
	};
	const tIdHorizontalStart = id + "-linger-horizontal-start";
	lingerTargets.push({
		id: tIdHorizontalStart,
		operation: DropOperation.createContainer,
		droppableId: id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		direction: contentDirection.HORIZONTAL,
		axis: DropAxis.main,
		order: 0,
		dropRect: dropRectHorizontalStart,
	});

	// Horizontal direction, end
	const dropRectHorizontalEnd = {
		top: rect.top,
		left: rect.left + rect.width * 0.75,
		width: rect.width / 4,
		height: rect.height,
	};
	const tIdHorizontalEnd = id + "-linger-horizontal-end";
	lingerTargets.push({
		id: tIdHorizontalEnd,
		operation: DropOperation.createContainer,
		droppableId: id,
		draggableId: draggingTile ? draggingTile.id : undefined,
		direction: contentDirection.HORIZONTAL,
		axis: DropAxis.main,
		order: 1,
		dropRect: dropRectHorizontalEnd,
	});
};

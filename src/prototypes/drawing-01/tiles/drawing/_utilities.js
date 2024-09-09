import { uniqueId } from "lodash";
import { drawingShapes, fillColors } from "./_constants";
import { motion, useMotionValue } from "framer-motion";

export const createShapeData = shapeType => {
	return {
		id: uniqueId("block"),
		type: drawingShapes[shapeType].type,
		params: {
			x: 0,
			y: 0,
			width: drawingShapes[shapeType].canvasWidth,
			height: drawingShapes[shapeType].canvasHeight,
			rotation: 0,
			fill: {
				color: "#545454",
			},
			border: {
				color: "transparent",
				size: 2,
			},
			text: {
				content: "",
				size: 0,
				color: "transparent",
			},
		},
	};
};

export function degToRad(angle) {
	return (angle / 180) * Math.PI;
}

export function getShapeRect(shape) {
	const angleRad = degToRad(shape.rotation);
	const x1 = shape.x;
	const y1 = shape.y;
	const x2 = x1 + shape.width * Math.cos(angleRad);
	const y2 = y1 + shape.width * Math.sin(angleRad);
	const x3 = shape.x + shape.width * Math.cos(angleRad) + shape.height * Math.sin(-angleRad);
	const y3 = shape.y + shape.height * Math.cos(angleRad) + shape.width * Math.sin(angleRad);
	const x4 = shape.x + shape.height * Math.sin(-angleRad);
	const y4 = shape.y + shape.height * Math.cos(angleRad);

	const leftX = Math.min(x1, x2, x3, x4);
	const rightX = Math.max(x1, x2, x3, x4);
	const topY = Math.min(y1, y2, y3, y4);
	const bottomY = Math.max(y1, y2, y3, y4);
	return {
		x: leftX,
		y: topY,
		width: rightX - leftX,
		height: bottomY - topY,
	};
}

export function getBoundingBox(shapes) {
	let x1 = 9999999999;
	let y1 = 9999999999;
	let x2 = -999999999;
	let y2 = -999999999;
	shapes.forEach(shape => {
		const rect = getShapeRect(shape);
		x1 = Math.min(x1, rect.x - rect.width/2);
		y1 = Math.min(y1, rect.y - rect.height/2);
		x2 = Math.max(x2, rect.x + rect.width/2);
		y2 = Math.max(y2, rect.y + rect.height/2);
	});
	return {
		x: x1,
		y: y1,
		width: x2 - x1,
		height: y2 - y1,
		rotation: 0,
	};
}

export function getBoundingBoxScaleA(boundingBox, tileWidth, tileHeight) {
	// Fit bounding box within tile while maintaing aspect ratio
	const boundingBoxAspect = boundingBox.width / boundingBox.height;
	const boundingBoxAspectSq = Math.pow(boundingBoxAspect, 2);
	let rotate = 0;
	let newHeight = 0;
	const tilePadding = 32;
	const tW = tileWidth - tilePadding * 2;
	const tH = tileHeight - tilePadding * 2;
	if (tW > tH && tW / tH > boundingBoxAspect) {
		// wider aspect than the image
		newHeight = tH;
		rotate = 0;
	} else if (tH > tW && tH / tW > boundingBoxAspect) {
		// skinnier aspect than the image rotated 90 degrees
		newHeight = tW;
		rotate = Math.PI / 2;
	} else {
		var hPrime = (boundingBoxAspect * tW - boundingBoxAspectSq * tH) / (1 - boundingBoxAspectSq);
		var wPrime = boundingBoxAspect * (tH - hPrime);
		rotate = Math.atan2(hPrime, wPrime);
		var sine = Math.sin(rotate);
		if (sine === 0) {
			newHeight = tH;
		} else {
			newHeight = (tW - wPrime) / sine;
		}
	}

	return newHeight / boundingBox.height;
}

export function getBoundingBoxScaleB(boundingBox, tileWidth, tileHeight) {


}

/*
    Custom dragging?

    const [pointerDown, setPointerDown] = React.useState(false);
	const pointerDownPosition = React.useRef(false);
	const dragConstraints = React.useRef(false);
    const blockRect = React.useRef(false);
	const [dragging, setDragging] = React.useState(false);

	const onPointerDown = e => {
		// Record pointer position relative to the top left of the element
		setPointerDown(true);
		const el = document.getElementById(props.canvasId);
		dragConstraints.current = el.getBoundingClientRect();
		const { x: offsetX, y: offsetY } = dragConstraints.current;
		pointerDownPosition.current = { x: e.pageX - offsetX, y: e.pageY - offsetY };

        const blockEl = document.getElementById(block.id);
        blockRect.current = blockEl.getBoundingClientRect();
	};

	const onPointerMove = e => {
        const { x: offsetX, y: offsetY } = dragConstraints.current;
        if (!dragging) {
            const dx = e.pageX - offsetX - pointerDownPosition.current.x;
            const dy = e.pageY - offsetY - pointerDownPosition.current.y;
            const DELTA = 5;
            if (Math.abs(dx) + Math.abs(dy) > DELTA) {
                setDragging(true);
            }
        }
		if (dragging) {
            pointerDownPosition.current = { x: e.pageX - offsetX, y: e.pageY - offsetY };
			bX.set(pointerDownPosition.current.x);
			bY.set(pointerDownPosition.current.y);
		}
	};

	const onPointerUp = e => {
		setPointerDown(false);
		setDragging(false);
	};

	React.useEffect(() => {
		if (pointerDown) {
			document.body.addEventListener("mousemove", onPointerMove);
			document.body.addEventListener("mouseup", onPointerUp);
		}
		return function cleanup() {
			document.body.removeEventListener("mousemove", onPointerMove);
			document.body.removeEventListener("mouseup", onPointerUp);
		};
	}, [pointerDown, dragging]);

	*/

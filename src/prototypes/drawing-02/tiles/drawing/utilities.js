import { useTransform } from "framer-motion";
import { TEXT_ID } from "./constants";

export const useScaledValues = (layer, zoom, pageScale) => {
	const { x, y, w, h, line, text, margins } = layer.motion;
	return {
		bX: useTransform(() => x.get() * zoom.get() * pageScale.get()),
		bY: useTransform(() => y.get() * zoom.get() * pageScale.get()),
		bW: useTransform(() => w.get() * zoom.get() * pageScale.get()),
		bH: useTransform(() => h.get() * zoom.get() * pageScale.get()),
		borderSize: useTransform(() => line.size.get() * zoom.get() * pageScale.get()),
		borderRadius: useTransform(() => line.radius.get() * zoom.get() * pageScale.get()),
		fontSize: useTransform(() => text.size.get() * zoom.get() * pageScale.get()),
		marginXMax: useTransform(() => margins.x.max.get() * zoom.get() * pageScale.get()),
		marginYMax: useTransform(() => margins.y.max.get() * zoom.get() * pageScale.get()),
		x1: useTransform(() => layer.motion.line.x1.get() * zoom.get() * pageScale.get()),
		y1: useTransform(() => layer.motion.line.y1.get() * zoom.get() * pageScale.get()),
		x2: useTransform(() => layer.motion.line.x2.get() * zoom.get() * pageScale.get()),
		y2: useTransform(() => layer.motion.line.y2.get() * zoom.get() * pageScale.get()),
	};
};

export const syncLayerValues = layer => {
	const { x, y, w, h, r, fill, text, line } = layer.motion;
	w.set(layer.params.width);
	h.set(layer.params.height);
	x.set(layer.params.x);
	y.set(layer.params.y);
	r.set(layer.params.rotation);
	fill.color.set(layer.params.fill.color);
	line.color.set(layer.params.line.color);
	line.size.set(layer.params.line.size);
	line.radius.set(layer.params.line.radius);
	text.color.set(layer.params.text.color);
	text.content.set(layer.params.text.content);
	text.size.set(layer.params.text.size);
	line.x1.set(layer.params.line.x1);
	line.y1.set(layer.params.line.y1);
	line.x2.set(layer.params.line.x2);
	line.y2.set(layer.params.line.y2);
};

export const radiansToDegrees = radians => {
	const degrees = (radians * 180) / Math.PI;
	//console.log(angle);
	return degrees;
};

export const getAngleInRadians = (x1, x2, y1, y2) => {
	return Math.atan2(y2 - y1, x2 - x1);
};

export const focusAtEnd = el => {
	// Set caret at end and focus
	const sel = window.getSelection();
	if (sel) {
		sel.selectAllChildren(el);
		sel.collapseToEnd();
	}
};

export const focusAtStart = el => {
	// Set caret at start and focus
	const sel = window.getSelection();
	if (sel) {
		sel.selectAllChildren(el);
		sel.collapseToStart();
	}
};

export function focusLayerText(layer, end = true) {
	const el = document.getElementById(layer.id + TEXT_ID);
	//console.log("focusLayerText", el, layer.id + TEXT_ID);
	if (el) {
		if (end) {
			focusAtEnd(el);
		} else {
			focusAtStart(el);
		}
	}
}

export const insertCaretAtPoint = e => {
	let range;
	let targetNode;
	let offset;
	if (document.caretPositionFromPoint) {
		range = document.caretPositionFromPoint(e.clientX, e.clientY);
		targetNode = range.offsetNode;
		offset = range.offset;
	} else if (document.caretRangeFromPoint) {
		// Use WebKit-proprietary fallback method, Chrome needs it
		range = document.caretRangeFromPoint(e.clientX, e.clientY);
		targetNode = range.startContainer;
		offset = range.startOffset;
	} else {
		// Neither method is supported, do nothing
		return;
	}

	range.setStart(targetNode, offset);
	range.setEnd(targetNode, offset);
	const sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);

	//console.log(range, offset);
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
		rotation: 0,
	};
}

export function getBoundingBoxScale(boundingBox, tileWidth, tileHeight) {
	// Fit bounding box within tile while maintaining aspect ratio
	const boundingBoxAspect = boundingBox.width / boundingBox.height;
	const boundingBoxAspectSq = Math.pow(boundingBoxAspect, 2);
	let rotate = 0;
	let newHeight = 0;
	const tilePadding = 32;
	const tW = tileWidth - tilePadding * 2;
	const tH = tileHeight - tilePadding * 2;
	if (tW > tH && tW / tH > boundingBoxAspect) {
		// wider aspect than the tile
		newHeight = tH;
		rotate = 0;
	} else if (tH > tW && tH / tW > boundingBoxAspect) {
		// skinnier aspect than the tile
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

/* [
returns a SVG path element that represent a ellipse.
cx,cy → center of ellipse
rx,ry → major minor radius
t1 → start angle, in radian.
Δ → angle to sweep, in radian. positive.
φ → rotation on the whole, in radian
URL: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
Version 2019-06-19
 ] */
export function arcPath(center, radius, amount) {
	const cx = center;
	const cy = center;

	const rx = radius;
	const ry = radius;

	const t1 = degToRad(270);
	let Δ = degToRad(amount);
	const φ = 0;

	const cos = Math.cos;
	const sin = Math.sin;
	const π = Math.PI;

	const f_matrix_times = ([[a, b], [c, d]], [x, y]) => [a * x + b * y, c * x + d * y];
	const f_rotate_matrix = x => [
		[cos(x), -sin(x)],
		[sin(x), cos(x)],
	];
	const f_vec_add = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

	Δ = Δ % (2 * π);
	const rotMatrix = f_rotate_matrix(φ);
	const [sX, sY] = f_vec_add(f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]), [cx, cy]);
	const [eX, eY] = f_vec_add(f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]), [cx, cy]);
	const fA = Δ > π ? 1 : 0;
	const fS = Δ > 0 ? 1 : 0;
	const path = "M " + sX + " " + sY + " A " + [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ");
	return path;
}

/*
    Custom dragging?

    const [pointerDown, setPointerDown] = React.useState(false);
	const pointerDownPosition = React.useRef(false);
	const dragConstraints = React.useRef(false);
    const layerRect = React.useRef(false);
	const [dragging, setDragging] = React.useState(false);

	const onPointerDown = e => {
		// Record pointer position relative to the top left of the element
		setPointerDown(true);
		const el = document.getElementById(props.canvasId);
		dragConstraints.current = el.getBoundingClientRect();
		const { x: offsetX, y: offsetY } = dragConstraints.current;
		pointerDownPosition.current = { x: e.pageX - offsetX, y: e.pageY - offsetY };

        const layerEl = document.getElementById(layer.id);
        layerRect.current = layerEl.getBoundingClientRect();
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

/*


	  // This method combines all the bounding rects of each span in the text tile into one rect.
	  const getTextRegionBoundingRect = useCallback(() => {
		const rects = getTextTileSpanBoundingRects();
		return rects?.reduce(
		  (prev, rect) => ({
			top: Math.min(prev.top, rect.top),
			left: Math.min(prev.left, rect.left),
			bottom: Math.max(prev.bottom, rect.top + rect.height),
			right: Math.max(prev.right, rect.left + rect.width),
		  }),
		  {
			top: Number.MAX_SAFE_INTEGER,
			left: Number.MAX_SAFE_INTEGER,
			bottom: 0,
			right: 0,
		  },
		);
	  }, [getTextTileSpanBoundingRects]);


	  */

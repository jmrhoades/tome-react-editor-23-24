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

export const pointInRect = (x, y, rect) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
};

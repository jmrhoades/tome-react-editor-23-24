import React, { useState, createContext, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { TomeContext } from "./TomeContext";
import { useMotionValue } from "framer-motion";

export const metricConstants = {
	cPageWidth: 1088,
	cPageHeight: 612,

	cPageMarginX: 128,
	cPageMarginY: 78,

	cViewportWidth: 1344,
	cViewportHeight: 768,

	cPanelWidth: 240,

	cColumnCount: 12,
	cColumnMinWidth: 1,
	cColumnMaxWidth: 11,
	cColumnMax: 8,

	cRowCount: 12,
	cRowMinHeight: 1,
	cRowDefaultHeight: 12,

	cPageMargin: 0,
	cColumnGutter: 12,
	cRowMargin: 12,
	cTileCornerRadius: 8,
	cPageCornerRadius: 0,

	cTileBorderSize: 2,
	cTileResizeHandleSize: 6,
	cTileInsertIndicatorSize: 4,

	cPageBorderSize: 3,
};

const useViewport = (delay = 700) => {
	// Use window as viewport for now, but div w/ id #viewport is also an option
	// const viewport = document.getElementById("viewport").getBoundingClientRect();
	//const viewportRect = document.getElementById("viewport").getBoundingClientRect();
	//if (!viewportRect || viewportRect.width === 0) return;
	const [viewport, setViewport] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	useEffect(() => {
		const handleResize = () =>
			setViewport({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		const debouncedHandleResize = debounce(handleResize, delay);
		window.addEventListener("resize", debouncedHandleResize);
		return () => {
			window.removeEventListener("resize", debouncedHandleResize);
		};
	}, [delay]);
	return viewport;
};

export const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
	const { tomeData, rowResizing, currentPage } = useContext(TomeContext);
	//const tempPageTop = useMotionValue(0);
	//const tempPageHeight = useMotionValue(0);

	const windowWidth = useMotionValue(window.innerWidth);
	const windowHeight = useMotionValue(window.innerHeight);

	//const windowWidthRange = [480, 1324, 176 * 12];
	//const windowHeightRange = [480, 796, 106 * 12];
	//const marginHRange = [144, 144, 144];
	//const marginVRange = [64, 64, 20 * 12];
	//const marginH = useTransform(windowWidth, windowWidthRange, marginHRange);
	//const marginV = useTransform(windowHeight, windowHeightRange, marginVRange);

	//const marginH = currentPage.layout && currentPage.layout.margins ? currentPage.layout.marginValue : 0;

	const marginH = metricConstants.cPageMarginX;
	const marginV = metricConstants.cPageMarginY;
	const pageMinY = metricConstants.cPageMarginY;

	//const pageMinY = currentPage.layout && currentPage.layout.margins ? metricConstants.cPageMinY : 0;

	const getMetrics = sidePanelOpen => {
		windowWidth.set(window.innerWidth);
		windowHeight.set(window.innerHeight);

		// Get viewport dimensions
		const vW = window.innerWidth;
		const vH = window.innerHeight;
		const {
			cPageWidth,

			cTileBorderSize,
			cColumnCount,
			cRowCount,

			cColumnMinWidth,
			cColumnMaxWidth,
			cColumnMax,
			cRowMinHeight,
			cTileInsertIndicatorSize,
			cPageBorderSize,
		} = metricConstants;

		let pageWidth = Math.round(window.innerWidth - Math.round(marginH * 2));

		let pageHeight = Math.round((9 / 16) * pageWidth);

		// Always fit a 16x9 page on the screen
		if ((window.innerHeight - pageHeight) / 2 <= marginV) {
			pageHeight = Math.round(window.innerHeight - Math.round(marginV * 2));
			pageWidth = Math.round((16 / 9) * pageHeight);
		}

		let minPageHeight = (9 / 16) * pageWidth;
		let pageTop = (window.innerHeight - minPageHeight) / 2;
		let pageLeft = (window.innerWidth - pageWidth) / 2;

		/*
		console.log(
			"window.innerWidth",
			window.innerWidth,
			"marginH: ",
			Math.round(marginH.get()),
			"marginV: ",
			Math.round(marginV.get()),
			"pageWidth:",
			pageWidth,
			"pageHeight:",
			pageHeight
		);
		*/

		// Set layout orientation based on viewport aspect ratio
		// Always set to landscape layout for now
		let isPortrait = false; // vW < vH; turn off for now

		// Find the "scale" of the page
		let pageScale = 1;
		let scale = pageWidth / cPageWidth;
		//scale = 1;
		//console.log("page scale is:", scale);

		const pageCornerRadius = currentPage.layout.corners ? currentPage.layout.cornerValue * scale : 0;
		const tileCornerRadius = currentPage.layout.corners ? currentPage.layout.cornerValue * scale : 0;

		let tileBorderSize = cTileBorderSize * scale;
		let pageBorderSize = cPageBorderSize * scale;
		if (tileBorderSize < 1) tileBorderSize = 1;
		if (pageBorderSize < 1) pageBorderSize = 1;
		tileBorderSize = 2;

		const columnCount = cColumnCount;
		const rowCount = cRowCount;

		//const pageMargin = cPageMargin * scale;
		const pageMargin = 0;
		const columnGutter = currentPage.layout.gaps ? currentPage.layout.gapValue * scale : 0;
		const columnWidth = (pageWidth - pageMargin * 2 - columnGutter * (columnCount - 1)) / columnCount;
		const rowMargin = currentPage.layout.gaps ? currentPage.layout.gapValue * scale : 0;
		const rowHeight = (minPageHeight - pageMargin * 2 - rowMargin * (rowCount - 1)) / rowCount;

		const dropIndicatorSize = cTileInsertIndicatorSize * scale;

		const metrics = {
			viewportWidth: vW,
			viewportHeight: vH,

			isPortrait: isPortrait,
			scale: scale,

			pageLeft: pageLeft,
			pageTop: pageTop,
			pageWidth: pageWidth,
			pageHeight: pageHeight,
			minPageHeight: minPageHeight,
			pageScale: pageScale,
			pageCornerRadius: pageCornerRadius,

			tileCornerRadius: tileCornerRadius,
			tileBorderSize: tileBorderSize,
			pageBorderSize: pageBorderSize,

			columnCount: columnCount,
			rowCount: rowCount,

			pageMargin: pageMargin,
			columnGutter: columnGutter,
			rowMargin: rowMargin,

			columnWidth: columnWidth,
			rowHeight: rowHeight,

			columnMinWidth: cColumnMinWidth,
			columnMaxWidth: cColumnMaxWidth,
			columnMax: cColumnMax,

			rowMinHeight: cRowMinHeight,

			dropIndicatorSize: dropIndicatorSize,
		};

		return metrics;
	};

	const viewport = useViewport(60);
	const [metrics, setMetrics] = useState(getMetrics(true));

	// const updateMetrics = useCallback(() => {
	// 	setMetrics(getMetrics(sidePanelOpen));
	// }, [sidePanelOpen]);

	useEffect(() => {
		//updateMetrics();
		setMetrics(getMetrics());
	}, [viewport, tomeData]);

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	const pointerInWindow = useMotionValue(true);

	/*
	React.useEffect(() => {
		const setFromEvent = e => {
			pointerX.set(e.clientX);
			pointerY.set(e.clientY);
		};
		const pointerEnter = e => {
			pointerInWindow.set(true);
		};
		const pointerExit = e => {
			pointerInWindow.set(false);
		};
		document.addEventListener("mousemove", setFromEvent);
		document.addEventListener("mouseenter", pointerEnter);
		document.addEventListener("mouseleave", pointerExit);
		return () => {
			document.removeEventListener("mousemove", setFromEvent);
			document.removeEventListener("mouseenter", pointerEnter);
			document.removeEventListener("mouseleave", pointerExit);
		};
	}, [pointerX, pointerY, pointerInWindow]);
	*/

	const {
		viewportHeight,
		minPageHeight,
		pageMargin,
		rowHeight,
		rowMargin,
		pageTop,
		columnWidth,
		columnGutter,
		pageWidth,
		pageLeft,
	} = metrics;

	// Use this to prop up the body height while resizing rows
	// Otherwise the page will jump unexpectedly and the resize operation
	// will become uncontrollable
	const getContentHeight = page => {
		let pageHeight = 0;
		// Find the rows belonging to the page
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		// Find the page height
		pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;
		return pageHeight;
	};

	const getPageHeight = page => {
		let pageHeight = 0;
		let pageHeightUnits = 0;

		// Find the rows belonging to the page
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		// Find the page height
		pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
			pageHeightUnits += r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;

		if (pageHeight < minPageHeight) {
			pageHeight = minPageHeight;
		}

		/*
		// Suspend when row/tile resizing
		if (rowResizing) {
			pageHeight = tempPageHeight.get();
		} else {
			tempPageHeight.set(pageHeight);
		}
		*/

		return pageHeight;
	};

	// useEffect(() => {
	// 	const handleWheel = e => {
	// 		//e.preventDefault();
	// 		const yMin = pageMinY;
	// 		const pageHeight = getPageHeight(currentPage);
	// 		if (pageHeight > window.innerHeight - yMin * 2) {
	// 			const pageTop = getPageTop(currentPage);
	// 			if (pageTop - e.deltaY < yMin) {
	// 				// stop at bottom of page
	// 				if (pageTop - e.deltaY < -pageHeight + window.innerHeight - yMin) {
	// 					wheelY.set(-pageHeight + window.innerHeight - yMin * 2);
	// 					setMetrics(getMetrics(true));
	// 				} else {
	// 					// allow change
	// 					wheelY.set(wheelY.get() - e.deltaY);
	// 					setMetrics(getMetrics(true));
	// 				}
	// 			} else {
	// 				// reset to min y
	// 				wheelY.set(0);
	// 				setMetrics(getMetrics(true));
	// 			}
	// 		}

	// 		/*
	// 		const scrollSign = leth.check(e);
	// 		if (scrollSign !== false) {
	// 			console.log(scrollSign);
	// 			//setMetrics(getMetrics(true));
	// 		}
	// 		*/
	// 	};

	// 	window.addEventListener("wheel", handleWheel);
	// 	return () => {
	// 		window.removeEventListener("wheel", handleWheel);
	// 	};
	// });

	const getPageTop = page => {
		// Find the page height
		let resizeWidthOffset = 0;

		//let pageTop = scrollY;
		const updatedPageHeight = getPageHeight(page);
		let pageHeight = updatedPageHeight;

		if (rowResizing && rowResizing.isResizingHeight) pageHeight = rowResizing.tempPageHeight;
		if (rowResizing && rowResizing.isResizingWidth) pageHeight = rowResizing.tempPageHeight;

		const yMin = pageMinY;
		const isCentered = pageHeight < window.innerHeight - yMin * 2;

		let pageTop = isCentered ? (window.innerHeight - pageHeight) / 2 : yMin;
		/*
		if (!isCentered) {
			const distanceOfPageBottomToBottomOfViewport = pageTop + pageHeight - window.innerHeight + wheelY.get();
			pageTop = yMin;
			pageTop += wheelY.get();
		}
		*/

		if (rowResizing && rowResizing.isResizingWidth) {
			resizeWidthOffset = (getPageHeight(page) - rowResizing.tempPageHeight) * rowResizing.handleYPercent;
			pageTop -= resizeWidthOffset;
		}

		//console.log(isCentered, pageHeight, window.innerHeight, yMin, pageTop, wheelY.get())
		return pageTop;

		//return 0;
	};

	const getTileWidth = tile => {
		let tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);
		return tileWidth;
	};

	const getTileWidthForUnit = unit => {
		return columnWidth * unit + columnGutter * (unit - 1);
	};

	const getTileX = tile => {
		let tileX = pageMargin;
		// Set based on order
		if (tile.order === 1) {
			tileX = pageMargin;
		}
		if (tile.order === 2) {
			// const firstTile = tiles[0];
			//const firstTile = tiles.filter(tile => {
			//return tile.order === 1;
			//})[0];
			//const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
			//tileX = pageMargin + firstTileWidth + columnGutter;
			tileX = pageWidth - pageMargin - getTileWidth(tile);
		}
		return tileX;
	};

	const getTileY = tile => {
		//console.log("getTileY")
		const page = tomeData.pages.filter(page => {
			return page.id === tile.pageId;
		})[0];
		//console.log(tile)
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		let tileTop = pageMargin + getPageTop(page);
		const row = tomeData.rows.filter(r => {
			return r.id === tile.rowId;
		})[0];
		if (row.order !== 1) {
			rows.forEach(r => {
				// Find all the rows with orders less than this row
				// add up their heights
				if (r.order < row.order) {
					tileTop += rowHeight * r.height + rowMargin * (r.height - 1);
					tileTop += rowMargin;
				}
			});
		}
		return tileTop;
	};

	const getTileHeight = tile => {
		let tileHeight = 0;
		// Find the row the tile is in
		const row = tomeData.rows.filter(r => {
			return r.id === tile.rowId;
		})[0];
		if (row && row.height) {
			tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);
		}
		return tileHeight;
	};

	const getTileRect = tile => {
		const rect = {
			x: getTileX(tile),
			y: getTileY(tile),
			width: getTileWidth(tile),
			height: getTileHeight(tile),
		};
		return rect;
	};

	const getRowRect = row => {
		const rows = tomeData.rows.filter(r => {
			return r.pageId === row.pageId;
		});
		let top = pageMargin + pageTop;
		if (row.order !== 1) {
			rows.forEach(r => {
				// Find all the rows with orders less than this row
				// add up their heights
				if (r.order < row.order) {
					top += rowHeight * r.height + rowMargin * (r.height - 1);
					top += rowMargin;
				}
			});
		}

		/*
		Row height
		*/
		let height = rowHeight * row.height + rowMargin * (row.height - 1);

		const rect = {
			x: pageLeft,
			y: top,
			width: pageWidth,
			height: height,
		};
		return rect;
	};

	const scrollWindowToY = y => {
		// Scroll the window down
		/*
		const scrollY = window.scrollY;
		animate(scrollY, y, {
			type: "tween",
			ease: "easeInOut",
			duration: 1,
			onUpdate: v => {
				console.log(v);
				window.scroll({
					top: v,
				});
			},
		});
		*/
		/*
		setTimeout(() => {
			console.log("trying to scroll", y);
			window.scroll({
				top: y,
				behavior: "smooth", // 👈
			});
		}, 10);
		*/
		//console.log("trying to scroll", y);
		/*
		setTimeout(() => {
			scrollMotion.set(window.scrollY);
			animate(scrollMotion, y, {
				type: "tween",
				//stiffness: 650,
				//damping: 60,
				duration: 0.3,
				onUpdate: v => {
					window.scroll({
						top: v,
					});
				},
			});
		}, 10);
		*/
	};

	const scrollTileIntoView = tile => {
		const tileY = Math.round(getTileY(tile));
		const tileHeight = Math.round(getTileHeight(tile));

		//console.log("tileY", tileY, "tileHeight", tileHeight, "viewportHeight", viewportHeight, "window.scrollY", window.scrollY);
		const bottomIsBelowViewport = tileY + tileHeight > viewportHeight + window.scrollY;
		const topIsAboveViewport = tileY < window.scrollY;
		//console.log("bottomIsBelowViewport", bottomIsBelowViewport);
		//console.log("topIsAboveViewport", topIsAboveViewport);

		// above or below the viewport, update scroll position
		if (bottomIsBelowViewport) {
			//scrollWindowToY(tileY + (tileHeight - viewportHeight) / 2);
			scrollWindowToY(tileY + tileHeight + pageTop - viewportHeight);
		}
		if (topIsAboveViewport) {
			//scrollWindowToY(tileY + (tileHeight - viewportHeight) / 2);
			scrollWindowToY(tileY - pageTop);
		}
	};

	const getRowForY = y => {
		let row = false;
		const pageTop = getPageTop(currentPage);

		y = y - pageTop - pageMargin + window.scrollY;

		//console.log("getRowForY", y, pageTop, window.scrollY);

		if (y < 0) {
			//console.log("ABOVE PAGE", y, pageTop, window.scrollY);
			return false;
		}

		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
		});

		// Rows must be sorted every time, y checking assumes sorted rows
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let rowTop = 0; // Used to tally-up the row heights
		rows.forEach((r, i) => {
			// Current row's height
			let rowBottom = rowTop + (rowHeight * r.height + rowMargin * (r.height - 1));
			//console.log("mouse is over row", r, i, rowBottom, rowTop)

			if (y >= rowTop && y <= rowBottom) {
				//console.log("mouse is over row", r, i, y, rowTop, rowBottom);
				// 	return r;
				row = r;
			}
			// calculate next row y position
			rowTop += rowHeight * r.height + rowMargin * r.height;
		});

		if (y > pageTop + rowTop) {
			//console.log("BELOW PAGE", y, pageTop, window.scrollY, rowTop);
			return false;
		}

		return row;
	};

	const getRowGapForXY = (x, y) => {
		if (!x || !y) {
			x = pointerX.get();
			y = pointerY.get();
		}
		let newRowOrder = 0;
		const pageTop = getPageTop(currentPage);
		x = x - pageLeft;
		if (x < 0 || x > pageWidth) {
			//console.log("getRowGapForPointer not in x");
			return false;
		}
		y = y - pageTop + window.scrollY;
		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let rowGapTop = 0; // Used to tally-up the row heights
		rows.forEach((r, i) => {
			// Current row's height
			let rowGapBottom = rowGapTop + rowMargin;
			//console.log("getRowGapForPointer", i, y, rowGapTop, rowGapBottom);
			if (y >= rowGapTop && y <= rowGapBottom) {
				//console.log("mouse is over row gap", r, i, y);
				newRowOrder = i;
			}
			// calculate next row y position
			rowGapTop += rowHeight * r.height + rowMargin * r.height;
		});
		return newRowOrder;
	};

	const getRowAndSideForXY = (x, y) => {
		if (!x || !y) {
			x = pointerX.get();
			y = pointerY.get();
		}
		//console.log("getRowAndSideForXY", x, y);

		let direction = "left";

		const row = getRowForY(y);
		let rowGapIndex = 0;
		x = x - pageLeft;
		if (x >= pageWidth / 2) {
			direction = "right";
		}
		if (!row) {
			rowGapIndex = getRowGapForXY(x, y);
			//console.log(rowGapIndex);
			if (y >= window.innerHeight / 2) {
				direction = "bottom";
			} else {
				direction = "top";
			}
		}
		return { row: row, direction: direction, rowGapIndex: rowGapIndex };
	};

	const getTileForXY = (x, y) => {
		if (!x || !y) {
			x = pointerX.get();
			y = pointerY.get();
		}
		//console.log("getTileForXY", x, y);
		let tile = false;
		let direction = "left";
		const row = getRowForY(y);
		const tiles = tomeData.tiles.filter(t => {
			return row.id === t.rowId;
		});
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		x = x - pageMargin - pageLeft;
		let tW = 0;
		let tX = pageMargin;
		tiles.forEach(t => {
			tW = columnWidth * t.width + columnGutter * (t.width - 1);
			if (x >= tX && x <= tX + tW) {
				tile = t;
				if (x >= tX + tW / 2) {
					direction = "right";
				}
			}
			// Calc next tile's x position
			tX += tW + pageMargin;
		});
		if (!tile) {
			if (y >= window.innerHeight / 2) {
				direction = "bottom";
			} else {
				direction = "top";
			}
		}
		//console.log(tile.id, direction);
		return { tile: tile, direction: direction };
	};

	const getDropInfoForXY = (x, y, config = { replace: false, canBeBackground: false }) => {
		const info = {
			dropZone: "NONE",
		};

		if (config.canBeBackground) {
			const pageDropArea = {};
			pageDropArea.width = 128;
			pageDropArea.height = 104;
			if (
				x < pageDropArea.width ||
				x > window.innerWidth - pageDropArea.width ||
				y < pageDropArea.height ||
				y > window.innerHeight - pageDropArea.height
			) {
				info.dropZone = "PAGE_BACKGROUND";
				return info;
			}
		}

		info.dropZone = "NONE";
		// Not in the page background drop zone, continue checking…

		const pageTop = getPageTop(currentPage);
		x = x - pageLeft;
		y = y - pageTop - pageMargin + window.scrollY;
		//console.log("getRowForY", y, pageTop, window.scrollY);
		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
		});
		// Rows must be sorted every time, y checking assumes sorted rows
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		// Indicator size and placement relative to row bottom
		let dropIndicatorSize = 4;
		//if (dropIndicatorSize < 2) dropIndicatorSize = 2;
		//if (dropIndicatorSize > 4) dropIndicatorSize = 4;
		const dropYOffset = rowMargin - (rowMargin - dropIndicatorSize) / 2;
		const dropXOffset = (columnGutter - dropIndicatorSize) / 2;
		// Used to tally-up the row heights
		let rowTop = 0;
		let rHeight = 0;
		let rowBottom = 0;
		let nextRowTop = 0;
		let lastRowOrder = 0;
		// Used to tally-up tile widths
		let tileLeft = pageMargin;
		let tileWidth = 0;
		let tileOverXPercent = 0;

		// Assume it's above the first row
		info.indicatorWidth_NewRow = pageWidth - pageMargin * 2;
		info.indicatorHeight_NewRow = dropIndicatorSize;
		info.indicatorX_NewRow = pageMargin;

		info.indicatorWidth_AddToRow = dropIndicatorSize;
		info.indicatorX_AddToRow = pageMargin;

		// Check if it's between rows
		rows.forEach((r, i) => {
			// Current row's height
			rHeight = rowHeight * r.height + rowMargin * (r.height - 1);
			rowBottom = rowTop + rHeight + rowMargin;
			nextRowTop = rowBottom;
			//console.log("mouse is over row", r, i, rowBottom, rowTop

			if (y >= rowTop && y <= rowBottom) {
				//console.log("mouse is over row", r, i, y, rowTop, rowBottom);
				info.rowOverId = r.id;
				info.rowOverOrder = r.order;
				info.rowOverYPercent = (y - rowTop) / (rHeight + rowMargin);
				info.rowOverTop = rowTop;
				info.rowOverBottom = rowBottom;
				info.rowOverHeight = rHeight;
				info.rowOver = r;
				info.dropY = info.rowOverTop + pageTop + pageMargin - dropYOffset;
			}
			// calculate next row y position
			rowTop += rowHeight * r.height + rowMargin * r.height;
			lastRowOrder = r.order;
		});

		// Check where it is relative to the closest tile
		if (info.rowOverId) {
			const tiles = tomeData.tiles.filter(t => t.rowId === info.rowOverId);
			tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
			tiles.forEach((t, i) => {
				tileWidth = columnWidth * t.width + columnGutter * (t.width - 1);
				tileOverXPercent = (x - tileLeft) / (tileWidth + columnGutter);
				if (
					(tileOverXPercent > 0 && tileOverXPercent < 1) || // within the tile
					(tileOverXPercent < 0 && i === 0) || // to the left of the first tile
					(tileOverXPercent > 1 && i === tiles.length - 1) // to the right of the last tile
				) {
					info.tileOverXPercent = tileOverXPercent;
					info.tileOverId = t.id;
					info.tileOverOrder = t.order;
					info.tileOverWidth = tileWidth;
					info.tileOverLeft = tileLeft - columnGutter + dropXOffset;
					info.tileOverRight = tileLeft + tileWidth + dropXOffset;
					info.tileOver = t;
				}

				//console.log(t.id, tileXOverPercent, x, tileWidth, tileLeft);
				tileLeft += columnWidth * t.width + columnGutter * t.width;
			});
			if (info.rowOverYPercent <= 0.4) {
				info.dropZone = "ABOVE_TILE";
				info.rowOrder = info.rowOverOrder;
			}
			if (info.rowOverYPercent >= 0.6) {
				info.dropZone = "BELOW_TILE";
				info.dropY = info.rowOverBottom + pageTop + pageMargin - dropYOffset;
				info.rowOrder = info.rowOverOrder + 1;
			}
			if (info.rowOverYPercent > 1 / 5 && info.rowOverYPercent < 4 / 5) {
				if (config.replace) {
					if (info.tileOverXPercent <= 0.4) {
						info.dropZone = "LEFT_OF_TILE";
						info.dropY = info.rowOverTop + pageTop + pageMargin;
						info.indicatorHeight_AddToRow = info.rowOverHeight;
						info.indicatorX_AddToRow = info.tileOverLeft;
						info.tileOrder = info.tileOverOrder;
					} else if (info.tileOverXPercent >= 0.6) {
						info.dropZone = "RIGHT_OF_TILE";
						info.dropY = info.rowOverTop + pageTop + pageMargin;
						info.indicatorHeight_AddToRow = info.rowOverHeight;
						info.indicatorX_AddToRow = info.tileOverRight;
						info.tileOrder = info.tileOverOrder + 1;
					} else {
						info.dropZone = "CENTER_OF_TILE";
						info.tileOrder = info.tileOverOrder;
					}
				} else {
					if (info.tileOverXPercent <= 0.5) {
						info.dropZone = "LEFT_OF_TILE";
						info.dropY = info.rowOverTop + pageTop + pageMargin;
						info.indicatorHeight_AddToRow = info.rowOverHeight;
						info.indicatorX_AddToRow = info.tileOverLeft;
						info.tileOrder = info.tileOverOrder;
					} else {
						info.dropZone = "RIGHT_OF_TILE";
						info.dropY = info.rowOverTop + pageTop + pageMargin;
						info.indicatorHeight_AddToRow = info.rowOverHeight;
						info.indicatorX_AddToRow = info.tileOverRight;
						info.tileOrder = info.tileOverOrder + 1;
					}
				}
			}
		} // Not on a row apparently…
		else {
			// Check if it's above the first row (above the page)
			if (y < 0) {
				info.dropZone = "ABOVE_PAGE";
				info.dropY = pageTop + pageMargin - dropYOffset;
				info.rowOrder = 1;
			}

			// Check if it's below the last row (below the page)
			if (y > rowTop) {
				info.dropZone = "BELOW_PAGE";
				info.dropY = nextRowTop + pageTop + pageMargin - dropYOffset;
				info.rowOrder = lastRowOrder + 1;
			}
		}

		return info;
	};

	return (
		<MetricsContext.Provider
			value={{
				metrics,

				getTileY,
				getTileWidthForUnit,
				getTileRect,
				getTileHeight,
				getTileForXY,

				getRowForY,
				getRowGapForXY,
				getRowAndSideForXY,
				getRowRect,
				getDropInfoForXY,

				getPageTop,
				getPageHeight,
				getContentHeight,
				//wheelY,

				scrollTileIntoView,
				scrollWindowToY,

				pointerX,
				pointerY,
				pointerInWindow,
			}}
		>
			{children}
		</MetricsContext.Provider>
	);
};

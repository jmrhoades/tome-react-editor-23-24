import React, { useState, createContext, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { TomeContext } from "./TomeContext";
import { useMotionValue, animate } from "framer-motion";
import { TILES } from "../tiles/TileConstants";

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
	dropIndicatorSize: 2,
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

	const getMetrics = () => {
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
		let scale = pageWidth / cPageWidth;
		tomeData.motion.pageScale.set(scale);

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
		//let pageHeightUnits = 0;

		/*
		// Find the rows belonging to the page
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		// Find the page height
		pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
			//pageHeightUnits += r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;
		*/

		if (pageHeight < minPageHeight) {
			pageHeight = minPageHeight;
		}

		if (pageHeight > window.innerHeight) {
			pageHeight += pageMinY;
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

	const getPageRect = () => {
		// Find all top-level frames
		const frames = tomeData.frames.filter(o => o.pageId === currentPage.id);

		// Sort by order
		frames.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Keep track of page height
		let units = 0;

		// Loop through each frame and add up the heights (in grid units)
		frames.forEach(frame => {
			units += frame.height;
		});

		let pageHeight = rowHeight * units + rowMargin * (units - 1);
		if (pageHeight < minPageHeight) pageHeight = minPageHeight;

		const rect = {
			x: pageLeft,
			y: pageTop,
			width: pageWidth,
			height: pageHeight,
		};
		return rect;
	};

	/*
		Get frame rect - LOCAL - RELATIVE TO TOP LEFT OF PAGE
	*/
	const getPageFrameRect = frame => {
		// Assumes that page-level frames are arranged vertically
		const x = columnWidth * frame.x + columnGutter * frame.x;
		const y = rowHeight * frame.y + rowMargin * frame.y;
		let width = columnWidth * frame.width + columnGutter * (frame.width - 1);
		let height = rowHeight * frame.height + rowMargin * (frame.height - 1);

		const rect = {
			x: x,
			y: y,
			width: width,
			height: height,
		};
		return rect;
	};

	/*
		Get tile rect - LOCAL - RELATIVE TO PARENT FRAME, TOP LEFT
	*/

	const getTileRect = tile => {
		const x = columnWidth * tile.x + columnGutter * tile.x;
		const y = rowHeight * tile.y + rowMargin * tile.y;
		const width = columnWidth * tile.width + columnGutter * (tile.width - 1);
		const height = rowHeight * tile.height + rowMargin * (tile.height - 1);
		const rect = {
			x: x,
			y: y,
			width: width,
			height: height,
		};
		return rect;
	};

	/*
		Get tile rect - GLOBAL - RELATIVE TO PAGE, TOP LEFT 
	*/

	const getTileRectInPage = tile => {
		// Get local rect first
		const rect = getTileRect(tile);

		// Find the frame the tile is in
		const frame = tomeData.frames.find(f => f.id === tile.frameId);

		// Get local rect of containing frame
		const frameRect = getPageFrameRect(frame);

		// Add up the position values to get global coordinates
		rect.x += frameRect.x;
		rect.y += frameRect.y;

		return rect;
	};

	const scrollTileIntoView = tile => {
		// Find
		const el = document.getElementById(tile.id);

		if (el) {
			const rect = el.getBoundingClientRect();
			const tileY = rect.y;
			const tileHeight = rect.height;

			const targetY = tileY - tileHeight / 2;
			const scrollY = window.scrollY;

			console.log("tileY", tileY);
			console.log("scrollY", scrollY);
			console.log("viewportHeight", viewportHeight);

			animate(scrollY, targetY, {
				type: "tween",
				ease: "easeInOut",
				duration: 0.5,
				onUpdate: v => {
					console.log(v);
					window.scroll({
						top: v,
					});
				},
			});
		}
	};

	const cacheTileClientRects = tiles => {
		//console.log(tiles);
		for (const tile of tiles) {
			const tileEl = document.getElementById(tile.id);
			if (tileEl) {
				const rect = tileEl.getBoundingClientRect();
				tile.rect = rect;
			}
			console.log(tile.rect.width);
		}
	};

	return (
		<MetricsContext.Provider
			value={{
				metrics,

				getPageRect,

				getPageFrameRect,

				getTileRect,
				cacheTileClientRects,
				getTileRectInPage,

				//getFrameRect,

				getPageHeight,
				getContentHeight,

				scrollTileIntoView,

				pointerX,
				pointerY,
				pointerInWindow,
			}}
		>
			{children}
		</MetricsContext.Provider>
	);
};

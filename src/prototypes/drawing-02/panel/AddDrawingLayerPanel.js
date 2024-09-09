import React from "react";
import { useMotionValue } from "framer-motion";

import { TomeContext, appendRowAtOrder } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { PanelWrap, Section } from "./Panels";
import { AddDrawingLayerButton } from "./controls/AddDrawingLayerButton";
import {
	TEXT,
	IMAGE,
	LINE,
	ARROW_LINE,
	ELLIPSE,
	ROUNDED_RECT,
	DIAMOND,
	TRIANGLE,
	PENTAGON,
	HEXAGON,
	PROGRESS_RING,
	PICTOGRAM,
	createShapeData,
} from "../tiles/drawing/LayerData";
import { syncLayerValues } from "../tiles/drawing/utilities";
import { TILES } from "../tiles/TileConstants";
import { LayerMap } from "../tiles/drawing/LayerData";
import { GRID_SIZE } from "../tiles/drawing/constants";

export const AddDrawingLayerPanel = props => {
	const {
		tomeData,
		currentPage,
		selectedTile,
		saveState,
		dropIndicatorInfo,
		appendNewTile,
		createTileInRowAtOrder,
		selectTile,
	} = React.useContext(TomeContext);

	const { metrics, getShapeDropInfoForXY, cacheTileRects, getTileRect, scrollTileIntoView } =
		React.useContext(MetricsContext);
	const { scale } = metrics;

	const pageScale = scale;
	const validDropScale = useMotionValue(1);

	const availableLayers = [
		ELLIPSE,
		TRIANGLE,
		ROUNDED_RECT,
		DIAMOND,
		PENTAGON,
		HEXAGON,

		LINE,
		ARROW_LINE,
		TEXT,
		IMAGE,
		PROGRESS_RING,
		PICTOGRAM,
	];

	const pageTiles = React.useRef([]);

	const getClickAddPosition = (newLayer, tile) => {
		const position = {};
		position.x = -newLayer.params.width / 2;
		position.y = -newLayer.params.height / 2;
		if (tile.clickAddCount) {
			position.x += GRID_SIZE * tile.clickAddCount;
			position.y += GRID_SIZE * tile.clickAddCount;
			tile.clickAddCount += 1;
		} else {
			tile.clickAddCount = 1;
		}
		return position;
	};

	const onLayerClick = type => {
		const lastTile = tomeData.tiles[tomeData.tiles.length - 1];
		console.log(lastTile.type);
		// Make new tile if needed
		let tile = null;
		if (selectedTile && selectedTile.params.layers) {
			tile = selectedTile;
		} else {
			tile = appendNewTile(TILES.DRAWING.name);
		}

		// Create the shape
		const newLayer = makeNewShape(type, tile.motion.zoom);

		// Center the shape or auto offset
		const position = getClickAddPosition(newLayer, tile);
		newLayer.params.x = position.x;
		newLayer.params.y = position.y;

		// Sync layer motion values with new size and position
		syncLayerValues(newLayer);

		// Add the shape
		tile.params.layers.push(newLayer);

		// Scroll tile into view if need be
		scrollTileIntoView(tile);
		saveState();
	};

	const isInsidePanel = (x, y) => {
		const r = props.panelRef.current.getBoundingClientRect();
		const w = r.width;
		const h = r.height;
		const px = props.panelX.get();
		const py = props.panelY.get();
		const right = px + w;
		const bottom = py + h;
		//console.log(props.panelX.get(), r, x, y)
		return px <= x && right >= x && py <= y && bottom >= y;
	};

	/*
	Drag and drop shape
	*/
	const onPointerDown = (shapeType, x, y) => {
		// Cache tile rects when before drag starts
		pageTiles.current = tomeData.tiles.filter(t => t.pageId === currentPage.id);
		cacheTileRects(pageTiles.current);
	};

	const onDragStart = () => {};

	const onDrag = (shapeType, x, y) => {
		const dropInfo = getShapeDropInfoForXY(x, y);
		dropInfo.isValid = false;
		dropIndicatorInfo.opacity.set(0);

		if (isInsidePanel(x, y)) return dropInfo;

		if (
			dropInfo.dropZone === "ABOVE_PAGE" ||
			dropInfo.dropZone === "BELOW_PAGE" ||
			dropInfo.dropZone === "IN_BETWEEN_ROWS"
		) {
			dropIndicatorInfo.y.set(dropInfo.dropY);
			dropIndicatorInfo.x.set(dropInfo.indicatorX_NewRow);
			dropIndicatorInfo.width.set(dropInfo.indicatorWidth_NewRow);
			dropIndicatorInfo.height.set(dropInfo.indicatorHeight_NewRow);
			dropIndicatorInfo.opacity.set(1);
			dropInfo.isValid = true;
			validDropScale.set(pageScale);
		}
		if (
			dropInfo.dropZone === "START_OF_ROW" ||
			dropInfo.dropZone === "END_OF_ROW" ||
			dropInfo.dropZone === "IN_BETWEEN_TILE" ||
			dropInfo.dropZone === "LEFT_OF_TILE" ||
			dropInfo.dropZone === "RIGHT_OF_TILE"
		) {
			dropIndicatorInfo.y.set(dropInfo.dropY);
			dropIndicatorInfo.x.set(dropInfo.indicatorX_AddToRow);
			dropIndicatorInfo.width.set(dropInfo.indicatorWidth_AddToRow);
			dropIndicatorInfo.height.set(dropInfo.indicatorHeight_AddToRow);
			dropIndicatorInfo.opacity.set(1);
			dropInfo.isValid = true;
			validDropScale.set(pageScale);
		}

		// Reset non-selected tile's selected border
		for (const tile of pageTiles.current) {
			tile.droppableBackgroundOpacity.set(0);
			if (selectedTile && selectedTile.id !== tile.id) {
				tile.droppableBackgroundOpacity.set(0);
			}
		}

		if (dropInfo.dropZone === "ON_SHAPE_TILE") {
			dropInfo.isValid = true;
			validDropScale.set(pageScale * dropInfo.tileOver.params.zoom);
			if (!dropInfo.tileOver.editing) dropInfo.tileOver.droppableBackgroundOpacity.set(1);
		}

		return dropInfo;
	};

	const onDrop = (shapeType, x, y) => {
		const dropInfo = getShapeDropInfoForXY(x, y);
		dropInfo.isValid = false;
		dropIndicatorInfo.opacity.set(0);
		if (isInsidePanel(x, y)) return dropInfo;
		let tile = null;

		if (
			dropInfo.dropZone === "ABOVE_PAGE" ||
			dropInfo.dropZone === "BELOW_PAGE" ||
			dropInfo.dropZone === "IN_BETWEEN_ROWS"
		) {
			const row = appendRowAtOrder(currentPage, tomeData, dropInfo.rowOrder);
			tile = createTileInRowAtOrder(TILES.DRAWING.name, row, 1);
			dropInfo.isValid = true;
		}

		if (
			dropInfo.dropZone === "START_OF_ROW" ||
			dropInfo.dropZone === "END_OF_ROW" ||
			dropInfo.dropZone === "IN_BETWEEN_TILE" ||
			dropInfo.dropZone === "LEFT_OF_TILE" ||
			dropInfo.dropZone === "RIGHT_OF_TILE"
		) {
			tile = createTileInRowAtOrder(TILES.DRAWING.name, dropInfo.rowOver, dropInfo.tileOrder);
			dropInfo.isValid = true;
		}

		if (dropInfo.tileOver && dropInfo.tileOver.type === TILES.DRAWING.name) {
			tile = dropInfo.tileOver;
			dropInfo.isValid = true;
		}

		if (dropInfo.isValid) {
			// Add the shape
			const newLayer = makeNewShape(shapeType, tile.motion.zoom);
			if (
				dropInfo.dropZone === "ABOVE_PAGE" ||
				dropInfo.dropZone === "BELOW_PAGE" ||
				dropInfo.dropZone === "IN_BETWEEN_ROWS"
			) {
				// const newTileRect = getTileRect(tile);
				// const dropX = x - newTileRect.left;
				// newLayer.params.x = (dropX - newTileRect.width / 2) / (pageScale * tile.params.zoom) - newLayer.params.width / 2;
			} else if (
				dropInfo.dropZone === "START_OF_ROW" ||
				dropInfo.dropZone === "END_OF_ROW" ||
				dropInfo.dropZone === "IN_BETWEEN_TILE" ||
				dropInfo.dropZone === "LEFT_OF_TILE" ||
				dropInfo.dropZone === "RIGHT_OF_TILE"
			) {
				//const newTileRect = getTileRect(tile);
				//const dropY = y - newTileRect.top;
				//newLayer.params.y = (dropY - newTileRect.height / 2) / (pageScale * tile.params.zoom) - newLayer.params.height / 2;
			} else if (dropInfo.dropZone === "ON_SHAPE_TILE") {
				const dropX = x - tile.rect.left;
				const dropY = y - tile.rect.top;
				newLayer.params.y =
					(dropY - tile.rect.height / 2) / (pageScale * tile.params.zoom) - newLayer.params.height / 2;
				newLayer.params.x =
					(dropX - tile.rect.width / 2) / (pageScale * tile.params.zoom) - newLayer.params.width / 2;

				//for (const tile of pageTiles.current) {
				//tile.droppableBackgroundOpacity.set(0);
				//}

				setTimeout(() => {
					tile.droppableBackgroundOpacity.set(0);
				}, 100);
			}
			syncLayerValues(newLayer);
			// Add shape to the tile
			tile.params.layers.push(newLayer);
			selectTile(tile);
			if (tile.setEditing) tile.setEditing(true);
			saveState();
		}

		return dropInfo;
	};

	const makeNewShape = (type, zoom) => {
		const newLayer = createShapeData(type, props.theme);
		newLayer.new = true;
		return newLayer;
	};

	return (
		<PanelWrap className="panelWrap">
			<Section>
				{/* <SectionTitle theme={props.theme}>Shapes</SectionTitle> */}
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						alignItems: "center",
						justifyContent: "center",
						gap: 6,
					}}
				>
					{availableLayers.map(info => (
						<AddDrawingLayerButton
							key={info.name}
							info={info}
							theme={props.theme}
							onClick={onLayerClick}
							onPointerDown={onPointerDown}
							onDragStart={onDragStart}
							onDrag={onDrag}
							onDrop={onDrop}
							validDropScale={validDropScale}
						/>
					))}
				</div>
			</Section>
		</PanelWrap>
	);
};

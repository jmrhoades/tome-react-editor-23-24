import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { transitions } from "../ds/Transitions";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { LayoutContext } from "../tome/LayoutContext";

import { TILES } from "../tiles/TileConstants";

import { TileText } from "../tiles/text/TileText";
import { TileImage } from "../tiles/image/TileImage";
import { DrawingTile } from "../tiles/drawing/DrawingTile";

import { TileSelectionBox } from "../tiles/TileSelectionBox";
import { TileDragSurface } from "./TileDragSurface";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const TileContent = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const FormatBarContainer = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

export const Tile = ({ tile }) => {
	const { currentPage, selectedTile, tomeData, isPlayMode, layoutTweaking, setSelectedTile } = React.useContext(TomeContext);
	const { metrics, getTileRect, getTileRectInPage } = React.useContext(MetricsContext);
	const { deleteTile, duplicateTile } = React.useContext(LayoutContext);
	const { tileCornerRadius, scale, columnCount } = metrics;

	const page = currentPage;

	// TILE STATES
	// SELECTED / DRAGGING  / EDITING

	// Selected state
	const selected = selectedTile && selectedTile.id === tile.id;
	tile.selected = selected;

	// Editing or focused state
	const [editing, setEditing] = React.useState(false);
	tile.setEditing = setEditing;
	tile.editing = editing;

	// Drag state
	const zIndex = useMotionValue(0);
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);

	//
	//const rect = getTileRect(tile);
	const rect = getTileRectInPage(tile);
	const tileTop = rect.x;
	const tileLeft = rect.y;
	const tileHeight = rect.height;
	const tileWidth = rect.width;

	const handleKeyDown = e => {
		console.log("Tile key down:", e.key);
		let doSomething = false;
		if (e.key === "Backspace") {
			// Delete tile
			deleteTile(tile);
		}
		if (e.key === "Escape") {
			doSomething = true;
			setSelectedTile(null);
		}

		if (e.key === "d") {
			if (e.ctrlKey || e.metaKey) {
				// Duplicate tile
				duplicateTile(tile);
				doSomething = true;
			}
		}

		if (doSomething) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	// Listen for keyboard events when tile is selected
	React.useEffect(() => {
		if (selected && !editing) {
			document.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selected, editing]);

	/*
	RESET EDITING
	*/
	React.useEffect(() => {
		if (!selected) {
			setEditing(false);
		}
	}, [selected]);

	/*
	RESET CLICK-ADD ANIMATION TRIGGER
	*/
	React.useEffect(() => {
		if (tile.showClickCreateAnimation) tile.showClickCreateAnimation = false;
	}, []);

	const formatBarContainerRef = React.useRef(null);

	console.log("Tile render", tile.id, tileLeft, tileTop, tileWidth, tileHeight);

	return (
		<Wrap
			className={"tile"}
			id={tile.id}
			style={{
				zIndex: zIndex,
			}}
			animate={{
				width: rect.width,
				height: rect.height,
				x: rect.x,
				y: rect.y,
			}}
			initial={false}
			transition={transitions.layoutTransition}
		>
			<TileContent
				style={{
					x: dragX,
					y: dragY,
				}}
				initial={{
					opacity: tile.showClickCreateAnimation ? 0 : 1,
					scale: tile.showClickCreateAnimation ? 0.95 : 1,
				}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				transition={transitions.layoutTransition}
			>
				<TileDragSurface tile={tile} dragX={dragX} dragY={dragY} selected={selected} zIndex={zIndex} />

				{tile.type === TILES.TEXT.name && (
					<TileText
						id={tile.id}
						blocks={tile.params.blocks}
						columnCount={columnCount}
						isSelected={selected}
						scale={scale}
						alignmentX={tile.params.alignmentX}
						alignmentY={tile.params.alignmentY}
						lineLength={tile.params.lineLength}
						theme={page.theme}
						tileWidth={tileWidth}
						tileUnitWidth={tile.width}
						tile={tile}
						deleteTile={deleteTile}
						onFileLoad={tile.onFileLoad}
						setTextTileFocussed={setEditing}
						editing={editing}
					/>
				)}

				{tile.type === TILES.IMAGE.name && (
					<TileImage
						
						theme={page.theme}
						tile={tile}
					/>
				)}

				{tile.type === TILES.DRAWING.name && (
					<DrawingTile
						theme={page.theme}
						tile={tile}
						pageScale={tomeData.motion.pageScale}
						tileHeight={tileHeight}
						tileWidth={tileWidth}
						borderRadius={tileCornerRadius}
						tileSelected={selected}
						tileEditing={editing}
						setTileEditing={setEditing}
						layoutTweaking={layoutTweaking}
						formatBarContainerRef={formatBarContainerRef}
						isPlayMode={isPlayMode}
					/>
				)}

				{/* <TileSelectionBox
					tile={tile}
					borderRadius={tileCornerRadius}
					theme={page.theme}
					isDragging={dragging}
					editing={editing}
					scale={scale}
					selected={selected}
				/> */}

				<FormatBarContainer
					ref={formatBarContainerRef}
					animate={{
						x: tileWidth / 2,
						y: tileHeight / 2,
					}}
					transition={transitions.layoutTransition}
					initial={false}
				/>
			</TileContent>
		</Wrap>
	);
};

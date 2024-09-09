import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import useSound from "use-sound";

import { transitions } from "../ds/Transitions";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext, appendRowAtOrder } from "../tome/TomeContext";
//import { TileWidthIndicatorStatic } from "./GridIndicator";

import { tileNames } from "../tiles/TileConstants";
import { TileText } from "../tiles/text/TileText";
import { TileImage } from "./TileImage";
import { TileVideo } from "./TileVideo";
import { TileTable } from "./TileTable";
import { TileCode } from "./TileCode";
import { TileWeb } from "./TileWeb";
import { TileTwitter } from "./TileTwitter";
import { TileGiphy } from "./TileGiphy";
import { TileAirtable } from "./TileAirtable";
import { TileFigma } from "./TileFigma";
import { TileDalle } from "./TileDalle";
import { TileFramer } from "./TileFramer";
import { TileDrawing } from "../tiles/drawing/DrawingTile";



const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
`;

const WrapInner = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const TileContent = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const HoverBackground = styled(TileContent)`
	pointer-events: none;
	transition: opacity 0.2s ease;
`;
const ReplaceCover = styled(HoverBackground)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LayoutCover = styled(ReplaceCover)`
	transition: opacity 0.5s ease;
`;

const TileDraggingShadow = styled(TileContent)`
	pointer-events: none;
	transition: opacity 0.2s ease;
`;

const SelectedOutline = styled(TileContent)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-style: solid;
	opacity: 0;
	/* transition: opacity 0.2s ease; */
`;

export const Tile = ({ tile, pageTop, page }) => {
	const {
		currentPage,
		selectedTile,
		rowResizing,
		setTileDragging,
		tomeData,
		showTileDropTarget,
		setIsTileAnimating,
		isPlayMode,
		setShowContextMenu,
		setContextMenuInfo,
		selectTile,
		tileHoveringId,
		contentTileHeightsList,
		deleteTile,
		tileReplaceId,
		dropIndicatorInfo,
		moveTileToRowAtOrder,
		textTileFocussed,
		setTextTileFocussed,
		layoutTweaking,
		setLayoutTweaking,
		isGenerating,
		requestDalleImageForTile,
		requestRewriteForTile,
		promptIsOpen,
		saveState,
	} = useContext(TomeContext);
	const { metrics, getDropInfoForXY } = useContext(MetricsContext);
	const {
		pageLeft,
		pageWidth,
		tileCornerRadius,
		minPageHeight,
		columnWidth,
		columnGutter,
		pageMargin,
		rowHeight,
		rowMargin,
		scale,
		columnCount,
		tileBorderSize,
		dropIndicatorSize,
	} = metrics;

	// 

	const { cRowCount, cColumnCount } = metricConstants;

	// console.log(tomeData.newTileID, tile.id);

	// The states of a draggable, resizable tile:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const isSelected = selectedTile && selectedTile.id === tile.id;
	const [isDragging, setIsDragging] = useState(false);

	const [isHovering, setIsHovering] = useState(false);
	//const isHovering = useMotionValue(0);
	const replaceHoverOpacity = useMotionValue(0);

	const [isAnimating, setIsAnimating] = useState(false);

	const [isLoaded, setIsLoaded] = useState(false);

	const [tempWidth, setTempWidth] = useState(0);
	const [tempHeight, setTempHeight] = useState(0);
	const [tempXOffset, setTempXOffset] = useState(0);
	const [tempYOffset, setTempYOffset] = useState(0);
	const oldTileWidth = useMotionValue(0);
	const oldTileHeight = useMotionValue(0);
	const tempLayoutData = useRef(null);

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	// const [runFrameLoop, setRunFrameLoop] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldSelectTile, setShouldSelectTile] = useState(false);

	// Use to set an offset for the scaled dragging tile
	const [dragStartOffsetLeft, setDragStartOffsetLeft] = useState(0.5);
	const [dragStartOffsetTop, setDragStartOffsetTop] = useState(0.5);
	// const dragStartOffsetX = useMotionValue(0);
	// const dragStartOffsetY = useMotionValue(0);

	// The rate at which boundary checking when dragging occurs
	//const [checkBoundariesThreshold, setCheckBoundariesThreshold] = useState(50);
	const checkBoundariesThreshold = 100;
	// Keep track of amount of time since last mouse move
	const timeSinceLastMove = useMotionValue(0);

	// The number of times a boundary condition must true
	// to warrant a change to the layout data
	// const boundarySuccess = 4;
	// const [boundarySuccessCount, setBoundarySuccessCount] = useState(0);

	// Explicit animations for the tile movement
	const tileAnimation = useAnimation();

	// Tile corner radius
	const borderRadius = tileCornerRadius;

	const tileSelectedColor = useMotionValue(page.theme.colors.accent);

	// All tiles in the same row & page
	const tiles = tomeData.tiles.filter(t => {
		return t.pageId === tile.pageId && t.rowId === tile.rowId;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

	// the row the tile is in
	let row = tomeData.rows.filter(r => {
		return r.id === tile.rowId;
	})[0];
	if (!row && tile.oldRow) row = tile.oldRow[0];

	// all the rows sorted by order
	let rows = tomeData.rows.filter(r => {
		return r.pageId === currentPage.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	if (tile.oldRows) rows = tile.oldRows;

	/*
	Is only tile on page?
	*/
	const isOnlyTile = rows.length === 1 && tiles.length === 1;
	/*
	tileWidth
	*/
	let tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);
	if (tempWidth > 0) {
		tileWidth = columnWidth * tempWidth + columnGutter * (tempWidth - 1);
	}
	if (tileWidth <= 0) {
		console.log("OMG IM ZERO", tileWidth);
		tileWidth = columnWidth * 2 + columnGutter * (2 - 1);
	}

	/*
	tileLeft
	*/
	let tileLeft = pageMargin;
	if (tile.order !== 1) {
		tiles.forEach(t => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (t.order < tile.order) {
				tileLeft += columnWidth * t.width + columnGutter * t.width;
			}
		});
	}

	/*
	TileTop
	TODO = centralize this functions so other components can use them
	*/
	let tileTop = pageMargin + pageTop;
	if (row.order !== 1) {
		rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < row.order) {
				tileTop +=
					r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
				tileTop += rowMargin;
			}
		});
	}

	/*
	tileHeight
	*/
	let tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);
	if (tempHeight > 0) {
		tileHeight = rowHeight * tempHeight + rowMargin * (tempHeight - 1);
	}

	//console.log("Rendering", tile.id, tileWidth, tileHeight, row.height, row.id)

	/*
	LOADED
	*/
	useEffect(() => {
		setIsLoaded(true);
	}, []);

	/*
	Z-INDEX
	*/

	const zIndex = useMotionValue(0);
	useEffect(() => {
		if (isDragging) {
			zIndex.set(3);
		} else if (isSelected) {
			zIndex.set(2);
		} else if (isHovering) {
			//zIndex.set(0);
		} else {
			zIndex.set(0);
		}
	}, [isSelected, isDragging, isHovering, isAnimating, zIndex]);

	useEffect(() => {
		if (!isSelected) {
			setIsHovering(false);
		}
	}, [isSelected]);

	/*
	Animate visual changes to tile when tome data changes
	*/
	useEffect(() => {
		const reset = () => {
			//console.log("DONE", tile.id);
			setIsAnimating(false);
			setIsTileAnimating(false);
			//tomeData.isTileAnimating = false;
		};
		const update = async () => {
			if (!isDragging) {
				await tileAnimation.start({
					y: tileTop,
					x: tileLeft,
					scaleX: 1,
					scaleY: 1,
					opacity: 1,
				});
				return await reset();
			} else {
				tileAnimation.start({
					//scaleX: 0.75,
					//scaleY: 0.75,
					//opacity: 0.667,
				});
			}
		};
		update();
		//console.log("UPDATE!", tile.id)
	}, [tileAnimation, tileTop, tileLeft, isDragging]);

	useEffect(
		() =>
			tileReplaceId.onChange(latest => {
				//console.log("tileReplaceId update", latest);
				if (tileReplaceId.get() === tile.id) {
					replaceHoverOpacity.set(1);
				} else {
					replaceHoverOpacity.set(0);
				}
			}),
		[tileReplaceId, tile.id, replaceHoverOpacity]
	);

	let iX = tileLeft;
	let iY = tileTop;
	let iWidth = tileWidth;
	let iHeight = tileHeight;
	let iScaleX = 1;
	let iScaleY = 1;
	let iOpacity = isLoaded ? 1 : 0;
	let isNewTile = false;
	if (tomeData.newTileID === tile.id) {
		isNewTile = true;
		iScaleX = 0;
		iScaleY = 0;
		iOpacity = 0;
		if (tomeData.newTileInfo) {
			// iWidth = tileDropInfo.draggableWidth;
			// iHeight = tileDropInfo.draggableHeight;
			iX = tomeData.newTileInfo.dropX - iWidth / 2 - tomeData.draggableOffsetX;
			iY = tomeData.newTileInfo.dropY - iHeight / 2 - tomeData.draggableOffsetY + pageMargin + window.scrollY;
			iScaleX = tomeData.draggableWidth / tileWidth;
			iScaleY = tomeData.draggableHeight / tileHeight;
		}
		tomeData.newTileID = null;
		tomeData.newTileInfo = null;
	}

	//const canBeBackground = tile.type === tileNames.IMAGE.name || tile.type === tileNames.VIDEO.name;
	const canBeBackground = false;
	
	
	

	const onTileRearrangeDrag = (x, y, config = { commit: false }) => {
		if (isOnlyTile) return false;

		const dropInfo = getDropInfoForXY(x, y, { replace: false, canBeBackground: canBeBackground });
		if (dropInfo.tileOverId !== tile.id) {
			//if (config.commit) console.log(dropInfo.dropZone);
			if (dropInfo.dropZone !== "NONE") {
				// console.log(dropInfo.hoverYPosition, dropInfo.hoverYRelative);
				dropIndicatorInfo.y.set(dropInfo.dropY);
				if (
					dropInfo.dropZone === "ABOVE_PAGE" ||
					dropInfo.dropZone === "BELOW_PAGE" ||
					dropInfo.dropZone === "ABOVE_TILE" ||
					dropInfo.dropZone === "BELOW_TILE"
				) {
					dropIndicatorInfo.x.set(dropInfo.indicatorX_NewRow);
					dropIndicatorInfo.width.set(dropInfo.indicatorWidth_NewRow);
					dropIndicatorInfo.height.set(dropInfo.indicatorHeight_NewRow);
					// Show indicator
					dropIndicatorInfo.opacity.set(1);
					if (config.commit) {
						// Create a new row and add new tiles to it
						const newRow = appendRowAtOrder(currentPage, tomeData, dropInfo.rowOrder);
						newRow.height = row.height;
						tile.width = columnCount;
						moveTileToRowAtOrder(tile, newRow, 1);
						//console.log("Move it!", tomeData);
						// Save changes
						//setTomeData({ ...tomeData });
						// Hide indicator
						dropIndicatorInfo.opacity.set(0);
					}
				}
				if (dropInfo.dropZone === "LEFT_OF_TILE" || dropInfo.dropZone === "RIGHT_OF_TILE") {
					dropIndicatorInfo.x.set(dropInfo.indicatorX_AddToRow);
					dropIndicatorInfo.width.set(dropInfo.indicatorWidth_AddToRow);
					dropIndicatorInfo.height.set(dropInfo.indicatorHeight_AddToRow);
					// Moving within same row
					if (dropInfo.rowOverId === row.id) {
						// If dragging tile order is less than tile over, subtract order by 1
						// If dragging tile order is higher than tile over, use order
						if (tile.order < dropInfo.tileOverOrder) dropInfo.tileOrder -= 1;
						if (dropInfo.tileOrder !== tile.order) {
							// Show indicator
							dropIndicatorInfo.opacity.set(1);
							if (config.commit) {
								// Same row, update tile orders
								moveTileToRowAtOrder(tile, dropInfo.rowOver, dropInfo.tileOrder);
								// Hide indicator
								dropIndicatorInfo.opacity.set(0);
							}
						} else {
							// Hide indicator
							dropIndicatorInfo.opacity.set(0);
						}
					} else {
						// Moving to a different row with other tiles
						// Show indicator
						dropIndicatorInfo.opacity.set(1);
						if (config.commit) {
							// Other row, update tile orders in old and new rows
							moveTileToRowAtOrder(tile, dropInfo.rowOver, dropInfo.tileOrder);
							// Save changes
							//setTomeData({ ...tomeData });
							// Hide indicator
							dropIndicatorInfo.opacity.set(0);
						}
					}
				}
				//console.log("dragOver", e.clientY, dropIndicatorY.get());
			} else {
				dropIndicatorInfo.opacity.set(0);
				//console.log("HIDE");
			}
		}
	};

	//console.log("Render", tile.id, tileTop, iY);

	return (
		<Wrap
			className={"tile"}
			id={tile.id}
			style={{
				zIndex: zIndex,
				originX: dragStartOffsetLeft,
				originY: dragStartOffsetTop,
				//cursor: isSelected ? (tile.type === tileNames.TEXT.name ? "text" : "default") : "default",
				width: tileWidth,
				height: tileHeight,
			}}
			initial={{
				x: iX,
				y: iY,
				//width: tileWidth,
				//height: tileHeight,
				opacity: iOpacity,
				scaleX: iScaleX,
				scaleY: iScaleY,
				originX: dragStartOffsetLeft,
				originY: dragStartOffsetTop,
			}}
			animate={tileAnimation}
			//transition={isNewTile ? transitions.newTileTransition : transitions.layoutTransition}
			transition={transitions.layoutTransition}
			onHoverStart={() => {
				//if (rowResizing === null && isPlayMode === false) setIsHovering(true);
				if (
					rowResizing === null &&
					!isPlayMode &&
					!isAnimating &&
					!isGenerating &&
					!isHovering &&
					!textTileFocussed &&
					!isSelected 
				) {
					//isHovering.set(1);
					setIsHovering(true);
					tileHoveringId.set(tile.id);
				}
				//if (isPlayMode === false) isHovering.set(1);
			}}
			onHoverEnd={() => {
				if (rowResizing === null && !isPlayMode && !isAnimating && !isGenerating && !textTileFocussed && !isSelected ) {
					setIsHovering(false);
					tileHoveringId.set(null);
					//isHovering.set(0);
				}
			}}
			onMouseDown={
				isPlayMode || isSelected || isDragging || isGenerating || textTileFocussed
					? null
					: e => {
							if (e.button === 2) return false;
							setShouldSelectTile(true);

							//document.body.classList.add("grabbing");
					  }
			}
			onMouseUp={
				isPlayMode || isSelected || isDragging || isGenerating || textTileFocussed
					? null
					: e => {
							if (e.button === 2) return false;
							if (shouldSelectTile) {
								selectTile(tile);
								setShouldSelectTile(false);
								//playTileSelectSound();
								//dropIndicatorInfo.opacity.set(0);
								//document.body.classList.remove("grabbing");
							}
					  }
			}
			//drag={isPlayMode || isAnimating || isSelected ? false : true}
			drag={isPlayMode || isGenerating || textTileFocussed || isOnlyTile ? false : true}
			dragMomentum={false}
			dragElastic={false}
			onDragStart={
				isPlayMode || isGenerating || isOnlyTile
					? null
					: (event, info) => {
							if (!layoutTweaking) setLayoutTweaking(true);

							/*
                Update pointer state
                */
							document.body.classList.add("grabbing");
							setShouldSelectTile(false);

							setIsDragging(true);
							setIsHovering(false);

							//isHovering.set(0);
							/*
				Find the pointer position relative to the tile's center point
                */
							const tilePointerCenterXOffset = info.point.x - pageLeft - tileLeft;
							const tilePointerCenterYOffset = info.point.y - tileTop;
							setDragStartOffsetLeft(tilePointerCenterXOffset / tileWidth);
							setDragStartOffsetTop(tilePointerCenterYOffset / tileHeight);
							//console.log("drag start", "offset x: ", info.point.x, tilePointerCenterXOffset, dragStartOffsetLeft);
							//console.log("offset y: ", info.point.y, tilePointerCenterYOffset, tileHeight, dragStartOffsetTop);
							/*

				Record pointer coordinates
				*/
							//pointerX.set(info.point.x);
							//pointerY.set(info.point.y);

							//oldTileWidth.set(tile.width);
							//oldTileHeight.set(row.height);

							// tempLayoutData.current = JSON.parse(JSON.stringify(tomeData));

							// if (selectedTile && selectedTile.id !== tile.id) {
							// 	selectTile(tile);
							// }

							setTileDragging(true);
					  }
			}
			onDragEnd={(event, info) => {
				setLayoutTweaking(false);
				/*	
                        Reset ghost tile offsets
                    */
				//setDragStartOffsetLeft(0);
				//setDragStartOffsetTop(0);

				/*	
                Reset pointer state
                */
				document.body.classList.remove("grabbing");
				onTileRearrangeDrag(event.clientX, event.clientY, { commit: true });
				dropIndicatorInfo.opacity.set(0);

				//setTimeout(() => {
				setIsDragging(false);
				setIsAnimating(true);
				setIsTileAnimating(true);
				setTileDragging(false);

				//}, 10);

				// setRunFrameLoop(false);
				// setTempWidth(0);
				// setTempHeight(0);
				// setTempXOffset(0);
				// setTempYOffset(0);

				//showTileDropTarget.set(false);

				//tempLayoutData.current = false;
				//dropIndicatorInfo.opacity.set(0);
			}}
			onDrag={(event, info) => {
				// console.log(info.velocity.x, info.velocity.y);
				let commit = false;
				const thresh = 100;
				if (Math.abs(info.velocity.x) > thresh || Math.abs(info.velocity.y) > thresh) {
					commit = true;
				}

				/*
				Record pointer coordinates
				*/
				pointerX.set(info.point.x);
				pointerY.set(info.point.y);
				if (!isAnimating) {
					onTileRearrangeDrag(event.clientX, event.clientY, { commit: false });
				}
			}}
			onContextMenu={e => {
				//console.log("right click!", e);
				// setContextMenuInfo({
				// 	x: e.clientX,
				// 	y: e.clientY,
				// 	items: ["Cut", "Copy", "Paste", "Replace", "Delete", "Dynamic Background"],
				// });
				// if (!isSelected) selectTile(tile);
				// setShowContextMenu(true);

				e.preventDefault();
			}}
		>
			<WrapInner
				animate={{
					width: tileWidth,
					height: tileHeight,
					x: tempXOffset,
					y: tempYOffset,
				}}
				initial={{
					width: iWidth,
					height: iHeight,
				}}
				transition={transitions.layoutTransition}
			>
				<TileDraggingShadow
					style={{
						//backgroundColor: page.theme.colors.backgrounds.tile.dragging,
						//backgroundColor: page.theme.colors.z1,
						backgroundColor: page.theme.colors.t0,
						boxShadow: page.theme.shadows.large,
						borderRadius: borderRadius,
						//border: `2px solid ${page.theme.colors.z5}`,
						opacity: isDragging ? 1 : 0,
					}}
					// animate={{

					// }}
					// transition={{
					// 	duration: 0.1,
					// }}
					// initial={false}
				/>

				<HoverBackground
					className="hover"
					style={{
						//background: page.theme.colors.backgrounds.tile.hover,
						backgroundColor: page.theme.colors.z1,
						borderRadius: borderRadius,
						opacity: layoutTweaking ? 1 : isHovering && !isSelected ? 1 : 0,
					}}
				/>

				<TileContent
					transition={{
						duration: 0.2,
					}}
					//animate={{ borderRadius: borderRadius }}
					style={{
						//WebkitMaskImage: "-webkit-radial-gradient(white, black)",
						background: tile.params.backgroundColor,
						pointerEvents: isSelected ? "auto" : "none",
					}}
				>
					{tile.type === tileNames.TEXT.name && (
						<TileText
							id={tile.id}
							blocks={tile.params.blocks}
							columnCount={columnCount}
							isSelected={isSelected}
							//onContentSizeChange={onContentSizeChange}
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
							//textTileFocussed={textTileFocussed}
							setTextTileFocussed={setTextTileFocussed}
							//isGenerated={tile.params.isGenerated}
							isGenerating={isGenerating}
							requestRewriteForTile={requestRewriteForTile}
							isOnlyTile={isOnlyTile}
						/>
					)}
					{tile.type === tileNames.IMAGE.name && (
						<TileImage
							image={tile.params.image}
							deviceImage={tile.params.deviceImage}
							imageSize={tile.params.imageSize}
							imagePosition={tile.params.imagePosition}
							rowHeight={row.height}
							tileWidth={tileWidth}
							tileUnitWidth={tile.width}
							theme={page.theme}
							caption={tile.params.caption}
							paddingY={tile.params.paddingY}
							isSelected={isSelected}
							tileId={tile.id}
							tile={tile}
							row={row}
							tomeData={tomeData}
							saveState={saveState}
							prompt={tile.params.prompt}
							requestDalleImageForTile={requestDalleImageForTile}
							isGenerating={isGenerating}
						/>
					)}
					{tile.type === tileNames.VIDEO.name && (
						<TileVideo
							video={tile.params.video}
							autoPlay={tile.params.autoPlay}
							image={tile.params.image}
							rowHeight={row.height}
							tileUnitWidth={tile.width}
							tileWidth={tileWidth}
							theme={page.theme}
							caption={tile.params.caption}
							isSelected={isSelected}
							rowResizing={rowResizing}
							tileId={tile.id}
							row={row}
							tile={tile}
						/>
					)}
					{tile.type === tileNames.DRAWING.name && (
						<TileDrawing
							theme={page.theme}
							tile={tile}
							isSelected={isSelected}
							tileSelectedColor={tileSelectedColor}
							tileHeight={tileHeight}
							tileWidth={tileWidth}
							layoutTweaking={layoutTweaking}
							saveState={saveState}
							borderRadius={borderRadius}
							isOnlyTile={isOnlyTile}
						/>
					)}

					{tile.type === tileNames.TABLE.name && (
						<TileTable
							scale={scale}
							rowHeight={row.height}
							tileWidth={tileWidth}
							tileUnitWidth={tile.width}
							title={tile.params.title}
							header={tile.params.header}
							rows={tile.params.rows}
							columns={tile.params.columns}
							theme={page.theme}
							isSelected={isSelected}
						/>
					)}

					{tile.type === tileNames.CODE.name && (
						<TileCode
							rowHeight={row.height}
							tileWidth={tile.width}
							tileSize={tile.width}
							columnCount={columnCount}
							theme={page.theme}
						/>
					)}
					{tile.type === tileNames.WEB.name && (
						<TileWeb rowHeight={row.height} tileWidth={tile.width} theme={page.theme} isSelected={isSelected} />
					)}
					{tile.type === tileNames.TWITTER.name && (
						<TileTwitter
							rowHeight={row.height}
							tileWidth={tileWidth}
							tileUnitWidth={tile.width}
							data={tile.params}
							theme={page.theme}
							isSelected={isSelected}
							//onContentSizeChange={onContentSizeChange}
						/>
					)}

					{tile.type === tileNames.GIPHY.name && (
						<TileGiphy rowHeight={row.height} tileWidth={tile.width} theme={page.theme} isSelected={isSelected} />
					)}
					{tile.type === tileNames.AIRTABLE.name && (
						<TileAirtable
							rowHeight={row.height}
							tileWidth={tile.width}
							theme={page.theme}
							isSelected={isSelected}
						/>
					)}
					{tile.type === tileNames.FIGMA.name && (
						<TileFigma
							rowHeight={row.height}
							tileWidth={tile.width}
							isSelected={isSelected}
							theme={page.theme}
							src={tile.params.src}
						/>
					)}
					{tile.type === tileNames.FRAMER.name && (
						<TileFramer
							rowHeight={row.height}
							tileWidth={tile.width}
							isSelected={isSelected}
							theme={page.theme}
							src={tile.params.src}
						/>
					)}
					{tile.type === tileNames.DALLE.name && (
						<TileDalle
							rowHeight={row.height}
							tileWidth={tile.width}
							isSelected={isSelected}
							theme={page.theme}
							src={tile.params.src}
						/>
					)}
				</TileContent>

				{/* {tile.type !== tileNames.IMAGE.name && tile.type !== tileNames.VIDEO.name && (
					<LayoutCover
						style={{
							background: page.theme.colors.backgrounds.tile.hover,
							borderRadius: borderRadius,
							opacity: layoutTweaking && !isDragging ? 1 : 0,
						}}
					/>
				)} */}

				<ReplaceCover
					style={{
						background: "#120712", //page.theme.colors.z1,
						borderRadius: borderRadius,
						opacity: replaceHoverOpacity,
						boxShadow: `0 0 0 ${tileBorderSize}px ${page.theme.colors.accent}`,
					}}
				>
					<p
						style={{
							color: page.theme.colors.t8,
						}}
					>
						Drop to replace
					</p>
				</ReplaceCover>

				{/* <ResizeCover
					style={{
						//boxShadow: `0 0 0 ${tileBorderSize}px ${page.theme.colors.t2}`,
						borderRadius: borderRadius,
						backgroundColor: page.theme.colors.t1,
					}}
					animate={{
						opacity: (rowResizing && rowResizing.id === row.id) || layoutTweaking ? 1 : 0,
					}}
					transition={{
						duration: 0.2,
					}}
					initial={false}
				/> */}

				{/* <DraggingCover
					style={{
						backgroundColor: page.theme.colors.backgrounds.tile.dragging,
						borderRadius: borderRadius,
					}}
					animate={{
						opacity: isDragging ? 1 : 0,
					}}
					transition={{
						duration: 0.2,
					}}
					initial={false}
				/> */}

				<SelectedOutline
					style={{
						//boxShadow: `0 0 0 ${tileBorderSize}px ${page.theme.colors.accent}`,
						x: -2,
						y: -2,
						width: `calc(100% + 4px)`,
						height: `calc(100% + 4px)`,
						borderWidth: 2,
						borderStyle: "solid",
						borderColor: tileSelectedColor,
						borderRadius: borderRadius,
						opacity: isSelected && !isDragging && !layoutTweaking ? 1 : 0,
					}}
					// animate={{
					// 	//opacity: (isSelected || (rowResizing && rowResizing.id === row.id)) && !isDragging ? 1 : 0,
					// 	//opacity: isSelected && !rowResizing ? 1 : 0,
					// 	opacity: isSelected && !isDragging && !layoutTweaking ? 1 : 0,
					// 	//opacity: isSelected ? 1 : 0,
					// }}
					// transition={{ duration: 0.1 }}
					// initial={false}
				/>
			</WrapInner>
		</Wrap>
	);
};

import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, animate } from "framer-motion";
import useSound from "use-sound";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";
import { Tooltip } from "../ds/Tooltip";



const ResizeHandle = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	/* z-index: 9999; */
	/* background-color: rgba(255,0,0,0.5); */
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
`;

export const TileResizeControl = props => {
	const { getPageHeight, metrics } = useContext(MetricsContext);

	const {
		pageWidth,
		pageLeft,
		pageMargin,
		minPageHeight,
		columnCount,
		columnWidth,
		columnGutter,
		rowHeight,
		rowMinHeight,
		rowMargin,
		scale,
		columnMinWidth,
		columnMaxWidth,
		tileCornerRadius,
	} = metrics;
	const {
		tomeData,
		setTomeData,
		setRowResizing,
		rowResizing,
		isPlayMode,
		isTileAnimating,
		setContextMenuInfo,
		setShowContextMenu,
		saveState,
		layoutTweaking,
		setLayoutTweaking,
	} = useContext(TomeContext);

	const [handleDown, setHandleDown] = useState(false);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);
	const [tooltipVisible, setTooltipVisible] = useState(false);

	/*
	Colors
	*/
	const colors = {};
	colors.handle = props.page.theme.colors.controls.resize.handle;
	colors.handleActive = props.page.theme.colors.controls.resize.handleActive;
	colors.handleWarning = props.page.theme.colors.controls.resize.handleWarning;
	colors.indicatorForeground = props.page.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = props.page.theme.colors.controls.resize.indicatorWarning;
	const handleColor = useMotionValue(colors.handle);
	const warningMinWidthColor = useMotionValue(colors.indicatorForeground);
	const warningMaxWidthColor = useMotionValue(colors.indicatorForeground);

	

	/*
	tileLeft = handle left
	*/
	let handleLeft = pageMargin;
	if (props.tile.order !== 1) {
		props.tiles.forEach(t => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (t.order < props.tile.order) {
				handleLeft += columnWidth * t.width + columnGutter * t.width;
			}
		});
	}
	handleLeft -= columnGutter;

	let gridPoint = Math.round(handleLeft / (columnWidth + columnGutter));
	if (handleDown) props.row.handleLeft = Math.round(handleLeft);
	//console.log(handleLeft)

	/*
	Handle Y
	*/
	let handleTop = pageMargin + props.pageTop;
	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop +=
					r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
				handleTop += rowMargin;
			}
		});
	}

	/*
	Handle Width & X
	*/
	const hitPadding = 10;
	const handleOffset = -hitPadding * scale;
	const handleWidth = columnGutter + hitPadding * 2 * scale;

	/*
	Handle Height
	*/
	let handleSize = columnGutter / 2;
	if (columnGutter < 4) handleSize = 4;
	if (columnGutter > 20) handleSize = 6;

	const rHeight = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	const handleRef = useRef(null);

	const leftTile = props.tiles.find(({ order }) => order === props.tile.order - 1);
	const leftTiles = props.tiles.filter(({ order }) => order < props.tile.order);
	const rightTiles = props.tiles.filter(({ order }) => order >= props.tile.order);
	let leftTileX = 0;
	props.tiles.forEach(t => {
		if (t.order < leftTile.order) {
			leftTileX += t.width;
		}
	});
	const rightTile = props.tile;
	//let rightTileX = leftTileX + leftTile.width;
	//console.log(props.tiles, leftTileX, rightTileX);

	const indicatorY = useMotionValue(0);
	const indicatorX = useMotionValue(0);
	const mouseDownY = useMotionValue(0);
	const clientY = useMotionValue(0);
	const handleYPercent = useMotionValue(0);
	const saveRowHeight = useMotionValue(0);
	const mouseDownGridPoint = useMotionValue(0);
	const pressedKey = useMotionValue("");

	//console.log(handleLeft + handleOffset, handleTop)

	/*
	Matching size
	*/
	let matchingSize = false;

	if (
		rowResizing &&
		rowResizing.id !== props.row.id &&
		rowResizing.isResizingWidth &&
		Math.round(rowResizing.handleLeft) === Math.round(handleLeft)
	) {
		matchingSize = true;
	}
	//if (rowResizing) console.log(Math.round(rowResizing.handleLeft), Math.round(handleLeft));

	/*
	Event Handlers
	*/
	const mouseDown = e => {
		if (e.button === 2) return false;
		console.log("onMouseDown");
		if (!layoutTweaking) setLayoutTweaking(true);
		setHandleDown(true);
		setTooltipVisible(false);
		if (isPlayMode) return false;

		handleColor.set(colors.handleActive);

		const rect = handleRef.current.getBoundingClientRect();
		let newY = e.clientY - rect.y;
		clientY.set(e.clientY);
		indicatorY.set(newY);
		indicatorX.set(e.clientX - rect.x);
		mouseDownY.set(newY);
		//console.log("e.clientY", e.clientY);
		handleYPercent.set(newY / rect.height);
		saveRowHeight.set(rHeight);

		props.row.isResizingWidth = true;
		props.row.tempPageHeight = getPageHeight(props.page);
		props.row.handleYPercent = handleYPercent.get();
		props.row.indicatorY = e.clientY;
		props.row.tileResizeId = props.id;
		//props.row.indicatorX = handleLeft + (columnGutter * scale) / 2;
		props.row.warningMinWidthColor = warningMinWidthColor;
		props.row.warningMaxWidthColor = warningMaxWidthColor;
		props.row.leftTile = leftTile;
		props.row.rightTile = rightTile;

		let gridPoint = Math.round(handleLeft / (columnWidth + columnGutter));
		mouseDownGridPoint.set(gridPoint);
		props.tiles.forEach(t => {
			t.cachedWidth = t.width;
		});

		props.row.handleLeft = Math.round(handleLeft);
		setRowResizing(props.row);

		
		//console.log(rect.y, e.clientY, newY, newY / rect.height);

		document.body.classList.add("no-cursor");
	};

	const mouseUp = e => {
		onEnd();
	};

	const hoverStart = e => {
		if (rowResizing === null && isPlayMode === false) {
			//document.body.classList.add("ew-cursor");
			setHandleHovered(true);
			setTooltipVisible(true);
		}
	};

	const hoverEnd = e => {
		//if (!handlePanning) document.body.classList.remove("ew-cursor");
		setHandleHovered(false);
		setTooltipVisible(false);
	};

	const panStart = e => {
		setHandlePanning(true);
		
	};

	const pan = (event, info) => {
		//console.log(info.point.x)
		const x = info.point.x;
		if (x >= pageLeft && x <= pageLeft + pageWidth) {
			let shouldUpdateWidths = false;
			// what 12-col grid point is the pointer closest to?
			let gridPoint = Math.round((x - pageLeft - pageMargin) / (columnWidth + columnGutter));

			//console.log("gridPoint", gridPoint)

			const gridDiff = Math.round(gridPoint - (leftTileX + leftTile.width));

			if (gridDiff !== 0 && gridPoint !== mouseDownGridPoint.get()) {
				//console.log("gridPoint", gridPoint, gridDiff, leftTile.width, rightTile.width)
				//console.log("gridPoint", gridPoint, gridDiff);
				//console.log("Key: ", pressedKey.get());

				if (pressedKey.get() === "Alt") {
					// Adjacent to handle
					if (leftTile.width + gridDiff < columnMinWidth || rightTile.width - gridDiff < columnMinWidth) {
						handleColor.set(colors.handleWarning);
					} else {
						handleColor.set(colors.handleActive);
						leftTile.width += gridDiff;
						rightTile.width -= gridDiff;
						
					}
				} else {
					//Proportional (split units), always redistributes
					if (gridPoint / leftTiles.length >= 1 && (columnCount - gridPoint) / rightTiles.length >= 1) {
						leftTiles.forEach(t => {
							t.width = gridPoint / leftTiles.length;
						});
						rightTiles.forEach(t => {
							t.width = (columnCount - gridPoint) / rightTiles.length;
						});
						handleColor.set(colors.handleActive);
						
					} else {
						handleColor.set(colors.handleWarning);
					}
				}

				/*
				// True proportional resizing: splits units
				leftTiles.forEach(t => {
					t.width += (gridDiff/leftTiles.length);
				});
				rightTiles.forEach(t => {
					t.width -= (gridDiff/rightTiles.length);
				});
				*/

				shouldUpdateWidths = true;
				mouseDownGridPoint.set(gridPoint);
			}

			//
			// Update row height if width resize causes content height to exceed current row height
			//
			let newHeight = 0;
			props.tiles.forEach(t => {
				// find tile with tallest content height at updated widths
				if (t.contentUnitHeights && t.contentUnitHeights[t.width]) {
					if (t.contentUnitHeights[t.width] > newHeight) newHeight = t.contentUnitHeights[t.width];
				}
			});
			if (newHeight > props.row.height) {
				let totalRowHeights = 0;
				props.rows.forEach(r => {
					if (r.id !== props.row.id) {
						totalRowHeights += r.height;
					}
				});
				//console.log(totalRowHeights, newHeight, rowMinHeight);
				if (totalRowHeights + newHeight < rowMinHeight) {
					props.row.height = rowMinHeight - totalRowHeights;
				} else {
					props.row.height = newHeight;
				}
			}

			if (shouldUpdateWidths) {
				// See if indicator is going to go off the handle
				//checkIndicatorPosition();

				setTomeData({ ...tomeData });
				//console.log("SET DATA", gridPoint);
			}
		}
	};

	const panEnd = e => {
		setHandlePanning(false);
		onEnd();
	};

	const onEnd = () => {
		//console.log("onEnd");

		//pageScrollY.set(getPageTop(props.page));

		props.row.isResizingWidth = undefined;
		setHandleDown(false);
		setRowResizing(null);
		handleColor.set(colors.handle);
		setLayoutTweaking(false);
		document.body.classList.remove("no-cursor");
	};

	useEffect(() => {
		const onKeyDown = e => {
			const key = e.key;
			//console.log("New Key!", "key", key, e);
			//e.preventDefault();
			//e.stopPropagation();
			if (e.altKey) {
				pressedKey.set(key);
			}

			//e.preventDefault();
			//return false;
		};

		const onKeyUp = ({ key }) => {
			pressedKey.set("");
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	return (
		<ResizeHandle
			ref={handleRef}
			style={{
				//height: rHeight,
				width: handleWidth,
				cursor: "ew-resize",
				// backgroundColor: "red",
			}}
			// initial={{
			// 	x: handleLeft + handleOffset,
			// 	y: handleTop,
			// }}
			animate={{
				x: handleLeft + handleOffset,
				y: handleTop,
				height: rHeight,
			}}
			transition={transitions.layoutTransition}
			onPointerDown={isTileAnimating ? undefined : mouseDown}
			onPointerUp={isTileAnimating ? undefined : mouseUp}
			onHoverStart={isTileAnimating ? undefined : hoverStart}
			onHoverEnd={isTileAnimating ? undefined : hoverEnd}
			onPanStart={isTileAnimating ? undefined : panStart}
			onPanEnd={isTileAnimating ? undefined : panEnd}
			onPan={isTileAnimating ? undefined : pan}
			onContextMenu={e => {
				//console.log("right click!", e);
				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: ["DistributeW"],
					callback: () => {
						props.tiles.forEach((t, i) => {
							t.width = metricConstants.cColumnCount / props.tiles.length;
							saveState();
						});
					},
				});
				setShowContextMenu(true);
				e.preventDefault();
			}}
		>
			<ResizeHandleMaterial
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: handleHovered || handlePanning || handleDown || matchingSize ? 1 : 0,
				}}
				transition={transitions.quick}
				style={{
					backgroundColor: handleColor,
					left: "50%",
					x: "-50%",
					width: 4,
					height: 56,
					borderRadius: 2,
					top: "50%",
					y: "-50%",
				}}

				//onHoverStart={() => {setTooltipVisible(true)}}
				//onHoverEnd={() => {setTooltipVisible(false)}}
			>
				{props.tiles.length > 2 && (
					<Tooltip
						key="resizeTooltip"
						theme={props.page.theme}
						label={"Resize adjacent tiles"}
						shortcuts={["⌥", "↔"]}
						visible={tooltipVisible}
						side={gridPoint > 6 ? "left" : "right"}
					/>
				)}
			</ResizeHandleMaterial>

			<motion.svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					position: "absolute",
					top: -11,
					left: -11,
					y: indicatorY,
					x: indicatorX,
				}}
				animate={{
					opacity: handleDown ? 1 : 0,
				}}
				transition={{ duration: 0 }}
			>
				<g filter="url(#filter0_d_38_735)">
					<path
						d="M5.41 12L9 8.41V11H15V8.42L18.58 12L15 15.59V13H9V15.59L5.41 12ZM4 12L10 18V14H14V18L20 12L14 6V10H10V6L4 12Z"
						fill="white"
					/>
					<path
						d="M12.4999 12.9999H15.0199V15.5899L18.5799 11.9999L15.0199 8.41992V11.0199H12.4999H8.99991V8.41992L5.40991 11.9999L8.99991 15.5899V12.9999H12.4999Z"
						fill="black"
					/>
				</g>
				<defs>
					<filter id="filter0_d_38_735" x="2.2" y="5.2" width="19.6" height="15.6" filterUnits="userSpaceOnUse">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="0.9" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_38_735" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_38_735" result="shape" />
					</filter>
				</defs>
			</motion.svg>
		</ResizeHandle>
	);
};

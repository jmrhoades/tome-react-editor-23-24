import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";

import useSound from "use-sound";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";



const ResizeHandle = styled(motion.div)`
	position: absolute;
	top: 0;
	
	/* z-index: 9999; */
	/* background-color: rgba(0,255,0,0.5); */
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 50%;
	overflow: hidden;
	transition: opacity 0.2s ease-out;
`;

const Indicator = styled(motion.div)`
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px;
	gap: 6px;
	border-radius: 8px;
	min-width: 40px;
	text-align: center;

	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
`;

const IconLabelGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 4px;
`;

export const RowResize = props => {
	const { metrics, getPageHeight, checkWheel } = useContext(MetricsContext);
	const { pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount, scale, tileCornerRadius } = metrics;
	const {
		saveState,
		tomeData,
		deselectTiles,
		setRowResizing,
		rowResizing,
		isTileAnimating,
		isPlayMode,
		setShowContextMenu,
		setContextMenuInfo,
		layoutTweaking,
		setLayoutTweaking,
		promptIsOpen,
		userDragging,
	} = useContext(TomeContext);

	const [handleDown, setHandleDown] = useState(false);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);
	const handleRef = useRef(null);

	/*
	Colors
	*/
	const colors = {};
	colors.handle = props.page.theme.colors.controls.resize.handle;
	colors.handleActive = props.page.theme.colors.accent; //props.page.theme.colors.controls.resize.handleActive;
	colors.handleWarning = props.page.theme.colors.controls.resize.handleWarning;
	colors.indicatorBackground = props.page.theme.colors.controls.resize.indicatorBackground;
	colors.indicatorForeground = props.page.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = props.page.theme.colors.controls.resize.indicatorWarning;
	const handleColor = useMotionValue(colors.handle);
	const handleOpacity = useMotionValue(0);
	const warningMinHeightColor = useMotionValue(colors.indicatorForeground);

	const warningMinWidthOpacity = useMotionValue(0);

	let handleSize = rowMargin / 2;
	if (handleSize < 4) handleSize = 4;
	if (handleSize > 6) handleSize = 6;


	const mouseY = useMotionValue(0);
	const indicatorX = useMotionValue(0);
	const indicatorY = useMotionValue(0);

	/*
	Handle Height & Y
	*/
	const hitPadding = 10;
	const handleHeight = rowMargin + hitPadding * 2 * scale;
	const handleOffset = -hitPadding * scale;
	const r = props.row;
	const rowTop = props.pageTop + pageMargin;
	const rHeight = rowHeight * r.height + rowMargin * (r.height - 1);
	const rowBottom = rowTop + rHeight;
	let handleTop = rowBottom + handleOffset;
	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop += r.height === 0 ? minPageHeight - pageMargin * 1 : rowHeight * r.height + rowMargin * r.height;
			}
		});
	}

	let matchingSize = false;
	if (
		rowResizing &&
		rowResizing.id !== props.row.id &&
		rowResizing.height === props.row.height &&
		rowResizing.isResizingHeight
	) {
		matchingSize = true;
		indicatorX.set(rowResizing.indicatorX);
		warningMinHeightColor.set(colors.indicatorForeground);
		//handleColor.set(colors.handleWarning)
	}

	/*
	const updateCursor = rowHeight => {
		if (props.tiles.length === 1) {
			if (rowHeight === props.tiles[0].height12) {
				document.body.style.cursor = "s-resize";
			} else {
				document.body.style.cursor = "ns-resize";
			}
		}

		if (props.tiles.length === 2) {
			if (rowHeight === props.tiles[0].height6 || rowHeight === props.tiles[1].height6) {
				document.body.style.cursor = "s-resize";
			} else {
				document.body.style.cursor = "ns-resize";
			}
		}
	};
	*/

	const onPointerUp = e => {
		setHandleDown(false);
		setLayoutTweaking(false);
		props.row.isResizingHeight = undefined;
		handleColor.set(colors.handle);
		setRowResizing(null);
		//document.body.classList.remove("no-cursor");

		warningMinHeightColor.set(colors.indicatorForeground);
		warningMinWidthOpacity.set(0);
		document.body.classList.remove("no-cursor");
	};

	React.useEffect(() => {
		if (handleDown) {
			window.addEventListener("mouseup", onPointerUp);
		}
		return function cleanup() {
			window.removeEventListener("mouseup", onPointerUp);
		};
	}, [handleDown]);

	// Disable interactivity if the user is dragging something around the screen
	const pointerEvents = useMotionValue("auto");
	useMotionValueEvent(userDragging, "change", latest => {
		if (latest === true) {
			pointerEvents.set("none");
		} else {
			pointerEvents.set("auto");
		}
	});

	return (
		<ResizeHandle
			ref={handleRef}
			onHoverStart={layoutTweaking && !handleDown ? undefined : () => handleOpacity.set(1)}
			onHoverEnd={layoutTweaking && !handleDown ? undefined :(event, info) => {
				//if (!handlePanning) document.body.classList.remove("ns-cursor");
				//setHandleHovered(false);
				if (!handlePanning) handleOpacity.set(0);
			}}
			onMouseDown={layoutTweaking && !handleDown ? undefined :e => {
				if (isPlayMode) return false;
				setHandleDown(true);
				setLayoutTweaking(true);
				deselectTiles()
				props.row.isResizingHeight = true;
				setRowResizing(props.row);
				//
				const rect = handleRef.current.getBoundingClientRect();
				const newX = e.clientX - rect.x;
				indicatorX.set(newX);
				indicatorY.set(e.clientY - rect.y);
				props.row.indicatorX = newX;
				props.row.tempPageHeight = getPageHeight(props.page);

				handleColor.set(colors.handleActive);
				document.body.classList.add("ns-cursor");
			}}
			onPanStart={layoutTweaking && !handleDown ? undefined :(event, info) => {
				if (isPlayMode) return false;
				setHandlePanning(true);
			}}
			onPanEnd={layoutTweaking && !handleDown ? undefined :(event, info) => {
				setLayoutTweaking(false);
				setHandleDown(false);
				props.row.isResizingHeight = undefined;
				setHandlePanning(false);
				setHandleHovered(false);
				setRowResizing(null);
				handleColor.set(colors.handle);
				document.body.classList.remove("ns-cursor");
				handleOpacity.set(0);
				//checkWheel();
			}}
			onPan={layoutTweaking && !handleDown ? undefined :(event, info) => {
				if (isPlayMode) return false;

				mouseY.set(info.point.y);
				// for this row, find the gridpoint of the pointer position
				let y = info.point.y - props.pageTop;
				let totalRowHeights = 0;
				props.rows.forEach(r => {
					if (r.order < props.row.order) {
						y -= rowHeight * r.height + rowMargin * r.height;
					}
				});
				props.rows.forEach(r => {
					if (r.id !== props.row.id) {
						totalRowHeights += r.height;
					}
				});

				// Find current row unit height
				let gridPoint = Math.round(y / (rowHeight + rowMargin));
				//console.log(totalRowHeights, gridPoint, totalRowHeights + gridPoint);

				// Check if row is tall enough
				if (gridPoint < rowMinHeight) gridPoint = rowMinHeight;
				if (gridPoint === rowMinHeight) {
					warningMinWidthOpacity.set(1);
					handleColor.set(colors.handleWarning);
					warningMinHeightColor.set(colors.indicatorWarning);
					return false;
				}

				if (props.row.height !== gridPoint) {
					/*
					// Stop resizing if the tile content height is greater than row height
					if (props.tiles[0] && props.tiles[0].contentUnitHeights) {
						if (props.tiles[0].contentUnitHeights[props.tiles[0].width] > gridPoint) {
							warningMinWidthOpacity.set(1);
							handleColor.set(colors.handleWarning);
							warningMinHeightColor.set(colors.indicatorWarning);
							return false;
						}
					}
					if (props.tiles[1] && props.tiles[1].contentUnitHeights) {
						if (props.tiles[1].contentUnitHeights[props.tiles[1].width] > gridPoint) {
							warningMinWidthOpacity.set(1);
							handleColor.set(colors.handleWarning);
							warningMinHeightColor.set(colors.indicatorWarning);
							return false;
						}
					}
					*/

					// Update row height
					handleColor.set(colors.handleActive);
					warningMinHeightColor.set(colors.indicatorForeground);
					warningMinWidthOpacity.set(0);
					//updateCursor(gridPoint);
					props.row.height = gridPoint;
					saveState();
					//
				}
			}}
			transition={transitions.layoutTransition}
			animate={{
				y: handleTop,
			}}
			style={{
				height: handleHeight,
				right: pageMargin,
				left: pageMargin,
				cursor: "ns-resize",
				pointerEvents,
			}}
			className={"handle"}
			initial={false}
			onContextMenu={e => {
				//console.log("right click!", e);
				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: ["Paste"],
				});
				setShowContextMenu(true);
				e.preventDefault();
			}}
		>
			<ResizeHandleMaterial
				// animate={{
				// 	opacity: handleHovered || handlePanning || handleDown || matchingSize ? 1 : 0,
				// }}
				// initial={false}
				// transition={transitions.layoutTransition}
				style={{
					backgroundColor: handleColor,
					//height: handleSize,
					//borderRadius: handleSize / 2,
					//width: "100%", // `calc(100% - ${tileCornerRadius * 2}px)`,
					//width: handleDown ? "75%" : "75%",
					//minWidth: 32,
					//maxWidth: 128,
					left: "50%",
					x: "-50%",
					top: "50%",
					y: "-50%",
					width: "50%",
					height: 4,
					borderRadius: 2,
					opacity: handleOpacity,
				}}
			/>
		</ResizeHandle>
	);
};

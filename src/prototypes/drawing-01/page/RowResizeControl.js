import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import useSound from "use-sound";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";



const ResizeHandle = styled(motion.div)`
	position: absolute;
	top: 0;
	pointer-events: auto;
	z-index: 9999;
	/* background-color: rgba(0,255,0,0.5); */
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 50%;
	overflow: hidden;
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

export const RowResizeHandle = props => {
	const { metrics, getPageHeight, checkWheel } = useContext(MetricsContext);
	const { pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount, scale, tileCornerRadius } = metrics;
	const {
		saveState,
		tomeData,
		setRowResizing,
		rowResizing,
		isTileAnimating,
		isPlayMode,
		setShowContextMenu,
		setContextMenuInfo,
		layoutTweaking,
		setLayoutTweaking,
		promptIsOpen,
		deselectTiles,
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
	colors.handleActive = props.page.theme.colors.controls.resize.handleActive;
	colors.handleWarning = props.page.theme.colors.controls.resize.handleWarning;
	colors.indicatorBackground = props.page.theme.colors.controls.resize.indicatorBackground;
	colors.indicatorForeground = props.page.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = props.page.theme.colors.controls.resize.indicatorWarning;
	const handleColor = useMotionValue(colors.handle);
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

	return (
		<ResizeHandle
			ref={handleRef}
			onHoverStart={
				isTileAnimating || isPlayMode || rowResizing || promptIsOpen
					? null
					: (event, info) => {
							//handleColor.set(colors.handle);
							//setHandleHovered(true);
							warningMinHeightColor.set(colors.indicatorForeground);
							warningMinWidthOpacity.set(0);
					  }
			}
			onHoverEnd={(event, info) => {
				//if (!handlePanning) document.body.classList.remove("ns-cursor");
				setHandleHovered(false);
			}}
			onMouseDown={e => {
				if (isPlayMode) return false;
				setHandleDown(true);
				setLayoutTweaking(true);
				//deselectTiles()
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
				document.body.classList.add("no-cursor");
			}}
			onPanStart={(event, info) => {
				if (isPlayMode) return false;
				setHandlePanning(true);
			}}
			onPanEnd={(event, info) => {
				setLayoutTweaking(false);
				setHandleDown(false);
				props.row.isResizingHeight = undefined;
				setHandlePanning(false);
				setHandleHovered(false);
				setRowResizing(null);
				handleColor.set(colors.handle);
				document.body.classList.remove("no-cursor");

				//checkWheel();
			}}
			onPan={(event, info) => {
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
				animate={{
					opacity: handleHovered || handlePanning || handleDown || matchingSize ? 1 : 0,
				}}
				initial={false}
				transition={transitions.layoutTransition}
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
				}}
			/>

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
				<g filter="url(#filter0_d_38_740)">
					<path
						d="M12 5.41L15.59 9H13V15H15.59L12 18.59L8.41 15H11V9H8.41L12 5.41ZM12 4L6 10H10V14H6L12 20L18 14H14V10H18L12 4Z"
						fill="white"
					/>
					<path
						d="M12.9999 11.4999V8.97991H15.5899L11.9999 5.40991L8.40991 8.97991H10.9999V11.4999V14.9999H8.40991L11.9999 18.5899L15.5899 14.9999H12.9999V11.4999Z"
						fill="black"
					/>
				</g>
				<defs>
					<filter id="filter0_d_38_740" x="4.2" y="3.2" width="15.6" height="19.6" filterUnits="userSpaceOnUse">
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
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_38_740" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_38_740" result="shape" />
					</filter>
				</defs>
			</motion.svg>

			{/* 
			<Indicator
				ref={indicatorRef}
				initial={false}
				animate={{
					opacity: handleDown ? 1 : 0,
					scale: handleDown ? 1 : 0,
				}}
				transition={handleDown ? transitions.basic : transitions.instant}
				style={{
					background: colors.indicatorBackground,
					boxShadow: props.page.theme.shadows.small,
					//backdropFilter: "blur(50px)",
					top: "50%",
					y: -18,
					x: indicatorX,
				}}
			>
				<IconLabelGroup
					style={{
						color: warningMinHeightColor,
						//opacity: matchingSize ? 0.4 : 1,
					}}
				>
					{props.row.height}
				</IconLabelGroup>
			</Indicator> */}
		</ResizeHandle>
	);
};

import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

const Indicator = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 9999;
`;

const IndicatorGroup = styled(motion.div)`
	position: absolute;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	gap: 6px;
	border-radius: 8px;
	min-width: 32px;

	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
`;

const Separator = styled(motion.div)`
	width: 1px;
	height: 16px;
	border-radius: 2px;
`;

const IconLabelGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 4px;
	gap: 4px;
	&.center {
	}
	&.left {
		padding-left: 8px;
	}
	&.right {
		padding-right: 8px;
	}
`;

export const TileWidthIndicator = props => {
	const { metrics } = useContext(MetricsContext);

	const { pageMargin, columnWidth, columnGutter } = metrics;
	const { rowResizing } = useContext(TomeContext);

	// const leftTile = props.tiles[0];
	// const rightTile = props.tiles[1];
	// const firstTile = props.tiles[0];
	// let handleLeft = pageMargin + columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
	// if (props.order === 2) {
	// 	const secondTile = props.tiles[1];
	// 	handleLeft += columnGutter + columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
	// }

	/*
	tileLeft = handle left
	*/
	let handleLeft = pageMargin;
	let gridPoint = 0;
	if (props.tile.order !== 1) {
		props.tiles.forEach(t => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (t.order < props.tile.order) {
				handleLeft += columnWidth * t.width + columnGutter * t.width;
				gridPoint += t.width;
			}
		});
	}
	handleLeft -= columnGutter;

	/*
	Colors
	*/
	const colors = {};
	colors.indicatorForeground = props.page.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = props.page.theme.colors.controls.resize.indicatorWarning;
	const warningMinWidthColor = useMotionValue(colors.indicatorForeground);
	const warningMaxWidthColor = useMotionValue(colors.indicatorForeground);

	const roundIt = n => {
		return Math.round((n + Number.EPSILON) * 100) / 100;
	};

	const leftWidth = rowResizing && rowResizing.leftTile ? roundIt(rowResizing.leftTile.width) : "unknown";
	const rightWidth = rowResizing && rowResizing.rightTile ? roundIt(rowResizing.rightTile.width) : "unknown";
	//const gridPoint = (handleLeft - pageMargin) / (columnWidth + columnGutter);
	//const gridPointRounded = roundIt(gridPoint + Number.EPSILON);

	const [pressedKey, setPressedKey] = React.useState("");

	React.useEffect(() => {
		const onKeyDown = e => {
			const key = e.key;
			//console.log("New Key!", "key", key, e);
			//e.preventDefault();
			//e.stopPropagation();
			if (e.altKey) {
				setPressedKey(key);
			}
		};

		const onKeyUp = ({ key }) => {
			setPressedKey("");
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	// const show =
	// 	rowResizing &&
	// 	rowResizing.id === props.row.id &&
	// 	rowResizing.isResizingWidth &&
	// 	rowResizing.tileResizeId === props.id &&
	// 	pressedKey === "Alt"

	const show = false;
	
	return (
		<Indicator
			style={{
				position: "fixed",
				left: 0,
				//top: 0,
				top: rowResizing ? rowResizing.indicatorY : undefined,
				// display: "none",
			}}
			animate={{
				x: handleLeft + columnGutter / 2 + 1,
			}}
			transition={transitions.layoutTransition}
		>
			{pressedKey === "Alt" && (
				<IndicatorGroup
					initial={false}
					animate={{
						opacity: show ? 1 : 0,
						scale: show ? 1 : 0,
					}}
					transition={show ? transitions.basic : transitions.instant}
					style={{
						background: props.page.theme.colors.controls.resize.indicatorBackground,
						boxShadow: props.page.theme.colors.controls.resize.indicatorShadow,
						//boxShadow: props.page.theme.shadows.small,
						// backdropFilter: "blur(50px)",
						left: "50%",
						x: "-50%",
						y: "-50%",
						paddingLeft: 4,
						paddingRight: 4,
					}}
				>
					<IconLabelGroup
						className="center"
						style={{
							color: rowResizing ? rowResizing.warningMinWidthColor : undefined,
						}}
					>
						{gridPoint}
					</IconLabelGroup>
				</IndicatorGroup>
			)}
			{pressedKey !== "Alt" && (
				<IndicatorGroup
					initial={false}
					animate={{
						opacity: show ? 1 : 0,
						scale: show ? 1 : 0,
					}}
					transition={show ? transitions.basic : transitions.instant}
					style={{
						background: props.page.theme.colors.controls.resize.indicatorBackground,
						boxShadow: props.page.theme.colors.controls.resize.indicatorShadow,
						//boxShadow: props.page.theme.shadows.small,
						// backdropFilter: "blur(50px)",
						left: "50%",
						x: "-50%",
						y: "-50%",
						paddingLeft: 4,
						paddingRight: 4,
					}}
				>
					<IconLabelGroup
						className="center"
						style={{
							color: rowResizing ? rowResizing.warningMinWidthColor : undefined,
						}}
					>
						{leftWidth}
					</IconLabelGroup>
					<Separator
						style={{
							backgroundColor: props.page.theme.colors.t2,
						}}
					/>
					<IconLabelGroup
						className="right"
						style={{
							color: rowResizing ? rowResizing.warningMaxWidthColor : undefined,
						}}
					>
						{rightWidth}
					</IconLabelGroup>
				</IndicatorGroup>
			)}
		</Indicator>
	);
};

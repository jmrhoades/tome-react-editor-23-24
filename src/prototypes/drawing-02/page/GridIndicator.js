import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	pointer-events: none;
	z-index: 100;
`;

const HeightWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	/* display: flex;
	flex-direction: row; */
	z-index: 100;
`;

const Col = styled(motion.div)`
	height: 100%;
	opacity: 0.05;
`;

export const TileWidthIndicator = props => {
	const { metrics, getTileY } = useContext(MetricsContext);
	const { columnCount, pageMargin, tileCornerRadius, rowHeight, rowMargin } = metrics;
	const { rowResizing } = useContext(TomeContext);

	let height = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	let y = getTileY(props.row.tiles[0]);

	const gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

	const show = rowResizing && rowResizing.id === props.row.id && props.row.isResizingWidth;

	return (
		<Wrap
			style={{
				width: "100%",
				paddingLeft: pageMargin,
				paddingRight: pageMargin,
				gap: pageMargin,
				gridTemplateColumns,
			}}
			animate={{
				y: y,
				height: height,
				opacity: show ? 1 : 0,
			}}
			transition={show ? transitions.layoutTransition : transitions.quick}
			initial={false}
		>
			{[...Array(columnCount)].map((_, i) => (
				<Col
					key={"col_" + i}
					style={{
						backgroundColor: props.page.theme.colors.controls.resize.grid,
						borderRadius: tileCornerRadius,
						backgroundBlendMode: "hard-light",
					}}
				/>
			))}
		</Wrap>
	);
};


export const TileWidthIndicatorStatic = props => {
	const { metrics, getTileY } = useContext(MetricsContext);
	const { columnCount, columnWidth, tileCornerRadius, rowHeight, rowMargin } = metrics;
	const { rowResizing } = useContext(TomeContext);

	let height = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	let y = getTileY(props.row.tiles[0]);

	const gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

	const show = rowResizing && rowResizing.id === props.row.id && props.row.isResizingWidth;

	return (
		<Wrap
			style={{
				height: "100%",
				gap: rowMargin,
				gridTemplateColumns: `repeat(${columnCount}, ${columnWidth}px)`,
			}}
			animate={{
				opacity: show ? 1 : 0,
			}}
			transition={show ? transitions.layoutTransition : transitions.quick}
			initial={false}
		>
			{[...Array(columnCount)].map((_, i) => (
				<Col
					key={"col_" + i}
					style={{
						backgroundColor: props.page.theme.colors.controls.resize.grid,
						borderRadius: tileCornerRadius,
						backgroundBlendMode: "hard-light",
					}}
				/>
			))}
		</Wrap>
	);
};

export const TileHeightIndicator = props => {
	const { metrics, getTileY } = useContext(MetricsContext);
	const { columnCount, rowCount, pageMargin, tileCornerRadius, rowHeight, rowMargin } = metrics;
	const { rowResizing } = useContext(TomeContext);

	let height = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	let y = getTileY(props.row.tiles[0]);

	const gridCount = props.row.height + 1;

	const show = rowResizing && rowResizing.id === props.row.id && props.row.isResizingHeight;

	return (
		<HeightWrap
			style={{
				width: "100%",
				paddingLeft: pageMargin,
				paddingRight: pageMargin,
				overflow: "hidden",
				// gap: pageMargin,
				// backgroundColor: "red",
			}}
			animate={{
				y: y,
				height: height,
				opacity: show ? 1 : 0,
			}}
			transition={show ? transitions.layoutTransition : transitions.quick}
			initial={false}
		>
			{[...Array(gridCount)].map((_, i) => (
				<Col
					key={"col_" + i}
					style={{
						backgroundColor: props.page.theme.colors.controls.resize.grid,
						borderRadius: tileCornerRadius,
						height: rowHeight,
						width: "100%",
						marginBottom: rowMargin,
					}}
				/>
			))}
		</HeightWrap>
	);
};

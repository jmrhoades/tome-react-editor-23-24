import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: clip;
	pointer-events: none;
`;

export const PageGrid = props => {
	const { metrics } = React.useContext(MetricsContext);
	const { columnCount, rowHeight, rowMargin, pageWidth, columnWidth, columnGutter, pageCornerRadius } = metrics;

	return (
		<Wrap
			style={{
				borderRadius: props.cornerRadius,
				height: props.pageHeight,
				//overflow: "clip",
			}}
		>
			<svg
				style={{
					display: "block",
					position: "absolute",
					left: 0,
					top: 0,
					overflow: "visible",
					pointerEvents: "none",
					fill: "none",
					stroke: props.theme.colors.t2,
				}}
			>
				{[...Array(20)].map((_, i) => (
					<path
						key={"row_line" + i}
						d={`M 0 ${i * rowHeight + i * rowMargin} h ${pageWidth} M 0 ${
							i * rowHeight + i * rowMargin - rowMargin
						} h ${pageWidth}`}
					/>
				))}
				{[...Array(columnCount)].map((_, i) => (
					<path
						key={"col_line" + i}
						d={`M ${i * columnWidth + i * columnGutter} 0 v ${props.pageHeight} M ${
							i * columnWidth + i * columnGutter - columnGutter
						} 0 v ${props.pageHeight}`}
					/>
				))}
				<rect
					width={pageWidth}
					height={props.pageHeight}
					rx={pageCornerRadius}
					strokeWidth={2}
				/>
			</svg>
		</Wrap>
	);
};

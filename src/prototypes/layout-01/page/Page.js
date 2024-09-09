import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

import { Tile } from "./Tile";
import { TileResizeControl } from "./TileResizeControl";
import { RowResize } from "./RowResize";

import { TilePlacementIndicator } from "./TilePlacementIndicator";
import { PageGrid } from "./PageGrid";
import { Frame } from "./Frame";

const PageContent = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const HoverBackground = styled(motion.div)`
	position: absolute;
	opacity: 0;
	transition: opacity 0.2s ease-out;
`;


const LayoutTweaking = styled(motion.div)`
	position: absolute;
	opacity: 0;
	transition: opacity 0.2s ease-out;
`;

export const Page = props => {
	const { metrics, getPageRect } = React.useContext(MetricsContext);
	const { pageCornerRadius } = metrics;
	const { tomeData, currentPage, dropIndicatorInfo, layoutTweaking } = React.useContext(TomeContext);

	// Find the current page
	const page = currentPage;

	// Get the page rect
	const rect = getPageRect();

	return (
		<PageContent
			key={"pageContent_" + page.id}
			id="pageContent"
			animate={{
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height + rect.y,
			}}
			initial={false}
			transition={transitions.layoutTransition}
		>
			<PageGrid pageHeight={rect.height} theme={page.theme} cornerRadius={pageCornerRadius} />

			
			{/* {rows.map(row => (
				<RowResize
					row={row}
					rows={rows}
					tiles={row.tiles}
					key={row.id + "_resize_2"}
					pageTop={pageTop}
					page={page}
				/>
			))} */}

			<TilePlacementIndicator theme={page.theme} />

			{tomeData.tiles.map(tile => tile.pageId === page.id && <Tile key={tile.id} tile={tile} />)}

			{/* {tomeData.frames.map(frame => frame.pageId === page.id && <Frame key={frame.id} frame={frame} />)} */}
		</PageContent>
	);
};

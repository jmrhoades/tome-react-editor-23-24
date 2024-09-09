import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { uniqueId } from "lodash";

import { transitions } from "../../../ds/Transitions";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";
import { TileResizeControl } from "./TileResizeControl";
import { RowResizeHandle } from "./RowResizeControl";
import { TilePlacementIndicator } from "./TilePlacementIndicator";

import { TileWidthIndicator } from "./TileWidthIndicator";

import { PageBackground } from "./Background";
//import { DynamicBackground } from "../background/DynamicBackground";
import { BackgroundPlacementIndicator } from "./BackgroundPlacementIndicator";

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
	/* height: auto; */
	/* min-height: 100vh; */
	/* height: 100vh; */
	/* overflow-y: auto; */
`;

const PageContent = styled(motion.div)`
	position: relative;
	pointer-events: none;
`;

const PageNumber = styled(motion.div)`
	position: relative;
	pointer-events: none;
	padding-bottom: 16px;
`;
export const Page = props => {
	const { getPageTop, getPageHeight, getContentHeight, metrics, pageScrollY } = useContext(MetricsContext);
	const { pageWidth, pageLeft, pageMargin, pageCornerRadius, pageBorderSize } = metrics;
	const { tomeData, currentPage, isPlayMode, dropIndicatorInfo, promptIsOpen } = useContext(TomeContext);

	// Find the current page
	const page = tomeData.pages.filter(page => {
		return page.id === currentPage.id;
	})[0];
	//console.log(page.id);

	// Find all the rows that belong to this page
	const rows = tomeData.rows.filter(row => {
		return row.pageId === page.id;
	});
	//rows.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
	// Find the tiles for each row
	rows.forEach(row => {
		row.tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === row.id;
		});
		row.tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
	});
	// console.log(rows);
	*/

	// Find the page height
	const pageTop = getPageTop(page);
	const pageHeight = getPageHeight(page);

	/*
	useEffect(() => {
		console.log("reset scroll");
		window.scroll({ top: 0, left: 0 });
	}, [currentPage.id]);
	*/

	const pageOriginY = useMotionValue(0);

	/*
	useEffect(() => {
		pageOriginY.set((pageTop + pageMargin + window.scrollY) / (pageHeight + pageTop * 2));
	}, [isPlayMode, pageOriginY]);
	*/

	const transition = isPlayMode ? transitions.playModeFade : transitions.layoutTransition;
	//const transition = {duration: 3}

	const needsOutline = page.theme.colors.backgrounds.canvas === page.theme.colors.backgrounds.page;
	//const needsOutline = false;

	//document.body.style.backgroundColor = page.theme.colors.backgrounds.canvas;

	return (
		<Wrap
			id="pageWrap"
			key={page.id}
			style={{
				backgroundColor: page.theme.colors.backgrounds.page,
			}}
		>
			{page.background && (
				<PageBackground page={page} pageTop={pageTop} params={page.background.params} theme={page.theme} />
			)}

			{/* {page.background && (
				<DynamicBackground page={page} pageTop={pageTop} params={page.background.params} theme={page.theme} />
			)} */}

			<PageContent
				id="pageContent"
				animate={{
					//scale: isPlayMode ? 1.05 : 1,
					height: pageHeight + pageTop * 2,
					width: pageWidth,
					x: pageLeft,
				}}
				style={{
					originX: 0.5,
					originY: pageOriginY,
					borderRadius: pageCornerRadius,
				}}
				initial={false}
				transition={transition}
				key={"pageContent_" + page.id}
			>
				{rows.map(row => (
					<RowResizeHandle
						row={row}
						rows={rows}
						tiles={row.tiles}
						key={row.id + "_resize_2"}
						pageTop={pageTop}
						page={page}
					/>
				))}

				{tomeData.tiles.map(
					tile =>
						tile.pageId === page.id &&
						tile.order > 1 && (
							<TileResizeControl
								key={tile.id + "+tile_width_resize"}
								id={tile.id + "+tile_width_resize"}
								tile={tile}
								tiles={tomeData.tiles.filter(t => t.rowId === tile.rowId && t.pageId === tile.pageId)}
								pageTop={pageTop}
								row={rows.find(r => r.id === tile.rowId)}
								rows={rows}
								page={page}
							/>
						)
				)}

				<TilePlacementIndicator theme={page.theme} />

				{tomeData.tiles.map(
					tile => tile.pageId === page.id && <Tile key={tile.id} tile={tile} pageTop={pageTop} page={page} />
				)}
			</PageContent>

			<BackgroundPlacementIndicator
				dropIndicatorInfo={dropIndicatorInfo}
				theme={page.theme}
				top={pageTop}
				left={pageLeft}
				height={pageHeight}
				width={pageWidth}
				borderRadius={pageCornerRadius}
			/>

			{/* <PageBackgroundMessage
				dropIndicatorInfo={dropIndicatorInfo}
				theme={page.theme}
			/> */}

			{/* <Overlay pageHeight={pageHeight} pageTop={dPageTop} /> */}
		</Wrap>
	);
};

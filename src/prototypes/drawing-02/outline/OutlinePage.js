import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";

import { metricConstants } from "../tome/MetricsContext";
import { OutlineTile } from "./OutlineTile";
import { PageBackground } from "../page/Background";

export const OutlinePageHeight = 36;
export const OutlinePageWidth = Math.round(OutlinePageHeight * (16 / 9));
export const outlineCornerRadius = 4;
export const OutlinePageNumberWidth = 24;
export const OutlineCurrentPageIndicatorHeight = 24;

const PageWrap = styled(motion.div)`
	position: relative;
	cursor: pointer;
	display: flex;
	outline: none;
`;

const MetaInfo = styled(motion.div)``;

const PageCurrentIndicator = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const PageNumber = styled(motion.div)``;

const PageThumbnail = styled(motion.div)`
	position: relative;
	will-change: transform;
`;

const FullSizedPage = styled(motion.div)`
	position: relative;
`;

const OutlinePageHover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const PageMask = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const OutlinePageSelected = styled(motion.div)`
	position: absolute;
	pointer-events: none;
	border-style: solid;
`;

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		opacity: 1,
	},
	disabled: {
		opacity: 0.5,
	},
};

const pageVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.995,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0.5,
	},
};

const hoverVariants = {
	default: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	active: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0,
	},
};

export const OutlinePage = ({
	tomeData,
	currentPage,
	page,
	number,
	isCurrent,
	isSelected,
	onMouseUp,
	transition,
	id,
	saveState,
}) => {
	const pageMargin = metricConstants.cPageMargin;
	const rowMargin = metricConstants.cRowMargin;
	const columnGutter = metricConstants.cColumnGutter;
	const rowCount = metricConstants.cRowCount;
	const columnCount = metricConstants.cColumnCount;
	const pageWidth =
		metricConstants.cViewportWidth - (metricConstants.cPageMarginX * 2);
	const minPageHeight = (9 / 16) * pageWidth;
	const rowHeight = (minPageHeight - pageMargin * 2 - rowMargin * (rowCount - 1)) / rowCount;
	const columnWidth = (pageWidth - pageMargin * 2 - columnGutter * (columnCount - 1)) / columnCount;

	// Find all the rows that belong to this page
	const rows = tomeData.rows.filter(row => {
		return row.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	let pageHeight = pageMargin;
	rows.forEach(r => {
		pageHeight += rowHeight * r.height + rowMargin * r.height;
	});
	pageHeight -= rowMargin;
	pageHeight += pageMargin;

	const outlineScale = OutlinePageWidth / pageWidth;
	const scaledPageHeight = Math.floor(pageHeight * outlineScale);
	const maxPageHeight = OutlinePageHeight * 8;

	const needsOutline = page.theme.colors.backgrounds.canvas === page.theme.colors.backgrounds.page;

	const thumbHeight =
		scaledPageHeight > maxPageHeight
			? maxPageHeight
			: scaledPageHeight < OutlinePageHeight
			? OutlinePageHeight
			: scaledPageHeight;

	return (
		<PageWrap
			key={id}
			onTap={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={transition}
			style={{
				padding: "0",
			}}
			//layout
		>
			<MetaInfo
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: OutlinePageHeight,
				}}
			>
				<PageCurrentIndicator
					transition={transitions.layoutTransition}
					style={{
						// position: "absolute",
						// left: 1,
						width: 3,
						height: OutlineCurrentPageIndicatorHeight,
						borderRadius: 2,
						backgroundColor: currentPage.theme.colors.accent,
						opacity: isCurrent ? 1 : 0,
						marginLeft: 1,
					}}
				/>

				<PageNumber
					transition={transitions.layoutTransition}
					style={{
						fontWeight: 500,
						fontSize: "14px",
						lineHeight: `${OutlineCurrentPageIndicatorHeight}px`,
						width: OutlinePageNumberWidth,
						color: isCurrent ? currentPage.theme.colors.t9 : currentPage.theme.colors.t7,
						textAlign: "center",
					}}
				>
					{number}
				</PageNumber>
			</MetaInfo>
			<PageThumbnail
				variants={pageVariants}
				style={{
					width: OutlinePageWidth + 8,
					height: thumbHeight + 8,
					borderRadius: outlineCornerRadius,
					overflow: "hidden",
					//boxShadow: needsOutline ? `0 0 0 1.5px ${page.theme.colors.t3}` : undefined,
					//boxShadow: `0 0 0 1.5px ${isSelected ? currentPage.theme.colors.accent : page.isGenerated ? currentPage.theme.colors.generated  : currentPage.theme.colors.t3}`,
					boxShadow: `0 0 0 1.5px ${isSelected ? currentPage.theme.colors.accent : currentPage.theme.colors.t3}`,
					backgroundColor: page.theme.colors.backgrounds.page,
					padding: 4,
				}}
			>
				<FullSizedPage
					style={{
						width: pageWidth,
						height: pageHeight,
						scale: outlineScale,
						originX: 0,
						originY: 0,
						x: 0,
						y: 0,
					}}
				>
					{page.background && (
						<PageBackground
							page={page}
							isOutline={true}
							params={page.background ? page.background.params : undefined}
							theme={page.theme}
						/>
					)}
					{tomeData.tiles.map(
						tile =>
							tile.pageId === page.id && (
								<OutlineTile
									key={"outline_tile_" + tile.id}
									id={"outline_tile_" + tile.id}
									tomeData={tomeData}
									page={page}
									tile={tile}
									columnWidth={columnWidth}
									columnGutter={columnGutter}
									rowHeight={rowHeight}
									rowMargin={rowMargin}
									pageMargin={pageMargin}
									minPageHeight={minPageHeight}
									columnCount={columnCount}
									saveState={saveState}
								/>
							)
					)}
				</FullSizedPage>
				<OutlinePageHover
					style={{
						borderRadius: outlineCornerRadius,
						backgroundColor: page.theme.colors.t1,
					}}
					variants={hoverVariants}
				/>
			</PageThumbnail>
			{/* <OutlinePageSelected
				style={{
					width: OutlinePageWidth,
					height: scaledPageHeight,
					//borderWidth: 1,
					borderRadius: outlineCornerRadius - 1,
					//borderColor: currentPage.theme.colors.accent,
					// boxShadow: `inset 0px 0px 0px 1px rgba(51, 20, 50, 0.25)`,
					boxShadow: "0 0 0 1px " + currentPage.theme.colors.accent,
					opacity: isSelected ? 1 : 0,
					maxHeight: maxPageHeight,
					left: 0,
				}}
			/> */}
		</PageWrap>
	);
};

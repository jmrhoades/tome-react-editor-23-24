import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TILES } from "../tiles/TileConstants";
import { TileText } from "../tiles/text/TileText";
import { DrawingTilePreview } from "../tiles/drawing/DrawingTilePreview";
import { TileImage } from "../page/TileImage";
import { TileVideo } from "../page/TileVideo";
import { TileTable } from "../page/TileTable";
import { TileCode } from "../page/TileCode";
import { TileWeb } from "../page/TileWeb";
import { TileTwitter } from "../page/TileTwitter";
import { TileGiphy } from "../page/TileGiphy";
import { TileAirtable } from "../page/TileAirtable";
import { TileFigma } from "../page/TileFigma";
import { TileColor } from "../page/TileColor";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	will-change: transform;
`;

export const OutlineTile = ({
	id,
	tomeData,
	page,
	tile,
	columnWidth,
	columnGutter,
	pageMargin,
	minPageHeight,
	rowHeight,
	rowMargin,
	columnCount,
	saveState,
}) => {
	// other tiles in the same row & page
	const tiles = tomeData.tiles.filter(t => {
		return t.pageId === tile.pageId && t.rowId === tile.rowId;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

	// the row the tile is in
	const row = tomeData.rows.filter(r => {
		return r.id === tile.rowId;
	})[0];

	// all the rows sorted by order
	const rows = tomeData.rows.filter(r => {
		return r.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
	tileWidth
	*/
	const tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);

	const outlinePageScale = useMotionValue(1);
	const outlineZoom = useMotionValue(1);

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
	tileTop
	*/
	let tileTop = pageMargin;
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
	const tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);

	return (
		<Wrap
			key={id}
			style={{
				y: tileTop,
				x: tileLeft,
				width: tileWidth,
				height: tileHeight,
				overflow: "hidden",
				//borderRadius: "10px",
				//WebkitMaskImage: "-webkit-radial-gradient(white, black)",
				background: tile.params.backgroundColor,
			}}
		>
			{tile.type === TILES.TEXT.name && (
				<TileText
					id={id}
					blocks={tile.params.blocks}
					columnCount={columnCount}
					isSelected={false}
					onContentSizeChange={() => {}}
					scale={1}
					hideNull={true}
					alignmentX={tile.params.alignmentX}
					alignmentY={tile.params.alignmentY}
					lineLength={tile.params.lineLength}
					theme={page.theme}
					backgroundColor={tile.params.backgroundColor}
					tileWidth={tileWidth}
					tileUnitWidth={tile.width}
					isPreview={true}
				/>
			)}
			{tile.type === TILES.IMAGE.name && (
				<TileImage
					image={tile.params.image}
					deviceImage={tile.params.deviceImage}
					imageSize={tile.params.imageSize}
					imagePosition={tile.params.imagePosition}
					tileSize={tile.size}
					backgroundColor={tile.params.backgroundColor}
					theme={page.theme}
					caption={tile.params.caption}
					paddingY={tile.params.paddingY}
					isPreview={true}
					tile={tile}
					saveState={saveState}
				/>
			)}
			{tile.type === TILES.VIDEO.name && (
				<TileVideo
					video={tile.params.video}
					image={tile.params.image}
					tileSize={tile.size}
					theme={page.theme}
					caption={tile.params.caption}
					isPreview={true}
				/>
			)}
			{tile.type === TILES.TABLE.name && (
				<TileTable
					isPreview={true}
					scale={1}
					rowHeight={row.height}
					tileWidth={tileWidth}
					tileUnitWidth={tile.width}
					title={tile.params.title}
					header={tile.params.header}
					rows={tile.params.rows}
					columns={tile.params.columns}
					theme={page.theme}
					borderRadius={12}
				/>
			)}
			{tile.type === TILES.DRAWING.name && (
				<DrawingTilePreview
					theme={page.theme}
					tile={tile}
					tileHeight={tileHeight}
					tileWidth={tileWidth}
					pageScale={outlinePageScale}
					zoom={outlineZoom}
					borderRadius={12}
				/>
			)}
			{tile.type === TILES.CODE.name && (
				<TileCode tileSize={tile.width} theme={page.theme} columnCount={columnCount} isPreview={true} />
			)}
			{tile.type === TILES.WEB.name && <TileWeb tileSize={tile.size} theme={page.theme} />}
			{tile.type === TILES.TWITTER.name && (
				<TileTwitter
					tileSize={tile.size}
					data={tile.params}
					theme={page.theme}
					tileWidth={tileWidth}
					tileUnitWidth={tile.width}
					onContentSizeChange={() => {}}
					isPreview={true}
				/>
			)}

			{tile.type === TILES.GIPHY.name && <TileGiphy tileSize={tile.size} theme={page.theme} isPreview={true} />}
			{tile.type === TILES.AIRTABLE.name && (
				<TileAirtable tileSize={tile.size} theme={page.theme} isPreview={true} />
			)}
			{tile.type === TILES.FIGMA.name && <TileFigma tileSize={tile.size} theme={page.theme} isPreview={true} />}
			{tile.type === TILES.COLOR.name && (
				<TileColor
					tileSize={tile.size}
					backgroundColor={tile.params.backgroundColor}
					label={tile.params.label}
					labelColor={tile.params.labelColor}
					isPreview={true}
				/>
			)}
		</Wrap>
	);
};

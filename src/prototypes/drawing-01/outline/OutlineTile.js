import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { tileNames } from "../tiles/TileConstants";
import { TileText } from "../tiles/text/TileText";
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
				WebkitMaskImage: "-webkit-radial-gradient(white, black)",
				background: tile.params.backgroundColor,
			}}
		>
			{tile.type === tileNames.TEXT.name && (
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
			{tile.type === tileNames.IMAGE.name && (
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
			{tile.type === tileNames.VIDEO.name && (
				<TileVideo
					video={tile.params.video}
					image={tile.params.image}
					tileSize={tile.size}
					theme={page.theme}
					caption={tile.params.caption}
					isPreview={true}
				/>
			)}
			{tile.type === tileNames.TABLE.name && (
				<TileTable
					tileSize={tile.size}
					title={tile.params.title}
					header={tile.params.header}
					rows={tile.params.rows}
					columns={tile.params.columns}
					theme={page.theme}
					isPreview={true}
				/>
			)}
			{tile.type === tileNames.CODE.name && (
				<TileCode tileSize={tile.width} theme={page.theme} columnCount={columnCount} isPreview={true} />
			)}
			{tile.type === tileNames.WEB.name && <TileWeb tileSize={tile.size} theme={page.theme} />}
			{tile.type === tileNames.TWITTER.name && (
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

			{tile.type === tileNames.GIPHY.name && <TileGiphy tileSize={tile.size} theme={page.theme} isPreview={true} />}
			{tile.type === tileNames.AIRTABLE.name && (
				<TileAirtable tileSize={tile.size} theme={page.theme} isPreview={true} />
			)}
			{tile.type === tileNames.FIGMA.name && <TileFigma tileSize={tile.size} theme={page.theme} isPreview={true} />}
			{tile.type === tileNames.COLOR.name && (
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

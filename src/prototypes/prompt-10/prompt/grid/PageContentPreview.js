import React from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";

import { Icon } from "../../../../ds/Icon";
import { textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { tileNames } from "../../page/TileConstants";
import { BlockMap, PlaceholderMap, AlignXMap, AlignTextMap, AlignYMap, StyledTextContent } from "../../page/TextSyles";
import { TileTable } from "../../page/TileTable";

const ContentClip = styled.div`
	position: relative;
`;

const ContentWrap = styled(motion.div)`
	position: relative;
`;

const Row = styled(motion.div)``;
const Tile = styled(motion.div)``;
const ImageContent = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

export const PageContentPreview = props => {
	const loading = props.item.loading;
	const colors = props.theme.colors;

	const pageGapX = 6;
	const pageGapY = 6;

	const scale = (props.width - pageGapX * 2) / 1128;
	const widthUnit = (props.width - pageGapX * 2) / 12;
	//const vertUnit = (props.height - pageGap * 2) / 12;
	const vertUnit = ((props.width - pageGapX * 2) * (9 / 16)) / 12;
	const gridGap = 12 * scale;
	//const gridGap = 4;
	//const scale = 0.15;

	const addBlock = (block, i) => {
		const Block = BlockMap[block.type];
		const styles =
			block.type === textBlockType.OL ||
			block.type === textBlockType.UL ||
			block.type === textBlockType.PRE ||
			block.type === textBlockType.BLOCKQUOTE
				? block.blockStyle
				: block.type;
		const typography = props.theme.typography;
		let fontsize = typography.fontSize[styles] ? typography.fontSize[styles] * scale : undefined;
		if (block.fontSize) fontsize = block.fontSize * scale;
		const className = block.blockStyle ? block.type + " " + block.blockStyle : block.type;
		const fontcolor = block.color ? block.color : typography.fontColor[styles];
		const marginBottom = typography.marginBottom[styles] * scale + "px";
		return (
			<Block
				key={uniqueId("text-tile-block")}
				className={className}
				$theme={props.theme}
				$scale={scale}
				$fontsize={fontsize}
				$fontcolor={fontcolor}
				$fontweight={typography.fontWeight[styles]}
				$lineheight={typography.lineHeight[styles]}
				$letterspacing={typography.letterSpacing[styles]}
				$marginbottom={marginBottom}
			>
				{block.content && block.content}
				{block.blocks && block.blocks.map((b, i) => addBlock(b, i))}
			</Block>
		);
	};

	let rows = [];
	let tiles = [];
	if (!loading && props.item.rows && props.item.tiles) {
		rows = props.item.rows;
		tiles = props.item.tiles;
		rows.forEach((row, i) => {
			row.tiles = tiles.filter(t => t.rowId === row.id);
			row.tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		});
	}

	let textTilePaddingY = 20 * scale;
	let textTilePaddingX = 24 * scale;

	return (
		<ContentClip
			style={{
				height: props.height,
				overflow: "hidden",
				position: "relative",
				
			}}
		>
			<ContentWrap
				style={{
					width: props.width,

					position: "relative",

					display: "flex",
					flexDirection: "column",
					paddingLeft: pageGapX,
					paddingRight: pageGapX,
					paddingTop: pageGapY,
					paddingBottom: pageGapY,
					gap: gridGap,
				}}
				// initial={{
				// 	opacity: 0,
				// }}
				// animate={{
				// 	opacity: 1,
				// }}
			>
				{rows.map((row, i) => (
					<Row
						key={uniqueId("row")}
						style={{
							position: "relative",
							display: "flex",
							gap: gridGap,
							//flex: rows.length === 1 || i === rows.length - 1 ? 1 : "unset",
							//height: !row.flexHeight ? vertUnit * row.height : "unset",
							height: vertUnit * row.height,
						}}
					>
						{row.tiles.map(tile => (
							<Tile
								key={uniqueId("tile")}
								style={{
									position: "relative",
									//flexGrow: 1,
									width: widthUnit * tile.width,
									//background: colors.z3
								}}
							>
								{tile.type === tileNames.TEXT.name && (
									<StyledTextContent
										key={uniqueId("text-tile-content")}
										style={{
											position: "relative",
											display: "flex",
											flexDirection: "column",
											textAlign: AlignTextMap[tile.params.alignmentX],
											alignItems: AlignTextMap[tile.params.alignmentX],
											justifyContent: AlignYMap[tile.params.alignmentY],
											paddingLeft: textTilePaddingX,
											paddingRight: textTilePaddingX,
											paddingBottom: textTilePaddingY,
											paddingYop: textTilePaddingY,
											fontFamily: props.theme.typography.fontFamily,
											fontSize: props.theme.typography.fontSize.P * scale + "px",
											fontWeight: props.theme.typography.fontWeight.P,
											lineHeight: 1,
											color: props.theme.colors.text.body,
											height: "100%",
										}}
									>
										{tile.params.blocks && tile.params.blocks.map((b, i) => addBlock(b, i))}
									</StyledTextContent>
								)}
								{tile.type === tileNames.IMAGE.name && (
									<ImageContent
										key={uniqueId("image-tile-content")}
										style={{
											backgroundColor: colors.t1,
											borderRadius: 3,
										}}
									>
										{tile.params.image && tile.params.image.length > 1 && (
											<Image
												style={{
													backgroundImage: `url("${tile.params.image}")`,
													borderRadius: 3,
												}}
											/>
										)}
										{!tile.params.image && (
											<Icon name={"Photo"} size={20} color={props.theme.colors.t5} opacity={1} />
										)}
									</ImageContent>
								)}
								{tile.type === tileNames.TABLE.name && (
									<TileTable
										scale={scale}
										rowHeight={row.height}
										tileUnitWidth={tile.width}
										title={tile.params.title}
										header={tile.params.header}
										rows={tile.params.rows}
										columns={tile.params.columns}
										theme={props.theme}
									/>
								)}
							</Tile>
						))}
					</Row>
				))}
			</ContentWrap>
		</ContentClip>
	);
};

import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { tableTileType } from "./TileConstants";
import { uniqueId } from "lodash";

const Wrap = styled(motion.div)`
	position: relative;
	overflow: hidden;
`;

const TableTitle = styled(motion.div)`
	position: relative;
	line-height: 1;
`;

const Table = styled(motion.table)`
	table-layout: fixed;
	text-align: left;
	max-width: 100%;
`;


const TableRow = styled(motion.tr)``;
const THEAD = styled(motion.thead)``;

const TBODY = styled(motion.tbody)``;

const THEADING = styled(motion.th)``;

const TDATA = styled(motion.td)``;

export const TileTable = props => {
	const scale = props.scale;

	let tilePaddingX = 12 * scale;
	let tilePaddingY = 17 * scale;

	
	const typography = props.theme.typography;
	const fontFamily = typography.fontFamily;

	let tableHeadingFontSize = 21 * scale;
	let tableHeadingWeight = 700;
	let tableHeadingLetterSpacing = tableHeadingFontSize * -0.01 + "px";
	let tableHeadingLineHeight = tableHeadingFontSize * 1.1 + "px";
	let tableHeadingPaddingBottom = 16 * scale + "px";

	
	//let tableBodyLineHeight = 1.3 * tableBodyfontSize + "px";

	let cellGap = 4 * scale;
	if (cellGap<1) cellGap = 1.5;

	let borderRadius = 3 * scale;
	if (borderRadius<2) borderRadius = 1.5;

	let paddingX = 16 * scale;
	let paddingY = 16 * scale;
	if (paddingX < 4 ) paddingX = 4;


	const TD = tableTileType.TD;
	const nullData = [
		[
			{ type: TD, content: "" },
			{ type: TD, content: "" },
			{ type: TD, content: "" },
		],
		[
			{ type: TD, content: "" },
			{ type: TD, content: "" },
			{ type: TD, content: "" },
		],
		[
			{ type: TD, content: "" },
			{ type: TD, content: "" },
			{ type: TD, content: "" },
		],
		
	];
	const rowData = props.rows ? props.rows : nullData;
	const colData = props.columns ? props.columns : ["33%", "33%", "33%"];

	const getNodeFromObject = o => {
		
		const fontSize = typography.fontSize[TD] * scale;
		const lineHeight = typography.lineHeight[TD];

	
		const style = {
			fontFamily: fontFamily,
			fontSize: fontSize,
			lineHeight: lineHeight,
			
			borderRadius: borderRadius,
			paddingTop: paddingY,
			paddingBottom: paddingY,
			paddingLeft: paddingX,
			paddingRight: paddingX,
			//height: 48 * scale, // min-height
		};
		if (o.type === tableTileType.TD) {
			return (
				<TDATA
					key={uniqueId("table_data_")}
					style={{
						...style,
						backgroundColor: props.theme.colors.table.cell,
					}}
				>
					{o.content}
				</TDATA>
			);
		}
		if (o.type === tableTileType.TH) {
			return (
				<THEADING
					key={uniqueId("table_heading_")}
					style={{
						...style,
						backgroundColor: props.theme.colors.table.headerBg,
					}}
				>
					{o.content}
				</THEADING>
			);
		}
	};

	return (
		<Wrap
			style={{
				paddingLeft: tilePaddingX,
				paddingRight: tilePaddingX,
				paddingTop: tilePaddingY,
				width: "100%",
			}}
		>
			{props.title && (
				<TableTitle
					style={{
						fontFamily: fontFamily,
						fontSize: tableHeadingFontSize,
						fontWeight: tableHeadingWeight,
						letterSpacing: tableHeadingLetterSpacing,
						lineHeight: tableHeadingLineHeight,
						color: props.theme ? props.theme.colors.table.heading : "transparent",
						paddingBottom: tableHeadingPaddingBottom,
					}}
				>
					{props.title}
				</TableTitle>
			)}

			<Table
				style={{
					fontFamily: fontFamily,
					color: props.theme.colors.table.body,
					borderCollapse: "separate",
					borderSpacing: cellGap,
					width: "100%",
				}}
			>
				<colgroup>
					{colData.map(w => (
						<col
							key={uniqueId("table_col_")}
							style={{
								//width: w * scale,
								//width: 100 / colData.length + "%",
								width: w + "%"
							}}
						/>
					))}
				</colgroup>

				{props.header && (
					<THEAD>
						<TableRow>
							{props.header.map(h => (
								<THEADING
									key={uniqueId("table_heading_")}
									style={{
										backgroundColor: props.theme.colors.table.headerBg,
										borderRadius: 3 * scale,
										padding: 11 * scale,
										fontWeight: 700,
										//fontSize: tableBodyfontSize,
										//lineHeight: 1.3 * tableBodyfontSize + "px",
									}}
								>
									{h}
								</THEADING>
							))}
						</TableRow>
					</THEAD>
				)}

				<TBODY>
					{rowData.map(r => (
						<TableRow key={uniqueId("table_row_")}>{r.map(o => getNodeFromObject(o))}</TableRow>
					))}
				</TBODY>
			</Table>
		
		</Wrap>
	);
};

import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { CREATE_TOME_FORMAT_OPTIONS } from "../prompt/PromptConstants";

export const ContentFormatOptions = props => {
	const [chosenId, setChosenId] = React.useState(false);
	const [hoveredId, setHoveredId] = React.useState(null);

	const [pressingId, setPressingId] = React.useState(undefined);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				//justifyContent: "space-between",
				alignItems: "flex-start",
				gap: 12,
				padding: "12px 12px 8px 12px"
			}}
		>
			{CREATE_TOME_FORMAT_OPTIONS.map(t => (
				<ContentFormatItem
					key={"prompt_createtome_format" + t.id}
					label={t.menuItemLabel}
					item={t}
					theme={props.theme}
					previewTheme={props.tomeData.prompt.createTomeTheme}
					pressingId={pressingId}
					setPressingId={setPressingId}
					selected={props.tomeData.prompt.createTomeFormat.id === t.id}
					onTap={() => {
						props.onTap(t);
					}}
				/>
			))}
		</div>
	);
};

const Item = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0px;
	gap: 8px;
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 11px;
	line-height: 16px;
`;

const Border = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
	box-shadow: 0 0 0 1px;
`;

const Layout = styled(motion.div)`
	width: 96px;
	height: 60px;
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 8px;
`;

const Heading = styled(motion.div)`
	font-family: "ABCDiatypeVariable";
	font-style: normal;
	font-weight: 700;
	font-size: 9px;
	line-height: 120%;
	letter-spacing: -0.015em;
	padding: 0;
	margin-bottom: 4px;
`;

const ContentFormatItem = props => {
	const [isHovering, setIsHovering] = React.useState(false);

	const needsOutline = props.theme.colors.backgrounds.page === props.theme.colors.backgrounds.panel;
	
	
	const lineColor = props.previewTheme.colors.text.body;
	const headingColor = props.previewTheme.colors.text.heading;


	const labelColor = props.theme.colors.menu.label;
	const labelSelectedColor = props.theme.colors.t9;

	const borderRadius = 6;

	return (
		<Item
			style={{
				cursor: "pointer",
			}}
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onTapStart={() => {
				props.setPressingId(props.item.id);
			}}
			onTap={() => {
				props.setPressingId(undefined);
				props.onTap();
			}}
			
			//onMouseDown={props.onTap}
		>
			<Layout
				style={{
					backgroundColor: props.previewTheme.colors.backgrounds.page,
					borderRadius: borderRadius,
				}}
				whileTap={{
					scale: 0.975,
				}}
			>
				<Heading style={{ color: headingColor }}>Heading</Heading>
				{props.item.id === "CONTENT_PARAGRAPHS" && <Paragraphs lineColor={lineColor} />}
				{props.item.id === "CONTENT_BULLET_POINTS" && <Bullets lineColor={lineColor} />}

				{needsOutline && (
					<Border
						style={{
							color: props.theme.colors.layoutOutline,
							borderRadius: borderRadius,
						}}
					/>
				)}

				{!props.selected && (
					<Border
						animate={{ opacity: isHovering ? 1 : 0 }}
						initial={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
						style={{
							color: props.theme.colors.t5,
							borderRadius: borderRadius,
						}}
					/>
				)}

				{((props.selected && props.pressingId === undefined) || props.pressingId === props.item.id) && (
					<Border
						style={{
							color: props.theme.colors.accent,
							borderRadius: borderRadius + 1,
							top: -1,
							left: -1,
							bottom: -1,
							right: -1,
						}}
					/>
				)}
			</Layout>
			<Label style={{ color: props.selected ? labelSelectedColor : labelColor }}>{props.label}</Label>
		</Item>
	);
};

const LineLong = styled(motion.div)`
	width: 85%;
	height: 3px;
	border-radius: 5px;
	margin-bottom: 3px;
	opacity: 0.5;
`;
const LineShort = styled(LineLong)`
	width: 70%;
`;
const Paragraphs = props => {
	return (
		<>
			<LineLong style={{ backgroundColor: props.lineColor }} />
			<LineShort style={{ backgroundColor: props.lineColor, width: "80%" }} />
			<LineLong style={{ backgroundColor: props.lineColor }} />
			<LineShort style={{ backgroundColor: props.lineColor }} />
			<LineLong style={{ backgroundColor: props.lineColor, marginBottom: 0, }} />
			{/* <LineShort style={{ backgroundColor: props.lineColor }} /> */}
		</>
	);
};
const BulletLine = styled(motion.div)`
	position: relative;
	height: 3px;
	border-radius: 5px;
	margin-left: 6px;
	margin-bottom: 4px;
	opacity: 0.5;
	:before {
		content: " ";
		position: absolute;
		left: -6.5px;
		y: -.5px;
		width: 3.5px;
		height: 3.5px;
		border-radius: 3px;
		background-color: inherit;
	}
`;
const Bullets = props => {
	return (
		<>
			<BulletLine style={{ backgroundColor: props.lineColor, width: 28 }} />
			<BulletLine style={{ backgroundColor: props.lineColor, width: 46 }} />
			<BulletLine style={{ backgroundColor: props.lineColor, width: 36 }} />
		</>
	);
};

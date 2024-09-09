import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { IconButton } from "../ds/Buttons";

const Box = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
	fill: none;
`;

const PropertiesEntryPoint = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
`;

export const TileSelectionBox = props => {
	const colors = props.theme.colors;
    const strokeWidth = 1.5;
	const goGray = props.isDragging || props.editing;
	const panelOpen = props.panelName === props.tileTypeInfo.settingsPanelId && props.sidePanelOpen;
	return (
		<Box>
			<SVG>
				<rect
					width="100%"
					height="100%"
					rx={props.borderRadius}
					stroke={goGray ? props.theme.colors.backgrounds.page : props.theme.colors.accent}
					strokeWidth={strokeWidth}
				/>
				<rect
					width="100%"
					height="100%"
					rx={props.borderRadius}
					stroke={goGray ? props.theme.colors.t4 : "transparent"}
					strokeWidth={strokeWidth}
				/>
			</SVG>
			<PropertiesEntryPoint
				style={{ left: "50%", top: 0, y: "-50%", x: "-50%" }}
				onPointerDown={e => {
					props.dragControls.start(e);
					props.resetTooltip();
					props.setHandleDragging(true);
					e.stopPropagation();
					e.preventDefault();
				}}
				// onPointerUp={e => {
				// 	props.setHandleDragging(false);
				// }}
				onTap={e => {
					props.onTileSettingsTap(props.tileTypeInfo.settingsPanelId);
				}}
			>
				<IconButton
					theme={props.theme}
					icon="More"
					width={30}
					height={16}
					borderRadius={4}
					iconSize={24}
					color={goGray ? colors.t7 : colors.tile.selected.handle.foreground}
					activeColor={goGray ? colors.t9 : colors.tile.selected.handle.foreground}
					pageColor={colors.backgrounds.page}
					backgroundColor={goGray ? colors.t4 : colors.accent}
					active={panelOpen}
					tooltip={[panelOpen ? "Close options" : "Click for options", "Drag to rearrange"]}
				/>
			</PropertiesEntryPoint>
		</Box>
	);
};

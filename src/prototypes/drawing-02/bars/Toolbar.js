import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { panelNames, TILES } from "../tiles/TileConstants";
import { transitions } from "../ds/Transitions";

import { IconButton } from "../ds/Buttons";

const Wrap = styled(motion.div)`
	position: fixed;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;

	/* z-index: 2; */
	/* pointer-events: none; */
`;

export const Toolbar = props => {
	const {
		sidePanelOpen,
		panelName,
		isPlayMode,
		currentPage,
		isGenerating,
		isReviewing,
		onToolbarButtonTap,
	} = useContext(TomeContext);

	

	return (
		<Wrap
			animate={{
				opacity: isPlayMode ? 0 : isGenerating || isReviewing ? 0.25 : 1,
			}}
			initial={false}
			transition={transitions.basic}
		>
			<IconButton
				key={"add-text-panel"}
				icon="Text"
				theme={currentPage.theme}
				
				onTap={e => {
					//onToolbarButtonTap(panelNames.ADD_TILE.name);
				}}
				active={panelName === panelNames.ADD_TILE.name && sidePanelOpen}
			/>

			<IconButton
				key={"add-media-panel"}
				icon="Photo"
				theme={currentPage.theme}
				
				onTap={e => {
					//onToolbarButtonTap(panelNames.ADD_TILE.name);
				}}
				active={panelName === panelNames.ADD_TILE.name && sidePanelOpen}
			/>

			<IconButton
				key={"add-shape-panel"}
				icon="Shapes"
				theme={currentPage.theme}
				
				onTap={e => {
					onToolbarButtonTap(TILES.DRAWING.addPanelId);
				}}
				active={panelName === TILES.DRAWING.addPanelId && sidePanelOpen}
			/>

			<IconButton
				key={"add-table-panel"}
				icon="Table"
				theme={currentPage.theme}
				
				onTap={e => {
					//onToolbarButtonTap(panelNames.ADD_TILE.name);
				}}
				active={panelName === panelNames.ADD_TILE.name && sidePanelOpen}
			/>

			<IconButton
				key={"add-tile-panel"}
				icon="GridOutline"
				theme={currentPage.theme}
				
				onTap={e => {
					//onToolbarButtonTap(panelNames.ADD_TILE.name);
				}}
				active={panelName === panelNames.ADD_TILE.name && sidePanelOpen}
			/>

			
			<IconButton
				key={"theme"}
				theme={currentPage.theme}
				
				icon="ColorPalette"
				onTap={e => {
					onToolbarButtonTap(panelNames.THEME.name);
				}}
				active={panelName === panelNames.THEME.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"page"}
				theme={currentPage.theme}
				
				icon="Preferences"
				onTap={e => {
					onToolbarButtonTap(panelNames.PAGE.name);
				}}
				active={panelName === panelNames.PAGE.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>
		</Wrap>
	);
};

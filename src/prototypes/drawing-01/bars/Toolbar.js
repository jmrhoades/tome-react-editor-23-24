import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { panelNames, tileNames } from "../tiles/TileConstants";
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
		selectedTile,
		isPlayMode,
		currentPage,
		isGenerating,
		isReviewing,
		onToolbarButtonTap,
	} = useContext(TomeContext);
	
	let icon = "";

	if (selectedTile) {
		//console.log(panelName, sidePanelOpen, selectedTile.type);
		for (const t in tileNames) {
			if (tileNames[t].name === selectedTile.type) {
				icon = tileNames[t].icon;
			}
		}
	}

	return (
		<Wrap
			animate={{
				opacity: isPlayMode ? 0 : isGenerating || isReviewing ? 0.25 : 1,
			}}
			initial={false}
			transition={transitions.basic}
		>
			{selectedTile && (
				<IconButton
					theme={currentPage.theme}
					height={40}
					isContextual={true}
					icon={icon}
					onTap={e => {
						onToolbarButtonTap(selectedTile.type);
					}}
					active={panelName === selectedTile.type && sidePanelOpen}
					backgroundColor={currentPage.theme.colors.t3}
					color={currentPage.theme.colors.t9}
					//color={currentPage.theme.colors.accent}
					//showBorder={true}
					// style={{pointerEvents: "auto"}}
				/>
			)}

			<IconButton
				key={"add-tile-panel"}
				icon="Add"
				theme={currentPage.theme}
				height={40}
				onTap={e => {
					onToolbarButtonTap(panelNames.ADD_TILE.name);
				}}
				active={panelName === panelNames.ADD_TILE.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"record-panel"}
				theme={currentPage.theme}
				height={40}
				icon="Record"
				onTap={e => {
					onToolbarButtonTap(panelNames.RECORD.name);
				}}
				active={panelName === panelNames.RECORD.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"theme"}
				theme={currentPage.theme}
				height={40}
				icon="ColorPaletteFill"
				onTap={e => {
					onToolbarButtonTap(panelNames.THEME.name);
				}}
				active={panelName === panelNames.THEME.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"page"}
				theme={currentPage.theme}
				height={40}
				icon="Preferences"
				onTap={e => {
					onToolbarButtonTap(panelNames.PAGE.name);
				}}
				active={panelName === panelNames.PAGE.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			{currentPage.background && (
				<IconButton
					theme={currentPage.theme}
					height={40}
					isContextual={true}
					icon={tileNames.BACKGROUND.icon}
					onTap={e => {
						onToolbarButtonTap(tileNames.BACKGROUND.name);
					}}
					active={panelName === tileNames.BACKGROUND.name && sidePanelOpen}
					//color={currentPage.theme.colors.accent}
					//showBorder={true}
					// style={{pointerEvents: "auto"}}
				/>
			)}

			{/* <IconButton
				key={"annotate-panel"}
				theme={currentPage.theme}
				height={40}
				icon="GridFilled"
				onTap={e => {
					onToolbarButtonTap(e, panelNames.ANNOTATIONS);
				}}
				active={panelName === panelNames.ANNOTATIONS && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/> */}
		</Wrap>
	);
};

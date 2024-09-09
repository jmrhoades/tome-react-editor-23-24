import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { TILES } from "../tiles/TileConstants";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
`;

export const DeselectCatch = props => {
	const {
		selectedTile,
		deselectTiles,
		setSidePanelOpen,
		setSelectedOutlinePage,
		sidePanelOpen,
		setShowContextMenu,
		setContextMenuInfo,
		promptIsOpen,
		setPromptIsOpen,
		closeMenu,
		menuInfo,
		isGenerating,
		isReviewing,
		setIsReviewing,
		textTileFocussed,
		setTextTileFocussed,
	} = useContext(TomeContext);
	return (
		<Wrap
			id="deselect_catch"
			onMouseEnter={() => {
				// setPointerOverInteractiveSurface(false);
			}}
			onMouseLeave={() => {
				// setPointerOverInteractiveSurface(true);
			}}
			onPointerDown={() => {
				if (menuInfo.show) {
					closeMenu();
					return false;
				}
				if (isGenerating) return false;

				if (isReviewing) {
					setIsReviewing(false);
					return false;
				}

				if (promptIsOpen) {
					setPromptIsOpen(false);
					return false;
				}

				if (textTileFocussed) {
					setTextTileFocussed(false);
				}

				if (selectedTile) {
					deselectTiles();
					return false;
				}

				if (sidePanelOpen) {
					setSidePanelOpen(false);
					return false;
				}

				setSelectedOutlinePage(false);
			}}
			onContextMenu={e => {
				if (selectedTile) {
					deselectTiles();
				}

				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: ["Dynamic Background"],
				});
				setShowContextMenu(true);

				e.preventDefault();
			}}
		></Wrap>
	);
};

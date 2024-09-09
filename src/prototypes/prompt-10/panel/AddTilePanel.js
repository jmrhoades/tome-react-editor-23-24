import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext, appendRowAtOrder } from "../tome/TomeContext";
import { AddTileButton } from "./controls/AddTileButton";
import { tileNames } from "../page/TileConstants";
import { PanelBackground } from "./Panels";

const Wrap = styled(motion.div)`
	position: relative;
`;

const TileTypes = styled(motion.div)`
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 102px);
	grid-template-rows: repeat(6, 102px);
	column-gap: 12px;
	row-gap: 12px;
	padding: 0px;
`;

const SearchField = styled(motion.input)`
	display: block;
	position: relative;
	width: 100%;
	appearance: none;
	outline: none;
	border-radius: 0;
	height: 45px;
    padding: 12px 14px;
    font-size: 17px;
    line-height: 21px;
    min-height: 32px;
	
	font-style: "normal";
	font-weight: 400;
	border-bottom: ${props => props.$theme.colors.t2} 1px solid;
	caret-color: ${props => props.$theme.colors.accent};
	color: ${props => props.$theme.colors.t8};
	
	::selection {
    	background-color:  ${props => props.$theme.colors.text.selection};
	}
	::placeholder {
		color: ${props => props.$theme.colors.t6};
		opacity: 1;
	}
}
`;

export const AddTilePanel = props => {
	const {
		dropIndicatorInfo,
		currentPage,
		tomeData,
		createTileInRowAtOrder,
		saveState,
		setLayoutTweaking,
		createBackground,
		selectBackground,
		appendNewTile,
	} = useContext(TomeContext);
	const { getDropInfoForXY } = useContext(MetricsContext);

	const [fadeControls, setFadeControls] = useState(false);

	// "Text", "Image", "Video", "Table", "Code", "Web", "Twitter", "Giphy", "Airtable", "Figma"
	const availableTiles = [
		tileNames.TEXT,
		tileNames.IMAGE,
		tileNames.TABLE,
		tileNames.VIDEO,
		tileNames.DIAGRAM,
		tileNames.CODE,
		tileNames.WEB,

		//tileNames.DALLE,
		
		//tileNames.BACKGROUND,
		

		tileNames.GIPHY,
		tileNames.FIGMA,
		tileNames.AIRTABLE,
		tileNames.TWITTER,
		tileNames.FRAMER,
		tileNames.MIRO,
		tileNames.LOOKER,
	];

	// console.log(panelName, tileNames.TEXT.name, sidePanelOpen);

	const onAddTileDragStart = (tileName, x, y) => {
		// console.log("onAddTileDragStart", tileName, x, y);
		//if (tileName !== tileNames.BACKGROUND.name) setLayoutTweaking(true);
		//panelOpacity.set(999);
	};

	const onAddTileDragEnd = (tileName, x, y, commit) => {
		console.log("onAddTileDragEnd", tileName, x, y, commit);
		setFadeControls(false);
		setLayoutTweaking(false);
		dropIndicatorInfo.opacity.set(0);
		dropIndicatorInfo.backgroundDropOpacity.set(0);

		if (tileName === tileNames.BACKGROUND.name) {
			console.log("BACKGROUND MAKE IT");
			createBackground();
			selectBackground();
			const dropInfo = { isValid: true };
			return dropInfo;
		} else {
			const dropInfo = getDropInfoForXY(x, y, { replace: true });
			dropInfo.isValid = false;
			if (
				dropInfo.dropZone === "ABOVE_PAGE" ||
				dropInfo.dropZone === "BELOW_PAGE" ||
				dropInfo.dropZone === "ABOVE_TILE" ||
				dropInfo.dropZone === "BELOW_TILE"
			) {
				// Create a new row and add new tiles to it
				const row = appendRowAtOrder(currentPage, tomeData, dropInfo.rowOrder);
				// addFilesToRowAtOrder(mediaFiles, row, 1);
				createTileInRowAtOrder(tileName, row, 1);
				saveState();
				dropInfo.isValid = true;
			} else if (dropInfo.dropZone === "LEFT_OF_TILE" || dropInfo.dropZone === "RIGHT_OF_TILE") {
				createTileInRowAtOrder(tileName, dropInfo.rowOver, dropInfo.tileOrder);
				saveState();
				dropInfo.isValid = true;
			}

			if (dropInfo.dropZone === "NONE") return false;
			return dropInfo;
		}
	};

	const onClickAdd = tileName => {
		if (tileName === tileNames.BACKGROUND.name) {
			console.log("BACKGROUND MAKE IT");
			createBackground();
			selectBackground();
		} else {
			appendNewTile(tileName);
		}
	};

	const onAddTileDrag = (tileName, x, y, commit, info) => {
		console.log("onAddTileDrag", tileName, x, y);

		if (fadeControls === false && (Math.abs(info.offset.x > 8) || Math.abs(info.offset.y > 8))) {
			console.log(info);
			panelZIndex.set(999);
			setFadeControls(true);
			setLayoutTweaking(true);
		}

		if (fadeControls === true) {
			if (tileName === tileNames.BACKGROUND.name) {
				dropIndicatorInfo.backgroundDropOpacity.set(1);
				const dropInfo = { isValid: false };
				return dropInfo;
			} else {
				const dropInfo = getDropInfoForXY(x, y, { replace: true });
				dropInfo.isValid = false;
				//console.log(dropInfo.dropZone);
				if (dropInfo.dropZone !== "NONE" && dropInfo.dropZone !== "CENTER_OF_TILE") {
					// console.log(dropInfo.hoverYPosition, dropInfo.hoverYRelative);
					dropIndicatorInfo.y.set(dropInfo.dropY);
					dropInfo.isValid = true;
					if (
						dropInfo.dropZone === "ABOVE_PAGE" ||
						dropInfo.dropZone === "BELOW_PAGE" ||
						dropInfo.dropZone === "ABOVE_TILE" ||
						dropInfo.dropZone === "BELOW_TILE"
					) {
						dropIndicatorInfo.x.set(dropInfo.indicatorX_NewRow);
						dropIndicatorInfo.width.set(dropInfo.indicatorWidth_NewRow);
						dropIndicatorInfo.height.set(dropInfo.indicatorHeight_NewRow);
						dropIndicatorInfo.opacity.set(1);
					}
					if (dropInfo.dropZone === "LEFT_OF_TILE" || dropInfo.dropZone === "RIGHT_OF_TILE") {
						dropIndicatorInfo.x.set(dropInfo.indicatorX_AddToRow);
						dropIndicatorInfo.width.set(dropInfo.indicatorWidth_AddToRow);
						dropIndicatorInfo.height.set(dropInfo.indicatorHeight_AddToRow);
						dropIndicatorInfo.opacity.set(1);
					}
					//console.log("dragOver", e.clientY, dropIndicatorY.get());
				} else {
					dropIndicatorInfo.opacity.set(0);
					//console.log("HIDE");
				}
				return dropInfo;
			}
		} else {
			const dropInfo = { isValid: false };
			return dropInfo;
		}
	};

	const panelZIndex = useMotionValue(0);

	return (
		<Wrap>
			<PanelBackground
				style={{
					background: currentPage.theme.colors.backgrounds.panel,
					borderRadius: 16,
					boxShadow: currentPage.theme.shadows.medium,
				}}
				animate={{
					opacity: fadeControls ? 0 : 1,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			/>
			<SearchField
				autoFocus
				placeholder="Add something..."
				$theme={currentPage.theme}
				animate={{
					opacity: fadeControls ? 0 : 1,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			></SearchField>
			<TileTypes
				style={{
					padding: 12,
					paddingTop: 18,
				}}
			>
				{availableTiles.map(tileType => (
					<AddTileButton
						tileName={tileType.name}
						tileIcon={tileType.icon}
						key={tileType.name}
						onAddTileDragStart={onAddTileDragStart}
						onAddTileDrag={onAddTileDrag}
						onAddTileDragEnd={onAddTileDragEnd}
						onClickAdd={onClickAdd}
						theme={props.theme}
						fadeControls={fadeControls}
					/>
				))}
			</TileTypes>
		</Wrap>
	);
};

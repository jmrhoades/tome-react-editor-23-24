import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { transitions } from "../../ds/Transitions";

import { Panels } from "../popovers/panels/panels";
import { Panel } from "../../ds/panel/Panel";
import { TomeContext } from "../../tome/TomeContext";

export const ColorPanel = props => {
	const { saveState } = React.useContext(TomeContext);
	const { selectedTiles, tomeData, currentPage, colorPanel } = props;

	let key = colorPanel ? colorPanel.id : "";
	selectedTiles.forEach(t => (key += t.id));

	const info = Panels.PROPERTIES;

	const isMultiselection = selectedTiles.length > 1;
	let panelTitle = "";
	let sameType = true;
	let isRootContainer = false;
	let selectionCount = selectedTiles.length;
	if (isMultiselection) {
		let currentType = selectedTiles[0].type;
		selectedTiles.forEach(t => {
			if (t.type !== currentType) sameType = false;
			currentType = t.type;
		});

		if (!sameType) {
			panelTitle = "Mixed";
		} else {
			panelTitle = currentType;
		}
	} else if (selectedTiles.length === 1) {
		panelTitle = selectedTiles[0].type;

		isRootContainer = currentPage.tiles[0].id === selectedTiles[0].id;
	}

	if (panelTitle === "FLEX") panelTitle = "Container";
	if (panelTitle === "IMAGE") panelTitle = "Media";
	if (panelTitle === "TEXT") panelTitle = "Text";
    
	if (isRootContainer) panelTitle = "Page";

    /*
    const panel = {
		id: key,
		type: info.type,
		title: panelTitle,
		selectionCount: selectionCount,
		titleBig: info.titleBig,
		higherZ: info.higherZ,
		instruction: info.instruction,
		content: info.content,
		anchor: info.anchor,
		offset: info.offset,
		selectedTiles: selectedTiles,
		width: info.width,
		draggable: info.draggable,
		closeCallback: e => {
			tomeData.editor.showPropertyPanel = false;
			saveState();
		},
	};
    */
    
    if(colorPanel) {
        colorPanel.id = key;
        colorPanel.selectedTiles = selectedTiles;
        
    }
    


	return (
		<>
			{colorPanel && (
				<AnimatePresence>
					<Panel key={key} panel={colorPanel} tomeData={tomeData} />
				</AnimatePresence>
			)}
		</>
	);
};

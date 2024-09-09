import React from "react";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "./EditorContext";

import { EditorStyles } from "../ds/styles/Editor";
import { LightModeStyles } from "../ds/styles/LightMode";
import { DarkModeStyles } from "../ds/styles/DarkMode";

import { Viewport } from "./Viewport";
import { Tile } from "../tiles/Tile";

import { Bars } from "./bars/Bars";
import { Panel } from "../ds/panel/Panel";
import { Menu } from "../ds/menu/Menu";

import { TileDragPlaceholder } from "./TileDragPlaceholder";
import { DragSelector } from "./DragSelector";
import { Selected } from "./Selected";
import { SelectionHud } from "./SelectionHud";

import { TileHoverSelect } from "./TileHoverSelect";
import { TileDropZones } from "./TileDropZones";
import { DropIndicator } from "./DropIndicator";
import { Outline } from "../outline/Outline";

export const Editor = props => {
	const { tomeData, findTilesByKeyValue, getTiles, getSelectedTiles, getCurrentPage } = React.useContext(TomeContext);
	const { panel, menu, event, dragSelection, isMobileView } = React.useContext(EditorContext);

	const UIModeStyles = getCurrentPage().theme.mode === "light" ? LightModeStyles : DarkModeStyles;

	const tiles = getTiles();
	const selectedTiles = findTilesByKeyValue("selected", true);

	// console.log("Render editor");

	return (
		<>
			<EditorStyles />

			<UIModeStyles />

			<Viewport tomeData={tomeData} selectedTiles={selectedTiles} />

			{isMobileView() && <MobileScrim />}

			{/* <TileDragPlaceholder selectedTiles={selectedTiles} event={event} tomeData={tomeData} /> */}

			<Outline pages={tomeData.tiles} currentPage={getCurrentPage()} />

			<Tile tile={getCurrentPage()} />

			<TileHoverSelect tomeData={tomeData} tiles={tiles} selectedTiles={selectedTiles} event={event} />

			<TileDropZones tomeData={tomeData} tiles={tiles} event={event} />

			<Selected selectedTiles={selectedTiles} event={event} tomeData={tomeData} />

			<SelectionHud selectedTiles={selectedTiles} event={event} tomeData={tomeData} />

			<DragSelector dragSelection={dragSelection} currentPage={getCurrentPage()} />

			<Bars />

			<Panel panel={panel} tomeData={tomeData} />

			<Menu menu={menu} tomeData={tomeData} />

			<DropIndicator />

			{/* <Popover /> */}
		</>
	);
};

const MobileScrim = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.1);
`;

import React from "react";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "./EditorContext";

import { EditorStyles } from "../ds/styles/Editor";
import { LightModeStyles } from "../ds/styles/LightMode";
import { DarkModeStyles } from "../ds/styles/DarkMode";

import { Viewport } from "./Viewport";
import { Tile as ViewTile } from "../tiles/view/Tile";
import { EditTiles } from "../tiles/edit/Tile";

import { Bars } from "./bars/Bars";
import { Panel } from "../ds/panel/Panel";
import { Menu } from "../ds/menu/Menu";

import { TileDragPlaceholder } from "./TileDragPlaceholder";
import { DragSelector } from "./DragSelector";
import { Selected } from "./Selected";
import { SelectionHud } from "./SelectionHud";

import { TileHoverSelect } from "./TileHoverSelect";
import { DraggingBackground } from "./DraggingBackground";
import { DropIndicator } from "./DropIndicator";
import { Outline } from "../outline/Outline";
import { PageScale } from "../tiles/PageScale";

export const Editor = props => {
	const { tomeData, findTilesByKeyValue, getTiles, getCurrentPage } = React.useContext(TomeContext);
	const { panel, menu, event, dragSelection, isMobileView, draggingPortalRef } = React.useContext(EditorContext);

	const currentPage = getCurrentPage();
	const tiles = getTiles();
	const selectedTiles = findTilesByKeyValue("selected", true);

	const UIModeStyles = currentPage.theme.mode === "light" ? LightModeStyles : DarkModeStyles;

	// console.log("Render editor");

	return (
		<>
			<EditorStyles />

			<UIModeStyles />

			<Viewport tomeData={tomeData} selectedTiles={selectedTiles} />

			{isMobileView() && <MobileScrim />}

			{/* <TileDragPlaceholder selectedTiles={selectedTiles} event={event} tomeData={tomeData} /> */}

			<Outline pages={tomeData.tiles} currentPage={currentPage} />

			<PageScale tile={currentPage}>
				<ViewTile tile={currentPage} />
			</PageScale>

			{/* <DraggingBackground selectedTiles={selectedTiles} event={event} tomeData={tomeData} /> */}

			<EditTiles tiles={tiles} />
			
			<TileHoverSelect tomeData={tomeData} tiles={tiles} selectedTiles={selectedTiles} event={event} />

			<Selected selectedTiles={selectedTiles} event={event} tomeData={tomeData} />

			<SelectionHud selectedTiles={selectedTiles} event={event} tomeData={tomeData} />

			<DragSelector dragSelection={dragSelection} currentPage={getCurrentPage()} />

			<Bars />

			<Panel panel={panel} tomeData={tomeData} />

			<Menu menu={menu} tomeData={tomeData} />

			<DropIndicator />

			{/* <DraggingPortal ref={draggingPortalRef} /> */}

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
	background-color: rgba(0, 0, 0, 0.1);
`;

const DraggingPortal = styled.div`
	position: absolute;
	top: 0;
	left: 0;
`;

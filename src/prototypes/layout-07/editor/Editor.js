import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "./EditorContext";
import { PopoverContext } from "./popovers/PopoverContext";

import { EditorStyles } from "../ds/styles/Editor";
import { LightModeStyles } from "../ds/styles/LightMode";
import { DarkModeStyles } from "../ds/styles/DarkMode";

import { Viewport } from "./viewport/Viewport";
import { Tile } from "../tiles/Tile";

import { Bars } from "./bars/Bars";
import { Panel } from "../ds/panel/Panel";
import { Menu } from "../ds/menu/Menu";

import { DragPlaceholder } from "./drop/DragPlaceholder";
import { DragSelector } from "./selection/DragSelector";

//import { Selected } from "./Selected";
import { SelectionHud } from "./selection/SelectionHud";
import { DropIndicator } from "./drop/DropIndicator";
import { Outline } from "../outline/Outline";
import { PageScale } from "../tiles/PageScale";
import { OverflowIndicator } from "./viewport/OverflowIndicator";
import { DropRectViz } from "./drop/DropRectViz";
import { Tooltip } from "./popovers/tooltips/Tooltip";
import { SelectionBox } from "./selection/SelectionBox";
import { LingerRectViz } from "./drop/LingerRect";
import { TextSelectionHUD } from "./popovers/huds/TextFormatBar";
import { SelectionPanel } from "./selection/SelectionPanel";
import { PlayModeTitleBar } from "./bars/PlayModeTitleBar";
import { pageBackground } from "../tome/TileData";
import { ColorPanel } from "./selection/ColorPanel";

export const Editor = props => {
	const { tomeData, findTilesByKeyValue, getCurrentPage } = React.useContext(TomeContext);
	const { dragSelection, isMobileView, isPlayMode, event, setPageBackgroundColor } = React.useContext(EditorContext);
	const { panel, menu, flyoutMenu, colorPanel } = React.useContext(PopoverContext);

	const currentPage = getCurrentPage();
	const selectedTiles = findTilesByKeyValue("selected", true);

	const UIModeStyles = currentPage.theme.mode === "light" ? LightModeStyles : DarkModeStyles;

	/*
	const metaThemeColor = document.querySelector("meta[name=theme-color]");
	if (
		(tomeData.editor.background === pageBackground.EDITOR && !isPlayMode()) ||
		tomeData.editor.background === pageBackground.EDITOR_AND_PRESENT
	) {
		// find the canvas color
		const isDark = currentPage.theme.mode === "dark";
		const pageColor = chroma(currentPage.theme.tokens["--page-color"]);
		const luminance = pageColor.luminance();
		const luminanceMin = 0.02;
		let canvasColor = "#fff";
		let pageShadow = "unset";

		// Change the value of the CSS variable
		
		if (luminance < luminanceMin) {
			canvasColor = pageColor.brighten(0.2).hex();
			//pageShadow = `0px 0px 1px 0px hsla(0, 0%, 100%, 0.12), 0px 0px 50px 0px hsla(0, 0%, 0%, 0.1)`;
		} else {
			canvasColor = pageColor.darken(0.2).hex();
			//pageShadow = `0px 0px 1px 0px hsla(0, 0%, 0%, 0.2), 0px 0px 40px 0px hsla(0, 0%, 0%, 0.01)`;
		}
		

		//console.log(luminance, canvasColor);

		document.body.style.setProperty("background-color", canvasColor);
		metaThemeColor.setAttribute("content", canvasColor);
		document.documentElement.style.setProperty("--page-shadow", pageShadow);

	} else {
		document.body.style.setProperty("background-color", currentPage.theme.tokens["--page-color"]);
		metaThemeColor.setAttribute("content", currentPage.theme.tokens["--page-color"]);
		document.documentElement.style.setProperty("--page-shadow", "unset");
		
	}
	// console.log("Render editor");
	*/

	React.useEffect(() => {
		setPageBackgroundColor();
	}, [tomeData]);

	return (
		<>
			<EditorStyles />

			<UIModeStyles />

			<Viewport tomeData={tomeData} selectedTiles={selectedTiles} />

			{isMobileView() && <MobileScrim />}

			{!isPlayMode() && <Outline pages={tomeData.tiles} currentPage={currentPage} />}

			<PageScale tile={currentPage}>
				<Tile tile={currentPage} />
			</PageScale>

			{!isPlayMode() && (
				<>
					{/* <DragPlaceholder /> */}

					<OverflowIndicator />

					<SelectionBox selectedTiles={selectedTiles} event={event} tomeData={tomeData} />

					<SelectionHud selectedTiles={selectedTiles} tomeData={tomeData} />

					<TextSelectionHUD />

					<DropIndicator />

					<DragSelector dragSelection={dragSelection} currentPage={getCurrentPage()} />

					<Bars />

					<Panel panel={panel} tomeData={tomeData} selectedTiles={selectedTiles} />

					<ColorPanel
						colorPanel={colorPanel}
						tomeData={tomeData}
						selectedTiles={selectedTiles}
						currentPage={currentPage}
					/>

					<SelectionPanel selectedTiles={selectedTiles} tomeData={tomeData} currentPage={currentPage} />

					<Menu menu={menu} tomeData={tomeData} />

					<Menu menu={flyoutMenu} tomeData={tomeData} />

					<DropRectViz />

					<LingerRectViz />
				</>
			)}

			{isPlayMode() && <PlayModeTitleBar />}

			<Tooltip />
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

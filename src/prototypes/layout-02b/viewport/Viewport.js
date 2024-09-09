import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { EventContext } from "../event/EventContext";

import { Tile } from "../tile/Tile";
import { DragRect } from "./DragRect";

import { TempLayoutToggle } from "../ds/buttons/TempLayoutToggle";
import { TempAddButton } from "../ds/buttons/TempAddButton";
import { TempShuffleButton } from "../ds/buttons/TempShuffleButton";

import { TileView } from "../tile/TileView";
import { LayoutContext } from "../layout/LayoutContext";

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		margin: 0;
		padding: 0;
		height: 100%;
		overflow-x: clip;
		user-select: none;
		-webkit-user-select: none;
	}
	body {
		color: ${props => props.$fgcolor};
		background-color: ${props => props.$bgcolor};
	}
	#viewport {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center; // this needs to be off for the padding to work when taller than 16x9
		height: 100%;
		/* padding:  78px 128px; */
	}
`;

export const Viewport = props => {
	const { currentPage, getTiles } = React.useContext(TomeContext);
	const { onViewportPointerDown } = React.useContext(EventContext);
	const { pageScale, gap, cornerRadius } = React.useContext(LayoutContext);

	console.log("RENDER tiles:", currentPage.tiles);
	return (
		<motion.div
			id="viewport"
			onPointerDown={onViewportPointerDown}
			style={{ "--page-scale": pageScale, "--gap": gap, "--corner-radius": cornerRadius }}
		>
			<GlobalStyle $bgcolor={currentPage.theme.colors.backgrounds.canvas} $fgcolor={currentPage.theme.colors.t7} />

			<TileView tile={currentPage.root} />

			{getTiles().map(tile => (
				<Tile key={tile.id} tile={tile} />
			))}

			<DragRect />

			<TempLayoutToggle />
			<TempAddButton />
			<TempShuffleButton />
		</motion.div>
	);
};

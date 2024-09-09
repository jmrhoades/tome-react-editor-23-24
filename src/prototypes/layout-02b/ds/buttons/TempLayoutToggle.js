import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue } from "framer-motion";

import { TomeContext } from "../../tome/TomeContext";
import { layout } from "../../layout/LayoutDefaults";
import { Icon } from "../Icon";
import { Button } from "../Components";


export const TempLayoutToggle = props => {
	const { currentPage, selectionMotionValue, getSelectedTiles, setTileLayout } = React.useContext(TomeContext);

	const [tile, setTile] = React.useState(getSelectedTiles()[0]);
	useMotionValueEvent(selectionMotionValue, "change", latest => setTile(getSelectedTiles()[0]));

	const backgroundColor = useMotionValue(currentPage.theme.colors.t0);

	return (
		<motion.div
			style={{
				position: "absolute",
				top: "50%",
				right: 10,
				y: "calc(-150% - 8px)",
			}}
		>
			{tile && (
				<Button
					style={{
						width: 28,
						height: 28,

						borderRadius: 6,
						backgroundColor: backgroundColor,
						transition: "background-color 0.2s ease-in-out",
					}}
					onHoverStart={() => {
						backgroundColor.set(currentPage.theme.colors.t4);
					}}
					onHoverEnd={() => {
						backgroundColor.set(currentPage.theme.colors.t0);
					}}
					onPointerDown={e => {
						e.stopPropagation();
					}}
					onTap={e => {
						const newLayout = tile.layout === layout.ROW ? layout.COLUMN : layout.ROW;
						setTileLayout(tile, newLayout)
						console.log("tap", tile.layout);
						
						//saveState();
					}}
				>
					<Icon name={tile.layout === layout.COLUMN ? "ArrowDown" : "ArrowRight"} />
				</Button>
			)}
		</motion.div>
	);
};

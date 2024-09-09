import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { HudButton } from "../../../ds/button/HudButton";

export const PageHud = props => {
	const { setTileScrolling, setTileLayoutScaleContent } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);
	const { tile } = props;

	// console.log(props.tile)

	const pageLockActive = !tile.layout.scrolling && !tile.layout.scaleContent;
	const pageScrolls = tile.layout.scrolling;
	const pageScales = tile.layout.scaleContent;

	return (
		<>
			<HudButton
				iconName={"PageLockAlt"}
				onTap={e => {
					setTileScrolling(tile, false);
					setTileLayoutScaleContent(tile, false);
					e.stopPropagation();
				}}
				active={pageLockActive}
				style={{
					"--color": pageLockActive ? "var(--t9)" : "var(--t7)",
					"--active-background-color": "transparent",
				}}
			/>
			<HudButton
				iconName="PageScroll"
				onTap={e => {
                    setTileScrolling(tile, true);
					setTileLayoutScaleContent(tile, false);
					e.stopPropagation();
				}}
				active={pageScrolls}
				style={{
					"--color": pageScrolls ? "var(--t9)" : "var(--t7)",
					"--active-background-color": "transparent",
				}}
			/>

			<HudButton
				iconName={"CollapseFlipped"}
				onTap={e => {
                    setTileScrolling(tile, false);
					setTileLayoutScaleContent(tile, true);
					e.stopPropagation();
				}}
				active={pageScales}
				style={{
					"--color": pageScales ? "var(--t9)" : "var(--t7)",
					"--active-background-color": "transparent",
				}}
			/>
		</>
	);
};

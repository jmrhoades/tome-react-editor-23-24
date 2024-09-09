import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { HudButton } from "../../ds/button/HudButton";
import { Panels } from "../panels/Panels";
import { alignYOptions, alignXOptions } from "../menus/alignOptions";
import { FlexHudAlignmentMenu } from "../hudMenus/FlexHudAlignmentMenu";
import { FlexHudGapMenu } from "../hudMenus/FlexHudGapMenu";

export const FlexHud = props => {
	const { setTileLayoutDirection, setTileAutoSize } = React.useContext(TomeContext);
	const { togglePanel, panel } = React.useContext(EditorContext);
	const { tile } = props;

	//const alignYIcon = alignYOptions.find(o => o.value === tile.layout.justifyContent).icon;
	const alignXIcon = alignXOptions.find(o => o.value === tile.layout.alignItems).icon;

	const [alignMenuOpen, setAlignMenuOpen] = React.useState(false);
	const toggleAlignmentMenu = e => {
		togglePanel(null, e);
		setGapMenuOpen(false);
		setAlignMenuOpen(!alignMenuOpen);
	};


	const [gapMenuOpen, setGapMenuOpen] = React.useState(false);
	const toggleGapMenu = e => {
		togglePanel(null, e);
		setAlignMenuOpen(false);
		setGapMenuOpen(!gapMenuOpen);
	};

	return (
		<>
			{/* <HudButton type="fontColor" color={"var(--t9)"} /> */}

			<HudButton
				iconName={tile.layout.width === "fill" ? "FillSquare" : "FitSquare"}
				//iconName={tile.layout.width === "fill" ? "ArrowLeftRightOut" : "ArrowLeftRightIn"}
				onTap={e => {
					const v = tile.layout.width === "fill" ? "hug" : "fill";
					setAlignMenuOpen(false);
					setGapMenuOpen(false);
					setTileAutoSize(tile, v, v);
					e.stopPropagation();
				}}
			/>

			<HudButton
				iconName={tile.layout.direction === "column" ? "ArrowDown" : "ArrowRight"}
				onTap={e => {
					setAlignMenuOpen(false);
					setGapMenuOpen(false);
					setTileLayoutDirection(tile, tile.layout.direction === "column" ? "row" : "column");
					e.stopPropagation();
				}}
			/>

			<HudButton
				iconName={alignXIcon}
				menu={FlexHudAlignmentMenu}
				menuItemCallBack={() => setAlignMenuOpen(false)}
				active={alignMenuOpen}
				onTap={e => {
					toggleAlignmentMenu(e);
					e.stopPropagation();
				}}
				tile={tile}
			/>

			<HudButton
				iconName={tile.layout.direction === "row" ? "ColumnGap" : "RowGap"}
				menu={FlexHudGapMenu}
				menuItemCallBack={() => setGapMenuOpen(false)}
				active={gapMenuOpen}
				onTap={e => {
					toggleGapMenu(e);
					e.stopPropagation();
				}}
				tile={tile}
			/>

			{/* <HudButton iconName="ColumnGap" /> */}
			<HudButton
				iconName="Preferences"
				active={panel && panel.type === Panels.FLEX_SETTINGS.type}
				onTap={e => {
					setAlignMenuOpen(false);
					setGapMenuOpen(false);
					togglePanel(Panels.FLEX_SETTINGS, e, tile, {});
				}}
			/>
		</>
	);
};

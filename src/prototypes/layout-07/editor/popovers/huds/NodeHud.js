import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { PopoverContext } from "../PopoverContext";
import { HudButton, hudButtonTypes } from "../../../ds/button/HudButton";
import { HudDivider } from "../../../ds/hud/HudDivider";
import { Panels } from "../panels/panels";

export const NodeHud = props => {
	const { saveState } = React.useContext(TomeContext);
	const { groupSelection } = React.useContext(EditorContext);
	const { togglePanel, panel, toggleMenu, menu, hidePanel } = React.useContext(PopoverContext);

	const { selectedTiles, tomeData } = props;

	

	// One tile or many?
	const isMultiselection = selectedTiles.length > 1;
	let tile = selectedTiles[0];
	if (isMultiselection) {
		//tile = props.panel.tile[0];
	}

	let sameType = true;
	if (isMultiselection) {
		let currentType = selectedTiles[0].type;
		selectedTiles.forEach(t => {
			if (t.type !== currentType) sameType = false;
			currentType = t.type;
		});
	}

	const type = tile ? tile.type : false;

	return (
		<>
			{/* <HudButton
				type={hudButtonTypes.LABEL}
				label="Group"
				onTap={e => {
					groupSelection();
					e.stopPropagation();
				}}
			/> */}

			<HudButton
				type={hudButtonTypes.ICON}
				iconName="Group"
				onTap={e => {
					groupSelection();
					e.stopPropagation();
				}}
				tooltip={"Wrap in container"}
			/>
			{/* <HudDivider /> */}
			<HudButton
				type={hudButtonTypes.ICON}
				iconName="Preferences"
				//active={panel && panel.type === Panels.FLEX}
				active={tomeData.editor.showPropertyPanel}
				onTap={e => {
					//togglePanel(panelComponent, e, selectedTiles);
					hidePanel();
					tomeData.editor.showPropertyPanel = !tomeData.editor.showPropertyPanel;
					saveState();
					e.stopPropagation();
				}}
				tooltip={"Settings"}
			/>
		</>
	);
};

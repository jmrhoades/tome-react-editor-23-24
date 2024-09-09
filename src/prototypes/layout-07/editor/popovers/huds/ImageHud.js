import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { HudButton, hudButtonTypes } from "../../../ds/button/HudButton";
import { containerHeightOptions, containerWidthOptions } from "../../../tome/TileData";
import { HudDivider } from "../../../ds/hud/HudDivider";
import { PopoverContext } from "../PopoverContext";
import { Panels } from "../panels/panels";
import { HudLabel } from "../../../ds/hud/HudLabel";

export const ImageHud = props => {
	const { setTileAspectRatio, saveState, tomeData } = React.useContext(TomeContext);

	const { selectParent } = React.useContext(EditorContext);

	const { togglePanel, panel, hidePanel } = React.useContext(PopoverContext);

	const { tile, hudRef } = props;
	return (
		<>
			{/* <HudButton
				type={hudButtonTypes.UP}
				onTap={e => {
					selectParent();
					e.stopPropagation();
				}}
			/> */}

			{/* <HudDivider /> */}

			{/* <HudLabel>Media</HudLabel> */}

			<HudButton
				type={hudButtonTypes.ICON}
				iconName="Swap"
				onTap={e => {
					e.stopPropagation();
				}}
				tooltip={"Replace"}
			/>

			<HudButton
				type={hudButtonTypes.ICON}
				iconName={"Crop"}
				onTap={e => {
					e.stopPropagation();
				}}
				tooltip={"Crop"}
			/>
			<HudButton
				type={hudButtonTypes.ICON}
				iconName={"Title"}
				onTap={e => {
					e.stopPropagation();
				}}
				tooltip={"Add text"}
			/>

			<HudButton
				type={hudButtonTypes.ICON}
				iconName={"Preferences"}
				//active={panel && panel.type === Panels.IMAGE.type}
				active={tomeData.editor.showPropertyPanel}
				onTap={e => {
					//togglePanel(Panels[tile.type], e, tile, hudRef);
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

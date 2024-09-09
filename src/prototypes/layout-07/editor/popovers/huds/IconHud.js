import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { PopoverContext } from "../PopoverContext";
import { HudButton } from "../../../ds/button/HudButton";

export const IconHud = props => {
	const { setTileAspectRatio } = React.useContext(TomeContext);
	const { togglePanel, panel, toggleMenu,  menu } = React.useContext(PopoverContext);

	// console.log(props.tile)

	return (
		<>
			<HudButton
				iconName="DoubleSparkle"
				onTap={e => {
					e.stopPropagation();
				}}
			/>
			<HudButton
				type="fontColor"
				color={"var(--t9)"}
				onTap={e => {
					e.stopPropagation();
				}}
			/>
			<HudButton
				iconName={"Crop"}
				onTap={e => {
					e.stopPropagation();
				}}
			/>
			<HudButton
				iconName={"Preferences"}
				onTap={e => {
					e.stopPropagation();
				}}
			/>
		</>
	);
};

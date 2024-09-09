import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";

import { HudButton } from "../../ds/button/HudButton";
export const TextHud = props => {
	//const { setTileAspectRatio } = React.useContext(TomeContext);
	//const { toggleMenu } = React.useContext(EditorContext);

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
				iconName="TextSize"
				onTap={e => {
					e.stopPropagation();
				}}
			/>
			<HudButton
				iconName="AlignLeft"
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

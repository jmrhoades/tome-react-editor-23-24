import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { HudButton } from "../../ds/button/HudButton";

export const ImageHud = props => {
	const { setTileAspectRatio } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

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
				iconName={"Swap"}
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
				iconName={"Title"}
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

import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";

export const LayoutTypesMenu = props => {
	const { setTileLayoutType } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;

	return (
		<>
			{LayoutTypeOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileLayoutType(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.layout.type}
					disabled={o.disabled}
				/>
			))}
		</>
	);
};

export const LayoutTypeOptions = [
	{
		id: "auto",
		label: "Auto",
		value: "auto",
	},
	{
		id: "overlay",
		label: "Overlay",
		value: "overlay",
		disabled: true,
	},
	{
		id: "canvas",
		label: "Canvas",
		value: "canvas",
		disabled: true,
	},
];

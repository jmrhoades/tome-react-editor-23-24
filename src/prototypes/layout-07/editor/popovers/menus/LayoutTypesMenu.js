import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";

export const LayoutTypesMenu = props => {
	const { setTileLayoutType, setContentDirection } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;

	return (
		<>
			{LayoutTypeOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						//setTileLayoutType(tile, o.value);
						setContentDirection(tile, o.value);
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
		id: "vertical",
		label: "Vertically",
		value: "vertical",
		icon: "ArrowDown",
	},
	{
		id: "horizontal",
		label: "Horizontally",
		value: "horizontal",
		icon: "ArrowRight",
	},
	{
		id: "stack",
		label: "Stacked",
		value: "overlay",
		icon: "CircleOutline",
		disabled: true,
	},
	{
		id: "canvas",
		label: "Absolute",
		value: "canvas",
		icon: "CircleOutline",
		disabled: true,
	},
];



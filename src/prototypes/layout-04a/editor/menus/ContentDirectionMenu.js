import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";

export const ContentDirectionMenu = props => {
	const { setTileLayoutDirection } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;

	return (
		<>
			{contentDirectionOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileLayoutDirection(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.layout.direction}
					disabled={o.disabled}
					leadingIcon={o.icon}
				/>
			))}
		</>
	);
};

export const contentDirectionOptions = [
	{
		id: "horizontal",
		label: "Rows",
		value: "horizontal",
		icon: "ArrowRight"
	},
	{
		id: "vertical",
		label: "Columns",
		value: "vertical",
		icon: "ArrowDown"
	},
];

import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";

export const JustifyContentOptions = props => {
	const { setTileLayoutJustifyContent } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;

	return (
		<>
			{LayoutJustifyContentOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileLayoutJustifyContent(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.layout.justifyContent}
				/>
			))}
		</>
	);
};

export const LayoutJustifyContentOptions = [
	{
		id: "start",
		label: "Left",
		value: "start",
	},

	{
		id: "center",
		label: "Middle",
		value: "center",
	},
	{
		id: "end",
		label: "Right",
		value: "end",
	},
];

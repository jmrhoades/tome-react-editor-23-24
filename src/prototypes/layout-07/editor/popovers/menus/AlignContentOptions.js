import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { PopoverContext } from "../PopoverContext";

export const AlignContentOptions = props => {
	const { setTileLayoutAlignContent } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(PopoverContext);


	const tile = props.menu.tile;

	return (
		<>
			{LayoutAlignContentOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileLayoutAlignContent(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.layout.alignItems}
				/>
			))}
		</>
	);
};

export const LayoutAlignContentOptions = [
	{
		id: "start",
		label: "Start",
		value: "start",
	},
    {
		id: "end",
		label: "End",
		value: "end",
	},
    {
		id: "center",
		label: "Center",
		value: "center",
	},
	{
		id: "stretch",
		label: "Fill",
		value: "stretch",
	},
    {
		id: "space-around",
		label: "Space around",
		value: "space-around",
	},
    {
		id: "space-between",
		label: "Space between",
		value: "space-between",
	},
	{
		id: "space-evenly",
		label: "Space evenly",
		value: "space-evenly",
	},
];

import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { PopoverContext } from "../PopoverContext";

export const AspectRatioMenu = props => {
	const { setTileAspectRatio } = React.useContext(TomeContext);

	const { toggleMenu } = React.useContext(PopoverContext);


	const tile = props.menu.tile;
	return (
		<>
			{AspectRatioOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileAspectRatio(tile, o);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.layout.aspectRatio.value}
				/>
			))}
			<MenuItem label={"Custom…"} />
		</>
	);
};

export const AspectRatioOptions = [
	{
		id: "aspect_ratio_16x9",
		label: "16:9",
		value: 16 / 9,
	},
	{
		id: "aspect_ratio_4x3",
		label: "4:3",
		value: 4 / 3,
	},
	{
		id: "aspect_ratio_1x1",
		label: "1:1",
		value: 1,
	},
	{
		id: "aspect_ratio_9x16",
		label: "9:16",
		value: 9 / 16,
	},
];

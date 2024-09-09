import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { PopoverContext } from "../PopoverContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { backgroundOptions } from "../../../tome/TileData";

export const BackgroundMenu = props => {
	const { setContainerBackgroundType } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(PopoverContext);

	const tile = props.menu.tile;

	return (
		<>
			{backgroundOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						//setTileLayoutType(tile, o.value);
						setContainerBackgroundType(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.background.type}
					disabled={o.disabled}
				/>
			))}
		</>
	);
};



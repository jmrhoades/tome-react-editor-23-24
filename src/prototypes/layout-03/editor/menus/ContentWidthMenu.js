import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";
import { contentSizingOptions } from "./contentSizingOptions";

export const ContentWidthMenu = props => {
	const { setTileAutoSize } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;

	return (
		<>
			{contentSizingOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileAutoSize(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={o.value === tile.layout.width}
					disabled={o.disabled}
					leadingIcon={o.icon}
				/>
			))}
		</>
	);
};


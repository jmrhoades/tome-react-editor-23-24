import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { PopoverContext } from "../PopoverContext";
import { pageBackgroundOptions } from "../../../tome/TileData";

export const PageBackgroundMenu = props => {
	
	const { setPageBackgroundVisibility } = React.useContext(TomeContext);

	const { toggleMenu, hideFlyoutMenu } = React.useContext(PopoverContext);

	return (
		<>
			{pageBackgroundOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setPageBackgroundVisibility(o.value);
						hideFlyoutMenu(); 
						toggleMenu(false, e);
					}}
					checked={o.value === props.tomeData.editor.background}
				/>
			))}
		</>
	);
};


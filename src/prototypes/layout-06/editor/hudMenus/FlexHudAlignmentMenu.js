import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";
import { alignXOptions, alignYOptions } from "../menus/alignOptions";

import { HudMenu } from "../../ds/hud/HudMenu";
import { SegmentedControl } from "../../ds/segmented/SegmentedControl";

export const FlexHudAlignmentMenu = props => {
	const { anchorRef, tile } = props;

	const { setTileLayoutAlignItems, setTileLayoutJustifyContent } = React.useContext(TomeContext);
	//const { toggleMenu } = React.useContext(EditorContext);

	return (
		<HudMenu anchorRef={anchorRef} tile={tile}>
			
			<SegmentedControl
				options={alignXOptions}
				value={tile.layout.alignItems}
				submit={v => {
					setTileLayoutAlignItems(tile, v);
					props.menuItemCallBack();
				}}
				hud
			/>
			<SegmentedControl
				options={alignYOptions}
				value={tile.layout.justifyContent}
				submit={v => {
					setTileLayoutJustifyContent(tile, v);
					props.menuItemCallBack();
				}}
				hud
			/>
		</HudMenu>
	);
};

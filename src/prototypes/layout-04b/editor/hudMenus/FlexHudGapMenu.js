import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";
import { alignXOptions, alignYOptions } from "../menus/alignOptions";

import { HudMenu } from "../../ds/hud/HudMenu";
import { SegmentedControl } from "../../ds/segmented/SegmentedControl";
import { Field } from "../../ds/field/Field";
import { Label } from "../../ds/Label";

export const FlexHudGapMenu = props => {
	const { anchorRef, tile } = props;

	const { setTileGap } = React.useContext(TomeContext);
	//const { toggleMenu } = React.useContext(EditorContext);

	return (
		<HudMenu anchorRef={anchorRef} tile={tile}>
			<Label type="RowFlex" hud>
				<span style={{
                    paddingLeft: "4px",
                    paddingRight: "6px",
                }}>Gap size</span>
				<Field value={tile.layout.gap} submit={v => setTileGap(tile, v)} width={32} hud />
			</Label>
		</HudMenu>
	);
};

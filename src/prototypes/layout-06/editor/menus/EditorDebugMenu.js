import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";

export const EditorDebugMenu = props => {
	const { tomeData } = React.useContext(TomeContext);
	const { toggleMenu, setEditorDebugOption } = React.useContext(EditorContext);

	return (
		<>
			<MenuItem
				label={"Show drop zones"}
				onTap={e => {
					setEditorDebugOption("showDropZones", !tomeData.editor.debug.showDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showDropZones}
			/>
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

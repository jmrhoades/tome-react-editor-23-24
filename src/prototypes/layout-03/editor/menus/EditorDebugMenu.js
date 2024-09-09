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
				label={"Show tile backgrounds"}
				onTap={e => {
					setEditorDebugOption("showTileBackgrounds", !tomeData.editor.debug.showTileBackgrounds);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showTileBackgrounds}
			/>

			<MenuItem
				label={"Show tile hover"}
				onTap={e => {
					setEditorDebugOption("showTileHover", !tomeData.editor.debug.showTileHover);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showTileHover}
			/>

			<MenuItem
				label={"Show new container drop zones"}
				onTap={e => {
					setEditorDebugOption("showNewContainerDropZones", !tomeData.editor.debug.showNewContainerDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showNewContainerDropZones}
			/>

			<MenuItem
				label={"Show reorder drop zones"}
				onTap={e => {
					setEditorDebugOption("showReorderDropZones", !tomeData.editor.debug.showReorderDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showReorderDropZones}
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

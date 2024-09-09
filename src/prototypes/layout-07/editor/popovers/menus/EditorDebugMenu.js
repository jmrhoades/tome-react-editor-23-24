import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { PopoverContext } from "../PopoverContext";

export const EditorDebugMenu = props => {
	const { tomeData } = React.useContext(TomeContext);
	const { setEditorDebugOption } = React.useContext(EditorContext);
	const { toggleMenu } = React.useContext(PopoverContext);

	return (
		<>
			<MenuItem
				label={"Show resize areas"}
				onTap={e => {
					setEditorDebugOption("showResizeHitAreas", !tomeData.editor.debug.showResizeHitAreas);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showResizeHitAreas}
			/>

			<MenuItem
				label={"Show no op drop zones"}
				onTap={e => {
					setEditorDebugOption("showNoOpDropZones", !tomeData.editor.debug.showNoOpDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showNoOpDropZones}
			/>

			<MenuItem
				label={"Show main axis drop zones"}
				onTap={e => {
					setEditorDebugOption("showMainAxisDropZones", !tomeData.editor.debug.showMainAxisDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showMainAxisDropZones}
			/>

			<MenuItem
				label={"Show cross axis drop zones"}
				onTap={e => {
					setEditorDebugOption("showCrossAxisDropZones", !tomeData.editor.debug.showCrossAxisDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showCrossAxisDropZones}
			/>

			{/* <MenuItem
				label={"Show linger drop zones"}
				onTap={e => {
					setEditorDebugOption("showDropZones", !tomeData.editor.debug.showDropZones);
					toggleMenu(false, e);
				}}
				checked={tomeData.editor.debug.showDropZones}
			/>

			 */}
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

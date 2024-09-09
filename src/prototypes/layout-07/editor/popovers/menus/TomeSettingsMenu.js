import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { MenuDivider } from "../../../ds/menu/MenuDivider";
import { PopoverContext } from "../PopoverContext";
import { tileTypes } from "../../../tome/TileData";
import { Panels } from "../panels/panels";
import { menus } from "./menus";

export const TomeSettingsMenu = props => {
	const { tomeData, setEditorBackgroundVisibility } = React.useContext(TomeContext);

	const { pasteAfterTile, pasteIntoTile, clipboardEmpty, undoEmpty, getCurrentPage } = React.useContext(TomeContext);
	const {
		deleteSelection,
		undoEdit,
		duplicateSelection,
		cutSelection,
		copySelection,
		selectParent,
		groupSelection,
		ungroupSelection,
		selectChildren,
	} = React.useContext(EditorContext);

	const { toggleMenu, showFlyoutMenu, flyoutMenu } = React.useContext(PopoverContext);

	return (
		<>
			<MenuItem
				label={"Duplicate"}
				leadingIcon={"DuplicateSquare"}
				onTap={e => {
					toggleMenu(false, e);
				}}
			/>
            <MenuItem
				label={"Rename"}
				leadingIcon={"Rename"}
				onTap={e => {
					toggleMenu(false, e);
				}}
			/>
            <MenuItem
				label={"Export to PDF"}
				leadingIcon={"Download"}
				onTap={e => {
					toggleMenu(false, e);
				}}
			/>
            <MenuItem
				label={"Add logo"}
				leadingIcon={"PlusSquareOutline"}
				onTap={e => {
					toggleMenu(false, e);
				}}
			/>
            <MenuItem
				label={"Add to folder…"}
				leadingIcon={"Folder"}
				onTap={e => {
					toggleMenu(false, e);
				}}
			/>
			<MenuDivider />
			<MenuItem
				label={"Page background"}
				leadingIcon={"RectangleLandscape"}
				// onTap={e => {
				// 	setEditorBackgroundVisibility(!tomeData.editor.showPageBackground);
				// 	toggleMenu(false, e);
				// }}
				//checked={tomeData.editor.showPageBackground}
                flyout={true}
				onPointerEnter={e => {
					if (flyoutMenu && flyoutMenu.type === menus.PAGE_BACKGROUND.type) {
					} else {
						showFlyoutMenu(menus.PAGE_BACKGROUND, e);
					}
				}}
				active={flyoutMenu && flyoutMenu.type === menus.PAGE_BACKGROUND.type}
			/>

			<MenuDivider />
			<MenuItem
				label={"Undo"}
				leadingIcon={"Undo"}
				onTap={e => {
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "Z"]}
			/>
			<MenuItem
				label={"Redo"}
				leadingIcon={"Redo"}
				onTap={e => {
					toggleMenu(false, e);
				}}
				shortcut={["⇧", "⌘", "Z"]}
			/>
			<MenuDivider />
			<MenuItem
				label={"Delete"}
				leadingIcon={"DeleteAlt"}
				destructive={true}
				onTap={e => {
					toggleMenu(false, e);
				}}
			/>
		</>
	);
};

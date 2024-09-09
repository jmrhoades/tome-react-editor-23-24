import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { MenuDivider } from "../../../ds/menu/MenuDivider";
import { PopoverContext } from "../PopoverContext";
import { pageBackgroundOptions } from "../../../tome/TileData";
import { Panels } from "../panels/panels";
import { menus } from "./menus";

export const ViewportContextMenu = props => {
	const { pasteIntoTile, clipboardEmpty, undoEmpty, getCurrentPage } = React.useContext(TomeContext);
	const { deleteSelection, undoEdit } = React.useContext(EditorContext);

	const { toggleMenu, showFlyoutMenu, flyoutMenu } = React.useContext(PopoverContext);

	const currentPage = getCurrentPage();

	return (
		<>
			<MenuItem
				label={"Paste"}
				onTap={e => {
					pasteIntoTile(currentPage.tiles[0]);
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "V"]}
				disabled={clipboardEmpty()}
			/>

			<MenuItem
				label={"Undo"}
				onTap={e => {
					undoEdit();
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "Z"]}
				disabled={undoEmpty()}
			/>

			<MenuItem
				label={"Redo"}
				onTap={e => {
					deleteSelection();
					toggleMenu(false, e);
				}}
				shortcut={["⇧", "⌘", "Z"]}
				disabled={true}
			/>

			<MenuDivider />

			<MenuItem
				label={"Page background"}
				//onTap={e => {
				//setEditorBackgroundVisibility(!tomeData.editor.showPageBackground);
				//toggleMenu(false, e);
				//}}
				//checked={tomeData.editor.showPageBackground}
				flyout={true}
				onPointerEnter={e => {
					if (flyoutMenu && flyoutMenu.type === menus.PAGE_BACKGROUND.type) {
					} else {
						showFlyoutMenu(menus.PAGE_BACKGROUND, e);
					}
				}}
				active={flyoutMenu && flyoutMenu.type === menus.PAGE_BACKGROUND.type}
				//flyoutOptions={pageBackgroundOptions}
			/>
		</>
	);
};

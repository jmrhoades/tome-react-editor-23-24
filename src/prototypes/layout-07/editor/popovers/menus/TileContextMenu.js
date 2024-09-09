import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { MenuDivider } from "../../../ds/menu/MenuDivider";
import { PopoverContext } from "../PopoverContext";
import { tileTypes } from "../../../tome/TileData";
import { Panels } from "../panels/panels";

export const TileContextMenu = props => {
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

	const { toggleMenu, showPanel } = React.useContext(PopoverContext);
	const { menu } = props;

	const currentPage = getCurrentPage();
	const isRootContainer = menu.tile.id === currentPage.tiles[0].id;

	return (
		<>
			<MenuItem
				label={"Cut"}
				onTap={e => {
					cutSelection();
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "X"]}
			/>

			<MenuItem
				label={"Copy"}
				onTap={e => {
					copySelection();
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "C"]}
			/>

			<MenuItem
				label={"Paste"}
				onTap={e => {
					pasteAfterTile(menu.tile);
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "V"]}
				disabled={clipboardEmpty()}
			/>

			{menu.tile.type === tileTypes.FLEX && (
				<MenuItem
					label={"Paste into"}
					onTap={e => {
						pasteIntoTile(menu.tile);
						toggleMenu(false, e);
					}}
					shortcut={["⇧", "⌘", "V"]}
					disabled={clipboardEmpty()}
				/>
			)}
			{!isRootContainer && (
				<MenuItem
					label={"Duplicate"}
					onTap={e => {
						duplicateSelection();
						toggleMenu(false, e);
					}}
					shortcut={["⌘", "D"]}
				/>
			)}
			<MenuItem
				label={"Delete"}
				onTap={e => {
					deleteSelection();
					toggleMenu(false, e);
				}}
				shortcut={["del"]}
				destructive={true}
			/>
			<MenuDivider />
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
			{menu.tile.type === tileTypes.FLEX && (
				<MenuItem
					label={"Select items"}
					onTap={e => {
						selectChildren();
						toggleMenu(false, e);
					}}
					shortcut={["⏎"]}
				/>
			)}
			{!isRootContainer && (
				<MenuItem
					label={"Select container"}
					onTap={e => {
						selectParent();
						toggleMenu(false, e);
					}}
					shortcut={["⇧", "⏎"]}
				/>
			)}
			{!isRootContainer && menu.tile.type === tileTypes.FLEX && (
				<MenuItem
					label={"Ungroup"}
					onTap={e => {
						ungroupSelection();
						toggleMenu(false, e);
					}}
					shortcut={["⇧", "⌘", "G"]}
				/>
			)}
			{!isRootContainer && (
				<MenuItem
					label={"Group"}
					onTap={e => {
						groupSelection();
						toggleMenu(false, e);
					}}
					shortcut={["⌘", "G"]}
				/>
			)}
			<MenuItem
				label={"Settings"}
				onTap={e => {
					showPanel(Panels[menu.tile.type], e, menu.tile);
					toggleMenu(false, e);
				}}
				shortcut={["⌘", "⏎"]}
			/>
		</>
	);
};

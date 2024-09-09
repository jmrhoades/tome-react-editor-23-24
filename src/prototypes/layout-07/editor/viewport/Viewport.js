import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { EditorContext } from "../EditorContext";
import { TomeContext } from "../../tome/TomeContext";
import { PopoverContext } from "../popovers/PopoverContext";
import { Panels } from "../popovers/panels/panels";
import { menus } from "../popovers/menus/menus";

export const Viewport = props => {
	const { findTilesByKeyValue, incrementPage, saveState } = React.useContext(TomeContext);

	const {
		deselectTiles,
		selectParent,
		selectChildren,
		selectAll,
		deleteSelection,
		duplicateSelection,
		groupSelection,
		undoEdit,
		moveSelectedTileIndex,
		onViewportPointerDown,
		keysPressed,
		keysPressedMotionValue,
		shiftKeyDown,
		optionKeyDown,
		cancelDragOperation,
		allowHover,
		cutSelection,
		copySelection,
		pasteAfterSelection,
		inputFocused,
		togglePlayMode,
		isPlayMode,
	} = React.useContext(EditorContext);

	const {
		panel,
		menu,
		colorPanel,
		
		onViewportPointerDownPopover,
		togglePanel,
		toggleMenu,
		showMenu,
		showPanel,
		hideColorPanel,
	} = React.useContext(PopoverContext);

	const { tomeData, selectedTiles } = props;

	const onKeyDown = e => {
		console.log("Key down:", e.key, e.metaKey, e.repeat);
		let stopPropagation = false;

		if (e.repeat) return;

		if (e.key === "Escape") {
			if (isPlayMode()) {
				togglePlayMode();
			} else if (menu) {
				toggleMenu(null, e);
			} else if (panel) {
				togglePanel(null, e);
			} else if (colorPanel) {
				hideColorPanel();
			} else if (tomeData.editor.showPropertyPanel) {
				tomeData.editor.showPropertyPanel = false;
				saveState();
			} else if (!allowHover.current) {
				cancelDragOperation();
			} else {
				deselectTiles();
			}
			stopPropagation = true;
		}

		// if (isPlayMode()) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	return;
		// }

		if (e.key === "Meta" && e.metaKey) {
			keysPressedMotionValue.set(e.key);
			stopPropagation = true;
		}

		if (e.key === "Alt") {
			if (!keysPressed.current.includes(e.key)) {
				keysPressed.current.push(e.key);
				stopPropagation = true;
			}
			optionKeyDown.set(e.key);
		}

		if (e.key === "Shift") {
			if (!keysPressed.current.includes(e.key)) {
				keysPressed.current.push(e.key);
				stopPropagation = true;
			}
			shiftKeyDown.set(e.key);
		}

		if (e.key === "a" && e.metaKey) {
			selectAll();
			stopPropagation = true;
		}

		if (e.key === "g" && e.metaKey) {
			groupSelection();
			stopPropagation = true;
		}

		if (e.key === "x" && e.metaKey) {
			cutSelection();
			stopPropagation = true;
		}

		if (e.key === "c" && e.metaKey) {
			copySelection();
			stopPropagation = true;
		}

		if (e.key === "v" && e.metaKey) {
			pasteAfterSelection();
			stopPropagation = true;
		}

		if (e.key === "d" && e.metaKey) {
			duplicateSelection();
			stopPropagation = true;
		}

		//if (e.key === "p" && keysPressed.current.includes("Alt")) {
		if (e.key === "π") {
			togglePlayMode();
			stopPropagation = true;
		}

		if (e.key === "Enter" && e.metaKey) {
			const selectedTiles = findTilesByKeyValue("selected", true);
			if (selectedTiles.length > 0) {
				showPanel(Panels[selectedTiles[0].type], e, selectedTiles[0]);
			}
			stopPropagation = true;
		}

		if (e.key === "z" && e.metaKey) {
			undoEdit();
			stopPropagation = true;
		}

		if (e.key === "Backspace") {
			deleteSelection();
		}

		if (e.key === "ArrowRight") {
			if (selectedTiles.length > 0) {
				moveSelectedTileIndex(1);
			} else {
				incrementPage(1);
			}
			stopPropagation = true;
		}

		if (e.key === "ArrowLeft") {
			if (selectedTiles.length > 0) {
				moveSelectedTileIndex(-1);
			} else {
				incrementPage(-1);
			}
			stopPropagation = true;
		}

		if (e.key === "ArrowUp") {
			if (selectedTiles.length > 0) {
				moveSelectedTileIndex(-1);
			} else {
				incrementPage(-1);
			}
			stopPropagation = true;
		}

		if (e.key === "ArrowDown") {
			if (selectedTiles.length > 0) {
				moveSelectedTileIndex(1);
			} else {
				incrementPage(1);
			}

			stopPropagation = true;
		}

		if (e.key === "Enter") {
			if (keysPressed.current.includes("Shift")) {
				selectParent();
			} else {
				selectChildren();
			}

			stopPropagation = true;
		}

		if (stopPropagation) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const onKeyUp = e => {
		// console.log("Key up:", e.key);
		let stopPropagation = false;

		if (e.key === "Shift") {
			const index = keysPressed.current.indexOf(e.key);
			if (index !== -1) keysPressed.current.splice(index, 1);
			shiftKeyDown.set("");
			stopPropagation = true;
		}

		if (e.key === "Alt") {
			const index = keysPressed.current.indexOf(e.key);
			if (index !== -1) keysPressed.current.splice(index, 1);
			optionKeyDown.set("");
			stopPropagation = true;
		}

		if (e.key === "Meta") {
			keysPressedMotionValue.set("");
			stopPropagation = true;
		}

		if (stopPropagation) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const onPointerDown = e => {
		onViewportPointerDownPopover(e);
		onViewportPointerDown(e);
	};

	React.useEffect(() => {
		if (!inputFocused) {
			document.addEventListener("pointerdown", onPointerDown);
			document.addEventListener("keydown", onKeyDown);
			document.addEventListener("keyup", onKeyUp);
		}

		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
	}, [menu, panel, colorPanel, tomeData, inputFocused]);

	return (
		<Wrap
			id="viewport"
			onKeyDown={onKeyDown}
			onKeyUp={onKeyUp}
			onPointerEnter={e => {
				//onViewportPointerEnter(e);
			}}
			onContextMenu={e => {
				showMenu(menus.VIEWPORT_CONTEXT, e);
				e.preventDefault();
				e.stopPropagation();
			}}
		></Wrap>
	);
};

const Wrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
`;

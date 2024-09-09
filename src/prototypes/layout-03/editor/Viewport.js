import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { EditorContext } from "./EditorContext";
import { TomeContext } from "../tome/TomeContext";

export const Viewport = props => {
	const {
		panel,
		menu,
		togglePanel,
		toggleMenu,
		deselectTiles,
		deleteSelection,
		duplicateSelection,
		groupSelection,
		undoEdit,
		moveSelectedTileIndex,
		onViewportPointerDown,
		keysPressed,
	} = React.useContext(EditorContext);

	const { incrementPage } = React.useContext(TomeContext);

	const { tomeData, selectedTiles } = props;

	const onKeyDown = e => {
		console.log("Key down:", e.key, e.repeat);
		let stopPropagation = false;

		if (e.repeat) return;

		if (e.key === "Escape") {
			if (menu) {
				toggleMenu(null, e);
				stopPropagation = true;
			} else if (panel) {
				togglePanel(null, e);
				stopPropagation = true;
			} else {
				deselectTiles();
			}
		}

		if (e.key === "g" && e.metaKey) {
			groupSelection();
			stopPropagation = true;
		}

		if (e.key === "d" && e.metaKey) {
			duplicateSelection();
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
				incrementPage(-1);
			}
			stopPropagation = true;
		}

		if (e.key === "ArrowLeft") {
			if (selectedTiles.length > 0) {
				moveSelectedTileIndex(-1);
			} else {
				incrementPage(1);
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

		if (e.key === "Shift") {
			if (!keysPressed.current.includes(e.key)) {
				keysPressed.current.push(e.key);
				stopPropagation = true;
			}
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
			stopPropagation = true;
		}

		if (stopPropagation) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	React.useEffect(() => {
		document.addEventListener("pointerdown", onViewportPointerDown);
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
		return () => {
			document.removeEventListener("pointerdown", onViewportPointerDown);
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
	}, [menu, panel, tomeData]);

	return (
		<Wrap
			id="viewport"
			onPointerEnter={e => {
				//onViewportPointerEnter(e);
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

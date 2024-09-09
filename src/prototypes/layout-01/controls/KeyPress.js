import React, { useContext, useEffect, useState } from "react";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { ClipboardContext } from "../tome/ClipboardContext";
import { TooltipContext } from "../tooltips/TooltipContext";

import useSound from "use-sound";


import { TILES } from "../tiles/TileConstants";

export const KeyPress = props => {
	const {
		goToNextPage,
		goToPreviousPage,
		currentPage,
		deleteTile,
		selectedTile,
		deselectTiles,
		selectedOutlinePage,
		setSelectedOutlinePage,
		deletePage,
		setSidePanelOpen,
		sidePanelOpen,
		exitPlayMode,
		enterPlayMode,
		isPlayMode,
		showContextMenu,
		setShowContextMenu,
		duplicateTile,
		undo,
		textTileFocussed,
		setTextTileFocussed,
		backgroundSelected,
		setBackgroundSelected,
		deleteBackground,
		setPromptIsOpen,
		promptIsOpen,
		isGenerating,
		menuInfo,
		closeMenu,
		isReviewing,
		setIsReviewing,
		selectNextTile,
		selectPreviousTile,
		onToolbarButtonTap,
		moveTileWithKeyboard,
		selectTileAbove,
		selectTileBelow,
		tabToNextTile,
		incrementTileWidth,
		incrementTileHeight,
		tomeData,
	} = useContext(TomeContext);
	const { scrollTileIntoView, getRowForY, getTileForXY, getRowAndSideForXY } = useContext(MetricsContext);
	const { copySelectionToClipboard, pasteFromClipboard } = useContext(ClipboardContext);
	const { hideTooltip } = React.useContext(TooltipContext);

	const [pressedKey, setPressedKey] = useState("");
	const [secondPressKey, setSecondPressedKey] = useState("");


	useEffect(() => {
		const onKeyDown = e => {
			const key = e.key;

			

			//e.preventDefault();
			//e.stopPropagation();

			// Added for placeholder contenteditable stuff
			// Look into focussing on type
			if (selectedTile && selectedTile.type === TILES.TEXT.name && textTileFocussed && key !== "Escape") {
				return;
			}

			if (selectedTile && selectedTile.editing) {
				return;
			}

			console.log("New Key!", "key", key, e);

			hideTooltip();

			if (pressedKey !== key) {
				// Capture modifier keys
				if (key === "Meta" || key === "Shift" || key === "Alt" || key === "Control") {
					setPressedKey(key);
				}
				switch (key) {
					case "Tab":
						if (!promptIsOpen) {
							tabToNextTile();
							e.preventDefault();
							e.stopPropagation();
						}
						break;
					case "ArrowRight":
						if (selectedTile) {
							if (pressedKey === "Meta") {
								moveTileWithKeyboard(selectedTile, "right");
								
							} else if (pressedKey === "Alt") {
								const success = incrementTileWidth(selectedTile, 1);
								
							} else {
								selectNextTile(selectedTile);
							}
							e.preventDefault();
						} else {
							if (!promptIsOpen || isGenerating || isReviewing) {
								goToNextPage();
								e.preventDefault();
							}
						}
						break;
					case "ArrowLeft":
						if (selectedTile) {
							if (pressedKey === "Meta") {
								moveTileWithKeyboard(selectedTile, "left");
								
							} else if (pressedKey === "Alt") {
								const success = incrementTileWidth(selectedTile, -1);
								
							} else {
								selectPreviousTile(selectedTile);
							}
							e.preventDefault();
						} else {
							if (!promptIsOpen || isGenerating || isReviewing) {
								goToPreviousPage();
								e.preventDefault();
							}
						}
						break;
					case "ArrowUp":
						if (selectedTile) {
							//goToPreviousPage();
							if (pressedKey === "Meta") {
								moveTileWithKeyboard(selectedTile, "up");
								
							} else if (pressedKey === "Alt") {
								const success = incrementTileHeight(selectedTile, -1);
								
							} else {
								selectTileAbove(selectedTile);
							}
							e.preventDefault();
						} else {
							if (!promptIsOpen || isGenerating || isReviewing) {
								goToPreviousPage();
								e.preventDefault();
							}
						}
						break;
					case "ArrowDown":
						if (selectedTile) {
							if (pressedKey === "Meta") {
								moveTileWithKeyboard(selectedTile, "down");
								
							} else if (pressedKey === "Alt") {
								const success = incrementTileHeight(selectedTile, 1);
								
							} else {
								selectTileBelow(selectedTile);
							}
							e.preventDefault();
						} else {
							if (!promptIsOpen || isGenerating || isReviewing) {
								goToNextPage();
								e.preventDefault();
							}
						}
						break;

					case "Enter":
						if (selectedTile && selectedTile.type === TILES.TEXT.name) {
							/*
							const el = document.getElementById(selectedTile.params.blocks[0].id);
							if (el) {
								el.tabIndex = 1;
								const s = window.getSelection();
								const r = document.createRange();
								r.setStart(el, el.childElementCount);
								r.setEnd(el, el.childElementCount);
								s.removeAllRanges();
								s.addRange(r);
							}
							console.log(el)
							e.preventDefault();
							*/
						}
						if (selectedTile) {
							onToolbarButtonTap(selectedTile.type);
						}
						break;
					case "Escape":
						if (isGenerating) return;

						if (menuInfo.show) {
							closeMenu();
							return false;
						}
						if (isReviewing) {
							setIsReviewing(false);
						}
						if (showContextMenu) {
							setShowContextMenu(false);
							
							return false;
						}
						if (promptIsOpen) {
							setPromptIsOpen(false);
							return false;
						}
						if (textTileFocussed) {
							setTextTileFocussed(false);
							return false;
						}
						if (selectedOutlinePage) {
							setSelectedOutlinePage(null);
						}
						if (sidePanelOpen) {
							setSidePanelOpen(false);
						}
						if (selectedTile) {
							deselectTiles();
						}
						if (isPlayMode) {
							exitPlayMode();
						}
						if (backgroundSelected) {
							setBackgroundSelected(false);
						}
						break;
					case "Backspace":
						if (promptIsOpen) return;

						if (sidePanelOpen) {
							setSidePanelOpen(false);
						}
						if (selectedTile) {
							if (selectedTile.type === TILES.DRAWING.name && selectedTile.selectedIds) {
								//console.log("Object selected, don't delete");
								e.preventDefault();
								return;
							} else {
								deleteTile(selectedTile);
								
							}
						}
						if (selectedOutlinePage) {
							deletePage(selectedOutlinePage);
							
						}
						if (showContextMenu) {
							setShowContextMenu(false);
						}
						if (backgroundSelected) {
							deleteBackground();
						}
						break;
					case " ":
						if (promptIsOpen) return;
						if (isGenerating) return;
						if (menuInfo.show) return;
						if (isReviewing) return;
						if (showContextMenu) return;
						if (textTileFocussed) return;
						console.log("SPACEEE");

						if (!promptIsOpen) {
							setPromptIsOpen(true);
							e.preventDefault();
						}

						break;
					case "p":
						if (promptIsOpen) return;
						if (isPlayMode) {
							exitPlayMode();
						} else {
							enterPlayMode();
						}

						break;
					case "P":
						if (promptIsOpen) return;
						if (isPlayMode) {
							exitPlayMode();
						} else {
							enterPlayMode();
						}

						break;
					case "k":
						if (pressedKey === "Meta") {
							if (sidePanelOpen) {
								setSidePanelOpen(false);
							}
							closeMenu();
							setPromptIsOpen(!promptIsOpen);
							if (showContextMenu) {
								setShowContextMenu(false);
							}
							e.preventDefault();
						}
						break;
					case "x":
						// if (pressedKey === "Meta" && selectedTile && !promptIsOpen) {
						// 	console.log("cut!");
						// 	cutTile(selectedTile);
						// 	e.preventDefault();
						// }
						break;
					case "c":
						// if (pressedKey === "Meta" && selectedTile && !promptIsOpen) {
						// 	console.log("copy!");
						// 	copyTile(selectedTile);
						//	e.preventDefault();
						// }
						break;
					case "v":
						if (pressedKey === "Meta" && !promptIsOpen) {
							//pasteFromClipboard();
							//if (!copiedTile.current) return false;
							//e.preventDefault();
							/*
							if (tileHoveringId.get()) {
								const hoveredTile = getTileForId(tileHoveringId.get());
								if (hoveredTile && hoveredTile.isNull && copiedTile.current.type === hoveredTile.type) {
									console.log(tileHoveringId.get(), hoveredTile);
									replaceWithClipboard(hoveredTile);
									if (showContextMenu) setShowContextMenu(false);
									return false;
								}
							}

							if (selectedTile && selectedTile.isNull && copiedTile.current.type === selectedTile.type) {
								replaceWithClipboard();
								if (showContextMenu) setShowContextMenu(false);
								return false;
							}

							const info = getRowAndSideForXY();
							let t = false;
							console.log("paste!", info);
							if (info.row) {
								t = pasteClipboardToRow(info.row, info.direction);
							} else if (info.rowGapIndex !== 0) {
								t = pasteClipboardToRowGapIndex(info.rowGapIndex);
							} else {
								t = pasteClipboardToPage(info.direction);
							}
							if (t) {
								
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
							*/
						}

						break;
					case "d":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("duplicate!");
							const t = duplicateTile(selectedTile);
							
							if (t) {
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
							e.preventDefault();
						}

						break;
					// case "r":
					// 	if (pressedKey === "Meta" && selectedTile) {
					// 		console.log("replace!");
					// 		replaceWithClipboard();
					// 		if (showContextMenu) {
					// 			setShowContextMenu(false);
					// 		}
					// 	}
					// 	e.preventDefault();
					// 	break;
					case "z":
						if (pressedKey === "Meta" && !promptIsOpen) {
							console.log("undo!");
							undo();
							
						}
						e.preventDefault();
						break;
					default:
						break;
				}
			}

			//e.preventDefault();
			return false;
		};

		const onKeyUp = ({ key }) => {
			if (key === pressedKey) {
				setPressedKey("");
			}
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pressedKey, setPressedKey, currentPage, selectedTile, deleteTile, isPlayMode]);

	return <></>;
};

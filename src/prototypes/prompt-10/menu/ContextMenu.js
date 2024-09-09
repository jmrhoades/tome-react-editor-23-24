import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { tileNames } from "../page/TileConstants";
import { Icon } from "../../../ds/Icon";


const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
`;

const ClickCover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: transparent;
	user-select: none;
`;

const Menu = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const MenuItem = styled(motion.div)`
	min-width: 148px;
	padding: 6px 8px;
	display: flex;
	margin-bottom: 2px;
	cursor: pointer;
	/* justify-content: space-between; */
	border-radius: 6px;
	background-color: transparent;
	transition: background-color 0.1s ease-in-out;

	&:last-child {
		margin-bottom: 0px;
	}

	&:hover {
		background-color: rgba(237, 0, 235, 1);
		& :nth-child(2) {
			color: white;
		}
	}
	&.disabled {
		& :nth-child(1) {
			color: rgba(255, 255, 255, 0.25);
		}
		& :nth-child(2) {
			color: rgba(255, 255, 255, 0.25);
		}
	}
	&.disabled:hover {
		background-color: rgba(237, 0, 235, 0);
		& :nth-child(2) {
			color: rgba(255, 255, 255, 0.4);
		}
	}
`;
const MenuItemDivider = styled(motion.div)`
	padding: 6px 8px;
`;
const MenuItemDestructive = styled(MenuItem)`
	&:hover {
		background-color: #ff443b;
		& :nth-child(1) {
			color: white;
		}
		& :nth-child(2) {
			color: white;
		}
	}
`;
// const MenuItemIcon = styled(motion.div)`
// 	display: grid;
// 	padding: 0 8px 0 0;
// 	> * {
// 		margin: auto;
// 	}
// `;

// const MenuItemLabelWrap = styled(motion.div)`
// 	display: flex;
// 	justify-content: flex-start;
// `;

const MenuItemIcon = styled(motion.div)`
	margin-right: 8px;
`;

const MenuItemLabel = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	color: white;
	transition: color 0.1s ease-in-out;
	padding-right: 24px;
`;

const MenuItemInfo = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 17px;
	padding: 8px;
	padding-top: 4px;
`;

const MenuItemHeader = styled(motion.div)`
	padding-bottom: 4px;
`;

const MenuItemBody = styled(motion.div)`
	margin-bottom: -4px;
`;

const MenuItemLabelDestructive = styled(MenuItemLabel)`
	color: #ff443b;
`;
const MenuItemShortcut = styled(motion.div)`
	
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;
	color: rgba(255, 255, 255, 0.4);
	transition: color 0.1s ease-in-out;
`;
const MenuItemShortcutDestructive = styled(MenuItemShortcut)`
	color: #ff443b;
`;
const MenuItemDividerLine = styled(motion.div)`
	height: 1px;
	background-color: rgba(255, 255, 255, 0.08);
`;

export const ContextMenu = props => {
	const {
		deleteTile,
		cutTile,
		copyTile,
		showContextMenu,
		setShowContextMenu,
		contextMenuInfo,
		selectedTile,
		//pasteClipboard,
		//replaceWithClipboard,
		duplicateTile,
		//pasteClipboardAfterSelectedTile,
		//pasteClipboardAfterRow,
		//pasteClipboardAfterTile,
		//pasteClipboardToRow,
		//pasteClipboardToPage,
		//pasteClipboardToRowGapIndex,
		replaceTileWithClipboardTile,
		pasteFromClipboardToNearestPosition,
		getNewImageTile,
		updateImageTileWithImage,
		currentPage,
		createDynamicBackground,
		onToolbarButtonTap,
	} = useContext(TomeContext);

	const { scrollTileIntoView, getRowAndSideForXY, metrics } = useContext(MetricsContext);

	const [canPaste, setCanPaste] = useState(false);
	const tileFromClipboard = useRef();
	const blobFromClipboard = useRef();

	


	//const pasteLabel = selectedTile && canPaste ? "Paste to replace" : "Paste";

	/*
	useEffect(() => {
		if (showContextMenu) {
			const getClipboardContents = async () => {
				try {
					// TODO — I think this needs to be in an click-event handler for Safari
					// https://webkit.org/blog/10855/async-clipboard-api/
					const clipboardItems = await navigator.clipboard.read();
					for (const item of clipboardItems) {
						for (const type of item.types) {
							if (type === "text/plain") {
								const blob = await item.getType(type);
								const tileString = await blob.text();
								try {
									tileFromClipboard.current = JSON.parse(tileString);
									setCanPaste(true);
								} catch (err) {
									console.error(err.name, err.message); // bad json
									setCanPaste(false);
									tileFromClipboard.current = null;
								}
							}
							if (type === "image/png") {
								blobFromClipboard.current = await item.getType(type);
								setCanPaste(true);
							}
						}
					}
				} catch (err) {
					console.error(err.name, err.message);
				}
			};
			getClipboardContents();
			document.body.style.overflow = "hidden";
			playOpenMenuSound();
		} else {
			document.body.style.overflow = "auto";
			tileFromClipboard.current = null;
		}
	}, [showContextMenu, setCanPaste, playOpenMenuSound]);
	*/

	const hasCut = contextMenuInfo.items.indexOf("Cut") > -1;
	const hasCopy = contextMenuInfo.items.indexOf("Copy") > -1;
	const hasPaste = contextMenuInfo.items.indexOf("Paste") > -1;
	const hasDuplicate = contextMenuInfo.items.indexOf("Duplicate") > -1;
	const hasReplace = contextMenuInfo.items.indexOf("Replace") > -1;
	const hasDelete = contextMenuInfo.items.indexOf("Delete") > -1;
	const hasDynamicBackground = contextMenuInfo.items.indexOf("Dynamic Background") > -1;

	const hasDistributeWidths = contextMenuInfo.items.indexOf("DistributeW") > -1;
	const hasMoreLikeThis = contextMenuInfo.items.indexOf("More like this") > -1;
	const hasLessLikeThis = contextMenuInfo.items.indexOf("Not like this") > -1;

	const isPageCandidate = contextMenuInfo.isPageCandidate;

	const canEdit = selectedTile;

	let menuX = contextMenuInfo.x;
	let menuY = contextMenuInfo.y;
	if (menuX + 180 > metrics.viewportWidth) {
		menuX = metrics.viewportWidth - 180;
	}

	if (isPageCandidate) {
		menuX = contextMenuInfo.x - 85;
		menuY = contextMenuInfo.y - 209;
	}

	return (
		<Wrap
			style={{
				pointerEvents: showContextMenu ? "auto" : "none",
				zIndex: 1000,
				visibility: showContextMenu ? "visible" : "hidden",
			}}
		>
			<ClickCover
				onTap={e => {
					setShowContextMenu(false);
					
				}}
				onContextMenu={e => {
					setShowContextMenu(false);
					e.preventDefault();
				}}
			/>

			<Menu
				style={{
					borderRadius: 12,
					padding: 6,
					backgroundColor: currentPage.theme.colors.menu.background,
					boxShadow: currentPage.theme.shadows.menu,
					x: menuX,
					y: menuY,
					maxWidth: 160,
				}}
			>
				{hasDistributeWidths && (
					<MenuItem
						onTap={() => {
							contextMenuInfo.callback();
							setShowContextMenu(false);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Distribute widths</MenuItemLabel>
					</MenuItem>
				)}
				{hasCut && (
					<MenuItem
						className={canEdit ? "" : "disabled"}
						onTap={() => {
							if (canEdit) {
								cutTile(selectedTile);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Cut</MenuItemLabel>
						<MenuItemShortcut>⌘X</MenuItemShortcut>
					</MenuItem>
				)}
				{hasCopy && (
					<MenuItem
						className={canEdit ? "" : "disabled"}
						onTap={() => {
							if (canEdit) {
								copyTile(selectedTile);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Copy</MenuItemLabel>
						<MenuItemShortcut>⌘C</MenuItemShortcut>
					</MenuItem>
				)}
				{hasPaste && (
					<MenuItem
						className={canPaste ? "enabled" : "disabled"}
						style={{
							pointerEvents: canPaste ? "auto" : "none",
						}}
						onTap={() => {
							let newTile = false;

							if (blobFromClipboard.current) {
								const reader = new FileReader();
								// Is the selected tile null
								if (selectedTile && selectedTile.isNull && tileNames.IMAGE.name === selectedTile.type) {
									newTile = selectedTile;
								} else {
									const info = getRowAndSideForXY(contextMenuInfo.x, contextMenuInfo.y);
									const clipboardTile = getNewImageTile();
									newTile = pasteFromClipboardToNearestPosition(clipboardTile, info);
								}
								reader.onload = function (event) {
									const image = event.target.result;
									updateImageTileWithImage(newTile, image);
									if (showContextMenu) setShowContextMenu(false);
								};
								reader.readAsDataURL(blobFromClipboard.current);
								//URL.createObjectURL(blob)
							}

							if (tileFromClipboard.current) {
								// Is the selected tile null
								if (
									selectedTile &&
									selectedTile.isNull &&
									tileFromClipboard.current.type === selectedTile.type
								) {
									replaceTileWithClipboardTile(selectedTile, tileFromClipboard.current);
									return false;
								}
								const info = getRowAndSideForXY(contextMenuInfo.x, contextMenuInfo.y);
								newTile = pasteFromClipboardToNearestPosition(tileFromClipboard.current, info);
								if (newTile) scrollTileIntoView(newTile);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//
					>
						<MenuItemLabel>Paste</MenuItemLabel>
						<MenuItemShortcut>⌘V</MenuItemShortcut>
					</MenuItem>
				)}
				{hasReplace && (
					<MenuItem
						className={canPaste ? "enabled" : "disabled"}
						style={{
							pointerEvents: canPaste ? "auto" : "none",
						}}
						onTap={() => {
							if (blobFromClipboard.current) {
								const reader = new FileReader();
								const clipboardTile = getNewImageTile();
								replaceTileWithClipboardTile(selectedTile, clipboardTile);
								reader.onload = function (event) {
									const image = event.target.result;
									updateImageTileWithImage(clipboardTile, image);
									if (showContextMenu) setShowContextMenu(false);
								};
								reader.readAsDataURL(blobFromClipboard.current);
								//URL.createObjectURL(blob)
							}

							if (tileFromClipboard.current) {
								replaceTileWithClipboardTile(selectedTile, tileFromClipboard.current);
								if (showContextMenu) setShowContextMenu(false);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//
					>
						<MenuItemLabel>Replace</MenuItemLabel>
						<MenuItemShortcut>⌥ ⌘ V</MenuItemShortcut>
					</MenuItem>
				)}
				{hasDuplicate && (
					<MenuItem
						className={canEdit ? "enabled" : "disabled"}
						style={{
							pointerEvents: canEdit ? "auto" : "none",
						}}
						onTap={() => {
							const t = duplicateTile(selectedTile);
							if (t) {
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//
					>
						<MenuItemLabel>Duplicate</MenuItemLabel>
						<MenuItemShortcut>⌘ D</MenuItemShortcut>
					</MenuItem>
				)}
				{/* <MenuItem
						className={canEdit ? "enabled" : "disabled"}
						style={{
							pointerEvents: canEdit ? "auto" : "none",
						}}
						onTap={() => {
							setShowContextMenu(false);
							onToolbarButtonTap(selectedTile.type);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						//
					>
						<MenuItemLabel>Show properties</MenuItemLabel>
						
					</MenuItem>

				<MenuItemDivider>
					<MenuItemDividerLine />
				</MenuItemDivider> */}
				{hasDelete && (
					<MenuItemDestructive
						onTap={() => {
							if (selectedTile) {
								deleteTile(selectedTile);
								setShowContextMenu(false);
								
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						
					>
						<MenuItemLabelDestructive>Delete</MenuItemLabelDestructive>
						<MenuItemShortcutDestructive>⌫</MenuItemShortcutDestructive>
					</MenuItemDestructive>
				)}
				{/* {hasDelete && hasDynamicBackground && (
					<MenuItemDivider>
						<MenuItemDividerLine />
					</MenuItemDivider>
				)} */}
				{/* {hasDynamicBackground && (
					<MenuItem
						onTap={() => {
							createDynamicBackground();
							setShowContextMenu(false);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Background</MenuItemLabel>
						<MenuItemShortcut>⌘B</MenuItemShortcut>
					</MenuItem>
				)} */}

				{contextMenuInfo.isPageCandidate && (
					<>
						<MenuItemInfo>
							<MenuItemHeader
								style={{
									color: currentPage.theme.colors.t9,
								}}
							>
								{contextMenuInfo.title}
							</MenuItemHeader>
							<MenuItemBody
								style={{
									color: currentPage.theme.colors.t7,
								}}
							>
								Understanding the causes behind honey bee extinction and ways to stop it.
							</MenuItemBody>
						</MenuItemInfo>

						<MenuItemDivider>
							<MenuItemDividerLine />
						</MenuItemDivider>

						<MenuItem
							onTap={() => {
								if (contextMenuInfo.onThumbsUp) {
									contextMenuInfo.onThumbsUp();
								}
								setShowContextMenu(false);
							}}
							onContextMenu={e => {
								setShowContextMenu(false);
								e.preventDefault();
							}}
							
						>
							<MenuItemIcon>
								<Icon name="ThumbsUp" opacity={1} size={16} />
							</MenuItemIcon>
							<MenuItemLabel>More like this</MenuItemLabel>
						</MenuItem>
						<MenuItem
							onTap={() => {
								if (contextMenuInfo.onRetry) {
									contextMenuInfo.onRetry();
								}
								setShowContextMenu(false);
							}}
							onContextMenu={e => {
								setShowContextMenu(false);
								e.preventDefault();
							}}
							
						>
							<MenuItemIcon>
								<Icon name="TwoArrowCirclePathCounterclockwise" opacity={1} size={16} />
							</MenuItemIcon>
							<MenuItemLabel>Retry</MenuItemLabel>
						</MenuItem>
						<MenuItem
							onTap={() => {
								if (contextMenuInfo.onThumbsDown) {
									contextMenuInfo.onThumbsDown();
								}
								setShowContextMenu(false);
							}}
							onContextMenu={e => {
								setShowContextMenu(false);
								e.preventDefault();
							}}
							
						>
							<MenuItemIcon>
								<Icon name="ThumbsDown" opacity={1} size={16} />
							</MenuItemIcon>
							<MenuItemLabel>Not like this</MenuItemLabel>
						</MenuItem>
					</>
				)}
			</Menu>
		</Wrap>
	);
};

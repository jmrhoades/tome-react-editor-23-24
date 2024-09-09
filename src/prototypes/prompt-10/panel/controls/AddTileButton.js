import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { colors } from "../../ds/Colors";
import { Icon } from "../../../../ds/Icon";
import { TomeContext } from "../../tome/TomeContext";
import { MetricsContext } from "../../tome/MetricsContext";
import { tileNames } from "../../page/TileConstants";

const TileTypeContainer = styled(motion.div)`
	position: relative;
	width: 102px;
	height: 102px;
`;

const TileType = styled(motion.div)`
	width: 102px;
	height: 102px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const TileTypeDraggable = styled(TileType)`
	position: absolute;
	top: 0;
	left: 0;
`;

const Label = styled(motion.div)`
	position: relative;
	text-align: center;
	font-weight: 500;
	font-size: 12px;
	line-height: 14px;
	pointer-events: none;
`;

const TileTypeBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const AddIcon = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 24px;
	height: 24px;
`;

export const AddTileButton = props => {
	const { tomeData, setLayoutTweaking } = useContext(TomeContext);
	const { metrics, getTileY, scrollWindowToY, getTileHeight } = useContext(MetricsContext);
	const { tileCornerRadius } = metrics;
	const borderRadius = 16;

	// The states of a draggable, clickable, view-transitioning button:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING

	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isValidDrop, setIsValidDrop] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldClick, setShouldClick] = useState(false);

	const returnToStartAnimation = useAnimation();
	const tileName = props.tileName;
	const tileIcon = props.tileIcon;

	const draggableRef = useRef();
	const draggableStartX = useMotionValue(0);
	const draggableStartY = useMotionValue(0);

	//const isOverTarget = isDragging;
	// const isTall = tileDropInfo.height > tileDropInfo.width;
	const isTall = false;

	const buttonSquareSize = 102;

	let buttonDraggingWidth = 102;
	let buttonDraggingHeight = 102;

	/*
	if (isOverTarget) {
		if (isTall) {
			buttonDraggingHeight = 102;
		} else {
			buttonDraggingWidth = 204;
		}
	}
	*/

	let bgColor = props.theme.colors.panel.tile;
	let iconColor = props.theme.colors.panel.icon;
	let labelColor = props.theme.colors.panel.label;

	if (tileIcon === "Twitter" || tileIcon === "Giphy" || tileIcon === "Airtable" || tileIcon === "Figma") {
		iconColor = undefined;
	}

	/*
	if (tileIcon === "Twitter") bgColor = colors.nullTileBackgrounds.twitter;
	if (tileIcon === "Giphy") bgColor = colors.nullTileBackgrounds.giphy;
	if (tileIcon === "Airtable") bgColor = colors.nullTileBackgrounds.airtable;
	if (tileIcon === "Figma") bgColor = colors.nullTileBackgrounds.figma;
	*/

	return (
		<TileTypeContainer
			key={tileName}
			animate={{
				opacity: props.fadeControls && !isDragging ? 0 : 1,
			}}
			transition={{ duration: 0.1 }}
		>
			<TileType
				animate={{
					opacity: isDragging && !props.fadeControls ? 0.5 : 0,
					scale: isDragging && !props.fadeControls ? 1 : 0,
				}}
				initial={{
					opacity: 0,
					scale: 0,
				}}
				transition={transitions.basicTransition}
			>
				<TileTypeBackground
					style={{
						backgroundColor: bgColor,
						width: buttonSquareSize,
						height: buttonSquareSize,
						borderRadius: borderRadius,
					}}
				/>
				<Icon name={tileIcon} size={52} color={iconColor} opacity={1} />
				<Label
					style={{
						color: labelColor,
					}}
				>
					{tileName}
				</Label>
			</TileType>

			<TileTypeDraggable
				ref={draggableRef}
				transition={transitions.basicTransition}
				style={{
					zIndex: isAnimating ? 10 : 1,
					cursor: isDragging ? "grabbing" : "grab",
				}}
				animate={returnToStartAnimation}
				drag
				onPointerDown={() => {
					setShouldClick(true);
					document.body.style.cursor = "grabbing";
					returnToStartAnimation.start({
						scale: 0.9,
					});
				}}
				onPointerUp={() => {
					// console.log("up", shouldClick)
					document.body.style.cursor = "auto";

					if (shouldClick) {
						setShouldClick(false);
						props.onClickAdd(tileName);
						/*
						const tileY = getTileY(tile)
						const tileHeight = getTileHeight(tile)
						console.log("tileY", tileY, "tileHeight", tileHeight);
						const sY = Math.round(tileY + tileHeight)
						scrollWindowToY(sY);

						returnToStartAnimation.start({
							scale: 1,
						});
						*/
					}
				}}
				onHoverStart={(event, info) => {
					setIsHovering(true);
				}}
				onHoverEnd={(event, info) => {
					setIsHovering(false);
				}}
				onDragStart={(event, info) => {
					document.body.style.cursor = "grabbing";
					setIsDragging(true);
					setIsAnimating(true);
					setShouldClick(false);
					
					//props.onAddTileDragStart(tileName, info.point.x, info.point.y);

					returnToStartAnimation.start({
						scale: 1,
					});

					if (draggableRef.current) {
						const r = draggableRef.current.getBoundingClientRect();
						draggableStartX.set(r.left);
						draggableStartY.set(r.top);

						const draggableCenterRelativeOffsetX = info.point.x - r.left - 104 / 2;
						const draggableCenterRelativeOffsetY = info.point.y - r.top - 104 / 2;
						tomeData.draggableOffsetX = draggableCenterRelativeOffsetX;
						tomeData.draggableOffsetY = draggableCenterRelativeOffsetY;
						// console.log("rect", r.top, r.left, draggableCenterRelativeOffsetX, draggableCenterRelativeOffsetY);
					}
				}}
				onDragEnd={(event, info) => {
					document.body.style.cursor = "auto";
					// console.log("button drag end");

					const dropInfo = props.onAddTileDragEnd(tileName, event.clientX, event.clientY, true);

					// const dropTargetSuccess = props.onAddTileDrag(tileName, info.point.x, info.point.y, true);
					// setIsValidDrop(dropTargetSuccess);

					if (dropInfo.isValid) {
						console.log(
							"dropTargetSuccess"
							// window.scrollY,
							// dropTargetSuccess,
							// tileDropInfo.x,
							// tileDropInfo.y,
							// tileDropInfo.dropButtonOffsetY
						);

						//const gX = draggableStartX.get();
						//const gY = draggableStartY.get();
						returnToStartAnimation.start({
							// x: -gX + tileDropInfo.dropButtonOffsetX - buttonSquareSize / 2 + tileDropInfo.newTileWidth / 2,
							// y:
							// 	-gY +
							// 	tileDropInfo.dropButtonOffsetY +
							// 	tileDropInfo.dropButtonTileTop -
							// 	buttonSquareSize / 2 +
							// 	tileDropInfo.newTileHeight / 2 -
							// 	window.scrollY,
							// opacity: 0,
							x: 0,
							y: 0,
							transition: {
								...transitions.basicTransition,
								onComplete: () => {
									setIsAnimating(false);
									setIsDragging(false);
									setIsValidDrop(false);
									// restore default zindex to panel
									//props.onAddTileDragEnd();
									// selectTile(tileDropInfo.newTile);
									// returnToStartAnimation.start({
									// 	x: 0,
									// 	y: 0,
									// 	scale: 1,
									// 	opacity: 1,
									// 	transition: {
									// 		duration: 0,
									// 	},
									// });
								},
							},
						});
					} else {
						setIsDragging(false);
						setIsValidDrop(false);
						returnToStartAnimation.start({
							x: 0,
							y: 0,
							scale: 1,
							opacity: 1,
							transition: {
								...transitions.basicTransition,
								onComplete: () => {
									setIsAnimating(false);
									//setIsDragging(false);
									//setIsValidDrop(false);
									// restore default zindex to panel
									//props.onAddTileDragEnd();
								},
							},
						});
					}
				}}
				onDrag={(event, info) => {
					// dragX.set(info.point.x);
					// dragY.set(info.point.y);
					// console.log(tileDropInfo.newTileWidth, tileDropInfo.newTileHeight);
					//props.onAddTileDrag(tileName, info.point.x, info.point.y, false);

					// document.body.style.cursor = isOverTarget ? "copy" : "auto";
					const dropInfo = props.onAddTileDrag(tileName, event.clientX, event.clientY, false, info);

					if (!dropInfo.isValid && isValidDrop === true) {
						setIsValidDrop(false);
					}
					if (dropInfo.isValid && isValidDrop === false) {
						setIsValidDrop(true);
					}
				}}
			>
				<TileTypeBackground
					transition={transitions.basicTransition}
					initial={false}
					animate={{
						opacity: isDragging ? 0.75 : 0,
					}}
					style={{
						backgroundColor: props.theme.colors.backgrounds.panel,
						boxShadow: props.theme.shadows.small,
						borderRadius: borderRadius,
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
					}}
				/>

				<TileTypeBackground
					style={{
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
						borderRadius: borderRadius,
						backgroundColor: bgColor,
					}}
				/>

				<TileTypeBackground
					transition={transitions.basicTransition}
					initial={false}
					animate={{
						opacity: isHovering ? 1 : 0,
					}}
					style={{
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
						borderRadius: borderRadius,
						backgroundColor: props.theme.colors.t1,
					}}
				/>

				<Icon name={tileIcon} size={52} color={iconColor} opacity={1} />
				<Label
					style={{
						color: labelColor,
					}}
				>
					{tileName}
				</Label>

				<AddIcon
					animate={{
						scale: isValidDrop ? 1 : 0.9,
						opacity: isValidDrop ? 1 : 0,
						x: (buttonSquareSize - buttonDraggingWidth) / 2 - 10,
						y: (buttonSquareSize - buttonDraggingHeight) / 2 - 10,
					}}
					transition={{ duration: 0.1 }}
					initial={false}
				>
					<motion.svg width="20" height="20" viewBox="0 0 24 24">
						<motion.circle cx="12" cy="12" r="12" fill={props.theme.colors.accent} />
						<motion.path
							d="M12.6001 6.6C12.6001 6.26863 12.3314 6 12.0001 6C11.6687 6 11.4001 6.26863 11.4001 6.6V11.4H6.60006C6.26869 11.4 6.00006 11.6686 6.00006 12C6.00006 12.3314 6.26869 12.6 6.60006 12.6H11.4001V17.4C11.4001 17.7314 11.6687 18 12.0001 18C12.3314 18 12.6001 17.7314 12.6001 17.4V12.6H17.4001C17.7314 12.6 18.0001 12.3314 18.0001 12C18.0001 11.6686 17.7314 11.4 17.4001 11.4H12.6001V6.6Z"
							fill={colors.light.opaque.z0}
							stroke={colors.light.opaque.z0}
							strokeWidth="1.0"
							strokeLinecap="round"
						/>
					</motion.svg>
				</AddIcon>
			</TileTypeDraggable>
		</TileTypeContainer>
	);
};

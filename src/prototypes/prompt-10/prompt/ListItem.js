import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../ds/Icon";
import { LabelButton } from "../ds/Buttons";
import { ListStates, ITEM_WIDTH, ROOT_ITEM_HEIGHT, ScopedStates } from "./Prompt";
import { ScopedControls } from "./ScopedControls";
import { Setting } from "./Setting";

/*
import {
	tListItemMoveToChild,
	tListItemMoveToParent,
	tListItemHoverStart,
	tListItemHoverEnd,
	tListItemFocusBgToChild,
	tListItemFocusBgToParent,
	tListItemHide,
	tListItemScoped,
	tListItemRootAccessoriesShow,
	tListItemRootAccessoriesHide,
	tListItemScopedAccessoriesShow,
	tListItemScopedAccessoriesHide,
} from "./Transitions";
*/

import { IconButton } from "../ds/Buttons";

const Wrap = styled(motion.div)`
	width: 100%;
	flex-shrink: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	position: relative;
	gap: 8px;

	
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
`;

const Left = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12px;
	/* background-color: purple; */
`;

const Right = styled(Left)`
	/* background-color: red; */
	justify-content: flex-end;
	min-width: 24px;
`;

const Shortcut = styled(motion.div)`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;

const LabelContainer = styled(motion.div)`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;

const UserLabel = styled(motion.span)``;

const Background = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

const FocussedBackgroundWrap = styled(Background)``;

const FocussedBackground = styled(Background)``;

const ResultItemClick = styled(Background)``;

const IconContainer = styled(motion.div)`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 24px;
	height: 24px;
`;

const FallbackAccessories = styled(motion.div)`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 12px;
	min-width: 24px;
	height: 24px;
`;

const Divider = styled(motion.div)`
	right: 1px;
	left: 1px;
	height: 1px;
	position: absolute;
	top: -1px;
	pointer-events: none;
`;

export const itemPaddingX = 20;
export const itemHighlightInsetHorizontal = 6;
export const itemHighlightInsetVertical = 1;
export const itemHighlightBorderRadius = 6;
export const itemSpacerHeight = 0;

export const ListItem = props => {
	const colors = props.theme.colors.promptbar;

	const isFocussed = props.focussedItem && props.focussedItem.id === props.data.id;
	const isScoped = props.scope.id === props.data.id && props.listState === ListStates.SCOPED;

	const [isChildTitleHovering, setIsChildTitleHovering] = React.useState(false);

	let label = props.data.label;
	let userLabel = "";
	let endString = "";
	if (props.isUsingFallbackIntents && props.value && props.data.action === "SCOPED") {
		userLabel = " " + props.value;
	}
	if (props.data.action === "SCOPED") {
		endString = "…";
	}
	if (isScoped) {
		userLabel = "";
		endString = "";
		/*
		if (props.focussedItem.id === "command_create_tome") {
			label = `Create ${props.prompt.type.placeholder} about`;
		}
		*/
	}

	let iconName = "";

	if (props.data.action === "SCOPED") {
		iconName = "ChevronRight";
	}
	if (
		props.data.action === "INSTANT" ||
		props.data.action === "DOWNLOAD" ||
		(props.isUsingFallbackIntents && props.data.action === "SCOPED")
	) {
		iconName = "Return";
	}
	if (props.data.action === "LINK") {
		iconName = "OpenLink";
	}
	if (props.data.shortcut && props.data.shortcut.length > 0 && iconName.length > 0) {
		iconName = "";
	}
	const iconSize = 24;
	const createMode = isScoped && props.scopedState === ScopedStates.CREATE;
	//console.log(isScoped, props.scope.id, props.data.id, scopedY);
	return (
		<Wrap
			//layoutId={props.data.id}
			key={props.data.id + "_item"}
			id={props.data.id}
			style={{
				height: ROOT_ITEM_HEIGHT,
				paddingLeft: itemPaddingX,
				paddingRight: itemPaddingX,
				//width: ITEM_WIDTH,
				width: "100%",
			}}
		>
			{/* <Divider
				style={{
					boxShadow: `0 -1px 0 0 ${colors.divider}`,
				}}
				animate={{
					opacity: createMode ? 1 : 0,
				}}
				transition={props.transitions.morph}
				initial={false}
			/> */}
			<FocussedBackgroundWrap
				style={{
					top: itemHighlightInsetVertical,
					bottom: itemHighlightInsetVertical,
					left: itemHighlightInsetHorizontal,
					right: itemHighlightInsetHorizontal,
				}}
				animate={{
					opacity: isScoped ? 0 : 1,
				}}
				//transition={isScoped ? tListItemFocusBgToChild : tListItemFocusBgToParent}
				transition={props.transitions.morph}
				initial={false}
			>
				<FocussedBackground
					style={{
						//backgroundColor: colors.itemHighlight,
						backgroundColor: colors.itemHighlight,
						backdropFilter: "saturate(180%) blur(20px)",
						borderRadius: itemHighlightBorderRadius,
						width: "100%",
						height: "100%",
						opacity: isFocussed ? 1 : 0,
					}}
				/>
			</FocussedBackgroundWrap>

			{props.listState === ListStates.ROOT && (
				<ResultItemClick
					style={{
						top: 0,
						bottom: 0,
						left: itemHighlightInsetHorizontal,
						right: itemHighlightInsetHorizontal,
						pointerEvents: "auto",
						cursor: "pointer",
					}}
					//onHoverStart={() => props.setFocussedItem(props.data)}
					onMouseMove={() => {
						if (props.focussedItem.id !== props.data.id) {
							//props.setFocussedItem(props.data);
						}
					}}
					onTap={props.onTap}
					// onMouseDown={e => {
					// 	//setIsTapping(true);
					// 	e.stopPropagation();
					// 	e.preventDefault();
					// 	props.onTap();
					// }}
					onMouseUp={e => {
						//closeMenu();
						//setIsTapping(false);
					}}
				/>
			)}

			<Left
				//transition={isScoped ? tListItemScoped : tListItemHide}
				transition={props.transitions.morph}
				initial={false}
				animate={{
					scale: isScoped ? 0.867 : 1,
					//y:-2,
				}}
				style={{
					originX: 0,
					originY: 0.5,
					color: colors.itemLabel,
					pointerEvents: isScoped ? "auto" : "none",
					cursor: isScoped ? "pointer" : "default",
					//overflow: "hidden",
				}}
				onTap={isScoped ? props.descopeBar : undefined}
				onMouseMove={
					isScoped
						? () => {
								if (!isChildTitleHovering) {
									setIsChildTitleHovering(true);
								}
						  }
						: undefined
				}
				onHoverEnd={isScoped ? () => setIsChildTitleHovering(false) : undefined}
			>
				<IconContainer>
					<Icon
						name={isScoped ? "ChevronLeft" : props.data.icon}
						size={iconSize}
						opacity={1}
						//transition={isScoped ? tListItemMoveToChild : tListItemMoveToParent}
						transition={props.transitions.morph}
						animate={{
							scale: isScoped ? 0.9616 : 1,
							fill: isChildTitleHovering && isScoped ? colors.itemIconHover : colors.itemIcon,
							x: isScoped ? -5 : 0,
						}}
					/>
				</IconContainer>
				<LabelContainer
					//transition={isScoped ? tListItemMoveToChild : tListItemMoveToParent}
					transition={props.transitions.morph}
					initial={false}
					animate={{
						color: isChildTitleHovering && isScoped ? colors.itemLabelHover : colors.itemLabel,
						x: isScoped ? -12 : 0,
					}}
				>
					{/* {createMode ? "Back" : label} */}
					{label}
					<UserLabel style={{ fontWeight: 500, color: colors.itemLabelAppended }}>{userLabel}</UserLabel>
					{endString}
				</LabelContainer>
			</Left>
			<Right>
				<AnimatePresence>
					{!isScoped && (
						<motion.div
							//key={`${props.data.id}_root_accessories`}
							initial={false}
							animate={{
								opacity: 1,
								x: 0,
								rotate: 0,
								scale: 1,
								//transition: tListItemRootAccessoriesShow,
							}}
							exit={{
								opacity: 0,
								rotate: props.isUsingFallbackIntents ? 0 : 90,
								scale: props.isUsingFallbackIntents ? 1 : 10 / iconSize,
								x: props.isUsingFallbackIntents ? 0 : 5,
								position: "absolute",
								//transition: tListItemRootAccessoriesHide,
							}}
							style={{
								flexShrink: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								minWidth: 24,
								height: 24,
							}}
							transition={props.transitions.morph}
						>
							{/* {props.isUsingFallbackIntents && (
								<FallbackAccessories
									animate={{ opacity: isFocussed ? 1 : 0 }}
									transition={isFocussed ? tListItemHoverStart : tListItemHoverEnd}
									initial={false}
									style={{
										pointerEvents: isFocussed ? "auto" : "none",
										x: 2,
									}}
								>
									 <IconButton
										icon={"Preferences"}
										theme={props.theme}
										width={26}
										height={26}
										borderRadius={6}
										iconSize={20}
										backgroundColor={props.theme.colors.t2}
										onTap={()=>props.scopeBar(props.data)}
									/> 
									<IconButton
										icon={"ArrowRight"}
										theme={props.theme}
										width={26}
										height={26}
										borderRadius={6}
										iconSize={20}
										backgroundColor={props.theme.colors.t2}
										onTap={props.onTap}
									/>
								</FallbackAccessories>
							)} */}

							{iconName.length > 0 && (
								<Icon
									name={iconName}
									size={iconSize}
									opacity={1}
									color={props.theme.colors.t6}
									animate={{ opacity: isFocussed ? 1 : 0 }}
									//transition={isFocussed ? tListItemHoverStart : tListItemHoverEnd}
									transition={props.transitions.morph}
									initial={false}
								/>
							)}
							{props.data.shortcut && (
								<Shortcut
									style={{ color: colors.itemAccessoryLabel }}
									animate={{ opacity: isFocussed ? 1 : 0 }}
									//transition={isFocussed ? tListItemHoverStart : tListItemHoverEnd}
									transition={props.transitions.morph}
									initial={false}
								>
									{props.data.shortcut}
								</Shortcut>
							)}
						</motion.div>
					)}

					{isScoped && (
						<motion.div
							key={`${props.data.id}_scoped_accessories`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }} //transition: tListItemScopedAccessoriesShow
							exit={{ opacity: 0, position: "absolute" }} //transition: tListItemScopedAccessoriesHide
							transition={props.transitions.morph}
							style={{ y: -1 }}
						>
							<ScopedControls
								theme={props.theme}
								prompt={props.prompt}
								descopeBar={props.descopeBar}
								scope={props.scope}
								listState={props.listState}
								isScoped={isScoped}
								value={props.value}
								toggleRecentsList={props.toggleRecentsList}
								filteredChildList={props.filteredChildList}
								submitPrompt={props.submitPrompt}
								scopedState={props.scopedState}
								outlineTitle={props.outlineTitle}
								refreshOutline={props.refreshOutline}
								submitOutline={props.submitOutline}
								outlineLoading={props.outlineLoading}
								gridList={props.gridList}
								onScopedDoneClick={props.onScopedDoneClick}
								onRegeneratePagesClick={props.onRegeneratePagesClick}
								hideGridResults={props.hideGridResults}
								createPageAdded={props.createPageAdded}
								onToggleHistoryClick={props.onToggleHistoryClick}
								gridListHistory={props.gridListHistory}
								onRegenerateTilesClick={props.onRegenerateTilesClick}
							/>
						</motion.div>
					)}

					{/* 								
					{isScoped && props.scopedState === ScopedStates.ROOT && (
						<motion.div
							key={`${props.data.id}_scoped_accessories`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }} //transition: tListItemScopedAccessoriesShow
							exit={{ opacity: 0, position: "absolute" }} //transition: tListItemScopedAccessoriesHide
							transition={props.transitions.morph}
							style={{ y: -1 }}
						>
							<ScopedControls
								theme={props.theme}
								prompt={props.prompt}
								descopeBar={props.descopeBar}
								scope={props.scope}
								listState={props.listState}
								isScoped={isScoped}
								value={props.value}
								toggleRecentsList={props.toggleRecentsList}
								filteredChildList={props.filteredChildList}
								submitPrompt={props.submitPrompt}
							/>
						</motion.div>
					)}
					{isScoped && props.scopedState === ScopedStates.CREATE && (
						<motion.div
							key={`${props.data.id}_scoped_waiting`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }} //transition: tListItemScopedAccessoriesShow
							exit={{ opacity: 0, position: "absolute" }} //transition: tListItemScopedAccessoriesHide
							transition={props.transitions.morph}
							style={{
								y: -1,
								pointerEvents: "auto",
								display: "flex",
								gap: 12,
							}}
						>
							<Setting
								iconName="TwoArrowCirclePathCounterclockwise"
								//label={"Recents"}
								//active={props.filteredChildList.length > 0}
								disabled={props.outlineTitle.length < 1 ? true : false}
								theme={props.theme}
								onTap={props.refreshOutline}
							/>
							<LabelButton
								label="Continue"
								disabled={props.outlineTitle.length < 1 ? true : false}
								theme={props.theme}
								fontSize={13}
								height={26}
								paddingX={12}
								backgroundColor={props.theme.colors.accent}
								labelColor={"#fff"}
								labelHoverColor={"#fff"}
								borderRadius={6}
								onTap={props.submitOutline}
							/>
						</motion.div>
					)} */}
				</AnimatePresence>
			</Right>
		</Wrap>
	);
};

/*
NOTES
- this is scrollable list
- it's given a height based on the number of items inside
- it has a max height
- it will overflow-y scroll if the height of the items exceeds the max height
- the list has spacer rows at the top and bottom to provide the appearance of scrollview padding
- the list 
*/

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";

import { PromptStates, ROOT_ITEM_HEIGHT } from "./Prompt";
import { ScrollBar } from "./ScrollBar";

import {
	itemSpacerHeight,
	itemHighlightInsetHorizontal,
	itemHighlightInsetVertical,
	itemHighlightBorderRadius,
} from "./ListItem";

import { tDividerShow, tDividerHide } from "./Transitions";

const ScrollViewWrap = styled(motion.div)`
	position: relative;
`;

const List = styled(motion.div)`
	width: 100%;
	position: relative;
	overflow-y: auto;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	display: flex;
	flex-direction: column-reverse;
`;

const ItemWrap = styled(motion.div)`
	width: 100%;
	flex-shrink: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	position: relative;
	
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
`;

const ItemContentWrap = styled(motion.div)`
	width: 100%;
	flex-shrink: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	position: relative;
`;

const Spacer = styled(motion.div)`
	width: 100%;
	flex-shrink: 0;
`;

const ItemLeft = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12px;
	position: relative;
	max-width: 100%;
`;

const ItemLeftAccessoryContainer = styled(motion.div)`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 28px;
	height: 28px;
`;
const ItemLeftLabel = styled(motion.div)`
	::selection {
		background: ${props => props.$selectioncolor};
	}
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;

const ItemRight = styled(motion.div)`
	width: 28px;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
`;

const Background = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

const Divider = styled(motion.div)`
	width: 100%;
	height: 1px;
`;

const FocussedBackgroundWrap = styled(Background)``;

const FocussedBackground = styled(Background)``;
const ClickCover = styled(Background)``;
const UserLabel = styled(motion.span)``;
const EndLabel = styled(motion.span)``;

export const ScopedList = props => {
	const isRoot = props.promptState === PromptStates.ROOT;
	const scrollRef = React.useRef(null);

	const maxHeight = ROOT_ITEM_HEIGHT * 3.5 + itemSpacerHeight;
	const minHeight = ROOT_ITEM_HEIGHT + itemSpacerHeight + itemSpacerHeight;

	let h = ROOT_ITEM_HEIGHT * props.list.length + itemSpacerHeight + itemSpacerHeight;
	if (h > maxHeight) h = maxHeight;
	if (h < minHeight) h = minHeight;
	if (props.list.length === 0) h = 0;
	if (isRoot) h = 0;

	const showDivider = !isRoot && props.list.length > 0;
	const maxItems = 3;
	const needsScrollBar = props.list.length > maxItems;

	return (
		<ScrollViewWrap>
			<List
				//layout
				key="scoped_list_scroller"
				id="scoped_list_scroller"
				initial={false}
				animate={{ height: h }}
				transition={props.transitions.morph}
				ref={scrollRef}
			>
				<Spacer style={{ height: 5 }} />

				{props.list.map((item, i) => (
					<ItemWrap
						key={item.id}
						id={item.id}
						// layout
						// initial={{ opacity: 0 }}
						// animate={{ opacity: 1, transition: tListItemFilterShow }}
						// exit={{ opacity: 0, transition: tListItemFilterHide }}
					>
						<Item
							item={item}
							theme={props.theme}
							focussedChildItem={props.focussedChildItem}
							setFocussedChildItem={props.setFocussedChildItem}
							isUsingFallbackIntents={props.isUsingFallbackIntents}
							onTap={props.onChildListItemTap}
							value={props.value}
						/>
					</ItemWrap>
				))}
				<Spacer style={{ height: 5 }} />
			</List>
			{needsScrollBar && (
				<ScrollBar
					theme={props.theme}
					scrollRef={scrollRef}
					scrollViewHeight={h}
					contentHeight={ROOT_ITEM_HEIGHT * props.list.length + 10}
				/>
			)}
			<Divider
				style={{
					backgroundColor: props.theme.colors.promptbar.divider,
				}}
				initial={false}
				animate={{
					opacity: showDivider ? 1 : 0,
					height: showDivider ? 1 : 0,
				}}
				transition={props.promptState === PromptStates.ROOT ? tDividerShow : tDividerHide}
			/>
		</ScrollViewWrap>
	);
};

const Item = props => {
	const colors = props.theme.colors;
	const isFocussed = props.focussedChildItem && props.focussedChildItem.id === props.item.id;

	let userLabel = "";
	let endLabel = "";

	let iconName = "ChevronRight";
	let iconSize = 22;
	let iconX = 0;
	if (props.item.action === "INSTANT") iconName = "Return";
	if (props.item.action === "RECENT") {
		iconName = "Close";
		iconSize = 18;
		iconX = 5.5;
	}

	if (props.isUsingFallbackIntents && props.value) {
		userLabel = " " + props.value;
		//endLabel = "…";
	}

	//console.log(props.item)

	return (
		<ItemContentWrap
			style={{
				height: ROOT_ITEM_HEIGHT,
				padding: "0 20px",
				gap: 16,
				color: colors.t7,
				position: "relative",
			}}
		>
			<FocussedBackgroundWrap
				style={{
					top: itemHighlightInsetVertical,
					bottom: itemHighlightInsetVertical,
					left: itemHighlightInsetHorizontal,
					right: itemHighlightInsetHorizontal,
					opacity: isFocussed ? 1 : 0,
				}}
			>
				<FocussedBackground
					style={{
						backgroundColor: colors.t1,
						borderRadius: itemHighlightBorderRadius,
						width: "100%",
						height: "100%",
					}}
				/>
			</FocussedBackgroundWrap>

			<ClickCover
				style={{
					top: 0,
					bottom: 0,
					left: itemHighlightInsetHorizontal,
					right: itemHighlightInsetHorizontal,
					pointerEvents: "auto",
					cursor: "pointer",
				}}
				//onHoverStart={() => props.setFocussedChildItem(props.item)}
				onTap={() => props.onTap(props.item)}
				onMouseMove={() => {
					if (props.focussedChildItem.id !== props.item.id) {
						props.setFocussedChildItem(props.item);
					}
				}}
			/>

			<ItemLeft
				style={{
					pointerEvent: "none",
				}}
			>
				{(props.item.colors || props.item.icon || props.item.themeColors) && (
					<ItemLeftAccessoryContainer>
						{props.item.icon && <Icon size={22} color={colors.t7} opacity={1} name={props.item.icon} />}
						{props.item.colors && <ColorAccessory item={props.item} />}
						{props.item.themeColors && <ThemeColorsAccessory colors={props.item.themeColors} />}
					</ItemLeftAccessoryContainer>
				)}
				<ItemLeftLabel
					onPointerDownCapture={e => e.stopPropagation()}
					style={{
						pointerEvent: "auto",
						userSelect: "text",
						cursor: "text",
					}}
					$selectioncolor={colors.text.selection}
					onTap={() => props.onTap(props.item)}
				>
					{props.item.label}
					<UserLabel style={{ fontWeight: 500, color: colors.t8 }}>{userLabel}</UserLabel>
					<EndLabel>{endLabel}</EndLabel>
				</ItemLeftLabel>
			</ItemLeft>
			<ItemRight
				style={{
					x: iconX,
				}}
			>
				{(props.item.action === "INSTANT" || props.item.action === "SCOPED") && (
					<Icon name={iconName} size={iconSize} opacity={isFocussed ? 1 : 0} color={colors.t7} />
				)}
			</ItemRight>
		</ItemContentWrap>
	);
};

const ColorAccessory = props => {
	return (
		<div
			style={{
				width: 22,
				height: 22,
				borderRadius: 11,
				backgroundColor: props.item.colors.bg,
				border: `1px solid ${props.item.colors.bgOutline}`,
				color: props.item.colors.foreground,
				position: "relative",
			}}
		>
			<Icon
				name="BigText"
				size={16}
				color={props.item.colors.foreground}
				opacity={1}
				style={{
					x: 2,
					y: 2,
				}}
			/>
		</div>
	);
};

const ThemeColorsAccessory = props => {
	return (
		<div
			style={{
				width: 48,
				height: 28,
				borderRadius: 6,
				backgroundColor: props.colors.page,
				border: `1px solid ${props.colors.outline}`,
				position: "relative",
				display: "flex",
				flexDirection: "column",
				flexShrink: 0,
				justifyContent: "center",
				alignItems: "flex-start",
				paddingLeft: 6,
			}}
		>
			<div
				style={{
					color: props.colors.headings,
					fontSize: 9,
					lineHeight: 1,
				}}
			>
				Title
			</div>
			<div
				style={{
					color: props.colors.paragraph,
					fontSize: 7,
					lineHeight: 1,
				}}
			>
				Body
			</div>
		</div>
	);
};

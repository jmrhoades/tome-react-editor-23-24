import React from "react";
import styled from "styled-components";

import { Icon } from "../Icon";
import { AnimatePresence } from "framer-motion";
import { CurrentColor } from "../CurrentColor";
import { Field } from "../field/Field";
import { PopoverContext } from "../../editor/popovers/PopoverContext";
import { HudDivider } from "../hud/HudDivider";

export const hudButtonTypes = {
	BACK: "back",
	UP: "up",
	ICON: "icon",
	LABEL: "label",
	COLOR: "color",
	NUMBER_INPUT: "numberInput",
};

export const HudButton = props => {
	const {
		type = "icon",
		iconName = "Preferences",
		iconSize = 20,
		label = "",
		onTap,
		active,
		tile,
		style,
		tooltip,
		tooltipShortcut,
		tooltipHideOnClick = true,
		setInputFocused,
	} = props;

	const { showTooltip, hideTooltip } = React.useContext(PopoverContext);
	const ref = React.useRef(null);

	let paddingX = "var(--hud-button-padding-x)";
	let paddingY = "var(--hud-button-padding-y)";
	let width = undefined;
	let minHeight = "30px";
	let tooltipLabel = tooltip;
	let tooltipShortcutLabel = tooltipShortcut;

	let color = "var(--t9)";
	let colorHover = "var(--t9)";
	let backgroundHoverColor = "var(--t2)";
	let boxShadow = undefined;
	let marginRight = undefined;
	let marginLeft = undefined;
	if (active) {
		backgroundHoverColor = "var(--t3)";
	}
	if (type === hudButtonTypes.BACK) {
		color = "var(--t6)";
		paddingX = 0;
		backgroundHoverColor = "var(--t0)";
		boxShadow = "0.5px 0 0 0 var(--t2)";
		marginRight = "2px";
		tooltipLabel = "Select container";
		tooltipShortcutLabel = ["⇧", "⏎"];
	}

	if (type === hudButtonTypes.UP) {
		color = "var(--t6)";
		tooltipLabel = "Select container";
		tooltipShortcutLabel = ["⇧", "⏎"];
	}

	if (type === hudButtonTypes.NUMBER_INPUT) {
		marginRight = "2px";
		marginLeft = "2px";
	}

	if (type === hudButtonTypes.COLOR) {
		width = "30px";
	}


	return (
		<>
			{type !== hudButtonTypes.NUMBER_INPUT && (
				<ButtonWrap
					className={active ? "active" : undefined}
					ref={ref}
					onPointerDownCapture={e => {
						onTap(e);
						if (tooltipHideOnClick) {
							hideTooltip();
						}
					}}
					onPointerEnter={
						tooltipLabel
							? e =>
									showTooltip({
										event: e,
										anchorRef: ref,
										content: tooltipLabel,
										shortcut: tooltipShortcutLabel,
									})
							: undefined
					}
					onPointerLeave={tooltipLabel ? e => hideTooltip() : undefined}
					style={{
						"--background-color": "var(--t0)",
						"--active-background-color": "var(--t3)",
						"--background-color-hover": backgroundHoverColor,
						"--color": color,
						"--color-hover": colorHover,

						width:width,

						paddingLeft: paddingX,
						paddingRight: paddingX,

						paddingTop: paddingY,
						paddingBottom: paddingY,

						marginRight: marginRight,
						marginLeft:marginLeft,

						minHeight: minHeight,

						boxShadow: boxShadow,
						
						...style,
					}}
				>
					<ButtonHover />
					{type === hudButtonTypes.LABEL && <Label>{label}</Label>}
					{type === hudButtonTypes.ICON && <Icon name={iconName} size={iconSize} />}
					{type === hudButtonTypes.COLOR && <CurrentColor value={props.color} />}
					{type === hudButtonTypes.UP && (
						<>
							<Icon name={"Up"} size={16} />
						</>
					)}
					{type === hudButtonTypes.BACK && (
						<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.21967 6.28033L5.53033 8.96967C5.23744 9.26256 5.23744 9.73744 5.53033 10.0303L8.21967 12.7197C8.69214 13.1921 9.5 12.8575 9.5 12.1893V6.81066C9.5 6.14248 8.69214 5.80786 8.21967 6.28033Z"
								fill="currentColor"
							/>
						</svg>
					)}
					{type === "fontColor" && (
						<ColorContainer>
							<Color style={{ background: props.color }} />
						</ColorContainer>
					)}
				</ButtonWrap>
			)}

			{type === hudButtonTypes.NUMBER_INPUT && (
				<Field
					hud={true}
					value={20}
					setInputFocused={setInputFocused}
					style={{
						textAlign: "center",
						height: "26px",
						width: "32px",
						"--background-color": "var(--t0)",
						"--background-color-hover": "var(--t2)",
						borderRadius: "4px",
						marginLeft: "1px",
						marginRight: "1px",
					}}
				/>
			)}

			<AnimatePresence>
				{props.menu && active && (
					<props.menu anchorRef={ref} tile={tile} menuItemCallBack={props.menuItemCallBack} />
				)}
			</AnimatePresence>
		</>
	);
};

export const ButtonWrap = styled.button`
	position: relative;

	color: var(--color);
	font-family: var(--ui-family);
	font-size: var(--ui-font-size);
	line-height: var(--ui-font-size);
	svg {
		position: relative;
	}
	transition: var(--editor-hover-transition);
	--hover-background-color: var(--background-color);
	&.active {
		--hover-background-color: var(--active-background-color);
	}
	&:hover {
		color: var(--color-hover);
		--hover-background-color: var(--background-color-hover);
		transition: none;
	}

	border-radius: 0;
`;

export const ButtonHover = styled.span`
	display: block;
	position: absolute;
	top: var(--hud-button-inset);
	left: var(--hud-button-inset);
	width: calc(100% - var(--hud-button-inset) * 2);
	height: calc(100% - var(--hud-button-inset) * 2);
	border-radius: var(--hud-button-border-radius);
	background-color: var(--hover-background-color);
	transition: inherit;
`;

const ColorContainer = styled.span`
	display: block;
	width: 20px;
	height: 20px;
	display: grid;
	position: relative;
`;

const Color = styled.span`
	display: block;
	width: 13px;
	height: 13px;
	border-radius: 7px;
	margin: auto;
	box-shadow: 0 0 0 1px var(--t5);
`;

const Label = styled.span`
	padding-left: 2px;
	padding-right: 2px;
`;

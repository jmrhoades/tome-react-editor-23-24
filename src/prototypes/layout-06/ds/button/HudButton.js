import React from "react";
import styled from "styled-components";

import { Icon } from "../Icon";
import { AnimatePresence } from "framer-motion";

export const HudButton = props => {
	const { type = "icon", iconName = "Preferences", iconSize = 20, onTap, active, tile, style } = props;
	const ref = React.useRef(null);
	return (
		<>
			<ButtonWrap
				className={active ? "active" : undefined}
				ref={ref}
				onPointerDownCapture={onTap}
				style={{
					"--background-color": "var(--t0)",
					"--active-background-color": "var(--t3)",
					"--background-color-hover": active ? "var(--t3)" : "var(--t2)",
					"--color": "var(--t9)",
					"--button-padding": "2px",
					"--button-border-radius:": "4px",
					...style,
				}}
			>
				<ButtonHover />
				{type === "icon" && <Icon name={iconName} size={iconSize} />}
				{type === "color" && (
					<ColorContainer>
						<Color style={{ background: props.color }} />
					</ColorContainer>
				)}
				{type === "fontColor" && (
					<ColorContainer>
						<Color style={{ background: props.color }} />
					</ColorContainer>
				)}
			</ButtonWrap>
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
	padding-left: var(--hud-button-padding-x);
	padding-right: var(--hud-button-padding-x);

	padding-top: var(--hud-button-padding-y);
	padding-bottom: var(--hud-button-padding-y);

	color: var(--color);

	svg {
		position: relative;
	}

	transition: var(--editor-hover-transition);
	--hover-background-color: var(--background-color);
	&.active {
		--hover-background-color: var(--active-background-color);
	}
	&:hover {
		--hover-background-color: var(--background-color-hover);
		transition: none;
	}
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

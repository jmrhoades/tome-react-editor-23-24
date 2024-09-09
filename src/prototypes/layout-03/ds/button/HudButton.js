import React from "react";
import styled from "styled-components";

import { Icon } from "../Icon";
import { AnimatePresence } from "framer-motion";

export const HudButton = props => {
	const { type = "icon", iconName = "Preferences", iconSize = 20, onTap, active, tile } = props;
	const ref = React.useRef(null);
	return (
		<>
			<ButtonWrap
				ref={ref}
				onPointerDownCapture={onTap}
				style={{
					"--background-color": active ? "var(--t3)" : "var(--t0)",
					"--background-color-hover": active ? "var(--t3)" : "var(--t2)",
					"--color": "var(--t9)",
					"--button-padding": "2px",
					"--button-border-radius:": "4px",
				}}
			>
				{type === "icon" && <Icon name={iconName} size={iconSize} />}
				{type === "fontColor" && (
					<ColorContainer>
						<Color style={{ background: props.color }} />
					</ColorContainer>
				)}
			</ButtonWrap>
			<AnimatePresence>{props.menu && active && <props.menu anchorRef={ref} tile={tile} menuItemCallBack={props.menuItemCallBack}/>}</AnimatePresence>
		</>
	);
};

export const ButtonWrap = styled.button`
	border-radius: var(--button-border-radius);
	padding: var(--button-padding);
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

const ColorContainer = styled.div`
	width: 20px;
	height: 20px;
	display: grid;
`;

const Color = styled.div`
	width: 12px;
	height: 12px;
	border-radius: 6px;
	margin: auto;
`;

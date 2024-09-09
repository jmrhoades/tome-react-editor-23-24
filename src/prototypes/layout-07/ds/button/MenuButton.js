import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Button } from "../styled-components";
import { Icon } from "../Icon";
import { EditorContext } from "../../editor/EditorContext";
import { PopoverContext } from "../../editor/popovers/PopoverContext";

export const MenuButton = props => {
	const { menuType, leadingIcon, tile, style, closeColorPanel } = props;
	const { toggleMenu, menu, hideColorPanel } = React.useContext(PopoverContext);

	const onTap = e => {
		toggleMenu(menuType, e, tile);
		if (closeColorPanel) hideColorPanel();
		e.preventDefault();
		e.stopPropagation();
	};

	const active = menu && menu.type === menuType.type;

	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--background-color": active ? "var(--ui-button-background-active)" : "var(--ui-button-background-default)",
				"--background-color-hover": active
					? "var(--ui-button-background-active)"
					: "var(--ui-button-background-hover)",
				"--color": active ? "var(--t9)" : "var(--t7)",
				"--color-hover": active ? "var(--t9)" : "var(--t8)",
				"--leading-gap": "var(--menu-button-leading-gap)",
				...style,
			}}
		>
			<LeadinglWrap>
				{leadingIcon && (
					<LeadingIcon>
						<Icon name={leadingIcon} size={16} />
					</LeadingIcon>
				)}
				{props.children}
			</LeadinglWrap>

			<TrailingIcon>
				<Icon name={"Dropdown"} size={10} />
			</TrailingIcon>
		</ButtonWrap>
	);
};

export const ButtonWrap = styled.button`
	padding-right: 0;

	padding-left: var(--field-padding-x);
	padding-right: var(--field-padding-x);
	line-height: var(--field-line-height);

	min-width: var(--field-min-width);

	justify-content: space-between;
	align-items: center;
	/* gap: 6px; */
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);

	&:hover {
		color: var(--color-hover);
		background-color: var(--background-color-hover);
		transition: none;
	}

	> svg {
		transform: translateX(-6px);
	}
`;

const LeadinglWrap = styled.span`
	display: flex;
	gap: var(--leading-gap);
	align-items: center;
	pointer-events: none;
`;

const LeadingIcon = styled.div``;

const TrailingIcon = styled.div``;

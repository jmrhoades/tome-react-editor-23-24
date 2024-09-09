import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Button } from "../styled-components";
import { Icon } from "../Icon";
import { EditorContext } from "../../editor/EditorContext";

export const MenuButton = props => {
	const { menuType, leadingIcon, tile } = props;
	const { toggleMenu, menu } = React.useContext(EditorContext);

	const onTap = e => {
		toggleMenu(menuType, e, tile);
		e.preventDefault();
		e.stopPropagation();
	};

	const active = menu && menu.type === menuType;

	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--background-color": active ? "var(--t4)" : "var(--t2)",
				"--background-color-hover": active ? "var(--t4)" : "var(--t3)",
				"--color": active ? "var(--t9)" : "var(--t7)",
				"--color-hover": active ? "var(--t9)" : "var(--t8)",
			}}
		>
			<LabelWrap>
				{leadingIcon && (
					<Leading>
						<Icon name={leadingIcon} size={16} />
					</Leading>
				)}
				{props.children}
			</LabelWrap>

			<Icon name={"Dropdown"} size={10} />
		</ButtonWrap>
	);
};

export const ButtonWrap = styled.button`
	padding-right: 0;
	

	padding-left: var(--field-padding-x);
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

const LabelWrap = styled.span`
	display: flex;
	gap: var(--menu-item-gap);
	align-items: center;
	pointer-events: none;
`;

const Leading = styled.span``;

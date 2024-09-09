import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { IconButton } from "../button/IconButton";

export const PanelNavBar = props => {
	const { panel, togglePanel } = props;
	const { title, instruction } = panel;

	return (
		<PanelHeader
			style={{
				"--panel-header-padding-top": "16px",
				"--panel-header-padding-bottom": "12px",

				"--panel-drag-handle-color": "var(--t3)",
				"--panel-drag-handle-hover-color": "var(--t5)",
			}}
			animate={{
				opacity: props.itemDragging ? 0 : 1,
			}}
		>
			<Handle />
			<Title>{title}</Title>
			<Close>
				<IconButton
					iconName="Close"
					iconSize={22}
					color={"var(--t5)"}
					padding={"2px"}
					onTap={e => togglePanel(panel, e)}
				/>
			</Close>
			{instruction && instruction.length > 0 && <Instructions>{instruction}</Instructions>}
		</PanelHeader>
	);
};

const PanelHeader = styled(motion.div)`
	font-size: var(--ui-font-size);
	line-height: var(--ui-line-height);
	padding-bottom: var(--panel-header-padding-bottom);
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: 20px 20px auto;
	grid-template-areas:
		"handle handle"
		"title close"
		"instruction instruction";
	align-items: center;
	justify-content: start;
	position: relative;
`;

const Handle = styled.div`
	height: var(--panel-header-padding-top);
	grid-area: handle;
	display: flex;
	justify-content: center;
	align-self: start;

	cursor: grab;
	&:active {
		cursor: grabbing;
	}
	&:after {
		display: block;
		content: "";
		height: 3px;
		width: 28px;
		background-color: var(--panel-drag-handle-color);
		border-radius: 1.5px;
		margin-top: 6px;
		transition: var(--editor-hover-transition);
		transform: translateY(2px);
	}
	&:hover:after {
		background-color: var(--panel-drag-handle-hover-color);
		transition: none;
	}
`;

const Title = styled.h4`
	grid-area: title;
	padding-left: var(--panel-content-padding-x);
`;

const Close = styled.div`
	grid-area: close;
	justify-self: end;
	padding-right: var(--panel-content-padding-x);
	display: grid;
	place-content: center;
`;

const Instructions = styled.p`
	grid-area: instruction;
	font-size: var(--label-small-font-size);
	line-height: var(--label-small-line-height);
	color: var(--t6);
	padding-left: var(--panel-content-padding-x);
	padding-right: var(--panel-content-padding-x);
`;

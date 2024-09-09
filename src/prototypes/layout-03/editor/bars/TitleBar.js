import React from "react";
import styled from "styled-components";

import { IconButton } from "../../ds/button/IconButton";
import { Menus } from "../menus/menus";
import { EditorContext } from "../EditorContext";
import { LabelButton } from "../../ds/button/LabelButton";

export const TitleBar = ({ tile }) => {
	const { menu, toggleMenu } = React.useContext(EditorContext);
	return (
		<Wrap id="titlebar">
			<Left>
				<IconButton iconName="ChevronLeft" href="/" />
				<Title>Stytch layout demo</Title>
			</Left>

			<Right>
				<IconButton
					iconName="EngagementAnalytics"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
				/>
				<IconButton
					iconName="CommentFill"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
				/>
				<IconButton
					iconName="Record"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
				/>
				<LabelButton large>Share</LabelButton>
				<IconButton
					iconName="More"
					onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					active={menu && Menus.EDITOR_DEBUG.type === menu.type}
				/>
				<IconButton
					iconName="PlayFilled"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
				/>
			</Right>
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 48px;
	padding-left: 10px;
	padding-right: 10px;

	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Right = styled.div`
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 8px;
`;


const Title = styled.div`
	font-size: 15px;
	color: var(--t8);
`;
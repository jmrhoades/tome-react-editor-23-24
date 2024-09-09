import React from "react";
import styled from "styled-components";

import { IconButton } from "../../ds/button/IconButton";
import { menus } from "../popovers/menus/menus";
import { EditorContext } from "../EditorContext";
import { Anchor, PopoverContext } from "../popovers/PopoverContext";
import { LabelButton } from "../../ds/button/LabelButton";

export const TitleBar = ({ tile }) => {
	const { toggleMobileView, isMobileView, togglePlayMode  } = React.useContext(EditorContext);
	const { menu, toggleMenu, hidePanel } = React.useContext(PopoverContext);
	
	return (
		<Wrap id="titlebar" onContextMenu={e => {
			e.preventDefault();
		}}>
			<Left>
				<IconButton iconName="ChevronLeft" href="/" />
				<Title>LayoutV3 (iteration 7)</Title>
			</Left>

			<Right>
				{/* <IconButton
					onTap={e => {
						toggleMobileView();
					}}
					iconName={"DeviceMobile"}
					active={isMobileView()}
				/> */}
				<IconButton
					iconName="EngagementAnalytics"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
					tooltip={"Engagement analytics"}
					tooltipShortcut={["⌥", "E"]}
					tooltipAnchor={Anchor.bottom}
				/>
				<IconButton
					iconName="CommentFill"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
					tooltip={"Comments"}
					tooltipShortcut={["⌥", "M"]}
					tooltipAnchor={Anchor.bottom}
				/>

				<IconButton
					iconName="Record"
					//onTap={e => toggleMenu(Menus.EDITOR_DEBUG, e)}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
					tooltip={"Record narration"}
					tooltipShortcut={["⌥", "R"]}
					tooltipAnchor={Anchor.bottom}
				/>
				<LabelButton large>Share</LabelButton>
				<IconButton
					iconName="More"
					onTap={e => toggleMenu(menus.TOME_SETTINGS, e)}
					active={menu && menus.TOME_SETTINGS.type === menu.type}
				/>
				<IconButton
					iconName="PlayFilled"
					tooltip={"Present"}
					tooltipAnchor={Anchor["bottom-start"]}
					onTap={e => { togglePlayMode(); hidePanel() }}
					tooltipShortcut={["⌥", "P"]}
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
	pointer-events: none;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	pointer-events: auto;
	justify-self: start;
`;

const Right = styled.div`
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 8px;
	pointer-events: auto;
`;

const Title = styled.div`
	font-size: 15px;
	color: var(--t7);
`;

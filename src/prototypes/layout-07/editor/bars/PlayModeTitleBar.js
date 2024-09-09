import React from "react";
import styled from "styled-components";

import { IconButton } from "../../ds/button/IconButton";
import { menus } from "../popovers/menus/menus";
import { EditorContext } from "../EditorContext";
import { Anchor, PopoverContext } from "../popovers/PopoverContext";
import { LabelButton } from "../../ds/button/LabelButton";
import { TomeContext } from "../../tome/TomeContext";
import { PageProgressIndicator } from "./PageProgressIndicator";

export const PlayModeTitleBar = ({ tile }) => {

	const { getCurrentPage, tomeData, saveState } = React.useContext(TomeContext);
	const { toggleMobileView, isMobileView, togglePlayMode, tileRefs } = React.useContext(EditorContext);
	const { menu, toggleMenu } = React.useContext(PopoverContext);

	const currentPage = getCurrentPage();
	const isDark = currentPage.theme.mode === "dark";
	const logoAsset = isDark ? "/logos/tome-mark-dark-mode.png" : "/logos/tome-mark-light-mode.png";

	const currentIndex = tomeData.tiles.indexOf(getCurrentPage());
	const count = tomeData.tiles.length;

	

	return (
		<Wrap
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			<Left>
				<LogoContainer>
					<img src={logoAsset} height="28" alt="Tome" />
				</LogoContainer>
			</Left>

			<Center>
				<PageProgressIndicator currentIndex={currentIndex} count={count} />
			</Center>

			<Right>
				<IconButton
					iconName="ViewfinderLandscape"
					onTap={e => {
                        tomeData.editor.isFullscreen = true;
                        saveState();
                        
                        

                        const pageRef = tileRefs.current["scalebox_for_" + currentPage.id];
                        pageRef.current.requestFullscreen();
                    }}
					//active={menu && Menus.EDITOR_DEBUG.type === menu.type}
					tooltip={"View full screen"}
					tooltipAnchor={Anchor.bottom}
					tooltipShortcut={["⌥", "F"]}
				/>
				<LabelButton large>Share</LabelButton>
				<IconButton
					iconName="More"
					onTap={e => toggleMenu(menus.TOME_SETTINGS, e)}
					active={menu && menus.TOME_SETTINGS.type === menu.type}
				/>
				<IconButton
					iconName="Close"
					tooltip={"Exit"}
					tooltipAnchor={Anchor["bottom-start"]}
					tooltipShortcut={["esc"]}
					onTap={e => togglePlayMode()}
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
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	gap: 48px;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Center = styled.div`
	//padding-left: 36px;
	//padding-right: 36px;
`;

const LogoContainer = styled.div`
	padding-top: 12px;
	padding-left: 6px;
`;

const Right = styled.div`
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Title = styled.div`
	font-size: 15px;
	color: var(--t7);
`;

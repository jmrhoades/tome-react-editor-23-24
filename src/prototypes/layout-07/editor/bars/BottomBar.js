import React from "react";
import styled from "styled-components";
import { LabelButton } from "../../ds/button/LabelButton";
import { IconButton } from "../../ds/button/IconButton";
import { Icon } from "../../ds/Icon";
import { Anchor, PopoverContext } from "../popovers/PopoverContext";
import { EditorContext } from "../EditorContext";
import { Panels } from "../popovers/panels/panels";
export const BottomBar = ({ tile }) => {
	const { deselectTiles } = React.useContext(EditorContext);
	const { panel, togglePanel } = React.useContext(PopoverContext);

	return (
		<Wrap
			id="bottombar"
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			<Left>
				<LabelButton
					large
					onTap={e => {
						deselectTiles();
						togglePanel(Panels.ADD_PAGE, e);
					}}
					style={{
						pointerEvents: "auto",
					}}
				>
					<Icon name={"Add"} />
					Add page
				</LabelButton>
			</Left>
			<Right>
				<IconButton
					iconName="Help"
					href="/"
					style={{
						pointerEvents: "auto",
					}}
					tooltip={"Help"}
					tooltipAnchor={Anchor.left}
				/>
			</Right>
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	top: calc(100vh - 56px);
	left: 0;
	width: 100%;
	height: 56px;
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
`;

const Right = styled.div`
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 8px;
	color: var(--t6);
	transform: translateY(2px);
`;

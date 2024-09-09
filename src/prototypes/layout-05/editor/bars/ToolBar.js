import React from "react";
import styled from "styled-components";

import { IconButton } from "../../ds/button/IconButton";
import { EditorContext } from "../EditorContext";
import { Panels } from "../panels/Panels";

export const ToolBar = ({ tile }) => {
	const { panel, togglePanel, deselectTiles, toggleMobileView, isMobileView } = React.useContext(EditorContext);

	const buttons = [
		Panels.ADD_TEXT,
		Panels.ADD_MEDIA, 
		Panels.ADD_SHAPE,
		Panels.ADD_TABLE,
		Panels.ADD_CHART,
		Panels.ADD_EMBED,
		// Panels.ADD_ICON,
		Panels.THEME,
		Panels.PAGE_SETTINGS
	];

	return (
		<Wrap id="toolbar">
			{buttons.map((b, i) => (
				<IconButton
					key={i}
					onTap={e => {
						deselectTiles();
						togglePanel(b, e);
					}}
					iconName={b.icon}
					active={panel && b.type === panel.type}
				/>
			))}
			
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	top: 48px;
	right: 0;
	width: 48px;
	height: calc(100vh - (48px * 2));
	padding-right: 10px;

	display: flex;
	gap: 8px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

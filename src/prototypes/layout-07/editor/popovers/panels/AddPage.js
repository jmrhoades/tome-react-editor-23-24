import React from "react";
import styled from "styled-components";

import { Section } from "../../../ds/panel/Section";
import { TomeContext } from "../../../tome/TomeContext";
import { Themes } from "../../../tome/Themes";
import { LayoutIcon } from "./controls/LayoutIcon";
import { PopoverContext } from "../PopoverContext";

const addPageInfo = [
	{
		id: "Text",
		label: "Text",
		icon: "Text",
	},
	{
		id: "CenteredText",
		label: "Centered Text",
		icon: "CenteredText",
	},
	{
		id: "TextAndTable",
		label: "Text & Table",
		icon: "TextAndTable",
	},
	{
		id: "TextAndMedia",
		label: "Text & Media",
		icon: "TextAndMedia",
	},
	{
		id: "TextAndDrawing",
		label: "Text & Drawing",
		icon: "TextAndDrawing",
	},
	{
		id: "TextAndChart",
		label: "Text & Chart",
		icon: "TextAndChart",
	},
	{
		id: "Media",
		label: "Media",
		icon: "Media",
	},
	{
		id: "TwoMedia",
		label: "2 Media",
		icon: "TwoMedia",
	},
];

export const AddPage = props => {

    const { getCurrentPage } = React.useContext(TomeContext);

    const page = getCurrentPage();
    const theme = page.theme;

	return (
		<Section
			type="Row"
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "12px",
			}}
		>
			{addPageInfo.map(o => (
				<AddPageItem key={o.id} id={o.id} tooltip={o.label} icon={o.icon} theme={theme} />
			))}
		</Section>
	);
};

export const AddPageItem = props => {
    const { addPage } = React.useContext(TomeContext);
	const { showTooltip, hideTooltip, togglePanel } = React.useContext(PopoverContext);
	const { tooltip, icon, theme, id } = props;
	const ref = React.useRef(null);
	return (
		<Item
			ref={ref}
			onPointerDownCapture={e => {
                addPage(id)
				hideTooltip();
                togglePanel(null, e);
				e.stopPropagation();
			}}
			onPointerEnter={e =>
				showTooltip({
					event: e,
					anchorRef: ref,
					content: tooltip,
				})
			}
			onPointerLeave={tooltip ? e => hideTooltip() : undefined}
		>
			<LayoutIcon name={icon} theme={theme} />
		</Item>
	);
};

const Item = styled.div`
	width: 120px;
	height: 68px;
	flex-shrink: 0;
    cursor: pointer;
`;

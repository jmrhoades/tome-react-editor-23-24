import React from "react";

import { Section } from "../../ds/panel/Section";
import { TomeContext } from "../../tome/TomeContext";
import { Themes } from "../../ds/Themes";
import styled from "styled-components";
import { DragButton } from "../../ds/panel/DragButton";
import { AddTextButton } from "./AddTextButton";

const textButtonInfo = [
	{
		id: "Heading",
		label: "Heading",
		style: {
			fontSize: "21px",
			fontWeight: 500,
			lineHeight: 1,
			color: "var(--t9)",
		},
	},
	{
		id: "Body",
		label: "Body",
		style: {
			fontSize: "17px",
			fontWeight: 400,
			lineHeight: 1,
			color: "var(--t7)",
		},
	},
	{
		id: "List",
		label: "• List",
		style: {
			fontSize: "17px",
			fontWeight: 300,
			lineHeight: 1,
			color: "var(--t7)",
		},
	},
	{
		id: "Caption",
		label: "Caption",
		style: {
			fontSize: "13px",
			fontWeight: 400,
			lineHeight: 1,
			color: "var(--t7)",
		},
	},
];

export const AddText = props => {

    return (
		<Section
			type="Row"
			style={{
				gap: "8px",
			}}
		>
			{textButtonInfo.map(o => (
				<DragButton key={o.id} itemDragging={props.itemDragging} setItemDragging={props.setItemDragging}>
					<AddTextButton style={o.style}>{o.label}</AddTextButton>
				</DragButton>
			))}
		</Section>
	);
};

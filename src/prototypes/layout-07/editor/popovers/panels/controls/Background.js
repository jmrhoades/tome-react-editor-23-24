import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import { TomeContext } from "../../../../tome/TomeContext";
import { SectionTitle } from "../../../../ds/panel/SectionTitle";
import { Section } from "../../../../ds/panel/Section";
import { EditorContext } from "../../../EditorContext";
import { backgrounds } from "../../../../tome/TileData";
import { Anchor, PopoverContext } from "../../PopoverContext";
import { Panels } from "../panels";
import { Icon } from "../../../../ds/Icon";
import { CurrentColor } from "../../../../ds/CurrentColor";

export const Background = props => {
	const { tileMotionValues } = React.useContext(EditorContext);
	const { toggleColorPanel, panel, colorPanel } = React.useContext(PopoverContext);

	const { tile } = props;

	const motionColor =
		tile.background.type === backgrounds.COLOR
			? tileMotionValues.current[tile.id].backgroundColor
			: undefined;

	const colorHex = motionColor ? chroma(motionColor.get()).hex().toUpperCase().split("#")[1] : undefined;
	const labelValue = colorHex ? colorHex : "None";
	const active = colorPanel && colorPanel.type === Panels.BACKGROUND.type;

	return (
		<>
			<Section>
				<SectionTitle>Background</SectionTitle>
				<ButtonWrap
					onPointerDownCapture={e => {
						// toggleColorPanel(Panels.BACKGROUND, e.target, Anchor["left-end"]);
						//console.log(panel)
						toggleColorPanel(Panels.BACKGROUND, document.getElementById("properties-panel"), Anchor["left-end"]);
						e.stopPropagation();
					}}
					style={{
						"--background-color": active ? "var(--t4)" : "var(--t2)",
						"--background-color-hover": active ? "var(--t4)" : "var(--t3)",
					}}
				>
					{motionColor && <CurrentColor motionValue={motionColor} />}
					{!motionColor && <Icon name="CircleDashedOutline" size={16} />}

					{labelValue}
				</ButtonWrap>
			</Section>
		</>
	);
};

const ButtonWrap = styled.button`
	/* border-radius: 0; */
	padding: var(--button-padding);
	/* width: 28px; */
	flex-shrink: 0;
	color: var(--color);
	transition: var(--editor-hover-transition);
	background-color: var(--background-color);
	justify-content: start;
	gap: 8px;
	padding-left: 8px;
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

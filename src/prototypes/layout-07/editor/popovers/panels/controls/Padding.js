import React from "react";

import { Field } from "../../../../ds/field/Field";
import { TomeContext } from "../../../../tome/TomeContext";
import { SectionTitle } from "../../../../ds/panel/SectionTitle";
import { Section } from "../../../../ds/panel/Section";
import { EditorContext } from "../../../EditorContext";

export const Padding = props => {
	const { setTilePaddingX, setTilePaddingY } = React.useContext(TomeContext);

	const { setInputFocused } = React.useContext(EditorContext);

	const tile = props.tile;

	return (
		<Section>
			<SectionTitle>Padding</SectionTitle>
			<Section type="EvenColumn">
				<Field
					value={tile.layout.padding.left}
					submit={v => setTilePaddingX(tile, v)}
					setInputFocused={setInputFocused}
					icon={"PaddingHorizontal"}
				/>
				<Field
					value={tile.layout.padding.top}
					submit={v => setTilePaddingY(tile, v)}
					setInputFocused={setInputFocused}
					icon={"PaddingVertical"}
				/>
			</Section>
		</Section>
	);
};

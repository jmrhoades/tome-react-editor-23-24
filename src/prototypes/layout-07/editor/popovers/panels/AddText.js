import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import chroma from "chroma-js";

import { Section } from "../../../ds/panel/Section";
import { TomeContext } from "../../../tome/TomeContext";
import { DragButton } from "../../../ds/panel/DragButton";
import { backgrounds, containerSize, makeFlexData, makeTextData } from "../../../tome/TileData";
import { TextStyles } from "../../../tiles/Text";
import { SectionDivider } from "../../../ds/panel/SectionDivider";

export const AddText = props => {
	const { getCurrentPage } = React.useContext(TomeContext);

	const currentPage = getCurrentPage();

	let container = null;
	let text = null;

	const card = {
		id: "Card",
		label: "Heading",
		style: {
			fontSize: "17px",
			fontWeight: 400,
			lineHeight: 1,
			//color: "var(--t9)",
			backgroundColor: "var(--t2)",
			borderColor: "transparent",
			aspectRatio: "16/9",
			alignItems: "start",
		},
	};

	container = makeFlexData(null);

	// Page border / background
	let cardBackgroundColor = document.body.style.backgroundColor;
	if (currentPage.theme.mode === "light") {
		cardBackgroundColor = chroma(cardBackgroundColor).darken(0.35).hex();
	} else {
		cardBackgroundColor = chroma(cardBackgroundColor).brighten(0.5).hex();
	}
	container.background.type = backgrounds.COLOR;
	container.background.value = cardBackgroundColor;
	container.layout.borderRadius = 8;
	//container.layout.alignX = contentAlign.CENTER;
	//container.layout.alignY = contentAlign.CENTER;
	//container.layout.height.type = containerSize.HUG;
	text = makeTextData(container);
	text.content.textStyle = TextStyles.Body2;
	text.layout.width.type = containerSize.HUG;
	text.layout.height.type = containerSize.HUG;

	card.data = container;

	const heading = {
		id: "Heading",
		label: "Heading",
		style: {
			fontSize: "19px",
			fontWeight: 500,
			lineHeight: 1,
			color: "var(--t9)",
		},
		data: makeTextData(null),
	};
	heading.data.content.textStyle = TextStyles.Heading1;

	const body = {
		id: "Body",
		label: "Body",
		style: {
			fontSize: "17px",
			fontWeight: 400,
			lineHeight: 1,
			color: "var(--t7)",
		},
		data: makeTextData(null),
	};
	body.data.content.textStyle = TextStyles.Body2;
	body.data.content.text = `Type something…`;

	const list = {
		id: "List",
		label: "• List",
		style: {
			fontSize: "17px",
			fontWeight: 300,
			lineHeight: 1,
			color: "var(--t7)",
		},
		data: makeTextData(null),
	};
	list.data.content.text = `
    <ul>
    <li>Item</li>
	<li>Item</li>
	<li>Item</li>
    </ul>
    `;

	const caption = {
		id: "Caption",
		label: "Caption",
		style: {
			fontSize: "13px",
			fontWeight: 400,
			lineHeight: 1,
			color: "var(--t7)",
		},
		data: makeTextData(null),
	};
	caption.data.content.textStyle = TextStyles.Caption;
	caption.data.content.text = `Type something…`;

	const containerButtonInfo = []; //[card];
	const nodeButtons = [heading, body, list, caption];

	return (
		<Section
			type="Row"
			style={{
				gap: "8px",
			}}
		>
			{containerButtonInfo.map(o => (
				<DragButton key={o.id} info={o} itemDragging={props.itemDragging} setItemDragging={props.setItemDragging}>
					<AddTextButton info={o} />
				</DragButton>
			))}

			{/* <SectionDivider style={{ opacity: props.itemDragging ? 0 : 1 }} /> */}

			{nodeButtons.map(o => (
				<DragButton key={o.id} info={o} itemDragging={props.itemDragging} setItemDragging={props.setItemDragging}>
					<AddTextButton info={o} />
				</DragButton>
			))}
		</Section>
	);
};

const AddTextButton = props => {
	const { style, label } = props.info;
	return <Wrap style={{ ...style }}>{label}</Wrap>;
};

const Wrap = styled(motion.div)`
	display: flex;
	align-items: start;
	background-color: var(--t2);
	border-radius: 6px;
	padding: 12px;
	min-height: 68px;

	/* background-color: transparent; */
	/* border-color: var(--t2); */
	/* border-width: 1px; */
	/* border-style: solid; */
	/* min-height: 44px; */

	transition: all 0.2s ease;
	cursor: grab;
	&:hover {
		//background-color: var(--z3);
		border-color: var(--t4);
		transform: scale(1.025);
	}
	&:active {
		cursor: grabbing;
	}
`;

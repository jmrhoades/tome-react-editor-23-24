import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import chroma from "chroma-js";

import { Section } from "../../../ds/panel/Section";
import { TomeContext } from "../../../tome/TomeContext";
import { Themes } from "../../../tome/Themes";
import { DragButton } from "../../../ds/panel/DragButton";
import { uniqueId } from "lodash";
import { Icon } from "../../../ds/Icon";
import { backgrounds, containerSize, makeImageData } from "../../../tome/TileData";



export const AddMedia = props => {
	
	const { getCurrentPage } = React.useContext(TomeContext);

	const currentPage = getCurrentPage();

	let img = null;

	const upload = {
		id: "upload",
		label: "Upload",
		icon: "Upload",
	};

	const search = {
		id: "search",
		label: "Search",
		icon: "Search",
	};

	const generate = {
		id: "generate",
		label: "Generate",
		icon: "DoubleSparkle",
	};

	
	// Page border / background
	let cardBackgroundColor = document.body.style.backgroundColor;
	if (currentPage.theme.mode === "light") {
		cardBackgroundColor = chroma(cardBackgroundColor).darken(0.35).hex();
	} else {
		cardBackgroundColor = chroma(cardBackgroundColor).brighten(0.5).hex();
	}

	let defaultSize = 100;
	let borderRadius = 12;

	img = makeImageData(null);	
	img.background.type = backgrounds.COLOR;
	img.background.value = cardBackgroundColor;
	img.layout.borderRadius = borderRadius;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = defaultSize;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = defaultSize;
	upload.data = img;

	img = makeImageData(null);	
	img.background.type = backgrounds.COLOR;
	img.background.value = cardBackgroundColor;
	img.layout.borderRadius = borderRadius;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = defaultSize;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = defaultSize;
	search.data = img;

	img = makeImageData(null);	
	img.background.type = backgrounds.COLOR;
	img.background.value = cardBackgroundColor;
	img.layout.borderRadius = borderRadius;
	img.layout.width.type = containerSize.CUSTOM;
	img.layout.width.value = defaultSize;
	img.layout.height.type = containerSize.CUSTOM;
	img.layout.height.value = defaultSize;
	generate.data = img;

	const addMediaButtons = [upload, search, generate];

	return (
		<Section
			type="Row"
			style={{
				gap: "8px",
			}}
		>
			{addMediaButtons.map(o => (
				<DragButton key={o.id} info={o} itemDragging={props.itemDragging} setItemDragging={props.setItemDragging}>
					<AddMediaButton info={o} />
				</DragButton>
			))}
		</Section>
	);
};

const AddMediaButton = props => {
	const { style, label, icon } = props.info;

	return (
		<Wrap style={{ ...props.style }}>
			<div>
				<Icon name={icon} />{" "}
			</div>
			<div>{label}</div>
		</Wrap>
	);
};

const Wrap = styled(motion.div)`
	display: flex;
	gap: 4px;
	align-items: center;
	background-color: var(--t2);

	border-radius: 6px;
	padding-top: 12px;
	padding-bottom: 12px;
	padding-left: 8px;
	padding-right: 8px;
	min-height: 44px;

	transition: all 0.2s ease;
	cursor: grab;
	&:hover {
		background-color: var(--z3);
		transform: scale(1.025);
	}
	&:active {
		cursor: grabbing;
	}
`;

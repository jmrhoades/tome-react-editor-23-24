import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";

import { Section } from "../../../ds/panel/Section";
import { TomeContext } from "../../../tome/TomeContext";
import { Themes } from "../../../tome/Themes";
import { DragButton } from "../../../ds/panel/DragButton";

const iconButtonInfo = [
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/audio.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/avocado.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/balloon.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/brain-1.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/color-swatch.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/crown.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/flick.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/growth.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/infinity.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/growth.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/mountain-bike.svg",
		width: 24,
		height: 24,
	},
	{
		id: uniqueId("icon_"),
		label: "",
		src: "/central-icon-system/24/sparkles-soft.svg",
		width: 24,
		height: 24,
	},
];

export const AddIcon = props => {
	return (
		<div
			type="EvenColumn"
			style={{
				gap: "8px",
				display: "grid",
				gridTemplateColumns: "repeat(3, 40px)",
				gridAutoRows: "40px",
			}}
		>
			{iconButtonInfo.map(o => (
				<DragButton key={o.id} itemDragging={props.itemDragging} setItemDragging={props.setItemDragging}>
					<AddIconButton info={o} />
				</DragButton>
			))}
		</div>
	);
};

const AddIconButton = props => {
	const { info } = props;
	const { src, width, height } = info;
	return (
		<Wrap
			style={{
				aspectRatio: width / height,
				...props.style,
			}}
		>
			<img
				src={src}
				alt={""}
				style={{
					display: "block",
					maxWidth: "100%",
					pointerEvents: "none",
				}}
			/>
		</Wrap>
	);
};

const Wrap = styled(motion.div)`
	/* background-color: var(--z2); */
	/* border-radius: 4px; */
	overflow: hidden;

	display: grid;
	place-items: center;

	transition: all 0.2s ease;
	cursor: grab;
	//opacity: 0.75;
	&:hover {
		/* background-color: var(--z3); */
		//transform: scale(1.025);
		//opacity: 1;
	}
	&:active {
		cursor: grabbing;
	}
`;

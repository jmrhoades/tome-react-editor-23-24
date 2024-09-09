import React from "react";

import { Section } from "../../ds/panel/Section";
import { TomeContext } from "../../tome/TomeContext";
import { Themes } from "../../ds/Themes";
import styled from "styled-components";
import { DragButton } from "../../ds/panel/DragButton";
import { uniqueId } from "lodash";
import { AddIconButton } from "./AddIconButton";

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

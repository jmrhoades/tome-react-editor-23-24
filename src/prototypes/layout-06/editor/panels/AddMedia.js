import React from "react";

import { Section } from "../../ds/panel/Section";
import { TomeContext } from "../../tome/TomeContext";
import { Themes } from "../../ds/Themes";
import styled from "styled-components";
import { DragButton } from "../../ds/panel/DragButton";
import { uniqueId } from "lodash";
import { AddMediaButton } from "./AddMediaButton";

const mediaInfo = [
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-5SgxLrtdk3Y-unsplash.webp",
		width: 1920,
		height: 1280,
	},
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-as1WbRL_iqc-unsplash.webp",
		width: 1920,
		height: 3413,
	},
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-Fcd1oUdKKto-unsplash.webp",
		width: 1920,
		height: 1280,
	},
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-gdbgHuxfRvU-unsplash.webp",
		width: 1920,
		height: 1080,
	},
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-mLXHf12slbY-unsplash.webp",
		width: 1920,
		height: 3413,
	},
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-TiKeTXitDJQ-unsplash.webp",
		width: 1920,
		height: 3413,
	},
	{
		id: uniqueId("media_"),
		label: "",
		src: "/unsplash/alex-shuper-TuCvj0YvNSA-unsplash.webp",
		width: 1920,
		height: 1280,
	},
];

const col1 = [mediaInfo[3], mediaInfo[1], mediaInfo[5]];
const col2 = [mediaInfo[2],  mediaInfo[6], mediaInfo[0], mediaInfo[4]];
const gap = "10px";

export const AddMedia = props => {
	return (
		<Section
			style={{
				gap: gap,
			}}
		>
			<Section
				type="Row"
				style={{
					gap: gap,
					alignContent: "start",
				}}
			>
				{col1.map(o => (
					<DragButton
						key={o.id}
						style={o.style}
						itemDragging={props.itemDragging}
						setItemDragging={props.setItemDragging}
					>
						<AddMediaButton info={o} />
					</DragButton>
				))}
			</Section>
			<Section
				type="Row"
				style={{
					gap: gap,
					alignContent: "start",
				}}
			>
				{col2.map(o => (
					<DragButton
						key={o.id}
						style={o.style}
						itemDragging={props.itemDragging}
						setItemDragging={props.setItemDragging}
					>
						<AddMediaButton info={o} />
					</DragButton>
				))}
			</Section>
		</Section>
	);
};

import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, animate, useTransform } from "framer-motion";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { PopoverContext } from "../PopoverContext";

import { HudButton, hudButtonTypes } from "../../../ds/button/HudButton";
import { HudDivider } from "../../../ds/hud/HudDivider";

import {
	backgrounds,
	containerSize,
	contentDirection,
	containerWidthOptions,
	containerHeightOptions,
	contentDistribute,
	contentAlignXOptions,
	contentAlignYOptions,
} from "../../../tome/TileData";
import { Panels } from "../panels/panels";
import { HudLabel } from "../../../ds/hud/HudLabel";

export const TextSelectionHUD = props => {
	const { textSelectionRectMotionValues, textSelectedMotionValue } = React.useContext(EditorContext);
	const [showFormatBar, setShowFormatBar] = React.useState(false);

	useMotionValueEvent(textSelectedMotionValue, "change", latest => {
		if (latest) {
			setShowFormatBar(true);
		} else {
			setShowFormatBar(false);
		}
	});

	return <>{showFormatBar && <TextFormatBar selectionRectMotionValues={textSelectionRectMotionValues} />}</>;
};

export const TextFormatBar = props => {
	// const { setTileWidthType, setTileHeightType } = React.useContext(TomeContext);

	const { setInputFocused } = React.useContext(EditorContext);

	const { x, y, width, height } = props.selectionRectMotionValues.current;

	// const left = useTransform(() => x.get() + width.get() / 2);

	//const { togglePanel, panel, toggleMenu, menu } = React.useContext(PopoverContext);
	//const { tile, hudRef } = props;

	return (
		<Positioner
			style={{
				y: y,
				//left: left,
                left: x,
			}}
		>
			<Box
				style={{
                    // x: "-50%",
					y: "-100%",
					marginTop: "-12px",
					marginLeft: "-1px",
				}}
			>
				<HudButton
					type={hudButtonTypes.LABEL}
					label="Body"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Styles"}
				/>

				<HudDivider />

				<HudButton
					type={hudButtonTypes.NUMBER_INPUT}
					setInputFocused={setInputFocused}
					value={20}
					onTap={e => {
						e.stopPropagation();
					}}
				/>

				<HudDivider />

				<HudButton
					type="fontColor"
					color={"var(--t9)"}
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Color"}
				/>

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="AlignLeft"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Alignment"}
				/>

				<HudDivider />

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="ListBullet"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Bullet list"}
				/>

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="ListNumber"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Number list"}
				/>

				<HudDivider />

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="Bold"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Bold"}
				/>

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="Italic"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Italic"}
				/>

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="Strikethrough"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Strikethrough"}
				/>

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="Code"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Code"}
				/>

				<HudDivider />

				<HudButton
					type={hudButtonTypes.ICON}
					iconName="Link"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"Link"}
				/>

				<HudDivider />

				<HudButton
					iconName="DoubleSparkle"
					onTap={e => {
						e.stopPropagation();
					}}
					tooltip={"AI tools"}
				/>
			</Box>
		</Positioner>
	);
};

const Positioner = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const Box = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
	transform-style: preserve-3d;

	display: flex;
	align-items: center;
	gap: var(--hud-gap);
	padding: var(--hud-padding);
	border-radius: var(--hud-border-radius);
	background-color: var(--hud-background-color);
	box-shadow: var(--stroke-and-shadow);
`;

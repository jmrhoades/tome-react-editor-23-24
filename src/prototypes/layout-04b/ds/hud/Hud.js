import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { TomeContext } from "../../tome/TomeContext";
import { Events } from "../../editor/EditorContext";
import { FlexHud } from "../../editor/huds/FlexHud";
import { ImageHud } from "../../editor/huds/ImageHud";
import { TextHud } from "../../editor/huds/TextHud";
import { IconHud } from "../../editor/huds/IconHud";
import { Anchor, positionMenu } from "../../editor/EditorContext";
import { transitions } from "../Transitions";

export const Hud = props => {
	const { tomeData } = React.useContext(TomeContext);
	const { tile, anchorRect, event } = props;

	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const hudOpacity = useMotionValue(0);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			animate(hudOpacity, 0, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			animate(hudOpacity, 1, transitions.layoutTransition);
		}
		if (latest === Events.ClickedTile) {
			animate(hudOpacity, 1, transitions.fast);
		}
	});

	const updateSize = () => {
		if (ref.current) {
			const hudRect = ref.current.getBoundingClientRect();
			const rect = positionMenu(anchorRect, hudRect, { anchor: Anchor["top-start"], offset: 8 });
			x.set(rect.x);
			y.set(rect.y);
		}
	};

	React.useEffect(updateSize, [ref, tomeData]);

	updateSize();

	return (
		<Positioner
			style={{
				x: props.x,
				y: props.y,
				opacity: hudOpacity,
			}}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.2,
				},
			}}
		>
			<Box
				ref={ref}
				style={{
					x: x,
					y: y,
				}}
			>
				{tile.type === "FLEX" && <FlexHud tile={tile} />}
				{tile.type === "TEXT" && <TextHud tile={tile} />}
				{tile.type === "IMAGE" && <ImageHud tile={tile} />}
				{tile.type === "ICON" && <IconHud tile={tile} />}
			</Box>
		</Positioner>
	);
};

const Positioner = styled(motion.div)``;

const Box = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;

	display: flex;
	gap: var(--hud-gap);
	padding: var(--hud-padding);

	border-radius: var(--hud-border-radius);
	background-color: var(--hud-background-color);
	box-shadow: var(--stroke-and-shadow);
`;

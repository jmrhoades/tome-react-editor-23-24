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
	const { tile, anchorRect } = props;

	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	
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
		<Box
			ref={ref}
			style={{
				x: x,
				y: y,
				//opacity: hudOpacity,
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
			}}
		>
			{tile.type === "FLEX" && <FlexHud tile={tile} />}
			{tile.type === "TEXT" && <TextHud tile={tile} />}
			{tile.type === "IMAGE" && <ImageHud tile={tile} />}
			{tile.type === "ICON" && <IconHud tile={tile} />}
		</Box>
	);
};

const Box = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
	transform-style: preserve-3d;

	display: flex;
	gap: var(--hud-gap);
	padding: var(--hud-padding);
	border-radius: var(--hud-border-radius);

	background-color: var(--hud-background-color);
	box-shadow: var(--stroke-and-shadow);
`;

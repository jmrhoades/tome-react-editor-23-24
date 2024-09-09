import React from "react";
import styled from "styled-components";
import { motion, useAnimation, animate, useMotionValueEvent } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { LayoutContext } from "../layout/LayoutContext";
import { EventContext } from "../event/EventContext";
import { Frame, SVGFrame } from "../ds/Components";
import { transitions } from "../ds/Transitions";

export const SelectBox = ({ tile, selected, editing }) => {
	const { currentPage } = React.useContext(TomeContext);
	const { cornerRadius } = React.useContext(LayoutContext);
	const { draggingMotionValue, pressingMotionValue } = React.useContext(EventContext);

	const theme = currentPage.theme;
	const strokeWidth = 1.5;

	const isDragging = () => tile.id === draggingMotionValue.get();
	const [dragging, setDragging] = React.useState(isDragging());
	useMotionValueEvent(draggingMotionValue, "change", latest => setDragging(isDragging()));

	const isPressing = () => tile.id === pressingMotionValue.get();
	const [pressing, setPressing] = React.useState(isPressing());
	useMotionValueEvent(pressingMotionValue, "change", latest => setPressing(isPressing()));

	return (
		<Frame
			initial={false}
			animate={{ opacity: selected && !dragging && !pressing ? 1 : 0 }}
			transition={{
				duration: 0.15,
			}}
		>
			<SVGFrame style={{ width: "100%", height: "100%" }}>
				<motion.rect
					width="100%"
					height="100%"
					rx={cornerRadius}
					stroke={editing ? theme.colors.backgrounds.page : theme.colors.accent}
					strokeWidth={strokeWidth}
				/>
				<motion.rect
					width="100%"
					height="100%"
					rx={cornerRadius}
					stroke={editing ? theme.colors.t4 : "transparent"}
					strokeWidth={strokeWidth}
				/>
			</SVGFrame>
		</Frame>
	);
};

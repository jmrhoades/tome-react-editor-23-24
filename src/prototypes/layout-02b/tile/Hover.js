import React from "react";
import { useMotionValueEvent } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { LayoutContext } from "../layout/LayoutContext";
import { EventContext } from "../event/EventContext";
import { Frame } from "../ds/Components";

export const Hover = ({ tile }) => {
	const { currentPage, getTiles } = React.useContext(TomeContext);
	const { cornerRadius } = React.useContext(LayoutContext);
	const { hoverMotionValue, allowHover } = React.useContext(EventContext);

	const isHovered = () => tile.id === hoverMotionValue.get();
	const [hover, setHover] = React.useState(isHovered());
	useMotionValueEvent(hoverMotionValue, "change", latest => setHover(isHovered()));
	useMotionValueEvent(allowHover, "change", latest => {
		if (latest === 0) setHover(false);
	});

	return (
		<Frame
			style={{
				backgroundColor: currentPage.theme.colors.t2,
				borderRadius: cornerRadius,
			}}
			initial={false}
			animate={{ opacity: hover ? 1 : 0 }}
		/>
	);
};

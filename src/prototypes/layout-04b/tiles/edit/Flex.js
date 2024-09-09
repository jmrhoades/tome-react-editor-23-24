import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";

import { EditorContext, Events } from "../../editor/EditorContext";

export const Flex = ({ tile }) => {
	const { isTileDraggable, pageScale, event, tileMotionValues } = React.useContext(EditorContext);
	const [borderRadius, setBorderRadius] = React.useState(0);
	const [backgroundColor, setBackgroundColor] = React.useState(undefined);

	const draggable = isTileDraggable(tile);
	const dragging = React.useRef(false);
	const dragBgOpacity = useMotionValue(0);

	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile && draggable) {
			dragging.current = true;
			dragBgOpacity.set(1);
		}
		if (latest === Events.ReleasedTile && draggable) {
			dragging.current = false;
			dragBgOpacity.set(0);
		}
	});

	const updateRect = () => {
		const el = document.getElementById(tile.id);
		const style = getComputedStyle(el);
		setBorderRadius(style.borderRadius);
		setBackgroundColor(style.backgroundColor);
	};

	// Update metrics when data or state changes
	React.useLayoutEffect(updateRect);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<FlexBox
			id={tile.id + "_edit"}
			className="flex-container"
			style={{
				borderRadius: borderRadius,
				backgroundColor: backgroundColor,
				borderTop: tile.layout.borderTop,
				borderBottom: tile.layout.borderBottom,
				borderLeft: tile.layout.borderLeft,
				borderRight: tile.layout.borderRight,
			}}
		>
			<DragBg
				style={{
					opacity: dragBgOpacity,
					borderRadius: borderRadius,
					backgroundColor: "var(--dragging-background-color)",
					boxShadow: "var(--shadow-small)",
				}}
			/>
		</FlexBox>
	);
};

const FlexBox = styled(motion.section)`
	position: absolute;
	width: 100%;
	height: 100%;

	/* background-color: var(--editor-debug-background-color); */
	/* box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset; */

	/* gap: var(--gap); */
	/* padding: var(--padding-y) var(--padding-x); */
	/* border-radius: var(--border-radius); */
`;

const DragBg = styled(motion.div)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 0.2s ease-out;
`;

const DragFill = styled(DragBg)``;

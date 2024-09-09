import React from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { PanelNavBar } from "./PanelNavBar";
import { positionMenu, EditorContext } from "../../editor/EditorContext";

export const Panel = props => {
	const { panel, tomeData } = props;

	return <AnimatePresence>{panel && <PanelView key={panel.id} panel={panel} tomeData={tomeData} />}</AnimatePresence>;
};

const PanelView = props => {
	const { togglePanel, allowHover } = React.useContext(EditorContext);
	const { panel, tomeData } = props;

	const ref = React.useRef();
	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	React.useLayoutEffect(() => {
		if (panel && panel.anchorEl) {
			const anchorRect = panel.anchorEl.getBoundingClientRect();
			const rect = ref.current.getBoundingClientRect();
			const p = positionMenu(anchorRect, rect, { anchor: panel.anchor, offset: panel.offset });
			setPosition({ x: p.x, y: p.y });
		}
	}, [ref, panel]);

	// Drag motion values
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);
	const pointerInfo = React.useRef({});
	const [dragging, setDragging] = React.useState(false);

	const initPointerInfo = e => {
		pointerInfo.current.startX = e.clientX;
		pointerInfo.current.startY = e.clientY;
		pointerInfo.current.x = e.clientX;
		pointerInfo.current.y = e.clientY;
		pointerInfo.current.dx = 0;
		pointerInfo.current.dy = 0;
		pointerInfo.current.initialX = dragX.get();
		pointerInfo.current.initialY = dragY.get();
	};

	const updateDelta = e => {
		const { startX, startY } = pointerInfo.current;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
	};

	const onPointerDown = e => {
		initPointerInfo(e);
		setDragging(true);
		allowHover.current = false;
		e.stopPropagation();
	};

	const onPointerMove = e => {
		updateDelta(e);
		const { dx, dy } = pointerInfo.current;
		dragX.set(pointerInfo.current.initialX + dx);
		dragY.set(pointerInfo.current.initialY + dy);
	};

	const onPointerUp = e => {
		setDragging(false);
		allowHover.current = true;
	};

	React.useEffect(() => {
		if (dragging) {
			document.addEventListener("mousemove", onPointerMove);
			document.addEventListener("touchmove", onPointerMove, { passive: false });
			document.addEventListener("mouseup", onPointerUp);
			document.addEventListener("touchend", onPointerUp);
		}
		return () => {
			document.removeEventListener("mousemove", onPointerMove);
			document.removeEventListener("touchmove", onPointerMove, { passive: false });
			document.removeEventListener("mouseup", onPointerUp);
			document.removeEventListener("touchend", onPointerUp);
		};
	}, [dragging]);

	return (
		<PanelWrap
			id={panel.id}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
			}}
			ref={ref}
			style={{
				"--panel-left": position.x + "px",
				"--panel-top": position.y + "px",
				x: dragX,
				y: dragY,
			}}
			onPointerDown={onPointerDown}
		>
			<PanelNavBar panel={panel} togglePanel={togglePanel} />
			<PanelContent>{panel.content && <panel.content panel={panel} tomeData={tomeData} />}</PanelContent>
		</PanelWrap>
	);
};

const PanelWrap = styled(motion.div)`
	width: 188px;
	pointer-events: auto;

	position: fixed;
	top: var(--panel-top);
	left: var(--panel-left);
	z-index: 999;

	border-radius: var(--panel-border-radius);
	box-shadow: var(--panel-shadow);
	background-color: var(--panel-background-color);

	&:active {
		cursor: grabbing;
	}
`;

const PanelContent = styled.div`
	display: flex;
	flex-direction: column;

	gap: var(--panel-content-gap);

	padding-bottom: var(--panel-content-padding-y);
	padding-left: var(--panel-content-padding-x);
	padding-right: var(--panel-content-padding-x);
`;

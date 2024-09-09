import React from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { PanelNavBar } from "./PanelNavBar";
import { EditorContext } from "../../editor/EditorContext";
import { PopoverContext, positionMenu } from "../../editor/popovers/PopoverContext";

export const Panel = props => {
	const { panel, tomeData } = props;
	
	return <>{panel && <PanelView key={panel.id} panel={panel} tomeData={tomeData} />}</>;
};

const PanelView = props => {
	const { allowHover } = React.useContext(EditorContext);
	const { togglePanel, toggleMenu } = React.useContext(PopoverContext);

	const { panel, tomeData } = props;

	const ref = React.useRef();
	const [position, setPosition] = React.useState({ x: 0, y: 0 });


	React.useLayoutEffect(() => {
		if (panel) {
			const rect = ref.current.getBoundingClientRect();

			if (panel.anchorEl) {
				let anchorRect = panel.anchorEl.getBoundingClientRect();
				if (panel.anchorRef && panel.anchorRef.current) {
					anchorRect = panel.anchorRef.current.getBoundingClientRect();
				}
				const p = positionMenu(anchorRect, rect, { anchor: panel.anchor, offset: panel.offset });
				setPosition({ x: p.x, y: p.y });
			} else {

				const p = positionMenu(null, rect, { anchor: panel.anchor, offset: panel.offset });
				setPosition({ x: p.x, y: p.y });
			}
			
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
		toggleMenu(null, e);
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

	const [itemDragging, setItemDragging] = React.useState(false);

	return (
		<PanelWrap
			id={panel.panelId}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0,
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
			<PanelBg
				animate={{
					opacity: itemDragging ? 0 : 1,
				}}
				style={{
					backgroundColor: panel.higherZ
						? "var(--panel-higher-z-background-color)"
						: "var(--panel-background-color)",
				}}
			/>
			<PanelNavBar panel={panel} togglePanel={togglePanel} itemDragging={itemDragging} />
			<PanelContent
				style={{
					width: panel.width ? panel.width : "188px",
				}}
			>
				{panel.content && (
					<panel.content
						key={panel.id}
						panel={panel}
						togglePanel={togglePanel}
						tomeData={tomeData}
						itemDragging={itemDragging}
						setItemDragging={setItemDragging}
					/>
				)}
			</PanelContent>
		</PanelWrap>
	);
};

const PanelWrap = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: var(--panel-top);
	left: var(--panel-left);
	font-size: var(--ui-font-size);
	line-height: var(--ui-line-height);
	&:active {
		cursor: grabbing;
	}
`;

const PanelContent = styled.div`
	display: flex;
	flex-direction: column;

	gap: var(--panel-section-gap);
	padding-bottom: var(--panel-content-padding-y);
	padding-left: var(--panel-content-padding-x);
	padding-right: var(--panel-content-padding-x);
	position: relative;
`;

const PanelBg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-radius: var(--panel-border-radius);
	box-shadow: var(--panel-shadow);
	background-color: var(--panel-background-color);
`;

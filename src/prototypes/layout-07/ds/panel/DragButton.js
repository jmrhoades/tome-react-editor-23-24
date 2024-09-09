import React from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styled from "styled-components";
import { transitions } from "../Transitions";
import { EditorContext } from "../../editor/EditorContext";
import { PopoverContext } from "../../editor/popovers/PopoverContext";

export const DragButton = props => {
	const { allowHover, onAddTileDragStart, onAddTileDrag, onAddTileDragEnd, onAddTileClick } =
		React.useContext(EditorContext);

	const { togglePanel } = React.useContext(PopoverContext);

	const ref = React.useRef(null);

	const [pressing, setPressing] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);

	const pointerInfo = React.useRef({
		startX: 0,
		startY: 0,
	});

	const dragThreshold = 3;

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const z = useMotionValue(0);

	const onDrag = (e, info) => {
		const { dx, dy } = pointerInfo.current;
		x.set(dx);
		y.set(dy);
		onAddTileDrag(e, info);
	};

	const onDragStart = e => {
		setPressing(false);
		setDragging(true);
		props.setItemDragging(true);
		const rect = ref.current.getBoundingClientRect();
		onAddTileDragStart(e, rect);
		document.body.classList.add("grabbing");
	};

	const onDragEnd = (e, info) => {
		//props.setItemDragging(false);
		setDragging(false);
		togglePanel(null, e);
		onAddTileDragEnd(e, props.info);
		document.body.classList = "";
	};

	const onPointerDown = e => {
		pointerInfo.current.startX = e.clientX;
		pointerInfo.current.startY = e.clientY;
		setPressing(true);
		e.stopPropagation();
	};

	const onPointerMove = e => {
		updateDelta(e);
		const { dx, dy } = pointerInfo.current;

		if (!dragging && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) onDragStart(e);
		if (dragging) onDrag(e);
	};

	const onPointerUp = e => {
		if (dragging) {
			onDragEnd(e);
		} else {
			onAddTileClick(e, props.info);
		}
		setPressing(false);
	};

	const updateDelta = e => {
		const { startX, startY } = pointerInfo.current;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
	};

	React.useEffect(() => {
		if (pressing || dragging) {
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
	}, [pressing, dragging]);

	return (
		<Wrap
			ref={ref}
			onPointerDown={onPointerDown}
			style={{
				x: x,
				y: y,
				z: z,
			}}
			animate={{
				opacity: props.itemDragging && !dragging ? 0 : dragging || pressing ? 0.75 : 1,
				scale: pressing ? 0.975 : 1,
			}}
		>
			{props.children}
		</Wrap>
	);
};

const Wrap = styled(motion.div)``;

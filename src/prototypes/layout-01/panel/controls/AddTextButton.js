import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue, animate, useTransform, useMotionTemplate } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { TEXT, ARROW_LINE } from "../../tiles/drawing/LayerData";
import { ShapePath } from "../../tiles/drawing/layers/ShapePath";
import { PLACEHOLDER_STRING } from "../../tiles/drawing/constants";
import { arcPath } from "../../tiles/drawing/utilities";
import { Icon } from "../../../../ds/Icon";

const Wrap = styled(motion.div)`
	position: relative;
`;

const Template = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Draggable = styled(Template)``;

const Button = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 6px;
`;

export const AddTextButton = props => {
	// The states of a draggable, clickable, view-transitioning button:
	// -HOVERING -PRESSING -DRAGGING -ANIMATING -VALID_DROP
	const [hovering, setHovering] = useState(false);
	const [pressing, setPressing] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [animating, setAnimating] = useState(false); // used after drop
	const [validDrop, setValidDrop] = useState(false);

	// Infomation needed for dragging
	const pointerInfo = useRef({});
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);
	const ref = useRef();

	// Animate draggable back to starting position
	const returnToStartAnimation = useAnimation();

	// Move draggable center to mouse position when dragging
	const centerOffsets = useRef({ x: 0, y: 0 });

	// Animate the "fake" draggable
	const templateAnimation = useAnimation();

	const onPointerDown = e => {
		setPressing(true);
		setHovering(false);

		const draggableRect = ref.current.getBoundingClientRect();
		pointerInfo.current = { x: e.clientX, y: e.clientY, startX: draggableRect.x, startY: draggableRect.y };

		const rect = e.target.getBoundingClientRect();
		const left = e.clientX - rect.x;
		const top = e.clientY - rect.y;
		const xFromCenter = left - width / 2;
		const yFromCenter = top - height / 2;
		centerOffsets.current = { x: xFromCenter, y: yFromCenter };

		props.onPointerDown();
		e.stopPropagation();
	};

	const onPointerMove = e => {
		if (e.touches && e.touches.length > 0) {
			e.preventDefault();
			e = e.changedTouches[0];
		}
		const dx = e.clientX - pointerInfo.current.x;
		const dy = e.clientY - pointerInfo.current.y;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
		if (dragging) {
			dragX.set(dx);
			dragY.set(dy);
		} else {
			const threshold = 3;
			if (Math.abs(pointerInfo.current.dx) > threshold || Math.abs(pointerInfo.current.dy) > threshold) {
				setDragging(true);
				props.onDragStart();
			}
		}
	};

	const onPointerUp = e => {
		if (!dragging) {
			// Do click
			props.onClick(props.type);
		} else {
			// Do drop
			const dropInfo = props.onDrop(info.type, e.clientX, e.clientY);
			if (!dropInfo.isValid) {
				returnToStartAnimation.start({
					x: 0,
					y: 0,
					scale: 1,
					opacity: 1,
					transition: {
						...transitions.layoutTransition,
						onComplete: () => {
							setAnimating(false);
						},
					},
				});
			}
		}
		// Reset state
		setDragging(false);
		setPressing(false);
	};

	React.useEffect(() => {
		const setMouseUpFromEvent = e => onPointerUp(e);
		const setMouseMoveFromEvent = e => onPointerMove(e);
		if (pressing) {
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [pressing, dragging, validDrop]);

	// Colors and styles
	const info = {};
	info.backgroundColor = props.theme.colors.t2;
	info.backgroundColorHover = props.theme.colors.t3;
	switch (props.type) {
		case "HEADING":
			info.label = "Heading";
			info.fontSize = 21;
			info.fontWeight = 500;
			info.color = props.theme.colors.t9;
			break;
		case "BODY":
			info.label = "Body";
			info.fontSize = 17;
			info.fontWeight = 400;
			info.color = props.theme.colors.t7;
			break;
		case "LIST":
			info.label = "• List";
			info.fontSize = 17;
			info.fontWeight = 400;
			info.color = props.theme.colors.t7;
			break;
		case "CAPTION":
			info.label = "Caption";
			info.fontSize = 13;
			info.fontWeight = 400;
			info.color = props.theme.colors.t7;
			break;
		default:
	}

	// Button width & height
	const width = 136;
	const height = 68;

	return (
		<Wrap
			style={{
				width: width,
				height: height,
			}}
		>
			<Template
				style={{
					width: width,
					height: height,
					opacity: 0,
				}}
				animate={templateAnimation}
			>
				<ButtonObject info={info} />
			</Template>

			<Draggable
				ref={ref}
				transition={transitions.basicTransition}
				style={{
					zIndex: dragging || animating ? 10 : 1,
					cursor: dragging ? "grabbing" : "grab",
					width: width,
					height: height,
					x: dragX,
					y: dragY,
				}}
				animate={returnToStartAnimation}
				onHoverStart={() => setHovering(true)}
				onHoverEnd={() => setHovering(false)}
				onPointerDownCapture={onPointerDown}
			>
				<ButtonObject info={info} hovering={hovering} />
			</Draggable>
		</Wrap>
	);
};

const ButtonObject = props => {
	return (
		<Button
			style={{
				fontSize: props.info.fontSize,
				fontWeight: props.info.fontWeight,
				color: props.info.color,
				lineHeight: 1,
				pointerEvents: "none",
				padding: 12,
			}}
			animate={{
				scale: props.hovering ? 1.02 : 1,
				backgroundColor: props.hovering ? props.info.backgroundColorHover : props.info.backgroundColor,
			}}
			initial={false}
		>
			{props.info.label}
		</Button>
	);
};

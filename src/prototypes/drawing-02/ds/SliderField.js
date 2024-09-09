import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

import { fieldTypeStyles } from "./Buttons";
import { Icon } from "../../../ds/Icon";
import { insertCaretAtPoint } from "../tiles/drawing/utilities";

const Control = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Field = styled(motion.div)`
	position: relative;
	caret-color: ${props => props.$caretcolor};
	&::selection {
		background: ${props => props.$selectionBackgroundColor};
		color: ${props => props.$selectionForegroundColor};
	}
	font-variant-numeric: tabular-nums;
`;

export const SliderField = ({
	theme,
	borderRadius = 4,
	paddingTop = 4,
	paddingBottom = 4,
	paddingLeft = 4,
	paddingRight = 4,
	value = undefined, // motion value!
	valueRange = [0, 1],
	valueIncrement = 0.01,
	onValueUpdate = undefined,
	displayRange = [0, 100],
	displayUnit = "﹪",
	maxLength = 4,
	minWidth = 44,
	backgroundColorDefault = theme.colors.t2,
	backgroundColorActive = theme.colors.t3,
	textColorDefault = theme.colors.controls.field.value,
	textColorActive = theme.colors.controls.field.valueFocussed,
	style,
	draggable = false,
}) => {
	const displayValue = useTransform(() => Math.round(value.get() * (displayRange[1] / valueRange[1])) + displayUnit);

	// Caret and selection colors
	const caretColor = theme.colors.text.caret;
	const selectionBackgroundColor = theme.colors.text.selection;
	const selectionForegroundColor = theme.colors.text.selectionColor;

	const [hovering, setHovering] = React.useState(false);
	const [focused, setFocused] = React.useState(false);
	const [pointerDown, setPointerDown] = React.useState(false);
	const pointerDownInfo = React.useRef({});
	const fieldRef = React.useRef(null);
	const [contentEditable, setContentEditable] = React.useState(!draggable);
	const clickDelta = 5;

	const submitValue = v => {
		console.log("submitValue", v);
		v = parseFloat(v);
		if (isNaN(v)) {
			const oldV = value.get();
			value.set(v);
			setTimeout(() => {
				value.set(oldV);
			}, 10);
		} else {
			const min = valueRange[0];
			const max = valueRange[1];
			if (v < min) v = min;
			if (v > max) v = max;
			value.set(v);
			if (onValueUpdate) onValueUpdate(v);
		}
	};

	const onPointerDown = e => {
		setPointerDown(true);
		pointerDownInfo.current = { x: e.clientX, y: e.clientY, val: value.get(), totalMovement: 0 };
		e.stopPropagation();
	};

	const onPointerMove = e => {
		if (e.touches && e.touches.length > 0) {
			e.preventDefault();
			e = e.changedTouches[0];
		}
		// const dx = e.clientX - pointerDownInfo.current.x;
		let dy = Math.round(pointerDownInfo.current.y - e.clientY); // up should be positive
		pointerDownInfo.current.totalMovement += Math.abs(dy);
		dy = dy / (displayRange[1] / valueRange[1]);
		const v = pointerDownInfo.current.val + dy;
		submitValue(v);
	};

	const onPointerUp = e => {
		const deltaX = Math.abs(e.clientX - pointerDownInfo.current.x);
		const deltaY = Math.abs(e.clientY - pointerDownInfo.current.y);
		console.log(pointerDownInfo.current.totalMovement);
		if (deltaX < clickDelta && deltaY < clickDelta && pointerDownInfo.current.totalMovement < clickDelta) {
			setContentEditable(true);
			setTimeout(() => {
				//fieldRef.current.focus();
				insertCaretAtPoint(e);
				//insertCaretAtPoint(e);
			}, 10);
		}

		setPointerDown(false);
	};

	React.useEffect(() => {
		const setMouseUpFromEvent = e => onPointerUp(e);
		const setMouseMoveFromEvent = e => onPointerMove(e);
		if (pointerDown && !contentEditable && draggable) {
			document.body.classList.add("ns-resize");
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			document.body.classList.remove("ns-resize");
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [pointerDown, contentEditable, draggable]);

	return (
		<Control
			style={{
				...fieldTypeStyles,
				minWidth: minWidth,
				borderRadius,
				cursor: "text",
				...style,
			}}
			onHoverStart={() => {
				setHovering(true);
			}}
			onHoverEnd={() => {
				setHovering(false);
			}}
			animate={{
				color: focused || pointerDown ? theme.colors.t9 : hovering ? theme.colors.t7 : theme.colors.t7,
				background: hovering || focused || pointerDown ? backgroundColorActive : backgroundColorDefault,
			}}
			initial={false}
			transition={{ type: "tween", duration: 0.1 }}
			onPointerDown={onPointerDown}
		>
			<Field
				contentEditable={contentEditable}
				suppressContentEditableWarning={true}
				ref={fieldRef}
				style={{
					paddingTop: paddingTop,
					paddingBottom: paddingBottom,
					paddingLeft: paddingLeft,
					paddingRight: paddingRight,

					minWidth: draggable ? 24 : minWidth,
					textAlign: "left",
					cursor: contentEditable ? "text" : "ns-resize",
				}}
				$caretcolor={caretColor}
				$selectionBackgroundColor={selectionBackgroundColor}
				$selectionForegroundColor={selectionForegroundColor}
				onClick={e => {
					document.execCommand("selectAll", false, null);
				}}
				onFocus={e => {
					setFocused(true);
				}}
				onBlur={e => {
					setFocused(false);
					if (draggable) setContentEditable(false);
				}}
				onKeyDown={e => {
					console.log(e.key);

					const key = e.key;
					let blockEvent = false;
					let val = parseInt(e.target.textContent); // parseFloat(e.target.textContent);

					if (isNaN(val)) {
						val = value.get();
					} else {
						val = val / (displayRange[1] / valueRange[1]);
					}

					if (val < valueRange[0]) val = valueRange[0];
					if (val > valueRange[1]) val = valueRange[1];

					switch (key) {
						case "Enter":
							submitValue(val);
							e.target.blur();
							blockEvent = true;
							break;
						case "Tab":
							submitValue(val);
							blockEvent = true;
							e.target.blur();
							break;
						case "Escape":
							submitValue(val);
							e.target.blur();
							blockEvent = true;
							break;
						case "ArrowLeft":
							break;
						case "ArrowRight":
							break;
						case "ArrowUp":
							submitValue(val + valueIncrement);

							blockEvent = true;

							break;
						case "ArrowDown":
							submitValue(val - valueIncrement);

							blockEvent = true;

							break;
						default:
							if (e.target.textContent.length >= maxLength && key !== "Backspace") blockEvent = true;
					}

					if (blockEvent) {
						e.preventDefault();
					}
					e.stopPropagation();
				}}
			>
				{displayValue}
			</Field>
			{/* <svg width="6" height="10" viewBox="0 0 6 10" style={{
                display: "block",
                marginRight: 6,
            }}>
				<path
					d="M1 3L3 1M3 1L5 3M3 1V9M3 9L5 7M3 9L1 7"
					stroke={theme.colors.t5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg> */}
		</Control>
	);
};

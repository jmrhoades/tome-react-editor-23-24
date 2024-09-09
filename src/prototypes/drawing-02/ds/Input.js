import React from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import styled from "styled-components";

import { fieldTypeStyles } from "./Buttons";

const Control = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: auto;
	user-select: auto;
	cursor: text;
`;

const Field = styled(motion.div)`
	position: relative;
	//appearance: none;
	//margin: 0;
	::selection {
		background: ${props => props.t_selectioncolor};
	}
`;

const Unit = styled(motion.div)`
	position: relative;
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const FocusBorder = styled(SelectedBackground)``;
const HoverBorder = styled(SelectedBackground)``;

export const InputEl = styled.input`
	position: relative;
    display: block;
    background: gray;
`;

export const InputB = props => {
	//const { setLayoutTweaking } = React.useContext(TomeContext);

	const theme = props.theme;
	const height = 28;
	const borderRadius = 6;

	const [isHovering, setIsHovering] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const fieldRef = React.useRef(null);

	const background = theme.colors.controls.field.background;

	const focusBorder = theme.colors.controls.field.focusBorder;
	const hoverBorder = theme.colors.controls.field.hoverBorder;

    const labelMotionValue = useMotionValue("");

    useMotionValueEvent(labelMotionValue, "change", latest => {
		if (fieldRef.current) fieldRef.current.textContent = latest;
	});



	return (
		<InputEl></InputEl>
	);
};

export const Input = props => {
	//const { setLayoutTweaking } = React.useContext(TomeContext);

	const theme = props.theme;
	const height = 28;
	const borderRadius = 6;

	const [isHovering, setIsHovering] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const fieldRef = React.useRef(null);

	const background = theme.colors.controls.field.background;

	const focusBorder = theme.colors.controls.field.focusBorder;
	const hoverBorder = theme.colors.controls.field.hoverBorder;

    const labelMotionValue = useMotionValue("");

    useMotionValueEvent(labelMotionValue, "change", latest => {
		if (fieldRef.current) fieldRef.current.textContent = latest;
	});



	return (
		<Control
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			style={{
				paddingLeft: 0,
				paddingRight: 0,
				height,
				borderRadius,
				background: background,
				minWidth: 40,
			}}
			onPointerDown={() => {
				if (!isFocused && fieldRef.current) {
					setIsFocused(true);
					fieldRef.current.focus();
				}
			}}
			onPointerUp={() => {
				if (isFocused && fieldRef.current) {
					document.execCommand("selectAll", false, null);
				}
			}}
		>
			<Field
				t_selectioncolor={theme.colors.text.selection}
				contentEditable={true}
				suppressContentEditableWarning={true}
				ref={fieldRef}
				style={{
					...fieldTypeStyles,
					fontSize: "13px",
					lineHeight: "17px",
					//paddingLeft: 6,
					//paddingRight: 6,
					caretColor: theme.colors.accent,
					//width: 40,
					width: "auto",
					textAlign: "center",
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
				}}
				animate={{
					color: isFocused ? theme.colors.controls.field.valueFocussed : theme.colors.controls.field.value,
				}}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
				//onFocus={e => {
				//setIsFocused(true);
				//e.target.select();
				//}}
				onBlur={e => {
					setIsFocused(false);
					//setLayoutTweaking(false);
					//let val = parseInt(e.target.textContent);
					let val = props.value;
					e.target.textContent = val;
					window.getSelection().removeAllRanges();
				}}
				//value={props.value}
				type="text"
				maxLength={3}
				onChange={e => {
					//console.log("onChange");
				}}
				onKeyDown={e => {
					if (e.keyCode === 13) {
						e.preventDefault();
						e.stopPropagation();

						let val = parseInt(e.target.textContent);

						if (isNaN(val)) {
							val = props.value;
						}
						if (props.range && val < props.range[0]) val = props.range[0];
						if (props.range && val > props.range[1]) val = props.range[1];

						//console.log("update!", val);
						e.target.textContent = val;
						if (props.onValueUpdate) props.onValueUpdate(val);
					} else if (e.key !== "Backspace") {
						if (e.target.textContent.length > 3) {
							e.preventDefault();
							e.stopPropagation();
						}
					}
				}}
			>
				{props.value}
			</Field>

			{props.unitLabel && (
				<Unit
					style={{
						...fieldTypeStyles,
						fontSize: "13px",
						lineHeight: "17px",
					}}
					animate={{
						color: isFocused ? theme.colors.controls.field.valueFocussed : theme.colors.controls.field.value,
					}}
					initial={false}
					transition={{ type: "tween", duration: 0.2 }}
				>
					{props.unitLabel}
				</Unit>
			)}

			<HoverBorder
				style={{
					border: `1px solid ${hoverBorder}`,
					borderRadius,
					pointerEvents: "none",
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
			/>
			<FocusBorder
				style={{
					border: `1px solid ${focusBorder}`,
					borderRadius,
					pointerEvents: "none",
				}}
				animate={{
					opacity: isFocused ? 1 : 0,
				}}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
			/>
		</Control>
	);
};

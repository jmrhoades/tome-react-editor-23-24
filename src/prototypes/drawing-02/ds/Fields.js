import React, { useEffect } from "react";
import { motion } from "framer-motion";
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

export const TitleField = ({
	theme,
	height = 32,
	borderRadius = 6,
	paddingX = 8,

	active = false,
	label = "Label",
	hasBackground = false,
	color = theme.colors.t8,
	activeColor = theme.colors.labelActive,
}) => {
	const [isHovering, setIsHovering] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	const background = hasBackground ? theme.colors.t2 : theme.colors.t0;
	const backgroundHover = theme.colors.t3;

	return (
		<Control
			//initial={"default"}
			//whileHover={"hovering"}
			//whileTap={"pressing"}
			
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			style={{
				paddingLeft: paddingX,
				paddingRight: paddingX,
				height,
				borderRadius,
				background: theme.colors.controls.canvasMaterial,
				WebkitBackdropFilter: "blur(50px)",
				backdropFilter: "blur(50px)",
			}}
		>
			<SelectedBackground
				animate={{
					background: isHovering || isFocused ? backgroundHover : background,
				}}
				transition={{ type: "tween", duration: 0.3 }}
			/>

			<Field
				t_selectioncolor={theme.colors.text.selection}
				contentEditable={true}
				suppressContentEditableWarning={true}
				style={{
					...fieldTypeStyles,
					color: color,
					fontSize: "15px",
					caretColor: theme.colors.accent,
				}}
				onFocus={e => {
					setIsFocused(true);
				}}
				onBlur={e => {
					setIsFocused(false);
				}}
				//defaultValue={label}
			>
				{label}
			</Field>
		</Control>
	);
};


export const PromptField = props => {
	//const { setLayoutTweaking } = React.useContext(TomeContext);

	const theme = props.theme;
	const height = 32;
	const borderRadius = 8;

	const [isHovering, setIsHovering] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const fieldRef = React.useRef(null);

	const background = theme.colors.controls.field.background;

	const focusBorder = theme.colors.controls.field.focusBorder;
	const hoverBorder = theme.colors.controls.field.hoverBorder;

	//console.log(props.value);

	return (
		<Control
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			style={{
				paddingLeft: 8,
				paddingRight: 8,
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
					caretColor: theme.colors.accent,
					width: "100%",
					textAlign: "left",
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					color: theme.colors.controls.field.valueFocussed,
				}}
				// animate={{
				// 	color: isFocused ? theme.colors.controls.field.valueFocussed : theme.colors.controls.field.value,
				// }}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
				onBlur={e => {
					setIsFocused(false);
					let val = props.value;
					e.target.textContent = val;
					window.getSelection().removeAllRanges();
				}}
				type="text"
				onChange={e => {
					//console.log("onChange");
				}}
				onKeyDown={e => {
					if (e.keyCode === 13) {
						e.preventDefault();
						e.stopPropagation();
					}
				}}
			>
				{props.value}
			</Field>

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

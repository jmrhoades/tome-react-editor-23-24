import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { buttonLabelStyles } from "../../../ds/Buttons";

const Input = styled(motion.input)`
	display: block;
	position: relative;
	caret-color: ${props => props.$caretcolor};
	&::selection {
		background: ${props => props.$selectionBackgroundColor};
		color: ${props => props.$selectionForegroundColor};
	}
`;

export const PropertiesMenuInput = ({
	theme,
	type = "number",
	min = 0,
	max = 100,
	value,
	setValue,
	closeMenu = () => {},
	width = "100%",
	textAlign = "left",
}) => {
	
	const [val, setVal] = React.useState(value);

	// Caret and selection colors
	const valueColor = useMotionValue(theme.colors.t9);
	const caretColor = theme.colors.text.caret;
	const selectionBackgroundColor = theme.colors.text.selection;
	const selectionForegroundColor = theme.colors.text.selectionColor;

	const submitValue = (e, newValue) => {
		if (isNaN(newValue)) {
			e.target.value = value;
		} else {
			if (newValue < min) newValue = min;
			if (newValue > max) newValue = max;
			setValue(newValue);
		}
		closeMenu();
	};

	return (
		<Input
			style={{
				flexShrink: 0,
				...buttonLabelStyles,
				pointerEvents: "auto",
				color: valueColor,

				paddingTop: 4,
				paddingBottom: 4,
				paddingLeft: 4,
				paddingRight: 4,
				background: theme.colors.t2,
				borderRadius: 4,
				width: width,
				textAlign: textAlign,
			}}
			$caretcolor={caretColor}
			$selectionBackgroundColor={selectionBackgroundColor}
			$selectionForegroundColor={selectionForegroundColor}
			//type={type}
			//min={min}
			//max={max}
			onFocus={e => {
				valueColor.set(theme.colors.t9);
			}}
			onBlur={e => {
				valueColor.set(theme.colors.t9);
			}}
			onChange={e => {
				//e.stopPropagation();
				console.log(e.target.value);
				setVal(e.target.value);
			}}
			value={val}
			onKeyDown={e => {
				console.log(e.key);
				let blockEvent = false;
				const key = e.key;
				let newValue = parseFloat(e.target.value);
				switch (key) {
					case "Enter":
						submitValue(e, newValue);
						blockEvent = true;
						break;
					case "Tab":
						submitValue(e, newValue);
						blockEvent = true;
						break;
					case "ArrowLeft":
						break;
					case "ArrowRight":
						break;
					case "ArrowUp":
						if (isNaN(newValue)) {
						} else {
							if (newValue + 1 <= max) {
								setValue(newValue + 1);
								setVal(newValue + 1);
							}
							blockEvent = true;
						}
						break;
					case "ArrowDown":
						if (isNaN(newValue)) {
						} else {
							if (newValue - 1 >= min) {
								setValue(newValue - 1);
								setVal(newValue - 1);
							}
							blockEvent = true;
						}
						break;
					default:
				}
				if (blockEvent) {
					e.preventDefault();
				}
				e.stopPropagation();
			}}
		/>
	);
};

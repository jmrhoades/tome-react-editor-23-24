import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import chroma from "chroma-js";

export const fieldTypes = {
	NUMBER: "number",
	COLOR: "color",
}

export const Field = props => {
	const {
		type = fieldTypes.NUMBER,
		value = undefined,
		minValue = 0,
		maxLength = 4,
		submit = v => {},
		rounded = true,
		unit = undefined,
		increment = 1,
		placeholder = undefined,
		showPlaceholder = undefined,
		label = undefined,
		icon = undefined,
		setInputFocused,
		style,
	} = props;
	const [active, setActive] = React.useState(false);

	let roundedValue = rounded ? parseInt(value) : parseFloat(value);
	//if (unit) roundedValue += unit;
	const ref = React.useRef();
	const shiftPressed = React.useRef();

	let displayValue = type === fieldTypes.COLOR ? value.split("#")[1] : value;
	const [inputValue, setInputValue] = React.useState(showPlaceholder && placeholder ? "" : displayValue);

	React.useEffect(() => {
		setInputValue(showPlaceholder && placeholder ? "" : displayValue);
	}, [value, showPlaceholder]);

	return (
		<InputWrap>
			{label && <InputLabel>{label}</InputLabel>}
			{icon && (
				<InputIcon>
					<Icon name={icon} size={16} />
				</InputIcon>
			)}
			<Input
				ref={ref}
				onPointerDownCapture={e => e.stopPropagation()}
				maxLength={maxLength}
				placeholder={placeholder}
				type={"text"}
				style={{
					"--background-color": "var(--t2)",
					"--background-color-hover": "var(--t3)",
					"--color": props.hud || props.bright ? "var(--t9)" : props.dimmed ? "var(--t6)" : "var(--t7)",
					"--color-hover": props.hud || props.bright ? "var(--t9)" : "var(--t7)",
					"--color-focus": "var(--t9)",
					"--background-color-focus": "var(--t3)",
					paddingLeft: label || icon ? "32px" : "8px",
					textTransform: type === fieldTypes.COLOR ? "uppercase" : "unset",
					...style,
				}}
				onKeyDown={e => {
					//e.stopPropagation();
					//console.log(e.key);

					let v = e.target.value;
					let numV = rounded ? parseInt(v) : parseFloat(v);

					if (e.key === "Shift") {
						shiftPressed.current = true;
						e.preventDefault();
					}

					let multiplier = shiftPressed.current === true ? 10 : 1;

					if (e.key === "Enter" || e.key === "Tab") {

						if (type === fieldTypes.COLOR) {
							v = chroma(v).hex();
						}

						submit(v);
						e.target.blur();
						e.stopPropagation();
					}

					if (e.key === "Tab") {
						submit(v);
					}

					if (e.key === "ArrowUp") {
						if (showPlaceholder && placeholder) numV = parseInt(value);

						v = numV + increment * multiplier;

						submit(v);
						e.preventDefault();
						focusAtEnd(e.target);
					}

					if (e.key === "ArrowDown") {
						if (showPlaceholder && placeholder) numV = parseInt(value);

						v = numV - increment * multiplier;

						if (minValue && v < minValue) v = minValue;
						submit(v);
						e.preventDefault();
						focusAtEnd(e.target);
					}

					if (e.key === "Escape") {
						e.target.blur();
					}
				}}
				onKeyUp={e => {
					if (e.key === "Shift") {
						shiftPressed.current = false;
					}
				}}
				value={inputValue}
				onChange={e => {

					if (type === fieldTypes.NUMBER) {
						let v = e.target.value;
						let numV = 0;
						if (!isNaN(v) && v !== "") {
							numV = rounded ? parseInt(v) : parseFloat(v);
						}
						setInputValue(numV);
						//submit(numV);
						console.log(numV);
					}

					if (type === fieldTypes.COLOR) {
						setInputValue(e.target.value);
					}

					
				}}
				onFocus={e => {
					e.target.select();
					setInputFocused(true);
				}}
				onBlur={e => {
					setInputFocused(false);
				}}
			/>
			{props.children}
		</InputWrap>
	);
};

const InputLabel = styled.span`
	position: absolute;
	top: 50%;
	left: 8px;
	transform: translateY(-50%);
`;

const InputIcon = styled.span`
	position: absolute;
	top: 50%;
	left: 8px;
	transform: translateY(-50%);
`;

const InputWrap = styled.div`
	position: relative;
`;

const Input = styled.input`
	font-family: var(--ui-font-family);
	font-size: var(--ui-font-size);
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		color: var(--color-hover);
		background-color: var(--background-color-hover);
		transition: none;
	}

	&:focus {
		color: var(--color-focus);
		background-color: var(--background-color-focus);
	}

	&::selection {
		color: var(--text-selection-color);
		background-color: var(--text-selection-background-color);
	}

	&::placeholder {
		color: var(--t6);
	}
`;

export const focusAtEnd = el => {
	setTimeout(() => (el.selectionStart = el.selectionEnd = el.value.length), 0);
};

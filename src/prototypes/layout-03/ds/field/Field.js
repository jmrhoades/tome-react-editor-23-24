import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export const Field = props => {
	const { value = 10, maxLength = 4, submit = v => {} } = props;
	const [active, setActive] = React.useState(false);

	const roundedValue = parseInt(value);
	const ref = React.useRef();
	

	return (
		<Input
			ref={ref}
			key={value} // re-renders when value changes
			onPointerDownCapture={e => e.stopPropagation()}
			maxLength={maxLength}
			autoFocus
			type={"text"}
			style={{
				"--background-color": "var(--t2)",
				"--background-color-hover": "var(--t3)",
				"--color": props.hud ? "var(--t9)" : "var(--t7)",
				"--color-hover": props.hud ? "var(--t9)" : "var(--t7)",
				"--color-focus": "var(--t9)",
				"--background-color-focus": "var(--t3)",
				width: props.width ? props.width + "px" : undefined,
				paddingTop: props.hud ? "2px" : undefined,
				paddingBottom: props.hud ? "2px" : undefined,
				paddingLeft: props.hud ? "4px" : undefined,
				paddingRight: props.hud ? "4px" : undefined,
				borderRadius: props.hud ? "4px" : undefined,
			}}
			defaultValue={roundedValue}
			onKeyDown={e => {
				e.stopPropagation();
				console.log(e.key);
				let v = e.target.value;
				let numV = parseInt(v);
				if (e.key === "Enter" || e.key === "Tab") {
					submit(v);
					e.target.blur();
				}
				if (e.key === "Tab") {
					submit(v);
				}
				if (e.key === "ArrowUp") {
					v = numV + 1;
					submit(v);
				}
				if (e.key === "ArrowDown") {
					v = numV - 1;
					if (v < 1) v = 0;
					submit(v);
				}
				if (e.key === "Escape") {
					e.target.blur();
				}
			}}
			onChange={e => {
				// console.log(e.target.value);
			}}
		/>
	);
};

const Input = styled.input`
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
`;

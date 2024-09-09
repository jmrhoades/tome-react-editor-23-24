import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { ColorButton } from "../button/ColorButton";

export const ColorField = props => {
	const { value = "000000", maxLength = 6, submit = v => {} } = props;
	const ref = React.useRef();

	return (
		<Wrap
			style={{
				"--background-color": "var(--t2)",
				"--background-color-hover": "var(--t2)",
                "--background-color-focus": "var(--t2)",
				"--color": "var(--t7)",
				"--color-focus": "var(--t9)",
			}}
		>
			<ColorButton color={value} />
			<Field
				ref={ref}
				key={value} // re-renders when value changes
				onPointerDownCapture={e => e.stopPropagation()}
				maxLength={maxLength}
				autoFocus
				type={"text"}
				defaultValue={value}
				onKeyDown={e => {
					e.stopPropagation();
				}}
				onChange={e => {
					// console.log(e.target.value);
				}}
                style={{
                    borderRadius: 0,
                }}
			/>
		</Wrap>
	);
};

const Wrap = styled.div`
	display: flex;
    border-radius: var(--button-border-radius);
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		color: var(--color-hover);
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

const Field = styled.input`
    padding-left: 0 !important;
	&:focus {
		color: var(--color-focus);
		/* background-color: var(--background-color-focus); */
	}

	&::selection {
		color: var(--text-selection-color);
		background-color: var(--text-selection-background-color);
	}
`;

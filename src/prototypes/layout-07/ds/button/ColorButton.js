import React from "react";
import styled from "styled-components";
import { CurrentColor } from "../CurrentColor";

export const ColorButton = props => {
	const { value, padding = undefined, onTap = undefined, active = undefined, style, size, } = props;
	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--background-color": active ? "var(--t3)" : "var(--t0)",
				"--background-color-hover": active ? "var(--t3)" : "var(--t0)",
				"--button-padding": padding,
				...style,
			}}
		>
			<CurrentColor value={value} size={size} />
		</ButtonWrap>
	);
};

const ButtonWrap = styled.button`
	/* border-radius: 0; */
	padding: var(--button-padding);
	/* width: 28px; */
	flex-shrink: 0;
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

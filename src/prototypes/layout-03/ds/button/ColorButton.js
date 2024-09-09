import React from "react";
import styled from "styled-components";
import { Swatch } from "../Swatch";

export const ColorButton = props => {
	const { color = undefined, padding = undefined, onTap = undefined, active = undefined, } = props;
	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--background-color": active ? "var(--t3)" : "var(--t0)",
				"--background-color-hover": active ? "var(--t3)" : "var(--t0)",
				"--button-padding": padding,
			}}
		>
			<Swatch color={color} />
		</ButtonWrap>
	);
};

const ButtonWrap = styled.button`
	/* border-radius: 0; */
	padding: var(--button-padding);
	width: 28px;
	flex-shrink: 0;
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

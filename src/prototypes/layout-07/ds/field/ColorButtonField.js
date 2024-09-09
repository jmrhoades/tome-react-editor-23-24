import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { ColorButton } from "../button/ColorButton";
import { Field, fieldTypes } from "./Field";

export const ColorButtonField = props => {

	const {
		value,
		onTap,
		submit = v => {},
		setInputFocused,
	} = props;

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
			<ColorButton value={value} style={{ width: "32px" }} onTap={onTap} />

			<Field
				type={fieldTypes.COLOR}
				maxLength={9}
				value={value}
				submit={submit}
				setInputFocused={setInputFocused}
				style={{
					backgroundColor: "transparent",
					paddingLeft: 0,
					paddingRight: 0,
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
	overflow: hidden;
	&:hover {
		color: var(--color-hover);
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

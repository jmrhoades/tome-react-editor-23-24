import React from "react";
import styled from "styled-components";

import { getContrastAwareStroke } from "../../../logic/colors";

export const ThemePreview = props => {
	const { theme, small, surfaceColor } = props;
	
    // const bgColor = theme.mode === "light" ? "#f0f0f0" : "#262626";

	const fgColor = theme.tokens["--page-color"];
	
	
    //const strokeColor = getContrastAwareStroke(surfaceColor, fgColor);

    const strokeColor = getContrastAwareStroke(surfaceColor, fgColor);

    console.log("strokeColor", strokeColor);
	
    return (
		<ThemePreviewButton
			className={small ? "small" : ""}
			style={{
				"--page-color": theme.tokens["--page-color"],
				"--heading-color": theme.tokens["--heading-color"],
				"--body-color": theme.tokens["--body-color"],
				"--heading-font": theme.tokens["--heading-font"],
				"--heading-weight": theme.tokens["--heading-weight"],
				"--body-font": theme.tokens["--body-font"],
				"--body-weight": theme.tokens["--body-weight"],
				boxShadow: `0 0 0 1px ${strokeColor}`,
			}}
		>
			<Heading>Title</Heading>
			<Body>Body</Body>
		</ThemePreviewButton>
	);
};

const ThemePreviewButton = styled.div`
	width: 48px;
	/* aspect-ratio: 16/9; */

	height: 28px;
	border-radius: 6px;
	padding: 6px;

	background-color: var(--page-color);
	box-shadow: 0 0 0 1px inset var(--mode-stroke);

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	&.small {
		width: 32px;
		height: 20px;
		padding: 4px;
		border-radius: 3px;

		h3 {
			font-size: 7px;
		}

		p {
			font-size: 6px;
			line-height: 1;
		}
	}
`;

const Heading = styled.h3`
	font-size: 9px;
	line-height: 1;
	color: var(--heading-color);
	font-family: var(--heading-font);
	font-weight: var(--heading-weight);
`;
const Body = styled.p`
	font-size: 7px;
	line-height: 10px;
	color: var(--body-color);
	font-family: var(--body-font);
	font-weight: var(--body-weight);
`;

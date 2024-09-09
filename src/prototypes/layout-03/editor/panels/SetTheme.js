import React from "react";

import { Section } from "../../ds/panel/Section";
import { TomeContext } from "../../tome/TomeContext";
import { Themes } from "../../ds/Themes";
import styled from "styled-components";

export const SetTheme = props => {
	const { setPageTheme, getCurrentPage } = React.useContext(TomeContext);
	const currentPage = getCurrentPage();

	return (
		<>
			<Section type={"Grid_2x2"}>
				{Object.entries(Themes).map(([key, value]) => (
					<ThemePreview
						key={key}
						theme={value}
						currentPage={currentPage}
						selected={currentPage.theme.id === value.id}
						onTap={() => {
							setPageTheme(currentPage, value);
						}}
					/>
				))}
			</Section>
		</>
	);
};

const ThemePreview = props => {
	const { theme, onTap, selected, currentPage } = props;

	return (
		<ThemePreviewButton
			onMouseDown={onTap}
			style={{
				"--page-background-color": theme.tokens["--page-background-color"],
				"--heading-color": theme.tokens["--heading-color"],
				"--body-color": theme.tokens["--body-color"],
				"--heading-font": theme.tokens["--heading-font"],
				"--heading-weight": theme.tokens["--heading-weight"],
				"--body-font": theme.tokens["--body-font"],
				"--body-weight": theme.tokens["--body-weight"],
				"--selected-opacity": selected ? 1 : 0,
				"--mode-stroke": theme.tokens["--" + currentPage.theme.mode + "-mode-stroke"],
			}}
		>
			<Heading>Aa</Heading>
			<Body>{theme.name}</Body>
			<Selected />
		</ThemePreviewButton>
	);
};

const ThemePreviewButton = styled.button`
	position: relative;
	background-color: var(--page-background-color);
	/* height: 56px; */
	/* aspect-ratio: 16/9; */
	box-shadow: 0 0 0 1px inset var(--mode-stroke);

	padding: 8px;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

const Heading = styled.h3`
	font-size: 15px;
	line-height: 16px;
	color: var(--heading-color);
	font-family: var(--heading-font);
	font-weight: var(--heading-weight);
`;
const Body = styled.p`
	font-size: 13px;
	line-height: 16px;
	color: var(--body-color);
	font-family: var(--body-font);
	font-weight: var(--body-weight);
`;

const Selected = props => {
	return (
		<SelectedSVG
			style={{
				opacity: "var(--selected-opacity)",
			}}
		>
			<rect stroke={"var(--accent)"} strokeWidth={1.5} width={"100%"} height={"100%"} rx={6} />
		</SelectedSVG>
	);
};

const SelectedSVG = styled.svg`
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	fill: none;
	overflow: visible;
`;

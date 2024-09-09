import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Text = ({ tile }) => {
	const { text } = tile.content;

	const [borderRadius, setBorderRadius] = React.useState(0);
	const [fontFamily, setFontFamily] = React.useState(undefined);
	const [fontWeight, setFontWeight] = React.useState(undefined);
	const [fontSize, setFontSize] = React.useState(undefined);
	const [lineHeight, setLineHeight] = React.useState(undefined);
	const [textAlign, setTextAlign] = React.useState(undefined);
	const [color, setColor] = React.useState(undefined);

	const updateRect = () => {
		requestAnimationFrame(() => {
			const el = document.getElementById(tile.id);
			const style = getComputedStyle(el);
			setBorderRadius(style.borderRadius);
			setFontFamily(style.fontFamily);
			setFontWeight(style.fontWeight);
			setFontSize(style.fontSize);
			setLineHeight(style.lineHeight);
			setTextAlign(style.textAlign);
			setColor(style.color);
		});
	};

	// Update metrics when data or state changes
	React.useLayoutEffect(updateRect);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<TextBox
			id={tile.id + "_edit"}
			// as={tag}

			style={{
				borderRadius: borderRadius,
				fontFamily: fontFamily,
				fontWeight: fontWeight,
				color: color,
				fontSize: fontSize,
				lineHeight: lineHeight,
				textAlign: textAlign,
			}}
		>
			{text}
		</TextBox>
	);
};

const TextBox = styled(motion.p)`
	position: absolute;
	width: 100%;
	height: 100%;

	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
`;

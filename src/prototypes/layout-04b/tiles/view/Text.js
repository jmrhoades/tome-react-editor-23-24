import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Text = ({ tile }) => {
	const { text, textStyle } = tile.content;

	const tag = textStyle.tag;
	const heading = textStyle.heading;
	const fontSize = tile.content.fontSize ? tile.content.fontSize : textStyle.fontSize;
	const fontWeight = tile.content.fontWeight
		? tile.content.fontWeight
		: heading
		? "var(--heading-weight)"
		: "var(--body-weight)";
	const lineHeight = textStyle.lineHeight;

	let color = heading ? "var(--heading-color)" : "var(--body-color)";

	if (tile.content.color) color = tile.content.color;

	let width = "fit-content";
	if (tile.layout.width) width = tile.layout.width;
	let height = "fit-content";
	if (tile.layout.height) height = tile.layout.height;

	return (
		<TextBox
			id={tile.id}
			// as={tag}
			style={{
				fontFamily: heading ? "var(--heading-font)" : "var(--body-font)",
				fontWeight: fontWeight,
				color: color,
				fontSize: fontSize,
				lineHeight: lineHeight,
				textAlign: tile.content.align,

				width: width,
				height: height,
			}}
		>
			{text}
		</TextBox>
	);
};

const TextBox = styled(motion.p)`
	position: relative;

	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;

	text-wrap: pretty;
`;

const Display1 = {
	id: "Display1",
	name: "Display 1",
	tag: "h1",
	fontSize: "8.76em",
	lineHeight: "1.1",
	heading: true,
};

const Display2 = {
	id: "Display2",
	name: "Display 2",
	tag: "h2",
	fontSize: "4.624em",
	lineHeight: "1.1",
	heading: true,
};

const Title = {
	id: "Title",
	name: "Title",
	tag: "h3",
	fontSize: "2.776em",
	lineHeight: "1.25",
	heading: true,
};

const Heading1 = {
	id: "Heading1",
	name: "Heading 1",
	tag: "h4",
	fontSize: "1.46em",
	lineHeight: "1.25",
	heading: true,
};

const Heading2 = {
	id: "Heading2",
	name: "Heading 2",
	tag: "h5",
	fontSize: "1em",
	lineHeight: "1.45",
	heading: true,
};

const Body1 = {
	id: "Body1",
	name: "Body 1",
	tag: "p",
	fontSize: "1.46em",
	lineHeight: "1.45",
};

const Body2 = {
	id: "Body2",
	name: "Body 2",
	tag: "p",
	fontSize: "1em",
	lineHeight: "1.45",
};

const Caption = {
	id: "Caption",
	name: "Caption",
	tag: "p",
	fontSize: "0.685em",
	lineHeight: "1.25",
};

export const TextStyles = {
	Display1: Display1,
	Display2: Display2,
	Title: Title,
	Heading1: Heading1,
	Heading2: Heading2,
	Body1: Body1,
	Body2: Body2,
	Caption: Caption,
};

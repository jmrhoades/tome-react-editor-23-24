import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { EditorContext, dragZ } from "../editor/EditorContext";
import { TileHoverSelect } from "../editor/TileHoverSelect";
import { transitions } from "../ds/Transitions";

export const Text = ({ tile }) => {
	const { isTileDraggable, tileMotionValues, onLayoutMeasure, tileRefs } = React.useContext(EditorContext);
	const draggable = isTileDraggable(tile);

	const { text, textStyle } = tile.content;

	const tag = textStyle.tag;
	const heading = textStyle.heading;
	const fontSize = tile.content.fontSize ? tile.content.fontSize + "px" : textStyle.fontSize;
	const fontWeight = tile.content.fontWeight
		? tile.content.fontWeight
		: heading
		? "var(--heading-weight)"
		: "var(--body-weight)";
	const lineHeight = textStyle.lineHeight;

	let color = heading ? "var(--heading-color)" : "var(--body-color)";

	if (tile.content.color) color = tile.content.color;

	/*
	const w = useMotionValue(width);
	const h = useMotionValue(height);
	tileMotionValues.current[tile.id] = {
		width: w,
		height: h,
	};
	*/

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	// Store motion value references for dragging operations
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const z = useMotionValue(0);
	tileMotionValues.current[tile.id] = { x: x, y: y, z: z };

	// Initialize the container's css vars
	React.useEffect(() => {
		let width = "fit-content";
		if (tile.layout.width !== "hug") width = `calc(${tile.layout.width}px * var(--content-scale))`;
		let height = "fit-content";
		if (tile.layout.height !== "hug") height = `calc(${tile.layout.height}px * var(--content-scale))`;;

		ref.current.style.setProperty(`--width-${tile.id}`, width);
		ref.current.style.setProperty(`--height-${tile.id}`, height);

	}, [tile]);

	return (
		<TextBox
			id={tile.id}
			ref={ref}
			layout="position"
			layoutId={tile.id}
			transition={transitions.layoutTransition}
			initial={false}
			onLayoutMeasure={e => onLayoutMeasure(tile, e)}
			// as={tag}
			style={{
				x: x,
				y: y,
				z: z,

				fontFamily: heading ? "var(--heading-font)" : "var(--body-font)",
				fontWeight: fontWeight,
				color: color,
				//fontSize: fontSize,
				fontSize: `calc(${fontSize} * var(--content-scale))`,

				lineHeight: lineHeight,
				textAlign: tile.content.align,

				// Container size
				width: `var(--width-${tile.id})`,
				minWidth: "min-content",
				height: `var(--height-${tile.id})`,
				minHeight: "min-content",


				//width: w,
				//height: h,
				//width: width,
				//height: height,

				"--border-radius": 0,
			}}
		>
			<TileHoverSelect tile={tile} draggable={draggable} />
			{text}
		</TextBox>
	);
};

const TextBox = styled(motion.p)`
	position: relative;

	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;

	text-wrap: pretty;
	/* word-break: break-all; */
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

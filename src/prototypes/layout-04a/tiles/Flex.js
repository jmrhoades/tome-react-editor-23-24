import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { EditorContext, Events, dragZ } from "../editor/EditorContext";
import { TileHoverSelect } from "../editor/TileHoverSelect";
import { transitions } from "../ds/Transitions";
import { themeCSS } from "../ds/Themes";

export const Flex = ({ children, tile }) => {
	const {
		dragXScaled,
		dragYScaled,
		isTileDraggable,
		gridDefinitions,
		onLayoutMeasure,
		event,
		tileRefs,
		tileMotionValues,
	} = React.useContext(EditorContext);

	const draggable = isTileDraggable(tile);
	const themeStyles = themeCSS(tile.theme);

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	// Store motion value references for dragging operations
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const z = useMotionValue(0);
	tileMotionValues.current[tile.id] = { x: x, y: y, z: z };

	/*
	if content direction is horizontal:
		- justifyContent controls horizontal spacing
		- alignItems controls vertical spacing
	if content direction is vertical:
		- alignContent controls vertical spacing
		- justifyItems controls horizontal spacing
	*/

	/*
	const scale = useMotionValue(1);
	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			if (draggable) animate(scale, 1.0125, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			if (draggable) animate(scale, 1, transitions.layoutTransition);
		}
	});
	*/

	// Initialize the container's css vars
	React.useEffect(() => {
		const grid = gridDefinitions(tile);
		ref.current.style.setProperty(`--grid-template-rows-${tile.id}`, grid.gridTemplateRows);
		ref.current.style.setProperty(`--grid-template-columns-${tile.id}`, grid.gridTemplateColumns);
		ref.current.style.setProperty(`--width-${tile.id}`, grid.width);
		ref.current.style.setProperty(`--height-${tile.id}`, grid.height);

		//ref.current.style.setProperty(`--x-${tile.id}`, "300px");
		//ref.current.style.setProperty(`--y-${tile.id}`, "-300px");
		//ref.current.style.setProperty(`--z-${tile.id}`, "0px");

		ref.current.style.setProperty(`--justify-self-${tile.id}`, grid.justifySelf);
	}, [tile, gridDefinitions]);

	//const t = `translate3D(var(--x-${tile.id}), var(--y-${tile.id}), var(--z-${tile.id}))`;
	//console.log(t);

	return (
		<FlexBox
			id={tile.id}
			ref={ref}
			layout
			layoutId={tile.id}
			initial={false}
			transition={transitions.layoutTransition}
			onLayoutMeasure={e => onLayoutMeasure(tile, e, ref)}
			// initial={{
			// 	scale: 0,
			// 	opacity: 0,
			// }}
			// animate={{
			// 	scale: 1,
			// 	opacity: 1,
			// }}

			style={{
				x: x,
				y: y,
				z: z,

				//transform: `translate3D(var(--x-${tile.id}), var(--y-${tile.id}), var(--z-${tile.id}))`,
				//transform: `translate3D(100px, 100px, 100px)`,
				//transform: `translateX(var(--x-${tile.id})) translateY(var(--y-${tile.id})) translateZ(var(--z-${tile.id}))`,

				//x: draggable ? dragXScaled : "initial",
				//y: draggable ? dragYScaled : "initial",
				//z: draggable ? dragZ : "initial",

				//scale: scale,

				// Grid, flex or absolute child positioning?
				display: "grid",

				// Container size
				width: `var(--width-${tile.id})`,
				minWidth: "min-content",
				height: `var(--height-${tile.id})`,
				minHeight: "min-content",

				// Grid definition
				gridTemplateColumns: "var(--grid-template-columns-" + tile.id + ")",
				gridTemplateRows: "var(--grid-template-rows-" + tile.id + ")",

				// Content positioning - Horizontal
				justifyContent: tile.layout.justifyContent,
				alignItems: tile.layout.alignItems,

				// Content positioning - Vertical
				justifyItems: tile.layout.justifyItems,
				alignContent: tile.layout.alignContent,

				// Content padding & gap amount
				paddingLeft: tile.layout.padding.x,
				paddingRight: tile.layout.padding.x,
				paddingTop: tile.layout.padding.y,
				paddingBottom: tile.layout.padding.y,
				gap: tile.layout.gap,

				// Content placement & cross-axis hugging
				justifySelf: "var(--justify-self-" + tile.id + ")",

				// Theme styles
				...themeStyles,
			}}
		>
			<TileHoverSelect tile={tile} draggable={draggable} />
			{children}
		</FlexBox>
	);
};

const FlexBox = styled(motion.section)`
	transform-style: preserve-3d;
	position: relative;

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	//transition: all 0.1s ease-out;

	/* overflow-x: clip; */

	//grid-template-columns: var(--grid-template-columns);
	//grid-template-rows: var(--grid-template-rows);
`;

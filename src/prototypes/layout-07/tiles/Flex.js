import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { EditorContext, Events } from "../editor/EditorContext";
import { TileHoverSelect } from "../editor/selection/TileHoverSelect";
import { transitions } from "../ds/Transitions";
import { themeCSS } from "../tome/Themes";
import { getLayoutCSS } from "./layout";
import { TomeContext } from "../tome/TomeContext";
import { backgroundOptions, backgrounds, contentAlign, contentDirection } from "../tome/TileData";

export const Flex = ({ children, tile, parent }) => {
	const { tomeData, getCurrentPage } = React.useContext(TomeContext);

	const {
		isTileDraggable,
		isTileDraggableRecursive,
		isPlayMode,
		onLayoutMeasure,
		event,
		tileRefs,
		tileMotionValues,
	} = React.useContext(EditorContext);

	const draggable = isTileDraggable(tile);
	const ancestorDraggable = isTileDraggableRecursive(tile);
	const [dragging, setDragging] = React.useState(false);
	const [ancestorDragging, setAncestorDragging] = React.useState(false);

	const currentPage = getCurrentPage();
	const rootContainer = currentPage.tiles[0];
	const isRootContainer = tile.id === rootContainer.id;
	const isFullscreen = tomeData.editor.isFullscreen;

	const themeStyles = themeCSS(tile.theme);

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	// Store motion value references for dragging operations
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const z = useMotionValue(0);
	const top = useMotionValue(0);
	const left = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);
	const backgroundColor = useMotionValue(0);
	tileMotionValues.current[tile.id] = {
		x: x,
		y: y,
		z: z,
		top: top,
		left: left,
		width: width,
		height: height,
		backgroundColor: backgroundColor,
	};

	/*
	if content direction is horizontal:
		- justifyContent controls horizontal spacing
		- alignItems controls vertical spacing
	if content direction is vertical:
		- alignContent controls vertical spacing
		- justifyItems controls horizontal spacing
	*/

	const scale = useMotionValue(1);
	const opacity = useMotionValue(1);
	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile && draggable) {
			setDragging(true);
			animate(opacity, 0.75, transitions.fast);
		}
		if (latest === Events.ReleasedTile && draggable) {
			setDragging(false);
			animate(opacity, 1, transitions.fast);
		}
		if (latest === Events.DraggingTile && ancestorDraggable) {
			setAncestorDragging(true);
		}
		if (latest === Events.ReleasedTile && ancestorDraggable) {
			setAncestorDragging(false);
		}
	});

	React.useLayoutEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			top.set(rect.top);
			left.set(rect.left);
			width.set(rect.width);
			height.set(rect.width);
		}
	}, [tomeData, tile]);

	/*
	Wrapping detection
		If the container has a horizontal direction, wrapping is on
		Filling via align-self: stretch conflicts with align-content: start
		This means alignment is dodgy in wrapping containers
		If wrapping is detected, align-content can be safely applied
		Detect wrapping by looking at the offsetTop of the first & last child of the container
		If they're different there's wrapping yo
	*/

	/*
	const checkIfWrappingCSS = () => {
		// reset when checking
		ref.current.style.setProperty("align-content", "unset");
		if (tile.layout.direction === contentDirection.HORIZONTAL) {
			if (tile.tiles.length > 1) {
				const firstChild = tile.tiles[0];
				const firstChildRef = tileRefs.current[firstChild.id];
				const lastChild = tile.tiles[tile.tiles.length - 1];
				const lastChildRef = tileRefs.current[lastChild.id];
				if (firstChildRef.current && lastChildRef.current) {
					const firstOffsetTop = firstChildRef.current.offsetTop;
					const lastOffsetTop = lastChildRef.current.offsetTop;
					if (lastOffsetTop - firstOffsetTop > 0) {
						//console.log("Wrapping horizontal container");
						// if (!isWrapping) setIsWrapping(true);
						let alignContent = "start";
						if (tile.layout.alignY === contentAlign.START) alignContent = "start";
						if (tile.layout.alignY === contentAlign.CENTER) alignContent = "center";
						if (tile.layout.alignY === contentAlign.END) alignContent = "end";
						ref.current.style.setProperty("align-content", alignContent);
					}
				}
			}
		}
	};
	*/

	const layoutCSS = getLayoutCSS({ tile, parent });

	// Initialize the container's css vars
	React.useEffect(() => {
		//ref.current.style.setProperty(`--width-${tile.id}`, grid.width);
		//ref.current.style.setProperty(`--height-${tile.id}`, grid.height);
		//ref.current.style.setProperty(`--justify-self-${tile.id}`, grid.justifySelf);

		// ref.current.style.setProperty(`--flex-basis-${tile.id})`, layoutCSS.flexBasis);
		// ref.current.style.setProperty(`--flex-grow-${tile.id})`, layoutCSS.flexGrow);
		// ref.current.style.setProperty(`--flex-shrink-${tile.id}`, layoutCSS.flexShrink);

		// console.log(layoutCSS.flexBasis, layoutCSS.flexGrow, layoutCSS.flexShrink)

		// Background color
		// A css variable AND a motion value?!
		//if (!isRootContainer) {
			let bgColor = "transparent";
			if (tile.background.type === backgrounds.COLOR) bgColor = tile.background.value;
			ref.current.style.setProperty(`--background-color-${tile.id}`, bgColor);
			backgroundColor.set(bgColor);
		//} else {
			//backgroundColor.set(currentPage.theme.tokens["--page-color"]);
		//}
		
	}, [tomeData, tile]);

	let backgroundImage = undefined;
	let backgroundSize = undefined;
	if (tile.background.type === backgrounds.IMAGE) {
		backgroundImage = `url(${tile.background.value})`;
		backgroundSize = "contain";
	}


	return (
		<FlexBox
			id={tile.id}
			ref={ref}
			layout
			layoutId={tile.id}
			initial={false}
			transition={dragging || ancestorDragging ? transitions.instant : transitions.layoutTransition}
			onLayoutMeasure={e => onLayoutMeasure(tile, e)}
			// Could be used to good effect when adding tiles
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
				scale: scale,
				opacity: opacity,

				...layoutCSS,

				/*
				Container size
				*/
				//flexBasis: `var(--flex-basis-${tile.id})`,
				//flexGrow: `var(--flex-grow-${tile.id})`,
				//flexShrink: `var(--flex-shrink-${tile.id})`,

				/*
				// Container size
				
				minWidth: "min-content",
				height: `var(--height-${tile.id})`,
				minHeight: "min-content",
				*/

				// Content padding & gap amount
				paddingLeft: `calc(calc(${tile.layout.padding.left}px * var(--content-scale)) * var(--page-scale))`,
				paddingRight: `calc(calc(${tile.layout.padding.right}px * var(--content-scale)) * var(--page-scale))`,
				paddingTop: `calc(calc(${tile.layout.padding.top}px * var(--content-scale)) * var(--page-scale))`,
				paddingBottom: `calc(calc(${tile.layout.padding.bottom}px * var(--content-scale)) * var(--page-scale))`,
				gap: `calc(calc(${tile.layout.gap}px * var(--content-scale)) * var(--page-scale))`,
				borderRadius: `calc(calc(${tile.layout.borderRadius}px * var(--content-scale)) * var(--page-scale))`,

				// Theme styles
				...themeStyles,

				// Background color
				backgroundColor: `var(--background-color-${tile.id})`,
				
				//aspectRatio: isRootContainer && isFullscreen ? "16 / 9" : "unset",

				//backgroundColor: `var(--background-color-${tile.id})`,
				//outline: isRootContainer ? "2px solid var(--t3)" : "unset",
				//outlineOffset: "-1px",

				// Background image
				backgroundImage: backgroundImage,
				backgroundSize: backgroundSize,
			}}
		>
			{!isPlayMode() && <TileHoverSelect tile={tile} draggable={draggable} />}
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

	pointer-events: none;

	//transition: all 0.1s ease-out;

	// Cannot do this on the parent el!
	// messes with translate z stuff
	/* overflow-x: clip; */
	/* overflow-y: clip; */

	//grid-template-columns: var(--grid-template-columns);
	//grid-template-rows: var(--grid-template-rows);
`;

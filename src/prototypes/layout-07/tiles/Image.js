import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { EditorContext, Events, dragZ } from "../editor/EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { TileHoverSelect } from "../editor/selection/TileHoverSelect";
import { transitions } from "../ds/Transitions";
import { getLayoutCSS } from "./layout";

import { themeCSS } from "../tome/Themes";
import { backgrounds, containerSize, contentSize } from "../tome/TileData";

export const Image = ({ children, tile, parent }) => {
	const { tomeData } = React.useContext(TomeContext);
	const {
		isTileDraggable,
		isTileDraggableRecursive,
		isMobileView,
		isPlayMode,
		onLayoutMeasure,
		tileMotionValues,
		tileRefs,
		event,
	} = React.useContext(EditorContext);

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

	const draggable = isTileDraggable(tile);
	const [dragging, setDragging] = React.useState(false);
	const [ancestorDragging, setAncestorDragging] = React.useState(false);
	const ancestorDraggable = isTileDraggableRecursive(tile);

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

	const layoutCSS = getLayoutCSS({ tile, parent });

	const contentStyles = {
		position: undefined,
		width: undefined,
		height: undefined,
	};

	const imgStyles = {
		position: undefined,
		height: undefined,
		width: undefined,
		objectFit: undefined,
		maxWidth: "100%",
	};

	//const isMobile = isMobileView();
	//const parentDirection = getTileParentDirection(tile);
	//const themeStyles = themeCSS(tile.theme);

	contentStyles.position = "absolute";
	contentStyles.height = "100%";
	contentStyles.width = "100%";

	imgStyles.position = "absolute";
	imgStyles.width = "100%";
	imgStyles.height = "100%";
	imgStyles.objectFit = tile.content.size === contentSize.FILL ? "cover" : "contain";

	// Initialize CSS vars
	React.useEffect(() => {
		// Background color
		// A css variable AND a motion value?!
		let bgColor = "transparent";
		if (tile.background.type === backgrounds.COLOR) bgColor = tile.background.value;
		ref.current.style.setProperty(`--background-color-${tile.id}`, bgColor);
		backgroundColor.set(bgColor);

		//ref.current.style.setProperty(`--width-${tile.id}`, wrapStyles.width);
		//ref.current.style.setProperty(`--height-${tile.id}`, wrapStyles.height);
	}, [tomeData, tile]);

	React.useLayoutEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			top.set(rect.top);
			left.set(rect.left);
			width.set(rect.width);
			height.set(rect.width);
		}
	}, [tomeData, tile]);

	return (
		<ImageBox
			id={tile.id}
			ref={ref}
			layout
			layoutId={tile.id}
			transition={dragging || ancestorDragging ? transitions.instant : transitions.layoutTransition}
			onLayoutMeasure={e => onLayoutMeasure(tile, e)}
			initial={false}
			style={{
				x: x,
				y: y,
				z: z,
				opacity: opacity,

				//width: width,
				//height: height,

				// Container size
				//width: "var(--width-" + tile.id + ")",
				//height: "var(--height-" + tile.id + ")",

				...layoutCSS,
				//...wrapStyles,

				// Background color
				backgroundColor: `var(--background-color-${tile.id})`,

				borderRadius: `calc(calc(${tile.layout.borderRadius}px * var(--content-scale)) * var(--page-scale))`,
			}}
		>
			{!isPlayMode() && <TileHoverSelect tile={tile} draggable={draggable} />}

			<ContentWrap
				style={{
					...contentStyles,

					// Content padding & gap amount
					paddingLeft: `calc(calc(${tile.layout.padding.left}px * var(--content-scale)) * var(--page-scale))`,
					paddingRight: `calc(calc(${tile.layout.padding.right}px * var(--content-scale)) * var(--page-scale))`,
					paddingTop: `calc(calc(${tile.layout.padding.top}px * var(--content-scale)) * var(--page-scale))`,
					paddingBottom: `calc(calc(${tile.layout.padding.bottom}px * var(--content-scale)) * var(--page-scale))`,
					borderRadius: `calc(calc(${tile.layout.borderRadius}px * var(--content-scale)) * var(--page-scale))`,
				}}
			>
				{tile.content.src && tile.content.src.length > 1 && (
					<Img
						id={tile.id + "_img"}
						src={tile.content.src}
						alt=""
						style={{
							...imgStyles,
						}}
					/>
				)}
			</ContentWrap>
		</ImageBox>
	);
};

const ImageBox = styled(motion.div)`
	position: relative;
	transform-style: preserve-3d;
	pointer-events: none;
`;

const ContentWrap = styled.div`
	overflow: clip;
	pointer-events: none;
`;

const Img = styled.img`
	transform-style: preserve-3d;
	pointer-events: none;
`;

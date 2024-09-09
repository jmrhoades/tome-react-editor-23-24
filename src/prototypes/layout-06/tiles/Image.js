import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { EditorContext, Events, dragZ } from "../editor/EditorContext";
import { TomeContext } from "../tome/TomeContext";
import { TileHoverSelect } from "../editor/TileHoverSelect";
import { transitions } from "../ds/Transitions";
import { themeCSS } from "../ds/Themes";

export const Image = ({ children, tile }) => {
	const { getTileParentDirection } = React.useContext(TomeContext);
	const { dragXScaled, dragYScaled, isTileDraggable, isMobileView, onLayoutMeasure, tileMotionValues, tileRefs, event } =
		React.useContext(EditorContext);

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	// Store motion value references for dragging operations
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const z = useMotionValue(0);
	tileMotionValues.current[tile.id] = { x: x, y: y, z: z };

	const draggable = isTileDraggable(tile);
	

	const opacity = useMotionValue(1);
	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile) {
			if (draggable) {
				//animate(scale, 0.75, transitions.fast);
				animate(opacity, 0.75, transitions.fast);
			}
		}
		if (latest === Events.ReleasedTile) {
			if (draggable) {
				//animate(scale, 1, transitions.layoutTransition);
				animate(opacity, 1, transitions.fast);
			}
		}
	});

	const wrapStyles = {
		width: undefined,
		height: undefined,
	};

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

	const isMobile = isMobileView();
	const parentDirection = getTileParentDirection(tile);

	const themeStyles = themeCSS(tile.theme);

	//const isFit = tile.layout.width === "fit" && tile.layout.height === "fit";
	//const isFill = tile.layout.width === "fill" && tile.layout.height === "fill";

	const isFit = tile.content.size === "fit";
	const isFill = tile.content.size === "fill";

	const fill = isFill || isFit;

	if (fill) {
		//wrapStyles.height = "100%";
		//wrapStyles.width = "100%";
		//wrapStyles.alignSelf = "stretch";
		//wrapStyles.justifySelf = "stretch";

		// fill container by having no block height or width
		contentStyles.position = "absolute";
		contentStyles.width = "100%";
		contentStyles.height = "100%";
		imgStyles.position = "absolute";
		imgStyles.width = "100%";
		imgStyles.height = "100%";
		imgStyles.objectFit = isFit ? "contain" : "cover";
	} else {
		wrapStyles.width = "fit-content";
		wrapStyles.height = "fit-content";
		if (tile.layout.height && tile.layout.aspectRatio) {
			//imgStyles.width = tile.layout.height * tile.layout.aspectRatio + "px";
			imgStyles.width = `calc(calc(${tile.layout.height * tile.layout.aspectRatio}px * var(--content-scale))* var(--page-scale))`;
			//imgStyles.height = tile.layout.height + "px";
			imgStyles.height = `calc(calc(${tile.layout.height}px * var(--content-scale)) * var(--page-scale))`;
		}
		if (tile.layout.width) {
			//imgStyles.width = tile.layout.width + "px";
			imgStyles.width = `calc(calc(${tile.layout.width}px * var(--content-scale)) * var(--page-scale))`;
			imgStyles.maxWidth = "initial";
		}
	}

	// const width = useMotionValue(wrapStyles.width);
	// const height = useMotionValue(wrapStyles.height);
	// tileMotionValues.current[tile.id] = {
	// 	width: width,
	// 	height: height,
	// };

	// Initialize CSS vars
	React.useEffect(() => {
		ref.current.style.setProperty(`--width-${tile.id}`, wrapStyles.width);
		ref.current.style.setProperty(`--height-${tile.id}`, wrapStyles.height);
	}, [tile]);

	return (
		<ImageBox
			id={tile.id}
			ref={ref}
			layout
			layoutId={tile.id}
			transition={transitions.layoutTransition}
			onLayoutMeasure={e => onLayoutMeasure(tile, e)}
			initial={false}
			style={{
				x: x,
				y: y,
				z: z,
				opacity: opacity,
				...wrapStyles,
				//width: width,
				//height: height,
				// Container size
				width: "var(--width-" + tile.id + ")",
				height: "var(--height-" + tile.id + ")",
			}}
		>
			<TileHoverSelect tile={tile} draggable={draggable} />

			<ContentWrap
				style={{
					...contentStyles,
					...themeStyles,

					paddingLeft: tile.layout.padding.x + "px",
					paddingRight: tile.layout.padding.x + "px",
					paddingTop: tile.layout.padding.y + "px",
					paddingBottom: tile.layout.padding.y + "px",

					//borderRadius: tile.theme.tokens["--border-radius"],
					//backgroundColor: tile.theme.tokens["--background-color"],
				}}
			>
				<Img
					id={tile.id + "_img"}
					src={tile.content.src}
					alt=""
					style={{
						...imgStyles,
						//borderRadius: tile.theme.tokens["--border-radius"],
					}}
				/>
			</ContentWrap>
		</ImageBox>
	);
};

const ImageBox = styled(motion.div)`
	position: relative;

	//background-color: var(--background-color);
	//border-radius: var(--border-radius);

	transform-style: preserve-3d;
`;

const ContentWrap = styled.div`
	overflow: clip;
	pointer-events: none;
`;

const Img = styled.img`
	//border-radius: var(--border-radius);
	transform-style: preserve-3d;
	pointer-events: none;
`;

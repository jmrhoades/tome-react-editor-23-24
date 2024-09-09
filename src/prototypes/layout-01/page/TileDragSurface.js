import React from "react";
import styled from "styled-components";
import { motion, useAnimation, animate } from "framer-motion";

import { TILES } from "../tiles/TileConstants";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { LayoutContext } from "../tome/LayoutContext";

import { transitions } from "../ds/Transitions";

const Draggable = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: auto;
`;

const Shadow = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;
const Fill = styled(Shadow)``;
const Highlight = styled(Shadow)``;

const SelectionRing = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
	fill: none;
	pointer-events: none;
`;

export const TileDragSurface = props => {
	const { currentPage, selectTile, layoutTweaking, setLayoutTweaking } = React.useContext(TomeContext);
	const { metrics } = React.useContext(MetricsContext);
    const { cacheDropRects, moveTileToFrame } = React.useContext(LayoutContext);
	const { tileCornerRadius } = metrics;

	const theme = currentPage.theme;

	// The states of a hoverable, draggable, clickable surface:
	// -HOVERING -PRESSING -DRAGGING -ANIMATING
	const [hovering, setHovering] = React.useState(false);
	const [pressing, setPressing] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);
	const [animating, setAnimating] = React.useState(false);

	// Infomation needed for dragging
	const pointerInfo = React.useRef({});
	const dragX = props.dragX;
	const dragY = props.dragY;
	const ref = React.useRef();

	// Animate draggable back to starting position
	const returnAnimation = useAnimation();
	const returnTransition = {
		...transitions.layoutTransition,
		onComplete: () => {
			setAnimating(false);
		},
	};

	// Move draggable center to mouse position when dragging ?
	const centerOffsets = React.useRef({ x: 0, y: 0 });

	const onPointerDown = e => {
		setPressing(true);
        cacheDropRects();
		pointerInfo.current = { startX: e.clientX, startY: e.clientY };

		const rect = e.target.getBoundingClientRect();
		const left = e.clientX - rect.x;
		const top = e.clientY - rect.y;
		const xFromCenter = left - rect.width / 2;
		const yFromCenter = top - rect.height / 2;
		centerOffsets.current = { x: xFromCenter, y: yFromCenter };

		e.stopPropagation();
	};

	const onPointerMove = e => {
		if (e.touches && e.touches.length > 0) {
			e.preventDefault();
			e = e.changedTouches[0];
		}

		const dx = e.clientX - pointerInfo.current.startX;
		const dy = e.clientY - pointerInfo.current.startY;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;

		if (dragging) {
			document.body.classList.add("grabbing");
			setLayoutTweaking(true);
			dragX.set(dx);
			dragY.set(dy);
		} else {
			const threshold = 3;
			if (Math.abs(pointerInfo.current.dx) > threshold || Math.abs(pointerInfo.current.dy) > threshold) {
				setDragging(true);
			}
		}
	};

	const onPointerUp = e => {
		document.body.classList.remove("grabbing");
		setLayoutTweaking(false);
		if (!dragging) {
			selectTile(props.tile);
		} else {
			moveTileToFrame(props.tile);
            
            
            // Return to start
			setAnimating(true);
			animate(props.dragX, 0, returnTransition);
			animate(props.dragY, 0, returnTransition);
            

            //props.dragX.set(0);
            //props.dragY.set(0);
		}

		// Reset state
		setDragging(false);
		setPressing(false);
		setHovering(false);
	};

	React.useEffect(() => {
		const setMouseUpFromEvent = e => onPointerUp(e);
		const setMouseMoveFromEvent = e => onPointerMove(e);
		if (pressing) {
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [pressing, dragging]);

	/*
	Z-INDEX
	*/
	React.useEffect(() => {
		if (dragging) {
			props.zIndex.set(2);
		} else if (props.selected) {
			props.zIndex.set(1);
		} else {
			props.zIndex.set(0);
		}
	}, [props.selected, dragging]);

    /*
    COLORS
    */
    let hoverOpacity = 0.08;
    if (props.tile.type === TILES.IMAGE.name && !props.tile.params.image) {
        hoverOpacity = 0.02;
    }

	const overlayColor = dragging ? theme.colors.t1 : hovering || layoutTweaking ? theme.colors.t2 : theme.colors.t0;

	return (
		<Draggable
			ref={ref}
			onHoverStart={() => setHovering(true)}
			onHoverEnd={() => setHovering(false)}
			onPointerDownCapture={onPointerDown}
		>
			<Shadow
				style={{
					//backgroundColor: theme.colors.backgrounds.page,
                    backgroundColor: "transparent",
					boxShadow: theme.shadows.large,
					borderRadius: tileCornerRadius,
					opacity: dragging ? 1 : 0,
					transition: "opacity 0.2s ease-out",
				}}
			/>

			{/* <Fill
				style={{
					backgroundColor: theme.colors.backgrounds.page,
					borderRadius: tileCornerRadius,
					opacity: dragging ? 1 : 0,
					transition: "opacity 0.2s ease-out",
				}}
			/> */}

			<Highlight
				style={{
					backgroundColor: theme.colors.t9,
					borderRadius: tileCornerRadius,
				}}
				initial={false}
				animate={{
					opacity: props.selected && !dragging ? 0 : hovering || dragging || layoutTweaking ? hoverOpacity : 0,
				}}
				transition={{
					duration: props.selected && !dragging ? 0 : 0.2,
				}}
			/>

			<SelectionRing
				initial={false}
				animate={{
					opacity: props.selected && !dragging ? 1 : 0,
				}}
				transition={{
					//duration: props.selected && !dragging ? 0 : 0.1,
                    duration: 0,
				}}
			>
				<rect
					width="100%"
					height="100%"
					rx={tileCornerRadius}
					stroke={props.editing ? theme.colors.backgrounds.page : theme.colors.accent}
					strokeWidth={1.5}
				/>
				<rect
					width="100%"
					height="100%"
					rx={tileCornerRadius}
					stroke={props.editing ? theme.colors.t4 : "transparent"}
					strokeWidth={1.5}
				/>
			</SelectionRing>
		</Draggable>
	);
};

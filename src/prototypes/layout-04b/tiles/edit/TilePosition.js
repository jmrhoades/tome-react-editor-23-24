import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, animate, useTransform, useMotionValueEvent } from "framer-motion";

import { EditorContext, Events } from "../../editor/EditorContext";
//import { TomeContext } from "../../tome/TomeContext";
//import { createPortal } from "react-dom";
import { transitions } from "../../ds/Transitions";

export const TilePosition = ({ children, tile }) => {
	const { isTileDraggableRecursive, pageScale, event, tileMotionValues } = React.useContext(EditorContext);

	const draggable = isTileDraggableRecursive(tile);
	const dragging = React.useRef(false);
	

	//const tileDragX = useTransform(()=>dragX.get())

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);
	tileMotionValues[tile.id] = {
		x: x,
		y: y,
		width: width,
		height: height,
	};

	//const left = useTransform(() => x.get() + dragX.get());
	//const top = useTransform(() => y.get() + dragY.get());

	useMotionValueEvent(event, "change", latest => {
		//console.log(latest, draggable);
		if (latest === Events.DraggingTile && draggable) {
			dragging.current = true;
			
		}
		if (latest === Events.ReleasedTile && draggable) {
			dragging.current = false;
			setPosition();
			
		}
	});

	const observeSize = () => {
		var ro = new ResizeObserver(entries => {
			//for (let entry of entries) {
			// const sizeRect = entry.contentRect;
			// const newW = sizeRect.width / pageScale.get();
			// const newH = sizeRect.height / pageScale.get();
			//}
			updateRect();
		});

		// Observe one or multiple elements
		ro.observe(document.getElementById(tile.id));
	};

	//console.log(dragging.current);

	const setPosition = () => {
		const position = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};
		const el = document.getElementById(tile.id);
		if (el) {
			const rect = el.getBoundingClientRect();
			const newX = rect.x + window.scrollX;
			const newY = rect.y + window.scrollY;
			const newW = rect.width / pageScale.get();
			const newH = rect.height / pageScale.get();
			tile.layout.cachedX = newX;
			tile.layout.cachedY = newY;
			tile.layout.cachedW = newW;
			tile.layout.cachedH = newH;
			position.x = newX;
			position.y = newY;
			position.width = newW;
			position.height = newH;
		}
		return position;
	};

	const updateRect = () => {
		//console.log(draggable);

		requestAnimationFrame(() => {
			//console.log("requestAnimationFrame");
			//console.log(event.get());
			if (dragging.current === false) {
				const position = setPosition();
				const newX = position.x;
				const newY = position.y;
				const newW = position.width;
				const newH = position.height;

				if (tile.animateLayout) {
					animate(x, newX, transitions.layoutTransition);
					animate(y, newY, transitions.layoutTransition);
					animate(width, newW, transitions.layoutTransition);
					animate(height, newH, transitions.layoutTransition);
				} else {
					x.set(newX);
					y.set(newY);
					width.set(newW);
					height.set(newH);
				}
				tile.animateLayout = false;
			}
		});
	};

	// Update metrics when data or state changes
	React.useEffect(updateRect);

	// Start observing resize on mount
	React.useEffect(observeSize, []);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<Box
			id={tile.id + "_edit_position"}
			className="flex-container"
			style={{
				pointerEvents: "none",

				//x: draggable ? dragX : undefined,
				//y: draggable ? dragY : undefined,

				x: x,
				y: y,
				width: width,
				height: height,
				zIndex: draggable ? 10 : undefined,

				scale: pageScale,
				originX: 0,
				originY: 0,
			}}
		>
			
			{children}
		</Box>
	);
};

const Box = styled(motion.section)`
	position: absolute;

	/* background-color: var(--editor-debug-background-color); */
	/* box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset; */
`;

const Content = styled(motion.div)`
	position: relative;

	/* background-color: var(--editor-debug-background-color); */
	/* box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset; */
`;



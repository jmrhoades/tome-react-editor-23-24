import React from "react";
import { LayoutGroup, motion, AnimatePresence, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";

export const Page = ({ children, tile }) => {
	const { tomeData } = React.useContext(TomeContext);
	const { pageScale, isMobileView } = React.useContext(EditorContext);

	const ref = React.useRef();

	document.body.style.setProperty("--page-background-color", tile.theme.tokens["--page-background-color"]);

	// Min height for aspect ratio
	const updateMetrics = () => {
		if (ref.current) {
			const vWidth = window.innerWidth;
			const vHeight = window.innerHeight;
			const marginX = tile.layout.margin.x;
			const marginY = tile.layout.margin.y;
			const pageWidth = tile.layout.contentSize.width;
			const pageHeight = tile.layout.contentSize.height;
			const aspectRatio = tile.layout.aspectRatio.value;

			let w = vWidth - marginX * 2;
			let h = w * (1 / aspectRatio);

			if ((vHeight - h) / 2 <= marginY) {
				h = vHeight - marginY * 2;
				w = h * aspectRatio;
			}

			const minWidth = 240;
			if (w < minWidth) {
				w = minWidth;
				h = w * (1 / aspectRatio);
			}

			let scale = w / pageWidth;
			if (!tile.layout.autoZoom) {
				scale = 1;
				w = pageWidth;
				h = pageHeight;
			}

			// apply new scale
			ref.current.style.setProperty("--page-scale", scale);
			ref.current.style.setProperty("--inverse-page-scale", 1 / scale);
			pageScale.set(scale);

			// compute new scaled page rectangle
			const rect = ref.current.getBoundingClientRect();
			//console.log(rect);

			// find x & y
			let x = marginX;
			let y = marginY;

			// if page is centered in the viewport,
			// make sure it does not go above the min y margin
			// make sure it does not go left of the min x margin
			if (tile.layout.centered) {
				y = (vHeight - rect.height) / 2;
				if (y < marginY) y = marginY;

				x = (vWidth - rect.width) / 2;
				if (x < marginX) x = marginX;
			}

			// compute bottom padding
			let bottomPadding = y / scale;

			ref.current.style.setProperty("--page-x", x + "px");
			ref.current.style.setProperty("--page-y", y + "px");
			ref.current.style.setProperty("--page-bottom-padding", bottomPadding + "px");
		}
	};

	// Update metrics when window resizes
	React.useLayoutEffect(() => {
		// Update metrics when component first mounts
		updateMetrics();
		const onWindowResize = () => {
			updateMetrics();
		};
		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, []);

	// Update metrics when tomeData changes
	React.useLayoutEffect(() => {
		updateMetrics();
	}, [tomeData]);

	return (
		<PageBox
			id={tile.id}
			ref={ref}
			style={{
				"--page-background-color": tile.theme.tokens["--page-background-color"],
				"--heading-color": tile.theme.tokens["--heading-color"],
				"--body-color": tile.theme.tokens["--body-color"],

				"--accent-color": tile.theme.tokens["--accent-color"],
				"--accent-color-40": tile.theme.tokens["--accent-color-40"],
				"--accent-color-10": tile.theme.tokens["--accent-color-10"],

				"--heading-font": tile.theme.tokens["--heading-font"],
				"--heading-weight": tile.theme.tokens["--heading-weight"],

				"--body-font": tile.theme.tokens["--body-font"],
				"--body-weight": tile.theme.tokens["--body-weight"],

				"--font-size": tile.layout.font.bodySize + "px",

				// Bring back the min height toggle?
				//"--page-min-height": tile.layout.minSize ? tile.layout.contentSize.height + "px" : undefined,

				"--page-width": tile.layout.contentSize.width + "px",
				"--page-min-height": tile.layout.contentSize.height + "px",

				"--page-auto-center": tile.layout.centered ? "auto" : undefined,
				"--page-overflow-y": tile.layout.scrolling ? undefined : "clip",
				"--page-max-height": tile.layout.scrolling ? undefined : "var(--page-min-height)",
				"--page-position": tile.layout.scrolling ? "absolute" : "fixed",

				paddingBottom: isMobileView() ? "80px" : undefined,
				//borderRadius: isMobileView() ? "30px" : undefined,
				

				// TODO - bring this back, needed for scrolling pages
				//"--page-margin-bottom": tile.layout.autoZoom ? "calc((var(--page-scale) - 1) * 100%)" : "auto",

				//"--gap": tile.layout.gap + "px",
				//"--padding-x": tile.layout.padding.x + "px",
				//"--padding-y": tile.layout.padding.y + "px",
				//"--border-radius": tile.layout.borderRadius + "px",
				//"--layout-direction": tile.layout.direction,
				//display: "flex",
				//flexDirection: tile.layout.direction,
				//alignItems: "start",
			}}
		>
			
			<LayoutGroup>
			{children}
			</LayoutGroup>			

			{/* <BottomPadding /> */}
		</PageBox>
	);
};

export const PageBox = styled.div`
	//background-color: var(--editor-debug-background-color);
	//box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	background-color: var(--page-background-color);

	position: var(--page-position);
	top: 0;
	left: 0;

	font-size: var(--font-size);

	//gap: var(--gap);
	//padding: var(--padding-y) var(--padding-x);
	//border-radius: var(--border-radius);

	width: var(--page-width);
	min-height: var(--page-min-height);
	max-height: var(--page-max-height);
	overflow-y: var(--page-overflow-y);

	transform-origin: 0% 0%;
	transform: translate3d(var(--page-x),var(--page-y),0) scale3d(var(--page-scale),var(--page-scale),1);
	isolation: isolate;
	transform-style: preserve-3d;
	
	/* margin-bottom: var(--page-margin-bottom); */

	/* CHILDREN LAYOUT */
	//display: grid;
	//grid-auto-flow: var(--layout-direction);

	display: flex;
	place-items: start;

	//flex-direction: var(--layout-direction);

	//align-content: var(--layout-align-content);
	//justify-items: var(--layout-justify-content);

	/* grid-template-rows: auto; */

	/* justify-content: var(--layout-flex-size); */

	/* grid-template-columns: var(--layout-columns); */
	/* grid-template-rows: var(--layout-rows); */

	/* grid-auto-columns: 1fr; */
	/* grid-auto-columns: 1fr; */
	/* grid-template-columns: auto 1fr; */
	/* display: flex; */
	/* flex-direction: row; */
`;

const BottomPadding = styled.div`
	height: var(--page-bottom-padding);
`;


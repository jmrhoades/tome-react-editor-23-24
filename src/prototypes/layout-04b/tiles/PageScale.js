import React from "react";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";

export const PageScale = ({ children, tile }) => {
	const { tomeData } = React.useContext(TomeContext);
	const { pageScale } = React.useContext(EditorContext);

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
		<ScaleBox
			id={"scalebox_for_" + tile.id}
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

				"--font-size": tile.theme.tokens["--font-size"] + "px",
				
				// TODO - bring this back, needed for scrolling pages
				//"--page-margin-bottom": tile.layout.autoZoom ? "calc((var(--page-scale) - 1) * 100%)" : "auto",
			}}
		>
			{children}
			{/* <BottomPadding /> */}
		</ScaleBox>
	);
};

export const ScaleBox = styled.div`
	position: absolute;
	transform-origin: 0% 0%;
	transform: translate3d(var(--page-x), var(--page-y), 0) scale3d(var(--page-scale), var(--page-scale), 1);
	isolation: isolate;
`;

const BottomPadding = styled.div`
	height: var(--page-bottom-padding);
`;

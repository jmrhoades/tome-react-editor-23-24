import React from "react";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";

export const PageScale = ({ children, tile }) => {
	const { tomeData } = React.useContext(TomeContext);
	const { pageScale, tileRefs } = React.useContext(EditorContext);

	const ref = React.useRef();

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
			const aspectRatioLock = tile.layout.aspectRatioLock;

			// find max width of page by removing x margins from window width
			let w = vWidth - marginX * 2;

			// find height via aspect ratio setting
			let h = w * (1 / aspectRatio);

			// if the window is taller than wide, reverse the aspect ratio fitting
			if ((vHeight - h) / 2 <= marginY) {
				h = vHeight - marginY * 2;
				w = h * aspectRatio;
			}

			// stop scaling the page after 240 or less
			const minWidth = 240;
			if (w < minWidth) {
				w = minWidth;
				h = w * (1 / aspectRatio);
			}

			// find the scale from the computed width
			let scale = w / pageWidth;

			// reset computed scale if zoom is off
			if (!tile.layout.autoZoom) {
				scale = 1;
				w = pageWidth;
				h = pageHeight;
			}

			// compute new scaled page rectangle
			const rect = ref.current.getBoundingClientRect();
			const el = tileRefs.current[tile.id].current;

			// find x & y
			let x = marginX;
			let y = marginY;

			// if page is centered in the viewport,
			// make sure it does not go above the min y margin
			// make sure it does not go left of the min x margin
			if (tile.layout.centered) {
				//y = (vHeight - rect.height) / 2;
				y = (vHeight - el.clientHeight * scale) / 2;
				if (y < marginY) y = marginY;

				x = (vWidth - el.clientWidth * scale) / 2;
				//x = (vWidth - rect.width ) / 2;
				if (x < marginX) x = marginX;
			}

			if (aspectRatioLock) {
				y = (vHeight - h) / 2;
			}

			if (tile.layout.aspectRatioScale) {
				//scale = h / rect.height;
				//console.log(tile.id)
				//const tStyle = tileRefs.current[tile.id].current.style;
				scale = h / (el.scrollHeight)
				//console.log(el.clientWidth, el.clientHeight)
				x = (vWidth - el.clientWidth) / 2;
				x = marginX;
			}

			// apply new scale
			pageScale.set(scale);

			// compute bottom padding
			let bottomPadding = y / scale;

			// css vars for child component use
			ref.current.style.setProperty("--page-scale", scale);
			ref.current.style.setProperty("--inverse-page-scale", 1 / scale);
			ref.current.style.setProperty("--page-x", x + "px");
			ref.current.style.setProperty("--page-y", y + "px");

			ref.current.style.setProperty("--page-bottom-padding", bottomPadding + "px");

			document.body.style.setProperty("--page-ideal-width", w + "px");
			document.body.style.setProperty("--page-ideal-height", h + "px");
			document.body.style.setProperty("--page-current-y", y + "px");
		}
	};

	// Update metrics when window resizes
	React.useEffect(() => {
		// Update metrics when component first mounts
		updateMetrics();
		const onWindowResize = () => {
			updateMetrics();
		};
		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, []);

	// Update metrics when tomeData changes
	React.useEffect(() => {
		updateMetrics();
	}, [tomeData, tile]);

	return (
		<ScaleBox
			id={"scalebox_for_" + tile.id}
			ref={ref}
			style={
				{
					// TODO - bring this back, needed for scrolling pages
					//"--page-margin-bottom": tile.layout.autoZoom ? "calc((var(--page-scale) - 1) * 100%)" : "auto",
				}
			}
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

	/* transform-style: preserve-3d; */
	/* isolation: isolate; */
	/* scroll-padding-bottom: 200px; */
`;

const BottomPadding = styled.div`
	height: var(--page-bottom-padding);
`;

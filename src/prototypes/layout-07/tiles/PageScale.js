import React from "react";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";

export const PageScale = ({ children, tile }) => {
	const { tomeData, saveState } = React.useContext(TomeContext);
	const { pageScale, contentScale, tileRefs } = React.useContext(EditorContext);

	const idPrefix = "scalebox_for_";
	const ref = React.useRef();
	tileRefs.current[idPrefix + tile.id] = ref;

	// Min height for aspect ratio
	const updateMetrics = () => {
		if (ref.current) {
			
			let vWidth = window.innerWidth;
			let vHeight = window.innerHeight;

			

			let marginX = tile.layout.margin.x;
			let marginY = tile.layout.margin.y;
			const pageWidth = tile.layout.contentSize.width;
			const pageHeight = tile.layout.contentSize.height;
			const aspectRatio = tile.layout.aspectRatio.value;
			const aspectRatioLock = tile.layout.aspectRatioLock;

			if (tomeData.editor.isFullscreen) {
				vWidth = window.screen.width;
				vHeight = window.screen.height;
				marginX = 0;
				marginY = 0;
			}

			let cScale = 1;

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

			const el = tileRefs.current[tile.id].current;

			// if (tile.layout.aspectRatioScale) {
			// 	//scale = h / rect.height;
			// 	//console.log(tile.id)
			// 	//const tStyle = tileRefs.current[tile.id].current.style;
			// 	scale = h / el.scrollHeight;
			// 	//console.log(el.clientWidth, el.clientHeight)
			// 	x = (vWidth - el.clientWidth) / 2;
			// 	x = marginX;
			// }

			if (tile.layout.scaleContent) {
				// reset scale to 1
				ref.current.style.setProperty("--page-scale", 1);
				ref.current.style.setProperty("--content-scale", 1);

				// unconstrain page height
				el.style.setProperty("--page-max-height", "auto");

				// measure unscaled size
				//const elRect = el.getBoundingClientRect();

				//contentScale = h / el.scrollHeight;
				cScale = pageHeight / el.scrollHeight;
				if (contentScale > 1) cScale = 1;

				// re-set page height
				el.style.setProperty("--page-max-height", "var(--page-min-height)");

				//console.log(h, pageHeight, el.scrollHeight)
			}

			// apply new scale
			pageScale.set(scale);
			contentScale.set(cScale);

			// css vars for child component use
			ref.current.style.setProperty("--page-scale", scale);
			ref.current.style.setProperty("--content-scale", cScale);
			ref.current.style.setProperty("--inverse-page-scale", 1 / scale);

			// find x & y
			let x = marginX;
			let y = marginY;

			// if page is centered in the viewport,
			// make sure it does not go above the min y margin
			// make sure it does not go left of the min x margin
			const rect = ref.current.getBoundingClientRect();

			//x = (vWidth - el.clientWidth * scale) / 2;
			x = (vWidth - rect.width) / 2;
			if (x < marginX) x = marginX;

			y = (vHeight - h) / 2;
			/*
			if (tile.layout.scaleContent || !tile.layout.scrolling) {
				y = (vHeight - h) / 2;
			} else {
				y = (vHeight - rect.height) / 2;
				//y = (vHeight - el.clientHeight * scale) / 2;
				if (y < marginY) y = marginY;
			}
			*/

			// compute bottom padding
			let bottomPadding = y / scale;

			ref.current.style.setProperty("--page-x", x + "px");
			ref.current.style.setProperty("--page-y", y + "px");

			// scaled, scrolling pages need the right amount of bottom padding
			ref.current.style.setProperty("--page-bottom-padding", bottomPadding + "px");

			// used for the overflow indicator, get rid of
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

	const onFullscreenChanged = () => {
		if (!document.fullscreenElement) {
			tomeData.editor.isFullscreen = false;
			saveState();
		}
	};

	React.useEffect(() => {
		ref.current.addEventListener("fullscreenchange", onFullscreenChanged);
		const r = ref.current;
		return () => {
			r.removeEventListener("fullscreenchange", onFullscreenChanged);
		};
	}, []);

	return (
		<ScaleBox id={idPrefix + tile.id} ref={ref}>
			{children}
		</ScaleBox>
	);
};

export const ScaleBox = styled.div`
	padding-left: var(--page-x);
	padding-right: var(--page-x);
	padding-top: var(--page-y);
	padding-bottom: var(--page-y);

	display: grid;
	min-height: 100%;

	&:fullscreen {
		padding-left: 0;
		padding-right: 0;
		padding-top: 0;
		padding-bottom: 0;
	}

	/* transform-style: preserve-3d; */
	/* isolation: isolate; */
`;

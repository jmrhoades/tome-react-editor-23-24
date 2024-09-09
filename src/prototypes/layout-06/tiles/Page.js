import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";
import { themeCSS } from "../ds/Themes";
import { LayoutGroup, MotionConfig } from "framer-motion";

export const Page = ({ children, tile }) => {
	const { tomeData } = React.useContext(TomeContext);
	const { pageOverflow, tileRefs } = React.useContext(EditorContext);

	const themeStyles = themeCSS(tile.theme);

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	//const [reduceMotion, setReduceMotion] = React.useState("never");
	//React.useEffect(() => setReduceMotion("never"), []);

	// Update metrics when tomeData changes
	React.useEffect(() => {
		// compute new scaled page rectangle
		// const rect = ref.current.getBoundingClientRect();
		// const currentAspectRatio = rect.width / rect.height;
		const currentAspectRatio = ref.current.clientWidth / ref.current.scrollHeight;
		const aspectRatio = tile.layout.aspectRatio.value;
		//console.log("currentAspectRatio", currentAspectRatio, ref.current.clientWidth, ref.current.scrollHeight);
		if (currentAspectRatio < aspectRatio) {
			//console.log("Scrolling!!!")
			pageOverflow.set(true);
		} else {
			//console.log("NOT scrolling")
			pageOverflow.set(false);
		}
		//console.log("currentAspectRatio", currentAspectRatio, aspectRatio);
	}, [tomeData]);

	document.body.style.setProperty("overflow-y", tile.layout.scrolling ? "scroll" : "clip");

	//document.documentElement.style.setProperty("font-size", tile.layout.contentScale + "px");

	return (
		<PageBox
			id={tile.id}
			ref={ref}
			style={{
				...themeStyles,

				"--page-width": `calc(${tile.layout.contentSize.width}px * var(--page-scale)`,
				"--page-min-height": `calc(${tile.layout.contentSize.height}px * var(--page-scale)`,
				"--page-max-height": tile.layout.scaleContent ? "var(--page-min-height)" : undefined,
				"--page-auto-center": tile.layout.centered ? "auto" : undefined,

				//"--page-width": tile.layout.contentSize.width + "px",
			}}
		>
			{/* <MotionConfig reducedMotion={reduceMotion}> */}
			<LayoutGroup initial={false}>
				{children}
				</LayoutGroup>
			{/* </MotionConfig> */}
			{/* <BottomPadding /> */}
		</PageBox>
	);
};

export const PageBox = styled.div`
	transform-style: preserve-3d;

	font-size: var(--font-size);
	
	margin: var(--page-auto-center);
	/* margin-right: var(--page-auto-center); */

	width: var(--page-width);
	min-height: var(--page-min-height);
	//max-height: var(--page-max-height);
	height: var(--page-max-height);

	//overflow-y: var(--page-overflow-y);
	/* overflow-y: scroll; */
	/* overflow-x: clip; */
	/* margin-bottom: var(--page-margin-bottom); */

	display: grid;
`;

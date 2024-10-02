import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";
import { themeCSS } from "../tome/Themes";
import { LayoutGroup, MotionConfig } from "framer-motion";

export const Page = ({ children, tile }) => {
	const { tomeData, saveState } = React.useContext(TomeContext);
	const { pageOverflow, tileRefs, tileMotionValues } = React.useContext(EditorContext);

	const themeStyles = themeCSS(tile.theme);

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	// Store motion value for background color changing
	const backgroundColor = useMotionValue(tile.theme.tokens["--page-color"]);
	tileMotionValues.current[tile.id] = {
		backgroundColor: backgroundColor,
	};
	React.useEffect(() => {
		backgroundColor.set(tile.theme.tokens["--page-color"]);
	}, [tomeData, tile]);

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
				"--page-accent-color": tile.theme.tokens["--accent-color"],


				
				borderRadius: tomeData.editor.isFullscreen ? "unset" : `10px`,
				backgroundColor: `var(--page-color)`,				
			}}
		>
			{/* <MotionConfig reducedMotion={reduceMotion}> */}
			<LayoutGroup initial={false}>{children}</LayoutGroup>
			{/* </MotionConfig> */}
		</PageBox>
	);
};

export const PageBox = styled.div`
	transform-style: preserve-3d;

	font-size: var(--font-size);
	margin: var(--page-auto-center);
	width: var(--page-width);
	min-height: var(--page-min-height);
	height: var(--page-max-height);

	display: flex;
	justify-content: center;
`;

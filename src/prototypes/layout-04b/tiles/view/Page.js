import React from "react";
import styled from "styled-components";

import { EditorContext } from "../../editor/EditorContext";

export const Page = ({ children, tile }) => {
	const { isMobileView } = React.useContext(EditorContext);

	const ref = React.useRef();

	

	


	return (
		<PageBox
			id={tile.id}
			ref={ref}
			style={{
				opacity: 0,

				// Bring back the min height toggle?
				//"--page-min-height": tile.layout.minSize ? tile.layout.contentSize.height + "px" : undefined,

				"--page-width": tile.layout.contentSize.width + "px",
				"--page-min-height": tile.layout.contentSize.height + "px",

				"--page-auto-center": tile.layout.centered ? "auto" : undefined,
				"--page-overflow-y": tile.layout.scrolling ? undefined : "clip",
				"--page-max-height": tile.layout.scrolling ? undefined : "var(--page-min-height)",
				//"--page-position": tile.layout.scrolling ? "absolute" : "fixed",

				paddingBottom: isMobileView() ? "80px" : undefined,
				//borderRadius: isMobileView() ? "30px" : undefined,
				
				pointerEvents: "none",

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
			{children}
			{/* <BottomPadding /> */}
		</PageBox>
	);
};

export const PageBox = styled.div`
	//background-color: var(--editor-debug-background-color);
	//box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	background-color: var(--page-background-color);

	//position: var(--page-position);
	//top: 0;
	//left: 0;

	font-size: var(--font-size);

	//gap: var(--gap);
	//padding: var(--padding-y) var(--padding-x);
	//border-radius: var(--border-radius);

	width: var(--page-width);
	min-height: var(--page-min-height);
	max-height: var(--page-max-height);
	overflow-y: var(--page-overflow-y);
	
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



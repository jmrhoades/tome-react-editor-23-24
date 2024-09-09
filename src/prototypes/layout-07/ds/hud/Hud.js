import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { EditorContext } from "../../editor/EditorContext";
import { huds } from "../../editor/popovers/huds/huds";
import { tileTypes } from "../../tome/TileData";
import { NodeHud } from "../../editor/popovers/huds/NodeHud";

export const Hud = props => {
	const { tileMotionValues, selectionBoundsMotionValues } = React.useContext(EditorContext);

	const { selectedTiles, tomeData } = props;

	const ref = React.useRef();

	const tile = selectedTiles[0];

	const { x, y, top, left } = tileMotionValues.current[tile.id];
	const multiSelection = selectedTiles.length > 1;

	const hudLeft = multiSelection ? selectionBoundsMotionValues.x : left;
	const hudTop = multiSelection ? selectionBoundsMotionValues.y : top;

	/*
	// Update position when window resizes
	React.useEffect(() => {
		const updatePosition = () => {};
		window.addEventListener("resize", updatePosition);
		return () => window.removeEventListener("resize", updatePosition);
	}, []);
	*/

	return (
		<Positioner
			style={{
				x: x,
				y: y,
				left: hudLeft,
				top: hudTop,
			}}
			// initial={{
			// 	opacity: 0,
			// }}
			// animate={{
			// 	opacity: 1,
			// }}
			// exit={{
			// 	opacity: 0,
			// }}
			// transition={{
			// 	duration: 0.2,
			// }}
		>
			<Box
				id="properties-hud"
				ref={ref}
				style={{
					y: "-100%",
					marginTop: "-12px",
					marginLeft: "-1px",
				}}
			>
				{!multiSelection && (
					<>
						{tile.type === tileTypes.PAGE && <huds.PAGE.content tile={tile} hudRef={ref} />}
						{tile.type === tileTypes.FLEX && <huds.FLEX.content tile={tile} hudRef={ref} />}
						{tile.type === tileTypes.TEXT && <huds.TEXT.content tile={tile} hudRef={ref} />}
						{tile.type === tileTypes.IMAGE && <huds.IMAGE.content tile={tile} hudRef={ref} />}
					</>
				)}
				{multiSelection && <NodeHud selectedTiles={selectedTiles} tomeData={tomeData} hudRef={ref} />}

				{/* <NodeHud selectedTiles={selectedTiles} tomeData={tomeData} /> */}

			</Box>
		</Positioner>
	);
};

const Positioner = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

const Box = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
	transform-style: preserve-3d;

	display: flex;
	align-items: center;
	gap: var(--hud-gap);
	padding: var(--hud-padding);
	border-radius: var(--hud-border-radius);
	background-color: var(--hud-background-color);
	box-shadow: var(--stroke-and-shadow);
`;

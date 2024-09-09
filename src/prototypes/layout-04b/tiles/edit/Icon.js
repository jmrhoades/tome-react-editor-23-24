import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { EditorContext } from "../../editor/EditorContext";
import { Icon as IconAsset } from "../../ds/Icon";

export const Icon = ({ children, tile }) => {
	const { dragXScaled, dragYScaled, isTileDraggable } = React.useContext(EditorContext);
	const draggable = isTileDraggable(tile);

	return (
		<Box
			id={tile.id  + "_edit"}
			style={{
				x: draggable ? dragXScaled : undefined,
				y: draggable ? dragYScaled : undefined,
				color: tile.content.color,
			}}
		>
			<IconAsset size={tile.content.size} name={tile.content.name} />
		</Box>
	);
};

const Box = styled(motion.div)`
	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;
	position: relative;

	height: fit-content;
	width: fit-content;

	/* align-self: start;
	justify-self: start; */
`;

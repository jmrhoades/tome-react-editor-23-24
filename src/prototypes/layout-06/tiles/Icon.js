import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon as IconAsset } from "../ds/Icon";

export const Icon = ({ children, tile }) => {
	return (
		<Box
			id={tile.id}
			style={{
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
`;

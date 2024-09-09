import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { GhostLayer } from "./ghost/GhostLayer";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	/* overflow: hidden; */
`;

const LayerView = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const CenterOrigin = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

export const DrawingTilePreview = props => {
	const layers = props.tile.params.layers;

	return (
		<Wrap>
			<LayerView
				style={{
					borderRadius: props.borderRadius,
					overflow: "hidden",
				}}
			>
				<CenterOrigin
					className="centerTileOrigin"
					style={{
						x: props.tileWidth / 2,
						y: props.tileHeight / 2,
					}}
				>
					{layers &&
						layers.map((b, i) => (
							<GhostLayer
								key={b.id}
								theme={props.theme}
								layer={b}
								pageScale={props.pageScale}
								zoom={props.zoom}
							/>
						))}
				</CenterOrigin>
			</LayerView>
		</Wrap>
	);
};

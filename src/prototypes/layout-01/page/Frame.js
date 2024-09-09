import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";

const Div = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

const HoverBackground = styled(motion.div)`
	position: absolute;

	opacity: 0;
	transition: opacity 0.2s ease-out;
`;

const LayoutTweaking = styled(motion.div)`
	position: absolute;

	opacity: 0;
	transition: opacity 0.2s ease-out;
`;

export const Frame = props => {
	const { tomeData, currentPage } = useContext(TomeContext);
	const { getPageFrameRect } = useContext(MetricsContext);


	const frame = props.frame;
	const rect = getPageFrameRect(props.frame);
	const tiles = tomeData.tiles.filter(t => t.frameId === frame.id);

	return (
		<Div
			key={"frame" + props.frame.id}
			className="frame"
            style={
				{
					//backgroundColor: currentPage.theme.colors.t2,
				}
			}
			animate={{
				width: rect.width,
				height: rect.height,
				x: rect.x,
				y: rect.y,
			}}
			initial={false}
			transition={transitions.layoutTransition}
			
		>
			{/* <HoverBackground />
			<LayoutTweaking /> */}

			{tiles.map(tile => (
				<Tile key={tile.id} tile={tile} page={currentPage} />
			))}
		</Div>
	);
};

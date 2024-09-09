import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Icon } from "../../../ds/Icon";

const Wrap = styled(motion.div)`
	position: absolute;

	left: 0;
	pointer-events: none;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Cover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.08;
`;

const BorderTop = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 2px;
`;

const BorderBottom = styled(BorderTop)`
	top: unset;
	bottom: 0;
`;

const BorderLeft = styled(BorderTop)`
	width: 2px;
	height: 100%;
`;

const BorderRight = styled(BorderLeft)`
	left: unset;
	right: 0;
`;

export const BackgroundPlacementIndicator = props => {
	return (
		<Wrap
			style={{
				opacity: props.dropIndicatorInfo.backgroundDropOpacity,
				pointerEvents: "none",
				transition: "opacity 0.2s ease-out",
				width: props.width ? props.width : "100%",
				height: props.height ? props.height : "100%",
				top: props.top ? props.top : 0,
				left: props.left ? props.left : 0,
				borderRadius: props.borderRadius ? props.borderRadius : 0,
				//border: `1px solid ${props.theme.colors.accent}`,
				//boxShadow: `0 0 0 1.5px ${props.theme.colors.accent}`,
				boxShadow: `0 0 0 4px ${props.theme.colors.backgrounds.page}, 0 0 0 6px ${props.theme.colors.accent}`,
				
			}}
		>
			{/* <Cover style={{ background: props.theme.colors.accent }} /> */}
			{/* <BorderTop style={{ background: props.theme.colors.accent }} /> */}
			{/* <BorderBottom style={{ background: props.theme.colors.accent }} /> */}
			{/* <BorderLeft style={{ background: props.theme.colors.accent }} /> */}
			{/* <BorderRight style={{ background: props.theme.colors.accent }} /> */}
		</Wrap>
	);
};

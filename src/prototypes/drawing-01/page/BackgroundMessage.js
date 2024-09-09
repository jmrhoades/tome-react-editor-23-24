import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Icon } from "../../../ds/Icon";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const PageBackgroundMessage = props => {
	const messageOpacity = useMotionValue(0);
	const [iconName, setIconName] = React.useState("Video");

	React.useEffect(
		() => {
			props.dropIndicatorInfo.backgroundDropOpacity.onChange(latest => {
				messageOpacity.set(latest === 0 ? 0 : 1);
			});
			props.dropIndicatorInfo.backgroundDropType.onChange(latest => {
				messageOpacity.set(latest === 0 ? 0 : 1);
				setIconName(latest)
			});
			
		},
		[]
	);

	//const iconName = props.type ? props.type : "Video"

	console.log(props.type)

	return (
		<Wrap
			style={{
				//background: props.theme.colors.accent,
				//background: "green",
				//opacity: props.dropIndicatorInfo.backgroundDropOpacity,
				//opacity: 1,

				transition: "opacity 0.2s ease-out",
				opacity: messageOpacity,
			}}
		>
			<Icon name={iconName} size={96} color={props.theme.colors.accent} opacity={1} />
		</Wrap>
	);
};

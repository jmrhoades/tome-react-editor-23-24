import React, { useContext } from "react";
import { motion } from "framer-motion";
import { colors } from "../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import styled from "styled-components";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const PageIndicator = styled(motion.div)``;
const ActivePageIndicator = styled(motion.div)``;

export const TitlebarProgressIndicator = props => {
	const { viewportWidth } = useContext(MetricsContext).metrics;
	const { tomeData, isPlayMode, currentPage } = useContext(TomeContext);
	const hasPages = tomeData.pages.length > 1;

	const fade = transitions.playModeFade;
	const spring = transitions.playModeSpring;

	return (
		<Wrap
			style={{
				gap: 3,
				y: 23,
			}}
			animate={{
                opacity: isPlayMode && hasPages ? 1 : 0,
			}}
			transition={isPlayMode ? { duration: 0.3, delay: 0.1 } : { duration: 0.1 }}
			initial={false}
		>
			{tomeData.pages.map((p, i) => (
				<PageIndicator
					key={"indicator_" + p.id}
					style={{
						position: "relative",
						width: 40,
						height: 2,
						borderRadius: 4,
						backgroundColor: props.theme.colors.t5,
					}}
				>
					<ActivePageIndicator
                        layoutId="ActivePageIndicator"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							borderRadius: 4,
							backgroundColor: props.theme.colors.t8,
						}}
                        animate={{
                            opacity: isPlayMode && currentPage.id === p.id ? 1 : 0,
                            scaleX: isPlayMode && currentPage.id === p.id ? 1 : 0,
                            originX: 0,
                        }}
                        transition={isPlayMode ? { duration: 0.3, delay: 0.1 } : { duration: 0.3 }}
					/>
				</PageIndicator>
			))}
		</Wrap>
	);
};

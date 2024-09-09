import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const AddIconButton = props => {
	const { info } = props;
	const { src, width, height } = info;
	return (
		<Wrap
			style={{
				aspectRatio: width / height,
				...props.style,
			}}
		>
			<img
				src={src}
				alt={""}
				style={{
					display: "block",
					maxWidth: "100%",
					pointerEvents: "none",
				}}
			/>
		</Wrap>
	);
};

const Wrap = styled(motion.div)`
	/* background-color: var(--z2); */
	/* border-radius: 4px; */
	overflow: hidden;

	display: grid;
	place-items: center;

	transition: all 0.2s ease;
	cursor: grab;
	//opacity: 0.75;
	&:hover {
		/* background-color: var(--z3); */
		//transform: scale(1.025);
		//opacity: 1;
	}
	&:active {
		cursor: grabbing;
	}
`;

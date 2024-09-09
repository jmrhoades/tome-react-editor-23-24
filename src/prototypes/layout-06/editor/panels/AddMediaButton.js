import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const AddMediaButton = props => {
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
	background-color: var(--z2);
	border-radius: 4px;
	overflow: hidden;

	/* transition: scale 0.1s ease; */
	cursor: grab;
	&:hover {
		background-color: var(--z3);
		/* transform: scale(1.025); */
	}
	&:active {
		cursor: grabbing;
	}
`;

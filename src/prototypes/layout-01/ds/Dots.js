import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const DotsWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: ${props => props.$gap}px;
	pointer-events: none;
	div {
		animation: blink ${props => props.$speed}s infinite;
		animation-fill-mode: both;
		height: ${props => props.$size}px;
		width: ${props => props.$size}px;
		background: ${props => props.$color};
		border-radius: 50%;
		&:nth-child(2) {
			animation-delay: 0.25s;
		}
		&:nth-child(3) {
			animation-delay: 0.5s;
		}
	}
	@keyframes blink {
		0% {
			opacity: 0.1;
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 0.1;
		}
	}
`;

const Dot = styled(motion.div)``;

export const Dots = props => {
	const dotSize = props.size ? props.size : 6;
	const dotGap = 4;
	const dotColor = props.color ? props.color : props.theme.colors.t8;
	const speed = 1.75;

	return (
		<DotsWrap
			key="dots"
			$size={dotSize}
			$color={dotColor}
			$speed={speed}
			$gap={dotGap}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{...props.style}}
		>
			<div />
			<div />
			<div />
		</DotsWrap>
	);
};

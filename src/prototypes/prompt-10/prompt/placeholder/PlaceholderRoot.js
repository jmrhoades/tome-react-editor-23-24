import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { tPlaceholderParentShow, tPlaceholderParentHide } from "../Transitions";



const Wrap = styled(motion.div)`
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const ParentLabel = styled(motion.div)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	background: linear-gradient(
		90deg,
		${props => props.$shineBase} 0%,
		${props => props.$shineBase} 45%,
		${props => props.$shineHighlight} 55%,
		${props => props.$shineBase} 65%,
		${props => props.$shineBase} 100%
	);
	background-size: 300% 100%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: move 6s linear infinite;
	animation-delay: 2s;
	@keyframes move {
		0% {
			background-position: 100% 0%;
		}
		33% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 0% 0%;
		}
	}
`;

export const PlaceholderRoot = React.forwardRef(function Placeholder(props, ref) {
	const parentPlaceholderText = "What would you like to do?";

	return (
		<Wrap
			ref={ref}
			style={{
				...props.style,
				color: props.theme.colors.promptbar.placeholder,
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			//transition={isParent ? tPlaceholderParentShow : tPlaceholderParentHide}
		>
			<ParentLabel
				$shineBase={props.theme.colors.promptbar.shineBase}
				$shineHighlight={props.theme.colors.promptbar.shineHighlight}
			>
				{parentPlaceholderText}
			</ParentLabel>
		</Wrap>
	);
});

import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { TomeContext } from "../tome/TomeContext";
import { IconButton } from "../ds/Buttons";
import { Icon } from "../../../ds/Icon";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	pointer-events: none;
	/* z-index: 10; */
	height: 52px;
`;

const LeftGroup = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: absolute;
	left: 12px;
	height: 100%;
`;

const RightGroup = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 10px;
	height: 100%;
	gap: 8px;
`;

const Button = styled(motion.div)`
	display: flex;
	padding: 6px 10px 6px 6px;
	pointer-events: auto;
	cursor: pointer;
	border-radius: 6px;
	background-color: ${props => props.$backgroundColor};
	transition: background-color 0.2s ease-out;
	&:hover {
		background-color: ${props => props.$hoverBackgroundColor};
	}
`;

const Label = styled(motion.div)`
	font-size: 15px;
`;

export const Bottombar = props => {
	const { isPlayMode, currentPage, promptIsOpen, togglePrompt, isGenerating, isReviewing } = useContext(TomeContext);

	const fade = transitions.playModeFade;

	return (
		<Wrap
			initial={false}
			transition={fade}
			animate={{
				opacity: isPlayMode ? 0 : isGenerating || isReviewing ? 0.25 : 1,
			}}
			style={{
				y: 0,
			}}
		>
			<LeftGroup>
				<Button
					style={{
						marginBottom: "4px",
					}}
					$backgroundColor={"transparent"}
					$hoverBackgroundColor={currentPage.theme.colors.t4}
				>
					<Icon name="Add" size={20} color={currentPage.theme.colors.t7} style={{ marginRight: "4px" }} />

					<Label
						style={{
							color: currentPage.theme.colors.t7,
						}}
					>
						Add page
					</Label>
				</Button>
			</LeftGroup>

			<RightGroup>
				<IconButton icon="Help" theme={currentPage.theme} />
			</RightGroup>
		</Wrap>
	);
};

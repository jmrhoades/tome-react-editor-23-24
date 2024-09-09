import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";

const Wrap = styled(motion.div)`
	
	font-size: 13px;
	line-height: 18px;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px;
	padding-bottom: 6px;

	gap: 8px;
	transition: opacity 0.1s ease;
	pointer-events: none;
`;

const Title = styled(motion.div)`
	font-weight: 500;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-right: 4px;
`;

const LockUp = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 4px;
`;

const BetaTag = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 4px 0px 4px;

	border-radius: 4px;
	
	font-style: normal;
	font-weight: 500;
	font-size: 10px;
	line-height: 16px;
	letter-spacing: 0.01em;
	text-transform: uppercase;
`;

const Accessory = styled(motion.div)``;

const Body = styled(motion.div)`
	line-height: 16px;
`;

export const PromptCreateTomeInfo = props => {
	const colors = props.theme.colors;
	return (
		<Wrap
			style={{
				color: props.theme.colors.t9,
			}}
		>
			<Title>
				<LockUp>
					{/* <Icon name="DoubleSparkle" size={20} opacity={1} color={colors.t9} /> */}
					<Title>AI Create</Title>
				</LockUp>
				<Accessory>
					<BetaTag
						style={{
							background: colors.t2,
							color: colors.t7,
						}}
					>
						Beta
					</BetaTag>
				</Accessory>
			</Title>
			<Body
				style={{
					color: props.theme.colors.t7,
				}}
			>
				Provide a detailed description of your story or presentation.
				<br />
				{/* Use ⌘K for quick access. */}
				Press ↵ to submit.
			</Body>
		</Wrap>
	);
};

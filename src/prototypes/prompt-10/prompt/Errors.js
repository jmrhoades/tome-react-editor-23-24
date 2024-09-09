import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { ErrorStates } from "./Prompt";

const Wrap = styled(motion.div)`
	
	font-size: 13px;
	line-height: 20px;
	width: 100%;
	position: relative;
`;

const Content = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`;

const Label = styled(motion.div)``;

const Accessory = styled(motion.div)``;

const Button = styled(motion.div)`
	cursor: pointer;
`;

const Divider = styled(motion.div)`
	position: absolute;
	top: 0;
	left: -24px;
	right: -24px;
	height: 1px;
`;

export const Errors = props => {
	const colors = props.theme.colors;
	const [isHovering, setIsHovering] = React.useState(false);

	const isModeration = props.errorState === ErrorStates.MODERATION;
	const isUnknown = props.errorState === ErrorStates.UNKNOWN;

	let label = "We’re casting a lot of spells right now. Try again in a few minutes.";
	if (isModeration) label = "Out of moderation policy, rephrase and try again.";
	if (isUnknown) label = "Something went wrong, please try again.";

	return (
		
		<Wrap style={{
			marginTop: -4,
			paddingBottom: 14,
		}}>
			{/* <Divider style={{ backgroundColor: colors.t2, y: 0 }} /> */}
			<Content
				
			>
				<Label
					style={{
						color: isModeration ? props.theme.colors.warning : props.theme.colors.warning,
						paddingLeft: 20,
					}}
				>
					{label}
				</Label>
				{/* {!isModeration && (
					<Accessory
						onHoverStart={e => {
							setIsHovering(true);
						}}
						onHoverEnd={e => {
							setIsHovering(false);
						}}
						style={{
							x: 10,
							display: "none",
						}}
					>
						<Button onTap={props.resubmit}>
							<Icon name="Retake" size={20} opacity={1} color={isHovering ? colors.t9 : colors.t6} />
						</Button>
					</Accessory>
				)} */}
				{/* {isModeration && <Icon name="Report" size={20} opacity={1} color={colors.warning} />} */}
			</Content>
		</Wrap>
	);
};

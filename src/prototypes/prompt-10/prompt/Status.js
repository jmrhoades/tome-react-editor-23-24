import React from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import styled from "styled-components";

import { DelegateStates, InputStates, PromptStates } from "./Prompt";
import { Spinner, SpinnerStates } from "./Spinner";
import { LabelButton } from "../ds/Buttons";
import {
	tLoadingLabelShow,
	tLoadingLabelHide,
} from "./Transitions";

const Wrap = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: auto;
`;

const LabelsWrap = styled(motion.div)`
	position: relative;
`;

const ControlsWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ButtonGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Label = styled(motion.div)`
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	font-size: 14px;
`;

const WaitingLabel = styled(motion.div)``;
const BuildingLabel = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;
const FinishedLabel = styled(BuildingLabel)``;

const SpinnerWrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Status = props => {
	const colors = props.theme.colors;

	const isHiding = props.delegateState === DelegateStates.HIDING;
	const isWaiting = props.delegateState === DelegateStates.WAITING;
	const isBuilding = props.delegateState === DelegateStates.BUILDING;
	const isFinished = props.delegateState === DelegateStates.FINISHED;
	const isReviewing = props.delegateState === DelegateStates.REVIEW;

	return (
		<Wrap
			key="status_component"
			style={{
				gap: 64,
				pointerEvents: "none",
				height: 56,
				paddingLeft: 12,
				paddingRight: 12,
			}}
		>
			<LabelsWrap
				style={{
					paddingLeft: 8,
				}}
				layout={"position"}
				transition={props.transitions.morph}
			>
				<Label style={{ color: colors.t9, minWidth: 160 }}>
					<WaitingLabel
						initial={false}
						animate={{
							opacity: isWaiting ? 1 : 0,
						}}
						transition={isWaiting ? tLoadingLabelShow : tLoadingLabelHide}
					>
						{props.statusLabelWaiting}
					</WaitingLabel>
					<AnimatePresence>
					<BuildingLabel
						key={props.statusLabelProgress}
						initial={false}
						animate={{ opacity: isBuilding ? 1 : 0}}
						transition={isBuilding ? tLoadingLabelShow : tLoadingLabelHide}
						style={{ color: colors.t8}}
					>
						
						{props.statusLabelProgress}
					</BuildingLabel>
					</AnimatePresence>
					<FinishedLabel
						initial={false}
						animate={{
							opacity: isFinished || isReviewing ? 1 : 0,
						}}
						transition={isFinished ? tLoadingLabelShow : tLoadingLabelHide}
						style={{ color: colors.t7}}
					>
						{props.statusLabelFinished}
					</FinishedLabel>
				</Label>
			</LabelsWrap>

			<ControlsWrap key="status_wrap_review_wrap" style={{ gap: 12 }}>
				{props.delegateState !== DelegateStates.REVIEW && (
					<SpinnerWrap
						style={{
							height: 28,
							paddingRight: 4,
							pointerEvents: props.promptState === PromptStates.LOADING ? "auto" : "none",
							cursor: "pointer",
						}}
					>
						<Spinner
							theme={props.theme}
							state={props.delegateState}
							size={28}
							cancelLoading={props.cancelLoading}
							loadingProgress={props.statusProgress}
						/>
					</SpinnerWrap>
				)}

				{isReviewing && (
					<ButtonGroup
						style={{
							gap: 12,
						}}
					>
						<LabelButton
							label="Try again"
							theme={props.theme}
							height={28}
							width={89}
							fontSize={14}
							backgroundColor={props.theme.colors.t2}
							labelColor={props.theme.colors.t8}
							borderRadius={8}
							onTap={() => {
								props.tryAgain();
							}}
							style={{ pointerEvents: "auto" }}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.05 }}
						/>

						<LabelButton
							label="Keep"
							theme={props.theme}
							height={28}
							width={89}
							fontSize={14}
							backgroundColor={props.theme.colors.t2}
							labelColor={props.theme.colors.t8}
							borderRadius={8}
							onTap={() => {
								props.accept();
							}}
							style={{ pointerEvents: "auto" }}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1}}
							transition={{ delay: 0.15 }}
						/>
					</ButtonGroup>
				)}
			</ControlsWrap>
		</Wrap>
	);
};

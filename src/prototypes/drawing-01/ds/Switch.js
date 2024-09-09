import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { transitions } from "./Transitions";

const Control = styled(motion.div)`
	position: relative;=
`;

const Track = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const TrackActive = styled(Track)``;

const Thumb = styled(motion.div)`
	position: absolute;
`;

const ThumbActive = styled(Track)``;

export const Switch = props => {
	const transition = {
		ease: "easeInOut",
		duration: 0.3,
	};

	let trackHeight = 20;
    let trackWidth = 40;
	let trackRadius = 4;
    let handleRadius = 4;
    let margin = 2;
    if (props.isSmall) {
        trackHeight = 12;
        trackWidth = 24;
        handleRadius = 2;
    }
    const thumbSize = trackHeight - margin - margin;

	return (
		<Control
			style={{
				width: trackWidth,
				height: trackHeight,
				borderRadius: trackRadius,
				overflow: "hidden",
			}}
		>
			<Track
				style={{
					backgroundColor: props.theme.colors.controls.switch.trackOff,
					borderRadius: trackRadius,
				}}
			/>
			<TrackActive
				style={{
					backgroundColor: props.theme.colors.controls.switch.trackOn,
					borderRadius: trackRadius,
				}}
				animate={{
					x: props.isOn ? 0 : 0,
                    opacity: props.isOn ? 1 : 0,
				}}
				transition={transition}
                initial={false}
			/>
			<Thumb
				style={{
					backgroundColor: props.theme.colors.controls.switch.thumbOff,
					borderRadius: handleRadius,
					width: thumbSize,
					height: thumbSize,
					top: margin,
					left: margin,
                    overflow: "hidden",
				}}
				animate={{
					x: props.isOn ? trackWidth - thumbSize - margin - margin : 0,
				}}
				transition={transition}
                initial={false}
			>
				<ThumbActive
					style={{
						backgroundColor: props.theme.colors.controls.switch.thumbOn,
					}}
					animate={{
						opacity: props.isOn ? 1 : 0,
					}}
					transition={transition}
					initial={false}
				/>
			</Thumb>
		</Control>
	);
};

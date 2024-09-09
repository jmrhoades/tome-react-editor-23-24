import React, { useRef } from 'react';
import styled from "styled-components";
import { motion, transform } from "framer-motion";
import { MotionLabel } from "./motion-label";
import { theme } from "../theme/theme";

export const bpmRange = [20, 300];

export const BPMSlider = ({ bpm, ...props }) => {
    const dragConstraintsRef = useRef(null);
    const startYPercent = transform(bpm.get(), bpmRange, [0, 1]);

    const onDrag = (event, info) => {
        if (dragConstraintsRef.current) {
            let percent = (info.point.y - dragConstraintsRef.current.offsetTop) / dragConstraintsRef.current.offsetHeight;
            if (percent < 0) { percent = 0 };
            if (percent > 1) { percent = 1 };
            bpm.set(Math.round(transform(percent, [0, 1], bpmRange)));
        }
    }

    return (
        <ControlTrack ref={dragConstraintsRef}>
            <Control
                drag="y"
                dragConstraints={dragConstraintsRef}
                dragMomentum={false}
                onDrag={onDrag}
                startY={(window.innerHeight - (theme.controls.marginY * 2)) * startYPercent}
            >
                <StyledMotionLabel>{bpm}</StyledMotionLabel>
            </Control>
        </ControlTrack>
    )
}

const ControlTrack = styled(motion.div)`
    position: absolute;
    right: 20px;
    top: ${props => props.theme.controls.marginY}px;
    bottom: ${props => props.theme.controls.marginY}px;
    width: ${props => props.theme.controls.size}px;
`;

const Control = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(${props => props.startY}px);
    width: ${props => props.theme.controls.size}px;
    height: ${props => props.theme.controls.size}px;
    border-radius: 50%;
    border: ${props => props.theme.controls.borderSize}px solid white;
    cursor: grab;
    &:active {
        background-color: white;
    }
`;

const StyledMotionLabel = styled(MotionLabel)`
    color: white;
    font-size: 20px;
    line-height: 1;
    font-family: ${props => props.theme.typography.fonts.controls};
    position: absolute;
    right:54px;
    top: 8px;
`;
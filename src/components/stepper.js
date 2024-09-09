import React from 'react';
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { MotionLabel } from "./motion-label";

export const quantumRange = [2, 20];

export const Stepper = ({ quantum, ...props }) => {

    const onDecrement = (event, info) => {
        const q = quantum.get()
        if (q > quantumRange[0]) {
            quantum.set(q - 1)
        }
    }

    const onIncrement = (event, info) => {
        const q = quantum.get()
        if (q < quantumRange[1]) {
            quantum.set(q + 1)
        }
    }

    return (
        <Wrap>
            <MinusControl onTap={onDecrement} />
            <PlusControl onTap={onIncrement} />
            <StyledMotionLabel>{quantum}</StyledMotionLabel>
        </Wrap>
    )
}

const Wrap = styled(motion.div)`
    position: absolute;
    left: 20px;
    bottom: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 10px;
`;

const controlCSS = css`
    position: relative;
    width: ${props => props.theme.controls.size}px;
    height: ${props => props.theme.controls.size}px;
    border-radius: 50%;
    border: ${props => props.theme.controls.borderSize}px solid white;
    cursor: grab;
    &:active {
        background-color: white;
    }
`;

const MinusControl = styled(motion.div)`
    ${controlCSS};
    &:before{
        content:"";
        display: block;
        position: absolute;
        width: ${props => props.theme.controls.size / 2}px;
        height: ${props => props.theme.controls.borderSize}px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
    &:active&:before {
        background-color: black;
    }
`;


const PlusControl = styled(motion.div)`
    ${controlCSS};
    &:before{
        content:"";
        display: block;
        position: absolute;
        width: ${props => props.theme.controls.size / 2}px;
        height: ${props => props.theme.controls.borderSize}px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
    &:after{
        content:"";
        display: block;
        position: absolute;
        width: ${props => props.theme.controls.borderSize}px;
        height: ${props => props.theme.controls.size / 2}px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
    &:active&:before,
    &:active&:after {
        background-color: black;
    }
`;

const StyledMotionLabel = styled(MotionLabel)`
    color: white;
    font-size: 20px;
    line-height: ${props => props.theme.controls.size}px;
    font-family: ${props => props.theme.typography.fonts.controls};
    width: ${props => props.theme.controls.size}px;
    text-align: center;
`;
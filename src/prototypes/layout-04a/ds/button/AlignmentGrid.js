import React from "react";
import styled from "styled-components";

import { Icon } from "../Icon";

export const AlignmentGrid = props => {
	const { onTap = undefined, direction } = props;
	return (
		<Wrap style={{}}>
			{options.map((o, i) => (
				<Option key={o} value={o} onTap={onTap} active={i === 0} direction={direction} />
			))}
		</Wrap>
	);
};

const Wrap = styled.section`
	aspect-ratio: 1;
	/* width: 180px; */
	/* border: 1px solid var(--t2); */
	background-color: var(--t2);

	border-radius: var(--button-border-radius);
    padding: 2px;
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	grid-template-columns: repeat(3, 1fr);
	overflow: clip;
`;

const Option = props => {
	const { onTap = undefined, value, active = undefined, direction } = props;
	return (
		<OptionBtn
			onPointerDownCapture={e => {
				onTap(value);
				e.stopPropagation();
			}}
			style={{
				"--background-color": active ? "var(--t0)" : "var(--t0)",
				"--background-color-hover": active ? "var(--t0)" : "var(--t2)",
				"--color": active ? "var(--t9)" : "var(--t7)",
			}}
		>
			{!active && <Dot />}
			{active && <Bars type={value} direction={direction} />}
		</OptionBtn>
	);
};

const OptionBtn = styled.button`
	/* border-radius: 0; */
	/* padding: var(--button-padding); */
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

const Dot = styled.span`
	display: block;
	width: 3px;
	height: 3px;
	border-radius: 3px;
	background-color: var(--t5);
`;

const Bars = props => {
	const sizeL1 = "13px";
	const sizeL2 = "16px";
	const sizeL3 = "10px";
	const sizeS = "1.5px";
	const gap = "4px";
	const borderRadius = "1px";
	const background = "var(--t9)";
	const { type } = props;
	return (
		<BarsWrap
			style={{
				// flex: "1 1 0",
				// height: "100%",
				gap: gap,
				flexDirection: props.direction,
			}}
		>
			<div
				style={{
					width: props.direction === "horizontal" ? sizeS : sizeL1,
					height: props.direction === "horizontal" ? sizeL1 : sizeS,
					borderRadius: borderRadius,
					background: background,
				}}
			/>
			<div
				style={{
					width: props.direction === "horizontal" ? sizeS : sizeL2,
					height: props.direction === "horizontal" ? sizeL2 : sizeS,
					borderRadius: borderRadius,
					background: background,
				}}
			/>
			<div
				style={{
					width: props.direction === "horizontal" ? sizeS : sizeL3,
					height: props.direction === "horizontal" ? sizeL3 : sizeS,
					borderRadius: borderRadius,
					background: background,
				}}
			/>
		</BarsWrap>
	);
};

const BarsWrap = styled.span`
	display: flex;

	/* align-items: start; */
	/* justify-content: start; */
`;

// x,y
// left, top ->
// left, middle ->
// left, bottom ->

const options = [
	"start-start",
	"center-start",
	"end-start",
	"start-center",
	"center-center",
	"end-center",
	"start-end",
	"center-end",
	"end-end",
];

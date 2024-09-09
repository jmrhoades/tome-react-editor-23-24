import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export const SegmentedControl = props => {
	const { options, value, submit = v => {}, hud } = props;

	return (
		<Wrap>
			{options.map(o => (
				<SegmentedItem key={o.id} active={value === o.value} submit={submit} info={o} hud={hud}>
					{o.icon && <Icon name={o.icon} size={20} />}
					{!o.icon && o.label}
				</SegmentedItem>
			))}
		</Wrap>
	);
};

const Wrap = styled.section`
	display: flex;
	position: relative;
`;

export const SegmentedItem = props => {
	return (
		<Label
			style={{
				"--color": props.active ? "var(--t9)" : props.hud ? "var(--t6)" : "var(--t7)",
				"--color-hover": props.hud || props.active ? "var(--t9)" : "var(--t7)",
				"--background-color": props.hud ? "var(--t0)" : props.active ? "var(--t4)" : "var(--t2)",
			}}
			onPointerDownCapture={
				props.submit
					? e => {
							props.submit(props.info.value);
							e.stopPropagation();
					  }
					: undefined
			}
		>
			{props.children}
			<Input type="radio" defaultChecked={props.active} />
		</Label>
	);
};

const Label = styled.label`
	display: flex;
	flex: 1 1 0;
	line-height: 20px;
	padding: var(--button-padding);
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	background-color: var(--background-color);
	color: var(--color);
	&:hover {
		color: var(--color-hover);
		transition: none;
	}
	&:first-child {
		border-top-left-radius: var(--button-border-radius);
		border-bottom-left-radius: var(--button-border-radius);
	}
	&:last-child {
		border-top-right-radius: var(--button-border-radius);
		border-bottom-right-radius: var(--button-border-radius);
	}
	&:checked {
		background-color: var(--t4);
	}
`;

const Input = styled.input`
	position: absolute !important;
	height: 1px;
	width: 1px;
	overflow: hidden;
	clip: rect(1px, 1px, 1px, 1px);
	white-space: nowrap;
`;

import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export const SegmentedControl = props => {
	const { options, value, submit = v => {}, hud } = props;
	const [hoverIndex, setHoverIndex] = React.useState(null);
	const activeIndex = options.findIndex(o => (value + "").trim() === (o.value + "").trim());

	return (
		<Wrap>
			{options.map((o, i) => (
				<SegmentedItem
					key={o.id}
					active={(value + "").trim() === (o.value + "").trim()}
					activeIndex={activeIndex}
					submit={submit}
					info={o}
					hud={hud}
					options={options}
					i={i}
					value={value}
					hoverIndex={hoverIndex}
					setHoverIndex={setHoverIndex}
				>
					{o.icon && <Icon name={o.icon} size={20} />}
					{o.sizeLabel && (
						<span style={{ display: "inline-block", textAlign: "center", width: "34px" }}>{o.sizeLabel}</span>
					)}
					{!o.icon && !o.sizeLabel && o.label}
				</SegmentedItem>
			))}
		</Wrap>
	);
};

const Wrap = styled.section`
	display: flex;
	position: relative;
	box-shadow: var(--segmented-component-stroke);
	border-radius: var(--button-border-radius);
	background-color: var(--segmented-component-background);
`;

export const SegmentedItem = props => {
	const { i, options, value, info } = props;
	let className = "sep";
	if (i === 0) {
		className = "";
	} else {
		if (value === info.value) {
			className = "";
		} else if (value === options[i - 1].value) {
			className = "";
		}
	}
	if (props.hoverIndex === i) className = "";
	if (i > 0 && props.hoverIndex === i - 1) className = "";
	if (props.active) className = "";
	if (i > 0 && props.activeIndex === i - 1) className = "";

	return (
		<Label
			className={className}
			onPointerEnter={e => {
				props.setHoverIndex(i);
			}}
			onPointerLeave={e => {
				props.setHoverIndex(null);
			}}
			style={{
				"--color": props.active ? "var(--t9)" : props.hud ? "var(--t6)" : "var(--t7)",
				"--color-hover": props.hud || props.active ? "var(--t9)" : "var(--t7)",
				"--background-color": props.hud
					? props.active
						? "var(--t2)"
						: "var(--t0)"
					: props.active
					? "var(--segmented-background-active)"
					: "var(--segmented-background-default)",
				"--background-color-hover": props.active
					? "var(--segmented-background-active)"
					: "var(--segmented-background-hover)",
				//borderRadius: props.active ? "var(--button-border-radius)" : undefined,
				//borderRadius: "var(--button-border-radius)",
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
	position: relative;
	display: flex;
	flex-basis: 28px;
	flex-shrink: 0;
	flex-grow: 1;
	/* min-width: 28px; */

	line-height: 20px;
	font-family: var(--ui-family);
	font-size: var(--ui-font-size);

	padding: var(--button-padding);
	padding-left: 8px;
	padding-right: 8px;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	background-color: var(--background-color);
	color: var(--color);
	//transition: all 0.2s ease-in-out;
	&:hover {
		color: var(--color-hover);
		background-color: var(--background-color-hover);
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

	&:after {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateX(-50%) translateY(-50%);
		width: 1px;
		height: 12px;
		background-color: var(--segmented-component-separator-color);
		border-radius: 1px;
		opacity: 0;
		//transition: all 0.2s ease-in-out;
	}

	&.sep:after {
		opacity: 1;
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

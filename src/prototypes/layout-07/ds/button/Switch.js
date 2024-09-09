import React from "react";
import styled from "styled-components";

export const Switch = props => {
	const { on = undefined, onTap = undefined, small = undefined } = props;
	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--width": small ? "21px" : "40px",
				"--height": small ? "12px" : "20px",
				"--padding": small ? "2px" : "3px",
				"--border-radius": small ? "4px" : "7px",

				"--knob-width": small ? "8px" : "18px",
				"--knob-height": small ? "8px" : "14px",
				"--knob-border-radius": small ? "2px" : "4px",

				"--background-color": on ? "var(--tome-brand-accent-20)" : "var(--t2)",
				"--color": on ? "var(--accent)" : "var(--t5)",
				"--on": on ? "flex-end" : "flex-start",
				"--knob-x": on ? (small ? "9px" : "16px") : "0",
			}}
		>
			<Knob />
		</ButtonWrap>
	);
};

const ButtonWrap = styled.button`
	width: var(--width);
	height: var(--height);
	border-radius: var(--border-radius);
	padding: var(--padding);

	background-color: var(--background-color);
	//justify-content: var(--on);
	justify-content: flex-start;
	transition: all 0.3s ease;
`;

const Knob = styled.span`
	width: var(--knob-width);
	height: var(--knob-height);
	border-radius: var(--knob-border-radius);

	background-color: var(--color);
	transform: translateX(var(--knob-x));
	transition: all 0.3s ease;
`;

export const IconSwitch = props => {
	const { on = undefined, onTap = undefined } = props;
	return (
		<IconButtonWrap
			onPointerDownCapture={onTap}
			style={{
				"--width": "19px",
				"--height": "12px",
				"--padding": "2px",
				"--border-radius": "6px",

				"--knob-width": on ? "6px" : "5px",
				"--knob-height": on ? "6px" : "5px",
				"--knob-border-radius": "3px",

				"--background-color": on ? "var(--t9)" : "transparent",
				"--border-color": on ? "transparent" : "var(--t7)",
				"--color": on ? "var(--panel-background-color)" : "var(--t7)",
				"--on": on ? "flex-end" : "flex-start",
				"--knob-x": on ? "7px" : "0",
			}}
		>
			<IconKnob />
		</IconButtonWrap>
	);
};

const IconButtonWrap = styled.button`
	width: var(--width);
	height: var(--height);
	padding: var(--padding);
	background-color: var(--background-color);
	border-radius: var(--border-radius);
	border-color: var(--border-color);
	border-width: 1.5px;
	border-style: solid;

	justify-content: flex-start;
	transition: all 0.3s ease;
`;

const IconKnob = styled.span`
	width: var(--knob-width);
	height: var(--knob-height);
	border-radius: var(--knob-border-radius);

	background-color: var(--color);
	transform: translateX(var(--knob-x));
	transition: all 0.3s ease;
`;

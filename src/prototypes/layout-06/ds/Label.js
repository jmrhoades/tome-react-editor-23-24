import React from "react";
import styled from "styled-components";

export const Label = props => {
	let El = VerticalStack;
	if (props.type === "rowCentered") {
		El = HorizontalLabelCentered;
	}
	if (props.type === "rowHugControl") {
		El = HorizontalHugControl;
	}
	if (props.type === "horizontal") {
		El = Row;
	}
	if (props.type === "RowFlex") {
		El = RowFlex;
	}

	if (props.type === "RowHugControlRightAligned") {
		El = RowHugControlRightAligned;
	}

	return (
		<El
			onPointerDownCapture={props.onTap}
			style={{
				fontSize: props.small ? "var(--label-small-font-size)" : "var(--ui-font-size)",
				lineHeight: props.small ? "var(--label-small-line-height)" : "var(--ui-line-height)",
				color: props.hud ? "var(--t9)" : props.small ? "var(--t6)" : undefined,
				...props.style,
				opacity: props.disabled ? 0.4 : 1,
				pointerEvents: props.disabled ? "none" : "auto",
			}}
		>
			{props.children}
		</El>
	);
};

const LabelBase = styled.label`
	display: grid;
	gap: var(--label-field-gap);
	min-height: 28px;
`;

const Row = styled(LabelBase)`
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	align-items: center;
`;

const RowFlex = styled(LabelBase)`
	grid-auto-flow: column;
	align-items: center;
`;

const VerticalStack = styled(LabelBase)`
	grid-auto-flow: row;
	grid-auto-rows: auto auto;
`;

const HorizontalHugControl = styled(LabelBase)`
	grid-template-columns: 1fr auto;
	align-items: center;
	& input {
		max-width: 48px;
	}

	/* font-size: var(--panel-field-label-font-size); */
	/* line-height: var(--panel-field-label-line-height); */
`;

const RowHugControlRightAligned = styled(LabelBase)`
	grid-template-columns: 1fr auto;
	align-items: center;
	justify-items: end;
	& input {
		max-width: 48px;
	}

	/* font-size: var(--panel-field-label-font-size); */
	/* line-height: var(--panel-field-label-line-height); */
`;

const HorizontalLabelCentered = styled(LabelBase)`
	grid-template-columns: var(--field-label-min-width) 1fr;
	align-items: center;
	text-align: center;

	/* font-size: var(--panel-field-label-font-size); */
	/* line-height: var(--panel-field-label-line-height); */
`;

export const DropDownLabel = styled.span`
	font-size: var(--label-small-font-size);
	line-height: var(--label-small-line-height);
	color: var(--t6);
`;

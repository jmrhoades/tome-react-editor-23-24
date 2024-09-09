import React from "react";
import styled from "styled-components";

export const Section = props => {
	let El = Row;

	if (props.type === "Column") {
		El = Column;
	}
	if (props.type === "EvenColumn") {
		El = EvenColumn;
	}
	if (props.type === "Grid_2x1") {
		El = Grid_2x1;
	}
	if (props.type === "Grid_2x2") {
		El = Grid_2x2;
	}
	if (props.type === "Grid_2x3") {
		El = Grid_2x3;
	}
	if (props.type === "Auto_48") {
		El = Auto_48;
	}
	if (props.type === "HorizontalHugControl") {
		El = HorizontalHugControl;
	}
	if (props.type === "Grid_3xAuto") {
		El = Grid_3xAuto;
	}
	if (props.type === "Grid_Size") {
		El = Grid_Size;
	}

	if (props.type === "Flex") {
		El = Flex;
	}

	if (props.type === "FlexVertical") {
		El = FlexVertical;
	}
	

	return <El style={{ ...props.style }}>{props.children}</El>;
};

const Flex = styled.div`
	display: flex;
	font-size: var(--ui-font-size);
	line-height: var(--ui-line-height);
	gap: var(--panel-content-gap);
`;

const FlexVertical = styled.div`
	display: flex;
	flex-direction: column;
	font-size: var(--ui-font-size);
	line-height: var(--ui-line-height);
	gap: var(--panel-content-gap);
`;

const Base = styled.div`
	display: grid;
	font-size: var(--ui-font-size);
	line-height: var(--ui-line-height);

	/* justify-content: start; */
	/* align-content: start; */
	/* padding-bottom: var(--panel-content-gap); */
`;

const Column = styled(Base)`
	grid-auto-flow: column;
	grid-auto-columns: auto;
	gap: var(--panel-content-gap);
`;

const Row = styled(Base)`
	grid-auto-flow: row;
	grid-auto-rows: auto;
	gap: var(--panel-content-gap);
`;

const EvenColumn = styled(Base)`
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	gap: var(--panel-group-gap);
`;

const Auto_48 = styled(Base)`
	grid-template-columns: auto 48px;
	gap: var(--panel-group-gap);
`;

const Auto_72 = styled(Base)`
	grid-template-columns: auto 72px;
`;

const Grid_2x1 = styled(Base)`
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
`;

const Grid_3xAuto = styled(Base)`
	grid-template-columns: 1fr 1fr 48px;
	gap: var(--panel-group-gap);
`;

const Grid_Size = styled(Base)`
	grid-template-columns:  1fr 1fr 1fr;
	gap: var(--panel-group-gap);
	align-items: center;
`;

const Grid_2x2 = styled(Base)`
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

const Grid_2x3 = styled(Base)`
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
`;

const HorizontalHugControl = styled(Base)`
	grid-template-columns: 1fr auto;
	gap: var(--panel-group-gap);
	align-items: center;
	& input {
		max-width: 48px;
	}
`;

export const SectionSpacer = styled.div`
	height: var(--panel-content-gap);
`;

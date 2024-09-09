import React from "react";
import styled from "styled-components";

export const Section = props => {
	let El = Column;
	if (props.type === "Row") {
		El = Row;
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

	return <El style={{ ...props.style }}>{props.children}</El>;
};

const Base = styled.div`
	display: grid;
	gap: var(--panel-content-gap);
	/* justify-content: start; */
	/* align-content: start; */
	/* padding-bottom: var(--panel-content-gap); */
`;

const Column = styled(Base)`
	grid-auto-flow: column;
	grid-auto-columns: auto;
`;

const Row = styled(Base)`
	grid-auto-flow: row;
	grid-auto-rows: auto;
`;

const EvenColumn = styled(Base)`
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
`;

const Auto_48 = styled(Base)`
	grid-template-columns: auto 56px;
`;

const Auto_72 = styled(Base)`
	grid-template-columns: auto 72px;
`;

const Grid_2x1 = styled(Base)`
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
`;

const Grid_2x2 = styled(Base)`
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

const Grid_2x3 = styled(Base)`
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
`;

export const SectionSpacer = styled.div`
	height: var(--panel-content-gap);
`;

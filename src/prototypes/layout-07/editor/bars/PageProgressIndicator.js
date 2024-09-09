import React from "react";
import styled from "styled-components";

import { IconButton } from "../../ds/button/IconButton";
import { menus } from "../popovers/menus/menus";
import { EditorContext } from "../EditorContext";
import { Anchor, PopoverContext } from "../popovers/PopoverContext";
import { LabelButton } from "../../ds/button/LabelButton";

export const PageProgressIndicator = props => {
	const { currentIndex, count } = props;

	const elements = [];
	for (let i = 0; i < count; i++) {
		elements.push(<Indicator key={i} i={i} currentIndex={currentIndex} count={count} />);
	}

	return (
		<Wrap
			style={{
				gap: count <= 15 ? "3px" : "0px",
			}}
		>
			{elements}
		</Wrap>
	);
};

export const Indicator = props => {
	const { currentIndex, count, i } = props;

	return (
		<IndicatorWrap>
			<Line style={{ background: currentIndex <= i - 1 ? "var(--t5)" : "var(--t8)", borderRadius: count <= 15 ? "2px" : "0px", }} />
		</IndicatorWrap>
	);
};

const Wrap = styled.div`
	display: flex;
	//grid-template-columns: 1fr 1fr 1fr;
	//gap: 3px;
`;
const IndicatorWrap = styled.div`
	display: flex;
	width: 100%;
	height: 32px;
	align-items: center;
	cursor: pointer;
`;

const Line = styled.div`
	height: 2px;
	border-radius: 2px;
	width: 100%;
`;

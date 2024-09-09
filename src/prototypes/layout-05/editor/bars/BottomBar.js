import React from "react";
import styled from "styled-components";
import { LabelButton } from "../../ds/button/LabelButton";
import { IconButton } from "../../ds/button/IconButton";
import { Icon } from "../../ds/Icon";
export const BottomBar = ({ tile }) => {
	return (
		<Wrap id="bottombar">
			<Left>
				<LabelButton large>
					<Icon name={"Add"} />
					Add page
				</LabelButton>
			</Left>
			<Right>
				<IconButton iconName="Help" href="/" />
			</Right>
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	top: calc(100vh - 56px);
	left: 0;
	width: 100%;
	height: 56px;
	padding-left: 12px;
	padding-right: 12px;

	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Right = styled.div`
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 8px;
`;

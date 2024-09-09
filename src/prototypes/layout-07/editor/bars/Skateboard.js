import React from "react";
import styled from "styled-components";
import { LabelButton } from "../../ds/button/LabelButton";
import { IconButton } from "../../ds/button/IconButton";
import { Icon } from "../../ds/Icon";
export const Skateboard = ({ tile }) => {
	return (
		<Wrap id="promptbar" onContextMenu={e => {
			e.preventDefault();
		}}>
			<Left></Left>
			<Right>
				<svg width="21" height="10" viewBox="0 0 21 10" style={{ fill: "var(--t7)" }}>
					<path d="M2.34082 10C3.89638 10 4.39638 9.02778 4.39638 7.86111V6.70833H5.92415V7.86111C5.92415 9.02778 6.42415 10 7.97971 10C9.27138 10 10.1047 9.18056 10.1047 7.90278C10.1047 6.55556 9.29915 5.76389 7.71582 5.76389H6.89638V4.23611H7.71582C9.29915 4.23611 10.1047 3.44444 10.1047 2.09722C10.1047 0.819445 9.27138 0 7.97971 0C6.42415 0 5.92415 0.972222 5.92415 2.13889V3.29167H4.39638V2.13889C4.39638 0.972222 3.89638 0 2.34082 0C1.04915 0 0.21582 0.819445 0.21582 2.09722C0.21582 3.44444 1.02138 4.23611 2.60471 4.23611H3.42415V5.76389H2.60471C1.02138 5.76389 0.21582 6.55556 0.21582 7.90278C0.21582 9.18056 1.04915 10 2.34082 10ZM6.89638 2.11111C6.89638 1.40278 7.25749 0.958333 7.97971 0.958333C8.63249 0.958333 9.1186 1.27778 9.1186 2.09722C9.1186 2.88889 8.70193 3.29167 7.71582 3.29167H6.89638V2.11111ZM2.60471 3.29167C1.6186 3.29167 1.20193 2.88889 1.20193 2.09722C1.20193 1.27778 1.68804 0.958333 2.34082 0.958333C3.06304 0.958333 3.42415 1.40278 3.42415 2.11111V3.29167H2.60471ZM4.39638 5.76389V4.23611H5.92415V5.76389H4.39638ZM2.34082 9.04167C1.68804 9.04167 1.20193 8.72222 1.20193 7.90278C1.20193 7.11111 1.6186 6.70833 2.60471 6.70833H3.42415V7.88889C3.42415 8.59722 3.06304 9.04167 2.34082 9.04167ZM6.89638 7.88889V6.70833H7.71582C8.70193 6.70833 9.1186 7.11111 9.1186 7.90278C9.1186 8.72222 8.63249 9.04167 7.97971 9.04167C7.25749 9.04167 6.89638 8.59722 6.89638 7.88889Z" />
					<path d="M13.9027 10V0.277778H15.1527V4.48611C15.2453 4.38426 15.3934 4.21296 15.5971 3.97222L18.8471 0.277778H20.3749L15.1527 6.13889V10H13.9027ZM19.3749 10L15.5138 5.34722L16.4027 4.51389L20.9999 10H19.3749Z" />
				</svg>
			</Right>
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	left: calc(50vw - calc(var(--skateboard-width) / 2));
	top: calc(100vh - var(--skateboard-height) - 20px);
	width: var(--skateboard-width);
	height: var(--skateboard-height);
	z-index: 999;

	padding: var(--skateboard-padding);
	border-radius: var(--skateboard-border-radius);

	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: var(--promptbar-background-color);
	box-shadow: var(--promptbar-stroke-and-shadow);
	backdrop-filter: saturate(180%) blur(20px);

	cursor: text;

	//transition: background-color 0.2s ease-in-out;
	&:hover {
		background-color: var(--promptbar-background-hover-color);
	}
`;

const Left = styled.div`
	width: 3px;
	height: 16px;
	border-radius: 1.5px;
	background-color: var(--t7);
`;

const Right = styled.div``;

import React from "react";
import styled from "styled-components";
import { LabelButton } from "../../ds/button/LabelButton";
import { IconButton } from "../../ds/button/IconButton";
import { Icon } from "../../ds/Icon";
export const PromptBar = ({ tile }) => {
	return (
		<Wrap id="promptbar">
			<Left>
				<Caret />
			</Left>
			<Right>
				<svg viewBox="0 0 21 10" width="21" height="10" fill="var(--promptbar-hint)">
					<path d="M2.125 10C3.68056 10 4.18056 9.02778 4.18056 7.86111V6.70833H5.70833V7.86111C5.70833 9.02778 6.20833 10 7.76389 10C9.05556 10 9.88889 9.18056 9.88889 7.90278C9.88889 6.55556 9.08333 5.76389 7.5 5.76389H6.68055V4.23611H7.5C9.08333 4.23611 9.88889 3.44444 9.88889 2.09722C9.88889 0.819445 9.05556 0 7.76389 0C6.20833 0 5.70833 0.972222 5.70833 2.13889V3.29167H4.18056V2.13889C4.18056 0.972222 3.68056 0 2.125 0C0.833333 0 0 0.819445 0 2.09722C0 3.44444 0.805556 4.23611 2.38889 4.23611H3.20833V5.76389H2.38889C0.805556 5.76389 0 6.55556 0 7.90278C0 9.18056 0.833333 10 2.125 10ZM6.68055 2.11111C6.68055 1.40278 7.04167 0.958333 7.76389 0.958333C8.41667 0.958333 8.90278 1.27778 8.90278 2.09722C8.90278 2.88889 8.48611 3.29167 7.5 3.29167H6.68055V2.11111ZM2.38889 3.29167C1.40278 3.29167 0.986111 2.88889 0.986111 2.09722C0.986111 1.27778 1.47222 0.958333 2.125 0.958333C2.84722 0.958333 3.20833 1.40278 3.20833 2.11111V3.29167H2.38889ZM4.18056 5.76389V4.23611H5.70833V5.76389H4.18056ZM2.125 9.04167C1.47222 9.04167 0.986111 8.72222 0.986111 7.90278C0.986111 7.11111 1.40278 6.70833 2.38889 6.70833H3.20833V7.88889C3.20833 8.59722 2.84722 9.04167 2.125 9.04167ZM6.68055 7.88889V6.70833H7.5C8.48611 6.70833 8.90278 7.11111 8.90278 7.90278C8.90278 8.72222 8.41667 9.04167 7.76389 9.04167C7.04167 9.04167 6.68055 8.59722 6.68055 7.88889Z" />
					<path d="M13.6868 10V0.277778H14.9368V4.48611C15.0294 4.38426 15.1776 4.21296 15.3813 3.97222L18.6313 0.277778H20.1591L14.9368 6.13889V10H13.6868ZM19.1591 10L15.298 5.34722L16.1868 4.51389L20.7841 10H19.1591Z" />
				</svg>
			</Right>
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	left: calc(50vw - calc(var(--prompt-width) / 2));
	top: calc(100vh - var(--prompt-height) - 28px);
	width: var(--prompt-width);
	height: var(--prompt-height);

	padding: var(--prompt-padding);
	border-radius: var(--prompt-border-radius);

	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;

	background-color: var(--promptbar-background-color);
	box-shadow: var(--promptbar-stroke-and-shadow);
    backdrop-filter: saturate(180%) blur(20px);
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

const Caret = styled.div`
	width: 3px;
	height: 16px;
	border-radius: 1.5px;
	background-color: var(--promptbar-static-cursor);
`;

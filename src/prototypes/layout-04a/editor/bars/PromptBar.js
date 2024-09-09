import React from "react";
import styled from "styled-components";
import { LabelButton } from "../../ds/button/LabelButton";
import { IconButton } from "../../ds/button/IconButton";
import { Icon } from "../../ds/Icon";
export const PromptBar = ({ tile }) => {
	return (
		<Wrap id="promptbar">
			<Left>What would you like to do?</Left>
			<Right>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8.48755 4.2627C8.48755 3.95204 8.73939 3.7002 9.05005 3.7002H12.425C13.6677 3.7002 14.675 4.70755 14.675 5.9502V9.60644C14.675 10.8491 13.6677 11.8564 12.425 11.8564H4.22054L6.35405 13.9899C6.57372 14.2096 6.57372 14.5658 6.35405 14.7854C6.13438 15.0051 5.77822 15.0051 5.55855 14.7854L2.4648 11.6917C2.24513 11.472 2.24513 11.1159 2.4648 10.8962L5.55855 7.80245C5.77822 7.58278 6.13438 7.58278 6.35405 7.80245C6.57372 8.02212 6.57372 8.37827 6.35405 8.59794L4.22054 10.7314H12.425C13.0464 10.7314 13.55 10.2278 13.55 9.60644V5.9502C13.55 5.32887 13.0464 4.8252 12.425 4.8252H9.05005C8.73939 4.8252 8.48755 4.57336 8.48755 4.2627Z"
						style={{ fill: "var(--t5)" }}
					/>
				</svg>
			</Right>
		</Wrap>
	);
};

const Wrap = styled.div`
	position: fixed;
	left: calc(50vw - calc(var(--prompt-width) / 2));
	top: calc(100vh - var(--prompt-height) - 20px);
	width: var(--prompt-width);
	height: var(--prompt-height);
	z-index: 999;

	padding: var(--prompt-padding);
	border-radius: var(--prompt-border-radius);

	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;

	background-color: var(--promptbar-background-color);
	box-shadow: var(--promptbar-stroke-and-shadow);
	backdrop-filter: saturate(180%) blur(20px);

	cursor: text;

	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: var(--promptbar-background-hover-color);
	}
`;

const Left = styled.div`
	display: flex;
	align-items: center;

	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px;
	color: var(--t6);
	
`;

const Right = styled.div`
	justify-self: end;
	display: flex;
	align-items: center;
`;

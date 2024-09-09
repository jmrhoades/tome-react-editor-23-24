import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export const MenuItem = props => {
	const { label = "Label", onTap = undefined, checked = false, disabled = false, leadingIcon } = props;
	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			style={{
				pointerEvents: disabled ? "none" : "auto",
				opacity: disabled ? 0.25 : 1,
			}}
		>
			<LabelWrap>
				{leadingIcon && (
					<Leading>
						<Icon name={leadingIcon} size={16} />
					</Leading>
				)}
				{label}
			</LabelWrap>

			<Trailing>{checked && <Icon name="Checkmark" size={16} />}</Trailing>
		</ButtonWrap>
	);
};

const ButtonWrap = styled.button`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	white-space: nowrap;
	padding: var(--menu-item-padding);
	padding-right: var(--menu-item-padding-right);
	color: var(--menu-item-color);
	&:hover {
		background-color: var(--accent);
		color: var(--menu-item-color-hover);
	}
`;

const LabelWrap = styled.span`
	display: flex;
	gap: var(--menu-item-gap);
	align-items: center;
`;

const Leading = styled.span``;

const Trailing = styled.span`
	min-width: 40px;
	display: flex;
	justify-content: flex-end;
`;

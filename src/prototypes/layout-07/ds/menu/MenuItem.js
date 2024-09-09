import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export const menuItemTypes = {
	BACK: "back",
	UP: "up",
	ICON: "icon",
	LABEL: "label",
	COLOR: "color",
	NUMBER_INPUT: "numberInput",
};

export const MenuItem = props => {
	const {
		label = "Label",
		onTap = undefined,
		checked = false,
		flyout = false,
		active = false,
		disabled = false,
		leadingIcon,
		shortcut,
		destructive = false,
		onPointerEnter = undefined,
	} = props;
	let className = "";
	if (disabled) className += "disabled ";
	if (destructive) className += "destructive ";
	if (active) className += "active ";
	if (flyout) className += "flyout ";

	return (
		<ButtonWrap
			onPointerDownCapture={onTap}
			onContextMenu={e => {
				e.preventDefault();
				e.stopPropagation();
			}}
			className={className}
			style={{
				pointerEvents: disabled ? "none" : "auto",
			}}
			onPointerEnter={onPointerEnter}
		>
			<LeadingWrap>
				{props.children && <Leading style={{paddingRight: "4px"}}>{props.children}</Leading>}

				{leadingIcon && (
					<Leading>
						<Icon name={leadingIcon} size={16} />
					</Leading>
				)}
				<Label
					style={{
						opacity: props.disabledLabel ? 0.3 : 1,
					}}
				>
					{label}
				</Label>
			</LeadingWrap>

			<Trailing>
				{checked && <Icon name="Checkmark" size={16} />}
				{flyout && <Icon name="ChevronRight" size={16} />}
				{shortcut && shortcut.length > 0 && (
					<Shortcuts className={"shortcuts"}>
						{shortcut.map(o => (
							<Shortcut key={o}>{o}</Shortcut>
						))}
					</Shortcuts>
				)}
			</Trailing>
		</ButtonWrap>
	);
};

const ButtonWrap = styled.button`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	white-space: nowrap;
	padding-top: var(--menu-item-padding-vertical);
	padding-bottom: var(--menu-item-padding-vertical);
	padding-left: var(--menu-item-padding-horizontal);
	padding-right: var(--menu-item-padding-horizontal);
	color: var(--menu-item-color);
	min-height: 28px;
	&:hover {
		background-color: var(--menu-item-background-color-hover);
		color: var(--menu-item-color-hover);
	}
	&.active {
		background-color: var(--menu-item-background-color-hover);
		color: var(--menu-item-color-hover);
	}
	&.destructive {
		color: var(--core-red);
	}
	&.destructive:hover {
		background-color: var(--core-red);
		color: var(--white);
	}
	&.destructive:hover .shortcuts {
		color: var(--white);
	}
	&.disabled {
		color: var(---menu-item-color-disabled);
	}
	&.disabled .shortcuts {
		color: var(---menu-item-color-disabled);
	}
`;

const LeadingWrap = styled.span`
	display: flex;
	gap: var(--menu-item-gap);
	align-items: center;
`;

const Label = styled.span``;

const Leading = styled.span``;

const Trailing = styled.span`
	min-width: 40px;
	display: flex;
	justify-content: flex-end;
`;

const Shortcuts = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
	color: var(--t7);
`;

const Shortcut = styled.div``;

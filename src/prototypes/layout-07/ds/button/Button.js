import React from "react";
import styled from "styled-components";
import { PopoverContext } from "../../editor/popovers/PopoverContext";

export const Button = ({
	onTap = undefined,
	active = false,
	small,
	hud,
	disabled,
	style,
	tooltip,
	tooltipShortcut,
	tooltipHideOnClick = true,
	children,
}) => {
	let El = ButtonBase;

	const { showTooltip, hideTooltip } = React.useContext(PopoverContext);
	const ref = React.useRef(null);

	return (
		<El
			ref={ref}
			className={active ? "active" : undefined}
			onPointerDownCapture={
				onTap
					? e => {
							onTap();
							if (tooltipHideOnClick) {
								hideTooltip();
							}
							e.stopPropagation();
					  }
					: undefined
			}
			onPointerEnter={
				tooltip
					? e =>
							showTooltip({
								event: e,
								anchorRef: ref,
								content: tooltip,
								shortcut: tooltipShortcut,
							})
					: undefined
			}
			onPointerLeave={tooltip ? e => hideTooltip() : undefined}
			style={{
				fontSize: small ? "var(--label-small-font-size)" : "var(--ui-font-size)",
				lineHeight: small ? "var(--label-small-line-height)" : "var(--ui-line-height)",
				color: hud ? "var(--t9)" : small ? "var(--t6)" : undefined,
				...style,
				opacity: disabled ? 0.4 : 1,
				pointerEvents: disabled ? "none" : "auto",
			}}
		>
			{children}
		</El>
	);
};

const ButtonBase = styled.button`
	background-color: var(--ui-button-background-default);
	border-radius: var(--button-border-radius);
	color: var(--t7);
	&:hover {
		background-color: var(--ui-button-background-hover);
	}
	&.active {
		background-color: var(--ui-button-background-active);
		color: var(--t9);
	}
`;

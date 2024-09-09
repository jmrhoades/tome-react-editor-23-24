import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Button } from "../styled-components";
import { Icon } from "../Icon";
import { PopoverContext } from "../../editor/popovers/PopoverContext";

export const IconButton = props => {
	const { showTooltip, hideTooltip } = React.useContext(PopoverContext);
	const ref = React.useRef(null);

	const {
		iconName = "Preferences",
		iconSize = 24,
		color,
		padding,
		onTap,
		active,
		href,
		tooltip,
		tooltipShortcut,
		tooltipAnchor,
		style,
	} = props;
	return (
		<ButtonWrap
			ref={ref}
			as={href ? "a" : undefined}
			href={href}
			onPointerDownCapture={
				onTap
					? e => {
							onTap(e);
							hideTooltip();
							e.stopPropagation();
					  }
					: undefined
			}
			onPointerUpCapture={
				onTap
					? e => {
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
								anchor: tooltipAnchor,
								content: tooltip,
								shortcut: tooltipShortcut,
							})
					: undefined
			}
			onPointerLeave={tooltip ? e => hideTooltip() : undefined}
			style={{
				"--background-color": active ? "var(--t3)" : "var(--t0)",
				"--background-color-hover": active ? "var(--t3)" : "var(--t3)",
				"--color": active ? "var(--t9)" : color,
				"--button-padding": padding,
				...style,
			}}
		>
			<Icon name={iconName} size={iconSize} />
		</ButtonWrap>
	);
};

export const ButtonWrap = styled.button`
	display: inline-block;
	border-radius: var(--button-border-radius);
	padding: var(--button-padding);
	background-color: var(--background-color);
	color: var(--color);
	transition: var(--editor-hover-transition);
	&:hover {
		background-color: var(--background-color-hover);
		transition: none;
	}
`;

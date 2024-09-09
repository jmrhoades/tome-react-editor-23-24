import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const TooltipWrap = styled(motion.div)`
	position: absolute;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 8px;

	padding: 6px;
	border-radius: 6px;

	
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;

	white-space: nowrap;

	color: ${props => props.$theme.colors.tooltip.label};
	background: ${props => props.$theme.colors.tooltip.background};
	box-shadow: ${props => props.$theme.shadows.medium};

	pointer-events: none;
`;

const Label = styled(motion.div)``;

const Shortcuts = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 2px;
`;

const Shortcut = styled(motion.div)`
	flex: none;
	order: 0;
	flex-grow: 0;
	height: 16px;
	background: rgba(255, 255, 255, 0.08);
	border-radius: 2px;
	padding-left: 2px;
	padding-right: 2px;

	
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 16px;
	text-align: center;

	color: #ffffff;
`;

export const Tooltip = props => {
	const timerRef = React.useRef(null);
	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		clearTimeout(timerRef.current);
		if (props.visible) {
			timerRef.current = setTimeout(() => {
				setVisible(true);
			}, 1500);
		} else {
			setVisible(false);
		}
	}, [props.visible]);

	return (
		<TooltipWrap
			$theme={props.theme}
			animate={{
				opacity: visible ? 1 : 0,
			}}
			transition={{
				duration: visible ? 0.3 : 0,
			}}
			style={{
				top: "50%",
				y: "-50%",
				left: props.side === "left" ? -12 : 0,
				x: props.side === "left" ? "-100%" : 12,
			}}
		>
			<Label>{props.label}</Label>
			<Shortcuts>
				{props.shortcuts.map((s,i) => (
					<Shortcut key={"shortcut" + i}>{s}</Shortcut>
				))}
			</Shortcuts>
		</TooltipWrap>
	);
};

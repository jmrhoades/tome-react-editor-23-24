import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TooltipContext } from "./TooltipContext";
import { TomeContext } from "../tome/TomeContext";

export const TooltipWrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 8px;

	padding: 6px;
	padding-left: 8px;
	padding-right: 8px;

	border-radius: 6px;

	
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;

	/* white-space: nowrap; */

	color: ${props => props.$theme.colors.tooltip.label};
	background: ${props => props.$theme.colors.tooltip.background};
	box-shadow: ${props => props.$theme.shadows.medium};

	pointer-events: none;
	z-index: 1000;
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

	border-radius: 2px;
	padding-left: 2px;
	padding-right: 2px;

	
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	text-transform: uppercase;

	color: #ffffff;
`;

export const Tooltips = props => {
	const { currentPage } = React.useContext(TomeContext);

	const { tooltipInfo } = React.useContext(TooltipContext);

	const tooltipRef = React.useRef(null);

	const timer = React.useRef(0);

	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	const [visible, setVisible] = React.useState(false);

	const isString = typeof tooltipInfo.label === "string";

	React.useLayoutEffect(() => {
		//console.log(tooltipInfo)
		updatePosition();
		setVisible(tooltipInfo.show);
		/*
		console.log(tooltipInfo)
		clearTimeout(timer.current);
		if (tooltipInfo.show && !visible) {
			timer.current = setTimeout(updatePosition, 400);
		} else if (!tooltipInfo.show && visible) {
			setVisible(tooltipInfo.show);
		}
		*/
	}, [tooltipInfo]);

	

	const updatePosition = () => {
		//console.log("setPosition")

		if (tooltipRef.current && tooltipInfo.ref && tooltipInfo.ref.current) {
			let x = 0;
			let y = 0;
			const tooltipRect = tooltipRef.current.getBoundingClientRect();
			const buttonRect = tooltipInfo.ref.current.getBoundingClientRect();

			const bX = buttonRect.x;
			const bY = buttonRect.y;
			const bW = buttonRect.width;
			const bH = buttonRect.height;

			const tX = tooltipRect.x;
			const tY = tooltipRect.y;
			const tW = tooltipRect.width;
			const tH = tooltipRect.height;

			if (tooltipInfo.alignX === "middle") {
				x = bX + bW / 2 - tW / 2;
			}

			if (tooltipInfo.alignX === "trailing") {
				x = bX + bW + tooltipInfo.offsetX;
			}

			if (tooltipInfo.alignY === "leading") {
				y = bY - tH - tooltipInfo.offsetY;
			}

			if (tooltipInfo.alignY === "middle") {
				y = bY + bH / 2 - tH / 2;
			}

			setPosition({ x: x, y: y });
			setVisible(tooltipInfo.show);
		}
	};

	return (
		<TooltipWrap
			key={tooltipInfo.key}
			ref={tooltipRef}
			$theme={currentPage.theme}
			style={{
				x: position.x,
				y: position.y,
				maxWidth: 180,
				WebkitBackdropFilter: "blur(25px)",
				backdropFilter: "blur(25px)",
			}}
			initial={{ opacity: 0 }}
			animate={{
				opacity: visible ? 1 : 0,
			}}
			transition={{ duration: 0.1 }}
		>
			<Label>
				{isString && tooltipInfo.label}
				{!isString && (
					<>
						<div >{tooltipInfo.label[0]}</div>

						<div style={{ color: currentPage.theme.colors.tooltip.subtitle, paddingTop: 1 }}>{tooltipInfo.label[1]}</div>
					</>
				)}
			</Label>
			{tooltipInfo.shortcuts && (
				<Shortcuts>
					{tooltipInfo.shortcuts.map((s, i) => (
						<Shortcut
							key={"shortcut" + i}
							style={{
								backgroundColor: currentPage.theme.colors.t2,
							}}
						>
							{s}
						</Shortcut>
					))}
				</Shortcuts>
			)}
		</TooltipWrap>
	);
};

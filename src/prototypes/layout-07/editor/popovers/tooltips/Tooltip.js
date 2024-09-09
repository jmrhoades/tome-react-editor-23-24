import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { EditorContext } from "../../EditorContext";
import { Anchor, PopoverContext, positionMenu } from "../PopoverContext";

/*

Panels
Menus
Dropdowns
Tooltips
Toasts

*/

export const Tooltip = ({ info }) => {
	const { tooltip } = React.useContext(PopoverContext);

	return <>{tooltip && <TooltipView key={tooltip.id} tooltip={tooltip} />}</>;
};

export const TooltipView = ({ tooltip }) => {
	const anchorRect = tooltip.anchorRef.current.getBoundingClientRect();

	// x: center
	let left = anchorRect.left;
	let x = `calc(${anchorRect.width / 2}px - 50%)`;

	// y: top
	let top = anchorRect.top;
	let y = `calc(-100% - 6px)`;

	// left - center
	if (tooltip.anchor && tooltip.anchor === Anchor.left) {
		x = `calc(-100% - 8px)`;
		y = `calc(${anchorRect.height / 2}px - 50%)`;
	}

	// center - bottom
	if (tooltip.anchor && tooltip.anchor === Anchor.bottom) {
		top = anchorRect.top + anchorRect.height;
		y = 8;
	}

	// center - bottom
	if (tooltip.anchor && tooltip.anchor === Anchor["bottom-start"]) {
		left = anchorRect.left + anchorRect.width;
		x = "-100%";
		top = anchorRect.top + anchorRect.height;
		y = 8;
	}

	top += window.scrollY;

	//console.log("TOOOOOOLTIP", tooltip.shortcut[0])

	/*
	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue("max-content");

	React.useEffect(() => {
		const anchorRect = info.anchorEl.getBoundingClientRect();
		const menuRect = ref.current.getBoundingClientRect();
		const rect = positionMenu(anchorRect, menuRect);
		x.set(rect.x);
		y.set(rect.y);
		width.set(rect.width);
	}, [ref, info]);
    */

	return (
		<TooltipWrap
			// initial={{
			// 	opacity: 0,
			// }}
			// animate={{
			// 	opacity: 1,
			// 	transition: {
			// 		delay: 0.3,
			// 		duration: 0.1,
			// 	},
			// }}
			// exit={{
			// 	opacity: 0,
			// 	transition: {
			// 		duration: 0.1,
			// 	},
			// }}
			style={{
				left: left,
				top: top,
				x: x,
				y: y,
			}}
		>
			{tooltip.content}
			{tooltip.shortcut && tooltip.shortcut.length > 0 && (
				<Shortcuts>
					{tooltip.shortcut.map(o => (
						<Shortcut key={o}>{o}</Shortcut>
					))}
				</Shortcuts>
			)}
		</TooltipWrap>
	);
};

const TooltipWrap = styled(motion.div)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	gap: 8px;
	padding-left: 8px;
	padding-right: 8px;
	border-radius: 6px;
	height: 24px;

	color: var(--t9);
	background-color: var(--hud-background-color);
	box-shadow: var(--stroke-and-shadow);

	font-family: var(--ui-font-family);
	font-size: var(--ui-font-size-small);
	line-height: 1;

	white-space: nowrap;
`;

const Shortcuts = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
	color: var(--t7);
	/* margin-right: -2px; */
`;

const Shortcut = styled(motion.div)`
	/* width: 16px; */
	/* line-height: 16px; */
	/* flex-shrink: 0; */
	/* font-weight: 500; */
	/* display: flex;
    align-items: center;
    justify-content: center; */
	//background-color: rgba(255,255,255,0.08);
	/* border-radius: 2px; */
	//box-shadow: 0 0 0 1px rgba(255,255,255,0.08);
	/* text-align: center;
    color: var(--t7); */
`;

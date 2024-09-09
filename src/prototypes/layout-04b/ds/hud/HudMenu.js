import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Anchor, positionMenu } from "../../editor/EditorContext";

export const HudMenu = props => {
	const { anchorRef, tile } = props;
	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const updateSize = () => {
		if (ref.current) {
			const anchorRect = anchorRef.current.parentNode.getBoundingClientRect();
			const hudRect = ref.current.getBoundingClientRect();
			const rect = positionMenu(anchorRect, hudRect, { anchor: Anchor["bottom"], offset: 6, relative: true, matchWidth: false });
			x.set(rect.x);
			y.set(rect.y);
		}
	};

	React.useEffect(updateSize, [ref, tile]);

	return (
		<MenuWrap
			ref={ref}
			style={{
				x: x,
				y: y,
			}}
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.2,
			}}
		>
			{props.children}
		</MenuWrap>
	);
};

const MenuWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;

	display: flex;
    flex-direction: column;
	
	padding: var(--hud-padding);
	border-radius: var(--hud-border-radius);
	background-color: var(--hud-background-color);
	box-shadow: var(--stroke-and-shadow);
`;

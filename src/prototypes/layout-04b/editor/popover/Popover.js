import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { EditorContext, positionMenu } from "../EditorContext";

export const Popovers = ({ info }) => {
	const { popovers, togglePanel } = React.useContext(EditorContext);

	return (
		<>
			<AnimatePresence>
				{popovers.map(o => (
					<Popover key={o.id} info={o} togglePanel={togglePanel} />
				))}
			</AnimatePresence>
		</>
	);
};

export const Popover = ({ info, togglePanel }) => {
	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue("max-content");

	React.useLayoutEffect(() => {
		const anchorRect = info.anchorEl.getBoundingClientRect();
		const menuRect = ref.current.getBoundingClientRect();
		const rect = positionMenu(anchorRect, menuRect);
		x.set(rect.x);
		y.set(rect.y);
		width.set(rect.width);
	}, [ref, info]);

	return (
		<PopoverWrap
			id={info.id}
			ref={ref}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
			}}
			style={{
				left: x,
				top: y,
				width: width,
			}}
		>
			<info.type info={info} togglePanel={togglePanel} />
		</PopoverWrap>
	);
};
const PopoverWrap = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
`;

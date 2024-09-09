import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { positionMenu } from "../../editor/EditorContext";

export const Menu = props => {
	const menu = props.menu;
	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue("max-content");

	React.useLayoutEffect(() => {
		if (menu) {
			const anchorRect = menu.anchorEl.getBoundingClientRect();
			const menuRect = ref.current.getBoundingClientRect();
			const rect = positionMenu(anchorRect, menuRect);
			x.set(rect.x);
			y.set(rect.y);
			width.set(rect.width);
		}
	}, [ref, menu]);

	return (
		<>
			<AnimatePresence>
				{menu && (
					<MenuWrap
						id={menu.id}
						key={menu.id}
						ref={ref}
						exit={{
							opacity: 0,
						}}
						transition={{
							duration: 0.2,
						}}
						style={{
							x: x,
							y: y,
							width: width,
						}}
					>
						<menu.content menu={menu} tomeData={props.tomeData} />
					</MenuWrap>
				)}
			</AnimatePresence>
		</>
	);
};

const MenuWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;

	padding: var(--menu-padding);
	border-radius: var(--menu-border-radius);
	box-shadow: var(--menu-shadow);
	background-color: var(--menu-background-color);
`;

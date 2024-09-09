import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { positionMenu } from "../../editor/popovers/PopoverContext";

export const Menu = props => {
	const menu = props.menu;
	const ref = React.useRef();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue("max-content");

	React.useLayoutEffect(() => {
		if (menu) {
			// the button that opened the menu usually
			const anchorRect = menu.anchorEl.getBoundingClientRect(); 
			
			const menuRect = ref.current.getBoundingClientRect();
			
			const rect = positionMenu(anchorRect, menuRect, {
				anchor: menu.anchor,
				offset: menu.offset,
				point: menu.point,
			});
			x.set(rect.x);
			y.set(rect.y - window.scrollY);


			menu.menuRect = menuRect;
			menu.menuRect.x = x.get();
			menu.menuRect.y = y.get();
			//width.set(rect.width);
		}
	}, [ref, menu]);

	return (
		<>
			{/* <AnimatePresence> */}
			{menu && (
				<MenuWrap
					id={menu.id}
					key={menu.id}
					ref={ref}
					exit={{
						opacity: 0,
					}}
					transition={{
						duration: 0,
					}}
					style={{
						left: x,
						top: y,
						minWidth: menu.width,
					}}
				>
					<menu.content menu={menu} tomeData={props.tomeData} tile={menu.tile} />
				</MenuWrap>
			)}
			{/* </AnimatePresence> */}
		</>
	);
};

const MenuWrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;

	padding: var(--menu-padding);
	border-radius: var(--menu-border-radius);
	box-shadow: var(--menu-shadow);
	background-color: var(--menu-background-color);
	font-size: var(--ui-font-size);
	line-height: 1;
`;

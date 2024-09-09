import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../../tome/TomeContext";
import { Icon } from "../../../../ds/Icon";

const Wrap = styled(motion.div)``;

const Button = styled(motion.div)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const HoverBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const ClosePanelButton = props => {
	const { setSidePanelOpen, closeMenu } = useContext(TomeContext);

	const [isHovering, setIsHovering] = React.useState(false);

	return (
		<Wrap
			style={{
				width: 32,
				height: 40,
				position: "absolute",
				right: 4,
				top: 0,
				cursor: "pointer",
				//background: "red",
			}}
			onMouseDown={e => {
				e.stopPropagation();
			}}
			onTap={e => {
				setSidePanelOpen(false);
				closeMenu();
			}}
			whileTap={{
				scale: 0.95,
			}}
			onHoverStart={e => {
				setIsHovering(true);
				e.stopPropagation();
				//document.body.classList.remove("grab");
				//document.body.classList.add("point");
			}}
			onHoverEnd={e => {
				setIsHovering(false);
				e.stopPropagation();
				//document.body.classList.remove("point");
			}}
		>
			<Button
				style={{
					width: 24,
					height: 24,
					top: 8,
					left: 0,
				}}
			>
				<HoverBackground
					style={{
						borderRadius: 8,
						backgroundColor: props.theme.colors.t2,
					}}
					initial={false}
					animate={{
						opacity: isHovering ? 1 : 0,
					}}
					transition={{
						ease: "easeOut",
						duration: 0.2,
					}}
				/>
				<Icon
					name={"Close"}
					size={22}
					opacity={1}
					color={isHovering ? props.theme.colors.t6 : props.theme.colors.t5}
					transition={{
						ease: "easeOut",
						duration: 0.2,
					}}
				/>
			</Button>
		</Wrap>
	);
};

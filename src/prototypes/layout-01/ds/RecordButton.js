import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { recordLabelStyles } from "./Buttons";
import { Icon } from "../../../ds/Icon";

const Control = styled(motion.div)`
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: auto;
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const DefaultBackground = styled(SelectedBackground)``;
const HoverBackground = styled(SelectedBackground)``;

const Label = styled(motion.div)`
	position: relative;
`;

const Accessory = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const RecordButton = ({ theme, height = 28, borderRadius = 8 }) => {
	const [isHovering, setIsHovering] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<Control
			//initial={"default"}
			whileTap={{ scale: 0.975 }}
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			style={{
				height,
			}}
		>
			<DefaultBackground
				style={{
					background: theme.colors.t2,
					borderRadius,
				}}
			/>

			<HoverBackground
				style={{
					background: theme.colors.t1,
					borderRadius,
				}}
				animate={{
					opacity: isHovering || isFocused ? 1 : 0,
				}}
				transition={{ type: "tween", duration: 0.3 }}
			/>

			<Accessory
				style={{
					width: 12,
					height: 12,
                    marginRight: 8,
                    borderRadius: 6,
                    backgroundColor: "rgb(255, 52, 52)",
				}}
			>
				
			</Accessory>
			<Label
				style={{
					...recordLabelStyles,
					color: theme.colors.t8,
				}}
			>
				Record
			</Label>
		</Control>
	);
};

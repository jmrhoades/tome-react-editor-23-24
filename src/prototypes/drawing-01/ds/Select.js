import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { Icon } from "../../../ds/Icon";

const Control = styled(motion.div)`
	position: relative;

	display: flex;
	justify-content: space-between;
	align-items: center;
	pointer-events: auto;
`;

const IconLeft = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Label = styled(motion.div)`
	position: relative;
`;

const Accessory = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
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

const selectLabelStyles = {
	
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "12px",
	lineHeight: "16px",
};

export const Select = ({ theme, height = 28, borderRadius = 8, paddingX = 4, iconName = false, label = "Label" }) => {
	const [isHovering, setIsHovering] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<Control
			//initial={"default"}
			//whileHover={"hovering"}
			//whileTap={"pressing"}
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			style={{
				paddingLeft: 8,
				paddingRight: 4,
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

			{iconName && (
				<IconLeft
					style={{
						width: 28,
						height: 28,
						marginRight: 6,
					}}
				>
					<Icon name={iconName} opacity={1} size={18} color={theme.colors.t8} />
				</IconLeft>
			)}

			<Label
				style={{
					...selectLabelStyles,
					color: theme.colors.t8,
					width: "100%",
				}}
			>
				{label}
			</Label>
			<Accessory
				style={{
					width: 28,
					height: 28,
				}}
			>
				<svg width="10" height="10" fill="none">
					<path
						d="M8 3.5L5.46 6.547a.6.6 0 01-.921 0L1.999 3.5"
						stroke={theme.colors.t8}
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>
			</Accessory>
		</Control>
	);
};

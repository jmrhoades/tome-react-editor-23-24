import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Switch } from "../../ds/Switch";

const Wrap = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;

const Label = styled(motion.div)`
	pointer-events: none;
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: ${props => props.theme_color};
`;

export const LabeledSwitch = props => {
	const [isHovering, setIsHovering] = React.useState(false);
	const [isOn, setIsOn] = React.useState(props.isOn);

	return (
		<Wrap
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onTap={() => {
				setIsOn(!isOn);
				if (props.onTap) props.onTap(isOn);
			}}
		>
			{/* <SelectedBackground
				theme_color={props.theme.colors.t2}
				initial={{ opacity: 0 }}
				animate={{ opacity: props.active ? 1 : 0 }}
				whileHover={{ opacity: 1 }}
			/> */}

			<Label
				style={{  fontStyle: "normal", fontWeight: 400, fontSize: "11px", lineHeight: "14px" }}
				initial={false}
				animate={{ color: isHovering ? props.theme.colors.t75 : props.theme.colors.t7 }}
				transition={{
					type: "tween",
					duration: props.active ? 0.4 : 0.2,
				}}
			>
				{props.label}
			</Label>
            
            
			<motion.div animate={{ opacity: isHovering ? 1 : 1 }} initial={false}>
				<Switch theme={props.theme} isOn={props.isOn} isSmall={props.isSmall} />
			</motion.div>
            
		</Wrap>
	);
};

import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { Shape } from "./ShapeSVG";

import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { BlockType as DiagramBlockType } from "./_constants";
import { ShapeDiv } from "./ShapeDiv";
import { PropertyButton, PropertyButtonType } from "./PropertyButton";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

export const PropertiesLevel1 = props => {
	const onFillColorTap = () => {};

	return (
		<Wrap
			className="propertiesLevel1"
			style={{
				x: "-50%",
				y: "-100%",

				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: props.buttonGap,
				padding: props.containerPadding,
				borderRadius: props.containerRadius,

				backgroundColor: props.theme.formatBar.background,
				boxShadow: props.theme.formatBar.shadow,
			}}
		>
			<PropertyButton
				type={PropertyButtonType.FILL_COLOR}
				theme={props.theme}
				size={props.buttonSize}
				motionColor={props.params.fC}
				onTap={props.toggleFillColorMenu}
				active={props.level2 === "FillColor"}
			/>
			<PropertyButton type={PropertyButtonType.STROKE} theme={props.theme} size={props.buttonSize} />
			<PropertyButton type={PropertyButtonType.ICON} theme={props.theme} size={props.buttonSize} />
		</Wrap>
	);
};

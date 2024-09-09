import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { Shape } from "./ShapeSVG";

import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { BlockType as DiagramBlockType, fillColors } from "./_constants";
import { ShapeDiv } from "./ShapeDiv";
import { PropertyButton, PropertyButtonType } from "./PropertyButton";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

export const PropertiesLevel2 = props => {

	const onFillColorTap = (c) => {

		console.log("onFillColorTap", c)
		props.params.fC.set(c)
		props.params.fill.color = c;
	};

	return (
		<Wrap
			className="propertiesLevel2"
			style={{
				x: "-50%",
				y: "calc(-200% - 4px)",
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
			{props.level2 === "FillColor" && (
				<>
					{fillColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.COLOR}
							theme={props.theme}
							size={props.buttonSize}
							color={c.hex}
							colorType={c.type}
							onTap={e=>{onFillColorTap(c.hex)}}
						/>
					))}

					
				</>
			)}
		</Wrap>
	);
};

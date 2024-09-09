import React, { useContext, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { SectionTitle } from "../Panels";
import { Slider } from "../../ds/Slider";
import { SliderField } from "../../ds/Fields";

export const segmentType = {
	ICON: "icon",
	LABEL: "label",
};

const Group = styled(motion.div)`
	position: relative;
	display: grid;
	grid-template-columns:  1fr auto;
	grid-template-rows: repeat(1, 1fr);
	grid-column-gap: 6px;
	align-items: center;
`;

export const SliderInputGroup = props => {
	const labelMotionValue = useMotionValue("");
	return (
		<Group
			style={
				{
					//background: props.theme.colors.t2,
				}
			}
		>
		
			<Slider
				theme={props.theme}
				value={props.value}
				range={props.range}
				onValueUpdate={props.onValueUpdate}
				labelMotionValue={labelMotionValue}
			/>
				<SliderField
				theme={props.theme}
				value={props.value}
				range={props.range}
				onValueUpdate={props.onValueUpdate}
				labelMotionValue={labelMotionValue}
				unitLabel={"%"}
			/>
		</Group>
	);
};

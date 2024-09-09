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
	grid-template-columns: 52px  auto 1fr;
	grid-template-rows: repeat(1, 1fr);
	grid-column-gap: 6px;
	align-items: center;
`;


export const SliderFieldGroup = props => {
	

	const labelMotionValue = useMotionValue("");
	return (
		<Group
			style={
				{
					//background: props.theme.colors.t2,
				}
			}
		
		>
			<SectionTitle theme={props.theme}>
				{props.label}
			</SectionTitle>
			<SliderField theme={props.theme} value={props.value} range={props.range} onValueUpdate={props.onValueUpdate} labelMotionValue={labelMotionValue} />
			<Slider theme={props.theme} value={props.value} range={props.range} onValueUpdate={props.onValueUpdate} labelMotionValue={labelMotionValue} />
			
		</Group>
	);
};

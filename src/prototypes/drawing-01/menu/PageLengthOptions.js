import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { CREATE_TOME_LENGTH_OPTIONS } from "../prompt/PromptConstants";
import { PageLengthSlider } from "./PageLengthSlider";

const Wrap = styled(motion.div)`
	position: relative;
	padding: 12px;
	padding-top: 8px;

	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
`;

const Label = styled(motion.div)``;

const BottomLabels = styled(Label)`
	font-size: 11px;
	display: flex;
	justify-content: space-between;
`;

const TopDots = styled(Label)`
	display: flex;
	justify-content: space-between;	
`;

const Dot = styled(Label)`
	width: 4px;
	height: 4px;
	border-radius: 4px;
`;

const BLabel = styled(motion.div)``;

export const PageLengthOptions = props => {
	return (
		<Wrap>
			<Label
				style={{
					color: props.theme.colors.t7,
					marginBottom: 12,
					//display: "none",
				}}
			>
				Length
			</Label>
			
			<PageLengthSlider
				theme={props.theme}
				//value={tomeData.prompt.createTomePageLength}
				value={props.value}
				range={props.range}
				onMouseUp={props.onMouseUp}
			/>
			<BottomLabels
				style={{
					color: props.theme.colors.t7,
					marginTop: 2,
					display: "none",
					//fontFamily: props.theme.typography.fontFamilyMono,
					//fontSize: 12,
				}}
			>
				{/* <BLabel>XS</BLabel> */}

				{/* <BLabel>Short</BLabel>
                <BLabel>Medium</BLabel>
				<BLabel>Long</BLabel> */}

				<BLabel>3</BLabel>
				<BLabel>6</BLabel>
				<BLabel>10</BLabel>
				<BLabel>20+</BLabel>

				{/* <BLabel>XL</BLabel> */}
			</BottomLabels>
		</Wrap>
	);
};

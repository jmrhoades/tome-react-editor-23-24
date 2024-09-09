import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { colors } from "../../ds/Colors";
import { TomeContext } from "../../tome/TomeContext";
import { uniqueId } from "lodash";
import { Icon } from "../../../../ds/Icon";
import { transitions } from "../../../../ds/Transitions";

export const segmentType = {
	ICON: "icon",
	LABEL: "label",
};


const Wrap = styled(motion.div)`
	position: relative;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	column-gap: 2px;
	row-gap: 2px;
	height: 54px;
	border-radius: 6px;
	background: ${props => props.theme_background};
`;

const Item = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	& > * {
		position: relative;
	}
	&:hover {
		cursor: pointer;
	}
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	color: ${props => props.theme_color};
	pointer-events: none;
`;

const HoverBackground = styled(motion.div)`
	position: absolute;
	top: 4px;
	left: 4px;
	bottom: 4px;
	right: 4px;
	border-radius: 4px;
	background: ${props => props.theme_color};
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	background: ${props => props.theme_color};
    /* box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1); */
`;


export const SegmentedStack = props => {
	const { tomeData, setTomeData, selectedTile } = useContext(TomeContext);

	// const [selectedIndex, setSelectedIndex] = useState(0);
	//let selectedIndex = 0;
    //console.log(selectedTile)

    //alignmentX: alignmentX.LEFT,
    /*
	const data = [
		{
			type: segmentType.ICON,
			iconName: "AlignLeft",
			label: "Align Left",
			value: "left",
		},
		{
			type: segmentType.ICON,
			iconName: "AlignCenter",
			label: "Align Center",
			value: "center",
		},
		{
			type: segmentType.ICON,
			iconName: "AlignRight",
			label: "Align Right",
			value: "right",
		},
	];
    */

	return (
		<Wrap theme_background={colors.white08}>
			{props.data.map((item, i) => (
				<Item
					key={props.id + "_segment_" + i}
					onTap={() => {
                        selectedTile.params[props.target] = item.value;
                        setTomeData({...tomeData});
					}}
				>
					{props.targetValue === item.value && (
						<SelectedBackground
							layoutId={props.id + "_active_segment"}
							theme_color={colors.white08}
							transition={{
								type: "spring",
								stiffness: 550,
								damping: 40,
							}}
						/>
					)}

					

					{item.type === segmentType.LABEL && (
						<Label
							theme_color={colors.white}
							initial={false}
							animate={{ opacity: props.targetValue === item.value ? 1 : 0.4 }}
							transition={{
								type: "tween",
								duration: props.targetValue === item.value ? 0.4 : 0.2,
							}}
						>
							{item.label}
						</Label>
					)}

				</Item>
			))}
		</Wrap>
	);
};

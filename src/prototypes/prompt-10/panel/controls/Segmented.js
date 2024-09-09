import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../../tome/TomeContext";
import { Icon } from "../../../../ds/Icon";

export const segmentType = {
	ICON: "icon",
	LABEL: "label",
};

const Wrap = styled(motion.div)`
	position: relative;
	display: flex;

	align-items: center;
	overflow: hidden;
	height: 28px;
	border-radius: 8px;
`;

const Dividers = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const Divider = styled(motion.div)`
	width: 1px;
	height: 12px;
	border-radius: 2px;
`;

const Item = styled(motion.div)`
	flex: 1 1 0;
	height: 100%;
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
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* top: 4px;
	left: 4px;
	bottom: 4px;
	right: 4px;
	border-radius: 4px;
	background: ${props => props.theme_color}; */
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* border-radius: 8px; */
	/* background: ${props => props.theme_color}; */
	/* box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1); */
`;

export const Segmented = props => {
	const { tomeData, saveState, selectedTile } = useContext(TomeContext);
	const length = props.data.length;
	const [hoverIndex, setHoveringIndex] = useState(null);
	const transition = { ease: "easeOut", duration: 0.2 };

	const [selectedIndex, setSelectedIndex] = useState(
		props.data.indexOf(props.data.find(item => item.value === props.targetValue))
	);

	//console.log(selectedIndex);
	return (
		<Wrap
			style={{
				background: props.theme.colors.t2,
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: props.theme.colors.controls.border,
			}}
		>
			<Dividers>
				{props.data.map((item, i) => (
					<Divider
						key={props.id + "_segment_divider_" + i}
						style={{
							background: props.theme.colors.t2,
							display: i + 1 < length ? "block" : "none",
						}}
						animate={{
							opacity:
								i === hoverIndex || i === hoverIndex - 1 || i === selectedIndex || i === selectedIndex - 1
									? 0
									: 1,
						}}
						initial={false}
						transition={transition}
					/>
				))}
			</Dividers>
			{props.data.map((item, i) => (
				<Item
					key={props.id + "_segment_" + i}
					onTap={() => {
						//console.log(props.target, item.value);
						setSelectedIndex(i);
						if (props.onTap) {
							props.onTap(item.value);
						} else {
							selectedTile.params[props.target] = item.value;
							saveState();
						}
					}}
				>
					<SelectedBackground
						style={{
							background: props.theme.colors.controls.selected,
						}}
						animate={{
							opacity: props.targetValue === item.value ? 1 : 0,
						}}
						initial={false}
						transition={transition}
					/>

					<HoverBackground
						style={{
							background: props.theme.colors.t2,
							opacity: 0,
						}}
						whileHover={{
							opacity: props.targetValue === item.value ? 0 : 1,
						}}
						onHoverStart={e => {
							setHoveringIndex(i);
						}}
						onHoverEnd={e => {
							setHoveringIndex(null);
						}}
						transition={transition}
					/>

					{item.type === segmentType.ICON && (
						<Icon
							name={item.iconName}
							opacity={1}
							size={24}
							color={props.targetValue === item.value ? props.theme.colors.t9 : props.theme.colors.t7}
							transition={transition}
						/>
					)}

					{item.type === segmentType.LABEL && (
						<Label
							theme_color={props.theme.colors.t9}
							initial={false}
							animate={{
								color: props.targetValue === item.value ? props.theme.colors.t9 : props.theme.colors.t7,
							}}
							transition={transition}
						>
							{item.label}
						</Label>
					)}
				</Item>
			))}
		</Wrap>
	);
};

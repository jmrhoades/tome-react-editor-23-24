import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent } from "framer-motion";
import { PropertyButton, PropertyButtonType } from "./PropertyButton";
import { PropertiesMenuInput } from "./PropertiesMenuInput";
import { PropertyLevels } from "./Properties";
import { Divider } from "./PropertiesMenuItem";

const Wrap = styled(motion.div)``;

export const PropertiesLevel1 = props => {
	return (
		<Wrap key={props.layer.id + "_properties_lvl_1"} className="propertiesLevel1" style={{ ...props.barStyles }}>
			{props.layer.layerType === "SHAPE" && (
				<>
					<PropertyButton
						id={"shape_fill_color_btn"}
						type={PropertyButtonType.SHAPE_FILL_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.fill.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_FILL_COLOR);
						}}
						active={props.level2 === PropertyLevels.SHAPE_FILL_COLOR}
					/>

					{/* {shapeLineColor && (
						<PropertyButton
							id={"shape_line_color_btn"}
							type={PropertyButtonType.SHAPE_LINE_COLOR}
							theme={props.theme}
							motionValue={props.layer.motion.line.color}
							onTap={e => {
								props.onButtonTap(PropertyLevels.SHAPE_LINE_COLOR);
							}}
							active={props.level2 === PropertyLevels.SHAPE_LINE_COLOR}
						/>
					)} */}

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"Line"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_LINE_SIZE);
						}}
						active={
							props.level2 === PropertyLevels.SHAPE_LINE_SIZE || props.level2 === PropertyLevels.SHAPE_LINE_COLOR
						}
					/>

					{/* <PropertyButton
						id={"shape_line_size_btn"}
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"LineSize"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_LINE_SIZE);
						}}
						active={props.level2 === PropertyLevels.SHAPE_LINE_SIZE}
					/> */}

					{/* <Divider theme={props.theme} vertical={true} /> */}

					{/* <PropertyButton
						id={"shape_text_size_btn"}
						type={PropertyButtonType.TEXT_STYLES}
						theme={props.theme}
						motionValue={props.layer.motion.text.size}
						motionValue2={props.layer.motion.text.weight}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_STYLE);
						}}
						active={props.level2 === PropertyLevels.SHAPE_TEXT_STYLE}
					/> */}

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"Text"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_OPTIONS);
						}}
						active={
							props.level2 === PropertyLevels.SHAPE_TEXT_OPTIONS ||
							props.level2 === PropertyLevels.SHAPE_TEXT_COLOR ||
							props.level2 === PropertyLevels.SHAPE_TEXT_STYLE ||
							props.level2 === PropertyLevels.SHAPE_TEXT_ALIGNMENT
						}
					/>

					{/* <PropertyButton
						id={"shape_text_color_btn"}
						type={PropertyButtonType.TEXT_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.text.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_COLOR);
						}}
						active={props.level2 === PropertyLevels.SHAPE_TEXT_COLOR}
					/> */}

					{/* <PropertyButton
						id={"shape_text_align_x_btn"}
						type={PropertyButtonType.TEXT_ALIGN_X}
						theme={props.theme}
						motionValue={props.layer.motion.text.alignment.x}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_ALIGNMENT);
						}}
						active={props.level2 === PropertyLevels.SHAPE_TEXT_ALIGNMENT}
					/> */}

					{/*
					<PropertyButton
						id={"shape_text_align_y_btn"}
						type={PropertyButtonType.TEXT_ALIGN_Y}
						theme={props.theme}
						motionValue={props.layer.motion.text.alignment.y}
						onTap={e => {
							props.onButtonTap(PropertyButtonType.TEXT_ALIGN_Y);
						}}
						active={props.level2 === PropertyLevels.TEXT_ALIGN_Y}
					/> */}
				</>
			)}
			{props.layer.layerType === "TEXT" && (
				<>
					{/* <PropertyButton
						type={PropertyButtonType.TEXT_STYLES}
						theme={props.theme}
						motionValue={props.layer.motion.text.size}
						motionValue2={props.layer.motion.text.weight}
						onTap={e => {
							props.onButtonTap(PropertyButtonType.TEXT_STYLES);
						}}
						active={props.level2 === PropertyLevels.TEXT_STYLES}
					/> */}

					<PropertyButton
						type={PropertyButtonType.TEXT_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.text.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.TEXT_COLOR);
						}}
						active={props.level2 === PropertyLevels.TEXT_COLOR}
					/>

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"TextSize"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.TEXT_STYLES);
						}}
						active={props.level2 === PropertyLevels.TEXT_STYLES}
					/>

					<PropertyButton
						type={PropertyButtonType.TEXT_ALIGN_X}
						theme={props.theme}
						motionValue={props.layer.motion.text.alignment.x}
						onTap={e => {
							props.onButtonTap(PropertyLevels.TEXT_ALIGNMENT);
						}}
						active={props.level2 === PropertyLevels.TEXT_ALIGNMENT}
					/>
				</>
			)}
			{props.layer.layerType === "LINE" && (
				<>
					<PropertyButton
						type={PropertyButtonType.LINE_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.line.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.LINE_COLOR);
						}}
						active={props.level2 === PropertyLevels.LINE_COLOR}
					/>

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"LineSizeAlt"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.LINE_SIZE);
						}}
						active={props.level2 === PropertyLevels.LINE_SIZE}
					/>

					<PropertyButton
						type={PropertyButtonType.LINECAP_START}
						theme={props.theme}
						motionValue={props.layer.motion.line.capStart}
						onTap={e => {
							props.onButtonTap(PropertyLevels.LINECAP_START);
						}}
						active={props.level2 === PropertyLevels.LINECAP_START}
					/>

					<PropertyButton
						type={PropertyButtonType.LINECAP_END}
						theme={props.theme}
						motionValue={props.layer.motion.line.capEnd}
						onTap={e => {
							props.onButtonTap(PropertyLevels.LINECAP_END);
						}}
						active={props.level2 === PropertyLevels.LINECAP_END}
					/>

					{/* <PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"ArrowRight"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.LINE_CAPS);
						}}
						active={props.level2 === PropertyLevels.LINE_CAPS}
					/> */}
				</>
			)}

			{props.layer.layerType === "PROGRESS_RING" && (
				<>
					<PropertyButton
						type={PropertyButtonType.LINE_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.line.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PROGRESS_RING_FOREGROUND_COLOR);
						}}
						active={props.level2 === PropertyLevels.PROGRESS_RING_FOREGROUND_COLOR}
					/>

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"Line"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PROGRESS_RING_LINE_SIZE);
						}}
						active={props.level2 === PropertyLevels.PROGRESS_RING_LINE_SIZE}
					/>

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"Text"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PROGRESS_RING_TEXT_OPTIONS);
						}}
						active={
							props.level2 === PropertyLevels.PROGRESS_RING_TEXT_OPTIONS ||
							props.level2 === PropertyLevels.SHAPE_TEXT_COLOR ||
							props.level2 === PropertyLevels.SHAPE_TEXT_STYLE
						}
					/>

					{/* <PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={activeTextOpacity === 1 ? "Title" : "TitleOff"}
						onTap={e => {
							const o = props.layer.motion.text.opacity.get();
							if (o === 1) {
								props.layer.motion.text.opacity.set(0);
							} else if (o === 0) {
								props.layer.motion.text.opacity.set(1);
							}
							props.setLevel2(false);
						}}
					/> */}

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"Preferences"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PROGRESS_RING_AMOUNT);
						}}
						active={props.level2 === PropertyLevels.PROGRESS_RING_AMOUNT}
					/>

					{/* <PropertyButton
						type={PropertyButtonType.LINECAP_START}
						theme={props.theme}
						motionValue={props.layer.motion.line.capStart}
						onTap={e => {
							props.onButtonTap(PropertyLevels.LINECAP_START);
						}}
						active={props.level2 === PropertyLevels.LINECAP_START}
					/> */}
				</>
			)}

			{props.layer.layerType === "PICTOGRAM" && (
				<>
					<PropertyButton
						id={"shape_fill_color_btn"}
						type={PropertyButtonType.SHAPE_FILL_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.fill.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PICTOGRAM_FILL_COLOR);
						}}
						active={props.level2 === PropertyLevels.PICTOGRAM_FILL_COLOR}
					/>

					<PropertyButton
						type={PropertyButtonType.PICTOGRAM}
						theme={props.theme}
						motionValue={props.layer.motion.meta.itemName}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PICTOGRAM_ITEMS);
						}}
						active={props.level2 === PropertyLevels.PICTOGRAM_ITEMS}
					/>

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"Preferences"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.PICTOGRAM_OPTIONS);
						}}
						active={props.level2 === PropertyLevels.PICTOGRAM_OPTIONS}
					/>
				</>
			)}
		</Wrap>
	);
};

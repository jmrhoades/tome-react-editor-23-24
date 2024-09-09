import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent } from "framer-motion";

import { PropertyButton, PropertyButtonType } from "./PropertyButton";

const Wrap = styled(motion.div)`
	/* position: absolute;
	top: 0;
	left: 0; */
`;

export const PropertiesAlign = props => {
	const width = 30;
	const iconSize = 24;

	return (
		<Wrap className="propertiesLevelAlign" style={{ ...props.barStyles }}>
			<PropertyButton
				type={PropertyButtonType.ICON}
				theme={props.theme}
				size={props.buttonSize}
				width={width}
				iconSize={iconSize}
				iconName="LayerAlignLeft"
				borderRadius={props.buttonRadius}
				onTap={e => {
					props.alignLayers("left");
				}}
			/>
			<PropertyButton
				type={PropertyButtonType.ICON}
				theme={props.theme}
				size={props.buttonSize}
				width={width}
				iconSize={iconSize}
				iconName="LayerAlignCenter"
				borderRadius={props.buttonRadius}
				onTap={e => {
					props.alignLayers("center");
				}}
			/>
			<PropertyButton
				type={PropertyButtonType.ICON}
				theme={props.theme}
				size={props.buttonSize}
				width={width}
				iconSize={iconSize}
				iconName="LayerAlignRight"
				borderRadius={props.buttonRadius}
				onTap={e => {
					props.alignLayers("right");
				}}
			/>
			<PropertyButton
				type={PropertyButtonType.ICON}
				theme={props.theme}
				width={width}
				iconSize={iconSize}
				size={props.buttonSize}
				iconName="LayerAlignTop"
				borderRadius={props.buttonRadius}
				onTap={e => {
					props.alignLayers("top");
				}}
			/>
			<PropertyButton
				type={PropertyButtonType.ICON}
				theme={props.theme}
				width={width}
				iconSize={iconSize}
				size={props.buttonSize}
				iconName="LayerAlignMiddle"
				borderRadius={props.buttonRadius}
				onTap={e => {
					props.alignLayers("middle");
				}}
			/>
			<PropertyButton
				type={PropertyButtonType.ICON}
				theme={props.theme}
				width={width}
				iconSize={iconSize}
				size={props.buttonSize}
				iconName="LayerAlignBottom"
				borderRadius={props.buttonRadius}
				onTap={e => {
					props.alignLayers("bottom");
				}}
			/>

			{props.distribute && (
				<PropertyButton
					type={PropertyButtonType.ICON}
					theme={props.theme}
					width={width}
					iconSize={iconSize}
					size={props.buttonSize}
					iconName="LayerDistributeHorizontal"
					borderRadius={props.buttonRadius}
					onTap={e => {
						props.distributeLayers("horizontal");
					}}
				/>
			)}

			{props.distribute && (
				<PropertyButton
					type={PropertyButtonType.ICON}
					theme={props.theme}
					width={width}
					iconSize={iconSize}
					size={props.buttonSize}
					iconName="LayerDistributeVertical"
					borderRadius={props.buttonRadius}
					onTap={e => {
						props.distributeLayers("vertical");
					}}
				/>
			)}
		</Wrap>
	);
};

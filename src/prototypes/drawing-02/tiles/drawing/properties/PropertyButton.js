import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";

import { CurrentColor, SwatchType, ColorSwatch } from "../../../ds/Swatch";
import { Icon } from "../../../../../ds/Icon";
import { textStyleNames } from "../../TileConstants";
import { alignX, alignY, linecapEnd, linecapStart } from "../constants";
import { PictogramIcon } from "../../../../../ds/PictogramIcons";

export const PropertyButtonType = {
	ICON: "icon",
	TEXT_STYLES: "text_styles",
	SWATCH: "swatch",

	TEXT_COLOR: "text_color",

	TEXT_ALIGN_X: "text_align_x",
	TEXT_ALIGN_Y: "text_align_y",

	LINE_COLOR: "lineColor",
	LINE_SIZE: "lineSize",

	SHAPE_FILL_COLOR: "shape_fill_color",
	SHAPE_LINE_COLOR: "shape_line_color",

	LINECAP_START: "linecap_start",
	LINECAP_END: "linecap_end",

	PICTOGRAM: "pictogram",
};

const Leading = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Trailing = styled(motion.div)`
	position: relative;
	position: relative;
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Label = styled(motion.div)``;

export const PropertyButton = ({
	type = PropertyButtonType.ICON,
	theme,
	size = 24,
	width = size,
	height = size,
	swatchSize = 12,
	borderRadius = 4,
	backgroundHoverColor = theme.colors.t2,

	leadingIcon = undefined,
	iconName = "Text",
	iconSize = 20,
	//iconColor = theme.colors.t9,

	color = theme.colors.accent,
	colorType,
	motionValue = undefined,
	motionValue2 = undefined,

	onTap = undefined,
	active = false,
	group = false,
}) => {
	//const iconMotionColor = useMotionValue(iconColor);
	const hoverOpacity = useMotionValue(0);
	if (type === PropertyButtonType.TEXT_STYLES) width = "auto";

	const [iColor, setIColor] = React.useState(active ? theme.colors.t9 : group ? theme.colors.t6 : theme.colors.t9);

	// if (group) {
	// 	iconColor = groupIconColor;
	// 	//iconMotionColor.set(theme.colors.t6);
	// 	setGroupIconColor(theme.colors.t6)
	// 	if (active) {
	// 		//iconMotionColor.set(theme.colors.t9);
	// 		setGroupIconColor(theme.colors.t9)
	// 	}
	// }

	React.useEffect(() => {
		setIColor(active ? theme.colors.t9 : group ? theme.colors.t6 : theme.colors.t9);
	}, [active]);

	return (
		<motion.div
			style={{
				width: width,
				height: height,
				flexShrink: 0,
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				cursor: "pointer",
				
				fontStyle: "normal",
				fontWeight: 400,
				fontSize: "13px",
				lineHeight: "16px",
				color: theme.colors.t9,
			}}
			onHoverStart={e => {
				hoverOpacity.set(1);
				if (group && !active) setIColor(theme.colors.t7);
			}}
			onHoverEnd={e => {
				hoverOpacity.set(0);
				if (group && !active) setIColor(theme.colors.t6);
			}}
			onTap={onTap}
		>
			{!active && (
				<motion.div
					className="hoverBackground"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "100%",
						height: "100%",
						x: "-50%",
						y: "-50%",
						borderRadius: borderRadius,
						backgroundColor: backgroundHoverColor,
						opacity: active ? 1 : hoverOpacity,
						transition: "opacity 0.2s ease",
					}}
				/>
			)}

			{active && !group && (
				<motion.div
					className="activeBackground"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "100%",
						height: "100%",
						x: "-50%",
						y: "-50%",
						borderRadius: borderRadius,
						backgroundColor: theme.colors.t3,
					}}
				/>
			)}

			{type === PropertyButtonType.ICON && <Icon name={iconName} opacity={1} size={iconSize} color={iColor} />}

			{type === PropertyButtonType.TEXT_ALIGN_X && (
				<Icon name={alignX.find(o => o.id === motionValue.get()).icon} opacity={1} size={iconSize} color={iColor} />
			)}

			{type === PropertyButtonType.TEXT_ALIGN_Y && (
				<Icon name={alignY.find(o => o.id === motionValue.get()).icon} opacity={1} size={iconSize} color={iColor} />
			)}

			{type === PropertyButtonType.LINECAP_START && (
				<Icon
					name={linecapStart.find(o => o.id === motionValue.get()).icon}
					opacity={1}
					size={iconSize}
					color={iColor}
				/>
			)}

			{type === PropertyButtonType.LINECAP_END && (
				<Icon
					name={linecapEnd.find(o => o.id === motionValue.get()).icon}
					opacity={1}
					size={iconSize}
					color={iColor}
				/>
			)}

			{type === PropertyButtonType.TEXT_STYLES && (
				<FontSizeLabel theme={theme} fontSize={motionValue} fontWeight={motionValue2} leadingIcon={leadingIcon} />
			)}

			{type === PropertyButtonType.SHAPE_FILL_COLOR && (
				<CurrentColor
					theme={theme}
					type={SwatchType.SHAPE_FILL}
					motionValue={motionValue}
					width={swatchSize}
					height={swatchSize}
				/>
			)}

			{type === PropertyButtonType.SHAPE_LINE_COLOR && (
				<CurrentColor
					theme={theme}
					type={SwatchType.SHAPE_BORDER}
					motionValue={motionValue}
					width={swatchSize}
					height={swatchSize}
				/>
			)}

			{type === PropertyButtonType.LINE_COLOR && (
				<CurrentColor
					theme={theme}
					type={SwatchType.LINE}
					motionValue={motionValue}
					width={swatchSize}
					height={swatchSize}
				/>
			)}

			{type === PropertyButtonType.TEXT_COLOR && (
				<CurrentColor
					theme={theme}
					type={SwatchType.TEXT}
					motionValue={motionValue}
					width={swatchSize}
					height={swatchSize}
				/>
			)}

			{type === PropertyButtonType.SWATCH && (
				<ColorSwatch theme={theme} color={color} type={colorType} width={14} height={14} iconSize={19} />
			)}

			{type === PropertyButtonType.PICTOGRAM && <MotionIcon theme={theme} motionValue={motionValue} iconSize={iconSize} iColor={iColor}/>}
		</motion.div>
	);
};

const MotionIcon = props => {
	const [itemName, setItemName] = React.useState(props.motionValue.get());
	// Listen for selection changes
	useMotionValueEvent(props.motionValue, "change", latest => {
		setItemName(latest);
	});

	return <Icon name={itemName} opacity={1} size={props.iconSize} color={props.iColor} />;
};

const FontSizeLabel = props => {
	const getDisplaySize = () => {
		let displaySize = Math.round(props.fontSize.get()) + "";
		for (const property in props.theme.typography.fontSize) {
			const size = props.theme.typography.fontSize[property];
			const weight = props.theme.typography.fontWeight[property];
			if (size === props.fontSize.get() && weight === props.fontWeight.get()) {
				displaySize = textStyleNames[property];
				//console.log(`${property}: ${size}`, displaySize, weight, props.fontWeight.get());
			}
		}
		console.log(`displaySize: ${displaySize}`, props.fontWeight.get());
		return displaySize;
	};

	const displayValue = useMotionValue(getDisplaySize());
	const numericalValue = useMotionValue(Math.round(props.fontSize.get()));

	// Listen for selection changes
	useMotionValueEvent(props.fontSize, "change", latest => {
		displayValue.set(getDisplaySize());
		numericalValue.set(Math.round(props.fontSize.get()));
	});
	useMotionValueEvent(props.fontWeight, "change", latest => {
		displayValue.set(getDisplaySize());
		numericalValue.set(Math.round(props.fontSize.get()));
	});

	return (
		<motion.div
			style={{
				position: "relative",
				display: "flex",
				//flex: "0 0 100%",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 6,
				pointerEvents: "none",

				
				fontStyle: "normal",
				fontWeight: 400,
				fontSize: "13px",
				color: props.theme.colors.t9,
				whiteSpace: "nowrap",

				padding: "2px 4px 2px 4px",
				lineHeight: "20px",
			}}
		>
			<Leading>
				{props.leadingIcon && <Icon name={props.leadingIcon} size={16} color={props.theme.colors.t9} />}
				<Label>{displayValue}</Label>
			</Leading>

			<Trailing>
				{/* <Label style={{color:props.theme.colors.t9, opacity: .35}}>{numericalValue}</Label> */}
				<svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ display: "block", widht: 8, height: 5 }}>
					<path
						d="M1 1.2002L3.53879 4.24675C3.77864 4.53457 4.22071 4.53457 4.46056 4.24675L6.99935 1.2002"
						stroke={props.theme.colors.t9}
						strokeOpacity="0.35"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Trailing>
		</motion.div>
	);
};

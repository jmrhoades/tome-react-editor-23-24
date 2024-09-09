import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, animate } from "framer-motion";

import {
	shapeFillColors,
	shapeLineColors,
	lineColors,
	textColors,
	lineSizes,
	alignX,
	alignY,
	linecapStart,
	linecapEnd,
	progressRingSizes,
	progressRingLinecaps,
} from "../constants";
import { PropertyButton, PropertyButtonType } from "./PropertyButton";
import { PropertyLevels } from "./Properties";
import { Divider, Header, PropertiesMenuItem } from "./PropertiesMenuItem";
import { PropertiesMenuInput } from "./PropertiesMenuInput";
import { Slider } from "../../../ds/Slider";
import { Switch } from "../../../ds/Switch";
import { SliderField } from "../../../ds/SliderField";
import { Stepper } from "../../../ds/Stepper";
import { pictogramIcons } from "../../../../../ds/PictogramIcons";

const Wrap = styled(motion.div)``;

const Checklist = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Stack = styled(motion.div)`
	display: flex;
	flex-direction: column;
`;

const Row = styled(motion.div)`
	display: flex;
	gap: 4px;
	justify-content: center;
	align-items: center;
`;

const Group = styled(motion.div)`
	display: flex;
	gap: 4px;
	justify-content: center;
	align-items: center;
`;

const SwitchContainer = styled(motion.div)`
	padding-left: 4px;
	padding-right: 4px;
	pointer-events: auto;
	cursor: pointer;
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-size: 13px;
	font-weight: 400;
	line-height: 16px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding-left: 4px;
	padding-right: 4px;
	min-width: 64px;
`;

export const PropertiesLevel2 = props => {
	const layer = props.layer;
	const closeAfterSelection = true;

	const [activeFillColor, setActiveFillColor] = React.useState(props.layer.motion.fill.color.get());
	const [activeLineColor, setActiveLineColor] = React.useState(props.layer.motion.line.color.get());
	const [activeTextColor, setActiveTextColor] = React.useState(props.layer.motion.text.color.get());

	const [activeLineSize, setActiveLineSize] = React.useState(props.layer.motion.line.size.get());
	const [activeTextSize, setActiveTextSize] = React.useState(props.layer.motion.text.size.get());

	const [activeTextAlignX, setActiveTextAlignX] = React.useState(props.layer.motion.text.alignment.x.get());
	const [activeTextAlignY, setActiveTextAlignY] = React.useState(props.layer.motion.text.alignment.y.get());

	const [activeLinecapStart, setActiveLinecapStart] = React.useState(props.layer.motion.line.capStart.get());
	const [activeLinecapEnd, setActiveLinecapEnd] = React.useState(props.layer.motion.line.capEnd.get());

	const [activePictogramItem, setActivePictogramItem] = React.useState(props.layer.motion.meta.itemName.get());

	const textLayerStyles = props.theme.typography.list;
	const shapeLayerStyles = props.theme.typography.list;

	//const textLayerStyles = props.theme.typography.list.filter(o => o.id === "H1" || o.id === "H2" || o.id === "P");
	// const shapeLayerStyles = props.theme.typography.list.filter(
	// 	o => o.id === "H2" || o.id === "P" || o.id === "CAPTION"
	// );

	let dropDownStyles =
		props.level2 === PropertyLevels.SHAPE_TEXT_STYLE || props.level2 === PropertyLevels.TEXT_STYLES
			? {
					flexDirection: "column",
					width: 116,
					gap: 6,
					padding: "6px",
			  }
			: {};

	if (props.level2 === PropertyLevels.TEXT_ALIGNMENT) {
		dropDownStyles = { width: 88, flexWrap: "wrap" };
	}

	if (props.level2 === PropertyLevels.PICTOGRAM_ITEMS) {
		dropDownStyles = { width: 148, flexWrap: "wrap" };
	}

	if (props.level2 === PropertyLevels.PICTOGRAM_OPTIONS) {
		dropDownStyles = { flexDirection: "column" };
	}

	const closeMenu = () => {
		props.setLevel2(false);
	};

	const isTextSyleActive = styleKey => {
		const size = props.theme.typography.fontSize[styleKey];
		const weight = props.theme.typography.fontWeight[styleKey];
		if (size === layer.motion.text.size.get() && weight === layer.motion.text.weight.get()) {
			return true;
		}
		return false;
	};

	const onStyleTap = style => {
		console.log(style);
		layer.params.text.size = props.theme.typography.fontSize[style.id];
		layer.motion.text.size.set(layer.params.text.size);
		layer.params.text.weight = props.theme.typography.fontWeight[style.id];
		layer.motion.text.weight.set(layer.params.text.weight);
		if (layer.layerType === "TEXT") setTimeout(() => layer.updateLayerSize(), 10);
		if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const setTextSize = v => {
		console.log("setTextSize", v);
		props.params.text.size = v;
		props.layer.motion.text.size.set(v);
		if (layer.layerType === "TEXT") props.layer.updateLayerSize();
		props.hidebounds();
	};

	const onTextColorTap = c => {
		console.log("onTextColorTap", c);
		if (c === "") {
			// SHOW COLOR PICKER
		} else {
			layer.motion.text.color.set(c);
			layer.params.text.color = c;
		}
		if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onTextAlignXTap = v => {
		console.log("onTextAlignXTap", v);
		layer.motion.text.alignment.x.set(v);
		layer.params.text.alignment.x = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onTextAlignYTap = v => {
		console.log("onTextAlignYTap", v);
		layer.motion.text.alignment.y.set(v);
		layer.params.text.alignment.y = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onFillColorTap = c => {
		console.log("onFillColorTap", c);
		if (c === "reset") {
			// Reset means transparent for now
			layer.motion.fill.color.set("transparent");
			layer.params.fill.color = "transparent";
		} else {
			layer.motion.fill.color.set(c);
			layer.params.fill.color = c;
		}
		if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onLineColorTap = c => {
		console.log("onLineColorTap", c);
		if (c === "reset") {
			// Reset means transparent for now
			layer.motion.line.color.set("transparent");
			layer.params.line.color = "transparent";
		} else {
			layer.motion.line.color.set(c);
			layer.params.line.color = c;
			if (layer.motion.line.size.get() === 0) {
				layer.motion.line.size.set(2);
				layer.params.line.size = 2;
			}
		}
		if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const onProgressRingForegroundColorTap = c => {
		console.log("onProgressRingForegroundColorTap", c);

		// Clever but but keep it siple for now
		/*
		if (layer.motion.text.color.get() === layer.motion.line.color.get()) {
			layer.motion.text.color.set(c);
			layer.params.text.color = c;
		}
		*/

		layer.motion.line.color.set(c);
		layer.params.line.color = c;

		if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const onLineSizeTap = v => {
		console.log("onLineSizeTap", v);
		props.layer.motion.line.size.set(v);
		props.params.line.size = v;
		if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const setLineSize = v => {
		console.log("setLineSize", v);
		props.layer.motion.line.size.set(v);
		props.params.line.size = v;
		props.hidebounds();
		//if (closeAfterSelection) props.setLevel2(false);
	};

	const onLinecapStartTap = v => {
		console.log("onLinecapStartTap", v);
		props.layer.motion.line.capStart.set(v);
		props.params.line.capStart = v;
		if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const onLinecapEndTap = v => {
		console.log("onLinecapEndTap", v);
		props.layer.motion.line.capEnd.set(v);
		props.params.line.capEnd = v;
		if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const onProgressRingAmountChange = newValue => {
		props.layer.params.line.progress = newValue;
	};

	const onProgressRingLineSizeChange = newValue => {
		props.layer.params.line.size = newValue;
	};

	const onProgressRingLinecapStartTap = v => {
		console.log("onProgressRingLinecapStartTap", v);
		props.layer.motion.line.capStart.set(v);
		props.params.line.capStart = v;
		//if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const onProgressRingLineSizeTap = v => {
		console.log("onProgressRingLineSizeTap", v);
		props.layer.motion.line.size.set(v);
		props.params.line.size = v;
		//if (closeAfterSelection) props.setLevel2(false);
		props.hidebounds();
	};

	const onPictogramItemTap = v => {
		console.log("onPictogramItemTap", v);
		props.layer.motion.meta.itemName.set(v);
		props.params.meta.itemName = v;
		if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onPictogramItemTotalChange = v => {
		console.log("onPictogramItemTotalChange", v);
		// Update fill count if it's greater than new total
		if (props.params.meta.itemFill > v) {
			props.layer.motion.meta.itemFill.set(v);
			props.params.meta.itemFill = v;
		}
		props.layer.motion.meta.itemTotal.set(v);
		props.params.meta.itemTotal = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onPictogramItemFillChange = v => {
		console.log("onPictogramItemFillChange", v);
		// Don't go above total count
		if (v > props.params.meta.itemTotal) v = props.params.meta.itemTotal;
		props.layer.motion.meta.itemFill.set(v);
		props.params.meta.itemFill = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onPictogramItemSpacingChange = v => {
		console.log("onPictogramItemSpacingChange", v);
		props.layer.motion.meta.itemSpacing.set(v);
		props.params.meta.itemSpacing = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	// Listen for selection changes
	const [activeTextOpacity, setActiveTextOpacity] = React.useState(props.layer.motion.text.opacity.get());
	useMotionValueEvent(props.layer.motion.text.opacity, "change", latest => {
		setActiveTextOpacity(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.fill.color, "change", latest => {
		setActiveFillColor(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.line.color, "change", latest => {
		setActiveLineColor(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.text.color, "change", latest => {
		setActiveTextColor(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.line.size, "change", latest => {
		setActiveLineSize(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.text.size, "change", latest => {
		setActiveTextSize(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.text.alignment.x, "change", latest => {
		setActiveTextAlignX(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.text.alignment.y, "change", latest => {
		setActiveTextAlignY(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.line.capStart, "change", latest => {
		setActiveLinecapStart(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.line.capEnd, "change", latest => {
		setActiveLinecapEnd(latest);
	});

	// Listen for selection changes
	useMotionValueEvent(props.layer.motion.meta.itemName, "change", latest => {
		setActivePictogramItem(latest);
	});

	return (
		<Wrap
			key={props.layer.id + props.level2}
			className="propertiesLevel2"
			style={{ ...props.barStyles, ...dropDownStyles }}
		>
			{props.level2 === PropertyLevels.SHAPE_FILL_COLOR && (
				<>
					{shapeFillColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onFillColorTap(c.hex);
							}}
							active={activeFillColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.SHAPE_LINE_COLOR && (
				<>
					{shapeLineColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onLineColorTap(c.hex);
							}}
							active={activeLineColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.SHAPE_LINE_SIZE && (
				<>
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

					{/* <PropertyButton
						theme={props.theme}
						type={PropertyButtonType.ICON}
						iconName={"CircleRemove"}
						iconSize={20}
						group={true}
						active={activeLineSize === 0}
						onTap={e => {
							onLineSizeTap(0);
						}}
					/> */}

					{lineSizes.map((o, i) => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o.icon}
							group={true}
							active={activeLineSize === o.size}
							onTap={e => {
								onLineSizeTap(o.size);
							}}
						/>
					))}
					<PropertiesMenuInput
						theme={props.theme}
						value={activeLineSize}
						setValue={setLineSize}
						closeMenu={closeMenu}
						width={24}
						textAlign={"center"}
					/>
				</>
			)}

			{props.level2 === PropertyLevels.SHAPE_TEXT_OPTIONS && (
				<>
					<PropertyButton
						id={"shape_text_color_btn"}
						type={PropertyButtonType.TEXT_COLOR}
						theme={props.theme}
						motionValue={props.layer.motion.text.color}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_COLOR);
						}}
						active={props.level2 === PropertyLevels.SHAPE_TEXT_COLOR}
					/>

					<PropertyButton
						type={PropertyButtonType.ICON}
						theme={props.theme}
						iconName={"TextSize"}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_STYLE);
						}}
						active={props.level2 === PropertyLevels.SHAPE_TEXT_STYLE}
					/>

					<PropertyButton
						id={"shape_text_align_x_btn"}
						type={PropertyButtonType.TEXT_ALIGN_X}
						theme={props.theme}
						motionValue={props.layer.motion.text.alignment.x}
						onTap={e => {
							props.onButtonTap(PropertyLevels.SHAPE_TEXT_ALIGNMENT);
						}}
						active={props.level2 === PropertyLevels.SHAPE_TEXT_ALIGNMENT}
					/>
				</>
			)}

			{props.level2 === PropertyLevels.SHAPE_TEXT_STYLE && (
				<>
					<Checklist>
						{shapeLayerStyles.map(obj => (
							<PropertiesMenuItem
								key={obj.id}
								theme={props.theme}
								label={obj.name}
								active={isTextSyleActive(obj.id)}
								onTap={e => {
									onStyleTap(obj);
								}}
								labelStyle={{
									...obj.labelStyle,
								}}
							/>
						))}
					</Checklist>

					<Divider theme={props.theme} />

					<PropertiesMenuInput
						theme={props.theme}
						value={Math.round(activeTextSize)}
						setValue={setTextSize}
						closeMenu={closeMenu}
						min={6}
						max={300}
					/>
				</>
			)}

			{props.level2 === PropertyLevels.SHAPE_TEXT_COLOR && (
				<>
					{textColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onTextColorTap(c.hex);
							}}
							active={activeTextColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.SHAPE_TEXT_ALIGNMENT && (
				<Stack>
					<Row>
						{alignX.map(o => (
							<PropertyButton
								key={o.id}
								theme={props.theme}
								label={o.label}
								group={true}
								iconName={o.icon}
								active={activeTextAlignX === o.id}
								onTap={e => {
									onTextAlignXTap(o.id);
								}}
							/>
						))}
					</Row>
					{/* <Divider theme={props.theme} vertical={true} /> */}
					<Row>
						{alignY.map(o => (
							<PropertyButton
								key={o.id}
								theme={props.theme}
								label={o.label}
								group={true}
								iconName={o.icon}
								active={activeTextAlignY === o.id}
								onTap={e => {
									onTextAlignYTap(o.id);
								}}
							/>
						))}
					</Row>
				</Stack>
			)}

			{props.level2 === PropertyLevels.TEXT_STYLES && (
				<>
					<Checklist>
						{textLayerStyles.map(obj => (
							<PropertiesMenuItem
								key={obj.id}
								theme={props.theme}
								label={obj.name}
								active={isTextSyleActive(obj.id)}
								onTap={e => {
									onStyleTap(obj);
								}}
								labelStyle={{
									...obj.labelStyle,
								}}
							/>
						))}
					</Checklist>
					<Divider theme={props.theme} />
					<PropertiesMenuInput
						theme={props.theme}
						value={Math.round(activeTextSize)}
						setValue={setTextSize}
						closeMenu={closeMenu}
						min={6}
						max={300}
					/>

					{/* <Group>
						{alignX.map(o => (
							<PropertyButton
								key={o.id}
								type={PropertyButtonType.ICON}
								group={true}
								iconName={o.icon}
								theme={props.theme}
								active={activeTextAlignX === o.id}
								onTap={e => {
									onTextAlignXTap(o.id);
								}}
							/>
						))}
					</Group> */}
				</>
			)}

			{props.level2 === PropertyLevels.TEXT_COLOR && (
				<>
					{textColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onTextColorTap(c.hex);
							}}
							active={activeTextColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.TEXT_ALIGNMENT && (
				<>
					{alignX.map(o => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							label={o.label}
							group={true}
							iconName={o.icon}
							active={activeTextAlignX === o.id}
							onTap={e => {
								onTextAlignXTap(o.id);
							}}
						/>
					))}
				</>
			)}

			{/* {props.level2 === PropertyLevels.TEXT_ALIGN_X && (
				<>
					{alignX.map(o => (
						<PropertiesMenuItem
							key={o.id}
							theme={props.theme}
							label={o.label}
							leadingIcon={o.icon}
							active={activeTextAlignX === o.id}
							onTap={e => {
								onTextAlignXTap(o.id);
							}}
						/>
					))}
				</>
			)} */}

			{/* {props.level2 === PropertyLevels.TEXT_ALIGN_Y && (
				<>
					{alignY.map(o => (
						<PropertiesMenuItem
							key={o.id}
							theme={props.theme}
							label={o.label}
							leadingIcon={o.icon}
							active={activeTextAlignY === o.id}
							onTap={e => {
								onTextAlignYTap(o.id);
							}}
						/>
					))}
				</>
			)} */}

			{props.level2 === PropertyLevels.LINE_COLOR && (
				<>
					{lineColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onLineColorTap(c.hex);
							}}
							active={activeLineColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.LINE_SIZE && (
				<>
					{lineSizes.map((o, i) => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o.icon}
							group={true}
							active={activeLineSize === o.size}
							onTap={e => {
								onLineSizeTap(o.size);
							}}
						/>
					))}
					<PropertiesMenuInput
						theme={props.theme}
						value={activeLineSize}
						setValue={setLineSize}
						closeMenu={closeMenu}
						width={24}
						textAlign={"center"}
					/>
				</>
			)}

			{props.level2 === PropertyLevels.LINE_CAPS && (
				<Stack>
					<Row>
						{linecapStart.map(o => (
							<PropertyButton
								key={o.id}
								theme={props.theme}
								type={PropertyButtonType.ICON}
								iconName={o.icon}
								group={true}
								active={activeLinecapStart === o.id}
								onTap={e => {
									onLinecapStartTap(o.id);
								}}
							/>
						))}
					</Row>
					<Row>
						{linecapEnd.map(o => (
							<PropertyButton
								key={o.id}
								theme={props.theme}
								type={PropertyButtonType.ICON}
								iconName={o.icon}
								group={true}
								active={activeLinecapEnd === o.id}
								onTap={e => {
									onLinecapEndTap(o.id);
								}}
							/>
						))}
					</Row>
				</Stack>
			)}

			{props.level2 === PropertyLevels.LINECAP_START && (
				<>
					{linecapStart.map(o => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o.icon}
							group={true}
							active={activeLinecapStart === o.id}
							onTap={e => {
								onLinecapStartTap(o.id);
							}}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.LINECAP_END && (
				<>
					{linecapEnd.map(o => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o.icon}
							group={true}
							active={activeLinecapEnd === o.id}
							onTap={e => {
								onLinecapEndTap(o.id);
							}}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.PROGRESS_RING_FOREGROUND_COLOR && (
				<>
					{lineColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onProgressRingForegroundColorTap(c.hex);
							}}
							active={activeLineColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.PROGRESS_RING_LINE_SIZE && (
				<Row>
					{progressRingLinecaps.map(o => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o.icon}
							group={true}
							active={activeLinecapStart === o.id}
							onTap={e => {
								onProgressRingLinecapStartTap(o.id);
							}}
						/>
					))}

					{/* <Stepper
						theme={props.theme}
						motionValue={props.layer.motion.line.size}
						setValue={v => console.log(v)}
						scale={1}
						unit={""}
						height={24}
						borderRadius={4}
						width={24}
						//backgroundColor={"transparent"}
						padding={0}
					/> */}

					<Divider theme={props.theme} vertical={true} />

					{progressRingSizes.map((o, i) => (
						<PropertyButton
							key={o.id}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o.icon}
							group={true}
							active={activeLineSize === o.size}
							onTap={e => {
								onProgressRingLineSizeTap(o.size);
							}}
						/>
					))}

					<SliderField
						theme={props.theme}
						value={props.layer.motion.line.size}
						onValueUpdate={onProgressRingLineSizeChange}
						valueRange={[1, 40]}
						valueIncrement={1}
						displayRange={[1, 40]}
						displayUnit={""}
						minWidth={24}
					/>
				</Row>
			)}

			{props.level2 === PropertyLevels.PROGRESS_RING_TEXT_OPTIONS && (
				<>
					<Group
						animate={{
							opacity: activeTextOpacity === 1 ? 1 : 0.35,
						}}
						initial={false}
					>
						<SwitchContainer
							onTap={() => {
								//setActiveTextOpacity(activeTextOpacity === 1 ? 0 : 1);
								const o = props.layer.motion.text.opacity.get();
								props.layer.motion.text.opacity.set(o === 1 ? 0 : 1);
							}}
						>
							<Switch theme={props.theme} isOn={activeTextOpacity === 1} isSmall={true} />
						</SwitchContainer>

						<PropertyButton
							id={"shape_text_color_btn"}
							type={PropertyButtonType.TEXT_COLOR}
							theme={props.theme}
							motionValue={props.layer.motion.text.color}
							onTap={e => {
								props.layer.motion.text.opacity.set(1);
								props.onButtonTap(PropertyLevels.SHAPE_TEXT_COLOR);
							}}
							active={props.level2 === PropertyLevels.SHAPE_TEXT_COLOR}
						/>

						<PropertyButton
							type={PropertyButtonType.ICON}
							theme={props.theme}
							iconName={"TextSize"}
							onTap={e => {
								props.layer.motion.text.opacity.set(1);
								props.onButtonTap(PropertyLevels.SHAPE_TEXT_STYLE);
							}}
							active={props.level2 === PropertyLevels.SHAPE_TEXT_STYLE}
						/>
					</Group>

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
						}}
					/> */}
				</>
			)}
			{props.level2 === PropertyLevels.PROGRESS_RING_AMOUNT && (
				<Row>
					<Slider
						theme={props.theme}
						value={props.layer.motion.line.progress}
						onValueUpdate={onProgressRingAmountChange}
						width={100}
					/>
					<SliderField
						theme={props.theme}
						value={props.layer.motion.line.progress}
						onValueUpdate={onProgressRingAmountChange}
						displayRange={[0, 100]}
						displayUnit={"%"}
					/>
				</Row>
			)}
			{props.level2 === PropertyLevels.PICTOGRAM_FILL_COLOR && (
				<>
					{lineColors.map((c, i) => (
						<PropertyButton
							key={"color_" + i}
							type={PropertyButtonType.SWATCH}
							theme={props.theme}
							color={c.hex}
							colorType={c.type}
							onTap={e => {
								onFillColorTap(c.hex);
							}}
							active={activeFillColor === c.hex}
						/>
					))}
				</>
			)}

			{props.level2 === PropertyLevels.PICTOGRAM_ITEMS && (
				<>
					{pictogramIcons.map(o => (
						<PropertyButton
							key={o}
							theme={props.theme}
							type={PropertyButtonType.ICON}
							iconName={o}
							group={true}
							active={activePictogramItem === o}
							onTap={e => {
								onPictogramItemTap(o);
							}}
						/>
					))}
				</>
			)}
			{props.level2 === PropertyLevels.PICTOGRAM_OPTIONS && (
				<>
					<Row
						style={{
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<Label
							style={{
								color: props.theme.colors.t7,
							}}
						>
							Total
						</Label>
						<SliderField
							theme={props.theme}
							value={props.layer.motion.meta.itemTotal}
							onValueUpdate={onPictogramItemTotalChange}
							valueRange={[1, 100]}
							valueIncrement={1}
							displayRange={[1, 100]}
							displayUnit={""}
						/>
					</Row>
					<Row
						style={{
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<Label
							style={{
								color: props.theme.colors.t7,
							}}
						>
							Filled
						</Label>
						<SliderField
							theme={props.theme}
							value={props.layer.motion.meta.itemFill}
							onValueUpdate={onPictogramItemFillChange}
							valueRange={[1, 100]}
							valueIncrement={1}
							displayRange={[1, 100]}
							displayUnit={""}
						/>
					</Row>
					<Row
						style={{
							justifyContent: "space-between",
						}}
					>
						<Label
							style={{
								color: props.theme.colors.t7,
							}}
						>
							Spacing
						</Label>

						<SliderField
							theme={props.theme}
							value={props.layer.motion.meta.itemSpacing}
							onValueUpdate={onPictogramItemSpacingChange}
							valueRange={[1, 40]}
							valueIncrement={1}
							displayRange={[1, 40]}
							displayUnit={""}
							minWidth={40}
						/>
					</Row>
				</>
			)}
		</Wrap>
	);
};

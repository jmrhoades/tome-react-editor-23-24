import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { gradient } from "../../../../ds/GradientImage";
import { Icon } from "../../../../ds/Icon";
import { TooltipContext } from "../../tooltips/TooltipContext";

export const colorType = {
	FILL: "fill",
	PICKER: "picker",
	CLEAR: "clear",
};

export const ColorRow = styled(motion.div)`
	display: flex;
	gap: 1px;
	padding: 4px 4px;
	flex-wrap: wrap;
`;

const controlSize = 26;
const colorSize = 18;

const Wrap = styled(motion.div)`
	position: relative;
	cursor: pointer;
	display: grid;
	justify-items: center;
	align-items: center;
	* {
		pointer-events: none;
	}
`;

const HoverBg = styled(motion.div)`
	grid-row: 1;
	grid-column: 1;
	border-radius: 4px;
	position: relative;
`;

const Fill = styled(motion.div)`
	grid-row: 1;
	grid-column: 1;
	border-radius: 50%;
	position: relative;
`;

const Picker = styled(motion.svg)`
	grid-row: 1;
	grid-column: 1;
	display: block;
	position: relative;
`;

const Asset = styled(motion.div)`
	grid-row: 1;
	grid-column: 1;
	display: block;
	position: relative;
	> svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Color = props => {
	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);

	//console.log(props.id, props.activeColor);
	const isSelected = props.activeColor === props.id;
	const ref = React.useRef(null);
	const [hovering, setHovering] = React.useState(false);
	return (
		<Wrap
			style={{
				width: controlSize,
				height: controlSize,
			}}
			onTap={() => {
				props.onTap(props.type, props.fillColor);
				resetTooltip();
			}}
			ref={ref}
			//whileTap={{ scale: 0.9 }}
			//key={"color_option_" + props.id}

			onHoverStart={e => {
				setHovering(true);
				showTooltip({
					id: "color_tooltip_" + props.id,
					ref: ref,
					label: props.label,
					alignX: "middle",
					alignY: "leading",
				});
			}}
			onHoverEnd={e => {
				setHovering(false);
				hideTooltip();
			}}
		>
			<HoverBg
				style={{
					backgroundColor: props.theme.colors.t3,
					width: controlSize,
					height: controlSize,
				}}
				initial={false}
				animate={{
					opacity: hovering ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
			/>

			{props.type === colorType.FILL && (
				<Fill
					style={{
						backgroundColor: props.fillColor,
						width: colorSize,
						height: colorSize,
					}}
					initial={false}
					animate={{
						scale: isSelected ? 16 / 22 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.1,
					}}
				/>
			)}

			{props.type === colorType.PICKER && (
				// <Icon name="ColorRing" />

				<Picker
					width={colorSize}
					height={colorSize}
					viewBox={`0 0 ${colorSize} ${colorSize}`}
					fill="none"
					initial={false}
					animate={{
						scale: isSelected ? 16 / 22 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.1,
					}}
				>
					<rect width={colorSize} height={colorSize} rx={colorSize / 2} fill="url(#pattern0)" fillOpacity="0.9" />
					<defs>
						<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlinkHref="#image0_5_6217" transform="scale(0.00217391)" />
						</pattern>
						<image id="image0_5_6217" width="460" height="460" xlinkHref={gradient} />
					</defs>
				</Picker>
			)}

			{props.type === colorType.CLEAR && (
				<Asset
					style={{
						width: colorSize,
						height: colorSize,
					}}
				>
					<Icon name="CircleRemove" size={24} opacity={1} color={props.theme.colors.t5} />
				</Asset>
			)}
		</Wrap>
	);
};

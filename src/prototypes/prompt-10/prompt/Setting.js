import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { TooltipContext } from "../tooltips/TooltipContext";

const SettingWrap = styled(motion.button)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	position: relative;
`;

const Label = styled(motion.div)`
	
	font-size: 13px;
	line-height: 20px;
	font-weight: 400;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: visible;
	position: relative;
	/* text-transform: uppercase; */
	/* letter-spacing: 0.24px; */

	-moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02";
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
`;

const HoverBackground = styled(Background)``;
const ActiveBackground = styled(Background)``;

const ThemePreview = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const ThemePreviewPage = styled(ThemePreview)``;
const ThemePreviewContent = styled(motion.div)``;

export const Setting = props => {
	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);
	
	const ref = React.useRef(null);
	const colors = props.theme.colors.promptbar;
	const assetSize = props.iconSize ? props.iconSize : 20;
	const [isHovering, setIsHovering] = React.useState(false);
	const isActive = props.active;

	//const padding = props.iconName ? "3px" : "6px 6px 6px 8px";
	//const padding = props.iconName ? "3px" : "6px 8px";

	let padding = "3px 8px 3px 8px";
	if (!props.label) padding = "3px 8px";

	let bgColor = colors.buttonBackground;
	const bgColorActive = props.activeBackgroundColor ? props.activeBackgroundColor : props.theme.colors.t2;
	let bgHover = colors.buttonBackgroundHover;
	let boxShadow = "transparent";

	let buttonLabelActive = props.theme.colors.labelActive;
	let buttonLabelHover = props.theme.colors.controls.labelHover;
	let buttonLabel = props.theme.colors.controls.label;
	let buttomLabelDisabled = props.theme.colors.controls.labelDisabled;

	let buttonIcon = buttonLabel;
	let buttonIconHover = buttonLabelHover;
	let buttonIconActive = buttonLabelActive;
	let buttonIconDisabled = buttomLabelDisabled;

	if (props.disabled) {
		bgColor = props.theme.colors.t1;
		bgHover = props.theme.colors.t0;
		buttonIcon = props.theme.colors.t4;
		buttonIconHover = props.theme.colors.t4;
		buttonIconActive = props.theme.colors.t4;
	}

	if (props.active) {
		bgHover = props.theme.colors.t0;
		buttonIcon = props.theme.colors.labelActive;
		buttonIconHover = props.theme.colors.t4;
		buttonIconActive = props.theme.colors.labelActive;
	}

	/*
	if (props.previewTheme) {
		bgColor = props.previewTheme.colors.backgrounds.page;

		buttonLabel = props.previewTheme.colors.text.body;
		buttonLabelHover = buttonLabel;
		buttonLabelActive = props.previewTheme.colors.text.body; //heading
		
		buttonIcon = props.previewTheme.colors.text.body;
		buttonIconHover = buttonIcon;
		buttonIconActive = props.previewTheme.colors.text.body; //heading

		if (props.theme.mode === "dark") {
			if (props.previewTheme.previewOutlineDark) {
				boxShadow = `0px 0px 0px 1px ${props.previewTheme.previewOutlineDark} `;
			}
		}
	}
	*/

	return (
		<SettingWrap
			id={props.id}
			ref={ref}
			style={{
				cursor: "pointer",
				padding: padding,
			}}
			onMouseMove={() => {
				if (!isHovering) {
					setIsHovering(true);
				}
			}}
			onHoverEnd={() => {
				setIsHovering(false);
				if (props.tooltip) hideTooltip();
			}}
			whileTap={{
				scale: 0.95,
			}}
			transition={{ duration: 0.2 }}
			onHoverStart={
				props.tooltip
					? e => {
							showTooltip({
								id: props.id,
								ref: ref,
								label: props.tooltip,
								alignX: "middle",
								alignY: "leading",
							});
					  }
					: undefined
			}
			onMouseDown={e => {
				e.stopPropagation();
				e.preventDefault();
				props.onTap();
				if (props.tooltip) resetTooltip();
			}}
		>
			<Background
				style={{
					backgroundColor: bgColor,
					borderRadius: 6,
					boxShadow: boxShadow,
					opacity: 1,
				}}
			/>

			<HoverBackground
				style={{
					backgroundColor: bgHover,
					borderRadius: 6,
				}}
				animate={{
					opacity: isHovering && !props.active ? 1 : 0,
				}}
				transition={{ duration: 0.15, ease: "easeOut" }}
				initial={false}
			/>

			<ActiveBackground
				style={{
					backgroundColor: bgColorActive,
					borderRadius: 6,
				}}
				animate={{
					opacity: isActive ? 1 : 0,
				}}
				initial={false}
				transition={{ duration: 0.15, ease: "easeOut" }}
			/>

			{props.iconName && (
				<Icon
					name={props.iconName}
					size={assetSize}
					opacity={1}
					color={
						props.active
							? props.iconActiveColor
								? props.iconActiveColor
								: buttonIconActive
							: isHovering
							? buttonIconHover
							: buttonIcon
					}
					transition={{ duration: isHovering ? 0.15 : 0, ease: "easeOut" }}
				/>
			)}

			{props.previewTheme && (
				<ThemePreview
					style={{
						width: assetSize,
						height: assetSize,
					}}
				>
					<ThemePreviewPage
						style={{
							width: 16,
							height: 16,
							backgroundColor: props.previewTheme.colors.backgrounds.page,
							borderRadius: 2,
							boxShadow: props.theme.mode === "dark" ? "0 0 0 1px hsla(0, 0%, 100%, 0.16) inset" : "transparent",
						}}
					>
						<ThemePreviewContent
							style={{
								color: props.previewTheme.colors.text.heading,
								fontSize: 9.5,
								fontWeight: 600,
								fontStyle: "italic",
								lineHeight: "18px",
								y: 0.1,
								x: 0.5,
							}}
						>
							A
						</ThemePreviewContent>
					</ThemePreviewPage>
				</ThemePreview>
			)}

			{props.label && (
				<Label
					transition={{ duration: isHovering ? 0.15 : 0, ease: "easeOut" }}
					initial={false}
					animate={{
						color: props.disabled
							? buttonIconDisabled
							: props.active
							? buttonLabelActive
							: isHovering
							? buttonLabelHover
							: buttonLabel,
					}}
					style={{
						//minWidth: 15,
						textAlign: "left",
					}}
				>
					{props.label}
				</Label>
			)}
			{/* {props.iconName && (
			<Icon
				name={props.iconName ? props.iconName : "Dropdown"}
				size={props.iconName ? 20 : 10}
				opacity={1}
				color={
					props.active
						? props.iconActiveColor
							? props.iconActiveColor
							: colors.buttonIconActive
						: isHovering
						? colors.buttonIconHover
						: colors.buttonIcon
				}
				transition={{ duration: isHovering ? 0.15 : 0, ease: "easeOut" }}
			/> */}
		</SettingWrap>
	);
};

import React from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../ds/Icon";
import { Spinner } from "./Spinner";
import { uniqueId } from "lodash";
import { TooltipContext } from "../tooltips/TooltipContext";
import { TomeContext } from "../tome/TomeContext";

export const labelStyles = {
	
	fontStyle: "normal",
	fontSize: "13px",
	fontWeight: 400,
	lineHeight: "16px",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
};

export const fieldTypeStyles = {
	
	fontStyle: "normal",
	fontSize: "13px",
	fontWeight: 400,
	lineHeight: "16px",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
};

export const buttonLabelStyles = {
	
	fontStyle: "normal",
	fontSize: "13px",
	fontWeight: 400,
	lineHeight: "16px",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textAlign: "center",
};

export const recordLabelStyles = {
	
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "13px",
	lineHeight: 1,
};

const Button = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	gap: 4px;
`;

const Anchor = styled(motion.a)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Label = styled(motion.div)`
	position: relative;
	overflow: visible;
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
`;

const PageColor = styled(Background)``;

const LoadingContainer = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const HoverBackground = styled(Background)``;

const ActiveBackground = styled(Background)``;
const LoadingBackground = styled(Background)``;

export const IconButton = ({
	theme,
	width = 32,
	height = 32,
	borderRadius = 6,
	iconSize = 24,
	backgroundColor = "transparent",
	backgroundBlur = false,
	color = theme.colors.t7,
	activeColor = theme.colors.t9,
	hoverBackgroundColor = theme.colors.t3,
	activeBackgroundColor = theme.colors.t4,
	iconDisabledColor = theme.colors.t5,
	backgroundDisabledColor = theme.colors.t1,
	hasActiveBackground = true,
	icon = "PlaybackPlay",
	hasHover = true,
	to = undefined,
	style = {},
	showBorder = false,
	id = uniqueId("button"),
	disabled = undefined,
	onTap = null,
	active = false,
	tooltip = false,
	pageColor = false,
}) => {
	const El = to ? Anchor : Button;
	const href = to;

	const ref = React.useRef(null);
	//const hoverOpacity = useMotionValue(0);
	const [hovering, setHovering] = React.useState(false);

	const { userDragging } = React.useContext(TomeContext);
	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);

	// Disable interactivity if the user is dragging something around the screen
	const pointerEvents = useMotionValue("auto");
	useMotionValueEvent(userDragging, "change", latest => {
		if (latest === true) {
			pointerEvents.set("none");
		} else {
			pointerEvents.set("auto");
		}
	});
	

	return (
		<El
			whileTap={{
				scale: 0.99,
			}}
			style={{
				width,
				height,
				borderRadius,
				boxShadow: showBorder ? `0px 0px 0px 1px ${theme.colors.t4}` : "none",
				pointerEvents: pointerEvents,
				outline: "none",
				...style,
			}}
			onTap={onTap}
			href={href}
			id={id}
			ref={ref}
			onHoverStart={e => {
				setHovering(true);
				if (tooltip)
					showTooltip({
						id: id,
						ref: ref,
						label: tooltip,
						alignX: "middle",
						alignY: "leading",
					});
			}}
			onHoverEnd={e => {
				setHovering(false);
				if (tooltip) hideTooltip();
			}}
			onPointerDown={e => {
				if (tooltip) resetTooltip();
			}}
		>
			{pageColor && (
				<PageColor
					style={{
						backgroundColor: pageColor,
					}}
				/>
			)}

			<Background
				style={{
					backgroundColor: disabled ? backgroundDisabledColor : backgroundColor,
					WebkitBackdropFilter: backgroundBlur ? "blur(25px)" : "unset",
					backdropFilter: backgroundBlur ? "blur(25px)" : "unset",
				}}
			/>

			{active && hasActiveBackground && (
				<ActiveBackground
					initial={"default"}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					style={{ backgroundColor: activeBackgroundColor }}
				/>
			)}

			{!active && hasHover && (
				<HoverBackground
					style={{ backgroundColor: hoverBackgroundColor }}
					initial={false}
					animate={{
						opacity: hovering ? 1 : 0,
					}}
					transition={{
						ease: "easeOut",
						duration: hovering ? 0.1 : 0.2,
					}}
				/>
			)}

			<Icon
				name={icon}
				size={iconSize}
				opacity={1}
				color={disabled ? iconDisabledColor : active ? activeColor : color}
				transition={{ duration: 0.2 }}
			/>
		</El>
	);
};

export const LabelButton = ({
	theme,
	height = 32,
	width = "auto",
	paddingX = 8,
	borderRadius = 6,
	onTap = null,
	active = false,
	backgroundColor = "transparent",
	backgroundHoverColor = theme.colors.t2,
	backgroundDisabledColor = theme.colors.t1,
	backgroundBlur = false,
	label = "Label",
	fontSize = 15,
	fontWeight = 400,
	labelColor = theme.colors.controls.label,
	labelHoverColor = theme.colors.controls.labelHover,
	labelActiveColor = theme.colors.labelActive,
	labelDisabledColor = theme.colors.t5,
	style = {},
	icon = undefined,
	iconSize = 24,
	disabled = false,
	initial = undefined,
	animate = undefined,
	loading = false,
	hasLoader = false,
}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	if (disabled) backgroundHoverColor = theme.colors.t0;

	const labelOpacity = loading ? 0 : 1;
	const backgroundOpacity = loading ? 0 : 1;

	const loadingBackgroundOpacity = loading ? 1 : 0;
	const loadingBackgroundColor = theme.colors.t2;
	const loadingSpinnerSize = height / 2;
	//if (loading) width = height;

	return (
		<Button
			style={{
				paddingLeft: icon ? paddingX - 2 : paddingX,
				paddingRight: paddingX,
				height,
				width,
				borderRadius,
				...style,
				pointerEvents: disabled ? "none" : "auto",
				cursor: disabled ? "default" : "pointer",
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			whileTap={{
				scale: 0.985,
			}}
			onTap={onTap}
			initial={initial}
			animate={animate}
			//layout
			transition={{ duration: 0.2 }}
		>
			<LoadingBackground
				style={{
					backgroundColor: loadingBackgroundColor,
				}}
				animate={{
					opacity: loadingBackgroundOpacity,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			/>
			<Background
				style={{
					backgroundColor: disabled ? backgroundDisabledColor : backgroundColor,
					WebkitBackdropFilter: backgroundBlur ? "blur(25px)" : "unset",
					backdropFilter: backgroundBlur ? "blur(25px)" : "unset",
				}}
				animate={{
					opacity: backgroundOpacity,
				}}
				transition={{
					duration: 0.2,
				}}
				initial={false}
			/>
			<HoverBackground
				style={{
					backgroundColor: backgroundHoverColor,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			/>

			{icon && (
				<Icon
					name={icon}
					opacity={1}
					color={
						disabled ? labelDisabledColor : active ? labelActiveColor : isHovering ? labelHoverColor : labelColor
					}
					transition={{ duration: 0.2 }}
					size={iconSize}
				/>
			)}
			<Label
				style={{
					...buttonLabelStyles,
					fontSize: fontSize,
					fontWeight: fontWeight,
				}}
				animate={{
					color: disabled
						? labelDisabledColor
						: active
						? labelActiveColor
						: isHovering
						? labelHoverColor
						: labelColor,
					opacity: labelOpacity,
				}}
				transition={{
					duration: 0.2,
					opacity: {
						duration: 0.2,
						delay: loading ? 0 : 0.1,
					},
				}}
				initial={false}
				layout
			>
				{label}
			</Label>
			<AnimatePresence mode={"popLayout"}>
				{loading && (
					// <LoadingContainer>
					// <Dots theme={theme} />
					// </LoadingContainer>

					<LoadingContainer
						transition={{
							duration: 0.2,
							opacity: {
								duration: 0.2,
								delay: loading ? 0.1 : 0,
							},
						}}
						animate={{
							opacity: loading ? 1 : 0,
						}}
					>
						<Spinner
							size={14}
							background={theme.colors.t3}
							foreground={theme.colors.t6}
							strokeWidth={1.75}
							endAngle={270}
						/>
					</LoadingContainer>
				)}
			</AnimatePresence>
		</Button>
	);
};

export const RegenButton = ({
	theme,
	onTap = undefined,
	active = undefined,
	disabled = undefined,
	isLoading = false,

	hasBackground = true,
	backgroundColor = "hsla(0,0%,0%,0.40)",
	backgroundColorHover = theme.colors.t2,
	backgroundColorActive = theme.colors.t6,

	label = "Label",
	labelColor = theme.colors.t9,
	labelColorHover = theme.colors.t9,
	labelColorActive = theme.colors.t9,

	loadingLabel = "Rewriting…",

	icon = "DoubleSparkle",
	iconColor = theme.colors.t9,
	iconColorHover = theme.colors.t9,
	iconColorActive = theme.colors.t9,

	paddingLeft = 8,
	paddingRight = 10,
	borderRadius = 6,
	style = {},
}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	React.useEffect(() => {
		if (isLoading) {
			setIsHovering(false);
		}
	}, [isLoading]);

	return (
		<Button
			//layout
			style={{
				paddingLeft: paddingLeft,
				paddingRight: paddingRight,
				height: 28,
				...style,
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			onMouseDown={e => {
				e.stopPropagation();
			}}
			onMouseUp={e => {
				e.stopPropagation();
			}}
			whileTap={{ scale: 0.975 }}
			onTap={onTap}
		>
			{hasBackground && (
				<Background
					style={{
						backgroundColor: backgroundColor,
						borderRadius: borderRadius,
						backdropFilter: "blur(100px)",
					}}
					animate={{
						opacity: !isLoading ? 1 : 0,
					}}
					transition={{
						duration: 0.2,
					}}
					initial={false}
				/>
			)}
			<HoverBackground
				style={{
					backgroundColor: backgroundColorHover,
					borderRadius: borderRadius,
				}}
				animate={{
					opacity: isHovering && !isLoading ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				initial={{
					opacity: 0,
				}}
			/>
			{isLoading && (
				<Spinner size={18} background={theme.colors.t6} foreground={theme.colors.accent} strokeWidth={1.75} />
			)}
			{!isLoading && (
				<Icon
					name={icon}
					opacity={1}
					color={active ? iconColorActive : isHovering ? iconColorHover : iconColor}
					transition={{ duration: 0.2 }}
					size={16}
				/>
			)}

			{!isLoading && label.length > 0 && (
				<Label
					style={{
						...buttonLabelStyles,
						fontSize: 13,
						y: -0.5,
					}}
					animate={{
						color: active ? labelColorActive : isHovering ? labelColorHover : labelColor,
					}}
					transition={{
						duration: 0.2,
					}}
					initial={false}
				>
					{label}
				</Label>
			)}

			{/* {!isLoading && (
					<ButtonContent layout="position">
						<Icon
							name={icon}
							opacity={1}
							color={active ? iconColorActive : isHovering ? iconColorHover : iconColor}
							transition={{ duration: 0.2 }}
							size={16}
						/>
						<Label
							style={{
								...buttonLabelStyles,
								fontSize: 13,
								y: -0.5,
							}}
							animate={{
								color: active ? labelColorActive : isHovering ? labelColorHover : labelColor,
							}}
							transition={{
								duration: 0.2,
							}}
							initial={false}
						>
							{label}
						</Label>
					</ButtonContent>
				)} */}
		</Button>
	);
};

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "./Icon";

/* 

Button Variations
kind, type, style, size

KIND - link
        TYPE - default, dropdown, back
	- action
        TYPE - default, icon
        STYLE - default, primary, destructive
	- icon
SIZE - sm, md, lg
*/

const ButtonWrap = styled(motion.button)`
	border: none;
	margin: 0;
	background: transparent;
	appearance: none;
	position: relative;
	display: block;
	padding: ${props => props.padding};
	line-height: 1;
	height: ${props => props.height}px;
	min-width: ${props => props.minwidth}px;
	width: ${props => props.width};
	outline: none;
`;

const LinkWrap = styled(motion.a)`
	position: relative;
	margin: 0;
	text-decoration: none;
	display: block;
	padding: ${props => props.padding};
	line-height: 1;
	height: ${props => props.height}px;
	min-width: ${props => props.minWidth}px;
	/* cursor: pointer; */
	width: ${props => props.width};
	outline: none;
`;

const Label = styled(motion.span)`
	display: block;
	position: relative;
	font-weight: ${props => props.fontWeight};
	font-size: ${props => props.fontSize};
`;

const Background = styled(motion.span)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: ${props => props.color};
	border-radius: ${props => props.radius}px;
`;

const Hover = styled(Background)``;

const Content = styled(motion.span)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;
	& > svg {
		margin: ${props => props.iconmargin};
	}
`;

const Count = styled(motion.span)`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 1;
	padding-left: 2px;
	padding-right: 2px;
	padding-top: 1px;
`;

const Badge = styled(motion.span)`
	position: absolute;
	top: 8px;
	left: 20px;
	width: 8px;
	height: 8px;
	background-color: #ed00eb;
	border-radius: 50%;
	border: 2px solid #141414;
`;

export const Button = ({
	kind = "link",
	type = "default",
	role = "default",
	size = "sm",
	label,
	icon,
	color = "rgba(255,255,255,1)",
	selected,
	selectedColor = "rgba(237, 0, 235, 1)",
	selectedBackgroundColor,
	customIconSize,
	isContextual,
	to,
	height,
	padding,
	minWidth,
	nohover,
	onTap,
	onMouseUp,
	width = "auto",
	withBadge = false,
	withCount = 0,
	radius = false,
	assetOpacity = false,
	colorRingColor = "white",
	isToggle = false,
	style = {},
}) => {
	const buttonHeight = () => {
		switch (kind) {
			case "icon":
				return 40;
			case "action":
				switch (size) {
					case "lg":
						return 40;
					case "md":
						return 28;
					default:
						return 24;
				}
			default:
				switch (size) {
					case "lg":
						return 32;
					case "md":
						return 28;
					default:
						return 24;
				}
		}
	};

	const buttonPadding = () => {
		switch (kind) {
			case "icon":
				return width === "auto" ? "0 6px" : "0";
			case "action":
				switch (size) {
					case "lg":
						return "0 48px";
					case "md":
						return "0 21px";
					default:
						return "0 8px";
				}
			default:
				switch (type) {
					case "dropdown":
						switch (size) {
							case "lg":
								return "0 10px 0 16px";
							case "md":
								return "0 6px 0 10px";
							default:
								return "0 6px 0 8px";
						}
					case "back":
						switch (size) {
							case "lg":
								return "0 10px 0 4px";
							case "md":
								return "0 8px 0 2px";
							default:
								return "0 6px 0 2px";
						}
					default:
						switch (size) {
							case "lg":
								return "0 10px";
							case "md":
								return "0 10px";
							default:
								return "0 8px";
						}
				}
		}
	};

	const buttonMinWidth = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return 188;
					case "md":
						return 104;
					default:
						return 40;
				}
			default:
				return 28;
		}
	};

	const backgroundColor = () => {
		switch (kind) {
			case "action":
				switch (role) {
					case "primary":
						return "rgba(255, 51, 253, 1)";
					case "destructive":
						return "rgba(255, 77, 77, 1)";
					default:
						return "rgba(255, 255, 255, 0.08)";
				}
			case "link":
				if (selected) return "rgba(255,255,255,0.12)";
				break;
			case "icon":
				if (selected) return selectedBackgroundColor ? selectedBackgroundColor : "rgba(255, 255, 255, 0.08)";
				break;
			default:
				return "rgba(255,255,255,0.0)";
		}
	};

	const backgroundCornerRadius = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return 10;
					case "md":
						return 8;
					default:
						return 6;
				}
			default:
				return radius ? radius : 6;
		}
	};

	const hoverColor = () => {
		switch (kind) {
			case "icon":
				if (isContextual) return "rgba(41, 0, 41, 1)";
				if (isContextual && selected) return "rgba(61, 24, 61, 1)";
				if (selected) return "rgba(51, 20, 51, 1)";
				return "rgba(255,255,255,0.08)";
			default:
				return "rgba(255,255,255,0.08)";
		}
	};

	const fontWeight = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return 700;
					default:
						return 500;
				}
			default:
				return 500;
		}
	};

	const fontSize = () => {
		switch (kind) {
			default:
				switch (size) {
					case "lg":
						return "15px";
					case "md":
						return "13px";
					default:
						return "13px";
				}
		}
	};

	const fontOpacity = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return 1.0;
					case "md":
						switch (role) {
							case "primary":
								return 1.0;
							case "destructive":
								return 1.0;
							default:
								return 0.4;
						}
					default:
						switch (role) {
							case "primary":
								return 1.0;
							case "destructive":
								return 1.0;
							default:
								return 0.4;
						}
				}
			default:
				switch (size) {
					case "lg":
						switch (role) {
							case "primary":
								return 0.8;
							default:
								return 0.4;
						}
					case "md":
						return 0.4;
					default:
						return 0.4;
				}
		}
	};

	const iconSize = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return 20;
					case "md":
						return 16;
					default:
						return 15;
				}
			case "icon":
				return customIconSize ? customIconSize : 28;
			default:
				return 20;
		}
	};

	const iconBackSize = () => {
		switch (size) {
			case "lg":
				return 24;
			case "md":
				return 20;
			default:
				return 16;
		}
	};

	const iconMargin = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return "0 6px 0 0";
					case "md":
						return "0 4px 0 0";
					default:
						return "0 2px 0 0";
				}

			case "link":
				switch (type) {
					case "back":
						return 0;
					default:
						return "0 0 0 4px";
				}
			default:
				return "0";
		}
	};

	const iconOpacity = () => {
		switch (kind) {
			case "action":
				switch (size) {
					case "lg":
						return 1.0;
					case "md":
						switch (role) {
							case "primary":
								return 1.0;
							case "destructive":
								return 1.0;
							default:
								return 0.4;
						}
					default:
						switch (role) {
							case "primary":
								return 1.0;
							case "destructive":
								return 1.0;
							default:
								return 0.4;
						}
				}
			default:
				return assetOpacity ? assetOpacity : 0.4;
		}
	};

	const buttonVariants = {
		default: {
			opacity: 1,
		},
		hover: {
			opacity: 1,
		},
		active: {
			scale: 0.95,
			transition: { duration: 0.08 },
		},
		disabled: {
			opacity: 0.5,
		},
	};

	const backgroundVariants = {
		default: {
			opacity: 1,
		},
		hover: {
			opacity: 1,
		},
		active: {
			opacity: 1,
		},
		disabled: {
			opacity: 1,
		},
	};

	const hoverVariants = {
		default: {
			opacity: 0,
		},
		hover: {
			opacity: (selected && !isToggle) ? 0 : 1,
			transition: { duration: 0.08 },
		},
		active: {
			opacity: 1,
			transition: { duration: 0.08 },
		},
		disabled: {
			opacity: 0,
		},
	};

	const labelOpacity = fontOpacity();
	const labelVariants = {
		default: {
			opacity: labelOpacity,
			color: color,
		},
		hover: {
			opacity: labelOpacity,
			color: color,
		},
		active: {
			opacity: labelOpacity,
			color: color,
		},
		disabled: {
			opacity: labelOpacity,
			color: color,
		},
	};

	const iconBackVariants = {
		default: {
			x: 0,
			transition: {
				duration: .2,
			},
		},
		hover: {
			x: -1.5,
			transition: {
				duration: .2,
			},
		},
		active: {
			x: -1.5,
			transition: {
				duration: .2,
			},
		},
		disabled: {
			x: 0,
			transition: {
				duration: .2,
			},
		},
	};

	const iconDropdownVariants = {
		default: {
			y: 0,
			transition: {
				duration: .2,
			},
		},
		hover: {
			y: 1.5,
			transition: {
				duration: .2,
			},
		},
		active: {
			y: 1.5,
			transition: {
				duration: .2,
			},
		},
		disabled: {
			y: 0,
			transition: {
				duration: .2,
			},
		},
	};

	const Wrap = kind === "link" || to ? LinkWrap : ButtonWrap;

	return (
		<Wrap
			padding={padding ? padding : buttonPadding()}
			height={height ? height : buttonHeight()}
			minwidth={minWidth ? minWidth : buttonMinWidth()}
			width={width}
			whileTap="active"
			whileHover="hover"
			initial="default"
			variants={buttonVariants}
			href={to}
			onTap={onTap}
			onMouseUp={onMouseUp}
			style={style}
		>
			<Background variants={backgroundVariants} color={backgroundColor()} radius={backgroundCornerRadius()} />

			<Hover
				variants={hoverVariants}
				color={nohover || (selected && !isToggle) ? "transparent" : hoverColor()}
				radius={backgroundCornerRadius()}
			/>

			<Content iconmargin={iconMargin()}>
				{type === "back" && <Icon size={iconBackSize()} name="ChevronLeft" variants={iconBackVariants} />}

				{kind === "icon" && icon && (
					<Icon
						size={iconSize()}
						name={icon}
						color={selected ? selectedColor : color}
						opacity={selected || isContextual ? 1.0 : iconOpacity()}
						selected={selected}
					/>
				)}

				{type === "icon" && icon && <Icon size={iconSize()} name={icon} color={color} opacity={iconOpacity()} />}

				{label && (
					<Label fontWeight={fontWeight()} fontSize={fontSize()} variants={labelVariants}>
						{label}
					</Label>
				)}

				{withBadge && <Badge />}

				{withCount > 0 && <Count variants={labelVariants}>{withCount}</Count>}

				{type === "dropdown" && <Icon size={10} name="Dropdown" variants={iconDropdownVariants} />}
			</Content>
		</Wrap>
	);
};

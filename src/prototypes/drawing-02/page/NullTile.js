import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { Icon } from "../../../ds/Icon";
import { TomeContext } from "../tome/TomeContext";

export const NullTilePlaceholder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.$background_color};

	& svg {
		display: block;
	}
	& button {
		display: block;
		position: absolute;
		text-align: center;
	}
	& input {
		display: block;
		position: absolute;
		text-align: left;

		&::placeholder {
			color: ${props => props.$placeholder_color};
		}
	}
	& p {
		text-align: center;
		color: rgba(255, 255, 255, 0.4);
	}
`;

export const NullMediaTile = props => {
	const { isPlayMode, addFilesToRowAtOrderWithMaxPerRow, tomeData } = useContext(TomeContext);

	const buttonHeight = 32 * props.scale;
	let buttonFontSize = 13 * props.scale;
	const buttonLineHeight = 15 * props.scale;
	const buttonBorderRadius = 8 * props.scale;
	const iconSize = 96 * props.scale;
	const labelFontSize = 11 * props.scale;
	const labelLineHeight = 13 * props.scale;

	const inputPadding = 8 * props.scale;

	let metrics = {
		iconY: -24,
		buttonY: 48,
		labelY: 88,

		iconScale: 1,
		iconOpacity: 1,

		labelOpacity: 1,
		buttonOpacity: 1,
		inputOpacity: 1,

		inputWidth: 190,
		buttonWidth: 109 * props.scale,
		buttonHeight: 32 * props.scale,
	};

	if (props.tileWidth <= 3) {
		metrics.inputWidth = 109;
	}

	if (props.rowHeight <= 5) {
		metrics.iconY = -34;
		metrics.buttonY = 32;
		metrics.labelY = 64;
	}

	if (props.rowHeight <= 4) {
		metrics.iconScale = 0.75;
		metrics.iconY = -20;
		metrics.buttonY = 36;
		metrics.labelY = 56;
		metrics.labelOpacity = 0;
	}

	if (props.rowHeight <= 3) {
		metrics.iconScale = 0.75;
		metrics.iconY = 0;
		metrics.buttonOpacity = 0;
		metrics.inputOpacity = 0;
		// metrics.buttonY = -8;
		// metrics.labelY = 24;
	}

	if (props.rowHeight <= 2) {
		metrics.iconScale = 0.5;
		metrics.buttonY = 0;
		metrics.labelOpacity = 0;
	}

	if (props.rowHeight <= 1) {
		metrics.iconScale = 0.25;
		metrics.buttonOpacity = 0;
		metrics.inputOpacity = 0;
	}

	if (props.tileWidth <= 1 && props.rowHeight >= 2) {
		metrics.iconScale = 0.75;
		//metrics.iconY = -30;
		metrics.inputWidth = 40;
		metrics.buttonWidth = 32;
		metrics.buttonY = 30;
		//metrics.buttonOpacity = 0;
		//metrics.inputOpacity = 0;
		//buttonFontSize = 10 * props.scale;
	}

	if (props.tileWidth > 1 && props.rowHeight <= 3) {
		metrics.iconOpacity = 0;
		metrics.buttonOpacity = 1;
		metrics.inputOpacity = 1;
		metrics.buttonY = 0;
	}

	if (props.tileWidth > 1 && props.rowHeight === 1) {
		//metrics.iconOpacity = 1;
		//metrics.iconScale = 0.25;
		//metrics.iconY = 0;
		//metrics.buttonOpacity = 0;
		//metrics.inputOpacity = 0;
	}

	if (isPlayMode) {
		metrics.inputOpacity = 0;
		metrics.buttonOpacity = 0;
		metrics.labelOpacity = 0;
	}

	const shortMessage = "Paste link…";

	return (
		<NullTilePlaceholder
			$placeholder_color={props.theme ? props.theme.colors.t7 : "transparent"}
			$background_color={props.theme.colors.backgrounds.tile.null}
		>
			<motion.div
				style={{
					position: "absolute",
					top: `calc(50% - ${iconSize / 2}px)`,
					left: `calc(50% - ${iconSize / 2}px)`,
					width: iconSize,
					height: iconSize,
				}}
				animate={{
					scale: metrics.iconScale,
					y: metrics.iconY * props.scale,
					opacity: metrics.iconOpacity,
				}}
				initial={false}
				transition={transitions.layoutTransition}
			>
				<Icon name={props.iconName} size={iconSize} color={props.theme.colors.t6} opacity={1} />
			</motion.div>

			{!props.isEmbed && (
				<motion.button
					type="file"
					id="image_file"
					name="filename"
					style={{
						left: `calc(50% - ${metrics.buttonWidth / 2}px)`,
						top: `calc(50% - ${metrics.buttonHeight / 2}px)`,
						width: props.tileWidth === 1 ? 28 : metrics.buttonWidth,
						height: props.tileWidth === 1 ? 28 : buttonHeight,
						fontSize: buttonFontSize,
						lineHeight: buttonLineHeight + "px",
						borderRadius: buttonBorderRadius,
						color: props.theme ? props.theme.colors.t7 : "transparent",
						background: props.theme ? props.theme.colors.t2 : "transparent",
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
					}}
					whileHover={{
						background: props.theme ? props.theme.colors.t3 : "transparent",
					}}
					whileTap={{
						scale: 0.95,
					}}
					animate={{
						y: metrics.buttonY * props.scale,
						opacity: metrics.buttonOpacity,
					}}
					initial={false}
					transition={transitions.layoutTransition}
					//onTap={(e)=>{console.log("Button!")}}
					onMouseDown={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onMouseUp={e => {
						e.preventDefault();
						e.stopPropagation();

						document.getElementById(props.tileId + "_file_input").click();
						//console.log("Button!");
					}}
				>
					{props.tileWidth > 1 && props.buttonLabel}
					{props.tileWidth === 1 && <Icon name="ArrowUp" size={20} color={props.theme.colors.t7} opacity={1} />}
				</motion.button>
			)}

			{!props.isEmbed && (
				<input
					type="file"
					hidden
					id={props.tileId + "_file_input"}
					multiple
					style={{ visibility: "hidden" }}
					onChange={e => {
						const files = [...e.target.files];
						if (files) {
							const hasMedia = files.find(({ type }) => type.match("image.*") || type.match("video.*"));
							if (hasMedia) {
								const mediaFiles = files.filter(({ type }) => type.match("image.*") || type.match("video.*"));
					

								// remove tile, add new tile at that the replaced tile's row & order
								tomeData.tiles.splice(tomeData.tiles.indexOf(props.tile.tileOver), 1);
								addFilesToRowAtOrderWithMaxPerRow(mediaFiles, props.row, props.tile.order, 4);
							}
						}
			
					}}
				/>
			)}

			{props.isEmbed && (
				<motion.input
					style={{
						top: `calc(50% - ${buttonHeight / 2}px)`,
						height: buttonHeight,
						fontSize: buttonFontSize,
						lineHeight: buttonLineHeight + "px",
						borderRadius: buttonBorderRadius,
						paddingLeft: inputPadding,
						paddingRight: inputPadding,
						color: props.theme ? props.theme.colors.t7 : "transparent",
						background: props.theme ? props.theme.colors.t1 : "transparent",
						border: `1px solid ${props.theme ? props.theme.colors.t1 : "transparent"}`,
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						display: "block",
					}}
					animate={{
						y: metrics.buttonY * props.scale,
						opacity: metrics.inputOpacity,
						left: `calc(50% - ${(metrics.inputWidth * props.scale) / 2}px)`,
						width: metrics.inputWidth * props.scale,
					}}
					initial={false}
					transition={transitions.layoutTransition}
					placeholder={props.tileWidth <= 3 ? shortMessage : props.inputPlaceholder}
				/>
			)}

			{/* {!props.isEmbed && (
				<motion.p
					style={{
						position: "absolute",
						top: `calc(50% - ${labelLineHeight / 2}px)`,
						left: `calc(50% - ${buttonWidth / 2}px)`,
						width: buttonWidth,
						height: labelLineHeight,
						fontSize: labelFontSize,
						lineHeight: labelLineHeight + "px",
					}}
					animate={{
						y: metrics.labelY * props.scale,
						opacity: metrics.labelOpacity,
					}}
					initial={false}
					transition={transitions.layoutTransition}
				>
					{props.labelLabel}
				</motion.p>
			)} */}
		</NullTilePlaceholder>
	);
};

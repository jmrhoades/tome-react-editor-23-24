import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";
import { transitions } from "../ds/Transitions";
import { Spinner } from "../ds/Spinner";
import { RegenButton, IconButton } from "../ds/Buttons";
import { TomeContext } from "../tome/TomeContext";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

export const CaptionContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	pointer-events: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
`;

export const Caption = styled(motion.div)`
	backdrop-filter: blur(50px);
	word-wrap: break-word;
	word-break: all;
	overflow-wrap: break-word;
`;

const AIButtonContainer = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: right;
	align-items: flex-end;
	gap: 8px;
	position: absolute;
	top: 8px;
	left: 8px;
`;

const ImageLoader = styled(motion.img)`
	position: absolute;
	pointer-events: none;
	top: 0;
	left: 0;
	opacity: 0;
`;

export const TileImage = props => {
	const { isReviewing } = useContext(TomeContext);
	const { scale, tileCornerRadius } = useContext(MetricsContext).metrics;

	const captionWidth = props.tileWidth ? props.tileWidth : 100;

	const onFileLoaded = () => {
		//console.log("image tile: file loaded")
		//calcRowHeights();
	};

	//if (props.tile) props.tile.onFileLoaded = onFileLoaded;
	const isLoading = props.tile && props.tile.params && props.tile.params.isLoading ? true : false;
	//console.log(props.tile.params.isLoading)

	let backgroundColor = "transparent";
	if (isLoading) backgroundColor = props.theme.colors.backgrounds.tile.null;
	//backgroundColor = props.theme.colors.z1;
	if (props.backgroundColor) backgroundColor = props.backgroundColor;

	return (
		<ImageWrap
			style={{
				backgroundColor: backgroundColor,
				borderRadius: props.borderRadius,
			}}
		>
			{!props.image && !props.deviceImage && !isLoading && (
				<NullMediaTile
					tileId={props.tileId}
					row={props.row}
					tile={props.tile}
					rowHeight={props.rowHeight}
					scale={scale}
					iconName={"Image"}
					buttonLabel={"Add image"}
					labelLabel={"Or drop here"}
					theme={props.theme}
					tileWidth={props.tileUnitWidth}
				/>
			)}

			{props.isPreview && (
				<ImageLoader
					src={props.image}
					onLoad={e => {
						props.tile.params.isLoading = false;
						props.tile.params.needsGeneration = false;
						props.saveState();
					}}
				/>
			)}

			<AnimatePresence>
				{props.image && props.image.length > 1 && (
					<Image
						style={{
							backgroundSize: props.imageSize ? props.imageSize : "cover",
							backgroundPosition: props.imagePosition ? props.imagePosition : "center",
							top: props.paddingY ? props.paddingY * scale : undefined,
							bottom: props.paddingY ? props.paddingY * scale : undefined,
							height: props.paddingY ? "unset" : "100%",
						}}
						key={props.image}
						image={props.image}
						initial={{
							opacity: 1,
						}}
						animate={{
							opacity:
								isLoading && !props.tile.params.needsGeneration
									? 0
									: isLoading && props.tile.params.needsGeneration
									? 0.25
									: 1,
						}}
						exit={{
							opacity: 0,
						}}
						transition={{
							type: "tween",
							duration: 0.5,
						}}
					/>
				)}
			</AnimatePresence>

			{props.tile && props.tile.params.isLoading && !props.isPreview && (
				<Spinner
					size={72 * scale}
					background={props.theme.colors.t2}
					foreground={props.theme.colors.t6}
					strokeWidth={3}
				/>
			)}

			{props.caption && (
				<CaptionContainer
					animate={{
						width: captionWidth,
						minWidth: captionWidth,
					}}
					transition={transitions.layoutTransition}
				>
					<Caption
						style={{
							width: captionWidth - 16 * scale * 2,
							minWidth: captionWidth - 16 * scale * 2,
							overflow: "hidden",
							margin: 16 * scale,
							backgroundColor: props.caption.background,
							color: props.caption.text,
							fontFamily: props.theme.typography.fontFamily,
							fontSize: props.theme.typography.fontSize.CAPTION * scale,
							padding: `${5 * scale}px ${8 * scale}px`,
							borderRadius: `${8 * scale}px`,
							fontWeight: props.theme.typography.fontWeight.CAPTION,
							lineHeight: props.theme.typography.lineHeight.CAPTION,
							textAlign: "center",
						}}
					>
						{props.caption.content}
					</Caption>
				</CaptionContainer>
			)}

			{props.tile.params.canRegenerate &&
				props.image &&
				props.image.length > 1 &&
				props.prompt &&
				!props.isPreview &&
				!props.tile.params.isLoading &&
				isReviewing && (
					<LeftReviewControls>
					<RegenButton
						//disabled={isLoading}
						icon="DoubleSparkle"
						label="Regenerate"
						loadingLabel="Regenerating…"
						hasBackground={true}
						theme={props.theme}
						isLoading={isLoading}
						// style={{
						// 	pointerEvents: isLoading ? "none" : "auto",
						// }}
						onTap={
							isLoading
								? undefined
								: e => {
										//console.log(props.image);
										//props.tile.params.image = "";
										props.tile.params.isLoading = true;
										props.tile.params.needsGeneration = true;
										props.requestDalleImageForTile(props.tile);
										props.saveState();
								  }
						}
					/>
					</LeftReviewControls>
				)}

			{props.tile && props.tile.params && props.tile.params.canRegenerate && isReviewing && (
				<RightReviewControls>
					<RegenButton
						icon="Close"
						theme={props.theme}
						label=""
						paddingLeft={5}
						paddingRight={5}
						hasBackground={true}
						iconSize={18}

						// width={28}
						// height={28}
						// borderRadius={6}
						// iconSize={18}
						// backgroundColor={"hsla(0,0%,0%,0.40)"}
					/>
				</RightReviewControls>
			)}

			{props.tile && props.tile.params && props.tile.params.canRegenerate && isReviewing && (
				<GeneratedOutline
					style={{ borderColor: props.theme.colors.t3, borderWidth: 2, borderRadius: tileCornerRadius }}
				/>
			)}
		</ImageWrap>
	);
};

const GeneratedOutline = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-style: solid;
	opacity: 1;
`;

const RightReviewControls = styled(motion.div)`
	position: absolute;
	top: 6px;
	right: 6px;
`;

const LeftReviewControls = styled(motion.div)`
	position: absolute;
	top: 6px;
	left: 6px;
`;

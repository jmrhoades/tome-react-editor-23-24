import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { PromptStates, ITEM_WIDTH } from "../Prompt";
import { textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";

import {
	itemHeight,
	itemSpacerHeight,
	itemHighlightInsetHorizontal,
	itemHighlightInsetVertical,
	itemHighlightBorderRadius,
} from "../ListItem";

import { tDividerShow, tDividerHide } from "../Transitions";
import { Spinner } from "../../ds/Spinner";

const GridWrap = styled(motion.div)`
	position: relative;
	overflow: hidden;
`;

const Grid = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: row;
`;

const ItemContentWrap = styled(motion.div)`
	position: relative;
`;

const ImageBg = styled(motion.div)`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: absolute;
	pointer-events: none;
`;

const GenImg = styled(motion.img)`
	display: block;
	max-width: 100%;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: absolute;
	object-fit: cover;
`;

const Divider = styled(motion.div)`
	width: 100%;
	height: 1px;
	position: absolute;
	bottom: 0;
	pointer-events: none;
`;

const LoadingContainer = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	pointer-events: none;
`;

const ItemSelectionRing = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const TextContent = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	* {
		margin-bottom: 8px;
		&:last-child {
			margin-bottom: 0px;
		}
	}

	p, ul, li {
		font-size: 4.2px;
		font-weight: normal;
		line-height: 6px;
	}

	ul {
		padding-left: 10px;
	}

	h1 {
		font-size: 14px;
		font-weight: bold;
		line-height: 10px;
	}

	h2 {
		font-size: 9.63px;
		font-weight: bold;
		line-height: 11.9px;
	}

	h3 {
		font-size: 8.2px;
		font-weight: bold;
		line-height: 11.9px;
	}

	h4 {
		font-size: 8.2px;
		font-weight: bold;
		line-height: 11.9px;
	}

	small {
		display: block;
		font-size: 4.1px;
		font-weight: normal;
		line-height: 7px;
	}
`;

const H1 = styled(motion.h1)``;
const H2 = styled(motion.h2)``;
const H3 = styled(motion.h3)``;
const H4 = styled(motion.h4)``;
const P = styled(motion.p)``;
const UL = styled(motion.ul)``;
const OL = styled(motion.ol)``;
const LI = styled(motion.li)``;
const CAPTION = styled(motion.small)``;

const AlignXMap = {
	LEFT: "flex-start",
	CENTER: "center",
	RIGHT: "flex-end",
};

const AlignTextMap = {
	LEFT: "left",
	CENTER: "center",
	RIGHT: "right",
};

const AlignYMap = {
	TOP: "flex-start",
	MIDDLE: "center",
	BOTTOM: "flex-end",
	DISTRIBUTE: "space-between",
};

const BlockMap = {
	H1: H1,
	H2: H2,
	H3: H3,
	H4: H4,
	P: P,
	CAPTION: CAPTION,
	OL: OL,
	UL: UL,
	LI: LI,
};

export const GridListOld = props => {
	//const isRoot = props.promptState === PromptStates.ROOT;
	let h = props.list.length === 0 ? 0 : 180;
	const showDivider = props.list.length > 0;
	const colors = props.theme.colors;

	// If there's results, listen for left and right arrow events
	React.useEffect(() => {
		const onKeyDown = e => {
			console.log(props.selectedIndex);
			if (e.key === "ArrowRight") {
				let i = props.selectedIndex + 1;
				if (i > props.list.length - 1) i = 0;
				props.setSelectedIndex(i);

				if (props.list[i].type === "image") props.onImageClick(props.list[i].src);
				if (props.list[i].type === "text") props.onTextClick(props.list[i].tileParams);

				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === "ArrowLeft") {
				//setSelectedIndex(s => (s - 1 < 0 ? 0 : s - 1));
				let i = props.selectedIndex - 1;
				if (i < 0) i = props.list.length - 1;
				props.setSelectedIndex(i);
				if (props.list[i].type === "image") props.onImageClick(props.list[i].src);
				if (props.list[i].type === "text") props.onTextClick(props.list[i].tileParams);

				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === "Escape") {
				props.hideGridResults();
				e.preventDefault();
				e.stopPropagation();
			}
		};
		if (h !== 0) {
			window.addEventListener("keydown", onKeyDown);
		}
		return function cleanup() {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [h, props.selectedIndex, props.list]);

	return (
		<GridWrap key="grid_list" id="grid_list" initial={false} animate={{ height: h }} transition={props.transitions.morph}>
			<Grid
				style={{
					gap: 12,
					padding: 12,
				}}
			>
				{props.list.map((item, i) => (
					<Item
						key={item.id}
						item={item}
						i={i}
						theme={props.theme}
						onImageClick={props.onImageClick}
						onTextClick={props.onTextClick}
						isSelected={props.selectedIndex === i}
						setSelectedIndex={props.setSelectedIndex}
						onGridImageLoaded={props.onGridImageLoaded}
					/>
				))}
			</Grid>

			<Divider
				style={{
					backgroundColor: props.theme.colors.promptbar.divider,
				}}
				initial={false}
				animate={{
					opacity: showDivider ? 1 : 0,
					height: showDivider ? 1 : 0,
				}}
				transition={props.promptState === PromptStates.ROOT ? tDividerShow : tDividerHide}
			/>
		</GridWrap>
	);
};

const Item = props => {
	// If there's results, listen for left and right arrow events
	React.useEffect(() => {
		const onKeyDown = e => {
			if (e.key === "Enter") {
				//props.onImageClick(props.item.src, true);
				e.preventDefault();
				e.stopPropagation();
			}
		};
		if (props.isSelected) window.addEventListener("keydown", onKeyDown);
		return function cleanup() {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [props.isSelected, props.item]);

	const colors = props.theme.colors;
	//const [imageLoading, setImageLoading] = React.useState(true);
	//const [loaded, setLoaded] = React.useState(props.item.loaded);

	const angles = [
		[0, 120],
		[20, 140],
		[40, 160],
		[60, 180],
	];

	const addBlock = (block, i) => {
		const Block = BlockMap[block.type];
		return (
			<Block>
				{block.content && block.content}
				{block.blocks && block.blocks.map((b, i) => addBlock(b, i))}
			</Block>
		);
	};

	return (
		<ItemContentWrap
			id={props.item.id}
			key={props.item.id}
			style={{
				width: props.item.gridWidth,
				height: props.item.gridHeight,
				pointerEvents: "auto",
			}}
			// layout
			// initial={{ opacity: 0 }}
			// animate={{ opacity: 1 }}
			// transition={{
			// 	delay: props.i * 0.1,
			// 	opacity: {
			// 		ease: "easeOut",
			// 		duration: 0.5,
			// 	},
			// 	y: {
			// 		type: "spring",
			// 		bounce: 0.2,
			// 	},
			// }}
			// whileTap={{
			// 	scale: 0.9,
			// }}

			// onTap={e => {
			// 	props.onImageClick(props.item.src);
			// 	e.preventDefault();
			// 	e.stopPropagation();
			// }}

			onMouseUp={e => {
				props.setSelectedIndex(props.i);

				if (props.item.type === "image") props.onImageClick(props.item.src);
				if (props.item.type === "text") props.onTextClick(props.item.tileParams);

				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<ImageBg
				style={{
					backgroundColor: colors.t1,
					borderRadius: 4,
				}}
				initial={false}
				animate={{
					opacity: props.isSelected ? 0 : 1,
				}}
			/>

			{props.item.type === "image" && (
				<GenImg
					src={props.item.src}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						ease: "easeOut",
						duration: 0.5,
					}}
					style={{
						borderRadius: 4,
					}}
				/>
			)}

			{props.item.type === "text" && (
				<TextContent
					style={{
						display: "flex",
						flexDirection: "column",
						textAlign: AlignTextMap[props.item.tileParams.alignmentX],
						alignItems: AlignTextMap[props.item.tileParams.alignmentX],
						justifyContent: AlignYMap[props.item.tileParams.alignmentY],
						padding: 10,
					}}
				>
					{props.item.tileParams.blocks && props.item.tileParams.blocks.map((b, i) => addBlock(b, i))}

					
				</TextContent>
			)}

			{/*
			<GenImg
				src={props.item.src}
				onLoad={e => {
					//setImageLoading(false);
                    //setTimeout(()=>{setLoaded(true)}, 500)
                    props.onGridImageLoaded(props.item.id);
				}}
				initial={false}
				animate={{
					opacity: props.item.loaded ? 1 : 0,
				}}
                transition={{
                    ease: "easeOut",
                    duration: 0.5,
                }}
                style={{
                    width: 141,
                    height: 141,
                    borderRadius: 4,
                }}
			/>

			<LoadingContainer
				initial={false}
				animate={{
					opacity: props.item.loaded ? 0 : 1,
				}}
				style={{
					x: -35 / 2,
					y: -35 / 2,
				}}
			>
				<Spinner
					size={35}
					background={colors.t2}
					foreground={colors.t4}
					strokeWidth={2}
					startAngle={angles[props.i][0]}
					endAngle={angles[props.i][1]}
				/>
			</LoadingContainer> */}

			<ItemSelectionRing
				style={{
					boxShadow: `0 0 0 1.5px ${colors.accent}`,
					borderRadius: 4,
				}}
				initial={false}
				animate={{
					opacity: props.isSelected ? 1 : 0,
				}}
				transition={{
					ease: "easeOut",
					duration: props.isSelected ? 0.2 : 0,
				}}
			/>
		</ItemContentWrap>
	);
};

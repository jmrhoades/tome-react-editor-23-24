import React, { useState, useLayoutEffect, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { RegenButton } from "../ds/Buttons";


import { textBlockType, alignmentX, alignmentY } from "./TileConstants";
import { BlockMap, PlaceholderMap, AlignXMap, AlignTextMap, AlignYMap, StyledTextContent } from "./TextSyles";
import { transitions } from "../ds/Transitions";

const PlaceholderContainer = styled(motion.div)`
	user-select: none;
	pointer-events: none;
	position: absolute;
`;

const GhostText = styled.div`
	user-select: none;
	pointer-events: none;

	background-color: red;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
`;

export const TileText = props => {
	const { saveState, isReviewing, tomeData } = useContext(TomeContext);

	const scale = props.scale;
	//console.log(scale)
	const { getTileWidthForUnit, metrics } = useContext(MetricsContext);
	const { rowHeight, rowMargin, tileCornerRadius } = metrics;
	// const ref = useRef(null);

	let textTilePaddingY = props.alignmentY === alignmentY.MIDDLE ? 0 : 20 * scale;

	let textTilePaddingX = 24 * scale;
	const linelengthMargin = props.alignmentY === alignmentX.CENTER ? "auto" : 0;
	//const textTilePaddingX = props.gutters;

	let lineLength = props.lineLength;
	//if (props.gutters === gutters.M) lineLength = "60ch";
	//if (props.gutters === gutters.L) lineLength = "40ch";

	const display = "flex"; //"block";
	const height = "100%"; //"auto";
	const flexDirection = "column";

	const textAlign = AlignTextMap[props.alignmentX];
	const alignItems = AlignXMap[props.alignmentX];
	const justifyContent = AlignYMap[props.alignmentY];

	/*
	const { ref } = useResizeObserver({
		onResize: ({ width, height }) => {
			//console.log("on-resize", height)
			props.onContentSizeChange(width, height + textTilePaddingY);
		},
	});
	*/

	// const [textTileFocussed, setTextTileFocussed] = useState(false);

	const placeholderRef = useRef(null);
	const [placeholderWidth, setPlaceholderWidth] = useState("inherit");
	const [placeholderHeight, setPlaceholderHeight] = useState("inherit");
	const placeholderOpacity = useMotionValue(1);
	const [placeholderAlignment, setPlaceholderAlignment] = useState(
		props.alignmentX === alignmentX.CENTER ? "left" : "inherit"
	);
	const firstBlockRef = useRef(null);
	const isPlaceholder =
		props.blocks.length === 1 && props.blocks[0].content === "" && props.blocks[0].blocks === undefined;

	useLayoutEffect(() => {
		if (placeholderRef.current) {
			const rect = placeholderRef.current.getBoundingClientRect();
			setPlaceholderWidth(rect.width);
			setPlaceholderHeight(rect.height);
		}
	});

	// Measure & cache ghost text height at all 12 width stops
	const ref = useRef(null);
	useEffect(() => {
		if (props.isPreview) return;
		calcRowHeights();
		//if (computedHeights.current.length !== 0) return
	});

	useEffect(() => {
		calcRowHeights();
		//if (computedHeights.current.length !== 0) return
	}, [props.scale]);

	/*
	useEffect(() => {
		if (props.isPreview) return;
		console.log("Changed")
	}, [props.blocks]);
	*/

	const onFileLoaded = () => {
		//console.log("text tile: file loaded")
		//calcRowHeights();
	};
	//if (props.tile) props.tile.onFileLoaded = onFileLoaded;

	const calcRowHeights = () => {
		if (ref.current && props.tile && !props.tile.contentUnitHeights) {
			props.tile.contentUnitHeights = [];
			for (let i = metricConstants.cColumnMinWidth; i <= metricConstants.cColumnCount; i++) {
				ref.current.style.width = getTileWidthForUnit(i) + "px";
				const rect = ref.current.getBoundingClientRect();
				const newUnitHeight = Math.ceil(Math.ceil(rect.height) / Math.floor(rowHeight + rowMargin));
				props.tile.contentUnitHeights[i] = newUnitHeight;
				//console.log("text tile heights: ", props.tile.id, newUnitHeight, rect.height, rowHeight, rowMargin);
			}
		}
	};

	const onPlaceholderInput = e => {
		const t = e.target.innerText.trim();
		setPlaceholderAlignment("inherit");
		if (props.alignmentX === alignmentX.CENTER) {
			setPlaceholderAlignment(t.length === 0 ? "left" : "inherit");
		}
		// props.blocks[0].content = t;
		// console.log("input!", t.length, t);
		placeholderOpacity.set(t.length === 0 ? 1 : 0);
	};

	const saveTimeoutRef = React.useRef(null);
	const onTextContentChange = (e, block) => {
		const t = e.target.innerText.trim();
		block.content = t;
		console.log(t);
		tomeData.hasEdits = true;
		//if(saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
		//saveTimeoutRef.current = setTimeout(saveState, 100);
	};

	const addBlock = (block, i) => {
		const Block = BlockMap[block.type];
		const styles =
			block.type === textBlockType.OL ||
			block.type === textBlockType.UL ||
			block.type === textBlockType.PRE ||
			block.type === textBlockType.BLOCKQUOTE
				? block.blockStyle
				: block.type;
		const typography = props.theme.typography;
		let fontsize = typography.fontSize[styles] ? typography.fontSize[styles] * scale : undefined;
		if (block.fontSize) fontsize = block.fontSize * scale;
		const className = block.blockStyle ? block.type + " " + block.blockStyle : block.type;
		const fontcolor = block.color ? block.color : typography.fontColor[styles];
		const marginBottom = (typography.marginBottom[styles] * scale) + "px";
		const startNumber = block.type === textBlockType.OL && block.start ? block.start : undefined;
		const caretColor = block.color ? block.color : props.theme.colors.text.caret;
		const selectionColor = block.color ? block.color : props.theme.colors.text.selection;
		//console.log(caretColor)
		return (
			<Block
				key={block.id}
				id={block.id}
				ref={i === 0 ? firstBlockRef : null}
				className={className}
				$theme={props.theme}
				$scale={scale}
				$alignmentx={props.alignmentX}
				$fontsize={fontsize}
				$fontweight={typography.fontWeight[styles]}
				$lineheight={typography.lineHeight[styles]}
				$letterspacing={typography.letterSpacing[styles]}
				$fontcolor={fontcolor}
				$marginbottom={marginBottom}
				href={block.href}
				start={startNumber}
				$caretcolor={caretColor}
				$selectioncolor={selectionColor}
				contentEditable={true}
				spellcheck="false"
				suppressContentEditableWarning={true}
				//layout
				//transition={transitions.layoutTransition}
				
				onInput={
					isPlaceholder
						? onPlaceholderInput
						: e => {
								onTextContentChange(e, block);
						  }
				}
				onFocus={e => {
					//console.log("textTile focus");
					props.setTextTileFocussed(true);
				}}
				onBlur={e => {
					//console.log("textTile blur");
					props.setTextTileFocussed(false);
					const t = e.target.innerText.trim();
					if (block.content !== t) {
						//console.log("update: ", block.content, t);
						block.content = t;
						e.target.innerText = "";
						saveState();
					}
				}}
				style={
					isPlaceholder
						? {
								minWidth: placeholderWidth,
								minHeight: placeholderHeight,
								textAlign: placeholderAlignment,
						  }
						: undefined
				}
				//initial={{ opacity: props.tile && props.tile.params && props.tile.params.textLoaded ? 1 : 0 }}
				animate={{ opacity: 1 }}
				//transition={{ delay: i * 0.35, duration: 0.01 }}
			>
				{block.content && block.content}
				{block.blocks && block.blocks.map((b, i) => addBlock(b, i))}
			</Block>
		);
	};

	/*
	Visual-only
	*/
	const addPlaceholder = block => {
		const Block = BlockMap[block.type];
		const text = PlaceholderMap[block.type];
		const styles =
			block.type === textBlockType.OL || block.type === textBlockType.UL || block.type === textBlockType.BLOCKQUOTE
				? block.blockStyle
				: block.type;
		const typography = props.theme.typography;
		const fontsize = typography.fontSize[styles] ? typography.fontSize[styles] * props.scale : undefined;
		let className = block.blockStyle ? block.type + " " + block.blockStyle : block.type;
		className += " placeholder";
		return (
			<PlaceholderContainer
				style={{
					display,
					height,
					flexDirection,
					alignItems,
					justifyContent,
					textAlign,
					opacity: placeholderOpacity,
				}}
			>
				<Block
					ref={placeholderRef}
					key={block.id + "placeholder"}
					className={className}
					$theme={props.theme}
					$scale={scale}
					$alignmentx={props.alignmentX}
					$fontsize={fontsize}
					$fontweight={typography.fontWeight[styles]}
					$lineheight={typography.lineHeight[styles]}
					$letterspacing={typography.letterSpacing[styles]}
					$fontcolor={props.theme.typography.fontColor.PLACEHOLDER}
					$marginbottom={typography.marginBottom[styles]}
				>
					{text}
				</Block>
			</PlaceholderContainer>
		);
	};

	//console.log(props.tileWidth);

	/*
	useEffect(() => {
		const onKeyDown = e => {
			if (props.isSelected && !isFocussed) {
				const key = e.key;
				console.log("New Key!", "key", key, e);
				if (key === "Backspace") {
					props.deleteTile(props.tile);
				}
				if (key === "Escape") {
					//props.deleteTile(props.tile);
				}
			}

			//e.preventDefault();
			//e.stopPropagation();
			//return false;
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.isSelected]);
	*/

	return (
		<StyledTextContent
			key={props.id + "_texttile_content"}
			style={{
				width: props.alignmentX === alignmentX.CENTER ? "100%" : props.tileWidth,
				display,
				height,
				flexDirection,
				alignItems,
				justifyContent,
				textAlign,

				fontFamily: props.theme.typography.fontFamily,
				fontSize: props.theme.typography.fontSize.P * scale + "px",
				fontWeight: props.theme.typography.fontWeight.P,
				lineHeight: 1,
				color: props.theme.colors.text.body,
				paddingLeft: textTilePaddingX,
				paddingRight: textTilePaddingX,
				paddingTop: textTilePaddingY,
				paddingBottom: textTilePaddingY,

				//backgroundColor: props.backgroundColor ? props.backgroundColor : "transparent",
				//backgroundColor: "rgba(0,0,255, 0.3)",
				userSelect: "text",
			}}
			$selectioncolor={props.theme.colors.text.selection}
			$linelength={lineLength}
			$linelengthMargin={linelengthMargin}
		>
			{isPlaceholder && addPlaceholder(props.blocks[0])}

			<GhostText
				style={{
					minWidth: 2000,
				}}
			>
				<div
					ref={ref}
					style={{
						//width: props.tileWidth,
						paddingLeft: textTilePaddingX,
						paddingRight: textTilePaddingX,
						paddingTop: textTilePaddingY,
						paddingBottom: textTilePaddingY,
					}}
				>
					{props.blocks && props.blocks.map((b, i) => addBlock(b, i))}
				</div>
			</GhostText>

			<motion.div
				initial={false}
				animate={{
					opacity: props.tile && props.tile.params && props.tile.params.isLoading ? 0.25 : 1,
				}}
				transition={{
					type: "tween",
					duration: 0.5,
				}}
			>
				{props.blocks && props.blocks.map((b, i) => addBlock(b, i))}
			</motion.div>

			{props.tile && props.tile.params && props.tile.params.canRegenerate && isReviewing && (
				<LeftReviewControls>
					<RegenButton
						//disabled={isLoading}
						icon="DoubleSparkle"
						label="Rewrite"
						//hasBackground={true}
						isLoading={props.tile.params.isLoading}
						theme={props.theme}
						onTap={e => {
							props.tile.params.isLoading = true;
							props.tile.params.needsGeneration = true;
							props.requestRewriteForTile(props.tile);
							saveState();
						}}
						style={{
							pointerEvents: props.tile.params.isLoading ? "none" : "auto",
						}}
					/>
				</LeftReviewControls>
			)}
			{props.tile && props.tile.params && props.tile.params.canRegenerate && isReviewing && (
				<GeneratedOutline
					style={{ borderColor: props.theme.colors.t3, borderWidth: 2, borderRadius: tileCornerRadius }}
				/>
			)}
		</StyledTextContent>
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

const LeftReviewControls = styled(motion.div)`
	position: absolute;
	top: 6px;
	left: 6px;
`;

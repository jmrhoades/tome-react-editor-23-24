import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue, animate, useTransform, useMotionTemplate } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { TEXT, ARROW_LINE } from "../../tiles/drawing/LayerData";
import { ShapePath } from "../../tiles/drawing/layers/ShapePath";
import { PLACEHOLDER_STRING } from "../../tiles/drawing/constants";
import { arcPath } from "../../tiles/drawing/utilities";
import { Icon } from "../../../../ds/Icon";

const Wrap = styled(motion.div)`
	position: relative;
`;

const Template = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Draggable = styled(Template)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const IconWrap = styled(Template)`
	position: absolute;
	top: 0;
	left: 0;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: relative;
	pointer-events: none;
	flex-shrink: 0;
	overflow: visible;
	//filter: drop-shadow(0px 4px 2px rgb(0 0 0 / 0.16));
`;

export const AddDrawingLayerButton = props => {
	// The states of a draggable, clickable, view-transitioning button:
	// -HOVERING -PRESSING -DRAGGING -ANIMATING -VALID_DROP
	const [hovering, setHovering] = useState(false);
	const [pressing, setPressing] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [animating, setAnimating] = useState(false); // used after drop
	const [validDrop, setValidDrop] = useState(false);

	// Infomation needed for dragging
	const pointerInfo = useRef({});
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);
	const ref = useRef();

	// Animate draggable back to starting position
	const returnToStartAnimation = useAnimation();

	// Move draggable center to mouse position when dragging
	const centerOffsets = useRef({ x: 0, y: 0 });

	// Animate the "fake" draggable
	const templateAnimation = useAnimation();

	const onPointerDown = e => {
		setPressing(true);
		setHovering(false);

		const draggableRect = ref.current.getBoundingClientRect();
		pointerInfo.current = { x: e.clientX, y: e.clientY, startX: draggableRect.x, startY: draggableRect.y };

		const rect = e.target.getBoundingClientRect();
		const left = e.clientX - rect.x;
		const top = e.clientY - rect.y;
		const xFromCenter = left - width / 2;
		const yFromCenter = top - height / 2;
		centerOffsets.current = { x: xFromCenter, y: yFromCenter };

		props.onPointerDown();
		e.stopPropagation();
	};

	const onPointerMove = e => {
		if (e.touches && e.touches.length > 0) {
			e.preventDefault();
			e = e.changedTouches[0];
		}
		const dx = e.clientX - pointerInfo.current.x;
		const dy = e.clientY - pointerInfo.current.y;
		pointerInfo.current.dx = dx;
		pointerInfo.current.dy = dy;
		if (dragging) {
			dragX.set(dx);
			dragY.set(dy);
			const dropInfo = props.onDrag(info.type, e.clientX, e.clientY);
			if (dropInfo && !dropInfo.isValid && validDrop) {
				setValidDrop(false);
			}
			if (dropInfo && dropInfo.isValid) {
				if (dropInfo.tileOver && dropInfo.tileOver.id) {
					setValidDrop(dropInfo.tileOver.id);
					/* 
					Guides 
					*/
					if (dropInfo.tileOver.guides) {
						const guides = dropInfo.tileOver.guides;
						if (guides) {
							guides.hide();
							let scaledWidth = props.info.width * props.validDropScale.get();
							let scaledHeight = props.info.height * props.validDropScale.get();
							// convert dragX to tile coodinates
							// check guides
							const tileRect = document.getElementById(dropInfo.tileOver.id).getBoundingClientRect();
							// where is the draggable in relation to the tile?
							const draggableRect = ref.current.getBoundingClientRect();
							// check x
							const tileCenterX = tileRect.x + tileRect.width / 2;
							const tileLeftX = tileRect.x + guides.bMargin.get();
							const relX = draggableRect.x + draggableRect.width / 2 - tileCenterX;
							const newX = e.clientX - tileRect.x - tileRect.width / 2;
							const snapX = guides.checkXDrop(newX, props.info.width);
							console.log(newX, snapX, draggableRect.x, relX);
							if (snapX === 0) {
								dragX.set(
									tileCenterX - pointerInfo.current.startX - draggableRect.width / 2 - centerOffsets.current.x
								);
								pointerInfo.current.dropX = 0;
							}
							if (snapX < 0) {
								dragX.set(tileLeftX - pointerInfo.current.startX - centerOffsets.current.x);
								pointerInfo.current.dropX = snapX;
							}
							if (snapX > 0) {
							}

							// check y
							const tileCenterY = tileRect.x + tileRect.width / 2;
							const relY = draggableRect.x + draggableRect.width / 2 - tileCenterX;
							const newY = e.clientY - tileRect.y - tileRect.height / 2;
							//const snapY = guides.checkYDrop(newY, props.info.width);
						}
					}
				} else {
					setValidDrop("new_tile");
				}
			}
		} else {
			const threshold = 3;
			if (Math.abs(pointerInfo.current.dx) > threshold || Math.abs(pointerInfo.current.dy) > threshold) {
				setDragging(true);
				props.onDragStart();
			}
		}
	};

	const onPointerUp = e => {
		if (!dragging) {
			// Do click
			props.onClick(info.type);
		} else {
			// Do drop

			// --> pull snap position for this
			const dropInfo = props.onDrop(info.type, e.clientX, e.clientY);

			if (dropInfo.tileOver) {
				const guides = dropInfo.tileOver.guides;
				guides.hide();
			}

			// Return to original position, animated or instant
			if (dropInfo && dropInfo.isValid) {
				setTimeout(() => {
					setValidDrop(false);
					returnToStartAnimation.start({
						x: 0,
						y: 0,
						opacity: 0,
						transition: {
							duration: 0,
							onComplete: () => {
								returnToStartAnimation.start({
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.1,
										onComplete: () => {
											setAnimating(false);
										},
									},
								});
							},
						},
					});
				}, 50);
			} else {
				returnToStartAnimation.start({
					x: 0,
					y: 0,
					scale: 1,
					opacity: 1,
					transition: {
						...transitions.layoutTransition,
						onComplete: () => {
							setAnimating(false);
						},
					},
				});
			}
		}
		// Reset state
		setDragging(false);
		setPressing(false);
	};

	React.useEffect(() => {
		const setMouseUpFromEvent = e => onPointerUp(e);
		const setMouseMoveFromEvent = e => onPointerMove(e);
		if (pressing) {
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [pressing, dragging, validDrop]);

	// Colors
	const info = props.info;
	let iconInfo = {};
	let fillColor = "transparent";
	let lineColor = "transparent";
	let defaultFillColor = "transparent";
	let defaultLineColor = "transparent";
	if (info.layerType === "SHAPE") {
		iconInfo = props.theme.drawing.shape;
		fillColor = iconInfo.panelIcon.fill.color;
		lineColor = iconInfo.panelIcon.line.color;
		defaultFillColor = fillColor;
		defaultLineColor = lineColor;
		if (hovering || pressing) {
			fillColor = iconInfo.panelIcon.fill.hover;
			lineColor = iconInfo.panelIcon.line.hover;
		}
		if (validDrop) {
			fillColor = iconInfo.fill.color;
			lineColor = iconInfo.line.color;
		}
	}
	if (info.layerType === "TEXT") {
		iconInfo = props.theme.drawing.text;
		fillColor = iconInfo.panelIcon.color;
		defaultFillColor = fillColor;
		defaultLineColor = lineColor;
		if (hovering || pressing) fillColor = iconInfo.panelIcon.hover;
		if (validDrop) fillColor = iconInfo.placeholder;
	}
	if (info.layerType === "IMAGE") {
		iconInfo = props.theme.drawing.image;
		fillColor = iconInfo.panelIcon.color;
		defaultFillColor = fillColor;
		defaultLineColor = lineColor;
		if (hovering || pressing) fillColor = iconInfo.panelIcon.hover;
		if (validDrop) fillColor = iconInfo.color;
	}
	if (info.layerType === "LINE") {
		iconInfo = props.theme.drawing.line;
		lineColor = iconInfo.panelIcon.color;
		defaultFillColor = fillColor;
		defaultLineColor = lineColor;
		if (hovering || pressing) {
			lineColor = iconInfo.panelIcon.hover;
		}
		if (validDrop) {
			lineColor = iconInfo.color;
		}
	}

	// Button width & height
	const width = 64;
	const height = info.layerType === "TEXT" || info.layerType === "LINE" || info.layerType === "IMAGE" ? 40 : 64;

	return (
		<Wrap
			style={{
				width: width,
				height: height,
			}}
		>
			<Template
				style={{
					width: width,
					height: height,
					opacity: 0.5,
				}}
				animate={templateAnimation}
			>
				<ObjectIcon
					theme={props.theme}
					info={info}
					iconInfo={iconInfo}
					fillColor={defaultFillColor}
					lineColor={defaultLineColor}
					size={info.iconSize}
					width={info.iconWidth}
					height={info.iconHeight}
					validDropScale={props.validDropScale}
				/>
			</Template>

			<Draggable
				ref={ref}
				transition={transitions.basicTransition}
				style={{
					zIndex: dragging || animating ? 10 : 1,
					cursor: dragging ? "grabbing" : "grab",
					width: width,
					height: height,
					x: dragX,
					y: dragY,
				}}
				animate={returnToStartAnimation}
				onHoverStart={() => setHovering(true)}
				onHoverEnd={() => setHovering(false)}
				onPointerDownCapture={onPointerDown}
			>
				<IconWrap style={{ width: width, height: height }}>
					<ObjectIcon
						theme={props.theme}
						dragging={dragging}
						validDrop={validDrop}
						centerOffsets={centerOffsets}
						info={info}
						iconInfo={iconInfo}
						fillColor={fillColor}
						lineColor={lineColor}
						width={info.iconWidth}
						height={info.iconHeight}
						borderRadius={info.iconBorderRadius}
						scale={dragging ? 1 : pressing ? 1 - 0.05 : hovering ? 1.05 : 1}
						validDropScale={props.validDropScale}
					/>
				</IconWrap>
			</Draggable>
		</Wrap>
	);
};

const ObjectIcon = props => {
	const w = props.info.icon.width;
	const h = props.info.icon.height;
	const borderRadius = props.info.icon.borderRadius;

	const sW = useMotionValue(w);
	const sH = useMotionValue(h);
	const bR = useMotionValue(borderRadius);

	const xOffset = useMotionValue(props.info.icon.xOffset);
	const yOffset = useMotionValue(props.info.icon.yOffset);

	const x1 = useMotionValue(0);
	const y1 = useTransform(() => sH.get() / 2);
	const x2 = useTransform(() => x1.get() + sW.get());
	const y2 = y1;
	// Marker paths — Arrow end
	const arrowL = 12;
	const arrowLength = useMotionValue(arrowL);
	const endCapAngle = -135;
	const arrowEndX1 = useTransform(() => Math.cos((endCapAngle * Math.PI) / 180) * arrowLength.get() + x2.get());
	const arrowEndY1 = useTransform(() => Math.sin((endCapAngle * Math.PI) / 180) * arrowLength.get() + y2.get());
	const arrowEndX2 = useTransform(() => Math.cos((-endCapAngle * Math.PI) / 180) * arrowLength.get() + x2.get());
	const arrowEndY2 = useTransform(() => Math.sin((-endCapAngle * Math.PI) / 180) * arrowLength.get() + y2.get());

	const line = useMotionTemplate`M${x1} ${y1}L${x2} ${y2}`;
	const arrowLine = useMotionTemplate`M${x1} ${y1}L${x2} ${y2}M${arrowEndX1} ${arrowEndY1}L${x2} ${y2}L${arrowEndX2} ${arrowEndY2}`;

	const validFontSize = TEXT.text.size * props.validDropScale.get();
	const textLayerFontScale = props.validDrop ? validFontSize / TEXT.icon.fontSize : 1;

	//console.log(textLayerFontScale);

	let iconLineSize = 0;
	let validLineSize = 0;
	if (props.info.layerType === "LINE") {
		iconLineSize = props.iconInfo.panelIcon.size;
		validLineSize = props.iconInfo.size;
	}
	if (props.info.layerType === "SHAPE") {
		iconLineSize = props.iconInfo.panelIcon.line.size;
		validLineSize = props.iconInfo.line.size;
	}
	const lineStrokeWidth = useMotionValue(iconLineSize);
	const transition = { duration: 0.2 };

	React.useEffect(() => {
		//console.log("RERENDER ICON");
		let scaledWidth = props.info.width * props.validDropScale.get();
		let scaledHeight = props.info.height * props.validDropScale.get();
		let scaledRadius = props.info.line.radius * props.validDropScale.get();

		if (props.info.layerType === "LINE") {
			arrowLength.set(props.validDrop ? arrowL * props.validDropScale.get() : arrowL);
			animate(
				lineStrokeWidth,
				props.validDrop ? validLineSize * props.validDropScale.get() : iconLineSize,
				transition
			);
		}
		if (props.info.layerType === "TEXT") {
			animate(
				xOffset,
				props.validDrop || props.dragging ? props.centerOffsets.current.x + 1 : props.info.icon.xOffset,
				transition
			);
			animate(
				yOffset,
				props.validDrop || props.dragging ? props.centerOffsets.current.y + 3 : props.info.icon.yOffset,
				transition
			);
		} else {
			animate(sW, props.validDrop ? scaledWidth : props.info.icon.width, transition);
			animate(sH, props.validDrop ? scaledHeight : props.info.icon.height, transition);
			animate(bR, props.validDrop ? scaledRadius : props.info.icon.borderRadius, transition);
			animate(
				lineStrokeWidth,
				props.validDrop ? validLineSize * props.validDropScale.get() : iconLineSize,
				transition
			);
			animate(
				xOffset,
				props.validDrop
					? (props.info.icon.width - scaledWidth) / 2 + props.centerOffsets.current.x
					: props.dragging
					? props.centerOffsets.current.x
					: props.info.icon.xOffset,
				transition
			);
			animate(
				yOffset,
				props.validDrop
					? (props.info.icon.height - scaledHeight) / 2 + props.centerOffsets.current.y
					: props.dragging
					? props.centerOffsets.current.y
					: props.info.icon.yOffset,
				transition
			);
		}
	}, [props.validDrop, props.dragging]);

	switch (props.info.layerType) {
		case "TEXT":
			const style = TEXT.text.style;
			//console.log(props.scale);
			return (
				<motion.div
					style={{
						fontFamily: props.theme.typography.fontFamily,
						fontSize: TEXT.icon.fontSize + "px",
						fontWeight: props.theme.typography.fontWeight[style],
						letterSpacing: props.theme.typography.letterSpacing[style],
						lineHeight: 1,
						textAlign: "center",
						x: xOffset,
						y: yOffset,
						pointerEvents: "none",
					}}
					animate={{
						color: props.fillColor,
						scale: props.scale,
					}}
					initial={false}
				>
					<motion.div
						animate={{
							scale: textLayerFontScale,
							//x: scaleOffsetX,
							//y: scaleOffsetY,
						}}
						initial={false}
					>
						{PLACEHOLDER_STRING}
					</motion.div>
				</motion.div>
			);

		case "IMAGE":
			return (
				<motion.div
					style={{
						x: xOffset,
						y: yOffset,
						pointerEvents: "none",
					}}
					animate={{
						scale: props.scale,
					}}
					initial={false}
				>
					<Icon name="Photo" size={32} color={props.fillColor} />
				</motion.div>
			);

		case "LINE":
			return (
				<SVG
					style={{
						strokeLinecap: "round",
						x: xOffset,
						y: yOffset,
						strokeWidth: lineStrokeWidth,
					}}
					animate={{
						stroke: props.lineColor,
						scale: props.scale,
					}}
					initial={false}
					width={w}
					height={h}
					viewBox={`0 0 ${w} ${h}`}
					fill={"none"}
				>
					<motion.path d={props.info.type === ARROW_LINE.type ? arrowLine : line} fill={"none"} />
				</SVG>
			);

		case "SHAPE":
			return (
				<SVG
					style={{
						x: xOffset,
						y: yOffset,
						strokeWidth: lineStrokeWidth,
					}}
					animate={{
						stroke: props.lineColor,
						fill: props.fillColor,
						scale: props.scale,
					}}
					initial={false}
					width={w}
					height={h}
					viewBox={`0 0 ${w} ${h}`}
				>
					<ShapePath type={props.info.type} w={sW} h={sH} borderRadius={bR} />
				</SVG>
			);

		case "PROGRESS_RING":
			return (
				<svg width="64" height="64" viewBox="0 0 64 64">
					<circle fill="none" stroke={props.theme.colors.t2} strokeWidth={6} r={18} cx={32} cy={32} />
					<path
						d={arcPath(32, 18, 235)}
						fill="none"
						stroke={props.theme.colors.t2}
						strokeWidth={6}
						strokeLinecap="round"
					/>
				</svg>
			);

		case "PICTOGRAM":
			return (
				<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M20.3921 36.1538H19.6339C19.2783 36.1538 18.9805 35.8843 18.9451 35.5304L18.193 28.009L17.7645 31.0085C17.6702 31.6681 17.6357 32.3349 17.6614 33.0007L18.2876 49.2811C18.3022 49.6632 18.0044 49.9848 17.6223 49.9995C17.6135 49.9998 17.6047 50 17.5959 50H16.1725C15.8168 50 15.519 49.7305 15.4836 49.3766L14.169 36.1538L12.8543 49.3769C12.8187 49.7307 12.521 50 12.1655 50H10.742C10.3597 50.0001 10.0497 49.6901 10.0496 49.3078C10.0496 49.2989 10.0498 49.29 10.0501 49.2811L10.6763 33.0007C10.702 32.3349 10.6675 31.6681 10.5732 31.0085L10.1447 28.009L9.39272 35.5308C9.35716 35.8846 9.05937 36.1539 8.7038 36.1538H7.94573C7.56337 36.1538 7.25342 35.8439 7.25342 35.4615V25.7692C7.25342 23.8575 8.8032 22.3077 10.715 22.3077H17.6229C19.5346 22.3077 21.0844 23.8575 21.0844 25.7692V35.4615C21.0844 35.8439 20.7745 36.1538 20.3921 36.1538ZM14.169 20.9231C12.2572 20.9231 10.7074 19.3733 10.7074 17.4615C10.7074 15.5498 12.2572 14 14.169 14C16.0807 14 17.6305 15.5498 17.6305 17.4615C17.6305 19.3733 16.0807 20.9231 14.169 20.9231Z"
						fill={props.theme.colors.t4}
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M38.2232 36.1538H37.4649C37.1093 36.1538 36.8116 35.8843 36.7762 35.5304L36.024 28.009L35.5955 31.0085C35.5013 31.6681 35.4668 32.3349 35.4924 33.0007L36.1186 49.2811C36.1333 49.6632 35.8355 49.9848 35.4534 49.9995C35.4446 49.9998 35.4358 50 35.4269 50H34.0035C33.6479 50 33.35 49.7305 33.3146 49.3766L32 36.1538L30.6853 49.3769C30.6498 49.7307 30.3521 50 29.9965 50H28.5731C28.1907 50.0001 27.8807 49.6901 27.8807 49.3078C27.8807 49.2989 27.8808 49.29 27.8812 49.2811L28.5074 33.0007C28.5331 32.3349 28.4986 31.6681 28.4043 31.0085L27.9758 28.009L27.2238 35.5308C27.1882 35.8846 26.8904 36.1539 26.5349 36.1538H25.7768C25.3944 36.1538 25.0845 35.8439 25.0845 35.4615V25.7692C25.0845 23.8575 26.6343 22.3077 28.546 22.3077H35.4539C37.3657 22.3077 38.9155 23.8575 38.9155 25.7692V35.4615C38.9155 35.8439 38.6055 36.1538 38.2232 36.1538ZM32 20.9231C30.0883 20.9231 28.5385 19.3733 28.5385 17.4615C28.5385 15.5498 30.0883 14 32 14C33.9118 14 35.4615 15.5498 35.4615 17.4615C35.4615 19.3733 33.9118 20.9231 32 20.9231Z"
						fill={props.theme.colors.t2}
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M56.0542 36.1538H55.296C54.9404 36.1538 54.6426 35.8843 54.6072 35.5304L53.8551 28.009L53.4266 31.0085C53.3324 31.6681 53.2979 32.3349 53.3235 33.0007L53.9497 49.2811C53.9643 49.6632 53.6665 49.9848 53.2845 49.9995C53.2756 49.9998 53.2668 50 53.258 50H51.8346C51.4789 50 51.1811 49.7305 51.1457 49.3766L49.8311 36.1538L48.5164 49.3769C48.4808 49.7307 48.1831 50 47.8276 50H46.4041C46.0218 50.0001 45.7118 49.6901 45.7117 49.3078C45.7117 49.2989 45.7119 49.29 45.7122 49.2811L46.3384 33.0007C46.3641 32.3349 46.3296 31.6681 46.2354 31.0085L45.8068 28.009L45.0548 35.5308C45.0193 35.8846 44.7215 36.1539 44.3659 36.1538H43.6078C43.2255 36.1538 42.9155 35.8439 42.9155 35.4615V25.7692C42.9155 23.8575 44.4653 22.3077 46.3771 22.3077H53.285C55.1967 22.3077 56.7465 23.8575 56.7465 25.7692V35.4615C56.7465 35.8439 56.4366 36.1538 56.0542 36.1538ZM49.8311 20.9231C47.9193 20.9231 46.3695 19.3733 46.3695 17.4615C46.3695 15.5498 47.9193 14 49.8311 14C51.7428 14 53.2926 15.5498 53.2926 17.4615C53.2926 19.3733 51.7428 20.9231 49.8311 20.9231Z"
						fill={props.theme.colors.t2}
					/>
				</svg>
			);
		default:
	}
};

import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { TomeContext } from "../../tome/TomeContext";
import { MetricsContext } from "../../tome/MetricsContext";
import { DiagramPanelIcon } from "../../tiles/drawing/PanelIcons";
import { drawingShapes } from "../../tiles/drawing/_constants";

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

const Shape = styled(Template)`
	position: absolute;
	top: 0;
	left: 0;
`;

const Icon = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const DrawingPanelShape = props => {
	//const { scale } = useContext(MetricsContext).metrics;

	// The states of a draggable, clickable, view-transitioning button:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING

	const [isHovering, setIsHovering] = useState(false);
	const [isPressing, setIsPressing] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isValidDrop, setIsValidDrop] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const shouldClick = React.useRef(false);

	const returnToStartAnimation = useAnimation();

	const centerOffsets = useRef({ x: 0, y: 0 });
	const centerOffsetAnimation = useAnimation();
	const shapeSizeAnimation = useAnimation();

	let iconValidColor = props.theme.drawing.shape.default;
	let iconPanelColor = props.theme.drawing.panel.shape;
	if (props.type === drawingShapes.TEXT.type) {
		iconPanelColor = props.theme.drawing.panel.text;
	}

	const width = 64;
	const height = drawingShapes[props.type].buttonHeight;
	const iconPanelSize = drawingShapes[props.type].iconSize;
	const iconPanelScale = iconPanelSize / drawingShapes[props.type].canvasWidth;
	const iconValidScale = props.pageScale;

	React.useEffect(() => {
		const onPointerUp = e => {
			document.body.classList.remove("no-cursor");
			setIsPressing(false);
			if (shouldClick.current) {
				shouldClick.current = false;
				props.onClick(props.type);
				shapeSizeAnimation.start({
					scale: iconPanelScale,
				});
			}
		};

		if (isPressing) {
			document.body.addEventListener("mouseup", onPointerUp);
		}
		return function cleanup() {
			document.body.removeEventListener("mouseup", onPointerUp);
		};
	}, [isPressing]);

	return (
		<Wrap
			style={{
				width: width,
				height: height,
			}}
			animate={{
				opacity: props.fadeOutPanel && !isDragging ? 0 : 1,
			}}
			transition={{ duration: 0.1 }}
			initial={false}
		>
			<Template
				style={{
					width: width,
					height: height,
				}}
				animate={{
					opacity: !props.fadeOutPanel && (isDragging || isAnimating) ? 1 : 0,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			>
				{/* <TypeBackground
					style={{
						backgroundColor: bgHoverColor,
						borderRadius: borderRadius,
					}}
				/> */}

				<DiagramPanelIcon
					name={props.icon}
					color={iconPanelColor}
					scale={iconPanelScale}
					width={drawingShapes[props.type].canvasWidth}
					height={drawingShapes[props.type].canvasHeight}
				/>
			</Template>

			<Draggable
				transition={transitions.basicTransition}
				style={{
					zIndex: isAnimating ? 10 : 1,
					//cursor: isDragging ? "grabbing" : "grab",
					width: width,
					height: height,
				}}
				animate={returnToStartAnimation}
				onHoverStart={(event, info) => {
					setIsHovering(true);
					// shapeSizeAnimation.start({
					// 	scale: iconPanelScale,
					// });
				}}
				onHoverEnd={(event, info) => {
					setIsHovering(false);
					if (!isAnimating) {
						// shapeSizeAnimation.start({
						// 	scale: iconPanelScale,
						// });
					}
				}}
				onPointerDown={e => {
					shouldClick.current = true;

					shapeSizeAnimation.start({
						scale: iconPanelScale - 0.025,
					});

					setIsHovering(false);
					setIsPressing(true);
					props.onAddShapeDragStart();

					const rect = e.target.getBoundingClientRect();
					const left = e.clientX - rect.x;
					const top = e.clientY - rect.y;
					const xFromCenter = left - width / 2;
					const yFromCenter = top - height / 2;
					centerOffsets.current = { x: xFromCenter, y: yFromCenter };
				}}
				// onPointerUp={() => {
				// 	document.body.classList.remove("no-cursor");
				// 	setIsPressing(false);
				// 	if (shouldClick.current) {
				// 		shouldClick.current = false;
				// 		props.onClick(props.type);
				// 		shapeSizeAnimation.start({
				// 			scale: iconPanelScale,
				// 		});
				// 	}
				// }}
				drag
				dragMomentum={false}
				onDragStart={(event, info) => {
					document.body.classList.add("no-cursor");
					setIsPressing(false);
					setIsDragging(true);
					setIsAnimating(true);
					shouldClick.current = false;
					centerOffsetAnimation.start({
						x: centerOffsets.current.x,
						y: centerOffsets.current.y,
					});
				}}
				onDragEnd={(event, info) => {
					// console.log("button drag end");
					document.body.classList.remove("no-cursor");
					const dropInfo = props.onAddShapeDrop(props.type, event.clientX, event.clientY);
					//const dropInfo = { isValid: false };
					setIsDragging(false);
					props.setFadeOutPanel(false);

					if (dropInfo.isValid) {
						console.log("dropTargetSuccess", window.scrollY, dropInfo);

						setTimeout(() => {
							setIsValidDrop(false);
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
													setIsAnimating(false);
												},
											},
										});
									},
								},
							});
							centerOffsetAnimation.start({
								x: 0,
								y: 0,
								transition: {
									duration: 0,
								},
							});
							shapeSizeAnimation.start({
								scale: iconPanelScale,
								transition: {
									duration: 0,
								},
							});
						}, 50);
					} else {
						centerOffsetAnimation.start({
							x: 0,
							y: 0,
						});
						returnToStartAnimation.start({
							x: 0,
							y: 0,
							scale: 1,
							opacity: 1,
							transition: {
								...transitions.layoutTransition,
								onComplete: () => {
									setIsAnimating(false);
								},
							},
						});
						shapeSizeAnimation.start({
							scale: iconPanelScale,
						});
					}
				}}
				onDrag={(event, info) => {
					const dropInfo = props.onAddShapeDrag(props.type, event.clientX, event.clientY);

					if (dropInfo.isValid && !props.fadeOutPanel) {
						props.setFadeOutPanel(true);
					}

					if (!dropInfo.isValid && props.fadeOutPanel) {
						props.setFadeOutPanel(false);
					}

					if (!dropInfo.isValid && isValidDrop === true) {
						setIsValidDrop(false);
						shapeSizeAnimation.start({
							scale: iconPanelScale,
						});
					}

					if (dropInfo.isValid && isValidDrop === false) {
						setIsValidDrop(true);
						shapeSizeAnimation.start({
							scale: iconValidScale,
						});
					}
				}}
			>
				<Shape animate={centerOffsetAnimation} style={{ width: width, height: height }} className="shape">
					<DiagramPanelIcon
						name={props.icon}
						width={drawingShapes[props.type].canvasWidth}
						height={drawingShapes[props.type].canvasHeight}
						color={isValidDrop ? iconValidColor : iconPanelColor}
						scale={
							isValidDrop
								? iconValidScale + 0.1
								: isHovering
								? iconPanelScale
								: isPressing
								? iconPanelScale - 0.05
								: iconPanelScale
						}
					/>
				</Shape>
			</Draggable>
		</Wrap>
	);
};

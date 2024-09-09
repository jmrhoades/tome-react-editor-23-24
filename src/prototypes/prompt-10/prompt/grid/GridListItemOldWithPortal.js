import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import styled from "styled-components";

import { Spinner } from "../../ds/Spinner";
import { PageContentPreview } from "./PageContentPreview";
import { TileContentPreview } from "./TileContentPreview";
import { TomeContext, appendRowAtOrder } from "../../tome/TomeContext";
import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { TooltipContext } from "../../tooltips/TooltipContext";

import { IconButton } from "../../ds/Buttons";

const ItemWrap = styled(motion.div)`
	position: relative;
`;

const Bg = styled(motion.div)`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: absolute;
	pointer-events: none;
`;

const Hover = styled(Bg)``;
const Selected = styled(Bg)``;

const ItemLoadingContainer = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	pointer-events: none;
`;

const OptionsButton = styled.div``;

export const GridListItem = React.forwardRef(function Item(props, ref) {
	const { dropIndicatorInfo, setLayoutTweaking, setContextMenuInfo, setShowContextMenu } =
		React.useContext(TomeContext);
	const { getDropInfoForXY } = React.useContext(MetricsContext);
	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);

	const loading = props.item.loading;
	const borderRadius = 8;
	const colors = props.theme.colors;
	const [pointerDown, setPointerDown] = React.useState(false);
	const [hovering, setHovering] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);
	const listPosition = React.useRef({ top: 0, left: 0 });
	const deltaX = useMotionValue(0);
	const deltaY = useMotionValue(0);
	const deltaOpacity = useMotionValue(1);
	const dragThreshold = 3;

	const tooltipTimer = React.useRef(null);

	const previewSurface = PageContentPreview;

	let contentBackgroundColor = props.theme.colors.backgrounds.page;
	if (props.scope.id === "command_create_tiles") {
		//contentBackgroundColor = props.theme.mode === "light" ? colors.z1 : colors.t2;
		contentBackgroundColor = colors.z2;
	}

	const needsOutline = props.theme.colors.backgrounds.page === props.theme.colors.backgrounds.panel;
	//console.log("needsOutline", needsOutline);

	//const [loaded, setLoaded] = React.useState(props.item.loaded);

	const isPointInRectangle = (point, rectangle) => {
		// Extracting coordinates of the point and rectangle
		const { x: pointX, y: pointY } = point;
		const { x: rectX, y: rectY, width, height } = rectangle;

		// Checking if the point is within the rectangle's bounds
		if (
			pointX >= rectX && // Point is to the right of the left edge
			pointX <= rectX + width && // Point is to the left of the right edge
			pointY >= rectY && // Point is below the top edge
			pointY <= rectY + height // Point is above the bottom edge
		) {
			return true; // Point intersects the rectangle
		}

		return false; // Point does not intersect the rectangle
	};

	const isOverPromptBar = e => {
		const point = { x: e.clientX, y: e.clientY };
		const rectangle = {
			x: listPosition.current.promptRect.left,
			y: listPosition.current.promptRect.top,
			width: listPosition.current.promptRect.width,
			height: listPosition.current.promptRect.height,
		};
		return isPointInRectangle(point, rectangle);
	};

	const onItemDrag = e => {
		dropIndicatorInfo.opacity.set(0);
		dropIndicatorInfo.backgroundDropOpacity.set(0);

		if (isOverPromptBar(e)) return false;
		if (props.scope.id === "command_create_page") {
			const dropInfo = getDropInfoForXY(e.clientX, e.clientY, { replace: false, canBeBackground: false });
			setLayoutTweaking(true);
			if (dropInfo.dropZone !== "NONE") {
				//console.log(dropInfo.dropZone);
				dropIndicatorInfo.y.set(dropInfo.dropY);
				if (
					dropInfo.dropZone === "ABOVE_PAGE" ||
					dropInfo.dropZone === "BELOW_PAGE" ||
					dropInfo.dropZone === "ABOVE_TILE" ||
					dropInfo.dropZone === "BELOW_TILE"
				) {
					dropIndicatorInfo.x.set(dropInfo.indicatorX_NewRow);
					dropIndicatorInfo.width.set(dropInfo.indicatorWidth_NewRow);
					dropIndicatorInfo.height.set(dropInfo.indicatorHeight_NewRow);
					dropIndicatorInfo.opacity.set(1);
				} else {
					dropIndicatorInfo.backgroundDropOpacity.set(1);
				}
			}
		}
		if (props.scope.id === "command_create_tiles") {
			const dropInfo = getDropInfoForXY(e.clientX, e.clientY, { replace: true, canBeBackground: false });
			console.log(dropInfo);

			setLayoutTweaking(true);
			dropIndicatorInfo.y.set(dropInfo.dropY);
			if (
				dropInfo.dropZone === "ABOVE_PAGE" ||
				dropInfo.dropZone === "BELOW_PAGE" ||
				dropInfo.dropZone === "ABOVE_TILE" ||
				dropInfo.dropZone === "BELOW_TILE"
			) {
				dropIndicatorInfo.x.set(dropInfo.indicatorX_NewRow);
				dropIndicatorInfo.width.set(dropInfo.indicatorWidth_NewRow);
				dropIndicatorInfo.height.set(dropInfo.indicatorHeight_NewRow);
				dropIndicatorInfo.opacity.set(1);
			}
			if (dropInfo.dropZone === "LEFT_OF_TILE" || dropInfo.dropZone === "RIGHT_OF_TILE") {
				dropIndicatorInfo.x.set(dropInfo.indicatorX_AddToRow);
				dropIndicatorInfo.width.set(dropInfo.indicatorWidth_AddToRow);
				dropIndicatorInfo.height.set(dropInfo.indicatorHeight_AddToRow);
				dropIndicatorInfo.opacity.set(1);
			}
		}
	};

	const onItemDrop = e => {
		//console.log("onItemDrag", e.clientX, e.clientY);
		const dropInfo = getDropInfoForXY(e.clientX, e.clientY, { replace: false, canBeBackground: false });
		setLayoutTweaking(false);

		dropIndicatorInfo.opacity.set(0);
		dropIndicatorInfo.backgroundDropOpacity.set(0);
		let validDrop = false;

		if (isOverPromptBar(e)) return false;

		if (props.scope.id === "command_create_page") {
			if (dropInfo.dropZone !== "NONE") {
				if (
					dropInfo.dropZone === "ABOVE_PAGE" ||
					dropInfo.dropZone === "BELOW_PAGE" ||
					dropInfo.dropZone === "ABOVE_TILE" ||
					dropInfo.dropZone === "BELOW_TILE"
				) {
					props.onDrop(props.i, props.item, dropInfo);
				} else {
					props.onDrop(props.i, props.item, dropInfo, true);
				}
				validDrop = true;
			}
		}

		if (props.scope.id === "command_create_tiles") {
			if (dropInfo.dropZone !== "NONE") {
				props.onDrop(props.i, props.item, dropInfo);
				validDrop = true;
			}
		}

		return validDrop;
	};

	// Listen for enter key
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

	// Post pointer down events:
	// If pointer is down on item, record position
	// Listen for pointer move event, update position
	// If pointer moves "enough", set dragging state to true
	// If pointer is released:
	//      if not dragging, trigger click handle
	//      if dragging, set dragging to false

	React.useEffect(() => {
		const onMouseUp = e => {
			setPointerDown(false);
			setHovering(false);

			// Click or End Drag
			if (!dragging) {
				if (props.scope.id === "command_create_page") {
					props.onGeneratedPageContentClick(props.i, props.item);
				}

				if (props.scope.id === "command_create_tiles") {
					props.onGeneratedTileClick(props.i, props.item);
				}
			} else {
				const validDrop = onItemDrop(e);
				if (validDrop) {
					// Fade out and scale down
					animate(deltaOpacity, 0, { ease: "easeOut", duration: 1 });
				} else {
					// Send back to place in the list
					animate(deltaX, 0, {
						ease: "easeOut",
						duration: 0.2,
						onComplete: () => {
							setDragging(false);
						},
					});
					animate(deltaY, 0, { ease: "easeOut", duration: 0.2 });
				}
			}
			props.setItemDragging(false);
			//setDragging(false);
			e.preventDefault();
			e.stopPropagation();
		};

		const onPointerMove = e => {
			if (pointerDown) {
				//console.log("move");
				//console.log(listPosition.current);
				//console.log(e.pageX);
				const dX = e.pageX - (listPosition.current.left + listPosition.current.pointerLeft);
				const dY = e.pageY - (listPosition.current.top + listPosition.current.pointerTop);
				//console.log(dX, dY);
				deltaX.set(dX);
				deltaY.set(dY);

				if (Math.abs(deltaX.get()) > dragThreshold || (Math.abs(deltaY.get()) > dragThreshold && !dragging)) {
					deltaOpacity.set(1);
					setDragging(true);
					props.setItemDragging(true);
				}

				if (dragging) onItemDrag(e);
			}
		};

		if (pointerDown) {
			document.body.addEventListener("mousemove", onPointerMove);
			document.body.addEventListener("mouseup", onMouseUp);
		}
		return function cleanup() {
			document.body.removeEventListener("mousemove", onPointerMove);
			document.body.removeEventListener("mouseup", onMouseUp);
		};
	}, [pointerDown, dragging]);

	//
	// Transitions
	//
	const delayIncrement = 0.1;
	const itemTransition = {
		opacity: {
			ease: "easeOut",
			duration: 0.35,
			delay: props.i * delayIncrement,
		},
		y: {
			type: "spring",
			//bounce: 0.1,
			//duration: 0.25,
			stiffness: 600,
			damping: 45,
			//delay: props.i * delayIncrement,
		},
		scale: {
			type: "spring",
			duration: 0.2,
		},
	};
	const contentTransition = {
		opacity: {
			ease: "easeOut",
			duration: 0.35,
			//delay: props.i * delayIncrement,
		},
	};
	const spinnerTransition = {
		//delay: props.i * delayIncrement,
		opacity: {
			ease: "easeOut",
			duration: 0.2,
		},
	};
	const key = "grid-item" + props.item.id;

	const child = (
		<ItemWrap
			key={key}
			ref={ref}
			id={"grid-item" + props.item.id}
			style={{
				width: props.width,
				height: props.height,
				pointerEvents: loading ? "none" : "unset",
				cursor: loading ? "default" : "grab", // "pointer"
			}}
			//layout
			initial={{
				opacity: 0,
				//y: "100%",
			}}
			animate={{
				opacity: 1,
				//y: 0,
			}}
			exit={{
				opacity: 0,
				//scale: 0,
				transition: {
					ease: "easeOut",
					duration: 0.1,
				},
			}}
			transition={itemTransition}
			// whileTap={{
			// 	scale: 0.99,
			// }}
			whileHover={{
				scale: 1.25,
				zIndex: 10,
			}}
			onMouseDown={e => {
				if (e.button === 2) return false; // ignore right-clicks
				const rect = ref.current.getBoundingClientRect();
				listPosition.current = {
					top: rect.top,
					left: rect.left,
					pointerLeft: e.pageX - rect.left,
					pointerTop: e.pageY - rect.top,
					promptRect: props.promptbarContainerRef.current.getBoundingClientRect(),
				};
				//console.log(listPosition.current);
				setPointerDown(true);

				e.preventDefault();
				e.stopPropagation();
			}}
			onHoverStart={e => {
				setHovering(true);
			}}
			onHoverEnd={e => {
				setHovering(false);
			}}
			onContextMenu={e => {
				// select on right-click if it isn't already
				if (!props.isSelected) props.onGeneratedPageContentClick(props.i, props.item);

				//console.log("right click!", e);
				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: [""],
					isPageCandidate: true,
					title: `Page goal ${props.i + 1}`,
					pageGoal: "Understanding the causes behind honey bee extinction and ways to stop it.",
					onThumbsUp: () => {
						props.onGenerateMorePagesLikeThis(props.item);
					},
					onThumbsDown: () => {
						props.onGenerateLessPagesLikeThis(props.item);
					},
					onRetry: () => {
						props.onRegeneratePage(props.item);
					},
				});
				setShowContextMenu(true);
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<Bg
				style={{
					opacity: dragging ? 0 : 1,
					backgroundColor: colors.t1, //contentBackgroundColor,
					borderRadius: borderRadius,
					boxShadow: `0 0 0 1px ${colors.t1} inset, ${props.theme.shadows.medium}`,
				}}
			/>

			{!dragging && (
				<Bg
					style={{
						backgroundColor: contentBackgroundColor,
						borderRadius: borderRadius,
					}}
					initial={false}
					animate={{
						opacity: loading ? 0 : 1,
					}}
				/>
			)}

			{loading && (
				<ItemLoadingContainer
					initial={{ opacity: 0 }}
					animate={{
						opacity: loading ? 1 : 0,
					}}
					exit={{ opacity: 0 }}
					transition={spinnerTransition}
					style={{
						x: -25 / 2,
						y: -25 / 2,
					}}
				>
					<Spinner
						size={25}
						background={colors.t3}
						foreground={colors.t6}
						strokeWidth={1.5}
						startAngle={0}
						endAngle={270}
					/>
				</ItemLoadingContainer>
			)}

			<Selected
				style={{
					boxShadow: `0 0 0 1.25px ${colors.accent}`,
					borderRadius: borderRadius,
				}}
				initial={false}
				animate={{
					opacity: props.isSelected ? (dragging || props.itemDragging ? 0 : 1) : 0,
				}}
				transition={{
					ease: "easeOut",
					duration: props.isSelected ? 0 : 0,
				}}
				exit={{
					opacity: 0,
					transition: {
						duration: 0.1,
					},
				}}
			/>

			{!loading && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					transition={contentTransition}
				>
					<motion.div style={{ opacity: dragging ? 0 : 1 }}>
						{props.scope.id === "command_create_page" && (
							<PageContentPreview
								item={props.item}
								theme={props.theme}
								width={props.width}
								height={props.height}
								scope={props.scope}
							/>
						)}
						{props.scope.id === "command_create_tiles" && (
							<TileContentPreview
								item={props.item}
								theme={props.theme}
								width={props.width}
								height={props.height}
								scope={props.scope}
							/>
						)}
					</motion.div>
				</motion.div>
			)}

			{!loading &&
				dragging &&
				createPortal(
					<motion.div
						style={{
							width: props.width,
							height: props.height,
							position: "absolute",
							top: listPosition.current.top,
							left: listPosition.current.left,
							x: deltaX,
							y: deltaY,
							opacity: deltaOpacity,
							cursor: "grabbing",
							pointerEvents: "auto",
						}}
						initial={{
							scale: 1.25,
						}}
						animate={{
							scale: 2,
						}}
					>
						<Bg
							style={{
								backgroundColor: contentBackgroundColor,
								borderRadius: borderRadius,
								boxShadow: `0 0 0 1px ${colors.t1} inset, ${props.theme.shadows.medium}`,
							}}
						/>
						{props.scope.id === "command_create_page" && (
							<PageContentPreview
								item={props.item}
								theme={props.theme}
								width={props.width}
								height={props.height}
								scope={props.scope}
							/>
						)}
						{props.scope.id === "command_create_tiles" && (
							<TileContentPreview
								item={props.item}
								theme={props.theme}
								width={props.width}
								height={props.height}
								scope={props.scope}
							/>
						)}
					</motion.div>,
					document.getElementById("prompt_bar_container"),
					"grid-item-draggable" + props.item.id
				)}

			{/* <Hover
				style={{
					//backgroundColor: colors.t2,
					borderRadius: borderRadius,
					boxShadow: `0 0 0 1.25px ${colors.t3}`,
				}}
				initial={false}
				animate={{
					opacity: hovering && !dragging && !props.itemDragging && !props.isSelected ? 1 : 0,
				}}
				transition={{
					duration: 0.1,
				}}
			/> */}

			{/* <OptionsButton
				style={{
					position: "absolute",
					top: 6,
					right: 6,
					opacity: hovering ? 1 : 0,
				}}
				initial={false}
				animate={{
					opacity: hovering ? 0 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
			>
				<IconButton
					theme={props.theme}
					height={26}
					width={26}
					borderRadius={6}
					icon={"More"}
					iconSize={20}
					backgroundColor={props.theme.colors.z2}
					//tooltip={"Options"}
					//onTap={props.hideGridResults}
					//disabled={!props.createPageAdded}
				/>
			</OptionsButton> */}
		</ItemWrap>
	);

	return child;
});

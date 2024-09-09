import React from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import styled from "styled-components";

import { Spinner } from "../../ds/Spinner";
import { PageContentPreview } from "./PageContentPreview";

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

const ItemLoadingContainer = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	pointer-events: none;
`;

export const GridListHistoryItem = React.forwardRef(function Item(props, ref) {
	const loading = props.item.loading;
	const borderRadius = 8;
	const colors = props.theme.colors;
	const [hovering, setHovering] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);

	const contentBackgroundColor = props.theme.colors.backgrounds.page;

	const needsOutline = props.theme.colors.backgrounds.page === props.theme.colors.backgrounds.panel;

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
				cursor: loading ? "default" : "pointer", // "grab"
			}}
			layout
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
			whileTap={{
				scale: 0.99,
			}}
			onTap={e => {
				props.onGeneratedPageContentClick(props.i, props.item);
			}}
			onHoverStart={e => {
				setHovering(true);
			}}
			onHoverEnd={e => {
				setHovering(false);
			}}
		>
			<Bg
				style={{
					//opacity: dragging ? 0.5 : 1,
					backgroundColor: colors.t2, //contentBackgroundColor,
					borderRadius: borderRadius,
					boxShadow: needsOutline ? `0 0 0 1px ${colors.t2}` : "none",
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
						size={21}
						background={colors.t3}
						foreground={colors.t6}
						strokeWidth={1.5}
						startAngle={0}
						endAngle={270}
					/>
				</ItemLoadingContainer>
			)}

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
						<PageContentPreview item={props.item} theme={props.theme} width={props.width} height={props.height} />
					</motion.div>
				</motion.div>
			)}

			<Hover
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
			/>
		</ItemWrap>
	);

	return child;
});

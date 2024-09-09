import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { itemHeight } from "./ListItem";

const Container = styled(motion.div)`
	position: absolute;
	top: 0px;
	bottom: 0px;
	right: 0px;
	transition: opacity 0.3s ease-out;
	z-index: 3;
`;

const Thumb = styled(motion.div)`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 24px;
	border-radius: 3.5px;
`;

const Track = styled(motion.div)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	width: 100%;
`;

export const ScrollBar = props => {
	const colors = props.theme.colors.promptbar;
	const scrollBarWidth = 14;
	const thumbWidth = 7;
	const hideTimeout = 1250;

	const [showThumb, setShowThumb] = React.useState(false);
	const [showTrack, setShowTrack] = React.useState(false);

	const [dragging, setDragging] = React.useState(false);
	const [mouseDownY, setMouseDownY] = React.useState(0);
	const [mouseDownScrollTop, setMouseDownScrollTop] = React.useState(0);

	const thumbHeight = useMotionValue(0);
	const thumbY = useMotionValue(0);
	const hideScrollbarTimer = React.useRef(null);

	/*
	Custom scrollbar
	*/

	const hideScrollbar = () => {
		clearTimeout(hideScrollbarTimer.current);
		hideScrollbarTimer.current = setTimeout(() => {
			setShowThumb(false);
			setShowTrack(false);
		}, hideTimeout);
	};

	const handleScroll = React.useCallback(() => {
		setShowThumb(true);
		hideScrollbar();
		const scroller = props.scrollRef.current;
		const { scrollTop, scrollHeight, offsetHeight } = scroller;
		const scrollPercent = scrollTop / (scrollHeight - offsetHeight);
		const minY = -offsetHeight + thumbHeight.get() + 6; // starting from handle bottom aligned to bottom
		let y = Math.abs(scrollPercent) * minY;
		const maxY = -6;
		if (y < minY) y = minY;
		if (y > maxY) y = maxY;
		thumbY.set(y);
	}, []);

	const handleThumbMouseDown = React.useCallback(e => {
		e.preventDefault();
		e.stopPropagation();

		setShowThumb(true);
		clearTimeout(hideScrollbarTimer.current);

		setMouseDownY(e.clientY);
		setMouseDownScrollTop(props.scrollRef.current.scrollTop);
		setDragging(true);
	}, []);

	const handleDocumentMouseUp = React.useCallback(
		e => {
			if (dragging) {
				hideScrollbar();
				e.preventDefault();
				setDragging(false);
			}
		},
		[dragging]
	);

	const handleDocumentMouseMove = React.useCallback(
		e => {
			if (dragging) {
				e.preventDefault();
				e.stopPropagation();
				clearTimeout(hideScrollbarTimer.current);
				const scroller = props.scrollRef.current;
				const { scrollHeight, offsetHeight } = scroller;
				const deltaY = e.clientY - mouseDownY;
				const deltaScrollTop = deltaY * (scrollHeight / offsetHeight);
				props.scrollRef.current.scrollTop = mouseDownScrollTop + deltaScrollTop;
			}
		},
		[dragging]
	);

	const handleTrackMouseDown = React.useCallback(e => {
		e.preventDefault();
		e.stopPropagation();

		// What percent along the track was clicked? 0 is bottom 1 is top
		const scroller = props.scrollRef.current;
		const { scrollHeight, offsetHeight } = scroller;
		const rect = e.target.getBoundingClientRect();
		const y = e.clientY - rect.top; //y position within the element.
		const percent = 1 - y / offsetHeight;
		scroller.scrollTop = -1 * (scrollHeight - offsetHeight) * percent;
		console.log(percent);
		//setMouseDownY(e.clientY);
		//setMouseDownScrollTop(props.scrollRef.current.scrollTop);
	}, []);

	// Listen for scroll events
	React.useEffect(() => {
		const scroller = props.scrollRef.current;
		scroller.addEventListener("scroll", handleScroll, true);
		return function cleanup() {
			scroller.removeEventListener("scroll", handleScroll, true);
		};
	}, []);

	// Set thumb height when scrollview dimensions change
	React.useEffect(() => {
		let tH = (props.scrollViewHeight / props.contentHeight) * props.scrollViewHeight;
		if (tH < 24) tH = 24;
		thumbHeight.set(tH);
	}, [props.scrollViewHeight, props.contentHeight]);

	// Listen for mouse move and up when thumb is dragging
	React.useEffect(() => {
		document.addEventListener("mousemove", handleDocumentMouseMove);
		document.addEventListener("mouseup", handleDocumentMouseUp);
		document.addEventListener("mouseleave", handleDocumentMouseUp);
		return function cleanup() {
			document.removeEventListener("mousemove", handleDocumentMouseMove);
			document.removeEventListener("mouseup", handleDocumentMouseUp);
			document.removeEventListener("mouseleave", handleDocumentMouseUp);
		};
	}, [handleDocumentMouseMove, handleDocumentMouseUp]);

	return (
		<Container
			style={{
				width: scrollBarWidth,
			}}
			onHoverStart={() => {
                clearTimeout(hideScrollbarTimer.current);
                setShowThumb(true);
				setShowTrack(true);
			}}
			onHoverEnd={() => {
				if (!dragging) {
					hideScrollbar();
				}
			}}
		>
			<Track
				style={{
					backgroundColor: colors.scrollbarTrackBackground,
					//boxShadow: `-1px 0 0 0 ${colors.scrollbarTrackBorder}`,
					pointerEvents: showTrack ? "auto" : "none",
				}}
				initial={false}
				animate={{
					opacity: showTrack || dragging ? 1 : 0,
				}}
				transition={{ duration: 0.1 }}
				onPointerDownCapture={e => e.stopPropagation()}
				onMouseDown={handleTrackMouseDown}
			/>
			<Thumb
				style={{
					backgroundColor: colors.scrollbarThumbBackground,
					boxShadow: `0 0 1px 0 rgba(0,0,0,0.12)`,
					width: thumbWidth,
					x: (scrollBarWidth - thumbWidth) / 2,
					height: thumbHeight,
					y: thumbY,
				}}
				initial={false}
				animate={{ opacity: showThumb ? 1 : 0 }}
				transition={{ duration: 0.1 }}
				onPointerDownCapture={e => e.stopPropagation()}
				onMouseDown={handleThumbMouseDown}
			/>
		</Container>
	);
};

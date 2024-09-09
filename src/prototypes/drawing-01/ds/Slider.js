import React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";

const Control = styled(motion.div)`
	position: relative;
	flex-shrink: 0;
`;

const Track = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
`;

const Fill = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Handle = styled(motion.div)`
	position: absolute;
`;

const HoverFill = styled(Fill)``;

export const Slider = props => {
	//const { setLayoutTweaking } = React.useContext(TomeContext);

	const [isHovering, setIsHovering] = React.useState(false);
	const [active, setActive] = React.useState(false);

	const trackRef = React.useRef(null);
	const rect = React.useRef({ width: 0, left: 0 });

	const updateTimer = React.useRef(null);
	const internalValue = useMotionValue(0);

	const handleX = useMotionValue(0);
	const fillWidth = useMotionValue(0);

	const controlHeight = 28;
	//const controlWidth = 108; // TODO make this dynamic but reliable
	const [controlWidth, setControlWidth] = React.useState(0);

	const trackHeight = controlHeight;
	const trackRadius = 8;

	const handleWidth = 20;
	const handleHeight = controlHeight;
	const handleRadius = 8;

	function updateRect() {
		if (trackRef.current) {
			rect.current = trackRef.current.getBoundingClientRect();
			setControlWidth(rect.current.width);
		}
	}

	React.useEffect(() => {
		updateRect();
		updateValue(props.value, false);
	});

	// const onComplete = v => {
	// 	console.log("onComplete!", v);
	// 	if (props.onValueUpdate) props.onValueUpdate(v);
	// };

	const updateModel = () => {
		if (props.onValueUpdate && props.value !== internalValue.get()) props.onValueUpdate(internalValue.get());
	};

	const updateValue = (v, animated) => {
		internalValue.set(v);
		if (props.labelMotionValue) props.labelMotionValue.set(v);
		const intialPercent = 1 - (props.range[1] - v) / (props.range[1] - props.range[0]);

		let newX = controlWidth * intialPercent;
		const min = handleWidth / 2;
		const max = controlWidth - handleWidth / 2;
		if (newX < min) newX = min;
		if (newX > max) newX = max;

		//console.log("update!", v, newX, rect.current.width);

		if (animated) {
			animate(handleX, newX - handleWidth / 2, { ease: "easeOut", duration: 0.15, onComplete: null });
			animate(fillWidth, newX, { ease: "easeOut", duration: 0.15 });
		} else {
			handleX.set(newX - handleWidth / 2);
			fillWidth.set(newX);
		}
	};

	const onControlActive = e => {
		setActive(true);
		e.stopPropagation();
		//setLayoutTweaking(true);
		setPositionFromWindow(e, true);
		updateTimer.current = setInterval(updateModel, 100);
		updateModel();

		//console.log("onControlActive");
	};

	const onControlInactive = e => {
		setActive(false);
		if (!isHovering) document.body.classList.remove("ew-cursor");
		//setLayoutTweaking(false);
		clearInterval(updateTimer.current);
	};

	const setPositionFromWindow = (event, animate) => {
		if (event.touches && event.touches.length > 0) {
			event.preventDefault();
			event = event.changedTouches[0];
		}
		xToValue(event.clientX, animate);
	};

	const xToValue = (x, animate) => {
		x = x - rect.current.x;
		let percent = x / controlWidth;
		if (percent < 0) percent = 0;
		if (percent > 1) percent = 1;
		let rawVal = (props.range[1] - props.range[0]) * percent;
		let val = props.range[0] + Math.round(rawVal);
		updateValue(val, animate);

		/*
        if (quantizedUnits.length > 0) {
            let quantizedValue = Math.round(transform(newX, [0, rect.current.width], [0, quantizedUnits.length - 1]))
            newX = (rect.current.width / (quantizedUnits.length - 1)) * quantizedValue
        }
        handleX.set(newX)

        // Update value and text label
        let newValue = transform(newX, [0, rect.current.width], [0, 1])
        if (bipolar) {
            newValue = transform(newX, [0, rect.current.width], [-1, 1])
        }
        value.set(newValue)
        valueLabel.set(displayValue(value.get(), min, max, bipolar, unit, quantizedUnits))

        // Notify change
        onControlUpdate({ name: parameterName, value: parameterValue(value.get(), min, max, bipolar, unit) })
		*/
	};

	React.useEffect(() => {
		const setMouseUpFromEvent = e => onControlInactive(e);
		const setMouseMoveFromEvent = e => setPositionFromWindow(e, true);
		if (active) {
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
	}, [active, isHovering]);

	return (
		<Control
			style={{
				width: "100%",
				height: controlHeight,
			}}
			onPointerDownCapture={onControlActive}
			onHoverStart={() => {
				setIsHovering(true);
				document.body.classList.add("ew-cursor");
			}}
			onHoverEnd={() => {
				setIsHovering(false);
				console.log("onHoverEnd");
				if (!active) document.body.classList.remove("ew-cursor");
			}}
		>
			<Track
				style={{
					y: (controlHeight - trackHeight) / 2,
					height: trackHeight,
					borderRadius: trackRadius,
					backgroundColor: props.theme.colors.controls.slider.trackOff,
					overflow: "hidden",
				}}
				ref={trackRef}
			>
				<Fill
					style={{
						backgroundColor: props.theme.colors.controls.slider.fillOff,
						originX: 0,
						width: fillWidth,
					}}
				></Fill>
			</Track>

			{/* <HoverBorder
				style={{
					borderRadius: trackRadius,
					border: `1px solid ${props.theme.colors.controls.slider.hoverBorder}`,
					pointerEvents: "none",
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
			/> */}

			<Handle
				style={{
					x: handleX,
					y: (controlHeight - handleHeight) / 2,
					height: handleHeight,
					width: handleWidth,
					borderRadius: handleRadius,
					backgroundColor: props.theme.colors.controls.slider.handleOff,
					boxShadow: props.theme.shadows.sliderHandle,
					border: `1px solid ${props.theme.colors.controls.slider.handleBorder}`,
					boxSizing: "border-box",
					overflow: "hidden",
				}}
				//onPointerDown={onHandleActive}
			></Handle>
			<HoverFill
				style={{
					x: handleX,
					y: (controlHeight - handleHeight) / 2,
					height: handleHeight,
					width: handleWidth,
					borderRadius: handleRadius,

					boxShadow: props.theme.shadows.sliderHandle,
					border: `1px solid ${props.theme.colors.controls.slider.handleBorder}`,
					boxSizing: "border-box",
					overflow: "hidden",
					backgroundColor: props.theme.colors.controls.slider.handleHover,
				}}
				animate={{
					opacity: active || isHovering ? 1 : 0,
				}}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
			/>
		</Control>
	);
};

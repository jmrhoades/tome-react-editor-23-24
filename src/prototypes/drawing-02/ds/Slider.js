import React from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
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
	transition: background-color 0.2s ease-out;
`;

const Fill = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	transition: background-color 0.2s ease-out;
`;

const Handle = styled(motion.div)`
	position: absolute;
`;

const HoverFill = styled(Fill)``;

export const Slider = ({
	theme,
	width = 150,
	height = 24,
	borderRadius = 4,
	handleWidth = 16,
	value = undefined, // motion value!
	valueRange = [0, 1],
	onValueUpdate = undefined,
}) => {
	const [hovering, setHovering] = React.useState(false);

	const [active, setActive] = React.useState(false);
	const trackRef = React.useRef(null);
	const rect = React.useRef({ width: 0, left: 0 });

	const controlWidth = width;
	const controlHeight = height;
	const trackHeight = height;
	const handleHeight = height;
	const trackRadius = borderRadius;
	const handleRadius = borderRadius;

	//const handleX = useMotionValue(0);
	//const fillWidth = useMotionValue(0);


	const getX = (v) => {
		console.log("getX!", v);
		const intialPercent = 1 - (valueRange[1] - v) / (valueRange[1] - valueRange[0]);
		let newX = controlWidth * intialPercent;
		const min = 0;
		const max = controlWidth;
		if (newX < min) newX = min;
		if (newX > max) newX = max;
		return newX;
	};

	const fillWidth = useTransform(()=> getX(value.get()));

	


	

	function updateRect() {
		if (trackRef.current) {
			rect.current = trackRef.current.getBoundingClientRect();
		}
	}

	// Initial position
	React.useEffect(() => {
		updateRect();
		updateValue(value.get(), false);
	}, []);

	const updateValue = (v, animated) => {
		console.log("updateValue!", v, animated);
		value.set(v);
		if (onValueUpdate) onValueUpdate(v);
	};

	const onControlActive = e => {
		//console.log("onControlActive");
		setActive(true);
		setPositionFromWindow(e, true, true);
		e.stopPropagation();
	};

	const onControlInactive = e => {
		setActive(false);
	};

	const setPositionFromWindow = (event, animate, noHover) => {
		if (event.touches && event.touches.length > 0) {
			event.preventDefault();
			event = event.changedTouches[0];
		}
		let x = event.clientX;
		//if (noHover) x = x - 10;
		xToValue(x, animate);
	};

	const xToValue = (x, animate, noHover) => {
		console.log("xToValue", x, rect.current.x, x - rect.current.x, (x - rect.current.x) / controlWidth);

		

		x = x - rect.current.x;
		let percent = x / controlWidth;
		if (percent < 0) percent = 0;
		if (percent > 1) percent = 1;

		let rawVal = (valueRange[1] - valueRange[0]) * percent;
		let val = valueRange[0] + rawVal; //Math.round(rawVal);
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
		const setMouseMoveFromEvent = e => setPositionFromWindow(e, false);
		if (active) {
			document.body.classList.add("ew-resize");
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			document.body.classList.remove("ew-resize");
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [active]);

	return (
		<Control
			style={{
				width: controlWidth,
				height: controlHeight,
			}}
			onPointerDownCapture={onControlActive}
			onHoverStart={() => {
				setHovering(true);
				//document.body.classList.add("ew-cursor");
			}}
			onHoverEnd={() => {
				setHovering(false);
				//if (!active) document.body.classList.remove("ew-cursor");
			}}
		>
			<Track
				style={{
					y: (controlHeight - trackHeight) / 2,
					height: trackHeight,
					borderRadius: trackRadius,
					backgroundColor: hovering || active ? theme.colors.t3 :  theme.colors.t2,
					overflow: "hidden",
					cursor: "ew-resize",
				}}
				ref={trackRef}
			>
				<Fill
					style={{
						backgroundColor: hovering || active ? theme.colors.t6 :  theme.colors.t5,
						originX: 0,
						width: fillWidth,
						cursor: "ew-resize",
					}}
				></Fill>
			</Track>
			{/* <Handle
				style={{
					x: handleX,
					y: (controlHeight - handleHeight) / 2,
					height: handleHeight,
					width: handleWidth,
					borderRadius: handleRadius,
					//backgroundColor:
					boxShadow: theme.shadows.sliderHandle,
					border: `1px solid ${theme.colors.controls.slider.handleBorder}`,
					boxSizing: "border-box",
					overflow: "hidden",
					opacity: 0,
				}}
			></Handle> */}
			{/* <HoverFill
				style={{
					x: handleX,
					y: (controlHeight - handleHeight) / 2,
					height: handleHeight,
					width: handleWidth,
					borderRadius: handleRadius,
					opacity: 0,
					boxShadow: theme.shadows.sliderHandle,
					border: `1px solid ${theme.colors.controls.slider.handleBorder}`,
					boxSizing: "border-box",
					overflow: "hidden",
					backgroundColor: theme.colors.controls.slider.handleHover,
					cursor: "ew-resize",
				}}
				animate={
					{
						//opacity: active || hovering ? 1 : 0,
					}
				}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
			/> */}
		</Control>
	);
};

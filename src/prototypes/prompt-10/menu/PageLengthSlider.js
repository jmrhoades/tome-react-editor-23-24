import React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import styled from "styled-components";

import { CREATE_TOME_LENGTH_OPTIONS } from "../prompt/PromptConstants";

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

const Tooltip = styled(motion.div)`
	position: absolute;
	overflow: hidden;
	white-space: nowrap;

	padding: 3px 8px;
	/* UI/Footnote (13) Medium */

	
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 20px;
`;

const Dots = styled(Track)`
	display: flex;
	justify-content: space-between;
	pointer-events: none;
`;

const Dot = styled(motion.div)`
	width: 4px;
	height: 4px;
	border-radius: 4px;
`;

const HandleActiveFill = styled(Fill)``;

const HoverFill = styled(Fill)``;

export const PageLengthSlider = props => {
	//const { setLayoutTweaking } = React.useContext(TomeContext);

	const [isHovering, setIsHovering] = React.useState(false);
	const [active, setActive] = React.useState(false);

	const trackRef = React.useRef(null);
	const rect = React.useRef({ width: 0, left: 0 });

	const updateTimer = React.useRef(null);
	//const internalValue = useMotionValue(props.value);

	const handleX = useMotionValue(0);
	const fillWidth = useMotionValue(0);

	const controlHeight = 18;
	const controlWidth = 160; // TODO make this dynamic but reliable
	//const [controlWidth, setControlWidth] = React.useState(0);

	
	//const handleWidth = 20
	//const handleHeight = 20;
	//const handleRadius = 10;

	const handleWidth = 16;
	const handleHeight = 16;
	const handleRadius = 16;

	const trackHeight = handleHeight;
	const trackRadius = handleRadius;

	function updateRect() {
		if (trackRef.current) {
			rect.current = trackRef.current.getBoundingClientRect();
			//setControlWidth(rect.current.width);
		}
	}

	React.useEffect(() => {
		updateRect();
		updateValue(props.value.get(), false);
	});

	const getLabel = v => {};

	//
	const [countLabel, setCountLabel] = React.useState(getLabel(props.value.get()));

	// const onComplete = v => {
	// 	console.log("onComplete!", v);
	// 	if (props.onValueUpdate) props.onValueUpdate(v);
	// };

	const updateModel = () => {
		//if (props.onValueUpdate && props.value !== internalValue.get()) props.onValueUpdate(internalValue.get());
	};

	const updateValue = (v, animated) => {
		props.value.set(v);

		//setCountLabel(v);
		let lengthIndex = Math.round((CREATE_TOME_LENGTH_OPTIONS.length - 1) * v);
		if (lengthIndex < 0) lengthIndex = 0;
		const l = CREATE_TOME_LENGTH_OPTIONS[lengthIndex].label + CREATE_TOME_LENGTH_OPTIONS[lengthIndex].suffix;
		setCountLabel(l);
		//console.log(lengthIndex)

		if (props.labelMotionValue) props.labelMotionValue.set(v);
		const intialPercent = 1 - (props.range[1] - v) / (props.range[1] - props.range[0]);

		let newX = controlWidth * intialPercent;
		const min = handleWidth / 2;
		const max = controlWidth - handleWidth / 2;
		if (newX < min) newX = min;
		if (newX > max) newX = max;

		//console.log("update!", v, newX, rect.current.width);

		handleX.set(newX - handleWidth / 2);
		fillWidth.set(newX);

		/*

		if (animated) {
			animate(handleX, newX - handleWidth / 2, { ease: "easeOut", duration: 0.1, onComplete: null });
			animate(fillWidth, newX, { ease: "easeOut", duration: 0.1 });
		} else {
			handleX.set(newX - handleWidth / 2);
			fillWidth.set(newX);
		}
		*/
	};

	const onControlActive = e => {
		setActive(true);
		e.stopPropagation();
		//setLayoutTweaking(true);
		setPositionFromWindow(e, true);

		
		updateModel();

		//document.body.classList.add("no-cursor");
		document.body.classList.add("grabbing");

		//console.log("onControlActive");
	};

	const onControlInactive = e => {
		setActive(false);
		//if (!isHovering) document.body.classList.remove("ew-cursor");

		clearInterval(updateTimer.current);
		if (props.onMouseUp) props.onMouseUp();
		//document.body.classList.remove("no-cursor");
		document.body.classList.remove("grabbing");
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
		let val = props.range[0] + rawVal;
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
			key="page_count_length_slider"
			style={{
				width: controlWidth,
				height: controlHeight,
			}}
			onPointerDownCapture={onControlActive}
			onHoverStart={() => {
				setIsHovering(true);
				//document.body.classList.add("ew-cursor");
			}}
			onHoverEnd={() => {
				setIsHovering(false);
				//console.log("onHoverEnd");
				//if (!active) document.body.classList.remove("ew-cursor");
			}}
		>
			<Track
				style={{
					y: (controlHeight - trackHeight) / 2,
					height: trackHeight,
					borderRadius: trackRadius,
					backgroundColor: props.theme.colors.controls.slider.background,
					overflow: "hidden",
					cursor: "pointer",
				}}
				ref={trackRef}
			>
				<Fill
					style={{
						originX: 0,
						width: fillWidth,
						backgroundColor: props.theme.colors.controls.slider.fill,
					}}
					initial={false}
					transition={{ type: "tween", duration: 0.2 }}
				></Fill>
			</Track>

			<Dots
				style={{
					marginTop: 12,
					marginBottom: 4,
					paddingLeft: 8,
					paddingRight: 8,
					opacity: 0,
				}}
			>
				{CREATE_TOME_LENGTH_OPTIONS.map((item, i) => (
					<Dot key={"dot_" + i} style={{ backgroundColor: props.theme.colors.t3 }} />
				))}
			</Dots>

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
					backgroundColor: props.theme.colors.controls.slider.handle,
					boxShadow: props.theme.shadows.sliderHandle,
					border: `1px solid ${props.theme.colors.controls.slider.handleBorder}`,
					boxSizing: "border-box",
					cursor: "grab",
				}}
				//onPointerDown={onHandleActive}
			>
				{/* <HandleActiveFill
					style={{
						backgroundColor: props.theme.colors.controls.slider.handleOn,
						borderRadius: handleRadius,
					}}
					animate={{
						opacity: active ? 1 : 0,
					}}
					initial={false}
					transition={{ type: "tween", duration: 0.2 }}
				/> */}

				{/* <Tooltip
					style={{
						borderRadius: 6,
						backgroundColor: props.theme.colors.z4,
						boxShadow: props.theme.shadows.small,
						pointerEvents: "none",
						color: props.theme.colors.t9,
                        left: handleWidth/2,
                        bottom: handleWidth,
                        x: "-50%",
                        y: -7,
					}}
                    animate={{
						opacity: active ? 1 : 0,
					}}
					initial={false}
					transition={{ type: "tween", duration: 0.2 }}
				>
					{countLabel}
				</Tooltip> */}
			</Handle>

			{/* <HoverFill
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
			/> */}

			<Tooltip
				style={{
					//borderRadius: 6,
					//backgroundColor: props.theme.colors.z4,
					//boxShadow: props.theme.shadows.small,
					pointerEvents: "none",
					color: props.theme.colors.t6,
					fontSize: 13,
					top: 0,
					right: 0,
					x: 4,
					y: -35,
				}}
				animate={{
					opacity: active ? 1 : 1,
				}}
				initial={false}
				transition={{ type: "tween", duration: 0.2 }}
			>
				{countLabel}
			</Tooltip>
		</Control>
	);
};

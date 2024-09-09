import React from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { fieldTypeStyles } from "./Buttons";

const Wrap = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	/* min-width: 50%; */
`;

const Field = styled(motion.div)`
	position: relative;
	overflow: clip;
	white-space: nowrap;
	text-overflow: ellipsis;
	cursor: text;
	-webkit-user-select: all;
	-ms-user-select: all;
	user-select: all;
	&::selection {
		color: ${props => props.$selectionColor};
		background: ${props => props.$selectionBgColor};
	}
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
	transition: all 0.1s ease-out;
`;

const inputFontStyles = {
	
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "13px",
	lineHeight: "17px",
	textAlign: "center",
};

var findClosest = function (x, arr) {
	var indexArr = arr.map(function (k) {
		return Math.abs(k - x);
	});
	var min = Math.min.apply(Math, indexArr);
	//return arr[indexArr.indexOf(min)]
	return indexArr.indexOf(min);
};

export const Stepper = ({
	theme,
	height = 28,
	width = 48,
	borderRadius = 8,
	motionValue = {},
	scale = 100,
	unit = "%",
	step = 1 / 4,
	min = 0.05,
	max = 5,
	maxCharacters = 5,
	setValue = () => {},
	stops = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4],
	backgroundColor = theme.colors.t2,
	padding = 4,
	
}) => {
	const [stepUp, setStepUp] = React.useState(true);
	const [stepDown, setStepDown] = React.useState(true);
	const fieldRef = React.useRef(null);

	const onStepDown = e => {
		const i = findClosest(motionValue.get(), stops) - 1;
		const newValue = i >= 0 ? stops[i] : stops[0];
		//let newValue = motionValue.get() - motionValue.get() * step;
		//if (newValue < min) newValue = min;
		setValue(newValue);
	};
	const onStepUp = e => {
		let i = findClosest(motionValue.get(), stops);
		i += 1;
		
		const newValue = i <= stops.length - 1 ? stops[i] : stops[stops.length - 1];

		console.log(findClosest(motionValue.get(), stops), i, motionValue.get(), stops[i], newValue, stops)
		//let newValue = motionValue.get() + motionValue.get() * step;
		//if (newValue > max) newValue = max;
		setValue(newValue);
	};
	const valueLabel = useTransform(() => Math.round(motionValue.get() * scale) + unit);
	useMotionValueEvent(motionValue, "change", latest => {
		if (latest >= stops[stops.length - 1]) {
			if (stepUp) setStepUp(false);
		} else {
			if (!stepUp) setStepUp(true);
		}
		if (latest <= stops[0]) {
			if (stepDown) setStepDown(false);
		} else {
			if (!stepDown) setStepDown(true);
		}
	});
	function highlight() {
		// var range = document.createRange();
		// range.selectNode(fieldRef.current);
		// window.getSelection().removeAllRanges();
		// window.getSelection().addRange(range);
		const range = document.createRange();
		range.selectNodeContents(fieldRef.current);
		range.collapse();
		const sel = document.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
	return (
		<Wrap
			style={{
				height,
				borderRadius,
				backgroundColor: backgroundColor,
				padding: padding,
			}}
		>
			<IconButton name={"Subtract"} theme={theme} onTap={onStepDown} disabled={!stepDown} />

			<Field
				ref={fieldRef}
				onChange={e => {
					console.log("onChange");
				}}
				style={{
					caretColor: theme.colors.accent,
					color: theme.colors.t7,
					width: width,
					...inputFontStyles,
				}}
				onFocus={e => {
					//console.log("FOCUS!!!");
					//setTimeout(highlight, 40);
				}}
				onPointerDownCapture={e => e.stopPropagation()}
				$selectionBgColor={theme.colors.text.selection}
				$selectionColor={theme.colors.text.selectionColor}
				contentEditable={true}
				suppressContentEditableWarning={true}
				onKeyDown={e => {
					console.log(e);
					let blockEvent = false;
					const key = e.key;

					switch (key) {
						case "Enter" || "Tab":
							let newValue = parseFloat(e.target.innerText);
							if (isNaN(newValue)) {
								e.target.innerText = valueLabel.get();
							} else {
								newValue = newValue / scale;
								if (newValue < min) newValue = min;
								if (newValue > max) newValue = max;
								setValue(newValue);
							}
							e.target.blur();
							blockEvent = true;
							break;
						case "ArrowLeft":
							break;
						case "ArrowRight":
							break;
						case "ArrowUp":
							setValue(motionValue.get() + (1/scale));
							blockEvent = true;
							break;
						case "ArrowDown":
							setValue(motionValue.get() - (1/scale));
							blockEvent = true;
							break;
						case "Delete":
							break;
						case "Backspace":
							break;
						default:
							// Prevent more than max characters
							if (e.target.innerText.length > maxCharacters) blockEvent = true;
					}
					if (blockEvent) {
						e.preventDefault();
					}
					e.stopPropagation();
				}}
			>
				{valueLabel}
			</Field>
			<IconButton name={"Add"} theme={theme} onTap={onStepUp} disabled={!stepUp} />
		</Wrap>
	);
};

const IconButton = ({ theme, name = "Add", borderRadius = 4, width = 24, height = 24, onTap, disabled }) => {
	const backgroundOpacity = useMotionValue(0);
	return (
		<Wrap
			style={{
				width,
				height,
				flexShrink: 0,
				flexGrow: 0,
				cursor: "pointer",
				opacity: disabled ? 0.4 : 1,
			}}
			onHoverStart={
				disabled
					? null
					: e => {
							backgroundOpacity.set(1);
					  }
			}
			onHoverEnd={e => {
				backgroundOpacity.set(0);
			}}
			whileTap={{ scale: disabled ? 1 : 0.95 }}
			onPointerDown={disabled ? null : onTap}
		>
			<Background
				style={{
					backgroundColor: theme.colors.t2,
					borderRadius,
					opacity: disabled ? 0 : backgroundOpacity,
				}}
			/>
			<Icon name={name} size={16} color={theme.colors.t7} />
		</Wrap>
	);
};

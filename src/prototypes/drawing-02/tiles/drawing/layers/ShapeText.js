import React from "react";
import styled from "styled-components";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { BlockMap } from "../../text/TextSyles";

const Text = styled(motion.div)`
	position: relative;
	user-select: none;
	overflow-wrap: break-word;
	caret-color: ${props => props.$caretcolor};
	&::selection {
		background: ${props => props.$selectioncolor};
	}
`;

export const ShapeText = props => {
	const layer = props.layer;
	
	const fontSizePx = useMotionTemplate`${layer.motion.fontSize}px`;
	const marginX = useMotionTemplate`min(${props.marginXMin}, ${props.marginXMax}px)`;
	const marginY = useMotionTemplate`min(${props.marginYMin}, ${props.marginYMax}px)`;

	const caretColor = props.theme.colors.text.caret;
	const selectionColor = props.theme.colors.text.selection;

	// Listen for layer selection changes
	// Only enable cursor interactivity on text
	// If layer is selected and bounds are showing
	const textPointerEvents = useMotionValue("none");
	useMotionValueEvent(props.selection, "change", latest => {
		updateTextInteractivity();
	});
	useMotionValueEvent(props.boundsOpacity, "change", latest => {
		updateTextInteractivity();
	});
	const updateTextInteractivity = () => {
		const ids = props.selection.get().split(",");
		const selected = ids.includes(props.layer.id);
		if (ids.length === 1 && selected && props.boundsOpacity.get() === 1) {
			textPointerEvents.set("auto");
		} else {
			textPointerEvents.set("none");
		}
	};

	// Keep shape text in sync w/ non-motion tile data
	const onShapeTextInput = e => {
		props.layer.params.text.content = e.target.innerText;
		props.content.set(props.layer.params.text.content)
	};

	return (
		<Text
			id={props.id}
			style={{
				fontFamily: props.theme.typography.fontFamily,
				fontSize: fontSizePx,
				fontWeight: props.layer.motion.text.weight,
				lineHeight: 1.2,
				//lineHeight: props.theme.typography.lineHeight[style],
				//letterSpacing: props.theme.typography.letterSpacing[style],
				color: props.color,
				textAlign: props.layer.motion.text.alignment.x,
				marginLeft: marginX,
				marginRight: marginX,
				marginTop: marginY,
				marginBottom: marginY,
				cursor: "text",
				//minWidth: 12,
				width: "100%",
				pointerEvents: textPointerEvents,
			}}
			contentEditable={true}
			suppressContentEditableWarning={true}
			spellCheck="false"
			$caretcolor={caretColor}
			$selectioncolor={selectionColor}
			onFocus={e => {
				// console.log("focused")
				if (props.layerTextIsFocused) {
					//props.layerTextIsFocused.set(1);
				}
			}}
			onBlur={e => {
				window.getSelection().removeAllRanges();
				if (props.layerTextIsFocused) {
					//props.layerTextIsFocused.set(0);
				}
			}}
			onKeyDown={e => {
				//console.log(e);
				const key = e.key;
				switch (key) {
					case "Escape":
						e.target.blur();
						break;
					case "Enter":
						if (e.ctrlKey || e.metaKey) {
							e.target.blur();
						}
						break;
					default:
				}

				e.stopPropagation();
				//e.preventDefault();
			}}
			onInput={onShapeTextInput}
		>
			{props.content}
		</Text>
	);
};

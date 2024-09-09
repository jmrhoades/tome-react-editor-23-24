import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionTemplate, useMotionValueEvent, useTransform } from "framer-motion";
import { PLACEHOLDER_STRING, TEXT_ID } from "../constants";
import { focusAtStart, focusAtEnd, insertCaretAtPoint } from "../utilities";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

const Text = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	overflow-wrap: break-word;
	caret-color: ${props => props.$caretcolor};
	user-select: none;
	&::selection {
		background: ${props => props.$selectionBackgroundColor};
		color: ${props => props.$selectionForegroundColor};
	}
`;

const Placeholder = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	user-select: none;
	overflow-wrap: break-word;
	pointer-events: none;
`;

const SelectedOutlineSVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
	pointer-events: none;
`;

export const TextLayer = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r, text, fontSize } = layer.motion;

	// Margins around text box
	const yMargins = useTransform(() => 2 * props.zoom.get() * props.pageScale.get());
	const xMargins = useTransform(() => 2 * props.zoom.get() * props.pageScale.get());
	//const maxWidth = useTransform(() => 600 * props.zoom.get() * props.pageScale.get());

	// Wrapping - don't wrap text if in autowidth mode
	const whiteSpace = useMotionValue("nowrap");

	// Caret and selection colors
	const caretColor = props.theme.colors.text.caret;
	const selectionBackgroundColor = props.theme.colors.text.selection;
	const selectionForegroundColor = props.theme.colors.text.selectionColor;

	// Font size
	layer.motion.text.size.set(layer.params.text.size);
	const fontSizePx = useMotionTemplate`${fontSize}px`;

	// Interactivity
	const textFieldRef = React.useRef(null);
	const [contentEditable, setContentEditable] = React.useState(false);
	const clickDelta = 5;
	const pointerDownPosition = React.useRef({ x: 0, y: 0 });
	const layerIsFocused = useMotionValue(0);

	// Placeholder
	const placeholderRef = React.useRef(null);
	const showPlaceholder = text.showPlaceholder;
	// Initialize placeholder visibility based on text content when mounted
	showPlaceholder.set(text.content.get().trim() === "" ? 1 : 0);

	const onPointerDown = e => {
		//console.log("onPointerDown", contentEditable);
		if (!contentEditable) {
			props.onPointerDown(e);
		}
		// Make sure pointer down doesn't blur the focused empty text layer
		if (layerIsFocused.get() === 1 && textFieldRef.current.innerText.trim() === "") {
			e.stopPropagation();
			e.preventDefault();
		}
		pointerDownPosition.current = { x: e.clientX, y: e.clientY };
	};

	const onPointerUp = e => {
		const ids = props.selection.get().split(",");
		const selected = ids.includes(props.layer.id);
		if (ids.length === 1 && selected && props.boundsOpacity.get() === 1 && props.layerTextIsFocused.get() === 0) {
			const deltaX = Math.abs(e.clientX - pointerDownPosition.current.x);
			const deltaY = Math.abs(e.clientY - pointerDownPosition.current.y);
			if (deltaX < clickDelta && deltaY < clickDelta) {
				setContentEditable(true);
				setTimeout(() => {
					if (showPlaceholder.get() === 1) {
						textFieldRef.current.focus();
					} else {
						insertCaretAtPoint(e);
					}
				}, 10);
			}
		}
	};

	// Keep bounds in sync with content
	const onTextInput = e => {
		if (showPlaceholder.get() === 1) showPlaceholder.set(0);
		layer.params.text.content = e.target.innerText.trim();
		//text.content.set(props.layer.params.text.content);
		updateLayerSize();
		props.updateBounds();
	};

	const updateLayerSize = () => {
		const ref = showPlaceholder.get() === 1 ? placeholderRef.current : textFieldRef.current;
		if (ref) {
			const box = ref.getBoundingClientRect();

			const w = xMargins.get() * 2 + box.width;
			layer.params.width = w;
			layer.motion.w.set(w);
			bW.set(w);

			const h = yMargins.get() * 2 + box.height;
			layer.params.height = h;
			layer.motion.h.set(h);
			bH.set(h);

			props.updateBounds();
			console.log("update TEXT layer size", box.width, box.height);
		}
	};
	layer.updateLayerSize = updateLayerSize;

	// Update height when width is resized via the selection box
	const updateHeight = () => {
		if (textFieldRef.current) {
			const box = textFieldRef.current.getBoundingClientRect();
			const h = yMargins.get() * 2 + box.height;
			bH.set(h);
			console.log("updateHeight", box.height);
		}
	};
	layer.updateHeight = updateHeight;

	// Safari can't autofocus a content editable div unless there's content in it
	const safariSpaceHack = () => {
		if (text.content.get().trim() === "") {
			textFieldRef.current.innerHTML = "&nbsp;";
		}
	};

	// Stupid Safari autofocus cleanup, remove "&nbsp;"
	const removeTrailingSpace = () => {
		const spc = "&nbsp;";
		if (textFieldRef.current.innerHTML === spc) {
			textFieldRef.current.innerHTML = textFieldRef.current.innerHTML.replace("&nbsp;", "");
		}
	};

	// Enable focus-when-created behavior
	const focusText = e => {
		setContentEditable(true);
		safariSpaceHack();
		setTimeout(() => {
			focusAtStart(textFieldRef.current);
		}, 10);
	};
	layer.focusText = focusText;

	// Enable "type when layer selected but not focused behavior"
	const focusAndAppend = e => {
		setContentEditable(true);
		setTimeout(() => {
			focusAtEnd(textFieldRef.current);
			showPlaceholder.set(0);
			updateLayerSize();
			props.updateBounds();
		}, 10);
	};
	layer.focusAndAppend = focusAndAppend;

	// Set word-wrapping behavior in response to manual or auto width
	useMotionValueEvent(text.width, "change", latest => {
		if (latest === "auto") {
			whiteSpace.set("nowrap");
		} else {
			whiteSpace.set("normal");
		}
	});

	// Re-measure and set layer size on every render
	React.useLayoutEffect(() => updateLayerSize());

	return (
		<Wrap
			id={layer.id}
			style={{
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
				pointerEvents: "auto",
			}}
			onPointerDown={props.interactive ? onPointerDown : null}
			onPointerUp={props.interactive ? onPointerUp : null}
		>
			<motion.div animate={{ opacity: props.isPlayMode ? 0 : 1 }} initial={false}>
				<Placeholder
					ref={placeholderRef}
					style={{
						fontFamily: props.theme.typography.fontFamily,
						fontSize: fontSizePx,
						fontWeight: text.weight,
						lineHeight: 1.2,
						//lineHeight: props.theme.typography.lineHeight[style],
						//letterSpacing: props.theme.typography.letterSpacing[style],
						color: props.theme.drawing.text.placeholder,
						textAlign: text.alignment.x,
						y: yMargins,
						x: xMargins,
						opacity: showPlaceholder,
					}}
				>
					<span>{PLACEHOLDER_STRING}</span>
				</Placeholder>
			</motion.div>
			<Text
				ref={textFieldRef}
				id={layer.id + TEXT_ID}
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: fontSizePx,
					fontWeight: text.weight,
					lineHeight: 1.2,
					//lineHeight: props.theme.typography.lineHeight[style],
					//letterSpacing: props.theme.typography.letterSpacing[style],
					color: text.color,
					textAlign: text.alignment.x,
					cursor: contentEditable ? "text" : "default",
					minWidth: 2,
					width: text.width,
					// maxWidth: maxWidth,
					whiteSpace: whiteSpace,
					y: yMargins,
					x: xMargins,
				}}
				$caretcolor={caretColor}
				$selectionBackgroundColor={selectionBackgroundColor}
				$selectionForegroundColor={selectionForegroundColor}
				onFocus={e => {
					console.log("focus");
					props.layerTextIsFocused.set(1);
					layerIsFocused.set(1);
				}}
				onBlur={e => {
					console.log("blur");
					window.getSelection().removeAllRanges();
					props.layerTextIsFocused.set(0);
					setContentEditable(false);
					layerIsFocused.set(0);

					const content = e.target.innerText.trim();
					if (content === "") {
						showPlaceholder.set(1);
						//e.target.innerHTML = "&nbsp;"; // Stupid Safari business
						text.width.set("auto");
						updateLayerSize();
					}
				}}
				onKeyDown={e => {
					const key = e.key;
					console.log(key);
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
					removeTrailingSpace();
					e.stopPropagation();
				}}
				contentEditable={contentEditable}
				suppressContentEditableWarning={true}
				spellCheck="false"
				onInput={onTextInput}
			>
				{text.content}
			</Text>
			{props.showSelection && (
				<SelectedOutlineSVG
					style={{
						fill: "none",
						stroke: props.selectedStrokeColor,
						strokeWidth: 1,
						opacity: props.selectedOutlineOpacity,
					}}
				>
					<motion.rect width={bW} height={bH} />
				</SelectedOutlineSVG>
			)}
		</Wrap>
	);
};

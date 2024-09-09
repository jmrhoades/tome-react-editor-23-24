import React from "react";
import styled from "styled-components";
import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { EditorContext, Events, dragZ } from "../editor/EditorContext";
import { TileHoverSelect } from "../editor/selection/TileHoverSelect";
import { transitions } from "../ds/Transitions";
import { getLayoutCSS } from "./layout";
import { TomeContext } from "../tome/TomeContext";

export const Text = ({ tile, parent }) => {
	const { tomeData, saveState } = React.useContext(TomeContext);
	const {
		isTileDraggable,
		isTileDraggableRecursive,
		tileMotionValues,
		onLayoutMeasure,
		tileRefs,
		setInputFocused,
		event,
		blurFocus,
		isMultiSelection,
		isPlayMode,
		textSelectedMotionValue,
		textSelectionRectMotionValues,
	} = React.useContext(EditorContext);

	const draggable = isTileDraggable(tile);
	const [dragging, setDragging] = React.useState(false);

	const ancestorDraggable = isTileDraggableRecursive(tile);
	const [ancestorDragging, setAncestorDragging] = React.useState(false);

	const [clicked, setClicked] = React.useState(false);
	const clickCount = React.useRef(0);

	const { text, textStyle } = tile.content;

	const tag = textStyle.tag;
	const heading = textStyle.heading;
	const fontSize = tile.content.fontSize ? tile.content.fontSize + "px" : textStyle.fontSize;
	const fontWeight = tile.content.fontWeight
		? tile.content.fontWeight
		: heading
		? "var(--heading-weight)"
		: "var(--body-weight)";

	let lineHeight = textStyle.lineHeight;
	if (tile.content.lineHeight) lineHeight = tile.content.lineHeight;

	let color = heading ? "var(--heading-color)" : "var(--body-color)";

	if (tile.content.color) color = tile.content.color;

	/*
	const w = useMotionValue(width);
	const h = useMotionValue(height);
	tileMotionValues.current[tile.id] = {
		width: w,
		height: h,
	};
	*/

	// Store a ref reference to the editor context
	// Needed for rearrange and resize operations
	const ref = React.useRef();
	tileRefs.current[tile.id] = ref;

	// Store motion value references for dragging operations
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const z = useMotionValue(0);
	const top = useMotionValue(0);
	const left = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);
	const backgroundColor = useMotionValue(0);
	tileMotionValues.current[tile.id] = {
		x: x,
		y: y,
		z: z,
		top: top,
		left: left,
		width: width,
		height: height,
		backgroundColor: backgroundColor,
	};

	React.useEffect(() => {
		if (!tile.selected) {
			clickCount.current = 0;
			if (clicked) setClicked(false);
		}
	}, [tomeData]);

	const layoutCSS = getLayoutCSS({ tile, parent });


	const opacity = useMotionValue(1);
	useMotionValueEvent(event, "change", latest => {
		if (latest === Events.DraggingTile && draggable) {
			setDragging(true);
			animate(opacity, 0.75, transitions.fast);
		} else {
			setDragging(false);
			animate(opacity, 1, transitions.fast);
		}
		if (latest === Events.DraggingTile && ancestorDraggable) {
			setAncestorDragging(true);
		}
		if (latest === Events.ReleasedTile && ancestorDraggable) {
			setAncestorDragging(false);
		}
		if (latest === Events.ClickedTile && tile.selected && !isMultiSelection()) {
			clickCount.current++;
			if (clickCount.current > 1 && clicked === false) {
				setClicked(true);
				setTimeout(() => {
					//ref.current.focus();
					//if (showPlaceholder.get() === 1) {

					//} else {
					//insertCaretAtPoint(e);
					insertCaretAtPoint({ x: tile.clickX, y: tile.clickY });
					//}
				}, 10);
			}
		}
	});

	React.useLayoutEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			top.set(rect.top);
			left.set(rect.left);
			width.set(rect.width);
			height.set(rect.width);
		}
	}, [tomeData]);

	const onSelectionChange = () => {
		const selection = document.getSelection();
		const range = selection.getRangeAt(0);
		const rect = range.getBoundingClientRect();
		if (rect.width > 1) {
			textSelectionRectMotionValues.current.x.set(rect.x);
			textSelectionRectMotionValues.current.y.set(rect.y);
			textSelectionRectMotionValues.current.width.set(rect.width);
			textSelectionRectMotionValues.current.height.set(rect.height);
			textSelectedMotionValue.set(true);
		} else {
			textSelectedMotionValue.set(false);
		}
	};

	React.useEffect(() => {
		if (tile.focused) {
			document.addEventListener("selectionchange", onSelectionChange);
		}
		return () => {
			document.removeEventListener("selectionchange", onSelectionChange);
		};
	}, [tomeData]);

	return (
		<TextBox
			id={tile.id}
			ref={ref}
			layout
			layoutId={tile.id}
			transition={dragging || ancestorDragging ? transitions.instant : transitions.layoutTransition}
			initial={false}
			onLayoutMeasure={e => onLayoutMeasure(tile, e)}
			style={{
				x: x,
				y: y,
				z: z,
				opacity: opacity,

				paddingLeft: `calc(calc(${tile.layout.padding.left}px * var(--content-scale)) * var(--page-scale))`,
				paddingRight: `calc(calc(${tile.layout.padding.right}px * var(--content-scale)) * var(--page-scale))`,
				paddingTop: `calc(calc(${tile.layout.padding.top}px * var(--content-scale)) * var(--page-scale))`,
				paddingBottom: `calc(calc(${tile.layout.padding.bottom}px * var(--content-scale)) * var(--page-scale))`,
				gap: `calc(calc(${tile.layout.gap}px * var(--content-scale)) * var(--page-scale))`,

				...layoutCSS,
			}}
		>
			{!isPlayMode() && <TileHoverSelect tile={tile} draggable={draggable} />}
			<EditableText
				layout="position"
				transition={dragging ? transitions.instant : transitions.layoutTransition}
				initial={false}
				style={{
					fontFamily: heading ? "var(--heading-font)" : "var(--body-font)",
					fontWeight: fontWeight,
					color: color,
					//fontSize: fontSize,
					fontSize: `calc(calc(${fontSize} * var(--content-scale)) * var(--page-scale))`,

					paddingLeft: "2px",
					paddingRight: "2px",

					lineHeight: lineHeight,
					// textAlign: tile.content.align,

					cursor: clicked && !dragging ? "text" : "default",
					pointerEvents: clicked && !dragging ? "auto" : "none",
					z: tile.selected && !dragging ? 99999 : undefined,
				}}
				dangerouslySetInnerHTML={{ __html: text }}
				contentEditable={clicked}
				suppressContentEditableWarning={true}
				spellCheck="false"
				onPointerDownCapture={e => {
					insertCaretAtPoint(e);
					e.stopPropagation();
				}}
				onFocus={e => {
					setInputFocused(true);
					tile.focused = true;
					saveState();
				}}
				onBlur={e => {
					//tile.clicked = false;
					textSelectedMotionValue.set(false);
					setClicked(false);
					blurFocus();
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
					e.stopPropagation();
				}}
			/>

			{/* {showFormatBar && <TextFormatBar selectionRectMotionValues={selectionRectMotionValues} />} */}
		</TextBox>
	);
};

const TextBox = styled(motion.div)`
	position: relative;
	transform-style: preserve-3d;

	pointer-events: none;

	text-rendering: optimizeLegibility;
	
	/* -webkit-font-smoothing: antialiased; */

	/* text-wrap: balance; */

	//flex-grow: 0;
	/* word-break: break-all; */

	h3 {
		font-size: 1.46em;
		font-weight: unset;
		margin-bottom: 0.5em;
	}
	h3:last-child {
		margin-bottom: 0;
	}

	ul {
		padding-left: 0.85em;
		li {
			margin-bottom: 0.5em;
		}
		li:last-child {
			margin-bottom: 0;
		}
	}

	caret-color: var(--tome-brand-accent);
	user-select: none;

	div::selection,
	ul::selection,
	li::selection,
	p::selection,
	h3::selection {
		background: var(--tome-brand-accent);
		color: white;
	}
`;

const EditableText = styled(motion.div)``;

const Display1 = {
	id: "Display1",
	name: "Display 1",
	tag: "h1",
	fontSize: "8.76em",
	lineHeight: "1.1",
	heading: true,
};

const Display2 = {
	id: "Display2",
	name: "Display 2",
	tag: "h2",
	fontSize: "4.624em",
	lineHeight: "1.1",
	heading: true,
};

const Title = {
	id: "Title",
	name: "Title",
	tag: "h3",
	fontSize: "2.776em",
	lineHeight: "1.1",
	heading: true,
};

const Heading1 = {
	id: "Heading1",
	name: "Heading 1",
	tag: "h4",
	fontSize: "1.46em",
	lineHeight: "1.1",
	heading: true,
};

const Heading2 = {
	id: "Heading2",
	name: "Heading 2",
	tag: "h5",
	fontSize: "1em",
	lineHeight: "1.1",
	heading: true,
};

const Body1 = {
	id: "Body1",
	name: "Body 1",
	tag: "p",
	fontSize: "1.46em",
	lineHeight: "1.45",
};

const Body2 = {
	id: "Body2",
	name: "Body 2",
	tag: "p",
	fontSize: "1em",
	lineHeight: "1.45",
};

const Caption = {
	id: "Caption",
	name: "Caption",
	tag: "p",
	fontSize: "0.685em",
	lineHeight: "1.25",
};

export const TextStyles = {
	Display1: Display1,
	Display2: Display2,
	Title: Title,
	Heading1: Heading1,
	Heading2: Heading2,
	Body1: Body1,
	Body2: Body2,
	Caption: Caption,
};

export const insertCaretAtPoint = point => {
	let range;
	let targetNode;
	let offset;
	if (document.caretPositionFromPoint) {
		range = document.caretPositionFromPoint(point.x, point.y);
		targetNode = range.offsetNode;
		offset = range.offset;
	} else if (document.caretRangeFromPoint) {
		// Use WebKit-proprietary fallback method, Chrome needs it
		range = document.caretRangeFromPoint(point.x, point.y);
		targetNode = range.startContainer;
		offset = range.startOffset;
	} else {
		// Neither method is supported, do nothing
		return;
	}

	range.setStart(targetNode, offset);
	range.setEnd(targetNode, offset);
	const sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);

	//console.log(range, offset);
};

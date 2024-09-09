import React from "react";
import { motion, AnimatePresence, Reorder, useDragControls, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";
import { useRaisedShadow } from "./use-raised-shadow";

import { Icon } from "../../../ds/Icon";
import { OutlineStates, promptbarMetrics } from "./Prompt";
import { CREATE_TOME_LENGTH_OPTIONS } from "./PromptConstants";
import { Switch } from "../ds/Switch";
import { Spinner } from "../ds/Spinner";
import { Dots } from "../ds/Dots";
import { TomeContext } from "../tome/TomeContext";
import { TooltipContext } from "../tooltips/TooltipContext";

const Wrap = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	line-height: 22px;
	font-size: 17px;
	pointer-events: auto;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	-moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02";
`;

const TitleItem = styled(motion.div)``;
const OutlineItem = styled(motion.div)``;
const OutlineTitle = styled(motion.div)``;

const AddRowButton = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: middle;
	width: 32px;
	height: 32px;
`;

const List = styled(motion.div)`
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin: 0;
		padding: 0;
		margin-bottom: ${props => props.$itemSpacing}px;
	}
	li:last-child {
		margin-bottom: 0;
	}
`;

const Number = styled(motion.div)`
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	font-size: 13px;
	font-weight: medium;
	letter-spacing: -1px;
	line-height: 16px;

	-moz-font-feature-settings: "tnum";
	-webkit-font-feature-settings: "tnum";
	font-feature-settings: "tnum";
`;

const FieldContainer = styled(motion.div)`
	position: relative;
	width: 100%;
`;

const Field = styled(motion.input)`
	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	background: transparent;
	appearance: none;
	box-shadow: none;
	border-radius: 0;
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	::selection {
		background: ${props => props.$selectioncolor};
	}
	::placeholder {
		color: ${props => props.$placeholderColor};
	}
`;

const TitleField = styled(motion.textarea)`
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	display: block;
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	width: 100%;
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	background: transparent;
	appearance: none;
	resize: none;
	box-shadow: none;
	border-radius: 0;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;

	::selection {
		background: ${props => props.$selectioncolor};
	}
	::placeholder {
		color: ${props => props.$placeholderColor};
	}
`;

const Placeholder = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	pointer-events: none;
`;

const Spacer = styled(motion.div)`
	width: 12px;
	flex-shrink: 0;
`;

const Header = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Draggable = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-shrink: 0;
`;

const SpinnerWrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const moveCaretAtEnd = e => {
	var temp_value = e.target.value;
	e.target.value = "";
	e.target.value = temp_value;

	//e.target.setSelectionRange(0, e.target.value.length)
};

const focusInput = input => {
	if (input.current) {
		input.current.focus();
	}
};

const maxlength = 200;

export const Outline = props => {
	const { showToast } = React.useContext(TomeContext);
	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);

	const colors = props.theme.colors;

	const show = props.outlineState !== OutlineStates.HIDE;
	const ready = props.outlineState === OutlineStates.SHOW;
	const loading = props.outlineState === OutlineStates.LOADING;

	const width = promptbarMetrics.input.create.width;

	const titleVariants = {
		hide: { opacity: 0, y: 0 },
		load: { opacity: 0.75, y: 0, transition: { duration: 0.2 } },
		show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
	};

	const parentVariants = {
		hide: { opacity: 1 },
		load: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
		show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
	};

	const itemVariants = {
		hide: { opacity: 0, y: 0 },
		load: { opacity: 0.75, y: 0, transition: { duration: 0.2, y: { type: "spring", bounce: 0.2 } } },
		show: { opacity: 1, y: 0, transition: { duration: 0.2, y: { type: "spring", bounce: 0.2 } } },
	};

	const itemStyles = {
		height: 44,
		spacing: 8,
		radius: 8,
		border: {
			color: colors.t0,
			focus: colors.t0,
		},
		background: {
			color: props.theme.mode === "light" ? colors.z1 : colors.z2,
			focus: props.theme.mode === "light" ? colors.z0 : colors.z2,
			drag: props.theme.mode === "light" ? colors.z0 : colors.z3,
		},
		field: {
			color: colors.t8,
			focus: colors.t9,
		},
	};

	//console.log(props.outlineState);
	//console.log(props.items);

	const titleFieldRef = React.useRef();
	const [titleFocussed, setTitleFocussed] = React.useState(false);

	React.useEffect(() => {
		if (ready) {
			// Maybe don't focus first field, lean into "Continue" instead
			//focusInput(titleFieldRef);
			const onKeyDown = e => {
				console.log("Outline keydown", e.key);
				if (e.key === "Tab") {
					focusTitleField();
					e.preventDefault();
					e.stopPropagation();
				}
				if (e.key === "ArrowDown") {
					focusTitleField();
					e.preventDefault();
					e.stopPropagation();
				}
			};
			document.body.addEventListener("keydown", onKeyDown);
			return () => {
				document.body.removeEventListener("keydown", onKeyDown);
			};
		} else if (loading) {
			blurInputs();
		}
	}, [ready, loading]);

	const blurInputs = () => {
		if (titleFieldRef.current) {
			titleFieldRef.current.blur();
		}
		props.items.map(i => {
			const el = document.getElementById(i.id);
			if (el) el.blur();
		});
	};

	const focusNextHeadingField = i => {
		if (i < 0) {
			focusTitleField();
		} else {
			if (titleFocussed) setTitleFocussed(false);
			const input = document.getElementById(`outline_heading_${i}`);
			if (input) {
				input.focus();
			} else {
				focusTitleField();
			}
		}
	};

	const focusTitleField = () => {
		setTitleFocussed(true);
		focusInput(titleFieldRef);
	};

	let iC = props.theme.colors.outline.item;
	let borderColor = iC.border.color;
	let backgroundColor = iC.background.color;
	let fieldColor = iC.field.color;
	if (titleFocussed) {
		borderColor = iC.border.focus;
		backgroundColor = iC.background.focus;
		fieldColor = iC.field.focus;
	}

	const titlePlaceholder = loading ? "Generating outline…" : "Title";
	const [caretColor, setCaretColor] = React.useState(colors.accent);
	const loadingTransition = { type: "tween", ease: "easeOut", duration: 0.3 };

	return (
		// <AnimatePresence initial={false}>
		//{show &&(
		<Wrap
			key="outline_component"
			// animate={props.outlineState}
			// variants={parentVariants}
			//layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: show ? 1 : 0,
			}}
			transition={show ? { duration: 0.3, delay: 0.1 } : props.transitions.morph}
			//transition={show ? { ...props.transitions.morph, delay: 0.1 } : props.transitions.morph}
			style={{
				//position: "absolute",
				//bottom: 48,
				//left: "50%",
				//x: "-50%",
				width: width,
				color: colors.t7,
				padding: 12,
				//paddingTop: 0,
				//paddingBottom: 0,
				//height: 436,
				overflowY: "auto",
				marginBottom: 12 + 46,
				boxShadow: `0 1px 0 0 ${props.theme.colors.promptbar.divider}`,
			}}
		>
			<TitleItem
				style={{
					backgroundColor: backgroundColor,
					borderWidth: 1,
					borderStyle: "solid",
					borderColor: borderColor,
					borderRadius: itemStyles.radius,
					padding: 12,
					paddingTop: 8,
					marginBottom: itemStyles.spacing,
					position: "relative",
					//marginBottom: 28,
				}}
				// initial={false}
				// animate={{
				// 	opacity: 0,
				// }}
				layout
				animate={props.outlineState}
				variants={titleVariants}
				initial={"hide"}
			>
				<Header
					style={{
						marginBottom: 6,
					}}
					animate={{
						opacity: loading ? 0 : 1,
					}}
					transition={loadingTransition}
				>
					<motion.div
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<motion.div
							style={{
								lineHeight: "16px",
								fontSize: 13,
								color: colors.t6,
							}}
						>
							Title
						</motion.div>
					</motion.div>

					{/* <motion.div
						initial={false}
						animate={{
							opacity: loading ? 1 : 0,
						}}
						style={{
							x: 4,
						}}
					>
						<Spinner
							size={16}
							background={props.theme.colors.t4}
							foreground={props.theme.colors.t7}
							strokeWidth={1.5}
						/>
					</motion.div> */}
				</Header>

				<FieldContainer>
					{/* <Placeholder
						style={{
							color: colors.t5,
							fontSize: "20px",
							lineHeight: "28px",
						}}
						animate={{
							opacity: !loading && props.title.length === 0 ? 1 : 0,
						}}
					>
						Title
					</Placeholder> */}

					<Placeholder
						style={{
							color: colors.t7,
							fontSize: "19px",
							lineHeight: "28px",
							display: "flex",
							alignItems: "flex-end",
							gap: 3,
							//y: -24,
						}}
						animate={{
							opacity: loading ? 1 : 0,
							y: loading ? -24 : 0,
						}}
						transition={loadingTransition}
					>
						<div>Generating outline</div>
						<Dots theme={props.theme} size={3} color={props.theme.colors.t7} style={{ y: -6.5 }} />
					</Placeholder>

					<TitleField
						animate={{
							opacity: loading ? 0 : 1,
							y: loading ? -24 : 0,
						}}
						transition={loadingTransition}
						ref={titleFieldRef}
						$selectioncolor={colors.text.selection}
						$placeholderColor={colors.t5}
						style={{
							caretColor: caretColor,
							color: fieldColor,
							fontSize: "19px",
							lineHeight: "28px",
							height: 28 * 2,
							pointerEvents: ready ? "auto" : "none",
						}}
						spellCheck="false"
						autoComplete="off"
						//placeholder={"Title"}
						value={props.title}
						onFocus={e => {
							moveCaretAtEnd(e);
							setTitleFocussed(true);
						}}
						onBlur={e => {
							setTitleFocussed(false);
						}}
						onKeyDown={e => {
							if (e.key === "Enter") {
								focusNextHeadingField(0);
								e.preventDefault();
							}
							if (e.key === "ArrowDown") {
								focusNextHeadingField(0);
								e.preventDefault();
							}
							if (e.key === "Tab") {
								console.log("outline item keydown", e.key)
								focusNextHeadingField(0);
								e.preventDefault();
							}
							e.stopPropagation();
						}}
						onChange={e => {
							if (e.target.value.length >= maxlength) {
								props.showToast({
									id: uniqueId("toast"),
									label: `Title must be fewer than ${maxlength} characters`,
								});
								setCaretColor(colors.warning);
							} else {
								props.setTitle(e.target.value);
								setCaretColor(colors.accent);
							}
						}}
					></TitleField>
				</FieldContainer>
			</TitleItem>

			<List $itemSpacing={itemStyles.spacing}>
				<Reorder.Group
					values={props.items}
					onReorder={props.setItems}
					initial={"hide"}
					animate={props.outlineState}
					variants={parentVariants}
				>
					<AnimatePresence>
						{props.items.map((item, i) => (
							<Item
								key={item.id}
								item={item}
								i={i}
								items={props.items}
								theme={props.theme}
								setItems={props.setItems}
								showOutline={props.prompt.createTomeOutline}
								focusNextHeadingField={focusNextHeadingField}
								focusTitleField={focusTitleField}
								submitOutline={props.submitOutline}
								itemStyles={itemStyles}
								outlineState={props.outlineState}
								variants={itemVariants}
								loading={loading}
								ready={ready}
								updatePageCountFromOutline={props.updatePageCountFromOutline}
								showToast={showToast}
								showTooltip={showTooltip}
								hideTooltip={hideTooltip}
							/>
						))}
					</AnimatePresence>
				</Reorder.Group>
			</List>
		</Wrap>
		//)}
		// </AnimatePresence>
	);
};

const Item = props => {
	const colors = props.theme.colors;
	const styles = props.itemStyles;

	const [focussed, setFocussed] = React.useState(false);
	const [hovering, setHovering] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);
	const [caretColor, setCaretColor] = React.useState(colors.accent);

	const moderationRef = React.useRef();
	const [hasModerationError, setModerationError] = React.useState(false); //props.i === 2

	const y = useMotionValue(0);
	const shadow = props.theme.mode === "light" ? "0px 2px 8px rgba(0,0,0,0.12)" : "0px 6px 20px rgba(0,0,0,0.25)";
	const boxShadow = useRaisedShadow(y, shadow);

	//console.log(props.item.id)

	//const placeholder = props.loading ? "" : "Heading";
	const placeholder = "";

	const getPlaceholder = i => {
		switch (i) {
			case 0:
				return "Intro";
			case props.items.length - 1:
				return "Conclusion";
			default:
				return "Heading";
		}
	};

	const controls = useDragControls();

	const ref = React.useRef();

	let iC = props.theme.colors.outline.item;
	let borderColor = iC.border.color;
	let backgroundColor = iC.background.color;
	let fieldColor = iC.field.color;
	if (hasModerationError) fieldColor = colors.warning;

	if (focussed) {
		borderColor = iC.border.focus;
		backgroundColor = iC.background.focus;
		fieldColor = iC.field.focus;
	}

	return (
		<Reorder.Item
			ref={ref}
			value={props.item}
			id={props.item.id}
			style={{
				position: "relative",
				display: "flex",
				width: "100%",
				height: props.itemStyles.height,
				alignItems: "center",
				backgroundColor: backgroundColor,

				borderWidth: 1,
				borderStyle: "solid",
				borderColor: borderColor,
				borderRadius: styles.radius,
				y: y,
				boxShadow: boxShadow,
				pointerEvents: props.ready ? "auto" : "none",
			}}
			dragListener={false}
			dragControls={controls}
			onPointerEnter={e => {
				setHovering(true);
			}}
			onPointerLeave={e => {
				setHovering(false);
			}}
			onDragEnd={() => {
				setDragging(false);
				document.body.classList.remove("grabbing");
			}}
			exit={{
				opacity: 0,
				transition: { duration: 0.15 },
			}}
			variants={props.variants}
			//initial={"hide"}
		>
			{!hasModerationError && (
				<Number
					style={{
						color: colors.t6,
						width: 28,
						fontSize: 11,
						flexShrink: 0,
						textAlign: "center",
					}}
					// onPointerDown={e => {
					// 	controls.start(e);
					// 	setDragging(true);
					// 	document.body.classList.add("grabbing");
					// }}
					// onPointerUp={() => {
					// 	setDragging(false);
					// 	document.body.classList.remove("grabbing");
					// }}
				>
					{props.i + 1}
				</Number>
			)}

			{hasModerationError && (
				<motion.div
					style={{
						x: 0,
						marginRight: 5,
						marginLeft: 7,
					}}
					ref={moderationRef}
					onHoverStart={e => {
						props.showTooltip({
							id: "promptbar_outline_moderation_" + props.i,
							ref: moderationRef,
							label: "Out of moderation policy, rephrase and try again.",
							alignX: "middle",
							alignY: "leading",
						});
					}}
					onHoverEnd={e => {
						props.hideTooltip();
					}}
				>
					<Icon name={"Report"} opacity={1} color={colors.warning} size={16} />
				</motion.div>
			)}

			<FieldContainer>
				<Placeholder
					style={{
						color: colors.t5,
						fontSize: "15px",
						lineHight: "24px",
					}}
					animate={{
						opacity: props.item.label.length === 0 || props.loading ? 1 : 0,
					}}
					transition={{
						delay: props.loading ? 0.1 + props.i * 0.1 : 0.2 + props.i * 0.1,
					}}
				>
					{placeholder}
				</Placeholder>
				<Field
					id={`outline_heading_${props.i}`}
					$selectioncolor={colors.text.selection}
					$placeholderColor={colors.t5}
					style={{
						caretColor: hasModerationError ? colors.warning : caretColor,
						color: fieldColor,
						fontSize: "15px",
						lineHeight: "24px",
					}}
					spellCheck="false"
					autoComplete="off"
					maxLength={maxlength}
					//autoFocus
					//placeholder={getPlaceholder(props.i)}
					//placeholder={"Heading"}
					value={props.item.label}
					onFocus={e => {
						moveCaretAtEnd(e);
						setFocussed(true);
					}}
					onBlur={e => {
						setFocussed(false);
						// Delete on blur
						if (e.target.value.length < 1) {
							//props.items.splice(props.i, 1);
							//props.setItems([...props.items]);
							//props.focusNextHeadingField(props.i - 1);
							//e.preventDefault();
						}
					}}
					animate={{
						opacity: props.loading ? 0 : 1,
					}}
					transition={{
						delay: props.loading ? 0.1 + props.i * 0.1 : 0.2 + props.i * 0.1,
					}}
					onKeyDown={e => {
						if (e.key === "Enter") {
							if (props.i === props.items.length - 1) {
								e.target.blur();
								// Submit
								props.submitOutline();
							} else {
								props.focusNextHeadingField(props.i + 1);
							}
							e.preventDefault();
						}
						if (e.key === "Tab") {
							console.log("outline item keydown", e.key)
							if (props.i === props.items.length - 1) {
								// Focus the continue button?
								//props.submitOutline();
								e.target.blur();
								props.focusNextHeadingField(-1);
							} else {
								props.focusNextHeadingField(props.i + 1);
							}
							e.preventDefault();
						}
						if (e.key === "ArrowUp") {
							props.focusNextHeadingField(props.i - 1);
							e.preventDefault();
						}
						if (e.key === "ArrowDown") {
							props.focusNextHeadingField(props.i + 1);
							e.preventDefault();
						}
						if (e.key === "Backspace") {
							if (e.target.value.length < 1) {
								props.items.splice(props.i, 1);
								props.setItems([...props.items]);
								props.focusNextHeadingField(props.i - 1);
								e.preventDefault();
							}
						}
						e.stopPropagation();
					}}
					onChange={e => {
						if (e.target.value.length >= maxlength) {
							props.showToast({
								id: uniqueId("toast"),
								label: `Title must be fewer than ${maxlength} characters`,
							});
							setCaretColor(colors.warning);
						} else {
							if (hasModerationError) {
								setModerationError(false);
							}

							props.items[props.i].label = e.target.value;
							//items[i] = e.target.value;
							props.setItems([...props.items]);
							setCaretColor(colors.accent);
						}
					}}
				/>
			</FieldContainer>
			<Spacer />

			{props.items.length > 1 && (
				<ItemButton
					theme={props.theme}
					onTap={e => {
						props.items.splice(props.i, 1);
						props.setItems([...props.items]);
						props.updatePageCountFromOutline("remove", props.i);
					}}
					hovering={hovering}
					dragging={dragging}
					iconName={"Subtract"}
				/>
			)}
			{props.items.length < 21 && (
				<ItemButton
					theme={props.theme}
					onTap={e => {
						const newItem = {
							id: uniqueId("item"),
							label: "",
						};
						props.items.splice(props.i + 1, 0, newItem);
						props.setItems([...props.items]);
						props.updatePageCountFromOutline("add", props.i);
						setTimeout(() => {
							props.focusNextHeadingField(props.i + 1);
						}, 200);
					}}
					hovering={hovering}
					dragging={dragging}
					iconName={"Add"}
				/>
			)}

			{props.items.length > 1 && (
				<Draggable
					style={{ cursor: "grab", paddingRight: 8 }}
					onPointerDown={e => {
						controls.start(e);
						setDragging(true);
						document.body.classList.add("grabbing");
					}}
					onPointerUp={() => {
						setDragging(false);
						document.body.classList.remove("grabbing");
					}}
					animate={{
						opacity: props.loading ? 0 : 1,
					}}
					transition={{
						delay: props.loading ? 0.1 + props.i * 0.1 : 0.2 + props.i * 0.1,
					}}
					initial={false}
				>
					<Icon name="Draggable" size={22} color={colors.t4} opacity={1} />
				</Draggable>
			)}
		</Reorder.Item>
	);
};

const Button = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 26px;
	height: 26px;
	flex-shrink: 0;
`;

const ItemButton = props => {
	const colors = props.theme.colors;
	const [hovering, setHovering] = React.useState(false);

	return (
		<Button
			style={{
				cursor: "pointer",
				borderRadius: 6,
				marginRight: 6,
			}}
			onTap={props.onTap}
			initial={false}
			animate={{
				opacity: props.hovering && !props.dragging ? 1 : 0,
			}}
			whileHover={{ backgroundColor: colors.t2 }}
			whileTap={{ scale: 0.9 }}
			transition={{
				ease: "easeOut",
				duration: 0.2,
			}}
			onPointerEnter={e => {
				setHovering(true);
			}}
			onPointerLeave={e => {
				setHovering(false);
			}}
		>
			<Icon name={props.iconName} size={20} color={hovering ? colors.t7 : colors.t5} opacity={1} />
		</Button>
	);
};


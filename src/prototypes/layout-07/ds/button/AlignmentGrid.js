import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, useMotionTemplate, animate } from "framer-motion";

import { contentAlign, contentDirection, contentDistribute } from "../../tome/TileData";
import { getLayoutCSS } from "../../tiles/layout";
import { transitions } from "../Transitions";

export const AlignmentGrid = props => {
	const { onTap = undefined, direction } = props;
	const layoutCSS = getLayoutCSS({ tile: props.tile, parent: props.parent });
	const hoveringPadValue = useMotionValue("");
	return (
		<Wrap>
			{options.map((o, i) => (
				<Option
					key={o}
					value={o}
					onTap={onTap}
					direction={direction}
					layoutCSS={layoutCSS}
					tile={props.tile}
					hoveringPadValue={hoveringPadValue}
				/>
			))}
			{/* <Bars direction={direction} layoutCSS={layoutCSS} tile={props.tile} /> */}
			<BarsSVG
				value={props.tile.layout.alignX + "-" + props.tile.layout.alignY}
				direction={direction}
				distribute={props.tile.layout.distribute}
				color={"var(--t9)"}
				key="alignmentIndicator"
			/>
		</Wrap>
	);
};

const Wrap = styled(motion.section)`
	position: relative;
	display: grid;
	width: min-content;
	grid-template-rows: repeat(3, auto);
	grid-template-columns: repeat(3, auto);

	background-color: var(--t2);
	border-radius: var(--button-border-radius);
	overflow: clip;
`;

const Option = props => {
	const { onTap = undefined, value, tile, direction, layoutCSS, hoveringPadValue } = props;

	let active = false;
	const iconCSS = {
		flexDirection: layoutCSS.flexDirection,
		justifyContent: "start",
		alignItems: "start",
	};

	if (
		value === "start-start" &&
		tile.layout.alignX === contentAlign.START &&
		tile.layout.alignY === contentAlign.START
	) {
		active = true;
	}
	if (
		value === "center-start" &&
		tile.layout.alignX === contentAlign.CENTER &&
		tile.layout.alignY === contentAlign.START
	) {
		active = true;
	}
	if (value === "end-start" && tile.layout.alignX === contentAlign.END && tile.layout.alignY === contentAlign.START) {
		active = true;
	}

	if (
		value === "start-center" &&
		tile.layout.alignX === contentAlign.START &&
		tile.layout.alignY === contentAlign.CENTER
	) {
		active = true;
	}
	if (
		value === "center-center" &&
		tile.layout.alignX === contentAlign.CENTER &&
		tile.layout.alignY === contentAlign.CENTER
	) {
		active = true;
	}
	if (
		value === "end-center" &&
		tile.layout.alignX === contentAlign.END &&
		tile.layout.alignY === contentAlign.CENTER
	) {
		active = true;
	}

	if (value === "start-end" && tile.layout.alignX === contentAlign.START && tile.layout.alignY === contentAlign.END) {
		active = true;
	}
	if (
		value === "center-end" &&
		tile.layout.alignX === contentAlign.CENTER &&
		tile.layout.alignY === contentAlign.END
	) {
		active = true;
	}
	if (value === "end-end" && tile.layout.alignX === contentAlign.END && tile.layout.alignY === contentAlign.END) {
		active = true;
	}

	if (tile.layout.direction === contentDirection.VERTICAL) {
		if (value === "center-start" || value === "center-center" || value === "center-end")
			iconCSS.alignItems = "center";
		if (value === "end-start" || value === "end-center" || value === "end-end") iconCSS.alignItems = "end";
	}

	if (tile.layout.direction === contentDirection.HORIZONTAL || tile.layout.direction === contentDirection.HORIZONTAL_WRAP) {
		if (value === "start-center" || value === "center-center" || value === "end-center")
			iconCSS.alignItems = "center";
		if (value === "start-end" || value === "center-end" || value === "end-end") iconCSS.alignItems = "end";
	}

	if (props.tile.layout.distribute !== contentDistribute.NONE) {
		if (tile.layout.direction === contentDirection.HORIZONTAL || tile.layout.direction === contentDirection.HORIZONTAL_WRAP) {
			if (tile.layout.alignY === contentAlign.START) {
				if (value === "start-start" || value === "center-start" || value === "end-start") {
					active = true;
				}
			}
			if (tile.layout.alignY === contentAlign.CENTER) {
				if (value === "start-center" || value === "center-center" || value === "end-center") {
					active = true;
				}
			}
			if (tile.layout.alignY === contentAlign.END) {
				if (value === "start-end" || value === "center-end" || value === "end-end") {
					active = true;
				}
			}
		}
		if (tile.layout.direction === contentDirection.VERTICAL) {
			if (tile.layout.alignX === contentAlign.START) {
				if (value === "start-start" || value === "start-center" || value === "start-end") {
					active = true;
				}
			}
			if (tile.layout.alignX === contentAlign.CENTER) {
				if (value === "center-start" || value === "center-center" || value === "center-end") {
					active = true;
				}
			}
			if (tile.layout.alignX === contentAlign.END) {
				if (value === "end-start" || value === "end-center" || value === "end-end") {
					active = true;
				}
			}
		}
	}

	const iconOpacity = useMotionValue(0);
	const dotOpacity = useMotionValue(1);

	useMotionValueEvent(hoveringPadValue, "change", latest => {
		const parts = latest.split("-");
		const valueParts = value.split("-");
		//console.log(parts, value);
		if (parts.length === 2) {
			if (props.tile.layout.distribute !== contentDistribute.NONE) {
				if (tile.layout.direction === contentDirection.HORIZONTAL || tile.layout.direction === contentDirection.HORIZONTAL_WRAP) {
					if (parts[1] === valueParts[1]) {
						dotOpacity.set(0);
					} else {
						dotOpacity.set(1);
					}
				}
				if (tile.layout.direction === contentDirection.VERTICAL) {
					if (parts[0] === valueParts[0]) {
						dotOpacity.set(0);
					} else {
						dotOpacity.set(1);
					}
				}
			}
		} else {
			dotOpacity.set(1);
		}
	});

	return (
		<OptionBtn
			onPointerDownCapture={e => {
				onTap(value);
				e.stopPropagation();
			}}
			style={{
				"--background-color": active ? "var(--t0)" : "var(--t0)",
				"--background-color-hover": active ? "var(--t0)" : "var(--t2)",
				"--color": active ? "var(--t9)" : "var(--t7)",
			}}
			onPointerEnter={e => {
				dotOpacity.set(0);
				iconOpacity.set(1);
				hoveringPadValue.set(value);
			}}
			onPointerLeave={e => {
				dotOpacity.set(1);
				iconOpacity.set(0);
				hoveringPadValue.set("");
			}}
		>
			<Dot
				style={{
					"--background-color": active ? "var(--t0)" : "var(--t5)",
					opacity: dotOpacity,
				}}
			/>
			<motion.span style={{ opacity: iconOpacity, transition: "all 0.2s ease-out" }}>
				<BarsSVG
					value={value}
					direction={direction}
					color={active ? "var(--t0)" : "var(--t7)"}
					distribute={tile.layout.distribute}
				/>
			</motion.span>
		</OptionBtn>
	);
};

const OptionBtn = styled(motion.button)`
	height: 24px;
	width: 40px;
	border-radius: 4px;
	padding: 0;
	background-color: var(--background-color);
	color: var(--color);
	transition: all 0.2s ease-out;
	display: grid;
	place-content: center;
	/* position: relative; */
	&:hover {
		background-color: var(--background-color-hover);
	}
`;

const Dot = styled(motion.span)`
	display: block;
	width: 3px;
	height: 3px;
	border-radius: 3px;
	transition: all 0.2s ease-out;
	background-color: var(--background-color);
`;

const options = [
	"start-start",
	"center-start",
	"end-start",
	"start-center",
	"center-center",
	"end-center",
	"start-end",
	"center-end",
	"end-end",
];

const BarsSVG = props => {
	const { value, direction, distribute, color } = props;
	console.log(value, direction);

	const strokeWidth = 1.25;
	const strokeColor = color;
	const strokeLinecap = "round";

	const line1 = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
	};

	const line2 = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
	};

	const line3 = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
	};

	let offsetY = 24;
	let offsetX = 39;

	if (direction === contentDirection.VERTICAL) {
		if (value === "start-start") {
			line1.x1 = 13.75;
			line1.y1 = 7.63;
			line1.x2 = 26.25;
			line1.y2 = 7.63;

			line2.x1 = 13.75;
			line2.y1 = 12;
			line2.x2 = 20.63;
			line2.y2 = 12;

			line3.x1 = 13.75;
			line3.y1 = 16.38;
			line3.x2 = 26.25;
			line3.y2 = 16.38;
		}

		if (value === "center-start") {
			line1.x1 = 53.75;
			line1.y1 = 7.63;
			line1.x2 = 66.25;
			line1.y2 = 7.63;

			line2.x1 = 56.56;
			line2.y1 = 12;
			line2.x2 = 63.44;
			line2.y2 = 12;

			line3.x1 = 53.75;
			line3.y1 = 16.38;
			line3.x2 = 66.25;
			line3.y2 = 16.38;
		}

		if (value === "end-start") {
			line1.x1 = 93.75;
			line1.y1 = 7.63;
			line1.x2 = 106.25;
			line1.y2 = 7.63;

			line2.x1 = 99.38;
			line2.y1 = 12;
			line2.x2 = 106.25;
			line2.y2 = 12;

			line3.x1 = 93.75;
			line3.y1 = 16.38;
			line3.x2 = 106.25;
			line3.y2 = 16.38;
		}

		if (value === "start-center") {
			line1.x1 = 13.75;
			line1.y1 = 7.63 + offsetY;
			line1.x2 = 26.25;
			line1.y2 = 7.63 + offsetY;

			line2.x1 = 13.75;
			line2.y1 = 12 + offsetY;
			line2.x2 = 20.63;
			line2.y2 = 12 + offsetY;

			line3.x1 = 13.75;
			line3.y1 = 16.38 + offsetY;
			line3.x2 = 26.25;
			line3.y2 = 16.38 + offsetY;
		}

		if (value === "center-center") {
			line1.x1 = 53.75;
			line1.y1 = 7.63 + offsetY;
			line1.x2 = 66.25;
			line1.y2 = 7.63 + offsetY;

			line2.x1 = 56.56;
			line2.y1 = 12 + offsetY;
			line2.x2 = 63.44;
			line2.y2 = 12 + offsetY;

			line3.x1 = 53.75;
			line3.y1 = 16.38 + offsetY;
			line3.x2 = 66.25;
			line3.y2 = 16.38 + offsetY;
		}

		if (value === "end-center") {
			line1.x1 = 93.75;
			line1.y1 = 7.63 + offsetY;
			line1.x2 = 106.25;
			line1.y2 = 7.63 + offsetY;

			line2.x1 = 99.38;
			line2.y1 = 12 + offsetY;
			line2.x2 = 106.25;
			line2.y2 = 12 + offsetY;

			line3.x1 = 93.75;
			line3.y1 = 16.38 + offsetY;
			line3.x2 = 106.25;
			line3.y2 = 16.38 + offsetY;
		}

		if (value === "start-end") {
			line1.x1 = 13.75;
			line1.y1 = 7.63 + offsetY + offsetY;
			line1.x2 = 26.25;
			line1.y2 = 7.63 + offsetY + offsetY;

			line2.x1 = 13.75;
			line2.y1 = 12 + offsetY + offsetY;
			line2.x2 = 20.63;
			line2.y2 = 12 + offsetY + offsetY;

			line3.x1 = 13.75;
			line3.y1 = 16.38 + offsetY + offsetY;
			line3.x2 = 26.25;
			line3.y2 = 16.38 + offsetY + offsetY;
		}

		if (value === "center-end") {
			line1.x1 = 53.75;
			line1.y1 = 7.63 + offsetY + offsetY;
			line1.x2 = 66.25;
			line1.y2 = 7.63 + offsetY + offsetY;

			line2.x1 = 56.56;
			line2.y1 = 12 + offsetY + offsetY;
			line2.x2 = 63.44;
			line2.y2 = 12 + offsetY + offsetY;

			line3.x1 = 53.75;
			line3.y1 = 16.38 + offsetY + offsetY;
			line3.x2 = 66.25;
			line3.y2 = 16.38 + offsetY + offsetY;
		}

		if (value === "end-end") {
			line1.x1 = 93.75;
			line1.y1 = 7.63 + offsetY + offsetY;
			line1.x2 = 106.25;
			line1.y2 = 7.63 + offsetY + offsetY;

			line2.x1 = 99.38;
			line2.y1 = 12 + offsetY + offsetY;
			line2.x2 = 106.25;
			line2.y2 = 12 + offsetY + offsetY;

			line3.x1 = 93.75;
			line3.y1 = 16.38 + offsetY + offsetY;
			line3.x2 = 106.25;
			line3.y2 = 16.38 + offsetY + offsetY;
		}
	}

	if (direction === contentDirection.HORIZONTAL || direction === contentDirection.HORIZONTAL_WRAP) {
		line1.x1 = 15.63;
		line1.y1 = 5.75;
		line1.x2 = 15.63;
		line1.y2 = 18.25;

		line2.x1 = 20;
		line2.y1 = 5.75;
		line2.x2 = 20;
		line2.y2 = 12.63;

		line3.x1 = 24.38;
		line3.y1 = 5.75;
		line3.x2 = 24.38;
		line3.y2 = 18.25;

		if (value === "center-start") {
			line1.x1 += offsetX;
			line1.x2 = line1.x1;
			line2.x1 += offsetX;
			line2.x2 = line2.x1;
			line3.x1 += offsetX;
			line3.x2 = line3.x1;
		}

		if (value === "end-start") {
			line1.x1 += offsetX + offsetX;
			line1.x2 = line1.x1;
			line2.x1 += offsetX + offsetX;
			line2.x2 = line2.x1;
			line3.x1 += offsetX + offsetX;
			line3.x2 = line3.x1;
		}

		if (value === "start-center") {
			line1.y1 += offsetY;
			line1.y2 += offsetY;
			line2.y1 = 32.56;
			line2.y2 = 39.44;
			line3.y1 += offsetY;
			line3.y2 += offsetY;
		}

		if (value === "center-center") {
			line1.x1 += offsetX;
			line1.x2 = line1.x1;
			line2.x1 += offsetX;
			line2.x2 = line2.x1;
			line3.x1 += offsetX;
			line3.x2 = line3.x1;
			line1.y1 += offsetY;
			line1.y2 += offsetY;
			line2.y1 = 32.56;
			line2.y2 = 39.44;
			line3.y1 += offsetY;
			line3.y2 += offsetY;
		}

		if (value === "end-center") {
			line1.x1 += offsetX + offsetX;
			line1.x2 = line1.x1;
			line2.x1 += offsetX + offsetX;
			line2.x2 = line2.x1;
			line3.x1 += offsetX + offsetX;
			line3.x2 = line3.x1;
			line1.y1 += offsetY;
			line1.y2 += offsetY;
			line2.y1 = 32.56;
			line2.y2 = 39.44;
			line3.y1 += offsetY;
			line3.y2 += offsetY;
		}

		if (value === "start-end") {
			line1.y1 += offsetY + offsetY;
			line1.y2 += offsetY + offsetY;
			line2.y1 = 59.38;
			line2.y2 = 66.25;
			line3.y1 += offsetY + offsetY;
			line3.y2 += offsetY + offsetY;
		}

		if (value === "center-end") {
			line1.x1 += offsetX;
			line1.x2 = line1.x1;
			line2.x1 += offsetX;
			line2.x2 = line2.x1;
			line3.x1 += offsetX;
			line3.x2 = line3.x1;
			line1.y1 += offsetY + offsetY;
			line1.y2 += offsetY + offsetY;
			line2.y1 = 59.38;
			line2.y2 = 66.25;
			line3.y1 += offsetY + offsetY;
			line3.y2 += offsetY + offsetY;
		}

		if (value === "end-end") {
			line1.x1 += offsetX + offsetX;
			line1.x2 = line1.x1;
			line2.x1 += offsetX + offsetX;
			line2.x2 = line2.x1;
			line3.x1 += offsetX + offsetX;
			line3.x2 = line3.x1;
			line1.y1 += offsetY + offsetY;
			line1.y2 += offsetY + offsetY;
			line2.y1 = 59.38;
			line2.y2 = 66.25;
			line3.y1 += offsetY + offsetY;
			line3.y2 += offsetY + offsetY;
		}
	}

	if (distribute !== contentDistribute.NONE) {
		
		if (direction === contentDirection.VERTICAL) {
			line1.y1 = 7.63;
			line1.y2 = line1.y1;

			line2.y1 = 36;
			line2.y2 = line2.y1;

			line3.y1 = 64.38;
			line3.y2 = line3.y1;
		}

		if (direction === contentDirection.HORIZONTAL || direction === contentDirection.HORIZONTAL_WRAP) {
			line1.x1 = 15.63;
			line1.x2 = line1.x1;

			line2.x1 = 20 + offsetX;
			line2.x2 = line2.x1;

			line3.x1 = 24.38 + offsetX + offsetX;
			line3.x2 = line3.x1;
		}
	}

	// line 1 motion values
	const line1X1 = useMotionValue(line1.x1);
	const line1Y1 = useMotionValue(line1.y1);
	const line1X2 = useMotionValue(line1.x2);
	const line1Y2 = useMotionValue(line1.y2);

	// line 2 motion values
	const line2X1 = useMotionValue(line2.x1);
	const line2Y1 = useMotionValue(line2.y1);
	const line2X2 = useMotionValue(line2.x2);
	const line2Y2 = useMotionValue(line2.y2);

	// line 2 motion values
	const line3X1 = useMotionValue(line3.x1);
	const line3Y1 = useMotionValue(line3.y1);
	const line3X2 = useMotionValue(line3.x2);
	const line3Y2 = useMotionValue(line3.y2);

	const line1Path = useMotionTemplate`M ${line1X1} ${line1Y1} L ${line1X2} ${line1Y2}`;
	const line2Path = useMotionTemplate`M ${line2X1} ${line2Y1} L ${line2X2} ${line2Y2}`;
	const line3Path = useMotionTemplate`M ${line3X1} ${line3Y1} L ${line3X2} ${line3Y2}`;

	// animate paths
	// create motion values for each line
	// when props change, animate values
	// update path on each animation update

	React.useEffect(() => {
		// line 1
		animate(line1X1, line1.x1, transitions.layoutTransition);
		animate(line1Y1, line1.y1, transitions.layoutTransition);
		animate(line1X2, line1.x2, transitions.layoutTransition);
		animate(line1Y2, line1.y2, transitions.layoutTransition);

		// line 2
		animate(line2X1, line2.x1, transitions.layoutTransition);
		animate(line2Y1, line2.y1, transitions.layoutTransition);
		animate(line2X2, line2.x2, transitions.layoutTransition);
		animate(line2Y2, line2.y2, transitions.layoutTransition);

		// line 2
		animate(line3X1, line3.x1, transitions.layoutTransition);
		animate(line3Y1, line3.y1, transitions.layoutTransition);
		animate(line3X2, line3.x2, transitions.layoutTransition);
		animate(line3Y2, line3.y2, transitions.layoutTransition);
	}, [value, direction, distribute]);

	return (
		<motion.svg
			transition={transitions.layoutTransition}
			style={{
				display: "block",
				position: "absolute",
				pointerEvents: "none",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				fill: "none",
				stroke: strokeColor,
				strokeLinecap: strokeLinecap,
				strokeWidth: strokeWidth,
			}}
			animate={{
				stroke: strokeColor,
			}}
		>
			<motion.path d={line1Path} />

			<motion.path d={line2Path} />

			<motion.path d={line3Path} />
		</motion.svg>
	);
};

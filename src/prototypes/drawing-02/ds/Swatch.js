import React from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import chroma from "chroma-js";
import { colorType } from "../panel/controls/Color";
import { gradient } from "../../../ds/GradientImage";
import { Icon } from "../../../ds/Icon";

export const SwatchType = {
	FILL: "fill",
	LINE: "line",
	TEXT: "text",
	SHAPE_FILL: "shape_fill",
	SHAPE_BORDER: "shape_border",
};

export const CurrentColor = ({
	theme,
	width = 12,
	height = 12,
	iconSize = 17,
	borderRadius = "50%",
	strokeWidth = 2,
	motionValue,
	type = SwatchType.FILL,
}) => {
	const isTransparent = motionValue.get() === "transparent";
	const size = useMotionValue(width);
	const contrastShadow = useMotionValue(`0 0 0 1px transparent inset`);
	const checkContrast = () => {
		if (isTransparent) {
			contrastShadow.set(`0 0 0 1px ${theme.colors.t3}`);
			return false;
		}

		if (motionValue === "undefined" || motionValue.get() === "transparent") return false;
		const foreground = chroma(motionValue.get()).hex();
		const background = chroma(theme.formatBar.backgroundColor).hex();
		const threshold = theme.mode === "light" ? 1.5 : 2.3;
		const contrast = chroma.contrast(foreground, background);

		//console.log("contrast", foreground, background, contrast);
		if (contrast < threshold) {
			if (theme.mode === "light") {
				//size.set(width + 1);
				contrastShadow.set(`0 0 0 1px ${theme.colors.t3}`);
			} else {
				if (foreground === "#000000") {
					//size.set(width);
					contrastShadow.set(`0 0 0 1px ${theme.colors.t4}`);
				} else {
					//size.set(width + 1);
					contrastShadow.set(`0 0 0 1px ${theme.colors.t3}`);
				}
			}
		} else {
			//size.set(width);
			contrastShadow.set(`0 0 0 1px transparent inset`);
		}
	};

	// Listen for color changes
	useMotionValueEvent(motionValue, "change", latest => {
		console.log(latest);
		if (motionValue && motionValue.get()) checkContrast();
	});

	// Check contrast on mount
	React.useEffect(() => {
		if (motionValue && motionValue.get()) checkContrast();
	}, [motionValue]);

	return (
		<>
			{(type === SwatchType.SHAPE_FILL ||
				type === SwatchType.TEXT ||
				type === SwatchType.SHAPE_BORDER ||
				type === SwatchType.LINE) && (
				<motion.div
					style={{
						position: "relative",
						width: size,
						height: size,
						borderRadius: borderRadius,
						backgroundColor: motionValue,
						boxShadow: contrastShadow,
					}}
				/>
			)}

			{/* {isTransparent && (
				<motion.div
					style={{
						position: "relative",
						width: size,
						height: size,
						borderRadius: borderRadius,
						backgroundColor: theme.colors.t7,
						boxShadow: contrastShadow,
					}}
				/>
			)} */}

			{/* {isTransparent && <Icon name="CircleRemove" size={iconSize} opacity={1} color={theme.colors.t7} />} */}

			{/* {isTransparent && (
				<motion.div
					style={{
						position: "relative",
						width: width + 1,
						height: width + 1,
						borderRadius: borderRadius,
						backgroundColor: theme.colors.t5,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<motion.div
						style={{
							width: "calc(100% - 1px)",
							height: 2,
							borderRadius: 2,
							backgroundColor: theme.colors.t9,
							rotate: -45,
						}}
					></motion.div>
				</motion.div>
			)} */}

			{/* {type === SwatchType.LINE && (
				<motion.svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
					style={{ overflow: "visible" }}
				>
					<motion.circle
						cx={width / 2}
						cy={height / 2}
						r={(width - 1) / 2}
						fill={"none"}
						stroke={motionValue}
						strokeWidth={2}
					/>
				</motion.svg>
			)} */}

			{/* {type === SwatchType.SHAPE_FILL && !isTransparent && (
				<motion.svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
					style={{ overflow: "visible"}}
				>
					<motion.rect
						x={0}
						y={0}
						width={width}
						height={height}
						rx={2}
						fill={isTransparent ? theme.colors.t3 : motionValue}
					/>

					
					<motion.rect
						x={-.5}
						y={-.5}
						width={width+1}
						height={height+1}
						rx={2}
						stroke={"rgba(255,255,255,0.12)"}
					/>
					

					{isTransparent && (
						<rect
							x="-0.187744"
							y="10.7734"
							width="15.5"
							height="2"
							rx="2"
							transform="rotate(-45 -0.187744 10.7734)"
							fill={theme.colors.t7}
						/>
					)}
				</motion.svg>
			)} */}

			{/* {type === SwatchType.SHAPE_FILL && isTransparent && (
				<Icon name="TransparentFill" size={20} opacity={1} color={theme.colors.t7} />
			)} */}

			{/* {(type === SwatchType.SHAPE_BORDER || type === SwatchType.LINE) && (
				<motion.svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
					style={{ overflow: "visible" }}
				>
					<motion.path
						fill={motionValue}
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0 3C0 1.34315 1.34315 0 3 0H9C10.6569 0 12 1.34315 12 3V9C12 10.6569 10.6569 12 9 12H3C1.34315 12 0 10.6569 0 9V3ZM3 2C2.44772 2 2 2.44772 2 3V9C2 9.55229 2.44772 10 3 10H9C9.55229 10 10 9.55229 10 9V3C10 2.44772 9.55229 2 9 2H3Z"
					/>
				</motion.svg>
			)} */}
		</>
	);
};

export const ColorSwatch = ({
	theme,
	width = 16,
	height = 16,
	iconSize = 20,
	borderRadius = "50%",
	type = colorType.FILL,
	color = theme.colors.accent,
	transparentColor = theme.colors.t7,
	style = undefined,
}) => {
	let foreground = color;

	//const contrast = chroma.contrast(foreground, background);
	//console.log(theme.mode, foreground);
	let boxShadow = `0 0 0 1px transparent inset`;
	if (theme.mode === "light") {
		if (foreground === "#FFFFFF" || foreground === "#AAAAAA") {
			boxShadow = `0 0 0 1px ${theme.colors.t3}`;
		}
	} else {
		if (foreground === "#000000" || foreground === "#1F1F1F") {
			boxShadow = `0 0 0 1px ${theme.colors.t3}`;
		}
	}

	if (type === colorType.CONTRAST1) {
		if (theme.mode === "light") {
			foreground = "#000000";
		} else {
			foreground = "#FFFFFF";
		}
	}

	return (
		<>
			{(type === colorType.FILL || type === colorType.CONTRAST1) && (
				<motion.div
					className="color"
					style={{
						position: "relative",
						width: width,
						height: height,
						borderRadius: borderRadius,
						backgroundColor: foreground,
						boxShadow: boxShadow,
						...style,
					}}
				/>
			)}

			{type === colorType.PICKER && (
				<motion.div
					className="color"
					style={{
						position: "relative",
						width: width,
						height: height,
					}}
				>
					
					<motion.svg width={width} height={height} viewBox={`0 0 ${width} ${width}`} fill="none" initial={false}>
						<rect width={width} height={width} rx={width / 2} fill="url(#pattern0)" fillOpacity="1" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlinkHref="#image0_5_6217" transform="scale(0.00217391)" />
							</pattern>
							<image id="image0_5_6217" width="460" height="460" xlinkHref={gradient} />
						</defs>
					</motion.svg>

					{/* <input
						type="color"
						value="#ff0000"
						style={{
							display: "block",
							position: "absolute",
							top: 0,
							left: 0,
							pointerEvents: "auto",
							//appearance: "none",
						}}
					/> */}
				</motion.div>
			)}

			{type === colorType.REMOVE && (
				<motion.div
					style={{
						width: width,
						height: height,
						x: -(iconSize - width) / 2,
						y: -(iconSize - width) / 2,
					}}
				>
					<Icon name="CircleRemove" size={iconSize} opacity={1} color={theme.colors.t7} />
				</motion.div>
			)}

			{type === colorType.TRANSPARENT && (
				<motion.div
					style={{
						width: width,
						height: height,
						x: -(iconSize - width) / 2,
						y: -(iconSize - width) / 2,
					}}
				>
					<Icon name="TransparentColor" size={iconSize} opacity={1} color={theme.colors.t7} />
				</motion.div>
			)}
		</>
	);
};

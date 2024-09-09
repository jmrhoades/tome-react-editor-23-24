import React from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import chroma from "chroma-js";
import { TomeContext } from "../tome/TomeContext";
import { getContrastAwareStroke } from "../editor/logic/colors";

export const CurrentColor = ({ size = 14, borderRadius = "50%", value }) => {
	const { getCurrentPage } = React.useContext(TomeContext);

	const theme = getCurrentPage().theme;
	const bgColor = theme.mode === "light" ? "#f0f0f0" : "#262626";
	//const isTransparent = value === "transparent";
	//const contrastShadow = useMotionValue(`0 0 0 1px transparent inset`);
	const strokeColor = getContrastAwareStroke(bgColor, value);
	
	return (
		<motion.div
			style={{
				position: "relative",
				width: size,
				height: size,
				borderRadius: borderRadius,
				backgroundColor: value,
				boxShadow: `0 0 0 1px ${strokeColor}`,
			}}
		/>
	);
};

/*
import React from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import chroma from "chroma-js";
import { TomeContext } from "../tome/TomeContext";

export const CurrentColor = ({
	width = 15,
	height = 15,
	borderRadius = "50%",
	motionValue,
	value,
}) => {
	const { getCurrentPage } = React.useContext(TomeContext);

	const theme = getCurrentPage().theme;
	const bgColor = theme.tokens["--page-color"];
	const isTransparent = motionValue.get() === "transparent";
	const contrastShadow = useMotionValue(`0 0 0 1px transparent inset`);

	//console.log(value)

	const checkContrast = () => {
		if (isTransparent) {
			contrastShadow.set(`0 0 0 1px var(--t3)`);
			return false;
		}
		if ((motionValue === "undefined") || isTransparent) return false;

		const color = motionValue.get();
		const foreground = chroma(color).hex();
		const background = chroma(bgColor).hex();
		const threshold = theme.mode === "light" ? 1.5 : 2.3;
		const contrast = chroma.contrast(foreground, background);

		//console.log("contrast", foreground, background, contrast);
		if (contrast < threshold) {
			if (theme.mode === "light") {
				contrastShadow.set(`0 0 0 1px var(--t3)`);
			} else {
				if (foreground === "#000000") {
					contrastShadow.set(`0 0 0 1px var(--t4)`);
				} else {
					contrastShadow.set(`0 0 0 1px var(--t3)`);
				}
			}
		} else {
			contrastShadow.set(`0 0 0 1px transparent inset`);
		}
	};

	// // Listen for color changes
	useMotionValueEvent(motionValue, "change", latest => {
		if (motionValue && motionValue.get()) checkContrast();
	});

	// Check contrast on mount
	React.useEffect(() => {
		if (motionValue && motionValue.get()) checkContrast();
	}, [motionValue]);


	return (
		<motion.div
			style={{
				position: "relative",
				width: width,
				height: height,
				borderRadius: borderRadius,
				backgroundColor: motionValue,
				boxShadow: contrastShadow,
			}}
		/>
	);
};
*/

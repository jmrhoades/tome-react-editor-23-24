import React from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { TomeContext } from "../tome/TomeContext";
import { layoutDefaults, layout } from "./LayoutDefaults";

export const LayoutContext = React.createContext();
export const LayoutProvider = ({ children }) => {
	const { currentPage } = React.useContext(TomeContext);

	const viewportWidth = useMotionValue(window.innerWidth);
	const viewportHeight = useMotionValue(window.innerHeight);

	/*
		Find the current page size 
		Take the current window size, remove the fixed margins
		Fit a 16x9 rectangle in the available space
	*/

	const getPageSize = (side = "long") => {
		let vWidth = viewportWidth.get();
		let vHeight = viewportHeight.get();
		let marginX = currentPage.layout.marginX.get();
		let marginY = currentPage.layout.marginY.get();
		let w = vWidth - marginX * 2;
		let h = (9 / 16) * w;
		if ((vHeight - h) / 2 <= marginY) {
			h = vHeight - marginY * 2;
			w = (16 / 9) * h;
		}
		return side === "long" ? w : h;
	};

	const pageWidth = useTransform(() => getPageSize("long"));
	const pageHeight = useTransform(() => getPageSize("short"));
	const pageLeft = useTransform(() => (viewportWidth.get() - pageWidth.get()) / 2);
	const pageTop = useTransform(() => (viewportHeight.get() - pageHeight.get()) / 2);
	const pageRect = {
		x: pageLeft,
		y: pageTop,
		width: pageWidth,
		height: pageHeight,
	};

	/*
		Find the page scale
		Take the current width and divide by the canonical width
	*/
	const pageScale = useTransform(() => pageWidth.get() / layoutDefaults.pageWidth);

	/*
		Gap
		Scale the gaps with the page scale
	*/
	const gap = useTransform(() => pageScale.get() * currentPage.layout.gap.get());

	/*
		Tile corner radius
		Scale the radius with the page scale
	*/
	const cornerRadius = useTransform(() => pageScale.get() * currentPage.layout.cornerRadius.get());

	React.useEffect(() => {
		//console.log("MetricsContext: set up window resize handlers")
		const onWindowResize = () => {
			viewportWidth.set(window.innerWidth);
			viewportHeight.set(window.innerHeight);
		};
		window.addEventListener("resize", onWindowResize);
		return () => {
			//console.log("MetricsContext: remove window resize handlers")
			window.removeEventListener("resize", onWindowResize);
		};
	}, []);

	return (
		<LayoutContext.Provider
			value={{
				pageRect,
				pageScale,
				gap,
				cornerRadius,
			}}
		>
			{children}
		</LayoutContext.Provider>
	);
};

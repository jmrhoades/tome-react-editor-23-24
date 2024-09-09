import { useState, useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

export const getWindowWidth = () =>
	window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
export const getWindowHeight = () =>
	window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

export const useWindowWidth = () => {
	const [width, setWidth] = useState(getWindowWidth());
	useEffect(() => {
		const resizeListener = () => {
			setWidth(getWindowWidth());
		};
		window.addEventListener("resize", resizeListener);
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, []);
	return width;
};

export const useWindowHeight = () => {
	const [height, setHeight] = useState(getWindowHeight());
	useEffect(() => {
		const resizeListener = () => {
			setHeight(getWindowHeight());
		};
		window.addEventListener("resize", resizeListener);
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, []);
	return height;
};

export const useWindowSize = () => {
	const [size, setSize] = useState({ width: getWindowWidth(), height: getWindowHeight() });
	useEffect(() => {
		const resizeListener = () => {
			setSize({ width: getWindowWidth(), height: getWindowHeight() });
		};
		window.addEventListener("resize", resizeListener);
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, []);
	return size;
};

export const useMousePosition = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
		window.addEventListener("mousemove", setFromEvent);

		return () => {
			window.removeEventListener("mousemove", setFromEvent);
		};
	}, []);

	return position;
};

export const useAnimationFrame = callback => {
	const requestRef = useRef();
	const previousTimeRef = useRef();

	const animate = time => {
		if (previousTimeRef.current !== undefined) {
			const deltaTime = time - previousTimeRef.current;
			callback(deltaTime);
		}
		previousTimeRef.current = time;
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}); // Make sure the effect runs only once
};

export const useMouseXMotionPosition = () => {
	const position = useMotionValue(0);
	useEffect(() => {
		const setFromEvent = e => position.set(e.clientX);
		window.addEventListener("mousemove", setFromEvent);
		return () => {
			window.removeEventListener("mousemove", setFromEvent);
		};
	});
	return position;
};

export const useMouseYMotionPosition = () => {
	const position = useMotionValue(0);
	useEffect(() => {
		const setFromEvent = e => position.set(e.clientY);
		window.addEventListener("mousemove", setFromEvent);
		return () => {
			window.removeEventListener("mousemove", setFromEvent);
		};
	});
	return position;
};

export const usePageMetrics = () => {
	const [metrics, setMetrics] = useState({});
	useEffect(() => {
		const refSizes = {
			viewportWidth: 1280,
			pageWidth: 772,
			pageHeight: 394,
			pageRadius: 24,
			pagePadding: 16,
			margins: {
				editing: {
					panelOpen: {
						left: 167,
						right: 341,
					},
					panelClosed: {
						left: 254,
						right: 254,
					},
				},
				presenting: {
					left: 128,
					right: 128,
				},
			},

			tileHeight: 362,
			tileRadius: 12,
			tileMargin: 16,
			panelWidth: 240,
			panelRight: 80,
		};
		const createMetrics = () => {
			const windowWidth = getWindowWidth();
			const windowHeight = getWindowHeight();
			const isPortrait = windowWidth < windowHeight;
			const aspectRatio = isPortrait ? refSizes.pageHeight / refSizes.pageWidth : refSizes.pageWidth / refSizes.pageHeight
			const m = {
				windowWidth: windowWidth,
				windowHeight: windowHeight,
				isPortrait: isPortrait,
				aspectRatio: aspectRatio,
				scale: refSizes.viewportWidth / windowWidth,
				
			};
			return m;
		};
		const resizeListener = () => {
			setMetrics(createMetrics());
		};
		window.addEventListener("resize", resizeListener);
		setMetrics(createMetrics());
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, []);
	return metrics;
};

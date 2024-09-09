import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { GRID_SIZE } from "../constants";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: clip;
	pointer-events: none;
`;

const Canvas = styled(motion.canvas)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	overflow: clip;
`;

function nextOddNumber(value) {
	let b = Math.ceil(value);
	return (b = b % 2 === 0 ? b + 1 : b);
}

export const DotGrid = props => {
	// spec
	const dotColor = props.theme.colors.t5;
	const unit = GRID_SIZE;

	// refs to canvas element and context
	const canvasRef = React.useRef(null);
	const context = React.useRef(null);

	//const scaledUnit = useTransform(() => props.zoom.get() <= .5 ? unit * 1 : unit);

	const size = useTransform(() => unit * props.zoom.get());
	const zoomRange = [0.25, 1, 4];
	const radiusRange = [0.5, 1, 2];
	const radius = useTransform(props.zoom, zoomRange, radiusRange);

	//const opacityRange = [0.5, 1, 1];
	//const gridOpacity = useTransform(props.zoom, zoomRange, opacityRange);

	// undo page scale to find the canonical tile size
	const tileWidth = useTransform(() => props.tileWidth / props.pageScale.get());
	const tileHeight = useTransform(() => props.tileHeight / props.pageScale.get());

	const scaleCanvasForPixelRatio = () => {
		const ctx = context.current;
		// Get the device pixel ratio, falling back to 1.
		const dpr = window.devicePixelRatio || 1;
		// Give the canvas pixel dimensions of their CSS
		// size * the device pixel ratio.
		canvasRef.current.width = tileWidth.get() * dpr;
		canvasRef.current.height = tileHeight.get() * dpr;
		// Scale all drawing operations by the dpr, so you
		// don't have to worry about the difference.
		ctx.scale(dpr, dpr);
	};

	const draw = () => {
		const ctx = context.current;
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		const w = tileWidth.get();
		const h = tileHeight.get();
		const r = radius.get();
		const s = size.get();
		const hCount = nextOddNumber(w / s) + 1;
		const vCount = nextOddNumber(h / s) + 1;
		const offsetX = w / 2;
		const offsetY = h / 2;
		for (let i = -hCount / 2; i < hCount / 2; i++) {
			for (let j = -vCount / 2; j < vCount / 2; j++) {
				const x = offsetX + i * s;
				const y = offsetY + j * s;
				ctx.fillStyle = dotColor;
				ctx.beginPath();
				ctx.arc(x, y, r, 0, 2 * Math.PI);
				ctx.fill();
			}
		}
	};

	// set up canvas element when component loads
	React.useEffect(() => {
		context.current = canvasRef.current.getContext("2d");
		scaleCanvasForPixelRatio();
		draw();
	}, []);

	// redraw when zoom changes
	useMotionValueEvent(size, "change", latest => draw());

	// redraw when components rerenders
	React.useEffect(() => {
		if (context.current) {
			scaleCanvasForPixelRatio();
			draw();
		}
	});

	return (
		<Wrap className="dotGrid">
			<Canvas
				id="dotGridCanvas"
				ref={canvasRef}
				style={{
					display: "block",
					width: tileWidth,
					height: tileHeight,
					position: "absolute",
					top: "50%",
					left: "50%",
					x: "-50%",
					y: "-50%",
					scale: props.pageScale,
					//opacity: gridOpacity,
				}}
			/>
		</Wrap>
	);
};

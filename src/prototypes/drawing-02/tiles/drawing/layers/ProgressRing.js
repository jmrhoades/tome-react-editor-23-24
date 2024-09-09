import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { arcPath } from "../utilities";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
`;

const Label = styled(motion.div)`
	display: flex;
	transition: opacity 0.2s ease-in-out;
	user-select: none;
`;

const Text = styled(motion.div)``;
const Suffix = styled(motion.div)``;

export const ProgressRing = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r, line, text, borderSize, fontSize } = layer.motion;

	const scaledLineSize = useTransform(() => (bW.get() / 256) * borderSize.get());
	const scaledMinLineSize = useTransform(() => (scaledLineSize.get() > 1 ? scaledLineSize.get() : 1));

	const circleR = useTransform(() => bW.get() / 2 - scaledMinLineSize.get() / 2);
	const circleX = useTransform(() => bW.get() / 2);

	const angle = useTransform(() => line.progress.get() * 359);
	const percentAmount = useTransform(() => Math.round(line.progress.get() * 100));
	const path = useTransform(() => arcPath(bW.get() / 2, bW.get() / 2 - scaledMinLineSize.get() / 2, angle.get()));

	const endX = useTransform(() => path.get().split(" ").splice(-2)[0]);
	const endY = useTransform(() => path.get().split(" ").splice(-1)[0]);
	layer.endX = endX;
	layer.endY = endY;

	//console.log(endX.get(), endY.get());

	//const fontSizePx = useTransform(() => bW.get() / 3.5 + "px");
	//const suffixSizePx = useTransform(() => bW.get() / 7 + "px");
	const fontSizePx = useTransform(() => fontSize.get() + "px");

	const strokeLinecap = useTransform(() => (line.capStart.get() === "ROUND_START" ? "round" : "flat"));

	const ref = React.useRef();
	const [progressHandleDragging, setProgressHandleDragging] = React.useState(false);
	layer.setProgressHandleDragging = setProgressHandleDragging;
	const dragInfo = React.useRef({ rect: { x: 0, y: 0, width: 0, height: 0 } });

	const angleFrom2Points = (cx, cy, ex, ey) => {
		let dy = ey - cy;
		let dx = ex - cx;
		let theta = Math.atan2(dy, dx); // range (-PI, PI]
		theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
		theta += 90; // dial rotation, 0 points north
		if (theta < 0) theta = 360 + theta; // range [0, 360)
		if (theta > 360) theta = 360 - theta; // range [0, 360)
		return theta;
	};
	// const onKnobDown = e => {
	// 	dragInfo.current = {
	// 		rect: ref.current.getBoundingClientRect(),
	// 		startX: e.clientX,
	// 		startY: e.clientY,
	// 	};
	// 	setDraggingKnob(true);
	// };
	const onKnobDrag = e => {
		const rect = dragInfo.current.rect;
		const cx = rect.x + rect.width / 2;
		const cy = rect.y + rect.height / 2;
		const ex = e.clientX;
		const ey = e.clientY;
		const newAngle = angleFrom2Points(cx, cy, ex, ey);
		const progress = newAngle / 360;
		line.progress.set(progress);
		//console.log("newAngle", newAngle);
	};
	const onKnobUp = e => {
		setProgressHandleDragging(false);
        props.boundsOpacity.set(1);
	};

	React.useEffect(() => {
		const setMouseUpFromEvent = e => onKnobUp(e);
		const setMouseMoveFromEvent = e => onKnobDrag(e);
		if (progressHandleDragging) {
			dragInfo.current = { rect: ref.current.getBoundingClientRect() };
			document.body.classList.add("grabbing");
			document.addEventListener("mouseup", setMouseUpFromEvent);
			document.addEventListener("touchend", setMouseUpFromEvent);
			document.addEventListener("mousemove", setMouseMoveFromEvent);
			document.addEventListener("touchmove", setMouseMoveFromEvent, { passive: false });
		}
		return () => {
			document.body.classList.remove("grabbing");
			document.removeEventListener("mousemove", setMouseMoveFromEvent);
			document.removeEventListener("touchmove", setMouseMoveFromEvent);
			document.removeEventListener("mouseup", setMouseUpFromEvent);
			document.removeEventListener("touchend", setMouseUpFromEvent);
		};
	}, [progressHandleDragging]);

	return (
		<Wrap
			id={layer.id}
			ref={ref}
			style={{
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
				pointerEvents: "auto",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			onPointerDown={props.onPointerDown}
		>
			<SVG id={layer.id + "_shape"} fill={"none"}>
				<motion.circle
					fill="none"
					stroke={props.theme.colors.t3}
					strokeWidth={scaledMinLineSize}
					r={circleR}
					cx={circleX}
					cy={circleX}
				/>
				<motion.path
					d={path}
					fill="none"
					stroke={line.color}
					strokeWidth={scaledMinLineSize}
					strokeLinecap={strokeLinecap}
				/>
				{/* <motion.circle
					fill="none"
					r={20}
					cx={endX}
					cy={endY}
					style={{
						cursor: "grab",
						pointerEvents: "auto",
					}}
					onPointerDownCapture={e => {
						onKnobDown(e);
						e.stopPropagation();
					}}
				/> */}
			</SVG>
			<Label
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: fontSizePx,
					fontWeight: text.weight,
					lineHeight: 1,
					color: text.color,
					opacity: text.opacity,
				}}
			>
				<Text>{percentAmount}</Text>
				<Suffix
					style={{
						fontFamily: props.theme.typography.fontFamily,
					}}
				>
					%
				</Suffix>
			</Label>
		</Wrap>
	);
};

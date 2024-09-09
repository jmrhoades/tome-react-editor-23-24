import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { DelegateStates } from "./Prompt";
import {} from "./Transitions";

const makeCheckPath = size => {
	let d = [
		"M",
		0.332031 * size,
		0.5 * size,
		"L",
		0.445312 * size,
		0.660156 * size,
		"L",
		0.671875 * size,
		0.335938 * size,
	].join(" ");
	return d;
};

export const Spinner = ({
	theme,
	size = 28,
	strokeWidth = 2,
	state = DelegateStates.WAITING,
	cancelLoading = undefined,
	loadingProgress = 0,
}) => {
	const colors = theme.colors;

	const x = size / 2;
	const y = size / 2;
	const r = size / 2 - strokeWidth / 2;
	const successColor = colors.generated;
	let stopWidth = Math.round(size * 0.28571428);
	if (stopWidth < 8) stopWidth = 8;
	const stopX = (size - stopWidth) / 2;
	const stopY = (size - stopWidth) / 2;

	const [isHovering, setIsHovering] = React.useState(false);
	const isHiding = state === DelegateStates.HIDING;
	const isWaiting = state === DelegateStates.WAITING;
	const isLoading = state === DelegateStates.BUILDING;
	const isFinished = state === DelegateStates.FINISHED || state === DelegateStates.REVIEW;
	//const spinControl = useAnimationControls();

	//const [rotation, setRotation] = React.useState(0);
	//const [pathLength, setPathLength] = React.useState(0);
	//const circleRef = React.useRef(null);

	let pathLength = 0.85;
	//if (isWaiting) pathLength = 0.75;
	if (isLoading) pathLength = loadingProgress;
	if (isFinished) pathLength = 1;

	//
	// Hide/show bar behavior
	//

	/*
	React.useEffect(() => {
		if (isHiding) {
			setRotation(0);
			setPathLength(0);
		}
		if (isWaiting) {
			setRotation(360);
			setPathLength(0.666);
		}
		if (isLoading) {
			setPathLength(loadingProgress);
		}
		if (isFinished) {
			setPathLength(1);
		}
	}, [isHiding, isWaiting, isLoading, isFinished, loadingProgress]);
	*/

	return (
		<motion.svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill="none"
			style={{
				width: size,
				height: size,
				margin: 0,
				display: "block",
				outline: "none",
			}}
			onTap={isFinished ? undefined : cancelLoading}
			onHoverStart={isFinished ? undefined : () => setIsHovering(true)}
			onHoverEnd={isFinished ? undefined : () => setIsHovering(false)}
		>
			{/* Stop square */}
			<motion.rect
				initial={false}
				animate={{ opacity: isFinished || isHiding ? 0 : 1 }}
				transition={{ duration: isHiding ? 0 : 0.2 }}
				x={stopX}
				y={stopY}
				width={stopWidth}
				height={stopWidth}
				fill={colors.accent}
				rx={1}
			/>

			{/* Background Ring */}
			<motion.circle
				cx={x}
				cy={y}
				r={r}
				strokeWidth={strokeWidth}
				stroke={colors.t4}
				initial={false}
				animate={{ opacity: state === DelegateStates.FINISHED ? 0 : 1 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Waiting / Progress / Finished Ring */}
			<motion.g
				style={{
					transformOrigin: `${x}px ${y}px`,
				}}
				initial={{
					rotate: -90,
				}}
			>
				<motion.circle
					style={{
						transformOrigin: `${x}px ${y}px`,
					}}
					cx={x}
					cy={y}
					r={r}
					strokeWidth={strokeWidth}
					//strokeLinecap="round"
					initial={{rotate: 0}}
					animate={{
						rotate: 360,
						pathLength: pathLength,
						stroke: isFinished ? successColor : colors.accent,
					}}
					transition={{
						default: {
							ease: "easeOut",
							duration: isFinished ? 0.2 : 0.4,
						},
						rotate: {
							ease: "linear",
							duration: 2,
							repeat: Infinity,
						},
					}}
				/>
			</motion.g>

			{/* Waiting / Progress / Finished Ring */}
			{/* <motion.g
				style={{
					transformOrigin: `${x}px ${y}px`,
				}}
				initial={{
					rotate: -90,
				}}
			>
				<motion.circle
					style={{
						transformOrigin: `${x}px ${y}px`,
					}}
					cx={x}
					cy={y}
					r={r}
					strokeWidth={strokeWidth}
					//strokeLinecap="round"
					initial={false}
					animate={{
						rotate: isWaiting ? [0, 360] : [null, 360],
						pathLength: pathLength,
						stroke: isFinished ? successColor : colors.accent,
					}}
					transition={{
						default: {
							ease: "easeOut",
							duration: isHiding ? 0 : 0.4,
						},
						rotate: {
							ease: isWaiting ? "linear" : "easeOut",
							duration: isWaiting ? 2 : 0.4,
							repeat: isWaiting ? Infinity : 0,
						},
					}}
				/>
			</motion.g> */}

			{/* Success Checkmark and Ring */}
			{isFinished && (
				<motion.path
					d={makeCheckPath(size)}
					stroke={successColor}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{
						pathLength: 0,
						opacity: 0,
					}}
					animate={{
						pathLength: 1,
						opacity: 1,
					}}
					transition={{
						pathLength: {
							type: "spring",
							bounce: 0,
							duration: 0.65,
							delay: 0.4,
						},
						opacity: {
							type: "spring",
							bounce: 0,
							duration: 0.2,
							delay: 0.4,
						},
					}}
				/>
			)}

		</motion.svg>
	);
};

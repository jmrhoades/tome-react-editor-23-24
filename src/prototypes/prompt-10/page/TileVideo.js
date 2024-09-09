import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";


import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";
import { Icon } from "../../../ds/Icon";
import { transitions } from "../ds/Transitions";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Video = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	video {
		object-fit: cover;
	}
`;

const Controls = styled(motion.div)`
	position: absolute;
	display: flex;
	align-items: center;
	transition: opacity 0.3s ease-out;
`;

const PlayPause = styled(motion.div)`
	margin-left: 10px;
	margin-right: 12px;
`;

const Scrubber = styled(motion.div)`
	width: 100%;
	min-width: 10px;
	height: 2px;
	margin-right: 12px;
	position: relative;
`;

const ScrubberKnob = styled(motion.div)``;
const Knob = styled(motion.div)``;

const ProgressBar = styled(motion.div)`
	width: 100%;
	height: 100%;
`;

const TimeCode = styled(motion.div)`
	font-size: 10px;
	line-height: 13px;
	height: 13px;
	margin-right: 12px;
	white-space: nowrap;
	text-align: right;
`;

const Volume = styled(motion.div)`
	margin-right: 12px;
`;

const Expand = styled(motion.div)`
	margin-right: 12px;
`;

const LargePlayButton = styled(motion.div)`
	position: absolute;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	background: hsla(0, 0%, 16%, 0.8);
	backdrop-filter: blur(100px);
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	cursor: pointer;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.$image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

export const TileVideo = props => {
	const { scale } = useContext(MetricsContext).metrics;

	const videoRef = useRef(null);
	const scrubberRef = useRef(null);

	const imageAlpha = useMotionValue(1);
	const knobX = useMotionValue(0);
	const controlsOpacity = useMotionValue(0);
	const progressBarScale = useMotionValue(0);

	const [isPlaying, setIsPlaying] = useState(props.autoPlay ? true : false);
	const [isPaused, setIsPaused] = useState(false);
	const [currentTime, setCurrentTime] = useState(false);
	const [duration, setDuration] = useState(false);
	const [muted, setMuted] = useState("muted");

	const onFileLoaded = () => {
		//console.log("video tile: file loaded")
		//calcRowHeights();
	};
	//if (props.tile) props.tile.onFileLoaded = onFileLoaded;
	const isLoading = props.tile && props.tile.isLoading ? props.tile.isLoading : false;

	const startPlayback = e => {
		if (videoRef.current) {
			videoRef.current.play();
			setIsPlaying(true);
			imageAlpha.set(0);
		}
		e.stopPropagation();
	};
	const formatTime = t => {
		let time = Math.round(t);
		if (time < 10) time = "0:0" + time;
		if (time < 60) time = "0:" + time;
		return time;
	};
	const onTimeUpdate = () => {
		if (videoRef.current) {
			// console.log(videoRef.current.currentTime, videoRef.current.duration);
			setCurrentTime(formatTime(videoRef.current.currentTime));
			setDuration(formatTime(videoRef.current.duration));
		}
	};

	const stopMouse = e => {
		e.stopPropagation(); // Don't select tile
	};

	const togglePlayback = e => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
				setIsPlaying(true);
				setIsPaused(false);
			} else {
				videoRef.current.pause();
				setIsPlaying(false);
				setIsPaused(true);
			}
		}
	};

	const toggleMute = e => {
		if (muted) {
			setMuted(undefined);
		} else {
			setMuted("muted");
		}
	};

	//
	// TODO
	// this shouldn't be running all the time
	// should only run while video is playing
	// and/or after tile has been resized
	//

	useAnimationFrame(t => {
		if (videoRef.current) {
			const per = videoRef.current.currentTime / videoRef.current.duration;
			progressBarScale.set(per);
			if (scrubberRef.current) {
				knobX.set(scrubberRef.current.getBoundingClientRect().width * per);
			}
		}
	});

	//console.log(props.tileWidth)

	let backgroundColor = "transparent";
	if (isLoading) backgroundColor =  props.theme.colors.t1;
	backgroundColor =  props.theme.colors.t1;
	if (props.backgroundColor) backgroundColor = props.backgroundColor;
	backgroundColor = "transparent";
	return (
		<Wrap
			style={{
				backgroundColor: backgroundColor,
				pointerEvents: "auto",
			}}
			onHoverStart={
				props.rowResizing
					? undefined
					: e => {
							controlsOpacity.set(1);
					  }
			}
			onHoverEnd={
				props.rowResizing
					? undefined
					: e => {
							controlsOpacity.set(isPaused ? 1 : 0);
					  }
			}
		>
			{props.video && (
				<Video
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: isLoading ? 0 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.35,
					}}
				>
					<video
						muted={muted}
						height="100%"
						width="100%"
						autoPlay={props.autoPlay}
						preload="true"
						loop={true}
						ref={videoRef}
						//controls
						onTimeUpdate={onTimeUpdate}
					>
						<source src={props.video} type="video/mp4" />
					</video>
					<Controls
						style={{
							opacity: controlsOpacity,
							backgroundColor: props.theme.colors.controls.video.background,
							width: props.tileWidth < 151 ? "auto" : "calc(100% - 32px)",
							maxWidth: 346,
							borderRadius: 8,
							height: 32,
							bottom: 16,
						}}
					>
						<PlayPause
							style={{
								marginRight: props.tileUnitWidth > 1 ? 12 : 10,
							}}
							onTap={togglePlayback}
							onMouseDown={stopMouse}
							onMouseMove={stopMouse}
							whileTap={{ scale: 0.9 }}
						>
							{isPlaying && <Icon name="PlaybackPause" size={16} opacity={1} color={"white"} />}
							{!isPlaying && <Icon name="PlaybackPlay" size={16} opacity={1} color={"white"} />}
						</PlayPause>

						{props.tileWidth > 150 && (
							<Scrubber
								ref={scrubberRef}
								style={{
									backgroundColor: props.theme.colors.t6,
								}}
							>
								<ProgressBar style={{ scaleX: progressBarScale, originX: 0, backgroundColor: "white" }} />
								<ScrubberKnob
									style={{
										width: 24,
										height: 24,
										x: knobX,
										y: "calc(-50% - 1px)",
									}}
									// drag={"x"}
									// dragConstraints={scrubberRef}
									// dragElastic={0}
									// dragMomentum={false}
								>
									<Knob
										style={{
											width: 8,
											height: 8,
											position: "absolute",
											top: "50%",
											left: 0,
											borderRadius: "50%",
											x: "-50%",
											y: "-50%",
											backgroundColor: "white",
											opacity: 1,
										}}
									/>
								</ScrubberKnob>
							</Scrubber>
						)}

						{props.tileWidth > 220 && (
							<TimeCode
								style={{
									color: "white",
								}}
							>
								{currentTime} / {duration}
							</TimeCode>
						)}

						{props.tileWidth > 128 && (
							<Volume onTap={toggleMute} onMouseDown={stopMouse} whileTap={{ scale: 0.9 }}>
								{muted && <Icon name="VolumeOff" size={16} opacity={1} color={"white"} />}
								{!muted && <Icon name="VolumeHigh" size={16} opacity={1} color={"white"} />}
							</Volume>
						)}

						{props.tileWidth > 128 && (
							<Expand>
								<Icon name="Expand" size={16} opacity={1} color={"white"} />
							</Expand>
						)}
					</Controls>
					{props.video && !props.autoPlay && (
				<LargePlayButton
					style={{
						width: 80 * scale,
						height: 80 * scale,
						left: `calc(50% - ${40 * scale}px`,
						top: `calc(50% - ${40 * scale}px`,
						opacity: imageAlpha,
					}}
					animate={{ scale: props.tileUnitWidth > 3 ? 1 : props.tileUnitWidth === 1 ? 0.5 : 0.75 }}
					onMouseDown={stopMouse}
					onTap={startPlayback}
					transition={transitions.layoutTransition}
				>
					<Icon name="PlaybackPlay" opacity={1} color={"white"} size={48 * scale} />
				</LargePlayButton>
			)}
				</Video>
			)}
			{props.image && (
				<Image
					style={{
						backgroundSize: props.imageSize ? props.imageSize : "cover",
						backgroundPosition: props.imagePosition ? props.imagePosition : "center",
						opacity: imageAlpha,
						pointerEvents: "none",
					}}
					$image={props.image}
				/>
			)}
			
			{!props.video && !props.image && !isLoading && (
				<NullMediaTile
					tileId={props.tileId}
					rowHeight={props.rowHeight}
					scale={scale}
					iconName={"Video"}
					buttonLabel={"Upload video"}
					labelLabel={"Or drop here"}
					theme={props.theme}
					tileWidth={props.tileUnitWidth}
					row={props.row}
					tile={props.tile}
				/>
			)}
		</Wrap>
	);
};

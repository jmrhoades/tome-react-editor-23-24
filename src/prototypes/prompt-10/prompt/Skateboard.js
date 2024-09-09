import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { promptbarMetrics } from "./Prompt";

const Wrap = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	position: relative;
	gap: 4px;

	
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	/* cursor: pointer; */
`;

const IconContainer = styled(motion.div)`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
`;

const Label = styled(motion.div)`
	pointer-events: none;
	font-size: 13px;
	line-height: 15px;
	position: absolute;
	top: 50%;
	right: 0;
	letter-spacing: 1px;
`;

const ShortcutIcon = styled(motion.div)`
	margin-right: 10px;
`;

const Bg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Line = styled(motion.div)`
	position: relative;
`;

const LineBlink = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const LineFill = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 2px;
`;

const LineHoverFill = styled(LineFill)``;

export const Skateboard = props => {
	const colors = props.theme.colors;
	//const [isHovering, setIsHovering] = React.useState(false);
	const foreground = colors.t75;
	const height = promptbarMetrics.mini.barHeight;
	const width = promptbarMetrics.mini.barWidth;
	return (
		<Wrap
			style={{
				height: "100%",
				pointerEvents: "none",
			}}
		>
			{/* <Bg
				style={{
					backgroundColor:  colors.promptbar.miniBackgroundHover,
				}}
				initial={false}
				animate={{
					opacity: props.isHovering ? 1 : 0,
				}}
			 />  */}

			<Line
				style={{
					x: 10,
					width: width,
					height: height,
				}}
				initial={false}
				animate={{
					scaleY: props.isShowing ? 1 : 1.6,
					scaleX: props.isShowing ? 1 : 0.333,
					x: props.isShowing ? props.isHovering ? 4 : 10 : 16,
					//x: props.isShowing ? 10 : 16,
				}}
				transition={props.transitions.morph}
			>
				<LineBlink
					initial={false}
					// transition={{
					// 	opacity: {
					// 		repeat: Infinity,
					// 		repeatType: "mirror",
					// 		duration: 0.5,
					// 		delay: 0.5,
					// 		ease: "easeOut",
					// 	},
					// }}
					// animate={{
					// 	opacity: [1, props.isHovering ? 0 : 1],
					// }}
				>
					<LineFill
						style={{
							backgroundColor: colors.promptbar.miniBar,
						}}
						animate={{
							//opacity: props.isHovering || !props.isShowing ? 0 : 1,
							opacity: !props.isShowing ? 0 : 1,
						}}
						transition={{
							ease: "easeOut",
							duration: 0.3,
						}}
						initial={false}
					/>

					<LineHoverFill
						style={{
							backgroundColor: colors.accent,
						}}
						animate={{
							opacity: !props.isShowing ? 1 : 0,
						}}
						transition={{
							ease: "easeOut",
							duration: 0.3,
						}}
						initial={false}
					/>
				</LineBlink>
			</Line>

			{/* <Label
				style={{
					color: colors.t7,
					y: "-50%",
					x: -10,
					opacity: 1,
					fontFamily: props.theme.typography.fontFamilyMono,
					fontSize: 14,
					textAlign: "right",
				}}
				initial={false}	
				animate={{
					opacity: props.isHovering ? 1 : 1,
				}}
			>
				⌘K
			</Label> */}
			<ShortcutIcon
				initial={false}
				animate={{
					x: props.isShowing ? props.isHovering ? 6 : 0 : -6,
					//x: props.isShowing ? 0 : -6,
					scale: props.isShowing ? 1 : 1.25,
				}}
				style={{
					originX: 1,
				}}
				transition={props.transitions.morph}
			>
				{/* <svg width="21" height="10" viewBox="0 0 21 10" fill={colors.t7}>
					<path d="M2.125 10C3.68056 10 4.18056 9.02778 4.18056 7.86111V6.70833H5.70833V7.86111C5.70833 9.02778 6.20833 10 7.76389 10C9.05555 10 9.88889 9.18056 9.88889 7.90278C9.88889 6.55556 9.08333 5.76389 7.5 5.76389H6.68056V4.23611H7.5C9.08333 4.23611 9.88889 3.44444 9.88889 2.09722C9.88889 0.819445 9.05555 0 7.76389 0C6.20833 0 5.70833 0.972222 5.70833 2.13889V3.29167H4.18056V2.13889C4.18056 0.972222 3.68056 0 2.125 0C0.833333 0 0 0.819445 0 2.09722C0 3.44444 0.805556 4.23611 2.38889 4.23611H3.20833V5.76389H2.38889C0.805556 5.76389 0 6.55556 0 7.90278C0 9.18056 0.833333 10 2.125 10ZM6.68056 2.11111C6.68056 1.40278 7.04167 0.958333 7.76389 0.958333C8.41667 0.958333 8.90278 1.27778 8.90278 2.09722C8.90278 2.88889 8.48611 3.29167 7.5 3.29167H6.68056V2.11111ZM2.38889 3.29167C1.40278 3.29167 0.986111 2.88889 0.986111 2.09722C0.986111 1.27778 1.47222 0.958333 2.125 0.958333C2.84722 0.958333 3.20833 1.40278 3.20833 2.11111V3.29167H2.38889ZM4.18056 5.76389V4.23611H5.70833V5.76389H4.18056ZM2.125 9.04167C1.47222 9.04167 0.986111 8.72222 0.986111 7.90278C0.986111 7.11111 1.40278 6.70833 2.38889 6.70833H3.20833V7.88889C3.20833 8.59722 2.84722 9.04167 2.125 9.04167ZM6.68056 7.88889V6.70833H7.5C8.48611 6.70833 8.90278 7.11111 8.90278 7.90278C8.90278 8.72222 8.41667 9.04167 7.76389 9.04167C7.04167 9.04167 6.68056 8.59722 6.68056 7.88889Z" />
					<path d="M13.6868 10V0.277778H14.9368V4.48611C15.0294 4.38426 15.1776 4.21296 15.3813 3.97222L18.6313 0.277778H20.1591L14.9368 6.13889V10H13.6868ZM19.1591 10L15.298 5.34722L16.1868 4.51389L20.7841 10H19.1591Z" />
				</svg> */}
			</ShortcutIcon>
		</Wrap>
	);
};

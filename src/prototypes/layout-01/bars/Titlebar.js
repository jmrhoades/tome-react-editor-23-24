import React, { useContext } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { transitions } from "../ds/Transitions";

// import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";
import { TitlebarProgressIndicator } from "./TitlebarProgressIndicator";
import { IconButton, LabelButton } from "../ds/Buttons";
import { TitleField } from "../ds/Fields";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	/* z-index: 10; */
	height: 48px;
`;

const EditorBar = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const PlayBar = styled(EditorBar)``;

const LeftGroup = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 10px;
	height: 100%;
	gap: 4px;
`;

const BrandingContainer = styled(motion.div)`
	position: absolute;
`;
const BrandingAsset = styled(motion.div)`
	img {
		display: block;
	}
`;
const RightGroup = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 10px;
	height: 100%;
	gap: 8px;
	margin-top: -2px;
`;

const RightInnerGroup = styled(motion.div)`
	position: relative;
	display: flex;
	gap: 8px;
`;

export const Titlebar = props => {
	const {
		isPlayMode,
		enterPlayMode,
		exitPlayMode,
		tomeData,
		currentPage,
		menuInfo,
		showMenu,
		setContextMenuInfo,
		setShowContextMenu,
		isGenerating,
		isReviewing,
	} = useContext(TomeContext);

	const fade = transitions.basic;
	const [isHovering, setIsHovering] = React.useState(true);

	return (
		<Wrap
			animate={{
				opacity: isGenerating || isReviewing ? 0.25 : 1,
			}}
			onContextMenu={e => {
				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: ["Dynamic Background"],
				});
				setShowContextMenu(true);

				e.preventDefault();
			}}
		>
			<EditorBar
				animate={
					{
						//opacity: !isPlayMode ? 1 : isHovering ? 1 : 0,
					}
				}
				onHoverStart={() => {
					setIsHovering(true);
				}}
				onHoverEnd={() => {
					setIsHovering(false);
				}}
			>
				<LeftGroup
					style={{
						pointerEvents: isPlayMode ? "none" : "auto",
					}}
					initial={false}
					transition={fade}
					animate={{
						opacity: isPlayMode ? 0 : 1,
					}}
				>
					<IconButton icon="ChevronLeft" theme={currentPage.theme} to="/" />
					<TitleField label={tomeData.title} theme={currentPage.theme} />
				</LeftGroup>

				<BrandingContainer
					style={{
						pointerEvents: !isPlayMode ? "none" : "auto",
						height: 24,
						width: 128,
						// background: "red",
						top: 12,
						left: 16,
					}}
					initial={false}
					transition={fade}
					animate={{
						opacity: isPlayMode && isHovering ? 1 : 0,
					}}
				>
					<motion.img
						height="24"
						src="/logos/tome-logo-mark-white-100x100.svg"
						alt=""
						style={{ opacity: currentPage.theme.mode === "light" ? 0 : 1 }}
					/>
					<motion.img
						height="24"
						src="/logos/tome-logo-mark-black-100x100.svg"
						alt=""
						style={{ opacity: currentPage.theme.mode === "light" ? 1 : 0, position: "absolute", top: 0, left: 0 }}
					/>
				</BrandingContainer>

				<TitlebarProgressIndicator theme={currentPage.theme} />

				<RightGroup
					animate={{
						opacity: isPlayMode && !isHovering ? 0 : 1,
					}}
				>
					<AnimatePresence mode={"popLayout"}>
						{!isPlayMode && (
							<motion.div>
								<IconButton
									key="PlayModePlay"
									icon="PlaybackPlay"
									theme={currentPage.theme}
									onTap={enterPlayMode}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					<AnimatePresence mode={"popLayout"}>
						{isPlayMode && (
							<motion.div>
								<IconButton key="PlayModeClose" icon="Close" theme={currentPage.theme} onTap={exitPlayMode} />
							</motion.div>
						)}
					</AnimatePresence>

					<IconButton
						icon="More"
						theme={currentPage.theme}
						id={"tome_menu_button"}
						active={menuInfo.show && menuInfo.buttonId === "tome_menu_button"}
						activeColor={currentPage.theme.colors.controls.icon}
						onTap={e => {
							showMenu({
								type: "tome_menu",
								buttonId: "tome_menu_button",
								alignX: "trailing",
								alignY: "trailing",
							});
						}}
					/>

				

					<RightInnerGroup
						style={{
							pointerEvents: isPlayMode ? "none" : "auto",
						}}
						initial={false}
						transition={fade}
						animate={{
							opacity: isPlayMode ? 0 : 1,
						}}
					>
						
						
						
						
					<IconButton
							icon="CommentFill"
							theme={currentPage.theme}
							backgroundColor={currentPage.theme.colors.controls.canvasMaterial}
							backgroundBlur={true}
						/>
						<IconButton
							key={"record-panel"}
							theme={currentPage.theme}
							backgroundColor={currentPage.theme.colors.controls.canvasMaterial}
							backgroundBlur={true}
							icon="Record"
							onTap={e => {
								//onToolbarButtonTap(panelNames.RECORD.name);
							}}
							//active={panelName === panelNames.RECORD.name && sidePanelOpen}
							// style={{pointerEvents: "auto"}}
						/>
							<LabelButton
						label={"Share"}
						theme={currentPage.theme}
						backgroundColor={currentPage.theme.colors.controls.canvasMaterial}
						backgroundBlur={true}
					/>
						{/* <TitlebarSeenHeads theme={currentPage.theme} /> */}
					</RightInnerGroup>
				</RightGroup>
			</EditorBar>
		</Wrap>
	);
};

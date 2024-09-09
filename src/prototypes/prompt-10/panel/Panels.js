import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { tileNames, panelNames } from "../page/TileConstants";
import { AddTilePanel } from "./AddTilePanel";
import { ThemePanel } from "./ThemePanel";
import { PagePanel } from "./PagePanel";
import { RecordPanel } from "./RecordPanel";
import { TextTileProperties } from "./TextTileProperties";
import { ImageTileProperties } from "./ImageTileProperties";
import { LayoutsPanel } from "./LayoutsPanel";
import { BackgroundPanel } from "./BackgroundPanel";
import { Icon } from "../../../ds/Icon";
import { ClosePanelButton } from "./controls/ClosePanelButton";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	pointer-events: none;
`;

const Constraints = styled(motion.div)`
	position: absolute;
	top: 12px;
	bottom: 12px;
	left: 12px;
	right: 12px;
	pointer-events: none;
`;

const ContainerWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;
`;

const Container = styled(motion.div)`
	position: relative;
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 0px;
	pointer-events: auto;
`;

const DragBlocker = styled(motion.div)`
	position: absolute;
	//top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	//height: 48px;
	height: calc(100% - 40px);
	/* background: red; */
`;

const DragIndicator = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	//width: calc(100% - 34px);
	width: 100%;
	height: 40px;
	background: transparent;
`;

const PanelHeader = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	padding-left: 12px;
	padding-right: 12px;
	/* padding-bottom: 8px;
	padding-top: 8px; */
	height: 40px;
	pointer-events: none;
`;

const PanelTitle = styled(motion.div)`
	
	font-style: "normal";
	font-weight: 700;
	font-size: 13px;
	line-height: 20px;
	width: 22px;
	white-space: nowrap;
`;

export const PanelBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const PanelWrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 12px;
	padding-top: 8px;
`;

export const Section = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
`;

export const SectionSpacer = styled(motion.div)`
	height: 0px;
`;

export const SectionTitle = props => {
	return (
		<div
			style={{
				
				fontStyle: "normal",
				fontWeight: 400,
				fontSize: "11px",
				lineHeight: "14px",
				color: props.theme.colors.t75,
				position: "relative",
				pointerEvents: "none",
			}}
		>
			{props.children}
		</div>
	);
};

export const SectionTitleWithHelp = props => {
	return (
		<div
			style={{
				
				fontStyle: "normal",
				fontWeight: 400,
				fontSize: "11px",
				lineHeight: "14px",
				color: props.theme.colors.t7,
				position: "relative",
				pointerEvents: "none",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			{props.children}
			<Icon name={"Help"} size={14} opacity={1} color={props.theme.colors.t6} style={{x: -4}}/>
		</div>
	);
};

export const ClosePanelButtonDummy = styled(motion.div)`
	width: 22px;
	height: 22px;
`;

const DragHandle = styled(motion.div)`
	width: 24px;
	height: 3px;
	border-radius: 2px;
`;

export const ControlGroup = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const ColorRow = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export const ButtonStack = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 6px;
`;

export const ButtonPair = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: 6px;
`;

export const Panels = props => {
	const { sidePanelOpen, panelName, selectedTile, currentPage, showMenu, closeMenu } = useContext(TomeContext);

	const panelRef = React.useRef(null);
	const panelX = useMotionValue(0);
	const panelY = useMotionValue(0);
	const [isDraggable, setIsDraggable] = React.useState(false);
	const [isDragging, setIsDragging] = React.useState(false);
	const [isHovering, setIsHovering] = React.useState(false);

	const constraintsRef = React.useRef(null);
	const [constraitsRect, setConstraintsRect] = React.useState({});

	const isRightAligned = panelName !== panelNames.ADD_PAGE.name;
	const marginX = panelName !== panelNames.ADD_PAGE.name ? 72 : 104;

	const getPanel = () => {
		switch (panelName) {
			case tileNames.TEXT.name:
				return <TextTileProperties theme={currentPage.theme} showMenu={showMenu} />;

			case tileNames.IMAGE.name:
				return <ImageTileProperties theme={currentPage.theme} />;

			case tileNames.BACKGROUND.name:
				return <BackgroundPanel theme={currentPage.theme} page={currentPage} />;

			case panelNames.ADD_PAGE.name:
				return <LayoutsPanel theme={currentPage.theme} />;

			case panelNames.ADD_TILE.name:
				return <AddTilePanel theme={currentPage.theme} />;

			case panelNames.THEME.name:
				return <ThemePanel theme={currentPage.theme} />;

			case panelNames.PAGE.name:
				return <PagePanel theme={currentPage.theme} layout={currentPage.layout} />;

			case panelNames.RECORD.name:
				return <RecordPanel theme={currentPage.theme} />;

			default:
				return <></>;
		}
	};

	React.useEffect(() => {
		//panelX.set(0);
		//panelY.set(0);

		if (panelRef.current) {
			const r = panelRef.current.getBoundingClientRect();
			setConstraintsRect({
				top: -window.innerHeight / 2 + r.height / 2 + 12,
				left: -window.innerWidth + r.width + 69 + 16,
				bottom: window.innerHeight / 2 - r.height / 2 - 12,
				right: 69 - 12,
			});
		}

		if (panelName === panelNames.ADD_PAGE.name) {
			setIsDraggable(false);
		} else {
			setIsDraggable(true);
		}
	}, [panelName, selectedTile, sidePanelOpen, panelX, panelY]);

	React.useEffect(() => {
		if (
			panelName === panelNames.ADD_PAGE.name ||
			panelName === panelNames.ADD_TILE.name ||
			panelName === panelNames.THEME.name ||
			panelName === panelNames.PAGE.name ||
			panelName === panelNames.RECORD.name
		) {
			panelX.set(0);
			panelY.set(0);
		}
	}, [panelName]);

	React.useEffect(() => {
		panelX.set(0);
		panelY.set(0);
	}, [sidePanelOpen]);

	return (
		<Wrap>
			<Constraints ref={constraintsRef} key={"panel_constraints_wrap"} />
			<ContainerWrap
				style={{
					left: isRightAligned ? "auto" : marginX,
					right: isRightAligned ? marginX : "auto",
					width: panelName !== panelNames.ADD_PAGE.name ? 240 : 280,
				}}
			>
				{sidePanelOpen && (
					<Container
						ref={panelRef}
						key={"panel_container"}
						style={{
							x: panelX,
							y: panelY,
						}}
						exit={{
							scale: 0.9,
							opacity: 0,
							transition: {
								duration: 0.15,
							},
						}}
						initial={{
							scale: 0.975,
							opacity: 0,
						}}
						animate={{
							scale: 1,
							opacity: 1,
						}}
						transition={{
							default: {
								type: "spring",
								stiffness: 450,
								damping: 40,
							},
							opacity: {
								type: "tween",
								ease: "easeOut",
								duration: 0.2,
							},
						}}
						drag={isDraggable}
						dragMomentum={false}
						dragElastic={0.1}
						dragConstraints={constraitsRect}
						dragPropagation={false}
						onDragEnd={e => {
							setIsDragging(false);
							//document.body.classList.remove("grabbing");
						}}
						onMouseDown={e => {
							if (isDraggable) {
								setIsDragging(true);
								closeMenu();
								//document.body.classList.remove("grab");
								//document.body.classList.add("grabbing");
							}
						}}
						

						//dragConstraints={constraintsRef}
						//transition={transitions.layoutTransition}
					>
						{panelName !== panelNames.ADD_TILE.name && (
							<PanelBackground
								style={{
									background: currentPage.theme.colors.backgrounds.panel,
									borderRadius: 16,
									boxShadow: currentPage.theme.shadows.panel,
									//border: currentPage.theme.borders.panel,
								}}
							/>
						)}

						{isDraggable && (
							<DragBlocker
								drag
								dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
								dragElastic={false}
								dragMomentum={false}
							/>
						)}

						{panelName !== panelNames.ADD_TILE.name && (
							<PanelHeader
							// style={{
							// 	background: "rgba(255,255,255,0.04)",
							// }}
							>
								<PanelTitle
									style={{
										color: currentPage.theme.colors.t9,
									}}
								>
									{panelName}
								</PanelTitle>

								{isDraggable && (
									<Icon
										name={"MoveIndicator"}
										size={22}
										opacity={1}
										color={isHovering ? currentPage.theme.colors.t6 : currentPage.theme.colors.t4}
										transition={{
											ease: "easeOut",
											duration: 0.2,
										}}
										style={{
											y: -1,
										}}
									/>
								)}

								<ClosePanelButtonDummy />
							</PanelHeader>
						)}
						{getPanel()}

						{isDraggable && (
							<DragIndicator
								style={{
									cursor: isDragging ? "grabbing" : "grab",
								}}
								onHoverStart={e => {
									setIsHovering(true);
								}}
								onHoverEnd={e => {
									setIsHovering(false);
								}}
							/>
						)}
						{isDraggable && <ClosePanelButton theme={currentPage.theme} key="panel_close_button" />}
					</Container>
				)}
			</ContainerWrap>
		</Wrap>
	);
};

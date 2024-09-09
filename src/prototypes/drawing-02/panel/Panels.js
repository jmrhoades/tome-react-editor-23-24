import React, { useContext } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { TILES, panelNames } from "../tiles/TileConstants";
import { PANELS } from "./PanelConstants";
import { AddTilePanel } from "./AddTilePanel";
import { ThemePanel } from "./ThemePanel";
import { PagePanel } from "./PagePanel";
import { RecordPanel } from "./RecordPanel";
import { TextTileProperties } from "./TextTileProperties";
import { ImageTileProperties } from "./ImageTileProperties";
import { LayoutsPanel } from "./LayoutsPanel";
import { BackgroundPanel } from "./BackgroundPanel";
import { Icon } from "../../../ds/Icon";
import { transitions } from "../ds/Transitions";
import { ClosePanelButton } from "./controls/ClosePanelButton";
import { AddDrawingLayerPanel } from "./AddDrawingLayerPanel";
import { CanvasSettings } from "./CanvasSettings";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	pointer-events: none;
	
	font-style: "normal";
	font-weight: 400;
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
	left: 0;
	right: 0;
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
	bottom: 0;
	left: 0;
	width: 100%;
	height: calc(100% - 56px);
	/* background: red; */
`;

const PanelHeader = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: top;
	position: relative;
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 16px;
	padding-bottom: 8px;
`;

const PanelHeading = styled(motion.div)``;

const PanelTitle = styled(motion.div)`
	font-weight: 600;
	font-size: 13px;
	line-height: 16px;
	white-space: nowrap;
	margin-bottom: 4px;
`;

const PanelInstruction = styled(motion.div)`
	font-size: 11px;
	line-height: 14px;
	white-space: nowrap;
`;

const DragRegion = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 52px;
`;

const DragHandle = styled(motion.div)`
	width: 28px;
	height: 3px;
	border-radius: 3px;
	position: absolute;
	top: 0;
	left: 50%;
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
	padding-top: 0px;
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
				color: props.theme.colors.t7,
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
			<Icon name={"Help"} size={14} opacity={1} color={props.theme.colors.t6} style={{ x: -4 }} />
		</div>
	);
};

export const ControlGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;

export const ControlsRows = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const LabelControlPair = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
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

export const ButtonWrap = styled(motion.div)`
	display: flex;
	align-items: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
`;

export const Panels = props => {
	const { sidePanelOpen, panelName, selectedTile, currentPage } = useContext(TomeContext);

	const panelRef = React.useRef(null);
	const panelX = useMotionValue(0);
	const panelY = useMotionValue(0);
	const [isDraggable, setIsDraggable] = React.useState(true);
	const [isDragging, setIsDragging] = React.useState(false);
	const [fadeOutPanel, setFadeOutPanel] = React.useState(false);

	const constraintsRef = React.useRef(null);
	const [constraitsRect, setConstraintsRect] = React.useState({});

	const isRightAligned = panelName !== panelNames.ADD_PAGE.name;
	const marginX = panelName !== panelNames.ADD_PAGE.name ? 72 : 104;

	const getPanel = () => {
		
		//console.log(panelName)
		switch (panelName) {
			case TILES.DRAWING.addPanelId:
				return (
					<AddDrawingLayerPanel
						theme={currentPage.theme}
						page={currentPage}
						panelRef={panelRef}
						panelX={panelX}
						panelY={panelY}
					/>
				);

			case PANELS.CANVAS_SETTINGS.id:
				return <CanvasSettings theme={currentPage.theme} page={currentPage} />;

			case PANELS.TEXT_SETTINGS.id:
				return <TextTileProperties theme={currentPage.theme} />;

			case PANELS.IMAGE_SETTINGS.id:
				return <ImageTileProperties theme={currentPage.theme} />;

			case TILES.BACKGROUND.name:
				return <BackgroundPanel theme={currentPage.theme} page={currentPage} />;

			case panelNames.ADD_PAGE.name:
				return <LayoutsPanel theme={currentPage.theme} />;

			case panelNames.ADD_TILE.name:
				return (
					<AddTilePanel theme={currentPage.theme} fadeOutPanel={fadeOutPanel} setFadeOutPanel={setFadeOutPanel} />
				);

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
		if (panelRef.current) {
			const r = panelRef.current.getBoundingClientRect();
			setConstraintsRect({
				top: -window.innerHeight / 2 + r.height / 2 + 12,
				left: -window.innerWidth + r.width + 69 + 16,
				bottom: window.innerHeight / 2 - r.height / 2 - 12,
				right: 69 - 12,
			});
		}

		resetPosition()

		if (panelName === panelNames.ADD_PAGE.name) {
			setIsDraggable(false);
		} else {
			setIsDraggable(true);
		}
	}, [panelName, selectedTile, sidePanelOpen]);

	

	const resetPosition = () => {
		if (panelRef.current) {
			const r = panelRef.current.getBoundingClientRect();
			panelX.set(window.innerWidth - r.width - 58);
			panelY.set((window.innerHeight - r.height) / 2);
		}
	}

	/*
	React.useEffect(() => {
		if (sidePanelOpen) {
			panelX.set(0);
			panelY.set(0);
		}
	}, [sidePanelOpen]);
	*/

	let panelWidth = 240;
	let panelTitle = panelName;
	let includeDragHint = false;
	if (panelName === panelNames.ADD_PAGE.name) panelWidth = 280;

	if (panelName === PANELS.ADD_SHAPE.id) {
		panelWidth = 160;
		panelTitle = PANELS.ADD_SHAPE.title;
		includeDragHint = true;
	}

	if (panelName === PANELS.CANVAS_SETTINGS.id) {
		panelTitle = PANELS.CANVAS_SETTINGS.title;
	}

	if (panelName === PANELS.TEXT_SETTINGS.id) {
		panelTitle = PANELS.TEXT_SETTINGS.title;
	}

	if (panelName === PANELS.IMAGE_SETTINGS.id) {
		panelTitle = PANELS.IMAGE_SETTINGS.title;
	}

	return (
		<Wrap>
			<Constraints ref={constraintsRef} key={"panel_constraints_wrap"} />
			<ContainerWrap
				style={
					{
						//left: isRightAligned ? "auto" : marginX,
						//right: isRightAligned ? marginX : "auto",
					}
				}
			>
				{/* <AnimatePresence> */}
				{sidePanelOpen && (
					<Container
						ref={panelRef}
						key={"panel_container"}
						style={{
							width: panelWidth,
							x: panelX,
							y: panelY,
						}}
						exit={{
							scale: 0.9,
							opacity: 0,
							transition: {
								duration: 0.2,
							},
						}}
						initial={{
							scale: 0.975,
							opacity: 0,
						}}
						animate={{
							scale: 1,
							opacity: 1,
							transition: {
								duration: 0.1,
							},
						}}
						drag={isDraggable}
						dragMomentum={false}
						dragElastic={0.1}
						//dragConstraints={constraitsRect}
						onDragEnd={e => {
							setIsDragging(false);
						}}
						onMouseDown={e => {
							if (isDraggable) {
								setIsDragging(true);
								//closeMenu();
							}
						}}
					>
						<PanelBackground
							style={{
								background: currentPage.theme.panel.background,
								borderRadius: currentPage.theme.panel.borderRadius,
								boxShadow: currentPage.theme.panel.shadow,
								WebkitBackdropFilter: "blur(25px)",
								backdropFilter: "blur(25px)",
							}}
							animate={{
								opacity: fadeOutPanel ? 0 : 1,
							}}
							transition={{ duration: 0.1 }}
							initial={false}
						/>

						{/* {isDraggable && (
							<DragBlocker
								drag
								dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
								dragElastic={false}
								dragMomentum={false}
							/>
						)} */}

						{panelName !== panelNames.ADD_TILE.name && (
							<PanelHeader
								animate={{
									opacity: fadeOutPanel ? 0 : 1,
								}}
								transition={{ duration: 0.1 }}
								initial={false}
							>
								<PanelHeading>
									<PanelTitle style={{ color: currentPage.theme.colors.t9 }}>{panelTitle}</PanelTitle>
									{includeDragHint && (
										<PanelInstruction style={{ color: currentPage.theme.colors.t6 }}>
											Click or drag to add
										</PanelInstruction>
									)}
								</PanelHeading>

								<ClosePanelButton theme={currentPage.theme} key="panel_close_button" />

								<DragRegion
									style={{
										cursor: isDragging ? "grabbing" : "grab",
									}}
								>
									<DragHandle style={{ backgroundColor: currentPage.theme.colors.t3, x: "-50%", y: 6 }} />
								</DragRegion>
							</PanelHeader>
						)}

						{getPanel()}
					</Container>
				)}
				{/* </AnimatePresence> */}
			</ContainerWrap>
		</Wrap>
	);
};

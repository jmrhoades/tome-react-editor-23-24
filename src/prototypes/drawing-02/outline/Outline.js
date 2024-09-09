import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { transitions } from "../ds/Transitions";
import { TomeContext } from "../tome/TomeContext";
import { TooltipContext } from "../tooltips/TooltipContext";
import { panelNames } from "../tiles/TileConstants";
//import { MetricsContext } from "../tome/MetricsContext";
import {
	OutlinePage,
	OutlinePageHeight,
	OutlinePageWidth,
	outlineCornerRadius,
	OutlinePageNumberWidth,
} from "./OutlinePage";
//import { LayoutsPanel } from "./Layouts";

const OutlineComponentWidth = 128;

const OutlineWrap = styled(motion.div)`
	user-select: none;
`;

const PagesScroller = styled(motion.div)`
	
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 16px;


	position: relative;
	overflow-x: visible;
	overflow-y: visible;
	max-height: 100vh;
	overscroll-behavior-y: contain;
	pointer-events: none;
	::-webkit-scrollbar { 
    	display: none;  /* Safari and Chrome */
	}
}
`;
const AddPageButton = styled(motion.div)`
	pointer-events: auto;
`;

const AddPageButtonHover = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
`;

const AddPageEntry = styled(motion.div)`
	position: fixed;
	bottom: 0;
	left: 0;
	padding-left: 12px;
	padding-bottom: 12px;
	.background:hover {
		opacity: 1;
	}
`;

const AddPageEntryContainer = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	gap: 4px;
	height: 32px;
	padding: 0 10px;
	cursor: pointer;
`;

const AddPageEntryContainerBackground = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	opacity: 0;
	transition: opacity 0.3s ease-out;
	border-radius: 8px;
`;

const AddPageEntryLabel = styled(motion.div)``;

const iconColor = "white";
const iconVariants = {
	default: {
		opacity: 0.4,
		fill: iconColor,
	},
};

const hoverVariants = {
	default: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	active: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0,
	},
};

const addButtonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.95,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0.5,
	},
};

export const Outline = props => {
	const {
		isPlayMode,
		selectedOutlinePage,
		selectOutlinePage,
		currentPage,
		addPage,
		tomeData,
		sidePanelOpen,
		setSidePanelOpen,
		setPanelName,
		panelName,
		isGenerating,
		isReviewing,
		autoPaging,
		closeMenu,
		promptIsOpen,
		setPromptIsOpen,
		saveState,
	} = useContext(TomeContext);

	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);

	const addPageButtonRef = React.useRef();
	const openPagePanel = () => {
		hideTooltip();

		if (sidePanelOpen && panelName === panelNames.ADD_PAGE.name) {
			addPage();
		} else {
			closeMenu();
			if (promptIsOpen) {
				setPromptIsOpen(false);
			}
			setSidePanelOpen(true);
			setPanelName(panelNames.ADD_PAGE.name);
		}
	};

	const addPageEntry = () => {
		return (
			<AddPageEntry
				onTap={e => {
					openPagePanel();
				}}
				animate={{
					opacity: isPlayMode ? 0 : 1,
				}}
				initial={false}
				transition={transitions.basic}
			>
				<AddPageEntryContainer>
					<AddPageEntryContainerBackground
						className="background"
						style={{
							background: currentPage.theme.colors.t4,
						}}
					/>
					<Icon name="Add" size={20} color={currentPage.theme.colors.t8} opacity={1} />
					<AddPageEntryLabel
						style={{
							color: currentPage.theme.colors.t8,
							fontSize: 15,
						}}
					>
						Add page
					</AddPageEntryLabel>
				</AddPageEntryContainer>
			</AddPageEntry>
		);
	};

	const fullOutline = () => {
		return (
			<OutlineWrap
				animate={{
					opacity: isPlayMode ? 0 : 1,
				}}
				initial={false}
				transition={transitions.basic}
				style={{
					width: OutlineComponentWidth,
					top: 0,
					bottom: 0,
					left: 0,
					position: "fixed",
					display: "flex",
					alignItems: "center",
					pointerEvents: "none",
					
				}}
			>
				<PagesScroller
					style={{
						pointerEvents: "auto",
						overflowX: "visible",
					}}
					transition={transitions.layoutTransition}
				>
					{tomeData.pages.map((page, i) => (
						<motion.div
							key={"outline_page_wrap_" + page.id}
							style={{
								flexShrink: 0,
								pointerEvents: "auto",
							}}
						>
							<OutlinePage
								id={"outline_page_" + page.id}
								tomeData={tomeData}
								currentPage={currentPage}
								page={page}
								number={page.order}
								isCurrent={currentPage === page}
								isSelected={selectedOutlinePage === page}
								onMouseUp={e => {
									selectOutlinePage(page);
									autoPaging.current = false;
								}}
								transition={transitions.layoutTransition}
								saveState={saveState}
							/>
						</motion.div>
					))}

					<AddPageButton
						whileTap="active"
						whileHover="hover"
						initial={"default"}
						variants={addButtonVariants}
						ref={addPageButtonRef}
						onHoverStart={e => {
							showTooltip({
								id: "promptbar_minibar_tooltip",
								ref: addPageButtonRef,
								label: "New page",
								shortcuts: ["⌥", "n"],
								alignX: "trailing",
								alignY: "middle",
							});
						}}
						onHoverEnd={e => {
							resetTooltip();
						}}
						onTap={e => {
							openPagePanel();
						}}
						style={{
							height: OutlinePageHeight,
							width: OutlinePageWidth,
							position: "relative",
							borderRadius: outlineCornerRadius,

							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							marginLeft: OutlinePageNumberWidth + 4,
							pointerEvents: isGenerating ? "none" : "auto",
						}}
						animate={{
							opacity: isGenerating || isReviewing ? 0.2 : 1,
						}}
					>
						<motion.div
							style={{
								position: "absolute",
								top: "0",
								left: "0",
								width: "100%",
								height: "100%",
								background: currentPage.theme.colors.t3,
								borderRadius: outlineCornerRadius,
							}}
						/>
						<AddPageButtonHover
							variants={hoverVariants}
							style={{
								borderRadius: outlineCornerRadius,
								background: currentPage.theme.colors.t1,
							}}
						/>
						<Icon size={24} name="Add" variants={iconVariants} color={currentPage.theme.colors.t7} opacity={1} />
					</AddPageButton>
				</PagesScroller>
			</OutlineWrap>
		);
	};

	if (tomeData.pages.length > 1) {
		return fullOutline();
	} else {
		return addPageEntry();
	}
};

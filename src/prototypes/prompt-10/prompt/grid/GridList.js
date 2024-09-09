import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { PromptStates } from "../Prompt";
import { tDividerShow, tDividerHide } from "../Transitions";
import { GridListItem } from "./GridListItem";
import { GridListHistory } from "./GridListHistory";

const GridWrap = styled(motion.div)`
	position: relative;
	/* overflow: hidden; */
	display: flex;
	align-items: flex-end;
`;

const Grid = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: row;
	/* justify-content: space-between; */
`;

const Divider = styled(motion.div)`
	width: 100%;
	height: 1px;
	position: absolute;
	bottom: 0;
	pointer-events: none;
`;

export const GridList = props => {
	//const isRoot = props.promptState === PromptStates.ROOT;

	const containerPadding = 12;
	const itemGap = 12;
	const itemWidth = (680 - containerPadding * 2 - itemGap * (props.list.length - 1)) / props.list.length;

	//const itemHeight = 144 - containerPadding * 2;
	let itemHeight = Math.round((itemWidth * 9) / 16) + 6;
	let gridHeight = 94 + 12 + 12;

	if (props.scope.id === "command_create_tiles") {
		itemHeight = 120;
		gridHeight = itemHeight + 12 + 12;
	}

	// If there's results, listen for left and right arrow events
	React.useEffect(() => {
		const onKeyDown = e => {
			if (props.scope.id === "command_create_page") {
				if (e.key === "ArrowRight") {
					let i = props.selectedGridIndex + 1;
					if (i > props.list.length - 1) i = 0;

					props.onGeneratedPageContentClick(i, props.list[i]);

					e.preventDefault();
					e.stopPropagation();
				}
				if (e.key === "ArrowLeft") {
					//setSelectedIndex(s => (s - 1 < 0 ? 0 : s - 1));
					let i = props.selectedGridIndex - 1;
					if (i < 0) i = props.list.length - 1;

					props.onGeneratedPageContentClick(i, props.list[i]);

					e.preventDefault();
					e.stopPropagation();
				}
			}
			if (e.key === "Escape") {
				console.log("Grid results escape");
				props.hideGridResults();
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === "Enter") {
				console.log("Grid results Enter");
				//props.hideGridResults();

				// if selected is not loading, set content and reset prompt bar
				if (!props.list[props.selectedGridIndex].loading) {
					//props.onGeneratedPageContentClick(props.list[props.selectedGridIndex]);
				}

				props.onScopedDoneClick();

				e.preventDefault();
				e.stopPropagation();
			}
		};
		if (props.list.length !== 0) {
			document.body.addEventListener("keydown", onKeyDown);
		}
		return function cleanup() {
			document.body.removeEventListener("keydown", onKeyDown);
		};
	}, [props.selectedGridIndex, props.list]);

	const hideGrid = props.gridListHistory.length > 0;

	const historyHeight = 344;
	const showDivider = props.list.length > 0 || props.gridListHistory.length > 0;
	return (
		<GridWrap
			key="grid_list_container"
			id="grid_list_container"
			style={{
				position: "absolute",
				width: "100%",
				height: 344,
				bottom: 68 + 42,
			}}
			initial={false}
			animate={{
				y: hideGrid ? 53 : 0,
			}}
			transition={props.transitions.morph}

			// initial={false}
			// animate={{
			// 	height: hideGrid ? historyHeight : gridHeight,
			// }}
			// transition={props.transitions.morph}
		>
			<Divider
				style={{
					backgroundColor: props.theme.colors.promptbar.divider,
				}}
				initial={false}
				animate={{
					opacity: showDivider ? 1 : 0,
					height: showDivider ? 1 : 0,
				}}
				transition={props.promptState === PromptStates.ROOT ? tDividerShow : tDividerHide}
			/>

			<AnimatePresence mode="popLayout">
				{hideGrid && (
					<motion.div
						key="gridResultsHistory"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={props.transitions.morph}
					>
						<GridListHistory
							theme={props.theme}
							list={props.gridListHistory}
							itemWidth={itemWidth}
							itemHeight={itemHeight}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence mode="popLayout">
				{!hideGrid && (
					<motion.div
						key="gridResults4up"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={props.transitions.morph}
					>
						<Grid
							style={{
								gap: itemGap,
								padding: containerPadding,
								height: gridHeight,
								width: 680,
								pointerEvents: hideGrid ? "none" : "auto",
							}}
						>
							<AnimatePresence mode="popLayout">
								{props.list.map((item, i) => (
									<GridListItem
										key={item.id}
										item={item}
										i={i}
										theme={props.theme}
										isSelected={props.selectedGridIndex === i}
										onGeneratedPageContentClick={props.onGeneratedPageContentClick}
										onDrop={
											props.scope.id === "command_create_tiles"
												? props.onGeneratedTileDrop
												: props.onGeneratedPageDrop
										}
										onTextClick={props.onTextClick}
										width={itemWidth}
										height={itemHeight}
										itemDragging={props.itemDragging}
										setItemDragging={props.setItemDragging}
										promptbarContainerRef={props.promptbarContainerRef}
										onGenerateMorePagesLikeThis={props.onGenerateMorePagesLikeThis}
										scope={props.scope}
										onGeneratedTileClick={props.onGeneratedTileClick}
									/>
								))}
							</AnimatePresence>
						</Grid>
					</motion.div>
				)}
			</AnimatePresence>
		</GridWrap>
	);
};

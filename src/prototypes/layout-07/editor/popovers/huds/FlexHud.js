import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { Anchor, PopoverContext } from "../PopoverContext";
import { HudButton, hudButtonTypes } from "../../../ds/button/HudButton";
import { Panels } from "../panels/panels";

import {
	backgrounds,
	containerSize,
	contentDirection,
	containerWidthOptions,
	containerHeightOptions,
	contentDistribute,
	contentAlignXOptions,
	contentAlignYOptions,
	tileTypes,
} from "../../../tome/TileData";
import { HudDivider } from "../../../ds/hud/HudDivider";
import { HudLabel } from "../../../ds/hud/HudLabel";

export const FlexHud = props => {
	const { setContentDirection, setTileWidthType, setTileHeightType, getCurrentPage, tomeData, saveState } =
		React.useContext(TomeContext);
	const { tileMotionValues, selectParent } = React.useContext(EditorContext);
	const { togglePanel, panel, toggleMenu, menu, hidePanel, toggleColorPanel, colorPanel, showColorPanel } =
		React.useContext(PopoverContext);

	const { tile, hudRef } = props;

	const alignXIcon = contentAlignXOptions.find(o => o.value === tile.layout.alignX).icon;
	const alignYIcon = contentAlignYOptions.find(o => o.value === tile.layout.alignY).icon;
	let alignIcon = alignXIcon;
	if (tile.layout.direction === contentDirection.HORIZONTAL) {
		alignIcon = alignYIcon;
	}
	if (tile.layout.distribute !== contentDistribute.NONE) alignIcon += "Distributed";

	let widthIcon = containerWidthOptions.find(o => o.value === tile.layout.width.type).icon;
	let heightIcon = containerHeightOptions.find(o => o.value === tile.layout.height.type).icon;

	let widthTooltip = "Fill";
	if (tile.layout.width.type === containerSize.CUSTOM) {
		widthTooltip = "Custom";
	}
	if (tile.layout.width.type === containerSize.HUG) {
		widthTooltip = "Fit";
	}

	let heightTooltip = "Fill";
	if (tile.layout.height.type === containerSize.CUSTOM) {
		heightTooltip = "Custom";
	}
	if (tile.layout.height.type === containerSize.HUG) {
		heightTooltip = "Fit";
	}

	const rootContainerId = getCurrentPage().tiles[0].id;

	let directionIcon = "";
	let directionTooltip = "";
	if (tile.layout.direction === contentDirection.VERTICAL) {
		directionIcon = "ArrowDown";
		directionTooltip = "Vertical";
	}
	if (tile.layout.direction === contentDirection.HORIZONTAL) {
		directionIcon = "ArrowRight";
		directionTooltip = "Horizontal";
	}
	if (tile.layout.direction === contentDirection.HORIZONTAL_WRAP) {
		directionIcon = "Return";
		directionTooltip = "Horizontal wrapping";
	}

	let bgColor = "#ffffff";
	if (tile.background.type === backgrounds.COLOR) bgColor = tile.background.value;
	const [backgroundColor, setBackgroundColor] = React.useState(bgColor);

	const updateBackgroundColor = v => { console.log("set bg color"); setBackgroundColor(v); };

	/*
	if (rootContainerId === tile.id) {
		typeLabel = "Page";
		panelType = Panels.PAGE.type;
		panelComponent = Panels.PAGE;	
	}
	*/

	return (
		<>
			{/* {rootContainerId !== tile.id && (
				<>
					<HudButton
						type={hudButtonTypes.UP}
						onTap={e => {
							selectParent();
							e.stopPropagation();
						}}
					/>
					<HudDivider />
				</>
			)} */}

			{/* <HudLabel>{typeLabel}</HudLabel> */}

			<HudButton
				type={hudButtonTypes.ICON}
				iconName={directionIcon}
				onTap={e => {
					togglePanel(null, e);
					if (tile.layout.direction === contentDirection.VERTICAL) {
						setContentDirection(tile, contentDirection.HORIZONTAL);
					} else {
						setContentDirection(tile, contentDirection.VERTICAL);
					}

					e.stopPropagation();
				}}
				tooltip={"Direction"}
				tooltipShortcut={[directionTooltip]}
			/>

			{rootContainerId !== tile.id && (
				<>
					<HudButton
						type={hudButtonTypes.ICON}
						iconName={widthIcon}
						onTap={e => {
							togglePanel(null, e);
							let newSize = containerSize.FILL;
							if (tile.layout.width.type === containerSize.FILL) newSize = containerSize.HUG;
							setTileWidthType(tile, newSize);
							e.stopPropagation();
						}}
						tooltip={"Width"}
						tooltipShortcut={[widthTooltip]}
						tooltipHideOnClick={false}
					/>
					<HudButton
						type={hudButtonTypes.ICON}
						iconName={heightIcon}
						onTap={e => {
							togglePanel(null, e);
							let newSize = containerSize.FILL;
							if (tile.layout.height.type === containerSize.FILL) newSize = containerSize.HUG;
							setTileHeightType(tile, newSize);
							e.stopPropagation();
						}}
						tooltip={"Height"}
						tooltipShortcut={[heightTooltip]}
						tooltipHideOnClick={false}
					/>
				</>
			)}

			{/* {rootContainerId !== tile.id && ( */}
			<HudButton
				type={tile.background.type === backgrounds.COLOR ? hudButtonTypes.COLOR : hudButtonTypes.ICON}
				color={tile.background.type === backgrounds.COLOR ? backgroundColor : undefined}
				iconName={tile.background.type === backgrounds.NONE ? "CircleDashedOutline" : undefined}
				active={colorPanel && colorPanel.type === Panels.BACKGROUND.type && !tomeData.editor.showPropertyPanel}
				onTap={e => {
					//togglePanel(Panels.BACKGROUND, e, tile, {});
					//toggleColorPanel(Panels.BACKGROUND, e.target, Anchor.toolbar);

					hidePanel();

					toggleColorPanel(
						Panels.BACKGROUND,
						document.getElementById("properties-hud"),
						Anchor.right,
						backgroundColor,
						updateBackgroundColor,
						"hud-button-toggle-background-color"
					);

					// if (!tomeData.editor.showPropertyPanel) {
					// 	toggleColorPanel(Panels.BACKGROUND, document.getElementById("properties-hud"), Anchor.right);
					// } else {
					// 	showColorPanel(Panels.BACKGROUND, document.getElementById("properties-hud"), Anchor.right);
					// }

					if (tomeData.editor.showPropertyPanel) {
						tomeData.editor.showPropertyPanel = false;
						saveState();
					}

					e.stopPropagation();
				}}
				tooltip={"Background"}
			/>
			{/* )} */}

			{/* {rootContainerId === tile.id && (
				<HudButton
					type={hudButtonTypes.COLOR}
					color={tileMotionValues.current[tile.id].backgroundColor}
					active={colorPanel && colorPanel.type === Panels.BACKGROUND.type}
					onTap={e => {
						toggleColorPanel(Panels.BACKGROUND, e, tile, {});
						e.stopPropagation();
					}}
					tooltip={"Background"}
				/>
			)} */}

			{/* <HudButton
				iconName={alignIcon}
				active={panel && panel.type === Panels.ALIGNMENT.type}
				onTap={e => {
					togglePanel(Panels.ALIGNMENT, e, tile, hudRef);
					e.stopPropagation();
				}}
			/> */}

			<HudButton
				type={hudButtonTypes.ICON}
				iconName="Preferences"
				// active={panel && panel.type === panelType}
				active={tomeData.editor.showPropertyPanel}
				onTap={e => {
					hidePanel();

					tomeData.editor.showPropertyPanel = !tomeData.editor.showPropertyPanel;
					saveState();

					//togglePropertyPanel();
					// togglePanel(panelComponent, e, tile, hudRef);

					e.stopPropagation();
				}}
				tooltip={"Settings"}
			/>
		</>
	);
};

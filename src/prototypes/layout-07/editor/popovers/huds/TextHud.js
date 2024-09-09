import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { PopoverContext } from "../PopoverContext";

import { HudButton, hudButtonTypes } from "../../../ds/button/HudButton";
import { HudDivider } from "../../../ds/hud/HudDivider";

import { Panels } from "../panels/panels";

export const TextHud = props => {
	const { tomeData, saveState } = React.useContext(TomeContext);

	const { setInputFocused } = React.useContext(EditorContext);

	const { hidePanel } = React.useContext(PopoverContext);
	const { tile } = props;

	return (
		<>
			{/* <HudButton
				type={hudButtonTypes.UP}
				onTap={e => {
					selectParent();
					e.stopPropagation();
				}}
			/> */}

			{/* <HudDivider /> */}

			{/* <HudLabel>Text</HudLabel> */}

			<HudButton
				type={hudButtonTypes.LABEL}
				label="Body"
				onTap={e => {
					e.stopPropagation();
				}}
				tooltip={"Styles"}
			/>

			<HudDivider />
			<HudButton
				type={hudButtonTypes.NUMBER_INPUT}
				setInputFocused={setInputFocused}
				value={20}
				onTap={e => {
					e.stopPropagation();
				}}
			/>

			<HudDivider />

			<HudButton
				type="fontColor"
				color={"var(--t9)"}
				onTap={e => {
					e.stopPropagation();
				}}
				tooltip={"Color"}
			/>

			<HudButton
				type={hudButtonTypes.ICON}
				iconName="AlignLeft"
				onTap={e => {
					e.stopPropagation();
				}}
				tooltip={"Alignment"}
			/>

			{tile.focused && false && (
				<>
					<HudDivider />

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="ListBullet"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Bullet list"}
					/>

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="ListNumber"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Number list"}
					/>

					<HudDivider />

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="Bold"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Bold"}
					/>

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="Italic"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Italic"}
					/>

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="Strikethrough"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Strikethrough"}
					/>

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="Code"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Code"}
					/>

					<HudDivider />

					<HudButton
						type={hudButtonTypes.ICON}
						iconName="Link"
						onTap={e => {
							e.stopPropagation();
						}}
						tooltip={"Link"}
					/>

					<HudDivider />
				</>
			)}

			{/* <HudButton
				iconName={widthIcon}
				onTap={e => {
					togglePanel(null, e);
					let newSize = containerSize.FILL;
					if (tile.layout.width.type === containerSize.FILL) newSize = containerSize.HUG;
					setTileWidthType(tile, newSize);
					e.stopPropagation();
				}}
			/> */}

			{/* <HudButton
				iconName={heightIcon}
				onTap={e => {
					togglePanel(null, e);
					let newSize = containerSize.FILL;
					if (tile.layout.height.type === containerSize.FILL) newSize = containerSize.HUG;
					setTileHeightType(tile, newSize);
					e.stopPropagation();
				}}
			/> */}

			{/* <HudButton
				iconName="DoubleSparkle"
				onTap={e => {
					e.stopPropagation();
				}}
			/> */}

			<HudButton
				type={hudButtonTypes.ICON}
				//active={panel && panel.type === Panels.TEXT.type}
				active={tomeData.editor.showPropertyPanel}
				onTap={e => {
					//togglePanel(Panels[tile.type], e, tile, hudRef);

					hidePanel();
					tomeData.editor.showPropertyPanel = !tomeData.editor.showPropertyPanel;
					saveState();
					e.stopPropagation();
				}}
				tooltip={"Settings"}
				iconName="Preferences"
			/>
		</>
	);
};

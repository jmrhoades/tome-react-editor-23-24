import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { HudButton } from "../../ds/button/HudButton";
import { Panels } from "../panels/Panels";
import { alignYOptions, alignXOptions } from "../menus/alignOptions";
import { FlexHudAlignmentMenu } from "../hudMenus/FlexHudAlignmentMenu";
import { FlexHudGapMenu } from "../hudMenus/FlexHudGapMenu";
import { RGBToHex } from "../../tome/TomeContext";
import { ColorPresetsMenu } from "../menus/ColorPresetsMenu";
import { FlexHudWidthMenu } from "../hudMenus/FlexHudWidthMenu";
import { Menus } from "../menus/menus";
import { isUnit } from "../logic/utilities";

export const FlexHud = props => {
	const { setTileLayoutDirection, setTileAutoSize } = React.useContext(TomeContext);
	const { togglePanel, toggleMenu, panel, menu } = React.useContext(EditorContext);
	const { tile } = props;

	//const alignYIcon = alignYOptions.find(o => o.value === tile.layout.justifyContent).icon;
	//const alignXIcon = alignXOptions.find(o => o.value === tile.layout.alignItems).icon;

	const alignXIcon = "AlignLeft";

	

	const [alignMenuOpen, setAlignMenuOpen] = React.useState(false);
	const toggleAlignmentMenu = e => {
		setAlignMenuOpen(!alignMenuOpen);

		togglePanel(null, e);
		setGapMenuOpen(false);
		setColorPresetsMenuOpen(false);
	};

	const [widthMenuOpen, setWidthMenuOpen] = React.useState(false);
	const toggleWidthMenu = e => {
		setWidthMenuOpen(!widthMenuOpen);

		togglePanel(null, e);
		//setAlignMenuOpen(false);
		//setColorPresetsMenuOpen(false);

		toggleMenu(Menus.CONTENT_WIDTH, e, tile);
	};

	const [heightMenuOpen, setHeightMenuOpen] = React.useState(false);
	const toggleHeightMenu = e => {
		setHeightMenuOpen(!heightMenuOpen);

		togglePanel(null, e);
		//setAlignMenuOpen(false);
		//setColorPresetsMenuOpen(false);

		toggleMenu(Menus.CONTENT_HEIGHT, e, tile);
	};

	const [gapMenuOpen, setGapMenuOpen] = React.useState(false);
	const toggleGapMenu = e => {
		setGapMenuOpen(!gapMenuOpen);
		togglePanel(null, e);
	};

	const [colorPresetsMenuOpen, setColorPresetsMenuOpen] = React.useState(false);
	const toggleColorPresetsMenu = e => {
		setColorPresetsMenuOpen(!colorPresetsMenuOpen);

		//setAlignMenuOpen(false);
		//setGapMenuOpen(false);

		togglePanel(null, e);
		toggleMenu(Menus.COLOR_PRESETS, e, tile);
	};

	const toggleSettingsPanel = e => {
		//setWidthMenuOpen(false);
		//setAlignMenuOpen(false);
		//setGapMenuOpen(false);

		toggleMenu(null, e);
		togglePanel(Panels.FLEX_SETTINGS, e, tile, {});
	};

	let tileBackgroundColor = tile.theme.tokens["backgroundColor"]
		? tile.theme.tokens["backgroundColor"]
		: "transparent";

	// if (tile.layout.backgroundColor || tile.theme) {

	// 	tile.theme.tokens["backgroundColor"] = v;

	// 	const el = document.getElementById(tile.id);
	// 	if (el) {
	// 		const style = getComputedStyle(el);
	// 		const bgColor = style.getPropertyValue("background-color");
	// 		tileBackgroundColor = RGBToHex(bgColor);
	// 	}
	// }

	let widthUnit = isUnit(tile.layout.width);
	let heightUnit = isUnit(tile.layout.height);

	return (
		<>
			<HudButton
				iconName={"DoubleSparkle"}
				onTap={e => {
					e.stopPropagation();
				}}
			/>

			<HudButton
				type="color"
				color={tileBackgroundColor}
				onTap={e => {
					toggleColorPresetsMenu(e);
					e.stopPropagation();
				}}
				tile={tile}
				active={colorPresetsMenuOpen}
			/>

			<HudButton
				iconName={
					tile.layout.width === "auto" || tile.layout.width === "min-content" || tile.layout.width === "hug"
						? "ChevronLeftRightIn"
						: widthUnit === "px"
						? "FixedWidth"
						: "ArrowLeftRightOut"
				}
				onTap={e => {
					togglePanel(null, e);
					toggleMenu(Menus.CONTENT_WIDTH, e, tile);
					e.stopPropagation();
				}}
				tile={tile}
				active={menu && menu.type === Menus.CONTENT_WIDTH.type}
			/>

			<HudButton
				iconName={
					tile.layout.height === "auto" || tile.layout.height === "hug"
						? "ChevronUpDownIn"
						: heightUnit === "px"
						? "FixedHeight"
						: "ArrowUpDown"
				}
				onTap={e => {
					togglePanel(null, e);
					toggleMenu(Menus.CONTENT_HEIGHT, e, tile);
					e.stopPropagation();
				}}
				tile={tile}
				active={menu && menu.type === Menus.CONTENT_HEIGHT.type}
			/>

			{/* <HudButton
				iconName={tile.layout.direction === "vertical" ? "ArrowDown" : "ArrowRight"}
				onTap={e => {
					setAlignMenuOpen(false);
					setGapMenuOpen(false);
					setTileLayoutDirection(tile, tile.layout.direction === "vertical" ? "horizontal" : "vertical");
					e.stopPropagation();
				}}
			/> */}

			{/* <HudButton
				iconName={alignXIcon}
				//menu={FlexHudAlignmentMenu}
				//menuItemCallBack={() => setAlignMenuOpen(false)}
				active={alignMenuOpen}
				onTap={e => {
					toggleAlignmentMenu(e);
					e.stopPropagation();
				}}
				tile={tile}
			/> */}

			{/* <HudButton
				iconName={tile.layout.direction === "horizontal" ? "ColumnGap" : "RowGap"}
				menu={FlexHudGapMenu}
				menuItemCallBack={() => setGapMenuOpen(false)}
				active={gapMenuOpen}
				onTap={e => {
					toggleGapMenu(e);
					e.stopPropagation();
				}}
				tile={tile}
			/> */}

			<HudButton
				iconName="Preferences"
				active={panel && panel.type === Panels.FLEX_SETTINGS.type}
				onTap={e => {
					toggleSettingsPanel(e);
					e.stopPropagation();
				}}
			/>
		</>
	);
};

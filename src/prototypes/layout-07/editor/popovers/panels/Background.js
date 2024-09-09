import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { motion } from "framer-motion";

import { Label } from "../../../ds/Label";
import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { PopoverContext } from "../PopoverContext";

import { MenuButton } from "../../../ds/button/MenuButton";
import { menus } from "../menus/menus";
import { Section } from "../../../ds/panel/Section";
import { backgroundOptions, backgrounds } from "../../../tome/TileData";
import { Button } from "../../../ds/button/Button";
import { Icon } from "../../../ds/Icon";
import chroma from "chroma-js";
import { ColorButton } from "../../../ds/button/ColorButton";

export const Background = props => {
	const { setContainerBackgroundType, findTilesByKeyValue, getCurrentPage } = React.useContext(TomeContext);
	const { tileRefs, tileMotionValues } = React.useContext(EditorContext);
	const { toggleMenu } = React.useContext(PopoverContext);

	const currentPage = getCurrentPage();

	const selectedTiles = findTilesByKeyValue("selected", true);
	const tile = selectedTiles[0];

	//const [color, setColor] = React.useState(tile.background.value);

	const { value, onChange } = props.panel;

	const backgroundInfo = backgroundOptions.find(o => o.value === tile.background.type);

	const onChangeColor = color => {
		selectedTiles.forEach(tile => {
			if (tile.background.type !== backgrounds.COLOR) {
				tile.background.type = backgrounds.COLOR;
				setContainerBackgroundType(tile, backgrounds.COLOR);
			}
			const el = tileRefs.current[tile.id].current;
			el.style.setProperty(`--background-color-${tile.id}`, color);
			tile.background.value = color;
			tileMotionValues.current[tile.id].backgroundColor.set(color);
			onChange(color);
		});
	};

	let hexInputFieldClassName = "hexInputField";
	if (tile.background.type === backgrounds.NONE) hexInputFieldClassName += " disabled";

	// Generate 3, theme-aware backgrounds
	const bg = chroma(currentPage.theme.tokens["--page-color"]);
	const bgLuminosity = bg.luminance();
	const threshold = 0.7;
	const bgColors = [];
	const darken = bgLuminosity > threshold;
	if (darken) {
		const interval = 0.3;
		bgColors.push(bg.darken(interval * 1).hex());
		bgColors.push(bg.darken(interval * 2).hex());
		bgColors.push(bg.darken(interval * 3).hex());
	} else {
		const interval = 0.3;
		bgColors.push(bg.brighten(interval * 1).hex());
		bgColors.push(bg.brighten(interval * 1.5).hex());
		bgColors.push(bg.brighten(interval * 2).hex());
	}

	console.log("page color: ", bgLuminosity, bg.hex(), bgColors);

	return (
		<>
			<MenuButton menuType={menus.BACKGROUND} tile={tile}>
				{backgroundInfo.label}
			</MenuButton>

			<motion.div onPointerDownCapture={e => e.stopPropagation()}>
				<HexColorPicker color={value} onChange={onChangeColor} />
			</motion.div>

			<Section
				type="Column"
				style={{
					gap: "6px",
					opacity: tile.background.type === backgrounds.NONE ? 0.5 : 1,
				}}
			>
				<div className="hexInputFieldWrap">
					<HexColorInput
						color={value}
						onChange={onChangeColor}
						className={hexInputFieldClassName}
						onPointerDownCapture={e => e.stopPropagation()}
						onKeyDown={e => {
							e.stopPropagation();
						}}
					/>
				</div>
				<Button>
					<Icon name="Add" />
				</Button>
			</Section>

			<Section>
				<Label>Backgrounds</Label>
				<Section type={"Flex"}>
					{bgColors.map((o, i) => (
						<ColorButton
							key={i}
							value={o}
							onTap={e => {
								onChangeColor(o);
							}}
							size={16}
						/>
					))}
				</Section>
			</Section>
		</>
	);
};

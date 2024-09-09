import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";

export const ColorPresetsMenu = props => {
	const { setTileBackgroundColor } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;
	
	return (
		<>
			{PresetColorOptions.map(o => (
				<MenuItem
					key={o.id}
					colorSwatch={o.value}
					label={o.label}
					onTap={e => {
						setTileBackgroundColor(tile, o.value);
						toggleMenu(false, e);
					}}
					//checked={o.value === tile.layout.aspectRatio.value}
				/>
			))}
			<MenuItem label={"Custom…"} />
		</>
	);
};

export const PresetColorOptions = [
	{
		id: "Red",
		label: "Red",
		value: "#F44737",
	},
	{
		id: "Yellow",
		label: "Yellow",
		value: "#FDDA4D",
	},
	{
		id: "Mint",
		label: "Mint",
		value: "#A3CEB2",
	},
	{
		id: "Blue",
		label: "Blue",
		value: "#339DFF",
	},
	{
		id: "Purple",
		label: "Purple",
		value: "#A77EFF",
	},
	{
		id: "Sand",
		label: "Sand",
		value: "#C6864B",
	},
];




/*

export const ColorPresetsMenu = props => {
	const { anchorRef, tile } = props;

	const { setTileBackgroundColor } = React.useContext(TomeContext);

	const colorList = [Red, Yellow, Mint, Blue, Purple, Sand, White, Black];

	return (
		<HudMenu anchorRef={anchorRef} tile={tile}>
			<Row>
				{colorList.map(c => (
					<ColorButton
						color={c.hex}
						key={c.label}
						onTap={e => {
							setTileBackgroundColor(tile, c.hex);
							e.stopPropagation();
							e.preventDefault();
						}}
						padding={"8px"}
					/>
				))}
			</Row>
		</HudMenu>
	);
};
*/

// const Row = styled.div`
// 	display: grid;
// 	grid-auto-flow: column;
// 	grid-auto-columns: auto;
// `;

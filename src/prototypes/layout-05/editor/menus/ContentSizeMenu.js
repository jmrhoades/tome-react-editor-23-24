import React from "react";

import { TomeContext } from "../../tome/TomeContext";
import { EditorContext, isUnit } from "../EditorContext";
import { MenuItem } from "../../ds/menu/MenuItem";

export const ContentWidthMenu = props => {
	const { setTileWidth } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;
	const unit = isUnit(tile.layout.width);

	//console.log(tile.layout.width)

	return (
		<>
			{contentWidthOptions.map(o => (
				<MenuItem
					key={o.id}
					//label={unit === "px" && o.id === "customWidth" ? parseInt(tile.layout.width) : o.label}
					label={o.label}
					icon={o.icon}
					onTap={e => {
						setTileWidth(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={(unit === "px" && o.id === "customWidth") || o.value === tile.layout.width}
					//disabledLabel={unit === "px" && o.id === "customWidth"}
					//disabled={unit !== "px" && o.id === "customWidth"}
					leadingIcon={o.icon}
				/>
			))}
		</>
	);
};

export const ContentHeightMenu = props => {
	const { setTileHeight } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.menu.tile;
	const unit = isUnit(tile.layout.height);

	console.log(tile.layout.height)

	return (
		<>
			{contentHeightOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						setTileHeight(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={(unit === "px" && o.id === "customHeight") || (tile.layout.height === "fill" && o.id === "fillHeight") || o.value === tile.layout.height}
					disabled={o.disabled}
					leadingIcon={o.icon}
				/>
			))}
		</>
	);
};

export const contentWidthOptions = [
	{
		id: "fillWidth",
		label: "Fill",
		value: "fill",
		icon: "ArrowLeftRightOut",
	},
	{
		id: "hugWidth",
		label: "Hug",
		value: "hug",
		icon: "ChevronLeftRightIn",
	},

	{
		id: "customWidth",
		label: "Custom",
		value: "fixed",
		icon: "FixedWidth",
	},
];

export const contentHeightOptions = [
	{
		id: "fillHeight",
		label: "Fill",
		value: "fill",
		icon: "ArrowUpDown",
	},
	{
		id: "hugHeight",
		label: "Hug",
		value: "hug",
		icon: "ChevronUpDownIn",
	},

	{
		id: "customHeight",
		label: "Custom",
		value: "fixed",
		icon: "FixedHeight",
	},
];

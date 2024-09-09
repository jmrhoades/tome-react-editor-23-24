import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { EditorContext } from "../../EditorContext";
import { MenuItem } from "../../../ds/menu/MenuItem";
import { isUnit } from "../../logic/utilities";
import { PopoverContext } from "../PopoverContext";

export const ContentWidthMenu = props => {
	const { setTileWidthType, setTileWidthValue } = React.useContext(TomeContext);
	const { tileMotionValues } = React.useContext(EditorContext);
	const { toggleMenu } = React.useContext(PopoverContext);

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
						if (o.value === "custom") {
							const v = tileMotionValues.current[tile.id].width.get();
							setTileWidthValue(tile, v);
						}

						setTileWidthType(tile, o.value);

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
	const { setTileHeightType, setTileHeightValue } = React.useContext(TomeContext);
	const { toggleMenu, tileMotionValues } = React.useContext(EditorContext);

	const tile = props.menu.tile;
	const unit = isUnit(tile.layout.height);

	console.log(tile.layout.height);

	return (
		<>
			{contentHeightOptions.map(o => (
				<MenuItem
					key={o.id}
					label={o.label}
					onTap={e => {
						if (o.value === "custom") {
							const v = tileMotionValues.current[tile.id].height.get();
							setTileHeightValue(tile, v);
						}
						setTileHeightType(tile, o.value);
						toggleMenu(false, e);
					}}
					checked={
						(unit === "px" && o.id === "customHeight") ||
						(tile.layout.height === "fill" && o.id === "fillHeight") ||
						o.value === tile.layout.height
					}
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
		label: "Fixed",
		value: "custom",
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
		label: "Fixed",
		value: "custom",
		icon: "FixedHeight",
	},
];

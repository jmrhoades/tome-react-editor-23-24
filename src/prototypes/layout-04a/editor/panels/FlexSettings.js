import React from "react";

import { Field } from "../../ds/field/Field";
import { DropDownLabel, Label } from "../../ds/Label";
import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "../EditorContext";
import { MenuButton } from "../../ds/button/MenuButton";
import { Menus } from "../menus/menus";
import { Icon } from "../../ds/Icon";
import { Switch } from "../../ds/button/Switch";
import { LabelButton } from "../../ds/button/LabelButton";
import { SectionTitle } from "../../ds/panel/SectionTitle";
import { Section } from "../../ds/panel/Section";
import { SegmentedControl } from "../../ds/segmented/SegmentedControl";
import { LayoutTypeOptions } from "../menus/LayoutTypesMenu";
import { LayoutAlignContentOptions } from "../menus/AlignContentOptions";
import { LayoutJustifyContentOptions } from "../menus/JustifyContentOptions";
import { contentDirectionOptions } from "../menus/ContentDirectionMenu";
import { contentWidthOptions, contentHeightOptions } from "../menus/ContentSizeMenu";
import { AlignmentGrid } from "../../ds/button/AlignmentGrid";
import { alignXOptions, alignYOptions } from "../menus/alignOptions";
import { flexBasisOptions } from "../menus/flexBasisOptions";
import { ColorField } from "../../ds/field/ColorField";
import { RGBToHex } from "../../tome/TomeContext";

export const FlexSettings = props => {
	const {
		setTileGap,
		setTileBorderRadius,
		setTilePadding,
		setTileLayoutDirection,
		setTileLayoutJustifyContent,
		setTileLayoutAlignItems,
		setTileLayoutFlexBasis,
		setTileLayoutSizing,
	} = React.useContext(TomeContext);

	const { toggleMenu } = React.useContext(EditorContext);

	const tile = props.panel.tile;

	//const aspectRatioLabel = currentPage.layout.aspectRatio.label;
	//const layoutLabel = LayoutTypeOptions.find(o => o.value === tile.layout.type).label;

	//const alignContentLabel = LayoutAlignContentOptions.find(o => o.value === tile.layout.alignItems).label;
	//const justifyContentLabel = LayoutJustifyContentOptions.find(o => o.value === tile.layout.justifyContent).label;

	//const directionLabel = contentDirectionOptions.find(o => o.value === tile.layout.direction).label;
	//const directionIcon = contentDirectionOptions.find(o => o.value === tile.layout.direction).icon;

	let widthLabel = contentWidthOptions.find(o => o.value === tile.layout.width);
	if (widthLabel) {
		widthLabel = widthLabel.label;
	} else {
		widthLabel = tile.layout.width;
	}

	let heightLabel = contentHeightOptions.find(o => o.value === tile.layout.height);
	if (heightLabel) {
		heightLabel = heightLabel.label;
	} else {
		heightLabel = tile.layout.height;
	}

	let tileBackgroundColor = "transparent";
	if (tile.layout.backgroundColor || tile.theme) {
		const el = document.getElementById(tile.id);
		if (el) {
			const style = getComputedStyle(el);
			const bgColor = style.getPropertyValue("background-color");
			tileBackgroundColor = RGBToHex(bgColor);
		}
	}

	return (
		<>
			<SectionTitle>Direction</SectionTitle>
			<Section>
				<SegmentedControl
					options={contentDirectionOptions}
					value={tile.layout.direction}
					submit={v => setTileLayoutDirection(tile, v)}
				/>
			</Section>

			{/* <Label onTap={e => toggleMenu(Menus.LAYOUT_TYPES, e, tile)}>
				<DropDownLabel>Layout</DropDownLabel>
				<MenuButton menuType={Menus.LAYOUT_TYPES} tile={tile}>
					{layoutLabel}
				</MenuButton>
			</Label> */}

			{/* <SectionTitle>Size</SectionTitle> */}
			{/* <SegmentedControl
				options={flexBasisOptions}
				value={tile.layout.flexBasis}
				submit={v => setTileLayoutFlexBasis(tile, v)}
			/> */}

			{/* <Section type={"EvenColumn"}>
				<Label type="rowCentered" onTap={e => toggleMenu(Menus.CONTENT_WIDTH, e, tile)}>
					<Icon name={"ArrowLeftRightOut"} size={20} />
					<MenuButton menuType={Menus.CONTENT_AUTO_SIZE}>{widthLabel}</MenuButton>
				</Label>
				<Label type="rowCentered" onTap={e => toggleMenu(Menus.CONTENT_HEIGHT, e, tile)}>
					<Icon name={"ArrowUpDown"} size={20} />
					<MenuButton menuType={Menus.CONTENT_AUTO_SIZE}>{heightLabel}</MenuButton>
				</Label>
			</Section> */}

			<SectionTitle>Padding</SectionTitle>
			<Section>
				<Label type="rowCentered">
					<Icon name={"PaddingX"} size={20} />
					<Field
						value={props.panel.tile.layout.padding.x}
						submit={v => {
							setTilePadding(props.panel.tile, "x", v);
						}}
					/>
				</Label>
				<Label type="rowCentered">
					<Icon name={"PaddingY"} size={20} />
					<Field
						value={props.panel.tile.layout.padding.y}
						submit={v => setTilePadding(props.panel.tile, "y", v)}
					/>
				</Label>
			</Section>

			{/* <SectionTitle>Gap size</SectionTitle>
			<Section type={"Grid_2x1"}>
				<Label type="rowCentered">
					<Icon name={tile.layout.direction === "horizontal" ? "ColumnGap" : "RowGap"} size={20} />
					<Field value={tile.layout.gap} submit={v => setTileGap(tile, v)} />
				</Label>
			</Section> */}

			<SectionTitle>Corner radius</SectionTitle>
			<Section type={"Grid_2x1"}>
				<Label type="rowCentered">
					<Icon name={"BorderRadius"} size={20} />
					<Field
						value={props.panel.tile.layout.borderRadius}
						submit={v => setTileBorderRadius(props.panel.tile, v)}
					/>
				</Label>
			</Section>

			<SectionTitle>Background</SectionTitle>
			<ColorField tile={tile} value={tileBackgroundColor} />

			{/* <Section type={"Grid_2x1"}>
				<Section type={"horizontal"}>
					<SectionTitle>Alignment</SectionTitle>
					<AlignmentGrid
						tile={tile}
						direction={tile.layout.direction}
						onTap={v => {
							console.log("set alignment", v);
						}}
					/>
				</Section>
				<Section type={"horizontal"}>
					<SectionTitle>Spacing</SectionTitle>
					<Label type="rowCentered">
						<Icon name={tile.layout.direction === "horizontal" ? "ColumnGap" : "RowGap"} size={20} />
						<Field value={tile.layout.gap} submit={v => setTileGap(tile, v)} />
					</Label>
				</Section>
			</Section> */}

			{/* <SectionTitle>Alignment</SectionTitle>
			<Section type={"horizontal"}>
				<SegmentedControl
					options={alignXOptions}
					value={tile.layout.alignItems}
					submit={v => setTileLayoutAlignItems(tile, v)}
				/>

				<SegmentedControl
					options={alignYOptions}
					value={tile.layout.justifyContent}
					submit={v => setTileLayoutJustifyContent(tile, v)}
				/>
			</Section> */}

			{/* 				
				<Label
					type="RowHugControlRightAligned"
					onTap={e => {
						tile.layout.autoSpacing = !tile.layout.autoSpacing;
						let auto = tile.layout.autoSpacing;
						let v = auto ? "space-between" : "start";
						if (tile.layout.direction === "horizontal") {
							setTileLayoutAlignItems(tile, v);
						} else {
							setTileLayoutJustifyContent(tile, v);
						}

						e.stopPropagation();
					}}
				>
					<DropDownLabel>Auto</DropDownLabel>
					<Switch on={tile.layout.autoSpacing} small />
				</Label>  */}
		</>
	);
};

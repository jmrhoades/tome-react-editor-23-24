import React from "react";

import { Field } from "../../../ds/field/Field";
import { Label } from "../../../ds/Label";
import { TomeContext } from "../../../tome/TomeContext";
//import { EditorContext } from "..//EditorContext";
//import { LayoutTypeOptions } from "../menus/LayoutTypesMenu";
import { Icon } from "../../../ds/Icon";
import { SectionTitle } from "../../../ds/panel/SectionTitle";
import { Section } from "../../../ds/panel/Section";
import { SectionDivider } from "../../../ds/panel/SectionDivider";
import { SegmentedControl } from "../../../ds/segmented/SegmentedControl";
import {
	containerSize,
	contentDirection,
	contentDistribute,
	contentDirectionOptions,
	contentWrap,
	contentAlignXOptions,
	contentAlignYOptions,
	contentPaddingPresets,
	contentGapsPresets,
	contentBorderRadiusPresets,
} from "../../../tome/TileData";
import { Switch } from "../../../ds/button/Switch";
import { AlignmentGrid } from "../../../ds/button/AlignmentGrid";
import { LabelButton } from "../../../ds/button/LabelButton";
import { Button } from "../../../ds/button/Button";
import { IconButton } from "../../../ds/button/IconButton";
import { EditorContext } from "../../EditorContext";
import { Size } from "./controls/Size";
import { Padding } from "./controls/Padding";

export const Page = props => {
	const {
		setTileGap,
		setTileBorderRadius,
		setTilePadding,
		setTilePaddingX,
		setTilePaddingY,
		setTileWidthValue,
		setTileHeightValue,
		setContentDirection,
		setContentDistribute,
		setTileWidthType,
		setTileHeightType,
		setContentAlignment,
		setContentAlignX,
		setContentAlignY,
		getCurrentPage,
		findTileById,
	} = React.useContext(TomeContext);

	const { setInputFocused } = React.useContext(EditorContext);

	const tile = props.panel.tile;

	let spacingLabel = "Horizontal gap";
	let gapIcon = "GapHorizontal";

	if (tile.layout.direction === contentDirection.VERTICAL) {
		spacingLabel = "Vertical gap";
		gapIcon = "GapVertical";
	}

	return (
		<>
			{/* <Label onTap={e => toggleMenu(Menus.LAYOUT_TYPES, e, tile)}>
				<DropDownLabel>Layout</DropDownLabel>
				<MenuButton menuType={Menus.LAYOUT_TYPES} tile={tile} leadingIcon={layoutInfo.icon}>
					{layoutInfo.label}
				</MenuButton>
			</Label> */}

			<Section>
				<SectionTitle>Direction</SectionTitle>
				<SegmentedControl
					options={contentDirectionOptions}
					value={tile.layout.direction}
					submit={v => setContentDirection(tile, v)}
				/>
				<Label
					type="rowHugControl"
					onTap={e => {
						if (tile.layout.distribute !== contentDistribute.NONE) {
							setContentDistribute(tile, contentDistribute.NONE);
						} else {
							setContentDistribute(tile, contentDistribute.SPACE_BETWEEN);
						}
						e.stopPropagation();
					}}
				>
					<span style={{ fontSize: "11px" }}>Distribute content</span>
					<Switch on={tile.layout.distribute !== contentDistribute.NONE} small />
				</Label>
			</Section>

			<Section type="Row" style={{ gap: "6px" }}>
				<SectionTitle>Alignment</SectionTitle>
				<SegmentedControl
					options={contentAlignXOptions}
					value={tile.layout.alignX}
					submit={v => setContentAlignX(tile, v)}
				/>
				<SegmentedControl
					options={contentAlignYOptions}
					value={tile.layout.alignY}
					submit={v => setContentAlignY(tile, v)}
				/>
			</Section>

			{/* <AlignmentGrid
				tile={tile}
				parent={parent}
				direction={tile.layout.direction}
				onTap={v => {
					setContentAlignment(tile, v);
				}}
			/> */}

			<Section type="EvenColumn">
				<Section>
					<SectionTitle>{spacingLabel}</SectionTitle>
					<Field
						value={tile.layout.gap}
						submit={v => setTileGap(tile, v)}
						setInputFocused={setInputFocused}
						icon={gapIcon}
					/>
				</Section>

				<Section>
					<SectionTitle>Corner radius</SectionTitle>
					<Field
						value={tile.layout.borderRadius}
						submit={v => setTileBorderRadius(tile, v)}
						setInputFocused={setInputFocused}
						icon={"CornerRadius"}
					/>
				</Section>
			</Section>

			<Padding tile={tile} />
		</>
	);
};

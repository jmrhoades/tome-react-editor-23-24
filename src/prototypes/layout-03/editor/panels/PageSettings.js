import React from "react";

import { Field } from "../../ds/field/Field";
import { DropDownLabel, Label } from "../../ds/Label";
import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "..//EditorContext";
import { MenuButton } from "../../ds/button/MenuButton";
import { Menus } from "../menus/menus";
import { Icon } from "../../ds/Icon";
import { Switch } from "../../ds/button/Switch";
import { Section } from "../../ds/panel/Section";

export const PageSettings = props => {
	const { toggleMenu } = React.useContext(EditorContext);
	const {
		setTileMargin,
		setTileCentering,
		setTileScrolling,
		setTileFontSize,
		setTileAutoZoom,
		setTileWidth,
		setTileHeight,
		getCurrentPage,
	} = React.useContext(TomeContext);

	const currentPage = getCurrentPage();
	const aspectRatioLabel = currentPage.layout.aspectRatio.label;

	//const layoutLabel = LayoutTypeOptions.find(o => o.value === currentPage.layout.type).label;
	//const alignContentLabel = LayoutAlignContentOptions.find(o => o.value === currentPage.layout.alignContent).label;
	//const directionLabel = ContentDirectionOptions.find(o => o.value === currentPage.layout.direction).label;
	//const directionIcon = ContentDirectionOptions.find(o => o.value === currentPage.layout.direction).icon;

	return (
		<>
			{/* <Label onTap={e => toggleMenu(Menus.LAYOUT_TYPES, e, currentPage)}>
				<DropDownLabel>Layout</DropDownLabel>
				<MenuButton menuType={Menus.LAYOUT_TYPES} tile={currentPage}>
					{layoutLabel}
				</MenuButton>
			</Label>

			<SegmentedControl
				options={ContentDirectionOptions}
				value={currentPage.layout.direction}
				submit={v => setTileLayoutDirection(currentPage, v)}
			/>

			<SegmentedControl
				options={ContentSizingOptions}
				value={currentPage.layout.sizing}
				submit={v => setTileLayoutSizing(currentPage, v)}
			/>

			<Section>
				<Label type="rowCentered">
					<Icon name={currentPage.layout.direction === "column" ? "ColumnGap" : "RowGap"} size={20} />
					<Field value={currentPage.layout.gap} submit={v => setTileGap(currentPage, v)} />
				</Label>
				<Label type="rowCentered">
					<Icon name={"BorderRadius"} size={20} />
					<Field value={currentPage.layout.borderRadius} submit={v => setTileBorderRadius(currentPage, v)} />
				</Label>
			</Section>

			<Section>
				<Label type="rowCentered">
					<Icon name={"PaddingX"} size={20} />
					<Field value={currentPage.layout.padding.x} submit={v => setTilePadding(currentPage, "x", v)} />
				</Label>
				<Label type="rowCentered">
					<Icon name={"PaddingY"} size={20} />
					<Field value={currentPage.layout.padding.y} submit={v => setTilePadding(currentPage, "y", v)} />
				</Label>
			</Section>

			<SectionSpacer /> */}

			<Section>
				<Label onTap={e => toggleMenu(Menus.ASPECT_RATIOS, e, currentPage)}>
					<DropDownLabel>Aspect ratio</DropDownLabel>
					<MenuButton menuType={Menus.ASPECT_RATIOS}>{aspectRatioLabel}</MenuButton>
				</Label>
			</Section>
			<Section type={"Grid_2x3"}>
				<Label type="rowCentered">
					W
					<Field value={currentPage.layout.contentSize.width} submit={v => setTileWidth(currentPage, v)} />
				</Label>
				<Label type="rowCentered">
					H
					<Field value={currentPage.layout.contentSize.height} submit={v => setTileHeight(currentPage, v)} />
				</Label>
				<Label type="rowCentered">
					{/* <Icon name={"ArrowLeftRightIn"} size={20} /> */}
					X
					<Field value={currentPage.layout.margin.x} submit={v => setTileMargin(currentPage, "x", v)} />
				</Label>
				<Label type="rowCentered">
					{/* <Icon name={"ArrowUpDownIn"} size={20} /> */}
					Y
					<Field value={currentPage.layout.margin.y} submit={v => setTileMargin(currentPage, "y", v)} />
				</Label>
				<Label type="rowCentered">
					<Icon name={"TextSize"} size={20} />
					<Field value={currentPage.layout.font.bodySize} submit={v => setTileFontSize(currentPage, v)} />
				</Label>
			</Section>

			{/* <SectionTitle>Type scale</SectionTitle> */}
			<Section type={"Grid_2x1"}></Section>

			{/* <SectionTitle>Behaviors</SectionTitle> */}
			<Section type={"Row"}>
				<Label
					type="rowHugControl"
					onTap={e => {
						setTileAutoZoom(currentPage, !currentPage.layout.autoZoom);
						e.stopPropagation();
					}}
				>
					Auto zoom
					<Switch on={currentPage.layout.autoZoom} />
				</Label>

				<Label
					type="rowHugControl"
					onTap={e => {
						setTileCentering(currentPage, !currentPage.layout.centered);
						e.stopPropagation();
					}}
				>
					Auto center
					<Switch on={currentPage.layout.centered} />
				</Label>

				<Label
					type="rowHugControl"
					onTap={e => {
						setTileScrolling(currentPage, !currentPage.layout.scrolling);
						e.stopPropagation();
					}}
				>
					Allow scrolling
					<Switch on={currentPage.layout.scrolling} />
				</Label>
			</Section>
		</>
	);
};

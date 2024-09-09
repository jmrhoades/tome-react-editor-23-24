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
	mediaContentSizeOptions,
	tileTypes,
} from "../../../tome/TileData";

//import { AlignmentGrid } from "../../../ds/button/AlignmentGrid";
import { LabelButton } from "../../../ds/button/LabelButton";
import { Button } from "../../../ds/button/Button";
import { EditorContext } from "../../EditorContext";
import { Size } from "./controls/Size";
import { Padding } from "./controls/Padding";
import { Background } from "./controls/Background";
import { MenuButton } from "../../../ds/button/MenuButton";
import { ColorButtonField } from "../../../ds/field/ColorButtonField";
import { AlignmentGrid } from "../../../ds/button/AlignmentGrid";
import { Switch } from "../../../ds/button/Switch";

export const Properties = props => {
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
		setMediaContentSize,
		setTileFontSize,
		getCurrentPage,
		findTileById,
		findTilesByKeyValue,
	} = React.useContext(TomeContext);

	const { setInputFocused } = React.useContext(EditorContext);

	const selectedTiles = findTilesByKeyValue("selected", true);

	// One tile or many?
	const isMultiselection = selectedTiles.length > 1;
	let tile = selectedTiles[0];
	if (isMultiselection) {
		//tile = props.panel.tile[0];
	}

	let sameType = true;
	if (isMultiselection) {
		let currentType = selectedTiles[0].type;
		selectedTiles.forEach(t => {
			if (t.type !== currentType) sameType = false;
			currentType = t.type;
		});
	}

	const parent = findTileById(tile.parentId);

	const type = tile ? tile.type : false;

	//const parent = findTileById(tile.parentId);
	//const fieldWidth = 42;

	const currentPage = getCurrentPage();
	const isRootContainer = tile ? tile.id === currentPage.tiles[0].id : false;
	

	let spacingLabel = "Horizontal gap";
	let gapIcon = "GapHorizontal";

	if (tile && tile.layout.direction === contentDirection.VERTICAL) {
		spacingLabel = "Vertical gap";
		gapIcon = "GapVertical";
	}

	//console.log(type);

	const palStyle = {
		flexDirection: "column",
		fontSize: "11px",
		flexGrow: 1,
		flexBasis: 1,
		flexShrink: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: "7px",
		paddingBottom: "7px",
		gap: "2px",
	};

	return (
		<>
			{type === tileTypes.FLEX && sameType && (
				<>
					<Section>
						<SectionTitle>Direction</SectionTitle>
						<SegmentedControl
							options={contentDirectionOptions}
							value={tile.layout.direction}
							submit={v => setContentDirection(tile, v)}
						/>
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

					<Section
						style={{
							position: "relative",
						}}
					>
						<SectionTitle>{spacingLabel}</SectionTitle>

						<Field
							value={tile.layout.gap}
							submit={v => {
								if (tile.layout.distribute !== contentDistribute.NONE) {
									tile.layout.distribute = contentDistribute.NONE;
								}
								setTileGap(tile, v);
							}}
							setInputFocused={setInputFocused}
							icon={gapIcon}
							placeholder={"Auto"}
							showPlaceholder={tile.layout.distribute !== contentDistribute.NONE}
						>
							<LabelButton
								onTap={e => {
									if (tile.layout.distribute !== contentDistribute.NONE) {
										setContentDistribute(tile, contentDistribute.NONE);
									} else {
										setContentDistribute(tile, contentDistribute.SPACE_BETWEEN);
									}
									e.stopPropagation();
								}}
								active={tile.layout.distribute !== contentDistribute.NONE}
								badge
								style={{
									position: "absolute",
									right: "6px",
									top: "6px",
									fontSize: "8px",
									fontWeight: 600,
									lineHeight: "10px",
									padding: "3px 4px",
									borderRadius: "3px",
									letterSpacing: "1px",
									textTransform: "uppercase",
								}}
							>
								Distribute
							</LabelButton>
						</Field>
					</Section>

					<Padding tile={tile} />

					{/* {!isRootContainer && ( */}
						<Section type="EvenColumn">

							<Background tile={tile} />

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
					{/* )} */}

					{/* {isRootContainer && (
						<Background tile={tile} isRootContainer={isRootContainer} currentPage={currentPage} />
					)} */}
				</>
			)}
			{type === tileTypes.TEXT && sameType && (
				<>
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

					<Section type="EvenColumn">
						<Section type="FlexVertical">
							<SectionTitle>Style</SectionTitle>
							<MenuButton style={{ fontSize: "11px" }}>Subheader</MenuButton>
						</Section>

						<Section type="FlexVertical">
							<SectionTitle>Text size</SectionTitle>
							<Field
								value={tile.content.fontSize}
								submit={v => setTileFontSize(tile, v)}
								width={"100%"}
								setInputFocused={setInputFocused}
							/>
						</Section>
					</Section>

					<Section>
						<SectionTitle>Lists</SectionTitle>
						<Section type="EvenColumn">
							<Button active={false} onTap={undefined}>
								<Icon name="ListBullet" />
							</Button>
							<Button active={false} onTap={undefined}>
								<Icon name="ListNumber" />
							</Button>
						</Section>
					</Section>

					<Section>
						<SectionTitle>Color</SectionTitle>
						<ColorButtonField />
					</Section>

					{!isMultiselection && (
						<Section>
							<SectionTitle>Background image</SectionTitle>
							<Button active={false} onTap={undefined}>
								Upload
							</Button>
						</Section>
					)}

					{/* <Padding tile={tile} /> */}
				</>
			)}

			{type === tileTypes.IMAGE && sameType && (
				<>
					<Section type="Flex">
						<Button style={palStyle} onTap={undefined}>
							<Icon name="DoubleSparkle" /> Generate
						</Button>
						<Button style={palStyle} onTap={undefined}>
							<Icon name="Upload" /> Upload
						</Button>
						<Button style={palStyle} onTap={undefined}>
							<Icon name="Search" /> Search
						</Button>
					</Section>
					<Section type="Row">
						<SectionTitle>Image size</SectionTitle>
						<SegmentedControl
							options={mediaContentSizeOptions}
							value={tile.content.size}
							submit={v => setMediaContentSize(tile, v)}
						/>
						<Button active={false} onTap={undefined}>
							Adjust
						</Button>
					</Section>

					{/* <Label type="rowHugControl" onTap={e => e.stopPropagation()}>
						Text
						<Switch />
					</Label> */}

					<Section type="EvenColumn">
						<Background tile={tile} />

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
				</>
			)}

			{!isRootContainer && <Size tile={tile} />}
		</>
	);
};

import React from "react";

import { Field } from "../../../../ds/field/Field";
//import { Label } from "../../../ds/Label";
import { TomeContext } from "../../../../tome/TomeContext";
//import { EditorContext } from "..//EditorContext";
//import { LayoutTypeOptions } from "../menus/LayoutTypesMenu";
import { Icon } from "../../../../ds/Icon";
import { SectionTitle } from "../../../../ds/panel/SectionTitle";
import { Section } from "../../../../ds/panel/Section";
//import { SectionDivider } from "../../../ds/panel/SectionDivider";
//import { SegmentedControl } from "../../../ds/segmented/SegmentedControl";
import { containerSize } from "../../../../tome/TileData";
import { Button } from "../../../../ds/button/Button";
import { EditorContext } from "../../../EditorContext";

export const Size = props => {
	const {
		setTileGap,
		setTileBorderRadius,
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

	const { tileMotionValues, pageScale, setInputFocused } = React.useContext(EditorContext);

	const tile = props.tile;

	const placeholderWidth = Math.round(tileMotionValues.current[tile.id].width.get() / pageScale.get());
	const placeholderHeight = Math.round(tileMotionValues.current[tile.id].height.get() / pageScale.get());

	return (
		<Section>
			<SectionTitle trailing={"UnlockFill"}>Size</SectionTitle>
			<Section
				style={{
					gridTemplateColumns: "1fr 48px 48px",
					gap: "var(--panel-group-gap)",
				}}
			>
				{/* <span style={{ fontSize: "var(--ui-font-size-small)" }}>W</span> */}
				<Field
					value={
						tile.layout.width.type === containerSize.CUSTOM ? parseInt(tile.layout.width.value) : placeholderWidth
					}
					submit={v => {
						setTileWidthValue(tile, v);
					}}
					label="W"
					//placeholder={tile.layout.width.type === containerSize.CUSTOM ? placeholderWidth : "Auto"}
					placeholder={"Auto"}
					showPlaceholder={tile.layout.width.type !== containerSize.CUSTOM}
					setInputFocused={setInputFocused}
				/>
				<Button
					active={tile.layout.width.type === containerSize.FILL}
					onTap={e => setTileWidthType(tile, containerSize.FILL)}
					tooltip={"Width"}
					tooltipShortcut={["Fill"]}
				>
					<Icon name="ArrowLeftRightOut" />
				</Button>
				<Button
					active={tile.layout.width.type === containerSize.HUG}
					onTap={e => setTileWidthType(tile, containerSize.HUG)}
					tooltip={"Width"}
					tooltipShortcut={["Fit"]}
				>
					<Icon name="ChevronLeftRightIn" />
				</Button>
			</Section>
			<Section
				style={{
					gridTemplateColumns: "1fr 48px 48px",
					gap: "var(--panel-group-gap)",
				}}
			>
				{/* <span style={{ fontSize: "var(--ui-font-size-small)" }}>H</span> */}
				<Field
					value={
						tile.layout.height.type === containerSize.CUSTOM
							? parseInt(tile.layout.height.value)
							: placeholderHeight
					}
					submit={v => setTileHeightValue(tile, v)}
					label="H"
					//placeholder={placeholderHeight}
					placeholder={"Auto"}
					showPlaceholder={tile.layout.height.type !== containerSize.CUSTOM}
					setInputFocused={setInputFocused}
				/>
				<Button
					active={tile.layout.height.type === containerSize.FILL}
					onTap={e => setTileHeightType(tile, containerSize.FILL)}
					tooltip={"Height"}
					tooltipShortcut={["Fill"]}
				>
					<Icon name="ArrowUpDown" />
				</Button>
				<Button
					active={tile.layout.height.type === containerSize.HUG}
					onTap={e => setTileHeightType(tile, containerSize.HUG)}
					tooltip={"Height"}
					tooltipShortcut={["Fit"]}
				>
					<Icon name="ChevronUpDownIn" />
				</Button>
			</Section>
		</Section>
	);
};

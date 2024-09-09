import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Field } from "../../ds/field/Field";
import { DropDownLabel, Label } from "../../ds/Label";
import { TomeContext } from "../../tome/TomeContext";
import { EditorContext } from "..//EditorContext";
import { MenuButton } from "../../ds/button/MenuButton";
import { Menus } from "../menus/menus";
import { Icon } from "../../ds/Icon";
import { Switch } from "../../ds/button/Switch";
import { Section } from "../../ds/panel/Section";
import { SectionTitle } from "../../ds/panel/SectionTitle";
import { LabelButton } from "../../ds/button/LabelButton";

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
		setTileAspectRatioLock,
		setTileAspectRatioScale,
		getCurrentPage,
		setTileLayoutScaleContent,
		setTileContentScale,
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
					<Icon name={currentPage.layout.direction === "vertical" ? "ColumnGap" : "RowGap"} size={20} />
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

			{/* <SectionTitle>Size</SectionTitle>  */}

			{/* <Section type="Row">
				<LabelButton
					large
					style={{
						paddingLeft: "4px",
						paddingRight: "4px",
						gap: 0,
						justifyContent: "space-between",
						alignItems: "center",
						color: "var(--t9)",
					}}
					onTap={e => {
						setTileAspectRatioLock(currentPage, false);
						e.stopPropagation();
					}}
				>
					<span
						style={{
							display: "flex",
							gap: "10px",
						}}
					>
						<Icon name="PageScroll" size={28} />
						<span
							style={{
								display: "block",
								textAlign: "left",
							}}
						>
							<span
								style={{
									display: "block",
									fontSize: "13px",

									paddingBottom: "2px",
								}}
							>
								Flexible
							</span>
							<span
								style={{
									display: "block",
									fontSize: "13px",
									color: "var(--t6)",
								}}
							>
								Page scrolls if needed
							</span>
						</span>
					</span>

					<Icon
						name="Checkmark"
						style={{
							opacity: currentPage.layout.aspectRatioLock ? 0 : 1,
						}}
					/>
				</LabelButton>

				<LabelButton
					large
					style={{
						paddingLeft: "4px",
						paddingRight: "4px",
						gap: "8px",
						justifyContent: "space-between",
						color: "var(--t9)",
					}}
					onTap={e => {
						setTileAspectRatioLock(currentPage, true);
						e.stopPropagation();
					}}
				>
					<span
						style={{
							display: "flex",
							gap: "10px",
						}}
					>
						<Icon name="PageLock" size={28} />
						<span
							style={{
								display: "block",
								textAlign: "left",
							}}
						>
							<span
								style={{
									display: "block",
									fontSize: "13px",

									paddingBottom: "2px",
								}}
							>
								16:9
							</span>
							<span
								style={{
									display: "block",
									fontSize: "13px",
									color: "var(--t6)",
								}}
							>
								Page aspect ratio locked
							</span>
						</span>
					</span>

					<Icon
						name="Checkmark"
						style={{
							opacity: currentPage.layout.aspectRatioLock ? 1 : 0,
						}}
					/>
				</LabelButton>

				<LabelButton
					large
					style={{
						paddingLeft: "4px",
						paddingRight: "8px",
						gap: "8px",
						justifyContent: "space-between",
						color: "var(--t9)",
						opacity: currentPage.layout.aspectRatioLock ? 1 : 0.2,
					}}
					onTap={e => {
						setTileAspectRatioScale(currentPage, !currentPage.layout.aspectRatioScale);
						e.stopPropagation();
					}}
				>
					<span
						style={{
							display: "flex",
							gap: "10px",
						}}
					>
						<Icon name="Collapse" size={28} />
						<span
							style={{
								display: "block",
								textAlign: "left",
							}}
						>
							<span
								style={{
									display: "block",
									fontSize: "13px",

									paddingBottom: "2px",
								}}
							>
								Scale to fit
							</span>
							<span
								style={{
									display: "block",
									fontSize: "13px",
									color: "var(--t6)",
								}}
							>
								Shrink content if needed
							</span>
						</span>
					</span>
					<Icon
						name="Checkmark"
						style={{
							opacity: currentPage.layout.aspectRatioScale ? 1 : 0,
						}}
					/>
				</LabelButton>
			</Section> */}

			{/* <Section type={"Grid_2x3"}>
				<Label type="rowCentered">
					W
					<Field value={currentPage.layout.contentSize.width} submit={v => setTileWidth(currentPage, v)} />
				</Label>
				<Label type="rowCentered">
					H
					<Field value={currentPage.layout.contentSize.height} submit={v => setTileHeight(currentPage, v)} />
				</Label>
				<Label type="rowCentered">
					X
					<Field value={currentPage.layout.margin.x} submit={v => setTileMargin(currentPage, "x", v)} />
				</Label>
				<Label type="rowCentered">
					Y
					<Field value={currentPage.layout.margin.y} submit={v => setTileMargin(currentPage, "y", v)} />
				</Label>
				<Label type="rowCentered">
					<Icon name={"TextSize"} size={20} />
					<Field value={currentPage.theme.tokens["--font-size"]} submit={v => setTileFontSize(currentPage, v)} />
				</Label>
			</Section> */}

			{/* <Section>
				<Label onTap={e => toggleMenu(Menus.ASPECT_RATIOS, e, currentPage)}>
					<DropDownLabel>Aspect ratio</DropDownLabel>
					<MenuButton menuType={Menus.ASPECT_RATIOS}>{aspectRatioLabel}</MenuButton>
				</Label>
			</Section> */}

			{/* <SectionTitle>Behaviors</SectionTitle> */}

			<Section type={"Row"}>
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
				<Label
					disabled={currentPage.layout.scrolling}
					type="rowHugControl"
					onTap={e => {
						setTileLayoutScaleContent(currentPage, !currentPage.layout.scaleContent);
						e.stopPropagation();
					}}
				>
					Scale to fit
					<Switch on={currentPage.layout.scaleContent} />
				</Label>

				{/* <AnimatePresence> */}
				{/* {currentPage.layout.scaleContent && ( */}
				{/* <motion.div
					initial={false}
					animate={{
						height: "auto",
						opacity: currentPage.layout.scaleContent ? 1 : 0.4,
					}}
					style={{
						pointerEvents: currentPage.layout.scaleContent ? "auto" : "none",
					}}
				>
					<Label type="rowHugControl">
						Content scale
						<Field
							value={currentPage.layout.contentScale}
							submit={v => setTileContentScale(currentPage, v)}
							//unit="%"
							rounded={false}
							increment={0.1}
						/>
					</Label>
				</motion.div> */}
				{/* )} */}
				{/* </AnimatePresence> */}
			</Section>

			{/* <SectionTitle>Behaviors</SectionTitle>
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
			</Section>  */}
		</>
	);
};

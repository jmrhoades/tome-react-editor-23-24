import React, { useContext, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";
import chroma from "chroma-js";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, ControlsRows, ButtonStack, ButtonPair } from "./Panels";
import { Segmented, segmentType } from "./controls/Segmented";
import { Button, buttonType, ColorButton } from "./controls/Button";
import { alignmentX, alignmentY, textStyles, lineLength } from "../tiles/TileConstants";


export const TextTileProperties = props => {
	const { selectedTile, tomeData, setTomeData, menuInfo, showMenu, getTextColor, getTileColor } = useContext(TomeContext);
	
	

	let activeStyles = [];
	if (selectedTile) {
		selectedTile.params.blocks.forEach(b => {
			let t = b.type;
			if (t === textStyles.UL || t === textStyles.OL) {
				let listT = b.blockStyle;
				if (activeStyles.indexOf(b.listT) === -1) {
					activeStyles.push(listT);
				}
				//console.log(t);
			}
			if (activeStyles.indexOf(b.type) === -1) {
				activeStyles.push(t);
			}
		});
	}

	//console.log(activeStyles);

	const onStyleButtonTap = type => {
		console.log(selectedTile.params.blocks);
		// Set all blocks to this style
		const newItems = [];
		selectedTile.params.blocks.forEach(b => {
			if (b.type === textStyles.UL || b.type === textStyles.OL) {
				const block = {...b};
				block.blockStyle = type;
				block.id = uniqueId("block");
				newItems.push(block);
				/*
				b.blocks.forEach(b_li => {
					b_li.type = type;
					newItems.push(b_li);
				});
				*/
			} else {
				const block = {...b};
				block.type = type;
				block.id = uniqueId("block");
				newItems.push(block);
			}
		});
		console.log(selectedTile.params.blocks);
		selectedTile.params.blocks = newItems;
		setTomeData({ ...tomeData });
	};

	const removeListType = type => {
		// Remove ordered lists, retain styling
		const newItems = [];
		selectedTile.params.blocks.forEach(b => {
			if (b.type === type) {
				b.blocks.forEach(b_li => {
					b_li.type = b.blockStyle;
					newItems.push(b_li);
				});
			} else {
				newItems.push(b);
			}
		});
		selectedTile.params.blocks = newItems;
	};

	const setListType = type => {
		// Get all the blocks and place them in a new array
		// If a block is a list, put its items in the new array
		// Add item to new list
		const newItems = [];
		const isFirstBlockAList = selectedTile.params.blocks[0].blockStyle;
		console.log(isFirstBlockAList, selectedTile.params.blocks[0].type, selectedTile.params.blocks[0].blockStyle);
		const newBlock = {
			id: uniqueId("block_list_"),
			type: type,
			blockStyle: isFirstBlockAList ? selectedTile.params.blocks[0].blockStyle : selectedTile.params.blocks[0].type,
		};

		selectedTile.params.blocks.forEach(b => {
			if (b.type === textStyles.UL) {
				b.blocks.forEach(b_li => {
					newItems.push(b_li);
				});
			} else if (b.type === textStyles.OL) {
				b.blocks.forEach(b_li => {
					newItems.push(b_li);
				});
			} else {
				b.type = textStyles.LI;
				newItems.push(b);
			}
		});
		newBlock.blocks = newItems;
		selectedTile.params.blocks = [newBlock];
	};

	const onListButtonTap = type => {
		// Order list button tapped
		// = List buttons must behave as toggles
		// = Unlike block styles, lists are an additional style the user can add to a block
		// = If a list is present in the selected tile, tapping the button removes the list
		// = If a list is not present, tapping the button turns all the selected tiles's blocks into a list

		//
		// Remove lists
		//

		if (activeStyles.indexOf(textStyles.OL) !== -1 && type === textStyles.OL) {
			removeListType(type);
		} else if (activeStyles.indexOf(textStyles.UL) !== -1 && type === textStyles.UL) {
			removeListType(type);
		}

		//
		// Convert to list
		//
		else if (activeStyles.indexOf(textStyles.OL) === -1 && type === textStyles.OL) {
			setListType(type);
		} else if (activeStyles.indexOf(textStyles.UL) === -1 && type === textStyles.UL) {
			setListType(type);
		}

		setTomeData({ ...tomeData });
	};

	const colorValue = getTextColor();
	const colorLabel = colorValue.substring(1).toUpperCase();


	const backgroundColorValue = getTileColor();
	const backgroundColorLabel = chroma(backgroundColorValue).hex('rgb').substring(1).toUpperCase();

	return (
		<PanelWrap>

<Section>
				<SectionTitle theme={props.theme}>Alignment</SectionTitle>
				<ControlsRows>
					<Segmented
						id={"text_align_horizontal"}
						target={"alignmentX"}
						theme={props.theme}
						targetValue={selectedTile.params.alignmentX}
						data={[
							{
								type: segmentType.ICON,
								iconName: "AlignLeft",
								label: "Align Left",
								value: alignmentX.LEFT,
							},
							{
								type: segmentType.ICON,
								iconName: "AlignCenter",
								label: "Align Center",
								value: alignmentX.CENTER,
							},
							{
								type: segmentType.ICON,
								iconName: "AlignRight",
								label: "Align Right",
								value: alignmentX.RIGHT,
							},
						]}
					/>
					<Segmented
						id={"text_align_vertical"}
						target={"alignmentY"}
						theme={props.theme}
						targetValue={selectedTile.params.alignmentY}
						data={[
							{
								type: segmentType.ICON,
								iconName: "AlignTop",
								label: "Align Top",
								value: alignmentY.TOP,
							},
							{
								type: segmentType.ICON,
								iconName: "AlignMiddle",
								label: "Align Middle",
								value: alignmentY.MIDDLE,
							},
							{
								type: segmentType.ICON,
								iconName: "AlignBottom",
								label: "Align Bottom",
								value: alignmentY.BOTTOM,
							},
							{
								type: segmentType.ICON,
								iconName: "AlignDistribute",
								label: "Distribute",
								value: alignmentY.DISTRIBUTE,
							},
						]}
					/>
				</ControlsRows>
			</Section>
			
			<Section>
				<SectionTitle theme={props.theme}>Style</SectionTitle>
				<ButtonStack>
				<Button
						id={"style_Ultra"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 16, fontWeight: 600 }}
						label={"Display 1"}
						active={activeStyles.indexOf(textStyles.ULTRA) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.ULTRA);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Display"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 14, fontWeight: 600 }}
						label={"Display 2"}
						active={activeStyles.indexOf(textStyles.H0) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.H0);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Title"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 14, fontWeight: 600 }}
						label={"Title 1"}
						active={activeStyles.indexOf(textStyles.H1) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.H1);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Heading"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 13, fontWeight: 600 }}
						label={"Title 2"}
						active={activeStyles.indexOf(textStyles.H2) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.H2);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Default"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 13, fontWeight: 400 }}
						label={"Body 1"}
						active={activeStyles.indexOf(textStyles.DEFAULT) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.DEFAULT);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Body"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 11.0, fontWeight: 400 }}
						label={"Body 2"}
						active={activeStyles.indexOf(textStyles.P) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.P);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Subheading"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 11.0, fontWeight: 600 }}
						label={"Subhead"}
						active={activeStyles.indexOf(textStyles.H3) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.H3);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_Caption"}
						type={buttonType.LABEL}
						labelStyle={{ fontSize: 10, fontWeight: 400 }}
						label={"Caption"}
						active={activeStyles.indexOf(textStyles.CAPTION) !== -1}
						onTap={() => {
							onStyleButtonTap(textStyles.CAPTION);
						}}
						theme={props.theme}
					/>
				</ButtonStack>
			</Section>
			<Section>
				<SectionTitle theme={props.theme}>Lists</SectionTitle>
				<ButtonPair>
					<Button
						id={"style_bullet_list"}
						type={buttonType.ICON}
						iconName={"ListBullet"}
						label={"Bullet list"}
						active={activeStyles.indexOf(textStyles.UL) !== -1}
						onTap={() => {
							onListButtonTap(textStyles.UL);
						}}
						theme={props.theme}
					/>
					<Button
						id={"style_number_list"}
						type={buttonType.ICON}
						iconName={"ListNumber"}
						label={"Number list"}
						active={activeStyles.indexOf(textStyles.OL) !== -1}
						onTap={() => {
							onListButtonTap(textStyles.OL);
						}}
						theme={props.theme}
					/>
				</ButtonPair>
			</Section>

			

			{/* <Section>
				<SectionTitle theme={props.theme}>Line Length</SectionTitle>
				<Segmented
					id={"`text_lineLength`"}
					target={"lineLength"}
					theme={props.theme}
					targetValue={selectedTile.params.lineLength}
					data={[
						{
							type: segmentType.LABEL,
							label: "S",
							value: lineLength.S,
						},
						{
							type: segmentType.LABEL,
							label: "M",
							value: lineLength.M,
						},
						{
							type: segmentType.LABEL,
							label: "L",
							value: lineLength.L,
						},
					]}
				/>
			</Section> */}

			<motion.div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "flexStart",
					width: "100%",
					gap: 8,
				}}
			>
				<Section>
					<SectionTitle theme={props.theme}>Text color</SectionTitle>
					<ColorButton
						type={buttonType.COLOR}
						color={colorValue}
						label={colorLabel}
						id={"properties_text_color"}
						onTap={e => {
							showMenu({
								type: "properties_text_color",
								buttonId: "properties_text_color",
								alignX: "middle",
								alignY: "leading",
								yOffset: 4,
							});
						}}
						active={menuInfo.show && menuInfo.buttonId === "properties_text_color"}
						theme={props.theme}
					/>
				</Section>

				<Section>
					<SectionTitle theme={props.theme}>Background color</SectionTitle>
					<ColorButton
						type={buttonType.COLOR}
						color={backgroundColorValue}
						label={backgroundColorLabel}
						id={"properties_background_color"}
						onTap={e => {
							showMenu({
								type: "properties_background_color",
								buttonId: "properties_background_color",
								alignX: "middle",
								alignY: "leading",
								yOffset: 4,
							});
						}}
						active={menuInfo.show && menuInfo.buttonId === "properties_background_color"}
						theme={props.theme}
					/>
				</Section>
			</motion.div>

		</PanelWrap>
	);
};

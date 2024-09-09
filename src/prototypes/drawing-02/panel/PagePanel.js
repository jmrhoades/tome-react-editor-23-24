import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, ControlGroup, SectionSpacer } from "./Panels";
import { Segmented, segmentType } from "./controls/Segmented";
import { LabeledSwitch } from "./controls/LabeledSwitch";
import { updateThemeBaseFontSize } from "../tome/Themes";

const Options = styled(motion.div)`
	display: flex;
	gap: 12px;
`;

export const PagePanel = props => {
	const { currentPage, saveState } = React.useContext(TomeContext);

	const onCornerToggle = newValue => {
		console.log(newValue);
		currentPage.layout.corners = newValue;
		saveState();
	};

	const onMarginChange = newValue => {
		console.log(newValue);
		currentPage.layout.marginValue = newValue;
		saveState();
	};

	const onGapChange = newValue => {
		console.log(newValue);
		currentPage.layout.gapValue = newValue;
		saveState();
	};

	return (
		<PanelWrap>
			<Section>
				{/* <LabeledSwitch
						theme={props.theme}
						label={"Gutters"}
						showSwitch={true}
						isSmall={true}
						isOn={true}
					/> */}
				<SectionTitle theme={props.theme}>Width</SectionTitle>

				<Segmented
					id={"gutters"}
					target={"gutters"}
					theme={props.theme}
					targetValue={currentPage.layout.marginValue}
					onTap={onMarginChange}
					data={[
						{
							type: segmentType.LABEL,
							label: "Narrow",
							value: 340,
						},
						
						{
							type: segmentType.LABEL,
							label: "Wide",
							value: 140,
						},
					]}
				/>
			</Section>

			<Section>
				{/* <LabeledSwitch
						theme={props.theme}
						label={"Gaps"}
						showSwitch={true}
						isSmall={true}
						isOn={true}
					/> */}
				<SectionTitle theme={props.theme}>Gaps</SectionTitle>
				<Segmented
					id={"gaps"}
					target={"gaps"}
					theme={props.theme}
					targetValue={currentPage.layout.gapValue}
					onTap={onGapChange}
					data={[
						{
							type: segmentType.LABEL,
							label: "S",
							value: 12,
						},
						{
							type: segmentType.LABEL,
							label: "M",
							value: 48,
						},
						{
							type: segmentType.LABEL,
							label: "L",
							value: 96,
						},
					]}
				/>
			</Section>

			<Section
				style={{
					marginTop: 4,
				}}
			>
				<LabeledSwitch
					theme={props.theme}
					label={"Rounded Corners"}
					showSwitch={true}
					//targetValue={currentPage.layout.corners}
					//isSmall={false}
					isOn={currentPage.layout.corners}
					onTap={onCornerToggle}
				/>

				{/* <Segmented
					id={"gaps"}
					target={"gaps"}
					theme={props.theme}
					targetValue={currentPage.gaps}
					//targetValue={selectedTile.params.alignmentX}
					data={[
						{
							type: segmentType.LABEL,
							label: "S",
							value: "cover",
						},
						{
							type: segmentType.LABEL,

							label: "M",
							value: "custom",
						},
						{
							type: segmentType.LABEL,

							label: "L ",
							value: "custom",
						},
					]}
				/> */}
			</Section>
		</PanelWrap>
	);
};

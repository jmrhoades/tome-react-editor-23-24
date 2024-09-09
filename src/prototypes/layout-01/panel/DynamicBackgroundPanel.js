import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, SectionSpacer, SectionTitleWithHelp, ButtonPair } from "./Panels";
import { LabeledSwitch } from "./controls/LabeledSwitch";
import { Select } from "../ds/Select";
import { PromptField } from "../ds/Fields";
import { Button, buttonType } from "./controls/Button";
import { SliderInputGroup } from "./controls/SliderInputGroup";
import { tileNames } from "../page/TileConstants";

const Thumb = styled(motion.img)`
	width: 108px;
	height: 60px;
	border-radius: 4px;
	position: relative;
`;

export const DynamicBackgroundPanel = props => {
	const { deleteBackground, currentPage, saveState } = React.useContext(TomeContext);

	const onOpacityValueUpdate = newValue => {
		props.page.background.params.opacity = newValue;
		saveState();
	};

	const onScrollFadeUpdate = newValue => {
		if (props.page.background.params.fadeOnScroll) {
			props.page.background.params.fadeOnScroll = false;
		} else {
			props.page.background.params.fadeOnScroll = true;
		}
		saveState();
	};

	const [hasGenerated, setHasGenerated] = React.useState(false);

	const onThumbTap = thumb => {
		let url = "https://prod.spline.design/mmDe-fhp17Mk6z2n/scene.splinecode";
		currentPage.background.params.url = url;
		saveState();
	};

	return (
		<PanelWrap>
			<Section>
				<SectionTitleWithHelp theme={props.theme}>Vibe</SectionTitleWithHelp>
				<PromptField theme={props.theme} onChange={null} value="Abstract forms, smooth" />
			</Section>

			<Section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
					gridTemplateRows: "repeat(2, 1fr)",
					gap: 6,
					overflow: "hidden",
				}}
				animate={{
					height: hasGenerated ? "auto" : 0,
				}}
				transition={{ ease: "easeOut", duration: 0.4 }}
				initial={false}
			>
				<Thumb
					src="/d-bgs/d-bg-01.jpg"
					onTap={() => {
						onThumbTap("A");
					}}
				/>
				<Thumb
					src="/d-bgs/d-bg-02.jpg"
					style={{
						border: `1px solid rgba(255,255,255,0.08)`,
					}}
					onTap={() => {
						onThumbTap("B");
					}}
				/>
				<Thumb
					src="/d-bgs/d-bg-03.jpg"
					onTap={() => {
						onThumbTap("C");
					}}
				/>
				<Thumb
					src="/d-bgs/d-bg-04.jpg"
					onTap={() => {
						onThumbTap("D");
					}}
				/>
			</Section>
			
			<Section>
				<ButtonPair>
					<Button
						theme={props.theme}
						type={buttonType.LABEL}
						label={"Generate"}
						onTap={() => setHasGenerated(true)}
					/>
					{hasGenerated && (
						<Button
							theme={props.theme}
							type={buttonType.LABEL}
							label={"Reset"}
							onTap={() => setHasGenerated(false)}
						/>
					)}
				</ButtonPair>
			</Section>

			{/* <Section>
				<LabeledSwitch
					theme={props.theme}
					label="Fade on scroll"
					isOn={props.page.background.params.fadeOnScroll}
					onTap={onScrollFadeUpdate}
				/>
			</Section> */}

			{/* <SectionSpacer /> */}

			{/* <Section>
				<Button
					theme={props.theme}
					type={buttonType.LABEL}
					label={"Remove"}
					onTap={() => {
						deleteBackground();
					}}
				/>
			</Section> */}
		</PanelWrap>
	);
};

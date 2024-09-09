import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, ControlGroup } from "./Panels";
import { LabeledSwitch } from "./controls/LabeledSwitch";
import { Themes } from "../tome/Themes";

const Options = styled(motion.div)`
	display: flex;
	gap: 12px;
`;

const Grid3x2 = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 12px;
`;

export const ThemePanel = props => {
	const { currentPage, saveState } = React.useContext(TomeContext);

	const onThemeChange = newTheme => {
		currentPage.theme = newTheme;
		saveState();
	};

	const panelThemes = Themes.filter(t => (t.id !== "theme-faded-green" && t.id !== "theme-night" && t.id !== "theme-neptune"));

	const [isUsingCustomTheme, setIsUsingCustomTheme] = React.useState(false);
	const onCustomThemeSwitch = () => {
		setIsUsingCustomTheme(!isUsingCustomTheme);
	}

	return (
		<PanelWrap>
			<Section>
				<ControlGroup>
					<Grid3x2>
						{panelThemes.map(theme => (
							<ThemeOption
								key={theme.id}
								theme={theme}
								pageTheme={props.theme}
								selected={props.theme.id === theme.id}
								onThemeChange={onThemeChange}
							/>
						))}
					</Grid3x2>
				</ControlGroup>
			</Section>
			<Section>
				<ControlGroup>
					<Options
						style={{
							flexDirection: "column",
							// gap: 8,
						}}
					>
						<LabeledSwitch theme={props.theme} label={"Custom theme"} showSwitch={true} isOn={isUsingCustomTheme} onTap={onCustomThemeSwitch}/>
					</Options>
				</ControlGroup>
			</Section>
		</PanelWrap>
	);
};

const ThemeOptionWrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	width: 100%;
	aspect-ratio: 1 / 1;
`;
const ThemeOptionOutline = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const ThemeOptionHeadingExample = styled(motion.div)``;
const ThemeOptionBodyExample = styled(motion.div)``;

const ThemeOption = props => {
	const [isHovering, setIsHovering] = React.useState(false);
	const borderRadius = 8;

	let outlineColor = undefined;
	if (props.pageTheme.mode === "light" && props.theme.previewOutlineLight) {
		outlineColor = props.theme.previewOutlineLight;

	} 
	if (props.pageTheme.mode === "dark" && props.theme.previewOutlineDark) {
		outlineColor = props.theme.previewOutlineDark;
	} 

	
	

	
	return (
		<ThemeOptionWrap
			style={{
				backgroundColor: props.theme.colors.backgrounds.canvas,
				borderRadius: borderRadius,
				position: "relative",
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			whileTap={{
				scale: 0.95,
			}}
			onTap={() => {
				props.onThemeChange(props.theme);
			}}
		>
			<ThemeOptionOutline
				style={{
					borderRadius: borderRadius,
					border: `1px solid ${outlineColor}`,
				}}
				animate={{
					opacity: outlineColor ? 1 : 0,
				}}
				initial={false}
			/>
			<ThemeOptionOutline
				style={{
					borderRadius: borderRadius,
					border: `1px solid ${props.theme.colors.t2}`,
					//boxShadow: `0 0 0 1px ${props.theme.colors.t2}`,
					//boxShadow: `0 0 0 1px ${props.theme.colors.backgrounds.panel}, 0 0 0 2.25px ${props.theme.colors.t4}`,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			/>
			<ThemeOptionOutline
				style={{
					borderRadius: borderRadius,
					border: `2px solid ${props.pageTheme.colors.accent}`,
					top: -1,
					left: -1,
					width: "calc(100% + 2px)",
					height: "calc(100% + 2px)",
					//boxShadow: `0 0 0 1px ${props.theme.colors.backgrounds.panel}, 0 0 0 2.25px ${props.theme.colors.accent}`,
				}}
				animate={{
					opacity: props.selected ? 1 : 0,
				}}
				initial={false}
			/>
			<ThemeOptionHeadingExample
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: 19,
					fontWeight: props.theme.typography.fontWeight.H1,
					lineHeight: "22px",
					color: props.theme.colors.text.heading,
					y: -2,
				}}
			>
				Aa
			</ThemeOptionHeadingExample>
			<ThemeOptionBodyExample
				style={{
					fontFamily: props.theme.typography.fontFamily,
					fontSize: 12,
					fontWeight: props.theme.typography.fontWeight.P,
					lineHeight: 1,
					color: props.theme.colors.text.body,
					y: -2,
				}}
			>
				{props.theme.name}
			</ThemeOptionBodyExample>
		</ThemeOptionWrap>
	);
};

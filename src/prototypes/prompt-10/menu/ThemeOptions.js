import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Themes } from "../tome/Themes";

const Options = styled(motion.div)`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	padding: 12px;

	overflow-y: auto;
	scrollbar-width: none;
`;

const OptionWrap = styled(motion.div)``;

const Layout = styled(motion.div)`
	display: flex;
	flex-direction: column;

	align-items: flex-start;
	cursor: pointer;

	height: 50px;
	aspect-ratio: 16 / 10;
	padding: 8px;
`;
const ThemeOptionOutline = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Label = styled(motion.div)`
	
	font-style: normal;
	font-weight: 400;
	font-size: 11px;
	line-height: 16px;
	text-align: center;
	padding-top: 4px;
`;

const ThemeBodyExample = styled(motion.div)`
	width: 100%;
`;

const LineLong = styled(motion.div)`
	width: 60%;
	height: 2px;
	border-radius: 5px;
	margin-bottom: 2px;
`;
const LineShort = styled(LineLong)`
	width: 40%;
`;

const ThemeOptionHeadingExample = styled(motion.div)``;
const ThemeOptionBodyExample = styled(motion.div)``;

export const ThemeOptions = props => {

	// const onThemeChange = newTheme => {};

    const [pressingId, setPressingId] = React.useState(undefined);

	const panelThemes = Themes.filter(t => t.id !== "theme-faded-green" && t.id !== "theme-night" && t.id !== "theme-musou");

	//const panelThemes = Themes;

	const [isUsingCustomTheme, setIsUsingCustomTheme] = React.useState(false);
	const onCustomThemeSwitch = () => {
		setIsUsingCustomTheme(!isUsingCustomTheme);
	};

	return (
		<Options>
			{panelThemes.map(theme => (
				<ThemeOption
					key={theme.id}
					theme={theme}
					pageTheme={props.theme}
					selected={props.tomeData.prompt.createTomeTheme.id === theme.id}
                    pressingId={pressingId}
					setPressingId={setPressingId}
					onTap={props.onChange}
				/>
			))}
		</Options>
	);
};

const ThemeOption = props => {
	const [isHovering, setIsHovering] = React.useState(false);
	const borderRadius = 6;
	const labelColor = props.pageTheme.colors.menu.label;
	const labelSelectedColor = props.pageTheme.colors.t9;
	const lineColor = props.theme.colors.text.body;

	let outlineColor = undefined;
	if (props.pageTheme.mode === "light" && props.theme.previewOutlineLight) {
		outlineColor = props.theme.previewOutlineLight;
	}
	if (props.pageTheme.mode === "dark" && props.theme.previewOutlineDark) {
		outlineColor = props.theme.previewOutlineDark;
	}

	return (
		<OptionWrap
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}

            onTapStart={() => {
				props.setPressingId(props.theme.id);
			}}
			onTap={() => {
				props.setPressingId(undefined);
				props.onTap(props.theme);
			}}
            whileTap={{
                scale: 0.975,
            }}
			
		>
			<Layout
				style={{
					backgroundColor: props.theme.colors.backgrounds.canvas,
					borderRadius: borderRadius,
					position: "relative",
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
						border: `1px solid ${props.pageTheme.colors.t5}`,
                        //top: -2,
						//left: -2,
						//width: "calc(100% + 4px)",
						//height: "calc(100% + 4px)",
						//boxShadow: `0 0 0 1px ${props.theme.colors.t2}`,
						//boxShadow: `0 0 0 1px ${props.theme.colors.backgrounds.panel}, 0 0 0 2.25px ${props.theme.colors.t4}`,
					}}
					animate={{
						opacity: isHovering && !props.selected ? 0 : 0,
					}}
					transition={{
						duration: 0.1,
					}}
					initial={false}
				/>

				<ThemeOptionOutline
					style={{
						borderRadius: borderRadius + 1,
						//border: `1px solid ${props.pageTheme.colors.accent}`,
						top: -1,
						left: -1,
						width: "calc(100% + 2px)",
						height: "calc(100% + 2px)",
						boxShadow: `0 0 0 1.25px ${props.pageTheme.colors.accent}`,
					}}
					animate={{
						opacity: (props.selected && (props.pressingId === undefined || props.pressingId === props.theme.id)) || props.pressingId === props.theme.id ? 1 : 0,
					}}
                    transition={{duration:0.1}}
					initial={false}
				/>
				<ThemeOptionHeadingExample
					style={{
						fontFamily: props.theme.typography.fontFamily,
						fontSize: 10,
						fontWeight: props.theme.typography.fontWeight.H1,
						lineHeight: "120%",
						color: props.theme.colors.text.heading,
						paddingBottom: 1,
						y: -2,
					}}
				>
					{props.theme.name}
				</ThemeOptionHeadingExample>
				{/* <ThemeOptionBodyExample
					style={{
						fontFamily: props.theme.typography.fontFamily,
						fontSize: 10,
						fontWeight: props.theme.typography.fontWeight.P,
						lineHeight: 1,
						color: props.theme.colors.text.body,
						y: -2,
					}}
				>
					{props.theme.name}
				</ThemeOptionBodyExample> */}

				<ThemeBodyExample
					style={{
						opacity: 0.25,
					}}
				>
					<LineLong style={{ backgroundColor: lineColor }} />
					<LineShort style={{ backgroundColor: lineColor }} />
					<LineLong style={{ backgroundColor: lineColor }} />
				</ThemeBodyExample>
			</Layout>
			{/* <Label style={{ color: props.selected ? labelSelectedColor : labelColor }}>{props.theme.name}</Label> */}
		</OptionWrap>
	);
};

import React from "react";

import { Section } from "../../../ds/panel/Section";
import { TomeContext } from "../../../tome/TomeContext";

import { Themes } from "../../../tome/Themes";
import styled from "styled-components";

import { SectionTitle } from "../../../ds/panel/SectionTitle";
import { ColorButtonField } from "../../../ds/field/ColorButtonField";
import { EditorContext } from "../../EditorContext";
import { Anchor, PopoverContext } from "../PopoverContext";
import { Panels } from "./panels";
import { IconSwitch } from "../../../ds/button/Switch";
import { Label } from "../../../ds/Label";
import { menus } from "../menus/menus";
import { MenuButton } from "../../../ds/button/MenuButton";
import { ThemePreview } from "./controls/ThemePreview";
import chroma from "chroma-js";

export const SetTheme = props => {
	const { getCurrentPage, saveState, tomeData } = React.useContext(TomeContext);
	const { setInputFocused, tileRefs, setPageBackgroundColor } = React.useContext(EditorContext);
	const { toggleColorPanel } = React.useContext(PopoverContext);

	const currentPage = getCurrentPage();
	const ref = tileRefs.current[currentPage.id].current;
	const pageStyles = getComputedStyle(ref);

	const [pageBackgroundValue, setPageBackgroundValue] = React.useState(
		chroma(pageStyles.getPropertyValue("--page-color")).hex()
	);
	const [headingValue, setHeadingValue] = React.useState(pageStyles.getPropertyValue("--heading-color"));
	const [bodyValue, setBodyValue] = React.useState(pageStyles.getPropertyValue("--body-color"));

	React.useEffect(() => {
		setPageBackgroundValue(chroma(pageStyles.getPropertyValue("--page-color")).hex());
		setHeadingValue(pageStyles.getPropertyValue("--heading-color"));
		setBodyValue(pageStyles.getPropertyValue("--body-color"));
	}, [tomeData]);

	const updatePageColor = v => {
		ref.style.setProperty("--page-color", v);
		currentPage.theme.tokens["--page-color"] = v;
		setPageBackgroundValue(v);
		const colors = setPageBackgroundColor();
		setHeadingValue(colors.headingColor);
		setBodyValue(colors.bodyColor);
	};

	const updateHeadingColor = v => {
		ref.style.setProperty("--heading-color", v);
		currentPage.theme.tokens["--heading-color"] = v;
		setHeadingValue(v);
		if (currentPage.theme.autoColor) {
			currentPage.theme.autoColor = false;
			saveState();
		}
	};

	const updateBodyColor = v => {
		ref.style.setProperty("--body-color", v);
		currentPage.theme.tokens["--body-color"] = v;
		setBodyValue(v);
		if (currentPage.theme.autoColor) {
			currentPage.theme.autoColor = false;
			saveState();
		}
	};

	return (
		<>
			<Section>
				<MenuButton menuType={menus.THEMES} style={{ paddingTop: "8px", paddingBottom: "8px" }} closeColorPanel>
					<ThemePreview
						theme={currentPage.theme}
						surfaceColor={getComputedStyle(document.documentElement).getPropertyValue("--panel-background-color")}
					/>
					{currentPage.theme.name}
				</MenuButton>
			</Section>

			<Section>
				<SectionTitle>Page</SectionTitle>
				<ColorButtonField
					value={pageBackgroundValue}
					submit={updatePageColor}
					setInputFocused={setInputFocused}
					onTap={e => {
						toggleColorPanel(
							Panels.COLOR,
							document.getElementById("panel"),
							Anchor["left-end"],
							pageBackgroundValue,
							updatePageColor,
							"button-toggle-page-color"
						);
						e.stopPropagation();
					}}
				/>
			</Section>

			<Section type="EvenColumn">
				<Section>
					<SectionTitle>Heading</SectionTitle>
					<ColorButtonField
						value={headingValue}
						submit={updateHeadingColor}
						setInputFocused={setInputFocused}
						onTap={e => {
							toggleColorPanel(
								Panels.COLOR,
								document.getElementById("panel"),
								Anchor["left-end"],
								headingValue,
								updateHeadingColor,
								"button-toggle-heading-color"
							);
							e.stopPropagation();
						}}
					/>
				</Section>

				<Section>
					<SectionTitle>Body</SectionTitle>
					<ColorButtonField
						value={bodyValue}
						submit={updateBodyColor}
						setInputFocused={setInputFocused}
						onTap={e => {
							toggleColorPanel(
								Panels.COLOR,
								document.getElementById("panel"),
								Anchor["left-end"],
								bodyValue,
								updateBodyColor,
								"button-toggle-body-color"
							);
							e.stopPropagation();
						}}
					/>
				</Section>
			</Section>

			<Label
				background
				type="rowHugControl"
				style={{
					marginTop: "-4px",
				}}
				onTap={e => {
					currentPage.theme.autoColor = !currentPage.theme.autoColor;
					saveState();
					const colors = setPageBackgroundColor();
					setHeadingValue(colors.headingColor);
					setBodyValue(colors.bodyColor);
					e.stopPropagation();
				}}
			>
				Auto color
				<IconSwitch small={true} on={currentPage.theme.autoColor} />
			</Label>
		</>
	);
};

import React from "react";

import { TomeContext } from "../../../tome/TomeContext";
import { PopoverContext } from "../PopoverContext";
import { MenuItem } from "../../../ds/menu/MenuItem";

import { ThemesMenuList } from "../../../tome/Themes";
import { ThemePreview } from "../panels/controls/ThemePreview";

export const ThemesMenu = props => {
	const { saveState, getCurrentPage } = React.useContext(TomeContext);
	const { toggleMenu } = React.useContext(PopoverContext);
	const currentPage = getCurrentPage();

	return (
		<>
			{Object.entries(ThemesMenuList).map(([key, value]) => (
				<MenuItem
					key={value.id}
					label={value.name}
					onTap={e => {
						currentPage.theme = value;
						saveState();
						toggleMenu(false, e);
					}}
					checked={value.id === currentPage.theme.id}
					//disabled={o.disabled}
				>
					<ThemePreview
						key={key}
						theme={value}
						small
						surfaceColor={getComputedStyle(document.documentElement).getPropertyValue("--menu-background-color")}
					/>
				</MenuItem>
			))}
		</>
	);
};

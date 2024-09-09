import React from "react";

import { GlobalStyle } from "../../ds/GlobalStyle";
import { TomeProvider } from "./tome/TomeContext";
import { MetricsProvider } from "./tome/MetricsContext";
import { ClipboardProvider } from "./tome/ClipboardContext";
import { TooltipProvider } from "./tooltips/TooltipContext";

import { Viewport } from "./viewport/Viewport";
import { Page } from "./page/Page";
import { Toolbar } from "./bars/Toolbar";
import { Panels } from "./panel/Panels";
import { Titlebar } from "./bars/Titlebar";
import { Outline } from "./outline/Outline";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";
import { ContextMenu } from "./menu/ContextMenu";
import { TomeMenu } from "./menu/TomeMenu";
import { Bottombar } from "./bars/Bottombar";
import { Prompt } from "./prompt/Prompt";
import { Tooltips } from "./tooltips/Tooltips";
import { Toast } from "./toast/Toast";

//import { TileWidthIndicator } from "./page/TileWidthIndicator";
//import { AutoScrollRegionBottom } from "./controls/AutoScrollRegionBottom";

export const Drawing01 = props => {
	return (
		<TomeProvider>
			<GlobalStyle />
			<MetricsProvider>
				<ClipboardProvider>
					<TooltipProvider>
					<Viewport>
						<KeyPress />

						<DeselectCatch />

						<Page />
						<Toolbar />
						
						<Bottombar />
						<Titlebar />
						<Panels />

						{/* <TileWidthIndicator /> */}
						{/* <AutoScrollRegionBottom /> */}
						
						<TomeMenu />
						<ContextMenu />
						<Outline />
						<Prompt />
						<Tooltips />
						<Toast />
					</Viewport>
					</TooltipProvider>
				</ClipboardProvider>
			</MetricsProvider>
		</TomeProvider>
	);
};

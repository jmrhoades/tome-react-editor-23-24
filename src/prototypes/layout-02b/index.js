import React from "react";
import { GlobalStyle } from "../../ds/GlobalStyle";
import { TomeProvider } from "./tome/TomeContext";
import { LayoutProvider } from "./layout/LayoutContext";
import { Viewport } from "./viewport/Viewport";
import { EventProvider } from "./event/EventContext";

export const Layout02b = props => {
	return (
		<TomeProvider>
			<GlobalStyle />
			<LayoutProvider>
				<EventProvider>
					<Viewport />
				</EventProvider>
			</LayoutProvider>
		</TomeProvider>
	);
};

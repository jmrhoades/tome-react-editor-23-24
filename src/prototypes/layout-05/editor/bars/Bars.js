import React from "react";

import { TitleBar } from "./TitleBar";
import { ToolBar } from "./ToolBar";
import { BottomBar } from "./BottomBar";
import { PromptBar } from "./PromptBar";

export const Bars = () => {
	return (
		<>
			<TitleBar />
			<ToolBar />
			<BottomBar />
			<PromptBar />
		</>
	);
};

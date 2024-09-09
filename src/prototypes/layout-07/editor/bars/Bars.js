import React from "react";

import { TitleBar } from "./TitleBar";
import { ToolBar } from "./ToolBar";
import { BottomBar } from "./BottomBar";
// import { NLEBar } from "./NLEBar";
import { Skateboard } from "./Skateboard";

export const Bars = () => {
	return (
		<>
			<TitleBar />
			<ToolBar />
			<BottomBar />
			<Skateboard />
		</>
	);
};

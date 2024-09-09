import React from "react";

import { TomeProvider } from "./tome/TomeContext";
import { makeTestTome } from "./tome/TomeData";
import { EditorProvider } from "./editor/EditorContext";
import { Editor } from "./editor/Editor";
import { PopoverProvider } from "./editor/popovers/PopoverContext";

export const Layout07 = props => {
	const exampleTome = makeTestTome();
	return (
		<TomeProvider tome={exampleTome}>
			<EditorProvider>
				<PopoverProvider>
					<Editor />
				</PopoverProvider>
			</EditorProvider>
		</TomeProvider>
	);
};

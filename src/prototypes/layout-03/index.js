import React from "react";

import { TomeProvider } from "./tome/TomeContext";
import { makeTestTome } from "./tome/TomeData";
import { EditorProvider } from "./editor/EditorContext";
import { Editor } from "./editor/Editor";

export const Layout03 = props => {
	const exampleTome = makeTestTome();
	return (
		<TomeProvider tome={exampleTome}>
			<EditorProvider>
				<Editor />
			</EditorProvider>
		</TomeProvider>
	);
};

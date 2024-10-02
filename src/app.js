import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Index02 } from "./prototypes/index-02";

import { Prompt10 } from "./prototypes/prompt-10";
import { Drawing01 } from "./prototypes/drawing-01";
import { Drawing02 } from "./prototypes/drawing-02";
import { Layout01 } from "./prototypes/layout-01";
import { Layout02a } from "./prototypes/layout-02a";
import { Layout02b } from "./prototypes/layout-02b";
import { Layout03 } from "./prototypes/layout-03";
import { Layout04a } from "./prototypes/layout-04a";
import { Layout04b } from "./prototypes/layout-04b";
import { Layout05 } from "./prototypes/layout-05";
import { Layout06 } from "./prototypes/layout-06";
import { Layout07 } from "./prototypes/layout-07";

export const App = () => {
	const location = useLocation();
	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/prompt-10/:tomeId/:pageNumber" element={<Prompt10 key="prompt-10" />} />
			<Route path="/prompt-10/:tomeId" element={<Prompt10 key="prompt-10" />} />
			<Route path="/prompt-10/" element={<Prompt10 key="prompt-10" />} />

			<Route path="/drawing-01/" element={<Drawing01 key="drawing-01" />} />

			<Route path="/drawing-02/:tomeId" element={<Drawing02 key="prompt-02" />} />
			<Route path="/drawing-02/" element={<Drawing02 key="drawing-02" />} />

			<Route path="/layout-01/" element={<Layout01 key="layout-01" />} />
			<Route path="/layout-02a/" element={<Layout02a key="layout-02a" />} />
			<Route path="/layout-02b/" element={<Layout02b key="layout-02b" />} />
			<Route path="/layout-03/" element={<Layout03 key="layout-03" />} />

			<Route path="/layout-04a/" element={<Layout04a key="layout-04a" />} />

			<Route path="/layout-04b/" element={<Layout04b key="layout-04b" />} />

			<Route path="/layout-05/" element={<Layout05 key="layout-05" />} />

			<Route path="/layout-06/" element={<Layout06 key="layout-06" />} />

			<Route path="/layout-07/" element={<Layout07 key="layout-07" />} />

			<Route path="/" element={<Index02 key="index-02" />} />
		</Routes>
	);
};

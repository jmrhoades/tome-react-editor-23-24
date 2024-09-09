import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { LayoutContext } from "../layout/LayoutContext";

const Wrap = styled.div``;

export const Text = ({ tile }) => {
	const { tomeData, currentPage } = React.useContext(TomeContext);
	const { pageRect, cornerRadius } = React.useContext(LayoutContext);

	return (
		<Wrap
			style={{
				
			}}
		>
			Untitled
		</Wrap>
	);
};

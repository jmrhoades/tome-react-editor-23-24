import React from "react";
import styled from "styled-components";
import { motion  } from "framer-motion";


export const HudDivider = props => {
	return (
		<Divider />
	);
};

const Divider = styled.div`
	width: 1px;
    height: 14px;
    background-color: var(--t3);
    border-radius: 1px;
`;


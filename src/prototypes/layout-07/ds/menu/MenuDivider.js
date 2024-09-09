import React from "react";
import styled from "styled-components";
import { motion  } from "framer-motion";


export const MenuDivider = props => {
	return (
		<Divider><Line /></Divider>
	);
};

const Divider = styled.div`
    height: 8px;
    padding-left: var(--menu-item-padding-horizontal);
	padding-right: var(--menu-item-padding-horizontal);
`;

const Line = styled.div`
    height: 1px;
    background-color: var(--t2);
    border-radius: 1px;
    transform: translateY(3.5px);
`;
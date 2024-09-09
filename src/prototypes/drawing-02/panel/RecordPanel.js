import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { PanelWrap, Section } from "./Panels";
import { Select } from "../ds/Select";
import { RecordButton } from "../ds/RecordButton";

export const RecordPanel = props => {
	return (
		<PanelWrap>
			

			<Section>
				<Select label={"Same as system"} theme={props.theme} iconName={"VideoCamera"} />
				<Select label={"Same as system"} theme={props.theme} iconName={"Microphone"} />
			</Section>
            <Section>
                <RecordButton theme={props.theme} />
            </Section>
		</PanelWrap>
	);
};

import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

export const TileWeb = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap
			style={{
				backgroundColor: colors.z2,
			}}
		>


			<NullMediaTile
				rowHeight={props.rowHeight}
				tileWidth={props.tileWidth}
				scale={scale}
				iconName={"Web"}
				isEmbed={true}
				inputPlaceholder={"Paste embed link..."}
				theme={props.theme}
			/>
		</Wrap>
	);
};

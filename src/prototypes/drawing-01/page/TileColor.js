import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";
import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const MediaPlaceholder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PlaceholderClickTarget = styled(motion.div)``;

const Label = styled(motion.div)``;

export const TileColor = props => {
	const { scale } = useContext(MetricsContext).metrics;
	const fontFamily = "ABCDiatypeVariable";

	return (
		<Wrap>
			<MediaPlaceholder
				style={{
					// backgroundColor: "rgba(24, 44, 36, 1)",
					backgroundColor: props.backgroundColor ? props.backgroundColor : colors.z2,
				}}
			>
				{/* {!props.color && (
					<PlaceholderClickTarget>
						<Icon name={"PaintBucket"} size={102 * scale} opacity={1} />
					</PlaceholderClickTarget>
				)} */}

				{props.label && (
					<Label
					style={{
						color: props.labelColor,
						fontFamily: fontFamily,
						fontSize: 48 * scale,
						fontWeight: 700,
					}}
					>{props.label}</Label>
				)}

			</MediaPlaceholder>
		</Wrap>
	);
};

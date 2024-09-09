import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { MetricsContext } from "../../tome/MetricsContext";

import { transitions } from "../../ds/Transitions";

import { TomeContext } from "../../tome/TomeContext";
import { Icon } from "../../../../ds/Icon";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

export const TileImage = props => {
	const { isReviewing } = useContext(TomeContext);
	const { scale, tileCornerRadius } = useContext(MetricsContext).metrics;

	const params = props.tile.params;
	const isNull = !params.image || params.image.length === "";

	return (
		<ImageWrap
			style={{
				borderRadius: tileCornerRadius,
				backgroundColor: isNull ? "rgba(255,255,255,0.06)" : "transparent",
			}}
		>
			{isNull && <Icon name="Photo" size={72 * scale} color={props.theme.colors.t5} />}

			{params.image && params.image.length > 1 && (
				<Image
					style={{}}
					key={params.image}
					image={params.image}
					initial={{
						opacity: 1,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						type: "tween",
						duration: 0.5,
					}}
				/>
			)}
		</ImageWrap>
	);
};

import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
`;

const Line = styled(motion.code)`
	position: relative;
	display: flex;
`;

const Number = styled(motion.div)`
	text-align: right;
	padding-right: 1em;
`;
const Code = styled(motion.div)``;

export const TileCode = props => {
	const { scale } = useContext(MetricsContext).metrics;

	let textTilePadding = 12 * scale;

	const tokenBlue = "rgb(0, 187, 255)";
	const tokenLightBlue = "rgb(170, 221, 255)";
	const tokenGray1 = props.theme ? props.theme.colors.text.body : "transparent";
	// const tokenGray2 = "rgba(255, 255, 255, 0.4)";
	const tokenPurple = "rgb(187, 136, 255)";
	const tokenYellow = "rgb(255, 204, 102)";
	const tokenOrange = "rgb(255, 153, 119)";

	const fontFamily = "ABCDiatypeMonoVariable";
	const fontWeight = 500;
	let fontSize = 13 * scale;
	
	let size = props.tileSize > props.columnCount / 2 ? "regular" : "small";
	if (size === "regular") {
		fontSize = 18.22 * scale;
	}
	const lineHeight = fontSize * 1.4 + "px";

	return (
		<Wrap
			style={{
				fontFamily: fontFamily,
				fontWeight: fontWeight,
				fontSize: fontSize,
				padding: textTilePadding,
				backgroundColor: props.theme ? props.theme.colors.backgrounds.tile.code : "transparent",
				lineHeight: lineHeight,
				color: tokenGray1,
			}}
		>
			<Line>
				<Number>1</Number>
				<Code>
					<span style={{ color: tokenOrange }}>$</span>(<span style={{ color: tokenOrange }}>document</span>)
					<span style={{ color: tokenOrange }}>.bind</span>(<span style={{ color: tokenPurple }}>"keydown"</span>
					,&nbsp;
					<span style={{ color: tokenPurple }}>"shift"</span>,&nbsp;
					<span style={{ color: tokenBlue }}>function</span>(<span style={{ color: tokenLightBlue }}>evt</span>){" "}
					{"{"}
				</Code>
			</Line>
			<Line>
				<Number>2</Number>
				<Code>
					<span style={{ color: tokenGray1 }}>&nbsp;&nbsp;// your code here</span>
				</Code>
			</Line>
			<Line>
				<Number>3</Number>
				<Code>
					&nbsp;&nbsp;
					<span style={{ color: tokenOrange }}>return</span>&nbsp;
					<span style={{ color: tokenYellow }}>false</span>;
				</Code>
			</Line>
			<Line>
				<Number>4</Number>
				<Code>
					{"});"}
				</Code>
			</Line>
		</Wrap>
	);
};
 
import React from "react";
import styled from "styled-components";
import { motion, useTransform } from "framer-motion";
import { Icon } from "../../../../ds/Icon";
import { LabelButton } from "../../ds/Buttons";
import { DotGrid } from "./canvas/DotGrid";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: hidden;
`;

const NullWrap = styled(Wrap)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 12px;
`;

const DotGridWrap = styled(Wrap)``;

export const DrawingTileNull = props => {
	const opacity = useTransform(props.droppableBackgroundOpacity, v => (v === 1 ? 0 : 1));

	return (
		<Wrap>
			<DotGridWrap style={{ opacity: props.droppableBackgroundOpacity }}>
				<DotGrid
					theme={props.theme}
					pageScale={props.pageScale}
					zoom={props.zoom}
					tileWidth={props.tileWidth}
					tileHeight={props.tileHeight}
					tile={props.tile}
				/>
			</DotGridWrap>
			<NullWrap
				style={{
					background: props.theme.colors.backgrounds.tile.null,
					borderRadius: props.borderRadius,
					opacity: opacity,
				}}
			>
				<Icon name="Shapes" color={props.theme.colors.t7} size={96} />

				<LabelButton
					theme={props.theme}
					label={"Add shape"}
					backgroundColor={props.theme.colors.t2}
					fontSize={13}
					onTap={props.onTap}
				/>
			</NullWrap>
		</Wrap>
	);
};

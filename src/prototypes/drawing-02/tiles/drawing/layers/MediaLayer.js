import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Icon } from "../../../../../ds/Icon";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

export const ImageLayer = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r } = layer.motion;

	return (
		<Wrap
			id={layer.id}
			style={{
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				//backgroundColor: props.theme.colors.z1,
				pointerEvents: "auto",
				//borderRadius: 6,
			}}
			onPointerDown={props.onPointerDown}
			//initial={{ scale: layer.new ? 1 + DRAG_SCALE_AMOUNT : 1 }}
			//animate={{ scale: 1 }}
		>
			<Icon name="Photo" size={32} color={props.theme.colors.t7} />
		</Wrap>
	);
};

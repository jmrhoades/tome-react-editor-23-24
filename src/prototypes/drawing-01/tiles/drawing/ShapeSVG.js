import React from "react";
import { motion } from "framer-motion";

import { BlockType as DiagramBlockType } from "./_constants";

export const Shape = props => {
	const { width: w, height: h } = props.params;
	const ELLIPSE = props.type === DiagramBlockType.ELLIPSE;
	const RECTANGLE = props.type === DiagramBlockType.RECTANGLE;


	const onContextMenu = props.onContextMenu;
	const onHoverStart = props.onHoverStart;
	const onHoverEnd = props.onHoverEnd;
	const onPointerDown = props.onPointerDown;

	return (
		<>
			{ELLIPSE && <motion.ellipse cx={w / 2} cy={h / 2} rx={w / 2} ry={h / 2} id={props.id} />}
			{RECTANGLE && <motion.rect x={0} y={0} width={w} height={h} rx={0} id={props.id} />}
		</>
	);
};

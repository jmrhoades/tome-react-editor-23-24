import React from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { LayoutContext } from "../layout/LayoutContext";

export const TileView = ({ tile }) => {
	const { pageRect, cornerRadius, gap } = React.useContext(LayoutContext);
	const gapPx = useMotionTemplate`${gap}px`;
	const isRoot = tile.parent === null;
	const id = "lv_" + tile.id;

	const rootStyles = {}
	if (isRoot) {
		rootStyles.width = pageRect.width;
		rootStyles.minHeight = pageRect.height;
		rootStyles.flexGrow = "unset";
	}
	return (
		<motion.div
			id={id}
			style={{
				backgroundColor: "rgba(127,213,144,0.00)",
				position: "relative",
				display: "flex",
				flexDirection: tile.layout,
				flexGrow: 1,
				borderRadius: cornerRadius,
				gap: gapPx,
				pointerEvents: "none",
				...rootStyles,
			}}
		>
			{tile.tiles.map(t => (
				<TileView key={t.id} tile={t} />
			))}
		</motion.div>
	);
};

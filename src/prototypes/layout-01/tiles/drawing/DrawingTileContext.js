import React, { createContext } from "react";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

export const DrawingTileContext = createContext();

export const DrawingTileProvider = (props) => {

	const editing = useMotionValue(false);

	const selectedIds = useMotionValue("");
	const propertyId = useMotionValue("");
	const canvasCursor = useMotionValue("default");

	const ghostCanvasOpacity = useMotionValue(0);
	const dotGridOpacity = useMotionValue(0);

	const selectionRect = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
		opacity: useMotionValue(0),
	};
	
	return (
		<DrawingTileContext.Provider
			value={{
				selectedIds,
				propertyId,
				canvasCursor,
				editing,
				ghostCanvasOpacity,
				dotGridOpacity,
				selectionRect,
			}}
		>
			{props.children}
		</DrawingTileContext.Provider>
	);
};

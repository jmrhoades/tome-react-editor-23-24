import React from "react";
import { useMotionValue, useMotionValueEvent } from "framer-motion";

import { ShapeLayer } from "./ShapeLayer";
import { TextLayer } from "./TextLayer";
import { LineLayer } from "./LineLayer";
import { ImageLayer } from "./MediaLayer";
import { ProgressRing } from "./ProgressRing";
import { Pictogram } from "./Pictogram";

import { syncLayerValues, useScaledValues } from "../utilities";

const LayerMap = {
	SHAPE: ShapeLayer,
	TEXT: TextLayer,
	LINE: LineLayer,
	IMAGE: ImageLayer,
	PROGRESS_RING: ProgressRing,
	PICTOGRAM: Pictogram,
};

export const Layer = props => {
	const layer = props.layer;
	const pageScale = props.pageScale;
	const zoom = props.zoom;

	const { bX, bY, bW, bH, borderSize, borderRadius, fontSize, marginXMax, marginYMax, x1, y1, x2, y2 } =
		useScaledValues(layer, zoom, pageScale);

	// Scaled bounding box
	layer.motion.bX = bX;
	layer.motion.bY = bY;
	layer.motion.bW = bW;
	layer.motion.bH = bH;

	// Scaled border width and radius
	layer.motion.borderSize = borderSize;
	layer.motion.borderRadius = borderRadius;

	// Scaled text styles
	layer.motion.fontSize = fontSize;
	layer.motion.marginXMax = marginXMax;
	layer.motion.marginYMax = marginYMax;

	// Scaled lines
	layer.motion.x1 = x1;
	layer.motion.y1 = y1;
	layer.motion.x2 = x2;
	layer.motion.y2 = y2;

	// Listen for selection changes, show outline when multi-selection is happening
	const [selected, setSelected] = React.useState(false);
	const selectedOutlineOpacity = useMotionValue(0);
	const selectedStrokeColor = useMotionValue(props.theme.colors.accent);
	useMotionValueEvent(props.selection, "change", latest => {
		const ids = props.selection.get().split(",");
		const isSelected = ids.includes(layer.id);
		selectedOutlineOpacity.set(isSelected && ids.length > 1 ? 1 : 0);
		setSelected(isSelected);
	});

	// Keep colors in sync w/ theme changes
	// useEffect(() => {
	//  console.log("Keep colors in sync w/ theme changes")
	// 	layer.motion.line.color.set(props.theme.drawing.line.color)
	// 	layer.motion.text.color.set(props.theme.drawing.text.color)
	// 	selectedStrokeColor.set(props.theme.colors.accent);
	// });



	// Keep motion values in sync w/ tile data on re-render
	React.useLayoutEffect(() => {
		syncLayerValues(layer);
		//console.log("syncLayerValues")
	});

	const LayerType = LayerMap[props.layer.layerType];
	return (
		<LayerType
			theme={props.theme}
			layer={props.layer}
			selected={selected}
			selection={props.selection}
			showSelection={props.showSelection}
			boundsOpacity={props.boundsOpacity}
			pageScale={props.pageScale}
			zoom={props.zoom}
			layerTextIsFocused={props.layerTextIsFocused}
			selectedOutlineOpacity={selectedOutlineOpacity}
			selectedStrokeColor={selectedStrokeColor}
			onPointerDown={props.onPointerDown}
			updateBounds={props.updateBounds}
			interactive={props.interactive}
			isPlayMode={props.isPlayMode}
		/>
	);
};

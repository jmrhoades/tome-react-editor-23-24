import React from "react";

import { GhostShapeLayer } from "./GhostShapeLayer";
import { GhostTextLayer } from "./GhostTextLayer";
import { GhostLineLayer } from "./GhostLineLayer";
import { GhostImageLayer } from "./GhostImageLayer";
import { GhostProgressRing } from "./GhostProgressRing";
import { GhostPictogram } from "./GhostPictogram";

import { useScaledValues } from "../utilities";

export const GhostLayerMap = {
	SHAPE: GhostShapeLayer,
	TEXT: GhostTextLayer,
	LINE: GhostLineLayer,
	IMAGE: GhostImageLayer,
	PROGRESS_RING: GhostProgressRing,
	PICTOGRAM: GhostPictogram,
};

export const GhostLayer = props => {
	const layer = props.layer;
	const pageScale = props.pageScale;
	const zoom = props.zoom;
	const scaledValues = useScaledValues(layer, zoom, pageScale);
	const GhostLayerType = GhostLayerMap[layer.layerType];
	return (
		<GhostLayerType
			theme={props.theme}
			layer={layer}
			scaledValues={scaledValues}
			pageScale={pageScale}
			zoom={zoom}
			onPointerDown={props.onPointerDown}
		/>
	);
};

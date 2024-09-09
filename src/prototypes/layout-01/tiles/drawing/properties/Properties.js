import React from "react";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { PropertiesLevel1 } from "./PropertiesLevel1";
import { PropertiesLevel2 } from "./PropertiesLevel2";
import { PropertiesAlign } from "./PropertiesAlign";
//import { focusLayerText } from "../utilities";

export const PropertyLevels = {
	SHAPE_FILL_COLOR: "shape_fill_color",

	SHAPE_LINE_SIZE: "shape_line_size",
	SHAPE_LINE_COLOR: "shape_line_color",

	SHAPE_TEXT_OPTIONS: "shape_text_options",
	SHAPE_TEXT_STYLE: "shape_text_style",
	SHAPE_TEXT_COLOR: "shape_text_color",
	SHAPE_TEXT_ALIGNMENT: "shape_text_alignment",

	LINE_COLOR: "line_color",
	LINE_SIZE: "line_size",
	LINE_CAPS: "line_caps",
	LINECAP_START: "linecap_start",
	LINECAP_END: "linecap_end",

	TEXT_STYLES: "text_styles",
	TEXT_COLOR: "text_color",
	TEXT_ALIGNMENT: "text_alignment",
	TEXT_ALIGN_X: "text_align_x",
	TEXT_ALIGN_Y: "text_align_y",

	PROGRESS_RING_FOREGROUND_COLOR: "progress_ring_foreground_color",
	PROGRESS_RING_LINE_SIZE: "progress_ring_line_size",
	PROGRESS_RING_AMOUNT: "progress_ring_amount",
	PROGRESS_RING_TEXT_OPTIONS: "progress_ring_text_options",

	PICTOGRAM_FILL_COLOR: "pictogram_fill_color",
	PICTOGRAM_ITEMS: "pictogram_items",
	PICTOGRAM_SPACING: "pictogram_spacing",
	PICTOGRAM_OPTIONS: "pictogram_options",
};

export const Properties = props => {
	const bounds = props.bounds;
	const layers = props.layers;

	const opacity = useMotionValue(0);
	const [layer, setLayer] = React.useState();
	const [params, setParams] = React.useState();
	const [level2, setLevel2] = React.useState(false);

	const [mixedSelection, setMixedSelection] = React.useState(false);
	const [distribute, setDistribute] = React.useState(false);

	const offsetX = 0;
	const offsetY = 16;

	const hideBoundsTimer = React.useRef(0);
	const hideBoundsTime = 1500;

	const barStyles = {
		pointerEvents: "auto",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: props.theme.formatBar.gap,
		padding: props.theme.formatBar.padding,
		backgroundColor: props.theme.formatBar.backgroundColor,
		boxShadow: props.theme.formatBar.shadow,
		borderRadius: props.theme.formatBar.borderRadius,
		WebkitBackdropFilter: `blur(${props.theme.formatBar.backgroundBlur})`,
		backdropFilter: `blur(${props.theme.formatBar.backgroundBlur})`,
		orginX: 0.5,
		orginY: 0,
	};

	// Listen for selection changes
	useMotionValueEvent(props.property, "change", latest => {
		//console.log(latest);
		if (latest === "") {
			//animate(opacity, 0, { duration: 0.2 }).then(() => {
			animate(opacity, 0, { duration: 0 });
			setMixedSelection(false);
			setParams(false);
			//});
		} else {
			const layerIds = props.selection.get().split(",");
			if (layerIds.length === 1) {
				const layer = layers.find(b => b.id === layerIds[0]);
				if (layer) {
					//console.log("set params", layer);
					setLayer(layer);
					setParams(layer.params);
					setMixedSelection(false);
				}
			} else {
				setParams(false);
				setMixedSelection(true);
				if (layerIds.length > 2 && !distribute) setDistribute(true);
				if (layerIds.length < 3) setDistribute(false);
			}
			animate(opacity, 1, { duration: 0.1 });
		}
		setLevel2(false);
	});

	const onLvl1Tap = type => {
		if (level2 && level2 === type) {
			setLevel2(false);
		} else {
			setLevel2(type);
		}
	};

	const onLvl2Tap = type => {
		//console.log("onLvl2Tap", type);
		if (level2 && level2 === type) {
			setLevel2(false);
		} else {
			setLevel2(type);
		}
	};

	const hidebounds = () => {
		//console.log("hidebounds", hideBoundsTimer.current);
		props.bounds.opacity.set(0);
		clearTimeout(hideBoundsTimer.current);
		hideBoundsTimer.current = setTimeout(() => animate(props.bounds.opacity, 1, { duration: 0.1 }), hideBoundsTime);
	};

	return (
		<motion.div
			className="properties"
			style={{
				position: "absolute",
				left: 0,
				x: bounds.x,
				//top: 0,
				//y: bounds.y,
				top: bounds.y,
				y: bounds.height,
				width: bounds.width,
				opacity: opacity,
				pointerEvents: "none",
				zIndex: 9999,
			}}
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			<motion.div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 4,
					x: offsetX,
					y: offsetY,
				}}
			>
				{params && (
					<PropertiesLevel1
						params={params}
						layer={layer}
						theme={props.theme}
						barStyles={barStyles}
						level2={level2}
						setLevel2={setLevel2}
						onButtonTap={onLvl1Tap}
					/>
				)}

				{params && level2 && (
					<PropertiesLevel2
						params={params}
						layer={layer}
						theme={props.theme}
						barStyles={barStyles}
						level2={level2}
						setLevel2={setLevel2}
						onButtonTap={onLvl2Tap}
						bounds={bounds}
						hidebounds={hidebounds}
					/>
				)}

				{mixedSelection && (
					<PropertiesAlign
						theme={props.theme}
						barStyles={barStyles}
						alignLayers={props.alignLayers}
						distributeLayers={props.distributeLayers}
						distribute={distribute}
					/>
				)}
			</motion.div>
		</motion.div>
	);
};

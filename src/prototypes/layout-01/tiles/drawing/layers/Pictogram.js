import React from "react";
import styled from "styled-components";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { PictogramIcon } from "../../../../../ds/PictogramIcons";

const Wrap = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

const ItemContainer = styled(motion.div)``;

export const Pictogram = props => {
	const layer = props.layer;
	const { bX, bY, bW, bH, r, fill, meta, text } = layer.motion;

	// Needed to measure icon and container for layer sizing
	const ref = React.useRef();

	// Use state force re-renders
	const [itemName, setItemName] = React.useState(meta.itemName.get());
	const [itemTotal, setItemTotal] = React.useState(meta.itemTotal.get());
	const [itemFill, setItemFill] = React.useState(meta.itemFill.get());

	// Scaled size
	const itemSize = useTransform(() => meta.itemSize.get() * props.zoom.get() * props.pageScale.get());
	layer.motion.bItemSize = itemSize;

	// Scaled spacing
	const itemSpacing = useTransform(() => meta.itemSpacing.get() * props.zoom.get() * props.pageScale.get());
	layer.motion.bItemSpacing = itemSpacing;
	const itemSpacingPx = useMotionTemplate`${itemSpacing}px`;

	// Data array generated from total count
	const icons = [...Array(itemTotal).keys()];

	// Needed for the wrapping effect when manually resized
	const containerDisplay = useTransform(() => (text.width.get() === "auto" ? "flex" : "block"));

	// Listen for itemName changes
	useMotionValueEvent(meta.itemName, "change", latest => {
		setItemName(latest);
	});

	// Listen for itemTotal changes
	useMotionValueEvent(meta.itemTotal, "change", latest => {
		setItemTotal(latest);
	});

	// Listen for itemFill changes
	useMotionValueEvent(meta.itemFill, "change", latest => {
		setItemFill(latest);
	});

	// Listen for itemSpacing changes
	useMotionValueEvent(meta.itemSpacing, "change", latest => {
		updateSize();
	});

	// Update width & height:
	// - when corners of layer are resized by user, this scales the layer
	const updateSize = () => {
		// auto size or manual?
		if (text.width.get() === "auto") {
			console.log("updateSize auto")
			// Measure container for width
			const rect = ref.current.getBoundingClientRect();
			const width = rect.width;
			layer.params.width = width;
			layer.motion.w.set(width);
			bW.set(width);
			// Measure the first icon for height
			//updateHeightFromFirstItem();
		} else {
			// Width is set by the user and then computed by the drag handler
			// No need to
			// Measure container for height
			const rect = ref.current.getBoundingClientRect();
			const height = rect.height;
			layer.params.height = height;
			layer.motion.h.set(height);
			bH.set(height);
		}
		props.updateBounds();
	};
	layer.updateSize = updateSize;

	// Update height from first icon:
	// - on first load
	// - when sides of layer are resized by user, this could cause wrapping reflow
	const updateHeightFromFirstItem = () => {
		const item = ref.current.children[0]; // get the svg element
		const rect = item.getBoundingClientRect();
		const scale = props.pageScale.get() * props.zoom.get()
		const height = rect.height / scale;

		layer.params.height = height;
		layer.motion.h.set(height);
		//bH.set(height * scale);
		console.log("updateSize", "height", height);
	};
	layer.updateHeight = updateHeightFromFirstItem;

	// TODO FIX THIS — TOTALLY BUGS OUT IF PAGE SCALE !== 1
	// Update layer size on every render
	React.useLayoutEffect(updateSize);



	return (
		<Wrap
			id={layer.id}
			style={{
				x: bX,
				y: bY,
				width: bW,
				height: bH,
				rotation: r,
				pointerEvents: "auto",
				display: containerDisplay,
			}}
			onPointerDown={props.onPointerDown}
		>
			<ItemContainer
				ref={ref}
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexShrink: 0,
					gap: itemSpacingPx,
					width: text.width,
				}}
			>
				{icons.map((o, i) => (
					<PictogramIcon
						key={layer.id + "_picogram_" + i}
						name={itemName}
						size={itemSize}
						color={i < itemFill ? fill.color : props.theme.colors.t5}
						onTap={
							props.selected
								? e => {
										if (props.boundsOpacity.get() !== 1) return;
										const fillIndex = i + 1;
										meta.itemFill.set(fillIndex);
										layer.params.meta.itemFill = fillIndex;
										e.stopPropagation();
								  }
								: undefined
						}
					/>
				))}
			</ItemContainer>
		</Wrap>
	);
};

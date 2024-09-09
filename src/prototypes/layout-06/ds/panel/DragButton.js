import React from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styled from "styled-components";
import { transitions } from "../Transitions";
import { EditorContext } from "../../editor/EditorContext";

export const DragButton = props => {
	const { togglePanel, allowHover, onAddTileDragStart, onAddTileDrag, onAddTileDragEnd } = React.useContext(EditorContext);

	//itemDragging={props.itemDragging}
	//setItemDragging={props.setItemDragging}
	const ref = React.useRef(null);
	const [dragging, setDragging] = React.useState(false);
	const onDrag = (e, info) => {
		onAddTileDrag(e, info);
	};
	const onDragStart = (e, info) => {
		setDragging(true);
		props.setItemDragging(true);
		const rect = ref.current.getBoundingClientRect();
		onAddTileDragStart(e, rect);
		//const dropZones = getDropZones()
	};
	const onDragEnd = (e, info) => {
		//setDragging(false);
		//props.setItemDragging(false);
		togglePanel(null, e);
        onAddTileDragEnd(e, info)
	};

	return (
		<Wrap
			ref={ref}
			onPointerDown={e => {
				e.stopPropagation();
			}}
			drag
			dragMomentum={false}
			//dragSnapToOrigin={true}
			onDrag={onDrag}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			animate={{
				opacity: props.itemDragging && !dragging ? 0 : 1,
			}}
		>
			{props.children}
		</Wrap>
	);
};

const Wrap = styled(motion.div)``;

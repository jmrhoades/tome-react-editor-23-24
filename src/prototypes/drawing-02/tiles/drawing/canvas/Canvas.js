import { createPortal } from "react-dom";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DotGrid } from "./DotGrid";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
	-webkit-user-select: none;
`;

const DotGridWrap = styled(Wrap)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: clip;
`;

const DragSelectRect = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	transition: opacity 200ms ease-out;
`;

export const Canvas = props => {
	const el = document.getElementById(props.canvasId);
	return (
		<Wrap
			className={"Canvas"}
			style={{
				pointerEvents: "auto",
				//cursor: props.editing ? "default" : "grab",
				backgroundColor: props.theme.colors.backgrounds.page,
			}}
			onPointerDownCapture={props.onPointerDown}
			onContextMenu={
				props.editing
					? e => {
							e.preventDefault();
					  }
					: undefined
			}
		>
			{/* {props.editing && props.tile.params.showGrid && props.tile.params.snap && ( */}
			{(props.editing || (props.layers.length === 0 && props.tileSelected)) && props.tile.params.showGrid && (
				<DotGridWrap
					style={{ borderRadius: props.borderRadius }}
					animate={{
						opacity: 1,
					}}
					initial={false}
				>
					<DotGrid
						theme={props.theme}
						pageScale={props.pageScale}
						zoom={props.zoom}
						tileWidth={props.tileWidth}
						tileHeight={props.tileHeight}
						tile={props.tile}
					/>
				</DotGridWrap>
			)}

			{el &&
				props.editing &&
				createPortal(
					<DragSelectRect
						className="dragSelectRect"
						style={{
							width: props.dragRect.width,
							height: props.dragRect.height,
							x: props.dragRect.x,
							y: props.dragRect.y,
							border: `1px solid ${props.theme.dragSelect.border.color}`,
							backgroundColor: props.theme.dragSelect.fill.color,
							borderRadius: 2,
							opacity: props.selecting ? 1 : 0,
						}}
					/>,
					el
				)}
		</Wrap>
	);
};

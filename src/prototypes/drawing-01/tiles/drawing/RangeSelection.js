import { createPortal } from "react-dom";
import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const SelectionRect = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

export const RangeSelection = props => {
	const selectionRect = props.selectionRect;

	const [pointerDown, setPointerDown] = React.useState(false);
	const pointerDownPosition = React.useRef(false);
	const [dragging, setDragging] = React.useState(false);
	const dragRect = React.useRef(false);
	const el = document.getElementById(props.canvasId);

	const onPointerDown = e => {

		// Record pointer position relative to the top left of the element
		setPointerDown(true);
		dragRect.current = e.target.getBoundingClientRect();
		const { x: offsetX, y: offsetY } = dragRect.current;
		pointerDownPosition.current = { x: e.pageX - offsetX, y: e.pageY - offsetY };
		// Reset select rect
		selectionRect.x.set(0);
		selectionRect.y.set(0);
		selectionRect.width.set(0);
		selectionRect.height.set(0);
		
		if (props.editing.get()) {
			e.stopPropagation();
		} else {
		}
	};

	const onPointerMove = e => {
		const { x: offsetX, y: offsetY } = dragRect.current;
		const dx = e.pageX - offsetX - pointerDownPosition.current.x;
		const dy = e.pageY - offsetY - pointerDownPosition.current.y;
		const w = Math.abs(dx);
		const h = Math.abs(dy);
		const DELTA = 5;
		if (!dragging && Math.abs(w) + Math.abs(h) > DELTA && props.editing.get()) {
			setDragging(true);
		}
		if (dragging ) {
			let x = pointerDownPosition.current.x;
			let y = pointerDownPosition.current.y;

			document.body.classList.add("crosshair");

			selectionRect.x.set(x);
			selectionRect.y.set(y);
			selectionRect.width.set(w);
			selectionRect.height.set(h);
			selectionRect.opacity.set(1);

			if (dx < 0) {
				selectionRect.x.set(x - w);
			}
			if (dy < 0) {
				selectionRect.y.set(y - h);
			}

			//console.log(x, y, w, h);
		}
	};

	const onPointerUp = e => {
		// Just a click
		if (!dragging) {
			//props.selectedIds.set("");

			// Toggle editing
			//props.editing.set(!props.editing.get())

			//console.log("click")
			
			if (props.editing.get()) {
				props.editing.set(false)	
			} else {
				props.editing.set(true)	
			}
		}

		setPointerDown(false);
		setDragging(false);
		document.body.classList.remove("crosshair");
		selectionRect.opacity.set(0);

		//selectionRect.x.set(0);
		//selectionRect.y.set(0);
		//selectionRect.width.set(0);
		//selectionRect.height.set(0);
	};

	React.useEffect(() => {
		if (pointerDown) {
			window.addEventListener("mousemove", onPointerMove);
			window.addEventListener("mouseup", onPointerUp);
		}
		return function cleanup() {
			window.removeEventListener("mousemove", onPointerMove);
			window.removeEventListener("mouseup", onPointerUp);
		};
	}, [pointerDown, dragging]);

	return (
		<Wrap
			className={"rangeSelect"}
			onContextMenu={e => {
				e.preventDefault();
			}}
			onPointerDownCapture={onPointerDown}
			style={{
				cursor: props.canvasCursor,
			}}
		>
			{el &&
				createPortal(
					<SelectionRect
						className="selectionRect"
						style={{
							width: selectionRect.width,
							height: selectionRect.height,
							x: selectionRect.x,
							y: selectionRect.y,
							border: `1px solid rgba(237, 0, 235, 0.9)`,
							backgroundColor: `rgba(237, 0, 235, 0.1)`,
							borderRadius: 2,
						}}
						initial={false}
						animate={{ opacity: dragging ? 1 : 0 }}
						transition={{ duration: 0.2 }}
					/>,
					el
				)}
		</Wrap>
	);
};

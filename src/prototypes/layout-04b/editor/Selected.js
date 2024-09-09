import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";

export const Selected = props => {
	const { selectedTiles, event, tomeData } = props;

	return (
		<>
			{selectedTiles.map(t => (
				<SelectedTile
					key={t.id}
					tile={t}
					event={event}
					tomeData={tomeData}
					singleSelect={selectedTiles.length === 1}
				/>
			))}
		</>
	);
};

const SelectedTile = props => {
	const { findTileById } = React.useContext(TomeContext);
	const { dragX, dragY } = React.useContext(EditorContext);
	const { tile, tomeData, singleSelect } = props;

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);
	const borderRadius = useMotionValue(0);
	const selectedColor = useMotionValue("");
	const childrenColor = useMotionValue("");
	const parentColor = useMotionValue("");
	const opacity = useMotionValue(0);

	const [childrenTiles, setChildrenTiles] = React.useState([]);
	const [parentInfo, setParentInfo] = React.useState(null);

	const getChildren = tile => {
		const children = [];
		const getChildrenLoop = tile => {
			tile.tiles.forEach(t => {
				const el = document.getElementById(t.id );
				if (el) {
					const rect = el.getBoundingClientRect();
					rect.x = rect.x + window.scrollX;
					rect.y = rect.y + window.scrollY;
					const style = getComputedStyle(el);
					const scale = style.getPropertyValue("--page-scale");
					const borderRadius = parseInt(style.borderRadius) * scale;
					const info = { rect: rect, t: t, borderRadius: borderRadius };
					children.push(info);
				}
				// Recursive children selection?
				//if (t.tiles) getChildrenLoop(t);
			});
		};
		if (tile.tiles) getChildrenLoop(tile);
		setChildrenTiles(children);
	};

	const getParentInfo = tile => {
		if (tile.parentId) {
			const t = findTileById(tile.parentId);
			if (t) {
				const el = document.getElementById(t.id );
				if (el) {
					const rect = el.getBoundingClientRect();
					rect.x = rect.x + window.scrollX;
					rect.y = rect.y + window.scrollY;
					const style = getComputedStyle(el);
					const scale = style.getPropertyValue("--page-scale");
					const borderRadius = parseInt(style.borderRadius) * scale;
					const info = { rect: rect, t: t, borderRadius: borderRadius };
					setParentInfo(info);
				}
			}
		}
	};

	useMotionValueEvent(props.event, "change", latest => {
		if (latest === Events.DraggingTile) {
			animate(opacity, 0, transitions.fast);
		}
		if (latest === Events.ReleasedTile) {
			animate(opacity, 1, transitions.layoutTransition);
		}
		if (latest === Events.ClickedTile) {
		}
	});

	const updateRect = () => {
		const el = document.getElementById(tile.id );
		const rect = el.getBoundingClientRect();
		const style = getComputedStyle(el);
		const scale = style.getPropertyValue("--page-scale");

		borderRadius.set(parseInt(style.borderRadius) * scale);
		selectedColor.set(style.getPropertyValue("--accent-color"));
		childrenColor.set(style.getPropertyValue("--accent-color-40"));
		parentColor.set(style.getPropertyValue("--accent-color-40"));
		x.set(rect.x + window.scrollX);
		y.set(rect.y + window.scrollY);
		width.set(rect.width);
		height.set(rect.height);

		getChildren(tile);
		getParentInfo(tile);
	};

	React.useEffect(updateRect, [tomeData]);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<Positioner
			style={{
				opacity: opacity,
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				transition: {
					duration: 0,
				},
			}}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.1,
				},
			}}
		>
			<SVG>
				<motion.g
					style={{
						x: dragX,
						y: dragY,
					}}
				>
					<motion.rect
						x={x}
						y={y}
						width={width}
						height={height}
						rx={borderRadius}
						//style={{ stroke: "var(--tome-brand-accent-40)" }}
						//style={{ stroke: "var(--accent)" }}
						style={{ stroke: selectedColor }}
						strokeWidth={1.5}
					/>

					{childrenTiles.map(info => (
						<motion.rect
							key={info.t.id}
							x={info.rect.x}
							y={info.rect.y}
							width={info.rect.width}
							height={info.rect.height}
							rx={info.borderRadius}
							style={{ stroke: childrenColor }}
							strokeWidth={1}
						/>
					))}
				</motion.g>

				{parentInfo && singleSelect && (
					<motion.rect
						key={parentInfo.t.id}
						x={parentInfo.rect.x}
						y={parentInfo.rect.y}
						width={parentInfo.rect.width}
						height={parentInfo.rect.height}
						rx={parentInfo.borderRadius}
						style={{
							stroke: parentColor,
						}}
						strokeWidth={1}
					/>
				)}
			</SVG>
		</Positioner>
	);
};

const SVG = styled.svg`
	pointer-events: none;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	overflow: visible;
	fill: none;
`;

const Positioner = styled(motion.div)``;

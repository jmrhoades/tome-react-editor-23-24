import React from "react";
import { useMotionValue } from "framer-motion";

import { TomeContext, appendRowAtOrder } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { PanelWrap, Section } from "./Panels";
import { TILES } from "../tiles/TileConstants";
import { AddTextButton } from "./controls/AddTextButton";
import { textStyles } from "../tiles/TileConstants";
import { LayoutContext } from "../tome/LayoutContext";

export const AddTextPanel = props => {
	const {
		tomeData,
		currentPage,
		selectedTile,
		saveState,
		dropIndicatorInfo,
		appendNewTile,
		createTileInRowAtOrder,
		selectTile,
		setLayoutTweaking,
	} = React.useContext(TomeContext);

	const { metrics, getShapeDropInfoForXY, cacheTileRects, getTileRect, scrollTileIntoView } =
		React.useContext(MetricsContext);

	const { clickAddTile } = React.useContext(LayoutContext);



	
	const validDropScale = useMotionValue(1);
	const tileType = TILES.TEXT.name;

	const availableStyles = ["HEADING", "BODY", "LIST", "CAPTION"];

	

	const onLayerClick = type => {
		
		console.log(type);

		// Make new tile
		const tile = clickAddTile(tileType);
		let style = textStyles.H2;
		if (type === "BODY") style = textStyles.P;
        if (type === "CAPTION") style = textStyles.CAPTION;

		tile.params.blocks[0].type = style;


	};

	const isInsidePanel = (x, y) => {
		const r = props.panelRef.current.getBoundingClientRect();
		const w = r.width;
		const h = r.height;
		const px = props.panelX.get();
		const py = props.panelY.get();
		const right = px + w;
		const bottom = py + h;
		//console.log(props.panelX.get(), r, x, y)
		return px <= x && right >= x && py <= y && bottom >= y;
	};

	/*
	Drag and drop
	*/
	const onPointerDown = (shapeType, x, y) => {
		// Cache tile rects when before drag starts
		//pageTiles.current = tomeData.tiles.filter(t => t.pageId === currentPage.id);
		//cacheTileRects(pageTiles.current);
	};

	const onDragStart = () => {
		setLayoutTweaking(true);
	};

	const onDrag = (shapeType, x, y) => {
		//const dropInfo = getShapeDropInfoForXY(x, y);
		let dropInfo = {};
		dropInfo.isValid = false;
		dropIndicatorInfo.opacity.set(0);
		if (isInsidePanel(x, y)) return dropInfo;

		return dropInfo;
	};

	const onDrop = (shapeType, x, y) => {
		setLayoutTweaking(false);
		let dropInfo = {};
		dropInfo.isValid = false;
		dropIndicatorInfo.opacity.set(0);
		if (isInsidePanel(x, y)) return dropInfo;

		return dropInfo;
	};

	return (
		<PanelWrap className="panelWrap">
			<Section>
				{/* <SectionTitle theme={props.theme}>Shapes</SectionTitle> */}
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						alignItems: "center",
						justifyContent: "center",
						gap: 6,
					}}
				>
					{availableStyles.map(info => (
						<AddTextButton
							key={info}
							type={info}
							theme={props.theme}
							onClick={onLayerClick}
							onPointerDown={onPointerDown}
							onDragStart={onDragStart}
							onDrag={onDrag}
							onDrop={onDrop}
							validDropScale={validDropScale}
						/>
					))}
				</div>
			</Section>
		</PanelWrap>
	);
};

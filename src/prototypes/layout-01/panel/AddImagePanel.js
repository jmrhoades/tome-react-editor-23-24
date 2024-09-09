import React from "react";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section } from "./Panels";
import { TILES } from "../tiles/TileConstants";
import { AddImageButton } from "./controls/AddImageButton";
import { textStyles } from "../tiles/TileConstants";
import { LayoutContext } from "../tome/LayoutContext";

export const AddImagePanel = props => {
	const { dropIndicatorInfo, setLayoutTweaking } = React.useContext(TomeContext);
	const { clickAddTile } = React.useContext(LayoutContext);
	const tileType = TILES.IMAGE.name;

	const options = [
		{
			id: "imageUploadButton",
			icon: "Upload",
			label: "Upload",
		},
		{
			id: "imageSearchdButton",
			icon: "Search",
			label: "Search",
		},
		{
			id: "imageGenerateButton",
			icon: "DoubleSparkle",
			label: "Generate",
		},
	];

	const onLayerClick = type => {
		// Make new tile
		clickAddTile(tileType);
		
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
	const onPointerDown = (shapeType, x, y) => {};

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
					{options.map(info => (
						<AddImageButton
							key={info.id}
							info={info}
							theme={props.theme}
							onClick={onLayerClick}
							onPointerDown={onPointerDown}
							onDragStart={onDragStart}
							onDrag={onDrag}
							onDrop={onDrop}
						/>
					))}
				</div>
			</Section>
		</PanelWrap>
	);
};

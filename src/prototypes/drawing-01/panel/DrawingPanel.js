import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import chroma from "chroma-js";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { PanelWrap, Section, SectionTitle, ControlGroup, ButtonWrap } from "./Panels";
import { LabeledSwitch } from "./controls/LabeledSwitch";
import { DrawingPanelShape } from "./controls/DrawingPanelShape";
import { buttonType, ColorButton, Button } from "./controls/Button";
import { drawingShapes } from "../tiles/drawing/_constants";
import { createShapeData } from "../tiles/drawing/_utilities";
import { PanelBackground } from "./Panels";
import { getBoundingBox, getBoundingBoxScaleA } from "../tiles/drawing/_utilities";

const Options = styled(motion.div)`
	display: flex;
	gap: 12px;
`;

const DragHint = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 16px;
	padding-top: 4px;
	
	font-size: 11px;
	line-height: 1;
`;

export const DrawingPanel = props => {
	const { tomeData, selectedTile, saveState, menuInfo, showMenu, getTileColor } = React.useContext(TomeContext);
	const { scale, columnWidth, columnGutter, rowHeight, rowMargin } = React.useContext(MetricsContext).metrics;

	const { cColumnCount, cRowCount, cPageWidth, cPageHeight } = metricConstants;

	//const pageScale = scale * (selectedTile.width / 12);
	const pageScale = scale;

	const defaultShapeColor = props.theme.drawing.shape.default;

	const [gridOn, setGridOn] = React.useState(false);
	const onGridSwitch = () => {
		setGridOn(s => !s);
	};
	const availableShapes = [drawingShapes.ELLIPSE, drawingShapes.RECTANGLE, drawingShapes.TEXT, drawingShapes.LINE];
	const backgroundColorValue = getTileColor();
	const backgroundColorLabel = chroma(backgroundColorValue).hex("rgb").substring(1).toUpperCase();

	const hasCustomBackgroundColor =
		chroma(backgroundColorValue).hex() !== chroma(props.theme.colors.backgrounds.page).hex();

	const onShapeClick = shapeType => {
		if (selectedTile && selectedTile.params.blocks) {
			// Create the shape
			const newShape = createShapeData(shapeType);
			newShape.params.fill.color = defaultShapeColor;
			newShape.new = true;

			/* For top left aligned objects center positioning
			// Find the canonical width and height of the tile
			const row = tomeData.rows.filter(r => {
				return r.id === selectedTile.rowId;
			})[0];
			const widthPercent = selectedTile.width / cColumnCount;
			const canonicalWidth = widthPercent * cPageWidth;
			const heightPercent = row.height / cRowCount;
			const canonicalHeight = heightPercent * cPageHeight;
			// Find the center point of the tile
			const centerX = canonicalWidth / 2 - newShape.params.width / 2;
			const centerY = canonicalHeight / 2 - newShape.params.height / 2;
			newShape.params.x = centerX;
			newShape.params.y = centerY;
			*/

			// Add the shape
			selectedTile.params.blocks.push(newShape);
			saveState();
		}
	};

	/*
	Drag and drop shape
	*/
	const selectedTileRect = React.useRef(null);

	const onAddShapeDragStart = (shapeType, x, y) => {
		const tileEl = document.getElementById(selectedTile.id);
		if (tileEl) {
			const rect = tileEl.getBoundingClientRect();
			selectedTileRect.current = rect;
		}
	};

	const getDropInfo = (x, y, rect) => {
		const { top, left, right, bottom } = rect;
		const isValid = x > left && x < right && y > top && y < bottom;
		const tileX = x - left;
		const tileY = y - top;
		return { isValid: isValid, x: tileX, y: tileY };
	};

	const onAddShapeDrag = (shapeType, x, y) => {
		const dropInfo = getDropInfo(x, y, selectedTileRect.current);
		return dropInfo;
	};

	const onAddShapeDrop = (shapeType, x, y) => {
		const dropInfo = getDropInfo(x, y, selectedTileRect.current);
		if (dropInfo.isValid) {
			// Add the shape
			const newShape = createShapeData(shapeType);
			newShape.new = true;
			newShape.params.fill.color = defaultShapeColor;

			//newShape.params.x = dropInfo.x / scale - newShape.params.width / 2;
			//newShape.params.y = dropInfo.y / scale - newShape.params.height / 2;

			//newShape.params.x = dropInfo.x / scale;
			//newShape.params.y = dropInfo.y / scale;

			// Find the center of the tile
			const row = tomeData.rows.filter(r => {
				return r.id === selectedTile.rowId;
			})[0];
			const tileWidth = columnWidth * selectedTile.width + columnGutter * (selectedTile.width - 1);
			const tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);
			newShape.params.x = (dropInfo.x - tileWidth / 2) / pageScale;
			newShape.params.y = (dropInfo.y - tileHeight / 2) / pageScale;

			console.log(newShape.params.x, newShape.params.y);

			selectedTile.params.blocks.push(newShape);
			saveState();
		}
		return dropInfo;
	};

	return (
		<PanelWrap className="panelWrap">
			{/* <DragHint
				style={{
					color: props.theme.colors.t6,
				}}
				animate={{
					opacity: props.fadeOutPanel ? 0 : 1,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			>
				Drag and drop
			</DragHint> */}

			{/* <Section
				animate={{
					opacity: props.fadeOutPanel ? 0 : 1,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			>
				<ControlGroup>
					<Options
						style={{
							flexDirection: "column",
							// gap: 8,
						}}
					>
						<LabeledSwitch
							theme={props.theme}
							label={"Grid"}
							showSwitch={true}
							isOn={gridOn}
							onTap={onGridSwitch}
						/>
					</Options>
				</ControlGroup>
			</Section> */}

			<Section>
				{/* <SectionTitle theme={props.theme}>Shapes</SectionTitle> */}
				<ButtonWrap>
					{availableShapes.map(shape => (
						<DrawingPanelShape
							key={shape.name}
							type={shape.type}
							name={shape.name}
							icon={shape.icon}
							theme={props.theme}
							onClick={onShapeClick}
							onAddShapeDragStart={onAddShapeDragStart}
							onAddShapeDrag={onAddShapeDrag}
							onAddShapeDrop={onAddShapeDrop}
							fadeOutPanel={props.fadeOutPanel}
							setFadeOutPanel={props.setFadeOutPanel}
							pageScale={pageScale}
						/>
					))}
				</ButtonWrap>
			</Section>

			<Section
				animate={{
					opacity: props.fadeOutPanel ? 0 : 1,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			>
				{/* <SectionTitle theme={props.theme}>Size</SectionTitle> */}
				<Button
					theme={props.theme}
					type={buttonType.LABEL}
					label={"Fit"}
					onTap={() => {
						// find the scaled bounding box
						// move it to the center of the tile
						// find the smallest scale
						// apply new scale to data
						// save

						// Find the bounding box of the content
						const shapes = [];
						selectedTile.params.blocks.forEach(b => {
							shapes.push({
								width: b.params.width,
								height: b.params.height,
								x: b.params.x,
								y: b.params.y,
								rotation: b.params.rotation,
							});
						});

						// Distance from center of tile
						const boundingBox = getBoundingBox(shapes);
						const distX = boundingBox.x + boundingBox.width / 2;
						const distY = boundingBox.y + boundingBox.height / 2;
						//console.log("Distance from center of tile", distX, distY, boundingBox);
						const offsetX = distX;
						const offsetY = distY;

						selectedTile.params.blocks.forEach(b => {
							//console.log("block position", b.params.x, b.params.y);
							b.params.x -= offsetX;
							b.params.y -= offsetY;
							b.params.bX.set(b.params.x * scale);
							b.params.bY.set(b.params.y * scale) ;
						});


						// Find the tile size
						const row = tomeData.rows.filter(r => {
							return r.id === selectedTile.rowId;
						})[0];
						const tileWidth =
							(columnWidth * selectedTile.width + columnGutter * (selectedTile.width - 1));
						const tileHeight = (rowHeight * row.height + rowMargin * (row.height - 1));
						// Find the bounding box of the scaled content
						const scaledShapes = [];
						selectedTile.params.blocks.forEach(b => {
							scaledShapes.push({
								width: b.params.width * scale,
								height: b.params.height * scale,
								x: b.params.x * scale,
								y: b.params.y * scale,
								rotation: b.params.rotation,
							});
						});
						const boundingBoxScaled = getBoundingBox(scaledShapes);
						const boundingBoxScale = getBoundingBoxScaleA(boundingBoxScaled, tileWidth, tileHeight);
						// Apply new scale
						selectedTile.params.blocks.forEach(b => {
							b.params.width = b.params.width * boundingBoxScale;
							b.params.height = b.params.height * boundingBoxScale;
							b.params.x = b.params.x * boundingBoxScale;
							b.params.y = b.params.y * boundingBoxScale;
							b.params.bX.set(b.params.x * scale);
							b.params.bY.set(b.params.y * scale);
							b.params.bW.set(b.params.width * scale);
							b.params.bH.set(b.params.height * scale);
						});
						//console.log("tileWidth", tileWidth, tileHeight);
						saveState();
					}}
				/>
			</Section>

			{/* 
			<Section
				animate={{
					opacity: props.fadeOutPanel ? 0 : 1,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			>
				<SectionTitle theme={props.theme}>Background</SectionTitle>

				{hasCustomBackgroundColor && (
					<ColorButton
						type={buttonType.COLOR}
						color={backgroundColorValue}
						label={backgroundColorLabel}
						id={"properties_background_color"}
						onTap={e => {
							showMenu({
								type: "properties_background_color",
								buttonId: "properties_background_color",
								alignX: "middle",
								alignY: "leading",
								yOffset: 4,
							});
						}}
						active={menuInfo.show && menuInfo.buttonId === "properties_background_color"}
						theme={props.theme}
					/>
				)}

				{!hasCustomBackgroundColor && (
					<Button
						type={buttonType.LABEL}
						label={"Choose color"}
						id={"properties_background_color"}
						onTap={e => {
							showMenu({
								type: "properties_background_color",
								buttonId: "properties_background_color",
								alignX: "middle",
								alignY: "leading",
								yOffset: 4,
							});
						}}
						active={menuInfo.show && menuInfo.buttonId === "properties_background_color"}
						theme={props.theme}
					/>
				)}
			</Section> */}
		</PanelWrap>
	);
};

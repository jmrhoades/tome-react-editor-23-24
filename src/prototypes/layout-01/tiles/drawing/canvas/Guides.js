import React from "react";
import styled from "styled-components";
import { motion, useTransform } from "framer-motion";
import { colors } from "../../../ds/Colors";

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	overflow: visible;
`;

const Line = styled(motion.line)`
	transition: opacity 0.1s ease-out;
`;

export const snapThreshold = 10;
export const margin = 16;

export const Guides = props => {
	const guides = props.guides;
	const bounds = props.bounds;
	
    const color = props.theme.colors.accent;
    //const color =  colors.core.yellow;

	const tileWidth = props.tileWidth;
	const tileHeight = props.tileHeight;
	const x1 = guides.x1;
	const y1 = guides.y1;

    console.log("Guides ", tileHeight)



	const hide = () => {
		guides.x1.opacity.set(0);
		guides.y1.opacity.set(0);
	};
	guides.hide = hide;

    const bMargin = useTransform(()=>margin * props.pageScale.get())
    guides.bMargin = bMargin;

	const tileCenter = 0;

	// X snaps
	const tileMarginLeft = -tileWidth / 2 + bMargin.get();
	const tileMarginRight = tileWidth / 2 - bMargin.get();
	const tileXOneThird = tileMarginLeft / 2;
	const tileXTwoThirds = tileMarginRight / 2;

	// Y snaps
	const tileMarginTop = -tileHeight / 2 + bMargin.get();
	const tileMarginBottom = tileHeight / 2 - bMargin.get();
	const tileYOneThird = tileMarginTop / 2;
	const tileYTwoThirds = tileMarginBottom / 2;

	const checkX = newBoxX => {
		const boxLeft = newBoxX;
		const boxCenterX = newBoxX + bounds.width.get() / 2;
		const boxRight = newBoxX + bounds.width.get();

		let snapX = false;

		// Tile center
		if (boxCenterX < tileCenter + snapThreshold && boxCenterX > tileCenter - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileCenter);
			newBoxX = tileCenter - bounds.width.get() / 2;
			snapX = newBoxX - bounds.cachedX.get();
		}

		// Tile left margin
		if (boxLeft < tileMarginLeft + snapThreshold && boxLeft > tileMarginLeft - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileMarginLeft);
			newBoxX = tileMarginLeft;
			snapX = newBoxX - bounds.cachedX.get();
		}

		// Tile left third margin
		if (boxCenterX < tileXOneThird + snapThreshold && boxCenterX > tileXOneThird - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileXOneThird);
			newBoxX = tileXOneThird - bounds.width.get() / 2;
			snapX = newBoxX - bounds.cachedX.get();
		}

		// Tile left third margin
		if (boxCenterX < tileXTwoThirds + snapThreshold && boxCenterX > tileXTwoThirds - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileXTwoThirds);
			newBoxX = tileXTwoThirds - bounds.width.get() / 2;
			snapX = newBoxX - bounds.cachedX.get();
		}

		// Tile right margin
		if (boxRight < tileMarginRight + snapThreshold && boxRight > tileMarginRight - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileMarginRight);
			newBoxX = tileMarginRight - bounds.width.get();
			snapX = newBoxX - bounds.cachedX.get();
		}

		return snapX;
	};
	guides.checkX = checkX;

	const checkY = newBoxY => {
		const boxTop = newBoxY;
		const boxCenterY = newBoxY + bounds.height.get() / 2;
		const boxBottom = newBoxY + bounds.height.get();

		let snapY = false;

		// Tile center
		if (boxCenterY < tileCenter + snapThreshold && boxCenterY > tileCenter - snapThreshold) {
			guides.y1.opacity.set(1);
			guides.y1.y.set(tileCenter);
			newBoxY = tileCenter - bounds.height.get() / 2;
			snapY = newBoxY - bounds.cachedY.get();
		}

		// Tile top
		if (boxTop < tileMarginTop + snapThreshold && boxTop > tileMarginTop - snapThreshold) {
			guides.y1.opacity.set(1);
			guides.y1.y.set(tileMarginTop);
			newBoxY = tileMarginTop;
			snapY = newBoxY - bounds.cachedY.get();
		}

		// Tile bottom
		if (boxBottom < tileMarginBottom + snapThreshold && boxBottom > tileMarginBottom - snapThreshold) {
			guides.y1.opacity.set(1);
			guides.y1.y.set(tileMarginBottom);
			newBoxY = tileMarginBottom - bounds.height.get();
			snapY = newBoxY - bounds.cachedY.get();
		}

		// Tile top third
		if (boxCenterY < tileYOneThird + snapThreshold && boxCenterY > tileYOneThird - snapThreshold) {
			guides.y1.opacity.set(1);
			guides.y1.y.set(tileYOneThird);
			newBoxY = tileYOneThird - bounds.height.get() / 2;
			snapY = newBoxY - bounds.cachedY.get();
		}

		// Tile bottom third
		if (boxCenterY < tileYTwoThirds + snapThreshold && boxCenterY > tileYTwoThirds - snapThreshold) {
			guides.y1.opacity.set(1);
			guides.y1.y.set(tileYTwoThirds);
			newBoxY = tileYTwoThirds - bounds.height.get() / 2;
			snapY = newBoxY - bounds.cachedY.get();
		}

		return snapY;
	};
	guides.checkY = checkY;

	const checkXDrop = (x, width) => {
		const boxLeft = x - width / 2;
		const boxCenterX = x;
		const boxRight = x + width / 2;

		let snapX = false;

		// Tile center
		if (boxCenterX < tileCenter + snapThreshold && boxCenterX > tileCenter - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileCenter);
			snapX = 0;
		}

		// Tile left margin
		if (boxLeft < tileMarginLeft + snapThreshold && boxLeft > tileMarginLeft - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileMarginLeft);
			snapX = tileMarginLeft;
		}

		// Tile right margin
		if (boxRight < tileMarginRight + snapThreshold && boxRight > tileMarginRight - snapThreshold) {
			guides.x1.opacity.set(1);
			guides.x1.x.set(tileMarginRight);
			snapX = tileMarginRight - width;
		}

		return snapX;
	};
	guides.checkXDrop = checkXDrop;

	return (
		<SVG>
			<Line x1={x1.x} x2={x1.x} y1={-tileHeight} y2={tileHeight} stroke={color} opacity={x1.opacity} />
			<Line y1={y1.y} y2={y1.y} x1={-tileWidth} x2={tileWidth} stroke={color} opacity={y1.opacity} />
		</SVG>
	);
};

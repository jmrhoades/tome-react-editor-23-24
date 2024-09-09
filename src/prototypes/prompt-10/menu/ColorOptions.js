import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import chroma from "chroma-js";

import { Color, colorType, ColorRow } from "../panel/controls/Color";

export const ColorOptions = props => {

    const alphaAmount = 0.25;

	const red = chroma("#F44737");
    const redBackground = red.alpha(alphaAmount);
	const yellow = chroma("#FDDA4D");
    const yellowBackground = yellow.alpha(alphaAmount);
	const green = chroma("#A3CEB2");
    const greenBackground = green.alpha(alphaAmount);
	const blue = chroma("#339DFF");
    const blueBackground = blue.alpha(alphaAmount);
	const purple = chroma("#A77EFF");
    const purpleBackground = purple.alpha(alphaAmount);
	const brown = chroma("#C6864B");
    //const brownBackground = brown.alpha(alphaAmount);
    const brownBackground = chroma("#454545");
	const white = chroma("#FFFFFF");
    const whiteBackground = chroma("#AAAAAA");
	const black = chroma("#000000");
    const blackBackground = chroma("#171717");

	const textColors = [
		{
			label: "Red",
			hex: red.hex(),
			type: colorType.FILL,
		},
		{
			label: "Yellow",
			hex: yellow.hex(),
			type: colorType.FILL,
		},
		{
			label: "Mint",
			hex: green.hex(),
			type: colorType.FILL,
		},
		{
			label: "Blue",
			hex: blue.hex(),
			type: colorType.FILL,
		},
		{
			label: "Purple",
			hex: purple.hex(),
			type: colorType.FILL,
		},
		{
			label: "Sand",
			hex: brown.hex(),
			type: colorType.FILL,
		},
		{
			label: "White",
			hex: white.hex(),
			type: colorType.FILL,
		},
		{
			label: "Black",
			hex: black.hex(),
			type: colorType.FILL,
		},
		{
			label: "Custom",
			type: colorType.PICKER,
		},
		{
			label: "Clear",
			type: colorType.CLEAR,
		},
	];

    const textBackgroundColors = [
		{
			label: "Red",
			hex: redBackground.hex(),
			type: colorType.FILL,
		},
		{
			label: "Yellow",
			hex: yellowBackground.hex(),
			type: colorType.FILL,
		},
		{
			label: "Mint",
			hex: greenBackground.hex(),
			type: colorType.FILL,
		},
		{
			label: "Blue",
			hex: blueBackground.hex(),
			type: colorType.FILL,
		},
		{
			label: "Purple",
			hex: purpleBackground.hex(),
			type: colorType.FILL,
		},
		
		{
			label: "Light gray",
			hex: whiteBackground.hex(),
			type: colorType.FILL,
		},
        {
			label: "Gray",
			hex: brownBackground.hex(),
			type: colorType.FILL,
		},
		{
			label: "Dark gray",
			hex: blackBackground.hex(),
			type: colorType.FILL,
		},
		{
			label: "Custom",
			type: colorType.PICKER,
		},
		{
			label: "Clear",
			type: colorType.CLEAR,
		},
	];

    const colors = props.colors === "backgrounds" ? textBackgroundColors : textColors;

	return (
		<ColorRow>
			{colors.map((c, i) => (
				<Color
					key={"color_" + i}
					id={"color_" + i}
					label={c.label}
					fillColor={c.hex}
					type={c.type}
					onTap={props.onTap}
					theme={props.theme}
				/>
			))}
		</ColorRow>
	);
};

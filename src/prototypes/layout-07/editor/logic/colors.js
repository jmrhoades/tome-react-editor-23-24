import chroma from "chroma-js";

const DARK_THEME_PAGE_COLOR = chroma("#000000").hex();

export const generateAutoTextColors = pageColorHex => {
	const pageColor = chroma(pageColorHex);
	const pageLuminance = pageColor.luminance();

	/*
    lch returns [lightness, chroma, hue] where chroma is the quality of a color's
    purity, intensity or saturation
    ie. A gray color is a neutral -- an extreme low chroma. Fire-engine red may be a high-chroma red.
    see: https://sites.harding.edu/gclayton/Color/Topics/001_HueValueChroma.html
    */

	const pageChroma = pageColor.lch()[1];
	const pageHue = pageColor.lch()[2];

	let titleColor;
	let bodyColor;

	// Default dark theme has an exception in the algorithm.
	// Return specific colors for dark theme.
	if (chroma(pageColorHex).hex() === DARK_THEME_PAGE_COLOR) {
		return {
			titleColor: "#FFFFFF",
			bodyColor: "#959595",
		};
	}

	if (pageLuminance >= 0.5) {
		if (pageChroma >= 30) {
			titleColor = pageColor.set("lch.l", "/2.8").saturate(2.5).set("lch.h", pageHue).hex();
			bodyColor = chroma.mix(pageColor, titleColor, 0.8).hex();
		} else if (pageChroma < 30 && pageChroma >= 1) {
			titleColor = pageColor.set("lch.l", "/2.7").saturate(2.5).set("lch.h", pageHue).hex();
			bodyColor = chroma.mix(pageColor, titleColor, 0.8).hex();
		} else {
			titleColor = pageColor.luminance(0.02).hex();
			bodyColor = pageColor.luminance(0.16).hex();
		}
	} else if (pageLuminance < 0.5 && pageLuminance >= 0.3) {
		if (pageChroma >= 30) {
			titleColor = pageColor.set("lch.l", "/2.3").set("lch.h", pageHue).hex();
			bodyColor = chroma.mix(pageColor, titleColor, 0.8).hex();
		} else if (pageChroma < 30 && pageChroma >= 1) {
			titleColor = pageColor.set("lch.l", "/2.7").saturate(1.2).set("lch.h", pageHue).hex();
			bodyColor = chroma.mix(pageColor, titleColor, 0.8).hex();
		} else {
			titleColor = pageColor.luminance(0.02).hex();
			bodyColor = pageColor.luminance(0.08).hex();
		}
	} else if (pageLuminance < 0.3 && pageLuminance >= 0.15) {
		if (pageChroma >= 50) {
			titleColor = pageColor.set("lch.l", "*2.3").set("lch.h", pageHue).hex();
		} else if (pageChroma < 50 && pageChroma >= 1) {
			titleColor = pageColor.set("lch.l", "*2.7").saturate(0.8).set("lch.h", pageHue).hex();
		} else {
			titleColor = pageColor.set("lch.l", "*3.4").set("lch.h", pageHue).hex();
		}
		bodyColor = chroma.mix(pageColor, titleColor, 0.7).hex();
	} else if (pageLuminance < 0.15 && pageLuminance >= 0.02) {
		if (pageChroma >= 50) {
			titleColor = pageColor.set("lch.l", "*4").set("lch.h", pageHue).hex();
		} else if (pageChroma < 50 && pageChroma >= 1) {
			titleColor = pageColor.set("lch.l", "*6.5").saturate(0.4).set("lch.h", pageHue).hex();
		} else {
			titleColor = pageColor.set("lch.l", "*4").set("lch.h", pageHue).hex();
		}
		bodyColor = chroma.mix(pageColor, titleColor, 0.5).hex();
	} else {
		// we use luminance to guarentee a white.
		titleColor = pageColor.luminance(0.9).hex();
		bodyColor = pageColor.luminance(0.3).hex();
	}

	return {
		titleColor,
		bodyColor,
	};
};

export const generateCanvasColor = pageColor => {
	let pageCol = chroma(pageColor);
	const luminance = pageCol.luminance();
	const chromaPage = pageCol.lch()[1];

	// all possible values for luminance and chroma should fall under these
	const LUMINANCE_MAX = 1.01;
	const CHROMA_PAGE_MAX = 144;

	const canvasColorMods = [
		{
			luminance: 0.05,
			chromaPage: 25,
			instructions: {
				darken: 0.3,
				desaturate: 0.05,
			},
		},
		{
			luminance: 0.05,
			instructions: {
				darken: 0.6,
				desaturate: 0.1,
			},
		},
		{
			luminance: 0.02,
			instructions: {
				brighten: 0.6,
			},
		},
		{
			chromaPage: 3,
			instructions: {
				darken: 0.33,
			},
		},
		{
			chromaPage: 7,
			instructions: {
				darken: 0.3,
				saturate: 0.04,
			},
		},
		{
			chromaPage: 40,
			instructions: {
				darken: 0.25,
			},
		},
		{
			chromaPage: 70,
			instructions: {
				darken: 0.4,
				desaturate: 0.1,
			},
		},
		{
			chromaPage: 100,
			instructions: {
				darken: 0.5,
				desaturate: 0.2,
			},
		},
		{
			instructions: {
				darken: 0.6,
				desaturate: 0.3,
			},
		},
	];

	// find the right instruction set and modify pageColor
	// TODO: make this a helper function so we can use other instruction sets to modify other colors
	canvasColorMods.every(colorMod => {
		// are we below our current maxiumum luminance and chroma?
		if (luminance < (colorMod.luminance || LUMINANCE_MAX) && chromaPage < (colorMod.chromaPage || CHROMA_PAGE_MAX)) {
			// take our instructions in order, checking that types are correct
			for (const [name, value] of Object.entries(colorMod.instructions)) {
				// feed the named function (like "darken") the numeric value
				pageCol = pageCol[name](value);
			}
			// stop looking for more instructions
			return false;
		}
		// return true to apply changes to pageColor
		return true;
	});

	const luminanceMin = 0.02;
	if (luminance <= luminanceMin) {
		pageCol = pageCol.brighten(0.4);
	}

	// convert result to hex and return it
	return pageCol.hex();
};

const LUMINANCE_THRESHOLD = 0.3;
const LIGHT_CONTRAST_THRESHOLD = 1.4;
const DARK_CONTRAST_THRESHOLD = 1.8;

export const RelativeLuminance = {
	DARK: "dark",
	LIGHT: "light",
};

export const isDarkUITheme = color => {
	const luminance = chroma(color).luminance();
	return luminance < LUMINANCE_THRESHOLD ? RelativeLuminance.DARK : RelativeLuminance.LIGHT;
};

export const getContrastAwareStroke = (backgroundColor, foregroundColor) => {
	const isBgLightMode = chroma(backgroundColor).luminance() > 0.5;
	const threshold = isBgLightMode ? 1.4 : 1.8;
	const contrast = chroma.contrast(foregroundColor, backgroundColor);
	let c = foregroundColor;
	if (contrast < threshold) {
		if (isBgLightMode) {
			c = chroma(foregroundColor).darken().hex();
		} else {
			c = chroma(foregroundColor).luminance(0.06).hex();
		}
	}
	return c;
};


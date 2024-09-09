/*
	"backgroundColor"
	"--heading-color"
	"--body-color"
	"--accent-color"

	"--font-size"
	"--heading-font"
	"--heading-weight"
	"--body-font"
	"--body-weight"

	"--border-radius"
*/

export const NO_THEME = () => {
	return {
		id: "NO_THEME",
		name: "NO_THEME",
		mode: "dark",
		tokens: {
			/*
			"backgroundColor": "transparent",
			"--heading-color": "unset",
			"--body-color": "unset",
			"--accent-color": "unset",

			"--font-size": "unset",
			"--heading-font": "unset",
			"--heading-weight": "unset",
			"--body-font": "unset",
			"--body-weight": "unset",
			

			"--border-radius": "unset",
			"--border": "unset",
			"--border-top": "unset",
			"--border-bottom": "unset",
			*/
			
		},
	};
};

export const themeCSS = theme => {
	const themeStyles = {};
	if (theme && theme.tokens) {
		
		for (const [key, value] of Object.entries(theme.tokens)) {
			//console.log(`${key}: ${value}`);
			themeStyles[key] = value;
		}
		
		//themeStyles.backgroundColor = theme.tokens["backgroundColor"];
	}
	return themeStyles;
};

const TomeDark = {
	id: "TomeDark",
	name: "TomeDark",
	mode: "dark",
	tokens: {
		"backgroundColor": "rgba(0, 0, 0, 1)",
		"--heading-color": "rgba(255, 255, 255, 1)",
		"--body-color": "rgba(149, 149, 149, 1)",
		"--accent-color": "rgba(237, 0, 235, 1)",

		"--font-size": "17px",
		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 400,
		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const TomeLight = {
	id: "TomeLight",
	name: "TomeLight",
	mode: "light",
	tokens: {
		"backgroundColor": "rgba(255, 255, 255, 1)",
		"--heading-color": "rgba(0, 0, 0, 1)",
		"--body-color": "rgba(149, 149, 149, 1)",
		"--accent-color": "rgba(237, 0, 235, 1)",

		"--font-size": "17px",
		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 400,
		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const Creme = {
	id: "Creme",
	name: "Creme",
	mode: "light",
	tokens: {
		"backgroundColor": "rgba(239, 235, 229, 1.0)",
		"--heading-color": "rgba(72, 66, 64, 1.0)",
		"--body-color": "rgba(119, 113, 100, 1.0)",
		"--accent-color": "rgba(72, 66, 64, 1.0)",

		"--font-size": "17px",
		"--heading-font": "ABCSyntVariableVF-Trial",
		"--heading-weight": 500,
		"--body-font": "ABCSyntVariableVF-Trial",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const Ocean = {
	id: "Ocean",
	name: "Ocean",
	mode: "dark",
	tokens: {
		"backgroundColor": "rgba(70, 67, 231, 1.0)",
		"--heading-color": "rgba(255, 215, 158, 1.0)",
		"--body-color": "rgba(191, 232, 255, 1.0)",
		"--accent-color": "rgba(255, 215, 158, 1.0)",

		"--font-size": "17px",
		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,
		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const StychA = {
	id: "StychA",
	name: "Stych A",
	mode: "dark",
	tokens: {
		
		"backgroundColor": "rgba(210, 253, 226, 1.0)",

		"--heading-color": "rgba(30, 47, 60, 1.0)",
		"--body-color": "rgba(30, 47, 60, 1.0)",
		"--accent-color": "rgba(30, 47, 60, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 600,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const StychB = {
	id: "StychB",
	name: "Stych B",
	mode: "light",
	tokens: {
		"backgroundColor": "rgba(245, 252, 249, 1.0)",
		"--heading-color": "rgba(0, 0, 0, 1.0)",
		"--body-color": "rgba(30, 47, 60, 1.0)",
		"--accent-color": "rgba(0, 0, 0, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 600,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const StychC = {
	id: "StychC",
	name: "Stych C",
	mode: "light",
	tokens: {
		"backgroundColor": "rgba(255, 255, 255, 1.0)",
		"--heading-color": "rgba(30, 47, 60, 1.0)",
		"--body-color": "rgba(30, 47, 60, 1.0)",
		"--accent-color": "rgba(30, 47, 60, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 300,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 300,

		//"borderRadius": "8px",
	},
};

const StychD = {
	id: "StychD",
	name: "Stych D",
	mode: "dark",
	tokens: {
		"backgroundColor": "rgba(40, 95, 102, 1.0)",
		"--heading-color": "rgba(255, 255, 255, 1.0)",
		"--body-color": "rgba(255, 255, 255, 1.0)",
		"--accent-color": "rgba(255, 255, 255, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 600,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const TE_EP_133 = {
	id: "TE_EP_133",
	name: "TE ep-133",
	mode: "light",
	tokens: {
		"backgroundColor": "rgba(229, 229, 229, 1)",
		"--heading-color": "rgba(255, 119, 70, 1)",
		"--body-color": "rgba(39, 39, 39, 1)",
		"--accent-color": "rgba(255, 119, 70, 1)",

		"--font-size": "17px",
		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 300,
		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 300,

		//"borderRadius": "8px",
	},
};

const RampA = {
	id: "RampA",
	name: "Ramp A",
	mode: "light",
	tokens: {
		"backgroundColor": "rgba(244, 243, 239, 1)",
		"--heading-color": "rgba(28, 27, 23, 1)",
		"--body-color": "rgba(28, 27, 23, 0.6)",
		"--accent-color": "rgba(30, 50, 45, 1)",

		"--font-size": "17px",
		"--heading-font": "TWKLausanne",
		"--heading-weight": 550,
		"--body-font": "TWKLausanne",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

const RampB = {
	id: "RampB",
	name: "Ramp B",
	mode: "dark",
	tokens: {
		"backgroundColor": "rgba(30, 50, 45, 1)",
		"--heading-color": "rgba(255, 255, 255, 1)",
		"--body-color": "rgba(244, 243, 239, 0.85)",
		"--accent-color": "rgba(231, 242, 86, 1)",

		"--font-size": "13px",
		"--heading-font": "TWKLausanne",
		"--heading-weight": 550,
		"--body-font": "TWKLausanne",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

export const Themes = {
	//Creme: Creme,
	//Ocean: Ocean,
	StychA: StychA,
	StychB: StychB,
	StychC: StychC,
	StychD: StychD,

	TomeDark: TomeDark,
	TomeLight: TomeLight,

	TE_EP_133: TE_EP_133,

	RampA: RampA,
	RampB: RampB,
};

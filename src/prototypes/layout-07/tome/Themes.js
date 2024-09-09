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

const Dark = {
	id: "TomeDark",
	name: "Dark",
	mode: "dark",
	autoColor: true,
	tokens: {
		"--page-color": "#0a0a0a",
		"--heading-color": "rgba(255, 255, 255, 1)",
		"--body-color": "rgba(149, 149, 149, 1)",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 400,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};

const Light = {
	id: "TomeLight",
	name: "Light",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "#FFFFFF",
		"--heading-color": "rgba(0, 0, 0, 1)",
		"--body-color": "rgba(149, 149, 149, 1)",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};

const Creme = {
	id: "Creme",
	name: "Creme",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "rgba(239, 235, 229, 1.0)",
		"--heading-color": "rgba(72, 66, 64, 1.0)",
		"--body-color": "rgba(119, 113, 100, 1.0)",

		"--accent-color": "rgba(72, 66, 64, 1.0)",
		"--accent-foreground-color": "var(--heading-color)",

		"--font-size": "19px",

		"--heading-font": "ABCSyntVariableVF-Trial",
		"--heading-weight": 500,

		"--body-font": "ABCSyntVariableVF-Trial",
		"--body-weight": 400,
	},
};

const Ocean = {
	id: "Ocean",
	name: "Ocean",
	mode: "dark",
	autoColor: true,
	tokens: {
		"--page-color": "#4643E7",
		"--heading-color": "#FFD79E",
		"--body-color": "#BCBBE1",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};

const Moss = {
	id: "Moss",
	name: "Moss",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "#07311D",
		"--heading-color": "#D9E9B7",
		"--body-color": "#8D9984",

		"--font-size": "19px",

		"--heading-font": "ABCSyntVariableVF-Trial",
		"--heading-weight": 500,

		"--body-font": "ABCSyntVariableVF-Trial",
		"--body-weight": 400,
	},
};

const Dune = {
	id: "Dune",
	name: "Dune",
	mode: "dark",
	autoColor: true,
	tokens: {
		"--page-color": "#AB5E27",
		"--heading-color": "#FFDCC3",
		"--body-color": "#F8C29D",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};

const Algae = {
	id: "Algae",
	name: "Algae",
	mode: "light",
	autoColor: false,
	tokens: {
		"--page-color": "#8DE9B2",
		"--heading-color": "#070D30",
		"--body-color": "#101B3C",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};

const Plum = {
	id: "Plum",
	name: "Plum",
	mode: "dark",
	autoColor: false,
	tokens: {
		"--page-color": "#09123F",
		"--heading-color": "#F186FF",
		"--body-color": "#9152B9",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};


const Rust = {
	id: "Rust",
	name: "Rust",
	mode: "dark",
	autoColor: false,
	tokens: {
		"--page-color": "#710130",
		"--heading-color": "#EFEBE9",
		"--body-color": "#D3B6BD",

		"--font-size": "19px",

		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 500,

		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,
	},
};



const TomeSlate = {
	id: "TomeSlate",
	name: "Tome Slate",
	mode: "dark",
	autoColor: true,
	tokens: {
		"--page-color": "#1F1E22",

		"--heading-color": "#F7F5E7",
		"--body-color": "#A4A2AA",
		"--accent-color": "rgba(237, 0, 235, 1)",
		"--accent-foreground-color": "var(--heading-color)",

		"--font-size": "19px",
		"--heading-font": "ABCDiatypeVariable",
		"--heading-weight": 400,
		"--body-font": "ABCDiatypeVariable",
		"--body-weight": 400,

		"--tile-hover-color": "rgba(255, 255, 255, 0.12)",

		//"borderRadius": "8px",
	},
};

const StychA = {
	id: "StychA",
	name: "Stych A",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "rgba(210, 253, 226, 1.0)",

		"--heading-color": "rgba(30, 47, 60, 1.0)",
		"--body-color": "rgba(30, 47, 60, 1.0)",
		"--accent-color": "rgba(30, 47, 60, 1.0)",
		"--accent-foreground-color": "rgba(210, 253, 226, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 600,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 400,

		"--tile-hover-color": "rgba(255, 255, 255, 0.12)",
		//"borderRadius": "8px",
	},
};

const StychB = {
	id: "StychB",
	name: "Stych B",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "rgba(245, 252, 249, 1.0)",
		"--heading-color": "#19303D",
		"--body-color": "rgba(30, 47, 60, 1.0)",
		"--accent-color": "rgba(0, 0, 0, 1.0)",
		"--accent-foreground-color": "rgba(245, 252, 249, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 600,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 400,

		"--tile-hover-color": "rgba(0, 0, 0, 0.04)",
		//"borderRadius": "8px",
	},
};

const StychC = {
	id: "StychC",
	name: "Stych C",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "rgba(255, 255, 255, 1.0)",
		"--heading-color": "rgba(30, 47, 60, 1.0)",
		"--body-color": "rgba(30, 47, 60, 1.0)",
		"--accent-color": "rgba(30, 47, 60, 1.0)",
		"--accent-foreground-color": "rgba(255, 255, 255, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 300,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 300,

		"--tile-hover-color": "rgba(30, 47, 60, 0.08)",
		//"borderRadius": "8px",
	},
};

const StychD = {
	id: "StychD",
	name: "Stych D",
	mode: "dark",
	autoColor: true,
	tokens: {
		"--page-color": "rgba(40, 95, 102, 1.0)",

		"--heading-color": "rgba(255, 255, 255, 1.0)",
		"--body-color": "rgba(255, 255, 255, 1.0)",
		"--accent-color": "rgba(255, 255, 255, 1.0)",
		"--accent-foreground-color": "rgba(40, 95, 102, 1.0)",

		"--font-size": "17px",
		"--heading-font": "IBM Plex Sans",
		"--heading-weight": 600,
		"--body-font": "IBM Plex Sans",
		"--body-weight": 400,

		"--tile-hover-color": "rgba(255, 255, 255, 0.12)",
		//"borderRadius": "8px",
	},
};

const TE_EP_133 = {
	id: "TE_EP_133",
	name: "TE ep-133",
	mode: "light",
	autoColor: true,
	tokens: {
		"--page-color": "rgba(229, 229, 229, 1)",
		"--heading-color": "rgba(255, 119, 70, 1)",
		"--body-color": "rgba(39, 39, 39, 1)",
		"--accent-color": "rgba(255, 119, 70, 1)",
		"--accent-foreground-color": "rgba(229, 229, 229, 1)",

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
	autoColor: true,
	tokens: {
		"--page-color": "rgba(244, 243, 239, 1)",
		"--heading-color": "rgba(28, 27, 23, 1)",
		"--body-color": "rgba(28, 27, 23, 0.6)",
		"--accent-color": "rgba(30, 50, 45, 1)",
		"--accent-foreground-color": "rgba(244, 243, 239, 1)",

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
	autoColor: true,
	tokens: {
		"--page-color": "rgba(30, 50, 45, 1)",
		"--heading-color": "rgba(255, 255, 255, 1)",
		"--body-color": "rgba(244, 243, 239, 0.85)",
		"--accent-color": "rgba(231, 242, 86, 1)",
		"--accent-foreground-color": "rgba(30, 50, 45, 1)",

		"--font-size": "13px",
		"--heading-font": "TWKLausanne",
		"--heading-weight": 550,
		"--body-font": "TWKLausanne",
		"--body-weight": 400,

		//"borderRadius": "8px",
	},
};

export const Themes = {
	Dark: Dark,
	Light: Light,
	Creme: Creme,
	Ocean: Ocean,
	Moss: Moss,
	Dune: Dune,
	Algae: Algae,
	Plum: Plum,

	StychA: StychA,
	StychB: StychB,
	StychC: StychC,
	StychD: StychD,
	TomeSlate: TomeSlate,
	TE_EP_133: TE_EP_133,
	RampA: RampA,
	RampB: RampB,
};

export const ThemesMenuList = {
	Dark: Dark,
	Light: Light,
	Creme: Creme,
	Ocean: Ocean,
	Moss: Moss,
	//Dune: Dune,
	Algae: Algae,
	Plum: Plum,
	Rust: Rust,
};

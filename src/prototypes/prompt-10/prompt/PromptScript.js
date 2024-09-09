import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY, lineLength } from "../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../tome/TomeContext";
import { Themes } from "../tome/Themes";
import { LoadingStates } from "./Prompt";

let page = null;
let row = null;
let tile1 = {};
let tile2 = {};
let tile3 = {};
let tile4 = {};
let tile5 = {};
let tile6 = {};
let textTile1 = {};
let textTile2 = {};
let textTile3 = {};
let textTile4 = {};
let textTile5 = {};
let textTile6 = {};
let textTile7 = {};
let textTile8 = {};

let delay = 2000;
let increment = 1000;

export const startGenerating = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, delay);
	});
};

export const getTitle = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 500);
	});
};

export const getOutline = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, increment);
	});
};

export const makeTitlePage = (title, tome, saveState, theme) => {
	//tome.title = "Introducing Cloudhop";
	tome.title = title;
	tome.isGenerating = true;
	tome.theme = theme;

	// Page
	page = tome.pages[0];
	page.isGenerated = true;

	// Tile
	textTile1 = tome.tiles[0];
	textTile1.params.textLoaded = false;
	textTile1.params.blocks[0].type = textBlockType.H1;
	//textTile1.params.blocks[0].content = title;
	textTile1.params.blocks[0].content = undefined;
	textTile1.params.blocks[0].blocks = [];
	const words = title.split(" ");
	words.map((w, i) => textTile1.params.blocks[0].blocks.push(
		{
			id: uniqueId("block"),
			type: textBlockType.SPAN,
			content: w + " ",
		} )
	)
	saveState();

	return new Promise(resolve => {
		setTimeout(() => {
			textTile1.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makeOutline = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;
	// Row
	row = appendRowToPageInTome(page, tome);
	textTile2 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Problem",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Solution",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Features",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Benefits",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Pricing",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H1,
						content: "Next Steps",
					},
				],
			},
		},
		row,
		tome
	);
	saveState();
	if (autoPaging.current === true) showPage(page);
	return new Promise(resolve => {
		setTimeout(() => {
			textTile2.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makePage1 = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile3 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Problem",
						//color: "#96423C",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Traffic in the Bay Area is a daily nightmare for tech employees.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Commuting to work can take hours and is highly stressful.",
					},
				],
			},
		},
		row,
		tome
	);
	tile1 = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/d-bgs/image1.jpg",
				imageSize: "cover",
				isLoading: true,
			},
		},
		row,
		tome
	);
	saveState();
	console.log("autoPaging", autoPaging.current);
	if (autoPaging.current === true) showPage(page);

	setTimeout(() => {
		tile1.params.isLoading = false;
		saveState();
	}, 2000);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile3.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makePage2 = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile4 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Solution",
						//color: "#4E7666",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Introducing Cloudhop, a flying bus that transports tech employees from downtown San Francisco to a Silicon Valley campus.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Cloudhop is fast, convenient, and affordable.",
					},
				],
			},
		},
		row,
		tome
	);

	tile2 = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/d-bgs/image2.jpg",
				imageSize: "cover",
				isLoading: true,
			},
		},
		row,
		tome
	);
	saveState();
	if (autoPaging.current === true) showPage(page);

	setTimeout(() => {
		tile2.params.isLoading = false;
		saveState();
	}, 1200);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile4.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makePage3 = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile5 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Features",
						//color: "#6AAED0",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H4,
						content: "High-speed electric propulsion system",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Cloudhop can fly at speeds of up to 150 mph, making it the fastest way to commute.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H4,
						content: "Luxurious interiors",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Cloudhop features comfortable seats, ample legroom, and other amenities to make commuting a pleasure.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H4,
						content: "Safe and reliable",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Cloudhop is designed and built to the highest safety standards, ensuring a smooth and trouble-free ride.",
					},
				],
			},
		},
		row,
		tome
	);
	tile3 = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/d-bgs/image3.jpg",
				isLoading: true,
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	saveState();
	console.log("autoPaging", autoPaging.current);
	if (autoPaging.current === true) showPage(page);

	setTimeout(() => {
		tile3.params.isLoading = false;
		saveState();
	}, 2000);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile5.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makePage4 = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile6 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Benefits",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H4,
						content: "Save time",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Cloudhop cuts commuting time in half, so tech employees can spend more time at home or in the office.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H4,
						content: "Save money",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Cloudhop is significantly cheaper than driving or using ride-sharing services.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.H4,
						content: "Reduce stress",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Cloudhop offers a comfortable and relaxing commuting experience.",
					},
				],
			},
		},
		row,
		tome
	);
	tile4 = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/d-bgs/image7.jpg",
				imageSize: "cover",
				isLoading: true,
			},
		},
		row,
		tome
	);
	saveState();
	if (autoPaging.current === true) showPage(page);

	setTimeout(() => {

		tile4.params.isLoading = false;
		saveState();
	}, 2000);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile6.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makePage5 = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile7 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Pricing",
						//color: "rgba(255,255,255,0.4)",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Cloudhop is offered at a flat monthly rate, making it easy to budget for commuting expenses.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Subsidies and discounts are available for frequent users and large groups.",
					},
				],
			},
		},
		row,
		tome
	);

	tile6 = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/d-bgs/image9.jpg",
				imageSize: "cover",
				isLoading: true,
			},
		},
		row,
		tome
	);
	saveState();
	if (autoPaging.current === true) showPage(page);

	setTimeout(() => {
		tile6.params.isLoading = false;
		tome.isGenerating = false;
		saveState();
	}, 2000);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile7.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};

export const makePage6 = (tome, saveState, showPage, theme, autoPaging) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile8 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				lineLength: lineLength.M,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Next Steps",
						//color: "rgba(255,255,255,0.4)",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"We are currently seeking $15M in funding to help us launch and scale Cloudhop. This funding will be used to develop and produce the flying buses, build out the necessary infrastructure, and hire and train a team of pilots and support staff.",
					},
				],
			},
		},
		row,
		tome
	);

	saveState();
	if (autoPaging.current === true) showPage(page);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile8.params.textLoaded = true;
			resolve(true);
		}, increment);
	});
};





/*

export const makePage6 = (tome, saveState, showPage) => {
	// Page
	page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Row
	row = appendRowToPageInTome(page, tome);
	textTile7 = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Sustainability",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"Cloudhop is powered by electric propulsion, making it a zero-emissions mode of transportation.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content:
							"By reducing traffic on the roads, Cloudhop helps to reduce air pollution and greenhouse gas emissions.",
					},
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Cloudhop is a sustainable and environmentally-friendly way to commute to work.",
					},
				],
			},
		},
		row,
		tome
	);
	tile5 = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/d-bgs/image8.jpg",
				imageSize: "cover",
				isLoading: true,
			},
		},
		row,
		tome
	);
	saveState();
	showPage(page);
	setTimeout(() => {
		tile5.params.isLoading = false;
		saveState();
	}, delay + 1500);
};
*/
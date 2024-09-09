import React, { useState, useRef, createContext } from "react";

import { useParams } from "react-router-dom";
import { useMotionValue } from "framer-motion";
import { uniqueId } from "lodash";
//import Color from "colorjs.io";
import chroma from "chroma-js";

import { makeTestTomes } from "../tomes/testTomes";
import { metricConstants } from "./MetricsContext";
import { tileNames, alignmentX, alignmentY, textBlockType, tableTileType, panelNames } from "../page/TileConstants";
import { Configuration, OpenAIApi } from "openai";

import { createApi } from "unsplash-js";

import {
	pageCountOptions,
	imageOptions,
	artStyles,
	tomeTypes,
	web2TomeImageOptions,
	CREATE_TOME_FORMAT_OPTIONS,
	CREATE_TOME_IMAGE_OPTIONS,
	CREATE_TILES_TYPES_OPTIONS,
} from "../prompt/PromptConstants";
import { makeRewriteBlocksPrompt } from "../prompt/GPT3";
import { Themes } from "../tome/Themes";

import useSound from "use-sound";

export const permissions = {
	COMMENT_ONLY: "Comment only",
	EDITOR: "Editor",
};

export const newPage = (order = 1) => {
	const pageId = uniqueId("page");
	return {
		id: pageId,
		order: order,
		layout: {
			margins: true,
			marginValue: 140,
			gaps: true,
			gapValue: 12,
			corners: true,
			cornerValue: 12,
		},
	};
};

export const newRowForPage = pageId => {
	const rowId = uniqueId("row");
	return {
		id: rowId,
		pageId: pageId,
		order: 1,
		height: metricConstants.cRowDefaultHeight,
		flexHeight: true,
	};
};

export const rowsForPageInTome = (page, tome) => {
	// all the rows in the page sorted by order
	let rows = tome.rows.filter(r => {
		return r.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	return rows;
};

export const appendTomeToTomes = (tomes, id, title) => {
	// Set up
	const tome = {
		id: id,
		title: title,
		pages: [],
		rows: [],
		tiles: [],
		noContent: true,
		prompt: {
			type: tomeTypes[0],
			images: imageOptions[2],
			artStyle: artStyles[0],
			showError: false,
			slowAnimation: false,
			web2TomeImage: web2TomeImageOptions[2],
			createTomeTheme: Themes[0],
			createTomeFormat: CREATE_TOME_FORMAT_OPTIONS[0],
			createTomeImages: CREATE_TOME_IMAGE_OPTIONS[0],
			createTilesTypes: [
				CREATE_TILES_TYPES_OPTIONS[0].id,
				CREATE_TILES_TYPES_OPTIONS[1].id,
				CREATE_TILES_TYPES_OPTIONS[2].id,
			],
			createTomePageLength: 0.5,
			createTomePageAbsoluteLength: 6,
			createTomeOutline: true,
			createTomeTitle: "",
			createTomeHeadings: [],
		},
	};
	tomes.push(tome);
	return tome;
};

export const appendPageToTome = (tome, theme) => {
	// console.log("appendPageToTome", tome);
	const page = newPage();
	page.order = tome.pages.length + 1;
	page.theme = theme;
	tome.pages.push(page);
	return page;
};

export const appendRowToPageInTome = (page, tome) => {
	const row = newRowForPage(page.id);
	row.order = rowsForPageInTome(page, tome).length + 1;
	tome.rows.push(row);
	return row;
};

export const appendRowAtOrder = (page, tome, order) => {
	const row = newRowForPage(page.id);
	const rows = tome.rows.filter(r => {
		return r.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	rows.forEach((rO, j) => {
		const newOrder = j + 1;
		if (rO.order < order) {
			rO.order = newOrder;
		}
		if (rO.order >= order) {
			rO.order = newOrder + 1;
		}
	});
	row.order = order;
	tome.rows.push(row);
	/*
	const rows = tome.rows.filter(r => {
		return r.pageId === page.id;
	});
	*/
	//rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	console.log(rows);
	return row;
};

export const appendTileToRowInTome = (data, row, tome, width = false) => {
	// Find the current page
	const page = tome.pages.find(({ id }) => id === row.pageId);

	// Find other tiles in row
	const tiles = findTilesInRowAndTome(row, tome);

	const order = tiles.length > 0 ? tiles.length + 1 : 1;
	if (!width) {
		width = tiles.length > 0 ? 12 / (tiles.length + 1) : 12;
		// Update other tiles' widths
		tiles.forEach(t => {
			t.width = width;
		});
	}

	let isNull = data.params ? false : true;
	if (data.isNull) isNull = true;
	if (
		data.type === tileNames.TEXT.name &&
		data.params &&
		data.params.blocks.length === 1 &&
		data.params.blocks[0].content === ""
	)
		isNull = true;

	const tile = {
		pageId: page.id,
		rowId: row.id,
		id: uniqueId("tile_"),
		order: order,
		width: width,
		type: data.type,
		params: data.params,
		isNull: isNull,
	};

	tome.tiles.push(tile);
	return tile;
};

export const newTileForNewPageAndRow = (pageId, rowId) => {
	const tileId = "tile" + Math.round(Math.random() * 10000);
	return {
		id: tileId,
		pageId: pageId,
		rowId: rowId,
		order: 1,
		width: 12,
		type: tileNames.TEXT.name,
		params: {},
		isNull: true,
	};
};

export const createRow = (pageId, order, height) => {
	const newRow = {
		id: uniqueId("row"),
		pageId: pageId,
		order: order,
		height: height,
		flexHeight: true,
	};
	return newRow;
};

export const findTilesInRowAndTome = (row, tome) => {
	const tiles = tome.tiles.filter(t => {
		return t.pageId === row.pageId && t.rowId === row.id;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
	return tiles;
};

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	let { tomeId, pageNumber } = useParams();

	//console.log(tomeId, pageNumber);

	/*
	Tome Data
	*/
	const testTomes = makeTestTomes();
	let testTome = undefined;
	if (tomeId) {
		testTome = testTomes.find(t => t.id === tomeId);
		//if (testTome) console.log("match!", testTome);
	}
	if (testTome === undefined) testTome = testTomes[0];
	const [tomeData, setTomeData] = useState(testTome);
	//tomeData.pages.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
	Pages
	*/
	let startPage = 0;
	//console.log(startPage, pageNumber)
	if (pageNumber) {
		startPage = pageNumber - 1;
	}
	const [currentPage, setCurrentPage] = useState(tomeData.pages[startPage]);
	const [previousPage, setPreviousPage] = useState(null);
	const [selectedOutlinePage, setSelectedOutlinePage] = useState("");

	// Check if tome is empty or null or new
	const checkForEmptyTome = () => {
		let noContent = false;
		if (tomeData.tiles) {
			if (tomeData.tiles.length === 1) {
				if (tomeData.tiles[0].type === tileNames.TEXT.name) {
					if (tomeData.tiles[0].params && tomeData.tiles[0].params.blocks) {
						if (tomeData.tiles[0].params.blocks[0].content === "") {
							noContent = true;
						}
					}
				}
			}
		}
		tomeData.noContent = noContent;
		return noContent;
	};
	const tomeIsEmpty = checkForEmptyTome(tomeData);

	// Check if page is empty or null or new
	const checkForEmptyPage = (page = currentPage) => {
		let noContent = false;
		const tiles = tomeData.tiles.filter(t => t.pageId === page.id);
		if (tiles.length === 1) {
			if (tiles[0].type === tileNames.TEXT.name) {
				if (tiles[0].params && tiles[0].params.blocks) {
					if (tiles[0].params.blocks[0].content === "") {
						noContent = true;
					}
				}
			}
		}
		return noContent;
	};

	/*
	Property panel state
	*/
	//const [sidePanelOpen, setSidePanelOpen] = useState(true);
	//const [panelName, setPanelName] = useState(firstTile.type);
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [panelName, setPanelName] = useState(null);

	/*
	Prompt
	*/
	const [promptIsOpen, setPromptIsOpen] = useState(tomeIsEmpty);
	//console.log("PROMPT KEY", process.env.REACT_APP_OPEN_AI_KEY)
	const configuration = new Configuration({
		organization: "org-W3BxFb3AkhwluGzqRAecoA2j",
		apiKey: process.env.REACT_APP_OPEN_AI_KEY,
	});
	const openai = new OpenAIApi(configuration);

	/*
	Unsplash
	*/
	const unsplash = createApi({
		accessKey: "iTra_u9cmdLkQKvw84lpDz8soHRAFA5nRN7LoLCoEKU",
	});

	/* 
	Editor state
	*/
	const [isPlayMode, setIsPlayMode] = useState(false);
	//const [editorState, setEditorState] = useState("editing");
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuInfo, setContextMenuInfo] = useState({ x: 0, y: 0, items: [] });
	const [menuInfo, setMenuInfo] = useState({ x: 0, y: 0, type: "TOME" });
	const [playSounds, setPlaySounds] = useState(true);

	/* 
	Permissions
	*/
	//const [permission, setPermission] = useState(permissions.EDITOR);

	/*
		Undo cache
	*/
	const [undoCache, setUndoCache] = useState();
	//const undoCache = useRef([]);

	/* Drop Indicator State */
	const dropIndicatorInfo = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
		opacity: useMotionValue(0),
		backgroundDropOpacity: useMotionValue(0),
		backgroundDropType: useMotionValue("Image"),
	};

	/*
	Outline
	*/
	const [outlineItems, setOutlineItems] = React.useState([]);

	/*
	Toast
	*/
	const [toastData, setToastData] = useState({ id: undefined, label: undefined, undo: undefined });

	/* 
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);
	const [rowResizing, setRowResizing] = useState(null);
	const [textTileFocussed, setTextTileFocussed] = useState(false);

	const [tileDropInfo, setTileDropInfo] = useState({ show: false, x: -1, y: -1, height: 0, width: 0 });
	const showTileDropTarget = useMotionValue(false);
	const [isTileAnimating, setIsTileAnimating] = useState(false);
	const [tileDragging, setTileDragging] = useState(false);
	const copiedTile = useRef(null);
	const copiedTileRowHeight = useRef(null);
	const tileHoveringId = useMotionValue(null);
	const tileReplaceId = useMotionValue(null);
	const contentTileHeightsList = useRef([]);

	const [backgroundSelected, setBackgroundSelected] = useState(null);

	const [layoutTweaking, setLayoutTweaking] = useState(false);

	const [isGenerating, setIsGenerating] = useState(false);
	const [isReviewing, setIsReviewing] = useState(false);
	//const [isAutoPaging, setIsAutoPaging] = useState(true);
	const autoPaging = useRef(true);

	const addPage = (templateName = "") => {
		const TD = tableTileType.TD;

		//console.log("addPage", templateName);

		// Page
		const page = appendPageToTome(tomeData, currentPage.theme);
		// Row
		let row = appendRowToPageInTome(page, tomeData);

		if (templateName === "ThreeText&Media") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
		} else if (templateName === "Media&2Text") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 14;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 6;
		} else if (templateName === "TwoMedia") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Media") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Text&Table") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H3,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 2;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TABLE.name,
					params: {
						columns: [220, 220, 220, 220],
						rows: [
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
						],
					},
				},
				row,
				tomeData
			);
			row.height = 10;
		} else if (templateName === "Text&Media") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Centered") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.CENTER,
						alignmentY: alignmentY.MIDDLE,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H1,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
		} else if (templateName === "ThreeMedia") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Title&6Media") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.CENTER,
						alignmentY: alignmentY.MIDDLE,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H1,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
		} else {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		}

		// Update tome data
		saveState();
		// console.log("addPage", tomeData);

		// deselect stuff
		setSelectedOutlinePage(null);

		// Set current page to new page
		showPage(page, true);

		// Return newly created page
		return page;
	};

	const goToNextPage = () => {
		const nextPage = tomeData.pages.find(page => page.order === currentPage.order + 1);
		if (nextPage) {
			showPage(nextPage);
			if (selectedOutlinePage) setSelectedOutlinePage(nextPage);
		}
	};

	const goToPreviousPage = () => {
		const previousPage = tomeData.pages.find(page => page.order === currentPage.order - 1);
		if (previousPage) {
			showPage(previousPage);
			if (selectedOutlinePage) setSelectedOutlinePage(previousPage);
		}
	};

	const showPage = (page, isNew = false) => {
		if (page.id === currentPage.id) return;

		if (currentPage) {
			setPreviousPage(currentPage);
		}
		setCurrentPage(page);

		// deselect stuff
		setSidePanelOpen(false);
		setSelectedTile(null);

		// remove generated tag
		if (!tomeData.isGenerating && page.isGenerated) {
			page.isGenerated = false;
			saveState();
		}

		// Remove new page ID
		if (tomeData.newTileID) {
			tomeData.newTileID = null;
			tomeData.newTileInfo = null;
			saveState();
		}
	};

	const selectOutlinePage = page => {
		// deselect stuff
		setSidePanelOpen(false);
		setPanelName("");
		setSelectedTile(null);
		setPromptIsOpen(false);

		// stop auto paging
		//setIsAutoPaging(false);
		//console.log("isAutoPaging", isAutoPaging)

		// show page
		showPage(page);

		// select outline thumbnail
		setSelectedOutlinePage(page);
	};

	const resetTome = () => {
		/*
		const testTomes = makeTestTomes();
		let testTome = undefined;
		if (tomeId) testTome = testTomes.find(t => t.id === tomeId);
		if (testTome === undefined) testTome = testTomes[0];
		setCurrentPage(null);
		showPage(tomeData.pages[0])
		*/
		tomeData.title = "New tome";

		// Sort pages array by order
		tomeData.pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Show first page
		showPage(tomeData.pages[0]);
		// Delete rest of pages
		tomeData.pages.splice(1, tomeData.pages.length - 1);
		tomeData.rows.splice(1, tomeData.rows.length - 1);
		tomeData.tiles.splice(1, tomeData.tiles.length - 1);
		//
		tomeData.tiles[0].params.blocks[0].blocks = undefined;
		tomeData.tiles[0].params.blocks[0].content = "";
		console.log(tomeData);
		saveState();
	};

	const deletePage = page => {
		// Don't delete the last page!
		if (tomeData.pages.length === 1) return false;

		// Find the index of the page in the pages array
		const index = tomeData.pages.indexOf(page);

		// Show either the previous or next page
		if (page === currentPage) {
			// Find the page before
			const newPage = tomeData.pages[index - 1] ? tomeData.pages[index - 1] : tomeData.pages[index + 1];
			setCurrentPage(newPage);
			if (selectedOutlinePage) setSelectedOutlinePage(newPage);
		}

		// Remove the page from the tome data
		const deletedPage = tomeData.pages.splice(index, 1)[0];

		// Sort remaining pages array by order
		tomeData.pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Re-assign orders
		// Increment order value for every page after new page
		for (let i = 0; i < tomeData.pages.length; i++) {
			tomeData.pages[i].order = i + 1;
		}

		// Update tome data
		console.log("delete at index ", index, page, deletedPage);
		saveState();
	};

	/*
	Tiles
	*/

	const incrementTileWidth = (tile, increment = 1) => {
		//
		// a single tile is selected so the width change
		// should just apply to that tile
		// all tiles to the right of the changing tile
		// will have to update their widths in response
		//
		const maxWidth = metricConstants.cColumnCount;
		const tiles = tomeData.tiles.filter(t => t.rowId === tile.rowId);
		if (tiles.length === 1 && tile.width + increment > maxWidth) return false;
		const rightTile = tiles.find(({ order }) => order === tile.order + 1);

		if (tile.width + increment < 1) {
			return false;
		}
		if (rightTile && rightTile.width - increment < 1) {
			return false;
		}
		if (!rightTile) {
			let totalWidth = 0;
			for (const t of tiles) {
				totalWidth += t.width;
			}
			if (totalWidth + increment > maxWidth) return false;
		}

		/*
		const rightTiles = tiles.filter(({ order }) => order > tile.order);
		
		let totalWidth = 0;
		for (const t of tiles) {
			totalWidth += t.width;
		}
		if (totalWidth !== maxWidth) {
			const remainderWidth = (totalWidth - maxWidth) / rightTiles.length;
			for (const t of rightTiles) {
				t.width -= remainderWidth;
			}

		}
		*/

		tile.width += increment;
		if (rightTile) rightTile.width -= increment;

		saveState();
		return true;
	};

	const incrementTileHeight = (tile, increment = 1) => {
		const row = tomeData.rows.find(r => r.id === tile.rowId);
		if (row.height + increment < 1) {
			return false;
		}
		row.height += increment;
		saveState();
		return true;
	};

	const createTileInRowAtOrder = (tileName, row, order) => {
		console.log("createTileInRowAtOrder", tileName, row, order);

		// Is order too large?
		if (order > metricConstants.cColumnMax) {
			order = 1;
			row = appendRowAtOrder(currentPage, tomeData, row.order + 1);
		}

		let tile = {};
		if (tileName.typeof === "string") {
			// Create new tile
			tile = {
				id: uniqueId("tile_"),
				pageId: currentPage.id,
				rowId: row.id,
				order: order,
				type: tileName,
				params: {},
				isNull: true,
				width: 0,
			};
			// Text tile specific
			if (tileName === tileNames.TEXT.name) {
				tile.params = {
					alignmentX: alignmentX.CENTER,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block_h_"),
							type: textBlockType.H1,
							content: "",
						},
					],
				};
			}
		} else {
			tile = tileName;
			tile.pageId = currentPage.id;
			tile.rowId = row.id;
			tile.order = order;
			tile.width = 0;
		}

		// Find other tiles in the same row
		let tilesInRow = tomeData.tiles.filter(tile => {
			return tile.rowId === row.id;
		});
		tilesInRow.sort((a, b) => (a.order > b.order ? 1 : -1));
		if (tilesInRow && tilesInRow.length > 0) {
			const maxPerRow = metricConstants.cColumnMax;
			if (tilesInRow.length >= maxPerRow) {
				// Too many tiles in this row, boot the last tile down
				const lastTile = tilesInRow.splice(tilesInRow.length - 1, 1)[0];
				// Make a new row for the booted tile
				const newRow = appendRowAtOrder(currentPage, tomeData, row.order + 1);
				newRow.height = row.height;
				lastTile.width = metricConstants.cColumnCount;
				lastTile.rowId = newRow.id;
				lastTile.order = 1;
			}
			// Update orders
			tilesInRow.forEach((t, i) => {
				const newOrder = i + 1;
				if (newOrder < order) t.order = newOrder;
				if (newOrder >= order) t.order = newOrder + 1;
			});
		} else if (tile.params.height12) {
			row.height = tile.params.height12; // hack
		}
		// Add tile to tome data
		tomeData.tiles.push(tile);
		// Redistribute tile widths
		tilesInRow = tomeData.tiles.filter(tile => {
			return tile.rowId === row.id;
		});
		tilesInRow.forEach((t, i) => {
			t.width = metricConstants.cColumnCount / tilesInRow.length;
		});

		// save state
		saveState();

		// Select the new tile
		selectTile(tile);

		// Return created tile object
		return tile;
	};

	const appendNewTile = tileName => {
		let row = undefined;
		let order = undefined;
		const maxPerRow = metricConstants.cColumnMax;
		if (selectedTile) {
			row = tomeData.rows.find(r => r.id === selectedTile.rowId);
			order = selectedTile.order + 1;
			if (order >= maxPerRow) {
				row = appendRowAtOrder(currentPage, tomeData, row.order + 1);
				order = 1;
			}
		} else {
			// no tile selected, append new tile to last row
			order = 1;
			const rows = tomeData.rows.filter(r => {
				return r.pageId === currentPage.id;
			});
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));
			row = rows[rows.length - 1];
			const tiles = tomeData.tiles.filter(tile => {
				return tile.pageId === currentPage.id && tile.rowId === row.id;
			});
			if (tiles.length >= 4) {
				row = appendRowAtOrder(currentPage, tomeData, row.order + 1);
			} else {
				order = tiles.length + 1;
			}
		}
		const tile = createTileInRowAtOrder(tileName, row, order);
		// Select the new tile
		selectTile(tile);
		return tile;
	};

	const onGeneratedImageClick = (url, closePromptBar) => {
		console.log("onGeneratedImageClick", url, selectedTile);
		console.log(selectedTile);

		saveStateToUndo();

		if (selectedTile && selectedTile.type === tileNames.IMAGE.name) {
			selectedTile.params.image = url;
		} else {
			const tile = appendNewTile(tileNames.IMAGE.name);
			tile.params.image = url;
		}
		if (closePromptBar) {
			setPromptIsOpen(false);
		}

		// Update tome data
		saveState();
	};

	const deleteTile = tile => {
		saveStateToUndo();

		const { cRowCount } = metricConstants;

		// Don't delete last tile
		let tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id;
		});
		if (tiles.length === 1) return false;

		// Find the tile
		const index = tomeData.tiles.indexOf(tile);
		// Remove the tile from the tome data
		const deletedTile = tomeData.tiles.splice(index, 1)[0];
		// Find the row the tile is in
		const row = tomeData.rows.filter(row => {
			return row.id === deletedTile.rowId;
		})[0];
		// Find the other tiles in the same row
		tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === deletedTile.rowId;
		});
		// Update row height if there's only 1 text tile left
		if (tiles.length === 1 && tiles[0].params.height12) {
			row.height = tiles[0].params.height12;
		}
		// Sort the tiles by order
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		if (tiles.length === 0) {
			// That was the last tile in the row
			// Remove the row
			const rowIndex = tomeData.rows.indexOf(row);
			tile.oldRows = tomeData.rows.slice();
			tile.oldRow = tomeData.rows.splice(rowIndex, 1);

			// Remaining rows on same page as deleted tile
			const rows = tomeData.rows.filter(r => {
				return deletedTile.pageId === r.pageId;
			});
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));

			if (rows.length === 1) {
				rows[0].height = cRowCount;
			}
			/*
			// check if all rows are tall enough
			let newTotalRowHeight = 0;
			rows.forEach(tR => {
				newTotalRowHeight += tR.height;
			});
			const lastRow = rows[rows.length - 1];
			newTotalRowHeight -= lastRow.height;
			// console.log(cRowCount, newTotalRowHeight, lastRow.height, tomeData.rows.length)
			// if not, make the last row tall enough for a page height
			if (newTotalRowHeight < cRowCount) {
				lastRow.height = tomeData.rows.length === 1 ? cRowCount : cRowCount - newTotalRowHeight;
			}
			*/
		} else {
			// Reset tile orders and redistribute widths
			tiles.forEach((t, i) => {
				t.order = i + 1;
				t.width = 12 / tiles.length;
				//console.log(t);
			});
		}

		if (selectedTile && selectedTile.id === tile.id) {
			setSelectedTile(null);
			//setSidePanelOpen(false);
			setPanelName(panelNames.TILES);
		}

		// Update tome data
		saveState();

		// Show toast
		showToast({
			id: uniqueId("toast"),
			label: "Tile deleted",
			undo: true,
		});
	};

	const selectTile = tile => {
		if (selectedOutlinePage) {
			setSelectedOutlinePage(null);
		}
		if (backgroundSelected) {
			setBackgroundSelected(false);
		}
		if (menuInfo.show) {
			closeMenu();
			return false;
		}

		if (promptIsOpen) {
			setPromptIsOpen(false);
		}

		setSelectedTile(tile);

		// update property panel
		setPanelName(tile.type);

		// open panel
		//setSidePanelOpen(true);
	};

	const deselectTiles = () => {
		setSelectedTile(null);
	};

	const tabToNextTile = () => {
		if (selectedTile) {
			selectNextTile(selectedTile);
		} else {
			selectFirstTile();
		}
	};

	const selectFirstTile = () => {
		const tiles = tomeData.tiles.filter(t => t.pageId === currentPage.id);
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		selectTile(tiles[0]);
	};

	const selectNextTile = tile => {
		// find all in tile's row
		const nextTile = tomeData.tiles.find(t => t.rowId === tile.rowId && t.order === tile.order + 1);
		if (nextTile) {
			selectTile(nextTile);
		} else {
			// is there another row?
			const currentRow = tomeData.rows.find(r => r.id === tile.rowId);
			const nextRow = tomeData.rows.find(r => r.pageId === currentRow.pageId && r.order === currentRow.order + 1);
			if (nextRow) {
				const nextTileInNextRow = tomeData.tiles.find(t => t.rowId === nextRow.id && t.order === 1);
				// select the first tile in the next row
				selectTile(nextTileInNextRow);
			} else {
				// end of tiles, loop back around to the first row, first tile
				const firstRow = tomeData.rows.find(r => r.pageId === tile.pageId && r.order === 1);
				const firstTileInFirstRow = tomeData.tiles.find(t => t.rowId === firstRow.id && t.order === 1);
				selectTile(firstTileInFirstRow);
			}
		}
		//console.log("selectNextTile", tile, tiles);
		//selectNextTile
	};

	const selectPreviousTile = tile => {
		// find all in tile's row
		const newTile = tomeData.tiles.find(t => t.rowId === tile.rowId && t.order === tile.order - 1);
		if (newTile) selectTile(newTile);
		//console.log("selectNextTile", tile, tiles);
		//selectNextTile
	};

	const selectTileAbove = tile => {
		// find row above current row
		console.log("select tile above");
		const rows = tomeData.rows.filter(({ pageId }) => pageId === tile.pageId);
		const row = rows.find(r => r.id === tile.rowId);
		if (row.order > 1) {
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));
			const rowAbove = rows[row.order - 2];
			if (rowAbove) {
				const tiles = tomeData.tiles.filter(t => t.rowId === rowAbove.id);
				tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
				if (tiles.length >= tile.order) {
					const newTile = tiles.find(t => t.order === tile.order);
					selectTile(newTile);
				} else {
					selectTile(tiles[0]);
				}
			}
		}
	};

	const selectTileBelow = tile => {
		// find row below current row
		console.log("select tile below");
		const rows = tomeData.rows.filter(({ pageId }) => pageId === tile.pageId);
		const row = rows.find(r => r.id === tile.rowId);
		if (row.order !== rows.length) {
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));
			const rowBelow = rows[row.order];
			if (rowBelow) {
				const tiles = tomeData.tiles.filter(t => t.rowId === rowBelow.id);
				tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
				if (tiles.length >= tile.order) {
					const newTile = tiles.find(t => t.order === tile.order);
					selectTile(newTile);
				} else {
					selectTile(tiles[0]);
				}
			}
		}
	};

	const moveTileWithKeyboard = (tile, direction) => {
		const { cColumnCount } = metricConstants;
		let row = tomeData.rows.find(r => r.id === tile.rowId);
		let tiles = tomeData.tiles.filter(t => t.rowId === tile.rowId);
		let rows = tomeData.rows.filter(r => r.pageId === row.pageId);
		let order = tile.order + 1;
		let rowOrder = row.order + 1;

		// if tile is the only tile in the row
		// ignore left and right commands
		if (tiles.length === 1) {
			if (direction === "left" || direction === "right") {
				return false;
			}
			if (direction === "up" && row.order === 1) return false;
			if (direction === "down" && rows.length === row.order) return false;
		}

		if (direction === "left") {
			order = tile.order - 1;
		}

		if (direction === "right") {
			order = tile.order + 1;
		}

		if (direction === "down") {
			if (row.order === rows.length) {
				// move tile to new row below current position
				order = 1;
				tile.width = cColumnCount;
				let newRow = appendRowAtOrder(currentPage, tomeData, rowOrder);
				newRow.height = row.height;
				row = newRow;
				console.log("down", row);
			} else {
				order = tile.order;
				row = rows.find(r => r.order === rowOrder);
				console.log("down", row);
			}
		}

		if (direction === "up") {
			console.log("up", row);
			if (row.order === 1) {
				// move tile to new row above current position
				order = 1;
				tile.width = cColumnCount;
				rowOrder = row.order;
				let newRow = appendRowAtOrder(currentPage, tomeData, rowOrder);
				newRow.height = row.height;
				row = newRow;
				console.log("up", row);
			} else {
				order = tile.order;
				row = rows.find(r => r.order === row.order - 1);
				console.log("up", row);
			}
		}

		moveTileToRowAtOrder(tile, row, order);
	};

	const getTileForId = id => {
		return tomeData.tiles.filter(t => {
			return t.id === id;
		})[0];
	};

	const getNewImageTile = () => {
		return {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			type: tileNames.IMAGE.name,
			params: {},
		};
	};

	const duplicateTile = tile => {
		saveStateToUndo();

		let row = tomeData.rows.find(r => r.id === tile.rowId);
		const newTile = createTileInRowAtOrder(tile.type, row, tile.order + 1);
		newTile.params = { ...tile.params };

		const giveBlockNewId = blocks => {
			blocks.map((b, i) => (b.id = uniqueId("block")));
		};
		if (newTile.params.blocks) {
			//giveBlockNewId(newTile.params.blocks);
			newTile.params.blocks[0].id = uniqueId("block");
		}
		console.log(tile);
		console.log(newTile);

		saveState();
		return newTile;
	};

	const moveTileToRowAtOrder = (tile, row, order = 1) => {
		//console.log("moveTileToRowAtOrder", tile, row, order);

		if (tile === undefined || row === undefined) {
			console.error("tile or row undefined");
		}

		if (row.id === tile.rowId) {
			//
			// Moving tile within same row
			//
			const otherTiles = tomeData.tiles.filter(({ id, rowId }) => rowId === row.id && id !== tile.id);
			const offset = tile.order > order ? 0.1 : -0.1;
			otherTiles.forEach((t, i) => {
				if (t.order === order) t.order += offset;
			});
			otherTiles.push(tile);
			tile.order = order;
			otherTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
			otherTiles.forEach((t, i) => {
				t.order = i + 1;
			});
		} else {
			//
			// Moving tile to a different row
			//
			const oldRow = tomeData.rows.find(({ id }) => id === tile.rowId);
			const oldTiles = tomeData.tiles.filter(({ rowId, id }) => rowId === oldRow.id && id !== tile.id);
			if (oldTiles.length > 0) {
				// Reset order and widths of remaining tiles in old row
				oldTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
				oldTiles.forEach((t, i) => {
					t.order = i + 1;
					t.width = 12 / oldTiles.length;
				});
			} else {
				// Remove old row if there's no tiles left in it
				// Re-number remaining rows:
				//	1. sort em by order
				//  2. loop thru and apply new orders
				const oldRowIndex = tomeData.rows.indexOf(oldRow);
				tomeData.rows.splice(oldRowIndex, 1);
				tomeData.rows.sort((a, b) => (a.order > b.order ? 1 : -1));
				tomeData.rows.forEach((r, i) => (r.order = i + 1));
			}

			const newTiles = tomeData.tiles.filter(({ rowId }) => rowId === row.id);
			newTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
			if (newTiles.length > 0) {
				const maxPerRow = metricConstants.cColumnMax;
				if (newTiles.length >= maxPerRow) {
					// Too many tiles in this row, boot the last tile down
					const lastTile = newTiles.splice(newTiles.length - 1, 1)[0];
					// Make a new row for the booted tile
					const newRow = appendRowAtOrder(currentPage, tomeData, row.order + 1);
					newRow.height = row.height;
					lastTile.width = metricConstants.cColumnCount;
					lastTile.rowId = newRow.id;
					lastTile.order = 1;
				}
				// Reset order and widths of all tiles in affected row
				tile.order = order;
				newTiles.push(tile);
				newTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
				newTiles.forEach((t, i) => {
					t.order = i + 1;
					t.width = metricConstants.cColumnCount / newTiles.length;
				});
			} else {
				tile.order = 1;
				tile.width = metricConstants.cColumnCount;
			}
			tile.rowId = row.id;
		}
		saveState();
	};

	const updateImageTileWithImage = (tile, image) => {
		tile.params.image = image;
		saveState();
	};

	// *** Add Files To A Row At A Specific Tile Order ***
	// - adds a sequence of tiles [t]
	// - starting at row r
	// - starting at tile order i
	// - will add rows as necessary
	// - will boot other tiles down to their own row if necessary
	// (used for drag and drop)

	const fileReaders = React.useRef(null);

	const loadFile = () => {
		//console.log("loadFile");
		if (fileReaders.current && fileReaders.current.length > 0) {
			const obj = fileReaders.current.shift();
			if (obj.tile.type === tileNames.TEXT.name) {
				obj.reader.readAsText(obj.file);
			} else {
				obj.reader.readAsDataURL(obj.file);
			}
		}
	};

	const onFileReaderLoad = (e, tile) => {
		//console.log("onFileLoad");
		tile.isLoading = false;
		//if (tile.params && tile.params.isLoading === true) tile.params.isLoading = false;
		if (tile.type === tileNames.IMAGE.name) {
			tile.params.image = e.target.result;
		}
		if (tile.type === tileNames.VIDEO.name) {
			tile.params.video = e.target.result;
			tile.params.autoPlay = true;
		}
		if (tile.type === tileNames.TEXT.name) {
			tile.params = {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H2,
						content: e.target.result,
					},
				],
			};
			//tile.onFileLoaded();
		}
		saveState();
		loadFile();
	};

	const addImageURLToRowAtOrderWithMaxPerRow = (
		url = "",
		row = {},
		order = 1,
		maxPerRow = metricConstants.cColumnMax
	) => {
		saveStateToUndo();
		let tilesToBeBooted = [];
		const initialRowHeight = row.height;
		const tilesInRow = tomeData.tiles.filter(t => {
			return t.rowId === row.id;
		});
		if (tilesInRow.length + 1 > maxPerRow && order < tilesInRow.length) {
			// Based on the order, how many tiles need to be booted off the current row?
			// Strand those tiles temporarily so they can be added back at the end
			tilesToBeBooted = tilesInRow.filter(t => {
				return t.order >= order;
			});
			tilesToBeBooted.forEach(t => {
				t.rowId = "";
			});
		}
		row.height = getRowHeightForTileCount(1 + tilesInRow.length > maxPerRow ? maxPerRow : 1 + tilesInRow.length);
		// keep track of row orders
		let newRowCount = 0;
		const rowOrder = row.order;
		let orderIncrement = 0;
		let type = tileNames.IMAGE.name;

		const tile = createTileInRowAtOrder(type, row, order + orderIncrement);
		tile.isLoading = true;
		tile.params.image = url;
		// save the tiles
		saveState();
	};

	const addFilesToRowAtOrderWithMaxPerRow = (
		files = [],
		row = {},
		order = 1,
		maxPerRow = metricConstants.cColumnMax
	) => {
		//console.log("addFilesToRowAtOrderWithMaxPerRow", files);
		// Save state first
		saveStateToUndo();
		let tilesToBeBooted = [];
		const initialRowHeight = row.height;
		const tilesInRow = tomeData.tiles.filter(t => {
			return t.rowId === row.id;
		});
		if (tilesInRow.length + files.length > maxPerRow && order < tilesInRow.length) {
			// Based on the order, how many tiles need to be booted off the current row?
			// Strand those tiles temporarily so they can be added back at the end
			tilesToBeBooted = tilesInRow.filter(t => {
				return t.order >= order;
			});
			tilesToBeBooted.forEach(t => {
				t.rowId = "";
			});
		}
		row.height = getRowHeightForTileCount(
			files.length + tilesInRow.length > maxPerRow ? maxPerRow : files.length + tilesInRow.length
		);
		// keep track of row orders
		let newRowCount = 0;
		const rowOrder = row.order;
		let orderIncrement = 0;

		// create an array of file readers
		fileReaders.current = [];
		let filesRemaining = files.length;

		files.forEach((file, i) => {
			// first check if row is full
			const tilesInRow = tomeData.tiles.filter(t => {
				return t.rowId === row.id;
			});

			let type = tileNames.IMAGE.name;
			if (file.type.match("video.*")) type = tileNames.VIDEO.name;
			if (file.type.match("text.*")) type = tileNames.TEXT.name;

			//tilesInRow.sort((a, b) => (a.order > b.order ? 1 : -1));
			if (tilesInRow.length >= maxPerRow) {
				// increment count
				newRowCount++;
				// make a new row for the remainder of the files
				row = appendRowAtOrder(currentPage, tomeData, rowOrder + newRowCount);
				// set the new row's height based on the number of tiles it will have
				row.height = getRowHeightForTileCount(filesRemaining > maxPerRow ? maxPerRow : filesRemaining);
				// reset tile order increment
				order = 1;
				orderIncrement = 0;
			}
			console.log(type, row, order, orderIncrement);
			const tile = createTileInRowAtOrder(type, row, order + orderIncrement);
			//tile.onFileLoad = () => console.log("test me")
			tile.isLoading = true;
			//tile.loadingOrder = i + 1;
			const reader = new FileReader();
			reader.onload = e => {
				onFileReaderLoad(e, tile);
			};
			fileReaders.current.push({ reader: reader, file: file, order: i + 1, tile: tile });
			filesRemaining--;
			orderIncrement++;
		});

		if (tilesToBeBooted.length > 0) {
			newRowCount++;
			row = appendRowAtOrder(currentPage, tomeData, rowOrder + newRowCount);
			row.height = initialRowHeight;
			tilesToBeBooted.forEach((t, i) => {
				t.order = i + 1;
				t.rowId = row.id;
				t.width = metricConstants.cColumnCount / tilesToBeBooted.length;
			});
		}

		// save the tiles
		saveState();

		// start loading the first file
		setTimeout(() => loadFile(), 10);
	};

	const createBackground = () => {
		if (currentPage.background) {
			console.log("background already exists!");
			currentPage.background.params.image = undefined;
			currentPage.background.params.video = undefined;
		} else {
			console.log("creating the background!");
			currentPage.background = {};
			currentPage.background.params = {};
			currentPage.background.params.opacity = 50;
		}
		saveState();
	};

	const createDynamicBackground = () => {
		currentPage.background = {};
		currentPage.background.params = {};
		setPanelName(tileNames.BACKGROUND.name);
		setSidePanelOpen(true);
		saveState();
		if (selectedTile) setSelectedTile(null);
	};

	const deleteBackground = () => {
		console.log("deleting the background!");
		if (sidePanelOpen) {
			setPanelName(null);
			setSidePanelOpen(false);
		}
		currentPage.background = undefined;
		saveState();
		setBackgroundSelected(false);
	};

	const createBackgroundWithDroppedFiles = files => {
		const file = files[0];
		let type = tileNames.IMAGE.name;
		if (file.type.match("video.*")) type = tileNames.VIDEO.name;
		// Save state first
		saveStateToUndo();
		// Create
		createBackground();
		// Prep loading file
		fileReaders.current = [];
		const reader = new FileReader();
		reader.onload = e => {
			onFileReaderLoad(e, currentPage.background);
		};
		fileReaders.current.push({ reader: reader, file: file, order: 1, tile: currentPage.background });
		// start loading the first file
		dropIndicatorInfo.backgroundDropType.set(type);
		currentPage.background.type = type;
		currentPage.background.params.isLoading = true;
		setTimeout(() => loadFile(), 10);
		selectBackground();
	};

	const createBackgroundWithImageURL = url => {
		let type = tileNames.IMAGE.name;
		// Save state first
		saveStateToUndo();
		// Create
		createBackground();
		//
		dropIndicatorInfo.backgroundDropType.set(type);
		//
		currentPage.background.type = type;
		//
		currentPage.background.params.image = url;
		//
		saveState();
	};

	const toggleBackgroundSelection = () => {
		if (backgroundSelected) {
			setBackgroundSelected(false);
			if (sidePanelOpen) {
				setSidePanelOpen(false);
			}
		} else {
			if (selectedTile) {
				if (sidePanelOpen) {
					setSidePanelOpen(false);
				}
				setPanelName(null);
				setSelectedTile(null);
			} else {
				selectBackground();
			}
		}
	};

	const onToolbarButtonTap = name => {
		setPanelName(name);

		closeMenu();

		if (isReviewing) {
			setIsReviewing(false);
		}

		if (promptIsOpen) {
			setPromptIsOpen(false);
		}

		if (selectedTile && selectedTile.type !== name) {
			setSelectedTile(null);
		}

		if (!sidePanelOpen) {
			setSidePanelOpen(true);
			if (name === tileNames.BACKGROUND.name) {
				setBackgroundSelected(true);
			}
		} else {
			if (panelName === name) {
				setSidePanelOpen(false);
				if (name === tileNames.BACKGROUND.name) {
					setBackgroundSelected(false);
				}
			}
		}
	};

	const togglePrompt = () => {
		setPromptIsOpen(!promptIsOpen);
		closeMenu();
		if (sidePanelOpen) {
			setSidePanelOpen(false);
		}
		if (panelName) {
			setPanelName(null);
		}

		/*
		if (selectedTile) {
			setSelectedTile(null);
		}
		*/

		if (backgroundSelected) {
			setBackgroundSelected(false);
		}
	};

	const showMenu = info => {
		
		// showMenu({
		// 	type: "tome_menu",
		// 	buttonId: "tome_menu_button",
		// 	alignX: "trailing",
		// 	alignY: "trailing",
		// })

		if (menuInfo.show && menuInfo.buttonId === info.buttonId) {
			closeMenu();
		} else {
			menuInfo.show = true;
			menuInfo.type = info.type;
			menuInfo.buttonId = info.buttonId;
			menuInfo.alignX = info.alignX;
			menuInfo.alignY = info.alignY;
			const el = document.getElementById(info.buttonId);
			if (el) {
				const rect = el.getBoundingClientRect();
				//console.log(rect);
				const wW = window.innerWidth;
				const wH = window.innerHeight;
				let mW = 220;
				let mH = 176;
				if (info.type === "prompt_create_tome_info") {
					mH = 168;
					mW = 220;
				}
				if (info.type === "prompt_create_tome_pages") {
					mH = 292;
					mW = 66;
				}
				if (info.type === "prompt_create_tome_types") {
					mH = 96;
					mW = 136;
				}

				if (info.type === "prompt_create_images") {
					mH = 326;
					mW = 192;
				}
				if (info.type === "prompt_web2tome_images") {
					mH = 96;
					mW = 160;
				}

				if (info.type === "prompt_create_tome_format") {
					mW = 228;
					mH = 104;
				}
				if (info.type === "prompt_create_tome_images") {
					mW = 150;
					mH = 124;
				}
				if (info.type === "prompt_create_tome_theme") {
					mH = 198;
					mW = 288;
				}
				if (info.type === "prompt_create_tome_length") {
					mW = 184;
					mH = 70;
				}
				if (info.type === "properties_text_color") {
					mW = 128;
					mH = 61;
				}

				if (info.type === "properties_background_color") {
					mW = 142;
					mH = 61;
				}

				if (info.type === "prompt_create_tiles") {
					mW = 144;
					mH = 108;
				}

				const bX = rect.x;
				const bY = rect.y;
				const bW = rect.width;
				const bH = rect.height;
				const gV = 10;
				const xOffset = info.xOffset ? info.xOffset : 0;
				const yOffset = info.yOffset ? info.yOffset : 0;

				if (info.alignX === "leading") menuInfo.x = bX + xOffset;
				if (info.alignX === "middle") menuInfo.x = bX + bW / 2 - mW / 2 + xOffset;
				if (info.alignX === "trailing") menuInfo.x = bX + bW - mW + xOffset;

				if (info.alignY === "trailing") menuInfo.y = bY + bH + gV + yOffset;
				if (info.alignY === "leading") menuInfo.y = bY - gV - mH + yOffset;

				setMenuInfo({ ...menuInfo });
			}
		}
	};

	const closeMenu = () => {
		menuInfo.show = false;
		setMenuInfo({ ...menuInfo });
		//
	};

	const selectBackground = () => {
		setBackgroundSelected(true);

		if (selectedOutlinePage) {
			setSelectedOutlinePage(null);
		}
		if (selectedTile) {
			setSelectedTile(null);
		}
		// update property panel
		setPanelName(tileNames.BACKGROUND.name);
		// open the panel
		setSidePanelOpen(true);
	};

	const setTextColor = color => {
		selectedTile.params.blocks.forEach(b => {
			b.color = color;
			if (b.inlineBlocks) {
				b.inlineBlocks.forEach(o => {
					if (o.type !== textBlockType.LINK && o.color) {
						o.color = null;
					}
				});
			}
		});
	};

	const getTextColor = () => {
		const colors = [];
		selectedTile.params.blocks.forEach(b => {
			if (b.color) colors.push(b.color);
			if (b.inlineBlocks) {
				b.inlineBlocks.forEach(o => {
					if (o.type !== textBlockType.LINK && o.color) {
						colors.push(o.color);
					}
				});
			}
		});
		//console.log(colors);
		if (colors.length > 0) {
			if (colors => colors.every(v => v === colors[0])) {
				return colors[0];
			} else {
				return "MIXED";
			}
		} else {
			//const c = new Color(currentPage.theme.colors.text.heading);
			//console.log(c.toString({format: "hex"}));

			return chroma(currentPage.theme.colors.text.heading).hex();
		}
	};

	const setTileColor = color => {
		selectedTile.params.backgroundColor = color;
	};

	const getTileColor = () => {
		const color = selectedTile.params.backgroundColor
			? selectedTile.params.backgroundColor
			: currentPage.theme.colors.backgrounds.page;
		return chroma(color).hex();
	};

	const resetTileColor = () => {
		selectedTile.params.backgroundColor = undefined;
	};

	const resetTextColor = color => {
		selectedTile.params.blocks.forEach(b => {
			b.color = undefined;
			if (b.inlineBlocks) {
				b.inlineBlocks.forEach(o => {
					if (o.type !== textBlockType.LINK && o.color) {
						o.color = undefined;
					}
				});
			}
		});
	};

	const getRowHeightForTileCount = count => {
		let height = 12;
		if (count === 2) height = 9;
		if (count === 3) height = 8;
		if (count === 4) height = 7;
		if (count === 5) height = 6;
		if (count === 6) height = 5;
		if (count > 6) height = 4;
		//height = 8;
		return height;
	};

	const enterPlayMode = () => {
		console.log("PLAY MODE");
		setIsPlayMode(true);
		if (selectedTile) {
			setSelectedTile(null);
		}
		if (sidePanelOpen) {
			setSidePanelOpen(false);
		}
	};

	const exitPlayMode = () => {
		setIsPlayMode(false);
	};

	const saveState = () => {
		checkForEmptyTome();

		setTomeData({ ...tomeData });
		console.log("saveState", tomeData);

		//setUndoCache
		//const dataCopy = JSON.parse(JSON.stringify(tomeData));
		//undoCache.current.push(dataCopy);
		//console.log(undoCache.current)
	};

	const saveStateToUndo = () => {
		console.log("save to undo");
		setUndoCache(JSON.parse(JSON.stringify(tomeData)));
		/*
		console.log(undoCache.current)
		const oldState = undoCache.current.pop();
		if (oldState) {
			setTomeData({ ...oldState });
		}
		*/
	};

	const undo = () => {
		console.log("undo! from context", undoCache);
		if (undoCache) {
			console.log("undo! from context");
			setTomeData({ ...undoCache });
		}
	};



	const requestDalleImageForTile = tile => {
		//const extraDALLE = " artStyle, digital art, highly detailed, intentional, 4k";
		//const extraDALLE = " artStyle, digital art, intentional, 4k";

		const extraDALLE = "";
		const prompt = tile.params.prompt + " " + tile.params.artStyle + extraDALLE;
		console.log("------- send DALL-E request ---------");
		console.log(prompt);
		async function runCompletion() {
			try {
				const completion = await openai.createImage({
					prompt: prompt,
					n: 1,
					size: "1024x1024",
				});
				console.log(completion);
				console.log(completion.data.data[0].url);
				tile.params.image = completion.data.data[0].url;
				//tile.params.isLoading = false;
				//tile.params.needsGeneration = false;
				saveState();
				//callback(completion.data);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
			}
		}
		runCompletion();
	};

	const requestUnsplashImageForTile = async tile => {
		console.log(tile.params.prompt);
		unsplash.search
			.getPhotos({
				query: tile.params.prompt,
				perPage: 20,
				//page: 1,
				//color: 'green',
				//orientation: 'portrait',
			})
			.then(result => {
				if (result.errors) {
					// handle error here
					console.log("error occurred: ", result.errors[0]);
				} else {
					// handle success here
					const photo = result.response;
					console.log(photo.results[tile.params.index].urls.full);
					//tile.params.image = photo.results[0].urls.full;
					tile.params.image = photo.results[tile.params.index].urls.full;
					saveState();
				}
			});
	};

	const requestRewriteForTile = tile => {
		console.log("------- send REWRITE request ---------");
		const blocks = tile.params.blocks;
		const prompt = makeRewriteBlocksPrompt(blocks, tomeData.prompt.type);
		console.log(prompt);
		async function runCompletion() {
			try {
				const completion = await openai.createCompletion({
					//model: "text-curie-001",
					model: "text-davinci-003",
					temperature: 0.3,
					max_tokens: 500,
					prompt: prompt,
				});
				console.log(completion.data.choices[0].text);
				const { title, content } = JSON.parse(completion.data.choices[0].text);
				if (title) {
					tile.params.blocks[0].content = title;
					// update outline page
					// find page of tile
					const page = tomeData.pages.find(p => p.id === tile.pageId);
					console.log(page, tomeData.outlineTextTile);
					tomeData.outlineTextTile.params.blocks[page.order - 3].content = title;
				}
				if (content && content[0]) tile.params.blocks[1].content = content[0];
				if (content && content[1]) tile.params.blocks[2].content = content[1];
				if (content && content[2]) tile.params.blocks[3].content = content[2];
				tile.params.isLoading = false;
				saveState();
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
				// TODO INDICATE AN ERROR
				tile.params.isLoading = false;
				saveState();
			}
		}
		runCompletion();
	};

	const showToast = obj => {
		//toastData.push(obj);
		setToastData({ ...obj });
	};

	const resetPage = () => {
		// find the rows and tiles on the current page and remove them
		tomeData.tiles = tomeData.tiles.filter(t => t.pageId !== currentPage.id);
		tomeData.rows = tomeData.rows.filter(r => r.pageId !== currentPage.id);
		// Add a null page
		const row = appendRowToPageInTome(currentPage, tomeData);
		const tile = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.CENTER,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block_h0_"),
							type: textBlockType.H1,
							content: "",
						},
					],
				},
			},
			row,
			tomeData
		);
		saveState();
	};

	return (
		<TomeContext.Provider
			value={{
				tomeData,
				setTomeData,

				saveState,
				saveStateToUndo,
				undo,

				sidePanelOpen,
				setSidePanelOpen,
				onToolbarButtonTap,

				panelName,
				setPanelName,

				currentPage,
				setCurrentPage,
				previousPage,

				addPage,
				goToNextPage,
				goToPreviousPage,
				showPage,

				isPlayMode,
				enterPlayMode,
				exitPlayMode,

				selectedOutlinePage,
				setSelectedOutlinePage,
				deletePage,
				selectOutlinePage,

				selectedTile,
				setSelectedTile,
				selectTile,
				deselectTiles,
				tabToNextTile,
				selectFirstTile,
				selectNextTile,
				selectPreviousTile,
				selectTileAbove,
				selectTileBelow,
				moveTileWithKeyboard,
				incrementTileWidth,
				incrementTileHeight,

				setTextColor,
				getTextColor,
				resetTextColor,

				setTileColor,
				getTileColor,
				resetTileColor,

				isTileAnimating,
				setIsTileAnimating,

				rowResizing,
				setRowResizing,

				layoutTweaking,
				setLayoutTweaking,

				tileDragging,
				setTileDragging,
				tileHoveringId,
				tileReplaceId,

				tileDropInfo,
				setTileDropInfo,
				showTileDropTarget,
				dropIndicatorInfo,

				textTileFocussed,
				setTextTileFocussed,

				showContextMenu,
				setShowContextMenu,
				contextMenuInfo,
				setContextMenuInfo,

				showMenu,
				closeMenu,
				menuInfo,
				setMenuInfo,

				playSounds,
				setPlaySounds,

				appendNewTile,
				createTileInRowAtOrder,
				moveTileToRowAtOrder,
				deleteTile,
				duplicateTile,
				resetPage,

				contentTileHeightsList,

				updateImageTileWithImage,
				onGeneratedImageClick,

				addFilesToRowAtOrderWithMaxPerRow,
				addImageURLToRowAtOrderWithMaxPerRow,
				createBackgroundWithDroppedFiles,
				createBackgroundWithImageURL,
				backgroundSelected,
				setBackgroundSelected,
				toggleBackgroundSelection,
				createBackground,
				selectBackground,
				deleteBackground,
				createDynamicBackground,

				getTileForId,
				getNewImageTile,

				promptIsOpen,
				setPromptIsOpen,
				togglePrompt,
				isGenerating,
				setIsGenerating,
				isReviewing,
				setIsReviewing,
				autoPaging,
				resetTome,
				checkForEmptyTome,
				checkForEmptyPage,

				requestDalleImageForTile,
				requestUnsplashImageForTile,
				requestRewriteForTile,

				toastData,
				setToastData,
				showToast,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};

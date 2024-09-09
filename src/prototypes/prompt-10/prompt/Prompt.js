import React from "react";
import { AnimatePresence, motion, useMotionValue, animate, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { Configuration, OpenAIApi } from "openai";
import { panelNames, alignmentX, alignmentY } from "../page/TileConstants";
import { CREATE_TOME_LENGTH_OPTIONS } from "./PromptConstants";
import { random, uniqueId } from "lodash";
import commandScore from "command-score";

import smartquotes from "smartquotes";

//import debounce from "lodash.debounce";
//import { fetchEventSource } from "@microsoft/fetch-event-source";

import {
	tScrollItem,
	tBarShow,
	tBarHide,
	tParentViewShow,
	tParentViewHide,
	tLoadingViewShow,
	tLoadingViewHide,
	tDividerHide,
	tDividerShow,
	instantTransition,
	tSkateboardHide,
	tSkateboardShow,
	getTransitions,
} from "./Transitions";

//import SSE from "sse";
//import { encode } from "gpt-3-encoder";

import { TomeContext, appendTileToRowInTome, appendRowToPageInTome, appendRowAtOrder } from "../tome/TomeContext";
import { textBlockType } from "../page/TileConstants";

import { TooltipContext } from "../tooltips/TooltipContext";

import { makeTitlePage } from "./PromptScript";
import { Status } from "./Status";
import { Errors } from "./Errors";
import { makeTitlePrompt, makePagesPrompt, buildPageFromJSON, initializeOutline, makeOutlinePrompt } from "./GPT3";

import {
	imageOptions,
	artStyles,
	tomeTypes,
	themesList,
	web2TomeTextTileParams,
	web2TomeImageChoices,
	web2TomeTextChoices,
	createPageRecentsList,
} from "./PromptConstants";

import { makeNewPageResult } from "./grid/PageGenExamples";
import { makeNewTileResult } from "./grid/TileGenExamples";

import {
	rootCommands,
	tileCommands,
	textTileCommands,
	imageTileCommands,
	videoTileCommands,
	tableTileCommands,
} from "./Commands";

import { List } from "./List";
import { TextArea } from "./TextArea";
import { tileNames } from "../page/TileConstants";
import { ScopedList } from "./ScopedList";
import { GridList } from "./grid/GridList";
import { Themes } from "../tome/Themes";
import { Skateboard } from "./Skateboard";
import { Outline } from "./Outline";
import { GridListOld } from "./grid/GridListOld";

const Wrapper = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	padding: 72px 72px 0;
	align-items: flex-end;
	/* z-index: 1000; */
`;

const PromptDragConstraints = styled(motion.div)`
	position: absolute;
	top: 16px;
	right: 16px;
	bottom: 16px;
	left: 16px;
`;

const Bar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	position: relative;
`;

const Divider = styled(motion.div)`
	right: 1px;
	left: 1px;
	height: 1px;
	position: relative;
`;

const PromptBackground = styled(motion.div)`
	position: absolute;
	bottom: 24px;
	left: 50%;
`;

const PromptBackgroundMaterial = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
`;

export const PromptStates = {
	MINI: "mini",
	INPUT: "input",
	DELEGATE: "delegate",
};

export const ListStates = {
	ROOT: "root",
	SCOPED: "scoped",
};

export const ScopedStates = {
	ROOT: "root",
	CREATE: "create",
};

export const OutlineStates = {
	HIDE: "hide",
	LOADING: "load",
	SHOW: "show",
};

export const DelegateStates = {
	HIDING: "hiding",
	LOADING: "loading",
	WAITING: "waiting",
	BUILDING: "building",
	REVIEW: "review",
	FINISHED: "finished",
};

export const InputStates = {
	EMPTY: "empty",
	CONTENT: "content",
	ERROR: "error",
	MAX_CHAR: "max_characters",
	HIDING: "hiding",
};

export const ErrorStates = {
	NONE: "none",
	MODERATION: "moderation",
	BUSY: "busy",
	UNKNOWN: "unknown",
};

export const MAX_TOKENS = 4000;
export const MAX_BAR_WIDTH = 680;
export const MAX_LIST_ROWS = 3;
export const ITEM_WIDTH = 680;
export const ROOT_ITEM_HEIGHT = 50;
export const SCOPED_ITEM_HEIGHT = 42;
export const DOC2TOME_MIN_CHARACTERS = 500;

export const promptbarMetrics = {
	mini: {
		width: 160,
		height: 36,
		borderRadius: 10,
		barWidth: 3,
		barHeight: 16,
		barX: 10,
		barY: 10,
	},
	input: {
		y: -48,
		root: {
			width: 680,
			height: 298,
		},
		scoped: {
			width: 680,
			height: 110,
		},
		create: {
			width: 680,
			height: 493,
		},
	},
	delegate: {
		y: -48,
	},
	borderRadius: 12,
	width: 680,
	height: 298,
};

export const Prompt = () => {
	const {
		isPlayMode,
		currentPage,
		promptIsOpen,
		togglePrompt,
		setPromptIsOpen,
		tomeData,
		saveState,
		showPage,
		setIsGenerating,
		setIsReviewing,
		autoPaging,
		resetTome,
		closeMenu,
		appendNewTile,
		requestUnsplashImageForTile,
		requestDalleImageForTile,
		menuInfo,
		onToolbarButtonTap,
		onGeneratedImageClick,
		selectTile,
		selectedTile,
		textTileFocussed,
		cutTile,
		duplicateTile,
		selectNextTile,
		selectFirstTile,
		resetPage,
		addPage,
		checkForEmptyPage,
		createTileInRowAtOrder,
	} = React.useContext(TomeContext);

	const { showTooltip, hideTooltip, resetTooltip } = React.useContext(TooltipContext);

	//console.log("PROMPT KEY", process.env.REACT_APP_OPEN_AI_KEY)
	const configuration = new Configuration({
		organization: "org-W3BxFb3AkhwluGzqRAecoA2j",
		apiKey: process.env.REACT_APP_OPEN_AI_KEY,
	});
	const openai = new OpenAIApi(configuration);

	const [value, setValue] = React.useState("");

	const [promptState, setPromptState] = React.useState(PromptStates.INPUT);
	const [listState, setListState] = React.useState(ListStates.ROOT);
	const [scopedState, setScopedState] = React.useState(ScopedStates.ROOT);
	const [delegateState, setDelegateState] = React.useState(DelegateStates.HIDING);

	const [statusLabelWaiting, setStatusLabelWaiting] = React.useState("Creating presentation…");
	const [statusLabelProgress, setStatusLabelProgress] = React.useState("Creating page 1…");
	const [statusLabelFinished, setStatusLabelFinished] = React.useState("Presentation created");
	const [statusProgress, setStatusProgress] = React.useState(0);

	const [errorState, setErrorState] = React.useState(ErrorStates.NONE);
	const [focussedItem, setFocussedItem] = React.useState(rootCommands[0]);
	const [focussedChildItem, setFocussedChildItem] = React.useState(null);
	const [scope, setScope] = React.useState(rootCommands[0]);
	const [disableIntentHovers, setDisableIntentHovers] = React.useState(false);
	const [skateboardAnimating, setSkateboardAnimating] = React.useState(false);

	const [isUsingFallbackIntents, setIsUsingFallbackIntents] = React.useState(false);
	const [isTryingAgain, setIsTryingAgain] = React.useState(false);
	const [outlineState, setOutlineState] = React.useState(OutlineStates.HIDE);

	const [filteredIntentsList, setFilteredIntentsList] = React.useState(rootCommands);
	const [filteredChildList, setFilteredChildList] = React.useState([]);
	const [filteredGridList, setFilteredGridList] = React.useState([]);

	const [gridList, setGridList] = React.useState([]);
	const [gridListHistory, setGridListHistory] = React.useState([]);
	const gridListRef = React.useRef([]);
	const [selectedGridIndex, setSelectedGridIndex] = React.useState(null);
	const [createPageAdded, setCreatePageAdded] = React.useState(false);
	const [itemDragging, setItemDragging] = React.useState(false);

	const createTileTimeouts = React.useRef([]);
	const createTileExampleIndex = React.useRef(0);

	const createPageTimeouts = React.useRef([]);
	const createPageExampleIndex = React.useRef(0);

	// OLD GRIDLIST, remove
	const [gridListSelectedIndex, setGridListSelectedIndex] = React.useState(0);

	const wrapRef = React.useRef(null);
	const controlRef = React.useRef(null);
	const buildTimerRefs = React.useRef([]);
	const constaintsRef = React.useRef(null);
	const miniBgRef = React.useRef(null);

	const colors = currentPage.theme.colors;

	//
	// Update the container dimensions when
	// - state changes: promptState, listState, delegateState
	// - filteredIntentsList changes
	//

	const [visibleListItems, setVisibleListItems] = React.useState(MAX_LIST_ROWS);
	const loadingViewRef = React.useRef(null);
	const rootViewRef = React.useRef(null);
	const fieldRef = React.useRef(null);
	const listRef = React.useRef(null);
	const cachedMetrics = React.useRef({ width: 0, height: 0 });

	const [outlineTitle, setOutlineTitle] = React.useState("");
	const outlineTitleRef = React.useRef("");
	const [outlineItems, setOutlineItems] = React.useState([]);
	const outlineItemsRef = React.useRef([]);
	const outlineFirstHeadingRef = React.useRef("");

	const [isHovering, setIsHovering] = React.useState(false);
	const [promptSize, setPromptSize] = React.useState({
		containerWidth: promptbarMetrics.input.scoped.width,
		containerHeight: promptbarMetrics.input.scoped.height,

		inputWidth: promptbarMetrics.input.scoped.width,
		inputHeight: promptbarMetrics.input.scoped.height,
		y: promptbarMetrics.input.y,
		borderRadius: promptbarMetrics.borderRadius,
	});

	const transitions = getTransitions(tomeData.prompt.slowAnimation);

	React.useLayoutEffect(() => {
		updateContainerHeight();
	}, [
		promptState,
		listState,
		delegateState,
		visibleListItems,
		filteredGridList,
		scopedState,
		outlineItems,
		gridList,
		gridListHistory,
	]);

	const updateContainerHeight = (instant = false) => {
		//if (!promptIsOpen) return;

		let width = undefined;
		let height = undefined;
		let y = promptbarMetrics.input.y;
		let borderRadius = undefined;

		let inputOpacity = promptState === PromptStates.INPUT && promptIsOpen ? 1 : 0;

		let inputWidth = promptbarMetrics.input.root.width;
		let inputHeight = promptbarMetrics.input.root.height;

		//let inputScale = promptbarMetrics.mini.width / 680;
		let inputY = 0;
		let skateboardOpacity = !promptIsOpen ? 1 : 0;
		let skateboardY = !promptIsOpen ? 0 : -13;

		if (!promptIsOpen) {
			width = promptbarMetrics.mini.width;
			height = promptbarMetrics.mini.height;
			borderRadius = promptbarMetrics.mini.borderRadius;
			y = -24;
		} else if (promptState === PromptStates.DELEGATE) {
			borderRadius = promptbarMetrics.borderRadius;
			width = loadingViewRef.current.offsetWidth;
			height = loadingViewRef.current.offsetHeight;

			if (filteredGridList.length > 0) {
				width = 660;
				height = 236;
			}
		} else if (promptState === PromptStates.INPUT) {
			borderRadius = promptbarMetrics.borderRadius;
			if (listState === ListStates.ROOT) {
				width = promptbarMetrics.input.root.width;
				height = fieldRef.current.offsetHeight + listRef.current.offsetHeight;
			}
			if (listState === ListStates.SCOPED) {
				//width = rootViewRef.current.offsetWidth;
				height = fieldRef.current.offsetHeight + SCOPED_ITEM_HEIGHT;
				width = promptbarMetrics.input.scoped.width;
				//height = promptbarMetrics.input.scoped.height;
				if (scopedState === ScopedStates.CREATE) {
					//height = promptbarMetrics.input.create.height;
					height = 12 + 100 + 8 + outlineItems.length * 44 + outlineItems.length * 8 + 12 + 46 + 12;
					const maxHeight = window.innerHeight - 48 * 2;
					if (height > maxHeight) height = maxHeight;
					width = promptbarMetrics.input.create.width;
					inputY = fieldRef.current.offsetHeight - 15;
				}
				if (gridListHistory.length > 0) {
					height = 402;
				} else if (gridList.length > 0) {
					if (scope.id === "command_create_tiles") {
						height = 254;
					} else {
						height = 229;
					}
				}
			}
			inputWidth = width;
			inputHeight = height;
		}

		let inputScale = width / promptbarMetrics.input.root.width;
		if (scopedState === ScopedStates.CREATE) inputScale = 1;
		//let inputScale = 1;

		if (width && height) {
			const widthDelta = Math.abs(width - cachedMetrics.current.width);
			const heightDelta = Math.abs(height - cachedMetrics.current.height);

			if (widthDelta > 0 || heightDelta > 0) {
				console.log("Update inputWidth:", inputWidth, width);

				setPromptSize({
					containerWidth: width,
					containerHeight: height,

					inputWidth: inputWidth,
					inputHeight: inputHeight,

					y: y,
					borderRadius: borderRadius,
					inputScale: inputScale,
					inputOpacity: inputOpacity,
					inputY: inputY,
					skateboardOpacity: skateboardOpacity,
					skateboardY: skateboardY,
				});
			}

			cachedMetrics.current = {
				height: height,
				width: width,
			};

			/*
			bgAnimation.start({
				width: width,
				height: height,
				y: !promptIsOpen ? 0 : -24,
				transition: instant ? instantTransition : moveTransition,
			});
			*/
		}
	};

	//
	// Hide/show bar behavior
	//
	React.useEffect(() => {
		if (promptIsOpen) {
			if (tomeData.hasEdits && gridList.length > 0 && listState === ListStates.SCOPED) {
				console.log("reset!!");
				setValue("");
				descopeBar();
				filterParentList("");
				setFocussedItem(filteredIntentsList[0]);
				updateContainerHeight(true);
			} else {
				// Re-filter on open
				updateContainerHeight(true);
				filterParentList(value);
				setFocussedItem(filteredIntentsList[0]);
				//setIsHovering(false);
				if (gridList.length === 0) {
					focusInput();
				}
			}
		} else {
			// Closing from try again view always resets the bar
			if (delegateState === DelegateStates.REVIEW) {
				resetPromptBarState();
				setListState(ListStates.ROOT);
				setValue("");
				filterParentList("");
			}
			blurInput();
			//setSelectedGridIndex(null);
		}
		updateContainerHeight();
	}, [promptIsOpen]);

	//
	// Escape key listener when in Build state
	//
	React.useEffect(() => {
		if (promptState === PromptStates.DELEGATE) {
			const onKeyDown = e => {
				//console.log("Escape LOADING");
				if (e.key === "Escape") {
					console.log("Escape LOADING");
					if (delegateState !== DelegateStates.REVIEW) {
						cancelLoading();
					} else {
						acceptPresentation();
					}
					e.preventDefault();
					e.stopPropagation();
				}
			};
			document.body.addEventListener("keydown", onKeyDown);
			return () => {
				document.body.removeEventListener("keydown", onKeyDown);
			};
		}
		if (scopedState === ScopedStates.CREATE) {
			const onKeyDown = e => {
				//console.log("Escape LOADING");
				if (e.key === "Escape" || e.key === "Backspace") {
					console.log("Escape CREATE");
					setOutlineState(OutlineStates.HIDE);
					setScopedState(ScopedStates.ROOT);
					focusInput();
					e.preventDefault();
					e.stopPropagation();
				}
				if (e.key === "Enter") {
					submitOutline();
					e.preventDefault();
					e.stopPropagation();
				}
			};
			document.body.addEventListener("keydown", onKeyDown);
			return () => {
				document.body.removeEventListener("keydown", onKeyDown);
			};
		}
	}, [promptState, delegateState, scopedState]);

	//
	// Re-focus the textare when a settings menu closes
	//
	React.useEffect(() => {
		if (promptIsOpen && !menuInfo.show) {
			focusInput();
		}
	}, [menuInfo.show]);

	//
	// Update the command list when tile selection changes
	// Refilter the list and (re)focus the input
	//
	React.useEffect(() => {
		if (promptIsOpen) {
			// Tile-scoped actions!
			if (promptState !== PromptStates.DELEGATE) {
				filterParentList(value);
				focusInput();
			}

			if (promptState === PromptStates.DELEGATE && selectedTile) {
				if (selectedTile.type === tileNames.TEXT.name) {
					console.log("show text");
					setFilteredGridList(web2TomeTextChoices);
					setStatusLabelFinished("4 variations generated");
				}
				if (selectedTile.type === tileNames.IMAGE.name) {
					console.log("show image");
					setFilteredGridList(web2TomeImageChoices);
					setStatusLabelFinished("5 images found");
				}
			}
			// TILE SCOPING DISABLED FOR NOW
			// if (promptState === PromptStates.INPUT && listState === ListStates.SCOPED && selectedTile) {
			// 	descopeBar();
			// }
		}
	}, [promptState, promptIsOpen]);
	//}, [selectedTile, promptState, promptIsOpen]);

	//
	// Close the promptbar if a text tile is focussed
	//
	React.useEffect(() => {
		if (textTileFocussed && promptIsOpen) {
			setPromptIsOpen(false);
		}
	}, [textTileFocussed, promptIsOpen]);

	//
	// Delegate mode: cancel / stop button handler
	//
	const cancelLoading = () => {
		console.log("cancelLoading !");
		if (buildTimerRefs.current.length > 0) {
			for (const t of buildTimerRefs.current) {
				clearTimeout(t);
			}
			buildTimerRefs.current = [];
		}
		//setDelegateState(DelegateStates.HIDING);
		setPromptState(PromptStates.INPUT);
		if (scopedState === ScopedStates.CREATE) {
			setOutlineState(OutlineStates.SHOW);
		}
		setTimeout(focusInput, 500);
	};

	//
	// Delegate mode: try again handler
	//
	const tryAgain = () => {
		setIsGenerating(false);
		setIsReviewing(true);
		setIsTryingAgain(true);
		autoPaging.current = true;
		cancelLoading();
	};

	//
	// Delegate mode: keep handler
	//
	const acceptPresentation = () => {
		setPromptIsOpen(false);
	};

	const focusInput = () => {
		const field = document.getElementById("prompt_bar_textfield");
		//console.log("focusInput", field)
		if (field) {
			field.focus();
		}
	};

	const blurInput = () => {
		const field = document.getElementById("prompt_bar_textfield");
		//console.log("focusInput", field)
		if (field) {
			field.blur();
		}
	};

	const showGeneratedPage = page => {
		//console.log("isAutoPaging", autoPaging.current);
		if (autoPaging.current) {
			showPage(page);
		}
	};

	const cycleThroughErrors = () => {
		console.log(errorState);
		// Cycle through error states for testing purposes
		if (errorState === null || errorState === ErrorStates.UNKNOWN) {
			setErrorState(ErrorStates.BUSY);
		} else if (errorState === ErrorStates.BUSY) {
			setErrorState(ErrorStates.MODERATION);
		} else {
			setErrorState(ErrorStates.UNKNOWN);
		}
		setTimeout(() => {
			setDelegateState(DelegateStates.HIDING);
			setIsGenerating(false);
		}, 1000);
	};

	const toggleRecentsList = () => {
		closeMenu();
		if (scope.recentsList) {
			if (filteredChildList.length > 0) {
				setFilteredChildList([]);
			} else {
				setFilteredChildList(scope.recentsList);
				setFocussedChildItem(scope.recentsList[0]);
			}
		}
		focusInput();
	};

	const resetPromptBarState = () => {
		setIsReviewing(false);
		setIsGenerating(false);
		setIsTryingAgain(false);
		setOutlineState(OutlineStates.HIDE);
		setDelegateState(DelegateStates.HIDING);
		setPromptState(PromptStates.INPUT);
		setScopedState(ScopedStates.ROOT);
	};

	const listItemTapped = item => {
		if (isUsingFallbackIntents) {
			submitFallbackAction(item);
		} else {
			scopeBar(item);
		}
	};

	const scopeBar = item => {
		//console.log("scopeBar", item);
		setValue(""); // clear the text on enter
		if (item.action === "SCOPED") {
			updateBuildLabels();
			// if (item.id === "command_create_tome" || item.id === "command_doc_2_tome") {
			// 	tomeData.prompt.type = tomeTypes[0];
			// 	saveState();
			// }
			if (item.childList) {
				setFilteredChildList(item.childList);
				setFocussedChildItem(item.childList[0]);
			}
			if (item.recentsList) {
				//setFilteredChildList(item.recentsList);
				//setFocussedChildItem(item.recentsList[0]);
			}
			setScope(item);
			setFocussedItem(item);
			setListState(ListStates.SCOPED);
			setTimeout(focusInput, 100);
		} else if (item.action === "INSTANT") {
			//
			switch (item.id) {
				// Native tiles
				case "command_add_tile_text":
					appendNewTile(tileNames.TEXT.name);
					break;
				case "command_add_tile_image":
					appendNewTile(tileNames.IMAGE.name);
					break;
				case "command_add_tile_dalle":
					appendNewTile(tileNames.DALLE.name);
					break;
				case "command_add_tile_video":
					appendNewTile(tileNames.VIDEO.name);
					break;
				case "command_add_tile_table":
					appendNewTile(tileNames.TABLE.name);
					break;
				case "command_add_tile_web":
					appendNewTile(tileNames.WEB.name);
					break;
				// Integrations
				case "command_add_tile_giphy":
					appendNewTile(tileNames.GIPHY.name);
					break;
				case "command_add_tile_figma":
					appendNewTile(tileNames.FIGMA.name);
					break;
				case "command_add_tile_airtable":
					appendNewTile(tileNames.AIRTABLE.name);
					break;
				case "command_add_tile_twitter":
					appendNewTile(tileNames.TWITTER.name);
					break;
				case "command_add_tile_framer":
					appendNewTile(tileNames.FRAMER.name);
					break;
				case "command_add_tile_miro":
					appendNewTile(tileNames.MIRO.name);
					break;
				case "command_add_tile_looker":
					appendNewTile(tileNames.LOOKER.name);
					break;

				// Panels
				case "command_add_page":
					onToolbarButtonTap(panelNames.ADD_PAGE.name);
					setPromptIsOpen(false);
					break;
				case "command_add_tile":
					onToolbarButtonTap(panelNames.ADD_TILE.name);
					setPromptIsOpen(false);
					break;
				case "command_record_narration":
					onToolbarButtonTap(panelNames.RECORD.name);
					setPromptIsOpen(false);
					break;
				case "command_set_theme":
					onToolbarButtonTap(panelNames.THEME.name);
					setPromptIsOpen(false);
					break;

				// Tile cut
				case "command_tile_cut":
					cutTile(selectedTile);
					setPromptIsOpen(false);
					break;
				// Tile duplicate
				case "command_tile_duplicate":
					duplicateTile(selectedTile);
					setPromptIsOpen(false);
					break;
				default:
					break;
			}
		} else if (item.action === "LINK") {
			window.open(item.link, "_blank");
		} else if (item.action === "DOWNLOAD") {
			submitDownloadPrompt();
		}
	};

	const descopeBar = () => {
		console.log("descopeBar");

		if (scopedState === ScopedStates.CREATE) {
			// Update state
			setOutlineState(OutlineStates.HIDE);
			setScopedState(ScopedStates.ROOT);
		} else {
			//Clear out the child list if present
			setFilteredChildList([]);
			setGridList([]);

			setValue(""); // clear the text on enter
			filterParentList(""); // reset parent list

			closeMenu();

			// Update state
			setListState(ListStates.ROOT);
		}
		// Clear any bullshit timers
		clearCreatePageTimers();

		// Focus the input
		setTimeout(focusInput, 300);
		//focusInput();
	};

	const fuzzyMatch = (term, text) => {
		// Build Regex String
		var matchTerm = ".*";
		term = term.replace(/\W/g, ""); // strip non alpha numeric
		// Split all the search terms
		var terms = term.split(" ");

		for (var i = 0; i < terms.length; i++) {
			matchTerm += "(?=.*" + terms[i] + ".*)";
		}

		matchTerm += ".*";

		// Convert to Regex
		// => /.*(?=.*TERM1.*)(?=.*TERM2.*).*/
		var matchRegex = new RegExp(matchTerm.toUpperCase());

		return text.toUpperCase().match(matchRegex);
	};

	const cleanInputText = input => {
		const articles = ["a", "an", "and", "the", "of", "about"];
		const words = input.toLowerCase().split(" ");
		const newWords = [];
		for (const word of words) {
			const match = articles.find(a => a === word);
			if (match === undefined) newWords.push(word);
		}
		const newInput = newWords.join(" ");
		return newInput;
	};

	const commandScoreMatch = (query, items) => {
		let results = [];
		items.forEach(function (item) {
			let score = 0;
			let keywordScore = 0;
			let rootScore = item.rootScore;

			if (query.length > 0) {
				score = commandScore(item.label, query);
			} else {
				score = rootScore;
			}

			// keyword support, counts for half as much as title match
			if (item.keywords) {
				item.keywords.forEach(function (keyword) {
					let kScore = commandScore(keyword, query);
					if (kScore > keywordScore) keywordScore = kScore;
				});
				if (keywordScore > score) score = keywordScore / 2;
			}
			//console.log(score)
			if (score > 0) {
				// Boost generative commands relative to other commands
				if (item.generative) score += 0.4;
				// Penalize commands that have a noContentModifier
				if (!tomeData.noContent && item.noContentModifier !== undefined) {
					console.log("penalize!", tomeData.noContent, item.noContentModifier);
					score += item.noContentModifier;
				}
				// Boost tile commands if a tile is selected
				if (selectedTile && item.tileScore) score += item.tileScore;
				// Add to results
				results.push({ score: score, item: item });
			}
		});

		// Only sort by score if there's an input
		if (query.length > 0) {
			results.sort(function (a, b) {
				if (a.score === b.score) {
					return a.item.label.localeCompare(b.item.label);
				}
				return b.score - a.score;
			});
		}

		return results.map(function (result) {
			return result.item;
		});
	};

	const isValidUrl = urlString => {
		var urlPattern = new RegExp(
			"^(https?:\\/\\/)?" + // validate protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); // validate fragment locator
		return !!urlPattern.test(urlString);
	};

	const filterParentList = input => {
		let commands = rootCommands;

		if (selectedTile) {
			// Add tile commands
			commands = tileCommands.concat(commands);
			// Add tile-specific commands
			if (selectedTile.type === tileNames.TEXT.name) {
				commands = textTileCommands.concat(commands);
			}
			if (selectedTile.type === tileNames.IMAGE.name) {
				commands = imageTileCommands.concat(commands);
			}
			if (selectedTile.type === tileNames.VIDEO.name) {
				commands = videoTileCommands.concat(commands);
			}
			if (selectedTile.type === tileNames.TABLE.name) {
				commands = tableTileCommands.concat(commands);
			}
		}
		let results = commands;
		// Clean up the input string
		if (input.length > 0) {
			input.trim(); // remove trailing whitespace
		}
		if (input.length > 0) {
			input = cleanInputText(input); // remove stopwords
			results = commandScoreMatch(input, commands);
		}
		//console.log(results);

		if (results.length === 0) {
			if (input.length >= DOC2TOME_MIN_CHARACTERS) {
				results.push(rootCommands.find(c => c.id === "command_doc_2_tome"));
			}
			results.push(...rootCommands.filter(c => c.isFallback));
			if (!isUsingFallbackIntents) setIsUsingFallbackIntents(true);
		} else {
			if (isUsingFallbackIntents) setIsUsingFallbackIntents(false);
		}

		// Is it a URL?
		if (isValidUrl(input)) {
			console.log("HAY!");
			results = [];
			results.push(rootCommands.find(c => c.id === "command_create_tome_from_webpage"));
			results.push(rootCommands.find(c => c.id === "command_create_page_from_webpage"));
		}

		// Update display list
		//setVisibleListItems(results.length > MAX_LIST_ROWS ? MAX_LIST_ROWS : results.length);
		setVisibleListItems(results.length);
		setFilteredIntentsList(results);

		// Re-focus the first item in list if the input has changed
		if (input.length > 0) {
			setFocussedItem(results[0]);
			//resetScrollTop("root_list_scroller");
		}
	};

	const filterChildList = input => {
		let results = scope.childList.filter(command => fuzzyMatch(input, command.label));
		if (results.length === 0 && scope.fallbackList) {
			results = scope.fallbackList;
			if (!isUsingFallbackIntents) setIsUsingFallbackIntents(true);
		} else {
			if (isUsingFallbackIntents) setIsUsingFallbackIntents(false);
		}
		// Update display list
		setFilteredChildList(results);
		// Focus first item in list ?
		if (input.length > 0) {
			setFocussedChildItem(results[0]);
		}
	};

	const filterScopedRecentsList = input => {
		let results = scope.recentsList.filter(command => fuzzyMatch(input, command.label));
		// Update display list
		setFilteredChildList(results);
		// Focus first item in list ?
		if (results.length === 0) {
			//setFilteredChildList(scope.recentsList)
			//setFocussedChildItem(results[0]);
		}
	};

	const onInputChange = event => {
		setValue(event.target.value);
		if (listState === ListStates.ROOT) {
			filterParentList(event.target.value);
		}
		if (listState === ListStates.SCOPED && scope.childList) {
			filterChildList(event.target.value);
		}
		if (listState === ListStates.SCOPED && scope.recentsList && filteredChildList.length > 0) {
			filterScopedRecentsList(event.target.value);
		}
	};

	const resetScrollTop = scrollViewID => {
		const scroller = document.getElementById(scrollViewID);
		if (scroller) scroller.scrollTop = 0;
	};

	const scrollViewToElement = (scrollViewID, elementID, direction = "UP") => {
		//console.log("scrollViewToElement", elementID);
		const scroller = document.getElementById(scrollViewID);
		const el = document.getElementById(elementID);
		if (scroller && el) {
			const elRect = el.getBoundingClientRect();
			const scrollerRect = scroller.getBoundingClientRect();
			const threshold = 6;
			const halfHeightOffset = 20;
			if (direction === "UP") {
				const deltaFromTop = elRect.top - scrollerRect.top;
				if (deltaFromTop < threshold) {
					//console.log(deltaFromTop);
					//scroller.scrollTop += deltaFromTop - threshold;
					const start = scroller.scrollTop;
					const end = start + deltaFromTop - threshold - halfHeightOffset;
					animate(start, end, {
						...tScrollItem,
						onUpdate: latest => (scroller.scrollTop = latest),
					});
				}
			}
			if (direction === "DOWN") {
				const deltaFromBottom = scrollerRect.bottom - elRect.bottom;
				if (deltaFromBottom < threshold) {
					//console.log(deltaFromBottom);
					//scroller.scrollTop -= deltaFromBottom + threshold;
					const start = scroller.scrollTop;
					const end = start - deltaFromBottom + threshold + halfHeightOffset;
					animate(start, end, {
						onUpdate: latest => (scroller.scrollTop = latest),
						...tScrollItem,
					});
				}
			}
		}
	};

	const onChildListItemTap = item => {
		if (scope.id === "change_theme" || scope.id === "change_page_theme") {
			const newTheme = Themes.find(({ id }) => id === item.id);
			currentPage.theme = newTheme;
			saveState();
			setPromptIsOpen(false);
		}
		if (scope.id === "recent_prompts") {
			const scroller = document.getElementById("root_list_scroller");
			if (scroller) scroller.scrollTop = 0;
			descopeBar();

			if (isUsingFallbackIntents) {
				const command = rootCommands.find(({ id }) => id === item.commandId);
				console.log(command);
				scopeBar(command);
			} else {
				const command = rootCommands.find(({ id }) => id === item.commandId);
				scopeBar(command);
				setValue(item.label);
			}
		}
		if (scope.recentsList && filteredChildList.length > 0) {
			setValue(item.label);
			toggleRecentsList();
		}
	};

	const onInputKeyDown = e => {
		let cancelEvent = false;
		console.log("onInputKeyDown", e.key);
		// Handle up and down arrow keys when descoped
		if (listState === ListStates.ROOT) {
			if (e.key === "Tab") {
				if (selectedTile) {
					selectNextTile(selectedTile);
				} else {
					selectFirstTile();
				}
				cancelEvent = true;
			}

			if (e.key === "ArrowUp") {
				if (focussedItem) {
					const i = filteredIntentsList.find(({ id }) => id === focussedItem.id);
					const index = filteredIntentsList.indexOf(i);
					let newIndex = index + 1;
					if (filteredIntentsList[newIndex] && filteredIntentsList[newIndex].id === "DIVIDER") newIndex += 1;
					if (newIndex <= filteredIntentsList.length - 1) {
						setDisableIntentHovers(true);
						setFocussedItem(filteredIntentsList[newIndex]);
						scrollViewToElement("root_list_scroller", filteredIntentsList[newIndex].id, "UP");
					} else {
						//bounceScrollView("root_list_scroller", "UP");
					}
				}
				cancelEvent = true;
			}
			if (e.key === "ArrowDown") {
				if (focussedItem) {
					const i = filteredIntentsList.find(({ id }) => id === focussedItem.id);
					const index = filteredIntentsList.indexOf(i);
					let newIndex = index - 1;
					if (filteredIntentsList[newIndex] && filteredIntentsList[newIndex].id === "DIVIDER") newIndex -= 1;
					if (newIndex >= 0) {
						setDisableIntentHovers(true);
						setFocussedItem(filteredIntentsList[newIndex]);
						scrollViewToElement("root_list_scroller", filteredIntentsList[newIndex].id, "DOWN");
					} else {
						//bounceScrollView("root_list_scroller", "DOWN");
					}
				}
				cancelEvent = true;
			}
			if (e.key === "Enter") {
				if (focussedItem) {
					if (!isUsingFallbackIntents) {
						scopeBar(focussedItem);
						cancelEvent = true;
					} else if (e.key === "Enter") {
						submitFallbackAction(focussedItem);
						cancelEvent = true;
					}
				}
			}
			if (e.key === "Escape") {
				if (value.length > 0) {
					setValue("");
					filterParentList("");
					cancelEvent = true;
				} else {
					//setPromptIsOpen(false);
				}
			}
			if (e.key === "Backspace") {
				if (value.length === 0) {
				}
			}
		}
		if (listState === ListStates.SCOPED) {
			if (focussedItem.childList && focussedChildItem) {
				const i = focussedItem.childList.find(({ id }) => id === focussedChildItem.id);
				const index = focussedItem.childList.indexOf(i);
				if (e.key === "ArrowUp") {
					const newIndex = index + 1;
					if (newIndex <= focussedItem.childList.length - 1) {
						setFocussedChildItem(focussedItem.childList[newIndex]);
						scrollViewToElement("scoped_list_scroller", focussedItem.childList[newIndex].id, "UP");
					}
					cancelEvent = true;
				}
				if (e.key === "ArrowDown") {
					const newIndex = index - 1;
					if (newIndex >= 0) {
						setFocussedChildItem(focussedItem.childList[newIndex]);
						scrollViewToElement("scoped_list_scroller", focussedItem.childList[newIndex].id, "DOWN");
					}
					cancelEvent = true;
				}
				if (e.key === "Enter" || e.key === "ArrowRight") {
					onChildListItemTap(focussedChildItem);
					cancelEvent = true;
				}
				if (e.key === "Escape") {
					if (value.length > 0) {
						setValue("");
						setFilteredChildList(focussedItem.childList);
						cancelEvent = true;
					} else if (value.length === 0) {
						descopeBar();
						cancelEvent = true;
					}
				}
				if (e.key === "Backspace" || e.key === "ArrowLeft") {
					if (value.length === 0) {
						descopeBar();
						cancelEvent = true;
					}
				}
			} else if (scope.recentsList && filteredChildList.length > 0) {
				const i = filteredChildList.find(({ id }) => id === focussedChildItem.id);
				const index = filteredChildList.indexOf(i);
				if (e.key === "ArrowUp") {
					const newIndex = index + 1;
					if (newIndex <= filteredChildList.length - 1) {
						setFocussedChildItem(filteredChildList[newIndex]);
						scrollViewToElement("scoped_list_scroller", filteredChildList[newIndex].id, "UP");
					}
					cancelEvent = true;
				}
				if (e.key === "ArrowDown") {
					const newIndex = index - 1;
					if (newIndex >= 0) {
						setFocussedChildItem(filteredChildList[newIndex]);
						scrollViewToElement("scoped_list_scroller", filteredChildList[newIndex].id, "DOWN");
					}
					cancelEvent = true;
				}
				if (e.key === "Enter" || e.key === "ArrowRight") {
					onChildListItemTap(focussedChildItem);
					cancelEvent = true;
				}
				if (e.key === "Backspace" || e.key === "ArrowLeft") {
					if (value.length === 0) {
						descopeBar();
						cancelEvent = true;
					}
				}
				if (e.key === "Escape") {
					toggleRecentsList();
					cancelEvent = true;
				}
			} else {
				if (e.key === "Tab") {
					//cancelEvent = true;
				}
				if (e.key === "Escape") {
					if (menuInfo.show) {
						closeMenu();
						cancelEvent = true;
					} else if (gridListHistory.length > 0) {
						setGridListHistory([]);
					} else if (value.length > 0) {
						setValue("");
						cancelEvent = true;
					} else if (value.length === 0) {
						descopeBar();
						cancelEvent = true;
					}
				}
				if (e.key === "Backspace" || e.key === "ArrowLeft") {
					if (value.length === 0) {
						descopeBar();
						cancelEvent = true;
					} else {
						if (errorState !== ErrorStates.NONE) {
							setErrorState(ErrorStates.NONE);
						}
					}
				}
				if (e.key === "ArrowUp" || e.key === "ArrowDown") {
					if (value.length === 0) {
						cancelEvent = true;
					}
				}
				if (e.key === "Enter") {
					if (scope) {
						switch (scope.id) {
							case "command_create_tome":
								if (value.length > 0) submitCreateTomePrompt();
								cancelEvent = true;
								break;
							case "command_doc_2_tome":
								console.log("MAKE DOC");
								break;
							case "command_create_image":
								if (value.length > 0) submitCreateImagePrompt();
								cancelEvent = true;
								break;
							case "command_create_page":
								if (value.length > 0) submitCreatePagePrompt();
								cancelEvent = true;
								break;
							case "command_create_tiles":
								if (value.length > 0) submitCreateTilesPrompt();
								cancelEvent = true;
								break;
							case "command_create_page_from_webpage":
								if (value.length > 0) submitCreatePageFromWebpageCommand();
								cancelEvent = true;
								break;
							default:
								cancelEvent = true;
								break;
						}
					}
				}
			}

			if (scope.recentsList && filteredChildList.length === 0 && value.length === 0) {
				if (e.key === "ArrowUp") {
					toggleRecentsList();
					cancelEvent = true;
				}
			}

			if (scope.recentsList && filteredChildList.length > 0 && value.length === 0) {
				const i = filteredChildList.find(({ id }) => id === focussedChildItem.id);
				const index = filteredChildList.indexOf(i);
				if (e.key === "ArrowDown" && index === 0) {
					toggleRecentsList();
					cancelEvent = true;
				}
			}
		}
		if (cancelEvent) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const submitFallbackAction = item => {
		switch (item.id) {
			case "command_doc_2_tome":
				submitCreateTomePrompt();
				break;
			case "command_create_tome":
				submitCreateTomePrompt();
				break;
			case "command_create_page":
				submitCreatePagePrompt();
				break;
			case "command_create_image":
				submitCreateImagePrompt();
				break;
			case "command_create_tome_from_webpage":
				submitCreatePageFromWebpageCommand();
				break;
			case "command_create_page_from_webpage":
				submitCreatePageFromWebpageCommand();
				break;
			default:
				break;
		}
	};

	const updateBuildLabels = () => {
		let buildLabel = focussedItem.buildLabel;
		let finishedLabel = focussedItem.finishedLabel;
		if (focussedItem.id === "command_create_tome") {
			buildLabel = tomeData.prompt.type.placeholder;
			finishedLabel = tomeData.prompt.type.name;
		}
		tomeData.prompt.buildLabel = buildLabel;
		tomeData.prompt.finishedLabel = finishedLabel;
		//setStatusText(`Creating ${buildLabel}…`);

		setStatusLabelWaiting(`Creating ${buildLabel}…`);
		setStatusLabelFinished(`${finishedLabel} created`);
	};

	const submitCreateTomePrompt = () => {
		if (isTryingAgain) resetTome();

		blurInput();

		/*
		Go to outline builder
		*/
		setListState(ListStates.SCOPED);
		setScopedState(ScopedStates.CREATE);

		resetOutline();
		setOutlineState(OutlineStates.LOADING);
		sendOutlineQuery();

		/*
		// Go to delegate mode
		updateBuildLabels();
		setDelegateState(DelegateStates.WAITING);
		setPromptState(PromptStates.DELEGATE);
		*/

		/*
		buildTimerRefs.current.push(setTimeout(() => {
			setStatusProgress(0.1);
			setStatusLabelProgress("Creating page 1…")
			setDelegateState(DelegateStates.BUILDING);
		}, 3000));

		buildTimerRefs.current.push(setTimeout(() => {
			setStatusProgress(0.333);
			setStatusLabelProgress("Creating page 2…")
			setDelegateState(DelegateStates.BUILDING);
		}, 4000));
		
		buildTimerRefs.current.push(setTimeout(() => {
			setStatusProgress(0.666);
			setStatusLabelProgress("Creating page 3…")
			setDelegateState(DelegateStates.BUILDING);
		}, 5000));

		buildTimerRefs.current.push(setTimeout(() => {
			setStatusProgress(0.85);
			setStatusLabelProgress("Creating page 4…")
			setDelegateState(DelegateStates.BUILDING);
		}, 6000));
		
		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusProgress(1);
				setDelegateState(DelegateStates.FINISHED);
			}, 4000)
		);

		buildTimerRefs.current.push(
			setTimeout(() => {
				setDelegateState(DelegateStates.REVIEW);
				setIsGenerating(false);
				setIsReviewing(true);
			}, 5500)
		);
		*/

		//sendSubjectQuery();
	};

	const refreshOutline = () => {
		//resetOutline();
		//setOutlineTitle("");
		//outlineItems.map(i => (i.label = ""));
		setOutlineState(OutlineStates.LOADING);
		sendOutlineQuery();
	};

	const updatePageCountFromOutline = (type, index) => {
		// Update floating point value
		CREATE_TOME_LENGTH_OPTIONS.map((o, i) => {
			if (o.absoluteValue === outlineItems.length) {
				const newLength = (i + 1) / CREATE_TOME_LENGTH_OPTIONS.length;
				tomeData.prompt.createTomePageLength = newLength;
				//props.saveState
				console.log(newLength);
			}
		});

		outlineItemsRef.current = [...outlineItems];
		/*
		// Make sure items and ref are sync'd
		if (outlineItems.length !== outlineItemsRef.current.length) {
			if (type === "remove") {
				const dif = outlineItemsRef.current.length - outlineItems.length;
				outlineItemsRef.current.splice(index, dif);
			}
			if (type === "add") {
				outlineItemsRef.current.splice(index, 0, { id: uniqueId("outline_item"), label: "" });
			}
		}
		*/
	};

	const submitOutline = () => {
		let delay = 0;

		// if title is empty, repopulate with generated title?
		if (outlineTitle.length === 0) {
			setOutlineTitle(outlineTitleRef.current);
			//delay = 750;
		}

		// if a heading field is empty, remove it
		// if it's the only heading and empty, repopulate it
		let updateList = false;
		for (let i = 0; i < outlineItems.length; i++) {
			if (outlineItems[i].label.length === 0) {
				updateList = true;
				if (outlineItems.length > 1) {
					outlineItems.splice(i, 1);
				} else {
					outlineItems[i].label = outlineFirstHeadingRef.current;
				}
			}
		}
		if (updateList) {
			delay = 750;
			setOutlineItems([...outlineItems]);
		}

		/*
		const itemCount = outlineItems.length;
		const itemCopy = outlineItems.filter(item => {
			return item.label.length !== 0;
		});

		if (itemCopy.length - itemCount !== 0) {
			delay = 750;
			setOutlineItems([...itemCopy]);
		}
		*/

		console.log(outlineItems);

		setTimeout(() => {
			updateBuildLabels();
			setStatusProgress(0);
			setPromptState(PromptStates.DELEGATE);
			setDelegateState(DelegateStates.WAITING);
		}, delay);
	};

	async function sendOutlineQuery() {
		setTimeout(mockOutline, 4000);

		/*
		let lengthIndex = Math.round((CREATE_TOME_LENGTH_OPTIONS.length - 1) * tomeData.prompt.createTomePageLength);
		let pageLength = CREATE_TOME_LENGTH_OPTIONS[lengthIndex].promptValue;

		console.log(pageLength, tomeData.prompt.createTomePageLength);

		const prompt = makeOutlinePrompt(value, pageLength);
		const tokens = Math.round(MAX_TOKENS - prompt.length / 4);
		console.log("------- send GTP request ---------");
		console.log("temperature", tomeData.prompt.type.temperature);
		console.log("tokens", tokens);
		console.log(prompt);

		async function runCompletion() {
			try {
				const completion = await openai.createCompletion({
					model: "text-davinci-003",
					temperature: tomeData.prompt.type.temperature,
					max_tokens: tokens,
					prompt: prompt,
				});
				//console.log(completion.data.choices[0].text);
				makeOutline(completion.data.choices[0].text);
			} catch (error) {
				if (error.response) {
					handleError();
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
			}
		}
		runCompletion();
		*/
	}

	const makeOutline = message => {
		console.log("makeOutline");
		console.log(message);

		try {
			const { title, headings } = JSON.parse(message);
			if (title && title.length > 0) {
				let title1 = smartquotes(title);
				//tomeData.prompt.createTomeTitle = title1;
				setOutlineTitle(title1);
				outlineTitleRef.current = title1;

				if (headings && headings.length > 0) {
					// // are there fewer headings than outline items?
					// if (outlineItems.length > headings.length) {
					// 	// remove extras
					// 	const dif = outlineItems.length - headings.length;
					// 	const start = outlineItems.length - 1 - dif;
					// 	outlineItems.splice(start, dif);
					// 	console.log("removing extras", dif, start);
					// }

					// // are there more headings than outline items?
					// if (headings.length > outlineItems.length) {
					// 	// add more rows
					// 	const dif = headings.length - outlineItems.length;
					// 	for (let i = 0; i < dif; i++) {
					// 		outlineItems.push({ id: uniqueId("outline_item"), label: "" });
					// 	}
					// 	console.log("added more", dif);
					// }

					// set headings label data
					outlineFirstHeadingRef.current = headings[0];
					outlineItemsRef.current.map((o, i) => {
						if (headings[i]) {
							o.label = headings[i];
						}
					});
					setOutlineItems([...outlineItemsRef.current]);

					setOutlineState(OutlineStates.SHOW);
					console.log(outlineItems);
				}
				//console.log(tomeData.prompt.createTomeTitle);
				//console.log(tomeData.prompt.createTomeHeadings);
				//saveState();
			} else {
				handleParseError();
			}
		} catch (error) {
			console.error("Could not JSON parse stream message", message, error);
			handleParseError();
		}
	};

	async function sendSubjectQuery() {
		console.log("------- send GTP SUBJECT request ---------");
		//let tokens = Math.round(256 - prompt.length / 4);
		const prompt = `"${value}". What is the subject of this title in one or two words?`;
		console.log(prompt);
		async function runCompletion() {
			try {
				const completion = await openai.createCompletion({
					model: "text-davinci-003",
					temperature: 0.2,
					max_tokens: 256,
					prompt: prompt,
				});
				tomeData.prompt.subject = completion.data.choices[0].text.trim();
				console.log(tomeData.prompt.subject);
				saveState();
				sendGenerateTomePrompt();
				//callback(completion.data.choices[0].text);
			} catch (error) {
				if (error.response) {
					handleError();
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
			}
		}
		runCompletion();
	}

	async function sendGenerateTomePrompt() {
		//fieldRef.current.blur();
		//setStatusText(`Creating ${tomeData.prompt.type.placeholder}…`);
		//setLoadingState(LoadingStates.WAITING);
		//setIsGenerating(true);

		if (tomeData.prompt.showError) {
			cycleThroughErrors();
		} else {
			//
			// Start Generating!
			//
			const autoArtStyle =
				tomeData.prompt.images.id === imageOptions[0].id && tomeData.prompt.artStyle.id === artStyles[0].id;
			const prompt = makeTitlePrompt(value, tomeData.prompt.type, autoArtStyle);
			console.log(prompt);
			sendCompletionQuery(prompt, makeTitle);
			//sendStreamingCompletionQuery(prompt);
		}
	}

	async function sendCompletionQuery(prompt, callback) {
		const tokens = Math.round(MAX_TOKENS - prompt.length / 4);

		console.log("------- send GTP request ---------");
		console.log("temperature", tomeData.prompt.type.temperature);
		console.log("tokens", tokens);
		console.log(prompt);

		async function runCompletion() {
			try {
				const completion = await openai.createCompletion({
					model: "text-davinci-003",
					temperature: tomeData.prompt.type.temperature,
					max_tokens: tokens,
					prompt: prompt,
				});
				//console.log(completion.data.choices[0].text);
				callback(completion.data.choices[0].text);
			} catch (error) {
				if (error.response) {
					handleError();
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
			}
		}
		runCompletion();
	}

	const makeTitle = message => {
		console.log("makeTitle");
		console.log(message);
		try {
			const { title, artStyle } = JSON.parse(message);
			if (title && title.length > 0) {
				// Set art style from GPT categorization
				for (let i = 0; i < artStyles.length; i++) {
					if (artStyles[i].id === artStyle) {
						tomeData.prompt.artStyle = artStyles[i];
						console.log("new art style: ", artStyles[i]);
						saveState();
					}
				}

				let title1 = smartquotes(title);
				makeTitlePage(title1, tomeData, saveState, currentPage.theme);

				// Generate pages
				const prompt = makePagesPrompt(
					value,
					tomeData.prompt.type.id,
					tomeData.prompt.type.pages,
					tomeData.prompt.images,
					tomeData.prompt.artStyle,
					tomeData.prompt.subject
				);
				console.log(prompt);
				sendCompletionQuery(prompt, makePages);
				// !!! TODO MAKE THIS WORKKKK !!!!!
				//sendStreamingQuery(prompt)
			} else {
				handleParseError();
			}
		} catch (error) {
			console.error("Could not JSON parse stream message", message, error);
			handleParseError();
		}
	};

	const handleError = () => {
		setErrorState(ErrorStates.BUSY);
		setDelegateState(DelegateStates.HIDING);
		setPromptState(PromptStates.INPUT);
		focusInput();
		setIsGenerating(false);
	};

	const handleParseError = () => {
		setErrorState(ErrorStates.UNKNOWN);
		setDelegateState(DelegateStates.HIDING);
		setIsGenerating(false);
	};

	const makePages = async message => {
		console.log("makePages");
		console.log(message);
		try {
			const { pages } = JSON.parse(message);
			if (pages && pages.length > 0) {
				const outlineTextTile = initializeOutline(tomeData, currentPage.theme, saveState);
				for (const page of pages) {
					await buildPageFromJSON(
						tomeData.prompt.type.id,
						tomeData.prompt.images,
						page,
						tomeData,
						saveState,
						showGeneratedPage,
						currentPage.theme,
						autoPaging,
						outlineTextTile,
						requestUnsplashImageForTile,
						requestDalleImageForTile,
						tomeData.prompt.artStyle
					);
				}
				//console.log(pages);
				setStatusProgress(1);
				setDelegateState(DelegateStates.FINISHED);
				//setStatusText(`${tomeData.prompt.type.name} created`);
				setTimeout(() => {
					setDelegateState(DelegateStates.REVIEW);
					setIsGenerating(false);
					setIsReviewing(true);
				}, 1500);
			} else {
				handleParseError();
			}
		} catch (error) {
			handleParseError();
			console.error("Could not JSON parse stream message", message, error);
		}
	};

	const submitCreateImagePrompt = () => {
		blurInput();

		/*
		updateBuildLabels();
		setPromptState(PromptStates.DELEGATE);
		setStatusProgress(0);
		setDelegateState(DelegateStates.WAITING);
		*/

		/*
		setTimeout(() => {
			setStatusProgress(1);
			setDelegateState(DelegateStates.FINISHED);
		}, 3000);
		setTimeout(() => {
			setDelegateState(DelegateStates.REVIEW);
			setIsGenerating(false);
			setIsReviewing(true);
		}, 4500);
		*/

		const id1 = uniqueId("image_1");
		const id2 = uniqueId("image_2");
		const id3 = uniqueId("image_3");
		const id4 = uniqueId("image_4");

		setFilteredGridList([
			{ id: id1, src: "", loading: true },
			{ id: id2, src: "", loading: true },
			{ id: id3, src: "", loading: true },
			{ id: id4, src: "", loading: true },
		]);
		console.log(filteredGridList);

		let prompt = value;
		if (tomeData.prompt.artStyle.id !== "NONE" && tomeData.prompt.artStyle.id !== "AUTO") {
			prompt += " " + tomeData.prompt.artStyle.prompt;
		}

		async function runCompletion() {
			try {
				const completion = await openai.createImage({
					prompt: prompt,
					n: 4,
					size: "1024x1024",
				});
				//console.log(completion.data.data[0].url, filteredGridList[0].src);
				setFilteredGridList([
					{ id: id1, src: completion.data.data[0].url, loaded: false },
					{ id: id2, src: completion.data.data[1].url, loaded: false },
					{ id: id3, src: completion.data.data[2].url, loaded: false },
					{ id: id4, src: completion.data.data[3].url, loaded: false },
				]);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
			}
		}
		// Generate!
		console.log(prompt);
		runCompletion();

		/*
		setTimeout(() => {
			setFilteredGridList([
				{
					id: id1,
					src: "/3d-renders-random-roman-bratschi/06c857148416427.Y3JvcCwxMjAwLDkzOCwwLDA.jpg",
					loaded: false,
				},
				{ id: id2, src: "/3d-renders-random-roman-bratschi/6f4166148416427.6331cdd6ac406.jpg", loaded: false },
				{ id: id3, src: "/3d-renders-random-roman-bratschi/7ea7e5148416427.6331cdd40aabb.jpg", loaded: false },
				{ id: id4, src: "/3d-renders-random-roman-bratschi/8-glassy-gradients-n°4-twist.jpg", loaded: false },
			]);
		}, 2000);
		*/
	};

	const onScopedDoneClick = () => {
		setPromptIsOpen(false);
		setTimeout(descopeBar, 500);
	};

	const onScopedKeepClick = () => {
		setGridList([]);
		setValue("");
		focusInput();
		//console.log(onScopedKeepClick)
	};

	/*
	/
	/
	/
	CREATE TILES COMMAND SPECIFIC
	/
	/
	/
	*/

	const submitCreateTilesPrompt = () => {
		blurInput();
		setListState(ListStates.SCOPED);
		setSelectedGridIndex(null);

		clearCreateTileTimers();
		const ids = loadNewCreateTileResults();
		const noResults = gridList.length === 0;
		// Fire off tile requests
		ids.forEach((id, i) => {
			requestTileCandidate(id, 1500 + i * 500, i === 0 && noResults);
		});
	};

	const loadNewCreateTileResults = (index = null) => {
		const id1 = uniqueId("tile_1");
		const id2 = uniqueId("tile_2");
		const id3 = uniqueId("tile_3");
		const id4 = uniqueId("tile_4");
		const ids = [id1, id2, id3, id4];
		const list = [
			{ id: id1, loading: true },
			{ id: id2, loading: true },
			{ id: id3, loading: true },
			{ id: id4, loading: true },
		];
		// Don't overwrite the selected result
		if (index !== null) {
			list.splice(selectedGridIndex, 1, gridList[selectedGridIndex]);
		}
		setGridList(list);
		gridListRef.current = [...list];
		return ids;
	};

	const requestTileCandidate = (id, time, selectOnLoad = false) => {
		const t = time ? time : random(1000, 3000);
		// Fake an api call to LLM
		// Use a ref because state is stale in a timeout :(
			console.log(tomeData.prompt.createTilesTypes)
		const timeout = setTimeout(() => {
			const candidate = makeNewTileResult(id, createTileExampleIndex, tomeData.prompt.createTilesTypes);
			const i = gridListRef.current.findIndex(obj => obj.id === candidate.id);
			if (i >= 0) {
				gridListRef.current.splice(i, 1, candidate);
				setGridList([...gridListRef.current]);
			}
		}, t);
		createTileTimeouts.current.push(timeout);
	};

	const clearCreateTileTimers = () => {
		createTileTimeouts.current.forEach(t => {
			clearTimeout(t);
		});
		createTileTimeouts.current = [];
	};

	const onRegenerateTilesClick = () => {
		closeMenu();
		submitCreateTilesPrompt();
	};

	const onGeneratedTileDrop = (i, pageData, dropInfo, replace = false) => {
		console.log("onGeneratedTileDrop", i);
		console.log(pageData, dropInfo);

		const newTile = pageData.tiles[0];
		if (
			dropInfo.dropZone === "ABOVE_PAGE" ||
			dropInfo.dropZone === "BELOW_PAGE" ||
			dropInfo.dropZone === "ABOVE_TILE" ||
			dropInfo.dropZone === "BELOW_TILE"
		) {
			// Create a new row and add new tiles to it
			const row = appendRowAtOrder(currentPage, tomeData, dropInfo.rowOrder);
			// addFilesToRowAtOrder(mediaFiles, row, 1);
			createTileInRowAtOrder(newTile, row, 1);
			//saveState();
			dropInfo.isValid = true;
		} else if (dropInfo.dropZone === "LEFT_OF_TILE" || dropInfo.dropZone === "RIGHT_OF_TILE") {
			createTileInRowAtOrder(newTile, dropInfo.rowOver, dropInfo.tileOrder);
			//saveState();
			dropInfo.isValid = true;
		} else if (dropInfo.dropZone === "CENTER_OF_TILE") {
			tomeData.tiles.splice(tomeData.tiles.indexOf(dropInfo.tileOver), 1);
			createTileInRowAtOrder(newTile, dropInfo.rowOver, dropInfo.tileOrder);
			//saveState();
			dropInfo.isValid = true;
		}

		//saveState();

		setTimeout(e => {
			// Remove candidate now that it's been added
			const list = [...gridList];
			list.splice(i, 1);

			// Add a new loading candidate to the end of the list
			const id = uniqueId("candidate");
			list.push({ id: id, loading: true });

			// Update list
			setGridList(list);
			gridListRef.current = [...list];

			// Fire off request
			requestTileCandidate(id);

			// if (newTile.type === tileNames.TEXT.name) {
			// 	const index = newTile.params.blocks.length - 1;
			// 	const block = newTile.params.blocks[index];
			// 	const el = document.getElementById(block.id);

			// 	const range = document.createRange();
			// 	range.selectNodeContents(el);
			// 	range.collapse();
			// 	const sel = document.getSelection();
			// 	sel.removeAllRanges();
			// 	sel.addRange(range);
			// 	console.log("focus", block.id);
			// }
		}, 500);
	};

	const onGeneratedTileClick = (i, pageData) => {
		const newTile = pageData.tiles[0];
		appendNewTile(newTile);

		// Remove candidate now that it's been added
		const list = [...gridList];
		list.splice(i, 1);

		// Add a new loading candidate to the end of the list
		const id = uniqueId("candidate");
		list.push({ id: id, loading: true });

		// Update list
		setGridList(list);
		gridListRef.current = [...list];

		// Fire off request
		requestTileCandidate(id);
	};

	/*
	/
	/
	/
	CREATE PAGE COMMAND SPECIFIC
	/
	/
	/
	*/

	const submitCreatePagePrompt = () => {
		blurInput();
		setListState(ListStates.SCOPED);
		setSelectedGridIndex(null);
		clearCreatePageTimers();
		const ids = loadNewCreatePageResults();
		const noResults = gridList.length === 0;
		// Fire off 4 requests
		ids.forEach((id, i) => {
			requestPageCandidate(id, 1500 + i * 500, i === 0 && noResults);
		});
	};

	const loadNewCreatePageResults = (index = null) => {
		const id1 = uniqueId("content_1");
		const id2 = uniqueId("content_2");
		const id3 = uniqueId("content_3");
		const id4 = uniqueId("content_4");
		const ids = [id1, id2, id3, id4];
		const list = [
			{ id: id1, loading: true },
			{ id: id2, loading: true },
			{ id: id3, loading: true },
			{ id: id4, loading: true },
		];
		// Don't overwrite the selected result
		if (index !== null) {
			list.splice(selectedGridIndex, 1, gridList[selectedGridIndex]);
		}
		setGridList(list);
		gridListRef.current = [...list];
		return ids;
	};

	const onRegeneratePagesClick = (makeNewPage = false) => {
		// Retain selected result
		//const ids = loadNewCreatePageResults(selectedGridIndex);

		// Blow away all results
		submitCreatePagePrompt();
	};

	const onGeneratedPageContentClick = (i, pageData, page = currentPage) => {
		console.log("onGeneratedPageContentClick");
		console.log(page, pageData);
		if (pageData !== undefined && pageData.rows && pageData.tiles) {
			setSelectedGridIndex(i);
			// find the rows and tiles on the current page
			// remove them & add the rows and tiles from the data
			tomeData.tiles = tomeData.tiles.filter(t => t.pageId !== page.id);
			tomeData.rows = tomeData.rows.filter(r => r.pageId !== page.id);
			// console.log(tomeData);
			// Update page id for new rows & tiles
			pageData.rows.forEach(r => {
				const newRow = { ...r };
				newRow.pageId = page.id;
				const rowId = uniqueId("row");
				pageData.tiles.forEach(t => {
					const newTile = { ...t };
					if (t.rowId === r.id) {
						newTile.rowId = rowId;
						newTile.pageId = page.id;
						newTile.id = uniqueId("tile");
						tomeData.tiles.push(newTile);
					}
				});
				newRow.id = rowId;
				tomeData.rows.push(newRow);
			});
			setCreatePageAdded(true);
			saveState();
		}
		blurInput();
	};

	const onGeneratedPageDrop = (i, pageData, dropInfo, replace = false) => {
		console.log("onGeneratedPageDrop", i);
		console.log(pageData, dropInfo);

		if (pageData !== undefined && pageData.rows && pageData.tiles) {
			if (replace) {
				// find the rows and tiles on the current page & remove them
				tomeData.tiles = tomeData.tiles.filter(t => t.pageId !== currentPage.id);
				tomeData.rows = tomeData.rows.filter(r => r.pageId !== currentPage.id);
			} else {
				// update row orders for existing rows
				tomeData.rows.forEach(r => {
					if (r.order >= dropInfo.rowOrder) {
						r.order += pageData.rows.length;
					}
				});
			}

			// Update candidate data page id for new rows & tiles
			// Add candidate to the page
			pageData.rows.forEach((r, i) => {
				const newRow = { ...r };
				if (!replace) newRow.order = dropInfo.rowOrder + i;
				newRow.pageId = currentPage.id;
				const rowId = uniqueId("row");
				pageData.tiles.forEach(t => {
					const newTile = { ...t };
					if (t.rowId === r.id) {
						newTile.rowId = rowId;
						newTile.pageId = currentPage.id;
						newTile.id = uniqueId("tile");
						tomeData.tiles.push(newTile);
					}
				});
				newRow.id = rowId;
				tomeData.rows.push(newRow);
			});
			saveState();
			setCreatePageAdded(true);

			// Remove candidate now that it's been added
			setSelectedGridIndex(null);
			const list = [...gridList];
			list.splice(i, 1);

			// Add a new loading candidate to the end of the list
			const id = uniqueId("candidate");
			list.push({ id: id, loading: true });

			// Update list
			setGridList(list);
			gridListRef.current = [...list];

			// Fire off request
			requestPageCandidate(id);
		}
	};

	const onGenerateMorePagesLikeThis = item => {};

	const requestPageCandidate = (id, time, selectOnLoad = false) => {
		const t = time ? time : random(1000, 3000);
		// Fake an api call to LLM
		// Use a ref because state is stale in a timeout :(
		const timeout = setTimeout(() => {
			const candidate = makeNewPageResult(id, createPageExampleIndex);
			const i = gridListRef.current.findIndex(obj => obj.id === candidate.id);
			console.log(i);
			if (i >= 0) {
				gridListRef.current.splice(i, 1, candidate);
				setGridList([...gridListRef.current]);
				if (selectOnLoad) {
					const makeNewPage = !checkForEmptyPage();
					if (makeNewPage) {
						onGeneratedPageContentClick(i, candidate, addPage());
					} else {
						onGeneratedPageContentClick(i, candidate);
					}
				}
			}
		}, t);
		createPageTimeouts.current.push(timeout);
	};

	const clearCreatePageTimers = () => {
		createPageTimeouts.current.forEach(t => {
			clearTimeout(t);
		});
		createPageTimeouts.current = [];
	};

	const hideGridResults = () => {
		setCreatePageAdded(false);
		setSelectedGridIndex(null);
		clearCreatePageTimers();
		setGridList([]);
		resetPage();
		focusInput();
	};

	const onToggleHistoryClick = () => {
		console.log("onToggleHistoryClick");
		if (gridListHistory.length > 0) {
			setGridListHistory([]);
		} else {
			setGridListHistory(createPageRecentsList);
		}
	};

	/*
	/
	DOWNLOAD COMMAND SPECIFIC
	/
	*/

	const submitDownloadPrompt = () => {
		blurInput();
		updateBuildLabels();
		setPromptState(PromptStates.DELEGATE);
		setStatusProgress(0);
		setDelegateState(DelegateStates.WAITING);

		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusProgress(1);
				setDelegateState(DelegateStates.FINISHED);
			}, 3000)
		);

		buildTimerRefs.current.push(
			setTimeout(() => {
				setPromptIsOpen(false);
			}, 4500)
		);
	};

	const submitCreatePageFromWebpageCommand = () => {
		blurInput();
		updateBuildLabels();
		setStatusLabelWaiting("Reading webpage…");
		setPromptState(PromptStates.DELEGATE);
		setStatusProgress(0);
		setDelegateState(DelegateStates.WAITING);

		let t = 2000;

		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusLabelWaiting("Summarizing content…");
			}, t)
		);

		t += 1500;
		buildTimerRefs.current.push(
			setTimeout(() => {
				tomeData.tiles[0].params = web2TomeTextTileParams[0];
				saveState();
			}, t)
		);

		t += 1000;
		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusLabelWaiting("Finding images…");
			}, t)
		);

		t += 1500;
		buildTimerRefs.current.push(
			setTimeout(() => {
				appendTileToRowInTome(
					{
						type: tileNames.IMAGE.name,
						params: {
							image: "/ludwig-godefroy/ludwig-godefroy-casa-alferez-architecture_dezeen_2364_col_7-scaled.webp",
							imageSize: "cover",
							isLoading: false,
						},
					},
					tomeData.rows[0],
					tomeData
				);
				saveState();
			}, t)
		);

		t += 1000;
		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusLabelWaiting("Choosing theme…");
			}, t)
		);

		t += 1500;
		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusLabelWaiting("Adjusting layout…");

				currentPage.theme = Themes[Themes.length - 1];
				saveState();
			}, t)
		);

		t += 1500;
		buildTimerRefs.current.push(
			setTimeout(() => {
				tomeData.tiles[0].params.alignmentX = alignmentX.LEFT;
				tomeData.tiles[0].width = 7;
				tomeData.tiles[1].width = 5;
				saveState();
			}, t)
		);

		t += 1500;
		buildTimerRefs.current.push(
			setTimeout(() => {
				setStatusProgress(1);
				setDelegateState(DelegateStates.FINISHED);
			}, t)
		);

		t += 1000;
		buildTimerRefs.current.push(
			setTimeout(() => {
				selectTile(tomeData.tiles[1]);
			}, t)
		);

		t += 1000;
		buildTimerRefs.current.push(
			setTimeout(() => {
				setFilteredGridList(web2TomeImageChoices);
				setStatusLabelFinished("5 images found");
				setDelegateState(DelegateStates.REVIEW);
				setIsGenerating(false);
				setIsReviewing(true);
			}, t)
		);
	};

	const onGridImageLoaded = id => {
		const item = filteredGridList.find(i => i.id === id);
		item.loaded = true;
		setFilteredGridList([...filteredGridList]);
	};

	const onGeneratedTextClick = params => {
		// Web2tome demo remnant
		console.log("onGeneratedTextClick");
		tomeData.tiles[0].params = params;
		saveState();
	};

	const resetOutline = () => {
		// Clear out existing title and headings
		setOutlineTitle("");
		outlineItemsRef.current = [];

		// Create a new row for each page requested
		let lengthIndex = Math.round((CREATE_TOME_LENGTH_OPTIONS.length - 1) * tomeData.prompt.createTomePageLength);
		let pageLength = CREATE_TOME_LENGTH_OPTIONS[lengthIndex].absoluteValue;
		for (let i = 0; i < pageLength; i++) {
			outlineItemsRef.current.push({ id: uniqueId("outline_item"), label: "" });
		}
		setOutlineItems([...outlineItemsRef.current]);

		console.log("resetOutline", outlineItems, outlineItemsRef.current);

		/*
		setOutlineItems([
			{ id: uniqueId("outline_item"), label: "" },
			{ id: uniqueId("outline_item"), label: "" },
			{ id: uniqueId("outline_item"), label: "" },
			{ id: uniqueId("outline_item"), label: "" },
			{ id: uniqueId("outline_item"), label: "" },
			{ id: uniqueId("outline_item"), label: "" },
		]);
		*/
	};

	const mockOutline = () => {
		console.log("mockOutline", outlineItems);

		// Update title
		setOutlineTitle("The Benefits of a Plant-Based Diet");

		// Update headings
		const headings = [
			"The Rise of Plant-Based Diets",
			"Understanding a Plant-Based Diet",
			"Health Benefits of a Plant-Based Diet",
			"Environmental Impact of a Plant-Based Diet",
			"Ethical Considerations",
			"Economic Advantages",
			"Exploring Culinary Diversity",
			"Sports Performance and Fitness",
			"Addressing Nutritional Concerns",
			"Plant-Based Diet in Practice",
			"Success Stories and Testimonials",
			"Promoting a Sustainable Future",
		];
		outlineItemsRef.current.map((o, i) => {
			if (headings[i]) {
				o.label = headings[i];
			}
		});

		// Save changes
		setOutlineItems([...outlineItemsRef.current]);

		// Change state to show aka "ready"
		// Outline view: show, hide
		// Items: loading, ready
		setOutlineState(OutlineStates.SHOW);
	};

	return (
		<Wrapper
			id="prompt_bar_container"
			style={{
				pointerEvents: "none",
				visibility: isPlayMode ? "hidden" : "visible",
				//paddingBottom: errorState !== ErrorStates.NONE ? 34 : 64,
				originY: 1,
			}}
			ref={wrapRef}
			initial={false}
			animate={
				{
					//y: itemDragging ? 160 : 0,
					//scale: itemDragging ? 0.5 : 1,
					//opacity: itemDragging ? 0 : 1,
				}
			}
			transition={{
				type: "spring",
				stiffness: 600,
				damping: 45,
			}}
		>
			<PromptDragConstraints ref={constaintsRef} />

			{/* <AnimatePresence> */}
			{/* {promptIsOpen && ( */}

			<PromptBackground
				animate={{
					width: promptSize.containerWidth,
					height: promptSize.containerHeight,
					y: promptSize.y,
					scale: isHovering ? (promptbarMetrics.mini.width + 12) / promptbarMetrics.mini.width : 1,
					//opacity: itemDragging ? 0 : 1,
				}}
				transition={transitions.morph}
				initial={false}
				style={{
					x: "-50%",
					bottom: 0,
				}}
			>
				<PromptBackgroundMaterial
					initial={false}
					animate={{
						opacity: promptIsOpen ? 1 : 0,
					}}
					transition={transitions.promptBgVisible(promptIsOpen)}
					style={{
						backgroundColor: colors.promptbar.barBackground,
						borderRadius: promptSize.borderRadius,
						boxShadow: colors.promptbar.barShadow,

						backdropFilter: "saturate(180%) blur(20px)",
						WebkitBackdropFilter: "saturate(180%) blur(20px)",
					}}
				/>

				<PromptBackgroundMaterial
					ref={miniBgRef}
					initial={false}
					animate={{
						opacity: !promptIsOpen ? 1 : 0,
					}}
					transition={transitions.miniBgVisible(!promptIsOpen)}
					style={{
						backgroundColor: colors.promptbar.miniBackground,
						backdropFilter: "saturate(180%) blur(20px)",
						boxShadow: colors.promptbar.miniShadow,

						WebkitBackdropFilter: "saturate(180%) blur(20px)",
						borderRadius: promptSize.borderRadius,
					}}
				>
					{/* <Fill
						style={{
							backgroundColor: colors.promptbar.miniBackgroundHover,
							borderRadius: promptSize.borderRadius,
						}}
						initial={false}
						animate={{
							opacity: isHovering ? 1 : 0,
						}}
					/> */}
				</PromptBackgroundMaterial>
			</PromptBackground>

			<Bar
				id="prompt_bar_content_wrap"
				key="prompt_bar_content_wrap"
				ref={controlRef}
				style={{
					//overflow: "hidden",
					pointerEvents: !promptIsOpen ? "none" : "auto",
					borderRadius: promptSize.borderRadius,
					position: "absolute",
					left: "50%",
					x: "-50%",
					bottom: 0,
				}}
				initial={false}
				transition={transitions.morph}
				animate={{
					width: promptSize.containerWidth,
					height: promptSize.containerHeight,
					y: promptSize.y,
				}}
				onMouseDown={e => {
					if (!promptIsOpen) {
					} else {
						closeMenu(); // close any menus that may be open
					}
				}}
			>
				{/* <AnimatePresence mode={"popLayout"}> */}
				{/* {promptState !== PromptStates.LOADING && ( */}
				<motion.div
					ref={rootViewRef}
					id="promptbar_root_view"
					key="promptbar_root_view"
					style={{
						originX: 0.5,
						originY: 1,
						position: "absolute",
						left: "50%",
						x: "-50%",
						bottom: 0,
						display: "flex",
						flexDirection: "column",
						//justifyContent: "center",
						alignItems: "flex-end",
					}}
					initial={false}
					animate={{
						opacity: promptSize.inputOpacity,
						scale: promptSize.inputScale,
						width: promptSize.inputWidth,
						height: promptSize.inputHeight,
					}}
					transition={transitions.morph}
					//transition={promptState === PromptStates.INPUT && promptIsOpen ? tParentViewShow : tParentViewHide}
					//transition={moveTransition}
				>
					{/* <ScopedList
									key="scoped_list"
									theme={currentPage.theme}
									list={filteredChildList}
									focussedChildItem={focussedChildItem}
									setFocussedChildItem={setFocussedChildItem}
									onChildListItemTap={onChildListItemTap}
									isUsingFallbackIntents={isUsingFallbackIntents}
									value={value}
									listState={listState}
								/> */}

					{outlineState !== OutlineStates.HIDE && promptIsOpen && (
						<Outline
							outlineState={outlineState}
							promptIsOpen={promptIsOpen}
							theme={currentPage.theme}
							transitions={transitions}
							prompt={tomeData.prompt}
							saveState={saveState}
							value={value}
							items={outlineItems}
							setItems={setOutlineItems}
							title={outlineTitle}
							setTitle={setOutlineTitle}
							submitOutline={submitOutline}
							updatePageCountFromOutline={updatePageCountFromOutline}
						/>
					)}

					<GridList
						key="grid_list_a"
						theme={currentPage.theme}
						list={gridList}
						value={value}
						listState={listState}
						scope={scope}
						hideGridResults={hideGridResults}
						//onGridLoaded={onGridImageLoaded}
						selectedGridIndex={selectedGridIndex}
						transitions={transitions}
						onScopedDoneClick={onScopedDoneClick}
						onScopedKeepClick={onScopedKeepClick}
						onGeneratedPageContentClick={onGeneratedPageContentClick}
						onGeneratedPageDrop={onGeneratedPageDrop}
						onGeneratedTileDrop={onGeneratedTileDrop}
						itemDragging={itemDragging}
						setItemDragging={setItemDragging}
						promptbarContainerRef={controlRef}
						onGenerateMorePagesLikeThis={onGenerateMorePagesLikeThis}
						gridListHistory={gridListHistory}
						onGeneratedTileClick={onGeneratedTileClick}
					/>

					<List
						key={"root_list"}
						ref={listRef}
						isRootList={true}
						id="root_list"
						theme={currentPage.theme}
						list={filteredIntentsList}
						maxListRows={MAX_LIST_ROWS}
						listItemTapped={listItemTapped}
						scopeBar={scopeBar}
						listState={listState}
						scope={scope}
						scopedState={scopedState}
						focussedItem={focussedItem}
						setFocussedItem={setFocussedItem}
						disableIntentHovers={disableIntentHovers}
						isUsingFallbackIntents={isUsingFallbackIntents}
						value={value}
						prompt={tomeData.prompt}
						descopeBar={descopeBar}
						toggleRecentsList={toggleRecentsList}
						transitions={transitions}
						submitOutline={submitOutline}
						outlineLoading={outlineState === OutlineStates.LOADING}
						outlineTitle={outlineTitle}
						refreshOutline={refreshOutline}
						gridList={gridList}
						gridListHistory={gridListHistory}
						onScopedDoneClick={onScopedDoneClick}
						onRegeneratePagesClick={onRegeneratePagesClick}
						hideGridResults={hideGridResults}
						createPageAdded={createPageAdded}
						onToggleHistoryClick={onToggleHistoryClick}
						onRegenerateTilesClick={onRegenerateTilesClick}
					/>

					<Divider
						style={{
							backgroundColor: currentPage.theme.colors.promptbar.divider,
							position: "absolute",
							y: -67.5,
							bottom: 0,
						}}
						initial={false}
						animate={{
							opacity: listState === ListStates.ROOT ? 1 : 0,
							//height: listState === ListStates.ROOT ? 1 : 0,
						}}
						transition={listState === ListStates.ROOT ? tDividerShow : tDividerHide}
					/>

					<TextArea
						key="text_area"
						theme={currentPage.theme}
						ref={fieldRef}
						errorState={errorState}
						value={value}
						setValue={setValue}
						promptState={promptState}
						promptIsOpen={promptIsOpen}
						listState={listState}
						scope={scope}
						scopedState={scopedState}
						onInputKeyDown={onInputKeyDown}
						onChange={onInputChange}
						prompt={tomeData.prompt}
						updateContainerHeight={updateContainerHeight}
						transitions={transitions}
						gridList={gridList}
						gridListHistory={gridListHistory}
					/>

					{errorState !== ErrorStates.NONE && (
						<Errors key="api_errors" theme={currentPage.theme} errorState={errorState} />
					)}
				</motion.div>

				{/* )} */}
				{/* {promptState === PromptStates.LOADING && ( */}
				<motion.div
					key="prompt_bar_status_wrap"
					initial={false}
					animate={{
						opacity: promptState === PromptStates.DELEGATE && promptIsOpen ? 1 : 0,
					}}
					//transition={promptState === PromptStates.DELEGATE && promptIsOpen ? tLoadingViewShow : tLoadingViewHide}
					transition={transitions.morph}
					style={{
						position: "absolute",
						originX: 0.5,
						originY: 1,
						pointerEvents: promptState === PromptStates.DELEGATE && promptIsOpen ? "auto" : "none",
					}}
					ref={loadingViewRef}
				>
					<GridListOld
						key="grid_list"
						theme={currentPage.theme}
						list={filteredGridList}
						value={value}
						listState={listState}
						onImageClick={onGeneratedImageClick}
						onTextClick={onGeneratedTextClick}
						setPromptIsOpen={setPromptIsOpen}
						hideGridResults={hideGridResults}
						onGridImageLoaded={onGridImageLoaded}
						selectedIndex={gridListSelectedIndex}
						setSelectedIndex={setGridListSelectedIndex}
						transitions={transitions}
					/>
					{delegateState !== DelegateStates.HIDING && (
						<Status
							theme={currentPage.theme}
							listState={listState}
							delegateState={delegateState}
							statusLabelWaiting={statusLabelWaiting}
							statusLabelProgress={statusLabelProgress}
							statusLabelFinished={statusLabelFinished}
							statusProgress={statusProgress}
							tryAgain={tryAgain}
							accept={acceptPresentation}
							cancelLoading={cancelLoading}
							transitions={transitions}
						/>
					)}
				</motion.div>
				{/* )} */}
				{/* </AnimatePresence> */}

				<motion.div
					key="prompt_bar_mini"
					initial={false}
					animate={{
						opacity: promptSize.skateboardOpacity,
						y: promptSize.skateboardY,
						//scale: isHovering ? promptbarMetrics.mini.width / (promptbarMetrics.mini.width + 16) : 1,
					}}
					transition={transitions.morph}
					onAnimationStart={() => setSkateboardAnimating(true)}
					onAnimationComplete={() => setSkateboardAnimating(false)}
					//transition={!promptIsOpen ? tSkateboardShow : tSkateboardHide}
					style={{
						position: "absolute",
						originX: 0.5,
						originY: 1,
						width: "100%",
						height: promptbarMetrics.mini.height,
						pointerEvents: !promptIsOpen ? "auto" : "none",
						cursor: !promptIsOpen ? "pointer" : "default",
					}}
					onHoverStart={e => {
						if (skateboardAnimating) return;
						setIsHovering(true);
						// if (!promptIsOpen) {
						// 	showTooltip({
						// 		id: "promptbar_minibar_tooltip",
						// 		ref: miniBgRef,
						// 		label: "Commands",
						// 		shortcuts: ["⌘", "K"],
						// 		alignX: "middle",
						// 		alignY: "leading",
						// 	});
						// }
					}}
					onMouseOut={e => {
						setIsHovering(false);
						//resetTooltip();
					}}
					onMouseDown={
						!promptIsOpen
							? e => {
									togglePrompt();
									//hideTooltip();
									setTimeout(focusInput, 500);
							  }
							: undefined
					}
				>
					<Skateboard
						theme={currentPage.theme}
						isShowing={!promptIsOpen}
						isHovering={isHovering}
						transitions={transitions}
					/>
				</motion.div>

				{/* <PromptBorder
					initial={false}
					animate={{opacity: promptIsOpen ? 1 : 0 }}
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: colors.promptbar.barBorder,
						borderRadius: promptbarRadius,
					}}
				/> */}
			</Bar>

			{/* )} */}
			{/* </AnimatePresence> */}
		</Wrapper>
	);
};

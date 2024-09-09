import React from "react";
import { uniqueId } from "lodash";

import { ResetStyles } from "../ds/styles/Reset";

export const TomeContext = React.createContext();
export const TomeProvider = ({ tome, children }) => {
	const [tomeData, setTomeData] = React.useState(tome);
	const undoStack = React.useRef([]);

	const saveState = () => {
		setTomeData({ ...tomeData });
		console.log("Save state / re-render", tomeData);
	};

	const addToEditStack = () => {
		undoStack.current.push(JSON.stringify(tomeData));
	};

	const undo = () => {
		if (undoStack.current.length > 0) {
			const state = undoStack.current.pop();
			const data = JSON.parse(state);
			setTomeData({ ...data });
		}
	};

	const setPageTheme = (page, theme) => {
		addToEditStack();
		page.theme = theme;
		saveState();
	};

	const setTileAspectRatio = (tile, o) => {
		tile.layout.aspectRatio.value = o.value;
		tile.layout.aspectRatio.label = o.label;
		tile.layout.contentSize.height = tile.layout.contentSize.width * (1 / tile.layout.aspectRatio.value);
		saveState();
	};

	const setTileMargin = (tile, axis, v) => {
		tile.layout.margin[axis] = v;
		saveState();
	};

	const setTilePadding = (tile, axis, v) => {
		tile.layout.padding[axis] = parseInt(v);
		saveState();
	};

	const setTileCentering = (tile, v) => {
		tile.layout.centered = v;
		saveState();
	};

	const setTileGap = (tile, v) => {
		tile.layout.gap = v;
		saveState();
	};

	const setTileBorderRadius = (tile, v) => {
		tile.layout.borderRadius = v;
		saveState();
	};

	const setTileScrolling = (tile, v) => {
		tile.layout.scrolling = v;
		saveState();
	};

	const setTileFontSize = (tile, v) => {
		tile.layout.font.bodySize = v;
		saveState();
	};

	const setTileMinSize = (tile, v) => {
		tile.layout.minSize = v;
		saveState();
	};

	const setTileAutoZoom = (tile, v) => {
		addToEditStack();
		tile.layout.autoZoom = v;
		saveState();
	};

	const setTileWidth = (tile, v) => {
		addToEditStack();
		tile.layout.contentSize.width = v;
		tile.layout.contentSize.height = v * (1 / tile.layout.aspectRatio.value);
		saveState();
	};

	const setTileHeight = (tile, v) => {
		addToEditStack();
		tile.layout.contentSize.height = v;
		tile.layout.contentSize.width = v * tile.layout.aspectRatio.value;
		saveState();
	};

	const setPagePadding = (tile, v) => {
		addToEditStack();
		tile.layout.padding.x = v;
		tile.layout.padding.y = v;
		saveState();
	};

	const setTileAutoSize = (tile, w, h) => {
		addToEditStack();
		if (w) tile.layout.width = w;
		if (h) tile.layout.height = h;
		saveState();
	};

	const setTileLayoutDirection = (tile, v) => {
		addToEditStack();
		tile.layout.direction = v;
		saveState();
	};

	const setTileLayoutJustifyContent = (tile, v) => {
		console.log("setTileLayoutJustifyContent", v);
		addToEditStack();
		tile.layout.justifyContent = v;
		saveState();
	};

	const setTileLayoutAlignItems = (tile, v) => {
		console.log("setTileLayoutAlignItems", v);
		addToEditStack();
		tile.layout.alignItems = v;
		saveState();
	};

	const setTileLayoutType = (tile, v) => {
		addToEditStack();
		tile.layout.type = v;
		saveState();
	};

	const setTileLayoutFlexBasis = (tile, v) => {
		addToEditStack();
		tile.layout.flexBasis = v;
		saveState();
	};

	const setTileLayoutSizing = (tile, v) => {
		addToEditStack();
		tile.layout.sizing = v;
		if (v === "fill") {
			tile.layout.justifySelf = "stretch";
			tile.layout.alignSelf = "stretch";
		}
		if (v === "fit") {
			tile.layout.justifySelf = "start";
			tile.layout.alignSelf = "start";
		}

		saveState();
	};

	const deleteEmptyContainers = tile => {
		console.log("deleteEmptyContainers:", tile.tiles.length);

		if (tile.tiles.length === 0 && tile.type === "FLEX") {
			// Remove the FLEX container if it will have no children (empty group) after the tile delete
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				parent.tiles.splice(parent.tiles.indexOf(tile), 1);
			}
		}
	};

	const deleteTile = tile => {
		console.log("deleteTile:", tile);

		if (tile.parentId) {
			addToEditStack();
			const parent = findTileById(tile.parentId);
			parent.tiles.splice(parent.tiles.indexOf(tile), 1);
			deleteEmptyContainers(parent);
		}

		// state is saved from delete selection code
	};

	const duplicateTile = tile => {
		// add to undo stack
		addToEditStack();
		// find parent
		const parent = findTileById(tile.parentId);
		// create new tile object
		const newTile = JSON.parse(JSON.stringify(tile));
		// give it a new id
		newTile.id = uniqueId("tile_duplicated");
		// create new ids for all child tiles
		if (newTile.tiles && newTile.tiles.length > 0) {
			const reIdTiles = (ts, pId) => {
				ts.forEach(t => {
					t.parentId = pId;
					t.id = uniqueId("tile_duplicated");
					if (t.tiles && t.tiles.length > 0) {
						reIdTiles(t.tiles, t.id);
					}
				});
			};
			reIdTiles(newTile.tiles, newTile.id);
		}
		// add to new tile parent tile
		parent.tiles.splice(parent.tiles.indexOf(tile) + 1, 0, newTile);
		// deselect old tile
		tile.selected = false;

		return tile;
	};

	const findTilesByKeyValue = (key, value) => {
		let tiles = [];
		const findTiles = (root, key, value) => {
			//console.log(root.id);
			root.tiles.forEach(t => {
				//console.log(t.id);
				if (t[key] === value) {
					//console.log("match");
					tiles.push(t);
					//return t;
				}
				if (t.tiles && t.tiles.length > 0) {
					findTiles(t, key, value);
				}
			});
		};
		findTiles(getCurrentPage(), key, value);
		//console.log("findTilesByKeyValue", tiles.length);
		return tiles;
	};

	const findTileById = id => {
		return findTilesByKeyValue("id", id)[0];
	};

	const getTiles = () => {
		const tiles = [];
		const addTilesToArray = (list, array) => {
			list.forEach(o => {
				array.push(o);
				if (o.tiles && o.tiles.length > 0) {
					addTilesToArray(o.tiles, array);
				}
			});
		};
		addTilesToArray(getCurrentPage().tiles, tiles);
		return tiles;
	};

	const getCurrentPage = () => {
		let selectedPage = tomeData.tiles[0];
		tomeData.tiles.forEach(tile => {
			if (tile.selected) selectedPage = tile;
		});
		return selectedPage;
	};

	const setCurrentPage = page => {
		// deselect any tiles
		tomeData.tiles.forEach(tile => {
			tile.selected = undefined;
		});
		page.selected = true;
		saveState();
	};

	const incrementPage = increment => {
		const currentIndex = tomeData.tiles.indexOf(getCurrentPage());
		const nextIndex = currentIndex + increment;
		if (increment > 0 && nextIndex > tomeData.tiles.length - 1) {
			setCurrentPage(tomeData.tiles[0]);
		} else if (increment < 0 && nextIndex < 0) {
			setCurrentPage(tomeData.tiles[tomeData.tiles.length - 1]);
		} else {
			setCurrentPage(tomeData.tiles[nextIndex]);
		}
	};

	const getTileParentDirection = tile => {
		if (tile.parentId) {
			const parent = findTileById(tile.parentId);
			if (parent && parent.layout && parent.layout.direction) {
				return parent.layout.direction;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	};

	const findTileDepth = tile => {
		let depth = 0;

		const findParent = tile => {
			if (tile.parentId) {
				const parent = findTileById(tile.parentId);
				if (parent) {
					depth++;
					findParent(parent);
				}
			}
		};

		findParent(tile);
		return depth;
	};

	return (
		<TomeContext.Provider
			value={{
				tomeData,
				saveState,
				undo,
				addToEditStack,

				findTileById,
				findTilesByKeyValue,
				getTiles,
				getTileParentDirection,
				findTileDepth,

				getCurrentPage,
				setCurrentPage,
				incrementPage,

				deleteTile,
				duplicateTile,
				deleteEmptyContainers,

				setPageTheme,

				setTileAspectRatio,
				setTileMargin,
				setTileCentering,
				setTileGap,
				setTileBorderRadius,
				setTileScrolling,
				setTileFontSize,
				setTileMinSize,
				setTileAutoZoom,
				setTileWidth,
				setTileHeight,
				setTilePadding,
				setPagePadding,
				setTileLayoutDirection,
				setTileLayoutJustifyContent,
				setTileLayoutAlignItems,
				setTileLayoutType,
				setTileLayoutSizing,
				setTileLayoutFlexBasis,
				setTileAutoSize,
			}}
		>
			<ResetStyles />
			{children}
		</TomeContext.Provider>
	);
};

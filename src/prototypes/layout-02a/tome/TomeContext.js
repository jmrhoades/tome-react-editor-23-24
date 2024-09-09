import React from "react";

import { makeTestTome, makeRandomTomeData, createTileData } from "./TomeData";
import { useMotionValue } from "framer-motion";

export const TomeContext = React.createContext();
export const TomeProvider = ({ children }) => {
	const exampleTome = makeTestTome();

	const [tomeData, setTomeData] = React.useState(exampleTome);

	const [currentPage, setCurrentPage] = React.useState(exampleTome.pages[0]);

	//const [selection, setSelection] = React.useState([]);
	const selectionMotionValue = useMotionValue("");

	const shuffleData = () => {
		const newTome = makeRandomTomeData();
		setCurrentPage(newTome.pages[0]);
		console.log("shuffleData", newTome);
		setTomeData({ ...newTome });
	};

	const saveState = () => {
		setTomeData({ ...tomeData });
		console.log("Save state / re-render", currentPage.tiles);
	};

	const animateLayout = () => {
		getTiles().forEach(t => (t.animateLayout = true));
	};

	const addTilesToArray = (list, array) => {
		list.forEach(o => {
			array.push(o);
			if (o.tiles && o.tiles.length > 0) {
				addTilesToArray(o.tiles, array);
			}
		});
	};

	const getTiles = () => {
		const tiles = [currentPage.root];
		addTilesToArray(currentPage.root.tiles, tiles);
		return tiles;
	};

	const selectTile = tile => {
		console.log("selectTile", tile);
		selectionMotionValue.set(tile.id);
	};

	const getSelectedTiles = () => {
		const tiles = [];
		selectionMotionValue
			.get()
			.split(",")
			.forEach(id =>
				getTiles().forEach(t => {
					if (t.id === id) tiles.push(t);
				})
			);
		return tiles;
	};

	const addSelectTile = tile => {};

	const deselectTile = tile => {
		selectionMotionValue.set("");
	};

	const deselectTiles = () => {
		selectionMotionValue.set("");
	};

	const findAndDeleteTiles = (tiles, list) => {
		tiles.forEach(t => {
			list.forEach(l => {
				if (l.id === t.id) {
					console.log("match!");
					t.parent.tiles.splice(t.parent.tiles.indexOf(t), 1);
				}
			});
			if (t.tiles && t.tiles.length > 0) {
				findAndDeleteTiles(t.tiles, list);
			}
		});
	};

	const deleteSelection = () => {
		const selection = getSelectedTiles();
		console.log("deleteSelection", selection.length);
		if (selection.length === 0) return false;

		findAndDeleteTiles(currentPage.root.tiles, selection);
		deselectTiles();

		// Re-render
		animateLayout();
		saveState();
	};

	const duplicateTile = tile => {
		const newTile = createTileData();
		newTile.parent = tile.parent;
		newTile.layout = tile.layout;
		newTile.startRect = {
			x: tile.x.get(),
			y: tile.y.get(),
			width: tile.width.get(),
			height: tile.height.get(),
		};
		tile.tiles.forEach(t => {
			const nT = duplicateTile(t);
			newTile.tiles.push(nT);
		});

		return newTile;
	};

	const duplicateSelection = () => {
		const selection = getSelectedTiles();
		const tile = selection[0];

		console.log(tile);
		if (tile.parent === null) {
			console.log("NO PARENT, CANT DUPLICATE");
			return false;
		}

		// Create new tile
		const newTile = duplicateTile(tile);

		// Add new tile to next to selected tile
		tile.parent.tiles.splice(tile.parent.tiles.indexOf(tile) + 1, 0, newTile);

		// Select new tile
		selectTile(newTile);

		// Re-render
		animateLayout();
		saveState();
	};

	const clickAddTile = () => {
		const selection = getSelectedTiles();

		// Create new tile
		const newTile = createTileData();

		if (selection.length === 0) {
			currentPage.root.tiles.push(newTile);
			newTile.parent = currentPage.root;
		} else {
			const tile = selection[0];
			newTile.parent = tile.parent;
			// Add new tile to next to selected tile
			tile.parent.tiles.splice(tile.parent.tiles.indexOf(tile) + 1, 0, newTile);
		}

		// Select new tile
		selectTile(newTile);

		// Re-render
		animateLayout();
		newTile.animateLayout = false;
		saveState();
	};

	const setTileLayout = (tile, newLayout) => {
		tile.layout = newLayout;
		animateLayout();
		saveState();
	};

	return (
		<TomeContext.Provider
			value={{
				tomeData,
				currentPage,
				saveState,

				getTiles,

				selectionMotionValue,
				getSelectedTiles,
				selectTile,
				addSelectTile,
				deselectTile,
				deselectTiles,

				deleteSelection,
				duplicateSelection,
				clickAddTile,

				shuffleData,

				setTileLayout,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};

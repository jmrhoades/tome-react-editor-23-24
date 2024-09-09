import React from "react";
import styled from "styled-components";

import { Flex } from "./Flex";
import { Text } from "./Text";
import { Image } from "./Image";

import { Grid } from "./Grid";
import { Absolute } from "./Absolute";
import { Icon } from "./Icon";
import { TilePosition } from "./TilePosition";

const TileMap = {
	FLEX: Flex,
	GRID: Grid,
	ABSOLUTE: Absolute,
	TEXT: Text,
	IMAGE: Image,
	ICON: Icon,
};

export const EditTiles = ({ tiles }) => {
	return (
		<>
			{tiles.map(tile => (
				<TilePosition key={tile.id} tile={tile}>
					<Tile tile={tile} />
				</TilePosition>
			))}
		</>
	);
};

const Tile = ({ tile }) => {
	const TileComponent = TileMap[tile.type];
	return <TileComponent tile={tile} />;
};

export const TileBox = styled.div`
	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	gap: var(--gap);
	padding: var(--padding);
	border-radius: var(--border-radius);
`;

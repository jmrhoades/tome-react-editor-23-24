import React from "react";
import styled from "styled-components";

import { Page } from "./Page";
import { Flex } from "./Flex";
import { Grid } from "./Grid";
import { Absolute } from "./Absolute";
import { Text } from "./Text";
import { Image } from "./Image";
import { Icon } from "./Icon";

const TileMap = {
	PAGE: Page,
	FLEX: Flex,
	GRID: Grid,
	ABSOLUTE: Absolute,
	TEXT: Text,
	IMAGE: Image,
	ICON: Icon,
};

export const Tile = ({ tile }) => {
	const TileComponent = TileMap[tile.type];
	return <TileComponent tile={tile}>{tile.tiles && tile.tiles.map(t => <Tile key={t.id} tile={t} />)}</TileComponent>;
};

export const TileBox = styled.div`
	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;

	gap: var(--gap);
	padding: var(--padding);
	border-radius: var(--border-radius);
`;

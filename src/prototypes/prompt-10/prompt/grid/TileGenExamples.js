import { content as text01 } from "../../tomes/example-tiles/tulips/text01";
import { content as text02 } from "../../tomes/example-tiles/tulips/text02";
import { content as text03 } from "../../tomes/example-tiles/tulips/text03";
import { content as text04 } from "../../tomes/example-tiles/tulips/text04";
import { content as text05 } from "../../tomes/example-tiles/tulips/text05";

import { content as image01 } from "../../tomes/example-tiles/tulips/image01";
import { content as image02 } from "../../tomes/example-tiles/tulips/image02";
import { content as image03 } from "../../tomes/example-tiles/tulips/image03";
import { content as image04 } from "../../tomes/example-tiles/tulips/image04";
import { content as image05 } from "../../tomes/example-tiles/tulips/image05";
import { content as image06 } from "../../tomes/example-tiles/tulips/image06";
import { content as image07 } from "../../tomes/example-tiles/tulips/image07";
import { content as image08 } from "../../tomes/example-tiles/tulips/image08";

import { content as table01 } from "../../tomes/example-tiles/tulips/table01";
import { content as table02 } from "../../tomes/example-tiles/tulips/table02";
import { content as table03 } from "../../tomes/example-tiles/tulips/table03";
import { content as table04 } from "../../tomes/example-tiles/tulips/table04";

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

export const makeNewTileResult = (id, indexRef, tileTypes) => {
	// Use a fake tome obj
	const tome = {
		id: id,
		loading: false,
		pages: [],
		rows: [],
		tiles: [],
	};
	const page = { id: "page" };
	tome.pages = [page];

	console.log(tileTypes);

	const textOptions = [text01, text02, text03, text04, text05];
	const imageOptions = [image01, image02, image03, image04, image05, image06, image07, image08];
	const tableOptions = [table01, table02, table03, table04];
	const allOptions = [
		text01,
		image01,
		text02,
		table01,
		text03,
		image02,
		image03,
		text04,
		table02,
		image04,
		text05,
		image05,
		table03,
		image06,
		table04,
		image07,
		image08,
	];
	const options = [];

	const hasText = tileTypes.includes("TEXT");
	const hasImage = tileTypes.includes("IMAGES");
	const hasTables = tileTypes.includes("TABLES");

	if (hasTables && hasText && hasImage) {
		options.push(...allOptions);
	} else {
		if (hasText && !hasImage && !hasTables) {
			options.push(...textOptions);
		}

		if (!hasText && hasImage && !hasTables) {
			options.push(...imageOptions);
		}

		if (!hasText && !hasImage && hasTables) {
			options.push(...tableOptions);
		}

		if (hasText && hasImage && !hasTables) {
			options.push(...textOptions);
			options.push(...imageOptions);
			shuffleArray(options);
		}

		if (hasText && !hasImage && hasTables) {
			options.push(...textOptions);
			options.push(...tableOptions);
			shuffleArray(options);
		}

		if (!hasText && hasImage && hasTables) {
			options.push(...imageOptions);
			options.push(...tableOptions);
			shuffleArray(options);
		}
	}

	if (indexRef.current >= options.length) {
		indexRef.current = 0;
	}

	const result = options[indexRef.current](tome, page);

	indexRef.current += 1;
	if (indexRef.current >= options.length) {
		indexRef.current = 0;
	}

	return result;
};

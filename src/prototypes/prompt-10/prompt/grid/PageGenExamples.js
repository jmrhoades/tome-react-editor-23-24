import { content as makePageGenA1 } from "../../tomes/example-pages/bees/beePage1";
import { content as makePageGenA2 } from "../../tomes/example-pages/bees/beePage2";
import { content as makePageGenA3 } from "../../tomes/example-pages/bees/beePage3";
import { content as makePageGenA4 } from "../../tomes/example-pages/bees/beePage4";
import { content as makePageGenA5 } from "../../tomes/example-pages/bees/beePage5";
import { content as makePageGenA6 } from "../../tomes/example-pages/bees/beePage6";
import { content as makePageGenA7 } from "../../tomes/example-pages/bees/beePage7";
import { content as makePageGenA8 } from "../../tomes/example-pages/bees/beePage8";
import { content as makePageGenA9 } from "../../tomes/example-pages/bees/beePage9";
import { content as makePageGenA10 } from "../../tomes/example-pages/bees/beePage10";
import { content as makePageGenA11 } from "../../tomes/example-pages/bees/beePage11";
import { content as makePageGenA12 } from "../../tomes/example-pages/bees/beePage12";
import { content as makePageGenA13 } from "../../tomes/example-pages/bees/beePage13";

export const makeNewPageResult = (id, indexRef) => {
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

	const options = [makePageGenA1, makePageGenA2, makePageGenA3, makePageGenA4, makePageGenA5, makePageGenA11, makePageGenA6, makePageGenA10, makePageGenA7, makePageGenA9, makePageGenA8 , makePageGenA12, makePageGenA13];
	const result = options[indexRef.current](tome, page);
	indexRef.current += 1;
	if (indexRef.current >= options.length) {
		indexRef.current = 0;
	}
	return result;
};

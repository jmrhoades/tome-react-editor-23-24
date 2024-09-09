import { appendTomeToTomes } from "../tome/TomeContext";

//import { makePage as newPage } from "./new/new";

import { makePage as drawing01 } from "./drawing/01";

import { makePage as page1Type } from "./typescale/page1";
import { makePage as page2Type } from "./typescale/page2";
import { makePage as page3Type } from "./typescale/page3";
import { makePage as page4Type } from "./typescale/page4";
import { makePage as page5Type } from "./typescale/page5";
import { makePage as page6Type } from "./typescale/page6";
import { makePage as page7Type } from "./typescale/page7";
import { makePage as page8Type } from "./typescale/page8";
import { makePage as page9Type } from "./typescale/page9";
import { makePage as page10Type } from "./typescale/page10";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = appendTomeToTomes(tomes, "drawing01", "Drawing 01");
	drawing01(tome);

	// Typescale
	tome = appendTomeToTomes(tomes, "typescale", "Typescale");
	page1Type(tome);
	page2Type(tome);
	page3Type(tome);
	page4Type(tome);
	page5Type(tome);
	page6Type(tome);
	page7Type(tome);
	page8Type(tome);
	page9Type(tome);
	page10Type(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};

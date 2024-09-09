import { appendTomeToTomes } from "../tome/TomeContext";

//import { makePage as newPage } from "./new/new";

import { makePage as drawing00 } from "./drawing/00";
import { makePage as drawing01 } from "./drawing/01";
import { makePage as drawing02 } from "./drawing/02";
import { makePage as drawing03 } from "./drawing/03";

import { makePage as proposal01 } from "./proposal/01";
import { makePage as proposal02 } from "./proposal/02";
import { makePage as proposal03 } from "./proposal/03";
import { makePage as proposal04 } from "./proposal/04";
import { makePage as proposal05 } from "./proposal/05";
import { makePage as proposal06 } from "./proposal/06";

import { makePage as infographics01 } from "./infographics/01";


export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = appendTomeToTomes(tomes, "drawing02", "Drawing 02");
	drawing00(tome);
	drawing01(tome);
	drawing02(tome);
	drawing03(tome);

	// New Tome
	tome = appendTomeToTomes(tomes, "proposal", "New product proposal");
	proposal01(tome);
	proposal02(tome);
	proposal03(tome);
	proposal04(tome);
	proposal05(tome);
	proposal06(tome);

	// New Tome
	tome = appendTomeToTomes(tomes, "infographics", "Infographics");
	infographics01(tome);
	
	// Return data
	// console.log(tomes);
	return tomes;
};

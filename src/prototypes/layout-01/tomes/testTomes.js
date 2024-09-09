import { appendTomeToTomes } from "../tome/TomeContext";
import { createTomeData } from "../tome/TomeData";

import { makePage as newPage } from "./new/new";
import { makePage as longPage01 } from "./new/long-page-01";
import { makePage as topRightLogo } from "./new/top-right-logo";
import { makePage as topRightLogoAbsolute } from "./new/top-right-logo-absolute";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = createTomeData("layout01", "Untitled tome");
	tomes.push(tome);
	newPage(tome);

	//topRightLogo(tome);
	//topRightLogoAbsolute(tome);
	//longPage01(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};

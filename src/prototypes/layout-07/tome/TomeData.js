import { Themes } from "./Themes";
import { TextStyles } from "../tiles/Text";
import { makeTomeData, makePageData, makeFlexData, makeTextData, makeImageData, makeIconData } from "./TileData";

import { makePage as alignmentTest01 } from "./test-pages/alignment-test-01";

import { makePage as newPage } from "./test-pages/new-page";
import { makePage as layoutV3WIP01 } from "./test-pages/layout-v3-wip-interactions-01";
import { makePage as tallImage } from "./test-pages/page-scale-one-tall-image";
import { makePage as resize01FilledImages } from "./test-pages/resize-01-filled-images";
import { makePage as iconList01 } from "./test-pages/icon-list-01";

import { makePage as stych01 } from "./test-pages/stych-01";
import { makePage as stych02 } from "./test-pages/stych-02";
import { makePage as stych03 } from "./test-pages/stych-03";
import { makePage as stych04 } from "./test-pages/stych-04";
import { makePage as stych05 } from "./test-pages/stych-05";

import { makePage as ramp01 } from "./test-pages/ramp-01";
import { makePage as ramp02 } from "./test-pages/ramp-02";
import { makePage as ramp03 } from "./test-pages/ramp-03";
import { makePage as ramp04 } from "./test-pages/ramp-04";

import { makePage as daversaLogoWall1 } from "./test-pages/daversa-logo-wall-01";
import { makePage as daversaIntake1 } from "./test-pages/daversa-intake-01";
import { makePage as daversaAboutUs1 } from "./test-pages/daversa-about-us-01";

import { makePage as bnOpportunities } from "./test-pages/bn-opportunities";

import { makePage as tmsCore01 } from "./test-pages/tms-core-01";
import { makePage as tmsCore02 } from "./test-pages/tms-core-02";

import { makePage as tmsCaseStudy01 } from "./test-pages/tms-case-study-01";

export const makeTestTome = () => {
	let tome = null;
	let page = null;

	tome = makeTomeData("Layout v3 Demos");
	
	page = tmsCaseStudy01(tome);
	
	page = tmsCore01(tome);
	page = tmsCore02(tome);

	page = bnOpportunities(tome);

	page = daversaAboutUs1(tome);
	page = daversaIntake1(tome);
	page = daversaLogoWall1(tome);

	page = stych01(tome);
	page = stych02(tome);
	page = stych03(tome);
	page = stych04(tome);
	page = stych05(tome);

	page = ramp01(tome);
	page = ramp02(tome);
	page = ramp03(tome);
	page = ramp04(tome);

	/*

	page = alignmentTest01(tome);
	page = logoWall1(tome);
	
	page = layoutV3WIP01(tome);
	page = iconList01(tome);
	page = tallImage(tome);
	page = resize01FilledImages(tome);
	
	*/

	console.log("TEST TOME DATA: ", tome);
	return tome;
};

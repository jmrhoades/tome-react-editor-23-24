import { Themes } from "../ds/Themes";
import { TextStyles } from "../tiles/Text";
import { makeTomeData, makePageData, makeFlexData, makeTextData, makeImageData, makeIconData } from "./TileData";

import { makePage as newPage } from "./test-pages/new-page";
import { makePage as layoutV3WIP01 } from "./test-pages/layout-v3-wip-interactions-01";
import { makePage as tallImage } from "./test-pages/page-scale-one-tall-image";
import { makePage as resize01FilledImages } from "./test-pages/resize-01-filled-images";
import { makePage as iconList01 } from "./test-pages/icon-list-01";
import { makePage as stych01 } from "./test-pages/stych-01";
import { makePage as stych02 } from "./test-pages/stych-02";
import { makePage as stych03 } from "./test-pages/stych-03";
import { makePage as ramp01 } from "./test-pages/ramp-01";
import { makePage as ramp02 } from "./test-pages/ramp-02";
import { makePage as ramp03 } from "./test-pages/ramp-03";
import { makePage as ramp04 } from "./test-pages/ramp-04";

export const makeTestTome = () => {
	let tome = null;
	let page = null;

	tome = makeTomeData("Layout v3 Demos");

	
	page = layoutV3WIP01(tome);
	page = newPage(tome);
	page = tallImage(tome);
	page = iconList01(tome);
	page = resize01FilledImages(tome);
	page = stych01(tome);
	page = stych02(tome);
	page = stych03(tome);
	page = ramp01(tome);
	page = ramp02(tome);
	page = ramp03(tome);
	page = ramp04(tome);

	console.log("TEST TOME DATA: ", tome);
	return tome;
};

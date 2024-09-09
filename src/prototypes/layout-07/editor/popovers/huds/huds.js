import { PageHud } from "./PageHud";
import { FlexHud } from "./FlexHud";
import { TextHud } from "./TextHud";
import { ImageHud } from "./ImageHud";


export const huds = {
	PAGE: {
		type: "page",
		id: "page_hud",
		content: PageHud,
	},
	FLEX: {
		type: "flex",
		id: "flex_hud",
		content: FlexHud,
	},
    TEXT: {
		type: "text",
		id: "text_hud",
		content: TextHud,
	},
    IMAGE: {
		type: "image",
		id: "image_hud",
		content: ImageHud,
	},
	// MULTISELECTION: {
	// 	type: "multiselection",
	// 	id: "multiselection_hud",
	// 	content: MultiSelectionHud,
	// },
};

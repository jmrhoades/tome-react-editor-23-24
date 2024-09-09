import { FlexHud } from "./FlexHud";
import { TextHud } from "./TextHud";
import { ImageHud } from "./ImageHud";
import { IconHud } from "./IconHud";

export const Huds = {
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
	ICON: {
		type: "icon",
		id: "icon_hud",
		content: IconHud,
	},
};

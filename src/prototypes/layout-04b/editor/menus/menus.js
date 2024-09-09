import { AspectRatioMenu } from "./AspectRatioMenu";
import { LayoutTypesMenu } from "./LayoutTypesMenu";
import { EditorDebugMenu } from "./EditorDebugMenu";
import { AlignContentOptions } from "./AlignContentOptions";
import { JustifyContentOptions } from "./JustifyContentOptions";
import { ContentDirectionMenu } from "./ContentDirectionMenu";
import { ContentWidthMenu } from "./ContentWidthMenu";
import { ContentHeightMenu } from "./ContentHeightMenu";

export const Menus = {
	ASPECT_RATIOS: {
		type: "aspect_ratios",
		id: "aspect_ratios",
		content: AspectRatioMenu,
	},
    EDITOR_DEBUG: {
		type: "editor_debug",
		id: "editor_debug",
		content: EditorDebugMenu,
	},
    LAYOUT_TYPES: {
		type: "layout_types",
		id: "layout_types",
		content: LayoutTypesMenu,
	},
	CONTENT_DIRECTION: {
		type: "content_direction",
		id: "content_direction",
		content: ContentDirectionMenu,
	},
	ALIGN_CONTENT_OPTIONS: {
		type: "align_content_options",
		id: "align_content_options",
		content: AlignContentOptions,
	},
	JUSTIFY_CONTENT_OPTIONS: {
		type: "justify_content_options",
		id: "justify_content_options",
		content: JustifyContentOptions,
	},
	CONTENT_WIDTH: {
		type: "content_width",
		id: "content_width",
		content: ContentWidthMenu,
	},
	CONTENT_HEIGHT: {
		type: "content_height",
		id: "content_height",
		content: ContentHeightMenu,
	},
};



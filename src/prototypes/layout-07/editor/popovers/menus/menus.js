import { AspectRatioMenu } from "./AspectRatioMenu";
import { LayoutTypesMenu } from "./LayoutTypesMenu";
import { EditorDebugMenu } from "./EditorDebugMenu";
import { AlignContentOptions } from "./AlignContentOptions";

import { ContentDirectionMenu } from "./ContentDirectionMenu";
import { ContentWidthMenu } from "./ContentSizeMenu";
import { ContentHeightMenu } from "./ContentSizeMenu";
import { ColorPresetsMenu } from "./ColorPresetsMenu";
import { BackgroundMenu } from "./BackgroundMenu";

import {TileContextMenu} from "./TileContextMenu";
import { Anchor } from "../PopoverContext";
import { ViewportContextMenu } from "./ViewportContextMenu";
import { TomeSettingsMenu } from "./TomeSettingsMenu";
import { PageBackgroundMenu } from "./PageBackgroundMenu";
import { ThemesMenu } from "./ThemesMenu";

const defaultWidth = 200;

export const menus = {
	ASPECT_RATIOS: {
		type: "aspect_ratios",
		id: "aspect_ratios",
		content: AspectRatioMenu,
		width: defaultWidth,
	},
    EDITOR_DEBUG: {
		type: "editor_debug",
		id: "editor_debug",
		content: EditorDebugMenu,
		width: defaultWidth,
	},
    LAYOUT_TYPES: {
		type: "layout_types",
		id: "layout_types",
		content: LayoutTypesMenu,
		width: defaultWidth,
	},
	CONTENT_DIRECTION: {
		type: "content_direction",
		id: "content_direction",
		content: ContentDirectionMenu,
		width: defaultWidth,
	},
	ALIGN_CONTENT_OPTIONS: {
		type: "align_content_options",
		id: "align_content_options",
		content: AlignContentOptions,
		width: defaultWidth,
	},
	CONTENT_WIDTH: {
		type: "content_width",
		id: "content_width",
		content: ContentWidthMenu,
		width: defaultWidth,
	},
	CONTENT_HEIGHT: {
		type: "content_height",
		id: "content_height",
		content: ContentHeightMenu,
		width: defaultWidth,
	},
	COLOR_PRESETS: {
		type: "color_presets",
		id: "color_presets",
		content: ColorPresetsMenu,
		width: defaultWidth,
	},
	BACKGROUND: {
		type: "background_types",
		id: "background_types",
		content: BackgroundMenu,
		width: 136,
	},
	TILE_CONTEXT: {
		type: "tile_context",
		id: "tile_context",
		content: TileContextMenu,
		anchor: Anchor.pointer,
		width: defaultWidth,
	},
	TOME_SETTINGS: {
		type: "tome_settings",
		id: "tome_settings",
		content: TomeSettingsMenu,
		width: defaultWidth,
	},
	VIEWPORT_CONTEXT: {
		type: "viewport_context",
		id: "viewport_context",
		content: ViewportContextMenu,
		anchor: Anchor.pointer,
		width: defaultWidth,
	},
	PAGE_BACKGROUND: {
		type: "page_background",
		id: "page_background",
		content: PageBackgroundMenu,
		anchor: Anchor.pointer,
		width: defaultWidth,
	},
	THEMES: {
		type: "themes_menu",
		id: "themes_menu",
		content: ThemesMenu,
		//anchor: Anchor.pointer,
		width: 216,
	}
	
};



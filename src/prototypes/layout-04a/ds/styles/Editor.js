import { createGlobalStyle } from "styled-components";

export const EditorStyles = createGlobalStyle`

    html,
    body,
    #root {
        /* needed for vertical centering */
        height: 100%; 
        
        /* sometimes needed to prevent text selection during drag interactions */
        /* user-select: none; */
        /* -webkit-user-select: none; */
    }

    :root {
        --ui-family: "InterVariable";

        --tome-brand-accent: rgba(237, 0, 235, 1);
        --tome-brand-accent-hover: rgba(255, 51, 253, 1);
        --tome-brand-accent-90: rgba(237, 0, 235, 0.9);
        --tome-brand-accent-60: rgba(237, 0, 235, 0.6);
        --tome-brand-accent-50: rgba(237, 0, 235, 0.5);
        --tome-brand-accent-40: rgba(237, 0, 235, 0.4);
        --tome-brand-accent-35: rgba(237, 0, 235, 0.35);
        --tome-brand-accent-20: rgba(237, 0, 235, 0.2);
        --tome-brand-accent-10: rgba(237, 0, 235, 0.1);
        --tome-brand-accent-35-brightness: rgba(89, 36, 88, 1);
        --tome-brand-accent-30-brightness: rgba(77, 31, 76, 1);
        --tome-brand-accent-25-brightness: rgba(64, 25, 63, 1);
        --tome-brand-accent-20-brightness: rgba(51, 20, 50, 1);

        --editor-hover-transition: all 0.2s ease-out;

        --button-icon-size: 20px;
        --button-padding: 4px;
        --button-border-radius: 6px;
        --button-border-radius-unitless: 6;

        --field-line-height: 20px;
        --field-padding-y: 4px;
        --field-padding-x: 6px;
        --field-border-radius: 6px;
        
        --field-min-width: 24px;
        --field-label-min-width: 20px;
        --label-field-gap: 6px;
    
        --label-small-font-size: 11px;
        --label-small-line-height: 14px;
        
        --panel-border-radius: 12px;
        --panel-content-padding-x: 12px;
        --panel-content-padding-y: 12px;        
        --panel-layout-gap: 12px;
        --panel-content-gap: 8px;

        --menu-border-radius: 6px;
        --menu-padding: 6px;
        --menu-item-padding: 6px;
        --menu-item-gap: 6px;
        --menu-item-padding-right: 4px;

        --hud-border-radius: 6px;
        --hud-padding: 1px;
        --hud-gap: 0px;
        --hud-button-border-radius: 4px;
        --hud-button-padding-x: 5px;
        --hud-button-padding-y: 5px;
        --hud-button-inset: 2px;
        
        --prompt-width: 540px;
        --prompt-height: 42px;
        --prompt-border-radius: 8px;
        --prompt-padding: 12px;

        --accent-10: rgba(237, 0, 235, 0.1);
        --accent-40: rgba(237, 0, 235, 0.4);

        --yellow-20: rgba(255, 229, 0, 0.2);
        --yellow-25: rgba(255, 229, 0, 0.25);
        --cyan-20: rgba(117, 251, 220, 0.2);
        --red-20: rgba(255, 68, 59, 0.2);
     
        --editor-debug-drop-zone-color-main-axis-start: rgba(255, 255, 255, 0);
        --editor-debug-drop-zone-color-main-axis-end: rgba(255, 255, 255, 0);
        --editor-debug-drop-zone-color-cross-axis-start: rgba(255, 255, 255, 0);
        --editor-debug-drop-zone-color-cross-axis-end: rgba(255, 255, 255, 0);
        --editor-debug-drop-zone-color-reorder: rgba(255, 255, 255, 0);

        --red: #F44737;
        --yellow: #FDDA4D;
        --mint: #A3CEB2;
        --blue: #339DFF;
        --purple: #A77EFF;
        --sand: #C6864B;


        --media-background-color: hsla(0, 0%, 15%, 0.8);
		--media-shadow: 0px 0px 0px 1px hsla(0,0%,100%,0.04) inset, 0px 2px 4px 0px hsla(0,0%,0%,0.08);
		--media-backdrop-filter: saturate(180%) blur(20px);
    }

    body {
        font-family: var(--ui-family);
        font-size: 13px;
        line-height: 16px;
        font-style: normal;
        font-weight: 400;
        color: var(--t7);

        overflow-x: clip;
        
        overscroll-behavior: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 13px;
        font-weight: 600;
        line-height: 20px;
        color: var(--t9);
    }
    
    button {    
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--button-border-radius);
        padding: var(--button-padding);
    }

    input[type=text] {
        caret-color: var(--accent);
        border-radius: var(--field-border-radius);
        padding-left: var(--field-padding-x);
        padding-right: var(--field-padding-x);
        padding-top: var(--field-padding-y);
        padding-bottom: var(--field-padding-y);
        min-width: var(--field-min-width);
        line-height: var(--field-line-height);
    }

    button {
        cursor: pointer;
    }

    label {
        /* cursor: pointer; */
    }

    .grabbing {
        cursor: grabbing !important;
    }
    
    .ew-resize {
        cursor: ew-resize !important;
    }

    .ns-resize {
        cursor: ns-resize !important;
    }

    body,
    #root {
        /* transform-style: preserve-3d; */
    }

`;

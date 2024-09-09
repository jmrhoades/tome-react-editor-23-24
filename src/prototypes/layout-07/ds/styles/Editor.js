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
        --ui-font-size: 13px;
        --ui-line-height: 20px;

        --ui-font-size-small: 11px;
        --ui-line-height-small: 16px;

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

        --editor-hover-transition: all 0.0s ease-out;

        --button-icon-size: 20px;
        --button-padding: 4px;
        --button-border-radius: 6px;
        --button-border-radius-unitless: 6;

        --field-line-height: 20px;
        --field-padding-y: 4px;
        --field-padding-x: 8px;
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
        --panel-section-gap: 12px;
        --panel-content-gap: 6px;
        --panel-group-gap: 8px;

        --menu-border-radius: 6px;
        --menu-padding: 6px;
        --menu-item-padding-vertical: 6px;
        --menu-item-padding-horizontal: 8px;
        --menu-item-gap: 6px;
        --menu-item-padding-right: 4px;
        --menu-button-leading-gap: 8px;

        --hud-border-radius: 6px;
        --hud-padding: 1px;
        --hud-gap: 0px;
        --hud-button-border-radius: 4px;
        --hud-button-padding-x: 5px;
        --hud-button-padding-y: 5px;
        --hud-button-inset: 2px;
        
        --skateboard-width: 160px;
        --skateboard-height: 36px;
        --skateboard-border-radius: 10px;
        --skateboard-padding: 10px;

        --core-yellow: rgba(255, 229, 0, 1.0);
        --core-yellow-50: rgba(255, 229, 0, 0.5);

        --core-cyan: rgba(117, 251, 220, 1.0);
        --core-cyan-50: rgba(117, 251, 220, 0.5);

        --core-red: rgba(255, 68, 59, 1.0);
        --core-red-50: rgba(255, 68, 59, 0.5);

        --accent-10: rgba(237, 0, 235, 0.1);
        --accent-20: rgba(237, 0, 235, 0.2);
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

        --editor-debug-resize-hitarea-side: rgba(255, 0, 255, 0.33);
        --editor-debug-resize-hitarea-corner: rgba(255, 255, 0, 0.33);

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

    /* html {
        
    } */

    body {
        font-family: var(--ui-family);
        font-size: 16px;
        line-height: 1;
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

    input {
        caret-color: var(--accent);
        border-radius: var(--field-border-radius);
        padding-left: var(--field-padding-x);
        padding-right: var(--field-padding-x);
        padding-top: var(--field-padding-y);
        padding-bottom: var(--field-padding-y);
        line-height: var(--field-line-height);
        background: var(--t2);
        width: 100%;
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

    .nesw-resize {
        cursor: nesw-resize !important;
    }

    .nwse-resize {
        cursor: nwse-resize !important;
    }

    body,
    #root {
        /* transform-style: preserve-3d; */
    }

    #root .react-colorful {
        width: auto;
        height: auto;
    }

    #root .react-colorful__saturation {
        height: 112px;
        margin-bottom: 8px;
        border-radius: 6px;
        border-bottom: none;
    }

    #root .react-colorful__alpha-gradient, 
    #root .react-colorful__saturation {
        box-shadow: none;
    }

    #root .react-colorful__alpha,  #root .react-colorful__hue {
        height: 8px;
        margin-bottom: 4px;
        border-radius: 4px;
    }

    #root .react-colorful__saturation-pointer,
    #root .react-colorful__hue-pointer,
    #root .react-colorful__alpha-pointer {
        width: 14px;
        height: 14px;
        border-width: 3px;
        box-shadow: 0 0.5px 1.5px 0 rgba(0,0,0,.25);
        z-index: unset;
    }

 

    .hexInputFieldWrap {
        position: relative;
    }

    /* .hexInputFieldWrap:after {
        content: "#";
        display: block;
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY(-50%);
        font-size: 12px;
        color: var(--t6);
    } */

    .hexInputField {
        text-transform: uppercase;
        width: 100%;
        /* padding-left: 19px; */
        color: var(--t7);
    }

    .hexInputField.disabled {
        color: var(--t6);
    }
    
    .hexInputField:focus {
		color: var(--t9);
		background-color: var(--t3);
	}

	.hexInputField::selection {
		color: white;
		background-color: var(--tome-brand-accent);
	}

`;

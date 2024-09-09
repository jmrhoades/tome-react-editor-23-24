import { createGlobalStyle } from "styled-components";
export const DarkModeStyles = createGlobalStyle`   
:root {
    --t0: rgba(255, 255, 255, 0.00);
    --t1: rgba(255, 255, 255, 0.04);
    --t2: rgba(255, 255, 255, 0.08);
    --t3: rgba(255, 255, 255, 0.12);
    --t4: rgba(255, 255, 255, 0.16);
    --t5: rgba(255, 255, 255, 0.20);
    --t6: rgba(255, 255, 255, 0.30);
    --t7: rgba(255, 255, 255, 0.50);
    --t8: rgba(255, 255, 255, 0.70);
    --t9: rgba(255, 255, 255, 1.00);

    --z0: #0A0A0A;
    --z1: #141414;
    --z2: #1F1F1F;
    --z3: #292929;
    --z4: #333333;
    --z5: #3D3D3D;
    --z6: #A6A6A6;

    --white: rgba(255, 255, 255, 1.00);

    --prompt: rgba(31, 31, 31, 0.95);
    
    --accent: var(--tome-brand-accent);
    
    --text-selection-background-color: var(--accent);
	--text-selection-color: var(--white);

    --stroke-and-shadow: 0px 0px 0px 1px hsla(0, 0%, 100%, 0.06) inset, 0px 6px 16px hsla(0, 0%, 0%, 0.24);
    --stroke-no-shadow: 0px 0px 0px 1px hsla(0, 0%, 100%, 0.06) inset;

    --panel-shadow: var(--stroke-and-shadow);
    --panel-background-color: var(--z1);
    --panel-higher-z-background-color: var(--z2);
    
    --menu-shadow: 0px 8px 24px hsla(0, 0%, 0%, 0.25);
    --menu-background-color: var(--z3);

    --menu-item-color: var(--t9);
    --menu-item-color-hover: var(--white);
    --menu-item-color-disabled: var(--t6);
    --menu-item-background-color-hover: var(--t3);
    
    --hud-background-color: var(--z2);

    --promptbar-background-color: hsla(0, 0%, 10%, 1.0);
    --promptbar-background-hover-color: hsla(0, 0%, 15%, 0.8);
    --promptbar-stroke-and-shadow: 0px 0px 0px 1px hsla(0,0%,100%,0.04) inset, 0px 6px 16px 0px hsla(0,0%,0%,0.24);
    --promptbar-static-cursor: var(--t7);
    --promptbar-hint: var(--t6);

    --shadow-small: 0px 4px 12px rgba(0, 0, 0, 0.25);
    --shadow-medium: 0px 6px 16px rgba(0, 0, 0, 0.25);
    --shadow-large: 0px 8px 24px rgba(0, 0, 0, 0.25);

    --resize-handle-shadow: drop-shadow(0 0 1px rgb(0 0 0 / 0.2));
    --resize-handle-inner-color: #888888;
    
    --selection-parent-color: var(--z5);
    --show-bounds-border-color: var(--z5);

    --ui-button-background-default: var(--t2);
    --ui-button-background-hover: var(--t3);
    --ui-button-background-active: var(--t5);

    --badge-background-active-color: var(--t6);
	--badge-active-color: var(--t9);

    --dragging-node-placeholder-background: rgba(255, 255, 255, 0.06);

    --segmented-component-stroke:  0px 0px 0px 1px hsla(0, 0%, 100%, 0.0) inset;
    --segmented-component-background:  var(--t2);
    --segmented-component-separator-color: var(--t2);			

    --segmented-background-default: var(--t0);
    --segmented-background-hover: var(--t3);
    --segmented-background-active: var(--ui-button-background-active);
    
    --page-shadow: 0px 0px 1px 0px hsla(0, 0%, 100%, 0.2), 0px 0px 50px 0px hsla(0, 0%, 100%, 0.02);
}
`;

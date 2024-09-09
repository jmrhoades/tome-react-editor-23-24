import { createGlobalStyle } from "styled-components";
export const LightModeStyles = createGlobalStyle`   
:root {
    --t0: rgba(0, 0, 0, 0.00);
    --t1: rgba(0, 0, 0, 0.04);
    --t2: rgba(0, 0, 0, 0.06);
    --t3: rgba(0, 0, 0, 0.08);
    --t4: rgba(0, 0, 0, 0.12);
    --t5: rgba(0, 0, 0, 0.16);
    --t6: rgba(0, 0, 0, 0.25);
    --t7: rgba(0, 0, 0, 0.50);
    --t8: rgba(0, 0, 0, 0.70);
    --t9: rgba(0, 0, 0, 0.85);

    --z0: #FFFFFF;
    --z1: #F5F5F5;
    --z2: #EBEBEB;
    --z3: #DBDBDB;
    --z4: #A3A3A3;
    --z5: #666666;
    --z6: #292929;

    --white: rgba(255, 255, 255, 1.00);
    
    --prompt: rgba(255, 255, 255, 0.80);

    --accent: var(--tome-brand-accent);

    --text-selection-background-color: var(--accent);
	--text-selection-color: var(--white);

    --stroke-and-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 0, 0, 0.02);
    --stroke-no-shadow: 0px 0px 0px 1px var(--t2);

    --panel-shadow: var(--stroke-and-shadow);
    --panel-background-color: var(--z0);
    --panel-higher-z-background-color: var(--z0);
    
    --menu-shadow: var(--stroke-and-shadow);
    --menu-background-color: var(--z0);
    
    --menu-item-color: var(--t9);
    --menu-item-color-hover: var(--t9);
    --menu-item-color-disabled: var(--t6);
    --menu-item-background-color-hover: var(--t3);
    
    --hud-background-color: var(--z0);

    --promptbar-background-color: hsla(0, 0%, 100%, 0.8);
    --promptbar-background-hover-color: hsla(0, 0%, 100%, 0.9);
    --promptbar-stroke-and-shadow: 0px 0px 0px 1px hsla(0,0%,0%,0.06),0px 2px 6px 0px hsla(0,0%,0%,0.06);
    --promptbar-static-cursor: rgba(0,0,0,0.4);
    --promptbar-hint: var(--t6);

    --shadow-small: 0px 4px 12px  rgba(0, 0, 0, 0.06);
    --shadow-medium: 0px 6px 16px rgba(0, 0, 0, 0.06);
    --shadow-large: 0px 8px 24px  rgba(0, 0, 0, 0.06);

    --resize-handle-shadow: drop-shadow(0 0 1px rgb(0 0 0 / 0.16));
    --resize-handle-inner-color: #FFFFFF;

    --selection-parent-color: var(--z4);
    --show-bounds-border-color: var(--z4);

    --ui-button-background-default: var(--t2);
    --ui-button-background-hover: var(--t3);
    --ui-button-background-active: var(--t4);

    --badge-background-active-color: var(--z0);
	--badge-active-color: var(--t8);

    --dragging-node-placeholder-background: rgba(0, 0, 0, 0.06);

    --segmented-component-stroke:  0px 0px 0px 1px hsla(0, 0%, 0%, 0.08);
    --segmented-component-background:  var(--t2);
    --segmented-component-separator-color: var(--t3);

    --segmented-background-default: var(--t0);
    --segmented-background-hover: var(--t3);
    --segmented-background-active: var(--z0);

    --page-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.2), 0px 0px 40px 0px hsla(0, 0%, 0%, 0.02);
    
}
`;

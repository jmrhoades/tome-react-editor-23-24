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

    --z0: rgba(0, 0, 0, 1);
    --z1: rgba(20, 20, 20, 1);
    --z2: rgba(31, 31, 31, 1);
    --z3: rgba(41, 41, 41, 1);
    --z4: rgba(51, 51, 51, 1);
    --z5: rgba(61, 61, 61, 1);
    --z6: rgba(rgba(166, 166, 166, 1));

    --white: rgba(255, 255, 255, 1.00);

    --prompt: rgba(31, 31, 31, 0.95);
    
    --accent: var(--tome-brand-accent);
    

    --text-selection-background-color: var(--accent);
	--text-selection-color: var(--white);

    --stroke-and-shadow: 0px 0px 0px 1px hsla(0, 0%, 100%, 0.06) inset, 0px 6px 16px hsla(0, 0%, 0%, 0.25);

    --panel-shadow: var(--stroke-and-shadow);
    --panel-background-color: var(--z1);

    
    --menu-shadow: 0px 8px 24px hsla(0, 0%, 0%, 0.25);
    --menu-background-color: var(--z3);
    --menu-item-color: var(--t9);
    --menu-item-color-hover: var(--white);

    --hud-background-color: var(--z2);

    --promptbar-background-color: hsla(0, 0%, 10%, 1.0);
    --promptbar-background-hover-color: hsla(0, 0%, 15%, 0.8);
    --promptbar-stroke-and-shadow: 0px 0px 0px 1px hsla(0,0%,100%,0.04) inset, 0px 4px 8px 0px hsla(0,0%,0%,0.2);
    --promptbar-static-cursor: var(--t7);
    --promptbar-hint: var(--t6);

    --shadow-small: 0px 4px 12px rgba(0, 0, 0, 0.25);
    --shadow-medium: 0px 6px 16px rgba(0, 0, 0, 0.25);
    --shadow-large: 0px 8px 24px rgba(0, 0, 0, 0.25);

    --dragging-background-color: hsla(0, 0%, 8%, 0.8);
}
`;

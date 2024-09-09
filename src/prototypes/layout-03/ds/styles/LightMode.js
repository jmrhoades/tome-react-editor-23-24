import { createGlobalStyle } from "styled-components";
export const LightModeStyles = createGlobalStyle`   
:root {
    --t0: rgba(0, 0, 0, 0.00);
    --t1: rgba(0, 0, 0, 0.04);
    --t2: rgba(0, 0, 0, 0.06);
    --t3: rgba(0, 0, 0, 0.08);
    --t4: rgba(0, 0, 0, 0.12);
    --t5: rgba(0, 0, 0, 0.16);
    --t6: rgba(0, 0, 0, 0.30);
    --t7: rgba(0, 0, 0, 0.50);
    --t8: rgba(0, 0, 0, 0.70);
    --t9: rgba(0, 0, 0, 0.85);

    --z0: rgba(255, 255, 255, 1);
    --z1: rgba(245, 245, 245, 1);
    --z2: rgba(235, 235, 235, 1);
    --z3: rgba(219, 219, 219, 1);
    --z4: rgba(163, 163, 163, 1);
    --z5: rgba(102, 102, 102, 1);
    --z6: rgba(41, 41, 41, 1);

    --white: rgba(255, 255, 255, 1.00);
    
    --prompt: rgba(255, 255, 255, 0.80);

    --accent: var(--tome-brand-accent);

    --text-selection-background-color: var(--accent);
	--text-selection-color: var(--white);

    --stroke-and-shadow: 0px 0px 0px 1px hsla(0, 0%, 0%, 0.04), 0px 4px 12px hsla(0, 0%, 0%, 0.04);

    --panel-shadow: var(--stroke-and-shadow);
    --panel-background-color: var(--z0);
    
    
    --menu-shadow: var(--stroke-and-shadow);
    --menu-background-color: var(--z0);
    --menu-item-color: var(--t9);
    --menu-item-color-hover: var(--white);
    
    --hud-background-color: var(--z0);

    --promptbar-background-color: hsla(0, 0%, 100%, 0.8);
    --promptbar-stroke-and-shadow: 0px 0px 0px 1px hsla(0,0%,0%,0.06),0px 2px 6px 0px hsla(0,0%,0%,0.06);
    --promptbar-static-cursor: rgba(0,0,0,0.4);
    --promptbar-hint: var(--t6);
}
`;

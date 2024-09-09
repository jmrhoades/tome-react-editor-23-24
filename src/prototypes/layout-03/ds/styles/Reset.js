import { createGlobalStyle } from "styled-components";

export const ResetStyles = createGlobalStyle`
    
    /* Box sizing rules */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Prevent font size inflation */
    html {
        -moz-text-size-adjust: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
    }


    html,
    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    li,
    label {
	    margin: 0;
	    padding: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    li,
    div,
    span,
    label,
    button,
    input {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    /* Balance text wrapping on headings */
    h1, h2, h3, h4 {
        text-wrap: balance;
    }
    
    
    input,
    button {
        border: none;
        outline: none;
        background: none;
        width: auto;
        color: inherit;
        -webkit-appearance: none;
    }
    
    input:focus,
    button:focus {
        outline: none;
    }
    
    [contenteditable] {
        outline: none;
    }

    /* Make media easier to work with */
    img, video, picture {
        max-width: 100%;
        display: block;
    }

    body,
    #root {
        /* needed for vertical centering */
        min-height: 100vh;
        
        /* sometimes needed to prevent horizontal scrolling */
        /* overflow-x: clip; */
        
        /* sometimes needed to prevent text selection during drag interactions */
        user-select: none;
        -webkit-user-select: none;
    }

    body {
        background-color: var(--page-background-color);
    }

`;

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
/* ol,
ul,
li, */
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
button,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	
}
article,
aside,
details,
figcaption,
footer,
header,
hgroup,
menu,
nav,
section {
	display: block;
}
figure {
	display: inline-block;
}
* {
	box-sizing: border-box;
}
body {
	line-height: 1.5;
}
blockquote,
q {
	quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
	content: "";
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input {
	line-height: normal;
	margin: 0;
	border: 0;
	padding: 0;
	display: inline-block;
	vertical-align: middle;
	white-space: normal;
	background: none;
	line-height: 1;
	border-radius: 6px;
}
input:focus
{
	outline:0;
}
[contenteditable] {
	outline: 0px solid transparent;
}
button {
	border: none;
	margin: 0;
	padding: 0;
	width: auto;
	overflow: visible;
	background: transparent;
	color: inherit;
	font: inherit;
	line-height: normal;
	-webkit-font-smoothing: inherit;
	-moz-osx-font-smoothing: inherit;
	-webkit-appearance: none;
}


html,
body,
#root {
    margin: 0;
    padding: 0;
    height: 100%;
    background: transparent;
}

* {
    user-select: none;
}

body {
    font-family: InterVariable, sans-serif;
    font-size: 13px;
    line-height: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: default;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li {
    font-weight: normal;
    margin: 0;
    padding: 0;
}


.frame {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
}


.nocursor {
    cursor: none;
    * {
    cursor: none !important;
    }
}

.no-cursor {
    cursor: none;
    * {
    cursor: none !important;
    }
}

.grab {
    cursor: grab;
    * {
    cursor: grab !important;
    }
}

.point {
    cursor: pointer;
    * {
    cursor: pointer !important;
    }
}

.grabbing {
    cursor: grabbing;
    * {
    cursor: grabbing !important;
    }
}

.ns-cursor {
    cursor: ns-resize;
    * {
    cursor: ns-resize !important;
    }
}

.ew-cursor {
    cursor: ew-resize;
    * {
    cursor: ew-resize !important;
    }
}


`


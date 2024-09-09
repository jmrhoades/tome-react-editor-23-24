import styled from "styled-components";
import { motion } from "framer-motion";
import { alignmentX } from "../TileConstants";


export const StyledTextContent = styled(motion.div)`
	position: relative;

	* {
		/* word-break: break-all; */
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: all;
		overflow-wrap: break-word;
		-webkit-nbsp-mode: space;
		line-break: after-white-space;
		font-optical-sizing: auto;
		max-width: 100%;

		margin-left: ${props => props.$linelengthMargin};
		margin-right: ${props => props.$linelengthMargin};
		max-width: ${props => props.$linelength};

		::selection {
			background: ${props => props.$selectioncolor};
		}

	}

	/* p + .H0,
	p + h1,
	p + h2 {
		margin-top: 0.4em;
	}

	p + h3,
	p + h4,
	ul + h3,
	ul + h4,
	ol + h3,
	ol + h4 {
		margin-top: 0.6em;
	}

	h4 + p {
		margin-top: -0.5em;
	}

	.CAPTION + h3 {
		margin-top: -0.2em;
	} */

	code {
		letter-spacing: none;
	}

	*:last-child {
		margin-bottom: 0;
	}
`;


export const ULTRA = styled(motion.div)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const H0 = styled(motion.div)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const H1 = styled(motion.h1)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const H2 = styled(motion.h2)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const H3 = styled(motion.h3)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const H4 = styled(motion.h4)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const DEFAULT = styled(motion.p)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const P = styled(motion.p)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
`;

export const UL = styled(motion.ul)`
	width: 100%;
	/* display: inline-flex; */
	/* flex-direction: column; */
	list-style-position: outside;
	margin: 0;
	padding: 0;
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	color: ${props => props.$fontcolor};
	list-style: none;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	li {
		margin-bottom: ${props => props.$marginbottom};
		&::before {
			left: ${props => (props.$alignmentx === alignmentX.LEFT ? "-0.666em" : "unset")};
			text-align: center;
			content: "•";
		}
		> ul,
		> ol {
			margin-top: ${props => props.$marginbottom};
		}
	}
	cursor: text;
`;

/*
Look at using counter-set to get custom start numbers
https://css-tricks.com/almanac/properties/c/counter-set/
*/
export const OL = styled(motion.ol)`
	width: 100%;
	list-style-position: outside;
	margin: 0;
	padding: 0;
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	color: ${props => props.$fontcolor};
	list-style: none;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
	li {
		/* counter-set:  */
		counter-increment: number-counter-l1;
		margin-bottom: ${props => props.$marginbottom};

		&::before {
			content: counter(number-counter-l1, decimal) ".";
			font-variant-numeric: tabular-nums;
			text-align: ${props => (props.$alignmentx === alignmentX.LEFT ? "right" : "left")};
		}
		li {
			counter-increment: number-counter-l2;
			&::before {
				content: counter(number-counter-l2, lower-alpha) ".";
			}
			li {
				counter-increment: number-counter-l3;
				&::before {
					content: counter(number-counter-l3, lower-roman) ".";
				}
			}
		}
		> ul,
		> ol {
			margin-top: ${props => props.$marginbottom};
		}
	}
`;

export const LI = styled(motion.li)`
	position: relative;
	font-weight: inherit;
	padding-left: ${props => (props.$alignmentx === alignmentX.LEFT ? 1.3 : 0)}em;
	li {
		padding-right: ${props => (props.$alignmentx === alignmentX.RIGHT ? 1.3 : 0)}em;
	}
	&::before {
		width: ${props => (props.$alignmentx === alignmentX.LEFT ? "2em" : "1.5em")};
		display: ${props => (props.$alignmentx === alignmentX.LEFT ? "block" : "inline-block")};
		position: ${props => (props.$alignmentx === alignmentX.LEFT ? "absolute" : "unset")};
		top: ${props => (props.$alignmentx === alignmentX.LEFT ? 0 : "unset")};
		left: ${props => (props.$alignmentx === alignmentX.LEFT ? "-0.8em" : "unset")};
	}
	cursor: text;
`;

export const BLOCKQUOTE = styled(motion.blockquote)`
	width: auto;
	display: block;
	position: relative;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	/* padding-left: ${props => (props.$alignmentx === alignmentX.RIGHT ? 0 : 0.666)}em;
	padding-right: ${props =>
		props.$alignmentx === alignmentX.CENTER || props.$alignmentx === alignmentX.RIGHT ? 0.666 : 0}em; */
	/* font-style: italic; */
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
	cursor: text;
	&::before {
		content: "“";
		position: ${props => (props.$alignmentx === alignmentX.LEFT ? "absolute" : "unset")};
		/* background: ${props => props.$theme.colors.text.blockquotebar}; */
		/* left: ${props => (props.$alignmentx !== alignmentX.RIGHT ? 0 : "unset")}; */
		/* right: ${props => (props.$alignmentx === alignmentX.RIGHT ? 0 : "unset")}; */
		top: 0;
		margin-left: ${props => (props.$alignmentx === alignmentX.LEFT ? "-0.7ch" : "unset")};
		//width: 0.05em;
		//min-width: 2px;
		/* width: 6px; */
		/* border-radius: 1px; */
		/* opacity: 0.4; */
	}
	&::after {
		content: "”";
		position: ${props => (props.$alignmentx === alignmentX.RIGHT ? "absolute" : "unset")};
		margin-left: 0.1ch;
		/* opacity: 0.4; */
	}
`;

export const CAPTION = styled(motion.div)`
	user-select: ${props => (props.$selected ? "auto" : "none")};
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	caret-color: ${props => props.$caretcolor};
	cursor: text;
	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

export const SPAN = styled(motion.span)`
	color: ${props => props.$fontcolor};
	caret-color: ${props => props.$caretcolor};
`;

export const LINEBREAK = styled(SPAN)`
	display: table;
`;

export const ITALIC = styled(SPAN)`
	font-style: italic;
`;

export const BOLD = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
`;

export const BOLD_ITALIC = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
	font-style: italic;
`;

export const UNDERLINED = styled(SPAN)`
	text-decoration: underline;
`;

export const BOLD_ITALIC_UNDERLINED = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
	font-style: italic;
	text-decoration: underline;
`;

export const STRIKETHROUGH = styled(SPAN)`
	text-decoration: line-through;
`;

export const LINK = styled(motion.a)`
	color: ${props => props.$fontcolor};
	caret-color: ${props => props.$caretcolor};
	text-decoration: underline;
	&:visited {
		color: ${props => props.$fontcolor};
	}
`;

export const CODE = styled(motion.code)`
	color: ${props => props.$fontcolor};
	caret-color: ${props => props.$caretcolor};
	font-family: ${props => props.$theme.typography.fontFamilyMono};
	/* line-height: 1; */
	/* font-size: 95%; */
	display: inline-block;
	font-weight: ${props => props.$fontweight};
	background: ${props => props.$theme.colors.text.codeBackground};
	border-radius: 0.18em;
	padding-left: 0.18em;
	padding-right: 0.18em;
	box-decoration-break: clone;
`;

export const MENTION = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
	border-radius: 0.18em;
	padding-left: 0.18em;
	padding-right: 0.18em;
	background: ${props => props.$theme.colors.text.mentionBackground};
	box-decoration-break: clone;
`;

export const PRE = styled(motion.pre)`
	width: 100%;
	border-radius: 0.18em;
	padding: 0.75em;
	font-family: ${props => props.$theme.typography.fontFamilyMono};
	background: ${props => props.$theme.colors.text.codeBackground};
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	caret-color: ${props => props.$caretcolor};
	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

export const BlockMap = {
	ULTRA: ULTRA,
	H0: H0,
	H1: H1,
	H2: H2,
	H3: H3,
	H4: H4,
	DEFAULT: DEFAULT,
	P: P,
	CAPTION: CAPTION,
	OL: OL,
	UL: UL,
	LI: LI,
	SPAN: SPAN,
	LINEBREAK: LINEBREAK,
	MENTION: MENTION,
	ITALIC: ITALIC,
	BOLD: BOLD,
	BOLD_ITALIC: BOLD_ITALIC,
	UNDERLINED: UNDERLINED,
	BOLD_ITALIC_UNDERLINED: BOLD_ITALIC_UNDERLINED,
	STRIKETHROUGH: STRIKETHROUGH,
	LINK: LINK,
	CODE: CODE,
	BLOCKQUOTE: BLOCKQUOTE,
	PRE: PRE,
};

export const PlaceholderMap = {
	ULTRA: "Untitled",
	H0: "Untitled",
	H1: "Untitled",
	H2: "Untitled",
	H3: "Type something…",
	H4: "Type something…",
	DEFAULT: "Type something…",
	P: "Type something…",
	CAPTION: "Type something…",
	UL: "List something…",
	LI: "List something…",
};

export const AlignXMap = {
	LEFT: "flex-start",
	CENTER: "center",
	RIGHT: "flex-end",
};

export const AlignTextMap = {
	LEFT: "left",
	CENTER: "center",
	RIGHT: "right",
};

export const AlignYMap = {
	TOP: "flex-start",
	MIDDLE: "center",
	BOTTOM: "flex-end",
	DISTRIBUTE: "space-between",
};

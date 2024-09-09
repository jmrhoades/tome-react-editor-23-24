import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { EditorContext } from "../EditorContext";
import { TomeContext } from "../../tome/TomeContext";
import { LabelButton } from "../../ds/button/LabelButton";
import { Icon } from "../../ds/Icon";
import { Panels } from "../popovers/panels/panels";
import { Anchor, PopoverContext } from "../popovers/PopoverContext";

export const OverflowIndicator = props => {
	const { pageOverflow } = React.useContext(EditorContext);
	const { tomeData, getCurrentPage } = React.useContext(TomeContext);
	const { togglePanel } = React.useContext(PopoverContext);
	
	
	//PopoverContext

	const currentPage = getCurrentPage();
	const [showOverflow, setShowOverflow] = React.useState(false);

	useMotionValueEvent(pageOverflow, "change", latest => {
		//if (latest === true && showOverflow === false && !currentPage.layout.scrolling) {
		if (latest === true && showOverflow === false) {
			setShowOverflow(true);
		}
		if (latest === false && showOverflow === true) {
			setShowOverflow(false);
		}
	});

	return (
		<AnimatePresence>
			{showOverflow && !currentPage.layout.scrolling && !currentPage.layout.scaleContent && (
				<Wrap
					id="overflow-indicator"
					style={{
						//paddingLeft: getCurrentPage().layout.margin.x + "px",
						gridTemplateRows: `var(--page-current-y) var(--page-ideal-height) 1fr`,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.2,
					}}
				>
					<div />
					<Page
						style={{
							width: "var(--page-ideal-width)",
							//width: "100%",
							height: "var(--page-ideal-height)",
							//border: "1px solid var(--z3)",
							//borderRadius: "8px",
							//boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08), 0 8px 24px 0 rgba(0,0,0,0.08)",
						}}
					>
						<SVG>
							<DashedLine
								x1="0"
								y1="0%"
								x2="100%"
								y2="0%"
								strokeDasharray="3, 8"
								style={{
									stroke: "var(--z5)",
									opacity: 0,
								}}
							/>
							<DashedLine
								x1="0"
								y1="100%"
								x2="100%"
								y2="100%"
								strokeDasharray="6, 8"
								style={{
									stroke: "var(--core-yellow)",
									opacity: 1,
									pointerEvents: "auto",
									cursor: "help",
								}}
							/>
						</SVG>
					</Page>
					<BottomCover
						style={
							{
								// backdropFilter: "saturate(180%) blur(20px)",
								// borderTop: "1px solid var(--z3)",
							}
						}
					>
						<BottomCoverBg
							style={{
								backgroundColor: document.body.style.backgroundColor,
								//backgroundColor: "rgba(0, 128, 255, 0.3)",
								opacity: 0.7,
							}}
						/>

						<LabelButton
							style={{
								borderRadius: "var(--hud-border-radius)",
								backgroundColor: "var(--hud-background-color)",
								boxShadow: "var(--stroke-and-shadow)",
								pointerEvents: "auto",
								position: "relative",
								color: "var(--t9)",
								z: 99999,
								display: "none",
							}}
							onTap={e => {
								const p = Panels.PAGE_SETTINGS;
								p.anchor = Anchor["top"];
								togglePanel(p, e);
							}}
						>
							{/* <Icon name="PageLock" size={24} /> */}
							<Icon name="Lock" size={16} />
							<svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M28.0945 13.0977C27.3762 13.0977 26.773 12.9458 26.2849 12.6419C25.7968 12.3288 25.4791 11.919 25.3317 11.4125C25.2673 11.2099 25.2489 11.0349 25.2765 10.8876C25.3133 10.7402 25.3824 10.6297 25.4837 10.556C25.5942 10.4732 25.7185 10.4317 25.8567 10.4317C26.0224 10.4317 26.156 10.487 26.2573 10.5975C26.3678 10.6988 26.4506 10.8553 26.5059 11.0671C26.598 11.3987 26.7868 11.6611 27.0723 11.8545C27.3577 12.0479 27.7169 12.1446 28.1497 12.1446C28.9509 12.1446 29.5495 11.7993 29.9455 11.1086C30.3507 10.4087 30.5533 9.53843 30.5533 8.49781C30.5533 8.47018 30.5533 8.44255 30.5533 8.41493C30.5533 8.30442 30.5487 8.19391 30.5395 8.0834C30.3 8.44255 29.9593 8.74185 29.5173 8.98128C29.0752 9.22072 28.5918 9.34044 28.0668 9.34044C27.4959 9.34044 26.971 9.20691 26.4921 8.93984C26.0224 8.67278 25.6495 8.29981 25.3732 7.82094C25.1061 7.34207 24.9726 6.79874 24.9726 6.19094C24.9726 5.58314 25.1153 5.03981 25.4008 4.56094C25.6863 4.07286 26.0777 3.69068 26.575 3.41441C27.0815 3.13814 27.6432 3 28.2602 3C29.0706 3 29.7383 3.22102 30.2632 3.66305C30.7881 4.09588 31.1703 4.68526 31.4097 5.43119C31.6492 6.17713 31.7689 7.02436 31.7689 7.97289C31.7689 8.95826 31.64 9.83773 31.3821 10.6113C31.1242 11.3756 30.719 11.9834 30.1665 12.4347C29.6232 12.8767 28.9325 13.0977 28.0945 13.0977ZM28.274 8.40111C28.6608 8.40111 29.0108 8.30442 29.3239 8.11103C29.6462 7.90843 29.8994 7.63676 30.0836 7.29603C30.2678 6.95529 30.3599 6.57311 30.3599 6.1495C30.3599 5.73509 30.2678 5.35752 30.0836 5.01678C29.8994 4.67605 29.6462 4.40899 29.3239 4.2156C29.0108 4.02221 28.6608 3.92551 28.274 3.92551C27.8965 3.92551 27.5511 4.02221 27.238 4.2156C26.9249 4.40899 26.6809 4.67605 26.5059 5.01678C26.3309 5.35752 26.2434 5.73509 26.2434 6.1495C26.2434 6.57311 26.3309 6.95529 26.5059 7.29603C26.6809 7.63676 26.9249 7.90843 27.238 8.11103C27.5511 8.30442 27.8965 8.40111 28.274 8.40111Z"
									fill="currentColor"
								/>
								<path
									d="M20.0327 11.2882C19.7565 11.2882 19.517 11.1915 19.3144 10.9981C19.121 10.7955 19.0244 10.556 19.0244 10.2798C19.0244 10.0035 19.121 9.76866 19.3144 9.57527C19.517 9.37267 19.7565 9.27137 20.0327 9.27137C20.309 9.27137 20.5438 9.37267 20.7372 9.57527C20.9398 9.76866 21.0411 10.0035 21.0411 10.2798C21.0411 10.556 20.9398 10.7955 20.7372 10.9981C20.5438 11.1915 20.309 11.2882 20.0327 11.2882ZM20.0327 6.82636C19.7565 6.82636 19.517 6.72967 19.3144 6.53628C19.121 6.33368 19.0244 6.09424 19.0244 5.81797C19.0244 5.5417 19.121 5.30687 19.3144 5.11348C19.517 4.91088 19.7565 4.80958 20.0327 4.80958C20.309 4.80958 20.5438 4.91088 20.7372 5.11348C20.9398 5.30687 21.0411 5.5417 21.0411 5.81797C21.0411 6.09424 20.9398 6.33368 20.7372 6.53628C20.5438 6.72967 20.309 6.82636 20.0327 6.82636Z"
									fill="currentColor"
								/>
								<path
									d="M11.9572 13.0977C11.1468 13.0977 10.4838 12.8859 9.96804 12.4623C9.45234 12.0387 9.07477 11.4677 8.83533 10.7494C8.6051 10.0219 8.48999 9.1977 8.48999 8.27679C8.48999 7.25459 8.63273 6.34749 8.91821 5.55551C9.20369 4.76353 9.63652 4.14192 10.2167 3.69068C10.8061 3.23023 11.529 3 12.3854 3C13.0853 3 13.6793 3.16576 14.1674 3.49729C14.6555 3.81961 14.9732 4.23862 15.1205 4.75433C15.185 4.95692 15.1988 5.1319 15.162 5.27924C15.1343 5.42659 15.0653 5.5417 14.9548 5.62458C14.8535 5.69825 14.7337 5.73509 14.5956 5.73509C14.4298 5.73509 14.2963 5.68444 14.195 5.58314C14.0937 5.48184 14.02 5.3345 13.974 5.14111C13.8911 4.78195 13.7023 4.49647 13.4076 4.28466C13.1221 4.07286 12.7722 3.96695 12.3578 3.96695C11.5474 3.96695 10.9166 4.27545 10.4653 4.89246C10.0233 5.50947 9.77465 6.40735 9.7194 7.58611C9.71019 7.6782 9.70559 7.82555 9.70559 8.02815C9.91739 7.61374 10.2535 7.26379 10.714 6.97831C11.1836 6.69283 11.704 6.55009 12.2749 6.55009C12.8643 6.55009 13.3846 6.69283 13.8358 6.97831C14.2963 7.25459 14.6509 7.63676 14.8995 8.12484C15.1481 8.61292 15.2725 9.16086 15.2725 9.76866C15.2725 10.4041 15.1251 10.975 14.8304 11.4815C14.5449 11.988 14.149 12.384 13.6425 12.6695C13.136 12.955 12.5742 13.0977 11.9572 13.0977ZM11.9572 12.1722C12.3532 12.1722 12.7077 12.0755 13.0208 11.8821C13.334 11.6795 13.578 11.3987 13.753 11.0395C13.9279 10.6711 14.0154 10.2521 14.0154 9.78247C14.0154 9.14705 13.8312 8.61292 13.4629 8.1801C13.1037 7.74727 12.6295 7.53086 12.0401 7.53086C11.6349 7.53086 11.2711 7.63216 10.9488 7.83476C10.6265 8.02815 10.3732 8.29521 10.1891 8.63594C10.0141 8.96747 9.9266 9.33583 9.9266 9.74103C9.9266 10.2752 10.0141 10.7264 10.1891 11.0948C10.364 11.4539 10.6035 11.7256 10.9074 11.9098C11.2113 12.0847 11.5612 12.1722 11.9572 12.1722Z"
									fill="currentColor"
								/>
								<path
									d="M3.06662 6.10806C3.06662 6.02518 3.06662 5.9469 3.06662 5.87323C3.06662 5.6338 3.06662 5.39436 3.06662 5.15493C2.90085 5.4312 2.68444 5.67524 2.41738 5.88705C2.15952 6.08964 1.90628 6.24159 1.65763 6.34289C1.44582 6.43498 1.25704 6.47182 1.09127 6.4534C0.93472 6.43498 0.810397 6.37052 0.718307 6.26001C0.635425 6.1495 0.593984 6.01597 0.593984 5.85942C0.593984 5.69366 0.644634 5.56473 0.745934 5.47264C0.856443 5.37134 1.03141 5.28385 1.27085 5.21018C1.68526 5.08125 2.06743 4.85563 2.41738 4.53331C2.77653 4.211 3.02057 3.87487 3.1495 3.52492C3.17713 3.46967 3.20015 3.41902 3.21857 3.37297C3.28303 3.26246 3.3567 3.18419 3.43958 3.13814C3.53167 3.08289 3.62837 3.05526 3.72967 3.05526C3.89543 3.05526 4.02436 3.11051 4.11645 3.22102C4.21775 3.32232 4.2684 3.46967 4.2684 3.66306V12.3656H3.06662V6.10806ZM0.621612 12.8905C0.419012 12.8905 0.262458 12.8445 0.15195 12.7524C0.0506498 12.6603 0 12.5314 0 12.3656C0 12.1999 0.0506498 12.0709 0.15195 11.9788C0.262458 11.8775 0.419012 11.8269 0.621612 11.8269H6.58908C6.79168 11.8269 6.94363 11.8775 7.04493 11.9788C7.15544 12.0709 7.21069 12.1999 7.21069 12.3656C7.21069 12.5314 7.15544 12.6603 7.04493 12.7524C6.94363 12.8445 6.79168 12.8905 6.58908 12.8905H0.621612Z"
									fill="currentColor"
								/>
							</svg>

							{/* Scrolling */}
						</LabelButton>
					</BottomCover>
				</Wrap>
			)}
		</AnimatePresence>
	);
};

const Wrap = styled(motion.div)`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	/* background: rgba(255, 0, 0, 0.1); */
	display: grid;
	pointer-events: none;
`;

const Page = styled(motion.div)`
	margin: auto;
	/* background: green; */
	/* opacity: 0.3; */
	position: relative;
`;

const BottomCover = styled(motion.div)`
	//background-color: rgba(0, 0, 0, 0.5);
	//background-color: rgba(255, 255, 255, 0.5);
	position: relative;
	padding-top: 12px;
	display: grid;
	align-content: start;
	justify-items: center;
	/* background: linear-gradient(
		to top,
		hsla(0, 0%, 4%, 0.75) 0%,
		hsla(0, 0%, 4%, 0.74) 8.1%,
		hsla(0, 0%, 4%, 0.714) 15.5%,
		hsla(0, 0%, 4%, 0.672) 22.5%,
		hsla(0, 0%, 4%, 0.618) 29%,
		hsla(0, 0%, 4%, 0.556) 35.3%,
		hsla(0, 0%, 4%, 0.486) 41.2%,
		hsla(0, 0%, 4%, 0.412) 47.1%,
		hsla(0, 0%, 4%, 0.338) 52.9%,
		hsla(0, 0%, 4%, 0.264) 58.8%,
		hsla(0, 0%, 4%, 0.194) 64.7%,
		hsla(0, 0%, 4%, 0.132) 71%,
		hsla(0, 0%, 4%, 0.078) 77.5%,
		hsla(0, 0%, 4%, 0.036) 84.5%,
		hsla(0, 0%, 4%, 0.01) 91.9%,
		hsla(0, 0%, 4%, 0) 100%
	); */
`;

const BottomCoverBg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const SVG = styled(motion.svg)`
	display: block;
	position: absolute;
	overflow: visible;
	fill: none;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const DashedLine = styled(motion.line)``;

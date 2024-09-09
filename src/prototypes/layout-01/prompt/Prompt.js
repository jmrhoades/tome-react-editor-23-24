import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { Skateboard } from "./Skateboard";


const Wrapper = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	padding: 72px 72px 0;
	align-items: flex-end;
	/* z-index: 1000; */
`;


const Bar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	position: relative;
`;


const PromptBackground = styled(motion.div)`
	position: absolute;
	bottom: 24px;
	left: 50%;
`;

const PromptBackgroundMaterial = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
`;


export const MAX_TOKENS = 4000;
export const MAX_BAR_WIDTH = 680;
export const MAX_LIST_ROWS = 3;
export const ITEM_WIDTH = 680;
export const ROOT_ITEM_HEIGHT = 50;
export const SCOPED_ITEM_HEIGHT = 42;
export const DOC2TOME_MIN_CHARACTERS = 500;



export const promptbarMetrics = {
	mini: {
		width: 160,
		height: 36,
		borderRadius: 10,
		barWidth: 3,
		barHeight: 16,
		barX: 10,
		barY: 10,
	},
	input: {
		y: -48,
		root: {
			width: 680,
			height: 298,
		},
		scoped: {
			width: 680,
			height: 110,
		},
		create: {
			width: 680,
			height: 493,
		},
	},
	delegate: {
		y: -48,
	},
	borderRadius: 12,
	width: 680,
	height: 298,
};

export const Prompt = () => {
	const {
		
		currentPage,
		promptIsOpen,
		isPlayMode,
		
	} = React.useContext(TomeContext);

	


	const colors = currentPage.theme.colors;


	
	
	return (
		<Wrapper
			id="prompt_bar_container"
			style={{
				pointerEvents: "none",
				visibility: isPlayMode ? "hidden" : "visible",
				//paddingBottom: errorState !== ErrorStates.NONE ? 34 : 64,
				originY: 1,
			}}
			
			initial={false}

			transition={{
				type: "spring",
				stiffness: 600,
				damping: 45,
			}}
		>
	

			<PromptBackground
				
				initial={false}
				style={{
					x: "-50%",
					bottom: 0,
					width: promptbarMetrics.mini.width,
					height: promptbarMetrics.mini.height,
					y: -16,
				}}
			>
				<PromptBackgroundMaterial
					initial={false}
					animate={{
						opacity: promptIsOpen ? 1 : 0,
					}}
					
					style={{
						backgroundColor: colors.promptbar.barBackground,
						borderRadius: promptbarMetrics.mini.borderRadius,
						boxShadow: colors.promptbar.barShadow,

						backdropFilter: "saturate(180%) blur(20px)",
						WebkitBackdropFilter: "saturate(180%) blur(20px)",
					}}
				/>

				<PromptBackgroundMaterial
					
					initial={false}
					animate={{
						opacity: !promptIsOpen ? 1 : 0,
					}}
					
					style={{
						backgroundColor: colors.promptbar.miniBackground,
						backdropFilter: "saturate(180%) blur(20px)",
						boxShadow: colors.promptbar.miniShadow,

						WebkitBackdropFilter: "saturate(180%) blur(20px)",
						borderRadius: 8,
					}}
				>
				
				</PromptBackgroundMaterial>
			</PromptBackground>

			<Bar
				id="prompt_bar_content_wrap"
				key="prompt_bar_content_wrap"
				
				style={{
					
					pointerEvents: !promptIsOpen ? "none" : "auto",
					borderRadius:promptbarMetrics.mini.borderRadius,
					position: "absolute",
					left: "50%",
					x: "-50%",
					bottom: 0,
					width: promptbarMetrics.mini.width,
					height: promptbarMetrics.mini.height,
					y: -16,
				}}
				initial={false}
				
				
			
			>

				<motion.div
					key="prompt_bar_mini"
					initial={false}

				
				
				
					//transition={!promptIsOpen ? tSkateboardShow : tSkateboardHide}
					style={{
						position: "absolute",
						originX: 0.5,
						originY: 1,
						width: "100%",
						height: promptbarMetrics.mini.height,
						pointerEvents: !promptIsOpen ? "auto" : "none",
						cursor: !promptIsOpen ? "pointer" : "default",
					}}
					
					
				>
					<Skateboard
						theme={currentPage.theme}
						isShowing={!promptIsOpen}
						
					/>
				</motion.div>

				
			</Bar>


		</Wrapper>
	);
};

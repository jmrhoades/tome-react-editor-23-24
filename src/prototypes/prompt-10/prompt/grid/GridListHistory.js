import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { PromptStates } from "../Prompt";
import { tDividerShow, tDividerHide } from "../Transitions";
import { GridListHistoryItem } from "./GridListHistoryItem";
import { ScrollBar } from "../ScrollBar";

const ScrollViewWrap = styled(motion.div)``;

const ScrollView = styled(motion.div)`
	display: flex;
	flex-direction: column-reverse;
	overflow-y: auto;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		width: 0px;
	}
`;

const List = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: row;
	/* justify-content: space-between; */
`;

export const GridListHistory = props => {
	const scrollRef = React.useRef(null);
	return (
		<ScrollViewWrap>
			<ScrollView
				key="grid_list_history_container"
				id="grid_list_history_container"
				ref={scrollRef}
				style={{
					maxHeight: 344,
					width: "100%",
				}}
			>
				{props.list.map((item, i) => (
					<GridListHistoryItem
						key={item.id}
						item={item}
						i={i}
						theme={props.theme}
						//onGeneratedPageContentClick={props.onGeneratedPageContentClick}
						//onTextClick={props.onTextClick}
						width={props.itemWidth}
						height={props.itemHeight}
					/>
				))}
			</ScrollView>
			<ScrollBar theme={props.theme} scrollRef={scrollRef} scrollViewHeight={100} contentHeight={200} />
		</ScrollViewWrap>
	);
};

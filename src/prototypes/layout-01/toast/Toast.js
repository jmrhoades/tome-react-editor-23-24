import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	position: relative;
	gap: 12px;
	min-width: 120px;

	
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;

	border-radius: 8px;
	padding: 6px 6px 6px 12px;
`;

const Label = styled(motion.div)`
	pointer-events: none;
`;
const Action = styled(motion.div)`
	pointer-events: none;
	border-radius: 4px;
	padding: 5px 6px 5px 6px;
`;

export const Toast = props => {
	const { currentPage, toastData, setToastData } = React.useContext(TomeContext);

	const colors = currentPage.theme.colors;
	// console.log(colors);
	//const [isHovering, setIsHovering] = React.useState(false);
	//const foreground = colors.t75;

	const show = toastData && toastData.id;
	const hasAction = toastData.undo;

	React.useEffect(() => {
		if (toastData && toastData.id) {
			setTimeout(() => {
				setToastData({});
			}, 3000);
		}
	}, [toastData, setToastData]);

	return (
		<AnimatePresence>
			{show && (
				<Wrap
					key={toastData.id}
					style={{
						backgroundColor: currentPage.theme.mode === "light" ? colors.z0 : colors.z3,
						position: "absolute",
						bottom: 72,
						left: "50%",
						x: "-50%",
						boxShadow: currentPage.theme.shadows.small,
						paddingLeft: hasAction ? 12 : 8,
						paddingRight: hasAction ? 6 : 8,
					}}
					initial={{
						opacity: 0,
						scale: 0.5,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}
					exit={{
						opacity: 0,
						scale:0.5,
                        transition: {
                            duration: 0.3,
                        }
					}}
				>
					<Label
						style={{
							color: colors.t9,
						}}
					>
						{toastData.label}
					</Label>
					{hasAction && (
					<Action
						style={{
							color: colors.accent,
						}}
					>
						Undo
					</Action>
					)}
				</Wrap>
			)}
		</AnimatePresence>
	);
};

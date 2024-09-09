import React from "react";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../../tome/TomeContext";
import { Icon } from "../Icon";
import { Button } from "../Components";


export const TempAddButton = props => {
	const { currentPage, clickAddTile } = React.useContext(TomeContext);



	const backgroundColor = useMotionValue(currentPage.theme.colors.t0);

	return (
		<motion.div
			style={{
				position: "absolute",
				top: "50%",
				right: 10,
				y: "-50%",
			}}
		>
			<Button
				style={{
					width: 28,
					height: 28,

					borderRadius: 6,
					backgroundColor: backgroundColor,
					transition: "background-color 0.2s ease-in-out",
				}}
				onHoverStart={() => {
					backgroundColor.set(currentPage.theme.colors.t4);
				}}
				onHoverEnd={() => {
					backgroundColor.set(currentPage.theme.colors.t0);
				}}
				onPointerDown={e => {
					e.stopPropagation();
				}}
				onTap={e => {
					clickAddTile();
				}}
			>
				<Icon name={"Add"} color={currentPage.theme.colors.t9}/>
			</Button>
		</motion.div>
	);
};

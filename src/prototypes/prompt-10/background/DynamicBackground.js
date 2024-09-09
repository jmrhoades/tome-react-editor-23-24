import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import Spline from "@splinetool/react-spline";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: auto;
	//overflow: hidden;
`;

export const DynamicBackground = props => {
	const {} = useContext(TomeContext);
	const opacity = useMotionValue(0);
	// let opacity = 1;
	// if (props.pageTop < 1 && props.params.fadeOnScroll) {
	// 	opacity = 1 - Math.abs(props.pageTop) / window.innerHeight;
	// }

	// console.log("PageBackground", opacity);

	//if (props.params) {
	//console.log(props.params);
	//}

	//const blendMode = "overlay";
	const blendMode = "normal";

	function onLoad(spline) {
		//const obj = spline.findObjectByName('Cube');
		// or
		// const obj = spline.findObjectById('8E8C2DDD-18B6-4C54-861D-7ED2519DE20E');

		// save it in a ref for later use
		//cube.current = obj;
		console.log("loaded");
		opacity.set(1);
	}

	return (
		<Wrap
			style={{
				//backgroundColor: props.page.theme.colors.backgrounds.page,
				//  backgroundColor: "tran",
				opacity: opacity,
				transition: "opacity 1s ease-out",
			}}
		>
			{props.params && props.params.url && (
				<Spline scene={props.params.url} onLoad={onLoad} />
			)}
		</Wrap>
	);
};

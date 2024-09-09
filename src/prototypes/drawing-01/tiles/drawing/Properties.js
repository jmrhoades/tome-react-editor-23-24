import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import { Shape } from "./ShapeSVG";

import { MetricsContext, metricConstants } from "../../tome/MetricsContext";
import { BlockType as DiagramBlockType } from "./_constants";
import { ShapeDiv } from "./ShapeDiv";
import { PropertyButton, PropertyButtonType } from "./PropertyButton";
import { PropertiesLevel1 } from "./PropertiesLevel1";
import { PropertiesLevel2 } from "./PropertiesLevel2";

export const Properties = props => {
	const data = props.data;
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const opacity = useMotionValue(0);
	const [params, setParams] = React.useState();
	const [level2, setLevel2] = React.useState(false);

	const marginY = 16;
	const buttonGap = 4;
	const containerPadding = 4;
	const buttonSize = 26;
	const containerRadius = 10;

	// Listen for selection changes
	useMotionValueEvent(props.propertyId, "change", latest => {
		//console.log(latest);
		if (latest === "") {
			animate(opacity, 0, { duration: 0.2 });
		} else {
			const blockEl = document.getElementById(latest + "_frame");
			const blockProps = data.find(b => b.id === latest);
			//console.log("blockProps", blockProps);
			if (blockEl && blockProps) {
				setLevel2(false);
				const blockRect = blockEl.getBoundingClientRect();
				x.set(blockRect.x + blockRect.width / 2);
				y.set(blockRect.y - marginY);
				animate(opacity, 1, { duration: 0.05 });
				setParams(blockProps.params);
			}
		}
	});

	const toggleFillColorMenu = () => {
		if (level2) {
			setLevel2(false);
		} else {
			setLevel2("FillColor");
		}
	};


	return (
		<motion.div
			className="properties"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				x: x,
				y: y,
				opacity: opacity,
			}}
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			{params && (
				<PropertiesLevel1
					params={params}
					theme={props.theme}
					buttonSize={buttonSize}
					buttonGap={buttonGap}
					containerPadding={containerPadding}
					containerRadius={containerRadius}
					toggleFillColorMenu={toggleFillColorMenu}
					level2={level2}
				/>
			)}

			{params && level2 && (
				<PropertiesLevel2
					params={params}
					theme={props.theme}
					buttonSize={buttonSize}
					buttonGap={buttonGap}
					containerPadding={containerPadding}
					containerRadius={containerRadius}
					level2={level2}
				/>
			)}
		</motion.div>
	);
};

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { SliderField } from "../../../ds/SliderField";

const Wrap = styled(motion.div)``;

export const PropertiesPictogram = props => {
	const onPictogramItemTotalChange = v => {
		console.log("onPictogramItemTotalChange", v);
		// Update fill count if it's greater than new total
		if (props.params.meta.itemFill > v) {
			props.layer.motion.meta.itemFill.set(v);
			props.params.meta.itemFill = v;
		}
		props.layer.motion.meta.itemTotal.set(v);
		props.params.meta.itemTotal = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onPictogramItemFillChange = v => {
		console.log("onPictogramItemFillChange", v);
		// Don't go above total count
		if (v > props.params.meta.itemTotal) v = props.params.meta.itemTotal;
		props.layer.motion.meta.itemFill.set(v);
		props.params.meta.itemFill = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	const onPictogramItemSpacingChange = v => {
		console.log("onPictogramItemSpacingChange", v);
		props.layer.motion.meta.itemSpacing.set(v);
		props.params.meta.itemSpacing = v;
		//if (closeAfterSelection) props.setLevel2(false);
		//props.hidebounds();
	};

	return (
		<Wrap style={{ display: "flex", pointerEvents: "auto" }}>
			<SliderField
				theme={props.theme}
				value={props.layer.motion.meta.itemTotal}
				onValueUpdate={onPictogramItemTotalChange}
				valueRange={[1, 100]}
				valueIncrement={1}
				displayRange={[1, 100]}
				displayUnit={""}
				backgroundColorDefault={"transparent"}
				backgroundColorActive={"transparent"}
				textColorDefault={props.theme.colors.t9}
				textColorActive={props.theme.colors.t9}
				style={{
					fontSize: "19px",
				}}
			/>

			<SliderField
				theme={props.theme}
				value={props.layer.motion.meta.itemFill}
				onValueUpdate={onPictogramItemFillChange}
				valueRange={[1, 100]}
				valueIncrement={1}
				displayRange={[1, 100]}
				displayUnit={""}
                backgroundColorDefault={"transparent"}
				backgroundColorActive={"transparent"}
				textColorDefault={props.theme.colors.t9}
				textColorActive={props.theme.colors.t9}
				style={{
					fontSize: "19px",
				}}
			/>
		</Wrap>
	);
};

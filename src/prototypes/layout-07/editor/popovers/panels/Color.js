import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { motion } from "framer-motion";
import { Section } from "../../../ds/panel/Section";
import { Button } from "../../../ds/button/Button";
import { Icon } from "../../../ds/Icon";

export const Color = props => {
	const { value, onChange } = props.panel;
	const [color, setColor] = React.useState(value);
	let hexInputFieldClassName = "hexInputField";

	const onChangeColor = color => {
		setColor(color);
		onChange(color);
	};

	return (
		<>
			<Section>
				<motion.div onPointerDownCapture={e => e.stopPropagation()}>
					<HexColorPicker color={color} onChange={onChangeColor} />
				</motion.div>

				<Section
					type="Column"
					style={{
						gap: "6px",
					}}
				>
					<Button>
						<Icon name="Eyedropper" />
					</Button>
					<div className="hexInputFieldWrap">
						<HexColorInput
							color={color}
							onChange={onChangeColor}
							className={hexInputFieldClassName}
							onPointerDownCapture={e => e.stopPropagation()}
							onKeyDown={e => {
								e.stopPropagation();
							}}
						/>
					</div>
					<Button>
						<Icon name="Add" />
					</Button>
				</Section>
			</Section>
		</>
	);
};

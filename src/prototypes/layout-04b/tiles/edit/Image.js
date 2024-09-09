import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Image = ({ children, tile }) => {

	const [borderRadius, setBorderRadius] = React.useState(0);
	const [backgroundColor, setBackgroundColor] = React.useState(undefined);
	const [imgStyle, setImgStyle] = React.useState(null);
	const updateRect = () => {
		requestAnimationFrame(() => {
			const el = document.getElementById(tile.id);

			if (el) {
				const style = getComputedStyle(el);
				setBorderRadius(style.borderRadius);
				setBackgroundColor(style.backgroundColor);

				const imgEl = document.getElementById(tile.id + "_img");
				//console.log(iStyle)
				if (imgEl) {
					const iStyle = getComputedStyle(imgEl);
					if (iStyle) {
						setImgStyle({
							position: iStyle.getPropertyValue("position"),
							width: iStyle.getPropertyValue("width"),
							maxWidth: iStyle.getPropertyValue("max-width"),
							height: iStyle.getPropertyValue("height"),
							objectFit: iStyle.getPropertyValue("object-fit"),
						});
					}
				}
			}
		});
	};

	// Update metrics when data or state changes
	React.useLayoutEffect(updateRect);

	// Update metrics when window resizes
	React.useEffect(() => {
		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	}, []);

	return (
		<ImageBox
			id={tile.id + "_edit"}
			style={{
				borderRadius: borderRadius,
				backgroundColor: backgroundColor,
				paddingTop: tile.layout.padding.y,
				paddingBottom: tile.layout.padding.y,
				paddingLeft: tile.layout.padding.x,
				paddingRight: tile.layout.padding.x,
			}}
		>
			<Img
				src={tile.content.src}
				alt=""
				style={{
					borderRadius: borderRadius,
					...imgStyle,
				}}
			/>
		</ImageBox>
	);
};

const ImageBox = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: var(--editor-debug-background-color);
	box-shadow: 0 0 0 1px var(--editor-debug-background-color) inset;
`;

const Img = styled.img`
	pointer-events: none;
`;

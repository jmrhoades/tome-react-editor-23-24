import React from "react";
import styled from "styled-components";

export const Swatch = props => {
	const { color = undefined, size = 14 } = props;
	return (
		<SwatchWrap
			style={{
				width: size + "px",
				height: size + "px",
				borderRadius: size / 2 + "px",
				backgroundColor: color,
				boxShadow: `0 0 0 1px rgba(255,255,255,0.08)`,
			}}
		/>
	);
};

const SwatchWrap = styled.span`
	display: block;
`;

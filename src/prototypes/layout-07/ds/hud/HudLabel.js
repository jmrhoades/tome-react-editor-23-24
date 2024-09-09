import React from "react";
import styled from "styled-components";
import { HudDivider } from "./HudDivider";

export const HudLabel = props => {
	return (
		<div
			style={{
				fontFamily: "var(ui-font-family)",
				fontSize: "8px",
                lineHeight: "10px",
                textTransform: "uppercase",
                letterSpacing: ".5px",
				color: "var(--t7)", 
                paddingLeft: "8px",
                paddingRight: "2px",
                display: "flex",

                alignItems: "center",
			}}
		>
			{props.children}
            
            {/* <HudDivider /> */}
		</div>
	);
};

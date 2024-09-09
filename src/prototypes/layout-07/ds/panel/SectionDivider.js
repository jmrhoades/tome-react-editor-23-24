import React from "react";
export const SectionDivider = props => {
	return (
		
        <div
			style={{
				height: "6px",
                display: "flex",
                alignItems: "center",
				...props.style,
			}}
		>
			<div
				style={{
					height: "1px",
                    width: "100%",
                    backgroundColor: "var(--t2)",
				}}
			/>

		</div>
	);
};

import React from "react";
import styled from "styled-components";


export const SectionTitle = props => {
	

	return (
		<Title>
			{props.children}
		</Title>
	);
};

const Title = styled.div`
	font-size: var(--label-small-font-size);
	line-height: var(--label-small-line-height);
    color: var(--t6);
`;

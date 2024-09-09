import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export const SectionTitle = props => {
	const { trailing = undefined, onTap = undefined } = props;

	const [active, setActive] = React.useState(false);

	return (
		<Title>
			{props.children}
			{trailing && (
				<Trailing>
					<Icon name={trailing} size={12} />
				</Trailing>
			)}
		</Title>
	);
};

const Title = styled.div`
	font-size: var(--label-small-font-size);
	line-height: 13px;
	color: var(--t7);
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Trailing = styled.div`
	cursor: pointer;
`;

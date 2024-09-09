import React from "react";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { EditorContext } from "../editor/EditorContext";
import { PopoverContext } from "../editor/popovers/PopoverContext";

export const Outline = ({ pages, currentPage }) => {
	return (
		<OutlineWrap
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			{pages.map(page => (
				<Page page={page} key={page.id} active={currentPage.id === page.id} />
			))}
		</OutlineWrap>
	);
};

const Page = ({ page, active }) => {
	const { gotoPage } = React.useContext(EditorContext);
	const { cancelPopovers } = React.useContext(PopoverContext);

	//const activeColor = page.theme.tokens["--accent-color"];
	const activeColor = "var(--t9)";

	return (
		<PageWrap
			onPointerDown={e => {
				cancelPopovers();
				gotoPage(page);
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<PageDot
				style={{
					backgroundColor: active ? activeColor : "var(--t6)",
					width: active ? "4px" : "6px",
					height: active ? "4px" : "6px",
				}}
			/>
		</PageWrap>
	);
};

const OutlineWrap = styled.div`
	position: fixed;
	top: 48px;
	left: 0;
	width: 48px;
	height: calc(100vh - (48px * 2));
	padding-right: 10px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PageWrap = styled.div`
	width: 32px;
	height: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const PageDot = styled.div`
	border-radius: 5px;
`;

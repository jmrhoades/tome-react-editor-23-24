import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";

const TITLE = "Design System";

const Wrap = styled.div`
	background-color: #090909;
	padding: 3em;
	width: 100%;
	position: relative;
	overflow: hidden;
`;

const H1 = styled.div`
	font-size: 60px;
	font-weight: 800;
	line-height: 73px;
	letter-spacing: -0.02em;
	color: #ffffff;
	margin-bottom: 100px;
`;

const H2 = styled.div`
	font-weight: 600;
	font-size: 40px;
	line-height: 48px;
	letter-spacing: -0.02em;
	color: rgba(255, 255, 255, 0.4);
	margin-bottom: 4px;
`;

const H3 = styled.div`
	font-size: 10px;
	line-height: 12px;
	color: rgba(255, 255, 255, 0.4);
`;

const KindGroupHeader = styled.div`
	margin-bottom: 50px;
`;

const ComponentGroup = styled.div`
	margin-bottom: 100px;
	width: 400px;
`;

const KindGroup = styled.div`
	margin-bottom: 100px;
`;
const TypeGroup = styled.div`
	margin-bottom: 50px;
`;
const SizeGroup = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;

const icons = [
	"Dropdown",
	"ChevronLeft",
	"Compose",
	"Help",
	"HelpFill",
	"PlaybackPlayButton",
	"CommentFill",
	"Clear",
	"Photo",
	"Text",
	"Add",
	"Record",
	"MagicWand",
	"ArrowCursor",
	"Annotate",
	"Scribble",
	"Flashlight",
	"RectSelect",
]

export const DSDemo = props => {
	const [selectedIconButton, setSelectedIconButton] = useState("");

	return (
		<Wrap>

			<ComponentGroup>
				<H1>Buttons</H1>

				<KindGroup>
					<KindGroupHeader>
						<H2>Link</H2>
						<H3>Default — Small / Medium / Large</H3>
						<H3>Dropdown — Small / Medium / Large</H3>
						<H3>Back — Small / Medium / Large</H3>
					</KindGroupHeader>
					<TypeGroup>
						<SizeGroup>
							<Button kind="link" type="default" size="sm" label="Button" />
							<Button kind="link" type="default" size="md" label="Button" />
							<Button kind="link" type="default" size="lg" label="Button" />
						</SizeGroup>
					</TypeGroup>
					<TypeGroup>
						<SizeGroup>
							<Button kind="link" type="dropdown" size="sm" label="Button" />
							<Button kind="link" type="dropdown" size="md" label="Button" />
							<Button kind="link" type="dropdown" size="lg" label="Button" />
						</SizeGroup>
					</TypeGroup>
					<TypeGroup>
						<SizeGroup>
							<Button kind="link" type="back" size="sm" label="Button" />
							<Button kind="link" type="back" size="md" label="Button" />
							<Button kind="link" type="back" size="lg" label="Button" />
						</SizeGroup>
					</TypeGroup>
				</KindGroup>

				<KindGroup>
					<KindGroupHeader>
						<H2>Action</H2>
						<H3>Default — Small / Medium / Large</H3>
						<H3>Icon — Small / Medium / Large</H3>
						<H3>Primary — Small / Medium / Large</H3>
						<H3>Destructive — Small / Medium / Large</H3>
					</KindGroupHeader>
					<TypeGroup>
						<SizeGroup>
							<Button kind="action" type="default" role="default" size="sm" label="Button" />
							<Button kind="action" type="default" role="default" size="md" label="Button" />
							<Button kind="action" type="default" role="default" size="lg" label="Button" />
						</SizeGroup>
					</TypeGroup>
					<TypeGroup>
						<SizeGroup>
							<Button kind="action" type="icon" role="default" size="sm" label="Button" icon="Compose" />
							<Button kind="action" type="icon" role="default" size="md" label="Button" icon="Compose" />
							<Button kind="action" type="icon" role="default" size="lg" label="Button" icon="Compose" />
						</SizeGroup>
					</TypeGroup>
					<TypeGroup>
						<SizeGroup>
							<Button kind="action" type="default" role="primary" size="sm" label="Button" />
							<Button kind="action" type="default" role="primary" size="md" label="Button" />
							<Button kind="action" type="default" role="primary" size="lg" label="Button" />
						</SizeGroup>
					</TypeGroup>
					<TypeGroup>
						<SizeGroup>
							<Button kind="action" type="default" role="destructive" size="sm" label="Button" />
							<Button kind="action" type="default" role="destructive" size="md" label="Button" />
							<Button kind="action" type="default" role="destructive" size="lg" label="Button" />
						</SizeGroup>
					</TypeGroup>
				</KindGroup>

				<KindGroup>
					<KindGroupHeader>
						<H2>Icon</H2>
					</KindGroupHeader>
					<TypeGroup>
						<SizeGroup>
						{icons.map((icon, i) => (
							<Button
								key={i}
								kind="icon"
								icon={icon}
								onTap={()=>setSelectedIconButton(icon)}
								selected={selectedIconButton === icon}
							/>
						))}
						</SizeGroup>
					</TypeGroup>
				</KindGroup>
			</ComponentGroup>
		</Wrap>
	);
};

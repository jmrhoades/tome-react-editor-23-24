import { Icon } from "../../../../ds/Icon";
import { motion } from "framer-motion";
import styled from "styled-components";

const FakeTable = styled(motion.div)`
	display: flex;
	flex-flow: row wrap;
	gap: 2px;
	padding-top: 6px;
	margin: 1px 3px 3px 6px;
	> div {
		background-color: ${props => props.$bgColor};
		height: 5.6px;
		width: 25.5px;
		border-radius: 1px;
	}
`;

export const LayoutTemplate = props => {
	let content = <></>;
	const nullIconColor = props.theme.colors.t7;
	switch (props.type) {
		case "Centered":
			content = (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "100%",
					}}
				>
					<h1
						className={"h0"}
						style={{
							color: props.theme.colors.text.heading,
							fontSize: 14,
							textAlign: "center",
							paddingTop: 0,
							paddingLeft: 0,
						}}
					>
						Title
					</h1>
				</div>
			);
			break;
		case "Text&Media":
			content = (
				<div
					style={{
						display: "flex",
						width: "100%",
						height: "100%",
						gap: 2,
					}}
				>
					<div
						style={{
							width: "100%",
						}}
					>
						<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
						<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
				</div>
			);
			break;
		case "Text&Table":
			content = (
				<div>
					<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
					<FakeTable $bgColor={props.theme.colors.table.cell}>
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
						<div />
					</FakeTable>
				</div>
			);
			break;
		case "Media":
			content = (
				<div
					style={{
						display: "flex",
						width: "100%",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: props.theme.colors.backgrounds.tile.null,
						borderRadius: 4,
					}}
				>
					<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
				</div>
			);
			break;
		case "TwoMedia":
			content = (
				<div
					style={{
						display: "flex",
						width: "100%",
						height: "100%",
						gap: 2,
					}}
				>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
				</div>
			);
			break;
		case "ThreeMedia":
			content = (
				<div
					style={{
						display: "flex",
						width: "100%",
						height: "100%",
						gap: 2,
					}}
				>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
				</div>
			);
			break;
		case "Media&2Text":
			content = (
				<>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: 84,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: props.theme.colors.backgrounds.tile.null,
							borderRadius: 4,
							marginBottom: 2,
						}}
					>
						<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							gap: 2,
						}}
					>
						<div
							style={{
								width: "100%",
							}}
						>
							<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
							<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
						</div>
						<div
							style={{
								width: "100%",
							}}
						>
							<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
							<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
						</div>
					</div>
				</>
			);
			break;
		case "Title&6Media":
			content = (
				<div
					style={{
						display: "grid",
						gridTemplateRows: "40% 1fr 1fr",
						//flexDirection: "column",
						width: "100%",
						height: "100%",
						gap: 2,
					}}
				>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<h1
							className={"h0"}
							style={{
								color: props.theme.colors.text.heading,
								fontSize: 14,
								lineHeight: 1,
								paddingBottom: 5,
								textAlign: "center",
							}}
						>
							Title
						</h1>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							gap: 2,
						}}
					>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>

						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							gap: 2,
						}}
					>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>

						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
					</div>
				</div>
			);
			break;
		case "ThreeText&Media":
			content = (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "100%",
						gap: 2,
					}}
				>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							gap: 2,
						}}
					>
						<div
							style={{
								width: "100%",
							}}
						>
							<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
							<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
						</div>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							gap: 2,
						}}
					>
						<div
							style={{
								width: "100%",
							}}
						>
							<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
							<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
						</div>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							gap: 2,
						}}
					>
						<div
							style={{
								width: "100%",
							}}
						>
							<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
							<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
						</div>
						<div
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: props.theme.colors.backgrounds.tile.null,
								borderRadius: 4,
							}}
						>
							<Icon name={"Image"} size={24} color={nullIconColor} opacity={1} />
						</div>
					</div>
				</div>
			);
			break;
		default:
			content = (
				<div>
					<h1 style={{ color: props.theme.colors.text.heading }}>Heading</h1>
					<p style={{ color: props.theme.colors.text.body }}>Paragraph</p>
				</div>
			);
			break;
	}
	return content;
};

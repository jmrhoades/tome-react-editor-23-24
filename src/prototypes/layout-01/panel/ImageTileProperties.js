import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, SectionSpacer } from "./Panels";
import { Button, buttonType } from "./controls/Button";
import { Segmented, segmentType } from "./controls/Segmented";
import { TILES } from "../tiles/TileConstants";

export const ImageTileProperties = props => {
	const { setTomeData, tomeData, saveState, selectedTile } = React.useContext(TomeContext);
	const uploadId = "_file_input_image_tile";
	//const hasMedia = props.page.background.params.video || props.page.background.params.image;
	let hasMedia = false;

	return (
		<PanelWrap>
			<Section>
				<Button
					theme={props.theme}
					type={buttonType.LABEL}
					label={hasMedia ? "Upload" : "Upload"}
					onTap={() => document.getElementById(uploadId).click()}
				/>
				<input
					key={uploadId}
					type="file"
					hidden
					id={uploadId}
					style={{ visibility: "hidden", position: "absolute" }}
					onChange={e => {
						const files = [...e.target.files];
						if (files) {
							const hasMedia = files.find(({ type }) => type.match("image.*") || type.match("video.*"));
							if (hasMedia) {
								//props.page.background.params.video = undefined;
								//props.page.background.params.image = undefined;
								

								const file = files[0];
								let type = TILES.IMAGE.name;
								if (file.type.match("video.*")) type = TILES.VIDEO.name;
								const reader = new FileReader();
								reader.onload = e => {
									//props.page.background.params.isLoading = false;
									if (type === TILES.IMAGE.name) {
										//props.page.background.params.image = e.target.result;
									}
									if (type === TILES.VIDEO.name) {
										//props.page.background.params.video = e.target.result;
										//props.page.background.params.autoPlay = true;
									}
									setTomeData({ ...tomeData });
								};
								
								//props.page.background.type = type;
								//props.page.background.params.isLoading = true;

								reader.readAsDataURL(file);
								setTomeData({ ...tomeData });
							}
						}
					}}
				/>
			</Section>

			<Section>
				<SectionTitle theme={props.theme}>Size</SectionTitle>

				<Segmented
					id={"image_size"}
					target={"imageSize"}
					theme={props.theme}
					targetValue={selectedTile.params.imageSize}
					
					//targetValue={selectedTile.params.alignmentX}
					data={[
						{
							type: segmentType.LABEL,
							label: "Fit",
							value: "contain",
						},
						{
							type: segmentType.LABEL,
							label: "Fill",
							value: "cover",
						},
						{
							type: segmentType.LABEL,

							label: "Custom",
							value: "custom",
						},
					]}
				/>
			</Section>
		</PanelWrap>
	);
};

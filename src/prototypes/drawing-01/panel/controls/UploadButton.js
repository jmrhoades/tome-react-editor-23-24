import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, SectionSpacer } from "./Panels";
import { LabeledSwitch } from "./controls/LabeledSwitch";
import { Select } from "../ds/Select";
import { Button, buttonType } from "./controls/Button";
import { SliderInputGroup } from "./controls/SliderInputGroup";
import { tileNames } from "../page/TileConstants";



const Wrap = styled(motion.div)`
	position: relative;
`;



export const DownloadButton = props => {
	const { setTomeData, tomeData, saveState } = React.useContext(TomeContext);
	const uploadId = props.page.id + "_file_input_image_tile";
	const hasMedia = props.page.background.params.video || props.page.background.params.image;


	return (
		<Wrap>
			
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
								props.page.background.params.video = undefined;
								props.page.background.params.image = undefined;
								setTomeData({ ...tomeData });

								const file = files[0];
								let type = tileNames.IMAGE.name;
								if (file.type.match("video.*")) type = tileNames.VIDEO.name;
								const reader = new FileReader();
								reader.onload = e => {
									props.page.background.params.isLoading = false;
									if (type === tileNames.IMAGE.name) {
										props.page.background.params.image = e.target.result;
									}
									if (type === tileNames.VIDEO.name) {
										props.page.background.params.video = e.target.result;
										props.page.background.params.autoPlay = true;
									}
									setTomeData({ ...tomeData });
								};
								props.page.background.type = type;
								props.page.background.params.isLoading = true;
								reader.readAsDataURL(file);
							}
						}
					}}
				/>


		</Wrap>
	);
};

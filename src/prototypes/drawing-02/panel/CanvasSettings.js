import React from "react";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, SectionTitle, ControlGroup } from "./Panels";
import { LabeledSwitch } from "./controls/LabeledSwitch";
import { buttonType, Button } from "./controls/Button";
import { Stepper } from "../ds/Stepper";

export const CanvasSettings = props => {
	const { selectedTile, saveState } = React.useContext(TomeContext);
	const tile = selectedTile;

	const onShowGridSwitch = newValue => {
		tile.params.showGrid = newValue;
		saveState();
	};

	const onGridSnapSwitch = newValue => {
		tile.params.snap = newValue;
		saveState();
	};

	const onAutoZoomSwitch = newValue => {
		tile.params.autozoom = newValue;
		saveState();
		if (newValue) {
			// trigger autozoom if turning on
			selectedTile.autoZoom();
		}
	};

	const setZoom = newValue => {
		selectedTile.setZoom(newValue);
		if (tile.params.autozoom) {
			tile.params.autozoom = false;
			saveState();
		}
	};

	return (
		<PanelWrap className="panelWrap">
			<Section>
				<SectionTitle theme={props.theme}>Zoom</SectionTitle>
				<ControlGroup>
					<Stepper theme={props.theme} motionValue={selectedTile.mZ} setValue={setZoom} />
					<Button
						theme={props.theme}
						type={buttonType.LABEL}
						label={"Fit"}
						style={{ width: "50%" }}
						onTap={selectedTile.autoZoom}
					/>
				</ControlGroup>
				
			</Section>
			<Section>
			<LabeledSwitch
					theme={props.theme}
					label={"Auto zoom"}
					isOn={tile.params.autozoom}
					onTap={onAutoZoomSwitch}
				/>
				{/* <LabeledSwitch
					theme={props.theme}
					label={"Show grid"}
					isOn={tile.params.showGrid}
					onTap={onShowGridSwitch}
				/> */}
				<LabeledSwitch
					theme={props.theme}
					label={"Snap objects to grid"}
					isOn={tile.params.snap}
					onTap={onGridSnapSwitch}
				/>
				
			</Section>
		</PanelWrap>
	);
};

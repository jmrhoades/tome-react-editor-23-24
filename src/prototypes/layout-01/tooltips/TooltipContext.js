import React, { createContext, useEffect, useContext } from "react";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { uniqueId } from "lodash";

export const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
	const { menuInfo } = React.useContext(TomeContext);

	const [tooltipInfo, setTooltipInfo] = React.useState({
		show: false,
		id: "tooltip",
		ref: null,
		label: "Tooltip",
		shortcuts: ["⌥", "K"],
		alignX: "middle",
		alignY: "leading",
		offsetX: 8,
		offsetY: 8,
	});

	const showTooltip = info => {
		//if (tooltipInfo.id === info.id) return false;
		//console.log("show tooltip: ", info.id);

		//if (menuInfo.buttonId === info.id && menuInfo.show) return false;

		if (menuInfo.show) return false;

		setTooltipInfo({
			show: true,
			key: info.id,
			id: info.id,
			ref: info.ref,
			label: info.label,
			shortcuts: info.shortcuts ? info.shortcuts : undefined,
			alignX: info.alignX,
			alignY: info.alignY,
			offsetX: 8,
			offsetY: 8,
		});
	};

	const hideTooltip = () => {
		tooltipInfo.show = false;
		//console.log("hide tooltip");
		setTooltipInfo({
			...tooltipInfo,
		});
	};

	const resetTooltip = () => {
		tooltipInfo.id = null;
		tooltipInfo.show = false;
		//console.log("reset tooltip");
		setTooltipInfo({
			...tooltipInfo,
		});
	};

	return (
		<TooltipContext.Provider
			value={{
				showTooltip,
				hideTooltip,
				resetTooltip,
				tooltipInfo,
			}}
		>
			{children}
		</TooltipContext.Provider>
	);
};

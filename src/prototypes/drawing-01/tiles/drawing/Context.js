import React, { createContext } from "react";

export const DiagramContext = createContext();

export const DiagramProvider = ({ children }) => {
	

	return (
		<DiagramContext.Provider
			value={{
				
			}}
		>
			{children}
		</DiagramContext.Provider>
	);
};

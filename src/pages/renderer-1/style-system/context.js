import React from "react";

export const initialStyleSystemContext = { theme: {} };
export const StyleSystemContext = React.createContext(
	initialStyleSystemContext
);
export const useStyleSystemContext = () => React.useContext(StyleSystemContext);

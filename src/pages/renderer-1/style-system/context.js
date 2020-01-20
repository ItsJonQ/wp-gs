import React from "react";

export const initialContext = { theme: {} };
export const StyleSystemContext = React.createContext(initialContext);
export const useStyleSystemContext = () => React.useContext(StyleSystemContext);

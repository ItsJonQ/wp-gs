import React, { useState, useContext } from "react";
import { StyleHierarchyStack } from "../shared";

const baseTheme = {
	color: "black",
	global: "",
};

const blueTheme = {
	color: "blue",
	global: "",
};

const redTheme = {
	color: "red",
	global: "",
};

const initialState = {
	base: baseTheme,
	blue: blueTheme,
	red: redTheme,
};

const Rdx = React.createContext({});
const useRdx = () => useContext(Rdx);

function Provider({ children }) {
	const [theme, setTheme] = useState("base");
	const [themes, setThemes] = useState(initialState);
	const [blocks, setBlocks] = useState([]);

	const setGlobalColor = nextColor => {
		const currentTheme = themes[theme];
		setThemes({
			...themes,
			[theme]: {
				...currentTheme,
				global: nextColor,
			},
		});
	};

	const resetGlobalColor = () => {
		const currentTheme = themes[theme];
		setThemes({
			...themes,
			[theme]: {
				...currentTheme,
				global: "",
			},
		});
	};

	const contextProps = {
		theme,
		themes,
		blocks,
		setBlocks,
		setGlobalColor,
		resetGlobalColor,
	};

	return <Rdx.Provider value={contextProps}>{children}</Rdx.Provider>;
}

export function Visualizer2() {
	return (
		<Provider>
			<StyleHierarchyStack />
		</Provider>
	);
}

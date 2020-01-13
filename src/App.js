import React from "react";
import { Controls } from "@itsjonq/controls";
import { globalStyles, useInjectGlobalStyles } from "./global-styles";
import { SwatchesBlock } from "./blocks/swatches";
import { TypographyBlock } from "./blocks/typography";
import { useKnobs } from "./knobs";
import { ButtonBlock } from "./blocks/button";
import { GlobalStylesInspector, Section } from "./components";

/**
 * Bootstrap Theme
 */
// import "./load-theme";

/**
 * Load the app
 */
function App() {
	useInjectGlobalStyles();
	useKnobs();

	return (
		<div className="App">
			<Controls title="Global Styles" top={48} />
			<Section title="Button (Block)">
				<ButtonBlock />
			</Section>
			<Section title="Typography (Preview)">
				<TypographyBlock />
			</Section>
			<Section title="Colors (Preview)">
				<SwatchesBlock />
			</Section>
			<GlobalStylesInspector />
		</div>
	);
}

const loggerPlugin = state => {
	console.log("UPDATE", state);
	return state;
};

globalStyles.addTransformer(loggerPlugin);

export default App;

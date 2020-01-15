import { colorSchemePlugin, fontSizePlugin } from "./plugins";
import { cssVariableTransform } from "./transforms";

export const defaultTheme = {
	colors: {
		text: "#000",
		background: "#fff",
		primary: "#07c",
	},
	fonts: {
		body: "system-ui, sans-serif",
	},
	fontSizes: {
		base: 16,
	},
	fontScale: 1.1,
};

const defaultPlugins = [colorSchemePlugin, fontSizePlugin];
const defaultTransforms = [cssVariableTransform, ...defaultPlugins];

export const initialState = {
	defaultTheme,
	plugins: defaultPlugins,
	transforms: defaultTransforms,
};

export function coreReducer(state = initialState) {
	return state;
}

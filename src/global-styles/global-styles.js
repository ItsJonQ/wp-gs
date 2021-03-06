import { createGlobalStyles } from "./create-global-styles";
import * as plugins from "./plugins";

export const globalStyles = createGlobalStyles();

Object.keys(plugins).forEach(key => {
	const plugin = plugins[key];
	globalStyles.addPlugin(plugin);
});

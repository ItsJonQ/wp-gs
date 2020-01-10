import { createGlobalStyles } from './create-global-styles';
import * as plugins from './plugins';
import { fontSizeTransformer } from './transformers';

export const globalStyles = createGlobalStyles();

Object.keys(plugins).forEach((key) => {
	const plugin = plugins[key];
	globalStyles.addPlugin(plugin);
});

globalStyles.addTransformer(fontSizeTransformer);

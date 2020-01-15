import { useSelector } from "react-redux";
import { useCurrentTheme } from "../themes";
import { merge } from "../utils";

export const coreSelector = state => state.core;
export const pluginsSelector = state => state.core.plugins;
export const transformsSelector = state => state.core.transforms;
export const coreThemeSelector = state => state.core.defaultTheme;

export const useCoreThemeStyles = () => {
	return useSelector(coreThemeSelector);
};

export const useCorePlugins = () => {
	return useSelector(pluginsSelector);
};

export const useCoreTransforms = () => {
	return useSelector(transformsSelector);
};

export const useStyleData = () => {
	const plugins = useCorePlugins();
	const transforms = useCoreTransforms();

	const coreTheme = useCoreThemeStyles();
	const theme = useCurrentTheme();

	const composeStylesWithPlugins = composeState(plugins);
	const composeVariablesWithPlugins = composeState(transforms);

	const precomposedStyles = merge(coreTheme, theme.styles);
	const composedStyles = composeStylesWithPlugins(precomposedStyles);
	const mergedStyles = merge(composedStyles, theme.styles);

	const nextStyles = merge(mergedStyles, theme.globals);
	const nextVariables = composeVariablesWithPlugins(nextStyles);

	return {
		styles: nextStyles,
		variables: nextVariables,
	};
};

export const useStyleDataFromSource = (source = {}) => {
	const plugins = useCorePlugins();
	const transforms = useCoreTransforms();

	const composeStylesWithPlugins = composeState(plugins);
	const composeVariablesWithPlugins = composeState(transforms);

	const nextStyles = composeStylesWithPlugins(source);
	const nextVariables = composeVariablesWithPlugins(nextStyles);

	return {
		styles: nextStyles,
		variables: nextVariables,
	};
};

function composeState(fns = []) {
	return state => {
		return fns.reduceRight((nextState, fn) => {
			try {
				return fn(nextState);
			} catch {
				return nextState;
			}
		}, state);
	};
}

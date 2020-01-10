import { kebabCase, set, unset, isObject, isString, isUndefined } from 'lodash';
import merge from 'deepmerge';
export { default as merge } from 'deepmerge';

export const defaultTheme = {
	colors: {
		text: '#000',
		background: '#fff',
		primary: '#07c',
	},
	fonts: {
		body: 'system-ui, sans-serif',
	},
	fontSizes: {
		base: 16,
	},
	fontScale: 1.1,
};

export function createGlobalStyles(initialState = defaultTheme) {
	const state = {};
	const defaultState = initialState;
	const themeState = {};
	const userState = {};
	const variables = {};

	const plugins = [];
	const transformers = [];

	const getState = () => ({ ...state });
	const getVariables = () => ({ ...variables });

	const composeStateWithPlugins = composeState(plugins);
	const composeVariablesWithTransformers = composeState(transformers);

	const render = () => {
		const precomposedState = merge(defaultState, themeState);
		const composedState = composeStateWithPlugins(precomposedState);
		const mergedState = merge(composedState, themeState);

		const nextState = merge(mergedState, userState);
		const nextVariables = composeVariablesWithTransformers(nextState);

		Object.assign(state, nextState);
		Object.assign(variables, nextVariables);
	};

	const addPlugin = (plugin) => {
		plugins.push(plugin);
		render();
	};

	const addTransformer = (transformer) => {
		transformers.push(transformer);
		render();
	};

	const apply = (nextThemeState = {}) => {
		Object.assign(themeState, nextThemeState);
		render();
	};

	const setProps = (nextUserState = {}, setValue) => {
		let nextState = { ...userState };

		if (isString(nextUserState) && !isUndefined(setValue)) {
			nextState = set(nextState, nextUserState, setValue);
		}
		if (isObject(nextUserState)) {
			nextState = merge(nextState, nextUserState);
		}

		Object.assign(userState, nextState);
		render();
	};

	const unsetProps = (nextUserState) => {
		if (!isString(nextUserState)) return;

		Object.assign(userState, unset(userState, nextUserState));
		render();
	};

	const getHTMLString = () => {
		const template = [];
		const vars = getVariables();
		const keys = Object.keys(vars);

		template.push(`<style>`);
		template.push(`  :root {`);

		keys.forEach((key) => {
			const value = vars[key];
			template.push(`    ${key}: ${value};`);
		});

		template.push(`  }`);
		template.push(`</style>`);

		const html = template.join('\n');

		return html;
	};

	/**
	 * Default transformers
	 */
	addTransformer(cssVariableTransformer);

	return {
		getState,
		addPlugin,
		addTransformer,
		apply,
		setProps,
		unsetProps,
		getVariables,
		getHTMLString,
	};
}

export function composeState(fns = []) {
	return (state) => {
		return fns.reduceRight((nextState, fn) => {
			try {
				return fn(nextState);
			} catch {
				return nextState;
			}
		}, state);
	};
}

function flattenObject(ob) {
	let toReturn = {};

	for (let i in ob) {
		if (!ob.hasOwnProperty(i)) continue;

		if (typeof ob[i] == 'object' && ob[i] !== null) {
			let flatObject = flattenObject(ob[i]);
			for (let x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}

	return toReturn;
}

function cssVariableTransformer(state) {
	const flattenedState = flattenObject(state);
	const keys = Object.keys(flattenedState);

	const cssVariableData = keys.reduce((data, key) => {
		const value = flattenedState[key];
		const renamedKey = kebabCase(key);
		const prefix = '--wp-gs';

		const enhancedKey = `${prefix}-${renamedKey}`;

		return {
			...data,
			[enhancedKey]: value,
		};
	}, {});

	return cssVariableData;
}

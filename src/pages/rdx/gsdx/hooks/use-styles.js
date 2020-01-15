import { useStyleData } from "../core";
import {
	createCssVariablesStringFromSource,
	createHtmlStringFromSource,
} from "../utils";

export function useStyles() {
	return useStyleData().styles;
}

export function useVariables() {
	return useStyleData().variables;
}

export function useStyleCssString() {
	const vars = useVariables();
	const css = createCssVariablesStringFromSource(vars);

	return css;
}

export function useStyleHtmlString() {
	const vars = useVariables();
	const html = createHtmlStringFromSource(vars);

	return html;
}

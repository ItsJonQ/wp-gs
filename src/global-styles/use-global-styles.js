import { useEffect } from 'react';
import { globalStyles } from './global-styles';

export function useGlobalStyles() {
	const html = globalStyles.getHtmlString();
	useEffect(() => {}, [html]);

	return globalStyles;
}

export function useGlobalStylesState() {
	const globalStyles = useGlobalStyles();

	return globalStyles.getState();
}

export function useGlobalStylesVariables() {
	const globalStyles = useGlobalStyles();

	return globalStyles.getVariables();
}

export function useGlobalStylesCssString() {
	const globalStyles = useGlobalStyles();

	return globalStyles.getCssString();
}

export function useGlobalStylesHtmlString() {
	const globalStyles = useGlobalStyles();

	return globalStyles.getHtmlString();
}

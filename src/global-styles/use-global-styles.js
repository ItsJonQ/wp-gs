import { useState, useEffect } from 'react';
import { globalStyles } from './global-styles';

export function useGlobalStyles() {
	const [, setState] = useState(globalStyles.getState());

	useEffect(() => {
		const callback = () => {
			setState(globalStyles.getState());
		};
		globalStyles.subscribe(callback);

		return () => {
			globalStyles.unsubscribe(callback);
		};
	}, [setState]);

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

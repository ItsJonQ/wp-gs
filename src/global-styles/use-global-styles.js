import { useCallback, useRef, useEffect, useState } from "react";
import { globalStyles } from "./global-styles";

export function useGlobalStyles() {
	const [, setState] = useState("");
	const prevState = useRef("");

	const updateState = useCallback(() => {
		const nextState = globalStyles.getHtmlString();
		if (prevState.current !== nextState) {
			setState(nextState);
			prevState.current = nextState;
		}
	}, [setState, prevState]);

	useEffect(() => {
		globalStyles.subscribe(updateState);

		return () => {
			globalStyles.unsubscribe(updateState);
		};
	}, [updateState]);

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

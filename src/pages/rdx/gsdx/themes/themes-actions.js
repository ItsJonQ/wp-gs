import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createActionTypes, merge, uuid } from "../utils";
import { useSiteCurrentTheme } from "../site";

const ACTION_TYPES = [
	"CHANGE_THEME",
	"ADD_THEME",
	"SET_GLOBAL_STYLES",
	"SET_DOCUMENT_STYLES",
];

export const THEMES_ACTIONS = createActionTypes(ACTION_TYPES);

export function createThemeData(props = {}) {
	const data = {
		id: uuid(),
		name: "Theme",
		styles: {},
		documents: [],
		globals: {},
	};

	return merge(data, props);
}

export function createDocumentData(props = {}) {
	const data = {
		id: uuid(),
		name: "Document",
		styles: {},
	};

	return merge(data, props);
}

export function useAddTheme() {
	const dispatch = useDispatch();

	const addTheme = useCallback(
		props => {
			const newTheme = createThemeData(props);

			dispatch({
				type: THEMES_ACTIONS.ADD_THEME,
				payload: {
					theme: newTheme,
				},
			});
		},
		[dispatch]
	);

	return addTheme;
}

export function useSetGlobalStyles() {
	const dispatch = useDispatch();
	const theme = useSiteCurrentTheme();

	const setGlobalStyles = useCallback(
		props => {
			dispatch({
				type: THEMES_ACTIONS.SET_GLOBAL_STYLES,
				payload: {
					theme,
					props,
				},
			});
		},
		[dispatch, theme]
	);

	return setGlobalStyles;
}

export function useSetDocumentStyles() {
	const dispatch = useDispatch();
	const theme = useSiteCurrentTheme();

	const setDocumentStyles = useCallback(
		({ id, styles }) => {
			dispatch({
				type: THEMES_ACTIONS.SET_DOCUMENT_STYLES,
				payload: {
					theme,
					id,
					styles,
				},
			});
		},
		[dispatch, theme]
	);

	return setDocumentStyles;
}

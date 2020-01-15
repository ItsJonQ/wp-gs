import { createThemeData, createDocumentData } from "./themes-actions";
import { THEMES_ACTIONS as ACTIONS } from "./themes-actions";
import { merge } from "../utils";

const baseTheme = createThemeData({ name: "base" });
const pageDocument = createDocumentData({ name: "Page", slug: "page" });

baseTheme.documents = [pageDocument];

export const initialState = [baseTheme];

export function themesReducer(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case ACTIONS.ADD_THEME:
			return [...state, payload.theme];

		case ACTIONS.SET_GLOBAL_STYLES:
			return state.map(theme => {
				if (theme.name === payload.theme) {
					const nextStyles = merge(theme.globals, payload.props);

					return merge(theme, { globals: nextStyles });
				}

				return theme;
			});

		case ACTIONS.SET_DOCUMENT_STYLES:
			return state.map(theme => {
				if (theme.name === payload.theme) {
					const themeDoc = theme.documents.find(
						doc => doc.id === payload.id
					);
					if (!themeDoc) return theme;

					const documents = theme.documents.map(doc => {
						if (doc.id === payload.id) {
							return merge(doc, {
								styles: payload.styles,
							});
						}
						return doc;
					});

					return { ...theme, documents };
				}

				return theme;
			});

		default:
			return state;
	}
}

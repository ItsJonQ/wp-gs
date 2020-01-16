import { SITE_ACTIONS as ACTIONS } from "./site-actions";

export const initialState = {
	currentTheme: "base",
};

export function siteReducer(state = initialState, action) {
	const { payload } = action;
	switch (action.type) {
		case ACTIONS.CHANGE_THEME:
			return {
				...state,
				currentTheme: payload.theme,
			};
		default:
			return state;
	}
}
